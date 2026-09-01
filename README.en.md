**English** · [Polski](README.md)

# Donation Calculator

A donation calculator for deductions from PIT and CIT.

The tool allows users to estimate what portion of a donation can be deducted from their taxable income and how this affects the amount of tax due. Based on the selected taxation method, income, and donation amount, the calculator provides an estimated deduction amount and the actual cost of the donation.

## Demo

The demo version is automatically deployed to GitHub Pages whenever changes are pushed to the `dev` branch.

To publish changes to the demo:

```bash
git add .
git commit -m "describe changes"
git push origin dev
```

After the push, GitHub Actions automatically builds and deploys the application.

The current demo version is available at:

https://klubjagiellonski.github.io/kalkulator-darowizn/

## Web Component

The calculator can be built as a **Web Component** and embedded on any website.

To build the Web Component version, run:

```bash
npm run build:web-component
```

The generated JavaScript and CSS files will be placed in the `web-component` folder.

Then include the generated files on the target website:

```html
<link rel="stylesheet" href="path/to/donation-calculator.css">
<script src="path/to/donation-calculator.js"></script>
```

and add the component wherever you want it to appear:

```html
<donation-calculator></donation-calculator>
```


## Technologies

The calculator was built with **React + TypeScript**, using **Vite** and **SCSS**.

## Getting Started

### Requirements

* **Node.js** 24.19.0
* **npm**

### Installation

To install the required dependencies, run:

```bash
npm install
```

### Running in development mode

```bash
npm run dev
```

The application will be available at the address displayed by Vite.

### Production build

```bash
npm run build
```

## Tests

The project's tests can be run with:

```bash
npm run test
```
## Calculation function

X = annual income/revenue Y = maximum amount of donations possible to deduct from tax Z = amount by which the tax payable (PIT or CIT) will be reduced as a result of deducting donations Z1 = tax without deducting donations Z2 = tax taking donations into account Z = Z1 - Z2

### CIT

Y = 0.1 × X (10% of income possible to deduct)

Z = 0.09 × Y (for CIT "small taxpayers", below EUR 1,200,000, according to the exchange rate as of 1 October 2021]

= 0.19 × Y (standard CIT 19% above the above-mentioned amount)

***Notes:*** the standard CIT rate is 19%; 9% is the rate applicable to small taxpayers or taxpayers starting a business, on income (revenue) other than income from capital gains.

***small taxpayer*** - means a taxpayer whose sales revenue (including the amount of VAT due) did not exceed in the previous tax year the PLN equivalent of EUR 1,200,000; amounts expressed in euros are converted according to the average EUR exchange rate announced by the National Bank of Poland on the first business day of October of the preceding tax year, rounded to the nearest PLN 1,000; sources: https://www.podatki.gov.pl/cit/stawki-podatkowe/, https://www.podatki.gov.pl/cit/ulgi-i-odliczenia/darowizny/darowizny-cit-na-ppp/, https://ksiegowosc.infor.pl/podatki/cit/cit/podatnicy-i-zakres-opodatkowania/4703385,Limity-przychodow-uprawniajace-do-9-stawki-CIT-w-2021-r.html

### PIT

Y = 0.06 × X (6% of income possible to deduct, however only if (X-Y) >= 30000, i.e. the tax-free amount)

= 0 (in the case when income does not exceed the tax-free amount, deduction does not make sense)

Amount of PIT (without donation): (variable Z1)

if X [income, here treated as the tax base] is

<= PLN 30,000: Z1 = 0

PLN 30,001 – 120,000: Z1 = 0.12 × X - KW1

PLN 120,001 and more: Z1 = 0.32 × X + PLN 10,800

Amount of PIT (with donation deduction): (variable Z2)

if X-Y [income minus donation] is:

<= PLN 30,000: Z2 = 0

PLN 8,001 – 13,000: Z2 = 0.17 × (X-Y) - KW1

PLN 13,001 – 85,528: Z2 = 0.17 × (X-Y) - PLN 525.12

PLN 85,529 – 127,000: Z2 = 0.17 × 85,528 + 0.32(X-Y-85,528) - KW2

PLN 127,001 and more: Z2 = 0.17 × 85,528 + 0.32(X-Y-85,528)

***where:*** tax-free amount 1: KW1 = PLN 1,360 - (PLN 834.88 × (X-Y-PLN 8,000) ÷ PLN 5,000)

tax-free amount 2: KW2 = PLN 525.12 - (PLN 525.12 × (X-Y-PLN 85,528) ÷ PLN 41,472)

***Notes:*** (17% tax up to PLN 85,528 of income, and above this amount - 32%)

PLN 1 – 8,000 – the tax-free amount is PLN 8,000;

PLN 8,000 – 13,000 – the tax-free amount is the result of the following equation: PLN 1,360 – [PLN 834.88 × (tax base – PLN 8,000) ÷ PLN 5,000];

PLN 13,000 – 85,528 – the tax-free amount is PLN 525.12;

PLN 85,528 – 127,000 – the tax-free amount is the result of the following equation: PLN 525.12 – [PLN 525.12 × (tax base – PLN 85,528) ÷ PLN 41,472];

from PLN 127,000 – there is no tax-free amount.

***Sources:*** https://poradnikprzedsiebiorcy.pl/-jak-obliczyc-podatek-dochodowy, https://poradnikprzedsiebiorcy.pl/-nowa-skala-podatkowa-od-2020-roku-obnizka-do-17

### Flat-rate PIT

Taxpayers settling their taxes according to the flat-rate PIT tax rate are generally not entitled to deduct donations from income.

### Lump-sum tax

In the case of PIT taxpayers taxed under the lump-sum scheme: you have the right to deduct donations from the tax base in the amount of 6% of income. To calculate the maximum amount of donations that you can deduct, multiply your annual income by 6%. If you want to find out how much less tax you will pay - multiply the amount of donations by your lump-sum tax rate.

***Do you see an error? Write to us:**

Bartosz Paszcza, bartosz.paszcza {at} klubjagiellonski.pl

