// Converts the sample degree certificates used on the old course pages into web-sized WebP
// and records their sizes in src/data/degree-images.json. Run: node scripts/prepare-degrees.mjs
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";

const SRC = "wp-export/uploads/";
const OUT = "public/images/degrees/";
mkdirSync(OUT, { recursive: true });

const map = {
  "master-of-business-administration-muj": "2025/01/MBa.jpg",
  "master-of-computer-application": "2024/12/MCA.jpg.webp",
  "master-of-commerce": "2024/12/M.COM_.jpg.webp",
  "master-of-arts-economics": "2024/12/MUJ-MA-Economics.jpg",
  "master-of-arts-in-journalism-mass-communication-online-ma-jmc": "2025/01/MA-JMC.jpg.webp",
  "bachelor-of-business-administration": "2024/12/BBA103.jpg.webp",
  "bachelor-of-commerce-muj": "2025/01/B-COM.jpg.webp",
  "master-of-business-administration": "2024/12/SMU-MBA-Certificate.jpg",
  "master-of-computer-application-smu": "2025/01/SMU-MCA-Certificate.jpg.webp",
  "master-of-commerce-smu": "2025/01/SMU-certificate-Master-of-Commerce.jpg.webp",
  "master-of-arts-english": "2025/01/SMU-Master-of-Arts-in-English-Certificate.jpg.webp",
  "master-of-arts-sociology": "2025/01/SMU-Master-of-Arts-in-Sociology-certificate.jpg.webp",
  "master-of-arts-political-science": "2025/01/SMU-Master-of-Arts-in-Political-Science-Certificate.jpg.webp",
  "bachelor-of-arts": "2024/12/SMU-sample-certificate-Bachelor-of-Arts1.jpg",
  "bachelor-of-commerce": "2024/12/SMU-certificate-Bachelor-of-Commerce.jpg.webp",
};

const sizes = {};
for (const [slug, src] of Object.entries(map)) {
  const info = await sharp(SRC + src).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUT}${slug}.webp`);
  sizes[slug] = { src: `/images/degrees/${slug}.webp`, width: info.width, height: info.height };
  console.log(slug, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`);
}
writeFileSync("src/data/degree-images.json", JSON.stringify(sizes, null, 1) + "\n");
