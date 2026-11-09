import { PhenomenonEntity } from './types';

export const PHENOMENA_PART_1: PhenomenonEntity[] = [
  // ============================================================================
  // DOM-01: BEWUSSTSEINS- & VIGILANZPHÄNOMENE
  // ============================================================================
  {
    id: 'quantitative_vigilance_reduction',
    name: 'Bewusstseinstrübung & Vigilanzminderung',
    englishName: 'Clouding of Consciousness / Somnolence',
    synonyms: ['Benommenheit', 'Somnolenz', 'Sopor', 'Vigilanzfluktuation'],
    domainId: 'consciousness',
    amdpCode: 'AMDP 1',
    hpoId: 'HP:0001259',
    icd11SymptomCode: 'MB20.1',
    rdocDomain: 'Arousal and Regulatory Systems (Arousal)',
    visualArchetype: 'dimming_beacon',
    shortVisualTagline: 'Abgedunkelte Lichtkegel im Nebel der Wachheit',
    definition: 'Quantitative Herabsetzung der Wachheit (Vigilanz) und Klarheit des Erlebens auf einem Kontinuum von leichter Benommenheit über Schläfrigkeit (Somnolenz) bis zu nur noch durch Schmerzreize durchbrechbarem Sopor.',
    subjectiveExperience: 'Alles wirkt wie durch Milchglas oder tief unter Wasser; Gedanken und Umweltreize dringen nur noch gedämpft, bruchstückhaft und verlangsamt durch.',
    neurobiology: 'Unterfunktion des aufsteigenden retikulären Aktivierungssystems (ARAS) im Hirnstamm und der unspezifischen Thalamuskerngebiete.',
    wikiTitleDe: 'Bewusstseinsstörung',
    wikiTitleEn: 'Clouding_of_consciousness',
    pubmedQuery: 'clouding of consciousness ARAS thalamus delirium',
    olsSearchTerm: 'clouding of consciousness',
    relatedPhenomenaIds: ['disorientation_spacetime', 'consciousness_narrowing', 'cognitive_dysfunction_brain_fog'],
    conditions: [
      {
        conditionId: 'delirium_sepsis_metabolic',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Akut einsetzend und im Tagesverlauf stark fluktuierend (Sundowning).'
      },
      {
        conditionId: 'lewy_body_parkinson',
        prevalence: 'leitsymptom',
        specificityScore: 0.85,
        clinicalNote: 'Ausgeprägte Vigilanz- und Aufmerksamkeitsfluktuationen über Minuten bis Stunden sind ein diagnostisches Kernkriterium der Lewy-Körper-Demenz.'
      },
      {
        conditionId: 'stroke_tbi_korsakoff',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'Bei Hirndrucksteigerung, Thalamusinfarkt oder akutem Schädel-Hirn-Trauma.'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'haeufig',
        specificityScore: 0.7,
        clinicalNote: 'Bei Intoxikation mit Sedativa, Opioiden, Alkohol oder GHB.'
      }
    ]
  },
  {
    id: 'consciousness_narrowing',
    name: 'Bewusstseinseinengung (Dämmerzustand)',
    englishName: 'Narrowing of Consciousness / Twilight State',
    synonyms: ['Röhrenbewusstsein', 'Fokussierter Dämmerzustand', 'Iktale Einengung'],
    domainId: 'consciousness',
    amdpCode: 'AMDP 3',
    hpoId: 'HP:0007185',
    icd11SymptomCode: 'MB20.2',
    rdocDomain: 'Arousal and Cognitive Control',
    visualArchetype: 'tunnel_spotlight',
    shortVisualTagline: 'Scharfer Lichtkegel im schwarzen Außenraum',
    definition: 'Qualitative Bewusstseinsveränderung mit Einengung des Erlebensfeldes auf wenige Themen oder Reize bei verminderter Ansprechbarkeit auf Außenreize und oft erhaltenem, nach außen geordnet wirkendem Handeln.',
    subjectiveExperience: 'Wie ein Blick durch ein enges Fernrohr: Nur ein einziger Gedanke, Schmerz oder innerer Befehl existiert, während der Rest der Welt ausgeblendet ist.',
    neurobiology: 'Fokale temporolimbische Synchronisation oder stressinduzierte präfrontale Abschaltung peripherer Aufmerksamkeitsnetzwerke.',
    wikiTitleDe: 'Dämmerzustand',
    wikiTitleEn: 'Twilight_state',
    pubmedQuery: 'twilight state narrowing of consciousness temporal lobe epilepsy dissociation',
    olsSearchTerm: 'altered level of consciousness',
    relatedPhenomenaIds: ['quantitative_vigilance_reduction', 'depersonalization', 'autistic_meltdown_shutdown'],
    conditions: [
      {
        conditionId: 'temporal_lobe_epilepsy',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Im Rahmen fokaler nicht-bewusster Anfälle oder postiktaler Dämmerzustände mit Automatismen.'
      },
      {
        conditionId: 'dissociative_disorders',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Dissoziativer Stupor, dissoziative Fugue oder Trancezustände nach extremem Trauma.'
      },
      {
        conditionId: 'ptsd_cptsd',
        prevalence: 'haeufig',
        specificityScore: 0.7,
        clinicalNote: 'Akute peritraumatische Einengung des Bewusstseins („Tunnelblick“ unter Lebensgefahr).'
      }
    ]
  },
  {
    id: 'consciousness_expansion_shift',
    name: 'Bewusstseinsverschiebung & Oneiroides Erleben',
    englishName: 'Consciousness Expansion / Oneiroid Syndrome',
    synonyms: ['Bewusstseinserweiterung', 'Wachtraum-Erleben', 'Mystische Entgrenzung'],
    domainId: 'consciousness',
    amdpCode: 'AMDP 4',
    hpoId: 'HP:0033684',
    icd11SymptomCode: 'MB20.Y',
    rdocDomain: 'Arousal and Default Mode Network Modulation',
    visualArchetype: 'expanding_prism',
    shortVisualTagline: 'Überhelle spektrale Entgrenzung des Erlebensraums',
    definition: 'Subjektives Gefühl einer gesteigerten Intensität, Helligkeit, Weite und Wachheit des Bewusstseins oder traumartig-szenische Überformung des Wacherlebens (Oneiroid).',
    subjectiveExperience: 'Farben leuchten übernatürlich intensiv, Geräusche klingen glasklar, Zusammenhänge des Kosmos scheinen unmittelbar offenbart – oder man erlebt sich mitten in einem dramatischen Wachtraum.',
    neurobiology: 'Desintegration des Default Mode Network (DMN) und thalamokortikale Filteröffnung (insb. über 5-HT2A-Rezeptoren oder limbische Übererregung).',
    wikiTitleDe: 'Oneiroid-Syndrom',
    wikiTitleEn: 'Oneiroid_syndrome',
    pubmedQuery: 'oneiroid state consciousness expansion 5-HT2A default mode network',
    olsSearchTerm: 'altered state of consciousness',
    relatedPhenomenaIds: ['synesthesia_crossmodal', 'delusional_mood_salience', 'flight_of_ideas'],
    conditions: [
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Klassisches Kernphänomen unter serotonergen Psychedelika (LSD, Psilocybin, DMT) oder Ketamin.'
      },
      {
        conditionId: 'bipolar_disorder',
        prevalence: 'gelegentlich',
        specificityScore: 0.65,
        clinicalNote: 'In Beginnphasen euphorischer Manien als Gefühl gesteigerter geistiger Klarheit und Farbintensität.'
      },
      {
        conditionId: 'schizophrenia',
        prevalence: 'gelegentlich',
        specificityScore: 0.7,
        clinicalNote: 'Bei akuten kataton-oneiroiden Psychosen.'
      },
      {
        conditionId: 'delirium_sepsis_metabolic',
        prevalence: 'gelegentlich',
        specificityScore: 0.6,
        clinicalNote: 'Bei langem Intensivaufenthalt (ICU-Oneiroid mit szenischen Wachträumen).'
      }
    ]
  },

  // ============================================================================
  // DOM-02: ORIENTIERUNGS- & ZEITERLEBENSPHÄNOMENE
  // ============================================================================
  {
    id: 'disorientation_spacetime',
    name: 'Desorientiertheit (Zeit, Ort, Situation, Person)',
    englishName: 'Disorientation (Time, Place, Situation, Self)',
    synonyms: ['Zeitliche Desorientierung', 'Örtliche Desorientierung', 'Situative Verkennung'],
    domainId: 'orientation',
    amdpCode: 'AMDP 5–8',
    hpoId: 'HP:0001289',
    icd11SymptomCode: 'MB21.2',
    rdocDomain: 'Cognitive Systems (Declarative Memory & Spatial Navigation)',
    visualArchetype: 'broken_compass',
    shortVisualTagline: 'Kompassnadel ohne Nordpol im verschobenen Raumgitter',
    definition: 'Verlust des Wissens über aktuelle Zeitdaten (Datum, Jahreszeit), den gegenwärtigen Aufenthaltsort, die Bedeutung der aktuellen Situation oder im schwersten Fall die eigene biografische Identität.',
    subjectiveExperience: 'Man wacht in einem Zimmer auf und weiß nicht, ob es 1985 oder heute ist, hält das Krankenhaus für ein Hotel und erkennt den Sinn der Umgebung nicht.',
    neurobiology: 'Funktionsstörung des Hippocampus-Entorhinalkortex-Komplexes (Place Cells / Grid Cells) und des posterioren cingulären Kortex.',
    wikiTitleDe: 'Desorientiertheit',
    wikiTitleEn: 'Orientation_(mental)',
    pubmedQuery: 'disorientation time place hippocampus grid cells dementia delirium',
    olsSearchTerm: 'disorientation',
    relatedPhenomenaIds: ['quantitative_vigilance_reduction', 'confabulation', 'deja_vu_jamais_vu'],
    conditions: [
      {
        conditionId: 'alzheimer_ftd',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Typische Reihenfolge des Verlusts: erst zeitlich, dann örtlich, dann situativ, zuletzt autopsychisch.'
      },
      {
        conditionId: 'delirium_sepsis_metabolic',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Akut einsetzende zeitliche und situative Desorientiertheit als Warnsignal eines organischen Delirs.'
      },
      {
        conditionId: 'stroke_tbi_korsakoff',
        prevalence: 'leitsymptom',
        specificityScore: 0.85,
        clinicalNote: 'Beim amnestischen Korsakow-Syndrom oft kombiniert mit situativer Verkennung.'
      },
      {
        conditionId: 'dissociative_disorders',
        prevalence: 'gelegentlich',
        specificityScore: 0.7,
        clinicalNote: 'Isolierte autopsychische Desorientierung (Nichtwissen um die eigene Person) bei erhaltener Zeitorientierung spricht stark für eine dissoziative Genese.'
      }
    ]
  },
  {
    id: 'subjective_time_distortion',
    name: 'Störung des subjektiven Zeiterlebens & Zeitblindheit',
    englishName: 'Subjective Time Distortion & Time Blindness',
    synonyms: ['Zeitblindheit', 'Zeitraffer-Phänomen', 'Zeitdehner-Phänomen', 'Zeitstillstand'],
    domainId: 'orientation',
    amdpCode: 'AMDP Zusatz Zeit',
    hpoId: 'HP:0031845',
    icd11SymptomCode: 'MB21.Y',
    rdocDomain: 'Cognitive Systems / Striatal Interval Timing',
    visualArchetype: 'warped_hourglass',
    shortVisualTagline: 'Sanduhr mit gekrümmtem Zeitfluss zwischen Stillstand und Sprung',
    definition: 'Tiefgreifende Abweichung der inneren Zeitwahrnehmung von der physikalischen Uhrzeit: Entweder quälendes Stillstehen der Zeit, rasendes Verfliegen oder völliger Verlust des Gefühls für Zeitintervalle („Jetzt“ vs. „Nicht-Jetzt“).',
    subjectiveExperience: 'Bei schwerer Melancholie dehnt sich jede Minute zu einer bleiernen Ewigkeit; bei ADHS („Zeitblindheit“) verschwinden vier Stunden wie fünf Minuten.',
    neurobiology: 'Dopaminerge Taktgeber-Schleifen zwischen Substantia nigra, Striatum, supplementärmotorischem Areal (SMA) und Insula.',
    wikiTitleDe: 'Zeitwahrnehmung',
    wikiTitleEn: 'Time_perception',
    pubmedQuery: 'time perception distortion striatal dopamine ADHD depression mania',
    olsSearchTerm: 'time perception',
    relatedPhenomenaIds: ['hyperfocus_tunnel', 'thought_inhibition_retardation', 'flight_of_ideas'],
    conditions: [
      {
        conditionId: 'adhd',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Chronische „Time Blindness“: Zeit wird binär als „Jetzt“ oder „Nicht-Jetzt“ erlebt; Unterschätzung von Zeitdauern.'
      },
      {
        conditionId: 'major_depression',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Subjektive Zeitdehnung bis zum quälenden Gefühl des „Zeitstillstands“ (Verlust der Zukunftsperspektive).'
      },
      {
        conditionId: 'bipolar_disorder',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'In der Manie beschleunigter innerer Taktgeber; die Außenwelt erscheint den Betroffenen viel zu langsam.'
      },
      {
        conditionId: 'migraine_alice',
        prevalence: 'gelegentlich',
        specificityScore: 0.7,
        clinicalNote: 'Beim Alice-im-Wunderland-Syndrom plötzlicher Zeitraffer-Effekt (Tachychronie).'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Massive Zeitdilatation unter Cannabinoiden und klassischen Psychedelika.'
      }
    ]
  },

  // ============================================================================
  // DOM-03: AUFMERKSAMKEITS-, GEDÄCHTNIS- & EXEKUTIVPHÄNOMENE
  // ============================================================================
  {
    id: 'cognitive_dysfunction_brain_fog',
    name: 'Auffassungs-, Konzentrations- & Arbeitsgedächtnisstörung (Brain Fog)',
    englishName: 'Impaired Concentration, Working Memory & Brain Fog',
    synonyms: ['Konzentrationsstörung', 'Brain Fog', 'Kognitive Verlangsamung', 'Merkfähigkeitsstörung'],
    domainId: 'attention_memory',
    amdpCode: 'AMDP 9–11',
    hpoId: 'HP:0100543',
    icd11SymptomCode: 'MB21.0',
    rdocDomain: 'Cognitive Systems (Attention & Working Memory)',
    visualArchetype: 'scattered_nodes',
    shortVisualTagline: 'Lose schwebende Gedankenbausteine mit unterbrochenen Brücken',
    definition: 'Verminderte Fähigkeit, Aufmerksamkeit gezielt auszurichten, Informationen im Arbeitsgedächtnis zu halten und neue Eindrücke über mehr als wenige Minuten zu speichern.',
    subjectiveExperience: 'Man liest denselben Satz fünfmal, ohne den Sinn zu erfassen; mitten im Satz fehlt das einfachste Wort, als läge ein dichter Watte-Schleier über dem Verstand.',
    neurobiology: 'Gestörte synaptische Effizienz im dorsolateralen präfrontalen Kortex (dlPFC), oft durch Neuroinflammation, Katecholaminmangel oder Schlafdefizit.',
    wikiTitleDe: 'Aufmerksamkeitsstörung',
    wikiTitleEn: 'Clouding_of_consciousness',
    pubmedQuery: 'working memory impairment brain fog dorsolateral prefrontal cortex neuroinflammation',
    olsSearchTerm: 'cognitive impairment',
    relatedPhenomenaIds: ['executive_paralysis', 'thought_inhibition_retardation', 'quantitative_vigilance_reduction'],
    conditions: [
      {
        conditionId: 'mecfs_longcovid_pots',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Ausgeprägter neuroimmunologischer „Brain Fog“, der sich nach geistiger oder körperlicher Anstrengung (PEM) drastisch verschlechtert.'
      },
      {
        conditionId: 'adhd',
        prevalence: 'leitsymptom',
        specificityScore: 0.85,
        clinicalNote: 'Erhöhte Ablenkbarkeit bei reizarmen Aufgaben und reduzierte Arbeitsgedächtniskapazität.'
      },
      {
        conditionId: 'major_depression',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Bei älteren Menschen bis zur sogenannten „depressiven Pseudodemenz“ ausgeprägt.'
      },
      {
        conditionId: 'b12_iron_deficiency',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Reversible kognitive Einbußen und Merkfähigkeitsstörungen bei Vitamin-B12- oder Ferritin-Mangel.'
      },
      {
        conditionId: 'thyroid_endocrine',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'Klassisches Leitsymptom der Hypothyreose und der perimenopausalen Hormonumstellung.'
      },
      {
        conditionId: 'sleep_deprivation_stress_grief',
        prevalence: 'leitsymptom',
        specificityScore: 0.85,
        clinicalNote: 'Unmittelbare physiologische Folge von Schlafmangel bereits nach einer Nacht.'
      }
    ]
  },
  {
    id: 'confabulation',
    name: 'Konfabulationen (Erinnerungsfälschungen)',
    englishName: 'Confabulation',
    synonyms: ['Verlegenheitskonfabulation', 'Phantastische Konfabulation', 'Honest Lying'],
    domainId: 'attention_memory',
    amdpCode: 'AMDP 13',
    hpoId: 'HP:0031589',
    icd11SymptomCode: 'MB21.1',
    rdocDomain: 'Cognitive Systems (Declarative Memory & Reality Monitoring)',
    visualArchetype: 'mosaic_patchwork',
    shortVisualTagline: 'Goldene Mosaikbrücken über leeren Gedächtnislücken',
    definition: 'Unbewusstes Auffüllen von bestehenden Gedächtnislücken mit frei erfundenen oder zeitlich verschobenen Einfällen, die der Betroffene selbst im Moment des Erzählens für echte Erinnerungen hält.',
    subjectiveExperience: 'Ohne jede Täuschungsabsicht berichtet man detailliert, man sei heute Morgen im Ministerium gewesen, obwohl man seit Wochen im Krankenbett liegt.',
    neurobiology: 'Läsion des ventromedialen und orbitofrontalen Kortex sowie des anterioren Thalamus und der Corpora mammillaria (Ausfall des vorbewussten Realitäts-Monitorings).',
    wikiTitleDe: 'Konfabulation',
    wikiTitleEn: 'Confabulation',
    pubmedQuery: 'confabulation orbitofrontal cortex mammillary bodies Korsakoff reality monitoring',
    olsSearchTerm: 'confabulation',
    relatedPhenomenaIds: ['disorientation_spacetime', 'deja_vu_jamais_vu', 'delusional_perception'],
    conditions: [
      {
        conditionId: 'stroke_tbi_korsakoff',
        prevalence: 'pathognomonisch',
        specificityScore: 0.95,
        clinicalNote: 'Klassische Trias des Korsakow-Syndroms: Merkfähigkeitsstörung, Desorientiertheit und lebendige Konfabulationen.'
      },
      {
        conditionId: 'alzheimer_ftd',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'Häufig als Verlegenheitskonfabulationen im Früh- und Mittelstadium zur Wahrung der sozialen Fassade.'
      },
      {
        conditionId: 'delirium_sepsis_metabolic',
        prevalence: 'gelegentlich',
        specificityScore: 0.6,
        clinicalNote: 'Flüchtige situative Konfabulationen während des Delirs.'
      }
    ]
  },
  {
    id: 'deja_vu_jamais_vu',
    name: 'Déjà-vu & Jamais-vu (Paramnesien / Vertrautheitsanomalien)',
    englishName: 'Déjà vu & Jamais vu (Paramnesia)',
    synonyms: ['Erinnerungstäuschung', 'Fausse Reconnaissance', 'Entfremdung des Vertrauten'],
    domainId: 'attention_memory',
    amdpCode: 'AMDP 14',
    hpoId: 'HP:0033685',
    icd11SymptomCode: 'MB21.Y',
    rdocDomain: 'Cognitive Systems (Recognition & Familiarity Signals)',
    visualArchetype: 'echo_mirror_loop',
    shortVisualTagline: 'Doppelte Zeitschleife aus vertrautem Echo und fremdem Spiegelbild',
    definition: 'Dissoziation zwischen objektivem Wiedererkennen und subjektivem Vertrautheitsgefühl: Entweder erscheint eine völlig neue Situation unheimlich vertraut (Déjà-vu) oder eine altbekannte Umgebung völlig fremd und wie zum ersten Mal gesehen (Jamais-vu).',
    subjectiveExperience: 'Man betritt einen fremden Platz und spürt mit absoluter Gewissheit, genau diesen Augenblick schon einmal durchlebt zu haben – oder das eigene Wohnzimmer wirkt plötzlich wie eine unbekannte Kulisse.',
    neurobiology: 'Entkopplung zwischen dem perirhinalen Kortex (Vertrautheitssignal / Familiarity) und dem Hippocampus (episodischer Abruf / Recollection).',
    wikiTitleDe: 'Déjà-vu',
    wikiTitleEn: 'Déjà_vu',
    pubmedQuery: 'deja vu jamais vu perirhinal cortex temporal lobe epilepsy familiarity',
    olsSearchTerm: 'memory impairment',
    relatedPhenomenaIds: ['derealization', 'depersonalization', 'olfactory_gustatory_hallucinations'],
    conditions: [
      {
        conditionId: 'temporal_lobe_epilepsy',
        prevalence: 'leitsymptom',
        specificityScore: 0.92,
        clinicalNote: 'Als iktale „Dreamy State“-Aura (Hughlings Jackson) Sekunden vor einem Temporallappenanfall, oft sehr intensiv und stereotyp.'
      },
      {
        conditionId: 'sleep_deprivation_stress_grief',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Tritt bei rund 60–80 % aller gesunden Menschen gelegentlich auf, gehäuft unter Übermüdung und Stress.'
      },
      {
        conditionId: 'dissociative_disorders',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'Jamais-vu als enger Verwandter der Derealisation.'
      },
      {
        conditionId: 'migraine_alice',
        prevalence: 'gelegentlich',
        specificityScore: 0.65,
        clinicalNote: 'Als Teil komplexer sensorischer Migräneauren.'
      }
    ]
  },

  // ============================================================================
  // DOM-04: FORMALE DENK- & SPRACHPHÄNOMENE
  // ============================================================================
  {
    id: 'flight_of_ideas',
    name: 'Ideenflucht & Gedankenrasen (Tachyphrenie)',
    englishName: 'Flight of Ideas & Racing Thoughts',
    synonyms: ['Gedankenjagen', 'Assoziative Auflockerung', 'Rededrang (Logorrhoe)'],
    domainId: 'formal_thought',
    amdpCode: 'AMDP 20',
    hpoId: 'HP:0031588',
    icd11SymptomCode: 'MB25.1',
    rdocDomain: 'Cognitive Systems (Language & Associative Networks)',
    visualArchetype: 'branching_lightning',
    shortVisualTagline: 'Verzweigte Lichtfunken, die im Sekundentakt das Ziel wechseln',
    definition: 'Stark beschleunigter Denkablauf, bei dem ständig neue Einfälle, Klangassoziationen oder Umweltreize den Gedankengang umlenken, sodass das ursprüngliche Denkziel ständig wechselt, die einzelnen Sprünge aber noch einfühlbar bleiben.',
    subjectiveExperience: 'Im Kopf öffnen sich hundert Browser-Tabs gleichzeitig; kaum ist ein Satz begonnen, schießen schon fünf neue brillante Verknüpfungen dazwischen, sodass der Mund den Gedanken kaum folgen kann.',
    neurobiology: 'Dopaminerge und glutamaterge Überaktivierung semantischer Assoziationsnetzwerke bei reduzierter lateraler Hemmung im präfrontalen Kortex.',
    wikiTitleDe: 'Ideenflucht',
    wikiTitleEn: 'Flight_of_ideas',
    pubmedQuery: 'flight of ideas racing thoughts mania ADHD semantic network activation',
    olsSearchTerm: 'flight of ideas',
    relatedPhenomenaIds: ['euphoria_expansive_mood', 'hyperfocus_tunnel', 'incoherence_paralogia'],
    conditions: [
      {
        conditionId: 'bipolar_disorder',
        prevalence: 'pathognomonisch',
        specificityScore: 0.95,
        clinicalNote: 'Kardinalphänomen der manischen und hypomanen Episode, meist gekoppelt mit Logorrhoe (Rededrang).'
      },
      {
        conditionId: 'adhd',
        prevalence: 'leitsymptom',
        specificityScore: 0.85,
        clinicalNote: 'Chronisches inneres „Gedanken-Radio“ mit parallelen, rasch springenden Assoziationsketten, besonders beim Einschlafen.'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Unter Kokain, Amphetaminen oder hohen Koffein-/Kortikosteroiddosen.'
      },
      {
        conditionId: 'thyroid_endocrine',
        prevalence: 'gelegentlich',
        specificityScore: 0.65,
        clinicalNote: 'Bei schwerer Hyperthyreose / thyreotoxischer Krise.'
      }
    ]
  },
  {
    id: 'thought_inhibition_retardation',
    name: 'Denkhemmung & Denkverlangsamung (Bradyphrenie)',
    englishName: 'Inhibited & Retarded Thinking (Bradyphrenia)',
    synonyms: ['Gebremstes Denken', 'Denkerschwerung', 'Gedankenleere'],
    domainId: 'formal_thought',
    amdpCode: 'AMDP 15–16',
    hpoId: 'HP:0033686',
    icd11SymptomCode: 'MB25.2',
    rdocDomain: 'Cognitive Systems (Cognitive Control & Speed)',
    visualArchetype: 'viscous_pendulum',
    shortVisualTagline: 'Uhrwerk in zähem Bernstein gegen unsichtbaren Widerstand',
    definition: 'Das Denken wird von den Betroffenen selbst als mühsam, zähflüssig und wie gegen einen hohen inneren Widerstand (Denkhemmung) oder objektiv stark verlangsamt (Denkverlangsamung) erlebt.',
    subjectiveExperience: 'Jeder einzelne Gedanke muss wie durch zähen Teer oder gegen eine schwere Bleitür geschoben werden; Antworten dauern quälend lange.',
    neurobiology: 'Hypometabolismus im dorsolateralen präfrontalen Kortex und anterioren Cingulum sowie nigrostriatales Dopamindefizit (Bradyphrenie).',
    wikiTitleDe: 'Formale_Denkstörung',
    wikiTitleEn: 'Thought_disorder',
    pubmedQuery: 'bradyphrenia thought retardation depression Parkinson prefrontal hypometabolism',
    olsSearchTerm: 'bradyphrenia',
    relatedPhenomenaIds: ['abulia_drive_inhibition', 'cognitive_dysfunction_brain_fog', 'morning_low_circadian'],
    conditions: [
      {
        conditionId: 'major_depression',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Subjektiv quälende Denkhemmung ist ein klassisches Merkmal der melancholischen Depression.'
      },
      {
        conditionId: 'lewy_body_parkinson',
        prevalence: 'leitsymptom',
        specificityScore: 0.85,
        clinicalNote: 'Subkortikale Bradyphrenie parallel zur motorischen Bradykinese.'
      },
      {
        conditionId: 'thyroid_endocrine',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Ausgeprägte Denkverlangsamung bei manifester Hypothyreose (Myxödem).'
      },
      {
        conditionId: 'medication_neuroleptic_side_effects',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'Als sedierender oder hochpotenter D2-antagonistischer Effekt („Neuroleptische Bremse“).'
      }
    ]
  },
  {
    id: 'thought_blocking_derailment',
    name: 'Gedankenabreißen & Sperrung',
    englishName: 'Thought Blocking',
    synonyms: ['Gedankensperrung', 'Plötzlicher Fadenriss'],
    domainId: 'formal_thought',
    amdpCode: 'AMDP 21',
    hpoId: 'HP:0033687',
    icd11SymptomCode: 'MB25.3',
    rdocDomain: 'Cognitive Systems (Working Memory Maintenance)',
    visualArchetype: 'snapped_thread',
    shortVisualTagline: 'Glatt durchtrennter Leuchtfaden mitten im Satzschwung',
    definition: 'Plötzlicher, für den Betroffenen völlig unerklärlicher Abbruch eines flüssigen Gedankengangs ohne erkennbaren äußeren Anlass bei klarem Bewusstsein; wird das Phänomen im Gespräch sichtbar, spricht man von „Sperrung“.',
    subjectiveExperience: 'Mitten im Sprechen ist der Kopf von einer Sekunde auf die andere komplett leer – als hätte jemand den Stecker gezogen oder die Tafel abgewischt.',
    neurobiology: 'Transiente Unterbrechung thalamokortikaler Synchronisation im Arbeitsgedächtnis oder fokale epileptische Entladung.',
    wikiTitleDe: 'Gedankenabreißen',
    wikiTitleEn: 'Thought_blocking',
    pubmedQuery: 'thought blocking schizophrenia formal thought disorder thalamocortical',
    olsSearchTerm: 'thought disorder',
    relatedPhenomenaIds: ['thought_insertion_withdrawal', 'incoherence_paralogia', 'consciousness_narrowing'],
    conditions: [
      {
        conditionId: 'schizophrenia',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Wird das Gedankenabreißen wahnhaft als „Wegnehmen“ durch äußere Mächte gedeutet, geht es in den Gedankenentzug (Ich-Störung) über.'
      },
      {
        conditionId: 'temporal_lobe_epilepsy',
        prevalence: 'gelegentlich',
        specificityScore: 0.75,
        clinicalNote: 'Differentialdiagnostisch wichtig: Kurze Absence-Anfälle oder fokale Spracharrest-Auren.'
      },
      {
        conditionId: 'sleep_deprivation_stress_grief',
        prevalence: 'gelegentlich',
        specificityScore: 0.6,
        clinicalNote: 'Bei extremer Erschöpfung oder Prüfungsangst („Blackout“) als harmloser Fadenriss.'
      }
    ]
  },
  {
    id: 'incoherence_paralogia',
    name: 'Zerfahrenheit (Inkohärenz), Paralogie & Neologismen',
    englishName: 'Derailment, Incoherence & Neologisms',
    synonyms: ['Assoziationslockerung', 'Wortsalat (Schizophasie)', 'Kontamination', 'Begriffsverschiebung'],
    domainId: 'formal_thought',
    amdpCode: 'AMDP 22–26',
    hpoId: 'HP:0031590',
    icd11SymptomCode: 'MB25.0',
    rdocDomain: 'Cognitive Systems (Language & Semantic Coherence)',
    visualArchetype: 'shattered_syntax',
    shortVisualTagline: 'Kollidierende Bedeutungsfragmente und verschmolzene Wortprismen',
    definition: 'Aufhebung des logischen und grammatikalischen Zusammenhangs von Gedanken und Sätzen bei klarem Bewusstsein (Zerfahrenheit) oder getrübtem Bewusstsein (Inkohärenz), begleitet von Wortneuschöpfungen (Neologismen).',
    subjectiveExperience: 'Worte und Symbole verschmelzen zu neuen Bedeutungsclustern („Seelenzeitmaschine“), weil die gewöhnliche Alltagssprache das Erlebte nicht mehr fassen kann.',
    neurobiology: 'Gestörte funktionelle Konnektivität zwischen Wernicke-Areal, Broca-Areal und präfrontalem Kortex (frontotemporale Diskonnektion).',
    wikiTitleDe: 'Zerfahrenheit',
    wikiTitleEn: 'Derailment_(thought_disorder)',
    pubmedQuery: 'formal thought disorder derailment neologisms frontotemporal connectivity',
    olsSearchTerm: 'incoherence',
    relatedPhenomenaIds: ['flight_of_ideas', 'thought_blocking_derailment', 'delusional_perception'],
    conditions: [
      {
        conditionId: 'schizophrenia',
        prevalence: 'leitsymptom',
        specificityScore: 0.92,
        clinicalNote: 'Nach Eugen Bleuler eines der „Grundsymptome“ (Assoziationslockerung) bei klarem Bewusstsein.'
      },
      {
        conditionId: 'delirium_sepsis_metabolic',
        prevalence: 'leitsymptom',
        specificityScore: 0.85,
        clinicalNote: 'Inkohärentes Denken bei gleichzeitiger Bewusstseinstrübung.'
      },
      {
        conditionId: 'stroke_tbi_korsakoff',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Wichtige Differentialdiagnose: Sensorische Wernicke-Aphasie mit Paraphasien und Jargon-Aphasie nach linkstemporalem Mediainfarkt.'
      }
    ]
  },
  {
    id: 'rumination_perseveration',
    name: 'Grübelzwang (Rumination) & Perseveration',
    englishName: 'Rumination & Perseveration',
    synonyms: ['Gedankenkreisen', 'Haftenbleiben', 'Endlosschleife'],
    domainId: 'formal_thought',
    amdpCode: 'AMDP 17–19',
    hpoId: 'HP:0031591',
    icd11SymptomCode: 'MB25.Y',
    rdocDomain: 'Negative Valence / Cognitive Control (Set Shifting)',
    visualArchetype: 'mobius_spiral',
    shortVisualTagline: 'Endlose Möbius-Schleife um einen dunklen Gravitationskern',
    definition: 'Unablässiges, unproduktives Kreisen der Gedanken um dieselben zumeist negativ getönten Lebensfragen, Fehler oder Sorgen (Grübeln) bzw. das unwillkürliche Klebenbleiben an einem zuvor gefassten Wort oder Gedanken (Perseveration).',
    subjectiveExperience: 'Der Kopf verhakt sich wie eine gesprungene Schallplatte immer wieder in derselben Frage („Warum habe ich das gesagt?“), ohne je zu einer Lösung zu gelangen.',
    neurobiology: 'Hyperkonnektivität des Default Mode Network (DMN, insb. subgenuales anteriores Cingulum sgACC) beiGrübeln; frontostriatale Set-Shifting-Störung bei Perseveration.',
    wikiTitleDe: 'Grübeln',
    wikiTitleEn: 'Rumination_(psychology)',
    pubmedQuery: 'rumination default mode network subgenual cingulate perseveration frontal lobe',
    olsSearchTerm: 'perseveration',
    relatedPhenomenaIds: ['obsessive_thoughts_impulses', 'thought_inhibition_retardation', 'hyperfocus_tunnel'],
    conditions: [
      {
        conditionId: 'major_depression',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Quälendes depressives Grübeln über Schuld, Versagen und Ausweglosigkeit.'
      },
      {
        conditionId: 'panic_anxiety',
        prevalence: 'leitsymptom',
        specificityScore: 0.85,
        clinicalNote: 'Zukunftsbezogenes Sorgen-Kreisen („Was-wäre-wenn“-Ketten) bei der Generalisierten Angststörung.'
      },
      {
        conditionId: 'alzheimer_ftd',
        prevalence: 'haeufig',
        specificityScore: 0.85,
        clinicalNote: 'Echte motorische und verbale Perseveration als Zeichen einer Stirnhirnläsion (Frontotemporale Demenz).'
      },
      {
        conditionId: 'autism_spectrum',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'Kognitives „Looping“ bei ungelösten logischen Widersprüchen oder sozialen Unsicherheiten.'
      }
    ]
  },

  // ============================================================================
  // DOM-05: BEFÜRCHTUNGEN, ZWANGS- & INTRUSIONSPHÄNOMENE
  // ============================================================================
  {
    id: 'obsessive_thoughts_impulses',
    name: 'Zwangsgedanken, Zwangsimpulse & Zwangshandlungen',
    englishName: 'Obsessions, Intrusive Impulses & Compulsions',
    synonyms: ['Ich-dystone Intrusionen', 'Kontrollzwang', 'Kontaminationszwang', 'Magisches Neutralisieren'],
    domainId: 'fears_compulsions',
    amdpCode: 'AMDP 30–32',
    hpoId: 'HP:0000722',
    icd11SymptomCode: 'MB23.4',
    rdocDomain: 'Cognitive Control & Habit Learning Systems (CSTC Loop)',
    visualArchetype: 'interlocking_gears',
    shortVisualTagline: 'Verzahnte Sicherheitszahnräder unter Hochspannung',
    definition: 'Sich immer wieder aufdrängende, als unsinnig oder abstoßend (ich-dyston) erlebte Gedanken, Vorstellungen oder Handlungsimpulse, die starke Angst auslösen und durch ritualisierte Zwangshandlungen oder Zähl-/Kontrollrituale neutralisiert werden müssen.',
    subjectiveExperience: 'Obwohl man genau weiß, dass der Herd ausgeschaltet ist oder man seinem Kind niemals schaden würde, zwingt ein unerträglicher innerer Alarmton zur zwanzigsten Kontrolle.',
    neurobiology: 'Fehlgeschaltete Fehlererkennungs-Signale (Error-Related Negativity) im anterioren Cingulum, Orbitofrontalkortex und Striatum.',
    wikiTitleDe: 'Zwangsstörung',
    wikiTitleEn: 'Intrusive_thought',
    pubmedQuery: 'obsessive compulsive cortico-striato-thalamo-cortical error related negativity',
    olsSearchTerm: 'obsessive-compulsive behavior',
    relatedPhenomenaIds: ['rumination_perseveration', 'premonitory_urge_tics', 'body_dysmorphic_distortion'],
    conditions: [
      {
        conditionId: 'ocd',
        prevalence: 'pathognomonisch',
        specificityScore: 0.98,
        clinicalNote: 'Entscheidend ist der ich-dystone Charakter (der Betroffene erkennt den Gedanken als eigenes, aber übertriebenes Produkt an – im Gegensatz zum Wahn).'
      },
      {
        conditionId: 'tourette_tics',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Hohe Überlappung („Just-Right“-Phänomene und Symmetriezwänge bei über 50 % der Menschen mit Tourette-Syndrom).'
      },
      {
        conditionId: 'anorexia_bdd',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'Ritualisiertes Wiegen, Kalorienzählen und Spiegel-Checking.'
      },
      {
        conditionId: 'autoimmune_encephalitis',
        prevalence: 'gelegentlich',
        specificityScore: 0.65,
        clinicalNote: 'Akut einsetzende Zwänge bei basalganglionärer Autoimmunreaktion (z. B. PANS/PANDAS oder Enzephalitis).'
      }
    ]
  },
  {
    id: 'flashbacks_intrusions',
    name: 'Szenische Intrusionen & Flashbacks (Nachhallerinnerungen)',
    englishName: 'Traumatic Intrusions & Flashbacks',
    synonyms: ['Hypermnesie für Trauma', 'Gegenwarts-Wiedererleben', 'Trigger-Intrusion'],
    domainId: 'fears_compulsions',
    amdpCode: 'AMDP Zusatz Trauma',
    hpoId: 'HP:0033688',
    icd11SymptomCode: 'MB23.Y',
    rdocDomain: 'Negative Valence Systems (Acute Threat & Fear Conditioning)',
    visualArchetype: 'time_shatter_projection',
    shortVisualTagline: 'Vergangenheitssplitter bricht ungefiltert in den Gegenwartsraum ein',
    definition: 'Unwillkürliches, durch Schlüsselreize (Trigger) ausgelöstes Einbrechen sensorisch hochlebendiger Erinnerungsfragmente, die nicht als vergangen erinnert, sondern mit allen Körperempfindungen als im Hier und Jetzt stattfindend wiedererlebt werden.',
    subjectiveExperience: 'Ein bestimmter Geruch oder Knall genügt, und der Zeitstempel erlischt: Man riecht wieder den Rauch, spürt das Herzrasen und ist im Bruchteil einer Sekunde zurück am Ort des Traumas.',
    neurobiology: 'Überstarke implizite Mandelkern-(Amygdala-)Konditionierung bei fehlender deklarativer Zeit-Ort-Einbettung durch den Hippocampus.',
    wikiTitleDe: 'Flashback_(Psychologie)',
    wikiTitleEn: 'Flashback_(psychology)',
    pubmedQuery: 'PTSD flashback amygdala hippocampus sensory intrusion dual representation theory',
    olsSearchTerm: 'post-traumatic stress disorder',
    relatedPhenomenaIds: ['derealization', 'consciousness_narrowing', 'sensory_overload_flooding'],
    conditions: [
      {
        conditionId: 'ptsd_cptsd',
        prevalence: 'pathognomonisch',
        specificityScore: 0.96,
        clinicalNote: 'Leitsymptom der PTBS: Unterscheidet sich von normaler Erinnerung durch das fehlende „Vergangenheits-Etikett“ (Hier-und-Jetzt-Qualität).'
      },
      {
        conditionId: 'borderline_pd',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'Häufig bei komorbider komplexer Traumatisierung unter akutem Bindungsstress.'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'gelegentlich',
        specificityScore: 0.65,
        clinicalNote: 'Als optische Nachhallerinnerung (HPPD – Hallucinogen Persisting Perception Disorder) nach Psychedelika-Konsum.'
      }
    ]
  },

  // ============================================================================
  // DOM-06: INHALTLICHE DENK- & WAHNPHÄNOMENE
  // ============================================================================
  {
    id: 'delusional_mood_salience',
    name: 'Wahnstimmung & Aberrante Salienz (Bedeutungsüberschuss)',
    englishName: 'Delusional Mood (Trema) & Aberrant Salience',
    synonyms: ['Wahnspannung', 'Unheimliche Bedeutungsaufladung', 'Apophänie', 'Trema'],
    domainId: 'delusions',
    amdpCode: 'AMDP 34',
    hpoId: 'HP:0000746',
    icd11SymptomCode: 'MB26.0',
    rdocDomain: 'Positive Valence / Incentive Salience (Dopamine Signaling)',
    visualArchetype: 'glowing_signposts',
    shortVisualTagline: 'Alltagsdinge leuchten wie geheime Chiffren im Halbdunkel',
    definition: 'Diffuses, oft unheimlich-gespanntes Ahnen, dass „etwas in der Luft liegt“ und alltägliche Zufälle eine verborgene, auf die eigene Person gerichtete Bedeutung tragen, noch bevor ein festes Wahnsystem auskristallisiert ist.',
    subjectiveExperience: 'Ein rotes Auto parkt vor dem Haus, der Nachrichtensprecher blinzelt zweimal – nichts ist mehr Zufall, alles fühlt sich wie ein inszeniertes Rätsel an, das nur für mich bestimmt ist.',
    neurobiology: 'Chaotisches, kontextunabhängiges Feuern mesolimbischer Dopamin-Neurone im ventralen Striatum, wodurch neutrale Umweltreize mit „Wichtigkeits-Signalen“ (Salienz) markiert werden (Kapur, 2003).',
    wikiTitleDe: 'Wahn',
    wikiTitleEn: 'Aberrant_salience',
    pubmedQuery: 'aberrant salience delusional mood dopamine striatum psychosis Kapur',
    olsSearchTerm: 'delusion',
    relatedPhenomenaIds: ['delusional_perception', 'persecutory_referential_delusion', 'consciousness_expansion_shift'],
    conditions: [
      {
        conditionId: 'schizophrenia',
        prevalence: 'pathognomonisch',
        specificityScore: 0.94,
        clinicalNote: 'Prodromal- und Initialphase („Trema“ nach Conrad), aus der plötzlich die Wahngewissheit („Apophänie“) entspringt.'
      },
      {
        conditionId: 'autoimmune_encephalitis',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'Häufig in den ersten Tagen einer Anti-NMDA-Rezeptor-Enzephalitis.'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Bei Amphetamin-, Methamphetamin- oder hochpotenter THC-Intoxikation.'
      }
    ]
  },
  {
    id: 'delusional_perception',
    name: 'Wahnwahrnehmung (Zweigliedriges Erstrangphänomen)',
    englishName: 'Delusional Perception',
    synonyms: ['Kurt-Schneider-Erstrangsymptom', 'Unmittelbare Bedeutungsgewissheit'],
    domainId: 'delusions',
    amdpCode: 'AMDP 35',
    hpoId: 'HP:0000746',
    icd11SymptomCode: 'MB26.0',
    rdocDomain: 'Cognitive Systems (Belief Updating & Prediction Error)',
    visualArchetype: 'two_stage_prism',
    shortVisualTagline: 'Reale Sinneswahrnehmung bricht sich in absolute persönliche Offenbarung',
    definition: 'Einer realen, unverfälschten Sinneswahrnehmung wird ohne nachvollziehbare logische oder emotionale Brücke unmittelbar eine abnorme, meist auf die eigene Person bezogene Bedeutung beigelegt.',
    subjectiveExperience: 'Ich sehe, dass die Kirchturmuhr auf drei Uhr steht (reale Wahrnehmung) – und weiß in derselben Sekunde mit unerschütterlicher Gewissheit, dass ich der Auserwählte zur Rettung der Welt bin.',
    neurobiology: 'Aberrante Vorhersagefehler-Signale (Prediction Error) im Zusammenspiel von Striatum, Insula und präfrontalem Kortex.',
    wikiTitleDe: 'Wahnwahrnehmung',
    wikiTitleEn: 'Delusional_perception',
    pubmedQuery: 'delusional perception Kurt Schneider first rank symptom prediction error',
    olsSearchTerm: 'delusion',
    relatedPhenomenaIds: ['delusional_mood_salience', 'persecutory_referential_delusion', 'thought_insertion_withdrawal'],
    conditions: [
      {
        conditionId: 'schizophrenia',
        prevalence: 'pathognomonisch',
        specificityScore: 0.95,
        clinicalNote: 'Erstrangsymptom nach Kurt Schneider bei Ausschluss einer organischen Gehirnerkrankung.'
      },
      {
        conditionId: 'autoimmune_encephalitis',
        prevalence: 'gelegentlich',
        specificityScore: 0.7,
        clinicalNote: 'Kann klinisch ununterscheidbar von einer primären Schizophrenie auftreten.'
      }
    ]
  },
  {
    id: 'persecutory_referential_delusion',
    name: 'Beziehungs-, Verfolgungs- & Größenwahn',
    englishName: 'Referential, Persecutory & Grandiose Delusions',
    synonyms: ['Paranoia', 'Eigenbeziehung', 'Megalomanie', 'Synthym vs. Parathym'],
    domainId: 'delusions',
    amdpCode: 'AMDP 39–46',
    hpoId: 'HP:0000746',
    icd11SymptomCode: 'MB26.05 / MB26.03',
    rdocDomain: 'Cognitive & Social Systems (Threat Attribution)',
    visualArchetype: 'surveillance_eye_crown',
    shortVisualTagline: 'Konzentrische Beobachtungsringe und goldene Projektionskrone',
    definition: 'Unkorrigierbare subjektive Gewissheit, im Mittelpunkt allgemeiner Beobachtung zu stehen (Beziehungswahn), gezielt geschädigt oder überwacht zu werden (Verfolgungswahn) oder über außergewöhnliche Macht und Mission zu verfügen (Größenwahn).',
    subjectiveExperience: 'Fremde Menschen in der U-Bahn sprechen in Codes über mich; Kameras in den Rauchmeldern übertragen mein Leben – oder ich besitze den Schlüssel zur Heilung aller Krankheiten.',
    neurobiology: 'Hyperaktivität des Bedrohungsnetzwerks (Amygdala-Insula-Striatum) kombiniert mit einem „Jumping-to-Conclusions“-Biases im präfrontalen Kortex.',
    wikiTitleDe: 'Verfolgungswahn',
    wikiTitleEn: 'Persecutory_delusion',
    pubmedQuery: 'persecutory delusions jumping to conclusions dopamine paranoia',
    olsSearchTerm: 'paranoid delusion',
    relatedPhenomenaIds: ['delusional_mood_salience', 'auditory_hallucinations_voices', 'euphoria_expansive_mood'],
    conditions: [
      {
        conditionId: 'schizophrenia',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Häufigste Wahnform der paranoiden Schizophrenie.'
      },
      {
        conditionId: 'bipolar_disorder',
        prevalence: 'leitsymptom',
        specificityScore: 0.88,
        clinicalNote: 'In der schweren Manie typischerweise stimmungskongruenter (synthym) Größenwahn.'
      },
      {
        conditionId: 'alzheimer_ftd',
        prevalence: 'haeufig',
        specificityScore: 0.78,
        clinicalNote: 'Bei Demenz häufiger „Bestehlungswahn“ (verlegte Gegenstände werden als gestohlen gedeutet).'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'leitsymptom',
        specificityScore: 0.85,
        clinicalNote: 'Ausgeprägter Verfolgungswahn bei Kokain-, Amphetamin- oder Cannabis-induzierter Psychose.'
      }
    ]
  },
  {
    id: 'cotard_capgras_monothematic_delusions',
    name: 'Nihilistischer Wahn (Cotard) & Doppelgängerwahn (Capgras)',
    englishName: 'Cotard Delusion & Capgras Delusion (Misidentification)',
    synonyms: ['Verneinungswahn', 'Fregoli-Syndrom', 'Personenverkennung', 'Synthym-melancholischer Wahn'],
    domainId: 'delusions',
    amdpCode: 'AMDP 43–44',
    hpoId: 'HP:0000746',
    icd11SymptomCode: 'MB26.07',
    rdocDomain: 'Social Processes / Interoceptive & Facial Affect Integration',
    visualArchetype: 'hollow_silhouette_mask',
    shortVisualTagline: 'Versteinerte Silhouette und identische Doppelgängermaske ohne Resonanz',
    definition: 'Monothematische Wahnphänomene: Beim Cotard-Syndrom die Überzeugung, innerlich abgestorben, verwest oder gar nicht mehr existent zu sein; beim Capgras-Syndrom die Gewissheit, ein nahestehender Mensch sei durch einen identisch aussehenden Doppelgänger ersetzt worden.',
    subjectiveExperience: 'Cotard: „Mein Herz schlägt nicht mehr, ich bin ein wandelnder Leichnam.“ Capgras: „Dieser Mann sieht exakt aus wie mein Ehemann, aber er ist ein Betrüger.“',
    neurobiology: 'Zwei-Faktoren-Modell (Coltheart/Ramachandran): Entkopplung zwischen fusiformem Gesichtsareal (intakte optische Erkennung) und Amygdala/Insula (fehlende autonome emotionale Resonanz) plus rechtsfrontale Realitätsprüfungsstörung.',
    wikiTitleDe: 'Cotard-Syndrom',
    wikiTitleEn: 'Capgras_delusion',
    pubmedQuery: 'Capgras Cotard syndrome two factor theory fusiform amygdala right frontal',
    olsSearchTerm: 'delusion',
    relatedPhenomenaIds: ['feeling_of_feelinglessness', 'prosopagnosia_facial_blindness', 'coenesthesia_bodily_hallucinations'],
    conditions: [
      {
        conditionId: 'major_depression',
        prevalence: 'gelegentlich',
        specificityScore: 0.88,
        clinicalNote: 'Cotard-Syndrom als Extremform der psychotischen Melancholie neben Schuld- und Verarmungswahn.'
      },
      {
        conditionId: 'lewy_body_parkinson',
        prevalence: 'haeufig',
        specificityScore: 0.85,
        clinicalNote: 'Capgras-Syndrom tritt bemerkenswert häufig bei Lewy-Körper-Demenz auf.'
      },
      {
        conditionId: 'stroke_tbi_korsakoff',
        prevalence: 'gelegentlich',
        specificityScore: 0.8,
        clinicalNote: 'Nach rechtshemisphärischen temporoparietalen oder frontalen Läsionen.'
      },
      {
        conditionId: 'schizophrenia',
        prevalence: 'gelegentlich',
        specificityScore: 0.75,
        clinicalNote: 'Im Rahmen bizarrer körperbezogener oder paranoider Wahnsysteme.'
      }
    ]
  },

  // ============================================================================
  // DOM-07: SINNESTÄUSCHUNGEN & WAHRNEHMUNGSPHÄNOMENE
  // ============================================================================
  {
    id: 'auditory_hallucinations_voices',
    name: 'Akustische Halluzinationen (Stimmenhören / Akoasmen)',
    englishName: 'Auditory Verbal Hallucinations (Hearing Voices)',
    synonyms: ['Dialogisierende Stimmen', 'Imperative Stimmen', 'Kommentierende Stimmen', 'Akoasmen'],
    domainId: 'perception',
    amdpCode: 'AMDP 50–51',
    hpoId: 'HP:0008765',
    icd11SymptomCode: 'MB27.20',
    rdocDomain: 'Cognitive Systems (Auditory Perception & Inner Speech)',
    visualArchetype: 'spectral_soundwaves',
    shortVisualTagline: 'Körperlos schwebende Resonanzwellen im akustischen Raum',
    definition: 'Wahrnehmung von Geräuschen (Akoasmen) oder menschlichen Stimmen (Phoneme) ohne entsprechende äußere Schallquelle: als direktes Ansprechen, als Unterhaltung mehrerer Stimmen über die Person (dialogisierend) oder als befehlende (imperative) Stimmen.',
    subjectiveExperience: 'Die Stimmen klingen so real wie eine Person im selben Raum; sie kommentieren jede meiner Handlungen oder diskutieren untereinander in der dritten Person über mich.',
    neurobiology: 'Hyperaktivität des primären und sekundären auditorischen Kortex (Heschl-Querwindung) bei gestörtem Efferenzkopie-Signal (Corollary Discharge) zwischen Broca-Sprachzentrum und Hörkortex – innere Sprache wird nicht als selbstgeneriert erkannt.',
    wikiTitleDe: 'Stimmenhören',
    wikiTitleEn: 'Auditory_hallucination',
    pubmedQuery: 'auditory verbal hallucinations corollary discharge Heschl gyrus inner speech',
    olsSearchTerm: 'auditory hallucinations',
    relatedPhenomenaIds: ['thought_insertion_withdrawal', 'persecutory_referential_delusion', 'hypnagogic_sleep_paralysis'],
    conditions: [
      {
        conditionId: 'schizophrenia',
        prevalence: 'pathognomonisch',
        specificityScore: 0.94,
        clinicalNote: 'Dialogisierende und kommentierende Stimmen zählen zu den Kurt-Schneider-Erstrangsymptomen.'
      },
      {
        conditionId: 'ptsd_cptsd',
        prevalence: 'haeufig',
        specificityScore: 0.78,
        clinicalNote: 'Dissoziatives Stimmenhören (oft Stimmen von Tätern oder inneren Anteilen) wird heute als wichtiges transdiagnostisches Phänomen anerkannt.'
      },
      {
        conditionId: 'borderline_pd',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'Unter Hochstress auftretende abwertende oder kommentierende Stimmen bei rund 30–50 % der Betroffenen.'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'haeufig',
        specificityScore: 0.82,
        clinicalNote: 'Alkoholhalluzinose (oft drohende/beschimpfende Stimmen bei klarem Bewusstsein).'
      },
      {
        conditionId: 'sleep_deprivation_stress_grief',
        prevalence: 'gelegentlich',
        specificityScore: 0.7,
        clinicalNote: 'Etwa 5–10 % der Allgemeinbevölkerung hören im Laufe des Lebens (z. B. beim Einschlafen oder in Trauerphasen) ohne Krankheitswert Stimmen.'
      }
    ]
  },
  {
    id: 'visual_hallucinations_illusions',
    name: 'Optische Halluzinationen, Pseudohalluzinationen & Pareidolien',
    englishName: 'Visual Hallucinations, Pseudohallucinations & Illusions',
    synonyms: ['Szenische Halluzinationen', 'Photome', 'Illusionäre Verkennung', 'Pareidolie'],
    domainId: 'perception',
    amdpCode: 'AMDP 49, 52, 56',
    hpoId: 'HP:0002367',
    icd11SymptomCode: 'MB27.27',
    rdocDomain: 'Cognitive Systems (Visual Perception & Top-Down Priors)',
    visualArchetype: 'prism_silhouette',
    shortVisualTagline: 'Lichtbrechung formt lebendige Gestalten aus Schattenstrukturen',
    definition: 'Spektrum von der Umdeutung realer Reize (Illusion / Pareidolie: ein Mantel im Halbdunkel wird als Mensch gesehen) über als unwirklich durchschaute Trugbilder (Pseudohalluzination) bis zu leibhaftigen optischen Halluzinationen ohne Sehreiz.',
    subjectiveExperience: 'Auf dem Teppichmuster bewegen sich kleine detaillierte Figuren, oder im Sessel sitzt schweigend ein verstorbener Verwandter.',
    neurobiology: 'Imbalance zwischen reduziertem Bottom-Up-Sinnesinput (z. B. Netzhaut oder cholinerges System) und überstarken Top-Down-Erwartungsmodellen im okzipitotemporalen Kortex.',
    wikiTitleDe: 'Optische_Halluzination',
    wikiTitleEn: 'Visual_hallucination',
    pubmedQuery: 'visual hallucinations acetylcholine Lewy body Charles Bonnet top-down perception',
    olsSearchTerm: 'visual hallucinations',
    relatedPhenomenaIds: ['alice_in_wonderland_metamorphopsia', 'consciousness_expansion_shift', 'coenesthesia_bodily_hallucinations'],
    conditions: [
      {
        conditionId: 'lewy_body_parkinson',
        prevalence: 'pathognomonisch',
        specificityScore: 0.94,
        clinicalNote: 'Wiederkehrende, detailreiche optische Halluzinationen (oft Tiere, Kinder oder kleine Personen) sind ein Hauptkriterium der Lewy-Körper-Demenz.'
      },
      {
        conditionId: 'charles_bonnet',
        prevalence: 'pathognomonisch',
        specificityScore: 0.96,
        clinicalNote: 'Reine optische Pseudohalluzinationen bei Sehbehinderung und völlig intakter Kognition.'
      },
      {
        conditionId: 'delirium_sepsis_metabolic',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Optische Halluzinationen und illusionäre Verkennungen dominieren bei organischen Delirien gegenüber akustischen Halluzinationen.'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Fraktale Muster, Farbverschiebungen und Pseudohalluzinationen unter 5-HT2A-Agonisten oder im Alkoholentzugsdelir („weiße Mäuse“).'
      }
    ]
  },
  {
    id: 'olfactory_gustatory_hallucinations',
    name: 'Olfaktorische & Gustatorische Halluzinationen (Phantosmie)',
    englishName: 'Olfactory & Gustatory Hallucinations (Phantosmia)',
    synonyms: ['Geruchshalluzination', 'Geschmackshalluzination', 'Uncinate Fits'],
    domainId: 'perception',
    amdpCode: 'AMDP 54',
    hpoId: 'HP:0031592',
    icd11SymptomCode: 'MB27.24',
    rdocDomain: 'Cognitive Systems (Olfactory & Limbic Perception)',
    visualArchetype: 'vapor_sensor_waves',
    shortVisualTagline: 'Unsichtbare Duft- und Rauchschleier im limbischen Raum',
    definition: 'Wahrnehmung von zumeist unangenehmen Gerüchen (verbranntes Gummi, Rauch, Verwesung, Gas, Chemie) oder metallisch-bitteren Geschmäckern ohne reale chemische Reizquelle.',
    subjectiveExperience: 'Plötzlich steigt ein beißender Geruch nach verbranntem Kabel oder Schwefel in die Nase, obwohl niemand sonst im Raum etwas riecht.',
    neurobiology: 'Direkte Erregung des primären olfaktorischen Kortex (Uncus, Gyrus parahippocampalis, Amygdala) ohne thalamische Verschaltung.',
    wikiTitleDe: 'Phantosmie',
    wikiTitleEn: 'Phantosmia',
    pubmedQuery: 'olfactory hallucinations uncinate fits temporal lobe epilepsy phantosmia',
    olsSearchTerm: 'olfactory hallucinations',
    relatedPhenomenaIds: ['deja_vu_jamais_vu', 'persecutory_referential_delusion', 'coenesthesia_bodily_hallucinations'],
    conditions: [
      {
        conditionId: 'temporal_lobe_epilepsy',
        prevalence: 'pathognomonisch',
        specificityScore: 0.93,
        clinicalNote: 'Klassische „Uncinate Fits“ (Hughlings Jackson): Kurze Aura von verbranntem Gummi oder Rauch bei Läsion oder Anfall im Uncus.'
      },
      {
        conditionId: 'schizophrenia',
        prevalence: 'gelegentlich',
        specificityScore: 0.75,
        clinicalNote: 'Häufig verknüpft mit Vergiftungswahn (Essen schmeckt „vergiftet“) oder Eigengeruchswahn.'
      },
      {
        conditionId: 'mecfs_longcovid_pots',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Postvirale Parosmie und Phantosmie (oft Rauch- oder Abwassergeruch) durch Regeneration des Riechepithels und Bulbus olfactorius.'
      },
      {
        conditionId: 'migraine_alice',
        prevalence: 'selten',
        specificityScore: 0.65,
        clinicalNote: 'Seltene olfaktorische Migräneaura vor Einsetzen des Kopfschmerzes.'
      }
    ]
  },
  {
    id: 'coenesthesia_bodily_hallucinations',
    name: 'Zönästhesien, Leibhalluzinationen & Taktile Halluzinationen (Formikationen)',
    englishName: 'Coenesthesia, Somatic Hallucinations & Formication',
    synonyms: ['Leibgefühlsstörungen', 'Dermatozoen-Erleben', 'Elektrisierende Körperströme'],
    domainId: 'perception',
    amdpCode: 'AMDP 53, 55',
    hpoId: 'HP:0031593',
    icd11SymptomCode: 'MB27.26',
    rdocDomain: 'Sensorimotor & Interoceptive Systems',
    visualArchetype: 'bioelectric_body_mesh',
    shortVisualTagline: 'Bioelektrische Interferenzlinien und kribbelnde Oberflächenfelder',
    definition: 'Qualitativ fremdartige, oft als von außen „gemacht“ erlebte Körperempfindungen (Zönästhesien wie innere Versteinerung, Organverschiebung, Bestrahlung) oder taktile Halluzinationen wie das Gefühl krabbelnder Insekten unter der Haut (Formikationen).',
    subjectiveExperience: 'Es fühlt sich an, als würden elektrische Ströme durch das Rückenmark gejagt, das Gehirn im Schädel schrumpfen oder winzige Käfer unter der Haut wandern.',
    neurobiology: 'Dysfunktion im somatosensorischen Kortex (S1/S2), posterioren Parietalkortex und der posterioren Insula bzw. periphere/zentrale Deafferentierung.',
    wikiTitleDe: 'Zönästhesie',
    wikiTitleEn: 'Cenesthesia',
    pubmedQuery: 'cenesthesia somatic hallucinations formication insula somatosensory cortex',
    olsSearchTerm: 'tactile hallucinations',
    relatedPhenomenaIds: ['thought_insertion_withdrawal', 'cotard_capgras_monothematic_delusions', 'somatization_functional_dissociation'],
    conditions: [
      {
        conditionId: 'schizophrenia',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Zönästhetische Schizophrenie (Huber); Leibhalluzinationen mit Gemachtheits-Charakter zählen zu den Erstrangsymptomen.'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Taktile Formikationen („Kokain-Käfer“ / Magnan-Zeichen) bei Kokain-/Amphetaminintoxikation und im Alkoholentzugsdelir.'
      },
      {
        conditionId: 'b12_iron_deficiency',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Wichtige organische Differentialdiagnose: Funikuläre Myelose und Polyneuropathie verursachen reale Parästhesien und Elektrisieren (Lhermitte-Zeichen).'
      },
      {
        conditionId: 'lewy_body_parkinson',
        prevalence: 'gelegentlich',
        specificityScore: 0.7,
        clinicalNote: 'Taktile Halluzinationen und sekundärer Dermatozoenwahn bei neurodegenerativen Erkrankungen.'
      }
    ]
  }
];
