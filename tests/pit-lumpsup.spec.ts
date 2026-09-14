import { test, expect } from "@playwright/test";

test.describe("the user selects the lumsum", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Krok 1 z 4")).toBeVisible();

    await page.getByRole("button", { name: /Osoba Prywatna/i }).click();

    await page.getByRole("button", { name: /Dalej: forma rozliczenia/i }).click();

    await expect(page.getByText("Krok 2 z 4")).toBeVisible();

    await page.getByRole("button", { name: /Ryczałt/i }).click();

  })

  const data = [
    {
      testName: "user gets 500 zł donation and 12% of lumpsum",
      donation: 500,
      income: 96000,
      price: "5 760",
      realCount: 440,
      tax: 60,
      prec: 12,
      limit: 9
    },
    {
      testName: "user gets 500 zł donation and 3% of lumpsum",
      donation: 500,
      income: 96000,
      price: "5 760",
      realCount: 485,
      tax: 15,
      prec: 3,
      limit: 9
    },
    {
      testName: "user gets 1000 zł donation and 3% of lumpsum",
      donation: 1000,
      income: 96000,
      price: "5 760",
      realCount: 970,
      tax: 30,
      prec: 3,
      limit: 17
    },
    {
      testName: "user gets 20000 zł donation and 3% of lumpsum",
      donation: 20000,
      income: 96000,
      price: "5 760",
      realCount: "19 827",
      tax: 173,
      prec: 3,
      limit: 347
    },
  ]

  for (const { testName, donation, income, price, realCount, tax, prec, limit } of data) {
    test(testName, async ({ page }) => {
      await page.getByRole("button", { name: `${prec}%` }).click();

      await page.getByRole("button", { name: /Dalej: Twój przychód/i }).click();

      await expect(page.getByText("Krok 3 z 4")).toBeVisible();

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
      await expect(page.getByRole('paragraph').filter({ hasText: new RegExp(`^${tax} zł$`) })).toBeVisible();
      await expect(page.getByRole("paragraph").filter({ hasText: new RegExp(`^${prec}%$`) })).toBeVisible();
      await expect(page.getByRole('paragraph').filter({ hasText: new RegExp(`^${limit}%$`) })).toBeVisible();
    })
  }
})