import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outputDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const maxAssetBytes = 25 * 1024 * 1024;
const oversizedAssets = [];
let largestAssetBytes = 0;

async function checkDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const assetPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await checkDirectory(assetPath);
    } else if (entry.isFile()) {
      const { size } = await stat(assetPath);
      largestAssetBytes = Math.max(largestAssetBytes, size);
      if (size > maxAssetBytes) {
        oversizedAssets.push(`${path.relative(outputDirectory, assetPath)} (${(size / 1024 / 1024).toFixed(2)} MiB)`);
      }
    }
  }
}

await checkDirectory(outputDirectory);
if (oversizedAssets.length) {
  throw new Error(`Cloudflare's 25 MiB asset limit exceeded:\n${oversizedAssets.join("\n")}`);
}
console.log(`Asset sizes OK: largest file is ${(largestAssetBytes / 1024 / 1024).toFixed(2)} MiB (limit: 25 MiB).`);
