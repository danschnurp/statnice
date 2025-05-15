
# 1.Modely vyhledávání, mechanismy indexování, metody určení podobnosti dotazu a dokumentu.

## 1. Modely vyhledávání

### 1.1 Booleovský model

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

### 1.2 Vektorový model (Vector Space Model)

- **Princip**: Dokumenty i dotazy jsou reprezentovány jako vektory v n-dimenzionálním prostoru, kde n je počet unikátních termů
- **Charakteristika**:
  - Umožňuje částečnou shodu a řazení výsledků podle míry podobnosti
  - Dotazy v přirozeném jazyce
  - "Bag of words" - nezohledňuje pořadí slov
- **Míra podobnosti**: Nejčastěji kosinová podobnost (cosine similarity) mezi vektorem dotazu a vektorem dokumentu
- **Váhování termů**: Nejčastěji tf-idf (term frequency-inverse document frequency)

### 1.3 Pravděpodobnostní model

- **Princip**: Založen na teorii pravděpodobnosti, odhaduje pravděpodobnost, že dokument je relevantní k dotazu
- **Příklad**: BM25 (Best Match 25) - pokročilá metoda, která bere v úvahu délku dokumentu a frekvence termů

## 2. Mechanismy indexování

### 2.1 Invertovaný index

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

### 2.2 Rozšíření invertovaného indexu

- **Poziční index**: Ukládá nejen ID dokumentů, ale i pozice termů v dokumentech
  - Umožňuje vyhledávání frází a blízkosti termů
- **Komprese indexu**: Metody pro efektivní uložení rozsáhlých indexů
  - Delta kódování, gamma kódování, variable byte coding

## 3. Metody určení podobnosti dotazu a dokumentu

### 3.1 Jaccardův koeficient

- **Vzorec**: J(A,B) = |A ∩ B| / |A ∪ B|
- **Využití**: Jednoduché měření podobnosti množin
- **Nevýhody**: Nezohledňuje frekvenci termů, pouze jejich přítomnost/nepřítomnost

### 3.2 Tf-idf váhování (Term Frequency-Inverse Document Frequency)

- **Term Frequency (tf)**: Četnost termu v dokumentu
  - Logaritmická normalizace: tf_t,d = 1 + log(tf_t,d) pokud tf_t,d > 0, jinak 0
- **Inverse Document Frequency (idf)**: Měří informační hodnotu termu
  - idf_t = log(N/df_t), kde N je počet dokumentů a df_t je počet dokumentů obsahujících term t
- **Tf-idf váha**: Kombinace těchto dvou metrik
  - tf-idf_t,d = (1 + log(tf_t,d)) × log(N/df_t)
- **Charakteristika**:
  - Vzácné termy mají vyšší váhu než časté termy
  - Termy vyskytující se často v dokumentu mají vyšší váhu

### 3.3 Kosinová podobnost (Cosine Similarity)

- **Princip**: Měří kosinus úhlu mezi dvěma vektory (dotazem a dokumentem)
- **Vzorec**: cos(q,d) = (q·d)/(|q|×|d|) = Σ(q_i×d_i)/(√Σq_i²×√Σd_i²)
- **Charakteristika**:
  - Normalizuje délky dokumentů (dlouhé a krátké dokumenty se stejnou tematikou mají podobné skóre)
  - Hodnota mezi 0 (žádná podobnost) a 1 (maximální podobnost)
  - Pro normalizované vektory je kosinová podobnost rovna skalárnímu součinu

### 3.4 BM25 (Okapi BM25)

- **Princip**: Pokročilá funkce pro ohodnocení relevance, rozšíření tf-idf
- **Charakteristika**:
  - Zohledňuje délku dokumentu
  - Saturace term frequency (vyšší frekvence termu má klesající přírůstkový efekt)
  - Parametrizovatelné pro optimalizaci na konkrétní kolekci dokumentů

## 4. Proces vyhledávání

### 4.1 Booleovské vyhledávání

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

### 4.2 Vektorové vyhledávání

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

## 5. Optimalizace vyhledávání

### 5.1 Optimalizace booleovských dotazů

- Zpracování termů v pořadí rostoucí frekvence výskytu (nejprve nejméně časté termy)
- Optimalizace složitějších dotazů (např. (A AND B) OR (C AND D))

### 5.2 Optimalizace vektorových dotazů

- Různé váhovací schémata pro dotazy a dokumenty (např. lnc.ltn)
- Dimenzionální redukce (např. LSI - Latent Semantic Indexing)


# 4. Metody předzpracování textových dat – tokenizace, stemming, lemmatizace.

## 1. TOKENIZACE

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

## 2. NORMALIZACE

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

## 3. STEMMING

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

## 4. LEMMATIZACE

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

## 5. POKROČILÉ TECHNIKY

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

## 6. PRAKTICKÉ ASPEKTY

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