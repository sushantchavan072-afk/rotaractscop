from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(r"C:\Users\HP\Downloads\rotaractscop-main\rotaractscop-main\src\assets\Members")
files = [p for p in sorted(root.iterdir()) if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png"}]
thumb_w, thumb_h = 180, 220
label_h = 42
cols = 5
rows = (len(files) + cols - 1) // cols
sheet = Image.new("RGB", (cols * thumb_w, rows * (thumb_h + label_h)), "white")
draw = ImageDraw.Draw(sheet)
for i, path in enumerate(files):
    try:
        image = Image.open(path).convert("RGB")
        image.thumbnail((thumb_w - 16, thumb_h - 16))
        x = (i % cols) * thumb_w
        y = (i // cols) * (thumb_h + label_h)
        px = x + (thumb_w - image.width) // 2
        py = y + (thumb_h - image.height) // 2
        sheet.paste(image, (px, py))
        label = path.stem[:28]
        draw.text((x + 5, y + thumb_h + 4), label, fill="black")
    except Exception as exc:
        print(f"Skipped {path}: {exc}")
output = root.parent / "member-contact-sheet.jpg"
sheet.save(output, quality=92)
print(output)
