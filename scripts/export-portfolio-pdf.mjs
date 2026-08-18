import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const url = process.env.SITE_URL ?? "http://localhost:5177/";
const outFile = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/projects/张喆涵-项目作品集.pdf"
);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
await page.evaluate(() => {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("visible"));
});
await page.waitForTimeout(1500);

const height = await page.evaluate(() => document.documentElement.scrollHeight);
await page.pdf({
  path: outFile,
  printBackground: true,
  width: "1440px",
  height: `${height}px`,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
});

await browser.close();
console.log(`已导出：${outFile}`);
