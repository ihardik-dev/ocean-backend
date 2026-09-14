import os
import torch
import torch.nn as nn
import torch.nn.functional as F

from app.config import DEPTHS


MODEL_PATH = "/app/model/oceanembed_unet_with_wind.pth"


class ConvBlock(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()

        self.block = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),

            nn.Conv2d(out_ch, out_ch, 3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
        )

    def forward(self, x):
        return self.block(x)


class OceanUNet(nn.Module):
    def __init__(self, in_channels=7, out_channels=15, base=16):
        super().__init__()

        # Encoder
        self.enc1 = ConvBlock(in_channels, base)
        self.pool1 = nn.MaxPool2d(2)

        self.enc2 = ConvBlock(base, base * 2)
        self.pool2 = nn.MaxPool2d(2)

        self.enc3 = ConvBlock(base * 2, base * 4)

        # Bottleneck / satellite embedding
        self.pool3 = nn.MaxPool2d(2)
        self.bottleneck = ConvBlock(base * 4, base * 8)

        # Decoder
        self.up3 = nn.ConvTranspose2d(
            base * 8,
            base * 4,
            2,
            stride=2
        )
        self.dec3 = ConvBlock(base * 8, base * 4)

        self.up2 = nn.ConvTranspose2d(
            base * 4,
            base * 2,
            2,
            stride=2
        )
        self.dec2 = ConvBlock(base * 4, base * 2)

        self.up1 = nn.ConvTranspose2d(
            base * 2,
            base,
            2,
            stride=2
        )
        self.dec1 = ConvBlock(base * 2, base)

        # 15 output channels = 15 depth levels
        self.out_conv = nn.Conv2d(
            base,
            out_channels,
            1
        )

    def forward(self, x, return_embedding=False):

        # Encoder
        e1 = self.enc1(x)
        e2 = self.enc2(self.pool1(e1))
        e3 = self.enc3(self.pool2(e2))

        # Bottleneck
        b = self.bottleneck(self.pool3(e3))

        # Decoder
        d3 = self.up3(b)

        d3 = F.interpolate(
            d3,
            size=e3.shape[2:],
            mode="nearest"
        )

        d3 = self.dec3(
            torch.cat([d3, e3], dim=1)
        )

        d2 = self.up2(d3)

        d2 = F.interpolate(
            d2,
            size=e2.shape[2:],
            mode="nearest"
        )

        d2 = self.dec2(
            torch.cat([d2, e2], dim=1)
        )

        d1 = self.up1(d2)

        d1 = F.interpolate(
            d1,
            size=e1.shape[2:],
            mode="nearest"
        )

        d1 = self.dec1(
            torch.cat([d1, e1], dim=1)
        )

        # Final prediction
        out = self.out_conv(d1)

        if return_embedding:
            return out, b

        return out


# Create model
model = OceanUNet()


# Load trained weights
if os.path.exists(MODEL_PATH):

    state_dict = torch.load(
        MODEL_PATH,
        map_location="cpu",
        weights_only=True
    )

    model.load_state_dict(state_dict)

    model.eval()


def predict_temperature(ocean_data):

    values = [
        ocean_data["sst"],
        ocean_data["sss"],
        ocean_data["ssh"],
        ocean_data["current_u"],
        ocean_data["current_v"],
        ocean_data["wind_u"],
        ocean_data["wind_v"]
    ]

    # Convert 7 input values into PyTorch tensor
    x = torch.tensor(
        values,
        dtype=torch.float32
    )

    # Shape:
    # [7] → [1, 7, 1, 1]
    x = x.view(1, 7, 1, 1)

    # MVP:
    # Expand the 7 values across the complete grid
    x = x.expand(
        1,
        7,
        100,
        240
    )

    # Run model
    with torch.no_grad():
        output = model(x)

    # Remove batch dimension
    temperature = output[0].tolist()

    return temperature