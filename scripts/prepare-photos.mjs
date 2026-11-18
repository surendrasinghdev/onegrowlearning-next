// Converts the stock photos already licensed for the old site into web-sized WebP files.
// Run: node scripts/prepare-photos.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC = "wp-export/uploads";
const OUT = "public/images/photos";
mkdirSync(OUT, { recursive: true });

// [source, dest name, width, height, options]
const jobs = [
  ["2024/10/SM908044-e1724238602844.jpg", "hero-professional", 760, 900, { position: "attention" }],
  ["2024/10/banner-hp-4.jpg", "counsellor", 760, 900, { position: "centre" }],
  ["2024/10/smiling-businesswoman-outdoors_23-2148002471.jpg", "mba", 720, 480, { position: "attention" }],
  ["2024/10/4-SM197900.jpg", "computers", 720, 480, { position: "centre" }],
  // crop away the stock watermark in the bottom-right corner
  ["2024/10/SM623527-1536x1024-1.jpg", "bba", 720, 480, { position: "top", extract: { left: 0, top: 0, width: 1200, height: 800 } }],
  ["2024/10/woman-taking-notes-cafeteria_23-2147778646.jpg", "commerce", 720, 480, { position: "attention" }],
  ["2024/10/Untitled-design-9.jpeg", "arts", 720, 480, { position: "attention" }],
  ["2024/10/man-filming-with-professional-camera-new-movie-1024x1536-1.jpg", "media", 720, 480, { position: "centre" }],
  ["2024/10/young-female-university-graduate-academic-cap-sitting-table-smiling-pointing-left-future-lawyer-engineer-showing-idea_1120246-3907.jpg", "graduate", 720, 480, { position: "top" }],
  ["2024/10/300-SM1046013-e1723280521945.jpg", "student", 720, 480, { position: "top" }],
  ["2024/10/two-businessmen-shaking-hands_1268500-9079.avif", "business", 720, 480, { position: "centre" }],
  ["2024/10/manipal-university.jpg", "campus-muj", 960, 600, { position: "centre" }],
  ["2024/10/About-Sikkim-Manipal-University.webp", "campus-smu", 960, 600, { position: "centre" }],
  ["2025/01/MBa.jpg", "degree-sample-muj", 960, 735, { fit: "contain" }],
  ["2024/10/1583994753php9GLKzo.jpeg", "lecture", 720, 480, { position: "centre" }],
  ["2024/10/young-female-university-graduate-academic-cap-sitting-table-smiling-pointing-left-future-lawyer-engineer-showing-idea_1120246-7658.jpg", "graduate-2", 720, 480, { position: "top" }],
  ["2024/10/young-woman-graduation-ceremony-holding-her-cap_23-2148505270.jpg", "graduate-3", 720, 480, { position: "attention" }],
];

for (const [src, name, width, height, opts] of jobs) {
  let img = sharp(path.join(SRC, src));
  if (opts.extract) img = img.extract(opts.extract);
  const info = await img
    .resize({ width, height, fit: opts.fit ?? "cover", position: opts.position, background: "#ffffff" })
    .webp({ quality: 78 })
    .toFile(path.join(OUT, `${name}.webp`));
  console.log(name, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`);
}
