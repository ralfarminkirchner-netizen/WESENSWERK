export interface SimulationFollowUpOption {
  id: string;
  label: string;
  findingSummary: string;
  addedPhenomenaIds: string[];
  removedPhenomenaIds?: string[];
  conditionMultipliers: Record<string, number>;
  clinicalRationale: string;
}

export interface SimulationFollowUpStep {
  id: string;
  stepNumber: number;
  categoryBadge: string;
  question: string;
  clinicalPrompt: string;
  options: SimulationFollowUpOption[];
}

export interface ClinicalSimulationProfile {
  id: string;
  code: string;
  title: string;
  patientDemographics: string;
  chiefComplaint: string;
  clinicalVignette: string;
  initialPhenomenaIds: string[];
  competingConditionIds: string[];
  steps: SimulationFollowUpStep[];
}

export const CLINICAL_SIMULATION_PROFILES: ClinicalSimulationProfile[] = [
  {
    id: 'sim_nmda_vs_schizophrenia',
    code: 'SIM-01',
    title: 'Lena M. (24 J.) — Akute Wahnstimmung, Stimmenhören & Katatonie',
    patientDemographics: '24-jährige Architekturstudentin, Erstmanifestation',
    chiefComplaint: 'Subakute Wahnstimmung, dialogisierende Stimmen, Ich-Störungen & mutistische Starre',
    clinicalVignette:
      'Lena M. wird notfallmäßig vorgestellt: Seit 10 Tagen erlebt sie eine unheimliche Bedeutungsaufladung ihrer Umgebung (Wahnstimmung), hört kommentierende Stimmen und berichtet, fremde Gedanken würden in ihren Kopf eingegeben. In den letzten 24 Stunden verharrt sie zunehmend stumm und regungslos.',
    initialPhenomenaIds: [
      'delusional_mood_salience',
      'auditory_hallucinations_voices',
      'thought_insertion_withdrawal'
    ],
    competingConditionIds: [
      'schizophrenia',
      'autoimmune_encephalitis',
      'substance_intox_withdrawal',
      'bipolar_disorder'
    ],
    steps: [
      {
        id: 'step_1_onset',
        stepNumber: 1,
        categoryBadge: '1. Zeitdynamik & Prodrom',
        question: 'Wie entwickelte sich das Syndrom in den 2 Wochen vor den ersten psychotischen Phänomenen?',
        clinicalPrompt:
          'Differenzierung zwischen rasch progredientem organisch-enzephalitischem Verlauf, längerem schizophrenem Prodrom oder exogener Substanzwirkung.',
        options: [
          {
            id: 'opt_viral_subacute',
            label: 'Subakuter Beginn (< 14 Tage) nach grippalem Infekt mit Fieber (38,3 °C) & Kopfschmerz',
            findingSummary: 'Rascher Übergang von viralem Vorstadium in Psychose mit katatonem Stupor',
            addedPhenomenaIds: ['catatonia_stupor_mutism'],
            conditionMultipliers: {
              autoimmune_encephalitis: 1.48,
              delirium_sepsis_metabolic: 1.25,
              schizophrenia: 0.72,
              bipolar_disorder: 0.78
            },
            clinicalRationale:
              'Ein subakuter Beginn (< 3 Monate) nach viralem Prodrom mit rascher Entwicklung katatoner Phänomene ist ein Hauptwarnzeichen („Red Flag“) für eine Anti-NMDA-Rezeptor-Autoimmunenzephalitis.'
          },
          {
            id: 'opt_chronic_prodrome',
            label: 'Schleichendes Prodrom über 14 Monate mit sozialem Rückzug & Gedankenabreißen (afebril)',
            findingSummary: 'Mehrjähriger Knick in der Lebenslinie mit formalen Denkstörungen ohne Infektzeichen',
            addedPhenomenaIds: ['thought_blocking_derailment'],
            conditionMultipliers: {
              schizophrenia: 1.38,
              autoimmune_encephalitis: 0.62,
              delirium_sepsis_metabolic: 0.52,
              substance_intox_withdrawal: 0.7
            },
            clinicalRationale:
              'Ein über Monate verlaufendes Prodromalstadium mit formalen Denkstörungen (Gedankenabreißen) bei fehlenden Infekt- oder Entzündungszeichen stützt eine primäre Schizophrenie (ICD-11 6A20).'
          },
          {
            id: 'opt_substance_sleep',
            label: 'Akuter Ausbruch unmittelbar nach 72h Schlafentzug & Psychedelika-/Amphetamin-Konsum',
            findingSummary: 'Unmittelbare zeitliche Kopplung an exogene psychotrope Substanzen und Schlafentzug',
            addedPhenomenaIds: ['consciousness_expansion_shift'],
            conditionMultipliers: {
              substance_intox_withdrawal: 1.62,
              sleep_deprivation_stress_grief: 1.38,
              schizophrenia: 0.76,
              autoimmune_encephalitis: 0.58
            },
            clinicalRationale:
              'Der unmittelbare Beginn nach hochdosierten Halluzinogenen/Stimulanzien und Schlafentzug verschiebt die Gewichtung primär auf eine substanzinduzierte Psychose.'
          }
        ]
      },
      {
        id: 'step_2_motor_cognitive',
        stepNumber: 2,
        categoryBadge: '2. Neuro-Psychomotorik & Kognition',
        question: 'Welche motorischen, vegetativen oder kognitiven Befunde zeigen sich bei der Untersuchung?',
        clinicalPrompt:
          'Prüfung auf extrapyramidale Dyskinesien, autonome Instabilität, Merkfähigkeitsstörungen oder klassische Erstrang-Wahnwahrnehmungen.',
        options: [
          {
            id: 'opt_dyskinesia_brainfog',
            label: 'Orofaziale Dyskinesien (Kaubewegungen), autonome Tachykardie & schwere Merkfähigkeitsstörung',
            findingSummary: 'Kombination aus kataton-hyperkinetischer Motorik, Dysautonomie und Amnesie',
            addedPhenomenaIds: ['cognitive_dysfunction_brain_fog', 'psychomotor_agitation_hyperkinesia'],
            conditionMultipliers: {
              autoimmune_encephalitis: 1.54,
              delirium_sepsis_metabolic: 1.24,
              schizophrenia: 0.65
            },
            clinicalRationale:
              'Orofaziale Dyskinesien, autonome Krisen und mnestische Ausfälle reflektieren die direkte Internalisierung synaptischer GluN1-NMDA-Rezeptoren im Hippocampus und Striatum.'
          },
          {
            id: 'opt_delusional_perception_clear',
            label: 'Zweigliedrige Wahnwahrnehmungen bei voll erhaltenem Bewusstsein & intakter Orientierung',
            findingSummary: 'Systematisierter Wahn und Kurt-Schneider-Erstrangsymptome ohne Vigilanzminderung',
            addedPhenomenaIds: ['delusional_perception'],
            conditionMultipliers: {
              schizophrenia: 1.42,
              autoimmune_encephalitis: 0.64,
              delirium_sepsis_metabolic: 0.45
            },
            clinicalRationale:
              'Zweigliedrige Wahnwahrnehmungen bei klarer Vigilanz und fehlenden neurologischen Herdsymptomen sind hochspezifisch für das schizophrene Spektrum.'
          },
          {
            id: 'opt_euphoric_flight',
            label: 'Expansive Euphorie, Ideenflucht, Größenideen & aufgehobenes Schlafbedürfnis',
            findingSummary: 'Manisch-expansives Syndrom mit Ideenflucht und synthymen psychotischen Merkmalen',
            addedPhenomenaIds: ['flight_of_ideas', 'euphoria_expansive_mood'],
            conditionMultipliers: {
              bipolar_disorder: 1.65,
              schizophrenia: 0.85,
              autoimmune_encephalitis: 0.65
            },
            clinicalRationale:
              'Das Hinzutreten von Ideenflucht und expansiver Euphorie verschiebt die Differentialdiagnose in Richtung einer schweren manischen Episode mit psychotischen Symptomen (Bipolar I).'
          }
        ]
      },
      {
        id: 'step_3_diagnostics',
        stepNumber: 3,
        categoryBadge: '3. Liquor, EEG & Labor',
        question: 'Welchen Befund liefern Lumbalpunktion (Liquor), EEG und Toxikologie-Screening?',
        clinicalPrompt:
          'Entscheidende apparative und laborchemische Sicherung der Ätiologie.',
        options: [
          {
            id: 'opt_csf_nmda_positive',
            label: 'EEG mit „Extreme Delta Brush“, Liquor-Pleozytose & positive Anti-GluN1-(NMDA)-IgG-Antikörper',
            findingSummary: 'Nachweis spezifischer antineuronaler IgG-Autoantikörper im Liquor',
            addedPhenomenaIds: [],
            conditionMultipliers: {
              autoimmune_encephalitis: 1.72,
              schizophrenia: 0.42,
              bipolar_disorder: 0.45,
              substance_intox_withdrawal: 0.4
            },
            clinicalRationale:
              'Beweisender Befund einer Anti-NMDA-Rezeptor-Autoimmunenzephalitis (ICD-11 8E4A.0). Sofortige Immuntherapie (Hochdosis-Steroide, Plasmapherese/IVIG) und Teratom-Suche erforderlich.'
          },
          {
            id: 'opt_csf_eeg_normal_primary',
            label: 'cMRT, EEG, Liquor-Autoantikörper-Panel & Drogenscreening vollständig unauffällig',
            findingSummary: 'Ausschluss entzündlicher, struktureller und toxischer ZNS-Ursachen',
            addedPhenomenaIds: [],
            conditionMultipliers: {
              schizophrenia: 1.48,
              autoimmune_encephalitis: 0.35,
              delirium_sepsis_metabolic: 0.35,
              substance_intox_withdrawal: 0.42
            },
            clinicalRationale:
              'Nach vollständigem Ausschluss autoimmuner, metabolischer und toxischer Ursachen bestätigt sich die Diagnose einer primären psychotischen Störung (Schizophrenie, ICD-11 6A20).'
          },
          {
            id: 'opt_tox_positive',
            label: 'Toxikologie positiv für synthetische Cathinone/Amphetamine & LSD-Metaboliten (Liquor blande)',
            findingSummary: 'Klinisch-toxikologischer Nachweis exogener Psychotomimetika',
            addedPhenomenaIds: [],
            conditionMultipliers: {
              substance_intox_withdrawal: 1.75,
              schizophrenia: 0.55,
              autoimmune_encephalitis: 0.35
            },
            clinicalRationale:
              'Der direkte Substanznachweis bei blandem Liquor sichert die substanzinduzierte psychotische Störung (ICD-11 6C40).'
          }
        ]
      }
    ]
  },
  {
    id: 'sim_neurodivergence_vs_burnout',
    code: 'SIM-02',
    title: 'Jonas K. (31 J.) — Reizüberflutung, Hyperfokus & Exekutive Paralyse',
    patientDemographics: '31-jähriger Softwarearchitekt, ambulante Differentialdiagnostik',
    chiefComplaint: 'Wechsel zwischen tiefem Hyperfokus und Handlungsblockade, Zeitblindheit & sensorischer Overload',
    clinicalVignette:
      'Jonas K. berichtet über extreme Konzentrationsspitzen bei komplexen Programmierproblemen (Hyperfokus), während er im Alltag vor einfachen Formularen wie gelähmt sitzt (Exekutive Paralyse). Seit der Einführung eines Großraumbüros kommt es zu massiver Reizüberflutung und Erschöpfung.',
    initialPhenomenaIds: [
      'hyperfocus_tunnel',
      'executive_paralysis',
      'subjective_time_distortion',
      'sensory_overload_flooding'
    ],
    competingConditionIds: [
      'adhd',
      'autism_spectrum',
      'mecfs_longcovid_pots',
      'major_depression'
    ],
    steps: [
      {
        id: 'step_1_developmental',
        stepNumber: 1,
        categoryBadge: '1. Entwicklungsanamnese',
        question: 'Wie stellt sich die biografische Entwicklung seit der Kindheit und Grundschulzeit dar?',
        clinicalPrompt:
          'Abgrenzung primärer lebenslanger Neurodivergenz (ADHS / ASS) von sekundär erworbenen neuroimmunologischen oder affektiven Syndromen.',
        options: [
          {
            id: 'opt_childhood_audhd_masking',
            label: 'Seit Grundschulzeit bestehend; ausgeprägtes soziales Masking, Monotropismus & motorisches Stimming',
            findingSummary: 'Durchgängige neurodivergente Entwicklungsgeschichte mit Camouflaging und Stimming',
            addedPhenomenaIds: ['masking_camouflaging', 'stimming_self_regulation'],
            conditionMultipliers: {
              autism_spectrum: 1.52,
              adhd: 1.32,
              major_depression: 0.68,
              mecfs_longcovid_pots: 0.62
            },
            clinicalRationale:
              'Frühkindlicher Beginn mit Monotropismus, Stimming zur sensorischen Selbstregulation und kompensatorischem Masking weist stark auf das Autismus-Spektrum (ggf. AuDHD) hin.'
          },
          {
            id: 'opt_novelty_seeking_rsd',
            label: 'Seit Kindheit stark interessengesteuerte Aufmerksamkeit, Tagträumen, Zeitblindheit & hohe Zurückweisungsempfindlichkeit (RSD)',
            findingSummary: 'Klassisches dopaminerges Aufmerksamkeitsprofil mit Rejection Sensitive Dysphoria',
            addedPhenomenaIds: ['rejection_sensitive_dysphoria'],
            conditionMultipliers: {
              adhd: 1.56,
              autism_spectrum: 1.1,
              major_depression: 0.72
            },
            clinicalRationale:
              'Interessengesteuerte Aufmerksamkeitsregulation kombiniert mit Zeitblindheit und starker emotionaler Reagibilität auf Kritik (RSD) ist das Kernprofil der adulten ADHS.'
          },
          {
            id: 'opt_postviral_new_onset',
            label: 'Bis vor 9 Monaten völlig unauffällig; abrupter Beginn nach Virusinfektion mit schwerem Brain Fog',
            findingSummary: 'Sekundärer postinfektiöser Beginn ohne neurodivergente Kindheitsanamnese',
            addedPhenomenaIds: ['cognitive_dysfunction_brain_fog'],
            conditionMultipliers: {
              mecfs_longcovid_pots: 1.65,
              adhd: 0.5,
              autism_spectrum: 0.45
            },
            clinicalRationale:
              'Ein erst im Erwachsenenalter nach Virusinfekt aufgetretenes exekutives und sensorisches Defizit spricht gegen ADHS/ASS und für ein Post-COVID-/ME/CFS-Syndrom.'
          }
        ]
      },
      {
        id: 'step_2_overload_response',
        stepNumber: 2,
        categoryBadge: '2. Reiz- & Belastungsreaktion',
        question: 'Wie reagiert das Nervensystem auf sensorische Überflutung oder körperlich-kognitive Anstrengung?',
        clinicalPrompt:
          'Differenzierung zwischen autistischem Meltdown/Shutdown, Post-Exertional Malaise (PEM) und melancholischer Anhedonie.',
        options: [
          {
            id: 'opt_autistic_shutdown',
            label: 'Akuter Verlust der Sprechfähigkeit (Shutdown) bei Reizflut; rasche Erholung in stiller Dunkelheit',
            findingSummary: 'Reizabhängiger Autistic Shutdown mit gut erhaltenem Interesse an Spezialthemen',
            addedPhenomenaIds: ['autistic_meltdown_shutdown'],
            conditionMultipliers: {
              autism_spectrum: 1.54,
              adhd: 1.15,
              major_depression: 0.58
            },
            clinicalRationale:
              'Ein reizgetriggerter Shutdown mit rascher Erholung nach Reizabschirmung und erhaltener Freude an Spezialinteressen grenzt den autistischen Overload klar von der Depression ab.'
          },
          {
            id: 'opt_pem_crash',
            label: 'Zeitverzögerte Zustandsverschlechterung 24h nach Belastung (PEM) mit Orthostase-Tachykardie (POTS)',
            findingSummary: 'Neuroimmunologische Belastungsintoleranz (Post-Exertional Malaise)',
            addedPhenomenaIds: ['quantitative_vigilance_reduction'],
            conditionMultipliers: {
              mecfs_longcovid_pots: 1.62,
              major_depression: 0.65,
              adhd: 0.58
            },
            clinicalRationale:
              'Die zeitverzögerte Post-Exertional Malaise (PEM) mit vegetativer Orthostase-Intoleranz ist pathognomonisch für ME/CFS.'
          },
          {
            id: 'opt_melancholic_anhedonia',
            label: 'Durchgängige Anhedonie (auch für frühere Hobbys), Morgentief & quälendes Grübeln',
            findingSummary: 'Vitale Freudlosigkeit und zirkadianes Morgentief',
            addedPhenomenaIds: ['anhedonia_loss_of_pleasure', 'morning_low_circadian'],
            conditionMultipliers: {
              major_depression: 1.6,
              adhd: 0.78,
              autism_spectrum: 0.72
            },
            clinicalRationale:
              'Wenn selbst hochgeschätzte Spezialinteressen keinerlei positive Resonanz mehr auslösen und ein Morgentief besteht, liegt eine depressive Episode vor.'
          }
        ]
      },
      {
        id: 'step_3_neuropsych_testing',
        stepNumber: 3,
        categoryBadge: '3. Testdiagnostik & Provokation',
        question: 'Welches Ergebnis liefern strukturierte Diagnostik (DIVA-5, ADOS-2, Schellong/NASA-Lean-Test)?',
        clinicalPrompt:
          'Standardisierte testpsychologische und funktionelle Befundsicherung.',
        options: [
          {
            id: 'opt_diva5_stimulant_response',
            label: 'DIVA-5/CAARS positiv (Kindheit + Erwachsenenalter); prompte Fokus-Stabilisierung unter Stimulanzien',
            findingSummary: 'Gesicherte adulte ADHS mit dopaminerger Responsivität',
            addedPhenomenaIds: [],
            conditionMultipliers: {
              adhd: 1.65,
              autism_spectrum: 0.88,
              mecfs_longcovid_pots: 0.48,
              major_depression: 0.62
            },
            clinicalRationale:
              'Der Nachweis lebenslanger Kernsymptome im DIVA-5 und die paradoxe Beruhigung/Fokus-Stabilisierung unter Dopamin-Wiederaufnahmehemmern sichern die Diagnose ADHS (ICD-11 6A05).'
          },
          {
            id: 'opt_ados2_double_empathy',
            label: 'ADOS-2 / RAADS-R positiv; ausgeprägtes Double-Empathy-Phänomen & sensorische Detailverarbeitung',
            findingSummary: 'Gesichertes Autismus-Spektrum-Profil (ggf. mit komorbider ADHS)',
            addedPhenomenaIds: ['double_empathy_social_semiotics'],
            conditionMultipliers: {
              autism_spectrum: 1.65,
              adhd: 1.15,
              major_depression: 0.52
            },
            clinicalRationale:
              'Sichert eine autistische Informationsverarbeitungs-Architektur (ICD-11 6A02) mit hoher sensorischer Sensitivität.'
          },
          {
            id: 'opt_nasa_lean_pots_positive',
            label: 'NASA-Lean-Test mit Pulsanstieg +42/min im Stehen (POTS) & dokumentierter PEM-Kaskade',
            findingSummary: 'Objektivierte autonome Dysregulation und ME/CFS',
            addedPhenomenaIds: [],
            conditionMultipliers: {
              mecfs_longcovid_pots: 1.72,
              adhd: 0.45,
              autism_spectrum: 0.45
            },
            clinicalRationale:
              'Objektivierter Nachweis von POTS und ME/CFS (ICD-11 8E49); Pacing und symptomatische Kreislaufstabilisierung statt aktivierender Belastungstherapie indiziert.'
          }
        ]
      }
    ]
  },
  {
    id: 'sim_tle_vs_dissociation',
    code: 'SIM-03',
    title: 'Clara V. (38 J.) — Déjà-vu-Auren, Phantosmie & Derealisation',
    patientDemographics: '38-jährige Grafikerin, paroxysmale Wahrnehmungs- & Bewusstseinsepisoden',
    chiefComplaint: 'Anfallsartige Derealisation, übermächtiges Déjà-vu und Geruch von verbranntem Gummi',
    clinicalVignette:
      'Clara V. erlebt mehrfach pro Woche plötzlich einsetzende Episoden, in denen ihr die vertraute Umgebung fremd und traumartig erscheint (Derealisation), begleitet von einem überwältigenden Déjà-vu-Gefühl und einem intensiven Geruch nach verbranntem Gummi (Phantosmie).',
    initialPhenomenaIds: [
      'deja_vu_jamais_vu',
      'olfactory_gustatory_hallucinations',
      'derealization',
      'consciousness_narrowing'
    ],
    competingConditionIds: [
      'temporal_lobe_epilepsy',
      'dissociative_disorders',
      'panic_anxiety',
      'migraine_alice'
    ],
    steps: [
      {
        id: 'step_1_episode_kinetics',
        stepNumber: 1,
        categoryBadge: '1. Episoden-Kinetik & Aura',
        question: 'Wie lange dauern die einzelnen Episoden und wie kündigen sie sich an?',
        clinicalPrompt:
          'Zeitliche Kinetik unterscheidet epileptische Entladungen (Sekunden), Migräne-CSD (15–30 Min.) und dissoziative Zustände (Stunden).',
        options: [
          {
            id: 'opt_stereotyped_90sec_epigastric',
            label: 'Exakt 45–90 Sekunden Dauer aus völliger Ruhe, Beginn mit aufsteigender epigastrischer Aura & Schmatzen',
            findingSummary: 'Hochstereotype Kurzzeit-Episoden mit epigastrischer Aura und oralen Automatismen',
            addedPhenomenaIds: [],
            conditionMultipliers: {
              temporal_lobe_epilepsy: 1.56,
              dissociative_disorders: 0.6,
              panic_anxiety: 0.65,
              migraine_alice: 0.7
            },
            clinicalRationale:
              'Stereotype Episoden unter 2 Minuten mit epigastrischer Aura, olfaktorischer Halluzination („Uncinate Fit“) und oralen Automatismen sind hochgradig typisch für fokale Temporallappenanfälle.'
          },
          {
            id: 'opt_trauma_triggered_hours',
            label: '30 Minuten bis mehrere Stunden nach emotionalen Konflikten/Triggern; Körper wirkt fremd & taub',
            findingSummary: 'Situativ getriggerte, prolongierte Depersonalisation und Derealisation',
            addedPhenomenaIds: ['depersonalization', 'flashbacks_intrusions'],
            conditionMultipliers: {
              dissociative_disorders: 1.52,
              ptsd_cptsd: 1.46,
              temporal_lobe_epilepsy: 0.55
            },
            clinicalRationale:
              'Stundenlange, durch zwischenmenschlichen Stress oder Trauma-Erinnerungen ausgelöste Entfremdung spricht für eine frontolimbische dissoziative Überhemmung.'
          },
          {
            id: 'opt_visual_march_metamorphopsia',
            label: 'Langsamer Aufbau über 20 Minuten mit Flimmerskotom & Größenverzerrung (Mikropsie), danach Kopfschmerz',
            findingSummary: '20-minütiger visueller Aufbau (Cortical Spreading Depression) mit Metamorphopsie',
            addedPhenomenaIds: ['alice_in_wonderland_metamorphopsia', 'visual_hallucinations_illusions'],
            conditionMultipliers: {
              migraine_alice: 1.65,
              temporal_lobe_epilepsy: 0.72,
              dissociative_disorders: 0.55
            },
            clinicalRationale:
              'Ein langsamer 20-Minuten-Aufbau mit Mikropsie/Makropsie und nachfolgendem Kopfschmerz kennzeichnet die Migräne mit Aura / Alice-im-Wunderland-Phänomen.'
          }
        ]
      },
      {
        id: 'step_2_postictal_phase',
        stepNumber: 2,
        categoryBadge: '2. Postiktale Phase & Vegetativum',
        question: 'Welche Symptome bestehen unmittelbar nach dem Abklingen der Kernepisode?',
        clinicalPrompt:
          'Prüfung auf postiktale Reorientierungsstörung/Aphasie vs. paniktypische Fluchttendenz.',
        options: [
          {
            id: 'opt_postictal_aphasia_amnesia',
            label: '10-minütige Desorientiertheit, Wortfindungsstörungen & Erinnerungslücke für die Episode',
            findingSummary: 'Postiktale Desorientiertheit und transiente Aphasie',
            addedPhenomenaIds: ['disorientation_spacetime'],
            conditionMultipliers: {
              temporal_lobe_epilepsy: 1.58,
              panic_anxiety: 0.48,
              dissociative_disorders: 0.58
            },
            clinicalRationale:
              'Eine postiktale Umdämmerung mit transienter Sprachstörung beweist die vorangegangene iktale Erschöpfung temporaler Sprach- und Gedächtnisnetzwerke.'
          },
          {
            id: 'opt_panic_hyperventilation',
            label: 'Massive Todesangst, Hyperventilation, Herzrasen & sofortiger Fluchtimpuls bei lückenloser Erinnerung',
            findingSummary: 'Akuter noradrenerger Paniksturm ohne Bewusstseinsverlust',
            addedPhenomenaIds: [],
            conditionMultipliers: {
              panic_anxiety: 1.62,
              dissociative_disorders: 1.15,
              temporal_lobe_epilepsy: 0.58
            },
            clinicalRationale:
              'Dominierende Todes-/Kontrollverlustangst mit Hyperventilation und erhaltener Erinnerung stützt eine Panikstörung mit sekundärer Derealisation.'
          }
        ]
      },
      {
        id: 'step_3_eeg_mri',
        stepNumber: 3,
        categoryBadge: '3. Video-EEG & 3T-MRT',
        question: 'Welchen Befund zeigen Schlafentzugs-/Langzeit-Video-EEG und Dünnschicht-MRT des Temporallappens?',
        clinicalPrompt:
          'Elektrophysiologische und strukturelle Korrelation.',
        options: [
          {
            id: 'opt_tle_spikes_sclerosis',
            label: 'Links-mesiotemporale Sharp-Waves im EEG & Hippocampussklerose im 3-Tesla-MRT',
            findingSummary: 'Elektroklinisch gesicherte mesiale Temporallappenepilepsie',
            addedPhenomenaIds: [],
            conditionMultipliers: {
              temporal_lobe_epilepsy: 1.72,
              dissociative_disorders: 0.38,
              panic_anxiety: 0.38
            },
            clinicalRationale:
              'Sichert die Diagnose einer mesialen Temporallappenepilepsie (ICD-11 8A61.2); antikonvulsive Therapie (z. B. Lamotrigin/Levetiracetam) führt meist zum Sistieren der Déjà-vu- und Derealisations-Auren.'
          },
          {
            id: 'opt_eeg_normal_dissociative',
            label: 'Unauffälliges 72h-Video-EEG während einer typischen Episode; unauffälliges MRT',
            findingSummary: 'Ausschluss iktaler Aktivität während einer symptomatischen Entfremdungsepisode',
            addedPhenomenaIds: [],
            conditionMultipliers: {
              dissociative_disorders: 1.62,
              ptsd_cptsd: 1.35,
              temporal_lobe_epilepsy: 0.32
            },
            clinicalRationale:
              'Ein unauffälliges iktales Video-EEG schließt eine epileptische Genese weitgehend aus und sichert das Depersonalisations-Derealisations-Syndrom (ICD-11 6B66).'
          }
        ]
      }
    ]
  },
  {
    id: 'sim_melancholia_vs_endocrine',
    code: 'SIM-04',
    title: 'Dr. Martin H. (52 J.) — Gefühllosigkeit, Denkhemmung & Antriebslähmung',
    patientDemographics: '52-jähriger Gymnasiallehrer, subakutes depressiv-dysexekutives Syndrom',
    chiefComplaint: 'Gefühl der Gefühllosigkeit, quälende Denkhemmung, Anhedonie & bleierne Erschöpfung',
    clinicalVignette:
      'Dr. Martin H. klagt seit 4 Monaten über eine tiefgreifende innere Versteinerung („Ich fühle nicht einmal mehr Trauer“), massive Denkverlangsamung und Antriebslähmung. Vor der Einleitung einer antidepressiven Pharmakotherapie soll geklärt werden, ob eine primäre Melancholie oder ein somatisch-endokrines Mimic vorliegt.',
    initialPhenomenaIds: [
      'feeling_of_feelinglessness',
      'anhedonia_loss_of_pleasure',
      'thought_inhibition_retardation',
      'abulia_drive_inhibition'
    ],
    competingConditionIds: [
      'major_depression',
      'thyroid_endocrine',
      'b12_iron_deficiency',
      'alzheimer_ftd'
    ],
    steps: [
      {
        id: 'step_1_circadian_somatic',
        stepNumber: 1,
        categoryBadge: '1. Zirkadianik & Vegetativum',
        question: 'Wie verhält sich die Symptomatik im Tagesverlauf und welche körperlichen Begleitzeichen bestehen?',
        clinicalPrompt:
          'Prüfung auf zirkadianes Morgentief vs. metabolisch-endokrine oder neuropathische Leitsymptome.',
        options: [
          {
            id: 'opt_morning_low_guilt',
            label: 'Ausgeprägtes Morgentief mit Erwachen um 04:00 Uhr, Schuldgrübeln & leichter Abendaufhellung',
            findingSummary: 'Klassische melancholische Zirkadianik mit terminaler Insomnie',
            addedPhenomenaIds: ['morning_low_circadian', 'rumination_perseveration'],
            conditionMultipliers: {
              major_depression: 1.54,
              thyroid_endocrine: 0.72,
              b12_iron_deficiency: 0.68
            },
            clinicalRationale:
              'Das zirkadiane Morgentief mit frühmorgendlichem Erwachen und abendlicher Aufhellung ist ein hochspezifischer biologischer Marker der melancholischen Depression.'
          },
          {
            id: 'opt_cold_bradycardia_myxedema',
            label: 'Tageszeitunabhängige Erschöpfung, ausgeprägte Kälteintoleranz, Bradykardie (50/min) & Gewichtszunahme',
            findingSummary: 'Klinische Zeichen eines systemischen Hypometabolismus',
            addedPhenomenaIds: ['cognitive_dysfunction_brain_fog'],
            conditionMultipliers: {
              thyroid_endocrine: 1.6,
              major_depression: 0.7
            },
            clinicalRationale:
              'Kälteintoleranz, Bradykardie und Brain Fog ohne zirkadiane Rhythmik lenken den Verdacht unmittelbar auf eine schwere Hypothyreose.'
          },
          {
            id: 'opt_paresthesia_ataxia',
            label: 'Brennende Parästhesien/Zönästhesien an Händen & Füßen, Zungenbrennen & unsicherer Gang im Dunkeln',
            findingSummary: 'Neuropsychiatrisches Syndrom mit peripher-neuropathischen und spinalen Zeichen',
            addedPhenomenaIds: ['coenesthesia_bodily_hallucinations', 'cognitive_dysfunction_brain_fog'],
            conditionMultipliers: {
              b12_iron_deficiency: 1.64,
              major_depression: 0.65,
              thyroid_endocrine: 0.72
            },
            clinicalRationale:
              'Die Kombination aus Apathie/Denkhemmung und sensibler Hinterstrangsymptomatik ist hochverdächtig auf einen schweren Vitamin-B12-Mangel (Funikuläre Myelose).'
          }
        ]
      },
      {
        id: 'step_2_cognitive_profile',
        stepNumber: 2,
        categoryBadge: '2. Neuropsychologie & Einsicht',
        question: 'Welches Muster zeigt sich in der Gedächtnisprüfung und im subjektiven Störungsbewusstsein?',
        clinicalPrompt:
          'Abgrenzung depressiver Pseudodemenz von echter neurodegenerativer Amnesie/FTD.',
        options: [
          {
            id: 'opt_depressive_pseudodementia',
            label: 'Hoher Leidensdruck über eigene Denkhemmung; bei geduldiger Ermutigung intakte Speicherleistung',
            findingSummary: 'Anstrengungsabhängige Denkhemmung ohne echten Speicherverlust',
            addedPhenomenaIds: [],
            conditionMultipliers: {
              major_depression: 1.44,
              alzheimer_ftd: 0.52
            },
            clinicalRationale:
              'Bei der depressiven Pseudodemenz klagen Patienten intensiv über kognitive Defizite, zeigen aber bei ausreichender Zeit intakte Enkodierungs- und Abrufleistungen.'
          },
          {
            id: 'opt_anosognosia_confabulation',
            label: 'Fehlende Krankheitseinsicht (Anosognosie), echte Merkfähigkeitsausfälle & Konfabulationen',
            findingSummary: 'Primär mnestisch-frontales Defizit mit Konfabulation',
            addedPhenomenaIds: ['confabulation'],
            conditionMultipliers: {
              alzheimer_ftd: 1.58,
              stroke_tbi_korsakoff: 1.38,
              major_depression: 0.58
            },
            clinicalRationale:
              'Anosognosie und Konfabulationen weisen auf eine strukturelle oder neurodegenerative Schädigung frontotemporaler bzw. dienzephaler Gedächtnisnetzwerke hin.'
          }
        ]
      },
      {
        id: 'step_3_laboratory',
        stepNumber: 3,
        categoryBadge: '3. Endokrinologie & Labor',
        question: 'Welchen Befund liefert das Aufnahmelabor (TSH, fT4, Holo-Transcobalamin, Methylmalonsäure)?',
        clinicalPrompt:
          'Laborchemischer Ausschluss bzw. Nachweis reversibler somatischer Ursachen.',
        options: [
          {
            id: 'opt_lab_hypothyroid',
            label: 'TSH massiv erhöht (52 mU/l), fT4 stark erniedrigt, hohe Anti-TPO-AK (Hashimoto-Thyreoiditis)',
            findingSummary: 'Manifeste primäre Autoimmun-Hypothyreose',
            addedPhenomenaIds: [],
            conditionMultipliers: {
              thyroid_endocrine: 1.75,
              major_depression: 0.48,
              b12_iron_deficiency: 0.5
            },
            clinicalRationale:
              'Sichert eine durch schweren Schilddrüsenhormonmangel bedingte affektiv-kognitive Störung (ICD-11 5A00); kausale Therapie durch L-Thyroxin-Substitution.'
          },
          {
            id: 'opt_lab_b12_deficiency',
            label: 'Holo-TC < 12 pmol/l, Methylmalonsäure massiv erhöht; vollständige Remission unter Vitamin-B12-Gabe',
            findingSummary: 'Gesicherter schwerer zellulärer Vitamin-B12-Mangel',
            addedPhenomenaIds: [],
            conditionMultipliers: {
              b12_iron_deficiency: 1.75,
              major_depression: 0.48,
              thyroid_endocrine: 0.48
            },
            clinicalRationale:
              'Sichert ein neuropsychiatrisches Vitamin-B12-Mangelsyndrom (ICD-11 5B5K), das oft Monate vor einer megaloblastären Anämie auftritt.'
          },
          {
            id: 'opt_lab_normal_melancholia',
            label: 'TSH, fT3/fT4, Holo-TC, Ferritin, Folsäure & cMRT unauffällig; erhöhte morgendliche Cortisol-Achse',
            findingSummary: 'Ausschluss endokriner und metabolischer Mimics',
            addedPhenomenaIds: [],
            conditionMultipliers: {
              major_depression: 1.62,
              thyroid_endocrine: 0.35,
              b12_iron_deficiency: 0.35
            },
            clinicalRationale:
              'Nach Ausschluss organischer Ursachen ist die schwere unipolare melancholische Depression (ICD-11 6A70) gesichert.'
          }
        ]
      }
    ]
  }
];

export function getSimulationProfileById(id: string): ClinicalSimulationProfile {
  return (
    CLINICAL_SIMULATION_PROFILES.find((p) => p.id === id) ?? CLINICAL_SIMULATION_PROFILES[0]
  );
}
