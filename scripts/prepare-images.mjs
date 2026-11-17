// Copies the images the new site needs from the WordPress backup into public/,
// trimmed and resized for the web. Run: node scripts/prepare-images.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC = "wp-export/uploads";
const OUT = "public/images";

const jobs = [
  // [source, dest, width, trim]
  ["2024/10/OneGrow-Learning-logo-Black.png", "brand/logo-dark.png", 640, true],
  ["2024/10/OneGrow-Learning-logo-White.png", "brand/logo-light.png", 640, true],
  ["2024/12/g-logo-Black-PNG.png", "brand/mark.png", 256, true],
  ["2024/12/1690895737logo-jpg1690895737.jpg", "universities/muj.png", 480, true],
  ["2024/12/sikkimmanipallogo.webp", "universities/smu.png", 480, true],
  ["2024/10/Group-41-1.png", "accreditations/naac.png", 160, false],
  ["2024/10/Group-42.png", "accreditations/aicte.png", 160, false],
  ["2024/10/Group-43.png", "accreditations/ugc.png", 160, false],
  ["2024/10/Group-44.png", "accreditations/wes.png", 160, false],
  ["2024/10/Group-48.png", "accreditations/icas.png", 160, false],
  ["2024/10/Group-47.png", "accreditations/ices.png", 160, false],
];

for (const [src, dest, width, trim] of jobs) {
  const out = path.join(OUT, dest);
  mkdirSync(path.dirname(out), { recursive: true });
  let img = sharp(path.join(SRC, src));
  if (trim) img = img.trim({ threshold: 10 });
  const info = await img.resize({ width, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(out);
  console.log(dest, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`);
}
