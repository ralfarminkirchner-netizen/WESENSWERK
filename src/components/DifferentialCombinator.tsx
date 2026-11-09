import React, { useState, useEffect } from 'react';
import {
  ALL_PHENOMENA,
  PHENOMENON_DOMAINS,
  CONDITIONS_DATA,
  CONDITION_CATEGORY_META,
  getDomainById
} from '../data/index';
import { ConditionCategory } from '../data/types';
import {
  CLINICAL_SIMULATION_PROFILES,
  ClinicalSimulationProfile
} from '../data/clinicalSimulations';
import {
  rankConditionsByPhenomena,
  buildCategoryPrevalenceMatrix,
  buildConditionAssociationHeatmap,
  evaluateClinicalSimulationState,
  formatConditionShortName,
  HeatmapWeightMode,
  HeatmapIntensityTier,
  HeatmapAssociationCell,
  PREVALENCE_LEVEL_META
} from '../utils/graphEngine';
import { PhenomenonArtwork } from './PhenomenonArtwork';
import {
  CheckSquare,
  Square,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Table2,
  Flame,
  X,
  Filter,
  Info,
  Stethoscope,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';

interface DifferentialCombinatorProps {
  selectedPhenomenaIds: string[];
  onTogglePhenomenon: (id: string) => void;
  onSetPreset: (ids: string[]) => void;
  onInspectEntity: (id: string, type: 'phenomenon' | 'condition') => void;
}

type TableMetricMode = 'prevalence' | 'conditions';

const HEATMAP_TIER_STYLE: Record<
  HeatmapIntensityTier,
  {
    bg: string;
    border: string;
    text: string;
    subText: string;
    barColor: string;
    badgeBg: string;
    label: string;
    rangeLabel: string;
  }
> = {
  none: {
    bg: 'rgba(9, 14, 26, 0.65)',
    border: 'rgba(30, 41, 59, 0.6)',
    text: '#475569',
    subText: '#334155',
    barColor: '#334155',
    badgeBg: 'rgba(15, 23, 42, 0.6)',
    label: 'Keine Kopplung',
    rangeLabel: '0 %'
  },
  low: {
    bg: 'linear-gradient(135deg, rgba(30, 58, 138, 0.38) 0%, rgba(15, 23, 42, 0.85) 100%)',
    border: 'rgba(59, 130, 246, 0.42)',
    text: '#93C5FD',
    subText: '#BFDBFE',
    barColor: '#3B82F6',
    badgeBg: 'rgba(30, 58, 138, 0.55)',
    label: 'Schwach / Gelegentlich',
    rangeLabel: '12–41 %'
  },
  moderate: {
    bg: 'linear-gradient(135deg, rgba(14, 116, 144, 0.48) 0%, rgba(8, 51, 68, 0.82) 100%)',
    border: 'rgba(6, 182, 212, 0.55)',
    text: '#67E8F9',
    subText: '#A5F3FC',
    barColor: '#06B6D4',
    badgeBg: 'rgba(8, 51, 68, 0.72)',
    label: 'Moderat / Häufig',
    rangeLabel: '42–63 %'
  },
  high: {
    bg: 'linear-gradient(135deg, rgba(180, 83, 9, 0.54) 0%, rgba(120, 53, 15, 0.82) 100%)',
    border: 'rgba(245, 158, 11, 0.68)',
    text: '#FDE68A',
    subText: '#FEF3C7',
    barColor: '#F59E0B',
    badgeBg: 'rgba(120, 53, 15, 0.75)',
    label: 'Stark / Leitsymptom',
    rangeLabel: '64–81 %'
  },
  critical: {
    bg: 'linear-gradient(135deg, rgba(190, 18, 60, 0.64) 0%, rgba(136, 19, 55, 0.88) 100%)',
    border: 'rgba(251, 113, 133, 0.82)',
    text: '#FFE4E6',
    subText: '#FECDD3',
    barColor: '#FB7185',
    badgeBg: 'rgba(136, 19, 55, 0.85)',
    label: 'Kritisch / Pathognom.',
    rangeLabel: '82–99 %'
  }
};

export const DifferentialCombinator: React.FC<DifferentialCombinatorProps> = ({
  selectedPhenomenaIds,
  onTogglePhenomenon,
  onSetPreset,
  onInspectEntity
}) => {
  const [tableMetricMode, setTableMetricMode] = useState<TableMetricMode>('prevalence');
  const [focusedCategory, setFocusedCategory] = useState<ConditionCategory | 'all'>('all');
  const [heatmapWeightMode, setHeatmapWeightMode] = useState<HeatmapWeightMode>('weighted');
  const [showAllHeatmapColumns, setShowAllHeatmapColumns] = useState<boolean>(false);
  const [inspectedCellKey, setInspectedCellKey] = useState<string | null>(null);

  // Clinical Simulation Mode State
  const [isSimulationActive, setIsSimulationActive] = useState<boolean>(true);
  const [activeProfileId, setActiveProfileId] = useState<string>(
    CLINICAL_SIMULATION_PROFILES[0].id
  );
  const [selectedOptionByStepId, setSelectedOptionByStepId] = useState<Record<string, string>>({});

  const activeSimProfile: ClinicalSimulationProfile =
    CLINICAL_SIMULATION_PROFILES.find((p) => p.id === activeProfileId) ??
    CLINICAL_SIMULATION_PROFILES[0];

  // Synchronize initial patient vignette phenomena on first mount so SIM-01 and the Heatmap match immediately
  useEffect(() => {
    onSetPreset(CLINICAL_SIMULATION_PROFILES[0].initialPhenomenaIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const simEvaluation = evaluateClinicalSimulationState(
    activeSimProfile,
    selectedOptionByStepId,
    focusedCategory,
    showAllHeatmapColumns ? 24 : 7
  );

  const activeConditionMultipliers =
    isSimulationActive && simEvaluation.answeredStepsCount > 0
      ? simEvaluation.conditionMultipliers
      : undefined;

  const rankedConditions = rankConditionsByPhenomena(
    selectedPhenomenaIds,
    ALL_PHENOMENA,
    CONDITIONS_DATA,
    activeConditionMultipliers
  );
  const prevalenceMatrix = buildCategoryPrevalenceMatrix(selectedPhenomenaIds);
  const heatmapMatrix = buildConditionAssociationHeatmap(
    selectedPhenomenaIds,
    focusedCategory,
    showAllHeatmapColumns ? 24 : 7,
    ALL_PHENOMENA,
    CONDITIONS_DATA,
    activeConditionMultipliers
  );

  const handleSelectSimulationProfile = (profile: ClinicalSimulationProfile) => {
    setIsSimulationActive(true);
    setActiveProfileId(profile.id);
    setSelectedOptionByStepId({});
    setInspectedCellKey(null);
    onSetPreset(profile.initialPhenomenaIds);
  };

  const handleSelectSimulationOption = (stepId: string, optionId: string) => {
    const nextMap: Record<string, string> = { ...selectedOptionByStepId };
    if (nextMap[stepId] === optionId) {
      delete nextMap[stepId];
    } else {
      nextMap[stepId] = optionId;
    }
    setSelectedOptionByStepId(nextMap);
    setIsSimulationActive(true);
    setInspectedCellKey(null);

    const nextEval = evaluateClinicalSimulationState(activeSimProfile, nextMap);
    onSetPreset(nextEval.activePhenomenaIds);
  };

  const handleResetSimulationSteps = () => {
    setSelectedOptionByStepId({});
    setInspectedCellKey(null);
    onSetPreset(activeSimProfile.initialPhenomenaIds);
  };

  const filteredRankedConditions =
    focusedCategory === 'all'
      ? rankedConditions
      : rankedConditions.filter((item) => item.condition.category === focusedCategory);

  // Resolve currently inspected cell in the heatmap (user selection or fallback to peakCell)
  const activeHeatmapCell: HeatmapAssociationCell | null = (() => {
    if (inspectedCellKey) {
      for (const r of heatmapMatrix.rows) {
        for (const c of r.cells) {
          if (`${c.phenomenonId}::${c.conditionId}` === inspectedCellKey && c.hasAssociation) {
            return c;
          }
        }
      }
    }
    return heatmapMatrix.peakCell;
  })();

  const getCellDisplayValue = (cell: HeatmapAssociationCell): number => {
    if (!cell.hasAssociation) return 0;
    if (heatmapWeightMode === 'specificity') return cell.specificityPct;
    if (heatmapWeightMode === 'prevalence') return cell.estimatedPrevalencePct;
    return cell.weightedAssociationPct;
  };

  const getCellDisplayTier = (cell: HeatmapAssociationCell): HeatmapIntensityTier => {
    const val = getCellDisplayValue(cell);
    if (val <= 0) return 'none';
    if (val >= 82) return 'critical';
    if (val >= 64) return 'high';
    if (val >= 42) return 'moderate';
    return 'low';
  };

  const presets = [
    {
      label: 'Profil A: Neurodivergenter Fokus & Reizfilter (ADHS / ASS)',
      ids: [
        'hyperfocus_tunnel',
        'executive_paralysis',
        'subjective_time_distortion',
        'sensory_overload_flooding',
        'stimming_self_regulation'
      ]
    },
    {
      label: 'Profil B: Kurt-Schneider-Erstrang & Salienz (Psychose vs. NMDA-Enzephalitis)',
      ids: [
        'thought_insertion_withdrawal',
        'delusional_perception',
        'auditory_hallucinations_voices',
        'delusional_mood_salience'
      ]
    },
    {
      label: 'Profil C: Temporallappen-Aura vs. Dissoziation (Déjà-vu, Phantosmie, Derealisation)',
      ids: [
        'deja_vu_jamais_vu',
        'olfactory_gustatory_hallucinations',
        'derealization',
        'consciousness_narrowing'
      ]
    },
    {
      label: 'Profil D: Schwere Melancholie vs. Somatische Hypothyreose/B12-Mangel',
      ids: [
        'feeling_of_feelinglessness',
        'anhedonia_loss_of_pleasure',
        'thought_inhibition_retardation',
        'morning_low_circadian',
        'abulia_drive_inhibition'
      ]
    }
  ];

  return (
    <div className="space-y-3">
      {/* Top Explanation, Simulation Mode Switch & Quick Presets */}
      <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-3 space-y-2 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="max-w-3xl">
            <h2
              className="text-base sm:text-lg font-semibold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Transdiagnostischer Phänomen-Kombinator, Klinische Fall-Simulation & Assoziations-Heatmap
            </h2>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
              Durchlaufen Sie interaktive differentialdiagnostische Patienten-Szenarien mit schrittweisen
              Folgefragen (Anamnese, Untersuchung, Zusatzdiagnostik) und beobachten Sie in Echtzeit, wie sich
              die gewichtete Assoziations-Heatmap iterativ aktualisiert.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsSimulationActive((prev) => !prev)}
              aria-pressed={isSimulationActive}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap ${
                isSimulationActive
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm shadow-emerald-500/30'
                  : 'bg-[#131B2E] text-emerald-300 border-emerald-500/40 hover:bg-emerald-950/60'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>
                Klinische Simulation {isSimulationActive ? 'aktiv' : 'einblenden'} (
                {simEvaluation.answeredStepsCount}/{simEvaluation.totalStepsCount})
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSetPreset([]);
                setSelectedOptionByStepId({});
                setFocusedCategory('all');
                setInspectedCellKey(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-[#131B2E] hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Auswahl leeren ({selectedPhenomenaIds.length})</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-800/80">
          <span className="text-[11px] font-mono font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Statische Symptom-Cluster:</span>
          </span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedOptionByStepId({});
                onSetPreset(preset.ids);
                setInspectedCellKey(null);
              }}
              className="px-2.5 py-1 text-[11px] font-medium bg-[#070A12] hover:bg-sky-500/15 hover:text-sky-300 text-slate-300 border border-slate-800 hover:border-sky-500/50 rounded-lg transition-colors text-left"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================================
          CLINICAL SIMULATION MODE: PATIENT PROFILES & ITERATIVE FOLLOW-UP QUESTIONS
      ===================================================================== */}
      {isSimulationActive && (
        <section
          aria-label="Klinische Simulation: Differentialdiagnostisches Patienten-Szenario"
          data-testid="clinical-simulation-section"
          className="bg-[#08101E] border border-emerald-500/45 rounded-xl p-3 space-y-2.5 shadow-2xl"
        >
          {/* Simulation Top Bar & Patient Profile Selector */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Klinische Simulation · Iterative Bayes-Heatmap</span>
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Differentialdiagnostischer Entscheidungs-Durchlauf
              </h3>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-[10px] text-slate-300 tabular-nums">
                Fortschritt: {simEvaluation.answeredStepsCount} / {simEvaluation.totalStepsCount}{' '}
                Folgefragen beantwortet
              </span>
            </div>

            {simEvaluation.answeredStepsCount > 0 && (
              <button
                type="button"
                onClick={handleResetSimulationSteps}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-amber-300 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/40 rounded-lg transition-colors shrink-0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Szenario zurücksetzen (Basis-Aufnahmebefund)</span>
              </button>
            )}
          </div>

          {/* 4 Patient Profile Vignette Selector Tabs */}
          <div
            role="group"
            aria-label="Klinisches Patientenprofil auswählen"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2"
          >
            {CLINICAL_SIMULATION_PROFILES.map((prof) => {
              const isSelected = prof.id === activeSimProfile.id;
              return (
                <button
                  key={prof.id}
                  type="button"
                  onClick={() => handleSelectSimulationProfile(prof)}
                  aria-pressed={isSelected}
                  className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between gap-0.5 ${
                    isSelected
                      ? 'bg-emerald-950/45 border-emerald-400 ring-1 ring-emerald-400 shadow-lg'
                      : 'bg-[#060913]/90 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 font-mono text-[10px]">
                    <span
                      className={`font-bold px-1.5 py-0.2 rounded ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {prof.code}
                    </span>
                    <span className="text-slate-400 truncate">{prof.patientDemographics.split(',')[0]}</span>
                  </div>
                  <div className="text-xs font-bold text-white leading-snug line-clamp-1">
                    {prof.title.split('—')[1]?.trim() ?? prof.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 truncate">
                    {prof.title.split('—')[0].trim()} · {prof.initialPhenomenaIds.length} Basis-Phän.
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Patient Vignette & Live Competing Hypothesis Shift Monitor */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 p-2.5 rounded-xl bg-[#050811] border border-slate-800/90">
            <div className="lg:col-span-5 space-y-1 pr-1">
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-emerald-300">
                <Activity className="w-3.5 h-3.5 shrink-0" />
                <span className="font-bold">{activeSimProfile.title}</span>
              </div>
              <p className="text-[11px] text-slate-200 leading-snug">
                {activeSimProfile.clinicalVignette}
              </p>
              <div className="flex flex-wrap items-center gap-1 pt-0.5">
                <span className="text-[10px] font-mono text-slate-400">Aktive Phänomene:</span>
                {selectedPhenomenaIds.map((pid) => {
                  const phen = ALL_PHENOMENA.find((p) => p.id === pid);
                  if (!phen) return null;
                  const isAddedBySim = simEvaluation.addedPhenomenaIds.includes(pid);
                  return (
                    <span
                      key={pid}
                      className={`px-1.5 py-0.2 rounded text-[9.5px] font-mono ${
                        isAddedBySim
                          ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 font-semibold'
                          : 'bg-slate-900 border border-slate-800 text-slate-300'
                      }`}
                    >
                      {isAddedBySim ? '+ ' : ''}
                      {phen.name.split('(')[0].trim()}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Live Hypothesis Shift Tracker across the Top 4 Conditions */}
            <div className="lg:col-span-7 space-y-1.5 border-t lg:border-t-0 lg:border-l border-slate-800 pt-2 lg:pt-0 lg:pl-3">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-slate-200 uppercase">
                  Differentialdiagnostisches Hypothesen-Ranking (Iteratives Heatmap-Gewicht):
                </span>
                <span className="text-emerald-300 tabular-nums">
                  {simEvaluation.answeredStepsCount === 0
                    ? 'A-priori Aufnahmebefund'
                    : `Nach ${simEvaluation.answeredStepsCount} Anamnese-/Diagnostik-Schritten`}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {simEvaluation.hypothesisShifts.slice(0, 4).map((hyp) => {
                  const isPositiveShift = hyp.scoreDeltaPct > 0;
                  const isNegativeShift = hyp.scoreDeltaPct < 0;
                  return (
                    <div
                      key={hyp.condition.id}
                      className="p-2 rounded-lg bg-[#0A1020] border border-slate-800/90 space-y-1"
                    >
                      <div className="flex items-center justify-between gap-1 font-mono text-[10px]">
                        <span className="inline-flex items-center gap-1">
                          <span
                            className="font-bold px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700"
                            style={{ color: hyp.categoryColor }}
                          >
                            #{hyp.simulatedRank} {hyp.categoryShortCode}
                          </span>
                          {hyp.rankDelta > 0 && (
                            <span className="inline-flex items-center gap-0.5 text-emerald-400 font-bold">
                              <TrendingUp className="w-3 h-3" />+{hyp.rankDelta}
                            </span>
                          )}
                          {hyp.rankDelta < 0 && (
                            <span className="inline-flex items-center gap-0.5 text-rose-400 font-bold">
                              <TrendingDown className="w-3 h-3" />
                              {hyp.rankDelta}
                            </span>
                          )}
                        </span>

                        <span className="tabular-nums font-semibold text-slate-300">
                          Bayes ×{hyp.cumulativeMultiplier.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between gap-1">
                        <button
                          type="button"
                          onClick={() => onInspectEntity(hyp.condition.id, 'condition')}
                          className="text-xs font-bold text-white hover:text-sky-300 hover:underline truncate text-left"
                        >
                          {hyp.shortName}
                        </button>
                        <div className="flex items-baseline gap-1 font-mono tabular-nums shrink-0">
                          <span className="text-xs font-extrabold text-white">
                            {hyp.simulatedScorePct.toFixed(1)}%
                          </span>
                          {hyp.scoreDeltaPct !== 0 && (
                            <span
                              className={`text-[10px] font-bold ${
                                isPositiveShift
                                  ? 'text-emerald-400'
                                  : isNegativeShift
                                  ? 'text-rose-400'
                                  : 'text-slate-400'
                              }`}
                            >
                              ({isPositiveShift ? '+' : ''}
                              {hyp.scoreDeltaPct.toFixed(1)}%)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${Math.min(100, hyp.simulatedScorePct)}%`,
                            backgroundColor: hyp.categoryColor
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3-Step Interactive Follow-Up Questions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {activeSimProfile.steps.map((step) => {
              const selectedOptId = selectedOptionByStepId[step.id];
              const selectedOpt = step.options.find((o) => o.id === selectedOptId);

              return (
                <div
                  key={step.id}
                  data-testid={`simulation-step-${step.stepNumber}`}
                  className={`p-3 rounded-xl border flex flex-col justify-between gap-2.5 transition-all ${
                    selectedOpt
                      ? 'bg-[#081523]/95 border-emerald-500/60 shadow-lg'
                      : 'bg-[#060913]/95 border-slate-800'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1 font-mono text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-sky-300 font-bold">
                        {step.categoryBadge}
                      </span>
                      {selectedOpt ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Befund erhoben</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">Bitte Befund wählen</span>
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {step.question}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-snug">{step.clinicalPrompt}</p>

                    <div className="space-y-1.5 pt-1">
                      {step.options.map((opt) => {
                        const isChosen = selectedOptId === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleSelectSimulationOption(step.id, opt.id)}
                            aria-pressed={isChosen}
                            className={`w-full p-2 rounded-lg border text-left transition-all space-y-1 ${
                              isChosen
                                ? 'bg-emerald-950/60 border-emerald-400 text-white ring-1 ring-emerald-400'
                                : 'bg-[#0B101E] hover:bg-slate-800/80 border-slate-800 text-slate-200 hover:border-slate-600'
                            }`}
                          >
                            <div className="text-xs font-semibold leading-snug">{opt.label}</div>

                            {/* Badges showing added phenomena & top multiplier shifts */}
                            <div className="flex flex-wrap items-center gap-1 pt-0.5 font-mono text-[9.5px]">
                              {opt.addedPhenomenaIds.map((pid) => {
                                const pName =
                                  ALL_PHENOMENA.find((p) => p.id === pid)
                                    ?.name.split('(')[0]
                                    .trim() ?? pid;
                                return (
                                  <span
                                    key={pid}
                                    className="px-1.5 py-0.2 rounded bg-sky-500/20 border border-sky-500/40 text-sky-300"
                                  >
                                    + Phänomen: {pName}
                                  </span>
                                );
                              })}
                              {Object.entries(opt.conditionMultipliers)
                                .slice(0, 2)
                                .map(([cid, mult]) => {
                                  const condEntity = CONDITIONS_DATA.find((c) => c.id === cid);
                                  const cShort = condEntity
                                    ? formatConditionShortName(condEntity.name)
                                    : cid;
                                  return (
                                    <span
                                      key={cid}
                                      className={`px-1.5 py-0.2 rounded border tabular-nums ${
                                        mult >= 1
                                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                                          : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                                      }`}
                                    >
                                      {cShort} ×{mult.toFixed(2)}
                                    </span>
                                  );
                                })}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Clinical Rationale Feedback Box when answered */}
                  {selectedOpt && (
                    <div
                      data-testid={`simulation-rationale-${step.stepNumber}`}
                      className="p-2.5 rounded-lg bg-[#050B14] border border-emerald-500/40 text-[11px] text-slate-200 space-y-1"
                    >
                      <div className="font-mono font-bold text-emerald-300 text-[10px] uppercase">
                        Klinische Auswirkung auf Heatmap:
                      </div>
                      <p className="leading-snug text-slate-300">{selectedOpt.clinicalRationale}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* WEIGHTED ASSOCIATION HEATMAP: SELECTED PHENOMENA × CLINICAL CONDITIONS */}
      <section
        aria-label="Gewichtete Assoziations-Heatmap zwischen Phänomenen und klinischen Störungsbildern"
        data-testid="combinator-association-heatmap-section"
        className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400 shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-white">
                Gewichtete Assoziations-Heatmap (Phänomene × Klinische Störungsbilder)
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold text-rose-300 bg-rose-950/50 border border-rose-500/30 rounded">
                {heatmapMatrix.activeAssociationsCount} aktive Kopplungen · Dichte {heatmapMatrix.matrixDensityPct}%
              </span>
              {isSimulationActive && simEvaluation.answeredStepsCount > 0 && (
                <span
                  data-testid="heatmap-simulation-active-badge"
                  className="px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-200 bg-emerald-950/70 border border-emerald-400/50 rounded"
                >
                  Simulations-Gewichtung aktiv ({simEvaluation.answeredStepsCount}/
                  {simEvaluation.totalStepsCount} Befunde · #1{' '}
                  {simEvaluation.leadingHypothesis?.shortName})
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Thermische Intensitätsmatrix der gewichteten Kopplungsstärke zwischen den{' '}
              {heatmapMatrix.totalSelectedPhenomena} ausgewählten Phänomenen (Zeilen) und den{' '}
              {heatmapMatrix.columns.length} führenden Störungsbildern (Spalten). Klicken Sie auf eine
              Zelle für die exakte Gewichtungsformel und klinische Einordnung.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Weighting Metric Mode Switch */}
            <div
              role="group"
              aria-label="Heatmap-Gewichtungsmetrik"
              className="inline-flex items-center gap-1 p-1 bg-[#070A12] border border-slate-800 rounded-lg"
            >
              <button
                type="button"
                onClick={() => setHeatmapWeightMode('weighted')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  heatmapWeightMode === 'weighted'
                    ? 'bg-rose-500 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Gewichteter Index (%)
              </button>
              <button
                type="button"
                onClick={() => setHeatmapWeightMode('specificity')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  heatmapWeightMode === 'specificity'
                    ? 'bg-rose-500 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Spezifität (%)
              </button>
              <button
                type="button"
                onClick={() => setHeatmapWeightMode('prevalence')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  heatmapWeightMode === 'prevalence'
                    ? 'bg-rose-500 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Prävalenz (%)
              </button>
            </div>

            {heatmapMatrix.totalMatchedConditions > 7 && (
              <button
                type="button"
                onClick={() => setShowAllHeatmapColumns((prev) => !prev)}
                className="px-2.5 py-1 text-xs font-mono text-slate-200 bg-[#070A12] hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                {showAllHeatmapColumns
                  ? `Kompaktansicht (Top 7)`
                  : `Alle ${heatmapMatrix.totalMatchedConditions} Störungsbilder zeigen`}
              </button>
            )}
          </div>
        </div>

        {/* Thermal Intensity Color Scale Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] bg-[#070A12] border border-slate-800/90 rounded-lg px-3 py-1">
          <span className="font-mono font-semibold text-slate-300">
            THERMISCHE ASSOZIATIONS-SKALA:
          </span>
          <div className="flex flex-wrap items-center gap-2 font-mono tabular-nums">
            {(['none', 'low', 'moderate', 'high', 'critical'] as HeatmapIntensityTier[]).map(
              (tier) => {
                const st = HEATMAP_TIER_STYLE[tier];
                return (
                  <span
                    key={tier}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px]"
                    style={{
                      background: st.bg,
                      borderColor: st.border,
                      color: st.text
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: st.barColor }}
                    />
                    <strong>{st.label}:</strong>
                    <span>{st.rangeLabel}</span>
                  </span>
                );
              }
            )}
          </div>
        </div>

        {heatmapMatrix.rows.length === 0 ? (
          <div className="p-6 text-center bg-[#070A12] border border-slate-800/80 rounded-xl space-y-3">
            <p className="text-sm text-slate-300">
              Wählen Sie mindestens ein Phänomen aus, um die gewichtete Assoziations-Heatmap zu berechnen.
            </p>
            <button
              type="button"
              onClick={() => onSetPreset(presets[1].ids)}
              className="px-4 py-2 text-xs font-semibold bg-rose-500 hover:bg-rose-400 text-white rounded-lg transition-colors"
            >
              Beispiel-Profil B (Psychose vs. NMDA-Enzephalitis) laden
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-[#070A12]">
              <table
                data-testid="condition-association-heatmap"
                className={`w-full ${
                  showAllHeatmapColumns ? 'min-w-[1180px]' : 'lg:table-fixed min-w-[880px]'
                } border-collapse text-left`}
              >
                <thead>
                  <tr className="border-b border-slate-800 bg-[#0B101E]">
                    <th
                      scope="col"
                      className="p-2 text-xs font-mono font-semibold text-slate-300 w-[195px] border-r border-slate-800"
                    >
                      Phänomen \ Störungsbild ({heatmapMatrix.columns.length})
                    </th>
                    {heatmapMatrix.columns.map((col, colIdx) => (
                      <th
                        key={col.condition.id}
                        scope="col"
                        className="p-1.5 text-xs border-r border-slate-800 align-top bg-[#0B101E] hover:bg-slate-900/70 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center justify-between gap-1 font-mono text-[10px]">
                            <span
                              className="font-bold px-1.5 py-0.2 rounded bg-slate-900/90 border border-slate-800"
                              style={{ color: col.categoryColor }}
                            >
                              #{colIdx + 1} {col.categoryShortCode}
                            </span>
                            {col.simulationDeltaPct !== 0 ? (
                              <span
                                className={`px-1 py-0.2 rounded font-bold tabular-nums ${
                                  col.simulationDeltaPct > 0
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                }`}
                              >
                                {col.simulationDeltaPct > 0 ? '+' : ''}
                                {col.simulationDeltaPct}% Sim
                              </span>
                            ) : (
                              <span className="text-slate-400 tabular-nums truncate">
                                {col.condition.icd11Code}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => onInspectEntity(col.condition.id, 'condition')}
                            className="text-[11px] font-bold text-white hover:text-sky-300 hover:underline text-left truncate block w-full"
                            title={`${col.condition.name} (ICD-11 ${col.condition.icd11Code})`}
                          >
                            {col.shortName}
                          </button>
                          <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-400 tabular-nums">
                            <span>
                              Deckung {col.matchedCount}/{col.totalSelected}
                            </span>
                            <span className="text-slate-200 font-semibold">
                              {col.simulationMultiplier !== 1
                                ? `×${col.simulationMultiplier.toFixed(2)}`
                                : `${col.coveragePct}%`}
                            </span>
                          </div>
                        </div>
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="p-2 text-xs font-mono font-semibold text-slate-300 w-[116px] bg-[#090E1B]"
                    >
                      <div>Phänomen-</div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        Gewicht (Ø / Max)
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/90">
                  {heatmapMatrix.rows.map((row) => {
                    const isAddedInSimulation =
                      isSimulationActive &&
                      simEvaluation.addedPhenomenaIds.includes(row.phenomenon.id);

                    return (
                      <tr
                        key={row.phenomenon.id}
                        className="hover:bg-[#0B1222]/50 transition-colors"
                      >
                        {/* Y-Axis Phenomenon Row Header */}
                        <th
                          scope="row"
                          className="p-2 border-r border-slate-800 bg-[#080C18]/95 font-normal align-middle"
                        >
                          <div className="flex items-start justify-between gap-1.5">
                            <div className="min-w-0 space-y-0.5">
                              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 truncate">
                                <span
                                  className="font-semibold"
                                  style={{ color: row.domainColor }}
                                >
                                  {row.domainShortName}
                                </span>
                                <span>·</span>
                                <span>{row.phenomenon.amdpCode}</span>
                                {isAddedInSimulation && (
                                  <span className="px-1 py-0.2 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-[9px]">
                                    NEU
                                  </span>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  onInspectEntity(row.phenomenon.id, 'phenomenon')
                                }
                                className="text-xs font-semibold text-white hover:text-sky-300 hover:underline text-left truncate block w-full"
                                title={row.phenomenon.name}
                              >
                                {row.shortName}
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => onTogglePhenomenon(row.phenomenon.id)}
                              aria-label={`${row.phenomenon.name} aus Heatmap entfernen`}
                              className="p-0.5 text-slate-500 hover:text-rose-400 rounded transition-colors shrink-0"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </th>

                        {/* Weighted Heatmap Cells */}
                        {row.cells.map((cell) => {
                          const cellKey = `${cell.phenomenonId}::${cell.conditionId}`;
                          const isSelectedCell =
                            activeHeatmapCell &&
                            activeHeatmapCell.phenomenonId === cell.phenomenonId &&
                            activeHeatmapCell.conditionId === cell.conditionId;
                          const displayPct = getCellDisplayValue(cell);
                          const displayTier = getCellDisplayTier(cell);
                          const styleMeta = HEATMAP_TIER_STYLE[displayTier];

                          if (!cell.hasAssociation) {
                            return (
                              <td
                                key={cell.conditionId}
                                className="p-1 border-r border-slate-800/70 text-center align-middle"
                              >
                                <div
                                  className="h-12 rounded-lg flex flex-col items-center justify-center border border-slate-800/40 bg-[#060913]/60 font-mono text-[10px] text-slate-600 tabular-nums"
                                  title={`${row.shortName} × ${cell.conditionName}: Keine direkte diagnostische Kopplung`}
                                >
                                  <span>—</span>
                                  <span className="text-[9px]">0 %</span>
                                </div>
                              </td>
                            );
                          }

                          return (
                            <td
                              key={cell.conditionId}
                              className="p-1 border-r border-slate-800/70 align-middle"
                            >
                              <button
                                type="button"
                                onClick={() => setInspectedCellKey(cellKey)}
                                aria-label={`${row.shortName} und ${cell.conditionName}: Gewichtete Assoziation ${displayPct} Prozent (${cell.prevalenceLabel})`}
                                style={{
                                  background: styleMeta.bg,
                                  borderColor: isSelectedCell ? '#38BDF8' : styleMeta.border
                                }}
                                className={`w-full h-12 px-2 py-1 rounded-lg border text-left transition-all flex flex-col justify-between ${
                                  isSelectedCell
                                    ? 'ring-2 ring-sky-400 shadow-lg scale-[1.01]'
                                    : 'hover:brightness-110'
                                }`}
                              >
                                <div className="flex items-baseline justify-between gap-1 font-mono tabular-nums w-full">
                                  <span
                                    className="text-xs sm:text-sm font-extrabold tracking-tight"
                                    style={{ color: styleMeta.text }}
                                  >
                                    {displayPct}%
                                  </span>
                                  {cell.simulationDeltaPct !== 0 &&
                                  heatmapWeightMode === 'weighted' ? (
                                    <span
                                      className={`text-[9px] font-bold px-1 py-0.2 rounded tabular-nums ${
                                        cell.simulationDeltaPct > 0
                                          ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-400/50'
                                          : 'bg-rose-950/90 text-rose-300 border border-rose-400/50'
                                      }`}
                                    >
                                      {cell.simulationDeltaPct > 0 ? '+' : ''}
                                      {cell.simulationDeltaPct}%
                                    </span>
                                  ) : (
                                    <span
                                      className="text-[9px] font-semibold px-1 py-0.2 rounded truncate"
                                      style={{
                                        backgroundColor: styleMeta.badgeBg,
                                        color: styleMeta.subText
                                      }}
                                    >
                                      {cell.prevalenceShortLabel}
                                    </span>
                                  )}
                                </div>

                                {/* Weighted intensity bar inside cell */}
                                <div className="w-full h-1 bg-slate-950/60 rounded-full overflow-hidden my-0.5">
                                  <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{
                                      width: `${displayPct}%`,
                                      backgroundColor: styleMeta.barColor
                                    }}
                                  />
                                </div>

                                <div
                                  className="flex items-center justify-between w-full font-mono text-[9px] tabular-nums"
                                  style={{ color: styleMeta.subText }}
                                >
                                  <span>Spez.{cell.specificityPct}%</span>
                                  <span>
                                    {cell.simulationMultiplier !== 1
                                      ? `Sim ×${cell.simulationMultiplier.toFixed(2)}`
                                      : `×${cell.prevalenceWeight.toFixed(2)}`}
                                  </span>
                                </div>
                              </button>
                            </td>
                          );
                        })}

                        {/* Row Marginal Summary Cell */}
                        <td className="p-2.5 bg-[#090E1B] font-mono text-xs tabular-nums align-middle">
                          <div className="flex items-baseline justify-between gap-1">
                            <span className="font-bold text-white">
                              Ø {row.meanWeightedAssociationPct.toFixed(0)}%
                            </span>
                            <span className="text-[10px] text-rose-300 font-semibold">
                              Max {row.peakWeightedAssociationPct}%
                            </span>
                          </div>
                          <div className="text-[9.5px] text-slate-400 truncate mt-0.5">
                            {row.matchedConditionsCount}/{heatmapMatrix.columns.length} gekoppelt
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                {/* Bottom Marginal Summary Row: Cumulative Condition Association Weights */}
                <tfoot>
                  <tr className="border-t-2 border-slate-700 bg-[#0B101E] font-mono text-xs tabular-nums">
                    <th
                      scope="row"
                      className="p-2.5 border-r border-slate-800 text-left text-slate-200"
                    >
                      <div className="font-bold text-white text-xs">
                        Störungs-Gesamtgewicht
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        Ø Kopplung & Diff.-Index
                      </div>
                    </th>
                    {heatmapMatrix.columns.map((col) => (
                      <td
                        key={col.condition.id}
                        className="p-2 border-r border-slate-800 align-top space-y-0.5"
                      >
                        <div className="flex items-baseline justify-between gap-1">
                          <span
                            className="text-xs font-bold"
                            style={{ color: col.categoryColor }}
                          >
                            Ø {col.meanWeightedAssociationPct.toFixed(0)}%
                          </span>
                          <span className="text-[10px] text-slate-300">
                            Idx {col.normalizedRankScore.toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${Math.min(100, col.meanWeightedAssociationPct)}%`,
                              backgroundColor: col.categoryColor
                            }}
                          />
                        </div>
                        <div className="text-[9.5px] text-slate-400">
                          Σ {col.cumulativeWeightedScore} Pkt. · Max {col.peakWeightedAssociationPct}%
                        </div>
                      </td>
                    ))}
                    <td className="p-2.5 bg-[#090E1B] align-top font-mono text-[10px] text-slate-300">
                      <div className="font-bold text-rose-300">
                        Peak {heatmapMatrix.peakCell?.weightedAssociationPct ?? 0}%
                      </div>
                      <div className="text-slate-400">
                        {heatmapMatrix.activeAssociationsCount}/{heatmapMatrix.totalCellsCount} Zellen
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Interactive Heatmap Cell Inspector Banner */}
            {activeHeatmapCell && (
              <div
                data-testid="heatmap-cell-inspector"
                className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#070B16] border border-sky-500/40 shadow-inner"
              >
                <div className="space-y-1 max-w-4xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="inline-flex items-center gap-1 font-bold text-sky-300">
                      <Info className="w-3.5 h-3.5" />
                      <span>Zellen-Fokus:</span>
                    </span>
                    <strong className="text-white">{activeHeatmapCell.phenomenonName}</strong>
                    <span className="text-slate-500">×</span>
                    <strong style={{ color: activeHeatmapCell.categoryColor }}>
                      {activeHeatmapCell.conditionName} (ICD-11 {activeHeatmapCell.icd11Code})
                    </strong>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-200 font-bold tabular-nums">
                      Gewichtete Assoziation: {activeHeatmapCell.weightedAssociationPct}%
                      {activeHeatmapCell.simulationDeltaPct !== 0 &&
                        ` (${activeHeatmapCell.simulationDeltaPct > 0 ? '+' : ''}${
                          activeHeatmapCell.simulationDeltaPct
                        }% durch Simulation)`}
                    </span>
                    <span className="text-slate-400 tabular-nums">
                      [Spezifität {activeHeatmapCell.specificityPct}% × Faktor{' '}
                      {activeHeatmapCell.prevalenceLabel} ({activeHeatmapCell.prevalenceWeight}x)
                      {activeHeatmapCell.simulationMultiplier !== 1
                        ? ` × Bayes ${activeHeatmapCell.simulationMultiplier.toFixed(2)}x`
                        : ''}{' '}
                      · Prävalenz ~{activeHeatmapCell.estimatedPrevalencePct}%]
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong className="text-slate-200">Klinische Begründung:</strong>{' '}
                    {activeHeatmapCell.clinicalNote}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      onInspectEntity(activeHeatmapCell.phenomenonId, 'phenomenon')
                    }
                    className="px-2.5 py-1.5 text-xs font-mono font-medium text-slate-200 bg-[#101829] hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
                  >
                    Phänomen-Dossier →
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onInspectEntity(activeHeatmapCell.conditionId, 'condition')
                    }
                    className="px-2.5 py-1.5 text-xs font-mono font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors"
                  >
                    Störungsbild-Dossier →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* SIDE-BY-SIDE PREVALENCE COMPARISON TABLE ACROSS DIAGNOSTIC CATEGORIES */}
      <section
        aria-label="Prävalenz-Vergleichstabelle über alle diagnostischen Kategorien"
        data-testid="combinator-prevalence-table-section"
        className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-4 space-y-3 shadow-xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <Table2 className="w-4 h-4 text-sky-400 shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-white">
                Prävalenzraten-Vergleichstabelle nach Diagnose-Kategorien (Side-by-Side)
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Direkter Gegenüberstellungsvergleich der Prävalenzraten (Spitzen- & Mittelwert in %,
              klinische Prävalenzstufe und Leitdiagnosen) für alle {prevalenceMatrix.totalSelectedPhenomena} ausgewählten Phänomene.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Segmented Mode Control */}
            <div
              role="group"
              aria-label="Tabellen-Ansichtsmodus"
              className="inline-flex items-center gap-1 p-1 bg-[#070A12] border border-slate-800 rounded-lg"
            >
              <button
                type="button"
                onClick={() => setTableMetricMode('prevalence')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  tableMetricMode === 'prevalence'
                    ? 'bg-sky-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Prävalenzraten & Stufen (%)
              </button>
              <button
                type="button"
                onClick={() => setTableMetricMode('conditions')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  tableMetricMode === 'conditions'
                    ? 'bg-sky-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Diagnosen-Aufschlüsselung
              </button>
            </div>

            {focusedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setFocusedCategory('all')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-amber-300 bg-amber-950/40 border border-amber-500/40 rounded-lg hover:bg-amber-900/50 transition-colors whitespace-nowrap shrink-0"
              >
                <Filter className="w-3 h-3" />
                <span>Filter: {CONDITION_CATEGORY_META[focusedCategory].shortCode} ×</span>
              </button>
            )}
          </div>
        </div>

        {/* Clinical Prevalence Scale Reference Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 bg-[#070A12] border border-slate-800/90 rounded-lg px-3 py-1.5">
          <span className="font-mono font-semibold text-slate-300">
            PRÄVALENZ-SKALA (ICD-11 / AMDP):
          </span>
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 font-mono tabular-nums">
            {(
              Object.entries(PREVALENCE_LEVEL_META) as Array<
                [keyof typeof PREVALENCE_LEVEL_META, (typeof PREVALENCE_LEVEL_META)[keyof typeof PREVALENCE_LEVEL_META]]
              >
            ).map(([key, meta]) => (
              <span key={key} className="inline-flex items-center gap-1">
                <strong className="text-slate-200">{meta.label}:</strong>
                <span className="text-sky-400">{meta.rateBand}</span>
              </span>
            ))}
          </div>
        </div>

        {prevalenceMatrix.rows.length === 0 ? (
          <div className="p-6 text-center bg-[#070A12] border border-slate-800/80 rounded-xl space-y-3">
            <p className="text-sm text-slate-300">
              Keine Phänomene für den Kategorie-Prävalenzvergleich ausgewählt.
            </p>
            <button
              type="button"
              onClick={() => onSetPreset(presets[0].ids)}
              className="px-4 py-2 text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg transition-colors"
            >
              Beispiel-Profil A (ADHS / ASS Fokus) laden
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-800 rounded-xl bg-[#070A12]">
            <table
              data-testid="prevalence-comparison-table"
              className="w-full lg:table-fixed border-collapse text-left min-w-[860px]"
            >
              <thead>
                <tr className="border-b border-slate-800 bg-[#0B101E]">
                  <th
                    scope="col"
                    className="p-2.5 text-xs font-mono font-semibold text-slate-300 w-[210px] border-r border-slate-800"
                  >
                    Ausgewähltes Phänomen ({prevalenceMatrix.rows.length})
                  </th>
                  {prevalenceMatrix.categories.map((cat) => {
                    const isFocused = focusedCategory === cat.category;
                    return (
                      <th
                        key={cat.category}
                        scope="col"
                        className={`p-2.5 text-xs border-r border-slate-800 last:border-r-0 transition-colors ${
                          isFocused ? 'bg-slate-800/70' : 'hover:bg-slate-900/60'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setFocusedCategory((prev) =>
                              prev === cat.category ? 'all' : cat.category
                            )
                          }
                          className="w-full text-left space-y-1 group"
                          title={`Klicken, um Ursachen-Liste nach ${cat.label} zu filtern`}
                        >
                          <div className="flex items-center justify-between gap-1 font-mono">
                            <span
                              className="font-bold text-[11px] tracking-wide"
                              style={{ color: cat.color }}
                            >
                              {cat.shortCode}
                            </span>
                            <span className="text-[10px] text-slate-400 tabular-nums">
                              {cat.coveredPhenomenaCount}/{cat.totalSelectedPhenomena} Phän.
                            </span>
                          </div>
                          <div className="text-[10.5px] font-medium text-slate-200 truncate">
                            {cat.label.split('(')[0].split('&')[0].trim()}
                          </div>
                          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full transition-all duration-300"
                              style={{
                                width: `${cat.coverageRatePct}%`,
                                backgroundColor: cat.color
                              }}
                            />
                          </div>
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/90">
                {prevalenceMatrix.rows.map((row) => (
                  <tr
                    key={row.phenomenon.id}
                    className="hover:bg-[#0B1222]/70 transition-colors align-top"
                  >
                    {/* Phenomenon Row Header */}
                    <th
                      scope="row"
                      className="p-2.5 border-r border-slate-800 bg-[#080C18]/90 font-normal"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 truncate">
                            <span
                              className="font-semibold"
                              style={{ color: row.domainColor }}
                            >
                              {row.domainShortName}
                            </span>
                            <span>·</span>
                            <span>{row.phenomenon.amdpCode}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => onInspectEntity(row.phenomenon.id, 'phenomenon')}
                            className="text-xs font-semibold text-white hover:text-sky-300 hover:underline text-left line-clamp-1"
                          >
                            {row.phenomenon.name.split('(')[0].trim()}
                          </button>
                          <div className="text-[10px] font-mono text-slate-400 tabular-nums">
                            {row.activeCategoriesCount}/6 Kat. · Max{' '}
                            <strong className="text-slate-200">
                              {row.highestPrevalenceRatePct}%
                            </strong>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onTogglePhenomenon(row.phenomenon.id)}
                          aria-label={`${row.phenomenon.name} aus Vergleich entfernen`}
                          title="Aus Auswahl entfernen"
                          className="p-0.5 text-slate-500 hover:text-rose-400 rounded transition-colors shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </th>

                    {/* 6 Side-by-Side Diagnostic Category Cells */}
                    {prevalenceMatrix.categories.map((cat) => {
                      const cell = row.cellsByCategory[cat.category];
                      const isPeakCategory =
                        cell.hasMatch && row.highestCategory === cat.category;
                      const isFocused = focusedCategory === cat.category;

                      if (!cell.hasMatch) {
                        return (
                          <td
                            key={cat.category}
                            className={`p-2.5 border-r border-slate-800/80 last:border-r-0 text-center align-middle ${
                              isFocused ? 'bg-slate-900/40' : ''
                            }`}
                          >
                            <span className="font-mono text-[11px] text-slate-600 tabular-nums">
                              — (0 %)
                            </span>
                          </td>
                        );
                      }

                      return (
                        <td
                          key={cat.category}
                          className={`p-2.5 border-r border-slate-800/80 last:border-r-0 transition-colors ${
                            isPeakCategory
                              ? 'bg-[#0E172C]/90'
                              : isFocused
                              ? 'bg-slate-900/50'
                              : ''
                          }`}
                        >
                          {tableMetricMode === 'prevalence' ? (
                            <div className="space-y-1">
                              {/* Top Row: Peak Calibrated Rate % & Dominant Tier */}
                              <div className="flex items-baseline justify-between gap-1 font-mono tabular-nums">
                                <span
                                  className="text-xs sm:text-sm font-bold text-white"
                                  style={
                                    isPeakCategory ? { color: cat.color } : undefined
                                  }
                                >
                                  {cell.peakPrevalenceRatePct}%
                                </span>
                                <span className="text-[9.5px] text-slate-400">
                                  {cell.dominantRateBand}
                                </span>
                              </div>

                              {/* Quantitative Prevalence Bar */}
                              <div className="w-full h-1.5 bg-slate-800/90 rounded-full overflow-hidden">
                                <div
                                  className="h-full transition-all duration-300"
                                  style={{
                                    width: `${cell.peakPrevalenceRatePct}%`,
                                    backgroundColor: cat.color
                                  }}
                                />
                              </div>

                              {/* Prevalence Classification Label & Mean/Count */}
                              <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-slate-300 tabular-nums">
                                <span className="font-semibold truncate">
                                  {cell.dominantPrevalenceLabel}
                                </span>
                                {cell.conditionCount > 1 && (
                                  <span className="text-slate-400 text-[9.5px] shrink-0">
                                    Ø {cell.meanPrevalenceRatePct}% ({cell.conditionCount})
                                  </span>
                                )}
                              </div>

                              {/* Top Condition Drill-Down Link */}
                              <button
                                type="button"
                                onClick={() =>
                                  onInspectEntity(
                                    cell.matchedConditions[0].conditionId,
                                    'condition'
                                  )
                                }
                                className="block w-full text-left text-[10px] text-sky-400 hover:text-sky-300 hover:underline truncate"
                                title={`${cell.matchedConditions[0].conditionName} (${cell.matchedConditions[0].clinicalNote})`}
                              >
                                ↳ {cell.matchedConditions[0].conditionName}
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {cell.matchedConditions.map((mc) => (
                                <div
                                  key={mc.conditionId}
                                  className="p-1.5 rounded bg-[#080D1A] border border-slate-800/90 space-y-0.5"
                                >
                                  <div className="flex items-center justify-between gap-1 font-mono text-[9.5px] tabular-nums">
                                    <span
                                      className="font-semibold truncate"
                                      style={{ color: cat.color }}
                                    >
                                      {mc.estimatedRatePct}% · {mc.prevalenceLabel}
                                    </span>
                                    <span className="text-slate-400 shrink-0">
                                      {mc.specificityPct}%
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      onInspectEntity(mc.conditionId, 'condition')
                                    }
                                    className="text-[10.5px] font-medium text-slate-100 hover:text-sky-300 hover:underline text-left block truncate w-full"
                                  >
                                    {mc.conditionName}
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>

              {/* Aggregated Category Prevalence Summary Footer */}
              <tfoot>
                <tr className="border-t-2 border-slate-700 bg-[#0B101E] font-mono text-xs tabular-nums">
                  <th
                    scope="row"
                    className="p-2.5 border-r border-slate-800 text-left text-slate-200"
                  >
                    <div className="font-bold text-white text-xs">
                      Kategorie-Gesamtprofil
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal">
                      Ø Prävalenz & Phänomen-Deckung
                    </div>
                  </th>
                  {prevalenceMatrix.categories.map((cat) => (
                    <td
                      key={cat.category}
                      className="p-2.5 border-r border-slate-800 last:border-r-0 align-top space-y-0.5"
                    >
                      <div className="flex items-baseline justify-between gap-1">
                        <span
                          className="text-xs sm:text-sm font-bold"
                          style={{ color: cat.color }}
                        >
                          Ø {cat.meanPrevalenceRatePct.toFixed(1)}%
                        </span>
                        <span className="text-[10px] text-slate-300">
                          {cat.coverageRatePct.toFixed(0)}% Deck.
                        </span>
                      </div>
                      <div className="text-[9.5px] text-slate-400">
                        {cat.distinctConditionsCount} Ursachen · Max {cat.peakPrevalenceRatePct}%
                      </div>
                      {cat.topConditionId && cat.topConditionName && (
                        <button
                          type="button"
                          onClick={() =>
                            onInspectEntity(cat.topConditionId!, 'condition')
                          }
                          className="text-[10px] text-sky-400 hover:text-sky-300 hover:underline truncate block w-full text-left"
                        >
                          Top: {cat.topConditionName}
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </section>

      {/* Split Layout: Left Phenomena Selector, Right Ranked Etiological Spectrum */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Phenomena Checklist by Domain */}
        <div className="lg:col-span-6 bg-[#0B0F1A] border border-slate-800 rounded-xl p-5 space-y-4 max-h-[780px] overflow-y-auto shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">
              1. Phänomene auswählen ({selectedPhenomenaIds.length} von {ALL_PHENOMENA.length} aktiv)
            </h3>
            <span className="text-xs font-mono text-slate-400">Nach AMDP & RDoC Domänen</span>
          </div>

          <div className="space-y-5">
            {PHENOMENON_DOMAINS.map((domain) => {
              const domainPhenomena = ALL_PHENOMENA.filter((p) => p.domainId === domain.id);
              return (
                <div key={domain.id} className="space-y-2">
                  <div className="text-xs font-mono font-semibold" style={{ color: domain.color }}>
                    {domain.code} · {domain.name}
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {domainPhenomena.map((p) => {
                      const isChecked = selectedPhenomenaIds.includes(p.id);
                      return (
                        <div
                          key={p.id}
                          className={`flex items-center justify-between gap-3 p-2.5 rounded-lg border transition-colors ${
                            isChecked
                              ? 'bg-sky-950/40 border-sky-500/80'
                              : 'bg-[#070A12]/90 border-slate-800/90 hover:border-slate-700'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => onTogglePhenomenon(p.id)}
                            className="flex items-center gap-3 text-left flex-1"
                          >
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-sky-400 shrink-0" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-500 shrink-0" />
                            )}
                            <PhenomenonArtwork
                              phenomenonId={p.id}
                              domainId={p.domainId}
                              compact
                              className="w-16 h-10 rounded shrink-0"
                            />
                            <div>
                              <div className="text-xs font-semibold text-slate-100">
                                {p.name}
                              </div>
                              <div className="text-[11px] font-mono text-slate-400">
                                {p.amdpCode} · {p.conditions.length} zugeordnete Ursachen
                              </div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => onInspectEntity(p.id, 'phenomenon')}
                            className="px-2 py-1 text-[11px] font-mono text-sky-400 hover:text-sky-300 hover:underline shrink-0"
                          >
                            Dossier →
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Ranked Conditions across all 6 categories */}
        <div className="lg:col-span-6 bg-[#0B0F1A] border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">
              2. Berechnetes Ursachen- & Störungsspektrum ({filteredRankedConditions.length} Treffer)
            </h3>
            <span className="text-xs font-mono text-slate-400 tabular-nums">
              {focusedCategory === 'all'
                ? 'Sortiert nach Deckung & Spezifität'
                : `Gefiltert nach ${CONDITION_CATEGORY_META[focusedCategory].shortCode}`}
            </span>
          </div>

          {filteredRankedConditions.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              Wählen Sie links mindestens ein Phänomen oder oben ein klinisches Beispiel-Profil aus,
              um die transdiagnostische Zuordnung zu berechnen.
            </div>
          ) : (
            <div className="space-y-3.5 max-h-[720px] overflow-y-auto pr-1">
              {filteredRankedConditions.map((item, idx) => {
                const catMeta = CONDITION_CATEGORY_META[item.condition.category];
                return (
                  <div
                    key={item.condition.id}
                    className="p-4 rounded-xl border border-slate-800 bg-[#070A12]/90 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400">
                          <span className="font-bold text-white">#{idx + 1}</span>
                          <span>·</span>
                          <span style={{ color: catMeta.color }} className="font-semibold">
                            {catMeta.shortCode}: {item.condition.categoryLabel}
                          </span>
                          <span>·</span>
                          <span>ICD-11 {item.condition.icd11Code}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onInspectEntity(item.condition.id, 'condition')}
                          className="text-left text-base font-bold text-sky-400 hover:text-sky-300 hover:underline mt-0.5 flex items-center gap-1.5"
                        >
                          <span>{item.condition.name}</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </button>
                      </div>

                      <div className="text-right font-mono tabular-nums shrink-0">
                        <div className="text-lg font-bold text-white">
                          {item.matchedPhenomenaCount} / {item.totalPhenomenaSelected}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Index: {item.normalizedScore.toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, item.normalizedScore)}%`,
                          backgroundColor: catMeta.color
                        }}
                      />
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {item.matchedDetails.map((m) => {
                        const phen = ALL_PHENOMENA.find((p) => p.id === m.phenomenonId);
                        const dom = phen ? getDomainById(phen.domainId) : undefined;
                        return (
                          <div
                            key={m.phenomenonId}
                            className="text-xs text-slate-300 bg-[#0B0F1A] p-2.5 rounded-lg border border-slate-800/90"
                          >
                            <div className="flex items-center justify-between font-medium text-white">
                              <span>
                                ● {m.phenomenonName.split('(')[0].trim()}{' '}
                                <span className="font-mono text-[11px] text-slate-400">
                                  ({dom?.shortName} · {m.prevalence})
                                </span>
                              </span>
                              <span className="font-mono text-[11px] tabular-nums text-sky-400">
                                Spez. {Math.round(m.specificityScore * 100)}%
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">{m.clinicalNote}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

