
# 1.Modely vyhledávání, mechanismy indexování, metody určení podobnosti dotazu a dokumentu.

## Modely vyhledávání

### Booleovský model

- **Princip**: Dokumenty jsou reprezentovány jako množiny termů. Dotaz je booleovský výraz, který kombinuje termy pomocí operátorů AND, OR a NOT.
- **Charakteristika**:
  - Binární rozhodování o relevanci (dokument buď vyhovuje, nebo nevyhovuje)
  - Přesný (exaktní) - uživatel ví přesně, co dostane
  - Problém "feast or famine" - příliš mnoho nebo příliš málo výsledků
- **Využití**: Profesionální vyhledávače (právníci), intranetové vyhledávání
- **Příklad**: 
  ```
  (BRUTUS AND CAESAR) AND NOT CALPURNIA
  ```
- **Výhody**: Přesnost, transparentnost, kontrola
- **Nevýhody**: Pro běžné uživatele složité vytvářet dotazy, nelze seřadit výsledky podle relevance

### Vektorový model (Vector Space Model)

- **Princip**: Dokumenty i dotazy jsou reprezentovány jako vektory v n-dimenzionálním prostoru, kde n je počet unikátních termů
- **Charakteristika**:
  - Umožňuje částečnou shodu a řazení výsledků podle míry podobnosti
  - Dotazy v přirozeném jazyce
  - "Bag of words" - nezohledňuje pořadí slov
- **Míra podobnosti**: Nejčastěji kosinová podobnost (cosine similarity) mezi vektorem dotazu a vektorem dokumentu
- **Váhování termů**: Nejčastěji tf-idf (term frequency-inverse document frequency)

### Pravděpodobnostní model

- **Princip**: Založen na teorii pravděpodobnosti, odhaduje pravděpodobnost, že dokument je relevantní k dotazu
- **Příklad**: BM25 (Best Match 25) - pokročilá metoda, která bere v úvahu délku dokumentu a frekvence termů

## Mechanismy indexování

### Invertovaný index

- **Struktura**: Pro každý term obsahuje seznam dokumentů, ve kterých se term vyskytuje
  - Slovník (dictionary): seznam všech unikátních termů
  - Postings listy: pro každý term seznam ID dokumentů, kde se term vyskytuje
- **Výhody**: Rychlé vyhledávání, efektivní pro řídké (sparse) matice term-dokument
- **Proces tvorby**:
  1. Sběr dokumentů
  2. Tokenizace (rozdělení na tokeny)
  3. Lingvistické předzpracování (normalizace, stemming, lemmatizace)
  4. Vytvoření invertovaného indexu

```
Příklad invertovaného indexu:
BRUTUS -> [1, 2, 4, 11, 31, 45, 173, 174]
CAESAR -> [1, 2, 4, 5, 6, 16, 57, 132, ...]
CALPURNIA -> [2, 31, 54, 101]
```

### Rozšíření invertovaného indexu

- **Poziční index**: Ukládá nejen ID dokumentů, ale i pozice termů v dokumentech
  - Umožňuje vyhledávání frází a blízkosti termů
- **Komprese indexu**: Metody pro efektivní uložení rozsáhlých indexů
  - Delta kódování, gamma kódování, variable byte coding

## Metody určení podobnosti dotazu a dokumentu

### Jaccardův koeficient

- **Vzorec**: J(A,B) = |A ∩ B| / |A ∪ B|
- **Využití**: Jednoduché měření podobnosti množin
- **Nevýhody**: Nezohledňuje frekvenci termů, pouze jejich přítomnost/nepřítomnost

### Tf-idf váhování (Term Frequency-Inverse Document Frequency)

- **Term Frequency (tf)**: Četnost termu v dokumentu
  - Logaritmická normalizace: tf_t,d = 1 + log(tf_t,d) pokud tf_t,d > 0, jinak 0
- **Inverse Document Frequency (idf)**: Měří informační hodnotu termu
  - idf_t = log(N/df_t), kde N je počet dokumentů a df_t je počet dokumentů obsahujících term t
- **Tf-idf váha**: Kombinace těchto dvou metrik
  - tf-idf_t,d = (1 + log(tf_t,d)) × log(N/df_t)
- **Charakteristika**:
  - Vzácné termy mají vyšší váhu než časté termy
  - Termy vyskytující se často v dokumentu mají vyšší váhu

### Kosinová podobnost (Cosine Similarity)

- **Princip**: Měří kosinus úhlu mezi dvěma vektory (dotazem a dokumentem)
- **Vzorec**: cos(q,d) = (q·d)/(|q|×|d|) = Σ(q_i×d_i)/(√Σq_i²×√Σd_i²)
- **Charakteristika**:
  - Normalizuje délky dokumentů (dlouhé a krátké dokumenty se stejnou tematikou mají podobné skóre)
  - Hodnota mezi 0 (žádná podobnost) a 1 (maximální podobnost)
  - Pro normalizované vektory je kosinová podobnost rovna skalárnímu součinu

## Proces vyhledávání

### Booleovské vyhledávání

```
INTERSECT(p1, p2) // p1, p2 jsou postings listy
  answer ← []
  while p1 ≠ NIL and p2 ≠ NIL
    if docID(p1) = docID(p2)
      ADD(answer, docID(p1))
      p1 ← next(p1)
      p2 ← next(p2)
    else if docID(p1) < docID(p2)
      p1 ← next(p1)
    else
      p2 ← next(p2)
  return answer
```

### Vektorové vyhledávání

```
COSINESCORE(q) // q je dotaz
  Scores[N] ← 0 // inicializace skóre pro N dokumentů
  Length[N] // délky dokumentů
  for each term t in query q
    calculate w_t,q // váha termu v dotazu
    fetch postings list for t
    for each pair(d, tf_t,d) in postings list
      Scores[d] += w_t,d × w_t,q
  for each d
    Scores[d] = Scores[d]/Length[d] // normalizace
  return Top K components of Scores[]
```

## Optimalizace vyhledávání

### Optimalizace booleovských dotazů

- Zpracování termů v pořadí rostoucí frekvence výskytu (nejprve nejméně časté termy)
- Optimalizace složitějších dotazů (např. (A AND B) OR (C AND D))

### Optimalizace vektorových dotazů

- Různé váhovací schémata pro dotazy a dokumenty (např. lnc.ltn)
- Dimenzionální redukce (např. LSI - Latent Semantic Indexing)


-----------------------------------



------------------------------------------

# 2. Klasifikace: metody, výběr příznaků, vyhodnocování úspěšnosti. Aplikace klasifikace ve vyhledávání a zpracování přirozeného jazyka.

## 2.1 Metody klasifikace

### 2.1.1 Základní principy klasifikace

Klasifikace je úloha strojového učení s učitelem, kde se snažíme přiřadit vstupní objekty do předem definovaných kategorií (tříd). Formálně se jedná o funkci **f(x, θ): ℝⁿ → ℕ**, kde:
- **x** je n-dimenzionální vektor příznaků
- **θ** jsou parametry modelu 
- výstupem je identifikátor třídy

**Příklad**: Klasifikace e-mailů jako spam/ne-spam, rozpoznávání číslic v obrázku, diagnostika nemocí z příznaků.

### 2.1.2 Kategorie klasifikačních metod

#### Lineární klasifikátory
**Logistická regrese**
- Používá logistickou funkci σ(z) = 1/(1+e^(-z))
- Pro binární klasifikaci: P(y=1|x) = σ(θᵀx)
- Výhody: interpretovatelná, rychlá, probabilistická
- Nevýhody: pouze lineárně separovatelné problémy

**Naivní Bayes**
- Založen na Bayesově teorému s předpokladem nezávislosti příznaků
- P(třída|příznaky) ∝ P(příznaky|třída) × P(třída)
- Příklad: klasifikace textů podle četnosti slov
- Výhody: jednoduchý, rychlý, funguje i s malými datasety
- Nevýhody: předpoklad nezávislosti příznaků často nerealistický

#### Nelineární klasifikátory
**Support Vector Machines (SVM)**
- Hledá optimální rozhodovací hranici s maximální marží
- Kernel trick umožňuje nelineární separaci (RBF, polynomiální)
- Výhody: dobře generalizuje, efektivní pro vysoké dimenze
- Nevýhody: pomalé na velkých datasetech, citlivé na škálování

**Rozhodovací stromy**
- Hierarchická struktura if-then pravidel
- Algoritmy: ID3, C4.5, CART
- Výhody: interpretovatelné, zvládají kategorické i numerické příznaky
- Nevýhody: sklon k přeučení, nestabilní

**Random Forest**
- Ensemble metoda kombinující více rozhodovacích stromů
- Každý strom trénován na náhodném vzorku dat s náhodným výběrem příznaků
- Výhody: redukuje přeučení, robustní, poskytuje důležitость příznaků
- Nevýhody: méně interpretovatelný než jednotlivý strom

**k-Nearest Neighbors (k-NN)**
- Klasifikuje podle k nejbližších sousedů v trénovacích datech
- Výhody: jednoduchý, funguje pro nelineární problémy
- Nevýhody: pomalý při predikci, citlivý na irelevantní příznaky

#### Neuronové sítě
**Vícevrstvé perceptrony**
- Skládají se z vrstev neuronů s nelineárními aktivačními funkcemi
- Backpropagation pro trénování
- Výhody: univerzální aproximátory, zvládají komplexní vzory
- Nevýhody: černá skříňka, náchylné k přeučení

### 2.1.3 Výběr vhodné metody

Závisí na:
- **Velikosti datasetu**: malý → Naivní Bayes, velký → SVM/NN
- **Interpretovatelnosti**: rozhodovací stromy vs. neuronové sítě
- **Lineární separovatelnosti**: lineární vs. nelineární metody
- **Výpočetních nárocích**: k-NN vs. logistická regrese

## 2.2 Výběr příznaků (Feature Selection)

### 2.2.1 Důležitost výběru příznaků

Kvalitní příznaky jsou klíčové pro úspěch klasifikace. Špatné příznaky mohou:
- Snížit přesnost klasifikace
- Zvýšit výpočetní náročnost
- Způsobit přeučení
- Ztížit interpretaci výsledků

### 2.2.2 Typy příznaků

**Numerické příznaky**
- Spojité hodnoty (věk, výška, teplota)
- Diskrétní hodnoty (počet slov, frekvence)

**Kategorické příznaky**
- Nominální (barva, pohlaví)
- Ordinální (vzdělání: ZŠ < SŠ < VŠ)

**Textové příznaky**
- Bag-of-words: četnost jednotlivých slov
- N-gramy: sekvence n po sobě jdoucích slov/znaků
- TF-IDF: term frequency × inverse document frequency

### 2.2.3 Metody výběru příznaků

#### Filtrovací metody
Hodnotí příznaky nezávisle na klasifikátoru:

**Korelace**
- Pearsonův korelační koeficient pro numerické příznaky
- Vysoká korelace s třídou = dobrý příznak

**Chi-kvadrát test**
- Pro kategorické příznaky
- Testuje nezávislost mezi příznakem a třídou


#### Embedded metody
Výběr příznaků je integrován do trénování modelu:

**L1 regularizace (Lasso)**
- Přidává penalty ||θ||₁ do účelové funkce
- Automaticky některé váhy příznaků vynuluje

**Důležitost příznaků v Random Forest**
- Měří pokles nečistoty při použití každého příznaku

### 2.2.4 Extrakce příznaků

**Principal Component Analysis (PCA)**
- Lineární transformace do prostoru s nižší dimenzí
- Zachovává maximum variability dat
- Nové příznaky jsou lineární kombinace původních

**t-SNE**
- Nelineární redukce dimenzionality
- Zachovává lokální strukturu dat
- Často používáno pro vizualizaci

## 2.3 Vyhodnocování úspěšnosti

### 2.3.1 Základní metriky

#### Binární klasifikace

**Confusion Matrix**
```
                 Predikovaná třída
                 Pozitivní  Negativní
Skutečná Pozitivní    TP        FN
třída    Negativní    FP        TN
```

**Přesnost (Accuracy)**
- Accuracy = (TP + TN) / (TP + TN + FP + FN)
- Celkový podíl správně klasifikovaných vzorků

**Precision (Přesnost pozitivní predikce)**
- Precision = TP / (TP + FP)
- Kolik z pozitivních predikcí bylo správných

**Recall (Senzitivita)**
- Recall = TP / (TP + FN)
- Kolik pozitivních vzorků bylo správně identifikováno

**F1-score**
- F1 = 2 × (Precision × Recall) / (Precision + Recall)
- Harmonický průměr precision a recall

#### Vícetřídní klasifikace

**Macro průměr**
- Vypočítá metriku pro každou třídu a zprůměruje
- Všechny třídy mají stejnou váhu

**Micro průměr**
- Agreguje TP, FP, FN napříč třídami a pak vypočítá metriku
- Častější třídy mají větší vliv

**Weighted průměr**
- Váženě podle četnosti tříd

### 2.3.2 Pokročilé metriky

**ROC křivka (Receiver Operating Characteristic)**
- Graf True Positive Rate vs. False Positive Rate
- Ukazuje výkon klasifikátoru při různých prazích
- AUC (Area Under Curve): čím blíže 1, tím lepší

**Precision-Recall křivka**
- Užitečná při nevyvážených datasetech
- Soustředí se na výkon pozitivní třídy

**Logarithmic Loss**
- Penalizuje nejen špatné klasifikace, ale i nejistotu
- LogLoss = -Σ yᵢlog(pᵢ) + (1-yᵢ)log(1-pᵢ)

[//]: # (### 2.3.3 Validační techniky)

[//]: # ()
[//]: # (**Holdout validace**)

[//]: # (- Rozdělení na train/test &#40;typicky 70/30 nebo 80/20&#41;)

[//]: # (- Jednoduché, ale může být nestabilní)

[//]: # ()
[//]: # (**k-Fold Cross-Validation**)

[//]: # (- Rozdělí data na k částí)

[//]: # (- k iterací: &#40;k-1&#41; částí pro trénování, 1 pro testování)

[//]: # (- Průměruje výsledky → stabilnější odhad)

[//]: # ()
[//]: # (**Stratified k-Fold**)

[//]: # (- Zachovává proporce tříd v každém foldu)

[//]: # (- Důležité pro nevyvážené datasety)

[//]: # ()
[//]: # (**Leave-One-Out &#40;LOO&#41;**)

[//]: # (- Speciální případ k-fold kde k = počet vzorků)

[//]: # (- Velmi důkladné, ale výpočetně náročné)

[//]: # ()
[//]: # (### 2.3.4 Problémy při evaluaci)

[//]: # ()
[//]: # (**Nevyvážené datasety**)

[//]: # (- Accuracy může být zavádějící)

[//]: # (- Preferovat F1-score, precision/recall)

[//]: # (- Techniky: oversampling &#40;SMOTE&#41;, undersampling, weighted classes)

[//]: # ()
[//]: # (**Data leakage**)

[//]: # (- Informace z testovacích dat "uniknou" do trénování)

[//]: # (- Řešení: pečlivé rozdělení dat, feature scaling po rozdělení)

## 2.4 Aplikace klasifikace ve vyhledávání

### 2.4.1 Relevance ranking

**Problém**: Určit relevantnost dokumentů k uživatelskému dotazu

**Příznaky**:
- TF-IDF skóre termínů z dotazu v dokumentu
- BM25 skóre
- Pozice termínů v dokumentu (titulek, začátek)
- PageRank hodnota stránky
- Počet zpětných odkazů

**Klasifikace**:
- **Binární**: relevantní/nerelevantní
- **Vícetřídní**: vysoce relevantní/středně/málo/nerelevantní
- **Ranking**: learning-to-rank algoritmy (RankNet, LambdaMART)

**Příklad**: Google Search používá stovky příznaků a ensemble modelů pro ranking výsledků

### 2.4.2 Spam detekce

**Příznaky**:
- Četnost spam klíčových slov ("zdarma", "výhra")
- Poměr velkých písmen
- Počet exclamačních znaků
- IP adresa odesílatele
- Doménová reputace

**Algoritmy**: Často Naivní Bayes pro rychlost a interpretovatelnost

### 2.4.3 Content-based filtering

**Doporučování** na základě charakteristik položek:
- Klasifikace uživatelských preferencí
- Příznaky: žánr, autor, klíčová slova, rok vydání
- Přistup: klasifikace "líbí se/nelíbí se" pro nové položky

## 2.5 Aplikace klasifikace ve zpracování přirozeného jazyka

### 2.5.1 Analýza sentimentu

**Cíl**: Určit emocionální ladění textu (pozitivní/negativní/neutrální)

**Příznaky**:
- Bag-of-words s sentimentovými slovy
- N-gramy (bigramy zachycují negace: "not good")
- Part-of-speech tagy
- Syntaktické závislosti
- Word embeddings (Word2Vec, GloVe)

**Výzvy**:
- Sarkasmus a ironie
- Kontextová závislost ("not bad" = pozitivní)
- Doménová specifičnost

**Příklad**: Analýza recenzí produktů, monitoring sociálních médií, hodnocení zákaznické spokojenosti

### 2.5.2 Rozpoznávání pojmenovaných entit (NER)

**Cíl**: Identifikace a klasifikace entit v textu (osoba, místo, organizace, datum)

**Příznaky**:
- Lexikální: tvar slova, prefix/suffix
- Ortografické: velká písmena, číslice, interpunkce
- Kontextové: okolní slova, POS tagy
- Gazetteers: seznamy známých entit
- Word embeddings: semantické reprezentace

**Přístupy**:
- **CRF (Conditional Random Fields)**: modeluje závislosti mezi sousedními tagy
- **BiLSTM-CRF**: neuronové sítě s CRF vrstvou
- **BERT**: transformerové modely s kontextovými embeddings

**Příklad**: 
Vstup: "Barack Obama navštívil Prahu v roce 2009"
Výstup: [Barack Obama: PERSON], [Prahu: LOCATION], [2009: DATE]

### 2.5.3 Klasifikace dokumentů

**Automatická kategorizace** textů do předefinovaných kategorií:

**Příklady aplikací**:
- Třídění e-mailů do složek
- Kategorizace zpravodajských článků (sport, politika, ekonomie)
- Automatické tagování blogových příspěvků

**Příznaky**:
- TF-IDF vektory
- N-gramy slov a znaků
- Strukturální informace (délka, formátování)
- Metadata (autor, datum, zdroj)

**Hierarchická klasifikace**: Dokumenty se třídí do hierarchie kategorií (např. Sport → Fotbal → Premier League)

### 2.5.4 Detekce jazyka

**Cíl**: Automatické rozpoznání jazyka textu

**Příznaky**:
- N-gramy znaků (2-4 gramy jsou nejefektivnější)
- Frekvence speciálních znaků (ñ pro španělštinu, ø pro norštinu)
- Statistické vlastnosti textu

**Výzvy**:
- Krátké texty (tweety, SMS)
- Vícejazyčné dokumenty
- Příbuzné jazyky (čeština vs. slovenština)

### 2.5.5 sumarizace

**Extraktivní sumarizace**: výběr nejdůležitějších vět z originálu

**Klasifikace vět**:
- **Binární**: důležitá/nedůležitá věta
- **Skórování**: číselné hodnocení důležitosti

**Příznaky**:
- Pozice věty v dokumentu
- Délka věty
- Počet klíčových slov
- TF-IDF skóre slov ve větě
- Podobnost s titulkem
- Centrálnost v grafu podobnosti vět

[//]: # (### 2.5.6 Moderování obsahu)

[//]: # ()
[//]: # (**Automatická detekce** nevhodného obsahu:)

[//]: # ()
[//]: # (**Typy**:)

[//]: # (- Hate speech)

[//]: # (- Cyberbullying)

[//]: # (- Spam)

[//]: # (- Fake news)

[//]: # (- Pornografie)

[//]: # ()
[//]: # (**Příznaky**:)

[//]: # (- Klíčová slova a fráze)

[//]: # (- Sentiment skóre)

[//]: # (- Štruktureální charakteristiky)

[//]: # (- Uživatelské chování &#40;rychlost psaní, nové účty&#41;)

[//]: # ()
[//]: # (**Výzvy**:)

[//]: # (- Falešné pozitivy &#40;legitimate kritika vs. hate speech&#41;)

[//]: # (- Kreativní obcházení &#40;záměna písmen, slang&#41;)

[//]: # (- Kulturní a jazykové rozdíly)

[//]: # (### 2.5.7 Pokročilé techniky v NLP)

[//]: # ()
[//]: # (**Word Embeddings**:)

[//]: # (- Word2Vec, GloVe: statické reprezentace slov)

[//]: # (- FastText: podslovy, zlepšení pro morfologicky bohaté jazyky)

[//]: # (- ELMo, BERT, GPT: kontextové embeddings)

[//]: # ()
[//]: # (**Transfer Learning**:)

[//]: # (- Předtrénované modely na velkých korpusech)

[//]: # (- Fine-tuning na specifické úlohy)

[//]: # (- Dramatické zlepšení výkonu s menšími daty)

[//]: # ()
[//]: # (**Multimodální klasifikace**:)

[//]: # (- Kombinace textu s obrázky &#40;memy, články s obrázky&#41;)

[//]: # (- Cross-modal learning)

[//]: # ()
[//]: # (### 2.5.8 Praktické aspekty implementace)

[//]: # ()
[//]: # (**Preprocessing**:)

[//]: # (- Tokenizace: rozdělení textu na slova/tokeny)

[//]: # (- Normalizace: převod na malá písmena, odstranění diakritiky)

[//]: # (- Stemming/Lemmatizace: převod na základní tvary slov)

[//]: # (- Stopwords removal: odstranění častých, málo významných slov)

[//]: # ()
[//]: # (**Handling velkých datasetů**:)

[//]: # (- Batch processing)

[//]: # (- Distributed computing &#40;Spark&#41;)

[//]: # (- Online learning algoritmy)

[//]: # (- Feature hashing pro úsporu paměti)

[//]: # ()
[//]: # (**Real-time systémy**:)

[//]: # (- Model serving infrastruktura)

[//]: # (- Latency optimalizace)

[//]: # (- A/B testing pro nové modely)

[//]: # ()
[//]: # (--------------------------------)


 ---------------------------------


# 3. Shlukování: metody, volba počtu shluků, vyhodnocování úspěšnosti. Aplikace shlukování ve vyhledávání a zpracování přirozeného jazyka

## 3.1. Základní charakteristika shlukování

Shlukování (clustering) je metoda **učení bez učitele** (unsupervised learning), která automaticky rozděluje objekty do skupin (shluků) na základě jejich podobnosti, aniž by byla předem známa správná klasifikace.

### Cíle shlukování:
- **Objevení skryté struktury** v datech bez předchozích znalostí
- **Maximalizace vnitřní podobnosti** - objekty ve stejném shluku si jsou podobné
- **Minimalizace vnější podobnosti** - objekty z různých shluků si nejsou podobné
- **Redukce komplexnosti** dat pro další analýzu

### Předpoklady:
- Data neobsahují informaci o správné klasifikaci
- Trénovací množina reprezentativně pokrývá problémovou doménu
- Použitá míra vzdálenosti/podobnosti je vhodná pro daný typ dat
- Existuje v datech nějaká přirozená struktura

## 3.2. Metody shlukování

### 3.2.1. Rozdělovací metody (Partitioning Methods)

**K-means (K-středních)**
- **Princip:** Iterativní algoritmus minimalizující vzdálenost bodů od centroidů shluků
- **Algoritmus:**
  1. Zvolíme K počátečních centroidů
  2. Přiřadíme každý bod k nejbližšímu centroidu
  3. Přepočítáme centroidy jako průměr přiřazených bodů
  4. Opakujeme kroky 2-3 dokud se centroidy nemění

**Optimalizační kritérium K-means:**
```
J = (1/m) * Σ ||x^(i) - μ_c(i)||²
```
kde μ_c(i) je centroid shluku, do kterého patří bod x^(i)

[//]: # (**K-medoids &#40;PAM - Partition Around Medoids&#41;**)

[//]: # (- **Rozdíl od K-means:** Centroidy musí být skutečné datové body)

[//]: # (- **Výhoda:** Robustnější vůči odlehlým hodnotám)

[//]: # (- **Nevýhoda:** Vyšší výpočetní složitost)

### 3.2.2. Hierarchické metody

**Aglomerativní (bottom-up)**
- Začínáme s jednotlivými body jako shluky
- Postupně slučujeme nejpodobnější shluky
- Výsledek: dendrogram (strom shluků)

**Divizivní (top-down)**
- Začínáme s jedním shlukem obsahujícím všechny body
- Postupně rozdělujeme shluky na menší

**Kritéria pro slučování:**
- **Single linkage:** minimální vzdálenost mezi body ze dvou shluků
- **Complete linkage:** maximální vzdálenost mezi body ze dvou shluků
- **Average linkage:** průměrná vzdálenost mezi všemi páry bodů
- **Ward's method:** minimalizace nárůstu variance po sloučení

### 3.2.3. Hustotní metody (Density-based)

**DBSCAN (Density-Based Spatial Clustering)**
- **Princip:** Shluky jako oblasti s vysokou hustotou bodů
- **Parametry:** 
  - ε (epsilon) - poloměr okolí
  - MinPts - minimální počet bodů v okolí
- **Výhody:** 
  - Automaticky určuje počet shluků
  - Zvládá shluky libovolného tvaru
  - Identifikuje odlehlé hodnoty (noise)

**Typy bodů v DBSCAN:**
- **Core point:** má ≥ MinPts bodů v ε-okolí
- **Border point:** není core, ale je v ε-okolí nějakého core bodu
- **Noise point:** není ani core ani border

### 3.2.5. Modelové metody

**Gaussian Mixture Models (GMM)**
- Předpokládá, že data pocházejí ze směsi Gaussových distribucí
- Používá EM algoritmus pro odhad parametrů
- **Soft clustering:** každý bod má pravděpodobnost příslušnosti k jednotlivým shlukům

## 3.3. Volba počtu shluků

### 3.3.1. Metoda lokte (Elbow Method)
- Vykreslíme závislost cenové funkce na počtu shluků K
- Hledáme "loket" - bod kde se rychlost poklesu výrazně zpomalí
- **Problém:** Loket nemusí být vždy zřetelný

**Příklad:** Pro K = 1,2,3,4,5 spočítáme součet kvadrátů vzdáleností (SSE):
```
K=1: SSE=1000, K=2: SSE=600, K=3: SSE=400, K=4: SSE=350, K=5: SSE=320
```
Loket je kolem K=3, protože pokles se zde výrazně zpomalí.

[//]: # (### 3.3.2. Silhouette analýza)

[//]: # (**Silhouette koeficient** pro bod i:)

[//]: # (```)

[//]: # (s&#40;i&#41; = &#40;b&#40;i&#41; - a&#40;i&#41;&#41; / max&#40;a&#40;i&#41;, b&#40;i&#41;&#41;)

[//]: # (```)

[//]: # (kde:)

[//]: # (- a&#40;i&#41; = průměrná vzdálenost k bodům ve stejném shluku)

[//]: # (- b&#40;i&#41; = minimální průměrná vzdálenost k bodům v jiných shlucích)

[//]: # ()
[//]: # (**Interpretace:**)

[//]: # (- s&#40;i&#41; ≈ 1: bod je dobře zařazen)

[//]: # (- s&#40;i&#41; ≈ 0: bod je na hranici mezi shluky)

[//]: # (- s&#40;i&#41; ≈ -1: bod je pravděpodobně špatně zařazen)

[//]: # ()
[//]: # (### 3.3.3. Gap statistika)

[//]: # (Porovnává intra-cluster variabilitu s očekávanou variabilitou při náhodném rozdělení dat.)

[//]: # ()
[//]: # (### 3.3.4. Informační kritéria)

[//]: # (- **AIC &#40;Akaike Information Criterion&#41;**)

[//]: # (- **BIC &#40;Bayesian Information Criterion&#41;**)

[//]: # (Penalizují složitost modelu a pomáhají najít optimální rovnováhu mezi přesností a jednoduchostí.)

[//]: # ()
[//]: # ([//]: # &#40;## 3.4. Vyhodnocování úspěšnosti shlukování&#41;)
[//]: # ()
[//]: # ([//]: # &#40;### 3.4.1. Vnitřní metriky &#40;bez znalosti správných shluků&#41;&#41;)
[//]: # ()
[//]: # ([//]: # &#40;&#41;)
[//]: # ([//]: # &#40;**Within-Cluster Sum of Squares &#40;WCSS&#41;**&#41;)
[//]: # ()
[//]: # ([//]: # &#40;```&#41;)
[//]: # ()
[//]: # ([//]: # &#40;WCSS = Σ Σ ||x_i - μ_k||²&#41;)
[//]: # ()
[//]: # ([//]: # &#40;```&#41;)
[//]: # ()
[//]: # ([//]: # &#40;Čím menší, tím kompaktnější shluky.&#41;)
[//]: # ()
[//]: # ([//]: # &#40;&#41;)
[//]: # ([//]: # &#40;**Between-Cluster Sum of Squares &#40;BCSS&#41;**&#41;)
[//]: # ()
[//]: # ([//]: # &#40;```&#41;)
[//]: # ()
[//]: # ([//]: # &#40;BCSS = Σ n_k * ||μ_k - μ||²&#41;)
[//]: # ()
[//]: # ([//]: # &#40;```&#41;)
[//]: # ()
[//]: # ([//]: # &#40;Čím větší, tím více separované shluky.&#41;)
[//]: # ()
[//]: # ([//]: # &#40;&#41;)
[//]: # ([//]: # &#40;**Calinski-Harabasz Index**&#41;)
[//]: # ()
[//]: # ([//]: # &#40;```&#41;)
[//]: # ()
[//]: # ([//]: # &#40;CH = &#40;BCSS/&#40;K-1&#41;&#41; / &#40;WCSS/&#40;n-K&#41;&#41;&#41;)
[//]: # ()
[//]: # ([//]: # &#40;```&#41;)
[//]: # ()
[//]: # ([//]: # &#40;Vyšší hodnoty indikují lepší shlukování.&#41;)
[//]: # ()
[//]: # ([//]: # &#40;&#41;)
[//]: # ([//]: # &#40;**Davies-Bouldin Index**&#41;)
[//]: # ()
[//]: # ([//]: # &#40;```&#41;)
[//]: # ()
[//]: # ([//]: # &#40;DB = &#40;1/K&#41; * Σ max&#40;&#40;σ_i + σ_j&#41;/d&#40;c_i, c_j&#41;&#41;&#41;)
[//]: # ()
[//]: # ([//]: # &#40;```&#41;)
[//]: # ()
[//]: # ([//]: # &#40;Nižší hodnoty indikují lepší shlukování.&#41;)
[//]: # ()
[//]: # ([//]: # &#40;### 3.4.2. Vnější metriky &#40;se znalostí správných shluků&#41;&#41;)
[//]: # ()
[//]: # ([//]: # &#40;&#41;)
[//]: # ([//]: # &#40;**Adjusted Rand Index &#40;ARI&#41;**&#41;)
[//]: # ()
[//]: # ([//]: # &#40;- Porovnává shody a neshody v párech bodů&#41;)
[//]: # ()
[//]: # ([//]: # &#40;- Hodnoty: -1 &#40;nejhorší&#41; až 1 &#40;perfektní shoda&#41;&#41;)
[//]: # ()
[//]: # ([//]: # &#40;- Koriguje náhodné shody&#41;)
[//]: # ()
[//]: # ([//]: # &#40;&#41;)
[//]: # ([//]: # &#40;**Normalized Mutual Information &#40;NMI&#41;**&#41;)
[//]: # ()
[//]: # ([//]: # &#40;- Měří množství informace sdílené mezi dvěma shlukováními&#41;)
[//]: # ()
[//]: # ([//]: # &#40;- Hodnoty: 0 &#40;nezávislé&#41; až 1 &#40;identické&#41;&#41;)
[//]: # ()
[//]: # ([//]: # &#40;&#41;)
[//]: # ([//]: # &#40;**V-measure**&#41;)
[//]: # ()
[//]: # ([//]: # &#40;- Harmonický průměr homogenity a úplnosti&#41;)
[//]: # ()
[//]: # ([//]: # &#40;- Homogenita: každý shluk obsahuje pouze body jedné třídy&#41;)
[//]: # ()
[//]: # ([//]: # &#40;- Úplnost: všechny body jedné třídy jsou ve stejném shluku&#41;)

### 3.4.3. Praktické hodnocení

**Vizualizace:**
- Scatter plots pro 2D/3D data
- Heatmapy pro vysokorozměrná data
- Dendrogramy pro hierarchické shlukování

**Interpretabilita:**
- Jsou výsledné shluky logicky interpretovatelné?
- Odpovídají očekáváním domény?

## 3.5. Aplikace shlukování ve vyhledávání

### 3.5.1. Shlukování dokumentů
**Postup:**
1. **Reprezentace dokumentů:** TF-IDF vektory, word embeddings
2. **Výběr vzdálenostní metriky:** kosinova podobnost, euklidovská vzdálenost
3. **Aplikace algoritmu:** K-means, hierarchické shlukování
4. **Interpretace:** každý shluk reprezentuje tematickou skupinu

**Příklad:** Shlukování zpravodajských článků:
- Shluk 1: Sportovní články
- Shluk 2: Politické články  
- Shluk 3: Technologické články

### 3.5.2. Zlepšení vyhledávání
**Cluster-based retrieval:**
- Při dotazu nejdříve identifikujeme relevantní shluky
- Prohledáváme pouze dokumenty z těchto shluků
- **Výhoda:** Rychlejší vyhledávání ve velkých kolekcích

**Cluster-based ranking:**
- Dokumenty ze shluků podobných dotazu dostávají vyšší skóre
- Zlepšuje relevanci výsledků

### 3.5.3. Organizace výsledků vyhledávání
**Shlukování výsledků vyhledávání:**
- Seskupí podobné výsledky do tematických kategorií
- Uživatel může rychleji najít požadovaný typ informace

**Příklad výsledků pro dotaz "jaguar":**
- Shluk 1: Automobily Jaguar
- Shluk 2: Zvíře jaguar
- Shluk 3: Mac OS X Jaguar

## 3.6. Aplikace shlukování ve zpracování přirozeného jazyka

### 3.6.1. Shlukování slov a pojmů

**Word clustering:**
- **Word embeddings:** Word2Vec, GloVe, FastText
- **Sémantické shluky:** slova s podobným významem
- **Syntaktické shluky:** slova se stejnou gramatickou funkcí

**Příklad sémantických shluků:**
- Zvířata: {pes, kočka, kůň, kráva}
- Barvy: {červená, modrá, zelená, žlutá}
- Akce: {běžet, skákat, plavat, létat}

### 3.6.2. Analýza sentimentu

**Shlukování podle sentimentu:**
- Pozitivní, negativní, neutrální texty
- Identifikace emocionálních vzorců
- Automatické značkování trénovacích dat

### 3.6.3. Detekce témat (Topic Modeling)

**Latent Dirichlet Allocation (LDA):**
- Každý dokument je směsí témat
- Každé téma je distribuce nad slovy
- Výsledek: interpretovatelné tematické shluky

**Non-negative Matrix Factorization (NMF):**
- Faktorizace matice dokument-slovo
- Identifikuje latentní tematické faktory

### 3.6.4. Analýza sociálních médií

**Shlukování uživatelů:**
- Podle chování, zájmů, demografických údajů
- Identifikace komunit a influencerů

**Trend analysis:**
- Shlukování hashtags podle času a obsahu
- Detekce vznikajících trendů

### 3.6.5. Chatboti a dialogové systémy

**Intent clustering:**
- Seskupování podobných uživatelských záměrů
- Zlepšení klasifikace intentů

**Response clustering:**
- Seskupování podobných odpovědí
- Generování rozmanitějších odpovědí


---------------------------------------


# 4. Metody předzpracování textových dat – tokenizace, stemming, lemmatizace.

## TOKENIZACE

### Definice
- **Proces rozdělení textu na základní jednotky (tokeny)**
- Převod nestrukturovaného textu na posloupnost slov/termů
- Základní krok pro všechny další analýzy textu

### Problémy při tokenizaci

#### Interpunkce a speciální znaky
```
Příklad: "Mr. O'Neill thinks that the boys' stories about Chile's capital aren't amusing."
```
- Apostrofy v "O'Neill", "boys'", "Chile's", "aren't"
- Zkratky s tečkami: "Mr."
- Spojovníky a pomlčky

#### Složené výrazy
```
- Hewlett-Packard (jeden nebo dva tokeny?)
- State-of-the-art
- Data base vs. database
- San Francisco
- New York University vs. York University
```

#### Čísla a data
```
- 3/20/91 vs. 20/3/91 vs. Mar 20, 1991
- IP adresy: 100.2.86.144
- Telefonní čísla: (800) 234-2333 vs. 800.234.2333
```

#### Jazyky bez mezer
- **Čínština**: žádné mezery mezi slovy
- **Němčina**: složeniny (Computerlinguistik → Computer + Linguistik)
- **Japonština**: 4 různé abecedy bez mezer

### Strategie řešení
- **Heuristiky** pro rozpoznání formátů
- **Statistické modely** pro segmentaci
- **Slovníky** pro známé výrazy
- **Kontextová analýza**

## NORMALIZACE

### Case folding (převod na malá písmena)
```
MIT vs. mit
Fed vs. fed
Windows vs. windows
```
- **Výhoda**: sjednocení různých podob
- **Nevýhoda**: ztráta sémantické informace

### Diakritika a akcentované znaky
```
résumé vs. resume
Universität vs. Universitaet
```
- Záleží na uživatelském chování
- Češi často nepíší diakritiku v dotazech

### Stop words
- **Definice**: velmi časté slova s malou sémantickou hodnotou
- **Příklady**: a, an, and, are, as, at, be, by, for, from, has, he, in, is, it, its, of, on, that, the, to, was, were, will, with
- **Problém**: potřebné pro frázové dotazy ("King of Denmark")
- **Moderní přístup**: indexování i stop words

## STEMMING

### Definice
**Hrubé heuristické ořezávání konců slov** k dosažení společného základu

### Charakteristiky
- Jazykově závislé
- Často inflekční i derivační morfologie
- Rychlé, ale nepřesné

### Porter Stemmer (nejčastější pro angličtinu)

#### Pravidla (ukázka)
```
SSES → SS    (caresses → caress)
IES → I      (ponies → poni) 
SS → SS      (caress → caress)
S →          (cats → cat)
```

#### Fáze algoritmu
- 5 fází aplikovaných postupně
- Každá fáze má sadu pravidel
- Vybrání nejdelšího matchujícího sufixu

#### Příklad výstupu
```
Původní text: "Such an analysis can reveal features that are not easily visible from the variations in the individual genes"

Porter: "such an analysi can reveal featur that ar not easili visibl from the variat in the individu gene"
```

### Problémy stemmingu
- **Over-stemming**: operate, operating, operation → oper
- **Under-stemming**: different, differ zůstávají odlišné
- **Chybné grouped**: university, universe → univers

## LEMMATIZACE

### Definice
**Převod na kanonickou (slovníkovou) formu slova**

### Charakteristiky
- Používá lingvistické znalosti
- Přesnější než stemming
- Pomalejší výpočetně

### Příklady
```
am, are, is → be
car, cars, car's, cars' → car
better → good
mice → mouse
```

### Rozdíl od stemmingu
```
Stemming: studies → studi
Lemmatizace: studies → study

Stemming: running → run
Lemmatizace: running → run (pokud sloveso) / running (pokud podstatné jméno)
```

## POKROČILÉ TECHNIKY

### Soundex (fonetická ekvivalence)
```
Muller = Mueller
Tomas = Thomas
```

### Synonyma a tezaury
```
car = automobile
big = large
```

### Extended biwords
- Rozpoznání vzorů N X* N (podstatné jméno + předložky + podstatné jméno)
- "king of Denmark" → jeden termín
- "catcher in the rye" → jeden termín

## PRAKTICKÉ ASPEKTY

### Pořadí operací
1. **Tokenizace**
2. **Normalizace** (case folding, diakritika)
3. **Stop words** (volitelně)
4. **Stemming/Lemmatizace**

### Volba metody
- **Stemming**: rychlé, vhodné pro vyhledávání
- **Lemmatizace**: přesnější, vhodné pro analýzu textu
- **Kombinace**: stemming pro indexování, lemmatizace pro analýzu

### Evaluace efektivity
- Stemming **pomáhá** u dotazů: [tartan sweaters], [sightseeing tour]
- Stemming **škodí** u dotazů: [operational AND research], [operating AND system]

### Moderní vývoj
- Neuronové modely (BERT, GPT) částečně nahrazují tradiční předzpracování
- Stále důležité pro indexování a vyhledávání
- Trade-off mezi přesností a rychlostí


