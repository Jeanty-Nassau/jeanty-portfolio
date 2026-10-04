import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const baseUrl = "https://nassau-wedding.vercel.app";
const outputDir = "public/project-demos";

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
});

const context = await browser.newContext({
  viewport: {
    width: 1440,
    height: 900,
  },
  deviceScaleFactor: 1,
});

const page = await context.newPage();

async function capture(path, destination) {
  await page.goto(`${baseUrl}${path}`, {
    waitUntil: "networkidle",
    timeout: 60_000,
  });

  await page.waitForTimeout(1800);

  await page.screenshot({
    path: `${outputDir}/${destination}`,
    fullPage: false,
  });
}

await capture("/home", "wedding-home.png");

await page.goto(`${baseUrl}/api/demo`, {
  waitUntil: "networkidle",
  timeout: 60_000,
});

await page.waitForURL(/\/home$/, {
  timeout: 30_000,
});

await capture("/rsvp", "wedding-rsvp.png");

await browser.close();
