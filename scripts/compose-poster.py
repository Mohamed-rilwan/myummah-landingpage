"""Overlay a real scannable QR (with logo) onto the designed invite poster."""
from __future__ import annotations

from pathlib import Path

import qrcode
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
REGISTER_URL = "https://myummah.co.uk/#connect"

poster_path = PUBLIC / "mosque-invite-poster.png"
logo_path = PUBLIC / "logo.png"
qr_out = PUBLIC / "qr-register.png"
final_out = PUBLIC / "mosque-invite-final.png"


def main() -> None:
    poster = Image.open(poster_path).convert("RGBA")
    width, height = poster.size

    # Lower-center QR area on the designed poster
    qr_size = int(width * 0.36)
    qr_x = (width - qr_size) // 2
    qr_y = int(height * 0.545)

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=12,
        border=2,
    )
    qr.add_data(REGISTER_URL)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="#0a2240", back_color="white").convert("RGBA")
    qr_img = qr_img.resize((qr_size, qr_size), Image.Resampling.NEAREST)

    # Logo badge in QR center
    logo = Image.open(logo_path).convert("RGBA")
    badge = int(qr_size * 0.22)
    logo = logo.resize((badge, badge), Image.Resampling.LANCZOS)
    pad = max(4, int(badge * 0.16))
    badge_bg = Image.new("RGBA", (badge + pad * 2, badge + pad * 2), (255, 255, 255, 255))
    # Rounded-ish plate via simple paste; keep crisp for scan reliability
    badge_bg.paste(logo, (pad, pad), logo)
    bx = (qr_size - badge_bg.width) // 2
    by = (qr_size - badge_bg.height) // 2
    qr_img.paste(badge_bg, (bx, by), badge_bg)

    qr_img.convert("RGB").save(qr_out, "PNG")

    # White plate to cover previous decorative QR
    plate_pad = int(qr_size * 0.07)
    plate = Image.new(
        "RGBA",
        (qr_size + plate_pad * 2, qr_size + plate_pad * 2),
        (255, 255, 255, 255),
    )
    # Soft gold border
    draw = ImageDraw.Draw(plate)
    draw.rounded_rectangle(
        [0, 0, plate.width - 1, plate.height - 1],
        radius=max(12, plate_pad),
        outline=(212, 175, 55, 255),
        width=max(3, plate_pad // 4),
    )

    poster.paste(plate, (qr_x - plate_pad, qr_y - plate_pad), plate)
    poster.paste(qr_img, (qr_x, qr_y), qr_img)

    poster.convert("RGB").save(final_out, "PNG", quality=95)
    print(f"Poster {width}x{height}")
    print(f"QR at ({qr_x}, {qr_y}) size {qr_size}")
    print(f"Wrote {qr_out}")
    print(f"Wrote {final_out}")


if __name__ == "__main__":
    main()
