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

https://zyzik1248.github.io/kalkulator-darowizn-2/

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
