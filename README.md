# Kalkulator darowizn

Kalalkulator darowizn do odliczenia od PIT/CIT na stronę Klubu Jagiellońskiego. Możesz zobaczyć go pod adresem: https://klubjagiellonski.pl/kalkulator-darowizn/  
Element zbudowany w formie czystego web component ([https://www.webcomponents.org/introduction](https://www.webcomponents.org/introduction)) bez użycia frameworków.

### `npm install`

Po pobraniu repozytorium niebędne jest pobranie zewnętrznych pakietów używanych przez kalkulator.

### `npm run dev`

Uruchamia kalkulator lokalnie w środowisku Vite pod standardowym adresem http://localhost:5173 (równoważne z http://127.0.0.1:5173).

### `npm run build`

Tworzy katalog build z plikami w wersji produkcyjnej.

### `npm run unit` lub `npm run unitw`

Uruchamia testy funkcji liczących kalkulatora w Mocha. Sprawdza różne warianty plików

### `npm run e2e`

Uruchamia testy wizualne kalkulatora w Cypress i Chrome. Sprawdza, czy wszystkie niezbędne elementy są wyświetlane oraz czy wyniki kalkulatora dla wybranych danych są zgodne z danymi wprowadzonymi w polach tekstowych.

# Funkcja licząca

**X** = dochód/przychód roczny
**Y** = maksymalna kwota darowizn możliwa do odliczenia od podatku
**Z** = kwota, o którą zmniejszy się podatek do zapłacenia (PIT lub CIT) w wyniku odliczenia darowizn
**Z1** = podatek bez odliczenia darowizn
**Z2** = podatek przy uwzględnieniu darowizn
**Z** = **Z1** - **Z2**

## CIT

Y = 0.1 × X (10% dochodu możliwe do odliczenia)  
Z = 0.09 × Y (dla CIT "małych podatników", poniżej 1,200,000 EUR, wg. kursu z dnia 1.10.2021]  
 = 0.19 × Y (standardowy CIT 19% powyżej ww. kwoty)

Notatki: standardowa stawka CIT to 19%; 9% to stawka - w przypadku małych podatników lub podatników rozpoczynających działalność, od przychodów (dochodów) innych niż z zysków kapitałowych.

mały podatnik - oznacza to podatnika, u którego wartość przychodu ze sprzedaży (wraz z kwotą należnego podatku od towarów i usług) nie przekroczyła w poprzednim roku podatkowym wyrażonej w złotych kwoty odpowiadającej równowartości 1 200 000 euro; przeliczenia kwot wyrażonych w euro dokonuje się według średniego kursu euro ogłaszanego przez Narodowy Bank Polski na pierwszy dzień roboczy października poprzedniego roku podatkowego, w zaokrągleniu do 1000 zł;
źródła: https://www.podatki.gov.pl/cit/stawki-podatkowe/, https://www.podatki.gov.pl/cit/ulgi-i-odliczenia/darowizny/darowizny-cit-na-ppp/, https://ksiegowosc.infor.pl/podatki/cit/cit/podatnicy-i-zakres-opodatkowania/4703385,Limity-przychodow-uprawniajace-do-9-stawki-CIT-w-2021-r.html

## PIT

Y = 0.06 × X (6% dochodu możliwe do odliczenia, jednak tylko jeśli (X-Y) >= 30000, czyli kwota wolna)  
 = 0 (w przypadku, kiedy dochód nie przekracza kwoty wolnej, odliczenie nie ma sensu)

### Wysokość podatku PIT (bez darowizny): (zmienna Z1)

jeśli X [dochód, tutaj traktowany jako podstawa opodatkowania] jest  
<=30000zł: Z1 = 0  
30 001 – 120 000: Z1 = 0,12 × X - KW1  
120 001 i więcej: Z1 = 0,32 × X + 10800zł

### Wysokość podatku PIT (z odliczeniem darowizny): (zmienna Z2)

jeśli X-Y [dochód minus darowizna] jest:  
<=30000zł: Z2 = 0  
8 001 – 13 000: Z2 = 0,17 × (X-Y) - KW1  
13 001 – 85 528 zł: Z2 = 0,17 × (X-Y) - 525,12 zł  
85 529 zł – 127 000: Z2 = 0,17 × 85528zł + 0.32(X-Y-85528zł) - KW2  
127 001 i więcej: Z2 = 0,17 × 85528zł + 0.32(X-Y-85528zł)

gdzie:  
kwota wolna 1: KW1 = 1 360 zł - (834,88zł × (X-Y-8000 zł) ÷ 5000 zł)  
kwota wolna 2: KW2 = 525,12 zł - (525 zł 12 gr × (X-Y-85528 zł) ÷ 41472 zł)

Notatki:  
(17% podatku do 85 528 zł dochodu, a powyżej tej kwoty - 32%)  
1 zł – 8000 zł – kwota wolna od podatku wynosi 8000 zł;  
8000 zł – 13 000 zł – kwota wolna to wynik następującego równania: 1 360 zł – [834,88 zł x (podstawa obliczenia podatku – 8.000 zł) : 5.000 zł];  
13 000 zł – 85 528 zł – kwota wolna wynosi 525,12 zł;  
85 528 zł – 127 000 zł – kwota wolna to wynik następującego równania: 525,12 zł – [525,12 zł x (podstawa obliczenia podatku – 85.528 zł): 41.472 zł];  
od 127 000 zł – kwoty wolnej od podatku brak.

Źródła: https://poradnikprzedsiebiorcy.pl/-jak-obliczyc-podatek-dochodowy, https://poradnikprzedsiebiorcy.pl/-nowa-skala-podatkowa-od-2020-roku-obnizka-do-17

## PIT liniowy

Podatnikom rozliczającym się według liniowej stawki PIT co do zasady nie przysługuje odliczenie darowizn od dochodu.

## Ryczałt

W przypadku podatników PIT rozliczających się ryczałtem: masz prawo do odliczenia od podstawy darowizn w wysokości 6% dochodu. Aby wyliczyć maksymalną kwotę darowizn, którą możesz odliczyć, pomnóż swój roczny dochód razy 6%. Z kolei jeśli chcesz dowiedzieć się, o ile mniej podatku zapłacisz - przemnóż kwotę darowizn przez Twoją stawkę podatku ryczałtowego.

### Widzisz błąd? Napisz do nas:

Bartosz Paszcza, bartosz.paszcza {at} klubjagiellonski.pl
