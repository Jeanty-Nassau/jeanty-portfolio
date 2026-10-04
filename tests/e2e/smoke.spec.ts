import { expect, test } from "@playwright/test";

const routes = [
  ["/", /Building systems/i],
  ["/work", /Built to be used, tested, and inspected/i],
  ["/work/webhook-processing-platform", /Event Processing Platform/i],
  ["/work/wedding-web-app", /Wedding Web App/i],
  ["/lab", /Experiments that taught me how things move/i],
  ["/about", /I like building things that have to work/i],
  ["/notes", /Things worth thinking through in public/i],
] as const;

for (const [path, heading] of routes) {
  test(`${path} renders`, async ({ page }) => {
    await page.goto(path);
    await expect(
      page.getByRole("heading", { name: heading }).first(),
    ).toBeVisible();
  });
}

test("unknown route renders custom 404", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", {
      name: /This page doesn't exist in the current system/i,
    }),
  ).toBeVisible();
});

test("main navigation reaches work", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Work" }).first().click();

  await expect(page).toHaveURL(/\/work$/);
  await expect(
    page.getByRole("heading", {
      name: /Built to be used, tested, and inspected/i,
    }),
  ).toBeVisible();
});
