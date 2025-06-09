# 1. Základní v čase spojité signály a jejich vlastnosti, vzorkování, kvantizace, číselné řady a jejich vlastnosti, základní operace.
### Základní charakteristika spojitých signálů
- **Definice**: Spojité signály jsou spojitou funkcí času popř. frekvence
- **Popis**: Matematický výraz, graficky nebo tabulkou hodnot
- **Poznámka**: Reálné signály se obtížně popisují, často se vytváří aproximace nebo modely

### Klasifikace spojitých signálů
- **Dle časové omezenosti**:
  - Konečné - časově omezené
  - Nekonečné:
    - Levostranné: y(t)=0 pro t>a
    - Pravostranné: y(t)=0 pro t<a
    - Kauzální: y(t)=0 pro t<0
    - Nekauzální
- **Dle periodicity**:
  - Periodické: opakují se po určitém čase (periodě) - x(t) = x(t+nTp)
  - Neperiodické: jednostranné nebo časově omezené signály nemohou být periodické

### Důležité signály a jejich vlastnosti

#### Sinusoida

.


.




[//]: # (- **Rovnice**: y&#40;t&#41; = A·sin&#40;Ωt+φ&#41;)

[//]: # (  - A - amplituda)

[//]: # (  - Ω - úhlová frekvence [rad/sec])

[//]: # (  - φ - fáze [rad])

[//]: # (- **Vztahy**:)

[//]: # (  - F = Ω/&#40;2π&#41; - frekvence [Hz])

[//]: # (  - T = 1/F = 2π/Ω - perioda [s])

[//]: # (  - φ = 2πFt₀ = Ωt₀ - kde t₀ je časový posun)

[//]: # (- **Vlastnosti**:)

[//]: # (  - Periodická s periodou T=1/F)

[//]: # (  - Spojité sinusoidy s různou frekvencí jsou vždy různé)

[//]: # (  - S rostoucí frekvencí roste počet oscilací v daném časovém intervalu)

[//]: # (  - Sinusoida a kosinus jsou stejné signály, posunuté o 90°)

[//]: # (  - Odezva lineárních systémů na harmonický vstup je vždy harmonická se stejnou frekvencí)

[//]: # (#### Komplexní exponenciála)

[//]: # (- **Vztah se sinusoidou**: x₍ₐ₎&#40;t&#41; = Ae^&#40;jΩt+φ&#41; = Ae^jφe^jΩt)

[//]: # (- **Eulerovy vztahy**:)

[//]: # (  - e^jΩt = cos&#40;Ωt&#41; + j·sin&#40;Ωt&#41;)

[//]: # (  - cos&#40;Ωt&#41; = &#40;e^jΩt + e^-jΩt&#41;/2)

[//]: # (  - sin&#40;Ωt&#41; = &#40;e^jΩt - e^-jΩt&#41;/&#40;2j&#41;)

#### Exponenciální funkce

.


.



#### Jednotkový skok
- **Definice**:
  - u(t) = 0 pro t<0
  - u(t) = 1 pro t>0
  - Pro t=0 není definován (Heavisideův skok definuje u(0)=0.5)

#### Lineární funkce (ramp)
- **Definice**: r(t) = t·u(t) = 0 pro t<0; t pro t≥0

#### Diracův (jednotkový) impuls δ(t)
- **Definice**: Limitní případ obdélníkové funkce - vysoká, úzká špička s konečnou plochou (=1)

.



.



#### Funkce sinc
- **Definice**: sinc(t) = sin(πt)/(πt)
- **Vlastnosti**:
  - Maximum = 1 pro t=0
  - Prochází nulou pro t = ±1, ±2, ±3, ...
  - Tlumená oscilace


## 1.2. VZORKOVÁNÍ A KVANTIZACE

### Vzorkování (sampling)
- **Definice**: Proces, kterým je spojitý signál x(t) transformován na posloupnost diskrétních vzorků x(nTs)
- **Parametry**:
  - Ts - perioda vzorkování
  - fs = 1/Ts - vzorkovací frekvence

#### Ideální vzorkování
- **Matematický popis**: xᷤ(t) = x(t)·i(t) = x(t)·∑δ(t-nTs) = ∑x(nTs)·δ(t-nTs)
- **Vlastnosti**: Vzorkovaný signál je vážený součet impulsů, kde váha je hodnota analogového signálu

####  Vzorkovací (Shannonova) věta
- **Formulace**: Pokud je signál x(t) spojitý v čase a obsahuje pouze složky s frekvencí menšími než fmax, pak může být rekonstruován z posloupnosti diskrétních vzorků, pokud fs > 2·fmax
- **Nyquistova frekvence**: fN = fmax - kritická vzorkovací frekvence
- **Nyquistův interval**: [-fs/2, fs/2] - základní frekvenční pásmo

#### Aliasing
- **Definice**: Jev, ke kterému dochází, pokud je signál vzorkován frekvencí menší než Nyquistova
- **Důsledek**: V rekonstruovaném signálu se místo původní frekvence objeví falešná (alias) frekvence
- **Vztah**: falias = f₀ - M·fs, kde M je celé číslo transformující falias do základního pásma (-0.5fs < falias < 0.5fs)
- **Řešení**: Použití anti-aliasing filtru (analogová dolní propust) před A/D převodníkem

#### Vzorkování frekvenčně omezeného signálu
- **Nyquistova věta**: fs ≥ 2·fH (fH je nejvyšší frekvence v signálu)
- **Pásmové signály**: Pro signál v pásmu B=fH-fL, kde fL>0, lze využít pásové vzorkování
- **Minimální vzorkovací frekvence**: fs ≥ 2·fH/N, kde N=int(fH/B) a 2fL < fs/k < 2fH pro k=1,2,...,N

#### Druhy vzorkování
- **Přirozené vzorkování**: Průchod signálu přes periodicky spínaný vypínač
- **Vzorkování s pamětí (Zero-order hold)**: Držení hodnoty vzorku do příchodu dalšího (používané v praxi)

### A/D převodníky
- **Typy**:
  - **Paralelní (flash)**: Všechny bity najednou, rychlý ale drahý
  - **S postupnou aproximací**: Postupné určování bitů od MSB k LSB
  - **Sigma-delta**: Vysoké rozlišení za nízkou cenu, složitý software

### Kvantizace
- **Definice**: signál s „nekonečnou“ přesností  konvertován na signál s konečnou přesností (obvykle binární čísla) 

#### Typy kvantizátorů
- **Unipolární**: Konvertuje hodnoty z intervalu <0, xmax>
- **Bipolární**: Konvertuje hodnoty z intervalu <-x₁, x₂>

#### Kvantizační chyba
- **SNR (Signal-to-Noise Ratio)**: Poměr výkonu signálu k výkonu šumu vzniklého kvantizací
- **Výpočet**: SNRdB = 10·log10(E(x²)/E(eq²)) [dB]
- **Pro sinusoidu s amplitudou A kvantovanou do m bitů**: SNRdB = 1.76 + 6.02·m [dB]

### Rekonstrukce signálu (D/A převod)
- **Princip**: Doplnění chybějící části signálu (interpolace mezi vzorky)

#### Ideální rekonstrukce
- **Interpolační funkce**: sinc(t/Ts) = sin(πt/Ts)/(πt/Ts)
- **Vlastnosti**: Analogový signál je vytvořen jako vážený součet posunutých sinc funkcí
- **Omezení**: V praxi nepoužitelná - funkce sinc není kauzální

#### Praktické interpolační funkce
- **Schodovitá (staircase)**: Hodnota je rovna předchozí vzorkované hodnotě (nejrychlejší)
- **Lineární**: Hodnoty mezi vzorky jsou určeny lineární aproximací
- **Kosinová**: Lepší aproximace než lineární

#### D/A převodníky
- **Přímé**: Vstupní datové slovo přímo převedeno na výstupní napětí (proud)
  - S váhovou strukturou odporové sítě
  - S příčkovou strukturou
- **Nepřímé**: Převod rozdělen na dvě části
  - S pulzně šířkovou modulací (PWM)
  - S modulací hustotou pulzů (PDM)

## 1.3. DISKRÉTNÍ SIGNÁLY A ČÍSELNÉ ŘADY

### Charakteristika diskrétních signálů
- **Definice**: Funkce nezávislé proměnné, signál není definován mezi vzorky
- **Popis**: Funkce, tabulka hodnot, posloupnost, konečná nebo nekonečná posloupnost

### Charakteristiky diskrétního signálu
- **Diskrétní součet**: SD[n] = ∑x[n]
- **Absolutní součet**: SA[n] = ∑|x[n]|
- **Kumulativní součet**: SC[n] = ∑x[k] pro k=0 až n
- **Energie**: E = ∑|x[n]|² pro neperiodické signály
- **Průměrná hodnota**: xav = (1/N)·∑x[m] pro periodické signály
- **Průměrný výkon**: P = (1/N)·∑|x[m]|² pro periodické signály

### Klasifikace diskrétních signálů
- **Dle časové omezenosti**: Levostranné, pravostranné, kauzální, antikauzální
- **Dle periodicity**: Periodické x[n] = x[n+kN], kde N je perioda

### Základní diskrétní signály

#### Jednotkový impuls

.
.
.

#### Jednotkový skok

.

.

#### Lineární funkce (ramp)

.


.



#### Diskrétní pulzní signály
- **Obdélníkový pulz**: rect(n/N) = 1 pro |n|≤N/2, rect(n/N) = 0 jinak
- **Trojúhelníkový pulz**: tri(n/N) = 1-|n|/N pro |n|≤N, tri(n/N) = 0 jinak
- **Diskrétní funkce sinc**: sinc(n/N) = sin(πn/N)/(πn/N), sinc(0) = 1

#### Diskrétní sinusoida

.


.


## 1.4 Základní operace s diskrétními signály

#### Posun signálu
- **Definice**: y[n] = x[n-k]
  - k>0: zpoždění signálu o k vzorků (posun doprava)
  - k<0: předsunutí signálu o |k| vzorků (posun doleva)

#### Otočení signálu
- **Definice**: y[n] = x[-n] - časově otočená verze x[n] kolem počátku

#### Decimace signálu
- **Definice**: y[n] = x[Nn] - každý N-tý vzorek původního signálu
- **Vlastnost**: Výsledný signál je N-krát kratší odstraněním určitých vzorků

#### Interpolace signálu
- **Definice**: y[n] = x[n/N] - prodloužení signálu přidáním vzorků
- **Typy**:
  - "Zero interpolation" (up-sampling): y[n] = x[n/N] pro n dělitelné N, jinak y[n] = 0
  - "Step interpolation": Přidané vzorky mají hodnotu předchozího vzorku
  - "Linear interpolation": Přidané vzorky vytváří lineární funkci s okolními vzorky

#### Neceločíselné zpoždění
- **Implementace**: Pomocí decimace a interpolace
- **Vzorec**: y[n] = x[(n-M)/N]

#### Symetrie signálu
- **Symetrie (sudá)**: x[n] = x[-n]
- **Antisymetrie (lichá)**: x[n] = -x[-n]
- **Rozklad signálu**: x[n] = xe[n] + xo[n]
  - xe[n] = 0.5·(x[n] + x[-n]) - sudá část
  - xo[n] = 0.5·(x[n] - x[-n]) - lichá část



-----------------------------------------------------------------------------------------------------


# 2. Zpracování signálů v časové oblasti, LTI systémy, popis, impulzní odezva, konvoluce, korelace, autokorelační funkce

## Diskrétní systémy

**Základní definice:**
- Zpracovává časově diskrétní vstupní signál x[n] → výstupní signál y[n]
- Kategorie: lineární/nelineární, časově invariantní/variantní, kauzální/nekauzální, statický/dynamický

**Linearita:**
- Systém splňuje: S{A·x₁[n] + B·x₂[n]} = A·y₁[n] + B·y₂[n]
- Princip superpozice platí

**Časová invariance:**
- Posunutý vstup → posunutý výstup: x[n-m] → y[n-m]
- Odezva závisí pouze na tvaru vstupu, ne na čase přivedení

## LTI (Linear Time-Invariant) systémy

**Charakteristika:**
- Splňují linearitu + časovou invarianci
- Nejdůležitější třída systémů pro zpracování signálů
- Lze popsat: diferenční rovnicí, impulzní odezvou, přenosovou funkcí

**Test LTI systému:**
1. Diferenční rovnice má konstantní koeficienty, bez konstantních termů
2. Žádné součiny vstupů/výstupů
3. Koeficienty nejsou funkcí n

**Příklady:**
- LTI: y[n] - 0.6y[n-1] = 4x[n]
- Ne-LTI: y[n] - 2ny[n-1] = x[n] (časově variantní)

## Popis LTI systémů

### 1. Diferenční rovnice
**Obecný tvar (ARMA filtr):**
```
y[n] + A₁y[n-1] + ... + Aₙy[n-N] = B₀x[n] + B₁x[n-1] + ... + Bₘx[n-M]
```

**Typy:**
- FIR (MA): pouze vstupní termy → y[n] = B₀x[n] + B₁x[n-1] + ... + Bₘx[n-M]
- IIR (AR): zpětná vazba → y[n] + A₁y[n-1] + ... + Aₙy[n-N] = B₀x[n]

### 2. Impulzní odezva h[n]
- Odezva na jednotkový impuls δ[n]
- Pro FIR: h[n] = {B₀, B₁, ..., Bₘ}
- Pro IIR: řešení homogenní rovnice s h[0]=1

### 3. Přenosová funkce H(z)
```
H(z) = Y(z)/X(z) = (B₀ + B₁z⁻¹ + ... + Bₘz⁻ᴹ)/(1 + A₁z⁻¹ + ... + Aₙz⁻ᴺ)
```

## Impulzní odezva

**Výpočet pro FIR filtr:**
- Přímo z koeficientů: h[n] = {B₀, B₁, ..., Bₘ}
- Délka M+1 vzorků

**Výpočet pro IIR filtr:**
1. Řešit h[n] + A₁h[n-1] + ... + Aₙh[n-N] = δ[n]
2. Počáteční podmínka h[0]=1, ostatní h[-k]=0
3. Rekurzivní výpočet

**Vlastnosti:**
- Kauzální systém: h[n]=0 pro n<0
- Stabilní systém: Σ|h[n]| < ∞

## Konvoluce

**Definice:**
```
y[n] = x[n] * h[n] = Σ x[k]h[n-k] = Σ h[k]x[n-k]
```

**Vlastnosti:**
- Komutativní: x[n] * h[n] = h[n] * x[n]
- Asociativní: (x[n] * h[n]) * g[n] = x[n] * (h[n] * g[n])
- Distributivní: x[n] * (h[n] + g[n]) = x[n] * h[n] + x[n] * g[n]

**Metody výpočtu:**

1. **Sčítání po sloupcích:**
   - Zapsat x[n] pod h[n]
   - Násobit každý vzorek x[n] celým h[n]
   - Sečíst sloupce

2. **Sliding-strip:**
   - Překlopit x[n] → x[-n]
   - Posunout a násobit protilehlé vzorky
   - Sčítat součiny

3. **Násobení polynomů:**
   - x[z] · h[z] = y[z]
   - Koeficienty výsledku = konvoluce

**Příklad použití:**
- Filtrace signálů (FIR/IIR filtry)
- Rozmazání obrazu (2D konvoluce)
- Reverb v audio zpracování

## Korelace

**Vzájemná korelace:**
```
rₓₕ[n] = x[n] ⋆ h[n] = Σ x[k]h[k-n] = Σ x[k+n]h[k]
```

**Vztah ke konvoluci:**
```
rₓₕ[n] = x[n] * h[-n]
```

**Autokorelace:**
```
rₓₓ[n] = x[n] ⋆ x[n] = Σ x[k]x[k-n]
```

**Vlastnosti autokorelace:**
- Sudá funkce: rₓₓ[n] = rₓₓ[-n]
- Maximum v n=0: rₓₓ[n] ≤ rₓₓ[0]
- rₓₓ[0] = energie signálu

## Aplikace korelace

**1. Detekce signálu v šumu:**
- Radar: vysílá x[n], přijímá s[n] = αx[n-D] + šum
- Korelací rₛₓ[n] najdeme zpoždění D → vzdálenost

**2. Měření podobnosti:**
- Rozpoznávání vzorů
- Synchronizace v komunikacích
- Biometrická identifikace

**3. Analýza periodicity:**
- Autokorelace periodického signálu má vrcholy v násobcích periody
- Detekce skrytých period v zašuměných datech

**4. Wiener-Khinchinova věta:**
- Autokorelace ↔ výkonová spektrální hustota (Fourierův pár)

## Praktické implementace

**Blokové schéma systému:**
- Přímá forma I: oddělené vstupní/výstupní zpožďovací linky
- Přímá forma II: společná zpožďovací linka (efektivnější)
- Kaskádní/paralelní realizace

**Výpočetní složitost:**
- Přímá konvoluce: O(N·M)
- FFT konvoluce: O(N log N) pro dlouhé signály
- Překryvná metoda (overlap-add/save) pro real-time

**Příklady použití v praxi:**
- Audio efekty (reverb, echo)
- Obrazové filtry (rozostření, detekce hran)
- Komunikační systémy (equalizace kanálu)
- Biomedicínské signály (EKG/EEG filtrace)
- Seismologie (detekce zemětřesení)

# 3. Zpracování signálů ve frekvenční oblasti

## Základní princip transformace
- **Transformace** → zpracování v transformované oblasti → **inverzní transformace**
- Převod signálu z časové do frekvenční oblasti umožňuje efektivnější zpracování
- x(n) → X(k) → zpracování → X'(k) → x'(n)

## Typy Fourierových transformací

| Časová oblast                       | Frekvenční oblast                   | Transformace |
|-------------------------------------|-------------------------------------|--------------|
| Aperiodický spojitý x(t)            | Aperiodický spojitý X(f)            | FT           |
| Periodický x(t), perioda T          | Diskrétní X[k], vzorkování 1/T      | FS           |
| Diskrétní x[n], vzorkování ts       | Periodický X(f), perioda 1/ts       | DTFT         |
| Diskrétní periodický x[n], N vzorků | Diskrétní periodický X[k], N vzorků | DFT          |

## Diskrétní Fourierova transformace (DFT)

### Definice
**Přímá transformace:**
$$X_{DFT}[k] = \sum_{n=0}^{N-1} x[n]e^{-j2\pi nk/N}, \quad k = 0,1,...,N-1$$

**Inverzní transformace:**
$$x[n] = \frac{1}{N}\sum_{k=0}^{N-1} X_{DFT}[k]e^{j2\pi nk/N}, \quad n = 0,1,...,N-1$$

### Polární tvar DFT
- **Magnituda:** $|X[k]| = \sqrt{X_{real}^2[k] + X_{imag}^2[k]}$
- **Fáze:** $\phi[k] = \arctan\left(\frac{X_{imag}[k]}{X_{real}[k]}\right)$
- **Výkonové spektrum:** $X_{PS}[k] = |X[k]|^2$

### Klíčové vlastnosti DFT

1. **Linearita:** $k_1x_1[n] + k_2x_2[n] \leftrightarrow k_1X_1[k] + k_2X_2[k]$

2. **Periodičnost:** X[k] i x[n] jsou periodické s periodou N

3. **Časový posun:** $x[n-n_0] \leftrightarrow e^{-j2\pi kn_0/N}X[k]$
   - Posun v čase způsobí změnu fáze

4. **Frekvenční posun:** $e^{j2\pi k_0n/N}x[n] \leftrightarrow X[k-k_0]$

5. **Periodická konvoluce:** $x_1[n] * x_2[n] \leftrightarrow X_1[k] \cdot X_2[k]$

6. **Symetrie pro reálný signál:**
   - $X[k] = X^*[N-k]$ (komplexně sdružená symetrie)
   - $|X[k]| = |X[N-k]|$ (sudá magnituda)
   - $\phi[k] = -\phi[N-k]$ (lichá fáze)

7. **Parsevalova věta:** $\sum_{n=0}^{N-1}|x[n]|^2 = \frac{1}{N}\sum_{k=0}^{N-1}|X[k]|^2$

### Důležité DFT páry
- **Impulz:** $\{1,0,0,...,0\} \leftrightarrow \{1,1,1,...,1\}$
- **Konstanta:** $\{1,1,1,...,1\} \leftrightarrow \{N,0,0,...,0\}$
- **Sinusoida:** $\cos(2\pi k_0n/N) \leftrightarrow 0.5N[\delta[k-k_0] + \delta[k-(N-k_0)]]$

## Praktické aspekty DFT

### Rozlišení DFT
- **Frekvenční rozlišení:** $\Delta f = f_s/N$ 
- Zvětšení N → lepší frekvenční rozlišení
- Zero-padding zvětšuje hustotu vzorků, ale ne skutečné rozlišení!

### Prosakování spektra (Spectral Leakage)
Spektrální průsak vzniká, když analyzujeme **konečný úsek** signálu místo nekonečně dlouhého signálu. Energie z jedné frekvence se "rozlije" do sousedních frekvenčních složek.

### 🔍 Proč vzniká?

**Matematická příčina:**
Když "vystřihneme" konečný úsek z nekonečného signálu, efektivně ho **násobíme obdélníkovým oknem**:

```
x_observed[n] = x_infinite[n] × w_rectangular[n]
```

Ve frekvenční oblasti to znamená **konvoluci**:
```
X_observed(f) = X_infinite(f) ★ W_rectangular(f)
```

**Spektrum obdélníkového okna** je **sinc funkce** s charakteristickými vedlejšími laloky, které způsobují průsak.

### 📊 Praktické důsledky

**Problémy:**
- **Maskování slabých signálů** - silný signál "přebije" slabší v okolních frekvencích
- **Nepřesná měření** - amplitudy nejsou správné kvůli rozptýlené energii
- **Falešné frekvence** - objevují se spektrální složky, které původně neexistovaly

**Kdy je to nejhorší:**
- Při analýze krátkých úseků signálu
- Když frekvence signálu není "celým násobkem" frekvenčního rozlišení
- U signálů s velkými rozdíly v amplitudách

### Vyhlazovací okna
| Okno      | Hlavní lalok  | Postranní laloky     | Použití                    |
|-----------|---------------|----------------------|----------------------------|
| Pravoúhlé | Úzký (2/N)    | Vysoké (-13 dB)      | Přesné frekvence           |
| Bartlett  | Střední (4/N) | Střední (-27 dB)     | Kompromis                  |
| Hann      | Střední (4/N) | Nízké (-32 dB)       | Obecné použití             |
| Hamming   | Střední (4/N) | Velmi nízké (-43 dB) | Potlačení prosakování      |
| Blackman  | Široký (6/N)  | Nejnižší (-58 dB)    | Vysoké dynamické rozlišení |

### FFT (Fast Fourier Transform)
- Efektivní algoritmus pro výpočet DFT
- Složitost: O(N log N) místo O(N²)
- Podmínka: N = 2^m
- **Decimace v čase (DIT)** nebo **decimace ve frekvenci (DIF)**

## Použití DFT

### 1. Spektrální analýza signálů
- **Periodogram:** $P[k] = \frac{1}{N}|X_{DFT}[k]|^2$
- Určení frekvenčního obsahu signálu
- Detekce periodických složek

### 2. Filtrace ve frekvenční oblasti
- Násobení spektra filtrem: $Y[k] = H[k] \cdot X[k]$
- Efektivní pro dlouhé filtry
- Realizace ideálních filtrů (dolní/horní propust)

### 3. Korelace a konvoluce
- Rychlý výpočet pomocí FFT
- $x[n] * h[n] \leftrightarrow X[k] \cdot H[k]$

### 4. Zpracování digitalizovaných snímků
- **2D DFT** pro obrazy: $X[k,l] = \sum_m\sum_n x[m,n]e^{-j2\pi(km/M + ln/N)}$
- Aplikace:
  - Komprese obrazu (JPEG)
  - Filtrace šumu
  - Detekce hran
  - Registrace obrazů

## Časově-frekvenční analýza

### STFT (Short-Time Fourier Transform)
- Signál rozdělen na překrývající se bloky
- Každý blok násoben oknem a transformován pomocí FFT
- **Výstup:** Spektrogram - 2D reprezentace (čas × frekvence)
- **Použití:** Analýza řeči, hudby, nestacionárních signálů

### Waveletová transformace
- Proměnná časově-frekvenční rozlišení
- Krátké wavelety pro vysoké frekvence, dlouhé pro nízké
- **CWT** (spojitá) vs **DWT** (diskrétní)
- **Použití:** Detekce singularit, komprese, odstranění šumu

### Matching Pursuit
- Adaptivní dekompozice na Gaborovy atomy
- Iterativní hledání nejlepší shody ve slovníku funkcí
- **Použití:** Analýza EEG/ERP, komprese signálů

## Příklady aplikací

1. **Audio zpracování**
   - Ekvalizace, efekty
   - Rozpoznávání řeči
   - Komprese (MP3)

2. **Biomedicínské signály**
   - EEG/EKG analýza
   - Detekce arytmií
   - fMRI zpracování

3. **Komunikace**
   - OFDM modulace
   - Spektrální analýza
   - Adaptivní filtrace

4. **Obrazové zpracování**
   - Komprese JPEG
   - Restaurace obrazu
   - Rozpoznávání vzorů

## Praktické tipy
- Vždy zvažte použití okna pro potlačení prosakování
- Pro real-time aplikace preferujte FFT před DFT
- Pamatujte na Nyquistovu frekvenci: $f_{max} = f_s/2$
- Pro nestacionární signály použijte STFT nebo wavelety

# 4. Paralelismus na úrovni instrukcí, predikce skoků, paměťová závislost, falešné sdílení a transakční paměť (Intel TSX) – jejich princip a význam pro urychlení sekvenčních a konkurenčních částí algoritmů.

Paralelismus na úrovni instrukcí (Instruction-Level Parallelism) je technika, která umožňuje souběžné zpracování instrukcí v rámci jednoho procesorového jádra.

### Out-of-order execution
- Jádro provádí prefetch instrukcí a hledá datové závislosti mezi nimi
- Instrukce se poté přeskládají tak, aby nezávislé instrukce mohly být provedeny paralelně
- Toto přeskládání je transparentní pro uživatele - výsledek je vždy takový, jako by byly instrukce provedeny sekvenčně

### Registry renaming
- Fyzické registry jsou přejmenovány, aby se snížily datové závislosti mezi instrukcemi
- Procesor má více fyzických než logických registrů, které programátor může přímo referencovat
- Díky přejmenování registrů lze eliminovat falešné závislosti (false dependencies) a zvýšit paralelismus

### Execution pipeline
- Instrukce se zpracovává v několika fázích (fetch, decode, execute, write-back)
- Každá fáze využívá jinou část hardware procesoru
- Umožňuje provádět více instrukcí současně - každá je v jiné fázi zpracování
- Čím delší pipeline, tím více instrukcí může být zpracováváno současně, ale o to větší problémy způsobují skoky

## Predikce skoků (Branch Prediction)

Predikce skoků je technika, která řeší problém s instrukcemi podmíněných skoků v pipeline procesoru.

### Spekulativní provádění instrukcí
- Pokud procesor narazí na podmíněný skok, může buď čekat na vyhodnocení podmínky (což je neefektivní), nebo odhadnout výsledek a pokračovat dále
- Pokud byl odhad správný, ušetří se čas
- Pokud byl odhad špatný, je nutné výsledky zahodit a začít od bodu skoku znovu (pipeline flush)
- Větší pipeline znamená větší ztráty při chybné predikci

### Branch Target Buffer (BTB)
- Ukládá saturating counter (2 bity) pro N posledních podmínek
- Stav 0-1: predikuje, že se neskočí, stav 2-3: predikuje skok
- Při správné predikci skoku se counter zvýší, při správné predikci neskočení se sníží
- Při špatné predikci se counter změní opačným směrem

### Two-level adaptive branch prediction
- Vylepšení jednoduchého BTB
- Pro každou podmínku udržuje pole saturating counterů podle vzorce posledních N provedení této podmínky
- 4 bity pro pattern (posledních 16 stavů)
- Umožňuje lépe predikovat komplexní vzorce větvení

### Metody zlepšení predikce skoků
- Moderní procesory používají neuronové sítě a kombinace prediktivních přístupů
- C++20 atribut `[[likely]]` umožňuje programátorovi napovědět procesoru, která větev podmínky je pravděpodobnější
- Snaha minimalizovat počet podmíněných skoků v kritických částech kódu

## Paměťová závislost (Memory Dependency)

### Data Dependency
- Instrukce závisí na datech z předchozí instrukce
- Např. `x = x + y` - hodnota x z předchozí instrukce je potřeba pro tuto instrukci
- Limituje možnosti paralelního zpracování instrukcí

### Memory Dependency
- Load instrukce čeká na dokončení store instrukce do stejné paměťové adresy
- Typicky ve stylu `for i in range(len(x)): x[i] = x[i-1] + y[i]`
- Lze řešit pomocnou proměnnou (registrem): `temp = x[0]; for i in range(1, len(x)): temp = temp + y[i]; x[i] = temp`

### False Dependency
- Procesor detekuje závislost, která ve skutečnosti neexistuje
- Např. `SUB EAX, EAX` - procesor předpokládá závislost, protože se čte i zapisuje do stejného registru, ale ve skutečnosti jen chceme vynulovat EAX
- Pro některé instrukce (např. XOR) dokáže procesor false dependency detekovat
- Lze eliminovat pomocí register renaming

## Falešné sdílení (False Sharing)

Falešné sdílení je problém, který vzniká v systémech se sdílenou pamětí, kdy více procesorů pracuje s daty, která jsou uložena ve stejné cache line.

- Paměť v cache procesoru je rozdělena na "cache lines" (typicky 64 bajtů)
- Cache coherence protokoly pracují na úrovni celých cache lines, ne jednotlivých proměnných
- Falešné sdílení nastává, když více jader přistupuje k různým proměnným ve stejné cache line
- Pokud jedno jádro změní hodnotu proměnné v cache line, celá cache line musí být invalidována v cache ostatních jader
- To vede k velkému zpomalení, protože jádra musí neustále aktualizovat své cache

### Důsledky falešného sdílení
- Může způsobit, že paralelizovaný algoritmus běží pomaleji než sekvenční verze
- Teoreticky může být pomalejší než sekvenční provádění

### Řešení falešného sdílení
- Zarovnání dat tak, aby proměnné používané různými vlákny byly v různých cache lines
- Použití thread-local storage pro mezivýsledky
- Padding struktur (přidání nevyužitých proměnných) pro zajištění, že se data používaná různými jádry nedostanou do stejné cache line

## Transakční paměť (Intel TSX)

Transakční paměť je hardwarová podpora pro atomické operace nad sdílenou pamětí, která usnadňuje implementaci synchronizace v paralelních programech.

### Problém sdílené paměti
- Naivní přístup: jeden globální zámek pro přístup ke sdílené paměti
  - Snižuje paralelismus, i když procesy přistupují k různým částem paměti
- Jemnější přístup: více zámků pro různé části paměti
  - Složitější implementace, větší režie, stále neoptimální

### Intel TSX (Transactional Synchronization Extensions)
- x86-64 rozšíření pro hardwarovou transakční paměť
- Má dva režimy:

#### Hardware Lock Elision (HLE)
- Kompatibilita se starým kódem, používá prefixy instrukcí XACQUIRE a XRELEASE
- Optimisticky předpokládá, že nedojde ke kolizi mezi vlákny
- Pokud dojde ke kolizi, transakce se zruší a použije se běžný zámek
- Všechny změny provedené v kritické sekci jsou thread-local, dokud transakce úspěšně nedoběhne

#### Restricted Transactional Memory (RTM)
- Používá nové instrukce XBEGIN, XEND a XABORT
- XBEGIN označuje začátek transakce a specifikuje fallback v případě selhání
- Všechny změny provedené v kritické sekci jsou thread-local, dokud transakce úspěšně nedoběhne nebo selže
- Oproti HLE ušetříme jeden CMPXCHG a máme explicitní kontrolu s XABORT

### Výhody transakční paměti
- Kombinuje flexibilitu jemných zámků s jednoduchostí implementace jednoho globálního zámku
- Optimistický přístup - předpokládá, že ke konfliktu nedojde, což je často pravda
- Při konfliktu bezpečně zruší transakci a použije fallback mechanismus

### Nevýhody a omezení
- Velikost transakce je omezena velikostí L1 cache
- Některé instrukce (např. systémová volání) způsobují okamžité selhání transakce
- V minulosti obsahovalo bezpečnostní chyby (např. Spectre), a na některých CPU bylo deaktivováno

## Význam pro urychlení sekvenčních a konkurenčních částí algoritmů

### Urychlení sekvenčních částí
- Paralelismus na úrovni instrukcí umožňuje částečně paralelizovat i sekvenční části kódu
- Predikce skoků snižuje penalizaci způsobenou podmíněnými skoky
- Eliminace datových závislostí a false dependencies umožňuje lepší využití pipeline

### Urychlení konkurenčních částí
- Transakční paměť zjednodušuje implementaci synchronizace a snižuje režii
- Eliminace falešného sdílení výrazně zlepšuje výkon paralelních algoritmů
- Pochopení a optimalizace paměťových závislostí umožňuje efektivnější paralelizaci

### Praktické tipy pro optimalizaci
- Strukturovat data tak, aby se minimalizovalo falešné sdílení (Structure of Arrays vs. Array of Structures)
- Minimalizovat počet podmíněných skoků v kritických částech kódu
- Používat thread-local storage pro mezivýsledky
- Pokud je to možné, využívat transakční paměť pro zjednodušení synchronizace
- Omezit paměťové závislosti vhodným návrhem algoritmů


# 5. Srovnání paradigmat prostředků pro multithreading – např. POSIX, C++11/Intel TBB, OpenCL/C++ AMP.

## POSIX Threads (pthreads)
POSIX Threads je knihovna, která implementuje vlákna podle standardu POSIX. Není objektově orientovaná - pracuje především s funkcemi a je typická pro jazyk C. Dnes je často zastupitelná novějšími řešeními jako C++11 threads.

**Hlavní charakteristiky:**
- Nízkoúrovňová abstrakce
- Procedurální přístup (C rozhraní)
- Manuální správa synchronizace (mutexy, podmínkové proměnné)
- Přenositelnost mezi UNIX systémy
- Vyžaduje manuální správu zdrojů

**Příklad vytvoření vlákna:**
```c
#include <pthread.h>
void* thread_function(void* arg) {...}
int main() {
    pthread_t thread;
    pthread_create(&thread, NULL, thread_function, NULL);
    pthread_join(thread, NULL);
}
```

## C++11 Threads

C++11 přinesl standardní threading API přímo do jazyka C++. Toto API nabízí objektově orientovaný přístup k vláknům s využitím standardních C++ mechanismů jako jsou výjimky a RAII pro správu zdrojů.

**Hlavní charakteristiky:**
- Objektově orientovaný přístup
- Součást standardní knihovny
- Automatická správa zdrojů (RAII)
- Standardizované synchronizační primitivy (std::mutex, std::condition_variable)
- Podpora pro budoucí hodnoty (std::future, std::promise)
- Lambda funkce pro jednodušší definici úloh

**Příklad vytvoření vlákna:**
```cpp
#include <thread>
void thread_function() {...}
int main() {
    std::thread t(thread_function);
    t.join();
}
```

## Intel Threading Building Blocks (TBB)

TBB je součástí oneAPI od Intelu, která implementuje efektivní SMP algoritmy. Místo nízkoúrovňové práce s vlákny nabízí dekompozici na tasky.

**Hlavní charakteristiky:**
- Možnost kombinace se SYCL a OpenCL
- Dekompozice na tasky místo vláken - efektivnější zpracování
- Výpočet tasků řeší scheduler
- Concurrent containery (mohou využít transakční paměť)
- Task stealing scheduler - každé jádro má frontu tasků
- Pokud je jádro nevytížené, bere tasky z jiných jader
- Cache cooling - vlákno na jednom jádře má data v cache

**Příklad paralelního cyklu:**
```cpp
    tbb::parallel_for(0, 1000, [&](int i) {
        data[i] = i * 2;  // Paralelní operace
    });

```

## OpenCL

OpenCL je otevřená platforma pro výpočetní zařízení podporující GPU, CPU, FPGA a další.

**Hlavní charakteristiky:**
- Heterogenní programování (CPU, GPU, FPGA...)
- Host řídí výpočet přes OpenCL API
- Device provádí SIMT kód (kernel)
- Work-item jako jednotka práce (analogie k CUDA threadu)
- Work-group - skupina work-itemů
- Wavefront - work-itemy prováděné paralelně na jednom compute unit

**Hierarchie paměti:**
- Global memory - sdílená mezi všemi work-itemy
- Private memory - privátní pro jeden work-item
- Local memory - sdílení dat mezi work-itemy v work-group
- Constant memory - read-only, optimalizovaná pro paralelní přístup

**Příklad kernelu:**
```c
__kernel void vector_add(__global const float* a, 
                         __global const float* b,
                         __global float* result) {
    int i = get_global_id(0);
    result[i] = a[i] + b[i];
}
```

## C++ AMP (Accelerated Massive Parallelism)

C++ AMP je předchůdce SYCL, poskytuje restrikce kódu na CPU a GPU pomocí restrict()

**Hlavní charakteristiky:**
- Vysokoúrovňový přístup
- Restrikce kódu pro různé akcelerátory
- Jednodušší než OpenCL, ale méně flexibilní
- Zaměřeno na GPU akceleraci

## SYCL

SYCL je C++ framework pro psaní kódu pro ASMP (Asymmetric MultiProcessor), poskytující jednotnou codebase. Je prakticky nadstavbou OpenCL s více ISA v jednom spustitelném souboru a jednotným programováním nezávislým na výrobci.

**Hlavní charakteristiky:**
- Single-source codebase
- Kód pro GPU, FPGA lze napsat přímo ve frameworku
- Vyšší úroveň abstrakce než OpenCL
- Programátor definuje data-dependency graph
- Framework zajistí efektivní alokaci a kopírování bufferů
- Žádné explicitní API volání, pouze definice lambda funkcí s kódem

**Příklad:**
```cpp
    queue.parallel_for(sycl::range<1>(size), [=](sycl::id<1> i) {
        data[i] = i * 2;
    }).wait();

```

## Srovnání paradigmat

1. **Úroveň abstrakce:**
   - POSIX Threads - nejnižší úroveň, manuální správa vláken
   - C++11 Threads - střední úroveň, objektová abstrakce vláken
   - Intel TBB - vysoká úroveň, task-based programování
   - OpenCL - nízká/střední úroveň, heterogenní paralelizace
   - SYCL - vysoká úroveň, abstrakce nad OpenCL

2. **Model paralelizace:**
   - POSIX/C++11 - thread-based (vytváření a správa jednotlivých vláken)
   - TBB - task-based (dekompozice problému na úlohy)
   - OpenCL/SYCL - data-parallel (stejné operace nad různými daty)

3. **Cílový hardware:**
   - POSIX/C++11 - primárně CPU
   - Intel TBB - optimalizováno pro CPU (zejména Intel)
   - OpenCL - heterogenní (CPU, GPU, FPGA, specializované akcelerátory)
   - SYCL - heterogenní s vyšší abstrakcí než OpenCL

4. **Synchronizace:**
   - POSIX - manuální (mutexy, semafory, podmínkové proměnné)
   - C++11 - manuální, ale s vyšší abstrakcí (atomic, future/promise)
   - TBB - implicitní synchronizace mezi tasky
   - OpenCL - barrier (v rámci work-group) a fence (pro load/store)
   - SYCL - implicitní synchronizace pomocí data-dependency grafu

5. **Granularita paralelizace:**
   - POSIX/C++11 - hrubá granularita (vlákna)
   - TBB - jemná granularita (tasky)
   - OpenCL/SYCL - velmi jemná granularita (work-itemy)

## Závěr

Volba technologie závisí na specifických potřebách projektu:

- **POSIX Threads**: pro nízkoúrovňové C aplikace s důrazem na přenositelnost
- **C++11 Threads**: pro moderní C++ projekty s potřebou standardního API
- **Intel TBB**: pro výkonné C++ aplikace s důrazem na efektivní využití CPU
- **OpenCL**: pro heterogenní výpočty na různých typech zařízení
- **SYCL**: pro heterogenní výpočty s moderním C++ přístupem a jednotnou codebází

Trend směřuje k vyšším úrovním abstrakce a deklarativnějšímu přístupu, který umožňuje automatické ladění a optimalizace.

# 6. Přidělování práce v prostředí s distribuovanou pamětí, možnosti urychlení výpočtu a přiřazení procesů na jednotlivé uzly.
## Základní charakteristika distribuovaných systémů

Distribuovaná aplikace je sada kooperujících procesů provádějících specifický výpočet nebo službu, obvykle přes síť. Tyto aplikace mohou být dynamické nebo statické. V systému s distribuovanou pamětí neexistuje globální paměť - každý uzel má vlastní lokální paměť a komunikace probíhá pomocí zpráv, přičemž každý node má své IO pro komunikaci.

Distribuovaný paměťový systém se tedy skládá z uzlů, které komunikují pomocí zpráv a nemají sdílenou paměť. Tyto systémy obvykle nabízejí větší výkon než SMP (Symmetric Multiprocessing), protože umožňují daleko větší paralelizaci.

## Fyzická topologie distribuovaných systémů

Fyzická topologie představuje reálné rozdělení systému a může být:
- Fixní (pevné komunikační linky) nebo flexibilní (circuit switching, packet switching)
- Grid (2D mřížka) nebo toroid (spojení konce s druhým - lze se dostat z 0,0 do 0,n a n,0 přes jednu hranu)
  - Grid dmax = (m-1) + (n-1) (manhattan dist)
  - Toroid dmax = floor(m/2 + n/2) přibližně

Typicky se v systémech s distribuovanou pamětí používá grid nebo toroid architektura, která nabízí lepší škálovatelnost než lineární uspořádání.

## Virtuální topologie

Virtuální topologie definuje komunikační schéma procesů v distribuované aplikaci - jak spolu procesy komunikují. Virtuální topologie definuje v aplikaci clustery.

Cluster je skupina procesů, které mezi sebou komunikují. Může být tolik clusterů, kolik je procesů. Pokud máme např. A-B-C a A komunikuje s B a B komunikuje s C, pak máme tři clustery: (A, B), (B, C) a (A, B, C).

Virtuální topologie by měla ideálně odpovídat 1:1 fyzické - nebo se o to alespoň pokusit.

## Load Balancing (vyvažování zátěže)

Load balancing předpokládá, že je celá síť dedikovaná na distribuované výpočty (nejsou to náhodné workstations v PC laboratoři). Může být lokální nebo globální, statický nebo dynamický.

### Statický load balancing

Plánování podle předem známé topologie v síti - nemůže reagovat na změny při běhu. Má jednodušší algoritmy a snazší implementaci, ale vyžaduje spoustu informací o síti pro efektivní chod. Může být optimální nebo suboptimální (založený na heuristice).

### Dynamický load balancing

Přiřazení procesů k danému uzlu se provádí dynamicky za běhu aplikace. Umožňuje reagovat na změny, adaptaci v čase, ale algoritmus musí být dostatečně rychlý, aby samotné plánování netrvalo delší dobu než výpočet. Procesy musí umět preempci - tedy uložit a obnovit stav.

Preemptivní dynamický load balancing umožňuje procesy přerušit a přemístit na jiný uzel tak, že budou pokračovat od definovaného checkpointu - tzn. nezahodíme všechnu odpracovanou práci.

### Typy dynamického load balancingu

Centralizovaný - součástí sítě je jeden arbiter (load balancer), který práci rozděluje. Výhodou je, že má přehled o celé síti, takže limituje množství zpráv. Jde o analogii systému "condor" - pokud arbiter spadne, síť nemůže dále pracovat - je potřeba, aby byl stabilní. Vyžaduje komunikaci se všemi uzly.

Distribuovaný - opak centralizovaného, "peer-to-peer" síť. O rozdělení zátěže rozhoduje několik nebo všechny nody v síti. Je méně náchylný na chyby, ale má složitější synchronizaci a větší množství zpráv. Pokud jeden proces/node selže, nic se neděje, pokud máme procesy replikované.

Kooperativní - kooperace procesů v rozhodování - přímo nebo nepřímo (pouze dají informaci o svých rozhodnutích k dispozici ostatním, když je potřebují).

Sender-initiated - pokud je uzel vytížený nad určitý threshold, snaží se přesunout část svojí práce na jiné uzly.

Receiver-initiated - opačný přístup, podobný task stealing scheduleru. Pokud vytížení uzlu klesne pod určitou mez, snaží se od ostatních uzlů vzít procesy, na kterých by mohl pracovat. Oba přístupy (sender/receiver-initialized) mají větší režii.

## Techniky pro optimalizaci a urychlení výpočtu

### Granularita dat

Granularita dat ovlivňuje, jak moc se výpočet zrychlí - malé chunky znamenají častou komunikaci, zatímco velké chunky vedou k dlouhé době přenosu.

### Task Stealing Scheduler

Task-stealing scheduler poskytuje dynamickou vyváženost zátěže - jedno CPU, které skončí s prací dříve než ostatní, může krást úlohy (task stealing) od front do jiných CPU. To může zmenšit pravděpodobnost blokujících operací a usnadnit implementaci paralelního zpracování.

Pokud procesor bere task od jiného procesoru, bere ten, který ve frontě strávil nejvíce času, protože bude nejvíce "cache cool".

### Dynamic Load Balancing

Dynamic load balancing nabízí následující výhody oproti statickému přístupu:
- Reakce na změny, software updates, problémy se sítí
- Preemptivnost - procesy je možné přerušit a přemístit na jiný uzel tak, že budou pokračovat od definovaného checkpointu (nezahodíme odpracovanou práci)

Nevýhody dynamického load balancingu:
- Preemptivnost - můžeme ztratit progress v dané práci, když je to implementované špatně a přeruší se před checkpointem
- Alokace paměti za běhu může zpomalovat hlavní výpočet

### Paralelní distribuce práce pomocí OpenCL/SYCL

SYCL je C++ framework pro psaní kódu pro ASMP (Asymmetric Multiprocessor), který nabízí jednotnou codebase. Kód pro GPU, FPGA apod. lze napsat přímo ve frameworku, což je prakticky nadstavba nad OpenCL, umožňující více ISA v jednom executable a jednotné programování nezávislé na výrobci. Poskytuje vyšší úroveň abstrakce než OpenCL - programátor definuje data-dependency graph, a framework zajistí efektivní alokaci a kopírování bufferů.

Příklad SYCL kódu s data dependency grafem:

```cpp
parallel_for(range<1>(1024), [=](id<1> i) {
    c[i] = a[i] + b[i];
};
```

### Distributed MapReduce

Distributed MapReduce je analogie s SMP, ale ve větším rozsahu. Map rozděluje data do menších částí pro zpracování a předává je daným reduceům. Reduce provádí operace na chunk dat (například agregaci jako sčítání). Je potřeba zajistit, aby jeden fail nesložil celý výpočet, typicky pomocí replikace (např. HDFS). Framework zajišťuje tuto funkcionalitu, takže programátor pouze napíše map a reduce funkce.

### Island Model pro evoluční algoritmy

Island model představuje distribuovanou verzi genetických/evolučních algoritmů. V tomto modelu máme několik uzlů, kdy každá má svou populaci a paralelně se vyvíjí. Čas od času si ostrovy vymění jedince. Je vhodný, pokud je problém příliš složitý - má velkou dimenzionalitu. Je třeba jinak řešit stagnaci a předčasnou konvergenci.

## Nepřímá synchronizace a kolektivní rozhodování

Kolektivní decision-making využívá nepřímou synchronizaci - zpráva se zanechá v "local blackboard". Příkladem je učebna jedna, kde je napsáno na tabuli, že jsme v učebně dva.

Při hromadné migraci se několik procesů v síti může pokoušet zabrat stejnou node, což může potenciálně vést k jejímu přetížení.

Problém oscilace nastává, když proces migruje mezi nody, protože se zdá, že druhá node je vždy lepší, a ve finále neudělá žádnou práci. Řešením je kredit - proces má kredit za výpočty a pokud chce migrovat, musí zaplatit.

No-gain migration znamená, že estimace výkonu pro lokální node je o trochu zvýšená (řádově procenta), jinak by proces mohl migrovat na podobnou node, která nenabízí výrazně lepší výkon. Toto prakticky zajistí, že node bude migrovat pouze, když je load balancing výrazně suboptimální.

## Přístupy k distribuci práce v heterogenních prostředích

V SPMD (Single Program Multiple Data) můžeme mít homogenní distribuovaný systém s ekvivalentními nody, kde lze použít jednoduchý algoritmus na rozdělení práce. U heterogenního distribuovaného systému, kde nody mají různý výkon, je lepší použít dynamické rozdělení práce.

Je také důležité zvážit, zda se vyplatí přesouvat data. Například operace MOV vs ADD - typicky nemá smysl přesouvat data na jinou node kvůli jednoduché operaci jako ADD, protože doba přenosu může být stejná jako provedení součtu lokálně.

## Příklad implementace distribuované diferenciální evoluce

Při implementaci distribuované diferenciální evoluce můžeme jednoduše paralelizovat mutaci, crossover a výpočet fitness funkcí. Každý jedinec může být zpracován paralelně. Pro ukládání mezihodnot je vhodné použít strukturu pro aktuálního rodiče a rekombinovaného jedince (např. `struct Individual { parent, parentFitness, child, childFitness }`). Tímto způsobem se vyvarujeme datových závislostí. Výběr rodiče vs potomka není vhodné paralelizovat, protože je příliš jednoduchý.

Příklad struktury pro implementaci diferenciální evoluce:

```cpp
// Structure of Arrays (lepší pro vektorizaci) pro parents , offsprings a jejich fitness funkce 
  void init() { /* ... */ }
  void eval_fitness() { /* ... */ }
  void selection() { /* ... */ }
  void crossbreeding() { /* ... */ }
  void mutate() { /* ... */ }

```

## Praktické přístupy a nástroje

### Mobile Agents

Mobile Agents jsou distribuované entity v síti, které se mohou pohybovat a provádět výpočty na specifických uzlech. Obsahují kód, který se provede, přičemž nody obsahují data store. Mohou být autonomní a fault tolerant. Postavené jsou na IP sítích, přičemž každý uzel obsahuje runtime pro mobilního agenta.

### Active Network

Active network je jeden z druhů programovatelných sítí. K její funkcionalitě je potřeba standardizace dvou hlavních komponent: programového kódu, který se vykonává v určitém execution environment (podobně jako v Dockeru), a code distribution protokolu, který popisuje způsob distribuce kódu pro zpracování protokolu, pokud ho uzel nemá.

Capsule představuje analogii k paketu (obsahuje data a header), ale navíc má identifikátor daného protokolu. Výhodou je, že pokud najdeme zranitelnost v daném protokolu, jednoduše ho vyměníme pomocí změny identifikátoru protokolu.

Pomocí aktivní sítě lze snadno implementovat load redistribution nezávisle na technologii. PerformanceScout je speciální capsule, která udává výkon jednotlivých uzlů a jejich vytížení, komunikační zpoždění apod. Uzel vyšle PerformanceScout capsule do sítě s TTL (Time To Live) a postupně zkoumá uzly v síti. Když TTL dosáhne 0, capsule se vrací zpět k majiteli, který díky ní může zmapovat stav sítě a rozhodnout se, zda proces přemigrovat jinam.


# 6.1 PPR advanced

## Základní principy vektorizace a SIMD operací
- Koncept SIMD (Single Instruction Multiple Data) - stejná instrukce aplikovaná na více datových prvků najednou
- Rozdíl mezi skalárním a vektorovým zpracováním dat
- Typy SIMD instrukcí a jejich evoluce (AVX, AVX2, atd.)
- Fixed-size vektory dat (např. vektor 4 doublů nebo 8 floatů v AVX2)

## Optimalizace pro vektorizaci
- Array of Structures vs. Structure of Arrays
  - Problematika AoS - nutnost extrakce hodnot z každé struktury, neefektivní využití SIMD registrů
  - Výhody SoA - efektivnější využití paměti, redukce operací load/shuffle, lepší využití vektorových instrukcí
- Zarovnání dat v paměti pro optimální SIMD operace
- Memory coalescing a jeho důležitost pro SIMD
- Word size a data alignment

## Autovektorizace vs. manuální vektorizace
- Autovektorizace - možnosti a limity moderních kompilerů
- Hinty pro kompiler (např. pragma directives, loop unrolling)
- Omezení autovektorizace (např. smyčky s výstupní podmínkou)
- Manuální vektorizace pomocí intrinsických funkcí
- Maskování a conditional load/store jako náhrada za větvení

## Aplikace vektorizace
- Implementace paralelních algoritmů využívajících SIMD
- Expression templates pro optimalizaci operací nad strukturami
- Packed vs. unpacked data a jejich správa
- Demonstrace na příkladu optimalizace algoritmu (např. prefix sum)

## Výkonnostní charakteristiky a měření
- Faktory ovlivňující efektivitu vektorizace v praxi
- Metody měření výkonu vektorizovaného kódu
- Typické výkonnostní rozdíly mezi skalárním a vektorizovaným kódem

## Temporální logika a formální verifikace kódu
- **Základní principy temporální logiky** - formální dokázání korektnosti programu
  - Proměnné popisující stav programu a vlastnosti
  - Logické operátory - =, !=, >, not, and, operátor čekání (p waits for q)
  - Definice programu pomocí množiny proměnných, množiny stavů, počátečního stavu a přechodové funkce (FSM)
- **Invarianty** - výrazy, které jsou vždy pravdivé (např. mutex může být v jeden čas držen nejvíce jedním vláknem)
- **Praktické aplikace** formální verifikace pro bezpečnostně kritické systémy

## Synchronizační problémy a jejich řešení
- **Problém večeřících filozofů** a jeho řešení:
  - Rebel inside - jeden filozof bere nejprve pravou vidličku, ostatní levou
  - Canteen guard - použití semaforu pro správu vidliček
  - Priorita - každá vidlička má prioritu, filozof si bere nejprve vidličku s vyšší prioritou
  - Aloha - sekvenční pokus o získání vidliček, případné uvolnění a čekání
- **Byzantine Generals Problem**
  - Mechanismy pro dosažení konsensu v systému s potenciálně zrádnými uzly
  - Messenger traitor - digitální podpis, ověření autenticity zprávy
  - Absence zprávy a defaultní akce
  - General traitor - propagace informace všem ostatním generálům, detekce nekonzistence
  - Podmínka pro fault-toleranci: více než ⅔ generálů musí být poctivých

## Watchdog mechanismy a detekce chyb
- **Hardware a software watchdog**
  - Princip periodického resetování čítače
  - Detekce deadlocku a livelocku
  - Kontrola správnosti hodnot
- **Fault-tolerant a fail-safe systémy**
  - Rozdíl mezi fail-safe (bezpečné ukončení) a fault-tolerant (pokračování v činnosti)
  - Metody detekce chyb: duplikace kódu, CRC, parita, hash, N-verzové programování
  - Interleaving instrukcí - master a shadow kód
  - Checky - consistency, capability, assertion

   
## Temporální synchronizace v distribuovaných systémech
- **Lamportovy hodiny**
  - Monotónně rostoucí čítač událostí
  - Kauzalita událostí - pokud A způsobilo B, pak C(A) < C(B)
  - Částečné uspořádání událostí
- **Vektorové hodiny**
  - Vektor Lamport timestampů
  - Určení precedence mezi událostmi
  - Detekce paralelních událostí
- **Matrix clock** - generalizace vektorových hodin

## Time Warp simulace a kosimulace
- **Distribuovaná optimistická simulace**
  - Paralelní vs. sekvenční provádění
  - Spekulativní provádění instrukcí
- **Mechanismy Time Warp**
  - Rollback při porušení kauzality
  - Anti-message pro anulaci zpráv
  - Fossil collection - uvolnění paměti
  - State saving - různé přístupy k ukládání stavu
- **Kosimulace**
  - High-level architecture (HLA)
  - Propojení simulovaných a reálných zařízení
  - Testování prototypů s reálnými zařízeními
  - HW-SW kosimulace

-------------------------------------------------------------------------------

# 7. Úpravy digitalizovaného obrazu s využitím histogramu, detekce hran, filtrace.

[//]: # (### 7.1.1 Základní operace s obrazovými daty)

[//]: # ()
[//]: # (Při zpracování digitálního obrazu rozlišujeme dva základní typy operací:)

[//]: # ()
[//]: # (**a&#41; Bodové operace**)

[//]: # (- Hodnota výstupního pixelu závisí pouze na hodnotě vstupního pixelu na stejné pozici)

[//]: # (- Obecný zápis: `c&#40;i,j&#41; = f[a&#40;i,j&#41;, k]`)

[//]: # (- Příklady bodových operací:)

[//]: # (  - **Sčítání snímků** - používá se pro filtraci šumu průměrováním)

[//]: # (  - **Odčítání snímků** - detekce změn mezi snímky)

[//]: # (  - **Násobení snímků** - jasové korekce)

[//]: # ()
[//]: # (**b&#41; Transformace jasové stupnice**)

[//]: # (- Mění rozložení jasových hodnot v obraze)

[//]: # (- Základní typy:)

[//]: # (  - Identická transformace)

[//]: # (  - Inverze)

[//]: # (  - Prahování)

[//]: # (  - Lineární transformace)

### 7.1.2 Histogram obrazu

**Histogram** je grafické znázornění četnosti výskytu jednotlivých jasových úrovní v obraze.

Pro obraz s jasovými úrovněmi 0 až L-1:
- H(k) = počet pixelů s jasem k
- Normalizovaný histogram: p(k) = H(k) / (M×N)

### 7.1.3 Transformace jasové stupnice pomocí histogramu

**a) Roztažení histogramu (Stretching)**
- Zvýšení kontrastu obrazu využitím celého rozsahu jasů
- Transformační funkce: `g = [(gmax - gmin)/(pmax - pmin)] × (p - pmin) + gmin`
- Použití: obrazy s malým kontrastem

**b) Ekvalizace histogramu**
- Cíl: dosáhnout rovnoměrného rozložení jasových úrovní
- Vytváří obraz s maximálním kontrastem
- Algoritmus:
  1. Výpočet kumulativního histogramu
  2. Normalizace na rozsah výstupních jasů
  3. Mapování původních jasů na nové hodnoty

**c) Specifikace histogramu**
- Transformace histogramu do požadovaného tvaru
- Používá se když chceme dosáhnout konkrétního rozložení jasů

## 7.3 Detekce hran

### 7.3.1 Definice hrany

**Hrana** je místo v obraze s rychlou změnou jasu. Rozlišujeme:
- **Skoková hrana** - náhlá změna jasu
- **Rampová hrana** - pozvolná změna jasu

### 7.3.2 Metody detekce hran

**a) Detekce hran v definovaném směru**
- Využívá první diferenci v daném směru
- Směry: 0° (horizontální), 45°, 90° (vertikální), 135°

**b) Gradientní metody**

Gradient obrazové funkce:
```
∇f(x,y) = [∂f/∂x, ∂f/∂y]
```

Velikost gradientu: `|∇f(x,y)| = √[(∂f/∂x)² + (∂f/∂y)²]`

**Hlavní gradientní operátory:**

1. **Robertsův operátor**
   - Nejjednodušší, 2×2 maska
   - Citlivý na šum

2. **Prewittové operátor**
   - 3×3 maska
   - Robustnější vůči šumu

3. **Sobelův operátor**
   - 3×3 maska s váhováním
   - Nejpoužívanější

4. **Cannyho detektor**
   - Vícekrokový algoritmus
   - Optimální poměr detekce/šum

**c) Laplaceův operátor**
- Druhá derivace, detekuje hrany ve všech směrech
- Velmi citlivý na šum
- Často se kombinuje s vyhlazením (LoG - Laplacian of Gaussian)

## 7.4 Filtrace obrazu

### 7.4.1 Typy šumu v obraze

1. **Gaussovský šum** - normální rozdělení
2. **Impulsní šum** ("salt & pepper") - náhodné černé/bílé body
3. **Rovnoměrný šum** - konstantní pravděpodobnost

### 7.4.2 Lineární filtrace

**FIR filtry (Finite Impulse Response)**
- Konečná impulsní odezva
- Výstup závisí pouze na vstupech
- Stabilní, snadno implementovatelné

**Základní typy lineárních filtrů:**

1. **Vyhlazovací filtry**
   - Průměrování
   - Gaussovo vyhlazení
   - Redukce šumu

2. **Zostřovací filtry**
   - Zvýraznění hran
   - Laplacián
   - Unsharp masking

### 7.4.3 Nelineární filtrace

1. **Mediánový filtr**
   - Efektivní proti impulsnímu šumu
   - Zachovává hrany

2. **Morfologické filtry**
   - Eroze, dilatace
   - Otevření, uzavření
   - Založené na strukturálním elementu

### 7.4.4 Praktické aplikace

**Odstranění šumu:**
- Gaussovský šum → lineární vyhlazení
- Impulsní šum → mediánový filtr
- Kombinovaný šum → kaskáda filtrů

**Zvýraznění obrazu:**
- Zostření pomocí vysokofrekvenčních filtrů
- Zvýraznění hran před segmentací
- Předzpracování pro rozpoznávání

**Příklady použití:**
- Lékařské zobrazování (CT, MRI)
- Satelitní snímky
- Kontrola kvality ve výrobě
- Biometrické systémy


-------------------------------------------------------------------------------


# 8. Matematická morfologie, dilatace, eroze, operace otevření a uzavření, užití pro odstranění šumu a zjednodušení obrazové scény.

Matematická morfologie je metoda zpracování obrazu, která geometrizuje úlohy zpracování snímků. Vychází z tvarů objektů ve snímku a používá transformace, které tyto tvary zachovávají nebo respektují. Hlavní oblasti aplikace metod matematické morfologie zahrnují:

a) **Předzpracování obrazu** - odstranění šumu, zjednodušení tvarů objektů, zaplavování zálivů, odstraňování zákmitů, vyrovnání hranice objektů, detekce geometrických útvarů.

b) **Skeletizace a ztenčování objektů** - zjednodušení geometrické struktury objektů pro další zpracování, např. popisy objektů číselnými charakteristikami.


Teorie matematické morfologie je založena na vlastnostech bodových množin:
- Snímek 2D (IMeukl) je reprezentován ve spojitém euklidovském prostoru E2 bodovou množinou
- Body objektů jsou reprezentovány hodnotou "1"
- Body pozadí jsou reprezentovány hodnotou "0"
- Pro šedotónové snímky používáme E3 jako trojici souřadnic (x,y) a jasu f(x,y)

Pro digitalizované 2D snímky (IM) nebo binarizované snímky (IMbin) pracujeme s bodovými množinami, kde:
- Bod (i,j) objektu = 1
- Bod (i,j) pozadí = 0 (bod doplňku objektu)

Pro zápis bodové množiny A používáme množinu dvojic souřadnic (i,j) reprezentujících objekt v IMbin:
- Body objektu: A
- Body pozadí: A^C
- Bod se souřadnicí (0,0) je označován jako počátek

[//]: # (### 8.1.2. Morfologická transformace)

[//]: # ()
[//]: # (Nad bodovou množinou je definována morfologická transformace jako relace bodové množiny &#40;IMbin ≈ A&#41; a tzv. strukturního elementu [TEMPLATE], který je tvořen bodovou množinou B &#40;obvykle menší než A&#41;.)

[//]: # ()
[//]: # (Transformaci můžeme obecně popsat vztahem:)

[//]: # (TM: A → ? B)

[//]: # ()
[//]: # (K transformaci TM&#40;A&#41; existuje také duální transformace TM*&#40;A&#41;, pro kterou platí:)

[//]: # (TM*&#40;A&#41; = &#40;TM&#40;A^C&#41;&#41;^C)

[//]: # ()
[//]: # (### 8.1.3. Strukturní element)

[//]: # ()
[//]: # (Strukturní element B je bodová množina, která má definovaný počátek elementu [ORIGIN]. Počátek strukturního elementu může také ležet mimo vlastní element B.)

[//]: # ()
[//]: # (Příklady strukturních elementů:)

[//]: # (- B1: 3×3 čtvercové okolí s počátkem uprostřed)

[//]: # (- B2: kříž s počátkem uprostřed)

[//]: # (- B3: horizontální linie s počátkem uprostřed)

[//]: # (- B4: vertikální linie s počátkem uprostřed)

[//]: # (- B5: horizontální linie tří bodů s počátkem vlevo)

[//]: # (- B6: horizontální linie dvou bodů s počátkem vlevo)

[//]: # (- B7: horizontální linie dvou bodů bez levého okolí)

[//]: # (- B8: komplikovanější tvar s počátkem v levém horním rohu)

[//]: # ()
[//]: # (Bod ve snímku IM1 ≈ A, který se nachází "pod" počátkem strukturního elementu B, se nazývá **okamžitý bod**, do kterého se pak výsledek morfologické transformace TM&#40;A&#41; přenáší ve výsledném snímku IM2.)

## 8.2. Základní morfologické transformace

### 8.2.1. Dilatace

Dilatace je morfologická transformace založená na tzv. Minkowského součtu [MINKOWSKY ADDITION], kdy se dvě bodové množiny A a B skládají pomocí vektorového součtu:

(i,j) ⊕ (k,l) = (i+k, j+l)

Formálně:
TM(A): A ⊕ B = {x ∈ E2 : x = a + b; a ∈ A; b ∈ B}

Nebo alternativně:
A ⊕ B = ⋃(b∈B) (A)b ≈ sjednocení posunutých bodových množin

Dilataci můžeme zjednodušeně interpretovat:
- Pomocí strukturního elementu B "projíždíme" jednotlivé body vstupního snímku
- Tam, kde počátek strukturního elementu B koresponduje s okamžitým bodem v IM1 s hodnotou 1, provedeme v dilatovaném snímku IM2 sjednocení strukturního elementu B a snímku IM2
- Jinými slovy, provedeme "obtisk" strukturního elementu B do IM2 v místě okamžitého bodu

Pro šedotónové snímky platí:
TM(A): A ⊕ B = {x ∈ E3 : x = max{a, b}; pro ∀ a ∈ A; pro ∀ b ∈ B}

V implementaci pro bod výstupního snímku gD(i,j):
gD(i,j) = max{f(i-k, j-l); pro ∀ k,l, že b(k,l) ∈ B a f(i-k, j-l) ∈ IM}

Při konvenci, že v binarizovaném snímku IM platí černá = "0" a bílá = "1", se pak jedná o dilataci bílé do černé.

### 8.2.2. Eroze

Eroze je morfologická transformace duální k dilataci. Je založena na principu Minkowského rozdílu [MINKOWSKI SUBTRACTION]. Jedná se o skládání dvou bodových množin pomocí vektorového rozdílu.

Formálně:
TM(A): A ⊖ B = {x ∈ E2 : x + b ∈ A; pro ∀ b ∈ B}

Pro x ∈ X počítáme vektorový součet s prvky strukturního elementu b ∈ B a testujeme, zda bodová množina x + b ⊆ A. Jestliže platí, že x + b ⊆ A, pak x ∈ X je prvkem výsledné erodované množiny.

Erozi můžeme zjednodušeně interpretovat:
- Pomocí strukturního elementu B "projíždíme" jednotlivé body vstupního snímku
- Pro okamžitý bod, kdy se celá bodová množina strukturního elementu B shoduje s jemu odpovídající bodovou podmnožinou bodové množiny v IM1, bude hodnota odpovídajícího okamžitého bodu ve výsledném snímku IM2 nastavena na "1"

Pro šedotónové snímky platí:
TM(A): A ⊖ B = {x ∈ E3 : x = min{a, b}; pro ∀ a ∈ A; pro ∀ b ∈ B}

V implementaci pro bod výstupního snímku gE(i,j):
gE(i,j) = min{f(i+k, j+l); pro ∀ k,l, že b(k,l) ∈ B a f(i+k, j+l) ∈ IM}

Při konvenci, že v binarizovaném snímku IM platí černá = "0" a bílá = "1", se pak jedná o dilataci černé do bílé.

## 8.3. Transformace otevření a uzavření

Kombinace dvou duálních morfologických transformací dilatace a eroze se používá ke zjednodušení snímků - zmenšení počtu detailů, zaplavení malých děr na úrovni šumu, odstranění impulsního šumu, zaplavení úzkých zálivů, odstranění výstupků, zjednodušení čar vymezujících objekty.

### 8.3.1. Otevření (Opening)

Transformace otevření je definována jako dilatace po erozi:

TM(A): A ○ B = (A ⊖ B) ⊕ B

Transformace otevření:
- Oddělí objekty, které jsou spojené úzkou šíjí
- Odstraní zákmity/výčnělky na obvodu objektů
- Eliminuje šum na úrovni osamocených obrazových bodů

### 8.3.2. Uzavření (Closing)

Transformace uzavření je definována jako eroze po dilataci:

TM(A): A • B = (A ⊕ B) ⊖ B

Transformace uzavření:
- Spojí objekty, které jsou blízko sebe
- Zaplaví malé díry (na úrovni šumu) a zálivy

### 8.3.3. N-násobné otevření a uzavření

Pro větší efekt můžeme použít n-násobné aplikace:

OPENING(n)(A,B) = ((A ⊖ B)n ⊕ B)n
- n-krát eroze následovaná n-krát dilatací

CLOSING(n)(A,B) = ((A ⊕ B)n ⊖ B)n
- n-krát dilatace následovaná n-krát erozí

## 8.4. Transformace typu "HIT and MISS"

Tato transformace (též nazývaná Serrova transformace nebo "TREF a MIŇ") se používá pro detekci jednoduchých tvarů v objektech, např. rohy, kouty, hranice nebo také pro ztenčování a skeletizaci.

Základem je složený strukturní element:
B = {B1,B2}, kde platí: B1 ∩ B2 = ∅

Jedná se o dvojici disjunktních množin B1 a B2.

Transformace je založená na erozi a platí:
A ⊛ B = {a ∈ A : B1 ⊆ A and B2 ⊆ A^C}

Tento zápis můžeme interpretovat tak, že má-li být okamžitý bod a z bodové množiny A bodem výsledné množiny (A ⊛ B), pak musí současně platit:
- B1 je podmnožinou množiny A (≈ objekt v IM) ... "TREF"
- B2 je podmnožinou doplňku A^C (≈ pozadí v IM) ... "MIŇ"

Vyjádřeno pomocí eroze:
A ⊛ B = (A ⊖ B1) ∩ (A^C ⊖ B2)

## 8.5. Detekce hranice oblasti

Transformace pro detekci hranice oblasti je založena na množinovém rozdílu původní bodové množiny A a erodovaného objektu (A ⊖ B).

Obecně platí:
BOUNDARY = A \ (A ⊖ BX)

Kde BX je symetrický strukturní element, který může být dvojího typu:
- B4: kříž (4-okolí)
- B8: čtverec (8-okolí)

Pro množinový rozdíl platí: X \ Y = X ∩ Y^C, pak lze vztah přepsat na:
BOUNDARY = A ∩ (A ⊖ BX)^C

Při použití strukturního elementu B4 je výsledkem hranice oblasti souvislá ve smyslu 8-okolí.
Při použití strukturního elementu B8 je výsledkem hranice oblasti souvislá ve smyslu 4-okolí.

## 8.6. Binární medián

Transformaci typu binární medián můžeme definovat vztahem:
gmedian(i,j) = MEDIAN{f(i+k, j+l); pro ∀ k,l, že b(k,l) ∈ B a f(i+k, j+l) ∈ IM}

Tato transformace odstraňuje drobné výstupky na obvodu oblasti a zaplavuje malé prohlubně. Je podobná operaci otevření a uzavření, ale zachovává více detailů původního obrazu.

## 8.7. Praktické využití matematické morfologie

### 8.7.1. Odstranění šumu
- Kombinace eroze a dilatace (otevření a uzavření) efektivně odstraňuje impulsní šum
- Binární medián odstraňuje izolované pixely a malé shluky

### 8.7.2. Zjednodušení obrazové scény
- Otevření odstraňuje tenké výběžky a malé objekty
- Uzavření vyplňuje malé díry a úzké zálivy
- N-násobné aplikace umožňují progresivní zjednodušení scény


# 9. Ztenčování a skeletizace
Ztenčování (skeletizace) je metoda vytváření čárových obrazů, která nachází významné uplatnění při řešení problémů spojených s rozpoznáváním a strukturální analýzou vizuální scény. Tyto metody jsou zvláště důležité v oblasti "fringe pattern analysis", což je analýza obrazů interferenčních pruhů vzniklých mechanickou či optickou interferencí.

Při řešení úloh rozpoznávání obrazů ("pattern recognition") je důležitým aspektem problém redukce šířky čar nebo obecněji úkol skeletizace, tedy vytvoření čárového obrazu, který zachovává informaci o topologii a struktuře objektů v původním obraze.

## 9.2. Skeletizace ve spojité oblasti

Metoda skeletizace, vycházející z tzv. mediální osové transformace (Medial Axis Transformation), vytváří ve spojité oblasti jedinečný skelet pro daný objekt. Koncept mediální osové transformace byl představen H. Blumem v roce 1964.

### 9.2.1. Intuitivní vysvětlení skeletu

Pro pochopení pojmu skelet se často používá mnemotechnická pomůcka popisující vznik skeletu jako šíření ohně na louce. Představme si, že v jeden okamžik zapálíme po obvodu louku tvaru například obdélníku. Za předpokladu homogenního hoření budou místa, kde se ohně potkají a uhasnou, tvořit tzv. zhasínací křivku, která je skeletem objektu (louky).

### 9.2.2. Matematická definice skeletu

Formálně lze skelet definovat následovně:
- Nechť S je plošný objekt a H je jeho hranice
- Nechť bod P je bod ležící v S
- Nejbližším sousedem bodu P na hranici H je bod M patřící do H takový, že v H neexistuje žádný jiný bod, jehož vzdálenost od P je menší než vzdálenost PM
- Jestliže má bod P více než jednoho takového nejbližšího souseda, pak lze říci, že bod P je bodem skeletu
- Sjednocení všech bodů skeletu nazýváme skelet

Alternativně lze skelet definovat jako množinu středů maximálních kruhů vepsaných do objektu S. Maximální kruh vepsaný do S se dotýká hranice H ve dvou a více bodech.

## 9.3. Vlastnosti skeletu

Dobrý skelet by měl splňovat následující kritéria:

1. **Topologie** - skeletizace, resp. transformace použitá pro určení skeletu, musí zachovávat rozmístění oblastí a děr v původním snímku. Jedná se o zachování relace souvislosti mezi oblastmi a děrami ve snímku (homotopický strom). Skeletizace tedy musí mít vlastnosti homotopické transformace.

2. **Spojitost** - každé spojité oblasti ve snímku musí odpovídat pouze jeden spojitý skelet.

3. **Stabilita** - skeletizace aplikovaná na spojitou oblast, která je sama skeletem, nesmí tuto oblast změnit.

## 9.4. Skeletizace a ztenčování v diskrétní oblasti

V diskrétní oblasti (digitální obrazy) závisí definice vzdálenosti na použité diskretizační mřížce a použité definici souvislosti. Zatímco ve spojitém prostoru R² používáme Euklidovskou vzdálenost, v diskrétním prostoru Z² můžeme použít různé metriky související s 4-okolím, 8-okolím apod.

### 9.4.1. Problematika diskrétní skeletizace

Při použití mediální osové transformace v diskrétním prostoru mohou nastat následující problémy:

1. Vzniklé skelety nemusí mít tloušťku "1" (jeden pixel)
2. Může dojít k porušení principu homotopické transformace (topologie)
3. Může dojít k porušení principu spojitosti a stability

Ilustrativní příklad ukazuje, že při objektu určitých rozměrů (např. 8 × 10 pixelů) může skelet definovaný pomocí mediální osové transformace mít v některých místech tloušťku 2 pixely, což není žádoucí.

### 9.4.2. Řešení problémů diskrétní skeletizace

Z důvodu výše uvedených problémů se v diskrétním prostoru Z² používají:
- Aproximační algoritmy k mediální osové transformaci
- Postupné ztenčování (thinning)

Tyto přístupy se snaží zachovat topologické vlastnosti obrazu a zároveň vytvořit skelet s tloušťkou jednoho pixelu.

## 9.5. Praktické aplikace skeletizace

Skeletizace a ztenčování nacházejí praktické uplatnění v mnoha oblastech:

1. **Rozpoznávání vzorů** - zjednodušení objektů pro následnou klasifikaci
2. **Analýza písma a rukopisu** - extrakce základních tahů pro OCR systémy
3. **Biometrická identifikace** - analýza otisků prstů, žilní kresby
4. **Počítačové vidění** - reprezentace objektů pro následnou analýzu
5. **Lékařské zobrazování** - analýza cévních struktur, nervových drah apod.
-------------------------------------------------------------------------------


# 10. Segmentace obrazu
Segmentace obrazu představuje proces rozčlenění snímku (obrazu) na oblasti, které korespondují s objekty reálného světa. Alternativně lze segmentaci chápat jako rozčlenění obrazu na oblasti podle společných definovaných charakteristik, které mohou být i abstraktní vzhledem k reálnému světu. Takové oblasti se vyznačují uniformitou vzhledem k definované vlastnosti, jako je barva, jas, tvar, struktura, poloha těžiště apod.

Předpokládáme, že určené oblasti jsou disjunktní, tedy:

1. IM₁ = ⋃ᵢ₌₁ⁿ Sᵢ, kde Sₖ ∩ Sₗ = ∅ pro všechna k, l taková, že k ≠ l
2. IM₂ = [⋃ᵢ₌₁ⁿ Sᵢ] ∪ B, kde Sₖ ∩ Sₗ = ∅ pro všechna k, l taková, že k ≠ l

Existuje několik hlavních přístupů k segmentaci:
- Segmentace přes oblasti: bod v obrazu je přiřazován podle definovaných vlastností do oblasti Sᵢ ∈ IM
- Hraniční přístup: detekujeme obrazové body, které mají vlastnost hranice mezi oblastmi, oddělující oblasti Sₖ a Sₗ

## 10.2 Segmentace prahováním (Thresholding)

Prahování je globální metoda segmentace využívající histogram na bázi rozdělení obrazu do disjunktních obrazových tříd podle hodnoty jasu nebo barevných složek R, G, B. Vychází z transformačního vztahu g = T(p).

### 10.2.1 Základní typy prahování

**a) Prahování na jeden práh**
```
g(i,j) = gₑ {nebo = gₘₐₓ, = 1} pro p(i,j) > Tᵣ
       = gₐ {nebo = gₘᵢₙ, = 0} pro p(i,j) ≤ Tᵣ
```
kde:
- gₐ, gₑ jsou hodnoty výstupního jasu z rozsahu (gₘᵢₙ, gₘₐₓ)
- 1, 0 lze chápat jako dvouhodnotový snímek (bílá/černá)
- Tᵣ je hodnota prahu

**d) Prahování ruční**
Podle tvaru histogramu (bimodální/multimodální) a požadavků na segmentaci se subjektivně zadá jeden nebo více prahů, podle kterých je provedeno prahování.

**e) Prahování automatické**
Existuje několik přístupů automatického prahování:
- Metody založené na analýze tvaru histogramu, předpokládající že lokální minimum v bimodálním histogramu může být jasovým předělem
- Metody pracující s apriorní informací o procentuálním zastoupení objektů a pozadí
- Metody přepočítávající četnosti výskytu jasů podle doplňujících kritérií
- Metody založené na statistických charakteristikách snímků
- Metody pracující s mírou neurčitosti

### 10.2.2 Automatické metody prahování – standardní histogram

Tyto metody jsou založené na analýze tvaru histogramu vstupního snímku jako jednorozměrné funkce. Detekují jedno nebo více lokálních minim, o kterých předpokládáme, že jsou jasovým předělem mezi segmentovanými oblastmi.

**Bimodální histogram**
Typicky pro snímky s tmavými objekty na světlém pozadí:
1. Nalezení lokálních maxim Hₚ(max1) a Hₚ(max2)
2. Mezi těmito maximy hledáme lokální minimum Hₚ(min)
3. Od tohoto minima odvodíme hodnotu prahu Tᵣ
4. Čím je histogram plošší, tím je menší důvěra v odhad prahu

Pro robustnost detekce se často stanovuje minimální vzdálenost lokálních maxim D.

**Multimodální histogram**
Pro prahování "na tři prahy":
1. Nalezení prvního lokálního minima po prvním lokálním maximu zleva
2. Nalezení prvního lokálního minima po prvním lokálním maximu zprava
3. Hodnota jasu odpovídající prvnímu minimu bude práh T₁
4. Hodnota jasu odpovídající druhému minimu bude práh T₂
5. Vypočteme středovou vzdálenost Tᶜ mezi lokálními minimy
6. Od polohy jasu Tᶜ hledáme směrem doprava a doleva první lokální minimum
7. Hodnota jasu odpovídající tomuto minimu bude práh T₃

Kvůli "zakmitávání" hodnot četností v histogramu se často používá filtrace funkce histogramu, obvykle nerekurzivní FIR (Finite Impulse Response) filtry.

### 10.2.3 Procentní prahování (P-prahování)

Metoda vychází ze znalosti apriorní informace o zastoupení ploch objektů a pozadí ve snímku. Předpokládáme bimodální histogram, kde práh T rozděluje histogram na dvě oblasti C₀ a C₁.

Postup:
1. Definujeme p jako apriorní informaci procentního zastoupení objektů ve snímku
2. 1-p jako apriorní informaci o zastoupení pozadí
3. Postupně načítáme četnosti Hₚ(j) výskytu jednotlivých jasů a dělíme je plochou snímku
4. Když dosáhneme hodnoty p, jas j je hledaným prahem T

### 10.2.4 Modifikovaný histogram

Konstrukce modifikovaného histogramu spočívá v tom, že každý obrazový bod posuzujeme při započítávání do histogramu nejen podle jeho jasu, ale také podle další definované vlastnosti vyjádřené kriteriální funkcí. Hodnota této funkce je vahou pro započítání příslušného jasu do histogramu.

Pro výpočet běžného histogramu platí:
```
H(k) = ∑ βₖ[g(i,j)], kde platí: βₖ[g(i,j)] = 1 pro g(i,j) = k
                                           = 0 pro g(i,j) ≠ k
```

Pro výpočet modifikovaného histogramu:
```
H*(k) = ∑ βₖ[g(i,j)] * α[g(i,j)], kde platí: βₖ[g(i,j)] = 1 pro g(i,j) = k
                                               = 0 pro g(i,j) ≠ k
```

Kriteriální funkce α[g(i,j)] je postavena na testování hranovosti obrazových bodů v definovaném okolí. Používají se hranové operátory jako:
- Laplace operátor: LAP = |E - (1/8)(A+B+C+D+F+H+I+J)|
- Roberts Cross operátor: ROB = max{|E-C|, |B-F|}
- Operátor DIF: maximální rozdíl průměrů jasových úrovní dvojic čtverců 2x2

Pro histogramy s malou hranovostí:
```
|α[g(i,j)]| = 1/(1+|Δ|²), |α| ∈ (0,1)
```

Pro histogramy s vysokou hranovostí:
```
|α[g(i,j)]| = |Δ|, |α| ∈ (0, max)
```

### 10.2.5 Optimální práh (Otsu metoda)

Metoda optimálního prahu vyžaduje znalost relativního histogramu snímku a výpočet statistických charakteristik. Relativní četnost výskytu bodu s jasem i ve snímku chápeme jako pravděpodobnost pᵢ.

V základní úloze hledáme jeden práh T, který rozdělí všechny body do dvou disjunktních tříd C₀ a C₁. Definujeme pravděpodobnosti výskytu bodu ve třídách:
- ω₀ = P(C₀) = Σⁱ⁼¹ᵏ pᵢ = ω(k)
- ω₁ = P(C₁) = Σⁱ⁼ᵏ⁺¹ⁿ pᵢ = 1-ω(k)

Vypočítáme střední hodnoty jasu ve třídách jako vážený průměr a zavedeme charakteristiky rozptylu. Kritérium optimality pro volbu prahu je buď minimalizace rozptylu uvnitř tříd, nebo maximalizace rozptylu mezi třídami.

Výpočtový tvar kritéria:
```
σ²ᵦ = [μᴛω(k)-μ(k)]²/[ω(k)(1-ω(k))]
```

Algoritmus:
1. Pro každé k = 1,...,n počítáme hodnoty σ²ᵦ(k)
2. Z vypočítaných hodnot určíme maximální hodnotu
3. Pro k* = Tᵒᵖᵗᵢₘáₗₙí provedeme prahování snímku

## 10.3 Segmentace s užitím matice sousednosti

Matice sousednosti (Greylevel Coocurence Matrix - CM) je globální charakteristika snímku, která zobrazuje sousedství jasů. Prvek s(i,j) v této matici udává, kolikrát jas i sousedí s jasem j v 8-okolí bodu.

Vlastnosti matice CM:
- Čtvercová symetrická matice
- Diagonální prvky CM vypovídají o tom, kolikrát jas i sousedí sám se sebou → měřítko velikosti plochy
- Součet prvků i-tého řádku bez diagonálního prvku je měřítkem velikosti obvodu plochy s jasem i

Algoritmus segmentace pomocí CM:
1. Výpočet matice CM
2. Hledání minimálního prvku na diagonále (jas, který budeme přebarvovat)
3. Na řádku s tímto jasem hledáme největšího souseda ve smyslu matice sousednosti
4. Tímto novým jasem přebarvíme všechny body snímku s původním jasem

## 10.4 Segmentace pomocí rozplavování jasu

Tato jednoduchá metoda sekvenčního přebarvování slouží jako nástroj segmentace a vizualizace objektů. Většinou se provádí v oblasti zájmu (Region of Interest - ROI).

Princip:
1. Zvolíme startovací jas C
2. Postupně přebarvujeme sousední jasy po jednotlivých krocích k

Typy rozplavování:
- **Obousměrné rozplavování**: Současně přebarvujeme světlejší i tmavší odstíny na startovací jas C
- **Jednosměrné rozplavování**: Přebarvujeme buď světlejší, nebo tmavší odstíny na startovací jas C

Volba startovacího jasu může být:
- Ruční
- Automatická - hledáním lokálního extrému v histogramu ROI

## 10.5 Segmentace narůstáním oblastí

Do této kategorie patří metody přímé konstrukce oblastí, které jsou vhodné pro snímky obsahující šum. Princip spočívá v hledání množiny bodů, které mají stejnou vlastnost homogenity.

## 10.6 Metoda rozšiřování oblastí

Tato metoda se používá, když mezi dvěma oblastmi S₁ a S₂ s jednoznačně definovanými body vznikne přechodová oblast Sₚ s body, které nelze jednoznačně zařadit.

Princip:
1. Pro každý bod g(i,j) v přechodové oblasti Sₚ definujeme kriteriální funkci f(i+k,j+l) jeho okolí
2. Pro každý bod v 8-okolí vypočítáme tuto kriteriální funkci
3. Hledáme minimum této funkce a podle něj přiřazujeme bod do jedné z oblastí

Tento přístup umožňuje efektivně rozšiřovat jasně definované oblasti na úkor přechodových zón.

-------------------------------------------------------------------------------



