import { PhenomenonEntity } from './types';

export const PHENOMENA_PART_2: PhenomenonEntity[] = [
  // ============================================================================
  // DOM-08: ICH-ERLEBENS-, DISSOZIATIONS- & SELBSTGRENZENPHÄNOMENE
  // ============================================================================
  {
    id: 'depersonalization',
    name: 'Depersonalisation (Selbstentfremdung)',
    englishName: 'Depersonalization',
    synonyms: ['Entfremdung vom eigenen Selbst', 'Roboter-Gefühl', 'Außer-sich-Stehen'],
    domainId: 'ego_experience',
    amdpCode: 'AMDP 60',
    hpoId: 'HP:0031594',
    icd11SymptomCode: 'MB28.0',
    rdocDomain: 'Social Processes (Self-Knowledge & Interoceptive Agency)',
    visualArchetype: 'detached_glass_shell',
    shortVisualTagline: 'Durchsichtige Silhouettenhülle schwebt losgelöst neben dem Körper',
    definition: 'Störung des Ich-Erlebens, bei der die eigene Person, der eigene Körper, die eigene Stimme oder die eigenen Gefühle als fremd, unwirklich, losgelöst, mechanisch oder wie von außen betrachtet erlebt werden (bei erhaltener Realitätsprüfung).',
    subjectiveExperience: 'Ich schaue in den Spiegel und weiß zwar logisch, dass ich das bin, aber das Gesicht wirkt fremd; meine Hände bewegen sich wie die einer Marionette, während ich mir selbst von schräg oben beim Leben zusehe.',
    neurobiology: 'Fronto-insuläre Überhemmung: Der präfrontale Kortex dämpft die anteriore Insula und die Amygdala ab, wodurch die emotionale und interozeptive „Meinigkeit“-Färbung des Erlebens ausfällt.',
    wikiTitleDe: 'Depersonalisation',
    wikiTitleEn: 'Depersonalization',
    pubmedQuery: 'depersonalization anterior insula amygdala prefrontal inhibition agency',
    olsSearchTerm: 'depersonalization',
    relatedPhenomenaIds: ['derealization', 'feeling_of_feelinglessness', 'thought_insertion_withdrawal'],
    conditions: [
      {
        conditionId: 'dissociative_disorders',
        prevalence: 'pathognomonisch',
        specificityScore: 0.96,
        clinicalNote: 'Chronisches Hauptsymptom des Depersonalisations-Derealisations-Syndroms (ICD-11 6B66).'
      },
      {
        conditionId: 'panic_anxiety',
        prevalence: 'leitsymptom',
        specificityScore: 0.88,
        clinicalNote: 'Tritt akut auf dem Höhepunkt einer Panikattacke durch Hyperventilation und Sympathikus-Übersteuerung auf.'
      },
      {
        conditionId: 'ptsd_cptsd',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Dissoziativer Subtyp der PTBS (Schutzabschaltung bei überwältigender Bedrohung).'
      },
      {
        conditionId: 'borderline_pd',
        prevalence: 'haeufig',
        specificityScore: 0.82,
        clinicalNote: 'Stress- und bindungsinduzierte akute Dissoziation.'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'haeufig',
        specificityScore: 0.85,
        clinicalNote: 'Häufiger Auslöser persistierender Depersonalisation ist eine akute Cannabis- (THC-) oder Ketamin-Erfahrung.'
      },
      {
        conditionId: 'sleep_deprivation_stress_grief',
        prevalence: 'haeufig',
        specificityScore: 0.78,
        clinicalNote: 'Kurze Episoden bei Übermüdung, Jetlag oder akutem Schock erleben bis zu 50 % aller Menschen mindestens einmal im Leben.'
      }
    ]
  },
  {
    id: 'derealization',
    name: 'Derealisation (Umweltentfremdung)',
    englishName: 'Derealization',
    synonyms: ['Kulissenhaftigkeit der Welt', 'Glaswand-Gefühl', 'Entfremdung der Außenwelt'],
    domainId: 'ego_experience',
    amdpCode: 'AMDP 59',
    hpoId: 'HP:0031595',
    icd11SymptomCode: 'MB28.1',
    rdocDomain: 'Cognitive & Social Systems (Environmental Reality Presence)',
    visualArchetype: 'stage_set_glass_wall',
    shortVisualTagline: 'Die vertraute Straße hinter einer unsichtbaren Glaswand als 2D-Kulisse',
    definition: 'Personen, Gegenstände und die gesamte Umgebung erscheinen unwirklich, fremdartig, zweidimensional, künstlich wie eine Theaterkulisse oder wie durch eine dicke Glaswand bzw. einen Schleier getrennt.',
    subjectiveExperience: 'Die Straße, in der ich seit zehn Jahren wohne, sieht plötzlich wie ein gemaltes Filmset aus Pappe aus – farblos, seelenlos und ohne räumliche Tiefe.',
    neurobiology: 'Temporoparietale und okzipitale Entkopplung von limbischen Bewertungszentren (Amygdala/Hippocampus), sodass visuelle Eindrücke ohne emotionale Vertrautheitsresonanz verarbeitet werden.',
    wikiTitleDe: 'Derealisation',
    wikiTitleEn: 'Derealization',
    pubmedQuery: 'derealization temporoparietal limbic disconnection panic dissociation',
    olsSearchTerm: 'derealization',
    relatedPhenomenaIds: ['depersonalization', 'deja_vu_jamais_vu', 'alice_in_wonderland_metamorphopsia'],
    conditions: [
      {
        conditionId: 'dissociative_disorders',
        prevalence: 'pathognomonisch',
        specificityScore: 0.96,
        clinicalNote: 'Tritt meist gemeinsam mit Depersonalisation als primäres Entfremdungssyndrom auf.'
      },
      {
        conditionId: 'panic_anxiety',
        prevalence: 'leitsymptom',
        specificityScore: 0.88,
        clinicalNote: 'Offizielles diagnostisches Kriterium einer Panikattacke nach ICD-11 und DSM-5.'
      },
      {
        conditionId: 'temporal_lobe_epilepsy',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Als iktale Aura zusammen mit Déjà-vu/Jamais-vu.'
      },
      {
        conditionId: 'major_depression',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'In schweren depressiven Episoden wirkt die Welt oft „abgestorben“ und fremd.'
      }
    ]
  },
  {
    id: 'thought_insertion_withdrawal',
    name: 'Ich-Störungen des Denkens & Handelns (Gedankeneingebung, -entzug, -ausbreitung, Fremdbeeinflussung)',
    englishName: 'Passivity Phenomena: Thought Insertion, Withdrawal, Broadcasting & Made Actions',
    synonyms: ['Gedankenlautwerden', 'Willensbeeinflussung', 'Ich-Durchlässigkeit', 'Kurt-Schneider-Erstrangsymptome'],
    domainId: 'ego_experience',
    amdpCode: 'AMDP 61–64',
    hpoId: 'HP:0033689',
    icd11SymptomCode: 'MB26.1',
    rdocDomain: 'Sensorimotor & Social Systems (Sense of Agency & Forward Model)',
    visualArchetype: 'permeable_ego_boundary',
    shortVisualTagline: 'Durchbrochene Ich-Membran mit ein- und ausströmenden Fremdimpulsen',
    definition: 'Durchlässigkeit der Ich-Umwelt-Grenze (Meinhaftigkeit): Eigene Gedanken und Handlungen werden nicht mehr als selbst hervorgebracht erlebt, sondern als von außen eingegeben (Gedankeneingebung), weggenommen (Gedankenentzug), für alle hörbar (Gedankenausbreitung) oder ferngesteuert (Fremdbeeinflussung).',
    subjectiveExperience: 'Das sind nicht meine Gedanken in meinem Kopf – sie werden mir per Sender implantiert; und sobald ich denke, können alle Menschen im Bus meine Gedanken mithören.',
    neurobiology: 'Ausfall des internen Vorwärtsmodells (Efferenzkopie / Comparator Mechanism) im rechten inferioren Parietallappen (Temporoparietaler Übergang TPJ) und Kleinhirn: Selbstinitiierte neuronale Aktivität wird nicht mehr als „eigen“ vorhergesagt und daher als „fremdgemacht“ erlebt (Frith).',
    wikiTitleDe: 'Ich-Störung',
    wikiTitleEn: 'Thought_insertion',
    pubmedQuery: 'thought insertion thought broadcasting passivity phenomena temporoparietal junction efference copy Frith',
    olsSearchTerm: 'delusions of control',
    relatedPhenomenaIds: ['auditory_hallucinations_voices', 'thought_blocking_derailment', 'delusional_perception'],
    conditions: [
      {
        conditionId: 'schizophrenia',
        prevalence: 'pathognomonisch',
        specificityScore: 0.96,
        clinicalNote: 'Klassische Erstrangsymptome nach Kurt Schneider mit höchster diagnostischer Spezifität nach Ausschluss organischer Ursachen.'
      },
      {
        conditionId: 'autoimmune_encephalitis',
        prevalence: 'gelegentlich',
        specificityScore: 0.75,
        clinicalNote: 'Bei akuter Anti-NMDA-Rezeptor-Enzephalitis können ausgeprägte Ich-Störungen auftreten.'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'gelegentlich',
        specificityScore: 0.72,
        clinicalNote: 'Bei hochdosierten Psychedelika („Ego-Dissolution“ / Ich-Auflösung) oder schweren Stimulanzienpsychosen.'
      }
    ]
  },

  // ============================================================================
  // DOM-09: AFFEKTIVITÄTS-, STIMMUNGS- & EMOTIONSPHÄNOMENE
  // ============================================================================
  {
    id: 'anhedonia_loss_of_pleasure',
    name: 'Anhedonie (Freudlosigkeit & Verlust der Genussfähigkeit)',
    englishName: 'Anhedonia (Consummatory & Anticipatory)',
    synonyms: ['Freudlosigkeit', 'Verlust positiver Verstärkung', 'Belohnungsblindheit'],
    domainId: 'affectivity',
    amdpCode: 'AMDP 69',
    hpoId: 'HP:0031596',
    icd11SymptomCode: 'MB24.0',
    rdocDomain: 'Positive Valence Systems (Reward Responsiveness & Valuation)',
    visualArchetype: 'frosted_bloom',
    shortVisualTagline: 'Blüte verliert ihre Farbe hinter einer Schicht aus kristallinem Eis',
    definition: 'Unfähigkeit, Freude, Lust oder angenehme Gefühle bei Aktivitäten, Begegnungen oder Sinnesreizen zu empfinden, die früher zuverlässig Wohlbefinden ausgelöst haben – unterteilt in antizipatorische Anhedonie („Nicht-Wollen“) und konsumatorische Anhedonie („Nicht-Genießen“).',
    subjectiveExperience: 'Das Lieblingsessen schmeckt wie Pappe, die geliebte Musik ist nur noch Geräusch, ein beruflicher Erfolg löst keinerlei innere Wärme oder Erleichterung aus.',
    neurobiology: 'Gedämpfte phasisches Dopamin-Antwort im Nucleus accumbens (ventrales Striatum) und orbitofrontalen Kortex, häufig verstärkt durch proinflammatorische Zytokine (IL-6, TNF-alpha).',
    wikiTitleDe: 'Anhedonie',
    wikiTitleEn: 'Anhedonia',
    pubmedQuery: 'anhedonia ventral striatum nucleus accumbens dopamine depression schizophrenia',
    olsSearchTerm: 'anhedonia',
    relatedPhenomenaIds: ['feeling_of_feelinglessness', 'abulia_drive_inhibition', 'alexithymia_interoception'],
    conditions: [
      {
        conditionId: 'major_depression',
        prevalence: 'pathognomonisch',
        specificityScore: 0.94,
        clinicalNote: 'Eines der beiden Hauptkriterien einer depressiven Episode nach ICD-11 und DSM-5.'
      },
      {
        conditionId: 'schizophrenia',
        prevalence: 'leitsymptom',
        specificityScore: 0.88,
        clinicalNote: 'Zentraler Bestandteil der schizophrenen Negativsymptomatik (insb. antizipatorische Anhedonie).'
      },
      {
        conditionId: 'lewy_body_parkinson',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Durch den mesolimbischen Dopaminverlust bei Morbus Parkinson häufig schon Jahre vor den motorischen Symptomen vorhanden.'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'leitsymptom',
        specificityScore: 0.85,
        clinicalNote: 'Schwere postakute Anhedonie („Crash“) im Entzug nach Kokain, Amphetaminen oder Opioiden durch Dopaminrezeptor-Downregulation.'
      }
    ]
  },
  {
    id: 'feeling_of_feelinglessness',
    name: 'Gefühl der Gefühllosigkeit (Affective Anaesthesia)',
    englishName: 'Feeling of Feelinglessness (Affective Anesthesia)',
    synonyms: ['Emotionale Versteinerung', 'Seelische Empfindungslosigkeit', 'Leeregefühl'],
    domainId: 'affectivity',
    amdpCode: 'AMDP 68',
    hpoId: 'HP:0033690',
    icd11SymptomCode: 'MB24.Y',
    rdocDomain: 'Negative & Positive Valence Systems (Interoceptive Affective Shutdown)',
    visualArchetype: 'stone_heart_resonator',
    shortVisualTagline: 'Versteinerter Klangkörper, der weder Trauer noch Freude schwingen lässt',
    definition: 'Quälendes subjektives Erleben, überhaupt keine Gefühle mehr empfinden zu können – nicht nur keine Freude, sondern auch keine echte Trauer, kein Mitleid und keine Liebe zu den engsten Angehörigen (im Gegensatz zur gleichgültigen Affektverflachung wird dieser Zustand als extrem schmerzhaft erlebt).',
    subjectiveExperience: '„Ich bin innerlich wie tot und versteinert; selbst wenn ich weinen möchte, kann ich keine Trauer mehr fühlen, nicht einmal für meine eigenen Kinder.“',
    neurobiology: 'Funktionelle Entkopplung zwischen anteriorer Insula, subgenualem Cingulum und Amygdala bei schwerer Melancholie oder Traumadissoziation.',
    wikiTitleDe: 'Gefühl_der_Gefühllosigkeit',
    wikiTitleEn: 'Emotional_blunting',
    pubmedQuery: 'feeling of feelinglessness melancholic depression emotional blunting SSRI insula',
    olsSearchTerm: 'blunted affect',
    relatedPhenomenaIds: ['anhedonia_loss_of_pleasure', 'depersonalization', 'cotard_capgras_monothematic_delusions'],
    conditions: [
      {
        conditionId: 'major_depression',
        prevalence: 'leitsymptom',
        specificityScore: 0.93,
        clinicalNote: 'Klassisches Kennzeichen der schweren melancholischen Depression (Kurt Schneider) und Vorstufe zum nihilistischen Cotard-Wahn.'
      },
      {
        conditionId: 'ptsd_cptsd',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Emotionales „Numbing“ (Abstumpfung) als Schutzreaktion nach schwerer Traumatisierung.'
      },
      {
        conditionId: 'medication_neuroleptic_side_effects',
        prevalence: 'haeufig',
        specificityScore: 0.78,
        clinicalNote: 'Pharmakogenes „Emotional Blunting“ unter hochdosierten SSRI/SNRI oder Antipsychotika.'
      }
    ]
  },
  {
    id: 'parathymia_affect_incontinence',
    name: 'Parathymie (Inadäquater Affekt), Affektlabilität & Affektinkontinenz',
    englishName: 'Parathymia (Inappropriate Affect), Affective Lability & Pseudobulbar Affect',
    synonyms: ['Inkongruenter Affekt', 'Zwangsweinen / Zwangslachen', 'Rascher Stimmungswechsel'],
    domainId: 'affectivity',
    amdpCode: 'AMDP 77–79',
    hpoId: 'HP:0000712',
    icd11SymptomCode: 'MB24.2',
    rdocDomain: 'Systems for Social Processes & Corticobulbar Emotion Control',
    visualArchetype: 'inverted_theater_masks',
    shortVisualTagline: 'Spiegelverkehrte Emotionsmasken zwischen Inhalt und Ausdruck',
    definition: 'Auseinanderklaffen von aktuellem Erlebnisinhalt und gezeigtem Gefühlsausdruck (Parathymie: Lachen bei einer Todesnachricht), schnelles Umschlagen der Gefühle auf minimale Reize (Affektlabilität) oder unsteuerbares Überschießen von Weinen/Lachen ohne entsprechenden Gefühlsgrund (Affektinkontinenz).',
    subjectiveExperience: 'Bei Affektinkontinenz schießen bei einer harmlosen Begrüßung unaufhaltsam Tränen in die Augen, ohne dass man sich innerlich traurig fühlt; bei Parathymie verzerrt sich das Gesicht beim Bericht über eigene Qualen zu einem Lächeln.',
    neurobiology: 'Parathymie: Frontolimbische Diskonnektion; Affektinkontinenz (Pseudobulbäraffekt): Unterbrechung kortikopontozerebellärer Hemmbahnen zum Hirnstamm-Lach-/Weinzentrum.',
    wikiTitleDe: 'Parathymie',
    wikiTitleEn: 'Pseudobulbar_affect',
    pubmedQuery: 'parathymia inappropriate affect pseudobulbar affect corticobulbar schizophrenia stroke',
    olsSearchTerm: 'emotional lability',
    relatedPhenomenaIds: ['ambivalence_affective_volitional', 'incoherence_paralogia', 'rejection_sensitive_dysphoria'],
    conditions: [
      {
        conditionId: 'schizophrenia',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Parathymie (qualitative Inadäquatheit von Gefühl und Ausdruck) gilt als klassisches Zeichen hebephrener/desorganisierter Schizophrenie.'
      },
      {
        conditionId: 'stroke_tbi_korsakoff',
        prevalence: 'leitsymptom',
        specificityScore: 0.92,
        clinicalNote: 'Affektinkontinenz (pathologisches Lachen/Weinen) ist typisch nach vaskulären Hirnstamm-/Frontalhirnläsionen, MS oder ALS.'
      },
      {
        conditionId: 'alzheimer_ftd',
        prevalence: 'haeufig',
        specificityScore: 0.82,
        clinicalNote: 'Ausgeprägte Affektlabilität bei vaskulärer und frontotemporaler Demenz.'
      }
    ]
  },
  {
    id: 'euphoria_expansive_mood',
    name: 'Euphorie, Gehobene Stimmung & Dysphorische Gereiztheit',
    englishName: 'Euphoria, Elevated Expansive Mood & Dysphoric Irritability',
    synonyms: ['Manische Hochstimmung', 'Moria (Läppische Euphorie)', 'Gereizte Expansivität'],
    domainId: 'affectivity',
    amdpCode: 'AMDP 72–73',
    hpoId: 'HP:0000718',
    icd11SymptomCode: 'MB24.5',
    rdocDomain: 'Positive Valence Systems & Frustrative Nonreward',
    visualArchetype: 'solar_flare_surge',
    shortVisualTagline: 'Überbordende Sonneneruption mit scharfen Entladungsbögen',
    definition: 'Unverhältnismäßig gehobene, strahlende, unerschütterlich optimistische Grundstimmung und Vitalitätssteigerung (Euphorie), die bei kleinstem Widerspruch blitzartig in schneidende Gereiztheit, Zorn und Feindseligkeit (Dysphorie) umschlagen kann.',
    subjectiveExperience: 'Ein elektrisierendes Gefühl unendlicher Kraft, Inspiration und Unbesiegbarkeit durchströmt den Körper – doch jeder, der bremst oder zweifelt, löst sofort explosionsartige Wut aus.',
    neurobiology: 'Dopaminerge und noradrenerge Überflutung des ventralen Striatums und präfrontalen Kortex bei verminderter serotonerger Impulskontrolle.',
    wikiTitleDe: 'Euphorie',
    wikiTitleEn: 'Euphoria',
    pubmedQuery: 'euphoria expansive mood dysphoric mania orbitofrontal dopamine',
    olsSearchTerm: 'euphoria',
    relatedPhenomenaIds: ['flight_of_ideas', 'persecutory_referential_delusion', 'psychomotor_agitation_hyperkinesia'],
    conditions: [
      {
        conditionId: 'bipolar_disorder',
        prevalence: 'pathognomonisch',
        specificityScore: 0.95,
        clinicalNote: 'Kernsymptom der Manie und Hypomanie sowie bipolarer gemischter Episoden.'
      },
      {
        conditionId: 'alzheimer_ftd',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Als „Moria“ (flach-witzelnde, enthemmte Euphorie) bei Läsionen des Orbitofrontalkortex.'
      },
      {
        conditionId: 'medication_neuroleptic_side_effects',
        prevalence: 'haeufig',
        specificityScore: 0.82,
        clinicalNote: 'Hochdosierte Glukokortikoide (Kortison-Stoßtherapie) oder L-Dopa lösen häufig euphorisch-dysphorische Syndrome aus.'
      },
      {
        conditionId: 'temporal_lobe_epilepsy',
        prevalence: 'selten',
        specificityScore: 0.75,
        clinicalNote: 'Seltene „Dostojewski-Aura“ (iktale Ekstase und kosmische Glückseligkeit bei Ursprung in der vorderen Insula).'
      }
    ]
  },
  {
    id: 'alexithymia_interoception',
    name: 'Alexithymie (Gefühlsblindheit) & Interozeptionsdivergenz',
    englishName: 'Alexithymia & Altered Interoceptive Awareness',
    synonyms: ['Gefühlsblindheit', 'Emotionale Leseschwäche', 'Interozeptions-Unschärfe'],
    domainId: 'affectivity',
    amdpCode: 'AMDP Zusatz Affekt',
    hpoId: 'HP:0033691',
    icd11SymptomCode: 'MB24.Y',
    rdocDomain: 'Arousal & Social Processes (Interoception & Emotional Awareness)',
    visualArchetype: 'untranslated_signal_wave',
    shortVisualTagline: 'Körperliche Pulswelle ohne sprachliches Übersetzungsraster',
    definition: 'Schwierigkeit oder Unfähigkeit, eigene körperliche Erregungszustände als spezifische Emotionen (z. B. Trauer vs. Wut vs. Erschöpfung vs. Hunger) zu identifizieren, voneinander abzugrenzen und in Worte zu fassen – bei oft völlig intakter oder sogar gesteigerter Empathie.',
    subjectiveExperience: 'Ich spüre ein starkes Drücken in der Brust und einen Kloß im Hals, aber wenn mich jemand fragt „Wie fühlst du dich?“, weiß ich ehrlich nicht, ob ich traurig, ängstlich, wütend oder einfach nur überreizt bin.',
    neurobiology: 'Veränderte Signalintegration zwischen der anterioren Insula (viszerale Körperkarten) und dem anterioren Cingulum (ACC) sowie den Sprachzentren.',
    wikiTitleDe: 'Alexithymie',
    wikiTitleEn: 'Alexithymia',
    pubmedQuery: 'alexithymia interoception anterior insula autism psychosomatics',
    olsSearchTerm: 'affective symptom',
    relatedPhenomenaIds: ['somatization_functional_dissociation', 'autistic_meltdown_shutdown', 'feeling_of_feelinglessness'],
    conditions: [
      {
        conditionId: 'autism_spectrum',
        prevalence: 'leitsymptom',
        specificityScore: 0.88,
        clinicalNote: 'Rund 50 % aller autistischen Menschen weisen eine komorbide Alexithymie und veränderte Interozeption (z. B. spätes Bemerken von Hunger/Durst) auf.'
      },
      {
        conditionId: 'ptsd_cptsd',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Sekundäre Alexithymie nach Entwicklungstraumata, bei denen das Wahrnehmen eigener Gefühle unsicher war.'
      },
      {
        conditionId: 'anorexia_bdd',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Schwierigkeit, emotionale Spannung von körperlichen Hunger-/Sättigungssignalen zu unterscheiden.'
      }
    ]
  },
  {
    id: 'ambivalence_affective_volitional',
    name: 'Ambivalenz (Affektive, Volitionale & Intellektuelle Koexistenz von Gegensätzen)',
    englishName: 'Ambivalence (Affective, Volitional / Ambitendency)',
    synonyms: ['Gleichzeitigkeit gegensätzlicher Gefühle', 'Ambitendenz', 'Entscheidungslähmung'],
    domainId: 'affectivity',
    amdpCode: 'AMDP 76',
    hpoId: 'HP:0033692',
    icd11SymptomCode: 'MB24.Y',
    rdocDomain: 'Cognitive Control & Valence Conflict Resolution',
    visualArchetype: 'dual_magnetic_poles',
    shortVisualTagline: 'Zwei gleich starke Gegenpole ziehen denselben Kern in entgegengesetzte Richtungen',
    definition: 'Quälendes, gleichzeitiges Nebeneinanderstehen unvereinbarer Gefühle (Liebe und Hass gegenüber derselben Person), Willensimpulse (Ambitendenz: Hand zum Gruß ausstrecken und gleichzeitig zurückziehen) oder Gedanken ohne Fähigkeit zur Synthese.',
    subjectiveExperience: 'In derselben Sekunde will ich den Raum verlassen und unbedingt bleiben; ich bleibe auf der Türschwelle wie eingefroren zwischen beiden Impulsen stehen.',
    neurobiology: 'Dysfunktion der Konfliktüberwachung im dorsalen anterioren Cingulum (dACC) und präfrontalen Kortex.',
    wikiTitleDe: 'Ambivalenz',
    wikiTitleEn: 'Ambivalence',
    pubmedQuery: 'ambivalence ambitendency Bleuler schizophrenia catatonia anterior cingulate',
    olsSearchTerm: 'ambivalence',
    relatedPhenomenaIds: ['catatonia_stupor_mutism', 'executive_paralysis', 'splitting_black_white'],
    conditions: [
      {
        conditionId: 'schizophrenia',
        prevalence: 'leitsymptom',
        specificityScore: 0.88,
        clinicalNote: 'Von Eugen Bleuler geprägter Begriff als eines der vier „Grundsymptome“ der Schizophrenie (insb. volitionale Ambitendenz bei Katatonie).'
      },
      {
        conditionId: 'ocd',
        prevalence: 'haeufig',
        specificityScore: 0.78,
        clinicalNote: 'Zweifelsucht (Folie du doute) mit endlosem Abwägen zwischen zwei Handlungsoptionen.'
      },
      {
        conditionId: 'major_depression',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'Ausgeprägte Entschlussunfähigkeit selbst bei kleinsten Alltagsentscheidungen.'
      }
    ]
  },
  {
    id: 'rejection_sensitive_dysphoria',
    name: 'Rejection Sensitive Dysphoria (RSD / Zurückweisungsschmerz)',
    englishName: 'Rejection Sensitive Dysphoria (RSD)',
    synonyms: ['Hyperreaktivität auf Ablehnung', 'Interpersoneller Schmerzsturm', 'Kritik-Dysphorie'],
    domainId: 'affectivity',
    amdpCode: 'AMDP Zusatz Neurodivergenz',
    hpoId: 'HP:0033693',
    icd11SymptomCode: 'MB24.Y',
    rdocDomain: 'Systems for Social Processes (Affiliation & Social Rejection Pain)',
    visualArchetype: 'shattered_ porcelain_shield',
    shortVisualTagline: 'Feiner Riss durch ein Schutzschild löst unmittelbare Schockwelle aus',
    definition: 'Extrem schmerzhafte, schlagartig einsetzende emotionale und körperliche Dysphorie-Reaktion auf tatsächliche oder auch nur vermutete Kritik, Ablehnung, Enttäuschung oder sozialen Ausschluss.',
    subjectiveExperience: 'Eine knappe Textnachricht ohne Punkt oder ein kritischer Blick fühlt sich buchstäblich wie ein physischer Schlag in die Magengrube an, gefolgt von sofortiger Scham-Überflutung oder Rückzug.',
    neurobiology: 'Überlappung des sozialen Schmerznetzwerks (dorsales anteriores Cingulum dACC und anteriore Insula) mit dem physischen Schmerznetzwerk bei verminderter präfrontaler Top-Down-Dämpfung.',
    wikiTitleDe: 'Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung',
    wikiTitleEn: 'Emotional_dysregulation',
    pubmedQuery: 'rejection sensitivity dysphoria ADHD borderline dorsal anterior cingulate social pain',
    olsSearchTerm: 'emotional dysregulation',
    relatedPhenomenaIds: ['splitting_black_white', 'masking_camouflaging', 'parathymia_affect_incontinence'],
    conditions: [
      {
        conditionId: 'adhd',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Sehr häufiges, oft übersehenes Kernphänomen der neurodivergenten Emotionsregulation bei ADHS.'
      },
      {
        conditionId: 'borderline_pd',
        prevalence: 'leitsymptom',
        specificityScore: 0.92,
        clinicalNote: 'Existentielle Verlassensangst und intensive Scham-/Wutreaktion auf wahrgenommene Zurückweisung.'
      },
      {
        conditionId: 'autism_spectrum',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Verstärkt durch jahrzehntelange reale Erfahrungen sozialer Missverständnisse und Ausgrenzung.'
      },
      {
        conditionId: 'major_depression',
        prevalence: 'haeufig',
        specificityScore: 0.78,
        clinicalNote: 'Erhöhte interpersonelle Zurückweisungsempfindlichkeit ist das definierende Merkmal der „atypischen Depression“.'
      }
    ]
  },

  // ============================================================================
  // DOM-10: ANTRIEBS-, PSYCHOMOTORIK- & KATATONIEPHÄNOMENE
  // ============================================================================
  {
    id: 'abulia_drive_inhibition',
    name: 'Antriebshemmung, Antriebsarmut & Abulie (Willenslähmung)',
    englishName: 'Avolition, Psychomotor Retardation & Abulia',
    synonyms: ['Antriebsmangel', 'Apathie', 'Psychomotorische Hemmung', 'Erloschene Eigeninitiative'],
    domainId: 'drive_psychomotor',
    amdpCode: 'AMDP 83–84',
    hpoId: 'HP:0000741',
    icd11SymptomCode: 'MB23.0',
    rdocDomain: 'Positive Valence Systems (Effort Valuation / Willingness to Work)',
    visualArchetype: 'anchored_monolith',
    shortVisualTagline: 'Schwerer Monolith ohne Zündfunken auf ebener Fläche',
    definition: 'Reduktion oder völliges Erlöschen der spontanen Lebensenergie, Initiative und Zielstrebigkeit: Bei Antriebshemmung wird das Wollen als gebremst erlebt; bei Antriebsarmut/Abulie fehlt bereits der primäre Handlungsimpuls.',
    subjectiveExperience: 'Der Körper wiegt eine Tonne; der Gedanke „Ich sollte jetzt aufstehen und ein Glas Wasser trinken“ ist zwar im Kopf vorhanden, setzt sich aber nicht mehr in eine Muskelbewegung um.',
    neurobiology: 'Läsion oder Unterfunktion der medial-frontalen Kortex-Anteriores-Cingulum-Ventrales-Striatum-Schleife (akinetisch-abulisches Stirnhirnsyndrom).',
    wikiTitleDe: 'Abulie',
    wikiTitleEn: 'Abulia',
    pubmedQuery: 'abulia avolition apathy anterior cingulate ventral striatum depression schizophrenia',
    olsSearchTerm: 'apathy',
    relatedPhenomenaIds: ['executive_paralysis', 'anhedonia_loss_of_pleasure', 'catatonia_stupor_mutism'],
    conditions: [
      {
        conditionId: 'major_depression',
        prevalence: 'leitsymptom',
        specificityScore: 0.92,
        clinicalNote: 'Quälende Antriebshemmung als drittes Hauptkriterium der depressiven Episode.'
      },
      {
        conditionId: 'schizophrenia',
        prevalence: 'leitsymptom',
        specificityScore: 0.88,
        clinicalNote: 'Antriebsarmut (Avolition) als prognostisch bedeutsames Negativsymptom.'
      },
      {
        conditionId: 'alzheimer_ftd',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Frontalhirn-Apathie und Abulie sind oft das allererste Symptom einer Frontotemporalen Demenz (bvFTD).'
      },
      {
        conditionId: 'stroke_tbi_korsakoff',
        prevalence: 'haeufig',
        specificityScore: 0.85,
        clinicalNote: 'Nach Anterior-Infarkt (Arteria cerebri anterior) bis zum akinetischen Mutismus.'
      },
      {
        conditionId: 'thyroid_endocrine',
        prevalence: 'haeufig',
        specificityScore: 0.78,
        clinicalNote: 'Schwere somatische Antriebslosigkeit bei Hypothyreose oder Morbus Addison.'
      }
    ]
  },
  {
    id: 'executive_paralysis',
    name: 'Exekutive Dysfunktion & Handlungs-Initiationsblockade (ADHD Paralysis)',
    englishName: 'Executive Dysfunction & Task Initiation Paralysis',
    synonyms: ['Task Paralysis', 'Wissen-Handeln-Kluft', 'Waiting Mode'],
    domainId: 'drive_psychomotor',
    amdpCode: 'AMDP Zusatz Exekutiv',
    hpoId: 'HP:0033694',
    icd11SymptomCode: 'MB21.Y',
    rdocDomain: 'Cognitive Systems (Cognitive Control, Goal Selection & Initiation)',
    visualArchetype: 'disconnected_clutch',
    shortVisualTagline: 'Hochdrehender Motor bei ausgekuppeltem Zahnradgetriebe',
    definition: 'Paradoxe Unfähigkeit, eine klar gewollte, oft dringende Aufgabe zu beginnen oder in Teilhandlungen zu zerlegen – nicht aus Gleichgültigkeit oder Faulheit, sondern durch Überforderung der exekutiven Priorisierungs- und Startmechanismen bei gleichzeitig hohem innerem Stress.',
    subjectiveExperience: 'Ich sitze seit drei Stunden vor der offenen E-Mail, will sie unbedingt beantworten, bin innerlich maximal angespannt – aber mein Gehirn findet keinen „Start-Knopf“.',
    neurobiology: 'Zu niedriger tonischer Dopaminspiegel im dorsolateralen präfrontalen Kortex und anterioren Cingulum, sodass die Aktivierungsschwelle für nicht unmittelbar belohnende Handlungen erst durch akuten Adrenalindruck (Deadline) überschritten wird.',
    wikiTitleDe: 'Exekutive_Funktionen',
    wikiTitleEn: 'Executive_dysfunction',
    pubmedQuery: 'executive dysfunction task initiation ADHD prefrontal dopamine cognitive control',
    olsSearchTerm: 'executive dysfunction',
    relatedPhenomenaIds: ['hyperfocus_tunnel', 'abulia_drive_inhibition', 'subjective_time_distortion'],
    conditions: [
      {
        conditionId: 'adhd',
        prevalence: 'pathognomonisch',
        specificityScore: 0.95,
        clinicalNote: 'Wichtigstes Unterscheidungsmerkmal zur Depression: Bei Depression fehlt der Wunsch; bei exekutiver Paralyse ist der Wunsch stark, aber die „Kupplung“ greift nicht.'
      },
      {
        conditionId: 'autism_spectrum',
        prevalence: 'leitsymptom',
        specificityScore: 0.88,
        clinicalNote: 'Autistische Trägheit (Autistic Inertia): Hoher Energieaufwand beim Wechsel von einem Handlungszustand in den nächsten.'
      },
      {
        conditionId: 'mecfs_longcovid_pots',
        prevalence: 'haeufig',
        specificityScore: 0.78,
        clinicalNote: 'Erschöpfung der exekutiven Planungsfunktionen im Rahmen von Post-COVID und ME/CFS.'
      }
    ]
  },
  {
    id: 'catatonia_stupor_mutism',
    name: 'Katatonie-Phänomene: Stupor, Mutismus, Katalepsie & Flexibilitas cerea',
    englishName: 'Catatonia: Stupor, Mutism, Catalepsy & Waxy Flexibility',
    synonyms: ['Wächserne Biegsamkeit', 'Haltungsstereotypien', 'Negativismus', 'Psychomotorische Erstarrung'],
    domainId: 'drive_psychomotor',
    amdpCode: 'AMDP 85–88',
    hpoId: 'HP:0001302',
    icd11SymptomCode: '6A40',
    rdocDomain: 'Sensorimotor Systems (Motor Execution & Inhibition)',
    visualArchetype: 'wax_statue_tension',
    shortVisualTagline: 'Menschliche Silhouette in schwebender Wachsstarre bei innerem Gewitter',
    definition: 'Schwere psychomotorische Entkopplung mit völliger Bewegungslosigkeit bei wachem Bewusstsein (Stupor), Verstummen (Mutismus), Beibehalten passiv vorgegebener Körperhaltungen (Katalepsie) und wächsernem Muskelwiderstand (Flexibilitas cerea).',
    subjectiveExperience: 'Nach außen wirkt der Körper wie eine reglose Statue aus Wachs, während im Inneren oft extreme existenzielle Angst, Reizüberflutung oder ein apokalyptisches Wachtraumerleben tobt.',
    neurobiology: 'GABA-A-Rezeptor-Unterfunktion im primärmotorischen und supplementärmotorischen Kortex (SMA) sowie dysregulierte Basalganglien-Thalamus-Schleifen (weshalb Lorazepam oft innerhalb von Minuten den Stupor löst).',
    wikiTitleDe: 'Katatonie',
    wikiTitleEn: 'Catatonia',
    pubmedQuery: 'catatonia stupor waxy flexibility GABA-A supplementary motor area NMDA encephalitis',
    olsSearchTerm: 'catatonia',
    relatedPhenomenaIds: ['echolalia_echopraxia', 'abulia_drive_inhibition', 'autistic_meltdown_shutdown'],
    conditions: [
      {
        conditionId: 'autoimmune_encephalitis',
        prevalence: 'pathognomonisch',
        specificityScore: 0.95,
        clinicalNote: 'Über 70 % der Patientinnen und Patienten mit Anti-NMDA-Rezeptor-Enzephalitis entwickeln eine schwere Katatonie.'
      },
      {
        conditionId: 'schizophrenia',
        prevalence: 'haeufig',
        specificityScore: 0.85,
        clinicalNote: 'Klassische katatone Schizophrenie (in ICD-11 nun als eigenständige Diagnosekategorie 6A40 geführt).'
      },
      {
        conditionId: 'major_depression',
        prevalence: 'haeufig',
        specificityScore: 0.82,
        clinicalNote: 'Fast die Hälfte aller klinischen Katatonien tritt im Rahmen schwerer affektiver (depressiver oder bipolarer) Episoden auf!'
      },
      {
        conditionId: 'autism_spectrum',
        prevalence: 'gelegentlich',
        specificityScore: 0.78,
        clinicalNote: 'Autistische Katatonie im Jugend- und jungen Erwachsenenalter nach chronischer Überlastung.'
      }
    ]
  },
  {
    id: 'echolalia_echopraxia',
    name: 'Echolalie, Echopraxie & Palilalie (Spiegel- & Wiederholungsphänomene)',
    englishName: 'Echolalia, Echopraxia & Palilalia',
    synonyms: ['Wort-Echo', 'Handlungs-Echo', 'Mitgehen', 'Gestalt-Sprachverarbeitung'],
    domainId: 'drive_psychomotor',
    amdpCode: 'AMDP 88',
    hpoId: 'HP:0010529',
    icd11SymptomCode: 'MB23.Y',
    rdocDomain: 'Sensorimotor & Social Systems (Mirror Neuron Inhibition & Gestalt Language)',
    visualArchetype: 'mirror_wave_resonator',
    shortVisualTagline: 'Sprach- und Bewegungswellen reflektieren unmittelbar als präzises Echo',
    definition: 'Unwillkürliches oder kommunikativ-gestalthaftes Wiederholen von Wörtern und Satzmelodien anderer Personen (unmittelbare oder verzögerte Echolalie), eigener Silben (Palilalie) oder beobachteter Bewegungen (Echopraxie).',
    subjectiveExperience: 'Der Klang eines gehörten Satzes hallt im Kopf nach und muss ausgesprochen werden, um Ruhe zu finden – oder ein Satz aus einem Film dient als präziser Schlüssel für ein komplexes Gefühl.',
    neurobiology: 'Enthemmung des frontoparietalen Spiegelneuronensystems durch reduzierte präfrontale Unterdrückung bzw. ganzheitliche (Gestalt-)Sprachverarbeitung im Autismus.',
    wikiTitleDe: 'Echolalie',
    wikiTitleEn: 'Echolalia',
    pubmedQuery: 'echolalia echopraxia mirror neuron frontal inhibition autism Tourette catatonia',
    olsSearchTerm: 'echolalia',
    relatedPhenomenaIds: ['premonitory_urge_tics', 'catatonia_stupor_mutism', 'stimming_self_regulation'],
    conditions: [
      {
        conditionId: 'autism_spectrum',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Verzögerte und unmittelbare Echolalie als funktionale „Gestalt Language Processing“-Strategie und regulatorisches Vokabular.'
      },
      {
        conditionId: 'tourette_tics',
        prevalence: 'leitsymptom',
        specificityScore: 0.88,
        clinicalNote: 'Komplexe vokale und motorische Echo-Tics.'
      },
      {
        conditionId: 'schizophrenia',
        prevalence: 'gelegentlich',
        specificityScore: 0.78,
        clinicalNote: 'Bestandteil katatoner Befehlsautomatismen.'
      },
      {
        conditionId: 'alzheimer_ftd',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Durch frontale Enthemmung (Utilization Behavior) bei fortgeschrittener frontotemporaler oder Alzheimer-Demenz.'
      }
    ]
  },
  {
    id: 'psychomotor_agitation_hyperkinesia',
    name: 'Psychomotorische Unruhe, Agitiertheit & Akathisie (Sitzunruhe)',
    englishName: 'Psychomotor Agitation, Hyperkinesia & Akathisia',
    synonyms: ['Agitierte Unruhe', 'Akathisie', 'Bewegungssturm', 'Raptus'],
    domainId: 'drive_psychomotor',
    amdpCode: 'AMDP 86',
    hpoId: 'HP:0000713',
    icd11SymptomCode: 'MB23.1',
    rdocDomain: 'Sensorimotor & Arousal Systems',
    visualArchetype: 'kinetic_pendulum_spark',
    shortVisualTagline: 'Hochfrequentes Oszillieren ohne Ruhelage',
    definition: 'Gesteigerte, oft ziellose motorische Aktivität und Rastlosigkeit (Agitiertheit) oder eine subjektiv extrem quälende innere Unruhe mit dem unbezwingbaren Drang, ständig die Beine zu bewegen oder auf und ab zu gehen (Akathisie).',
    subjectiveExperience: 'Bei Akathisie: „Es zieht und brennt in meinen Beinen und im Becken; ich halte es keine drei Sekunden im Sitzen aus, ich muss aufstehen und laufen, obwohl ich völlig erschöpft bin.“',
    neurobiology: 'Bei Akathisie: Blockade mesokortikaler und nigrostriataler Dopamin-D2-Rezeptoren oder serotonerge Überstimulation; bei Eisenmangel (Restless-Legs): spinale dopaminerge Dysfunktion.',
    wikiTitleDe: 'Akathisie',
    wikiTitleEn: 'Akathisia',
    pubmedQuery: 'akathisia psychomotor agitation dopamine D2 blockade restless legs',
    olsSearchTerm: 'akathisia',
    relatedPhenomenaIds: ['stimming_self_regulation', 'euphoria_expansive_mood', 'premonitory_urge_tics'],
    conditions: [
      {
        conditionId: 'medication_neuroleptic_side_effects',
        prevalence: 'pathognomonisch',
        specificityScore: 0.96,
        clinicalNote: 'Akathisie unter Antipsychotika, Antiemetika (Metoclopramid) oder SSRI – darf klinisch keinesfalls mit psychotischer Agitiertheit verwechselt werden!'
      },
      {
        conditionId: 'b12_iron_deficiency',
        prevalence: 'leitsymptom',
        specificityScore: 0.85,
        clinicalNote: 'Zentraler Eisenmangel (niedriges Ferritin) ist die Hauptursache des verwandten Restless-Legs-Syndroms (RLS).'
      },
      {
        conditionId: 'major_depression',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Agitierte Depression mit Händeringen, ruhelosem Umhergehen und innerer Verzweiflung.'
      },
      {
        conditionId: 'thyroid_endocrine',
        prevalence: 'haeufig',
        specificityScore: 0.82,
        clinicalNote: 'Ausgeprägte psychomotorische Rastlosigkeit und feinschlägiger Tremor bei Hyperthyreose.'
      }
    ]
  },
  {
    id: 'premonitory_urge_tics',
    name: 'Sensorisches Vorgefühl (Premonitory Urge) & Motorisch-Vokale Tics',
    englishName: 'Premonitory Sensory Urge & Motor/Vocal Tics',
    synonyms: ['Tic-Dranggefühl', 'Vorgefühl-Entladungs-Zyklus', 'Koprolalie (selten)'],
    domainId: 'drive_psychomotor',
    amdpCode: 'AMDP Zusatz Motorik',
    hpoId: 'HP:0100033',
    icd11SymptomCode: '8A05',
    rdocDomain: 'Sensorimotor Systems (Basal Ganglia Habit & Urge Release)',
    visualArchetype: 'pressure_valve_pulse',
    shortVisualTagline: 'Ansteigende sensorische Druckwelle bis zur entlastenden Impulsentladung',
    definition: 'Rasch einschießende, nicht-rhythmische Bewegungen oder Lautäußerungen (Tics), denen ein lokalisiertes körperliches Spannungs-, Juck- oder Druckgefühl (Premonitory Urge) vorausgeht, das erst durch die Ausführung des Tics kurzzeitig nachlässt.',
    subjectiveExperience: 'Genau wie das unaufhaltsame Kribbeln in der Nase kurz vor dem Niesen baut sich im Nacken oder Kehlkopf ein enormer Druck auf, der sich erst löst, wenn die Bewegung ausgeführt wurde.',
    neurobiology: 'Hyperaktivität der anterioren Insula und des supplementärmotorischen Areals (SMA) Sekunden vor dem Tic, gefolgt von striataler Enthemmung.',
    wikiTitleDe: 'Tic',
    wikiTitleEn: 'Tic',
    pubmedQuery: 'premonitory urge Tourette syndrome insula supplementary motor area basal ganglia',
    olsSearchTerm: 'tic',
    relatedPhenomenaIds: ['obsessive_thoughts_impulses', 'stimming_self_regulation', 'echolalia_echopraxia'],
    conditions: [
      {
        conditionId: 'tourette_tics',
        prevalence: 'pathognomonisch',
        specificityScore: 0.98,
        clinicalNote: 'Das sensorische Vorgefühl (Premonitory Urge) mit anschließender Erleichterung unterscheidet Tics von anderen hyperkinetischen Bewegungsstörungen.'
      },
      {
        conditionId: 'ocd',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Fließender Übergang zu sensorischen „Just-Right“-Zwangsphänomenen.'
      },
      {
        conditionId: 'adhd',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'Sehr hohe genetische und klinische Komorbidität zwischen ADHS und Tic-Spektrum.'
      }
    ]
  },

  // ============================================================================
  // DOM-11: ZIRKADIANE, SCHLAF- & VEGETATIVE PHÄNOMENE
  // ============================================================================
  {
    id: 'morning_low_circadian',
    name: 'Zirkadianes Morgentief & Phasenverschiebung',
    englishName: 'Diurnal Mood Variation (Morning Worse) & Circadian Phase Shift',
    synonyms: ['Tagesschwankung der Befindlichkeit', 'Abendaufhellung', 'Delayed Sleep Phase'],
    domainId: 'circadian_autonomic',
    amdpCode: 'AMDP 90, 91',
    hpoId: 'HP:0002360',
    icd11SymptomCode: 'MB24.Y / 7A60',
    rdocDomain: 'Arousal and Regulatory Systems (Circadian Rhythms / SCN)',
    visualArchetype: 'shifted_horizon_wave',
    shortVisualTagline: 'Phasenverschobene Sinuskurve zwischen dunklem Morgen und klarem Abend',
    definition: 'Regelmäßige tageszeitliche Bindung der psychischen Symptomatik: Schwerste Ausprägung von Schwermut, Denk- und Antriebshemmung in den frühen Morgenstunden nach vorzeitigem Erwachen mit spürbarer Aufhellung am späten Abend.',
    subjectiveExperience: 'Um 4 Uhr früh erwache ich mit bleierner Verzweiflung und innerer Starre; erst gegen 20 Uhr abends lichtet sich der Nebel und ich fühle mich fast wieder wie ein Mensch.',
    neurobiology: 'Desynchronisation des Nucleus suprachiasmaticus (SCN), abgeflachte Melatonin-Amplitude und verschobene morgendliche Cortisol-Aufwachreaktion (CAR).',
    wikiTitleDe: 'Tagesschwankung',
    wikiTitleEn: 'Diurnal_mood_variation',
    pubmedQuery: 'diurnal mood variation melancholic depression suprachiasmatic nucleus circadian phase',
    olsSearchTerm: 'sleep abnormality',
    relatedPhenomenaIds: ['thought_inhibition_retardation', 'abulia_drive_inhibition', 'subjective_time_distortion'],
    conditions: [
      {
        conditionId: 'major_depression',
        prevalence: 'leitsymptom',
        specificityScore: 0.92,
        clinicalNote: 'Klassisches somatisches/melancholisches Kriterium zusammen mit Früherwachen (2 Stunden vor der gewohnten Zeit).'
      },
      {
        conditionId: 'bipolar_disorder',
        prevalence: 'leitsymptom',
        specificityScore: 0.88,
        clinicalNote: 'Hohe Vulnerabilität des zirkadianen Systems gegenüber Schichtarbeit, Zeitverschiebung und Lichtwechsel.'
      },
      {
        conditionId: 'adhd',
        prevalence: 'haeufig',
        specificityScore: 0.82,
        clinicalNote: 'Über 70 % der Menschen mit ADHS weisen einen verzögerten Melatonin-Anstieg (Delayed Sleep Phase Syndrome) auf.'
      }
    ]
  },
  {
    id: 'hypnagogic_sleep_paralysis',
    name: 'Hypnagoge / Hypnopompe Halluzinationen & Schlaflähmung (REM-Intrusion)',
    englishName: 'Hypnagogic/Hypnopompic Hallucinations & Sleep Paralysis',
    synonyms: ['Wach-REM-Überlappung', 'Nachtmahr-Erleben', 'REM-Schlaf-Verhaltensstörung'],
    domainId: 'circadian_autonomic',
    amdpCode: 'AMDP 56, 92',
    hpoId: 'HP:0002524',
    icd11SymptomCode: '7B01.0',
    rdocDomain: 'Arousal and Regulatory Systems (Sleep-Wakefulness REM Boundaries)',
    visualArchetype: 'threshold_dream_portal',
    shortVisualTagline: 'Schwellenraum zwischen Wachbewusstsein und einbrechender Traumprojektion',
    definition: 'Überlappung von Wachbewusstsein und REM-Schlaf an der Einschlaf- (hypnagog) oder Aufwachschwelle (hypnopomp): Entweder ist der Geist hellwach, während die REM-Muskelatonie den Körper noch lähmt (Schlaflähmung) und Traumbilder in das reale Schlafzimmer projiziert werden, oder die REM-Atonie fehlt und Träume werden motorisch ausgelebt (RBD).',
    subjectiveExperience: 'Ich bin wach, sehe mein Schlafzimmer, kann aber keinen Finger rühren und kaum atmen, während eine dunkle Gestalt am Fußende meines Bettes steht.',
    neurobiology: 'Dissoziation der pontomedullären REM-Schaltkreise (Sublaterodorsaler Nucleus): Vorzeitiger Einbruch von REM-Atonie und PGO-Traumwellen bei noch aktiver kortikaler Wachheit.',
    wikiTitleDe: 'Schlaflähmung',
    wikiTitleEn: 'Sleep_paralysis',
    pubmedQuery: 'sleep paralysis hypnagogic hallucinations REM intrusion narcolepsy orexin',
    olsSearchTerm: 'sleep paralysis',
    relatedPhenomenaIds: ['visual_hallucinations_illusions', 'auditory_hallucinations_voices', 'quantitative_vigilance_reduction'],
    conditions: [
      {
        conditionId: 'narcolepsy',
        prevalence: 'pathognomonisch',
        specificityScore: 0.96,
        clinicalNote: 'Klassische narkoleptische Tetrade: Imperativer Schlafdrang, Kataplexie, Schlaflähmung und hypnagoge Halluzinationen.'
      },
      {
        conditionId: 'lewy_body_parkinson',
        prevalence: 'pathognomonisch',
        specificityScore: 0.94,
        clinicalNote: 'Das Spiegelbild der Schlaflähmung – die REM-Schlaf-Verhaltensstörung (fehlendes Abschalten der Muskulatur im Traum) – geht Parkinson und Lewy-Körper-Demenz oft um 10 Jahre voraus!'
      },
      {
        conditionId: 'sleep_deprivation_stress_grief',
        prevalence: 'haeufig',
        specificityScore: 0.85,
        clinicalNote: 'Isolierte Schlaflähmung und hypnagoge Bilder treten bei 20–30 % aller gesunden Menschen unter Schlafentzug oder Schichtdienst auf.'
      },
      {
        conditionId: 'ptsd_cptsd',
        prevalence: 'haeufig',
        specificityScore: 0.78,
        clinicalNote: 'Gehäuftes Auftreten von Schlaflähmung und posttraumatischen Alpträumen.'
      }
    ]
  },

  // ============================================================================
  // DOM-12: NEURODIVERGENTE REIZ-, FOKUS- & VERARBEITUNGSPHÄNOMENE
  // ============================================================================
  {
    id: 'hyperfocus_tunnel',
    name: 'Hyperfokus & Monotropismus (Interessengesteuerte Tiefenabsorption)',
    englishName: 'Hyperfocus & Monotropism (Interest-Driven Deep Flow)',
    synonyms: ['Aufmerksamkeitstunnel', 'Monotrope Bündelung', 'Spezialinteressen-Absorption'],
    domainId: 'neurodivergence_sensory',
    amdpCode: 'AMDP Zusatz Neurodivergenz',
    hpoId: 'HP:0033695',
    icd11SymptomCode: 'Neurodivergenz-Merkmal',
    rdocDomain: 'Cognitive Systems & Positive Valence (Intrinsic Reward Attention)',
    visualArchetype: 'laser_prism_beam',
    shortVisualTagline: 'Gebündelter Laserstrahl schneidet hochpräzise durch diffuses Grundrauschen',
    definition: 'Fähigkeit und Tendenz, nahezu 100 % der verfügbaren Aufmerksamkeits- und Arbeitsgedächtnisressourcen über viele Stunden hinweg auf ein einziges, intrinsisch faszinierendes Thema oder Problem zu bündeln, während Hunger, Durst, Zeit und Außenreize komplett ausgeblendet werden.',
    subjectiveExperience: 'Sobald das Thema zündet, verschwindet die Welt: Ich tauche acht Stunden am Stück in hochkomplexe Zusammenhänge ein, vergesse zu essen und merke erst nachts um drei Uhr, dass der Tag vorbei ist.',
    neurobiology: 'Monotropismus-Theorie (Murray/Lesser/Lawson) & dopaminerge Salienz-Kopplung: Während routinemäßige Aufgaben zu wenig Dopamin im präfrontalen Kortex freisetzen, erzeugt intrinsische Faszination eine hochstabile frontostriatale Synchronisation.',
    wikiTitleDe: 'Hyperfokus',
    wikiTitleEn: 'Hyperfocus',
    pubmedQuery: 'hyperfocus monotropism ADHD autism attention allocation intrinsic motivation',
    olsSearchTerm: 'attention',
    relatedPhenomenaIds: ['executive_paralysis', 'subjective_time_distortion', 'sensory_overload_flooding'],
    conditions: [
      {
        conditionId: 'adhd',
        prevalence: 'leitsymptom',
        specificityScore: 0.94,
        clinicalNote: 'Belegt, dass ADHS kein „Aufmerksamkeits-Defizit“, sondern eine interessengesteuerte Aufmerksamkeits-Steuerungsdivergenz ist.'
      },
      {
        conditionId: 'autism_spectrum',
        prevalence: 'pathognomonisch',
        specificityScore: 0.95,
        clinicalNote: 'Monotropismus gilt heute als eines der fruchtbarsten Erklärungsmodelle autistischer Kognition und Spezialinteressen.'
      },
      {
        conditionId: 'bipolar_disorder',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'In hypomanen Phasen oft produktiver, nächtelanger Schaffensrausch.'
      }
    ]
  },
  {
    id: 'sensory_overload_flooding',
    name: 'Sensorische Reizüberflutung (Sensory Overload), Reizfilterungsschwäche & Misophonie',
    englishName: 'Sensory Overload, Impaired Sensory Gating & Misophonia',
    synonyms: ['Reizoffenheit', 'Hyperakusis', 'Taktile Abwehr', 'Misophonie'],
    domainId: 'neurodivergence_sensory',
    amdpCode: 'AMDP Zusatz Sensorik',
    hpoId: 'HP:0010780',
    icd11SymptomCode: 'MB27.Y',
    rdocDomain: 'Arousal & Cognitive Systems (Thalamic Sensory Gating P50)',
    visualArchetype: 'kaleidoscope_wave_collision',
    shortVisualTagline: 'Ungefilterte Schall- und Lichtwellen überlagern sich zu grellem Interferenzsturm',
    definition: 'Verminderte vorbewusste Ausfilterung irrelevanter Hintergrundreize (Sensory Gating), sodass mehrere gleichzeitige Sinneseindrücke (Neonlicht, Kühlschrankbrummen, Kratzen eines Etiketts, Kaugeräusche bei Misophonie) gleich laut und schmerzhaft ins Bewusstsein dringen.',
    subjectiveExperience: 'Im Restaurant höre ich nicht nur mein Gegenüber, sondern gleichzeitig zwanzig Gespräche, das Klappern jeder Gabel und das Summen der Lüftung in exakt derselben Lautstärke, bis mein Nervensystem wie unter Strom steht.',
    neurobiology: 'Reduzierte thalamische Habituation und P50-Sensory-Gating-Hemmung sowie Hyperkonnektivität zwischen primären sensorischen Kortizes und der anterioren Insula/Amygdala.',
    wikiTitleDe: 'Reizüberflutung',
    wikiTitleEn: 'Sensory_overload',
    pubmedQuery: 'sensory overload sensory gating P50 autism ADHD misophonia anterior insula',
    olsSearchTerm: 'hyperacusis',
    relatedPhenomenaIds: ['autistic_meltdown_shutdown', 'stimming_self_regulation', 'synesthesia_crossmodal'],
    conditions: [
      {
        conditionId: 'autism_spectrum',
        prevalence: 'pathognomonisch',
        specificityScore: 0.96,
        clinicalNote: 'Sensorische Hyper- oder Hyposensitivität ist ein offizielles diagnostisches Hauptkriterium in DSM-5 und ICD-11.'
      },
      {
        conditionId: 'adhd',
        prevalence: 'leitsymptom',
        specificityScore: 0.88,
        clinicalNote: 'Hohe Reizoffenheit und Ablenkbarkeit durch akustische oder visuelle Hintergrundreize.'
      },
      {
        conditionId: 'mecfs_longcovid_pots',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Ausgeprägte Licht- und Geräuschintoleranz bei schwerer ME/CFS, sodass Betroffene oft in abgedunkelten Räumen liegen müssen.'
      },
      {
        conditionId: 'migraine_alice',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Iktale und interiktale Photophobie, Phonophobie und Osmophobie.'
      },
      {
        conditionId: 'schizophrenia',
        prevalence: 'haeufig',
        specificityScore: 0.82,
        clinicalNote: 'Frühes P50-Sensory-Gating-Defizit im Prodromalstadium („Ich habe kein Sieb mehr im Kopf“).'
      }
    ]
  },
  {
    id: 'autistic_meltdown_shutdown',
    name: 'Meltdown & Shutdown (Neurobiologischer Systemkollaps nach Überladung)',
    englishName: 'Autistic Meltdown & Shutdown (Neurological Overload Collapse)',
    synonyms: ['Eruptiver Overload-Zusammenbruch', 'Dissoziativer Shutdown', 'Verbaler Shutdown'],
    domainId: 'neurodivergence_sensory',
    amdpCode: 'AMDP Zusatz Neurodivergenz',
    hpoId: 'HP:0033696',
    icd11SymptomCode: '6A02.Z',
    rdocDomain: 'Arousal and Regulatory Systems (Autonomic Crisis & Freeze/Fight)',
    visualArchetype: 'circuit_overload_eclipse',
    shortVisualTagline: 'Überspannungsbogen nach außen (Meltdown) oder Notabschaltung nach innen (Shutdown)',
    definition: 'Unwillkürliche Notfallreaktion des zentralen und autonomen Nervensystems nach kumulativer sensorischer, sozialer oder exekutiver Überlastung: Entweder als eruptive Entladung (Meltdown mit Weinen, Schreien, Bewegungssturm) oder als innere Notabschaltung (Shutdown mit Erstarren, Rückzug und temporärem Verlust der Sprechfähigkeit).',
    subjectiveExperience: 'Es hat nichts mit Trotz oder Manipulation zu tun: Wenn das Fass überläuft, brennt die Sicherung durch – beim Shutdown will ich antworten, aber die Verbindung zwischen Gedanken und Stimmbändern ist physisch gekappt.',
    neurobiology: 'Akute sympathische Übererregung (Fight/Flight -> Meltdown) bzw. dorsal-vagale parasympathische Notbremse und temporäre Broca-Areal-Abschaltung (Freeze -> Shutdown).',
    wikiTitleDe: 'Autismus',
    wikiTitleEn: 'Autistic_meltdown',
    pubmedQuery: 'autistic meltdown shutdown sensory overload autonomic nervous system selective mutism',
    olsSearchTerm: 'autism',
    relatedPhenomenaIds: ['sensory_overload_flooding', 'stimming_self_regulation', 'catatonia_stupor_mutism'],
    conditions: [
      {
        conditionId: 'autism_spectrum',
        prevalence: 'pathognomonisch',
        specificityScore: 0.96,
        clinicalNote: 'Chronische Unterdrückung von Meltdowns/Shutdowns und Stimming führt langfristig zum „Autistic Burnout“.'
      },
      {
        conditionId: 'adhd',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Vor allem bei kombinierter AuDHD nach Reiz- und Entscheidungsüberflutung.'
      },
      {
        conditionId: 'ptsd_cptsd',
        prevalence: 'haeufig',
        specificityScore: 0.78,
        clinicalNote: 'Hohe neurobiologische Verwandtschaft des Shutdowns mit der peritraumatischen Freeze-Reaktion.'
      }
    ]
  },
  {
    id: 'stimming_self_regulation',
    name: 'Stimming (Selbststimulierendes & Selbstregulierendes Bewegungsverhalten)',
    englishName: 'Stimming (Self-Stimulatory & Self-Regulatory Motor Behavior)',
    synonyms: ['Stereotypien', 'Hand-Flapping', 'Rocking (Schaukeln)', 'Vokales Stimming'],
    domainId: 'neurodivergence_sensory',
    amdpCode: 'AMDP 87 / Neurodivergenz',
    hpoId: 'HP:0000733',
    icd11SymptomCode: 'MB23.3',
    rdocDomain: 'Sensorimotor & Arousal Systems (Proprioceptive Homeostasis)',
    visualArchetype: 'harmonic_pendulum_rings',
    shortVisualTagline: 'Rhythmische Schwingungsringe bringen ein chaotisches Wellenfeld in Harmonie',
    definition: 'Rhythmische, selbstgewählte Wiederholung von Bewegungen (Schaukeln des Oberkörpers, Flattern mit den Händen, Fingerschnippen, Fidgeting), Lauten oder taktilen Berührungen zur aktiven Regulation von Reizüberflutung, Unterstimulation oder intensiver Freude.',
    subjectiveExperience: 'Wenn die Umwelt chaotisch und unberechenbar ist, erzeugt das rhythmische Schaukeln oder Reiben eines glatten Steins ein verlässliches, vorhersehbares Körpersignal, das mein Nervensystem sofort erdet.',
    neurobiology: 'Rhythmische propriozeptive und vestibuläre Rückkopplung synchronisiert thalamokortikale Oszillationen und senkt die Amygdala- und Sympathikus-Aktivierung.',
    wikiTitleDe: 'Stimming',
    wikiTitleEn: 'Stimming',
    pubmedQuery: 'stimming self-stimulatory behavior autism ADHD sensory regulation proprioception',
    olsSearchTerm: 'stereotypy',
    relatedPhenomenaIds: ['sensory_overload_flooding', 'masking_camouflaging', 'psychomotor_agitation_hyperkinesia'],
    conditions: [
      {
        conditionId: 'autism_spectrum',
        prevalence: 'pathognomonisch',
        specificityScore: 0.95,
        clinicalNote: 'Essenzielles, gesundes Selbstregulationswerkzeug zur Verarbeitung von Reizen und Emotionen.'
      },
      {
        conditionId: 'adhd',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Motorisches Fidgeting (Wippen mit dem Fuß, Klicken mit dem Stift) erhöht nachweislich die präfrontale Dopamin-Verfügbarkeit und Konzentration.'
      },
      {
        conditionId: 'tourette_tics',
        prevalence: 'haeufig',
        specificityScore: 0.78,
        clinicalNote: 'Abgrenzung: Stimming ist rhythmisch und selbstregulierend; Tics sind ruckartig und durch ein Premonitory Urge getrieben.'
      }
    ]
  },
  {
    id: 'masking_camouflaging',
    name: 'Masking & Camouflaging (Soziale Überanpassung & Kompensation)',
    englishName: 'Autistic / Neurodivergent Masking & Social Camouflaging',
    synonyms: ['Soziale Mimikry', 'Fassaden-Kompensation', 'Unterdrückung von Neurodivergenz'],
    domainId: 'neurodivergence_sensory',
    amdpCode: 'AMDP Zusatz Sozial',
    hpoId: 'HP:0033697',
    icd11SymptomCode: 'Neurodivergenz-Merkmal',
    rdocDomain: 'Systems for Social Processes & Cognitive Control (Effortful Social Monitoring)',
    visualArchetype: 'porcelain_facade_prism',
    shortVisualTagline: 'Glatte symmetrische Außenmaske vor einem hochkomplexen inneren Zahnradwerk',
    definition: 'Bewusstes oder automatisiertes Unterdrücken eigener neurodivergenter Ausdrucksformen (z. B. Stimming unterdrücken, Blickkontakt erzwingen, vorformulierte Smalltalk-Skripte abspielen, Mimik spiegeln), um nicht negativ aufzufallen oder stigmatisiert zu werden.',
    subjectiveExperience: 'Jedes Gespräch ist wie eine Theateraufführung in einer Fremdsprache: Ich berechne im Kopf jede Sekunde „Jetzt 3 Sekunden in die Augen schauen, jetzt nicken, jetzt lächeln“ – und breche abends zu Hause vor Erschöpfung zusammen.',
    neurobiology: 'Rekrutierung des energieintensiven dorsolateralen präfrontalen Exekutivnetzwerks für soziale Prozesse, die bei neurotypischen Menschen automatisch-subkortikal ablaufen.',
    wikiTitleDe: 'Masking_(Autismus)',
    wikiTitleEn: 'Autistic_masking',
    pubmedQuery: 'autistic masking social camouflaging CAT-Q burnout prefrontal effort',
    olsSearchTerm: 'social behavior',
    relatedPhenomenaIds: ['stimming_self_regulation', 'double_empathy_social_semiotics', 'autistic_meltdown_shutdown'],
    conditions: [
      {
        conditionId: 'autism_spectrum',
        prevalence: 'leitsymptom',
        specificityScore: 0.95,
        clinicalNote: 'Hauptgrund für späte Diagnosen im Erwachsenenalter (insbesondere bei Frauen und hochkompensierenden Personen).'
      },
      {
        conditionId: 'adhd',
        prevalence: 'leitsymptom',
        specificityScore: 0.88,
        clinicalNote: 'Verbergen von innerer Unruhe, Zeitblindheit und Vergesslichkeit durch extremen Perfektionismus und Überkontrolle.'
      },
      {
        conditionId: 'borderline_pd',
        prevalence: 'haeufig',
        specificityScore: 0.75,
        clinicalNote: 'Sogenannte „Scheinbare Kompetenz“ (Linehan): Nach außen ruhig und funktionierend wirken, während innerlich höchste Verzweiflung herrscht.'
      }
    ]
  },
  {
    id: 'synesthesia_crossmodal',
    name: 'Synästhesie (Crossmodale Sinneskopplung)',
    englishName: 'Synesthesia (Cross-Modal Sensory Integration)',
    synonyms: ['Farbenhören (Chromästhesie)', 'Graphem-Farb-Synästhesie', 'Spiegel-Berührungs-Synästhesie'],
    domainId: 'neurodivergence_sensory',
    amdpCode: 'AMDP Zusatz Wahrnehmung',
    hpoId: 'HP:0012232',
    icd11SymptomCode: 'Normvariante / MB27.Y',
    rdocDomain: 'Cognitive Systems (Multisensory Integration)',
    visualArchetype: 'chromatic_symphony_chords',
    shortVisualTagline: 'Musikalische Klangwellen verwandeln sich beim Schwingen in leuchtende Farbgeometrien',
    definition: 'Konsistente, unwillkürliche Miterregung eines zweiten Sinneskanals durch einen spezifischen Sinnesreiz: Buchstaben und Zahlen haben feste Farben, Musiknoten erzeugen dreidimensionale Formen im Raum oder beobachtete Berührungen anderer werden auf der eigenen Haut gefühlt.',
    subjectiveExperience: 'Die Zahl 4 war für mich schon immer leuchtend karminrot und der Mittwoch dunkelblau; wenn eine Geige spielt, sehe ich goldene Fäden vor mir in der Luft schweben.',
    neurobiology: 'Erhöhte strukturelle Hyperkonnektivität (reduziertes synaptisches Pruning) oder Enthemmung von Feedback-Projektionen zwischen benachbarten Arealen wie dem Wortform-Areal und dem Farbareal V4.',
    wikiTitleDe: 'Synästhesie',
    wikiTitleEn: 'Synesthesia',
    pubmedQuery: 'synesthesia cross-modal V4 fusiform gyrus autism psychedelics 5-HT2A',
    olsSearchTerm: 'synesthesia',
    relatedPhenomenaIds: ['consciousness_expansion_shift', 'sensory_overload_flooding', 'visual_hallucinations_illusions'],
    conditions: [
      {
        conditionId: 'synesthesia_gifted',
        prevalence: 'pathognomonisch',
        specificityScore: 0.98,
        clinicalNote: 'Angeborene, lebenslang zeitstabile neurodivergente Normvariante bei ca. 4 % der Bevölkerung.'
      },
      {
        conditionId: 'autism_spectrum',
        prevalence: 'haeufig',
        specificityScore: 0.85,
        clinicalNote: 'Im Autismus-Spektrum etwa dreimal häufiger als in der Allgemeinbevölkerung (ca. 18–20 %).'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'leitsymptom',
        specificityScore: 0.9,
        clinicalNote: 'Akute, vorübergehende induzierte Synästhesie („Musik sehen, Farben schmecken“) unter LSD, Psilocybin oder Meskalin.'
      },
      {
        conditionId: 'temporal_lobe_epilepsy',
        prevalence: 'selten',
        specificityScore: 0.65,
        clinicalNote: 'Seltene iktale synästhetische Auren bei temporoparietalem Anfallsursprung.'
      }
    ]
  },

  // ============================================================================
  // DOM-13: SOZIALE KOGNITION, BINDUNGS- & INTERAKTIONSPHÄNOMENE
  // ============================================================================
  {
    id: 'splitting_black_white',
    name: 'Spaltungserleben (Splitting / Dichotome Idealisierungs-Abwertungs-Dynamik)',
    englishName: 'Splitting (Dichotomous Idealization & Devaluation)',
    synonyms: ['Schwarz-Weiß-Erleben', 'Idealisierung und Entwertung', 'Verlust der Objektkonstanz'],
    domainId: 'social_cognition',
    amdpCode: 'AMDP Zusatz Interaktion',
    hpoId: 'HP:0033698',
    icd11SymptomCode: '6D11.5',
    rdocDomain: 'Systems for Social Processes (Attachment & Mentalizing under Stress)',
    visualArchetype: 'eclipsed_duality_sphere',
    shortVisualTagline: 'Sphäre teilt sich messerscharf in strahlendes Gold und tiefes Schwarz ohne Grauzone',
    definition: 'Momentane Unfähigkeit, unter hohem Bindungsstress positive und negative Eigenschaften einer nahestehenden Person (oder des eigenen Selbst) gleichzeitig im Bewusstsein zu halten, was zu raschen Wechseln zwischen vollkommener Idealisierung und radikaler Entwertung führt.',
    subjectiveExperience: 'Wenn du mir zugewandt bist, bist du meine einzige Rettung auf der Welt; wenn du fünf Minuten zu spät kommst, erlischt die Erinnerung an deine Wärme komplett und du wirkst wie mein gefährlichster Feind.',
    neurobiology: 'Stressinduzierter Zusammenbruch der präfrontalen Mentalisierungsnetzwerke (mPFC, TPJ) bei gleichzeitiger Amygdala-Dominanz (Verlust der emotionalen Objektkonstanz).',
    wikiTitleDe: 'Spaltung_(Psychologie)',
    wikiTitleEn: 'Splitting_(psychology)',
    pubmedQuery: 'splitting idealization devaluation borderline object constancy mentalizing stress',
    olsSearchTerm: 'personality disorder',
    relatedPhenomenaIds: ['rejection_sensitive_dysphoria', 'ambivalence_affective_volitional', 'depersonalization'],
    conditions: [
      {
        conditionId: 'borderline_pd',
        prevalence: 'pathognomonisch',
        specificityScore: 0.94,
        clinicalNote: 'Zentraler Schutz- und Regulationsmechanismus bei Störung der emotionalen Objektkonstanz.'
      },
      {
        conditionId: 'ptsd_cptsd',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Bei komplexer Bindungstraumatisierung als Überlebensreaktion auf unberechenbare Bezugspersonen.'
      }
    ]
  },
  {
    id: 'double_empathy_social_semiotics',
    name: 'Double-Empathy-Phänomen & Divergente Soziale Semiotik',
    englishName: 'Double Empathy Problem & Divergent Social Semiotics',
    synonyms: ['Gegenseitige Empathie-Übersetzungslücke', 'Kontextblindheit vs. Direkte Kommunikation', 'Monotrope Kommunikation'],
    domainId: 'social_cognition',
    amdpCode: 'AMDP Zusatz Sozial',
    hpoId: 'HP:0000729',
    icd11SymptomCode: '6A02',
    rdocDomain: 'Systems for Social Processes (Social Communication & Reciprocity)',
    visualArchetype: 'dual_frequency_bridge',
    shortVisualTagline: 'Zwei präzise, aber unterschiedlich getaktete Wellenlängen suchen einen gemeinsamen Übersetzer',
    definition: 'Nach Damian Milton beruhen Kommunikationsbrüche zwischen autistischen und neurotypischen Menschen nicht auf einem einseitigen „Empathiedefizit“, sondern auf einer beidseitigen Übersetzungslücke zweier unterschiedlicher Wahrnehmungs-, Ausdrucks- und Sprachkulturen.',
    subjectiveExperience: 'Unter anderen neurodivergenten Menschen verstehe ich jedes Wort und jede Regung mühelos; in neurotypischen Gruppen wird mir jedes direkte, ehrliche Wort als „unhöflich“ ausgelegt, während ich deren unausgesprochene Andeutungen raten muss.',
    neurobiology: 'Unterschiedliche Gewichtung von explizit-semantischer Informationsverarbeitung gegenüber implizit-sozialer Heuristik im Default-Mode- und Salienz-Netzwerk.',
    wikiTitleDe: 'Doppeltes-Empathie-Problem',
    wikiTitleEn: 'Double_empathy_problem',
    pubmedQuery: 'double empathy problem Damian Milton autism social reciprocity communication',
    olsSearchTerm: 'social interaction',
    relatedPhenomenaIds: ['masking_camouflaging', 'alexithymia_interoception', 'prosopagnosia_facial_blindness'],
    conditions: [
      {
        conditionId: 'autism_spectrum',
        prevalence: 'pathognomonisch',
        specificityScore: 0.96,
        clinicalNote: 'Paradigmenwechsel der modernen Autismusforschung: Autistische Peer-to-Peer-Kommunikation ist ebenso effizient wie neurotypische Peer-to-Peer-Kommunikation.'
      },
      {
        conditionId: 'adhd',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Assoziatives „Info-Sharing“ als Empathiebeweis wird von neurotypischen Gesprächspartnern oft fälschlich als Unterbrechen missverstanden.'
      }
    ]
  },
  {
    id: 'prosopagnosia_facial_blindness',
    name: 'Prosopagnosie (Gesichtsblindheit) & Mimik-Dekodierungsdivergenz',
    englishName: 'Prosopagnosia (Face Blindness)',
    synonyms: ['Gesichtsblindheit', 'Apperzeptive / Assoziative Prosopagnosie'],
    domainId: 'social_cognition',
    amdpCode: 'AMDP Zusatz Neuropsychologie',
    hpoId: 'HP:0010528',
    icd11SymptomCode: 'MB27.0',
    rdocDomain: 'Systems for Social Processes (Reception of Facial Communication)',
    visualArchetype: 'pixelated_portrait_grid',
    shortVisualTagline: 'Einzelne Gesichtszüge sind scharf sichtbar, fügen sich aber nicht zur Identitätsgestalt zusammen',
    definition: 'Unfähigkeit oder erhebliche Erschwernis, bekannte Personen allein anhand ihres Gesichts wiederzuerkennen, sodass Betroffene auf Stimme, Gangbild, Frisur, Brille oder Kleidung ausweichen müssen.',
    subjectiveExperience: 'Ich sehe Augen, Nase und Mund gestochen scharf, aber wenn meine Kollegin mir im Supermarkt in Freizeitkleidung oder mit neuer Frisur begegnet, erkenne ich sie erst, wenn sie zu sprechen beginnt.',
    neurobiology: 'Funktionsabweichung oder strukturelle Läsion der Fusiform Face Area (FFA) im rechten Gyrus fusiformis des okzipitotemporalen Kortex.',
    wikiTitleDe: 'Prosopagnosie',
    wikiTitleEn: 'Prosopagnosia',
    pubmedQuery: 'prosopagnosia fusiform face area autism stroke face recognition',
    olsSearchTerm: 'agnosia',
    relatedPhenomenaIds: ['cotard_capgras_monothematic_delusions', 'double_empathy_social_semiotics', 'visual_hallucinations_illusions'],
    conditions: [
      {
        conditionId: 'autism_spectrum',
        prevalence: 'haeufig',
        specificityScore: 0.85,
        clinicalNote: 'Entwicklungsbedingte (kongenitale) Prosopagnosie tritt bei bis zu 30 % der Menschen im Autismus-Spektrum auf.'
      },
      {
        conditionId: 'stroke_tbi_korsakoff',
        prevalence: 'leitsymptom',
        specificityScore: 0.92,
        clinicalNote: 'Erworbene Prosopagnosie nach rechts- oder beidseitigem Posteriorinfarkt (Arteria cerebri posterior).'
      },
      {
        conditionId: 'alzheimer_ftd',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Im Verlauf der Alzheimer-Demenz und der rechts-temporalen Variante der FTD.'
      }
    ]
  },

  // ============================================================================
  // DOM-14: KÖRPERSCHEMA-, INTEROZEPTIONS- & SOMATOPSYCHISCHE PHÄNOMENE
  // ============================================================================
  {
    id: 'alice_in_wonderland_metamorphopsia',
    name: 'Alice-im-Wunderland-Phänomen (Mikropsie, Makropsie & Körperschema-Metamorphopsie)',
    englishName: 'Alice in Wonderland Syndrome (Micropsia, Macropsia, Pelopsia, Teleopsia)',
    synonyms: ['Metamorphopsie', 'Lilliputanische Wahrnehmung', 'Körperschema-Größenverzerrung'],
    domainId: 'somatopsychic',
    amdpCode: 'AMDP 49 / Körperschema',
    hpoId: 'HP:0031597',
    icd11SymptomCode: '8A80.1 / MB27.Y',
    rdocDomain: 'Cognitive & Sensorimotor Systems (Multisensory Body & Space Scaling)',
    visualArchetype: 'warped_scale_corridor',
    shortVisualTagline: 'Perspektivisches Raumgitter dehnt und staucht Körperproportionen wie ein Zerrspiegel',
    definition: 'Paroxysmale Verzerrung der Größen-, Entfernungs- und Körperproportionswahrnehmung: Gegenstände erscheinen winzig klein (Mikropsie), riesig (Makropsie), weit entfernt (Teleopsie) oder die eigenen Hände, Füße oder der Kopf fühlen sich riesenhaft vergrößert bzw. geschrumpft an.',
    subjectiveExperience: 'Während ich im Bett liege, fühlt sich mein Kopf plötzlich so groß wie ein Heißluftballon an, während meine Hände am Ende eines kilometerlangen Tunnels winzig klein wirken.',
    neurobiology: 'Passagere Funktionsstörung an der Kreuzung von temporo-parieto-okzipitalem Kortex (TPO-Kreuzung), wo visuelle, propriozeptive und vestibuläre Maßstabskarten zusammengeführt werden.',
    wikiTitleDe: 'Alice-im-Wunderland-Syndrom',
    wikiTitleEn: 'Alice_in_Wonderland_syndrome',
    pubmedQuery: 'Alice in Wonderland syndrome micropsia macropsia migraine temporoparietal occipital',
    olsSearchTerm: 'metamorphopsia',
    relatedPhenomenaIds: ['derealization', 'visual_hallucinations_illusions', 'subjective_time_distortion'],
    conditions: [
      {
        conditionId: 'migraine_alice',
        prevalence: 'pathognomonisch',
        specificityScore: 0.96,
        clinicalNote: 'Häufigste Ursache bei Erwachsenen ist die Migräne mit Aura (auch als isolierte Aura ohne Kopfschmerz).'
      },
      {
        conditionId: 'temporal_lobe_epilepsy',
        prevalence: 'haeufig',
        specificityScore: 0.85,
        clinicalNote: 'Als fokale parietotemporale Anfallsaura.'
      },
      {
        conditionId: 'delirium_sepsis_metabolic',
        prevalence: 'gelegentlich',
        specificityScore: 0.78,
        clinicalNote: 'Klassisch bei Kindern und Jugendlichen im Rahmen von Fieber oder Epstein-Barr-Virus-(EBV-)Infektionen.'
      },
      {
        conditionId: 'substance_intox_withdrawal',
        prevalence: 'haeufig',
        specificityScore: 0.8,
        clinicalNote: 'Unter Halluzinogenen oder Dextromethorphan.'
      }
    ]
  },
  {
    id: 'body_dysmorphic_distortion',
    name: 'Körperdysmorphe Wahrnehmungsverzerrung & Körperschemastörung',
    englishName: 'Body Dysmorphic Perceptual Distortion & Body Schema Disturbance',
    synonyms: ['Dysmorphophobie', 'Körperschemaverzerrung', 'Hyper-Detail-Fokus im Spiegel'],
    domainId: 'somatopsychic',
    amdpCode: 'AMDP Zusatz Körperschema',
    hpoId: 'HP:0033699',
    icd11SymptomCode: '6B21 / 6B80',
    rdocDomain: 'Cognitive & Social Systems (Visual Configural vs. Featural Body Processing)',
    visualArchetype: 'magnifying_mirror_distortion',
    shortVisualTagline: 'Konvexes Lupenprisma vergrößert ein einzelnes Detail und verzerrt die Gesamtgestalt',
    definition: 'Neurokognitive Verzerrung der Selbstwahrnehmung des eigenen Körpers: Entweder wird ein minimaler oder objektiv nicht vorhandener Makel im Spiegel als entstellend wahrgenommen (BDD) oder der eigene stark untergewichtige Körper wird visuell und taktil als breit/umfangreich erlebt (Anorexia nervosa).',
    subjectiveExperience: 'Wenn ich in den Spiegel blicke, sehe ich kein Gesamtgesicht, sondern wie unter einem Mikroskop nur eine einzige vermeintlich riesige Asymmetrie – oder ich spüre meinen Körper physisch doppelt so breit, wie das Maßband anzeigt.',
    neurobiology: 'Überaktivität der lokalen Detailverarbeitung (linkshemisphärisch / primärer visueller Kortex) bei Unterfunktion der ganzheitlich-konfiguralen Gesichts- und Körpernetzwerke (Extrastriate Body Area EBA und rechter Gyrus fusiformis) sowie gestörte parietale Körperkarten.',
    wikiTitleDe: 'Körperschemastörung',
    wikiTitleEn: 'Body_dysmorphic_disorder',
    pubmedQuery: 'body dysmorphic disorder anorexia nervosa extrastriate body area visual processing',
    olsSearchTerm: 'body dysmorphic disorder',
    relatedPhenomenaIds: ['obsessive_thoughts_impulses', 'alexithymia_interoception', 'alice_in_wonderland_metamorphopsia'],
    conditions: [
      {
        conditionId: 'anorexia_bdd',
        prevalence: 'pathognomonisch',
        specificityScore: 0.98,
        clinicalNote: 'Definierendes Kernsymptom sowohl der Körperdysmorphen Störung (BDD) als auch der Anorexia nervosa.'
      },
      {
        conditionId: 'ocd',
        prevalence: 'haeufig',
        specificityScore: 0.82,
        clinicalNote: 'Körperdysmorphe Störung gehört in ICD-11 und DSM-5 offiziell zur Gruppe der Zwangsspektrumsstörungen.'
      },
      {
        conditionId: 'major_depression',
        prevalence: 'gelegentlich',
        specificityScore: 0.7,
        clinicalNote: 'Sekundär verstärkt durch depressiven Selbsthass und Grübelzwang.'
      }
    ]
  },
  {
    id: 'somatization_functional_dissociation',
    name: 'Funktionelle Neurologische Dissoziation & Somatopsychische Schmerzprojektion',
    englishName: 'Functional Neurological Symptom Phenomenon & Somatopsychic Pain Amplification',
    synonyms: ['Dissoziative Bewegungs-/Sensibilitätsstörung', 'Funktionelle Lähmung / Anfälle (PNES)', 'Somatoforme Verstärkung'],
    domainId: 'somatopsychic',
    amdpCode: 'AMDP 28 / Somatopsychik',
    hpoId: 'HP:0033700',
    icd11SymptomCode: '6B60',
    rdocDomain: 'Sensorimotor & Interoceptive Systems (Predictive Coding & Motor Agency)',
    visualArchetype: 'interrupted_signal_silhouette',
    shortVisualTagline: 'Intakte Nervenbahnen werden durch ein übermächtiges Vorhersage-Schutzsignal blockiert',
    definition: 'Reale, nicht-simulierte körperliche Funktionsausfälle (funktionelle Lähmungen, Gangstörungen, funktionelles Blindsein, dissoziative nicht-epileptische Anfälle) oder chronische Schmerzsyndrome bei strukturell intakten Nervenbahnen durch eine Störung der zentralen Top-Down-Steuerung.',
    subjectiveExperience: 'Mein Bein gehorcht meinem bewussten Willen keinen Millimeter, obwohl das MRT völlig unauffällig ist – erst wenn meine Aufmerksamkeit abgelenkt wird (Hoover-Zeichen), bewegt sich der Muskel kurz automatisch.',
    neurobiology: 'Predictive-Coding-Störung (Edwards/Friston): Ein überstarkes unbewusstes Krankheits- oder Schutz-Erwartungsmodell (Prior) in der Insula und im supplementärmotorischen Areal überschreibt die normale willkürmotorische Ausführung (Agency) über die temporoparietale Kreuzung.',
    wikiTitleDe: 'Funktionelle_neurologische_Störung',
    wikiTitleEn: 'Functional_neurological_symptom_disorder',
    pubmedQuery: 'functional neurological disorder predictive coding Hoover sign temporoparietal junction',
    olsSearchTerm: 'conversion disorder',
    relatedPhenomenaIds: ['depersonalization', 'alexithymia_interoception', 'coenesthesia_bodily_hallucinations'],
    conditions: [
      {
        conditionId: 'dissociative_disorders',
        prevalence: 'pathognomonisch',
        specificityScore: 0.96,
        clinicalNote: 'In ICD-11 als „Dissoziative Störung mit neurologischen Symptomen“ (6B60) klassifiziert; Nachweis durch positive klinische Zeichen (z. B. Hoover-Zeichen, Tremor-Entrainment).'
      },
      {
        conditionId: 'ptsd_cptsd',
        prevalence: 'haeufig',
        specificityScore: 0.82,
        clinicalNote: 'Dissoziative (psychogene nicht-epileptische) Anfälle treten häufig nach schweren Traumata auf.'
      },
      {
        conditionId: 'panic_anxiety',
        prevalence: 'haeufig',
        specificityScore: 0.78,
        clinicalNote: 'Somatosensorische Amplifikation autonomer Angstsymptome (Herzstolpern, Schwindel, Engegefühl).'
      }
    ]
  }
];
