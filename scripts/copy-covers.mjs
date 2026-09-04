import fs from "node:fs";
import path from "node:path";

const src = path.join(process.cwd(), "content", "covers");
const dst = path.join(process.cwd(), "public", "covers");

if (!fs.existsSync(src)) {
  console.log("[copy-covers] no content/covers/ directory, skipping");
  process.exit(0);
}

fs.mkdirSync(dst, { recursive: true });

let count = 0;
for (const file of fs.readdirSync(src)) {
  const from = path.join(src, file);
  const to = path.join(dst, file);
  if (fs.statSync(from).isFile()) {
    fs.copyFileSync(from, to);
    count++;
  }
}

console.log(`[copy-covers] copied ${count} file(s) to public/covers/`);
