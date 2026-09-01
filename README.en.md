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
