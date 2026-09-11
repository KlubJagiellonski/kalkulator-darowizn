import { test, expect } from "@playwright/test";

test.describe("the user selects the tax", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Krok 1 z 4")).toBeVisible();

    await page.getByRole("button", { name: /Osoba Prywatna/i }).click();

    await page.getByRole("button", { name: /Dalej: forma rozliczenia/i }).click();

    await expect(page.getByText("Krok 2 z 4")).toBeVisible();

    await page.getByRole("button", { name: /Skala podatkowa/i }).click();

    await page.getByRole("button", { name: /Dalej: Twoje dochody/i }).click();

    await expect(page.getByText("Krok 3 z 4")).toBeVisible();

  })

  const data = [
    {
      testName: "user gets 500 zł donation",
      donation: 500,
      income: 96000,
      price: "5 760",
      realCount: 440,
      tax: 60,
      prec: 12,
      limit: 9
    },
    {
      testName: "user gets 200 zł donation",
      donation: 200,
      income: 96000,
      price: "5 760",
      realCount: 176,
      tax: 24,
      prec: 12,
      limit: 3
    },
    {
      testName: "user gets 6000 zł donation",
      donation: 6000,
      income: 96000,
      price: "5 760",
      realCount: "5 309",
      tax: 691,
      prec: 12,
      limit: 104
    },
    {
      testName: "user gets 120100 zł income and 500 zł donation",
      donation: 500,
      income: 120100,
      price: "7 206",
      realCount: "420",
      tax: 80,
      prec: 32,
      limit: 7
    },
  ]

  for (const { testName, donation, income, price, realCount, tax, prec, limit } of data) {
    test(testName, async ({ page }) => {
      await page.getByPlaceholder("np. 96 000").fill(`${income}`);

      await expect(page.getByRole('heading', { name: `${price}` })).toBeVisible()

      await page.getByRole("button", { name: /Dalej: kwota darowizny/i }).click();

      await expect(page.getByText("Krok 4 z 4")).toBeVisible();

      const donationBtn = page.getByRole("button", { name: `${donation} zł`, exact: true })

      if (await donationBtn.count() > 0) {
        await donationBtn.click()
      } else {
        await page.getByPlaceholder("własna kwota").fill(`${donation}`);
      }

      await expect(page.getByRole("heading", { level: 2, name: `${realCount} zł` })).toBeVisible();
      await expect(page.getByText(`${tax} zł`, { exact: true })).toBeVisible();
      await expect(page.getByRole("paragraph").filter({ hasText: new RegExp(`^${prec}%$`) })).toBeVisible();
      await expect(page.getByRole('paragraph').filter({ hasText: `${limit}%` })).toBeVisible();
    })
  }
})