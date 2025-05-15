
# 1. Základní principy statistického popisu vícerozměrných dat, bodové a intervalové odhady základních charakteristik náhodných veličin.
## Základní principy statistického popisu vícerozměrných dat

### Vícerozměrné náhodné veličiny a data
- Vícerozměrná data se považují za všechna data, která lze interpretovat jakýmkoli pravděpodobnostním rozdělením v nějakém prostoru Ω
- Vícerozměrná data obsahují více atributů (dimenzí) než jednorozměrná data
- Náhodné veličiny dělíme na spojité a diskrétní

### Základní charakteristiky vícerozměrných dat

#### Střední hodnota
- **Diskrétní veličina:** průměr přes všechny hodnoty v daném sloupci
  $E(X) = \frac{1}{m} \sum_{i=0}^{m} X_i$
- **Spojitá veličina:** 
  $E(X) = \int_a^b f(x) \cdot x dx$

#### Rozptyl
- **Diskrétní veličina:**
  $Var(X) = E((X_i - E(X_i))^2) = E(X_i^2) - E^2(X_i)$
- **Spojitá veličina:**
  $Var(X) = \int_a^b f(x) \cdot x^2 dx$

#### Kovariance
- Měří lineární závislost mezi dvěma náhodnými veličinami
- $cov(x_i, x_j) = E((x_i - E(x_i)) \cdot (x_j - E(x_j)))$

#### Korelace
- Normalizovaná kovariance do intervalu [-1, 1]
- $cor(x_i, x_j) = \frac{cov(x_i, x_j)}{\sqrt{var(x_i) \cdot var(x_j)}}$

### Vícerozměrné rozdělení pravděpodobnosti
- Definováno pomocí sdružené funkce hustoty a distribuční funkce
- Pro náhodný vektor $X = (X_1, X_2, ..., X_k)$ se sdruženou distribuční funkcí F
- Marginální distribuční funkce: $F_i(x_i) = F(∞,...,∞,x_i,∞,...,∞)$
- Marginální funkce hustoty pro spojité rozdělení

### Nezávislost náhodných veličin
- Náhodné veličiny $X_1, X_2, ..., X_k$ jsou nezávislé, pokud platí:
  $F(x_1, x_2, ..., x_k) = F_1(x_1) \cdot F_2(x_2) \cdot ... \cdot F_k(x_k)$
- Nezávislost nevyplývá automaticky z párové nezávislosti

## Bodové a intervalové odhady

### Teorie odhadu
- Cílem je určení neznámého parametru rozdělení populace na základě informace z výběrového souboru
- Při odhadování se zajímáme o:
  - Hodnotu odhadu (přibližnou hodnotu neznámého parametru)
  - Přesnost odhadu (odhad na základě konečného počtu dat bude vždy pouze přibližný)

### Bodové odhady
- Neznámý parametr charakterizujeme jedinou hodnotou
- Bodovým odhadem parametru θ je libovolná výběrová charakteristika $T(X_1, X_2, ..., X_n)$
- Příklady:
  - $T(X_1, X_2, ..., X_n) = \frac{1}{n} \sum_{i=1}^n X_i$ (odhad střední hodnoty)
  - $T(X_1, X_2, ..., X_n) = \frac{1}{n-1} \sum_{i=1}^n (X_i - \bar{X})^2$ (odhad rozptylu)

### Vlastnosti bodových odhadů
- **Nestrannost (unbiasedness):** $E(T) = θ$
- **Konzistence:** odhad se s rostoucím n přibližuje ke skutečné hodnotě
- **Vydatnost (efficiency):** odhad má minimální rozptyl
- **Robustnost:** odhad je odolný vůči odlehlým hodnotám

### Intervalové odhady
- Neznámý parametr charakterizujeme intervalem, který s velkou pravděpodobností obsahuje skutečnou hodnotu
- Interval spolehlivosti (konfidenční interval) pro parametr θ se spolehlivostí $1 - α$ je dvojice statistik $(T_D, T_H)$ takových, že: $P(T_D ≤ θ ≤ T_H) = 1 - α$
- Meze intervalu $T_D(·), T_H(·)$ jsou náhodné veličiny
- Intervalový odhad $⟨t_D, t_H⟩$ je konkrétní realizace intervalu spolehlivosti
- Hladina významnosti $α$ (obvykle 0.05, 0.01, 0.1)

### Vlastnosti intervalových odhadů
- Délka intervalu charakterizuje přesnost odhadu
- Kratší interval (při stejném α) představuje přesnější lokalizaci skutečné hodnoty
- Délka klesá s rostoucím počtem dat (odhad se zpřesňuje)
- Délka roste s $(1 - α)$ - vyšší spolehlivost vyžaduje širší interval

### Příklady intervalových odhadů
- Interval spolehlivosti pro střední hodnotu normálního rozdělení s neznámou směrodatnou odchylkou:
  $\bar{X} - t_{1-α/2}(n-1) \cdot \frac{s}{\sqrt{n}} < μ < \bar{X} + t_{1-α/2}(n-1) \cdot \frac{s}{\sqrt{n}}$
- Interval spolehlivosti pro rozptyl normálního rozdělení:
  $\frac{(n-1)s^2}{χ^2_{1-α/2}(n-1)} < σ^2 < \frac{(n-1)s^2}{χ^2_{α/2}(n-1)}$

### Praktické použití
- Bodové odhady: základní analytické dotazy typu průměr, rozptyl
- Intervalové odhady: statistické testy, p-hodnoty, analýza spolehlivosti odhadů
- Volba mezi bodovými a intervalovými odhady závisí na potřebě znát přesnost odhadu

## Příklad

Pro ilustraci uvažujme hod nesymetrickou mincí, který lze modelovat jako Bernoulliho pokus s neznámou pravděpodobností p padnutí orla:

- Bodový odhad p při 100 hodech s 30 orly: p̂ = 30/100 = 0.3
- Intervalový odhad p (95% interval spolehlivosti): 
  p̂ ± 1.96·√(p̂(1-p̂)/n) = 0.3 ± 1.96·√(0.3·0.7/100) ≈ 0.3 ± 0.09 = [0.21, 0.39]

Tento intervalový odhad nám říká, že skutečná hodnota p se s 95% pravděpodobností nachází v intervalu [0.21, 0.39].

-------------------


# 2. Lineární regrese jedné i více proměnných, odvození cenové/pokutové funkce a techniky její minimalizace, odvození gradientní metody, algoritmus gradientního sestupu, problémy a omezení gradientního sestupu; polynomiální regrese; normální rovnice.

## Základní informace
- Lineární regrese je základní stavební prvek regresních metod, který demonstruje fundamentální myšlenky regrese
- Poskytuje snadno interpretovatelný popis vztahu mezi vstupními a výstupními daty
- Využití:
  - Regresní úloha (učení s učitelem)
  - Metody bázových funkcí (RBF, GRBF)
  - Na mnoho praktických úloh z oblasti UI však nestačí
  - Lze aplikovat na transformace vstupních dat, což rozšiřuje možnosti využití

## Značení a terminologie
- **m** - celkový počet trénovacích vzorků (velikost trénovací množiny)
- **n** - počet příznaků (dimenze vstupních vektorů)
- **x** - vstupní vektor (může obsahovat několik příznaků)
- **y** - výstup (skalární predikovaná hodnota)
- **trénovací množina** - pozorované páry hodnot (např. výška osoby, velikost bot)
- **trénovací vzorek** - jeden pár hodnot, např. (x¹, y¹)

## Tvar hypotézy
Pro jednorozměrnou lineární regresi:
- hθ(x) = θ₀ + θ₁x

Pro vícerozměrnou lineární regresi:
- hθ(x) = θ₀ + θ₁x₁ + θ₂x₂ + ... + θₙxₙ
- Lze zapsat vektorově: hθ(x) = θᵀx (kde první složka x je 1 - virtuální komponenta)

## Cenová (pokutová) funkce
Slouží k určení kvality modelu - jak dobře hodnoty predikované hypotézou odpovídají skutečným hodnotám.

Pro lineární regresi používáme MSE (Mean Squared Error):
```
J(θ₀,θ₁) = (1/2m) * Σ(hθ(x⁽ⁱ⁾) - y⁽ⁱ⁾)²
```

Cílem je najít takové hodnoty parametrů θ, pro které funkce J nabývá minima.

### Optimalizace cenové funkce
Existují dva základní způsoby:
1. Gradientní sestup (iterativní metoda)
2. Normální rovnice (analytické řešení)

## Gradientní sestup
Iterativní algoritmus minimalizace cenové funkce, který postupně upravuje hodnoty parametrů:

Pseudokód:
```
opakuj dokud nedojde ke konvergenci {
    pro každý parametr θⱼ současně {
        θⱼ = θⱼ - α * (∂J(θ₀,...,θₙ)/∂θⱼ)
    }
}
```

Kde:
- α je míra učení (learning rate)
- Parciální derivace pro lineární regresi:
  - ∂J/∂θ₀ = (1/m) * Σ(hθ(x⁽ⁱ⁾) - y⁽ⁱ⁾)
  - ∂J/∂θⱼ = (1/m) * Σ(hθ(x⁽ⁱ⁾) - y⁽ⁱ⁾) * x⁽ⁱ⁾ⱼ

### Předpoklady úspěšného gradientního sestupu
1. **Škálování příznaků** - zajistit, aby složky vstupního vektoru měly podobný rozsah hodnot
   - Bez škálování hrozí pomalá konvergence nebo divergence ("cik-cak" sestup)
   - Typicky: x_j⁽ⁱ⁾ = x_j⁽ⁱ⁾ / max|x_j⁽ⁱ⁾|

2. **Normalizace středních hodnot** - zajistit nulovou střední hodnotu příznaků
   - x_j⁽ⁱ⁾ = x_j⁽ⁱ⁾ - μ_j
   - POZOR: Neaplikovat na x₀ = 1 (virtuální složku)

3. **Volba míry učení** (α)
   - Příliš malá α → pomalá konvergence
   - Příliš velká α → přestřelování, možná divergence

### Problémy a omezení gradientního sestupu
- Konverguje pouze k lokálnímu minimu (což u konvexních funkcí, jako je MSE, není problém)
- Problémy s "patologickými" funkcemi (např. Rosenbrockovská funkce)
- Velmi pomalá konvergence v blízkosti optima
- Není použitelný, pokud cenová funkce není diferencovatelná

## Polynomiální regrese
Rozšíření lineární regrese, kde hypotéza má tvar:
```
hθ(x) = θ₀ + θ₁x + θ₂x² + θ₃x³ + ...
```

Nebo obecněji:
```
hθ(x) = θ₀ + θ₁√x₁ + θ₂x₂³ + ...
```

- Stále se jedná o lineární regresi z hlediska parametrů θ, i když ne z hlediska vstupů x
- Využívá substituci (x₁ = x, x₂ = x², x₃ = x³, ...) a pak se řeší jako běžná lineární regrese
- Škálování je zde ještě důležitější než u standardní lineární regrese vzhledem k rozdílným rozsahům hodnot

## Normální rovnice
Analytický způsob nalezení minima cenové funkce bez nutnosti iterace. Pro lineární regresi:

```
θ = (XᵀX)⁻¹XᵀY
```

Kde:
- X je matice vstupů (s první sloupcem jedniček)
- Y je vektor výstupů

### Srovnání s gradientním sestupem

**Gradientní sestup:**
- Je potřeba zvolit míru učení α
- Vyžaduje mnoho iterací
- Funguje dobře i pro velké n (počet příznaků)
- Výpočetní složitost: O(k*m*n), kde k je počet iterací

**Normální rovnice:**
- Není potřeba volit míru učení
- Neiteruje se
- Časová složitost O(n³) kvůli inverzi matice
- Pro velké n (> 10 000) je neefektivní
- Problémy s invertibilitou, pokud sloupce nejsou lineárně nezávislé

## Příklad
Předpovídání ceny pozemku podle jeho rozlohy:
- Jednoduchá lineární regrese: hθ(x) = θ₀ + θ₁ * plocha
- Polynomiální: hθ(x) = θ₀ + θ₁x + θ₂x² + θ₃x³
- Důležité je zvolit tvar hypotézy, který odpovídá charakteru dat (např. ceny pozemků obvykle neklesají od určité velikosti)

## Shrnutí klíčových bodů

1. **Lineární regrese** je základní technika pro nalezení vztahu mezi vstupními a výstupními daty, kdy předpokládáme lineární závislost parametrů.

2. **Cenová funkce** (MSE) měří kvalitu modelu a je definována jako:
   - J(θ) = (1/2m) * Σ(hθ(x⁽ⁱ⁾) - y⁽ⁱ⁾)²

3. **Dva hlavní způsoby optimalizace**:
   - **Gradientní sestup**: iterativní metoda, vhodná pro velké datasety
   - **Normální rovnice**: analytické řešení, vhodné pro menší počet příznaků (n < 10 000)

4. **Polynomiální regrese** rozšiřuje lineární regresi použitím polynomiálních funkcí nebo jiných transformací vstupních dat.

5. **Důležité optimalizace**:
   - Škálování příznaků
   - Normalizace středních hodnot
   - Správná volba míry učení (α)

6. **Praktické úvahy**:
   - Pro MSE je vždy lokální minimum zároveň globálním minimem (konvexní funkce)
   - S rostoucím stupněm polynomu roste riziko přeučení modelu
   - Výběr tvaru hypotézy by měl odpovídat charakteru dat

Výše uvedená interaktivní vizualizace vám umožňuje experimentovat s parametry gradientního sestupu pro lineární regresi a pozorovat, jak ovlivňují výsledný model.



-------------------




# 3. Logistická regrese, model hypotézy logistické regrese, interpretace výsledků, rozhodovací hranice, klasifikace do více tříd – algoritmus One-vs-All.
Logistická regrese je jeden z nejpopulárnějších a nejrozšířenějších algoritmů strojového učení, který se používá pro klasifikační úlohy. Je vhodná pro případy, kdy:

- Predikovaná proměnná `y = h(x)` nabývá diskrétních hodnot:
  - Binární (binomická) logistická regrese (y ∈ {0, 1})
  - Multinomická logistická regrese s vícekategoriální vysvětlovanou proměnnou (y ∈ {0, 1, 2, ..., K})

- Predikovaná proměnná má tzv. alternativní (Bernoulliho) rozdělení pravděpodobnosti s parametrem p (pravděpodobnost úspěchu)

Přestože se jmenuje "regrese", jedná se ve skutečnosti o **klasifikační úlohu**. Na rozdíl od lineární regrese není vhodné přímo použít lineární model pro klasifikaci, protože:
- Lineární model by mohl predikovat hodnoty mimo interval [0, 1]
- Je velmi citlivý na extrémní marginální hodnoty v trénovací množině
- Nedokáže dobře modelovat nelineární rozhodovací hranice

## Model hypotézy logistické regrese

### Transformace lineárního modelu pomocí sigmoidy

Logistická regrese používá tzv. sigmoidu (speciální případ logistické funkce) k transformaci lineární kombinace vstupních příznaků na hodnotu v intervalu [0, 1]:

$$h_\theta(x) = \frac{1}{1+e^{-\theta^Tx}}$$

Kde:
- $\theta^Tx$ je lineární kombinace příznaků
- $\frac{1}{1+e^{-z}}$ je sigmoidální funkce, která mapuje libovolné reálné číslo z na hodnotu v intervalu (0, 1)

### Vlastnosti sigmoidy:
- Pro velké kladné hodnoty se blíží k 1
- Pro velké záporné hodnoty se blíží k 0
- V bodě 0 je hodnota přesně 0.5

## Interpretace výsledků

V logistické regresi interpretujeme hodnotu hypotézy $h_\theta(x)$ jako **pravděpodobnost** příslušnosti k pozitivní třídě za podmínky vstupu x:

$$h_\theta(x) = P(y = 1 | x; \theta)$$

Například: Jestliže pro nějaký vstupní vektor příznaků x je hodnota $h_\theta(x) = 0.79$, pak to znamená, že s pravděpodobností 79% tento vzorek patří do třídy 1 (pozitivní třídy).

Analogicky, pravděpodobnost, že vzorek patří do třídy 0 (negativní třídy) je:

$$P(y = 0 | x; \theta) = 1 - P(y = 1 | x; \theta) = 1 - h_\theta(x)$$

### Příklad interpretace:

Z dokumentu: V příkladu s tribodiagnostikou byla naměřena průměrná velikost částic kovu v oleji 3.27 μ. Při použití natrénovaného modelu logistické regrese dostaneme:

$$h_\theta(x) = \frac{1}{1+e^{-(\theta_0+\theta_1 \cdot 3.27)}} = 0.79$$

Interpretace: Při velikosti částic 3.27 μ je s pravděpodobností 79% potřeba ložisko vyměnit.

## Rozhodovací hranice (Decision Boundary)

Rozhodovací hranice je křivka (v případě 2D prostoru) nebo plocha (ve vícerozměrném prostoru), která odděluje třídy.

Model logistické regrese klasifikuje vstup následovně:
- Predikuje "y = 1", pokud $h_\theta(x) \geq 0.5$
- Predikuje "y = 0", pokud $h_\theta(x) < 0.5$

Vzhledem k vlastnostem sigmoidální funkce, $h_\theta(x) \geq 0.5$ právě tehdy, když $\theta^Tx \geq 0$.

### Příklad rozhodovací hranice:

Pro model s parametry $\theta = \begin{bmatrix} -3 \\ 1 \\ 1 \end{bmatrix}$ a vstupem $x = \begin{bmatrix} 1 \\ x_1 \\ x_2 \end{bmatrix}$:

Rozhodovací hranice je dána rovnicí $\theta^Tx = 0$, tedy $-3 + x_1 + x_2 = 0$, což je ekvivalentní $x_1 + x_2 = 3$.
- Pokud $x_1 + x_2 \geq 3$, model predikuje třídu 1
- Pokud $x_1 + x_2 < 3$, model predikuje třídu 0

### Nelineární rozhodovací hranice:

Logistická regrese může modelovat i nelineární rozhodovací hranice pomocí polynomiálních či jiných transformací vstupních příznaků.

Příklad: Pro model s parametry $\theta = \begin{bmatrix} -1 \\ 0 \\ 0 \\ 1 \\ 1 \end{bmatrix}$ a vstupem $x = \begin{bmatrix} 1 \\ x_1 \\ x_2 \\ x_1^2 \\ x_2^2 \end{bmatrix}$:

Rozhodovací hranice je dána rovnicí $-1 + x_1^2 + x_2^2 = 0$, což je ekvivalentní $x_1^2 + x_2^2 = 1$ - rovnice kružnice o poloměru 1.

## Cenová funkce pro logistickou regresi

Na rozdíl od lineární regrese, kde se používá metoda nejmenších čtverců, logistická regrese používá specifickou cenovou funkci, která je odvozena z principu maximální věrohodnosti:

$$J(\theta) = \frac{1}{m} \sum_{i=1}^{m} \text{Cost}(h_\theta(x^{(i)}), y^{(i)})$$

kde:

$$\text{Cost}(h_\theta(x), y) = \begin{cases} -\log(h_\theta(x)) & \text{pokud } y = 1 \\ -\log(1-h_\theta(x)) & \text{pokud } y = 0 \end{cases}$$

Tuto funkci lze shrnout do jednoho vzorce:

$$\text{Cost}(h_\theta(x), y) = -y\log(h_\theta(x)) - (1-y)\log(1-h_\theta(x))$$

### Vlastnosti cenové funkce:
- Je konvexní, což zaručuje nalezení globálního minima pomocí gradientního sestupu
- Silně penalizuje chybné predikce blízké opačnému extrému (např. predikce 0.01 pro skutečnou hodnotu 1)

## Klasifikace do více tříd - algoritmus One-vs-All

Pro klasifikaci do více než dvou tříd (K > 2) se používá technika zvaná **One-vs-All** (někdy také nazývaná One-vs-Rest):

1. Pro každou třídu i ∈ {1, 2, ..., K} natrénujeme samostatný binární klasifikátor $h_\theta^{(i)}(x)$, který rozlišuje mezi:
   - Třídou i (jako pozitivní třída)
   - Všemi ostatními třídami (jako negativní třída)

2. Získáme K klasifikátorů, kde každý predikuje pravděpodobnost příslušnosti vzorku do dané třídy:
   $h_\theta^{(i)}(x) = P(y = i | x; \theta)$

3. Při klasifikaci nového vzorku x vybíráme třídu s nejvyšší predikovanou pravděpodobností:
   $\text{predikce} = \arg\max_i h_\theta^{(i)}(x)$

### Příklad:
Pro klasifikaci do 3 tříd (např. 3 různé diagnózy v medicíně):
1. Natrénujeme klasifikátor h^(1)(x), který rozlišuje "diagnóza 1" vs. "ostatní"
2. Natrénujeme klasifikátor h^(2)(x), který rozlišuje "diagnóza 2" vs. "ostatní"
3. Natrénujeme klasifikátor h^(3)(x), který rozlišuje "diagnóza 3" vs. "ostatní"
4. Pro nový vzorek vybereme diagnózu s nejvyšší pravděpodobností

## Výhody a použití logistické regrese

- Jednoduchá implementace a interpretace (každý koeficient odpovídá vlivu příznaku)
- Rychlý trénink a predikce
- Dobře funguje, i když jsou data lineárně separovatelná
- Poskytuje pravděpodobnostní výstup (na rozdíl od některých jiných klasifikátorů)
- Základ pro pokročilejší metody (neuronové sítě)

### Příklady použití:
- Spam filtry (spam vs. ne-spam)
- Lékařská diagnostika (zdravý vs. nemocný, typy onemocnění)
- Bezpečnost (autentizovaný vs. neautentizovaný přístup)
- Predikce úvěrového rizika (splatí/nesplatí úvěr)
- Analýza sentimentu (pozitivní/negativní/neutrální)



-------------------




# 4. Support Vector Machines, cíl optimalizace jako alternativní pohled na logistickou regresi, matematický model SVM, hypotéza s bezpečnostním faktorem, jádra.

## Učení s učitelem
Support Vector Machines (SVM) je metoda strojového učení, která v klasifikační úloze slouží k nalezení optimální rozdělující nadroviny oddělující trénovací data v prostoru příznaků.

Optimální nadrovina je taková, kde body projekce trénovacích dat leží na jejích opačných stranách, tj. v poloprostorech, které tato nadrovina odděluje, a minimum vzdáleností bodů od této nadroviny je co největší (tj. po obou stranách této nadroviny je co nejširší pás bez bodů).

K popisu takové nadroviny stačí pouze nejbližší body, kterých je obvykle málo - tzv. podpůrné vektory (Support Vectors).

SVM je velmi populární a široce užívaná technika učení s učitelem, která mnohdy poskytuje "čistší" a výkonnější způsob nalezení rozdělující nadplochy než regrese či např. neuronové sítě. Známá je také pod názvem klasifikátory s širokým okrajem (Large Margin Classifier).

## Cíl optimalizace jako alternativní pohled na logistickou regresi

Modifikace logistické regrese poskytuje základní aparát SVM. Ve vzorci hypotézy logistické regrese hθ(x) = 1/(1+e^(-θ^T·x)) přeznačíme θ^T·x = z.

Jestliže y = 1, požadujeme, aby hθ(x) ≈ 1 → θ^T·x ≫ 0. Jestliže y = 0, požadujeme, aby hθ(x) ≈ 0 → θ^T·x < 0.

V SVM chceme mít co největší prázdný pás okolo rozhodovací hranice, takže pokutovací funkce penalizuje nejvíce body blízko rozhodovací hranice.

## Matematický model SVM

SVM optimalizuje výraz:
min C · Σ[y^(j)·Cost₁(θ^T·x^(j)) + (1-y^(j))·Cost₀(θ^T·x^(j))] + (1/2)·Σθ²j

kde:
- C je penalizační faktor (C = 1/λ)
- První část výrazu představuje pokutu za nesprávnou polohu bodů
- Druhá část představuje pokutu za složitost hypotézy

## Hypotéza s bezpečnostním faktorem

Na rozdíl od logistické regrese hypotéza používaná SVM nevyjadřuje pravděpodobnost, ale přímo příslušnost klasifikovaného vzorku k třídě 1 nebo 0.

Optimalizací výrazu získáme hodnoty parametrů θj, které určují výpočet hypotézy.
Hypotéza SVM: hθ(x) = 1 tehdy a jen tehdy, když θ^T·x ≥ 0, jinak 0.

Je-li y = 1, chceme, aby θ^T·x ≥ 1 (nikoliv jen ≥ 0, jako u logistické regrese).
Je-li y = 0, chceme, aby θ^T·x ≤ -1 (nikoliv jen ≤ 0).

Tento "bezpečnostní faktor" zajišťuje, že body jsou nejen správně klasifikovány, ale jsou i dostatečně vzdáleny od rozhodovací hranice, čímž se vytváří široký prázdný pás.

Pokud uvažujeme regularizační faktor C velmi vysoký (např. 100 000), taková volba C způsobí, že výsledkem optimalizace bude hodnota výrazu A velmi blízká 0. Pro y^(i) = 1: θ^T·x^(i) ≥ 1, pro y^(i) = 0: θ^T·x^(i) ≤ -1.

## Jádra (Kernels)

V příznakovém prostoru vybereme (např. ručně) body, tzv. landmarks l^(1), l^(2), l^(3). Příznaky vzorku x vypočteme jako funkci vzdálenosti k bodům l^(1), l^(2), l^(3):
f₁ = podobnost(x, l^(1)) = e^(-||x-l^(1)||²)
f₂ = podobnost(x, l^(2)) = e^(-||x-l^(2)||²)
f₃ = podobnost(x, l^(3)) = e^(-||x-l^(3)||²)

Je-li x blízko l^(1): x=l^(1) → f₁=e^(-0)=1
Naopak je-li x daleko od l^(1) → f₁=e^(-velké číslo)=0

Výpočtem podobnosti vzorku x s landmarky získáme nové příznaky.

### Výběr landmarků

Dána trénovací množina (x^(1), y^(1)), (x^(2), y^(2)),..., (x^(m), y^(m)), vybereme l^(1) = x^(1), l^(2) = x^(2),..., l^(m) = x^(m).

Pak pro každý vzorek x lze spočítat příznakový vektor f:
f = [f₀, f₁, f₂, ..., f_m], kde:
f₀ = 1 (konstanta)
f₁ = podobnost(x, l^(1))
f₂ = podobnost(x, l^(2))
...
f_m = podobnost(x, l^(m))

### Výpočet hypotézy a trénování s jádry

Výpočet hypotézy: Dán vzorek x, vypočteme příznakový vektor f∈R^(m+1). Hypotéza predikuje y = 1 → θ^T·f ≥ 0, tedy θ₀·f₀ + θ₁·f₁ + ... + θ_m·f_m ≥ 0.

Ve verzi SVM s jádry používáme vypočítaný příznakový vektor f místo původního vektoru x z trénovací množiny.

## Parametry SVM

C (= 1/λ) - velká hodnota C: malá odchylka, velký rozptyl (hrozí overfitting)
- malá hodnota C: velká odchylka, malý rozptyl (hrozí underfitting)

σ² (Gauss) - velká hodnota σ²: příznaky f_i se mění prudčeji, menší odchylka, větší rozptyl
- malá hodnota σ²: příznaky f_i se mění pomaleji, větší odchylka, menší rozptyl

## Použití SVM

Při použití knihovny je obvykle nutno určit:
- hodnotu regularizačního parametru C
- jaký kernel se užije pro výpočet "podobnosti" vzorku s landmarky
- v závislosti na volbě kernelu je pak nutno ještě specifikovat parametry příslušného kernelu (pokud nějaké má)

### Volba kernelu

SVM bez kernelu (tzv. lineární kernel) - hθ(x): y = 1 ⇒ θ^T·x ≥ 0 ... použijeme zejména, je-li n velké (tj. hodně příznaků) a m malé (málo trénovacích dat)

Gaussovský kernel - měření podobnosti vzorku x s landmarkem l prostřednictvím exponenciální funkce. V případě tohoto kernelu je třeba vhodně zvolit parametr σ². Použijeme zejména, je-li n malé a/nebo m velké. SVM s gaussovským kernelem "umí" vyrobit velmi komplexní tvar rozhodovací hranice, tj. vhodné pro obtížně separovatelná data.

Důležitá poznámka: Před použitím gaussovského kernelu je nutné provést naškálování příznaků.

### Klasifikace do více tříd

Některé knihovny SVM již disponují schopností klasifikovat do více tříd. Pokud ne, použijeme techniku one-vs-all: Natrénujeme K SVM klasifikátorů, přičemž každý poskytuje hypotézu, zda y = i, pro i = 1,2, ..., K. Trénováním získáme K vektorů parametrů θ^(1), θ^(2), ..., θ^(K). Vybereme třídu i s nejvyšší hodnotou (θ^(i))^T·x.

### SVM vs. logistická regrese či neuronové sítě

n - počet příznaků, m - počet trénovacích vzorků (velikost trénovací množiny)
- n je velké (v porovnání s m): n = 10 000, m = 10 .. 1 000 → použijeme logistickou regresi nebo SVM bez kernelu
- n je malé, m je středně velké: n = 1 .. 1 000, m = 10 .. 10 000 → použijeme SVM s gaussovským kernelem
- n je malé, m velké: n = 1 .. 1 000, m = 50 000+ → přidáme více příznaků a pak použijeme logistickou regresi nebo SVM bez kernelu

Většinu naznačených situací řeší obvykle stejně dobře neuronová síť (ANN), ale tu je mnohem problematičtější a časově náročnější natrénovat.

## Závěr

SVM je efektivní metoda strojového učení pro klasifikaci, která vytváří optimální rozdělující nadrovinu s maximálním okrajem mezi třídami. Využívá konceptu podpůrných vektorů a může pracovat jak s lineárními, tak s nelineárními daty pomocí jader. Hlavními výhodami SVM jsou robustnost, efektivita při práci s menším počtem trénovacích dat a schopnost dobře generalizovat.




-------------------


# 5. Principy testování statistických hypotéz. Testy o shodě středních hodnot, testy o shodě kovariančních struktur.

## 5.1. Principy testování statistických hypotéz

### Základní pojmy
- **Statistická hypotéza**: tvrzení o vlastnostech rozdělení pravděpodobnosti náhodné proměnné nebo jejích parametrů
- **Nulová hypotéza (H₀)**: hypotéza, jejíž platnost ověřujeme
- **Alternativní hypotéza (H₁)**: hypotéza, kterou stavíme proti nulové hypotéze
  - Může být **oboustranná** (H₁: A ≠ B) nebo **jednostranná** (H₁: A > B nebo H₁: A < B)

### Typy testů
- **Parametrické testy**: týkají se konkrétních číselných parametrů rozložení (např. střední hodnota, rozptyl)
- **Neparametrické testy**: ostatní typy testů, které nezávisí na konkrétním typu rozdělení

### Testovací procedura
1. Formulace nulové a alternativní hypotézy
2. Volba testovacího kritéria (statistiky)
3. Stanovení hladiny významnosti (α)
4. Výpočet testovací statistiky
5. Rozhodnutí o zamítnutí/nezamítnutí H₀

### Klíčové koncepty
- **Hladina významnosti (α)**: pravděpodobnost chybného zamítnutí nulové hypotézy (obvykle 0.05 nebo 0.01)
- **Konfidenční interval**: interval prakticky možných hodnot, který s pravděpodobností 1-α obsahuje skutečnou hodnotu parametru
- **Chyby při testování**:
  - **Chyba I. druhu**: zamítnutí H₀, ačkoli platí (pravděpodobnost = α)
  - **Chyba II. druhu**: nezamítnutí H₀, ačkoli neplatí

### Důležité zásady
- Při nezamítnutí H₀ netvrdíme, že H₀ platí - pouze konstatujeme, že nemáme dostatek důkazů pro její zamítnutí
- Data mohou pouze podporovat nebo nepodporovat rozhodnutí o zamítnutí H₀

## 5.2. Testy o shodě středních hodnot

### Předpoklady testů
- Normalita dat
- Podobnost rozptylů porovnávaných skupin
- Nezávislost jednotlivých pozorování

### z-test
- Pro testování shody střední hodnoty, když známe populační směrodatnou odchylku
- Testová statistika: 
  ```
  z = (x̄ - μ₀)/(σ/√n) ~ N(0,1)
  ```
- Používá se zřídka, protože většinou σ neznáme

### t-testy
#### Jednovýběrový t-test
- Testujeme shodu průměru jedné skupiny se známou hodnotou
- H₀: μ = μ₀ vs. H₁: μ ≠ μ₀
- Testová statistika: 
  ```
  t = (x̄ - μ₀)/(s/√n) ~ t(n-1)
  ```

#### Dvouvýběrový t-test (nepárový)
- Porovnání průměrů dvou nezávislých skupin
- H₀: μ₁ = μ₂ vs. H₁: μ₁ ≠ μ₂
- Pro vícerozměrná data používáme váženou kovarianční matici

#### Párový t-test
- Porovnání průměrů dvou závislých měření (např. před/po zákroku)
- Testujeme rozdíly párových měření proti nulové hodnotě

### Analýza rozptylu (ANOVA)
#### Jednofaktorová ANOVA
- Rozšíření t-testu na více než dvě skupiny
- H₀: μ₁ = μ₂ = ... = μₖ vs. H₁: ne všechny průměry jsou stejné
- Testuje se pomocí F-statistiky (poměr meziskupinové a vnitroskupinové variability)

#### Dvoufaktorová ANOVA
- Testuje vliv dvou nezávislých faktorů a jejich interakci
- H₀: průměry skupin jsou stejné pro oba faktory a neexistuje interakce

## 5.3. Testy o shodě kovariančních struktur

### Testování shodnosti kovariančních matic
- Důležité před použitím mnoha vícerozměrných metod
- Testování hypotézy H₀: Σ₁ = Σ₂ = ... = Σₖ
- Používá se např. Boxův M-test nebo Bartlettův test

### Testy homogenity rozptylů
- Předpoklad pro ANOVA a jiné testy
- H₀: σ₁² = σ₂² = ... = σₖ²
- Levenův test, Bartlettův test, Cochranův test

### Vícerozměrný dvouvýběrový t-test
- Zohledňuje korelace mezi jednotlivými proměnnými
- Testuje, zda se dvě skupiny liší v souboru proměnných jako celku
- Používá Hotellingovu T² statistiku

### Příklad praktického využití
- Porovnání fyziologických parametrů pacientů před a po léčbě
- Testování aerodynamických úprav vozidel na spotřebu paliva
- Srovnávání životnosti pneumatik s různými vlastnostmi

## 5.4. Shrnutí
- Testování hypotéz je klíčový nástroj pro nalezení statisticky významných rozdílů mezi skupinami dat
- Testy o shodě středních hodnot slouží k ověření, zda se liší centrální tendence skupin
- Testy o shodě kovariančních struktur ověřují, zda mají skupiny podobnou variabilitu a korelační strukturu
- Správná volba testu závisí na typu dat, počtu skupin a jejich vzájemné závislosti/nezávislosti

-------------------


# 6. Snižování dimenze (metoda hlavních komponent - cíle metody, předpoklady metody, odvození a použití metody na příkladech; t-SNE - princip, srovnání s PCA).
Zpracuji státnicovou otázku o snižování dimenze dat s důrazem na PCA a t-SNE. Informace poskytnu v přehledné a srozumitelné formě.

## Metoda hlavních komponent (PCA - Principal Component Analysis)

### Cíle metody
- Extrahovat z dat "nejdůležitější" informace
- Zmenšit dimenzi dat při zachování důležitých informací
- Zjednodušit popis dat (např. při multikolinearitě - matice X nemá plnou hodnost)
- Analyzovat souvislosti mezi proměnnými
- Identifikovat odlehlá nebo příliš vlivná pozorování
- Vizualizovat mnohorozměrná data v 2D/3D prostoru
- Urychlit algoritmy strojového učení (snížením výpočetní náročnosti)

### Předpoklady metody
- Dostatečně silná korelace mezi proměnnými (nemá smysl redukovat zcela nekorelovaná data)
- Linearita vztahů mezi proměnnými (PCA je lineární metoda)
- Data by měla být normalizovaná (stejný rozsah hodnot), protože PCA je citlivá na měřítko dat

### Odvození PCA
1. **Matematická definice**: PCA je definováno vztahem Y = X·V, kde:
   - X je matice původních dat s n vzorky (řádky) a d dimenzemi (sloupci)
   - V je matice vlastních vektorů kovarianční matice
   - Y je výstupní matice redukovaných dat

2. **Kroky algoritmu**:
   - Normalizace střední hodnoty (odstranění průměru z dat)
   - Výpočet kovarianční matice Σ = (1/m)·X^T·X
   - Výpočet vlastních vektorů a vlastních čísel kovarianční matice pomocí SVD (Singular Value Decomposition)
   - Výběr k největších vlastních čísel a jejich odpovídajících vlastních vektorů
   - Projekce dat do nového k-dimenzionálního prostoru

3. **Vlastnosti**:
   - Nové proměnné (komponenty) jsou vytvářeny postupně s klesajícím významem
   - Nové proměnné jsou vzájemně nekorelované
   - První komponenta zachycuje nejvíce variability dat, každá další maximalizuje zachycení zbývající variability
   - Výběrový rozptyl každého sloupce redukovaných dat se rovná příslušnému vlastnímu číslu

### Příklady použití PCA
1. **Vizualizace dat**:
   - Redukce MNIST datasetu (rukopisné číslice) z 784 dimenzí na 2D pro vizualizaci

2. **Komprese obrazů**:
   - Redukce 64×64 pixelů (4096 dimenzí) na 16 dimenzí pro úsporu paměti
   - Zrekonstruovaný obraz si zachovává většinu vizuálních informací

3. **Analýza technických dat**:
   - Redukce 10 parametrů vrtulníků (rychlost, dolet, výkon...) na 2 dimenze pro porovnání modelů

4. **Předzpracování dat pro strojové učení**:
   - Snížení dimenze vstupních dat před aplikací algoritmů učení s učitelem
   - Například redukce z 16381D na 1021D pro zrychlení výpočtů

### Nevhodné použití PCA
- Jako nástroj k zabránění přeučení (overfitting) - existují lepší metody (regularizace, proměnná, cross-validace)
- Aplikace na nekorelovaná data (je zbytečná, když data nejsou redundantní)
- Použití bez zkušebního spuštění algoritmu na původních datech (vždy nejprve otestujte původní data)

## t-SNE (t-distributed Stochastic Neighbor Embedding)

### Princip
- Nelineární metoda redukce dimenze zaměřená na zachování lokální struktury dat
- Zachovává podobnostní vztahy mezi body - podobné body v původním prostoru zůstávají blízko i v redukovaném prostoru
- Definuje podobnosti bodů pomocí podmíněných pravděpodobností (Gaussovo rozdělení v původním prostoru, t-rozdělení v cílovém prostoru)

### Algoritmus t-SNE
1. Vygenerování náhodných bodů x₁, x₂, x₃... ∈ R² v cílovém prostoru
2. Výpočet podobností qᵢⱼ v cílovém prostoru a gradientu g_i = 4∑ₖ(pᵢⱼ-qᵢⱼ)(xᵢ-xⱼ)/(1+||xᵢ-xⱼ||²)
3. Posun bodů xᵢ ve směru gradientu
4. Opakování kroků 2-3 k-krát (iterativní optimalizace)

### Vlastnosti t-SNE
- Stochastická metoda - nedává stejné výsledky při opakovaných spuštěních
- Výpočetně náročnější než PCA
- Dobře odděluje shluky (klastry) dat a zachovává jejich vnitřní strukturu
- Vhodná především pro vizualizaci mnohorozměrných dat ve 2D/3D

## Srovnání PCA a t-SNE

### Společné vlastnosti
- Obě metody redukují dimenzi dat
- Obě lze použít pro vizualizaci mnohorozměrných dat

### Rozdíly
- **Linearita**: PCA je lineární, t-SNE je nelineární
- **Cíl**: 
  - PCA maximalizuje zachování celkové variability dat
  - t-SNE zachovává párové podobnosti mezi body
- **Interpretovatelnost**: 
  - PCA komponenty mají jasnou interpretaci (lineární kombinace původních proměnných)
  - t-SNE výsledky nemají přímou interpretaci vzhledem k původním proměnným
- **Výpočetní náročnost**: PCA je výrazně rychlejší než t-SNE
- **Determinismus**: PCA dává stejné výsledky při opakovaných spuštěních, t-SNE je stochastické
- **Použití**:
  - PCA je vhodné pro kompresi dat, předzpracování, extrakci příznaků
  - t-SNE je vhodné především pro vizualizaci a objevování shluků v datech

### Praktické doporučení
- Pro obecné snížení dimenze a kompresi dat použijte PCA
- Pro vizualizaci komplexních mnohorozměrných dat použijte t-SNE
- Pro předzpracování dat pro strojové učení vyzkoušejte nejprve PCA

-------------------



# 7. Shluková analýza, cíle metody, předpoklady metody, odvození a použití metody na příkladech. Optimalizační kritérium K-means, výběr centroidů, volba počtu shluků.
## 7.1. Úvod a základní charakteristika

Shluková analýza je metoda učení bez učitele, což znamená, že data v trénovací množině neobsahují informaci o správné klasifikaci (na rozdíl od učení s učitelem, kde máme vzorky s přiřazenými třídami).

### Cíle metody:
- Algoritmus se snaží v datech nalézt nějakou organizaci/strukturu, např. shluky (clustery)
- Identifikuje skupiny podobných objektů v datové množině
- Maximalizuje podobnost objektů uvnitř shluků a minimalizuje podobnost mezi shluky

### Předpoklady metody:
- Nepotřebuje "správnou" odpověď učitele
- Trénovací množina rozumně pokrývá skutečnost
- Použitá vzdálenost mezi objekty musí být metrika
- Určíme počet shluků (u některých algoritmů)

## 7.2. Praktické aplikace shlukování

### Komerce:
- **Analýza a segmentace trhu** - rozdělení zákazníků podle nákupního chování
- **Cílená reklama** - zasílání personalizovaných nabídek zákazníkům v určitém shluku
- **Marketing** - identifikace skupin zákazníků pro různé marketingové strategie
- **Doporučovací systémy** - nabízení produktů na základě podobnosti s jinými zákazníky

### Sociální sítě:
- **Analýza sociálních sítí** - identifikace komunit nebo skupin uživatelů
- **Kustomizace obsahu** - personalizace na základě chování uživatelů
- **Bezpečnostní analýzy** - detekce podezřelého chování

### Věda a technologie:
- **Astronomie** - klasifikace hvězd a galaxií
- **Genetika** - shlukování genů s podobnou funkcí
- **IT infrastruktura** - organizace výpočetních cloudů pro optimalizaci toku dat a vytížení sítě

### Příklad:
Shlukování velikostí oblečení na základě hmotnosti a výšky zákazníka, kde vznikají shluky S (small), M (medium) a L (large).

## 7.3. Metoda K-means (K-středních)

### Základní princip:
K-means je dvou-krokový iterační algoritmus:
1. **Výpočet shluků** - přiřazení bodů k nejbližšímu centroidu
2. **Přesun centroidů** - přesunutí centroidů do těžiště přiřazených bodů

### Algoritmus K-means:
1. "Náhodně" zvolíme lokaci K centroidů (typicky výběrem K náhodných bodů z trénovací množiny)
2. Vypočítáme vzdálenost všech bodů od centroidů
3. Přiřadíme každý bod k nejbližšímu centroidu
4. Vypočítáme střední hodnotu souřadnic vzniklých shluků
5. Přesuneme jednotlivé centroidy na pozici vypočtenou v předchozím kroku
6. Testujeme: pokud se centroidy pohnuly, jdeme zpět na krok 2, jinak končíme

### Formální zápis algoritmu:
**Vstup:**
- parametr K (počet shluků)
- trénovací množina {x^(1), x^(2), x^(3),..., x^(m)}, x^(i) ∈ ℝⁿ

**Inicializace:**
- náhodně inicializujeme K centroidů μ₁, μ₂,..., μₖ ∈ ℝⁿ

**Iterace:**
```
do {
  for i <- 1..m
    c(i) <- index k centroidu nejblíže x(i), tj. min ||x(i) - μₖ||²
  for k <- 1..K
    μₖ <- průměr průmětů vzorků x(i), kde c(i) = k
}
```

### Výzvy a omezení:
- Algoritmus může skončit v lokálním optimu (nevhodně zvolené počáteční centroidy)
- Vzhledem ke konečné přesnosti reprezentace reálných čísel v PC může dojít k oscilaci (centroidy se cyklicky pohybují do nekonečna)
- Řešení problému oscilace: zavedení prahové hodnoty, která určuje, že změna pozice centroidu je natolik malá, že je přijatelná

## 7.4. Optimalizační kritérium K-means

### Význam optimalizačního kritéria:
- Umožňuje algoritmické ladění (ukazuje, zda algoritmus běží korektně a konverguje)
- Na základě optimalizačního kritéria lze stanovit optimální počet shluků K
- Pomáhá matematicky vyjádřit cíl, který algoritmus sleduje

### Formalizace:
**Označení:**
- c^(i) - index shluku (1, 2, ..., K), ke kterému je přiřazen vzorek x^(i)
- μₖ - centroid shluku k (μₖ ∈ ℝⁿ)
- μ_c(i) - centroid shluku, ke kterému je přiřazen vzorek x^(i)

**Cenová funkce:**
J(c^(1), c^(2),..., c^(m), μ₁, μ₂,..., μₖ) = (1/m) * Σ ||x^(i) - μ_c(i)||²

**Optimalizační kritérium:**
min J(c^(1),..., c^(m), μ₁,..., μₖ)

### Interpretace:
- Cílem je minimalizovat zkreslení (distortion) algoritmu K-means
- Chceme, aby všechny body byly co nejblíže příslušným centroidům
- Algoritmus K-means lze chápat jako minimalizaci této cenové funkce

## 7.5. Výběr centroidů

### Problematika výběru:
- Pokud centroidy umístíme špatně, algoritmus může konvergovat do nesmyslného lokálního optima
- Příklady špatné lokace centroidů:
  - Vygenerování náhodných souřadnic (centroid může být v oblasti bez dat)
  - Většina bodů má téměř stejnou vzdálenost k centroidům

### Doporučený přístup:
- **Jako centroid vybíráme náhodný bod z trénovací množiny**
- Tím zajistíme, že centroid bude v oblasti, kde se nacházejí data

### Hledání globálního optima:
1. Provedeme více inicializací metody K-means (cca 50-100x, záleží na dimenzionalitě úlohy a velikosti trénovací množiny)
2. Pro každý výsledek spočítáme cenovou funkci (suma vzdáleností centroidů a shluků)
3. Vybereme ten výsledek, kde je "pokuta" (hodnota cenové funkce) nejmenší

Tento postup funguje nejlépe při relativně malém K (2-10 shluků).

## 7.6. Volba počtu shluků

### Problém:
Pokud zvolíme stejný počet shluků jako je prvků v množině, pak pokuty cenové funkce jsou nulové, ale nic jsme nevyřešili.

### Strategie volby počtu shluků:
1. **Manuální volba** - na základě expertní analýzy, vizualizace dat
2. **Metoda lokte (elbow method)** - grafické určení bodu, kde přidání dalšího shluku nepřináší výrazné zlepšení
3. **Metoda vyhovění účelu (Downstream Purpose)** - počet shluků vychází z praktického cíle analýzy

### Metoda lokte (elbow method):
- Vyjádříme cenovou funkci J(...) v závislosti na počtu shluků
- Vybereme počet shluků v místě "zalomení" (loket) této závislosti
- Pokud závislost nemá loket a funkce se přibližuje k 0, pak data v trénovací množině pravděpodobně netvoří přirozené shluky

### Metoda vyhovění účelu:
- Od zákazníka víme, že požaduje konkrétní počet shluků
- Příklad: Pokud hledáme velikosti oblečení, pak nechceme více než 3-5 shluků (S, M, L, případně XS a XL)

## 7.7. Příklad aplikace v praxi

**Segmentace zákazníků e-shopu:**
- **Data:** historie nákupů, demografické údaje, chování na webu
- **Cíl:** identifikovat skupiny zákazníků s podobným chováním
- **Postup:**
  1. Určení relevantních atributů (věk, frekvence nákupu, průměrná útrata)
  2. Standardizace dat
  3. Výběr počtu shluků metodou lokte (např. 4 shluky)
  4. Aplikace K-means s několika různými inicializacemi
  5. Výběr nejlepšího řešení podle cenové funkce
  6. Interpretace získaných shluků (např. "příležitostní zákazníci", "pravidelní zákazníci", "VIP zákazníci", "noví zákazníci")
  7. Vytvoření personalizovaných marketingových strategií pro každý segment

Tímto způsobem může e-shop efektivněji cílit své marketingové kampaně a lépe uspokojit potřeby různých skupin zákazníků.


-------------------



# 8. Diskriminační analýza, cíle metody, odvození a použití metody na příkladech.
Diskriminační analýza je vícerozměrná statistická metoda, která má za cíl najít rozhodovací pravidlo umožňující na základě hodnot náhodného vektoru X = (X₁, X₂, ..., Xₖ) rozdělit data do tříd A₁, A₂, ..., Aₚ. Používá se v situacích, kdy rozdělení dat do tříd je známo jako apriorní informace.

## Cíle diskriminační analýzy

1. Na trénovací množině dat sestavit rozhodovací pravidlo (diskriminační část)
2. Zhodnotit kvalitu rozhodovacího pravidla z pohledu trénovací množiny
3. Použít rozhodovací pravidlo pro další část dat (nezahrnutých v trénovací skupině) a zhodnotit jeho predikční schopnosti

## Matematická formulace diskriminační analýzy

Uvažujme k-rozměrný náhodný vektor X = (X₁, X₂, ..., Xₖ), který charakterizuje sledovanou jednotku. Označme S k-rozměrný prostor hodnot, kterých mohou nabývat náhodné vektory X (obvykle S = Rᵏ).

Náhodný vektor X je popsán sdruženou funkcí hustoty fₖ(x) a pro praktické provedení diskriminační analýzy máme k dispozici n realizací náhodného vektoru.

Dále označme Aⱼ pro j = 1, 2, ..., p náhodný diskrétní jev vyjadřující příslušnost X k j-té třídě a P(Aⱼ) = πⱼ nechť je apriorní pravděpodobnost příslušnosti k j-té třídě.

Cílem diskriminační analýzy je rozdělit prostor S na Sⱼ disjunktních oblastí, které budou korespondovat s náhodnými jevy Aⱼ.

## Rozhodovací pravidla

### 1. Pravidlo založené na kritériu maximální věrohodnosti

Vycházíme ze znalosti rozdělení Aⱼ ~ gⱼ pro j = 1, 2, ..., p. Maximálně věrohodné diskriminační pravidlo (ML) je založeno na principu, kdy x zařadíme do oblasti Sⱼ, pro kterou je hodnota maximální věrohodnostní funkce:

Lⱼ(x) = gⱼ(x) = max gᵢ(x) pro i = 1, 2, ..., p

Matematicky ML pravidlo zapíšeme:
Sⱼ = {x: Lⱼ(x) > Lᵢ(x) pro i = 1, 2, ..., p; i ≠ j}

### 2. Bayesovo rozhodovací pravidlo

Využívá apriorní pravděpodobnosti příslušnosti k j-té třídě (tj. P(Aⱼ) = πⱼ).
Diskriminační pravidlo je založeno na maximalizaci podmíněné pravděpodobnosti:

P(Aⱼ|x) = (πⱼ·fⱼ(x))/(∑ᵏⱼ₌₁ πⱼ·fⱼ(x))

Množina Sⱼ určující příslušnost k j-té třídě je dána vztahem:
Sⱼ = {x, πⱼ·fⱼ(x) ≥ πᵢ·fᵢ(x); i = 1, 2, ..., p; i ≠ j}

### 3. Fisherova diskriminační analýza

Metoda je založena na hledání lineární transformace a ∈ Rᵏ vektoru X, při které minimalizujeme poměr součtu čtverců odchylek mezi třídami ku součtu čtverců uvnitř tříd.

## Předpoklady LDA (Lineární diskriminační analýza)

- **Normalita**: Předpokládá se, že data v každé skupině jsou normálně rozložena
- **Stejná kovarianční matice**: Předpokládá se, že všechny skupiny mají stejnou kovarianční matici
- **Lineární vztahy**: Předpokládá se, že proměnné mají lineární vztahy

## Odvození diskriminační funkce

1. Pro každou skupinu se vypočítají střední hodnoty a kovarianční matice
2. Kombinovaná kovarianční matice se odhaduje jako vážený průměr kovariančních matic jednotlivých skupin
3. Diskriminační funkce se odvodí jako lineární kombinace prediktorů, která maximalizuje rozptyl mezi skupinami relativně k rozptylu uvnitř skupin

Matematicky je lineární diskriminační funkce dána vzorcem:
Dₖ(x) = x'Σ⁻¹μₖ - ½μₖ'Σ⁻¹μₖ + log(πₖ)

kde:
- x je vektor prediktorů
- Σ je kovarianční matice
- μₖ je vektor středních hodnot skupiny k
- πₖ je apriorní pravděpodobnost skupiny k

## Klasifikace

Nové pozorování x je klasifikováno do skupiny, pro kterou diskriminační funkce Dₖ(x) je maximální.

## Metody hodnocení kvality klasifikace

- Kritéria založená na rozdělených datech (trénovací a testovací data)
- Metody založené na principu crossvalidace (random subsampling, k-fold cross-validation, leave-one-out cross validation)
- Metody založené na permutačních testech

### Konkrétní metody hodnocení kvality pro diskriminační analýzu

Míru chybovosti měříme pomocí APER (apparent error rate):
APER = (∑ᵢⱼ nᵢⱼ/n) · 100%, kde i≠j

ROC křivky - slouží k obecnějšímu hodnocení senzitivity a specificity klasifikace.

## Použití diskriminační analýzy na příkladech

### Příklad 1: Klasifikace pacientů
Dataset obsahuje různé biologické ukazatele pacientů s dvěma typy onemocnění (např. nemoc A a nemoc B). Pomocí diskriminační analýzy vytvoříme model, který dokáže správně klasifikovat nové pacienty do jedné z těchto skupin na základě biologických ukazatelů.

### Příklad 2: Rozpoznávání rukopisu
Dataset obsahuje obrazové charakteristiky rukopisných čísel. LDA může být použita ke snížení dimenze a vytvoření diskriminačních funkcí, které rozliší mezi jednotlivými číslicemi (0-9).

### Příklad 3: Marketingová analýza
Firma použije LDA k rozlišení mezi typy zákazníků na základě jejich demografických a behaviorálních dat. Na základě tohoto modelu může předpovědět, ke které skupině patří nový zákazník a personalizovat marketingové strategie.

### Příklad 4: Úvěrové skóring
Banka může použít diskriminační analýzu k rozhodnutí, zda poskytnout úvěr žadateli na základě jeho finančních a osobních údajů, kdy cílem je rozlišit mezi bonitními a problémovými klienty.

## Shrnutí

Diskriminační analýza je efektivní metoda pro klasifikaci objektů na základě vícerozměrných dat, kdy máme k dispozici informaci o třídách/skupinách objektů. Metoda poskytuje nejen klasifikační pravidlo, ale také informaci o jeho kvalitě, což umožňuje posoudit spolehlivost klasifikace.

-------------------



# 9. Různé možnosti vizualizace kvantitativních dat: scatter ploty, histogramy, boxploty, violin ploty, paralelní souřadnice, ….
## Základní principy vizualizace kvantitativních dat

Kvantitativní data jsou číselné údaje, které mohou být měřeny a kvantifikovány. Výběr vhodné vizualizace závisí na:

- **Typu dat**: počet proměnných, spojitá vs. diskrétní data
- **Cíli vizualizace**: 
  - Exploratory (průzkumná) - prozkoumání dat, nalezení souvislostí
  - Explanatory (vysvětlující) - prezentace výsledků, argumentace 
- **Cílovém publiku**: odborníci vs. široká veřejnost
- **Charakteristikách dat**: rozložení, přítomnost outlierů, atd.

## 9.1. Scatter ploty (bodové grafy)

- Používají se pro vizualizaci multidimenzionálních dat do 2D prostoru
- Standardní scatter plot zobrazuje 2 dimenze (proměnné)
- Třetí dimenzi lze vizualizovat pomocí:
  - Barvy bodů
  - Tvaru bodů
  - Velikosti bodů (tzv. Bubble chart)

Pro více dimenzí lze použít:

- **Quadrant ploty**: rozdělení dat do čtyř sekcí pro snadnější porovnání
  - Rozdělení může být podle: mediánu/průměru, rozsahu dat, kritických hodnot
- **Scatter plot matrix (SPLOM)**: grid scatter plotů pro každou kombinaci proměnných
  - Umožňuje identifikaci korelací mezi atributy
  - Použitelnost klesá s rostoucím počtem proměnných
- **Korelační matice**: hodnoty v intervalu <-1, 1>
  - 1: perfektní pozitivní korelace
  - 0: žádná korelace
  - -1: perfektní negativní korelace

Pro redukci dimenzí lze použít techniky jako:
- **PCA** (Principal Component Analysis): transformace dat z n-rozměrného prostoru do menšího, cílem je maximalizovat rozptyl a zmenšit vzdálenost mezi body

## 9.2. Histogramy

- Vizuální reprezentace distribuce (rozložení) kvantitativních dat
- Postup tvorby:
  1. Rozdělit rozsah hodnot do intervalů ("binů")
  2. Spočítat, kolik hodnot spadá do každého intervalu
- Intervaly obvykle:
  - Sousedí spolu (nepřekrývají se)
  - Mají stejnou velikost (ale nemusí)
- Histogramy ukazují:
  - Hustotu distribuce dat
  - Tvar rozložení (normální, zešikmené, bimodální atd.)

Histogramy bývají často zaměňovány se sloupcovými grafy:
- V histogramu každý sloupec reprezentuje rozsah hodnot → zobrazuje rozložení
- Ve sloupcovém grafu každý sloupec reprezentuje jinou kategorii → umožňuje porovnání

## 9.3. Boxploty (krabicové grafy)

- Používají se v deskriptivní statistice
- Vizualizují numerická data pomocí kvartilů
- Části boxplotu:
  - "Krabice": ohraničena 1. a 3. kvartilem, uvnitř je linie označující medián
  - "Vousy": linie vycházející z krabice, zobrazují variabilitu pod 1. a nad 3. kvartilem
  - Outliery: zobrazeny jako jednotlivé body mimo vousy
- Boxploty jsou vhodné pro:
  - Zobrazení rozdílů mezi datovými soubory
  - Identifikaci odlehlých hodnot
  - Rychlé porovnání distribucí
- Mohou být vykresleny vodorovně nebo svisle

## 9.4. Violin ploty

- Generalizace Vase plotu (který je rozšířením boxplotu)
- Kombinují:
  - Statistiky boxplotu (mediány, kvartily)
  - Zobrazení kompletního průběhu distribuce dat
- Výhody:
  - Snadno identifikovatelné shluky v datech
  - Zobrazení multimodálních distribucí
- Nevýhody:
  - Mohou zabírat více místa pro zobrazení atributů
  - Složitější interpretace pro neodborné publikum

## 9.5. Paralelní souřadnice

- Umožňují teoreticky zobrazit neomezené množství dimenzí
- Každá dimenze je reprezentována vertikální osou
- Data jsou zobrazena jako lomené čáry procházející osami
- Vlastnosti:
  - Různé škály hodnot na osách ztěžují porovnání
  - Anomálie a chybějící hodnoty jsou snadno viditelné
- Výhody:
  - Snadné spatření outlierů
  - Viditelné korelace mezi atributy
- Nevýhody:
  - Čitelnost klesá s rostoucím počtem dimenzí a prvků
  - Vhodné max. pro ~100 prvků

Pro zlepšení čitelnosti lze použít:
- Semi-transparentní čáry (průhlednost)
- Seskupení podle kategorií (barevné odlišení)
- Interaktivní filtrování
- Přeorganizování os podle podobností
- Slope graph: speciální paralelní graf pouze se 2 proměnnými

## 9.6. Další typy vizualizací

- Sloupcové grafy
- Koláčové grafy 
- Radarové grafy (radar chart)
  - Osy již nejsou ortogonální, protínají se v bodě "nula"
  - Mohou zobrazit až 10 dimenzí v jedné vizualizaci
  - Obtížné porovnávání hodnot na nesousedních osách
- Heatmapy
- Radviz (radiální vizualizace)
  - Na kružnici jsou rozmístěny osy a body ukazují blízkost k daným atributům
- Timewheel
- Streamgraphs

## Příklady použití

1. **Scatter plot**: Vztah mezi výškou a váhou pacientů, třetí proměnná (např. věk) může být reprezentována barvou
2. **Histogram**: Rozložení výsledků testů ve třídě
3. **Boxplot**: Porovnání hodnot krevního tlaku u různých věkových skupin
4. **Violin plot**: Zobrazení distribuce příjmů v různých odvětvích
5. **Paralelní souřadnice**: Vizualizace multidimenzionálních dat jako jsou vlastnosti vozidel (spotřeba, výkon, hmotnost, cena)

## Shrnutí a doporučení

- Pro porovnání dvou proměnných: scatter plot
- Pro zobrazení distribuce jedné proměnné: histogram
- Pro porovnání distribucí mezi skupinami: boxplot nebo violin plot
- Pro zobrazení více dimenzí: paralelní souřadnice, SPLOM, radar chart
- Vždy myslete na cílové publikum a účel vizualizace
- Volte vizualizaci, která umožní co nejsnazší pochopení dat a nevede k mylným interpretacím

-------------------



# 10. Vizualizaci hierarchií a relací: node-link diagrams, techniky rozložení uzlů (layout), containment diagrams (např. Treemap), layering (např. icicle plots); maticová vizualizace  rozsáhlých grafů.

## 10.1. Terminologie

### Graf
- **Definice**: Množina uzlů (vrcholů), které mohou být propojeny vztahy (hranami)
- **Uzel** = objekt, např. osoba, komponenta
- **Hrana** = vztah mezi dvěma uzly
  - Orientované × neorientované
  - Ohodnocené × neohodnocené
- **Typické úlohy**: 
  - Nejkratší cesta
  - Způsoby jak se dostat z uzlu A do B
  - Maximální průtok
  - Existence cyklu
  - Existence kliky

### Hierarchie
- **Definice**: Acyklický graf, kde uzly jsou uspořádány podle důležitosti
- Uzly bez příchozích hran tvoří vrstvu nejvyšší úrovně (např. generálové v armádě)
- Hrany představují přirozené vztahy (rodič-dítě, člen skupiny)

### Strom
- **Definice**: Hierarchie s pouze jedním uzlem nejvyšší úrovně (kořen) a jedním rodičem pro každý další uzel
- Obsahuje vnitřní uzly a listy

## 10.2. Techniky vizualizace hierarchických dat

### 10.2.1 Odsazení (Indentation)
- Odsazení ukazuje vztah rodič-dítě
- Kořen je vlevo
- Uzly na stejné úrovni mají stejnou vzdálenost od levého kraje
- **Výhody**:
  - Často používané v GUI (např. filesystém)
  - Snadná implementace
  - Intuitivní pochopení

### 10.2.2 Node-link diagramy 

Uzly spojené čarami nebo křivkami, které reprezentují vztahy.

#### Techniky rozložení (layouts):

**A) Horizontální layout**
- Podobné jako odsazení
- Kořen vlevo, listy vpravo
- Jednoduchá implementace

**B) Vertikální layout**
- Kořen nahoře
- Uzly stejně vzdálené od kořene umístěné na stejné vodorovné čáře
- Lepší pro pochopení struktury
- Může být komplexnější na zakreslení

**C) Reingold-Tilford algoritmus**
- Vytvořen pro binární stromy O(2n)
- Bottom-up průchod
- Vytváří esteticky příjemné rozvržení s minimálním plýtváním prostoru
- Zajišťuje, že podobné podstromy jsou umístěny podobně

**D) Radiální layout**
- Používá polární souřadnice
- Poloměr (vzdálenost od středu) kóduje hloubku zanoření
- Na uspořádání lze použít varianta Reingold-Tilforda
- Vhodné pro zobrazení velkých hierarchií

### 10.2.3 Containment diagramy

Vizualizace, kde uzly jsou reprezentovány tvary (kruhy, obdélníky, čtverce) a vztah rodič-dítě je vyjádřen vnořením.

- Velikost tvaru lze určit podle velikosti podstromu
- Hodnota rodiče musí být stejná nebo větší než součet všech potomků

**Výhody:**
- Snadno rozpoznatelné uzly extrémních velikostí
- Efektivní využití prostoru

**Nevýhody:**
- Obtížné pochopení hloubky hierarchie

#### Typy containment diagramů:

**A) Circle-packing layout**
- Uzly reprezentované kruhy
- Vnořené kruhy reprezentují hierarchickou strukturu
- Plýtvání prostorem (mezery mezi kruhy)

**B) Treemap**
- Opakované dělení prostoru podle hodnot v uzlech
- Efektivně využívá prostor
- Problém s "pruhy" při nevyvážených datech (špatná čitelnost)

**C) Squarified Treemap**
- Vylepšení tradičního treemapu
- Algoritmus optimalizuje poměr stran obdélníků (blíže ke čtvercům)
- Greedy algoritmus - lokálně optimální řešení
- Lepší čitelnost než klasický treemap

**D) Voronoi Treemap**
- Používá Voronoi buňky místo obdélníků
- Flexibilnější tvary
- Podobné algoritmu k-means
- Organičtější vzhled

### 10.2.4 Layering (vrstvení)

Rekurzivní dělení prostoru pomocí vrstev pro zakódování hloubky.

- Přilehlost zachována jako v diagramech uzel-link
- Vizualizace může obsahovat prázdná místa

**Běžná rozložení:**
- **Horizontální/vertikální** → Icicle plots
  - Obdélníky reprezentují uzly
  - Šířka/výška může reprezentovat hodnotu uzlu
  - Snadné sledování cesty od kořene k listu
  
- **Radiální** → Sunburst charts
  - Kruhové výseče reprezentují uzly
  - Vnitřní kruhy jsou blíže ke kořeni
  - Úhel výseče může reprezentovat hodnotu uzlu
  - Vizuálně atraktivní

## 10.3. Maticová vizualizace rozsáhlých grafů

- Užitečné k prozkoumání velkých grafů
- Žádné překrytí vrcholů nebo křížení hran
- Reprezentace grafu pomocí matice sousednosti
- Řádky a sloupce matice odpovídají uzlům
- Buňky matice reprezentují hrany mezi uzly
- Barvy buněk mohou kódovat ohodnocení nebo orientaci hrany

**Výhody:**
- Vhodné pro husté grafy
- Eliminace problémů s překryvem
- Snadné hledání vzorů (kliky, bipartitní struktury)

**Nevýhody:**
- Pro řídké grafy plýtvání prostorem
- Hůře se sledují cesty
- Závisí na pořadí uzlů v matici (jako u korelační matice)

## 10.4. Příklady praktického využití

- **Filesystém**: Odsazení nebo node-link diagramy
- **Organizační struktura**: Vertikální node-link diagram
- **Rozložení webových stránek**: Treemap nebo node-link diagram
- **Rozpočet**: Treemap nebo Sunburst chart
- **Velké sociální sítě**: Maticová vizualizace
- **Taxonomie/klasifikace**: Icicle plot nebo node-link diagram

## 10.5. Doporučení pro výběr techniky

- **Pro malé hierarchie** (do ~100 uzlů): Node-link diagramy
- **Pro velké hierarchie s kvantitativními hodnotami**: Treemapy, Icicle plots, Sunburst charts
- **Pro hluboké hierarchie**: Odsazení, node-link s vertikálním layoutem
- **Pro velké grafy s mnoha hranami**: Maticová vizualizace
- **Pro zvýraznění extrémních hodnot**: Containment diagramy
- **Pro zdůraznění struktury**: Node-link diagramy nebo Icicle plots

Volba techniky vždy závisí na účelu vizualizace (exploratory nebo explanatory), velikosti dat a tom, jaké aspekty hierarchie nebo relací chceme zdůraznit.


-------------------





# 11. Vizuální manipulace - konkrétní příklady a jejich řešení; volba barevné škály, vizualizace nejistoty.

## Vizuální manipulace

Vizuální manipulace je situace, kdy grafická prezentace dat vede k špatnému nebo zkreslenému pochopení skutečnosti. Vhodně navržená vizualizace by měla přesně odrážet data, zatímco manipulativní vizualizace může záměrně nebo nezáměrně vést k chybným závěrům.

### Konkrétní příklady vizuální manipulace a jejich řešení:

1. **Nevhodné měřítko os**
   - **Příklad:** Graf s osou Y začínající od nenulové hodnoty, což opticky zvětšuje rozdíly
   - **Řešení:** Používat osy začínající od nuly nebo jasně označit, že osa je oříznutá

2. **Selektivní zobrazení dat**
   - **Příklad:** Volby v USA - zobrazení pouze nezaměstnanosti v soukromém sektoru namísto celkové (soukromý + státní sektor)
   - **Řešení:** Poskytnout kompletní data nebo jasně označit, jaká část dat je zobrazena

3. **Neproporcionální vizuální prvky**
   - **Příklad:** Srovnání třešní vs. jablek, kde jsou třešně zobrazeny menší, přestože jde o stejný počet
   - **Řešení:** Zajistit, aby vizuální velikost odpovídala zobrazovaným hodnotám

4. **Nevhodný typ grafu**
   - **Příklad:** Použití 3D koláčového grafu, který zkresluje proporce
   - **Řešení:** Zvolit vhodnější typ grafu (sloupcový, bodový)

5. **Zavádějící kontext**
   - **Příklad:** Zamlčení důležitého kontextu, např. zobrazení trendů bez uvedení sezónnosti
   - **Řešení:** Vždy poskytnout dostatečný kontext pro správnou interpretaci

## Volba barevné škály

Vhodná volba barevných škál je klíčová pro správnou interpretaci dat:

### Typy barevných škál a jejich vhodnost:

1. **Odstíny barev (kvalitativní škály)**
   - **Vhodné pro:** Kategoriální (nominální) data s 6-10 kategoriemi
   - **Nevhodné pro:** Kvantitativní data (intervaly, poměry)
   - **Příklad použití:** Mapa s barevným odlišením různých zemí

2. **Sekvenční škály**
   - **Popis:** Plynulý přechod od světlé k tmavé (např. bílá → červená nebo bílá → černá)
   - **Vhodné pro:** Kvantitativní data bez neutrální hodnoty (např. teplota, výška)
   - **Příklad použití:** Zobrazení hustoty obyvatelstva od nízké po vysokou

3. **Divergentní škály**
   - **Popis:** Přechod mezi dvěma barvami s neutrální barvou uprostřed (např. modrá → bílá → červená)
   - **Vhodné pro:** Kvantitativní data s neutrální hodnotou (např. teplotní odchylky od normálu)
   - **Příklad použití:** Zobrazení zisku/ztráty, kde červená značí ztrátu, bílá vyrovnané hospodaření a modrá zisk

### Důležité faktory při volbě barev:

- **Barvoslepost** - až 15% populace (především muži) má nějaký typ barvosleposti
  - **Řešení:** Používat colorblind-friendly barevné škály, nekombinovat červenou a zelenou
  
- **Kulturní kontext** - barvy mohou mít různé významy v různých kulturách
  - **Řešení:** Používat intuitivní asociace (červená - horko, modrá - chlad)

- **Kontext vnímání** - okolní barvy ovlivňují, jak vnímáme cílovou barvu
  - **Řešení:** Testovat vizualizaci na různých pozadích a v různých kontextech

## Vizualizace nejistoty

Ve většině případů data neobsahují údaje o celé populaci, ale pouze o vzorku. Nejistota odráží míru, do jaké můžeme odhadnout charakteristiky celé populace z dostupného vzorku.

### Základní koncepty nejistoty:

- **Precision (přesnost)** - míra, jak se pozorování vzájemně shodují (nepřímo úměrná rozptylu/varianci)
- **Accuracy (správnost)** - míra, jak pozorování odrážejí skutečnou hodnotu (nepřímo úměrná zkreslení/bias)

### Zdroje nejistoty:

- **Sampling bias** - někteří členové populace mají větší pravděpodobnost zahrnutí než jiní
- **Nonresponse bias** - hodnoty těch, kteří odmítli účast, se mohou lišit od hodnot účastníků
- **Social desirability bias** - tendence respondentů poskytovat společensky přijatelné odpovědi

### Přístupy k vizualizaci nejistoty:

1. **Zobrazení všech dat**
   - **Výhody:** Nic neskrývá, transparentní
   - **Nevýhody:** Nepřehledné při velkém množství dat
   - **Techniky:** Jittering (přidání náhodného posunu), nastavení průhlednosti (opacity)

2. **Agregace dat**
   - **Výhody:** Jednodušší pochopení pro běžného čtenáře
   - **Nevýhody:** Citlivost na odlehlé hodnoty, může skrýt vzory v datech
   - **Příklady:** Průměr, medián, minimum, maximum, suma, rozptyl, pravděpodobnost

3. **Více agregací najednou**
   - **Příklad:** Zobrazení minima, maxima a průměru v jednom grafu

4. **Error bars (chybové úsečky)**
   - **Popis:** Ukazují, jak daleko od uváděné hodnoty může být skutečná hodnota
   - **Interpretace:** Může být různá - směrodatná odchylka, standardní chyba, konfidenční interval
   - **Nevýhody:** Mohou skrývat detaily o rozložení dat

### Specifické techniky vizualizace nejistoty:

1. **Box Plot (Tukey box)**
   - Zobrazuje minimum a maximum (bez outlierů), 25%, 50% (medián) a 75% kvantily a odlehlé hodnoty
   - Efektivní pro srovnání rozložení několika souborů dat

2. **Violin Plot**
   - Kombinuje box plot s histogramem/hustotou pravděpodobnosti
   - Ukazuje stejné statistiky jako box plot, ale navíc zobrazuje kompletní rozložení dat
   - Umožňuje snadno identifikovat shluky a multimodální rozložení

3. **Gradient Plot**
   - Rozmazává intervaly nejistoty pomocí bluru
   - Intuitivní znázornění klesající jistoty s rostoucí vzdáleností od střední hodnoty

4. **Kvantilová regrese**
   - Vypočítává izokřivku procházející zadaným kvantilem ve scatter plotu
   - Vhodná pro zobrazení různých úrovní nejistoty

5. **Vizualizace nejistoty na mapách**
   - Bivariate colour scales - kombinují dvě proměnné (např. hodnotu a nejistotu)
   - Value-suppressing uncertainty palette - skrývá hodnoty s vysokou nejistotou
   - Alternativní techniky: šrafování, tečky, textura

Efektivní vizualizace nejistoty pomáhá čtenářům lépe pochopit spolehlivost prezentovaných dat a vyhnout se chybným závěrům založeným na nedostatečně podložených informacích.