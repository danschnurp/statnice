

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