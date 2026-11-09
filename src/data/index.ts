import { PHENOMENON_DOMAINS, CONDITIONS_DATA, CONDITION_CATEGORY_META } from './domainsAndConditions';
import { PHENOMENA_PART_1 } from './phenomenaPart1';
import { PHENOMENA_PART_2 } from './phenomenaPart2';
import { PhenomenonEntity, ConditionEntity, PhenomenonDomain } from './types';

export const ALL_PHENOMENA: PhenomenonEntity[] = [
  ...PHENOMENA_PART_1,
  ...PHENOMENA_PART_2
];

export { PHENOMENON_DOMAINS, CONDITIONS_DATA, CONDITION_CATEGORY_META };

export function getPhenomenonById(id: string): PhenomenonEntity | undefined {
  return ALL_PHENOMENA.find((p) => p.id === id);
}

export function getConditionById(id: string): ConditionEntity | undefined {
  return CONDITIONS_DATA.find((c) => c.id === id);
}

export function getDomainById(id: string): PhenomenonDomain | undefined {
  return PHENOMENON_DOMAINS.find((d) => d.id === id);
}

export function getPhenomenaForCondition(conditionId: string): Array<{
  phenomenon: PhenomenonEntity;
  prevalence: string;
  specificityScore: number;
  clinicalNote: string;
}> {
  const result: Array<{
    phenomenon: PhenomenonEntity;
    prevalence: string;
    specificityScore: number;
    clinicalNote: string;
  }> = [];

  for (const p of ALL_PHENOMENA) {
    const assoc = p.conditions.find((c) => c.conditionId === conditionId);
    if (assoc) {
      result.push({
        phenomenon: p,
        prevalence: assoc.prevalence,
        specificityScore: assoc.specificityScore,
        clinicalNote: assoc.clinicalNote
      });
    }
  }

  return result.sort((a, b) => b.specificityScore - a.specificityScore);
}
