export type PhenomenonDomainId =
  | 'consciousness'
  | 'orientation'
  | 'attention_memory'
  | 'formal_thought'
  | 'fears_compulsions'
  | 'delusions'
  | 'perception'
  | 'ego_experience'
  | 'affectivity'
  | 'drive_psychomotor'
  | 'circadian_autonomic'
  | 'neurodivergence_sensory'
  | 'social_cognition'
  | 'somatopsychic';

export interface PhenomenonDomain {
  id: PhenomenonDomainId;
  code: string;
  name: string;
  shortName: string;
  amdpSection: string;
  rdocConstruct: string;
  color: string;
  accentBg: string;
  description: string;
}

export type ConditionCategory =
  | 'psychisch'
  | 'neurodivergent'
  | 'neurologisch'
  | 'somatisch_endokrin'
  | 'substanz_medikament'
  | 'physiologisch_norm';

export type PrevalenceLevel =
  | 'pathognomonisch'
  | 'leitsymptom'
  | 'haeufig'
  | 'gelegentlich'
  | 'selten';

export interface ConditionAssociation {
  conditionId: string;
  prevalence: PrevalenceLevel;
  specificityScore: number; // 0.1 to 1.0
  clinicalNote: string;
}

export interface ConditionEntity {
  id: string;
  name: string;
  englishName: string;
  icd11Code: string;
  dsm5Code?: string;
  hpoOrMondoId?: string;
  category: ConditionCategory;
  categoryLabel: string;
  wikiTitleDe: string;
  wikiTitleEn: string;
  summary: string;
  keyMechanism: string;
}

export interface PhenomenonEntity {
  id: string;
  name: string;
  englishName: string;
  synonyms: string[];
  domainId: PhenomenonDomainId;
  amdpCode: string;
  hpoId?: string;
  icd11SymptomCode?: string;
  rdocDomain: string;
  visualArchetype: string;
  shortVisualTagline: string;
  definition: string;
  subjectiveExperience: string;
  neurobiology: string;
  wikiTitleDe: string;
  wikiTitleEn: string;
  pubmedQuery: string;
  olsSearchTerm: string;
  relatedPhenomenaIds: string[];
  conditions: ConditionAssociation[];
}

export interface GraphNode {
  id: string;
  type: 'phenomenon' | 'condition';
  label: string;
  subLabel: string;
  domainOrCategory: string;
  domainId?: PhenomenonDomainId;
  category?: ConditionCategory;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  degree: number;
  isHighlighted?: boolean;
  isSelected?: boolean;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  kind: 'condition_link' | 'phenomenon_link';
  weight: number;
  label?: string;
  prevalence?: PrevalenceLevel;
}
