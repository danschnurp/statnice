

# 4. Paralelismus na úrovni instrukcí, predikce skoků, paměťová závislost, falešné sdílení a transakční paměť (Intel TSX) – jejich princip a význam pro urychlení sekvenčních a konkurenčních částí algoritmů.

## Paralelismus na úrovni instrukcí (ILP)

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

void* thread_function(void* arg) {
    // Kód prováděný vláknem
    return NULL;
}

int main() {
    pthread_t thread;
    pthread_create(&thread, NULL, thread_function, NULL);
    pthread_join(thread, NULL);
    return 0;
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
#include <iostream>

void thread_function() {
    // Kód prováděný vláknem
}

int main() {
    std::thread t(thread_function);
    t.join();
    return 0;
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
#include <tbb/parallel_for.h>
#include <vector>

int main() {
    std::vector<int> data(1000);
    
    tbb::parallel_for(0, 1000, [&](int i) {
        data[i] = i * 2;  // Paralelní operace
    });
    
    return 0;
}
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
#include <CL/sycl.hpp>
namespace sycl = cl::sycl;

int main() {
    sycl::queue queue;
    const int size = 1024;
    
    int* data = sycl::malloc_shared<int>(size, queue);
    
    queue.parallel_for(sycl::range<1>(size), [=](sycl::id<1> i) {
        data[i] = i * 2;
    }).wait();
    
    sycl::free(data, queue);
    return 0;
}
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
// Definice grafu závislostí dat
buffer<int> A(range<1>(1024));
buffer<int> B(range<1>(1024));
buffer<int> C(range<1>(1024));

queue q;
q.submit([&](handler& h) {
  auto a = A.get_access<access::mode::read>(h);
  auto b = B.get_access<access::mode::read>(h);
  auto c = C.get_access<access::mode::write>(h);
  
  h.parallel_for(range<1>(1024), [=](id<1> i) {
    c[i] = a[i] + b[i];
  });
});
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
// Structure of Arrays (lepší pro vektorizaci)
class Population {
  std::vector<float> parents;  // nebo np.array()
  std::vector<float> offsprings;
  std::vector<float> fitness_parents;
  std::vector<float> fitness_offsprings;
  
  void init() { /* ... */ }
  void eval_fitness() { /* ... */ }
  void selection() {
    // ...
  }
  void crossbreeding() { /* ... */ }
  void mutate() { /* ... */ }
};
```

## Praktické přístupy a nástroje

### Mobile Agents

Mobile Agents jsou distribuované entity v síti, které se mohou pohybovat a provádět výpočty na specifických uzlech. Obsahují kód, který se provede, přičemž nody obsahují data store. Mohou být autonomní a fault tolerant. Postavené jsou na IP sítích, přičemž každý uzel obsahuje runtime pro mobilního agenta.

### Active Network

Active network je jeden z druhů programovatelných sítí. K její funkcionalitě je potřeba standardizace dvou hlavních komponent: programového kódu, který se vykonává v určitém execution environment (podobně jako v Dockeru), a code distribution protokolu, který popisuje způsob distribuce kódu pro zpracování protokolu, pokud ho uzel nemá.

Capsule představuje analogii k paketu (obsahuje data a header), ale navíc má identifikátor daného protokolu. Výhodou je, že pokud najdeme zranitelnost v daném protokolu, jednoduše ho vyměníme pomocí změny identifikátoru protokolu.

Pomocí aktivní sítě lze snadno implementovat load redistribution nezávisle na technologii. PerformanceScout je speciální capsule, která udává výkon jednotlivých uzlů a jejich vytížení, komunikační zpoždění apod. Uzel vyšle PerformanceScout capsule do sítě s TTL (Time To Live) a postupně zkoumá uzly v síti. Když TTL dosáhne 0, capsule se vrací zpět k majiteli, který díky ní může zmapovat stav sítě a rozhodnout se, zda proces přemigrovat jinam.

## Závěr

Efektivní přidělování práce v prostředí s distribuovanou pamětí vyžaduje zohlednění mnoha faktorů, včetně:

1. Fyzické a virtuální topologie systému
2. Granularity dat a komunikačních vzorů
3. Volby mezi statickým a dynamickým load balancingem
4. Monitorování výkonu a zatížení uzlů
5. Mechanismů pro migraci procesů mezi uzly

Výběr konkrétního přístupu závisí na charakteristikách aplikace, hardwarovém vybavení a požadavcích na výkon a odolnost proti chybám. Moderní systémy často kombinují různé přístupy, například distribuovaný MapReduce s dynamickým load balancingem nebo island model pro evoluční algoritmy s mechanismy nepřímé synchronizace.

# 6.1 Vektorizace, SIMD operace a jejich optimalizace

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


# 6.2 Verifikace, synchronizace a distribuce procesů v paralelních a distribuovaných systémech

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


