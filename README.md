**Polski** · [English](README.en.md)

# Kalkulator darowizn

Kalkulator darowizn do odliczenia od PIT i CIT.

Narzędzie pozwala użytkownikowi oszacować, jaką część przekazanej darowizny może odliczyć od dochodu oraz jak przekłada się to na wysokość należnego podatku. Na podstawie informacji o rodzaju opodatkowania, dochodzie i wysokości darowizny kalkulator przedstawia szacunkową wysokość możliwego odliczenia oraz rzeczywisty koszt przekazanej darowizny.

## Demo

Wersja demo jest automatycznie publikowana na GitHub Pages po wykonaniu push na gałąź dev.

Aby opublikować zmiany na demo:

```bash
git add .
git commit -m "opis zmian"
git push origin dev
```

Po wykonaniu push uruchamia się automatyczny proces budowania i wdrażania aplikacji za pomocą GitHub Actions.

Aktualna wersja demo jest dostępna pod adresem:

https://zyzik1248.github.io/kalkulator-darowizn-2/

## Technologie

Kalkulator został przygotowany w **React + TypeScript** z wykorzystaniem **Vite** oraz **SCSS**.

## Uruchomienie projektu

### Wymagania

* **Node.js** 24.19.0
* **npm**

### Instalacja

Aby zainstalować wymagane zależności, uruchom:

```bash
npm install
```

### Uruchomienie w trybie developerskim

```bash
npm run dev
```

Aplikacja zostanie uruchomiona pod adresem wyświetlonym przez Vite.

### Build produkcyjny

```bash
npm run build
```

## Testy

Testy projektu można uruchomić za pomocą:

```bash
npm run test
```
