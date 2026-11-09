export type HistoricalEpochId =
  | 'antiquity'
  | 'enlightenment'
  | 'nineteenth_century'
  | 'classical_phenomenology'
  | 'amdp_schneider'
  | 'operational_cns'
  | 'rdoc_modern';

export interface HistoricalEpoch {
  id: HistoricalEpochId;
  order: number;
  roman: string;
  shortTitle: string;
  title: string;
  eraRange: string;
  startYear: number;
  endYear: number;
  keyYearLabel: string;
  color: string;
  accentColor: string;
  pioneers: string;
  paradigmSummary: string;
  classificationMilestone: string;
  representativeIds: string[];
}

export interface EntityHistoricalMeta {
  entityId: string;
  entityType: 'phenomenon' | 'condition';
  epochId: HistoricalEpochId;
  yearLabel: string;
  yearNumeric: number;
  pioneer: string;
  historicalTerm: string;
  rdocPillar:
    | 'Negative Valence'
    | 'Positive Valence'
    | 'Cognitive Systems'
    | 'Social Processes'
    | 'Arousal & Regulatory'
    | 'Sensorimotor Systems';
  evolutionSummary: string;
  /** Earlier historical phenomenon/condition IDs from which this concept evolved */
  precursorIds?: string[];
}

export interface RdocMatrixPillar {
  id: EntityHistoricalMeta['rdocPillar'];
  germanTitle: string;
  shortCode: string;
  color: string;
  circuits: string;
}

export const RDOC_MATRIX_PILLARS: RdocMatrixPillar[] = [
  {
    id: 'Negative Valence',
    germanTitle: 'Negative Valenz-Systeme (Bedrohung, Angst, Verlust)',
    shortCode: 'RDoC-NV',
    color: '#F43F5E',
    circuits: 'Amygdala · Bed-Nucleus · Periaquäduktales Grau · Insula'
  },
  {
    id: 'Positive Valence',
    germanTitle: 'Positive Valenz-Systeme (Belohnung, Antrieb, Habit)',
    shortCode: 'RDoC-PV',
    color: '#F59E0B',
    circuits: 'Ventrales Striatum (Nucleus accumbens) · VTA · Orbitofrontaler Kortex'
  },
  {
    id: 'Cognitive Systems',
    germanTitle: 'Kognitive Systeme (Aufmerksamkeit, Wahrnehmung, Arbeitsgedächtnis)',
    shortCode: 'RDoC-CS',
    color: '#38BDF8',
    circuits: 'DLPFC · Hippocampus · Temporoparietaler Kortex · Thalamus'
  },
  {
    id: 'Social Processes',
    germanTitle: 'Soziale Prozesse (Affiliation, Selbst-/Fremdwahrnehmung, Kommunikation)',
    shortCode: 'RDoC-SP',
    color: '#EC4899',
    circuits: 'mPFC · Temporoparietale Übergangszone (TPJ) · Gyrus fusiformis'
  },
  {
    id: 'Arousal & Regulatory',
    germanTitle: 'Arousal & Regulatorische Systeme (Vigilanz, Zirkadianik, Schlaf-Wach)',
    shortCode: 'RDoC-AR',
    color: '#6366F1',
    circuits: 'ARAS · Nucleus suprachiasmaticus (SCN) · Hypothalamus (Orexin)'
  },
  {
    id: 'Sensorimotor Systems',
    germanTitle: 'Sensomotorische Systeme (Handlungsinitiierung, Efferenzkopie, Motorik)',
    shortCode: 'RDoC-SM',
    color: '#10B981',
    circuits: 'Basalganglien-Thalamokortikale Schleifen · SMA · Kleinhirn'
  }
];

export const HISTORICAL_EPOCHS: HistoricalEpoch[] = [
  {
    id: 'antiquity',
    order: 0,
    roman: 'I',
    shortTitle: 'Antike Melancholie',
    title: 'Antike Melancholie, Mania, Phrenitis & Humoralpathologie',
    eraRange: '460 v. Chr. – 200 n. Chr.',
    startYear: -460,
    endYear: 200,
    keyYearLabel: '400 v. Chr.',
    color: '#F59E0B',
    accentColor: '#FDE68A',
    pioneers: 'Hippokrates von Kos · Aretaeus von Kappadokien · Galen von Pergamon · Celsus',
    paradigmSummary:
      'Ablösung dämonologischer Erklärungen durch die Vier-Säfte-Lehre: Überschuss an Schwarzer Galle (Melaina chole) erzeugt Schwermut, Denkhemmung und Furcht; fieberhafte Phrenitis trübt das Bewusstsein; Aretaeus erkennt bereits den zyklischen Umschlag zwischen Melancholie und Manie.',
    classificationMilestone: 'Corpus Hippocraticum · Humoralpathologie (Melancholia / Mania / Phrenitis / Morbus Sacer)',
    representativeIds: [
      'major_depression',
      'thought_inhibition_retardation',
      'euphoria_expansive_mood',
      'quantitative_vigilance_reduction',
      'bipolar_disorder',
      'temporal_lobe_epilepsy'
    ]
  },
  {
    id: 'enlightenment',
    order: 1,
    roman: 'II',
    shortTitle: 'Aufklärung & Nosologie',
    title: 'Aufklärung, Moral Treatment & Frühe Sinnes-Nosologie',
    eraRange: '1621 – 1838',
    startYear: 1621,
    endYear: 1838,
    keyYearLabel: '1760 – 1817',
    color: '#FB923C',
    accentColor: '#FED7AA',
    pioneers: 'Robert Burton (1621) · Charles Bonnet (1760) · Philippe Pinel (1801) · Jean-Étienne Esquirol (1817)',
    paradigmSummary:
      'Befreiung aus den Ketten (Pinel) und präzise klinische Beobachtung: Charles Bonnet beschreibt komplexe optische Trugwahrnehmungen bei Erblindeten (1760); Esquirol trennt erstmals scharf zwischen objektloser Halluzination und verfälschter Illusion (1817) sowie Monomanien (Zwang).',
    classificationMilestone: 'Pinels Nosographie Philosophique (1798) & Esquirols Des Maladies Mentales (1838)',
    representativeIds: [
      'visual_hallucinations_illusions',
      'auditory_hallucinations_voices',
      'charles_bonnet',
      'obsessive_thoughts_impulses',
      'persecutory_referential_delusion'
    ]
  },
  {
    id: 'nineteenth_century',
    order: 2,
    roman: 'III',
    shortTitle: 'Klassische Neuropsychiatrie',
    title: 'Gehirnpathologie, Katatonie, Dissoziation & Kraepelins Dichotomie',
    eraRange: '1845 – 1899',
    startYear: 1845,
    endYear: 1899,
    keyYearLabel: '1874 – 1899',
    color: '#EC4899',
    accentColor: '#FBCFE8',
    pioneers: 'Wilhelm Griesinger · Karl Kahlbaum · Jules Cotard · Sergei Korsakow · Pierre Janet · Emil Kraepelin',
    paradigmSummary:
      '„Geisteskrankheiten sind Gehirnkrankheiten“ (Griesinger 1845): Kahlbaum prägt die Katatonie (1874), Cotard den nihilistischen Wahn (1880), Korsakow die amnestische Konfabulation (1889), Janet & Ribot erforschen Dissoziation und Anhedonie, und Kraepelin ordnet die Psychiatrie nach Längsschnittverläufen (1899).',
    classificationMilestone: 'Kraepelins 6. Auflage (1899): Dementia praecox vs. Manisch-depressives Irresein',
    representativeIds: [
      'catatonia_stupor_mutism',
      'cotard_capgras_monothematic_delusions',
      'confabulation',
      'anhedonia_loss_of_pleasure',
      'depersonalization',
      'tourette_tics'
    ]
  },
  {
    id: 'classical_phenomenology',
    order: 3,
    roman: 'IV',
    shortTitle: 'Heidelberger Phänomenologie',
    title: 'Karl Jaspers, Eugen Bleuler & Die Geburt der Phänomenologie',
    eraRange: '1908 – 1935',
    startYear: 1908,
    endYear: 1935,
    keyYearLabel: '1911 – 1913',
    color: '#A855F7',
    accentColor: '#E9D5FF',
    pioneers: 'Karl Jaspers (1913) · Eugen Bleuler (1911) · Eugène Minkowski · Joseph Capgras (1923)',
    paradigmSummary:
      'Meilenstein 1913: Karl Jaspers begründet mit seiner „Allgemeinen Psychopathologie“ die präzise Phänomenologie des subjektiven Innen-Erlebens (Form vs. Inhalt, Verstehen vs. Erklären, primärer Wahn). Eugen Bleuler prägt 1908/1911 „Schizophrenie“, Ambivalenz, Autismus und Assoziationslockerung.',
    classificationMilestone: 'Jaspers’ Allgemeine Psychopathologie (1913) & Bleulers Gruppe der Schizophrenien (1911)',
    representativeIds: [
      'delusional_perception',
      'delusional_mood_salience',
      'ambivalence_affective_volitional',
      'incoherence_paralogia',
      'feeling_of_feelinglessness',
      'schizophrenia'
    ]
  },
  {
    id: 'amdp_schneider',
    order: 4,
    roman: 'V',
    shortTitle: 'Schneider & AMDP-System',
    title: 'Kurt Schneiders Erstrangsymptome, Gestaltpsychiatrie & AMDP-Standard',
    eraRange: '1939 – 1979',
    startYear: 1939,
    endYear: 1979,
    keyYearLabel: '1950 – 1971',
    color: '#38BDF8',
    accentColor: '#BAE6FD',
    pioneers: 'Kurt Schneider (1939/1950) · Klaus Conrad (1958) · Leo Kanner & Hans Asperger (1943/44) · AMDP (1965)',
    paradigmSummary:
      'Kurt Schneider definiert die Permeabilität der Ich-Umwelt-Schranke (Ich-Störungen & dialogisierende Stimmen); Klaus Conrad analysiert Trema und Apophänie (1958); Todd beschreibt das Alice-im-Wunderland-Syndrom (1955), Sifneos die Alexithymie (1973), und das AMDP-System standardisiert über 100 Einzelphänomene.',
    classificationMilestone: 'Kurt Schneiders Klinische Psychopathologie (1950) & Gründung des AMDP-Systems (1965/1971)',
    representativeIds: [
      'thought_insertion_withdrawal',
      'alice_in_wonderland_metamorphopsia',
      'alexithymia_interoception',
      'prosopagnosia_facial_blindness',
      'splitting_black_white',
      'morning_low_circadian'
    ]
  },
  {
    id: 'operational_cns',
    order: 5,
    roman: 'VI',
    shortTitle: 'DSM/ICD & Kognitive Wende',
    title: 'Operationalisierte Diagnostik, Neuroimaging & Autoimmun-Psychiatrie',
    eraRange: '1980 – 2009',
    startYear: 1980,
    endYear: 2009,
    keyYearLabel: '1980 – 2007',
    color: '#6366F1',
    accentColor: '#C7D2FE',
    pioneers: 'DSM-III / ICD-10 · Judith Herman (PTBS) · Russell Barkley (ADHS) · Shitij Kapur (2003) · Josep Dalmau (2007)',
    paradigmSummary:
      'Operationalisierung von PTBS-Flashbacks (1980) und Exekutiver Dysfunktion (Barkley 1997); Shitij Kapur verbindet Jaspers’ Wahnstimmung mit dopaminerger „Aberrant Salience“ (2003); Josep Dalmau entdeckt 2007 die Anti-NMDA-Rezeptor-Enzephalitis als heilbare Ursache schwerster Psychosen und Katatonien.',
    classificationMilestone: 'DSM-III/IV & ICD-10 · Dopamin-Salienz-Modell (2003) · Anti-NMDA-Enzephalitis (2007)',
    representativeIds: [
      'flashbacks_intrusions',
      'executive_paralysis',
      'premonitory_urge_tics',
      'autoimmune_encephalitis',
      'ptsd_cptsd',
      'adhd'
    ]
  },
  {
    id: 'rdoc_modern',
    order: 6,
    roman: 'VII',
    shortTitle: 'Moderne RDoC & Neurodivergenz',
    title: 'NIMH RDoC-Matrix, Neurodivergenz-Paradigma, ICD-11 & HiTOP',
    eraRange: '2010 – Heute',
    startYear: 2010,
    endYear: 2026,
    keyYearLabel: '2010 – 2026',
    color: '#10B981',
    accentColor: '#A7F3D0',
    pioneers: 'Thomas Insel & Bruce Cuthbert (NIMH RDoC 2010) · Dinah Murray · Damian Milton (2012) · WHO ICD-11',
    paradigmSummary:
      'Paradigmenwechsel von isolierten Diagnoseschubladen hin zu transdiagnostischen Biobehavioralen Systemen (NIMH RDoC: 6 Domänen von Molekülen bis zum Selbstbericht) sowie partizipativer Neurodivergenz-Forschung (Monotropismus, Double-Empathy, Stimming, Masking) und Neuroimmunologie (ME/CFS, Long-COVID).',
    classificationMilestone: 'NIMH RDoC Framework (2010–Heute) · WHO ICD-11 (2022) · HiTOP & Precision Psychiatry',
    representativeIds: [
      'double_empathy_social_semiotics',
      'hyperfocus_tunnel',
      'sensory_overload_flooding',
      'autistic_meltdown_shutdown',
      'masking_camouflaging',
      'rejection_sensitive_dysphoria',
      'mecfs_longcovid_pots'
    ]
  }
];

export const PHENOMENON_HISTORICAL_META: Record<string, EntityHistoricalMeta> = {
  // === EPOCHE I: ANTIKE MELANCHOLIE & HUMORALPATHOLOGIE (460 v. Chr. - 200 n. Chr.) ===
  quantitative_vigilance_reduction: {
    entityId: 'quantitative_vigilance_reduction',
    entityType: 'phenomenon',
    epochId: 'antiquity',
    yearLabel: '400 v. Chr.',
    yearNumeric: -400,
    pioneer: 'Hippokrates von Kos & Galen (Lethargus / Coma)',
    historicalTerm: 'Lethargus & Carus (Fieberhafte Bewusstseinstrübung)',
    rdocPillar: 'Arousal & Regulatory',
    evolutionSummary:
      'Bereits im Corpus Hippocraticum als „Lethargus“ und „Coma“ bei Phrenitis beschrieben; heute im RDoC als Dysfunktion des aufsteigenden retikulären Aktivierungssystems (ARAS) klassifiziert.'
  },
  disorientation_spacetime: {
    entityId: 'disorientation_spacetime',
    entityType: 'phenomenon',
    epochId: 'antiquity',
    yearLabel: '100 n. Chr.',
    yearNumeric: 100,
    pioneer: 'Celsus & Aretaeus von Kappadokien (Phrenitis)',
    historicalTerm: 'Delirium & Paraphrosyne',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Celsus führte im 1. Jh. n. Chr. den Begriff „Delirium“ („aus der Ackerfurche geraten“) für akute Verwirrtheit und Desorientierung bei Fieber ein.'
  },
  flight_of_ideas: {
    entityId: 'flight_of_ideas',
    entityType: 'phenomenon',
    epochId: 'antiquity',
    yearLabel: '150 n. Chr.',
    yearNumeric: 150,
    pioneer: 'Aretaeus von Kappadokien & Emil Kraepelin (1899)',
    historicalTerm: 'Furor Maniacus / Ideenflucht',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Aretaeus beschrieb den sprunghaften, überschäumenden Gedankenstrom der Mania als Gegenpol zur Melancholie; Kraepelin und Liepmann (1904) analysierten ihn später als Störung der Obervorstellung.'
  },
  thought_inhibition_retardation: {
    entityId: 'thought_inhibition_retardation',
    entityType: 'phenomenon',
    epochId: 'antiquity',
    yearLabel: '400 v. Chr.',
    yearNumeric: -400,
    pioneer: 'Hippokrates & Aristoteles (Problemata XXX, 1)',
    historicalTerm: 'Melancholische Erstarrung (Schwarze Galle / Kälte)',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'In der antiken Humoralpathologie galt das „Erkalten und Eindicken der Schwarzen Galle“ als Ursache des zähflüssigen, gebremsten Denkens in der Melancholie.'
  },
  euphoria_expansive_mood: {
    entityId: 'euphoria_expansive_mood',
    entityType: 'phenomenon',
    epochId: 'antiquity',
    yearLabel: '150 n. Chr.',
    yearNumeric: 150,
    pioneer: 'Aretaeus von Kappadokien',
    historicalTerm: 'Mania (Rauschhafte Heiterkeit & Zorn)',
    rdocPillar: 'Positive Valence',
    evolutionSummary:
      'Aretaeus erkannte bereits im 2. Jahrhundert n. Chr., dass Manie und Melancholie zwei Phasen derselben Grundkrankheit sind.'
  },
  psychomotor_agitation_hyperkinesia: {
    entityId: 'psychomotor_agitation_hyperkinesia',
    entityType: 'phenomenon',
    epochId: 'antiquity',
    yearLabel: '380 v. Chr.',
    yearNumeric: -380,
    pioneer: 'Hippokrates (Phrenitis & Krokydismos)',
    historicalTerm: 'Agitatio & Flockenlesen (Karphologie)',
    rdocPillar: 'Sensorimotor Systems',
    evolutionSummary:
      'Die hippokratische Schule beschrieb motorische Rastlosigkeit und nestelnde Bewegungen als kritische Zeichen akuter Hirn- und Fieberprozesse.'
  },
  hypnagogic_sleep_paralysis: {
    entityId: 'hypnagogic_sleep_paralysis',
    entityType: 'phenomenon',
    epochId: 'antiquity',
    yearLabel: '180 n. Chr.',
    yearNumeric: 180,
    pioneer: 'Galen von Pergamon & Alfred Maury (1848)',
    historicalTerm: 'Ephialtes / Incubus (Nachtmahr)',
    rdocPillar: 'Arousal & Regulatory',
    evolutionSummary:
      'Von Galen als „Ephialtes“ (physiologischer Alpdruck beim Einschlafen) entmystifiziert, 1848 von Maury als „hypnagoge Halluzination“ benannt und heute als REM-Schlaf-Intrusion verstanden.'
  },

  // === EPOCHE II: AUFKLÄRUNG, MORAL TREATMENT & FRÜHE NOSOLOGIE (1621 - 1838) ===
  rumination_perseveration: {
    entityId: 'rumination_perseveration',
    entityType: 'phenomenon',
    epochId: 'enlightenment',
    yearLabel: '1621',
    yearNumeric: 1621,
    pioneer: 'Robert Burton (The Anatomy of Melancholy)',
    historicalTerm: 'Melancholisches Grübeln & Fixierte Sorge',
    rdocPillar: 'Negative Valence',
    evolutionSummary:
      'Robert Burton analysierte 1621 in seinem enzyklopädischen Werk das endlose, selbstverstärkende Kreisen um Kummer und Furcht als Kernprozess der Melancholie; heute als Default-Mode-Network-Hyperkonnektivität im RDoC verankert.',
    precursorIds: ['thought_inhibition_retardation']
  },
  obsessive_thoughts_impulses: {
    entityId: 'obsessive_thoughts_impulses',
    entityType: 'phenomenon',
    epochId: 'enlightenment',
    yearLabel: '1838',
    yearNumeric: 1838,
    pioneer: 'Jean-Étienne Esquirol & Carl Westphal (1877)',
    historicalTerm: 'Monomanie raisonnante / Zwangsvorstellung',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Esquirol beschrieb 1838 die „Monomanie raisonnante“ (unwiderstehliche Impulse bei erhaltener Vernunftkritik), die Westphal 1877 als „Zwangsvorstellungen“ präzisierte.'
  },
  persecutory_referential_delusion: {
    entityId: 'persecutory_referential_delusion',
    entityType: 'phenomenon',
    epochId: 'enlightenment',
    yearLabel: '1801',
    yearNumeric: 1801,
    pioneer: 'Philippe Pinel & Ernst蔡 Lasègue (1852)',
    historicalTerm: 'Délire de persécution (Verfolgungswahn)',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Pinel und Esquirol lösten den umschriebenen Verfolgungswahn aus dem globalen Wahnsinnsbegriff heraus; Lasègue definierte 1852 systematisch das „Délire de persécution“.'
  },
  auditory_hallucinations_voices: {
    entityId: 'auditory_hallucinations_voices',
    entityType: 'phenomenon',
    epochId: 'enlightenment',
    yearLabel: '1817',
    yearNumeric: 1817,
    pioneer: 'Jean-Étienne Esquirol (1817)',
    historicalTerm: 'Hallucinations de l’ouïe (Wahrnehmung ohne Objekt)',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Esquirol prägte 1817 die moderne medizinische Definition der Halluzination als „Überzeugung einer Sinneswahrnehmung ohne äußeres Reizobjekt“ – mit dem Stimmenhören als häufigster Form.'
  },
  visual_hallucinations_illusions: {
    entityId: 'visual_hallucinations_illusions',
    entityType: 'phenomenon',
    epochId: 'enlightenment',
    yearLabel: '1760',
    yearNumeric: 1760,
    pioneer: 'Charles Bonnet (1760) & Jean-Étienne Esquirol',
    historicalTerm: 'Visionen & Optische Trugwahrnehmungen',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Der Naturforscher Charles Bonnet dokumentierte 1760 erstmals komplexe visuelle Halluzinationen bei seinem geistig völlig gesunden, erblindeten Großvater (Deafferenzierungs-Release).'
  },

  // === EPOCHE III: KLASSISCHE NEUROPSYCHIATRIE & GEHIRNPATHOLOGIE (1845 - 1899) ===
  consciousness_narrowing: {
    entityId: 'consciousness_narrowing',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1889',
    yearNumeric: 1889,
    pioneer: 'Pierre Janet (Rétrécissement du champ de la conscience)',
    historicalTerm: 'Einengung des Bewusstseinsfeldes',
    rdocPillar: 'Arousal & Regulatory',
    evolutionSummary:
      'Pierre Janet führte 1889 die „Einengung des Bewusstseinsfeldes“ als Schlüsselmechanismus für posttraumatische Dämmerzustände und Dissoziation ein.',
    precursorIds: ['quantitative_vigilance_reduction']
  },
  confabulation: {
    entityId: 'confabulation',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1889',
    yearNumeric: 1889,
    pioneer: 'Sergei Korsakow (1889) & Karl Bonhoeffer (1901)',
    historicalTerm: 'Pseudoreminiszenzen & Konfabulation',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Sergei Korsakow beschrieb 1889 beim amnestischen Psychosyndrom das unbewusste Auffüllen von Gedächtnislücken durch scheinbar erlebte Episoden.',
    precursorIds: ['disorientation_spacetime']
  },
  deja_vu_jamais_vu: {
    entityId: 'deja_vu_jamais_vu',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1876',
    yearNumeric: 1876,
    pioneer: 'Émile Boirac (1876) & John Hughlings Jackson (1888)',
    historicalTerm: 'Sentiment du déjà-vu / Dreamy State',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      '1876 von Boirac benannt und 1888 vom Neurologen Hughlings Jackson als charakteristische iktale Aura („dreamy state“) des medialen Temporallappens lokalisiert.'
  },
  cotard_capgras_monothematic_delusions: {
    entityId: 'cotard_capgras_monothematic_delusions',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1880',
    yearNumeric: 1880,
    pioneer: 'Jules Cotard (1880) & Joseph Capgras (1923)',
    historicalTerm: 'Délire des négations (Nihilistischer Wahn)',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Jules Cotard stellte 1880 in Paris das „Délire des négations“ vor (Überzeugung, nicht mehr zu existieren oder innerlich abgestorben zu sein); heute als Zwei-Faktoren-Entkopplung von affektiver Autonomiereaktion und Überzeugungsprüfung verstanden.',
    precursorIds: ['persecutory_referential_delusion']
  },
  olfactory_gustatory_hallucinations: {
    entityId: 'olfactory_gustatory_hallucinations',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1889',
    yearNumeric: 1889,
    pioneer: 'John Hughlings Jackson (Uncinate Fits)',
    historicalTerm: 'Uncinate Fits (Olfaktorische Temporallappen-Aura)',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Hughlings Jackson wies 1889 nach, dass plötzliche Geruchs- und Geschmackshalluzinationen durch epileptische Entladungen im Uncus hippocampi entstehen.',
    precursorIds: ['visual_hallucinations_illusions']
  },
  coenesthesia_bodily_hallucinations: {
    entityId: 'coenesthesia_bodily_hallucinations',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1846',
    yearNumeric: 1846,
    pioneer: 'Johann Christian Reil & Jules Séglas / Gerd Huber (1957)',
    historicalTerm: 'Zönästhesie (Gemeingefühl-Störungen)',
    rdocPillar: 'Sensorimotor Systems',
    evolutionSummary:
      'Aufbauend auf Reils Begriff des „Gemeingefühls“ (Coenästhesie) beschrieben französische und deutsche Psychiater bizarre Leibempfindungen, die Gerd Huber 1957 als zönästhetische Schizophrenie-Subform systematisierte.'
  },
  depersonalization: {
    entityId: 'depersonalization',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1898',
    yearNumeric: 1898,
    pioneer: 'Ludovic Dugas (1898) & Krishaber (1873)',
    historicalTerm: 'Dépersonnalisation (Entfremdung des Selbst)',
    rdocPillar: 'Social Processes',
    evolutionSummary:
      'Nach Amiels Tagebüchern prägte Ludovic Dugas 1898 den Fachbegriff „Dépersonnalisation“ für das Erleben, den eigenen Gedanken und dem eigenen Körper wie ein fremder Beobachter gegenüberzustehen.'
  },
  anhedonia_loss_of_pleasure: {
    entityId: 'anhedonia_loss_of_pleasure',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1896',
    yearNumeric: 1896,
    pioneer: 'Théodule Ribot (1896)',
    historicalTerm: 'Anhédonie (Unfähigkeit zur Freude)',
    rdocPillar: 'Positive Valence',
    evolutionSummary:
      'Der französische Psychologe Théodule Ribot schuf 1896 den Begriff „Anhédonie“ in Analogie zur Analgesie; im modernen RDoC ist sie das Leitkonstrukt der „Positive Valence Systems“ (antizipatorische vs. konsumatorische Belohnungsverarbeitung).',
    precursorIds: ['thought_inhibition_retardation']
  },
  abulia_drive_inhibition: {
    entityId: 'abulia_drive_inhibition',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1883',
    yearNumeric: 1883,
    pioneer: 'Théodule Ribot (Les Maladies de la Volonté 1883)',
    historicalTerm: 'Aboulie (Willens- und Antriebslähmung)',
    rdocPillar: 'Positive Valence',
    evolutionSummary:
      'Ribot widmete 1883 eine ganze Monographie den „Krankheiten des Willens“ (Abulie): die Patienten wissen genau, was zu tun ist, doch der motorische Startimpuls bleibt aus.',
    precursorIds: ['thought_inhibition_retardation']
  },
  catatonia_stupor_mutism: {
    entityId: 'catatonia_stupor_mutism',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1874',
    yearNumeric: 1874,
    pioneer: 'Karl Ludwig Kahlbaum (Die Katatonie 1874)',
    historicalTerm: 'Spannungsirresein (Stupor, Mutismus & Flexibilitas cerea)',
    rdocPillar: 'Sensorimotor Systems',
    evolutionSummary:
      'Karl Kahlbaum beschrieb 1874 in Görlitz die Katatonie als eigenständiges psychomotorisches Syndrom; während Kraepelin sie der Schizophrenie zuordnete, führten DSM-5, ICD-11 und RDoC sie wieder als transdiagnostisches Sensomotorik-Syndrom (bei Affektstörungen, Autismus und Anti-NMDA-Enzephalitis) ein.',
    precursorIds: ['psychomotor_agitation_hyperkinesia']
  },
  echolalia_echopraxia: {
    entityId: 'echolalia_echopraxia',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1885',
    yearNumeric: 1885,
    pioneer: 'Georges Gilles de la Tourette (1885) & Kahlbaum',
    historicalTerm: 'Écholalie & Échopraxie',
    rdocPillar: 'Sensorimotor Systems',
    evolutionSummary:
      'Gilles de la Tourette beschrieb 1885 an der Salpêtrière Echolalie und Echopraxie als unwillkürliche Spiegelphänomene, die später bei Katatonie, Tourette und im Autismus-Spektrum als kommunikative Gestalt-Sprache verstanden wurden.'
  },
  synesthesia_crossmodal: {
    entityId: 'synesthesia_crossmodal',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1880',
    yearNumeric: 1880,
    pioneer: 'Francis Galton (Nature 1880) & Gustav Fechner (1876)',
    historicalTerm: 'Chromästhesie / Farbenhören',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Gustav Fechner (1876) und Francis Galton (1880) dokumentierten erstmals systematisch Graphem-Farb- und Ton-Farb-Synästhesien als neurokognitive Normvariante verstärkter kortikaler Querverschaltung.'
  },
  body_dysmorphic_distortion: {
    entityId: 'body_dysmorphic_distortion',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1891',
    yearNumeric: 1891,
    pioneer: 'Enrico Morselli (Dysmorphophobie 1891)',
    historicalTerm: 'Dysmorphophobia (Körperschema-Verzerrung)',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Enrico Morselli prägte 1891 den Begriff „Dysmorphophobie“ für die quälende subjektive Wahrnehmung einer vermeintlichen körperlichen Entstellung trotz unauffälligen Befundes.'
  },
  somatization_functional_dissociation: {
    entityId: 'somatization_functional_dissociation',
    entityType: 'phenomenon',
    epochId: 'nineteenth_century',
    yearLabel: '1889',
    yearNumeric: 1889,
    pioneer: 'Jean-Martin Charcot, Pierre Janet & Sigmund Freud',
    historicalTerm: 'Funktionelle Neurologische Dissoziation / Konversion',
    rdocPillar: 'Sensorimotor Systems',
    evolutionSummary:
      'An der Pariser Salpêtrière zeigten Charcot und Janet, dass funktionelle Lähmungen, Anfälle und Empfindungsstörungen auf veränderten Aufmerksamkeits- und Vorhersagenetzwerken im Gehirn beruhen.'
  },

  // === EPOCHE IV: HEIDELBERGER PHÄNOMENOLOGIE (JASPERS & BLEULER 1908 - 1935) ===
  consciousness_expansion_shift: {
    entityId: 'consciousness_expansion_shift',
    entityType: 'phenomenon',
    epochId: 'classical_phenomenology',
    yearLabel: '1924',
    yearNumeric: 1924,
    pioneer: 'Wilhelm Mayer-Gross (1924) & Karl Jaspers (1913)',
    historicalTerm: 'Oneiroide Erlebnisform & Bewusstseinsverschiebung',
    rdocPillar: 'Arousal & Regulatory',
    evolutionSummary:
      'Wilhelm Mayer-Gross beschrieb an der Heidelberger Klinik 1924 das „oneiroide“ (traumähnlich-szenische, kosmisch überhöhte) Erleben als eigenständige qualitative Bewusstseinsverschiebung.',
    precursorIds: ['consciousness_narrowing']
  },
  subjective_time_distortion: {
    entityId: 'subjective_time_distortion',
    entityType: 'phenomenon',
    epochId: 'classical_phenomenology',
    yearLabel: '1933',
    yearNumeric: 1933,
    pioneer: 'Eugène Minkowski (Le Temps Vécu 1933) & Viktor von Gebsattel',
    historicalTerm: 'Störung der gelebten Zeit (Temps vécu)',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Eugène Minkowski und Viktor von Gebsattel stellten die „gelebte Eigenzeit“ ins Zentrum der Phänomenologie: das Stillstehen der Zukunft in der Melancholie vs. die „Zeitblindheit“ bei moderner ADHS.',
    precursorIds: ['disorientation_spacetime']
  },
  thought_blocking_derailment: {
    entityId: 'thought_blocking_derailment',
    entityType: 'phenomenon',
    epochId: 'classical_phenomenology',
    yearLabel: '1911',
    yearNumeric: 1911,
    pioneer: 'Eugen Bleuler (1911) & Carl Schneider (1930)',
    historicalTerm: 'Sperrung des Gedankengangs & Gedankenabreißen',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Eugen Bleuler beschrieb 1911 die „Sperrung“ – das plötzliche, wie durch ein Stauwehr ausgelöste Abreißen des Gedankengangs mitten im Satz – als Grundsymptom der Schizophrenien.'
  },
  incoherence_paralogia: {
    entityId: 'incoherence_paralogia',
    entityType: 'phenomenon',
    epochId: 'classical_phenomenology',
    yearLabel: '1911',
    yearNumeric: 1911,
    pioneer: 'Eugen Bleuler (Lockerung der Assoziationen 1911)',
    historicalTerm: 'Assoziationslockerung, Zerfahrenheit & Paralogie',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Bleuler erkannte in der „Lockerung der Assoziationsspannung“ (Zerfahrenheit, Kontamination, Neologismen) das primäre formale Denksymptom der von ihm benannten Schizophrenie.',
    precursorIds: ['flight_of_ideas']
  },
  delusional_mood_salience: {
    entityId: 'delusional_mood_salience',
    entityType: 'phenomenon',
    epochId: 'classical_phenomenology',
    yearLabel: '1913',
    yearNumeric: 1913,
    pioneer: 'Karl Jaspers (1913) & Klaus Conrad (Trema 1958)',
    historicalTerm: 'Wahnstimmung (Unheimliche Bedeutungsgewissheit)',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Karl Jaspers prägte 1913 den Begriff der „Wahnstimmung“ für das unheimliche Prodromalerleben, dass „etwas in der Luft liegt“ – die exakte phänomenologische Vorlage für die moderne dopaminerge „Aberrant Salience“-Hypothese (Kapur 2003).',
    precursorIds: ['persecutory_referential_delusion']
  },
  delusional_perception: {
    entityId: 'delusional_perception',
    entityType: 'phenomenon',
    epochId: 'classical_phenomenology',
    yearLabel: '1913',
    yearNumeric: 1913,
    pioneer: 'Karl Jaspers (1913) & Kurt Schneider (1939)',
    historicalTerm: 'Zweigliedrige Wahnwahrnehmung',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Von Jaspers 1913 als primäres Wahnerlebnis beschrieben und von Kurt Schneider als zweigliedriges Erstrangsymptom definiert: einer realen Sinneswahrnehmung wird unvermittelt eine abnorme Eigenbedeutung beigelegt.',
    precursorIds: ['delusional_mood_salience']
  },
  derealization: {
    entityId: 'derealization',
    entityType: 'phenomenon',
    epochId: 'classical_phenomenology',
    yearLabel: '1935',
    yearNumeric: 1935,
    pioneer: 'Edward Mapother & Wilhelm Mayer-Gross (1935)',
    historicalTerm: 'Derealisation (Entfremdung der Wahrnehmungswelt)',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Mayer-Gross und Mapother führten 1935 den Begriff „Derealisation“ in Abgrenzung zur Depersonalisation ein, um das Erleben einer kulissenhaften, künstlichen oder wie durch Glas getrennten Umwelt zu benennen.',
    precursorIds: ['depersonalization']
  },
  feeling_of_feelinglessness: {
    entityId: 'feeling_of_feelinglessness',
    entityType: 'phenomenon',
    epochId: 'classical_phenomenology',
    yearLabel: '1913',
    yearNumeric: 1913,
    pioneer: 'Karl Jaspers (1913) & Kurt Schneider (Vitalstörung)',
    historicalTerm: 'Gefühl der Gefühllosigkeit (Anästhesie der Gefühle)',
    rdocPillar: 'Negative Valence',
    evolutionSummary:
      'Jaspers grenzte 1913 das quälende „Gefühl der Gefühllosigkeit“ (schmerzhafte innere Versteinerung in der schweren Melancholie) präzise von bloßer Gleichgültigkeit oder Apathie ab.',
    precursorIds: ['anhedonia_loss_of_pleasure']
  },
  parathymia_affect_incontinence: {
    entityId: 'parathymia_affect_incontinence',
    entityType: 'phenomenon',
    epochId: 'classical_phenomenology',
    yearLabel: '1911',
    yearNumeric: 1911,
    pioneer: 'Eugen Bleuler (Parathymie 1911)',
    historicalTerm: 'Parathymie (Inadäquater / Diskordanter Affekt)',
    rdocPillar: 'Social Processes',
    evolutionSummary:
      'Bleuler beschrieb die Parathymie (das Auseinanderfallen von Denkinhalt und emotionalem Gesichtsausdruck) als eines der vier „A“-Grundsymptome.',
    precursorIds: ['euphoria_expansive_mood']
  },
  ambivalence_affective_volitional: {
    entityId: 'ambivalence_affective_volitional',
    entityType: 'phenomenon',
    epochId: 'classical_phenomenology',
    yearLabel: '1910',
    yearNumeric: 1910,
    pioneer: 'Eugen Bleuler (Vortrag Bern 1910)',
    historicalTerm: 'Ambivalenz (Affektive, Volitionale & Intellektuelle Koexistenz)',
    rdocPillar: 'Positive Valence',
    evolutionSummary:
      'Eugen Bleuler schuf 1910 das Wort „Ambivalenz“ für das gleichzeitige Nebeneinander unvereinbarer Gefühle, Willensimpulse (Ambitendenz) und Gedanken.'
  },

  // === EPOCHE V: KURT SCHNEIDER, GESTALTPSYCHIATRIE & AMDP-SYSTEM (1939 - 1979) ===
  thought_insertion_withdrawal: {
    entityId: 'thought_insertion_withdrawal',
    entityType: 'phenomenon',
    epochId: 'amdp_schneider',
    yearLabel: '1939',
    yearNumeric: 1939,
    pioneer: 'Kurt Schneider (Erstrangsymptome 1939 / 1950)',
    historicalTerm: 'Ich-Störungen: Gedankeneingebung, Gedankenentzug & Gedankenausbreitung',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Kurt Schneider stellte 1939 die Durchlässigkeit der „Ich-Umwelt-Schranke“ (Meinhaftigkeitverlust des eigenen Denkens und Handelns) ins Zentrum der klinischen Psychopathologie; heute im RDoC als Störung des „Agency & Corollary Discharge“-Netzwerks verankert.',
    precursorIds: ['auditory_hallucinations_voices', 'depersonalization']
  },
  alexithymia_interoception: {
    entityId: 'alexithymia_interoception',
    entityType: 'phenomenon',
    epochId: 'amdp_schneider',
    yearLabel: '1973',
    yearNumeric: 1973,
    pioneer: 'Peter Sifneos & John Nemiah (1973)',
    historicalTerm: 'Alexithymie („Keine Worte für Gefühle“)',
    rdocPillar: 'Social Processes',
    evolutionSummary:
      'Sifneos prägte 1973 den Begriff „Alexithymie“; moderne Interozeptionsforschung (Anteriorer Insularkortex) zeigt sie als transdiagnostische Brücke zwischen Psychosomatik, Trauma und Autismus.',
    precursorIds: ['feeling_of_feelinglessness']
  },
  morning_low_circadian: {
    entityId: 'morning_low_circadian',
    entityType: 'phenomenon',
    epochId: 'amdp_schneider',
    yearLabel: '1965',
    yearNumeric: 1965,
    pioneer: 'Hubertus Tellenbach (Melancholie 1961) & AMDP-System (1965)',
    historicalTerm: 'Vitales Morgentief & Zirkadiane Phasenverschiebung',
    rdocPillar: 'Arousal & Regulatory',
    evolutionSummary:
      'In der Heidelberger Chronopathologie und im AMDP-System als somatovitales Kennzeichen verankert; im RDoC direkt dem zirkadianen Schrittmacher (Nucleus suprachiasmaticus) zugeordnet.',
    precursorIds: ['thought_inhibition_retardation']
  },
  splitting_black_white: {
    entityId: 'splitting_black_white',
    entityType: 'phenomenon',
    epochId: 'amdp_schneider',
    yearLabel: '1967',
    yearNumeric: 1967,
    pioneer: 'Melanie Klein (1946) & Otto Kernberg (1967)',
    historicalTerm: 'Spaltung (Dichotome Idealisierung vs. Entwertung)',
    rdocPillar: 'Social Processes',
    evolutionSummary:
      'Von Melanie Klein und Otto Kernberg als aktive Trennung guter und böser Selbst-/Objektrepräsentanzen beschrieben; heute als stressinduzierter Zusammenbruch präfrontaler Mentalisierungsnetzwerke verstanden.',
    precursorIds: ['ambivalence_affective_volitional']
  },
  prosopagnosia_facial_blindness: {
    entityId: 'prosopagnosia_facial_blindness',
    entityType: 'phenomenon',
    epochId: 'amdp_schneider',
    yearLabel: '1947',
    yearNumeric: 1947,
    pioneer: 'Joachim Bodamer (Die Prosop-Agnosie 1947)',
    historicalTerm: 'Prosopagnosie (Gesichtsblindheit)',
    rdocPillar: 'Social Processes',
    evolutionSummary:
      'Der deutsche Neurologe Joachim Bodamer prägte 1947 den Begriff „Prosopagnosie“ für das selektive Unvermögen, vertraute Gesichter trotz intakter Sehschärfe zu erkennen (Fusiform Face Area).'
  },
  alice_in_wonderland_metamorphopsia: {
    entityId: 'alice_in_wonderland_metamorphopsia',
    entityType: 'phenomenon',
    epochId: 'amdp_schneider',
    yearLabel: '1955',
    yearNumeric: 1955,
    pioneer: 'John Todd (CMAJ 1955) & Caro Lippman (1952)',
    historicalTerm: 'Alice-in-Wonderland-Syndrom (Mikropsie / Makropsie / Pelopsie)',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Der britische Psychiater John Todd benannte 1955 die bizarren Verzerrungen von Körpergröße, Raumdistanz und Zeitgefühl bei Migräne und Epilepsie nach Lewis Carrolls Roman.',
    precursorIds: ['visual_hallucinations_illusions']
  },

  // === EPOCHE VI: OPERATIONALISIERUNG (DSM-III / ICD-10) & KOGNITIVE NEUROWISSENSCHAFT (1980 - 2009) ===
  flashbacks_intrusions: {
    entityId: 'flashbacks_intrusions',
    entityType: 'phenomenon',
    epochId: 'operational_cns',
    yearLabel: '1980',
    yearNumeric: 1980,
    pioneer: 'Mardi Horowitz (1976), DSM-III (1980) & Chris Brewin (Dual Representation)',
    historicalTerm: 'Szenische Intrusionen & Posttraumatische Flashbacks',
    rdocPillar: 'Negative Valence',
    evolutionSummary:
      '1980 mit der Einführung der PTBS im DSM-III als sensorisches Wiedererleben im Hier und Jetzt kodifiziert; neurowissenschaftlich durch eine Entkopplung von hyperaktiver Amygdala und gehemmter hippocampaler Zeitkontextualisierung erklärt.',
    precursorIds: ['consciousness_narrowing', 'obsessive_thoughts_impulses']
  },
  executive_paralysis: {
    entityId: 'executive_paralysis',
    entityType: 'phenomenon',
    epochId: 'operational_cns',
    yearLabel: '1997',
    yearNumeric: 1997,
    pioneer: 'Russell Barkley (1997) & Thomas E. Brown',
    historicalTerm: 'Exekutive Dysfunktion & Task-Initiation-Paralyse',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Russell Barkley modellierte 1997 ADHS als Störung präfrontaler Exekutivfunktionen und Selbstregulation statt bloßer Unruhe – wodurch die „Exekutive Paralyse“ trotz hoher Motivation erklärbar wurde.',
    precursorIds: ['abulia_drive_inhibition']
  },
  premonitory_urge_tics: {
    entityId: 'premonitory_urge_tics',
    entityType: 'phenomenon',
    epochId: 'operational_cns',
    yearLabel: '1993',
    yearNumeric: 1993,
    pioneer: 'James F. Leckman (Premonitory Urge Scale 1993)',
    historicalTerm: 'Sensorisches Vorgefühl (Premonitory Somatosensory Urge)',
    rdocPillar: 'Sensorimotor Systems',
    evolutionSummary:
      'Leckman zeigte 1993, dass Tics nicht rein unwillkürliche Zuckungen sind, sondern einer aufsteigenden interozeptiven Spannung in der Insula und im supplementär-motorischen Areal (SMA) folgen.',
    precursorIds: ['echolalia_echopraxia']
  },

  // === EPOCHE VII: MODERNE RDoC-MATRIX, NEURODIVERGENZ & PRÄZISIONS-KLASSIFIKATION (2010 - HEUTE) ===
  cognitive_dysfunction_brain_fog: {
    entityId: 'cognitive_dysfunction_brain_fog',
    entityType: 'phenomenon',
    epochId: 'rdoc_modern',
    yearLabel: '2014',
    yearNumeric: 2014,
    pioneer: 'NIMH RDoC Cognitive Systems & Neuroimmunologie (2014–2022)',
    historicalTerm: 'Netzwerk-Hypofrontalität & Neuroinflammatorischer Brain Fog',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Im RDoC-Zeitalter als transdiagnostische Störung des Arbeitsgedächtnisses und der kognitiven Kontrolle (DLPFC) bei Depression, ADHS, Chemobrain, ME/CFS und Post-COVID verstanden.',
    precursorIds: ['thought_inhibition_retardation']
  },
  rejection_sensitive_dysphoria: {
    entityId: 'rejection_sensitive_dysphoria',
    entityType: 'phenomenon',
    epochId: 'rdoc_modern',
    yearLabel: '2014',
    yearNumeric: 2014,
    pioneer: 'William Dodson & Affektive Neurowissenschaft (Social Pain Network)',
    historicalTerm: 'Rejection Sensitive Dysphoria (RSD)',
    rdocPillar: 'Negative Valence',
    evolutionSummary:
      'Beschreibt den überwältigenden, körperlich spürbaren Schmerzimpuls bei wahrgenommener sozialer Zurückweisung (dorsales anteriores Cingulum & präfrontale Emotionsregulation bei ADHS/Autismus).',
    precursorIds: ['alexithymia_interoception']
  },
  hyperfocus_tunnel: {
    entityId: 'hyperfocus_tunnel',
    entityType: 'phenomenon',
    epochId: 'rdoc_modern',
    yearLabel: '2005',
    yearNumeric: 2010,
    pioneer: 'Dinah Murray, Mike Lesser & Wendy Lawson (Monotropism 2005/2012)',
    historicalTerm: 'Monotropismus & Dopaminerger Hyperfokus-Tunnel',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Die von autistischen Forschenden entwickelte Monotropismus-Theorie erklärt Hyperfokus als ressourcenintensive Bündelung des gesamten Aufmerksamkeitsfeldes in wenige, hochgradig vertiefte Interessenkanäle.',
    precursorIds: ['consciousness_narrowing', 'executive_paralysis']
  },
  sensory_overload_flooding: {
    entityId: 'sensory_overload_flooding',
    entityType: 'phenomenon',
    epochId: 'rdoc_modern',
    yearLabel: '2013',
    yearNumeric: 2013,
    pioneer: 'DSM-5 Sensorik-Kriterium (2013) & Predictive-Coding-Forschung',
    historicalTerm: 'Sensorische Reizüberflutung (Thalamisches Gating-Defizit)',
    rdocPillar: 'Arousal & Regulatory',
    evolutionSummary:
      'Erst 2013 offiziell in die Autismus-Kriterien aufgenommen; im Predictive-Coding-Modell als hohe Präzisionsgewichtung eingehender Sinnesdaten (HIPPEA) bei reduziertem thalamischem Habituationsfilter verstanden.'
  },
  autistic_meltdown_shutdown: {
    entityId: 'autistic_meltdown_shutdown',
    entityType: 'phenomenon',
    epochId: 'rdoc_modern',
    yearLabel: '2015',
    yearNumeric: 2015,
    pioneer: 'Luke Beardon, Damian Milton & Autonome Polyvagal-Forschung',
    historicalTerm: 'Autistischer Meltdown & Dissoziativer Shutdown',
    rdocPillar: 'Arousal & Regulatory',
    evolutionSummary:
      'Im Neurodivergenz-Paradigma klar von „Wutanfällen“ abgegrenzt: eine unwillkürliche Notfallentladung (Sympathikus-Meltdown) oder Schutzabschaltung (Dorsaler-Vagus-Shutdown) nach kumulativer Reiz- und Masking-Erschöpfung.',
    precursorIds: ['sensory_overload_flooding']
  },
  stimming_self_regulation: {
    entityId: 'stimming_self_regulation',
    entityType: 'phenomenon',
    epochId: 'rdoc_modern',
    yearLabel: '2019',
    yearNumeric: 2019,
    pioneer: 'Steven Kapp et al. (2019) & Sensomotorische Selbstregulations-Forschung',
    historicalTerm: 'Stimming (Rhythmisch-Propriozeptive Homöostase)',
    rdocPillar: 'Sensorimotor Systems',
    evolutionSummary:
      'Statt wie in der alten Psychiatrie als „zwecklose Stereotypie“ abgewertet zu werden, belegt die moderne Forschung Stimming als essenzielles propriozeptives Werkzeug zur Emotions- und Reizregulation.',
    precursorIds: ['premonitory_urge_tics']
  },
  masking_camouflaging: {
    entityId: 'masking_camouflaging',
    entityType: 'phenomenon',
    epochId: 'rdoc_modern',
    yearLabel: '2017',
    yearNumeric: 2017,
    pioneer: 'Laura Hull, Meng-Chuan Lai & Sarah Bargiela (CAT-Q 2017/2019)',
    historicalTerm: 'Soziales Masking & Camouflaging',
    rdocPillar: 'Social Processes',
    evolutionSummary:
      'Seit 2017 intensiv erforscht: das kognitiv hochgradig erschöpfende bewusste Unterdrücken neurodivergenter Ausdrucksweisen zur Vermeidung sozialer Stigmatisierung.',
    precursorIds: ['depersonalization']
  },
  double_empathy_social_semiotics: {
    entityId: 'double_empathy_social_semiotics',
    entityType: 'phenomenon',
    epochId: 'rdoc_modern',
    yearLabel: '2012',
    yearNumeric: 2012,
    pioneer: 'Damian Milton (The Double Empathy Problem 2012)',
    historicalTerm: 'Double-Empathy-Phänomen (Wechselseitige Salienz-Divergenz)',
    rdocPillar: 'Social Processes',
    evolutionSummary:
      'Damian Milton widerlegte 2012 das alte Modell eines einseitigen „Empathiedefizits“ und zeigte, dass Missverständnisse zwischen neurotypischen und autistischen Menschen auf einer beidseitigen Differenz der Kommunikationscodes beruhen.',
    precursorIds: ['alexithymia_interoception']
  }
};

export const CONDITION_HISTORICAL_META: Record<string, EntityHistoricalMeta> = {
  // === EPOCHE I: ANTIKE ===
  major_depression: {
    entityId: 'major_depression',
    entityType: 'condition',
    epochId: 'antiquity',
    yearLabel: '400 v. Chr.',
    yearNumeric: -400,
    pioneer: 'Hippokrates von Kos (Aphorismen VI, 23)',
    historicalTerm: 'Melancholia (Schwarze Galle)',
    rdocPillar: 'Negative Valence',
    evolutionSummary:
      'Hippokrates definierte vor 2400 Jahren: „Wenn Furcht und Traurigkeit lange Zeit anhalten, ist ein solcher Zustand melancholisch“ – der Ursprung der gesamten abendländischen Psychopathologie.'
  },
  bipolar_disorder: {
    entityId: 'bipolar_disorder',
    entityType: 'condition',
    epochId: 'antiquity',
    yearLabel: '150 n. Chr.',
    yearNumeric: 150,
    pioneer: 'Aretaeus von Kappadokien · Jean-Pierre Falret (1854)',
    historicalTerm: 'Melancholie-Manie-Zyklus / Folie circulaire',
    rdocPillar: 'Positive Valence',
    evolutionSummary:
      'Aretaeus beobachtete als Erster das Umschlagen von Melancholie in Manie; 1854 beschrieben Falret und Baillarger die „Folie circulaire“, 1899 Kraepelin das „Manisch-depressive Irresein“.'
  },
  temporal_lobe_epilepsy: {
    entityId: 'temporal_lobe_epilepsy',
    entityType: 'condition',
    epochId: 'antiquity',
    yearLabel: '400 v. Chr.',
    yearNumeric: -400,
    pioneer: 'Hippokrates (De Morbo Sacro) & Hughlings Jackson (1888)',
    historicalTerm: 'Morbus Sacer (Heilige Krankheit) / Psychomotorische Epilepsie',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'In „Über die heilige Krankheit“ erklärte Hippokrates die Epilepsie erstmals als natürliche Gehirnerkrankung statt göttlicher Besessenheit.'
  },
  delirium_sepsis_metabolic: {
    entityId: 'delirium_sepsis_metabolic',
    entityType: 'condition',
    epochId: 'antiquity',
    yearLabel: '380 v. Chr.',
    yearNumeric: -380,
    pioneer: 'Hippokrates (Phrenitis) · Celsus (Delirium) · Bonhoeffer (1909)',
    historicalTerm: 'Phrenitis / Akuter Exogener Reaktionstyp',
    rdocPillar: 'Arousal & Regulatory',
    evolutionSummary:
      'Von der antiken fieberhaften Phrenitis über Karl Bonhoeffers „Akute exogene Reaktionstypen“ (1909) bis zur modernen Neuroinflammation des cholinergen Thalamus-Kortex-Systems.'
  },
  substance_intox_withdrawal: {
    entityId: 'substance_intox_withdrawal',
    entityType: 'condition',
    epochId: 'antiquity',
    yearLabel: '300 v. Chr.',
    yearNumeric: -300,
    pioneer: 'Antike Toxikologie · Thomas Sutton (Delirium tremens 1813)',
    historicalTerm: 'Pharmakon-Rausch & Delirium tremens',
    rdocPillar: 'Positive Valence',
    evolutionSummary:
      'Schon in der Antike wurde der wein- und pflanzeninduzierte Wahnsinn vom endogenen unterschieden; 1813 grenzte Sutton das Alkoholentzugsdelir ab.'
  },
  sleep_deprivation_stress_grief: {
    entityId: 'sleep_deprivation_stress_grief',
    entityType: 'condition',
    epochId: 'antiquity',
    yearLabel: '350 v. Chr.',
    yearNumeric: -350,
    pioneer: 'Corpus Hippocraticum (Agrypnia & Akute Trauer)',
    historicalTerm: 'Agrypnia (Schlaflosigkeit) & Physiologische Grenzerfahrung',
    rdocPillar: 'Arousal & Regulatory',
    evolutionSummary:
      'Zeigt seit der Antike, dass Halluzinationen und Derealisation bei extremem Schlafentzug oder Trauer physiologische Reaktionen eines gesunden Gehirns sein können.'
  },

  // === EPOCHE II: AUFKLÄRUNG & FRÜHE NOSOLOGIE ===
  charles_bonnet: {
    entityId: 'charles_bonnet',
    entityType: 'condition',
    epochId: 'enlightenment',
    yearLabel: '1760',
    yearNumeric: 1760,
    pioneer: 'Charles Bonnet (Essai Analytique sur les Facultés de l’Âme 1760)',
    historicalTerm: 'Charles-Bonnet-Release-Halluzinose',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      '1760 von Charles Bonnet am Beispiel seines fast blinden Großvaters Charles Lullin beschrieben: komplexe visuelle Halluzinationen durch Wegfall afferenter Netzhautsignale.'
  },
  ocd: {
    entityId: 'ocd',
    entityType: 'condition',
    epochId: 'enlightenment',
    yearLabel: '1838',
    yearNumeric: 1838,
    pioneer: 'Jean-Étienne Esquirol (1838) · Carl Westphal (1877)',
    historicalTerm: 'Folie du doute (Zweifelsucht) & Zwangoneurose',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Esquirol beschrieb 1838 erstmals detailliert den inneren Kampf gegen sich aufdrängende Zwangsgedanken und Kontrollrituale.'
  },

  // === EPOCHE III: KLASSISCHE NEUROPSYCHIATRIE (1845 - 1899) ===
  dissociative_disorders: {
    entityId: 'dissociative_disorders',
    entityType: 'condition',
    epochId: 'nineteenth_century',
    yearLabel: '1889',
    yearNumeric: 1889,
    pioneer: 'Pierre Janet (L’Automatisme Psychologique 1889)',
    historicalTerm: 'Désagrégation psychologique (Dissoziation)',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Pierre Janet begründete 1889 an der Salpêtrière das moderne Verständnis traumatisch bedingter Dissoziation von Gedächtnis, Identität und Wahrnehmung.'
  },
  anorexia_bdd: {
    entityId: 'anorexia_bdd',
    entityType: 'condition',
    epochId: 'nineteenth_century',
    yearLabel: '1873',
    yearNumeric: 1873,
    pioneer: 'William Gull (Anorexia nervosa 1873) & Charles Lasègue',
    historicalTerm: 'Anorexia nervosa & Dysmorphophobie (Morselli 1891)',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      '1873 gleichzeitig von Sir William Gull in London und Charles Lasègue in Paris beschrieben; 1891 ergänzte Morselli die körperdysmorphe Wahrnehmungsverzerrung.'
  },
  tourette_tics: {
    entityId: 'tourette_tics',
    entityType: 'condition',
    epochId: 'nineteenth_century',
    yearLabel: '1885',
    yearNumeric: 1885,
    pioneer: 'Georges Gilles de la Tourette (1885)',
    historicalTerm: 'Maladie des tics convulsifs',
    rdocPillar: 'Sensorimotor Systems',
    evolutionSummary:
      'Auf Anregung Charcots beschrieb Gilles de la Tourette 1885 neun Patienten mit motorischen und vokalen Tics, Vorgefühl und Echolalie.'
  },
  synesthesia_gifted: {
    entityId: 'synesthesia_gifted',
    entityType: 'condition',
    epochId: 'nineteenth_century',
    yearLabel: '1880',
    yearNumeric: 1880,
    pioneer: 'Francis Galton (1880) & Eugen Bleuler / Karl Lehmann (1881)',
    historicalTerm: 'Synästhesie & Zwangsmäßige Lichtempfindungen durch Schall',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Schon 1881 veröffentlichte der junge Eugen Bleuler (selbst Synästhetiker!) gemeinsam mit Karl Lehmann eine Studie über „Farbenhören“ als natürliche Wahrnehmungsvariante.'
  },
  migraine_alice: {
    entityId: 'migraine_alice',
    entityType: 'condition',
    epochId: 'nineteenth_century',
    yearLabel: '1870',
    yearNumeric: 1870,
    pioneer: 'Hubert Airy (Teichopsie 1870) & Aristides Leão (CSD 1944)',
    historicalTerm: 'Ophthalmische Migräne-Aura & Cortical Spreading Depression',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Hubert Airy zeichnete 1870 erstmals die gezackten Flimmerskotome (Festungsfiguren) seiner eigenen Migräne-Aura; Leão entdeckte 1944 die zugrundeliegende „Cortical Spreading Depression“.'
  },
  narcolepsy: {
    entityId: 'narcolepsy',
    entityType: 'condition',
    epochId: 'nineteenth_century',
    yearLabel: '1880',
    yearNumeric: 1880,
    pioneer: 'Jean-Baptiste Gélineau (1880) & Carl Westphal (1877)',
    historicalTerm: 'Narcolepsie (Schlafattacken & Kataplexie)',
    rdocPillar: 'Arousal & Regulatory',
    evolutionSummary:
      'Gélineau prägte 1880 den Begriff „Narcolepsie“; 1999 wurde der Verlust der Hypocretin/Orexin-Neurone im lateralen Hypothalamus als molekulare Ursache identifiziert.'
  },
  stroke_tbi_korsakoff: {
    entityId: 'stroke_tbi_korsakoff',
    entityType: 'condition',
    epochId: 'nineteenth_century',
    yearLabel: '1861',
    yearNumeric: 1861,
    pioneer: 'Paul Broca (1861), Carl Wernicke (1874) & Sergei Korsakow (1889)',
    historicalTerm: 'Herdläsionen & Wernicke-Korsakow-Syndrom',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Die Lokalisationslehre des 19. Jahrhunderts (Broca, Wernicke, Korsakow) bewies, dass umschriebene Läsionen spezifische Sprach-, Gedächtnis- und Körperschemaphänomene auslösen.'
  },
  thyroid_endocrine: {
    entityId: 'thyroid_endocrine',
    entityType: 'condition',
    epochId: 'nineteenth_century',
    yearLabel: '1888',
    yearNumeric: 1888,
    pioneer: 'Clinical Society of London (Myxoedema madness 1888) & Manfred Bleuler',
    historicalTerm: 'Endokrines Psychosyndrom (Schilddrüse & Nebenniere)',
    rdocPillar: 'Arousal & Regulatory',
    evolutionSummary:
      'Der Bericht von 1888 und Manfred Bleulers „Endokrinologische Psychiatrie“ (1954) zeigten, wie Schilddrüsen- und Cortisolstörungen Manie, Depression und Psychose perfekt imitieren.'
  },
  b12_iron_deficiency: {
    entityId: 'b12_iron_deficiency',
    entityType: 'condition',
    epochId: 'nineteenth_century',
    yearLabel: '1887',
    yearNumeric: 1887,
    pioneer: 'Ludwig Lichtheim (1887) & Richard Asher (Megaloblastic Madness 1949)',
    historicalTerm: 'Funikuläre Myelose & Megaloblastäre Psychose',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Bereits vor dem Auftreten einer Anämie kann ein Vitamin-B12-Mangel durch Entmarkung und gestörte Monoaminsynthese schwere Depressionen, Brain Fog und Paranoia auslösen.'
  },

  // === EPOCHE IV: HEIDELBERGER PHÄNOMENOLOGIE & KRAEPELIN/BLEULER (1908 - 1935) ===
  schizophrenia: {
    entityId: 'schizophrenia',
    entityType: 'condition',
    epochId: 'classical_phenomenology',
    yearLabel: '1908',
    yearNumeric: 1908,
    pioneer: 'Emil Kraepelin (1899), Eugen Bleuler (1908/1911) & Kurt Schneider (1939)',
    historicalTerm: 'Dementia praecox ➔ Gruppe der Schizophrenien',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Eugen Bleuler löste 1908 Kraepelins pessimistischen Begriff „Dementia praecox“ durch „Gruppe der Schizophrenien“ ab, um die Aufspaltung psychischer Funktionsverbände zu beschreiben.'
  },
  alzheimer_ftd: {
    entityId: 'alzheimer_ftd',
    entityType: 'condition',
    epochId: 'classical_phenomenology',
    yearLabel: '1906',
    yearNumeric: 1906,
    pioneer: 'Alois Alzheimer (Tübinger Vortrag 1906) & Arnold Pick (1892)',
    historicalTerm: 'Alzheimersche Krankheit (Auguste Deter) & Pick-Atrophie',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Alois Alzheimer verband 1906 bei seiner Patientin Auguste Deter erstmals Wahn, Desorientiertheit und Gedächtnisverlust mit mikroskopischen Amyloid-Plaques und Neurofibrillen.'
  },
  lewy_body_parkinson: {
    entityId: 'lewy_body_parkinson',
    entityType: 'condition',
    epochId: 'classical_phenomenology',
    yearLabel: '1912',
    yearNumeric: 1912,
    pioneer: 'Friedrich H. Lewy (1912) & Kenji Kosaka (1976)',
    historicalTerm: 'Lewy-Körperchen-Erkrankung (Einschlusskörperchen)',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Friedrich Lewy entdeckte 1912 die eosinophilen Einschlusskörperchen; Kosaka charakterisierte ab 1976 die Lewy-Körper-Demenz mit fluktuierender Vigilanz und szenischen optischen Halluzinationen.'
  },

  // === EPOCHE V: KURT SCHNEIDER & AMDP-ZEITALTER (1939 - 1979) ===
  autism_spectrum: {
    entityId: 'autism_spectrum',
    entityType: 'condition',
    epochId: 'amdp_schneider',
    yearLabel: '1943',
    yearNumeric: 1943,
    pioneer: 'Grunya Sukhareva (1925), Leo Kanner (1943), Hans Asperger (1944) & Lorna Wing (1981)',
    historicalTerm: 'Frühkindlicher Autismus ➔ Autismus-Spektrum / Neurodivergenz',
    rdocPillar: 'Social Processes',
    evolutionSummary:
      'Nach Sukharevas Pionierarbeit (1925) und Kanners/Aspergers Beschreibungen (1943/44) entwickelte Lorna Wing (1981) das Spektrum-Konzept, das heute im Neurodivergenz-Paradigma als eigenständige kognitive und sensorische Organisationsform verstanden wird.'
  },
  borderline_pd: {
    entityId: 'borderline_pd',
    entityType: 'condition',
    epochId: 'amdp_schneider',
    yearLabel: '1967',
    yearNumeric: 1967,
    pioneer: 'Adolf Stern (1938), Otto Kernberg (1967) & Marsha Linehan (1993)',
    historicalTerm: 'Borderline-Struktur / Emotionsregulationsstörung',
    rdocPillar: 'Negative Valence',
    evolutionSummary:
      'Von Stern (1938) und Kernberg (1967) beschrieben und durch Marsha Linehans biosoziales Modell (1993) als Störung der frontolimbischen Emotionsregulation entstigmatisiert.'
  },
  medication_neuroleptic_side_effects: {
    entityId: 'medication_neuroleptic_side_effects',
    entityType: 'condition',
    epochId: 'amdp_schneider',
    yearLabel: '1952',
    yearNumeric: 1952,
    pioneer: 'Jean Delay & Pierre Deniker (Chlorpromazin 1952) · Haase (Neuroleptische Schwelle)',
    historicalTerm: 'Pharmakogene Akathisie & Anticholinerges Delir',
    rdocPillar: 'Sensorimotor Systems',
    evolutionSummary:
      'Mit der Entdeckung der Neuroleptika (1952) zeigte sich, dass D2-Rezeptorblockade im Striatum Akathisie und sekundäre Affektverflachung auslösen kann, die nicht mit der Grunderkrankung verwechselt werden dürfen.'
  },

  // === EPOCHE VI: OPERATIONALISIERUNG & AUTOIMMUN-PSYCHIATRIE (1980 - 2009) ===
  ptsd_cptsd: {
    entityId: 'ptsd_cptsd',
    entityType: 'condition',
    epochId: 'operational_cns',
    yearLabel: '1980',
    yearNumeric: 1980,
    pioneer: 'DSM-III (1980) & Judith Herman (Komplexe PTBS 1992)',
    historicalTerm: 'Posttraumatische Belastungsstörung (PTBS / kPTBS)',
    rdocPillar: 'Negative Valence',
    evolutionSummary:
      '1980 offiziell als Diagnose etabliert und 1992 durch Judith Herman um die Komplexe PTBS erweitert (ICD-11 6B41).'
  },
  panic_anxiety: {
    entityId: 'panic_anxiety',
    entityType: 'condition',
    epochId: 'operational_cns',
    yearLabel: '1980',
    yearNumeric: 1980,
    pioneer: 'Donald Klein (Panik-Dissektion) & David M. Clark (Kognitives Modell 1986)',
    historicalTerm: 'Panikstörung (Paroxysmale Sympathikus-Eruption)',
    rdocPillar: 'Negative Valence',
    evolutionSummary:
      'Donald Klein grenzte die paroxysmale Panikattacke pharmakologisch von der chronischen Angst ab; im DSM-III (1980) wurde sie als eigenständige Entität verankert.'
  },
  adhd: {
    entityId: 'adhd',
    entityType: 'condition',
    epochId: 'operational_cns',
    yearLabel: '1987',
    yearNumeric: 1987,
    pioneer: 'Melchior Weikard (1775), George Still (1902) & Russell Barkley (1997)',
    historicalTerm: 'Der Aufmerksamkeitslose (Weikard 1775) ➔ ADHS-Spektrum',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Bereits 1775 von Melchior Weikard beschrieben, entwickelte sich das Konzept in den 1980er/90er Jahren zum modernen Verständnis einer dopaminergen Salienz- und Exekutivvariante über die gesamte Lebensspanne.'
  },
  autoimmune_encephalitis: {
    entityId: 'autoimmune_encephalitis',
    entityType: 'condition',
    epochId: 'operational_cns',
    yearLabel: '2007',
    yearNumeric: 2007,
    pioneer: 'Josep Dalmau et al. (Annals of Neurology 2007)',
    historicalTerm: 'Anti-NMDA-Rezeptor-Autoimmunenzephalitis',
    rdocPillar: 'Cognitive Systems',
    evolutionSummary:
      'Bahnbrechende Entdeckung von Josep Dalmau (2007): IgG-Autoantikörper gegen synaptische NMDA-Glutamatrezeptoren rufen akute Psychosen, Katatonie und Ich-Störungen hervor, die durch Immuntherapie heilbar sind.'
  },

  // === EPOCHE VII: MODERNE RDoC & SYSTEMIMMUNOLOGIE (2010 - HEUTE) ===
  mecfs_longcovid_pots: {
    entityId: 'mecfs_longcovid_pots',
    entityType: 'condition',
    epochId: 'rdoc_modern',
    yearLabel: '2020',
    yearNumeric: 2020,
    pioneer: 'Moderne Neuroimmunologie & Autonome Systemmedizin (IOM 2015 / Post-COVID 2020)',
    historicalTerm: 'ME/CFS, Post-COVID-Syndrom & Dysautonomie (POTS)',
    rdocPillar: 'Arousal & Regulatory',
    evolutionSummary:
      'In der modernen Systemmedizin als postinfektiöse neuroimmunologische, endotheliale und autonome Dysregulation (PEM, Brain Fog, Reizüberflutung) statt als psychogene Befindlichkeitsstörung anerkannt.'
  }
};

export function getEpochById(epochId: HistoricalEpochId): HistoricalEpoch {
  return HISTORICAL_EPOCHS.find((e) => e.id === epochId) ?? HISTORICAL_EPOCHS[0];
}

export function getEntityHistoricalMeta(
  entityId: string,
  entityType: 'phenomenon' | 'condition' = 'phenomenon'
): EntityHistoricalMeta {
  if (entityType === 'phenomenon') {
    return (
      PHENOMENON_HISTORICAL_META[entityId] ?? {
        entityId,
        entityType: 'phenomenon',
        epochId: 'classical_phenomenology',
        yearLabel: '1913',
        yearNumeric: 1913,
        pioneer: 'Karl Jaspers & AMDP-System',
        historicalTerm: 'Klassische Phänomenologie',
        rdocPillar: 'Cognitive Systems',
        evolutionSummary: 'Systematisiert in der klassischen Psychopathologie und im AMDP-System.'
      }
    );
  }
  return (
    CONDITION_HISTORICAL_META[entityId] ?? {
      entityId,
      entityType: 'condition',
      epochId: 'classical_phenomenology',
      yearLabel: '1911',
      yearNumeric: 1911,
      pioneer: 'Klassische Nosologie & ICD-11',
      historicalTerm: 'Klinische Entität',
      rdocPillar: 'Cognitive Systems',
      evolutionSummary: 'Klinisch-ätiologische Referenzentität im transdiagnostischen Konnektom.'
    }
  );
}
