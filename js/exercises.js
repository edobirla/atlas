/* ============================================================
   DATABASE ESERCIZI — schede complete in italiano
   X(id, nome, nomeEN, attrezzo, pattern, primari, secondari, img,
     esecuzione[], erroriComuni[], consigli[], extra{})
   ============================================================ */
(function (g) {
  'use strict';
  var DB = [];
  function X(id, n, en, eq, pat, pri, sec, img, steps, errs, cues, extra) {
    var e = { id: id, n: n, en: en, eq: eq, pat: pat, pri: pri, sec: sec || [], img: img || null,
              steps: steps || [], errs: errs || [], cues: cues || [] };
    if (extra) for (var k in extra) e[k] = extra[k];
    DB.push(e); return e;
  }

  g.MUSCLES = {
    chest:        { it: 'Pettorali',            short: 'Petto',      group: 'Torso' },
    front_delts:  { it: 'Deltoidi anteriori',   short: 'Delt. ant.', group: 'Spalle' },
    side_delts:   { it: 'Deltoidi laterali',    short: 'Delt. lat.', group: 'Spalle' },
    rear_delts:   { it: 'Deltoidi posteriori',  short: 'Delt. post.',group: 'Spalle' },
    traps:        { it: 'Trapezi',              short: 'Trapezi',    group: 'Schiena' },
    lats:         { it: 'Gran dorsale',         short: 'Dorsali',    group: 'Schiena' },
    upper_back:   { it: 'Dorso alto / romboidi',short: 'Dorso alto', group: 'Schiena' },
    lower_back:   { it: 'Lombari',              short: 'Lombari',    group: 'Schiena' },
    biceps:       { it: 'Bicipiti',             short: 'Bicipiti',   group: 'Braccia' },
    triceps:      { it: 'Tricipiti',            short: 'Tricipiti',  group: 'Braccia' },
    forearms:     { it: 'Avambracci',           short: 'Avambracci', group: 'Braccia' },
    abs:          { it: 'Addominali (retto)',   short: 'Addome',     group: 'Core' },
    obliques:     { it: 'Obliqui',              short: 'Obliqui',    group: 'Core' },
    glutes:       { it: 'Glutei',               short: 'Glutei',     group: 'Gambe' },
    quads:        { it: 'Quadricipiti',         short: 'Quadricipiti',group:'Gambe' },
    hamstrings:   { it: 'Femorali',             short: 'Femorali',   group: 'Gambe' },
    calves:       { it: 'Polpacci',             short: 'Polpacci',   group: 'Gambe' },
    tibialis:     { it: 'Tibiale anteriore',    short: 'Tibiale',    group: 'Gambe' },
    adductors:    { it: 'Adduttori',            short: 'Adduttori',  group: 'Gambe' },
    abductors:    { it: 'Abduttori / medio gluteo', short: 'Abduttori', group: 'Gambe' },
    neck:         { it: 'Collo',                short: 'Collo',      group: 'Torso' }
  };

  g.EQUIP = {
    bilanciere: 'Bilanciere', manubri: 'Manubri', cavi: 'Cavi', macchina: 'Macchina',
    corpo: 'Corpo libero', smith: 'Multipower', ez: 'Bilanciere EZ', kettlebell: 'Kettlebell',
    elastici: 'Elastici', panca: 'Panca', cardio: 'Cardio'
  };

  g.PATTERNS = {
    'spinta-oriz': 'Spinta orizzontale', 'spinta-vert': 'Spinta verticale',
    'traz-vert': 'Trazione verticale', 'traz-oriz': 'Trazione orizzontale',
    squat: 'Squat / ginocchia', hinge: 'Hinge / anca', affondo: 'Monopodalico',
    iso: 'Isolamento', core: 'Core', cardio: 'Cardio', mobilita: 'Mobilità'
  };

  /* ================= PETTO ================= */
  X('panca-piana','Panca Piana con Bilanciere','Barbell Bench Press','bilanciere','spinta-oriz',['chest'],['front_delts','triceps'],'Barbell_Bench_Press_-_Medium_Grip',
    ['Sdraiati sulla panca con gli occhi sotto il bilanciere, piedi ben piantati a terra e scapole retratte e depresse.',
     'Impugna il bilanciere poco più largo delle spalle, sblocca il carico e portalo sopra lo sterno con le braccia tese.',
     'Scendi in modo controllato (2 secondi) fino a sfiorare la parte bassa del petto, mantenendo gli avambracci verticali.',
     'Spingi verso l\'alto e leggermente indietro, come se volessi allontanare la panca dal pavimento.',
     'Blocca appena prima del completo blocco dei gomiti per mantenere tensione sui pettorali.'],
    ['Rimbalzare il bilanciere sul petto: annulla la fase più stimolante del movimento.',
     'Gomiti aperti a 90°: sovraccarica la spalla e riduce l\'attivazione del petto.',
     'Perdere la retrazione scapolare: il petto si accorcia e la spinta diventa tutta di deltoide.',
     'Sollevare i glutei dalla panca per aiutarsi con il carico.'],
    ['Immagina di "piegare" il bilanciere verso l\'esterno per attivare i dorsali come base stabile.',
     'Gomiti a circa 45-60° rispetto al busto.',
     'Spingi i piedi contro il pavimento per creare tensione in tutto il corpo (leg drive).']);

  X('panca-inclinata-bil','Panca Inclinata con Bilanciere','Barbell Incline Press','bilanciere','spinta-oriz',['chest','front_delts'],['triceps'],'Barbell_Incline_Bench_Press_-_Medium_Grip',
    ['Regola la panca a 30-45°: oltre i 45° il lavoro si sposta troppo sui deltoidi.',
     'Retrai le scapole e appoggia saldamente la schiena alta allo schienale.',
     'Porta il bilanciere alla parte alta del petto (clavicole) controllando la discesa.',
     'Fai una pausa di 1 secondo in basso mantenendo la tensione sui pettorali, poi spingi.'],
    ['Inclinazione troppo alta (>45°) che trasforma l\'esercizio in una spinta per spalle.',
     'Portare il bilanciere troppo in basso, verso lo sterno, perdendo l\'angolo di lavoro.',
     'Rimbalzo sul petto invece della pausa richiesta dal programma.'],
    ['Nel Min-Max è previsto 1 secondo di pausa in basso mantenendo tensione sui pettorali.',
     'Tieni i polsi neutri, il bilanciere sulla base del palmo.']);

  X('panca-inclinata-db','Panca Inclinata con Manubri','Incline Dumbbell Press','manubri','spinta-oriz',['chest','front_delts'],['triceps'],'Incline_Dumbbell_Press',
    ['Siediti sulla panca inclinata a 30°, appoggia i manubri sulle cosce e "calciali" in posizione mentre ti sdrai.',
     'Parti con i manubri all\'altezza del petto, gomiti a circa 45°.',
     'Spingi verso l\'alto avvicinando leggermente i manubri, senza farli scontrare.',
     'Scendi lentamente fino a sentire un buon allungamento sui pettorali.'],
    ['Scendere troppo in basso forzando la spalla oltre il range confortevole.',
     'Far toccare i manubri in alto scaricando la tensione.',
     'Usare carichi che non permettono di controllare la fase eccentrica.'],
    ['Il maggior stiramento dei manubri rispetto al bilanciere è il loro vantaggio principale: sfruttalo.',
     'Percorso leggermente ad arco, non verticale puro.']);

  X('chest-press-macchina','Chest Press alla Macchina','Machine Chest Press','macchina','spinta-oriz',['chest','front_delts'],['triceps'],'Leverage_Chest_Press',
    ['Regola il sedile in modo che le impugnature siano all\'altezza della parte medio-bassa del petto.',
     'Schiena appoggiata, scapole retratte, piedi a terra.',
     'Spingi in avanti fino quasi all\'estensione completa, senza bloccare i gomiti.',
     'Torna lentamente fino a sentire l\'allungamento del petto, senza far toccare i pesi.'],
    ['Sedile troppo alto o troppo basso: l\'angolo di spinta diventa scomodo per la spalla.',
     'Staccare la schiena dallo schienale per spingere di più.',
     'Fermarsi a metà range in fase negativa perdendo lo stimolo in allungamento.'],
    ['Ottimo per portare a cedimento in sicurezza: nel Min-Max è previsto il mantenimento isometrico finale.',
     'Pensa a "spingere con i gomiti", non con le mani.']);

  X('croci-cavi','Croci ai Cavi','Cable Crossover','cavi','iso',['chest'],['front_delts'],'Cable_Crossover',
    ['Imposta le pulegge all\'altezza delle spalle o poco sopra, afferra le maniglie e fai un passo avanti.',
     'Busto leggermente inclinato in avanti, gomiti morbidi e fissi per tutto il movimento.',
     'Porta le mani davanti al petto disegnando un grande arco, strizzando i pettorali.',
     'Apri lentamente fino a sentire lo stiramento, senza superare la linea del corpo in modo doloroso.'],
    ['Trasformare le croci in una spinta piegando ed estendendo i gomiti.',
     'Usare carichi eccessivi che costringono a "lanciare" le braccia.',
     'Fermare l\'arco troppo presto, senza portare le mani a sovrapporsi.'],
    ['Il picco di tensione è nella fase di massimo allungamento: rallenta lì.',
     'Cambia altezza delle pulegge per colpire fasci alti, medi e bassi.']);

  X('croci-manubri-inclinata','Croci su Panca Inclinata','Incline Dumbbell Flyes','manubri','iso',['chest'],['front_delts'],'Incline_Dumbbell_Flyes',
    ['Panca a 30°, manubri sopra il petto con i gomiti leggermente flessi.',
     'Apri le braccia lateralmente controllando la discesa fino a sentire lo stiramento.',
     'Risali seguendo lo stesso arco, strizzando i pettorali in alto.'],
    ['Gomiti che si flettono ed estendono (diventa una distensione).',
     'Scendere oltre il proprio range di mobilità, mettendo a rischio la spalla.'],
    ['Carichi moderati: è un esercizio di stiramento, non di forza.']);

  X('pec-deck','Pectoral Machine (Pec Deck)','Butterfly','macchina','iso',['chest'],['front_delts'],'Butterfly',
    ['Regola il sedile in modo che le impugnature siano all\'altezza del petto.',
     'Schiena aderente allo schienale, gomiti leggermente flessi.',
     'Chiudi le braccia davanti a te contraendo i pettorali per 1 secondo.',
     'Riapri lentamente fino al massimo allungamento tollerabile.'],
    ['Spingere con le mani anziché condurre il movimento con i gomiti.',
     'Fare rimbalzare i pesi in fase di apertura.'],
    ['Perfetto come esercizio finale per portare il petto a cedimento in sicurezza.']);

  X('piegamenti','Piegamenti sulle Braccia','Push-Up','corpo','spinta-oriz',['chest'],['front_delts','triceps','abs'],'Pushups',
    ['Mani poco più larghe delle spalle, corpo in linea retta dalla testa ai talloni.',
     'Scendi controllando fino a sfiorare il petto al pavimento, gomiti a 45°.',
     'Spingi e a fine movimento allontana leggermente le scapole (protrazione).'],
    ['Bacino che sprofonda o si alza: perdi tensione del core.',
     'Gomiti aperti a 90° che stressano le spalle.',
     'Range parziale: scendere solo a metà.'],
    ['Per aumentare la difficoltà appoggia i piedi in alto o aggiungi un elastico sulla schiena.']);

  X('dip-petto','Dip per Pettorali','Dips Chest Version','corpo','spinta-oriz',['chest'],['triceps','front_delts'],'Dips_-_Chest_Version',
    ['Impugna le parallele, busto inclinato in avanti di circa 30°, gambe leggermente flesse dietro.',
     'Scendi finché le spalle non sono leggermente sotto i gomiti, sentendo l\'allungamento del petto.',
     'Risali spingendo e mantenendo l\'inclinazione in avanti.'],
    ['Restare troppo verticali (diventa un esercizio per tricipiti).',
     'Scendere troppo se hai poca mobilità di spalla.',
     'Dondolare per usare lo slancio.'],
    ['Aggiungi carico con cintura una volta superate le 12 ripetizioni pulite.']);

  X('panca-piana-db','Panca Piana con Manubri','Dumbbell Bench Press','manubri','spinta-oriz',['chest'],['front_delts','triceps'],'Dumbbell_Bench_Press',
    ['Sdraiati con i manubri all\'altezza del petto, gomiti a circa 45°.',
     'Spingi verso l\'alto e leggermente verso l\'interno.',
     'Scendi in 2-3 secondi con 1 secondo di pausa in basso mantenendo tensione.'],
    ['Far sbattere i manubri in alto.','Perdere il controllo in discesa.'],
    ['Ottima alternativa alla panca piana quando cerchi più range di movimento.']);

  X('smith-panca','Panca Piana al Multipower','Smith Machine Bench Press','smith','spinta-oriz',['chest'],['front_delts','triceps'],'Smith_Machine_Bench_Press',
    ['Posiziona la panca in modo che il bilanciere scenda sulla parte bassa del petto.',
     'Scapole retratte, piedi a terra, sblocca il bilanciere.',
     'Scendi controllato, pausa di 1 secondo, spingi.'],
    ['Posizionare la panca troppo avanti o indietro rispetto alla guida.',
     'Dimenticare di ruotare il polso per bloccare i ganci a fine serie.'],
    ['Il percorso guidato ti permette di arrivare a cedimento in sicurezza anche senza spotter.']);

  X('smith-inclinata','Panca Inclinata al Multipower','Smith Machine Incline Press','smith','spinta-oriz',['chest','front_delts'],['triceps'],'Smith_Machine_Incline_Bench_Press',
    ['Panca a 30-45° sotto la guida, bilanciere che scende sulla parte alta del petto.',
     'Discesa controllata con pausa di 1 secondo, poi spinta.'],
    ['Inclinazione eccessiva.','Portare il bilanciere sul collo.'],
    ['Sostituto ideale della panca inclinata con bilanciere se ti alleni da solo.']);

  X('pullover-db','Pullover con Manubrio','Straight-Arm Dumbbell Pullover','manubri','iso',['chest','lats'],['triceps'],'Straight-Arm_Dumbbell_Pullover',
    ['Sdraiati sulla panca (in linea o trasversale), manubrio tenuto a due mani sopra il petto.',
     'Con le braccia quasi tese porta il manubrio dietro la testa fino a sentire lo stiramento.',
     'Riporta il manubrio sopra il petto contraendo petto e dorsali.'],
    ['Flettere troppo i gomiti trasformandolo in un french press.',
     'Inarcare eccessivamente la zona lombare.'],
    ['Ottimo per l\'espansione della gabbia toracica e lo stiramento del gran dorsale.']);

  /* ================= SCHIENA ================= */
  X('trazioni-presa-larga','Trazioni Presa Larga','Wide-Grip Pull-Up','corpo','traz-vert',['lats'],['upper_back','biceps','forearms'],'Wide-Grip_Rear_Pull-Up',
    ['Impugna la sbarra con presa prona, mani circa una volta e mezzo la larghezza delle spalle.',
     'Parti da braccia completamente distese, senti i dorsali allungarsi ("si aprono").',
     'Tira portando i gomiti verso il basso e leggermente indietro, petto verso la sbarra.',
     'Scendi in 2-3 secondi controllando il negativo fino alla completa estensione.'],
    ['Range parziale: non arrivare mai a braccia distese in basso.',
     'Usare lo slancio delle gambe (kipping) quando l\'obiettivo è ipertrofia.',
     'Tirare con le braccia dimenticando di deprimere le scapole per primo.',
     'Strapiombare la testa in avanti invece di portare il petto in alto.'],
    ['Nel Min-Max: "controlla il negativo e senti i dorsali che si aprono. Range completo!"',
     'Se non riesci a fare le ripetizioni previste usa un elastico o la macchina assistita.',
     'Quando superi le 10-12 ripetizioni aggiungi carico con la cintura.']);

  X('trazioni-presa-stretta','Trazioni Presa Stretta','Close-Grip Pull-Up','corpo','traz-vert',['lats'],['biceps','upper_back'],'Chin-Up',
    ['Impugna la sbarra alla larghezza delle spalle o con presa neutra/supina.',
     'Parti da braccia distese, tira portando i gomiti lungo i fianchi.',
     'Arriva con il mento sopra la sbarra e scendi in modo controllato.'],
    ['Non completare l\'estensione in basso.','Dondolare il corpo.'],
    ['La presa stretta aumenta il range di movimento e il contributo dei bicipiti.']);

  X('lat-machine-larga','Lat Machine Presa Larga','Wide-Grip Lat Pulldown','macchina','traz-vert',['lats'],['upper_back','biceps'],'Wide-Grip_Lat_Pulldown',
    ['Blocca le cosce sotto i cuscinetti, impugna la barra larga con presa prona.',
     'Parti a braccia distese lasciando che le scapole salgano leggermente.',
     'Deprimi le scapole, poi tira la barra verso la parte alta del petto inclinando il busto di 10-15°.',
     'Risali in 2-3 secondi fino alla completa estensione.'],
    ['Inclinare troppo il busto trasformandolo in un rematore.',
     'Tirare la barra dietro la nuca: rischioso per la spalla e senza vantaggi.',
     'Usare slancio con la schiena.'],
    ['Immagina di "mettere i gomiti in tasca".']);

  X('lat-machine-stretta','Lat Machine Presa Stretta','Close-Grip Lat Pulldown','macchina','traz-vert',['lats'],['biceps','upper_back'],'Close-Grip_Front_Lat_Pulldown',
    ['Usa una maniglia a V o presa neutra stretta.',
     'Parti a braccia distese, deprimi le scapole e tira verso lo sterno.',
     'Contrai 1 secondo in basso, poi risali controllando.'],
    ['Reclinare il busto oltre i 20-25°.','Non estendere completamente in alto.'],
    ['La presa stretta permette un range più ampio e un forte accorciamento del dorsale.']);

  X('pulldown-1braccio','Pulldown a un Braccio ai Cavi','1-Arm Cable Pulldown','cavi','traz-vert',['lats'],['biceps'],'One_Arm_Lat_Pulldown',
    ['In ginocchio o seduto di fianco alla puleggia alta, impugna la maniglia con un braccio.',
     'Parti con il braccio completamente disteso e la scapola elevata.',
     'Tira il gomito verso il fianco ruotando leggermente il busto, contrai il dorsale.',
     'Torna lentamente lasciando che la scapola risalga.'],
    ['Ruotare troppo il busto usando il peso del corpo.',
     'Non sfruttare l\'allungamento iniziale.'],
    ['Il lavoro unilaterale ti permette un range maggiore e di correggere gli squilibri.']);

  X('rematore-tbar','Rematore T-Bar con Appoggio','Chest-Supported T-Bar Row','macchina','traz-oriz',['upper_back','lats'],['rear_delts','biceps'],'Lying_T-Bar_Row',
    ['Appoggia il petto sul supporto inclinato, piedi ben piantati.',
     'Impugna le maniglie con presa prona o neutra, braccia distese.',
     'Tira portando i gomiti verso l\'esterno a circa 45° e stringi forte le scapole in alto.',
     'Scendi lentamente fino alla completa estensione delle braccia.'],
    ['Staccare il petto dall\'appoggio per usare la schiena come leva.',
     'Non strizzare le scapole a fine movimento.',
     'Carico eccessivo che riduce il range.'],
    ['Nel Min-Max: "apri i gomiti a circa 45° e stringi forte le scapole in alto".']);

  X('rematore-db-appoggio','Rematore con Manubri su Panca Inclinata','Chest-Supported DB Row','manubri','traz-oriz',['upper_back','lats'],['rear_delts','biceps'],'Dumbbell_Incline_Row',
    ['Sdraiati a pancia in giù su una panca inclinata a 30-45°.',
     'Lascia pendere i manubri a braccia distese.',
     'Tira portando i gomiti verso l\'alto e indietro, strizzando le scapole.',
     'Scendi in modo controllato.'],
    ['Sollevare il petto dalla panca.','Usare slancio con le gambe.'],
    ['L\'appoggio elimina il contributo dei lombari: tutto il lavoro va alla schiena alta.']);

  X('rematore-macchina','Rematore alla Macchina con Appoggio','Chest-Supported Machine Row','macchina','traz-oriz',['upper_back','lats'],['rear_delts','biceps'],'Leverage_Iso_Row',
    ['Regola il sedile in modo che le maniglie siano all\'altezza dello sterno.',
     'Petto contro il pad, tira portando i gomiti indietro.',
     'Contrai 1 secondo e torna lentamente in allungamento.'],
    ['Staccare il petto dal pad.','Range di movimento ridotto.'],
    ['Perfetto per portare a cedimento la schiena in totale sicurezza.']);

  X('rematore-bilanciere','Rematore con Bilanciere','Bent Over Barbell Row','bilanciere','traz-oriz',['upper_back','lats'],['lower_back','biceps','rear_delts'],'Bent_Over_Barbell_Row',
    ['Piedi alla larghezza delle anche, anche indietro, busto inclinato di circa 45°, schiena neutra.',
     'Impugna il bilanciere poco più largo delle spalle.',
     'Tira verso l\'ombelico portando i gomiti indietro.',
     'Scendi controllando fino alla completa estensione delle braccia.'],
    ['Arrotondare la schiena.','Alzare il busto ad ogni ripetizione.','Usare slancio delle anche.'],
    ['Mantieni il collo in linea con la colonna, sguardo a terra 1-2 metri avanti.']);

  X('rematore-manubrio-1braccio','Rematore con Manubrio a un Braccio','One-Arm Dumbbell Row','manubri','traz-oriz',['lats','upper_back'],['biceps','rear_delts'],'One-Arm_Dumbbell_Row',
    ['Appoggia mano e ginocchio sulla panca, schiena parallela al pavimento.',
     'Braccio disteso verso il basso, lascia scendere la scapola.',
     'Tira il manubrio verso il fianco, gomito vicino al corpo.',
     'Scendi lentamente in massimo allungamento.'],
    ['Ruotare il busto per sollevare più carico.','Tirare con il bicipite invece che con il dorsale.'],
    ['Prova a "far scivolare" il gomito lungo il fianco, senza tirare all\'indietro con la spalla.']);

  X('pulley-basso','Pulley Basso (Rematore ai Cavi)','Seated Cable Row','cavi','traz-oriz',['upper_back','lats'],['biceps','rear_delts'],'Seated_Cable_Rows',
    ['Seduto con ginocchia leggermente flesse, impugna la maniglia a V.',
     'Parti con le braccia distese e le scapole in protrazione.',
     'Tira verso l\'addome mantenendo il busto verticale, gomiti lungo i fianchi.',
     'Torna lentamente lasciando allungare i dorsali.'],
    ['Dondolare il busto avanti e indietro.','Alzare le spalle durante la trazione.'],
    ['Busto quasi fermo: il movimento deve avvenire alle braccia e alle scapole.']);

  X('cable-shrug-in','Cable Shrug-In','Cable Shrug-In','cavi','traz-oriz',['traps'],['upper_back'],'Cable_Shrugs',
    ['In piedi davanti a una puleggia bassa/media, impugna con entrambe le mani.',
     'Con le braccia quasi tese, "scrolla" le spalle verso le orecchie e leggermente indietro.',
     'Tieni 1 secondo in contrazione e torna lentamente.'],
    ['Piegare i gomiti trasformandolo in un rematore.','Ruotare le spalle: il movimento è verticale.'],
    ['Nel Min-Max: "pensa a scrollare le spalle verso le orecchie". Usa le fasce da presa se serve.']);

  X('scrollate-bilanciere','Scrollate con Bilanciere','Barbell Shrug','bilanciere','iso',['traps'],['forearms'],'Barbell_Shrug',
    ['In piedi, bilanciere davanti alle cosce con presa prona alla larghezza delle spalle.',
     'Solleva le spalle verso le orecchie, senza piegare i gomiti.',
     'Pausa di 1 secondo in alto, scendi lentamente in massimo allungamento.'],
    ['Ruotare le spalle (movimento inutile e rischioso).','Usare slancio con le gambe.'],
    ['Usa le fasce da presa per non essere limitato dall\'avambraccio.']);

  X('scrollate-macchina','Scrollate alla Macchina','Machine Shrug','macchina','iso',['traps'],['forearms'],'Leverage_Shrug',
    ['Impugna le maniglie con le braccia distese e le spalle rilassate verso il basso.',
     'Solleva le spalle il più in alto possibile e tieni 1 secondo.',
     'Torna lentamente in completo allungamento.'],
    ['Range ridotto.','Aiutarsi con le gambe.'],
    ['Cerca il massimo allungamento in basso: è lì che il trapezio cresce di più.']);

  X('stacco','Stacco da Terra','Barbell Deadlift','bilanciere','hinge',['lower_back','glutes','hamstrings'],['traps','lats','quads','forearms'],'Barbell_Deadlift',
    ['Piedi sotto il bilanciere alla larghezza delle anche, bilanciere sopra la metà del piede.',
     'Anche indietro, presa poco fuori le ginocchia, schiena neutra e petto alto.',
     'Crea tensione ("togli il gioco dal bilanciere") e spingi il pavimento lontano da te.',
     'Estendi anche e ginocchia insieme, blocca stringendo i glutei senza iperestendere la schiena.',
     'Riporta il bilanciere a terra ripercorrendo lo stesso tragitto.'],
    ['Arrotondare la zona lombare.','Far allontanare il bilanciere dalle gambe.',
     'Iperestendere la schiena in chiusura.','Partire con le anche troppo basse (diventa uno squat).'],
    ['Il bilanciere deve restare a contatto con le gambe per tutta la salita.',
     'Un giro d\'aria in pancia (bracing) prima di ogni ripetizione protegge la colonna.']);

  X('rdl-bilanciere','Stacco Rumeno con Bilanciere','Barbell RDL','bilanciere','hinge',['hamstrings','glutes'],['lower_back','traps'],'Romanian_Deadlift',
    ['In piedi con il bilanciere davanti alle cosce, ginocchia leggermente flesse e fisse.',
     'Porta i glutei indietro facendo scendere il bilanciere lungo le gambe, centrato sul metatarso.',
     'Scendi fino a sentire un forte allungamento dei femorali mantenendo la schiena neutra.',
     'Risali spingendo il bacino in avanti e contraendo i glutei.'],
    ['Arrotondare la schiena in basso.','Piegare troppo le ginocchia (diventa uno stacco).',
     'Allontanare il bilanciere dalle gambe.','Scendere oltre la propria mobilità dei femorali.'],
    ['Nel Min-Max: "porta i glutei indietro, bilanciere centrato sul piede, allungamento profondo ma colonna neutra".',
     'Se senti la lombare invece dei femorali, riduci il range e rallenta.']);

  X('rdl-db','Stacco Rumeno con Manubri','Dumbbell RDL','manubri','hinge',['hamstrings','glutes'],['lower_back'],'Stiff-Legged_Dumbbell_Deadlift',
    ['Manubri davanti alle cosce, ginocchia leggermente flesse.',
     'Anche indietro, manubri che scivolano lungo le gambe.',
     'Risali contraendo i glutei.'],
    ['Trasformarlo in uno squat.','Perdere la neutralità della colonna.'],
    ['I manubri permettono un percorso più naturale se hai poca mobilità.']);

  X('seated-cable-deadlift','Seated Cable Deadlift','Seated Cable Deadlift','cavi','hinge',['hamstrings','glutes'],['lower_back'],'Cable_Deadlifts',
    ['Seduto a terra o su un box davanti a una puleggia bassa, gambe quasi tese.',
     'Fletti il busto in avanti mantenendo la schiena neutra fino al massimo allungamento dei femorali.',
     'Torna indietro estendendo le anche contro la resistenza del cavo.'],
    ['Arrotondare la colonna per guadagnare range.','Tirare con le braccia.'],
    ['Ottima alternativa allo stacco rumeno con carico più leggero sulla colonna.']);

  X('iperestensioni-45','Iperestensioni a 45°','45 Degree Hyperextension','macchina','hinge',['lower_back','glutes'],['hamstrings'],'Hyperextensions_Back_Extensions',
    ['Regola il cuscinetto appena sotto le creste iliache.',
     'Scendi flettendo le anche mantenendo la colonna neutra.',
     'Risali estendendo le anche fino alla linea del corpo, contraendo i glutei.'],
    ['Iperestendere la schiena in alto.','Usare slancio.'],
    ['Se vuoi enfatizzare i glutei, arrotonda leggermente la parte alta della schiena e ruota i piedi verso l\'esterno.']);

  X('dead-hang','Dead Hang (Sospensione alla Sbarra)','Dead Hang','corpo','iso',['forearms'],['lats','upper_back'],'Scapular_Pull-Up',
    ['Appenditi alla sbarra con presa prona alla larghezza delle spalle.',
     'Rilassa le spalle e mantieni la posizione il più a lungo possibile.',
     'Il corpo resta fermo, respirazione controllata.'],
    ['Usare le fasce (annullano lo scopo dell\'esercizio).','Dondolare.'],
    ['Nel Min-Max: "cerca di aggiungere qualche secondo ogni settimana".']);

  X('face-pull','Face Pull ai Cavi','Face Pull','cavi','traz-oriz',['rear_delts','upper_back'],['traps'],'Face_Pull',
    ['Puleggia all\'altezza del viso con corda, presa prona.',
     'Tira la corda verso la fronte separando le mani ed extraruotando le spalle.',
     'Contrai 1 secondo e torna lentamente.'],
    ['Carico eccessivo che porta a usare i trapezi e la schiena.','Tirare troppo in basso, verso il petto.'],
    ['Esercizio chiave per la salute della spalla e la postura.']);

  X('pulldown-braccia-tese','Pulldown a Braccia Tese','Straight-Arm Pulldown','cavi','iso',['lats'],['triceps'],'Straight-Arm_Pulldown',
    ['Puleggia alta, barra dritta o corda, braccia quasi tese e busto leggermente inclinato.',
     'Porta la barra verso le cosce mantenendo le braccia distese, contraendo i dorsali.',
     'Risali lentamente fino al massimo allungamento.'],
    ['Piegare i gomiti (diventa un push-down per tricipiti).','Muovere il busto.'],
    ['Ottimo per imparare a sentire il gran dorsale.']);

  /* ================= SPALLE ================= */
  X('alzate-laterali-db','Alzate Laterali con Manubri','Dumbbell Lateral Raise','manubri','iso',['side_delts'],['traps'],'Side_Lateral_Raise',
    ['In piedi, manubri lungo i fianchi, busto leggermente inclinato in avanti.',
     'Solleva le braccia lateralmente fino all\'altezza delle spalle, gomiti leggermente flessi.',
     'Immagina di versare dell\'acqua da una brocca: mignolo leggermente più alto del pollice.',
     'Scendi in 2-3 secondi controllando, senza far toccare i manubri ai fianchi.'],
    ['Usare slancio con le gambe e la schiena.',
     'Salire oltre la linea delle spalle attivando il trapezio.',
     'Alzare le spalle verso le orecchie durante il movimento.',
     'Carico eccessivo: è un esercizio di isolamento, il carico è secondario.'],
    ['Pensa a "spingere i gomiti lontano da te", non a sollevare le mani.',
     'Piccola inclinazione in avanti (10-15°) per allineare la resistenza al deltoide laterale.']);

  X('alzate-laterali-cavo','Alzate Laterali ai Cavi','Cable Lateral Raise','cavi','iso',['side_delts'],[],'Cable_Seated_Lateral_Raise',
    ['Puleggia bassa (circa altezza anca), cavo che passa davanti al corpo.',
     'Impugna con la mano opposta e lascia che la mano superi leggermente la linea mediana in basso.',
     'Solleva lateralmente fino all\'altezza della spalla, contrai e torna lentamente.'],
    ['Non sfruttare l\'allungamento iniziale oltre la linea mediana.',
     'Inclinare il busto ad ogni ripetizione.'],
    ['Nel Min-Max: "puleggia ad altezza anca, la mano supera leggermente la linea mediana in basso per un allungamento profondo".',
     'Il cavo mantiene tensione costante, a differenza dei manubri.']);

  X('alzate-laterali-cavo-alto','Alzate Laterali al Cavo Alto','High-Cable Lateral Raise','cavi','iso',['side_delts'],['rear_delts'],'Cable_Seated_Lateral_Raise',
    ['Puleggia alta, in piedi di fianco, impugna con il braccio esterno.',
     'Con il braccio quasi teso, porta la mano verso il basso e verso l\'esterno disegnando un grande arco.',
     'Torna lentamente controllando.'],
    ['Piegare il gomito riducendo la leva.','Usare il busto per generare slancio.'],
    ['Nel Min-Max: "disegna il semicerchio più ampio possibile con il braccio".']);

  X('alzate-laterali-macchina','Alzate Laterali alla Macchina','Machine Lateral Raise','macchina','iso',['side_delts'],[],'Lateral_Raise_-_With_Bands',
    ['Regola il sedile in modo che l\'asse di rotazione sia all\'altezza della spalla.',
     'Spingi con i gomiti contro i pad fino all\'altezza delle spalle.',
     'Contrai 1 secondo e torna lentamente.'],
    ['Usare le mani per spingere invece dei gomiti.','Alzare le spalle.'],
    ['Nel Min-Max: "concentrati sullo strizzare il deltoide laterale per muovere il peso". Ideale per drop set e myo-reps.']);

  X('y-raise-inclinata','Y-Raise su Panca Inclinata','Incline DB Y-Raise','manubri','iso',['side_delts','front_delts'],['traps','upper_back'],'Dumbbell_Scaption',
    ['Panca inclinata a 30°, petto appoggiato allo schienale (schiena contro la panca secondo il Min-Max).',
     'Manubri leggeri, braccia distese verso il basso.',
     'Solleva le braccia verso l\'alto e verso l\'esterno formando una "Y" con il corpo.',
     'Scendi lentamente controllando.'],
    ['Usare carichi troppo pesanti che rovinano la traiettoria a Y.',
     'Alzare le spalle verso le orecchie.'],
    ['Nel Min-Max: "usa una panca a 30°, schiena contro lo schienale, solleva in alto e in fuori a Y".']);

  X('y-raise-cavo','Y-Raise ai Cavi','Cable Y-Raise','cavi','iso',['side_delts','front_delts'],['traps'],'Front_Cable_Raise',
    ['Due pulegge basse incrociate, impugna la maniglia opposta con ogni mano.',
     'Solleva le braccia in alto e in fuori a formare una Y.',
     'Torna lentamente.'],
    ['Inarcare la schiena per aiutarsi.','Range parziale.'],
    ['Tensione costante lungo tutto l\'arco di movimento.']);

  X('lento-avanti-bil','Lento Avanti con Bilanciere','Standing Barbell Overhead Press','bilanciere','spinta-vert',['front_delts'],['side_delts','triceps','abs'],'Standing_Military_Press',
    ['Bilanciere sulle clavicole, presa poco più larga delle spalle, gomiti leggermente avanti.',
     'Contrai glutei e addome per creare una base stabile.',
     'Spingi verso l\'alto portando la testa leggermente indietro, poi in avanti sotto il bilanciere.',
     'Blocca con il bilanciere sopra la testa, allineato al centro del piede.'],
    ['Iperestendere la zona lombare.','Spingere in avanti anziché verticalmente.',
     'Non riportare la testa "attraverso" alla fine.'],
    ['Il bilanciere deve seguire una linea verticale sopra il centro di massa.']);

  X('lento-db','Lento con Manubri','Seated Dumbbell Shoulder Press','manubri','spinta-vert',['front_delts'],['side_delts','triceps'],'Dumbbell_Shoulder_Press',
    ['Seduto con schienale a 80-90°, manubri all\'altezza delle orecchie.',
     'Spingi verso l\'alto avvicinando leggermente i manubri.',
     'Scendi controllando fino a un buon allungamento.'],
    ['Far sbattere i manubri in alto.','Scendere troppo in basso forzando la spalla.'],
    ['Un leggero angolo dei gomiti in avanti (30°) riduce lo stress articolare.']);

  X('arnold-press','Arnold Press','Arnold Dumbbell Press','manubri','spinta-vert',['front_delts','side_delts'],['triceps'],'Arnold_Dumbbell_Press',
    ['Parti con i manubri davanti al viso, palmi rivolti verso di te.',
     'Ruota i polsi verso l\'esterno mentre spingi verso l\'alto.',
     'Inverti il movimento in discesa.'],
    ['Ruotare troppo presto.','Carico eccessivo che compromette la rotazione.'],
    ['Ottimo per combinare fasci anteriori e laterali in un unico movimento.']);

  X('pec-deck-inverso-1braccio','Pec Deck Inverso a un Braccio','1-Arm Reverse Pec Deck','macchina','iso',['rear_delts'],['upper_back'],'Reverse_Machine_Flyes',
    ['Siediti frontalmente alla macchina, petto contro lo schienale, impugna con un braccio.',
     'Parti con il braccio davanti al corpo, quasi disteso.',
     'Apri verso l\'esterno disegnando il semicerchio più ampio possibile.',
     'Torna lentamente in allungamento.'],
    ['Piegare il gomito e tirare come un rematore.','Ruotare il busto per aiutarsi.'],
    ['Nel Min-Max: "spazza il peso verso l\'esterno creando il semicerchio più ampio possibile con il braccio".']);

  X('reverse-crossover','Reverse Cable Crossover','Reverse Cable Crossover','cavi','iso',['rear_delts'],['upper_back'],'Cable_Rear_Delt_Fly',
    ['Pulegge alte incrociate, impugna la maniglia opposta con ogni mano.',
     'Braccia quasi tese, apri verso l\'esterno e leggermente all\'indietro.',
     'Contrai i deltoidi posteriori e torna lentamente.'],
    ['Piegare i gomiti.','Usare la schiena per generare il movimento.'],
    ['Tensione costante ideale per un muscolo piccolo come il deltoide posteriore.']);

  X('alzate-posteriori-sdraiato','Alzate Posteriori Sdraiato su Panca','Lying Reverse DB Flye','manubri','iso',['rear_delts'],['upper_back'],'Dumbbell_Lying_Rear_Lateral_Raise',
    ['Sdraiati a pancia in giù su una panca inclinata a 30-45°.',
     'Braccia pendenti, manubri leggeri, gomiti leggermente flessi.',
     'Apri lateralmente fino all\'altezza delle spalle, contrai e torna lentamente.'],
    ['Usare slancio.','Carichi troppo pesanti che coinvolgono i trapezi.'],
    ['Pollici verso l\'alto per enfatizzare il deltoide posteriore.']);

  X('alzate-frontali','Alzate Frontali','Front Dumbbell Raise','manubri','iso',['front_delts'],[],'Front_Dumbbell_Raise',
    ['Manubri davanti alle cosce, presa prona o neutra.',
     'Solleva un braccio (o entrambi) fino all\'altezza delle spalle.',
     'Scendi lentamente.'],
    ['Slanciare con la schiena.','Salire troppo in alto coinvolgendo i trapezi.'],
    ['Spesso ridondante se fai già molte spinte: usalo solo se i deltoidi anteriori sono un punto debole.']);

  X('rear-delt-row','Rematore per Deltoidi Posteriori','Barbell Rear Delt Row','bilanciere','traz-oriz',['rear_delts'],['upper_back','traps'],'Barbell_Rear_Delt_Row',
    ['Busto inclinato a 45°, bilanciere con presa larga.',
     'Tira verso la parte alta del petto con i gomiti alti e aperti.',
     'Contrai le scapole e torna lentamente.'],
    ['Tirare verso l\'ombelico (diventa un rematore per dorsali).','Carico eccessivo.'],
    ['Gomiti alti e larghi = deltoidi posteriori e trapezio medio.']);

  /* ================= BICIPITI ================= */
  X('curl-bayesian','Curl Bayesian ai Cavi','Bayesian Cable Curl','cavi','iso',['biceps'],['forearms'],'Standing_One-Arm_Cable_Curl',
    ['Puleggia bassa, dai le spalle alla macchina e fai un passo avanti.',
     'Il braccio resta dietro la linea del corpo: è questa la posizione di massimo allungamento.',
     'Fletti il gomito portando la mano alla spalla, senza spostare il gomito in avanti.',
     'Scendi in 2-3 secondi sentendo lo stiramento profondo del bicipite.'],
    ['Portare il gomito in avanti durante la salita.',
     'Perdere la posizione arretrata del braccio.',
     'Fase negativa troppo veloce: è la parte più stimolante dell\'esercizio.'],
    ['Nel Min-Max: "inclinati leggermente in avanti per evitare che il cavo tocchi il polso in alto; controlla il negativo e senti l\'allungamento profondo".',
     'Il capo lungo del bicipite lavora al massimo con la spalla estesa.']);

  X('curl-manubri','Curl con Manubri in Piedi','Standing Dumbbell Curl','manubri','iso',['biceps'],['forearms'],'Dumbbell_Bicep_Curl',
    ['In piedi, manubri lungo i fianchi con presa supina.',
     'Fletti i gomiti mantenendoli fermi lungo il busto.',
     'Contrai in alto senza portare i gomiti in avanti, poi scendi lentamente.'],
    ['Slanciare con la schiena.','Portare i gomiti avanti scaricando il bicipite.','Non distendere completamente in basso.'],
    ['Se le ultime ripetizioni diventano un cheat curl, riduci il carico.']);

  X('curl-manubri-alternato','Curl Alternato con Manubri','Alternating Dumbbell Curl','manubri','iso',['biceps'],['forearms'],'Dumbbell_Alternate_Bicep_Curl',
    ['In piedi, manubri lungo i fianchi.',
     'Fletti un braccio alla volta con movimento fluido e controllato.',
     'Ruota leggermente il polso in supinazione durante la salita.'],
    ['Ondeggiare il busto ad ogni ripetizione.','Non completare l\'estensione.'],
    ['Nel Min-Max: "ripetizioni fluide e controllate".']);

  X('curl-panca-inclinata','Curl su Panca Inclinata','Incline Dumbbell Curl','manubri','iso',['biceps'],['forearms'],'Incline_Dumbbell_Curl',
    ['Panca a 45-60°, schiena appoggiata, braccia pendenti dietro la linea del corpo.',
     'Fletti i gomiti senza spostarli in avanti.',
     'Scendi lentamente fino alla completa estensione.'],
    ['Spostare i gomiti avanti.','Staccare la schiena dallo schienale.'],
    ['Massimo allungamento del capo lungo: uno dei migliori esercizi per il picco del bicipite.']);

  X('curl-bilanciere','Curl con Bilanciere','Barbell Curl','bilanciere','iso',['biceps'],['forearms'],'Barbell_Curl',
    ['In piedi, bilanciere con presa supina alla larghezza delle spalle.',
     'Fletti i gomiti mantenendoli fermi lungo il busto.',
     'Scendi controllando fino alla completa estensione.'],
    ['Usare le anche per slanciare.','Portare i gomiti in avanti.'],
    ['Se il polso è fastidioso passa al bilanciere EZ.']);

  X('curl-ez','Curl con Bilanciere EZ','EZ-Bar Curl','ez','iso',['biceps'],['forearms'],'EZ-Bar_Curl',
    ['Impugna il bilanciere EZ nelle impugnature inclinate.',
     'Fletti i gomiti mantenendoli fermi, scendi lentamente.'],
    ['Slanciare con la schiena.','Non completare il range.'],
    ['L\'impugnatura semi-supina riduce lo stress su polsi e gomiti.']);

  X('curl-martello','Curl a Martello','Dumbbell Hammer Curl','manubri','iso',['biceps','forearms'],[],'Hammer_Curls',
    ['Manubri con presa neutra (palmi rivolti verso il corpo).',
     'Fletti i gomiti mantenendo la presa neutra per tutto il movimento.',
     'Scendi lentamente.'],
    ['Ruotare il polso.','Slanciare.'],
    ['Colpisce brachiale e brachioradiale: aggiunge spessore al braccio.']);

  X('curl-martello-panca','Curl a Martello alla Panca Scott','Preacher Hammer Curl','manubri','iso',['biceps','forearms'],[],'Preacher_Hammer_Dumbbell_Curl',
    ['Appoggia il braccio sulla panca Scott con presa neutra.',
     'Fletti il gomito e contrai in alto, poi scendi lentamente.'],
    ['Staccare il gomito dal pad.','Estendere di scatto in basso.'],
    ['La panca Scott elimina lo slancio: perfetta per il cedimento controllato.']);

  X('zottman-modificato','Curl Zottman Modificato','Modified Zottman Curl','manubri','iso',['biceps','forearms'],[],'Zottman_Curl',
    ['Sali con presa neutra (a martello).',
     'Arrivato in alto ruota il polso in supinazione (palmo verso l\'alto).',
     'Scendi lentamente con il palmo rivolto verso l\'alto.'],
    ['Ruotare troppo presto o troppo tardi.','Scendere velocemente.'],
    ['Nel Min-Max: "curl a martello in salita, curl supinato in discesa".']);

  X('curl-scott','Curl alla Panca Scott','Preacher Curl','ez','iso',['biceps'],['forearms'],'Preacher_Curl',
    ['Appoggia le ascelle sul bordo alto del pad, braccia distese.',
     'Fletti i gomiti e contrai in alto.',
     'Scendi lentamente fino a quasi completa estensione.'],
    ['Estendere di scatto: rischio per il tendine distale.','Staccare i gomiti dal pad.'],
    ['Non bloccare mai completamente il gomito in basso con carichi pesanti.']);

  X('curl-concentrato','Curl di Concentrazione','Concentration Curl','manubri','iso',['biceps'],[],'Concentration_Curls',
    ['Seduto, gomito appoggiato all\'interno coscia.',
     'Fletti il gomito portando il manubrio alla spalla, supinando.',
     'Scendi lentamente.'],
    ['Muovere la spalla.','Usare il busto per aiutarsi.'],
    ['Massima connessione mente-muscolo, ottimo come finisher.']);

  /* ================= TRICIPITI ================= */
  X('french-press-cavo-alto','Estensioni Tricipiti Sopra la Testa ai Cavi','Overhead Cable Triceps Extension','cavi','iso',['triceps'],[],'Cable_Rope_Overhead_Triceps_Extension',
    ['Puleggia bassa o alta con corda, dai le spalle alla macchina e fai un passo avanti.',
     'Porta le mani dietro la nuca con i gomiti alti e puntati in avanti.',
     'Estendi i gomiti fino a braccia quasi tese, separando la corda in alto.',
     'Torna lentamente sentendo lo stiramento profondo del tricipite.'],
    ['Far scendere i gomiti verso il basso durante l\'estensione.',
     'Fase negativa troppo veloce.',
     'Inarcare la schiena per compensare la mancanza di mobilità.'],
    ['Nel Min-Max: "senti un allungamento profondo del tricipite lungo tutta la fase negativa".',
     'La posizione sopra la testa allunga il capo lungo: è la più efficace per l\'ipertrofia.']);

  X('french-press-db','Estensioni Tricipiti Sopra la Testa con Manubrio','Overhead DB Triceps Extension','manubri','iso',['triceps'],[],'Standing_Dumbbell_Triceps_Extension',
    ['Seduto o in piedi, manubrio tenuto a due mani sopra la testa.',
     'Fletti i gomiti portando il manubrio dietro la nuca, gomiti fermi.',
     'Estendi contraendo i tricipiti.'],
    ['Aprire i gomiti verso l\'esterno.','Muovere le spalle.'],
    ['Se hai poca mobilità di spalla usa un manubrio più leggero o i cavi.']);

  X('skull-crusher','Skull Crusher','Skull Crusher','ez','iso',['triceps'],[],'EZ-Bar_Skullcrusher',
    ['Sdraiato sulla panca, bilanciere EZ sopra il petto con braccia tese.',
     'Fletti i gomiti portando il bilanciere sopra o dietro la fronte.',
     'Estendi senza spostare i gomiti in avanti.'],
    ['Muovere i gomiti (diventa una distensione).','Scendere troppo velocemente.'],
    ['Porta il bilanciere leggermente dietro la testa per aumentare l\'allungamento del capo lungo.']);

  X('kickback-cavo','Kickback ai Cavi','Cable Triceps Kickback','cavi','iso',['triceps'],[],'Tricep_Dumbbell_Kickback',
    ['Puleggia bassa, busto inclinato in avanti, gomito alto e fermo dietro il busto.',
     'Estendi il gomito fino alla completa distensione, contraendo il tricipite.',
     'Torna lentamente mantenendo il braccio dietro il corpo.'],
    ['Far cadere il gomito in avanti durante il movimento.',
     'Usare il busto o la spalla per generare il movimento.'],
    ['Nel Min-Max: "mantieni il braccio dietro il busto per tutto il range di movimento".']);

  X('pushdown-corda','Push-Down ai Cavi con Corda','Triceps Pushdown Rope','cavi','iso',['triceps'],[],'Triceps_Pushdown_-_Rope_Attachment',
    ['Puleggia alta con corda, gomiti fermi lungo i fianchi.',
     'Estendi i gomiti separando la corda in basso.',
     'Torna controllando fino a circa 90° di flessione.'],
    ['Aprire i gomiti verso l\'esterno.','Inclinare il busto per spingere di più.'],
    ['Tieni i gomiti "incollati" ai fianchi: se si spostano, il carico è troppo alto.']);

  X('dip-tricipiti','Dip per Tricipiti','Close Grip Dip','corpo','spinta-oriz',['triceps'],['chest','front_delts'],'Dips_-_Triceps_Version',
    ['Alle parallele, busto il più verticale possibile, gomiti vicino al corpo.',
     'Scendi fino a circa 90° di flessione del gomito.',
     'Risali estendendo completamente senza inclinarti in avanti.'],
    ['Inclinarsi in avanti (sposta il lavoro sul petto).','Scendere troppo se hai spalle rigide.'],
    ['Aggiungi carico quando superi le 12-15 ripetizioni pulite.']);

  X('dip-macchina','Dip alla Macchina','Seated Dip Machine','macchina','spinta-oriz',['triceps'],['chest'],'Dip_Machine',
    ['Seduto, schiena appoggiata, impugna le maniglie.',
     'Estendi i gomiti spingendo verso il basso.',
     'Torna lentamente fino alla massima flessione confortevole.'],
    ['Staccare la schiena.','Range parziale.'],
    ['Ideale per portare i tricipiti a cedimento in sicurezza.']);

  X('panca-presa-stretta','Panca Presa Stretta','Close-Grip Bench Press','bilanciere','spinta-oriz',['triceps'],['chest','front_delts'],'Close-Grip_Barbell_Bench_Press',
    ['Presa alla larghezza delle spalle (non più stretta: stressa i polsi).',
     'Scendi con i gomiti vicini al busto fino alla parte bassa del petto.',
     'Spingi estendendo con forza i tricipiti.'],
    ['Presa troppo stretta.','Aprire i gomiti.'],
    ['Il miglior esercizio composto per i tricipiti.']);

  /* ================= AVAMBRACCI ================= */
  X('wrist-curl-db','Wrist Curl con Manubri','Dumbbell Wrist Curl','manubri','iso',['forearms'],[],'Seated_Dumbbell_Palms-Up_Wrist_Curl',
    ['Seduto, avambracci appoggiati sulle cosce o su una panca, palmi verso l\'alto.',
     'Lascia scendere i manubri fino alla punta delle dita.',
     'Arrotola le dita e fletti i polsi verso l\'alto contraendo gli avambracci.'],
    ['Muovere i gomiti.','Range parziale (non aprire le dita in basso).'],
    ['Nel Min-Max: "ripetizioni fluide e controllate".']);

  X('wrist-ext-db','Wrist Extension con Manubri','Dumbbell Wrist Extension','manubri','iso',['forearms'],[],'Seated_Dumbbell_Palms-Down_Wrist_Curl',
    ['Avambracci appoggiati, palmi rivolti verso il basso.',
     'Estendi i polsi verso l\'alto contraendo gli estensori.',
     'Scendi lentamente.'],
    ['Carichi eccessivi (gli estensori sono deboli).','Muovere il gomito.'],
    ['Fondamentale per bilanciare il lavoro dei flessori e prevenire l\'epicondilite.']);

  X('wrist-curl-cavo','Wrist Curl ai Cavi','Cable Wrist Curl','cavi','iso',['forearms'],[],'Cable_Wrist_Curl',
    ['Seduto davanti a una puleggia bassa, avambracci sulle cosce, palmi in alto.',
     'Fletti i polsi contro la resistenza del cavo, poi torna lentamente.'],
    ['Sollevare gli avambracci.','Range ridotto.'],
    ['Il cavo mantiene tensione costante anche in allungamento.']);

  X('wrist-ext-cavo','Wrist Extension ai Cavi','Cable Wrist Extension','cavi','iso',['forearms'],[],'Cable_Wrist_Curl',
    ['Puleggia bassa, avambracci appoggiati con palmi verso il basso.',
     'Estendi i polsi verso l\'alto, poi torna lentamente.'],
    ['Usare troppo carico.','Muovere le spalle.'],
    ['Ottimo per la salute del gomito se fai molte trazioni.']);

  X('farmer-walk','Farmer Walk','Farmer\'s Walk','manubri','iso',['forearms','traps'],['abs','glutes'],'Plate_Pinch',
    ['Afferra due manubri o kettlebell pesanti, spalle basse e petto alto.',
     'Cammina a passi corti e controllati mantenendo il core contratto.'],
    ['Inclinarsi lateralmente.','Spalle arrotondate in avanti.'],
    ['Ottimo per presa, trapezi e stabilità del core.']);

  /* ================= QUADRICIPITI / GAMBE ================= */
  X('squat-bilanciere','Squat con Bilanciere','Barbell Back Squat','bilanciere','squat',['quads','glutes'],['adductors','lower_back','hamstrings'],'Barbell_Squat',
    ['Bilanciere sui trapezi (high bar) o sui deltoidi posteriori (low bar), piedi alla larghezza delle spalle.',
     'Punte leggermente extraruotate, respira e crea pressione addominale.',
     'Scendi controllando piegando anche e ginocchia insieme, ginocchia in linea con le punte.',
     'Scendi almeno fino a quando le anche sono sotto la linea delle ginocchia (se la mobilità lo permette).',
     'Risali spingendo con tutto il piede, senza far cadere il petto in avanti.'],
    ['Ginocchia che collassano verso l\'interno.',
     'Perdita della neutralità lombare in fondo ("butt wink" eccessivo).',
     'Sollevare i talloni: spesso è un problema di mobilità di caviglia.',
     'Risalire prima con il bacino lasciando indietro il petto.'],
    ['Nel Min-Max lo squat è "a tua scelta": back squat, front squat, pendulum, hack, belt squat o multipower.',
     'Su questo esercizio RIR 0 significa "nessuna ripetizione in serbo", senza cercare il cedimento reale.',
     'Scarpe con tacco o dischetti sotto i talloni aiutano se hai caviglie rigide.']);

  X('front-squat','Front Squat','Front Barbell Squat','bilanciere','squat',['quads'],['glutes','abs','upper_back'],'Front_Barbell_Squat',
    ['Bilanciere appoggiato sui deltoidi anteriori, gomiti alti.',
     'Scendi mantenendo il busto il più verticale possibile.',
     'Risali spingendo con i talloni senza far cadere i gomiti.'],
    ['Gomiti che cadono e bilanciere che scivola.','Busto che si inclina in avanti.'],
    ['Più selettivo sui quadricipiti e più tollerabile per la schiena rispetto al back squat.']);

  X('hack-squat','Hack Squat alla Macchina','Hack Squat','macchina','squat',['quads'],['glutes'],'Hack_Squat',
    ['Schiena aderente al pad, piedi al centro della pedana alla larghezza delle spalle.',
     'Scendi controllando fino a superare i 90° di flessione del ginocchio.',
     'Risali senza bloccare completamente le ginocchia.'],
    ['Staccare la zona lombare dal pad.','Range parziale.','Ginocchia verso l\'interno.'],
    ['Piedi più bassi sulla pedana = più quadricipiti; più alti = più glutei e femorali.']);

  X('pendulum-squat','Pendulum Squat','Pendulum Squat','macchina','squat',['quads'],['glutes'],'Lying_Machine_Squat',
    ['Posizionati con schiena e spalle contro i pad, piedi centrati sulla pedana.',
     'Scendi lasciando che il movimento segua l\'arco naturale della macchina.',
     'Risali spingendo con tutto il piede.'],
    ['Piedi troppo alti o troppo bassi rispetto alla propria struttura.','Range parziale.'],
    ['Curva di resistenza eccellente per i quadricipiti con carico minimo sulla colonna.']);

  X('smith-squat','Squat al Multipower','Smith Machine Squat','smith','squat',['quads','glutes'],['adductors'],'Smith_Machine_Squat',
    ['Piedi leggermente avanti rispetto alla linea del bilanciere.',
     'Scendi controllando fino ad almeno il parallelo.',
     'Risali spingendo, senza bloccare completamente le ginocchia.'],
    ['Piedi troppo avanti che stressano le ginocchia in modo innaturale.','Range parziale.'],
    ['Il percorso guidato ti permette di cercare il cedimento con più sicurezza.']);

  X('leg-press','Leg Press','Leg Press','macchina','squat',['quads','glutes'],['adductors','hamstrings'],'Leg_Press',
    ['Schiena e bacino aderenti allo schienale, piedi al centro della pedana.',
     'Piedi più bassi sulla pedana per enfatizzare i quadricipiti.',
     'Scendi il più possibile senza che il bacino si stacchi (retroversione).',
     'Spingi senza bloccare completamente le ginocchia.'],
    ['Staccare il bacino in basso: mette a rischio i dischi lombari.',
     'Bloccare le ginocchia in estensione con carichi elevati.',
     'Mani sulle ginocchia per spingere.'],
    ['Nel Min-Max: "piedi più bassi sulla pedana per enfatizzare i quadricipiti; scendi il più possibile senza arrotondare la schiena".']);

  X('leg-extension','Leg Extension','Leg Extension','macchina','iso',['quads'],[],'Leg_Extensions',
    ['Regola lo schienale in modo che il ginocchio sia allineato all\'asse di rotazione.',
     'Estendi le gambe fino alla contrazione completa, pausa di 1 secondo.',
     'Scendi lentamente fino al massimo allungamento.'],
    ['Slanciare il peso con le anche.','Fermarsi prima della piena estensione.',
     'Far rimbalzare i pesi in basso.'],
    ['Reclinare lo schienale allunga il retto femorale e aumenta lo stimolo.',
     'Ottimo per le partial in allungamento (extend set) previste nel blocco 2.']);

  X('sissy-squat','Sissy Squat','Sissy Squat','corpo','iso',['quads'],[],'Weighted_Sissy_Squat',
    ['In piedi, sali sull\'avampiede tenendoti a un supporto.',
     'Porta le ginocchia in avanti e il bacino indietro mantenendo il corpo in linea.',
     'Scendi il più possibile e risali contraendo i quadricipiti.'],
    ['Piegare le anche (diventa uno squat).','Scendere oltre la propria capacità di controllo.'],
    ['Enorme stiramento del retto femorale: introducilo gradualmente.']);

  X('affondi-db','Affondi con Manubri','Dumbbell Lunges','manubri','affondo',['quads','glutes'],['hamstrings','adductors'],'Dumbbell_Lunges',
    ['Manubri lungo i fianchi, passo avanti (o indietro) ampio.',
     'Scendi fino a sfiorare il ginocchio posteriore a terra.',
     'Risali spingendo con il tallone della gamba anteriore.'],
    ['Passo troppo corto (stress sul ginocchio).','Busto che crolla in avanti.','Perdita di equilibrio.'],
    ['Gli affondi all\'indietro sono più stabili e più gentili con le ginocchia.']);

  X('affondi-smith','Affondi al Multipower','Smith Machine Lunge','smith','affondo',['quads','glutes'],['hamstrings'],'Smith_Single-Leg_Split_Squat',
    ['Bilanciere sui trapezi, un piede avanti e uno indietro.',
     'Scendi verticalmente fino a sfiorare il ginocchio posteriore.',
     'Risali spingendo con la gamba anteriore.'],
    ['Posizionare male i piedi rispetto alla guida.','Range parziale.'],
    ['Su questo esercizio RIR 0 significa "nessuna ripetizione in serbo", senza cercare il cedimento reale.']);

  X('bulgarian-split-squat','Bulgarian Split Squat','Bulgarian Split Squat','manubri','affondo',['quads','glutes'],['hamstrings','adductors'],'Split_Squat_with_Dumbbells',
    ['Piede posteriore appoggiato su una panca, piede anteriore a circa 60-70 cm.',
     'Scendi verticalmente fino a sfiorare il ginocchio posteriore.',
     'Risali spingendo con la gamba anteriore.'],
    ['Piede anteriore troppo vicino alla panca.','Busto troppo eretto se vuoi enfatizzare i glutei.'],
    ['Inclina il busto in avanti per più glutei, resta eretto per più quadricipiti.']);

  X('goblet-squat','Goblet Squat','Goblet Squat','manubri','squat',['quads','glutes'],['abs','adductors'],'Goblet_Squat',
    ['Tieni un manubrio o kettlebell davanti al petto.',
     'Scendi tra le ginocchia mantenendo il busto verticale.',
     'Risali spingendo con tutto il piede.'],
    ['Far cadere il peso in avanti.','Talloni che si sollevano.'],
    ['Perfetto per imparare la meccanica dello squat.']);

  X('step-up','Step-Up','Dumbbell Step Up','manubri','affondo',['quads','glutes'],['hamstrings'],'Dumbbell_Step_Ups',
    ['Box o panca all\'altezza del ginocchio, manubri lungo i fianchi.',
     'Sali spingendo esclusivamente con la gamba sul box.',
     'Scendi controllando con la stessa gamba.'],
    ['Spingere con la gamba a terra.','Box troppo alto.'],
    ['Aumenta l\'altezza del box per coinvolgere più i glutei.']);

  /* ================= FEMORALI / GLUTEI ================= */
  X('leg-curl-sdraiato','Leg Curl Sdraiato','Lying Leg Curl','macchina','iso',['hamstrings'],['calves'],'Lying_Leg_Curls',
    ['Sdraiati a pancia in giù, ginocchia appena oltre il bordo del pad.',
     'Regola il rullo appena sopra i talloni.',
     'Fletti le ginocchia portando i talloni verso i glutei, contrai 1 secondo.',
     'Scendi lentamente fino al massimo allungamento senza far toccare i pesi.'],
    ['Sollevare il bacino dal pad per aiutarsi.',
     'Range parziale in basso.',
     'Movimento troppo veloce.'],
    ['Nel Min-Max: "regola la macchina per il massimo allungamento in basso; non far staccare il sedere dal pad".',
     'Punta i piedi (plantarflessione) per ridurre il contributo dei polpacci.']);

  X('leg-curl-seduto','Leg Curl Seduto','Seated Leg Curl','macchina','iso',['hamstrings'],['calves'],'Seated_Leg_Curl',
    ['Seduto con schienale regolato, ginocchia allineate all\'asse della macchina.',
     'Fletti le ginocchia portando i talloni sotto il sedile.',
     'Contrai e torna lentamente in massimo allungamento.'],
    ['Sollevarsi dal sedile.','Range parziale.'],
    ['La posizione seduta allunga di più il capo lungo del bicipite femorale: leggermente più efficace per l\'ipertrofia.']);

  X('nordic-curl','Nordic Ham Curl','Nordic Ham Curl','corpo','iso',['hamstrings'],['glutes','calves'],'Natural_Glute_Ham_Raise',
    ['In ginocchio con le caviglie bloccate, corpo in linea dalle ginocchia alla testa.',
     'Scendi il più lentamente possibile controllando con i femorali.',
     'Usa le mani per rimbalzare a terra e tornare su.'],
    ['Piegare le anche durante la discesa.','Scendere troppo velocemente (perdi il controllo eccentrico).'],
    ['Esercizio molto intenso: 2-3 serie a settimana bastano. Ottimo per prevenire infortuni.']);

  X('reverse-nordic','Reverse Nordic Curl','Reverse Nordic','corpo','iso',['quads'],['abs'],'Weighted_Sissy_Squat',
    ['In ginocchio, corpo in linea, mani sui fianchi.',
     'Inclinati all\'indietro controllando con i quadricipiti.',
     'Torna su contraendo i quadricipiti.'],
    ['Piegare le anche.','Scendere oltre il proprio controllo.'],
    ['Ottimo esercizio a corpo libero per il retto femorale in allungamento.']);

  X('hip-thrust-bilanciere','Hip Thrust con Bilanciere','Barbell Hip Thrust','bilanciere','hinge',['glutes'],['hamstrings','quads'],'Barbell_Hip_Thrust',
    ['Schiena alta appoggiata a una panca, bilanciere sulle anche con un pad.',
     'Piedi alla larghezza delle spalle, stinchi verticali al top.',
     'Spingi con i talloni estendendo le anche fino alla linea del corpo.',
     'Contrai i glutei 1-2 secondi in alto e scendi controllando.'],
    ['Iperestendere la zona lombare invece delle anche.',
     'Piedi troppo vicini o troppo lontani.',
     'Mento in alto: tieni lo sguardo verso le ginocchia per un bacino neutro.'],
    ['Nel Min-Max: "strizza forte i glutei in alto e controlla la discesa".']);

  X('hip-thrust-macchina','Hip Thrust alla Macchina','Machine Hip Thrust','macchina','hinge',['glutes'],['hamstrings'],'Barbell_Hip_Thrust',
    ['Regola il pad sulle anche e appoggia bene la schiena.',
     'Estendi le anche fino alla contrazione completa dei glutei.',
     'Pausa 1 secondo e torna lentamente.'],
    ['Usare la schiena invece dei glutei.','Range parziale.'],
    ['Più stabile del bilanciere: puoi concentrarti solo sulla contrazione.']);

  X('glute-bridge','Glute Bridge','Barbell Glute Bridge','bilanciere','hinge',['glutes'],['hamstrings'],'Barbell_Glute_Bridge',
    ['Sdraiato a terra, bilanciere sulle anche, ginocchia piegate.',
     'Spingi con i talloni estendendo le anche.',
     'Contrai i glutei in alto e scendi controllando.'],
    ['Iperestendere la lombare.','Spingere con le punte.'],
    ['Versione più semplice dell\'hip thrust, con meno range ma facile da caricare.']);

  X('good-morning','Good Morning','Good Morning','bilanciere','hinge',['hamstrings','lower_back'],['glutes'],'Good_Morning',
    ['Bilanciere sui trapezi, ginocchia leggermente flesse.',
     'Porta le anche indietro flettendo il busto in avanti, schiena neutra.',
     'Risali estendendo le anche.'],
    ['Arrotondare la schiena.','Usare carichi eccessivi.'],
    ['Inizia molto leggero: è un esercizio tecnico.']);

  X('abduzioni-macchina','Abduzioni alla Macchina','Thigh Abductor','macchina','iso',['abductors','glutes'],[],'Thigh_Abductor',
    ['Seduto, ginocchia contro i pad esterni.',
     'Apri le gambe verso l\'esterno contraendo i glutei laterali.',
     'Torna lentamente.'],
    ['Usare slancio.','Inclinare il busto in modo incontrollato.'],
    ['Inclinare il busto in avanti enfatizza il piccolo/medio gluteo.']);

  X('adduzioni-macchina','Adduzioni alla Macchina','Thigh Adductor','macchina','iso',['adductors'],[],'Thigh_Adductor',
    ['Seduto, gambe divaricate contro i pad interni.',
     'Chiudi le gambe contraendo gli adduttori.',
     'Riapri lentamente fino a un buon allungamento.'],
    ['Range eccessivo in apertura senza controllo.','Movimento troppo veloce.'],
    ['Adduttori forti migliorano la stabilità nello squat.']);

  /* ================= POLPACCI ================= */
  X('calf-raise-in-piedi','Calf Raise in Piedi','Standing Calf Raise','macchina','iso',['calves'],[],'Standing_Calf_Raises',
    ['In piedi sulla macchina con l\'avampiede sul bordo, spalle sotto i pad.',
     'Scendi lentamente fino al massimo allungamento con 1-2 secondi di pausa in basso.',
     'Sali sulle punte il più in alto possibile contraendo i polpacci.'],
    ['Rimbalzare in basso usando il riflesso elastico del tendine.',
     'Range parziale.',
     'Piegare le ginocchia durante la salita.'],
    ['Nel Min-Max: "1-2 secondi di pausa in basso; invece di limitarti a salire sulle punte, pensa a far rotolare la caviglia avanti e indietro sull\'avampiede".']);

  X('calf-press-leg-press','Calf Press alla Leg Press','Leg Press Calf Press','macchina','iso',['calves'],[],'Calf_Press_On_The_Leg_Press_Machine',
    ['Avampiede sul bordo inferiore della pedana, gambe quasi tese.',
     'Lascia scendere i talloni fino al massimo allungamento.',
     'Spingi sulle punte con la massima estensione.'],
    ['Piegare le ginocchia per spingere di più.','Range ridotto.'],
    ['Attenzione a non lasciare che i piedi scivolino via dalla pedana.']);

  X('donkey-calf','Donkey Calf Raise','Donkey Calf Raise','macchina','iso',['calves'],[],'Donkey_Calf_Raises',
    ['Busto flesso in avanti, avampiedi sul rialzo, carico sulle anche.',
     'Scendi in massimo allungamento e sali sulle punte.'],
    ['Rimbalzare.','Piegare le ginocchia.'],
    ['La flessione dell\'anca allunga il gastrocnemio: molto efficace.']);

  X('calf-raise-seduto','Calf Raise Seduto','Seated Calf Raise','macchina','iso',['calves'],[],'Seated_Calf_Raise',
    ['Seduto con i pad sopra le ginocchia, avampiede sul rialzo.',
     'Scendi lentamente in allungamento e sali sulle punte.'],
    ['Range parziale.','Movimento troppo veloce.'],
    ['Con le ginocchia flesse lavori soprattutto il soleo: complementare al calf in piedi.']);

  /* ================= CORE ================= */
  X('crunch-cavo','Crunch ai Cavi','Cable Crunch','cavi','core',['abs'],['obliques'],'Cable_Crunch',
    ['In ginocchio davanti alla puleggia alta, corda dietro la nuca o accanto alle tempie.',
     'Parti con il busto eretto e le anche ferme.',
     'Arrotonda la schiena portando i gomiti verso le ginocchia, contraendo l\'addome.',
     'Risali lentamente controllando l\'allungamento.'],
    ['Flettere le anche invece della colonna (diventa un movimento di flessione d\'anca).',
     'Tirare con le braccia.',
     'Non arrotondare la zona lombare.'],
    ['Nel Min-Max: "arrotonda la zona lombare mentre esegui il crunch; mantieni la connessione con il retto addominale".']);

  X('crunch-macchina','Crunch alla Macchina','Machine Crunch','macchina','core',['abs'],['obliques'],'Ab_Crunch_Machine',
    ['Regola il sedile e impugna le maniglie o appoggia il petto ai pad.',
     'Fletti il busto arrotondando la colonna, contrai 1 secondo.',
     'Torna lentamente in allungamento.'],
    ['Usare le braccia per spingere.','Range parziale.'],
    ['Facile da caricare progressivamente: ideale per l\'ipertrofia degli addominali.']);

  X('crunch-zavorrato','Crunch Zavorrato','Weighted Crunch','corpo','core',['abs'],['obliques'],'Weighted_Crunches',
    ['Sdraiato con le ginocchia piegate, disco tenuto sul petto o dietro la testa.',
     'Arrotola la colonna sollevando le scapole da terra.',
     'Contrai in alto e scendi lentamente.'],
    ['Tirare il collo con le mani.','Sollevare tutta la schiena (diventa un sit-up).'],
    ['Il range dell\'addome è breve: cerca la contrazione, non l\'altezza.']);

  X('plank','Plank','Plank','corpo','core',['abs'],['obliques','glutes'],'Plank',
    ['Appoggia gli avambracci a terra, gomiti sotto le spalle.',
     'Corpo in linea retta, glutei contratti, bacino in retroversione.',
     'Mantieni la posizione respirando normalmente.'],
    ['Bacino che sprofonda.','Sedere troppo alto.','Trattenere il respiro.'],
    ['Meglio 30 secondi perfetti che 2 minuti con la schiena inarcata.']);

  X('hanging-leg-raise','Sollevamento Gambe alla Sbarra','Hanging Leg Raise','corpo','core',['abs'],['obliques','forearms'],'Hanging_Leg_Raise',
    ['Appeso alla sbarra, spalle attive.',
     'Solleva le gambe portando il bacino in retroversione (non solo le anche).',
     'Scendi lentamente senza dondolare.'],
    ['Dondolare usando lo slancio.','Flettere solo le anche senza arrotolare il bacino.'],
    ['Piega le ginocchia se non riesci a controllare il movimento a gambe tese.']);

  X('ab-wheel','Ab Wheel Rollout','Ab Roller','corpo','core',['abs'],['obliques','lats'],'Ab_Roller',
    ['In ginocchio, mani sulla ruota sotto le spalle, bacino in retroversione.',
     'Rotola in avanti mantenendo la schiena neutra il più a lungo possibile.',
     'Torna contraendo l\'addome.'],
    ['Inarcare la lombare.','Andare oltre il proprio controllo.'],
    ['Uno dei migliori esercizi anti-estensione per il core.']);

  X('russian-twist','Russian Twist','Russian Twist','corpo','core',['obliques'],['abs'],'Russian_Twist',
    ['Seduto con busto inclinato all\'indietro e piedi sollevati.',
     'Ruota il busto da un lato all\'altro controllando.'],
    ['Muovere solo le braccia senza ruotare il busto.','Andare troppo veloce.'],
    ['Aggiungi un disco o kettlebell per aumentare la difficoltà.']);

  X('pallof-press','Pallof Press','Pallof Press','cavi','core',['obliques'],['abs'],'Pallof_Press',
    ['In piedi di lato alla puleggia all\'altezza del petto, mani al centro del petto.',
     'Estendi le braccia in avanti resistendo alla rotazione.',
     'Torna lentamente.'],
    ['Ruotare il busto.','Carichi troppo alti.'],
    ['Esercizio anti-rotazione fondamentale per la stabilità del core.']);

  /* ================= CARDIO / MOBILITÀ ================= */
  X('tapis-roulant','Camminata / Corsa su Tapis Roulant','Treadmill','cardio','cardio',['quads','calves'],['hamstrings','glutes'],'Running_Treadmill',
    ['Imposta velocità e pendenza in base all\'obiettivo.',
     'Per il riscaldamento: 5-10 minuti a bassa intensità.',
     'Per il cardio: 20-40 minuti a intensità moderata o intervalli.'],
    ['Aggrapparsi alle maniglie.','Passi troppo lunghi.'],
    ['La camminata in pendenza è ottima per il deficit calorico senza affaticare le gambe.']);

  X('cyclette','Cyclette','Stationary Bike','cardio','cardio',['quads'],['calves','glutes'],'Bicycling_Stationary',
    ['Regola il sellino in modo che la gamba sia quasi tesa a fine pedalata.',
     '5-10 minuti a bassa intensità come riscaldamento.'],
    ['Sellino troppo basso (stress sulle ginocchia).'],
    ['Ideale come riscaldamento generale prima dell\'allenamento gambe.']);

  X('ellittica','Ellittica','Elliptical Trainer','cardio','cardio',['quads','glutes'],['calves','hamstrings'],'Elliptical_Trainer',
    ['Movimento fluido e continuo, postura eretta.',
     '5-10 minuti per alzare la temperatura corporea.'],
    ['Appoggiarsi con tutto il peso alle maniglie.'],
    ['Basso impatto articolare: ottima se hai fastidi alle ginocchia.']);

  /* ================= EXTRA / VARIANTI ================= */
  X('military-press-macchina','Shoulder Press alla Macchina','Machine Shoulder Press','macchina','spinta-vert',['front_delts'],['side_delts','triceps'],'Machine_Shoulder_Military_Press',
    ['Regola il sedile in modo che le impugnature siano all\'altezza delle spalle.',
     'Spingi verso l\'alto senza bloccare i gomiti.',
     'Torna lentamente fino a un buon allungamento.'],
    ['Staccare la schiena dallo schienale.','Range parziale.'],
    ['Sicura per portare a cedimento i deltoidi anteriori.']);

  X('trazioni-assistite','Trazioni Assistite alla Macchina','Assisted Pull-Up','macchina','traz-vert',['lats'],['biceps','upper_back'],'Band_Assisted_Pull-Up',
    ['Imposta il contrappeso, appoggia le ginocchia sul pad.',
     'Tira portando i gomiti verso il basso, petto in alto.',
     'Scendi controllando fino alla completa estensione.'],
    ['Usare troppa assistenza.','Non completare il range.'],
    ['Riduci l\'assistenza di 2-5 kg ogni volta che superi le ripetizioni target.']);

  X('pulldown-neutro','Lat Machine Presa Neutra','Neutral-Grip Lat Pulldown','macchina','traz-vert',['lats'],['biceps'],'V-Bar_Pulldown',
    ['Impugnatura a V o barra con maniglie parallele.',
     'Tira verso lo sterno, gomiti lungo i fianchi.',
     'Torna in completa estensione.'],
    ['Reclinare troppo il busto.','Alzare le spalle.'],
    ['Presa neutra = spalle più confortevoli e forte coinvolgimento del dorsale.']);

  X('rematore-inverso','Rematore con Presa Supina','Reverse Grip Bent-Over Row','bilanciere','traz-oriz',['lats'],['biceps','upper_back'],'Reverse_Grip_Bent-Over_Rows',
    ['Presa supina alla larghezza delle spalle, busto a 45°.',
     'Tira verso l\'ombelico con i gomiti vicino ai fianchi.',
     'Scendi controllando.'],
    ['Arrotondare la schiena.','Usare slancio.'],
    ['La presa supina aumenta il lavoro dei dorsali bassi e dei bicipiti.']);

  X('inverted-row','Rematore Orizzontale al Corpo Libero','Inverted Row','corpo','traz-oriz',['upper_back'],['lats','biceps'],'Inverted_Row',
    ['Bilanciere in rack all\'altezza dei fianchi, corpo teso sotto la barra.',
     'Tira il petto verso il bilanciere stringendo le scapole.',
     'Scendi controllando.'],
    ['Bacino che sprofonda.','Range parziale.'],
    ['Rendi l\'esercizio più difficile alzando i piedi su una panca.']);

  X('kettlebell-swing','Kettlebell Swing','Kettlebell Swing','kettlebell','hinge',['glutes','hamstrings'],['lower_back','abs'],'One-Arm_Kettlebell_Swings',
    ['Piedi poco più larghi delle spalle, kettlebell a terra davanti a te.',
     'Hinge d\'anca: porta il kettlebell tra le gambe e proiettalo in avanti estendendo con forza le anche.',
     'Il kettlebell arriva all\'altezza del petto per inerzia, non per lo sforzo delle braccia.'],
    ['Squattare invece di fare hinge.','Sollevare il kettlebell con le braccia.','Iperestendere la schiena in alto.'],
    ['Esplosivo in salita, controllato in discesa. Ottimo condizionamento metabolico.']);

  X('trap-bar-deadlift','Stacco con Trap Bar','Trap Bar Deadlift','bilanciere','hinge',['glutes','quads'],['hamstrings','traps','lower_back'],'Trap_Bar_Deadlift',
    ['In piedi dentro la trap bar, piedi alla larghezza delle anche.',
     'Anche indietro, presa neutra sulle maniglie, petto alto.',
     'Spingi il pavimento lontano estendendo anche e ginocchia.'],
    ['Arrotondare la schiena.','Partire con le anche troppo alte.'],
    ['Più facile da imparare e più gentile con la colonna rispetto allo stacco classico.']);

  X('rack-pull','Rack Pull','Rack Pull','bilanciere','hinge',['lower_back','traps'],['glutes','hamstrings','lats'],'Rack_Pulls',
    ['Bilanciere sui supporti appena sotto o sopra il ginocchio.',
     'Presa alla larghezza delle spalle, schiena neutra.',
     'Estendi le anche portando il bilanciere lungo le cosce.'],
    ['Iperestendere in chiusura.','Usare slancio dalle gambe.'],
    ['Ottimo per lo spessore della schiena alta con carichi elevati.']);

  X('leg-press-monopodalico','Leg Press a una Gamba','Single-Leg Leg Press','macchina','squat',['quads','glutes'],['hamstrings'],'Single_Leg_Push-off',
    ['Un piede al centro della pedana, l\'altro appoggiato a terra o piegato.',
     'Scendi controllando il più possibile senza staccare il bacino.',
     'Spingi senza bloccare il ginocchio.'],
    ['Ginocchio che collassa verso l\'interno.','Range parziale.'],
    ['Ottimo per correggere asimmetrie tra le gambe.']);

  X('hip-abduction-elastico','Abduzioni con Elastico','Band Hip Abduction','elastici','iso',['abductors','glutes'],[],'Monster_Walk',
    ['Elastico sopra le ginocchia, piedi alla larghezza delle anche.',
     'Apri le ginocchia contro la resistenza mantenendo il bacino fermo.'],
    ['Ruotare il bacino.','Movimento troppo veloce.'],
    ['Ottimo nel riscaldamento delle gambe per attivare il medio gluteo.']);

  X('curl-cavi-basso','Curl ai Cavi','Cable Curl','cavi','iso',['biceps'],['forearms'],'Standing_Biceps_Cable_Curl',
    ['Puleggia bassa con barra dritta o EZ, gomiti fermi lungo i fianchi.',
     'Fletti i gomiti e contrai in alto, scendi controllando.'],
    ['Portare i gomiti in avanti.','Slanciare con la schiena.'],
    ['Tensione costante lungo tutto il movimento.']);

  X('spider-curl','Spider Curl','Spider Curl','manubri','iso',['biceps'],[],'Spider_Curl',
    ['Petto appoggiato su una panca inclinata, braccia pendenti verticalmente.',
     'Fletti i gomiti portando i manubri verso le spalle.',
     'Scendi lentamente in completa estensione.'],
    ['Muovere il busto.','Non estendere completamente.'],
    ['Massima tensione nella fase di picco contrazione.']);

  X('pushdown-barra','Push-Down ai Cavi con Barra','Triceps Pushdown V-Bar','cavi','iso',['triceps'],[],'Triceps_Pushdown_-_V-Bar_Attachment',
    ['Puleggia alta con barra dritta o a V, gomiti fermi lungo i fianchi.',
     'Estendi i gomiti fino alla completa distensione.',
     'Torna controllando.'],
    ['Inclinare il busto in avanti.','Aprire i gomiti.'],
    ['Esercizio semplice e affidabile per il capo laterale del tricipite.']);

  X('jm-press','JM Press','JM Press','bilanciere','spinta-oriz',['triceps'],['chest'],'JM_Press',
    ['Sdraiato sulla panca, presa stretta, bilanciere sopra il petto.',
     'Scendi verso la gola piegando i gomiti e portandoli leggermente avanti.',
     'Estendi con forza i tricipiti.'],
    ['Confondere il movimento con una panca stretta.','Carichi troppo alti all\'inizio.'],
    ['Ibrido tra skull crusher e panca stretta: molto efficace per la forza dei tricipiti.']);

  X('rowing','Vogatore','Rowing Machine','cardio','cardio',['lats','quads'],['upper_back','hamstrings','biceps'],'Rowing_Stationary',
    ['Sequenza: gambe, busto, braccia in trazione; braccia, busto, gambe al ritorno.',
     'Mantieni la schiena neutra per tutta la remata.'],
    ['Tirare prima con le braccia.','Arrotondare la schiena.'],
    ['Ottimo riscaldamento full body e cardio a basso impatto.']);

  X('corda','Salto con la Corda','Jump Rope','cardio','cardio',['calves'],['quads','abs'],'Rope_Jumping',
    ['Salti bassi sull\'avampiede, polsi che ruotano la corda.',
     'Ginocchia morbide, busto eretto.'],
    ['Saltare troppo in alto.','Ruotare con le braccia invece che con i polsi.'],
    ['5 minuti bastano come riscaldamento completo.']);

  X('stretching-flessori-anca','Allungamento Flessori dell\'Anca','Hip Flexor Stretch','corpo','mobilita',['quads'],['glutes'],'All_Fours_Quad_Stretch',
    ['In affondo con il ginocchio posteriore a terra.',
     'Porta il bacino in retroversione e spingi in avanti.',
     'Mantieni 30-45 secondi per lato.'],
    ['Inarcare la zona lombare.','Rimbalzare.'],
    ['Utile se passi molte ore seduto: migliora l\'estensione d\'anca nello squat e nell\'hip thrust.']);

  X('rotazioni-esterne-cavo','Rotazioni Esterne ai Cavi','Cable External Rotation','cavi','mobilita',['rear_delts'],['upper_back'],'External_Rotation_with_Cable',
    ['Gomito a 90° appoggiato al fianco, cavo all\'altezza del gomito.',
     'Ruota l\'avambraccio verso l\'esterno mantenendo il gomito fermo.',
     'Torna lentamente.'],
    ['Allontanare il gomito dal fianco.','Usare carichi eccessivi.'],
    ['Inseriscilo nel riscaldamento della parte alta: protegge la cuffia dei rotatori.']);

  X('band-pull-apart','Band Pull Apart','Band Pull Apart','elastici','mobilita',['rear_delts'],['upper_back','traps'],'Band_Pull_Apart',
    ['Elastico teso davanti al petto, braccia distese.',
     'Apri le braccia stringendo le scapole.',
     'Torna lentamente.'],
    ['Piegare i gomiti.','Alzare le spalle.'],
    ['15-20 ripetizioni nel riscaldamento migliorano la postura e la stabilità scapolare.']);

  X('circonduzioni-braccia','Circonduzioni delle Braccia','Arm Circles','corpo','mobilita',['front_delts','side_delts'],[],null,
    ['In piedi, braccia distese lateralmente.',
     'Esegui 10 circonduzioni in avanti e 10 indietro, aumentando gradualmente l\'ampiezza.'],
    ['Movimenti bruschi a freddo.'],
    ['Parte del riscaldamento generale del Min-Max.']);

  X('slanci-gambe','Slanci delle Gambe','Leg Swings','corpo','mobilita',['hamstrings','glutes'],['adductors'],null,
    ['Appoggiati a un supporto e oscilla la gamba avanti-indietro per 10 ripetizioni.',
     'Ripeti lateralmente per 10 ripetizioni per lato.'],
    ['Oscillazioni troppo ampie a freddo.'],
    ['Parte del riscaldamento generale del Min-Max prima delle sedute di gambe.']);


  /* ================= VARIANTI AGGIUNTIVE ================= */
  X('panca-declinata','Panca Declinata con Bilanciere','Decline Barbell Bench Press','bilanciere','spinta-oriz',['chest'],['triceps'],'Decline_Barbell_Bench_Press',
    ['Panca declinata di 15-30°, piedi bloccati sotto i rulli.','Scendi verso la parte bassa del petto con i gomiti a 45°.','Spingi senza bloccare completamente i gomiti.'],
    ['Declinazione eccessiva che manda troppo sangue alla testa.','Rimbalzare il bilanciere sul petto.'],
    ['Utile se il fascio inferiore del petto è carente, ma la panca piana resta prioritaria.']);
  X('croci-cavi-basse','Croci ai Cavi dal Basso','Low Cable Crossover','cavi','iso',['chest'],['front_delts'],'Low_Cable_Crossover',
    ['Pulegge in basso, impugna le maniglie con i palmi in avanti.','Solleva le braccia in avanti e verso l\'alto disegnando un arco.','Contrai il petto alto e torna lentamente.'],
    ['Piegare i gomiti.','Usare slancio del busto.'],['Enfatizza il fascio clavicolare, cioè il petto alto.']);
  X('push-up-diamante','Piegamenti Diamante','Diamond Push-Up','corpo','spinta-oriz',['triceps'],['chest','front_delts'],'Push-Ups_-_Close_Triceps_Position',
    ['Mani unite sotto lo sterno a formare un triangolo.','Scendi mantenendo i gomiti vicini al busto.','Spingi fino alla completa estensione.'],
    ['Aprire i gomiti.','Bacino che sprofonda.'],['Ottimo finisher per i tricipiti senza attrezzi.']);
  X('pullover-cavo','Pullover ai Cavi','Cable Pullover','cavi','iso',['lats'],['chest','triceps'],'Rope_Straight-Arm_Pulldown',
    ['Puleggia alta con corda, braccia quasi tese sopra la testa.','Porta le mani verso le cosce mantenendo i gomiti fissi.','Torna lentamente in allungamento.'],
    ['Flettere i gomiti.','Muovere il busto per aiutarsi.'],['Isola il gran dorsale senza coinvolgere i bicipiti.']);
  X('rematore-pendlay','Pendlay Row','Pendlay Row','bilanciere','traz-oriz',['upper_back'],['lats','lower_back','biceps'],'Bent_Over_Barbell_Row',
    ['Busto parallelo al pavimento, bilanciere a terra ad ogni ripetizione.','Tira in modo esplosivo verso lo sterno.','Riappoggia il bilanciere a terra e riparti.'],
    ['Alzare il busto durante la trazione.','Non riappoggiare il bilanciere.'],['Ogni ripetizione parte da fermo: sviluppa forza e potenza sulla schiena alta.']);
  X('rematore-kettlebell','Rematore con Kettlebell','One-Arm Kettlebell Row','kettlebell','traz-oriz',['lats','upper_back'],['biceps'],'One-Arm_Kettlebell_Row',
    ['Appoggia una mano sulla panca, kettlebell nell\'altra.','Tira il gomito verso il fianco.','Scendi fino all\'allungamento completo.'],
    ['Ruotare il busto.','Tirare con il bicipite.'],['La presa spessa del kettlebell allena anche l\'avambraccio.']);
  X('shrug-manubri','Scrollate con Manubri','Dumbbell Shrug','manubri','iso',['traps'],['forearms'],'Dumbbell_Shrug',
    ['Manubri lungo i fianchi, braccia distese.','Solleva le spalle verso le orecchie con pausa di 1 secondo.','Scendi in allungamento completo.'],
    ['Ruotare le spalle.','Piegare i gomiti.'],['I manubri permettono un range leggermente maggiore del bilanciere.']);
  X('face-pull-elastico','Face Pull con Elastico','Band Face Pull','elastici','traz-oriz',['rear_delts'],['upper_back','traps'],'Band_Pull_Apart',
    ['Elastico ancorato all\'altezza del viso.','Tira verso la fronte separando le mani.','Torna lentamente.'],
    ['Tirare troppo in basso.','Alzare le spalle.'],['Perfetto da fare a casa o come riscaldamento della parte alta.']);
  X('military-press-seduto','Military Press Seduto','Seated Barbell Military Press','bilanciere','spinta-vert',['front_delts'],['side_delts','triceps'],'Seated_Barbell_Military_Press',
    ['Seduto con schienale verticale, bilanciere all\'altezza delle clavicole.','Spingi verso l\'alto lungo una linea verticale.','Scendi controllando fino al mento.'],
    ['Inarcare la lombare.','Scendere dietro la nuca.'],['La versione seduta elimina il contributo delle gambe: più stimolo sui deltoidi.']);
  X('upright-row','Tirate al Mento','Upright Row','bilanciere','traz-oriz',['side_delts','traps'],['biceps'],'Upright_Barbell_Row',
    ['Presa poco più larga delle spalle, bilanciere davanti alle cosce.','Tira verso l\'alto portando i gomiti sopra le mani fino all\'altezza del petto.','Scendi controllando.'],
    ['Salire oltre l\'altezza delle spalle.','Presa troppo stretta che stressa i polsi.'],['Se senti fastidio alla spalla, sostituisci con le alzate laterali.']);
  X('alzate-laterali-elastico','Alzate Laterali con Elastico','Band Lateral Raise','elastici','iso',['side_delts'],[],'Lateral_Raise_-_With_Bands',
    ['In piedi sull\'elastico, impugna le estremità.','Solleva lateralmente fino all\'altezza delle spalle.','Scendi controllando la resistenza.'],
    ['Usare slancio.','Elastico troppo rigido che compromette la traiettoria.'],['La resistenza crescente dell\'elastico si sposa bene con la curva di forza del deltoide.']);
  X('curl-cavo-alto','Curl al Cavo Alto','High Cable Curl','cavi','iso',['biceps'],[],'High_Cable_Curls',
    ['Pulegge alte ai lati, braccia distese all\'altezza delle spalle.','Fletti i gomiti portando le mani alle orecchie.','Torna lentamente.'],
    ['Abbassare i gomiti.','Usare troppo carico.'],['Massima contrazione di picco del bicipite.']);
  X('curl-drag','Drag Curl','Drag Curl','bilanciere','iso',['biceps'],[],'Drag_Curl',
    ['Bilanciere a contatto con il corpo, gomiti che scorrono indietro.','Trascina il bilanciere lungo l\'addome mantenendo il contatto.','Scendi controllando.'],
    ['Staccare il bilanciere dal corpo.','Slanciare con la schiena.'],['Riduce il coinvolgimento dei deltoidi anteriori rispetto al curl classico.']);
  X('french-press-panca','French Press su Panca con Manubri','Lying Dumbbell Triceps Extension','manubri','iso',['triceps'],[],'Lying_Dumbbell_Tricep_Extension',
    ['Sdraiato, manubri sopra il petto con presa neutra.','Fletti i gomiti portando i manubri ai lati della testa.','Estendi contraendo i tricipiti.'],
    ['Aprire i gomiti verso l\'esterno.','Range ridotto.'],['La presa neutra è più gentile con i gomiti rispetto al bilanciere.']);
  X('kickback-manubrio','Kickback con Manubrio','Dumbbell Triceps Kickback','manubri','iso',['triceps'],[],'Tricep_Dumbbell_Kickback',
    ['Busto inclinato, braccio superiore parallelo al busto.','Estendi il gomito fino alla completa distensione.','Torna controllando.'],
    ['Far cadere il gomito.','Ruotare il busto per aiutarsi.'],['Con i manubri la tensione è massima in contrazione: cerca la pausa in alto.']);
  X('stacco-sumo','Stacco Sumo','Sumo Deadlift','bilanciere','hinge',['glutes','quads'],['hamstrings','adductors','lower_back','traps'],'Sumo_Deadlift',
    ['Piedi molto larghi, punte extraruotate, presa dentro le ginocchia.','Anche basse, petto alto, schiena neutra.','Spingi il pavimento allargando le ginocchia ed estendi le anche.'],
    ['Ginocchia che collassano verso l\'interno.','Anche che salgono prima del bilanciere.'],['Più tecnico dello stacco classico ma spesso più gentile con la zona lombare.']);
  X('stacco-deficit','Stacco da Deficit','Deficit Deadlift','bilanciere','hinge',['hamstrings','glutes','lower_back'],['quads','traps'],'Deficit_Deadlift',
    ['In piedi su un rialzo di 2-5 cm.','Esegui uno stacco normale con range di movimento aumentato.'],
    ['Deficit troppo alto che compromette la posizione di partenza.'],['Migliora la forza nella parte iniziale dello stacco.']);
  X('reverse-hyper','Reverse Hyperextension','Reverse Hyperextension','macchina','hinge',['glutes','lower_back'],['hamstrings'],'Reverse_Hyperextension',
    ['Busto appoggiato sul supporto, gambe pendenti.','Solleva le gambe fino alla linea del corpo contraendo i glutei.','Scendi controllando.'],
    ['Usare slancio.','Iperestendere la lombare.'],['Decomprime la colonna: ottimo dopo sedute pesanti di stacco o squat.']);
  X('leg-press-piedi-alti','Leg Press con Piedi Alti','High-Foot Leg Press','macchina','squat',['glutes','hamstrings'],['quads'],'Leg_Press',
    ['Piedi in alto sulla pedana, alla larghezza delle spalle.','Scendi il più possibile senza staccare il bacino.','Spingi con i talloni.'],
    ['Staccare il bacino in basso.','Bloccare le ginocchia.'],['La posizione alta dei piedi sposta il lavoro su glutei e femorali.']);
  X('affondi-camminata','Affondi in Camminata','Walking Lunge','manubri','affondo',['quads','glutes'],['hamstrings','adductors'],'Barbell_Walking_Lunge',
    ['Passo avanti ampio, scendi fino a sfiorare il ginocchio posteriore.','Spingi con la gamba anteriore e porta avanti l\'altra gamba.'],
    ['Passi troppo corti.','Ginocchio che collassa verso l\'interno.'],['Alto stimolo su glutei e quadricipiti, ottimo anche come condizionamento.']);
  X('pistol-squat','Squat Monopodalico (Pistol)','Pistol Squat','corpo','affondo',['quads','glutes'],['hamstrings','abs'],'Kettlebell_Pistol_Squat',
    ['In piedi su una gamba, l\'altra distesa in avanti.','Scendi controllando fino in accosciata completa.','Risali spingendo con tutto il piede.'],
    ['Perdere l\'equilibrio e collassare in basso.','Tallone che si solleva.'],['Usa un supporto o un rialzo finché non hai la mobilità necessaria.']);
  X('belt-squat','Belt Squat','Belt Squat','macchina','squat',['quads','glutes'],['adductors'],'Lying_Machine_Squat',
    ['Cintura agganciata alle anche, piedi sulla pedana.','Scendi mantenendo il busto verticale.','Risali spingendo con tutto il piede.'],
    ['Range parziale.','Inclinarsi in avanti.'],['Carica le gambe senza comprimere la colonna: ideale se hai la lombare affaticata.']);
  X('ball-leg-curl','Leg Curl con Fitball','Ball Leg Curl','corpo','iso',['hamstrings'],['glutes'],'Ball_Leg_Curl',
    ['Supino, talloni sulla palla, bacino sollevato.','Porta i talloni verso i glutei mantenendo le anche alte.','Estendi lentamente.'],
    ['Far cadere il bacino.','Movimento troppo veloce.'],['Ottima alternativa casalinga al leg curl con macchina.']);
  X('calf-raise-smith','Calf Raise al Multipower','Smith Machine Calf Raise','smith','iso',['calves'],[],'Smith_Machine_Calf_Raise',
    ['Avampiedi su un rialzo sotto il bilanciere.','Scendi in massimo allungamento con pausa di 1-2 secondi.','Sali sulle punte al massimo.'],
    ['Rimbalzare in basso.','Piegare le ginocchia.'],['Il percorso guidato rende facile caricare progressivamente.']);
  X('crunch-inverso','Crunch Inverso','Reverse Crunch','corpo','core',['abs'],['obliques'],'Reverse_Crunch',
    ['Sdraiato con le gambe piegate a 90°.','Arrotola il bacino verso il petto sollevando i glutei da terra.','Scendi lentamente.'],
    ['Slanciare le gambe.','Non arrotolare il bacino.'],['Enfatizza la porzione bassa del retto addominale.']);
  X('side-plank','Plank Laterale','Side Plank','corpo','core',['obliques'],['abs','glutes'],'Side_Bridge',
    ['Avambraccio a terra, gomito sotto la spalla.','Solleva i fianchi formando una linea retta.','Mantieni la posizione respirando normalmente.'],
    ['Fianchi che scendono.','Ruotare il busto in avanti.'],['Ottimo per la stabilità laterale del core e la salute della lombare.']);
  X('woodchop','Woodchop ai Cavi','Cable Wood Chop','cavi','core',['obliques'],['abs'],'Standing_Cable_Wood_Chop',
    ['Puleggia alta, impugna con entrambe le mani.','Ruota il busto portando le mani verso l\'anca opposta.','Torna controllando.'],
    ['Muovere solo le braccia.','Carico eccessivo che rovina la tecnica.'],['Allena la rotazione del busto in modo funzionale.']);
  X('hollow-hold','Hollow Hold','Hollow Body Hold','corpo','core',['abs'],['obliques'],'Plank',
    ['Supino con la zona lombare schiacciata a terra.','Solleva gambe e scapole formando una barca.','Mantieni la posizione.'],
    ['Lombare che si stacca da terra.','Trattenere il respiro.'],['Se la lombare si stacca, avvicina le ginocchia al petto.']);
  X('turkish-getup','Turkish Get-Up','Turkish Get-Up','kettlebell','core',['abs','front_delts'],['obliques','glutes','quads'],'Kettlebell_Turkish_Get-Up_Lunge_style',
    ['Sdraiato con il kettlebell sollevato a braccio teso.','Alzati in piedi seguendo la sequenza classica mantenendo il braccio verticale.','Torna a terra invertendo la sequenza.'],
    ['Perdere la verticalità del braccio.','Andare troppo veloce.'],['Esercizio completo per stabilità di spalla, core e mobilità.']);
  X('kettlebell-carry','Trasporto con Kettlebell','Kettlebell Carry','kettlebell','core',['forearms','traps'],['abs','obliques'],'Plate_Pinch',
    ['Afferra due kettlebell pesanti e cammina a passi controllati.','Spalle basse, core contratto, respirazione regolare.'],
    ['Inclinarsi lateralmente.','Trattenere il respiro.'],['Ottimo finisher per presa e stabilità del tronco.']);
  X('hip-thrust-mono','Hip Thrust a una Gamba','Single-Leg Hip Thrust','corpo','hinge',['glutes'],['hamstrings'],'Single_Leg_Glute_Bridge',
    ['Schiena alta su una panca, una gamba a terra e l\'altra sollevata.','Estendi l\'anca contraendo il gluteo.','Scendi controllando.'],
    ['Iperestendere la lombare.','Spingere con la punta del piede.'],['Rivela e corregge gli squilibri tra i due lati.']);
  X('kickback-gluteo-cavo','Slanci per Glutei ai Cavi','Cable Glute Kickback','cavi','iso',['glutes'],['hamstrings'],'One-Legged_Cable_Kickback',
    ['Cavigliera al cavo basso, busto leggermente inclinato in avanti.','Estendi l\'anca all\'indietro contraendo il gluteo.','Torna lentamente.'],
    ['Iperestendere la lombare per guadagnare range.','Ruotare il bacino.'],['Ottimo esercizio di isolamento a fine seduta gambe.']);
  X('good-morning-elastico','Good Morning con Elastico','Band Good Morning','elastici','hinge',['hamstrings','glutes'],['lower_back'],'Band_Good_Morning',
    ['Elastico sotto i piedi e sopra i trapezi.','Porta le anche indietro flettendo il busto.','Risali estendendo le anche.'],
    ['Arrotondare la schiena.','Piegare troppo le ginocchia.'],['Ideale nel riscaldamento delle gambe per attivare la catena posteriore.']);
  X('power-clean','Power Clean','Power Clean','bilanciere','hinge',['hamstrings','glutes','traps'],['quads','front_delts','lower_back'],'Power_Clean',
    ['Posizione di stacco, presa poco fuori le ginocchia.','Stacca il bilanciere ed esplodi estendendo anche, ginocchia e caviglie.','Ricevi il bilanciere sulle clavicole in mezzo squat.'],
    ['Tirare con le braccia invece che con le anche.','Ricevere il bilanciere con i gomiti bassi.'],['Movimento tecnico: impara con un bastone o un bilanciere scarico.']);
  X('push-press','Push Press','Push Press','bilanciere','spinta-vert',['front_delts'],['triceps','quads','glutes'],'Push_Press',
    ['Bilanciere sulle clavicole, piedi alla larghezza delle anche.','Piega leggermente le ginocchia ed esplodi verso l\'alto.','Blocca il bilanciere sopra la testa.'],
    ['Piegamento delle ginocchia troppo profondo.','Inarcare la schiena in chiusura.'],['Permette di usare carichi superiori al lento avanti stretto.']);
  X('thruster','Thruster','Thruster','bilanciere','spinta-vert',['quads','front_delts'],['glutes','triceps'],'Kettlebell_Thruster',
    ['Bilanciere sulle clavicole, esegui un front squat completo.','Risalendo, sfrutta la spinta delle gambe per distendere il bilanciere sopra la testa.'],
    ['Fermarsi tra squat e spinta.','Perdere la posizione dei gomiti.'],['Molto impegnativo dal punto di vista metabolico: usalo nei circuiti.']);
  X('battle-rope','Battle Rope','Battle Ropes','cardio','cardio',['front_delts'],['abs','forearms'],'Battling_Ropes',
    ['Impugna le corde con le ginocchia leggermente flesse.','Genera onde alternate o simultanee per 20-40 secondi.'],
    ['Usare solo le braccia senza coinvolgere le anche.'],['Ottimo per chiudere l\'allenamento con lavoro metabolico.']);
  X('mountain-climber','Mountain Climber','Mountain Climbers','corpo','cardio',['abs'],['quads','front_delts'],'Mountain_Climbers',
    ['In posizione di plank alto.','Porta alternativamente le ginocchia al petto mantenendo il bacino stabile.'],
    ['Bacino che si alza ad ogni ripetizione.','Movimento senza controllo.'],['Usalo nel riscaldamento o nei circuiti metabolici.']);
  X('burpee','Burpee','Burpee','corpo','cardio',['quads','chest'],['abs','front_delts','triceps'],'Freehand_Jump_Squat',
    ['Da in piedi scendi in squat, appoggia le mani e porta i piedi indietro.','Esegui un piegamento, riporta i piedi avanti e salta.'],
    ['Bacino che sprofonda nel piegamento.','Atterrare con le ginocchia rigide.'],['Il classico esercizio total body a corpo libero.']);
  X('stretch-pettorali','Allungamento Pettorali alla Porta','Doorway Chest Stretch','corpo','mobilita',['chest'],['front_delts'],'Bodyweight_Flyes',
    ['Appoggia l\'avambraccio allo stipite con il gomito a 90°.','Ruota il busto in direzione opposta fino a sentire l\'allungamento.','Mantieni 30 secondi per lato.'],
    ['Forzare oltre il fastidio.','Alzare la spalla.'],['Utile se stai molte ore seduto o dopo sedute intense di spinte.']);
  X('stretch-dorsali','Allungamento Dorsali alla Sbarra','Lat Stretch','corpo','mobilita',['lats'],['upper_back'],'Scapular_Pull-Up',
    ['Appenditi alla sbarra e rilassa le spalle.','Sposta il bacino di lato per allungare un dorsale alla volta.','Mantieni 30 secondi per lato.'],
    ['Contrarre invece di rilassare.'],['Ottimo anche per decomprimere la colonna a fine allenamento.']);
  X('stretch-femorali','Allungamento Femorali','Hamstring Stretch','corpo','mobilita',['hamstrings'],['calves'],'90_90_Hamstring',
    ['Seduto con una gamba distesa.','Fletti il busto in avanti mantenendo la schiena neutra.','Mantieni 30-45 secondi per lato.'],
    ['Arrotondare la schiena per arrivare più in basso.','Rimbalzare.'],['Femorali mobili migliorano la profondità dello squat e la posizione nello stacco.']);
  X('stretch-polpacci','Allungamento Polpacci al Muro','Calf Stretch','corpo','mobilita',['calves'],[],'Calf_Raises_-_With_Bands',
    ['Mani al muro, una gamba indietro con il tallone a terra.','Spingi il bacino in avanti mantenendo il ginocchio teso.','Mantieni 30 secondi per lato.'],
    ['Sollevare il tallone.','Ruotare il piede verso l\'esterno.'],['Caviglie mobili permettono di scendere più in basso nello squat.']);
  X('foam-roll-quad','Foam Roller Quadricipiti','Foam Roll Quads','corpo','mobilita',['quads'],[],'All_Fours_Quad_Stretch',
    ['A pancia in giù con il rullo sotto le cosce.','Rotola lentamente dal ginocchio all\'anca per 30-60 secondi.'],
    ['Rotolare troppo velocemente.','Fermarsi su un punto doloroso troppo a lungo.'],['3-5 minuti a fine allenamento possono ridurre i dolori dei giorni successivi.']);
  X('bird-dog','Bird Dog','Bird Dog','corpo','core',['abs','lower_back'],['glutes'],'Dead_Bug',
    ['A quattro zampe con la schiena neutra.','Estendi braccio e gamba opposti mantenendo il bacino fermo.','Alterna con controllo.'],
    ['Ruotare il bacino.','Inarcare la lombare.'],['Esercizio di stabilità: conta la qualità del movimento, non il numero di ripetizioni.']);
  X('dead-bug','Dead Bug','Dead Bug','corpo','core',['abs'],['obliques'],'Dead_Bug',
    ['Supino, braccia verso il soffitto e ginocchia a 90°.','Estendi braccio e gamba opposti senza staccare la lombare da terra.','Torna e alterna.'],
    ['Lombare che si stacca.','Movimento troppo veloce.'],['Il miglior esercizio anti-estensione per imparare a stabilizzare il bacino.']);
  X('leg-raise-panca','Sollevamento Gambe su Panca','Flat Bench Leg Raise','corpo','core',['abs'],['obliques'],'Flat_Bench_Lying_Leg_Raise',
    ['Sdraiato sulla panca con le mani sotto i glutei o alle maniglie.','Solleva le gambe arrotolando il bacino.','Scendi lentamente senza toccare.'],
    ['Slanciare le gambe.','Inarcare la lombare.'],['Se senti la lombare, riduci il range o piega le ginocchia.']);
  X('plate-twist','Torsioni con Disco','Plate Russian Twist','corpo','core',['obliques'],['abs'],'Plate_Twist',
    ['Seduto con il busto inclinato, disco tenuto davanti al petto.','Ruota il busto da un lato all\'altro.'],
    ['Muovere solo le braccia.','Andare troppo veloce.'],['Controlla la rotazione: è il busto che gira, non le braccia.']);
  X('shrug-smith','Scrollate al Multipower','Smith Machine Shrug','smith','iso',['traps'],['forearms'],'Smith_Machine_Behind_the_Back_Shrug',
    ['Bilanciere davanti o dietro le cosce nel multipower.','Solleva le spalle il più in alto possibile.','Scendi in allungamento completo.'],
    ['Ruotare le spalle.','Range parziale.'],['La versione dietro la schiena enfatizza la parte media del trapezio.']);
  X('curl-macchina','Curl alla Macchina','Machine Biceps Curl','macchina','iso',['biceps'],[],'Machine_Bicep_Curl',
    ['Regola il sedile in modo che i gomiti siano allineati all\'asse della macchina.','Fletti i gomiti e contrai in alto.','Scendi lentamente.'],
    ['Staccare i gomiti dal pad.','Estendere di scatto in basso.'],['Perfetta per drop set e serie a cedimento in sicurezza.']);
  X('triceps-macchina','Estensioni Tricipiti alla Macchina','Machine Triceps Extension','macchina','iso',['triceps'],[],'Machine_Triceps_Extension',
    ['Seduto con la schiena appoggiata e i gomiti sul pad.','Estendi i gomiti completamente.','Torna controllando.'],
    ['Staccare i gomiti.','Range parziale.'],['Molto stabile: puoi concentrarti solo sulla contrazione.']);
  X('pec-deck-inverso','Pec Deck Inverso','Reverse Pec Deck','macchina','iso',['rear_delts'],['upper_back'],'Reverse_Machine_Flyes',
    ['Petto contro lo schienale, impugna le maniglie con le braccia distese.','Apri verso l\'esterno contraendo i deltoidi posteriori.','Torna lentamente.'],
    ['Piegare i gomiti.','Usare slancio.'],['I deltoidi posteriori rispondono bene alle alte ripetizioni: 12-20 per serie.']);
  X('pulldown-isolaterale','Pulldown Iso-Laterale','Iso-Lateral Pulldown','macchina','traz-vert',['lats'],['biceps','upper_back'],'Leverage_Iso_Row',
    ['Seduto, impugna una maniglia per lato.','Tira una o entrambe le maniglie verso il basso.','Torna in allungamento completo.'],
    ['Reclinare troppo il busto.','Range parziale.'],['Il lavoro indipendente per lato corregge gli squilibri tra destra e sinistra.']);
  X('abduzioni-cavo','Abduzioni ai Cavi','Cable Hip Abduction','cavi','iso',['abductors','glutes'],[],'Monster_Walk',
    ['Cavigliera al cavo basso sulla gamba esterna.','Solleva la gamba lateralmente mantenendo il busto fermo.','Torna controllando.'],
    ['Inclinare il busto.','Range eccessivo con rotazione del bacino.'],['Il medio gluteo stabilizza il bacino: fondamentale per squat e corsa.']);
  X('leg-extension-mono','Leg Extension a una Gamba','Single-Leg Extension','macchina','iso',['quads'],[],'Single-Leg_Leg_Extension',
    ['Una gamba alla volta sotto il rullo.','Estendi completamente con pausa di 1 secondo.','Scendi lentamente.'],
    ['Compensare con il busto.','Range parziale.'],['Utile per riequilibrare le gambe dopo un infortunio.']);
  X('hack-squat-inverso','Hack Squat Inverso','Reverse Hack Squat','macchina','squat',['glutes','quads'],['hamstrings'],'Barbell_Hack_Squat',
    ['Rivolto verso la macchina con il petto contro il pad.','Scendi il più possibile mantenendo i talloni a terra.','Risali spingendo con i talloni.'],
    ['Sollevare i talloni.','Range parziale.'],['Enfatizza i glutei rispetto alla versione classica.']);
  X('sled-push','Spinta della Slitta','Sled Push','cardio','cardio',['quads','glutes'],['calves','abs'],'Prowler_Sprint',
    ['Impugna i montanti con il busto inclinato in avanti.','Spingi con passi corti e potenti.'],
    ['Busto troppo eretto.','Passi troppo lunghi.'],['Condizionamento senza fase eccentrica: pochissimi dolori nei giorni seguenti.']);
  X('camminata-pendenza','Camminata in Pendenza','Incline Walk','cardio','cardio',['glutes','calves'],['hamstrings','quads'],'Walking_Treadmill',
    ['Imposta una pendenza del 10-15% e una velocità di 5-6 km/h.','Cammina senza aggrapparti alle maniglie per 20-40 minuti.'],
    ['Tenersi alle maniglie: riduce molto il dispendio energetico.','Pendenza eccessiva che costringe a piegarsi in avanti.'],
    ['Il modo migliore per creare un deficit calorico senza interferire con l\'allenamento con i pesi.']);


  /* ================= AMPLIAMENTO CATALOGO ================= */
  X('panca-neutra-db','Distensioni su Panca con Presa Neutra','Dumbbell Bench Press Neutral Grip','manubri','spinta-oriz',['chest'],['triceps','front_delts'],'Dumbbell_Bench_Press_with_Neutral_Grip',
    ['Sdraiato sulla panca con i manubri e i palmi rivolti l\'uno verso l\'altro.','Scendi con i gomiti vicini al busto fino a sfiorare il petto.','Spingi verso l\'alto senza far toccare i manubri.'],
    ['Aprire i gomiti perdendo il vantaggio della presa neutra.','Rimbalzare sul petto.'],
    ['Presa neutra: la variante più tollerata se hai le spalle sensibili.']);
  X('croci-panca-piana','Croci su Panca Piana','Dumbbell Flyes','manubri','iso',['chest'],['front_delts'],'Dumbbell_Flyes',
    ['Sdraiato con i manubri sopra il petto e i gomiti leggermente flessi e bloccati.','Apri le braccia lateralmente fino a sentire lo stiramento.','Richiudi seguendo lo stesso arco strizzando i pettorali.'],
    ['Flettere ed estendere i gomiti (diventa una distensione).','Scendere oltre il proprio range di mobilità.'],
    ['Carichi moderati e discesa lenta: il valore dell\'esercizio è nella fase di allungamento.']);
  X('svend-press','Svend Press','Svend Press','corpo','iso',['chest'],['front_delts'],'Svend_Press',
    ['In piedi, stringi due dischi tra i palmi all\'altezza del petto.','Spingi le braccia in avanti mantenendo la pressione tra i palmi.','Torna al petto senza allentare la spinta.'],
    ['Allentare la pressione tra i palmi.','Usare dischi troppo pesanti che scivolano.'],
    ['Ottimo finisher: la tensione è massima in contrazione, dove le croci ne hanno poca.']);
  X('dip-anelle','Dip agli Anelli','Ring Dips','corpo','spinta-oriz',['chest','triceps'],['front_delts','abs'],'Ring_Dips',
    ['Impugna gli anelli in sospensione con le braccia tese e i polsi ruotati verso l\'interno.','Scendi controllando fino a sentire l\'allungamento del petto.','Risali ruotando gli anelli verso l\'esterno in chiusura.'],
    ['Perdere il controllo degli anelli in discesa.','Scendere troppo in basso senza la forza per risalire.'],
    ['Molto più impegnativo delle parallele fisse: aggiunge un forte lavoro di stabilizzazione.']);
  X('push-up-elastico','Piegamenti con Elastico','Band Push-Up','elastici','spinta-oriz',['chest'],['triceps','front_delts','abs'],'Pushups',
    ['Passa l\'elastico dietro la schiena tenendone le estremità sotto i palmi.','Esegui il piegamento normalmente: la resistenza cresce man mano che sali.'],
    ['Elastico posizionato troppo in alto sulle scapole.','Perdere l\'allineamento del corpo.'],
    ['Il modo più semplice per continuare a progredire nei piegamenti senza attrezzi.']);
  X('seal-row','Seal Row','Seal Row','bilanciere','traz-oriz',['upper_back','lats'],['biceps','rear_delts'],'Lying_T-Bar_Row',
    ['Sdraiato a pancia in giù su una panca alta, bilanciere a terra sotto di te.','Tira il bilanciere verso la panca portando i gomiti indietro.','Scendi fino alla completa estensione delle braccia.'],
    ['Sollevare il petto dalla panca.','Usare slancio con le gambe.'],
    ['Elimina completamente lo slancio: il carico è tutto sulla schiena.']);
  X('meadows-row','Meadows Row','Meadows Row','bilanciere','traz-oriz',['lats','upper_back'],['biceps','rear_delts'],'Bent_Over_One-Arm_Long_Bar_Row',
    ['Bilanciere in un angolo (landmine), afferra l\'estremità con la mano opposta alla gamba avanti.','Busto quasi parallelo al pavimento, tira il bilanciere verso l\'anca.','Scendi lasciando allungare completamente il dorsale.'],
    ['Ruotare eccessivamente il busto.','Tirare troppo in alto, verso il petto.'],
    ['La traiettoria ad arco del landmine è molto confortevole per la spalla.']);
  X('rematore-landmine','Rematore Landmine a Due Mani','Landmine Row','bilanciere','traz-oriz',['upper_back','lats'],['biceps'],'Bent_Over_Two-Arm_Long_Bar_Row',
    ['Cavalca il bilanciere ancorato in un angolo, impugna con una maniglia a V.','Busto a 45°, tira verso lo sterno stringendo le scapole.','Scendi controllando.'],
    ['Arrotondare la schiena.','Alzare il busto ad ogni ripetizione.'],
    ['Ottima alternativa al rematore con bilanciere se la lombare è affaticata.']);
  X('trazioni-neutre','Trazioni Presa Neutra','Neutral-Grip Pull-Up','corpo','traz-vert',['lats'],['biceps','upper_back'],'V-Bar_Pullup',
    ['Impugna due maniglie parallele o una barra a V.','Tira portando i gomiti verso il basso e il petto verso le mani.','Scendi in completa estensione controllando.'],
    ['Range parziale.','Dondolare per aiutarsi.'],
    ['La presa neutra è la più confortevole per gomiti e spalle.']);
  X('gironda-chin','Gironda Sternum Chin-Up','Gironda Sternum Chin','corpo','traz-vert',['lats'],['upper_back','biceps'],'Gironda_Sternum_Chins',
    ['Impugna la sbarra e, salendo, inclina progressivamente il busto all\'indietro.','Porta lo sterno verso la sbarra mantenendo la testa indietro.','Scendi lentamente raddrizzando il busto.'],
    ['Andare troppo veloce perdendo il controllo del busto.','Iperestendere il collo.'],
    ['Enorme accorciamento del dorsale: usalo con poche ripetizioni molto controllate.']);
  X('lento-dietro','Lento Dietro','Behind-the-Neck Press','bilanciere','spinta-vert',['front_delts','side_delts'],['triceps','traps'],'Standing_Barbell_Press_Behind_Neck',
    ['Bilanciere sui trapezi, presa più larga delle spalle.','Spingi verso l\'alto lungo una linea verticale.','Scendi fino all\'altezza delle orecchie, non oltre.'],
    ['Scendere troppo in basso dietro la nuca.','Eseguirlo con poca mobilità di spalla.'],
    ['Solo se hai ottima mobilità: altrimenti resta sul lento avanti.']);
  X('alzate-laterali-inclinato','Alzate Laterali su Panca Inclinata','Lying Lateral Raise','manubri','iso',['side_delts'],[],'Lying_One-Arm_Lateral_Raise',
    ['Sdraiato su un fianco su una panca inclinata a 45°, manubrio nella mano superiore.','Solleva il braccio fino alla verticale mantenendo il gomito morbido.','Scendi lentamente fino al massimo allungamento.'],
    ['Usare slancio del busto.','Carichi eccessivi per una posizione così svantaggiosa.'],
    ['La resistenza è massima nella parte iniziale del movimento: complementare alle alzate in piedi.']);
  X('cuban-press','Cuban Press','Cuban Press','manubri','mobilita',['rear_delts','side_delts'],['traps','front_delts'],'Cuban_Press',
    ['Parti come un rematore alto con i gomiti a 90°.','Ruota gli avambracci verso l\'alto (extrarotazione), poi distendi sopra la testa.','Inverti la sequenza in discesa.'],
    ['Carichi troppo alti che impediscono l\'extrarotazione.','Saltare la fase di rotazione.'],
    ['Eccellente per la salute della cuffia dei rotatori: usalo leggero nel riscaldamento.']);
  X('landmine-press','Landmine Press','Landmine Press','bilanciere','spinta-vert',['front_delts'],['chest','triceps','abs'],'Single-Arm_Linear_Jammer',
    ['In ginocchio o in piedi, impugna l\'estremità del bilanciere ancorato all\'altezza della spalla.','Spingi in avanti e verso l\'alto seguendo l\'arco naturale.','Torna controllando.'],
    ['Inarcare la lombare per spingere di più.','Ruotare il busto.'],
    ['Angolo intermedio tra panca e lento: ottimo se le spinte sopra la testa ti danno fastidio.']);
  X('scarecrow','Scarecrow Raise','Scarecrow Raise','manubri','mobilita',['rear_delts'],['side_delts','traps'],'Bent_Over_Dumbbell_Rear_Delt_Raise_With_Head_On_Bench',
    ['Busto flesso in avanti, gomiti alti a 90° e avambracci pendenti.','Ruota gli avambracci verso l\'alto mantenendo i gomiti fermi.','Torna lentamente.'],
    ['Muovere i gomiti invece di ruotare le spalle.','Usare troppo carico.'],
    ['Lavora extrarotatori e deltoide posteriore insieme.']);
  X('curl-21','Curl 21','21s Curl','bilanciere','iso',['biceps'],['forearms'],'Barbell_Curl',
    ['7 ripetizioni dalla posizione bassa fino a metà movimento.','7 ripetizioni da metà movimento fino in alto.','7 ripetizioni complete, senza pause tra le tre serie.'],
    ['Usare troppo carico e perdere il controllo nella seconda metà.','Fare pause tra i tre blocchi.'],
    ['Tecnica di intensificazione: usala come ultimo esercizio, non come base.']);
  X('curl-inverso','Curl Inverso','Reverse Barbell Curl','bilanciere','iso',['forearms','biceps'],[],'Reverse_Barbell_Curl',
    ['Presa prona alla larghezza delle spalle, gomiti lungo i fianchi.','Fletti i gomiti mantenendo i polsi bloccati in leggera estensione.','Scendi controllando.'],
    ['Lasciare cadere i polsi.','Carichi troppo alti: la presa prona è molto più debole.'],
    ['Il miglior esercizio per il brachioradiale e lo spessore dell\'avambraccio.']);
  X('tate-press','Tate Press','Tate Press','manubri','iso',['triceps'],['chest'],'Tate_Press',
    ['Sdraiato con i manubri sopra il petto e i palmi in avanti.','Ruota i gomiti verso l\'esterno portando i manubri verso il petto.','Estendi con forza i tricipiti.'],
    ['Trasformarlo in una distensione.','Usare carichi eccessivi.'],
    ['Colpisce molto il capo mediale del tricipite: ottimo per il lockout della panca.']);
  X('bench-dip','Bench Dip','Bench Dip','corpo','iso',['triceps'],['chest','front_delts'],'Bench_Dips',
    ['Mani sul bordo di una panca dietro di te, gambe distese in avanti.','Scendi flettendo i gomiti fino a circa 90°.','Risali estendendo i tricipiti.'],
    ['Scendere troppo forzando la spalla in extrarotazione.','Aiutarsi con le gambe.'],
    ['Aggiungi un disco sulle cosce quando superi le 15 ripetizioni.']);
  X('split-squat-piede-rialzato','Split Squat con Piede Anteriore Rialzato','Front-Foot-Elevated Split Squat','manubri','affondo',['quads','glutes'],['hamstrings','adductors'],'Split_Squat_with_Dumbbells',
    ['Piede anteriore su un rialzo di 5-10 cm, piede posteriore a terra dietro.','Scendi verticalmente fino al massimo allungamento della gamba avanti.','Risali spingendo con la gamba anteriore.'],
    ['Rialzo troppo alto che compromette l\'equilibrio.','Spingere con la gamba posteriore.'],
    ['Il rialzo aumenta il range e lo stiramento dei glutei.']);
  X('affondi-indietro-bil','Affondi Indietro con Bilanciere','Barbell Reverse Lunge','bilanciere','affondo',['quads','glutes'],['hamstrings'],'Elevated_Back_Lunge',
    ['Bilanciere sui trapezi, fai un passo indietro ampio.','Scendi fino a sfiorare il ginocchio posteriore a terra.','Risali spingendo con la gamba anteriore.'],
    ['Passo troppo corto.','Busto che crolla in avanti.'],
    ['Più gentile con le ginocchia rispetto agli affondi in avanti.']);
  X('curtsy-lunge','Affondi Incrociati (Curtsy)','Curtsy Lunge','manubri','affondo',['glutes','quads'],['abductors','adductors'],'Dumbbell_Rear_Lunge',
    ['In piedi, porta una gamba indietro e incrociata dietro l\'altra.','Scendi mantenendo il bacino frontale.','Risali spingendo con la gamba anteriore.'],
    ['Ruotare il bacino.','Scendere troppo perdendo l\'equilibrio.'],
    ['Colpisce molto il medio gluteo grazie alla posizione incrociata.']);
  X('cyclist-squat','Cyclist Squat','Cyclist Squat','bilanciere','squat',['quads'],['glutes'],'Front_Barbell_Squat',
    ['Talloni su un rialzo di 3-5 cm, piedi stretti.','Scendi mantenendo il busto verticale e le ginocchia che avanzano oltre le punte.','Risali spingendo con l\'avampiede.'],
    ['Rialzo eccessivo.','Portare le anche indietro (diventa uno squat normale).'],
    ['La variante più selettiva sui quadricipiti, in particolare il vasto mediale.']);
  X('rdl-monopodalico','Stacco Rumeno a una Gamba','Single-Leg RDL','manubri','hinge',['hamstrings','glutes'],['lower_back','abductors'],'Kettlebell_One-Legged_Deadlift',
    ['In piedi su una gamba, manubrio nella mano opposta.','Fletti l\'anca portando il busto in avanti e la gamba libera indietro.','Risali contraendo il gluteo della gamba d\'appoggio.'],
    ['Ruotare il bacino verso l\'esterno.','Arrotondare la schiena.'],
    ['Ottimo per equilibrio, stabilità dell\'anca e simmetria tra le gambe.']);
  X('leg-press-largo','Leg Press Stance Larga','Wide-Stance Leg Press','macchina','squat',['glutes','adductors'],['quads','hamstrings'],'Narrow_Stance_Leg_Press',
    ['Piedi larghi e alti sulla pedana, punte leggermente extraruotate.','Scendi il più possibile senza staccare il bacino.','Spingi con i talloni.'],
    ['Ginocchia che collassano verso l\'interno.','Staccare il bacino in basso.'],
    ['La stance larga aumenta il contributo di adduttori e glutei.']);
  X('tibialis-raise','Tibialis Raise','Tibialis Raise','corpo','iso',['tibialis'],[],'Smith_Machine_Reverse_Calf_Raises',
    ['Schiena al muro, talloni a 30-40 cm dalla parete.','Solleva le punte dei piedi il più in alto possibile.','Scendi lentamente.'],
    ['Movimento troppo veloce.','Staccare i talloni da terra.'],
    ['Bilancia il lavoro dei polpacci e riduce il rischio di periostite e dolore anteriore alla tibia.']);
  X('hip-adduction-cavo','Adduzioni ai Cavi','Cable Hip Adduction','cavi','iso',['adductors'],['glutes'],'Band_Hip_Adductions',
    ['Cavigliera al cavo basso sulla gamba interna, in piedi di lato.','Porta la gamba verso la linea mediana e oltre.','Torna controllando fino al massimo allungamento.'],
    ['Ruotare il bacino.','Usare slancio.'],
    ['Adduttori forti stabilizzano il ginocchio nello squat profondo.']);
  X('dragon-flag','Dragon Flag','Dragon Flag','corpo','core',['abs'],['obliques','lower_back'],'Flat_Bench_Lying_Leg_Raise',
    ['Sdraiato su una panca, afferra il bordo dietro la testa.','Solleva tutto il corpo tenendolo rigido, appoggiato solo sulle scapole.','Scendi il più lentamente possibile senza inarcare la schiena.'],
    ['Piegare le anche (diventa un sollevamento gambe).','Scendere troppo velocemente perdendo il controllo.'],
    ['Esercizio avanzato: inizia con le ginocchia piegate e solo la fase negativa.']);
  X('hanging-knee-raise','Sollevamento Ginocchia alla Sbarra','Hanging Knee Raise','corpo','core',['abs'],['obliques','forearms'],'Knee_Hip_Raise_On_Parallel_Bars',
    ['Appeso alla sbarra o alle parallele, spalle attive.','Porta le ginocchia al petto arrotolando il bacino.','Scendi lentamente senza dondolare.'],
    ['Usare lo slancio.','Fermarsi alla flessione dell\'anca senza arrotolare il bacino.'],
    ['La versione a ginocchia piegate è il passo intermedio verso il sollevamento a gambe tese.']);
  X('side-bend','Flessioni Laterali con Manubrio','Dumbbell Side Bend','manubri','core',['obliques'],['abs'],'Dumbbell_Side_Bend',
    ['In piedi con un manubrio in una mano, l\'altra dietro la testa.','Fletti il busto lateralmente verso il manubrio.','Risali contraendo gli obliqui del lato opposto.'],
    ['Ruotare il busto invece di flettere lateralmente.','Carichi eccessivi che riducono il range.'],
    ['Un solo manubrio per volta: con due il carico si annulla.']);
  X('copenhagen-plank','Copenhagen Plank','Copenhagen Plank','corpo','core',['adductors'],['obliques','abs'],'Side_Bridge',
    ['In plank laterale con la gamba superiore appoggiata su una panca.','Solleva il bacino e la gamba inferiore mantenendo la linea del corpo.','Mantieni la posizione.'],
    ['Far cadere il bacino.','Progredire troppo in fretta alla versione completa.'],
    ['Il miglior esercizio preventivo per gli adduttori e il pubalgia.']);
  X('stir-the-pot','Stir the Pot','Stir the Pot','corpo','core',['abs'],['obliques','front_delts'],'Exercise_Ball_Pull-In',
    ['In plank con gli avambracci su una fitball.','Disegna piccoli cerchi con gli avambracci mantenendo il corpo immobile.','Alterna il senso di rotazione.'],
    ['Muovere il bacino.','Cerchi troppo ampi all\'inizio.'],
    ['Uno degli esercizi anti-estensione più efficaci per la stabilità del tronco.']);
  X('assault-bike','Assault Bike','Air Bike','cardio','cardio',['quads'],['front_delts','abs','hamstrings'],'Bicycling_Stationary',
    ['Pedala spingendo e tirando anche con le braccia.','Per il condizionamento: intervalli di 20-40 secondi ad alta intensità.'],
    ['Partire troppo forte nei primi intervalli.'],
    ['Il maggiore dispendio calorico per minuto tra le macchine cardio.']);
  X('stair-climber','Stair Climber','Stair Climber','cardio','cardio',['glutes','quads'],['calves','hamstrings'],'Step_Mill',
    ['Sali a ritmo costante senza appoggiarti alle maniglie.','20-30 minuti a intensità moderata.'],
    ['Aggrapparsi alle maniglie: riduce molto il dispendio.','Scalini saltati.'],
    ['Molto efficace per i glutei e a basso impatto sulle ginocchia.']);
  X('sprint','Sprint','Sprint','cardio','cardio',['hamstrings','quads'],['glutes','calves'],'Wind_Sprints',
    ['Riscaldati bene per almeno 10 minuti.','Sprint di 10-20 secondi seguiti da 60-90 secondi di recupero camminando.','6-10 ripetizioni.'],
    ['Sprintare a freddo: rischio elevato di stiramento ai femorali.'],
    ['Se ti alleni con i pesi, metti gli sprint dopo le sedute di gambe o in un giorno separato.']);
  X('hip-thrust-elastico','Hip Thrust con Elastico','Band Hip Thrust','elastici','hinge',['glutes'],['hamstrings'],'Hip_Lift_with_Band',
    ['Elastico sopra le anche ancorato in basso, schiena alta sulla panca.','Estendi le anche contraendo i glutei.','Scendi controllando.'],
    ['Iperestendere la lombare.','Elastico posizionato troppo in alto sull\'addome.'],
    ['La resistenza crescente dell\'elastico è massima proprio dove i glutei sono più forti.']);
  X('pull-through','Pull Through ai Cavi','Cable Pull Through','cavi','hinge',['glutes'],['hamstrings','lower_back'],'Pull_Through',
    ['Dai le spalle alla puleggia bassa, corda tra le gambe.','Porta le anche indietro lasciando scorrere la corda.','Estendi le anche in avanti contraendo forte i glutei.'],
    ['Trasformarlo in uno squat.','Tirare con le braccia.'],
    ['Insegna benissimo il movimento di hinge: perfetto prima di imparare lo stacco.']);
  X('glute-ham-raise','Glute Ham Raise','Glute Ham Raise','macchina','iso',['hamstrings','glutes'],['lower_back','calves'],'Glute_Ham_Raise',
    ['Caviglie bloccate e cosce sul cuscinetto della GHD.','Scendi controllando con i femorali fino all\'orizzontale.','Risali contraendo femorali e glutei.'],
    ['Piegare le anche per barare.','Scendere troppo velocemente.'],
    ['Se non riesci a risalire, spingi con le mani e concentrati sulla fase negativa.']);
  X('back-extension-ghd','Back Extension alla GHD','GHD Back Extension','macchina','hinge',['lower_back'],['glutes','hamstrings'],'Hyperextensions_Back_Extensions',
    ['Cuscinetto appena sotto le creste iliache, mani al petto o dietro la testa.','Scendi flettendo il busto con la colonna neutra.','Risali fino alla linea del corpo.'],
    ['Iperestendere in alto.','Usare slancio.'],
    ['Aggiungi un disco al petto quando superi le 20 ripetizioni.']);
  X('shrug-inclinato','Scrollate su Panca Inclinata','Incline Dumbbell Shrug','manubri','iso',['traps'],['upper_back'],'Dumbbell_Incline_Shoulder_Raise',
    ['Petto appoggiato su una panca inclinata a 45°, manubri pendenti.','Porta le scapole verso l\'alto e verso l\'interno.','Scendi in allungamento completo.'],
    ['Piegare i gomiti.','Range parziale.'],
    ['L\'inclinazione sposta il lavoro sul trapezio medio, non solo su quello superiore.']);
  X('kelso-shrug','Kelso Shrug','Kelso Shrug','manubri','iso',['traps','upper_back'],[],'Middle_Back_Shrug',
    ['Petto su una panca inclinata, braccia tese verso il basso.','Senza piegare i gomiti, retrai le scapole avvicinandole tra loro.','Torna in protrazione completa.'],
    ['Piegare i gomiti (diventa un rematore).','Movimento troppo ampio con slancio.'],
    ['Isola il trapezio medio e i romboidi: ottimo dopo il rematore.']);
  X('pulldown-lean-back','Lat Machine con Busto Reclinato','Lean-Back Lat Pulldown','macchina','traz-vert',['lats'],['upper_back','biceps'],'Underhand_Cable_Pulldowns',
    ['Reclina il busto di circa 30° mantenendolo fermo.','Tira la barra verso la parte alta dell\'addome.','Risali in completa estensione lasciando salire le scapole.'],
    ['Oscillare avanti e indietro con il busto.','Tirare troppo in basso.'],
    ['L\'inclinazione allinea meglio la resistenza alle fibre del gran dorsale.']);
  X('lat-prayer','Lat Prayer','Straight-Bar Lat Prayer','cavi','iso',['lats'],['triceps','abs'],'Rope_Straight-Arm_Pulldown',
    ['In ginocchio davanti alla puleggia alta, braccia tese sopra la testa.','Spingi la barra verso il basso fino alle cosce senza piegare i gomiti.','Torna lentamente in massimo allungamento.'],
    ['Piegare i gomiti.','Muovere il busto.'],
    ['Isola il dorsale in allungamento: ottimo come pre-attivazione prima delle trazioni.']);
  X('preacher-bilanciere','Curl alla Panca Scott con Bilanciere','Barbell Preacher Curl','ez','iso',['biceps'],['forearms'],'Preacher_Curl',
    ['Ascelle sul bordo alto del pad, braccia distese.','Fletti i gomiti fino alla contrazione completa.','Scendi lentamente senza bloccare i gomiti in basso.'],
    ['Estendere di scatto in basso: rischio per il tendine.','Staccare i gomiti dal pad.'],
    ['La panca Scott elimina lo slancio: usa carichi onesti.']);
  X('curl-cavo-inverso','Curl Inverso ai Cavi','Reverse-Grip Cable Curl','cavi','iso',['forearms','biceps'],[],'Reverse_Cable_Curl',
    ['Puleggia bassa con barra dritta, presa prona.','Fletti i gomiti mantenendo i polsi rigidi.','Scendi controllando.'],
    ['Lasciare cadere i polsi.','Usare troppo carico.'],
    ['La tensione costante del cavo è ideale per un muscolo debole come il brachioradiale.']);
  X('katana-extension','Katana Triceps Extension','Katana Triceps Extension','cavi','iso',['triceps'],[],'Cable_One_Arm_Tricep_Extension',
    ['Puleggia alta, impugna con un braccio e porta la mano dietro la testa opposta.','Estendi il gomito in diagonale verso l\'esterno.','Torna lentamente in allungamento.'],
    ['Muovere il gomito.','Ruotare il busto.'],
    ['La diagonale mette il capo lungo del tricipite in forte allungamento.']);
  X('diverging-pushdown','Push-Down Divergente','Diverging Triceps Pressdown','cavi','iso',['triceps'],[],'Triceps_Pushdown_-_Rope_Attachment',
    ['Due corde o una corda lunga, gomiti lungo i fianchi.','Estendi separando molto le mani verso l\'esterno in basso.','Torna controllando.'],
    ['Aprire i gomiti.','Non separare le mani a fine movimento.'],
    ['La divergenza aumenta l\'attivazione del capo laterale nella contrazione di picco.']);
  X('wrist-roller','Wrist Roller','Wrist Roller','corpo','iso',['forearms'],[],'Wrist_Roller',
    ['Braccia tese in avanti, arrotola la corda con i polsi fino a sollevare il carico.','Srotola lentamente controllando la discesa.'],
    ['Abbassare le braccia durante la salita.','Srotolare senza controllo.'],
    ['Alterna il senso di rotazione per allenare flessori ed estensori.']);
  X('plate-pinch','Plate Pinch','Plate Pinch','corpo','iso',['forearms'],[],'Plate_Pinch',
    ['Stringi due dischi tra pollice e dita, lati lisci verso l\'esterno.','Mantieni la presa il più a lungo possibile.'],
    ['Appoggiare i dischi alle gambe.','Usare il gesso in eccesso.'],
    ['Allena la presa a pinza, quella più carente nella maggior parte dei lifter.']);
  X('zercher-squat','Zercher Squat','Zercher Squat','bilanciere','squat',['quads','glutes'],['upper_back','abs','lower_back'],'Zercher_Squats',
    ['Bilanciere appoggiato nell\'incavo dei gomiti, mani unite.','Scendi mantenendo il busto il più verticale possibile.','Risali spingendo con tutto il piede.'],
    ['Lasciare cadere i gomiti.','Non proteggere l\'incavo del gomito (usa un asciugamano).'],
    ['Costringe a un busto verticale: ottimo per chi tende a piegarsi in avanti nello squat.']);
  X('box-squat','Box Squat','Box Squat','bilanciere','squat',['glutes','quads'],['hamstrings','lower_back'],'Box_Squat',
    ['Box all\'altezza che porta le anche appena sotto il parallelo.','Scendi portando le anche indietro fino a sfiorare il box.','Risali esplosivo senza rimbalzare.'],
    ['Sedersi con tutto il peso sul box.','Rimbalzare sul box.'],
    ['Insegna a usare le anche e a controllare la discesa.']);
  X('overhead-squat','Overhead Squat','Overhead Squat','bilanciere','squat',['quads'],['glutes','front_delts','abs','upper_back'],'Overhead_Squat',
    ['Bilanciere sopra la testa con presa larga, braccia bloccate.','Scendi in accosciata completa mantenendo il bilanciere sopra il centro del piede.','Risali senza far cadere le braccia in avanti.'],
    ['Bilanciere che scivola in avanti.','Forzare la profondità senza mobilità.'],
    ['Grande test di mobilità: inizia con un bastone.']);
  X('pallof-press-rotazione','Pallof Press con Rotazione','Pallof Press with Rotation','cavi','core',['obliques'],['abs'],'Pallof_Press_With_Rotation',
    ['Puleggia all\'altezza del petto, in piedi di lato.','Estendi le braccia e poi ruota il busto lontano dalla puleggia.','Torna al centro controllando.'],
    ['Muovere i piedi.','Carichi troppo alti.'],
    ['Progressione naturale del Pallof press classico.']);
  X('suitcase-carry','Suitcase Carry','Suitcase Carry','manubri','core',['obliques','forearms'],['abs','traps'],'Plate_Pinch',
    ['Un solo manubrio o kettlebell pesante in una mano.','Cammina mantenendo le spalle e il bacino perfettamente livellati.','Cambia lato.'],
    ['Inclinarsi verso il lato del carico.','Camminare troppo velocemente.'],
    ['Lavoro anti-flessione laterale: fondamentale per un core davvero forte.']);
  X('jefferson-curl','Jefferson Curl','Jefferson Curl','manubri','mobilita',['lower_back','hamstrings'],[],'Stiff-Legged_Dumbbell_Deadlift',
    ['In piedi su un rialzo con un carico leggero, gambe tese.','Arrotola la colonna vertebra per vertebra scendendo il più possibile.','Risali srotolando lentamente dal basso verso l\'alto.'],
    ['Usare carichi pesanti: è un esercizio di mobilità, non di forza.','Scendere di scatto.'],
    ['Solo carichi molto leggeri (2-10 kg) e movimento lentissimo.']);
  X('couch-stretch','Couch Stretch','Couch Stretch','corpo','mobilita',['quads'],['glutes'],'All_Fours_Quad_Stretch',
    ['In affondo con il ginocchio posteriore a terra e il piede appoggiato al muro dietro.','Porta il bacino in retroversione e raddrizza il busto.','Mantieni 60-90 secondi per lato.'],
    ['Inarcare la lombare.','Forzare oltre il dolore.'],
    ['Il più efficace per i flessori dell\'anca se passi molte ore seduto.']);
  X('90-90-hip','Mobilità 90/90 dell\'Anca','90/90 Hip Stretch','corpo','mobilita',['glutes'],['adductors'],'90_90_Hamstring',
    ['Seduto con una gamba a 90° davanti e l\'altra a 90° di lato.','Inclina il busto in avanti sulla gamba anteriore.','Ruota da un lato all\'altro passando per il centro.'],
    ['Forzare la rotazione con le mani.','Trattenere il respiro.'],
    ['Migliora la rotazione interna ed esterna dell\'anca: utile per la profondità dello squat.']);


  /* ============ VERSIONI SENZA ATTREZZATURA ============
     Garantiscono almeno un'alternativa allenante per ogni gruppo muscolare
     anche a corpo libero o con soli elastici. */
  X('squat-corpo-libero','Squat a Corpo Libero','Bodyweight Squat','corpo','squat',['quads','glutes'],['adductors','abs'],'Bodyweight_Squat',
    ['Piedi alla larghezza delle spalle, punte leggermente extraruotate.','Scendi portando le anche indietro e in basso fino ad almeno il parallelo.','Risali spingendo con tutto il piede e contraendo i glutei in alto.'],
    ['Talloni che si sollevano.','Ginocchia che collassano verso l\'interno.','Range parziale.'],
    ['Per renderlo allenante: 3-4 secondi di discesa, pausa in basso e serie da 20-30 ripetizioni.',
     'Passo successivo: squat monopodalico o squat bulgaro.']);
  X('wall-sit','Wall Sit','Wall Sit','corpo','iso',['quads'],['glutes','adductors'],'Chair_Squat',
    ['Schiena contro il muro, scendi finché le cosce non sono parallele al pavimento.','Ginocchia a 90°, piedi ben piantati.','Mantieni la posizione respirando normalmente.'],
    ['Appoggiare le mani sulle cosce.','Scendere meno del parallelo.'],
    ['Ottimo finisher per i quadricipiti quando non hai carichi disponibili.']);
  X('ponte-glutei','Ponte per Glutei a Corpo Libero','Bodyweight Glute Bridge','corpo','hinge',['glutes'],['hamstrings','abs'],'Butt_Lift_Bridge',
    ['Supino con le ginocchia piegate e i piedi vicini ai glutei.','Spingi con i talloni sollevando il bacino fino alla linea del corpo.','Contrai i glutei 2 secondi in alto e scendi lentamente.'],
    ['Iperestendere la lombare invece di estendere l\'anca.','Spingere sulle punte.'],
    ['Per aumentare la difficoltà: una gamba sola, piedi rialzati o pausa lunga in contrazione.']);
  X('slider-leg-curl','Leg Curl con Asciugamano','Sliding Leg Curl','corpo','iso',['hamstrings'],['glutes'],'Platform_Hamstring_Slides',
    ['Supino su un pavimento liscio, talloni su un asciugamano o due slider.','Solleva il bacino e fai scivolare i talloni in avanti mantenendo le anche alte.','Riporta i talloni verso i glutei contraendo i femorali.'],
    ['Far cadere il bacino durante l\'allontanamento.','Andare troppo veloce.'],
    ['La versione a corpo libero più efficace per i femorali: rallenta la fase di allontanamento.']);
  X('calf-raise-corpo','Calf Raise a Corpo Libero','Bodyweight Calf Raise','corpo','iso',['calves'],[],'Standing_Calf_Raises',
    ['Avampiedi su un gradino o un libro spesso, talloni nel vuoto.','Scendi in massimo allungamento con 1-2 secondi di pausa.','Sali sulle punte il più in alto possibile.'],
    ['Rimbalzare in basso.','Range parziale.'],
    ['Passa a una gamba sola appena superi le 25 ripetizioni per serie.']);
  X('superman','Superman','Superman','corpo','hinge',['lower_back'],['glutes'],'Hyperextensions_With_No_Hyperextension_Bench',
    ['A pancia in giù con braccia e gambe distese.','Solleva contemporaneamente braccia, petto e gambe da terra.','Tieni 2 secondi e torna giù controllando.'],
    ['Iperestendere il collo.','Movimento a scatti.'],
    ['Alternativa alle iperestensioni quando non hai la panca lombare.']);
  X('pike-push-up','Piegamenti a V (Pike)','Pike Push-Up','corpo','spinta-vert',['front_delts'],['triceps','side_delts'],'Handstand_Push-Ups',
    ['Posizione a V rovesciata con i fianchi alti e le mani a terra.','Piega i gomiti portando la testa verso il pavimento tra le mani.','Spingi fino a estensione completa.'],
    ['Sedere troppo basso: diventa un piegamento normale.','Gomiti troppo aperti.'],
    ['La migliore spinta verticale a corpo libero: rialza i piedi per aumentare il carico.']);
  X('rematore-asciugamano','Rematore alla Porta con Asciugamano','Towel Door Row','corpo','traz-oriz',['lats','upper_back'],['biceps','rear_delts'],'Inverted_Row',
    ['Passa un asciugamano attorno a una maniglia solida, impugna le due estremità.','Inclina il busto all\'indietro con i piedi vicini alla porta e le braccia tese.','Tira il petto verso le mani stringendo le scapole, poi torna lentamente.'],
    ['Usare una porta che non è ben fissata.','Tirare solo con le braccia.'],
    ['Più avvicini i piedi alla porta, più il movimento diventa difficile.']);
  X('clamshell','Clamshell','Clamshell','corpo','iso',['abductors','glutes'],[],'Monster_Walk',
    ['Sdraiato su un fianco con le ginocchia piegate a 90° e i piedi uniti.','Apri il ginocchio superiore mantenendo il bacino fermo.','Torna lentamente.'],
    ['Ruotare il bacino all\'indietro.','Movimento troppo veloce.'],
    ['Aggiungi un elastico sopra le ginocchia per aumentare la resistenza.']);
  X('curl-elastico','Curl con Elastico','Band Biceps Curl','elastici','iso',['biceps'],['forearms'],'Standing_Biceps_Cable_Curl',
    ['In piedi sull\'elastico, impugna le estremità con i palmi in avanti.','Fletti i gomiti tenendoli fermi lungo i fianchi.','Scendi controllando la resistenza.'],
    ['Lasciare che l\'elastico ti riporti giù senza controllo.','Portare i gomiti in avanti.'],
    ['La resistenza cresce dove il bicipite è più forte: ottimo compromesso a casa.']);
  X('pushdown-elastico','Push-Down con Elastico','Band Triceps Pushdown','elastici','iso',['triceps'],[],'Speed_Band_Overhead_Triceps',
    ['Ancora l\'elastico in alto (porta o sbarra), gomiti lungo i fianchi.','Estendi i gomiti fino alla completa distensione.','Torna controllando fino a 90°.'],
    ['Aprire i gomiti.','Inclinare il busto per spingere.'],
    ['Se non hai un punto alto, usa la versione sopra la testa in ginocchio sull\'elastico.']);
  X('shrug-elastico','Scrollate con Elastico','Band Shrug','elastici','iso',['traps'],['forearms'],'Calf-Machine_Shoulder_Shrug',
    ['In piedi sull\'elastico, impugna le estremità lungo i fianchi.','Solleva le spalle verso le orecchie.','Scendi lentamente in allungamento completo.'],
    ['Piegare i gomiti.','Ruotare le spalle.'],
    ['Usa due elastici sovrapposti quando uno solo diventa troppo leggero.']);
  X('rematore-elastico','Rematore con Elastico','Band Row','elastici','traz-oriz',['upper_back','lats'],['biceps','rear_delts'],'Bodyweight_Mid_Row',
    ['Elastico ancorato all\'altezza del petto o passato sotto i piedi da seduto.','Tira i gomiti indietro stringendo le scapole.','Torna in allungamento completo.'],
    ['Alzare le spalle.','Tirare con le braccia senza muovere le scapole.'],
    ['A casa è il sostituto più diretto del pulley basso.']);
  X('pulldown-elastico','Pulldown con Elastico','Band Lat Pulldown','elastici','traz-vert',['lats'],['biceps','upper_back'],'Straight-Arm_Pulldown',
    ['Elastico ancorato in alto, in ginocchio davanti al punto di ancoraggio.','Tira le mani verso le cosce portando i gomiti in basso.','Torna in completa estensione.'],
    ['Piegare troppo i gomiti.','Muovere il busto.'],
    ['Sostituto della lat machine quando ti alleni a casa.']);
  X('press-elastico','Distensioni con Elastico','Band Chest Press','elastici','spinta-oriz',['chest'],['triceps','front_delts'],'Cross_Over_-_With_Bands',
    ['Elastico dietro la schiena passato sotto le ascelle, estremità nelle mani.','Spingi in avanti fino a distendere le braccia.','Torna controllando fino al petto.'],
    ['Elastico troppo alto sulle scapole.','Perdere la tensione in fase di ritorno.'],
    ['Combinalo con i piegamenti per coprire tutta la curva di forza.']);
  X('lento-elastico','Lento con Elastico','Band Shoulder Press','elastici','spinta-vert',['front_delts'],['side_delts','triceps'],'Shoulder_Press_-_With_Bands',
    ['In piedi sull\'elastico, mani all\'altezza delle spalle.','Spingi verso l\'alto fino a braccia distese.','Scendi controllando.'],
    ['Inarcare la lombare.','Range parziale.'],
    ['Allarga la presa sull\'elastico per aumentare la resistenza.']);


  X('alzate-laterali-improvvisate','Alzate Laterali con Carico Improvvisato','Improvised Lateral Raise','corpo','iso',['side_delts'],['traps'],'Side_Lateral_Raise',
    ['Impugna due bottiglie d\'acqua piene, due borse della spesa o uno zaino leggero per lato.','Solleva lateralmente fino all\'altezza delle spalle con i gomiti morbidi.','Scendi in 3 secondi controllando.'],
    ['Usare slancio: con carichi leggeri è la tentazione principale.','Salire oltre la linea delle spalle.'],
    ['Con carichi leggeri servono serie lunghe: 20-30 ripetizioni molto lente fino al cedimento.',
     'Due bottiglie da 1,5 litri equivalgono a circa 1,5 kg per mano.']);
  X('prone-ytw','Prone Y-T-W a Terra','Prone Y-T-W Raise','corpo','iso',['rear_delts','upper_back'],['traps'],'Lying_Rear_Delt_Raise',
    ['A pancia in giù, fronte appoggiata, braccia distese sopra la testa a formare una Y.','Solleva le braccia da terra tenendo 2 secondi, poi abbassale.','Ripeti con le braccia a T (aperte) e a W (gomiti piegati).'],
    ['Alzare la testa e iperestendere il collo.','Usare slancio invece di contrarre le scapole.'],
    ['8-12 ripetizioni per ogni posizione, di fila: brucia molto anche senza carico.']);
  X('rematore-tavolo','Rematore sotto il Tavolo','Under-Table Row','corpo','traz-oriz',['upper_back','lats'],['biceps','rear_delts'],'Inverted_Row',
    ['Sdraiati sotto un tavolo robusto e afferra il bordo con entrambe le mani.','Corpo teso dalla testa ai talloni, tira il petto verso il bordo del tavolo.','Scendi controllando fino a braccia distese.'],
    ['Usare un tavolo instabile o leggero.','Bacino che sprofonda.'],
    ['Più avvicini i piedi al corpo, più diventa facile: distendi le gambe per aumentare la difficoltà.']);
  X('scrollate-zaino','Scrollate con Zaino','Backpack Shrug','corpo','iso',['traps'],['forearms'],'Dumbbell_Shrug',
    ['Riempi uno zaino con libri o bottiglie e tienilo per gli spallacci lungo i fianchi.','Solleva le spalle verso le orecchie con 1 secondo di pausa in alto.','Scendi in allungamento completo.'],
    ['Piegare i gomiti.','Ruotare le spalle.'],
    ['Serie da 20-25 ripetizioni molto controllate: il trapezio risponde bene anche a carichi bassi.']);
  X('curl-asciugamano','Curl Isometrico con Asciugamano','Towel Self-Resisted Curl','corpo','iso',['biceps'],['forearms'],'Concentration_Curls',
    ['Passa un asciugamano sotto un piede e impugna le due estremità con una mano.','Fletti il gomito mentre con la gamba opponi resistenza.','Resisti anche nella fase di ritorno, che deve durare 4-5 secondi.'],
    ['Non opporre resistenza in fase negativa.','Movimento troppo rapido.'],
    ['Non sostituisce i sovraccarichi, ma mantiene lo stimolo quando non hai nulla a disposizione.']);
  X('isometria-collo','Isometria del Collo','Isometric Neck Exercise','corpo','iso',['neck'],[],'Isometric_Neck_Exercise_-_Front_And_Back',
    ['Appoggia il palmo sulla fronte e spingi la testa contro la mano senza muoverla.','Tieni 10 secondi, poi ripeti su nuca, lato destro e lato sinistro.'],
    ['Spingere troppo forte fin dall\'inizio.','Trattenere il respiro.'],
    ['Utile per la postura e come prevenzione se passi molte ore al computer.']);
  X('presa-isometrica','Presa Isometrica con Borse','Loaded Grip Hold','corpo','iso',['forearms'],['traps'],'Plate_Pinch',
    ['Riempi due borse della spesa robuste con bottiglie o libri.','Tienile lungo i fianchi con le spalle basse e il core contratto.','Mantieni la presa fino al cedimento.'],
    ['Curvare le spalle in avanti.','Usare borse che possono strapparsi.'],
    ['Serie da 30-60 secondi: la presa risponde molto bene al lavoro isometrico.']);

  /* ---- Indici e utilità ---- */
  var BY_ID = {};
  DB.forEach(function (e) { BY_ID[e.id] = e; });

  /* Alias: nomi del programma Min-Max (inglese) -> id interni */
  var ALIAS = {
    'Lying Leg Curl':'leg-curl-sdraiato','Seated Leg Curl':'leg-curl-seduto','Nordic Ham Curl':'nordic-curl',
    'Squat (Your Choice)':'squat-bilanciere','Barbell Squat':'squat-bilanciere','Smith Machine Squat':'smith-squat',
    'Barbell Incline Press':'panca-inclinata-bil','Smith Machine Incline Press':'smith-inclinata','DB Incline Press':'panca-inclinata-db',
    'Incline DB Y-Raise':'y-raise-inclinata','Cable Y-Raise':'y-raise-cavo','Machine Lateral Raise':'alzate-laterali-macchina',
    'Pull-Up (Wide Grip)':'trazioni-presa-larga','Lat Pulldown (Wide Grip)':'lat-machine-larga','1-Arm Cable Pulldown':'pulldown-1braccio',
    'Standing Calf Raise':'calf-raise-in-piedi','Leg Press Calf Press':'calf-press-leg-press','Donkey Calf Raise':'donkey-calf',
    'Close-Grip Lat Pulldown':'lat-machine-stretta','Close-Grip Pull-Up':'trazioni-presa-stretta',
    'Chest-Supported T-Bar Row':'rematore-tbar','Chest-Supported Machine Row':'rematore-macchina','Chest-Supported DB Row':'rematore-db-appoggio',
    'Machine Shrug':'scrollate-macchina','Barbell Shrug':'scrollate-bilanciere','Cable Shrug-In':'cable-shrug-in',
    'Machine Chest Press':'chest-press-macchina','Smith Machine Bench Press':'smith-panca','DB Bench Press':'panca-piana-db',
    'High-Cable Lateral Raise':'alzate-laterali-cavo-alto','DB Lateral Raise':'alzate-laterali-db',
    '1-Arm Reverse Pec Deck':'pec-deck-inverso-1braccio','Lying Reverse DB Flye':'alzate-posteriori-sdraiato','Reverse Cable Crossover':'reverse-crossover',
    'Cable Crunch':'crunch-cavo','Weighted Crunch':'crunch-zavorrato','Machine Crunch':'crunch-macchina',
    'Leg Extension':'leg-extension','Reverse Nordic':'reverse-nordic','Sissy Squat':'sissy-squat',
    'Barbell RDL':'rdl-bilanciere','DB RDL':'rdl-db','Seated Cable Deadlift':'seated-cable-deadlift',
    'Machine Hip Thrust':'hip-thrust-macchina','Barbell Hip Thrust':'hip-thrust-bilanciere','45° Hyperextension':'iperestensioni-45',
    'Leg Press':'leg-press',
    'Bayesian Cable Curl':'curl-bayesian','Incline DB Curl':'curl-panca-inclinata','Standing DB Curl':'curl-manubri',
    'Overhead Cable Triceps Extension':'french-press-cavo-alto','Overhead DB Triceps Extension':'french-press-db','Skull Crusher':'skull-crusher',
    'Modified Zottman Curl':'zottman-modificato','DB Hammer Curl':'curl-martello','Preacher Hammer Curl':'curl-martello-panca',
    'Cable Triceps Kickback':'kickback-cavo','Seated Dip Machine':'dip-macchina','Close Grip Dip':'dip-tricipiti',
    'DB Wrist Curl':'wrist-curl-db','Cable Wrist Curl':'wrist-curl-cavo',
    'DB Wrist Extension':'wrist-ext-db','Cable Wrist Extension':'wrist-ext-cavo',
    'Alternating DB Curl':'curl-manubri-alternato','Barbell Curl':'curl-bilanciere','EZ-Bar Curl':'curl-ez',
    'Dead Hang (optional)':'dead-hang','Dead Hang':'dead-hang'
  };

  function get(id) { return BY_ID[id] || null; }
  function byAlias(name) { return ALIAS[name] ? BY_ID[ALIAS[name]] : null; }
  function imgUrl(e, i) { return e && e.img ? 'assets/ex/' + e.img + '_' + (i || 0) + '.webp' : null; }
  function vid(e) { return (g.EXVIDEOS && e && g.EXVIDEOS[e.id]) || null; }
  function ytUrl(e) {
    var v = vid(e);
    return v ? 'https://www.youtube.com/watch?v=' + v
             : 'https://www.youtube.com/results?search_query=' + encodeURIComponent((e.en || e.n) + ' proper form technique');
  }
  function ytEmbed(e) {
    var v = vid(e);
    return v ? 'https://www.youtube.com/embed/' + v + '?rel=0&modestbranding=1&playsinline=1&autoplay=1' : null;
  }

  function search(q, filters) {
    q = (q || '').trim().toLowerCase();
    return DB.filter(function (e) {
      if (filters) {
        if (filters.muscle && e.pri.indexOf(filters.muscle) < 0 && e.sec.indexOf(filters.muscle) < 0) return false;
        if (filters.eq && e.eq !== filters.eq) return false;
        if (filters.pat && e.pat !== filters.pat) return false;
      }
      if (!q) return true;
      return (e.n + ' ' + e.en + ' ' + e.pri.join(' ') + ' ' + e.eq).toLowerCase().indexOf(q) >= 0;
    });
  }

  g.EXDB = { all: DB, get: get, byAlias: byAlias, search: search, imgUrl: imgUrl, ytUrl: ytUrl,
             vid: vid, ytEmbed: ytEmbed, ALIAS: ALIAS, byId: BY_ID };
})(window);
