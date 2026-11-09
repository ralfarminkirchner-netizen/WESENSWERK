import { PhenomenonDomain, ConditionEntity, ConditionCategory } from './types';

export const PHENOMENON_DOMAINS: PhenomenonDomain[] = [
  {
    id: 'consciousness',
    code: 'DOM-01',
    name: 'Bewusstseins- & Vigilanzphänomene',
    shortName: 'Bewusstsein',
    amdpSection: 'AMDP 1–4',
    rdocConstruct: 'Arousal and Regulatory Systems',
    color: '#0284C7',
    accentBg: '#E0F2FE',
    description: 'Quantitative (Vigilanzminderung, Somnolenz) und qualitative Veränderungen (Bewusstseinseinengung, Bewusstseinsverschiebung, Oneiroid) der Wachheit und Klarheit.'
  },
  {
    id: 'orientation',
    code: 'DOM-02',
    name: 'Orientierungs- & Zeiterlebensphänomene',
    shortName: 'Orientierung & Zeit',
    amdpSection: 'AMDP 5–8',
    rdocConstruct: 'Cognitive Systems / Perception',
    color: '#0D9488',
    accentBg: '#CCFBF1',
    description: 'Veränderungen der zeitlichen, örtlichen, situativen und autopsychischen Orientierung sowie des subjektiven Zeitflusses (Zeitraffer, Zeitstillstand).'
  },
  {
    id: 'attention_memory',
    code: 'DOM-03',
    name: 'Aufmerksamkeits-, Gedächtnis- & Exekutivphänomene',
    shortName: 'Kognition & Gedächtnis',
    amdpSection: 'AMDP 9–14',
    rdocConstruct: 'Cognitive Systems (Attention, Working Memory)',
    color: '#2563EB',
    accentBg: '#DBEAFE',
    description: 'Störungen und Divergenzen der Merkfähigkeit, Ekphorie, Konfabulationen, Déjà-vu/Jamais-vu, Hypermnesie und exekutiven Handlungsplanung.'
  },
  {
    id: 'formal_thought',
    code: 'DOM-04',
    name: 'Formale Denk- & Sprachphänomene',
    shortName: 'Formales Denken',
    amdpSection: 'AMDP 15–27',
    rdocConstruct: 'Cognitive Systems (Language, Thought Flow)',
    color: '#4F46E5',
    accentBg: '#E0E7FF',
    description: 'Veränderungen der Geschwindigkeit, Kohärenz und Struktur des Gedankenflusses: Ideenflucht, Denkhemmung, Gedankenabreißen, Tangentialität, Neologismen.'
  },
  {
    id: 'fears_compulsions',
    code: 'DOM-05',
    name: 'Befürchtungen, Zwangs- & Intrusionsphänomene',
    shortName: 'Zwang & Intrusion',
    amdpSection: 'AMDP 28–32',
    rdocConstruct: 'Negative Valence Systems (Acute/Potential Threat)',
    color: '#D97706',
    accentBg: '#FEF3C7',
    description: 'Ich-dystone Zwangsgedanken, Zwangsimpulse, Phobien, überwertige Ideen, Flashbacks und hypochondrische Gewissheiten.'
  },
  {
    id: 'delusions',
    code: 'DOM-06',
    name: 'Inhaltliche Denk- & Wahnphänomene',
    shortName: 'Wahn & Bedeutung',
    amdpSection: 'AMDP 33–48',
    rdocConstruct: 'Cognitive Systems / Aberrant Salience',
    color: '#DC2626',
    accentBg: '#FEE2E2',
    description: 'Aberrante Salienz, Wahnstimmung, Wahnwahrnehmung, Beziehungs-, Verfolgungs-, Größen-, Schuld-, Nihilismus- (Cotard) und Doppelgängerwahn (Capgras).'
  },
  {
    id: 'perception',
    code: 'DOM-07',
    name: 'Sinnestäuschungen & Wahrnehmungsphänomene',
    shortName: 'Wahrnehmung',
    amdpSection: 'AMDP 49–58',
    rdocConstruct: 'Cognitive Systems (Perception)',
    color: '#9333EA',
    accentBg: '#F3E8FF',
    description: 'Illusionen, akustische (imperative, dialogisierende), optische, olfaktorische, taktile Halluzinationen, Zönästhesien, Pseudohalluzinationen und Pareidolien.'
  },
  {
    id: 'ego_experience',
    code: 'DOM-08',
    name: 'Ich-Erlebens-, Dissoziations- & Selbstgrenzenphänomene',
    shortName: 'Ich-Erleben & Selbst',
    amdpSection: 'AMDP 59–64',
    rdocConstruct: 'Social Processes (Self-Knowledge & Agency)',
    color: '#7C3AED',
    accentBg: '#EDE9FE',
    description: 'Depersonalisation, Derealisation, Gedankenlautwerden, Gedankeneingebung, Gedankenentzug, Gedankenausbreitung und Fremdbeeinflussungserleben.'
  },
  {
    id: 'affectivity',
    code: 'DOM-09',
    name: 'Affektivitäts-, Stimmungs- & Emotionsphänomene',
    shortName: 'Affektivität',
    amdpSection: 'AMDP 65–82',
    rdocConstruct: 'Positive & Negative Valence Systems',
    color: '#E11D48',
    accentBg: '#FFE4E6',
    description: 'Anhedonie, Gefühl der Gefühllosigkeit, Parathymie, Affektlabilität, Affektinkontinenz, Euphorie, Dysphorie, Alexithymie, Ambivalenz und RSD.'
  },
  {
    id: 'drive_psychomotor',
    code: 'DOM-10',
    name: 'Antriebs-, Psychomotorik- & Katatoniephänomene',
    shortName: 'Antrieb & Motorik',
    amdpSection: 'AMDP 83–90',
    rdocConstruct: 'Sensorimotor Systems',
    color: '#EA580C',
    accentBg: '#FFEDD5',
    description: 'Antriebshemmung, Abulie, Agitiertheit, Stupor, Mutismus, Katalepsie, Flexibilitas cerea, Echolalie, Echopraxie, Tic-Phänomene und Akathisie.'
  },
  {
    id: 'circadian_autonomic',
    code: 'DOM-11',
    name: 'Zirkadiane, Schlaf- & Vegetative Phänomene',
    shortName: 'Schlaf & Zirkadianik',
    amdpSection: 'AMDP 91–100',
    rdocConstruct: 'Arousal / Circadian Rhythms',
    color: '#0369A1',
    accentBg: '#E0F2FE',
    description: 'Morgentief, Schlaflähmung, hypnagoge Halluzinationen, REM-Schlaf-Verhaltensphänomene, terminale Insomnie und vegetative Krisen.'
  },
  {
    id: 'neurodivergence_sensory',
    code: 'DOM-12',
    name: 'Neurodivergente Reiz-, Fokus- & Verarbeitungsphänomene',
    shortName: 'Neurodivergenz & Sensorik',
    amdpSection: 'Transdiagnostisch / Neuro-Spektrum',
    rdocConstruct: 'Sensory Processing & Cognitive Control',
    color: '#059669',
    accentBg: '#D1FAE5',
    description: 'Hyperfokus, Reizüberflutung (Sensory Overload), Stimming, Autistic Meltdown/Shutdown, Masking, Monotropismus, Zeitblindheit, Synästhesie und Misophonie.'
  },
  {
    id: 'social_cognition',
    code: 'DOM-13',
    name: 'Soziale Kognition, Bindungs- & Interaktionsphänomene',
    shortName: 'Soziale Kognition',
    amdpSection: 'AMDP Sozial / Interaktion',
    rdocConstruct: 'Systems for Social Processes',
    color: '#0891B2',
    accentBg: '#CFFAFE',
    description: 'Spaltungsphänomene (Splitting), Double-Empathy-Phänomen, Prosopagnosie, Hypervigilanz gegenüber Mimik, sozialer Rückzug und Mentalisierungsverlust.'
  },
  {
    id: 'somatopsychic',
    code: 'DOM-14',
    name: 'Körperschema-, Interozeptions- & Somatopsychische Phänomene',
    shortName: 'Körperschema & Soma',
    amdpSection: 'AMDP Zusatz / Somatopsychik',
    rdocConstruct: 'Interoception & Body Representation',
    color: '#B45309',
    accentBg: '#FEF3C7',
    description: 'Körperdysmorphe Verzerrung, Alice-im-Wunderland-Phänomen (Mikropsie/Makropsie), Phantomschmerz, Somatisierung, Interozeptionsblindheit und funktionelle Dissoziation.'
  }
];

export const CONDITION_CATEGORY_META: Record<ConditionCategory, { label: string; color: string; shortCode: string }> = {
  psychisch: {
    label: 'Psychische Störung / Syndrom (ICD-11 Kap. 06)',
    color: '#2563EB',
    shortCode: 'PSYCH'
  },
  neurodivergent: {
    label: 'Neurodivergenz & Entwicklungsprofil',
    color: '#059669',
    shortCode: 'NEURODIV'
  },
  neurologisch: {
    label: 'Neurologische & ZNS-Erkrankung (ICD-11 Kap. 08)',
    color: '#7C3AED',
    shortCode: 'NEURO'
  },
  somatisch_endokrin: {
    label: 'Somatische, Endokrine, Autoimmune & Metabolische Ursache',
    color: '#D97706',
    shortCode: 'SOMA'
  },
  substanz_medikament: {
    label: 'Substanz-, Medikamenten- & Toxische Wirkung',
    color: '#DC2626',
    shortCode: 'TOX/MED'
  },
  physiologisch_norm: {
    label: 'Physiologisches Grenzerleben & Normvariante',
    color: '#0D9488',
    shortCode: 'PHYSIO'
  }
};

export const CONDITIONS_DATA: ConditionEntity[] = [
  // 1. Psychische Störungen
  {
    id: 'schizophrenia',
    name: 'Schizophrenie & Primäre Psychotische Spektrumsstörungen',
    englishName: 'Schizophrenia',
    icd11Code: '6A20',
    dsm5Code: '295.90',
    hpoOrMondoId: 'MONDO:0005090',
    category: 'psychisch',
    categoryLabel: 'Psychische Störung',
    wikiTitleDe: 'Schizophrenie',
    wikiTitleEn: 'Schizophrenia',
    summary: 'Tiefgreifende Veränderung des Denkens, der Wahrnehmung, des Ich-Erlebens (Ich-Störungen) sowie der Affektivität und Psychomotorik.',
    keyMechanism: 'Mesolimbische Dopamin-Hyperaktivität (Aberrante Salienz), präfrontale Dopamin-Unterfunktion und NMDA-Rezeptor-Hypofunktion.'
  },
  {
    id: 'bipolar_disorder',
    name: 'Bipolare Affektive Störung (Manie / Bipolar I & II)',
    englishName: 'Bipolar_disorder',
    icd11Code: '6A60',
    dsm5Code: '296.40',
    hpoOrMondoId: 'MONDO:0004985',
    category: 'psychisch',
    categoryLabel: 'Psychische Störung',
    wikiTitleDe: 'Bipolare_Störung',
    wikiTitleEn: 'Bipolar_disorder',
    summary: 'Episodische Auslenkungen von Stimmung, Antrieb, formalem Denken (Ideenflucht) und zirkadianer Rhythmik zwischen Manie/Hypomanie und Depression.',
    keyMechanism: 'Dysregulation spannungsabhängiger Ionenkanäle, monoaminerger Signalwege und zirkadianer Clock-Gene (CLOCK, BMAL1).'
  },
  {
    id: 'major_depression',
    name: 'Unipolare Schwere Depressive Episode / Melancholie',
    englishName: 'Major_depressive_disorder',
    icd11Code: '6A70',
    dsm5Code: '296.23',
    hpoOrMondoId: 'MONDO:0002009',
    category: 'psychisch',
    categoryLabel: 'Psychische Störung',
    wikiTitleDe: 'Depression',
    wikiTitleEn: 'Major_depressive_disorder',
    summary: 'Syndrom aus gedrückter Stimmung, Anhedonie, Antriebshemmung, Denkhemmung, Morgentief und ggf. Gefühl der Gefühllosigkeit oder synthymem Schuld-/Verarmungswahn.',
    keyMechanism: 'HPA-Achsen-Hyperaktivität (Cortisol), reduzierte BDNF-Neuroplastizität im Hippocampus und Default-Mode-Network (DMN) Hyperkonnektivität.'
  },
  {
    id: 'ptsd_cptsd',
    name: 'Posttraumatische Belastungsstörung (PTBS / Komplexe PTBS)',
    englishName: 'Post-traumatic_stress_disorder',
    icd11Code: '6B40 / 6B41',
    dsm5Code: '309.81',
    hpoOrMondoId: 'MONDO:0005115',
    category: 'psychisch',
    categoryLabel: 'Psychische Störung',
    wikiTitleDe: 'Posttraumatische_Belastungsstörung',
    wikiTitleEn: 'Post-traumatic_stress_disorder',
    summary: 'Folgereaktion auf extrem bedrohliche Ereignisse mit Intrusionen/Flashbacks, Hyperarousal, Vermeidung, Dissoziation und veränderter Emotionsregulation.',
    keyMechanism: 'Überreagible Amygdala bei verminderter Top-Down-Hemmung durch den ventromedialen präfrontalen Kortex (vmPFC) und fragmentierter Hippocampus-Kontextualisierung.'
  },
  {
    id: 'borderline_pd',
    name: 'Borderline-Persönlichkeitsmuster (Emotionsregulationsstörung)',
    englishName: 'Borderline_personality_disorder',
    icd11Code: '6D10 / 6D11.5',
    dsm5Code: '301.83',
    hpoOrMondoId: 'MONDO:0005371',
    category: 'psychisch',
    categoryLabel: 'Psychische Störung',
    wikiTitleDe: 'Borderline-Persönlichkeitsstörung',
    wikiTitleEn: 'Borderline_personality_disorder',
    summary: 'Instabilität von Affekten, Selbstbild und zwischenmenschlichen Beziehungen, begleitet von Verlassensängsten, Spaltungserleben und stressinduzierter Dissoziation.',
    keyMechanism: 'Limbische Hyperreaktivität gekoppelt mit frontolimbischer Entkopplung unter interpersonalem Bindungsstress.'
  },
  {
    id: 'ocd',
    name: 'Zwangsstörung (Obsessive-Compulsive Disorder)',
    englishName: 'Obsessive–compulsive_disorder',
    icd11Code: '6B20',
    dsm5Code: '300.3',
    hpoOrMondoId: 'MONDO:0008114',
    category: 'psychisch',
    categoryLabel: 'Psychische Störung',
    wikiTitleDe: 'Zwangsstörung',
    wikiTitleEn: 'Obsessive–compulsive_disorder',
    summary: 'Wiederkehrende ich-dystone Zwangsgedanken, Zwangsimpulse und neutralisierende Zwangshandlungen zur Reduktion unerträglicher innerer Anspannung.',
    keyMechanism: 'Überaktivität in den kortiko-striato-thalamo-kortikalen (CSTC) Regelkreisen (insb. Orbitofrontalkortex und Nucleus caudatus).'
  },
  {
    id: 'panic_anxiety',
    name: 'Panikstörung & Generalisierte Angststörung',
    englishName: 'Panic_disorder',
    icd11Code: '6B00 / 6B01',
    dsm5Code: '300.01',
    hpoOrMondoId: 'MONDO:0005076',
    category: 'psychisch',
    categoryLabel: 'Psychische Störung',
    wikiTitleDe: 'Panikstörung',
    wikiTitleEn: 'Panic_disorder',
    summary: 'Anfallsartige vegetative Angststürme mit Todesangst, Derealisation/Depersonalisation oder chronisch flottierende Erwartungsangst.',
    keyMechanism: 'Noradrenerge Übererregung des Locus coeruleus und überschießende Chemorezeptor-Sensitivität im Hirnstamm.'
  },
  {
    id: 'dissociative_disorders',
    name: 'Dissoziative Störungen & Depersonalisations-Derealisations-Syndrom',
    englishName: 'Dissociative_disorder',
    icd11Code: '6B60–6B66',
    dsm5Code: '300.6',
    hpoOrMondoId: 'MONDO:0002495',
    category: 'psychisch',
    categoryLabel: 'Psychische Störung',
    wikiTitleDe: 'Dissoziative_Störung',
    wikiTitleEn: 'Dissociative_disorder',
    summary: 'Partielle oder vollständige Unterbrechung der normalen Integration von Bewusstsein, Gedächtnis, Identität, Körperwahrnehmung und Umweltgefühl.',
    keyMechanism: 'Präfrontale Überhemmung der anterioren Insula und Amygdala als neurobiologischer Schutzmechanismus bei Überwältigung.'
  },
  {
    id: 'anorexia_bdd',
    name: 'Anorexia nervosa & Körperdysmorphe Störung',
    englishName: 'Body_dysmorphic_disorder',
    icd11Code: '6B80 / 6B21',
    dsm5Code: '307.1 / 300.7',
    hpoOrMondoId: 'MONDO:0005351',
    category: 'psychisch',
    categoryLabel: 'Psychische Störung',
    wikiTitleDe: 'Körperdysmorphe_Störung',
    wikiTitleEn: 'Body_dysmorphic_disorder',
    summary: 'Tiefgreifende Verzerrung des eigenen Körperschemas und der Interozeption mit überwertiger Fixierung auf vermeintliche Defekte oder Körperumfang.',
    keyMechanism: 'Veränderte visuelle Detail-vs.-Holistik-Verarbeitung im fusiformen Gyrus und parietale Körperschema-Netzwerkstörung.'
  },

  // 2. Neurodivergenz & Entwicklungsprofile
  {
    id: 'adhd',
    name: 'ADHS / Aufmerksamkeitsdefizit-Hyperaktivitäts-Spektrum',
    englishName: 'Attention_deficit_hyperactivity_disorder',
    icd11Code: '6A05',
    dsm5Code: '314.01',
    hpoOrMondoId: 'MONDO:0005302',
    category: 'neurodivergent',
    categoryLabel: 'Neurodivergenz',
    wikiTitleDe: 'Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung',
    wikiTitleEn: 'Attention_deficit_hyperactivity_disorder',
    summary: 'Interessengesteuerte Aufmerksamkeitsregulation mit Wechsel zwischen Reizoffenheit/Ablenkbarkeit und tiefem Hyperfokus, Zeitblindheit, exekutiver Dysfunktion und RSD.',
    keyMechanism: 'Veränderte tonisch-phasische Dopamin- und Noradrenalin-Modulation im präfrontalen Kortex und Striatum.'
  },
  {
    id: 'autism_spectrum',
    name: 'Autismus-Spektrum (ASS / Neurodivergente Informationsverarbeitung)',
    englishName: 'Autism_spectrum',
    icd11Code: '6A02',
    dsm5Code: '299.00',
    hpoOrMondoId: 'MONDO:0005258',
    category: 'neurodivergent',
    categoryLabel: 'Neurodivergenz',
    wikiTitleDe: 'Autismus',
    wikiTitleEn: 'Autism_spectrum',
    summary: 'Spezifische neuronale Architektur mit Monotropismus, intensiver Detailwahrnehmung, veränderter Reizfilterung (Overload, Stimming), Masking und eigener sozialer Semiotik.',
    keyMechanism: 'Lokale kortikale Hyperkonnektivität bei reduzierter synaptischer Beschneidung (Pruning) und veränderter E/I-Balance (Glutamat/GABA).'
  },
  {
    id: 'tourette_tics',
    name: 'Tourette-Syndrom & Chronische Tic-Spektren',
    englishName: 'Tourette_syndrome',
    icd11Code: '8A05.0',
    dsm5Code: '307.23',
    hpoOrMondoId: 'MONDO:0008580',
    category: 'neurodivergent',
    categoryLabel: 'Neurodivergenz',
    wikiTitleDe: 'Tourette-Syndrom',
    wikiTitleEn: 'Tourette_syndrome',
    summary: 'Unwillkürliche, durch ein sensorisches Vorgefühl (Premonitory Urge) angekündigte motorische und vokale Tics sowie Echolalie/Echopraxie.',
    keyMechanism: 'Enthemmung sensomotorischer Basalganglien-Thalamus-Kortex-Schleifen mit dopaminerger Überempfindlichkeit.'
  },
  {
    id: 'synesthesia_gifted',
    name: 'Synästhesie & Hochsensibles Wahrnehmungsprofil',
    englishName: 'Synesthesia',
    icd11Code: 'Normvariante / Neurodivergenz',
    hpoOrMondoId: 'HP:0012232',
    category: 'neurodivergent',
    categoryLabel: 'Neurodivergenz',
    wikiTitleDe: 'Synästhesie',
    wikiTitleEn: 'Synesthesia',
    summary: 'Stabile, unwillkürliche Kopplung zweier oder mehrerer Sinnesmodalitäten (z. B. Graphem-Farb-Synästhesie, Ton-Raum-Kopplung) und hohe sensorische Verarbeitungstiefe.',
    keyMechanism: 'Erhöhte strukturelle und funktionelle Cross-Activation zwischen benachbarten sensorischen Kortexarealen (z. B. Areal V4 und Gyrus fusiformis).'
  },

  // 3. Neurologische Erkrankungen
  {
    id: 'temporal_lobe_epilepsy',
    name: 'Temporallappenepilepsie & Iktale/Postiktale Syndrome',
    englishName: 'Temporal_lobe_epilepsy',
    icd11Code: '8A61.2',
    hpoOrMondoId: 'MONDO:0005574',
    category: 'neurologisch',
    categoryLabel: 'Neurologie',
    wikiTitleDe: 'Temporallappenepilepsie',
    wikiTitleEn: 'Temporal_lobe_epilepsy',
    summary: 'Fokale epileptische Entladungen im mesialen Temporallappen mit intensiven Auren: Déjà-vu, Jamais-vu, olfaktorischen Halluzinationen, Derealisations- und religiösem Ekstase-Erleben.',
    keyMechanism: 'Paroxysmale hypersynchrone neuronale Entladungen in Hippocampus, Amygdala und Gyrus parahippocampalis.'
  },
  {
    id: 'lewy_body_parkinson',
    name: 'Lewy-Körper-Demenz & Morbus Parkinson',
    englishName: 'Dementia_with_Lewy_bodies',
    icd11Code: '8A22 / 8A00.0',
    hpoOrMondoId: 'MONDO:0007488',
    category: 'neurologisch',
    categoryLabel: 'Neurologie',
    wikiTitleDe: 'Lewy-Körper-Demenz',
    wikiTitleEn: 'Dementia_with_Lewy_bodies',
    summary: 'Alpha-Synukleinopathie mit stark fluktuierender Vigilanz, komplexen szenischen optischen Halluzinationen, REM-Schlaf-Verhaltensstörung, Bradykinese und Capgras-Phänomenen.',
    keyMechanism: 'Cholinerges Defizit im visuellen Assoziationskortex und nigrostriatale Dopamin-Depletion durch Alpha-Synuklein-Aggregate.'
  },
  {
    id: 'alzheimer_ftd',
    name: 'Alzheimer-Krankheit & Frontotemporale Demenz (FTD)',
    englishName: 'Frontotemporal_dementia',
    icd11Code: '8A20 / 8A23',
    hpoOrMondoId: 'MONDO:0004975',
    category: 'neurologisch',
    categoryLabel: 'Neurologie',
    wikiTitleDe: 'Frontotemporale_Demenz',
    wikiTitleEn: 'Frontotemporal_dementia',
    summary: 'Neurodegenerative Erkrankungen mit Merkfähigkeitsstörung, Orientierungsverlust (Alzheimer) bzw. Enthemmung, Affektverflachung, Apathie und Perseveration (FTD).',
    keyMechanism: 'Amyloid-Beta/Tau-Pathologie im Temporoparietalkortex bzw. TDP-43/Tau-Degeneration im Stirn- und Schläfenlappen.'
  },
  {
    id: 'migraine_alice',
    name: 'Migräne mit Aura & Alice-im-Wunderland-Syndrom',
    englishName: 'Migraine_with_aura',
    icd11Code: '8A80.1',
    hpoOrMondoId: 'MONDO:0005407',
    category: 'neurologisch',
    categoryLabel: 'Neurologie',
    wikiTitleDe: 'Migräne',
    wikiTitleEn: 'Migraine_with_aura',
    summary: 'Passagere kortikale Funktionsstörung mit Flimmerskotomen, Metamorphopsien (Mikropsie, Makropsie, Teleopsie), Zeitverzerrung, Aphasie und Reizüberempfindlichkeit.',
    keyMechanism: 'Cortical Spreading Depression (CSD) – sich langsam über den okzipitalen und temporoparietalen Kortex ausbreitende Depolarisationswelle.'
  },
  {
    id: 'narcolepsy',
    name: 'Narkolepsie & REM-Schlaf-Dissoziationsstörungen',
    englishName: 'Narcolepsy',
    icd11Code: '7A20',
    hpoOrMondoId: 'MONDO:0010679',
    category: 'neurologisch',
    categoryLabel: 'Neurologie',
    wikiTitleDe: 'Narkolepsie',
    wikiTitleEn: 'Narcolepsy',
    summary: 'Störung der Schlaf-Wach-Grenzen mit imperativem Schlafdrang, Kataplexie, Schlaflähmung und lebhaften hypnagogen/hypnopompen Halluzinationen.',
    keyMechanism: 'Autoimmuner Verlust Hypocretin/Orexin-produzierender Neurone im lateralen Hypothalamus mit direktem REM-Einbruch in den Wachzustand.'
  },
  {
    id: 'charles_bonnet',
    name: 'Charles-Bonnet-Syndrom & Sensorische Deafferentierung',
    englishName: 'Visual_release_hallucinations',
    icd11Code: '9D46 / MB27.2',
    hpoOrMondoId: 'MONDO:0007311',
    category: 'neurologisch',
    categoryLabel: 'Neurologie',
    wikiTitleDe: 'Charles-Bonnet-Syndrom',
    wikiTitleEn: 'Visual_release_hallucinations',
    summary: 'Komplexe, oft filigrane oder lilliputanische optische Pseudohalluzinationen bei Menschen mit erworbener Sehminderung (z. B. Makuladegeneration) bei völlig klarem Bewusstsein.',
    keyMechanism: 'Deafferentierungs-Hyperexzitabilität (Release-Phänomen) im visuellen Kortex durch fehlenden peripheren sensorischen Input.'
  },
  {
    id: 'stroke_tbi_korsakoff',
    name: 'Schlaganfall, Schädel-Hirn-Trauma & Korsakow-Syndrom',
    englishName: 'Korsakoff_syndrome',
    icd11Code: '8B20 / 6D72.10',
    hpoOrMondoId: 'MONDO:0006825',
    category: 'neurologisch',
    categoryLabel: 'Neurologie',
    wikiTitleDe: 'Korsakow-Syndrom',
    wikiTitleEn: 'Korsakoff_syndrome',
    summary: 'Strukturelle Hirnläsionen des Papez-Neuronenkreises, Thalamus oder Stirnhirns mit Amnesie, ausgeprägten Konfabulationen, Prosopagnosie oder Affektinkontinenz.',
    keyMechanism: 'Läsion der Corpora mammillaria und des anterioren Thalamus (Thiaminmangel) bzw. vaskuläre/traumatische Netzwerkschädigung.'
  },

  // 4. Somatische, Endokrine, Autoimmune & Metabolische Ursachen
  {
    id: 'autoimmune_encephalitis',
    name: 'Anti-NMDA-Rezeptor- & Limbische Autoimmunenzephalitis',
    englishName: 'Anti-NMDA_receptor_encephalitis',
    icd11Code: '8E4A.0',
    hpoOrMondoId: 'MONDO:0019050',
    category: 'somatisch_endokrin',
    categoryLabel: 'Autoimmun / Somatisch',
    wikiTitleDe: 'Anti-NMDA-Rezeptor-Enzephalitis',
    wikiTitleEn: 'Anti-NMDA_receptor_encephalitis',
    summary: 'Akut bis subakut einsetzendes organisches Syndrom mit Wahn, Halluzinationen, schwerer Katatonie, Bewegungsstörungen, autonomen Krisen und Gedächtnisverlust.',
    keyMechanism: 'IgG-Autoantikörper-vermittelte Internalisierung synaptischer GluN1-NMDA-Rezeptoren im limbischen System und Kortex.'
  },
  {
    id: 'delirium_sepsis_metabolic',
    name: 'Akutes Delir (Sepsis, Elektrolytentgleisung, Urämie, Hepatisch)',
    englishName: 'Delirium',
    icd11Code: '6D70',
    hpoOrMondoId: 'MONDO:0002267',
    category: 'somatisch_endokrin',
    categoryLabel: 'Somatisch / Intensivmedizin',
    wikiTitleDe: 'Delir',
    wikiTitleEn: 'Delirium',
    summary: 'Akute, organisch bedingte Bewusstseinstrübung, Desorientiertheit, Aufmerksamkeitsstörung, optische/taktile Halluzinationen und psychomotorische Unruhe.',
    keyMechanism: 'Systemische Neuroinflammation (Mikroglia-Aktivierung), Blut-Hirn-Schranken-Störung und akutes zentrales Acetylcholin-Defizit.'
  },
  {
    id: 'thyroid_endocrine',
    name: 'Schilddrüsen- & Endokrine Dysfunktion (Hyper-/Hypothyreose, Cushing)',
    englishName: 'Hyperthyroidism',
    icd11Code: '5A00 / 5A02',
    hpoOrMondoId: 'MONDO:0004425',
    category: 'somatisch_endokrin',
    categoryLabel: 'Endokrinologie',
    wikiTitleDe: 'Hyperthyreose',
    wikiTitleEn: 'Hyperthyroidism',
    summary: 'Hormonelle Über- oder Untersteuerung mit Panikattacken, Agitiertheit, Gedankenrasen, Schlaflosigkeit (Hyperthyreose) oder schwerer Antriebshemmung, Denkverlangsamung und Depressivität (Hypothyreose/Hashimoto).',
    keyMechanism: 'Direkte Modulation zentraler Beta-Adrenozeptoren und katecholaminerger Sensitivität durch Trijodthyronin (T3) bzw. Cortisol.'
  },
  {
    id: 'b12_iron_deficiency',
    name: 'Vitamin-B12-, Folsäure- & Schwerer Eisenmangel (Funikuläre Myelose)',
    englishName: 'Vitamin_B12_deficiency',
    icd11Code: '5B5K / 3A00',
    hpoOrMondoId: 'MONDO:0001643',
    category: 'somatisch_endokrin',
    categoryLabel: 'Metabolisch / Hämatologisch',
    wikiTitleDe: 'Vitamin-B12-Mangel',
    wikiTitleEn: 'Vitamin_B12_deficiency',
    summary: 'Neuropsychiatrisches Mangelsyndrom, das oft vor einer Anämie mit Brain Fog, Merkfähigkeitsstörung, Apathie, Parästhesien/Zönästhesien und sogar organischen Psychosen („Megaloblastic Madness“) auftritt.',
    keyMechanism: 'Gestörte Myelinisierung und S-Adenosylmethionin-(SAM)-abhängige Neurotransmittersynthese im ZNS.'
  },
  {
    id: 'mecfs_longcovid_pots',
    name: 'ME/CFS, Post-COVID-Syndrom & Dysautonomie (POTS)',
    englishName: 'Myalgic_encephalomyelitis/chronic_fatigue_syndrome',
    icd11Code: '8E49 / RA02',
    hpoOrMondoId: 'MONDO:0005404',
    category: 'somatisch_endokrin',
    categoryLabel: 'Neuroimmunologisch',
    wikiTitleDe: 'Chronisches_Fatigue-Syndrom',
    wikiTitleEn: 'Myalgic_encephalomyelitis/chronic_fatigue_syndrome',
    summary: 'Neuroimmunologische Multisystemerkrankung mit Post-Exertional Malaise (PEM), ausgeprägtem „Brain Fog“ (Wortfindungs- und Arbeitsgedächtnisstörung), Reizüberempfindlichkeit und orthostatischer Tachykardie.',
    keyMechanism: 'Endotheliale Dysfunktion, zerebrale Hypoperfusion, mitochondriale Bioenergetik-Störung und chronische Neuroinflammation.'
  },

  // 5. Substanz-, Medikamenten- & Toxische Wirkungen
  {
    id: 'substance_intox_withdrawal',
    name: 'Substanzintoxikation & Entzugssyndrom (Psychedelika, Stimulanzien, Alkohol)',
    englishName: 'Substance-induced_psychosis',
    icd11Code: '6C40–6C4G',
    hpoOrMondoId: 'MONDO:0005434',
    category: 'substanz_medikament',
    categoryLabel: 'Toxikologie / Substanzwirkung',
    wikiTitleDe: 'Substanzinduzierte_Psychose',
    wikiTitleEn: 'Substance-induced_psychosis',
    summary: 'Durch exogene Substanzen (LSD, Psilocybin, Amphetamine, Cannabis, Alkoholentzug) ausgelöste Bewusstseinsverschiebung, Synästhesien, Pseudohalluzinationen, Formikationen oder paranoide Syndrome.',
    keyMechanism: '5-HT2A-Rezeptor-Agonismus (Psychedelika), massive Dopamin/Noradrenalin-Ausschüttung (Stimulanzien) oder GABA-Entzugs-Glutamat-Exzitotoxizität (Alkohol-Delir).'
  },
  {
    id: 'medication_neuroleptic_side_effects',
    name: 'Medikamenteninduzierte Syndrome (Antipsychotika, Kortikosteroide, Anticholinergika, L-Dopa)',
    englishName: 'Extrapyramidal_symptoms',
    icd11Code: 'NE60 / 8A04',
    hpoOrMondoId: 'HP:0002071',
    category: 'substanz_medikament',
    categoryLabel: 'Pharmakologie / UAW',
    wikiTitleDe: 'Extrapyramidales_Syndrom',
    wikiTitleEn: 'Extrapyramidal_symptoms',
    summary: 'Durch Arzneimittel ausgelöste Phänomene wie quälende Sitzunruhe (Akathisie unter D2-Blockern/SSRI), Steroid-Manie, L-Dopa-Halluzinose oder anticholinerges Delir.',
    keyMechanism: 'Nigrostriatale D2-Rezeptor-Blockade (Akathisie/Parkinsonoid), Glukokortikoid-Rezeptor-Überstimulation oder zentrale Muskarinrezeptor-Blockade.'
  },

  // 6. Physiologische Grenzerfahrungen & Normvarianten
  {
    id: 'sleep_deprivation_stress_grief',
    name: 'Extremer Schlafentzug, Akute Trauerreaktion & Sensorische Deprivation',
    englishName: 'Effects_of_sleep_deprivation_on_cognitive_performance',
    icd11Code: 'QE84 / Physiologisch',
    hpoOrMondoId: 'HP:0002360',
    category: 'physiologisch_norm',
    categoryLabel: 'Physiologische Grenzerfahrung',
    wikiTitleDe: 'Schlafentzug',
    wikiTitleEn: 'Sleep_deprivation',
    summary: 'Nicht-pathologische Ausnahmezustände des gesunden Gehirns bei >48h Schlafentzug, Reizentzug, Fieber oder akutem Verlust: Illusionen, hypnagoge Bilder, Depersonalisation und sogenannte „Witwen-Halluzinationen“.',
    keyMechanism: 'Lokale kortikale „Micro-Sleeps“ im Wachzustand, Adenosin-Akkumulation und kompensatorische Top-Down-Projektion bei Reizmangel.'
  }
];
