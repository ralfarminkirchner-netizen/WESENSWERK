import React, { useEffect, useState } from 'react';
import {
  getPhenomenonById,
  getConditionById,
  getDomainById,
  getPhenomenaForCondition,
  CONDITION_CATEGORY_META
} from '../data/index';
import { PhenomenonArtwork } from './PhenomenonArtwork';
import {
  fetchWikipediaSummary,
  fetchPubMedArticles,
  fetchPubMedPairEvidence,
  fetchOlsOntologyTerms,
  WikiSummaryData,
  PubMedArticle,
  OlsTermResult
} from '../services/knowledgeApi';
import {
  computeLinkEvidenceConfidence,
  LinkEvidenceConfidenceProfile
} from '../utils/graphEngine';
import {
  ExternalLink,
  BookOpen,
  FlaskConical,
  Network,
  CheckSquare,
  Square,
  ArrowRight,
  PanelRightClose,
  History,
  ShieldCheck
} from 'lucide-react';
import { getEntityHistoricalMeta, getEpochById, HistoricalEpochId } from '../data/historicalTimeline';

interface InspectorPanelProps {
  selectedId: string;
  selectedType: 'phenomenon' | 'condition';
  onSelectEntity: (id: string, type: 'phenomenon' | 'condition') => void;
  differentialIds: string[];
  onToggleDifferential: (phenomenonId: string) => void;
  onCollapse?: () => void;
  onJumpToEpoch?: (epochId: HistoricalEpochId) => void;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  selectedId,
  selectedType,
  onSelectEntity,
  differentialIds,
  onToggleDifferential,
  onCollapse,
  onJumpToEpoch
}) => {
  const [wikiData, setWikiData] = useState<WikiSummaryData | null>(null);
  const [wikiLoading, setWikiLoading] = useState<boolean>(false);
  const [pubmedArticles, setPubmedArticles] = useState<PubMedArticle[]>([]);
  const [olsTerms, setOlsTerms] = useState<OlsTermResult[]>([]);

  // Focused counterpart ID for the Phenomenon-Condition Link Evidence Confidence Indicator
  const [focusedCounterpartId, setFocusedCounterpartId] = useState<string | null>(null);
  const [livePairPubmedCount, setLivePairPubmedCount] = useState<number | null>(null);
  const [livePairArticles, setLivePairArticles] = useState<PubMedArticle[]>([]);

  const phenomenon = selectedType === 'phenomenon' ? getPhenomenonById(selectedId) : undefined;
  const condition = selectedType === 'condition' ? getConditionById(selectedId) : undefined;
  const linkedPhenomenaForCondition = condition ? getPhenomenaForCondition(condition.id) : [];

  // Reset focused counterpart when selected entity changes
  useEffect(() => {
    if (phenomenon && phenomenon.conditions.length > 0) {
      setFocusedCounterpartId(phenomenon.conditions[0].conditionId);
    } else if (condition && linkedPhenomenaForCondition.length > 0) {
      setFocusedCounterpartId(linkedPhenomenaForCondition[0].phenomenon.id);
    } else {
      setFocusedCounterpartId(null);
    }
  }, [selectedId, selectedType]);

  // Resolve active phenomenonId + conditionId pair for the Evidence Strength Indicator
  const activePairIds = (() => {
    if (phenomenon) {
      const validCondId =
        focusedCounterpartId &&
        phenomenon.conditions.some((c) => c.conditionId === focusedCounterpartId)
          ? focusedCounterpartId
          : phenomenon.conditions[0]?.conditionId ?? null;
      return validCondId
        ? { phenomenonId: phenomenon.id, conditionId: validCondId }
        : null;
    }
    if (condition) {
      const validPhenId =
        focusedCounterpartId &&
        linkedPhenomenaForCondition.some((lp) => lp.phenomenon.id === focusedCounterpartId)
          ? focusedCounterpartId
          : linkedPhenomenaForCondition[0]?.phenomenon.id ?? null;
      return validPhenId
        ? { phenomenonId: validPhenId, conditionId: condition.id }
        : null;
    }
    return null;
  })();

  // Fetch live PubMed co-publication count & articles for the active phenomenon-condition link
  useEffect(() => {
    let cancelled = false;
    setLivePairPubmedCount(null);
    setLivePairArticles([]);

    if (activePairIds) {
      const baselineProfile = computeLinkEvidenceConfidence(
        activePairIds.phenomenonId,
        activePairIds.conditionId
      );
      fetchPubMedPairEvidence(baselineProfile.pubmedSearchQuery, 2).then((res) => {
        if (!cancelled && res) {
          if (res.totalCount > 0) {
            setLivePairPubmedCount(res.totalCount);
          }
          if (res.articles.length > 0) {
            setLivePairArticles(res.articles);
          }
        }
      });
    }

    return () => {
      cancelled = true;
    };
  }, [activePairIds?.phenomenonId, activePairIds?.conditionId]);

  useEffect(() => {
    let cancelled = false;
    setWikiLoading(true);
    setWikiData(null);
    setPubmedArticles([]);
    setOlsTerms([]);

    if (phenomenon) {
      fetchWikipediaSummary(phenomenon.wikiTitleDe, phenomenon.wikiTitleEn).then((res) => {
        if (!cancelled) {
          setWikiData(res);
          setWikiLoading(false);
        }
      });
      fetchPubMedArticles(phenomenon.pubmedQuery, 3).then((res) => {
        if (!cancelled) setPubmedArticles(res);
      });
      fetchOlsOntologyTerms(phenomenon.olsSearchTerm).then((res) => {
        if (!cancelled) setOlsTerms(res);
      });
    } else if (condition) {
      fetchWikipediaSummary(condition.wikiTitleDe, condition.wikiTitleEn).then((res) => {
        if (!cancelled) {
          setWikiData(res);
          setWikiLoading(false);
        }
      });
      fetchPubMedArticles(`${condition.englishName} phenomenology pathophysiology`, 3).then((res) => {
        if (!cancelled) setPubmedArticles(res);
      });
      fetchOlsOntologyTerms(condition.englishName.replace(/_/g, ' ')).then((res) => {
        if (!cancelled) setOlsTerms(res);
      });
    }

    return () => {
      cancelled = true;
    };
  }, [selectedId, selectedType, phenomenon, condition]);

  const activeEvidenceProfile: LinkEvidenceConfidenceProfile | null = activePairIds
    ? computeLinkEvidenceConfidence(
        activePairIds.phenomenonId,
        activePairIds.conditionId,
        livePairPubmedCount
      )
    : null;

  const renderEvidenceStrengthSection = () => {
    if (!activeEvidenceProfile) return null;

    const counterpartOptions = phenomenon
      ? phenomenon.conditions.map((assoc) => {
          const c = getConditionById(assoc.conditionId);
          const prof = computeLinkEvidenceConfidence(phenomenon.id, assoc.conditionId);
          return {
            id: assoc.conditionId,
            label: c ? c.name.split('(')[0].split('&')[0].trim() : assoc.conditionId,
            consensusPct: prof.consensusScorePct,
            tierColor: prof.tierColor
          };
        })
      : linkedPhenomenaForCondition.map((item) => {
          const prof = computeLinkEvidenceConfidence(item.phenomenon.id, condition!.id);
          return {
            id: item.phenomenon.id,
            label: item.phenomenon.name.split('(')[0].trim(),
            consensusPct: prof.consensusScorePct,
            tierColor: prof.tierColor
          };
        });

    const filledSegments = Math.round(activeEvidenceProfile.consensusScorePct / 10);

    return (
      <section
        aria-label="Wissenschaftlicher Evidenz- und Konsens-Indikator (PubMed / GRADE)"
        data-testid="evidence-strength-indicator"
        className="p-3 rounded-xl bg-[#070B16] border border-emerald-500/35 space-y-2 shadow-inner"
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Evidenzstärke & Forschungskonsens (PubMed / GRADE)</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 truncate">
              Kopplung: <strong className="text-slate-200">{activeEvidenceProfile.phenomenonName}</strong>
              {' × '}
              <strong className="text-sky-300">{activeEvidenceProfile.conditionName.split('&')[0].trim()}</strong>
            </div>
          </div>

          <span
            data-testid="evidence-tier-badge"
            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 border"
            style={{
              color: activeEvidenceProfile.tierColor,
              borderColor: `${activeEvidenceProfile.tierColor}66`,
              backgroundColor: `${activeEvidenceProfile.tierColor}18`
            }}
          >
            {activeEvidenceProfile.shortTierBadge}
          </span>
        </div>

        {/* Link Selector Chips to switch which Phenomenon-Condition Link is evaluated */}
        <div
          role="group"
          aria-label="Phänomen-Störungs-Verknüpfung für Evidenzprüfung auswählen"
          className="flex flex-wrap gap-1"
        >
          {counterpartOptions.map((opt) => {
            const isSelected =
              (phenomenon && activeEvidenceProfile.conditionId === opt.id) ||
              (condition && activeEvidenceProfile.phenomenonId === opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFocusedCounterpartId(opt.id)}
                aria-pressed={Boolean(isSelected)}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-all border ${
                  isSelected
                    ? 'bg-slate-800 text-white border-sky-400 font-semibold shadow-sm'
                    : 'bg-[#050811] text-slate-300 border-slate-800 hover:border-slate-600'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: opt.tierColor }}
                />
                <span className="truncate max-w-[115px]">{opt.label}</span>
                <span className="text-slate-400 tabular-nums">{opt.consensusPct}%</span>
              </button>
            );
          })}
        </div>

        {/* Visual Confidence Meter (10-Segment Bar + Consensus Score + PubMed Volume) */}
        <div className="p-2.5 rounded-lg bg-[#050811] border border-slate-800/90 space-y-1.5">
          <div className="flex items-baseline justify-between gap-2 font-mono tabular-nums">
            <div>
              <span className="text-[9.5px] text-slate-400 uppercase block">
                Wissenschaftlicher Konsens-Index
              </span>
              <div className="flex items-baseline gap-1.5">
                <span
                  data-testid="evidence-consensus-score"
                  className="text-base sm:text-lg font-extrabold"
                  style={{ color: activeEvidenceProfile.tierColor }}
                >
                  {activeEvidenceProfile.consensusScorePct}%
                </span>
                <span className="text-[10px] text-slate-300 font-semibold">
                  {activeEvidenceProfile.gradeLabel}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9.5px] text-slate-400 uppercase block">
                PubMed Co-Publikationen
              </span>
              <a
                href={activeEvidenceProfile.pubmedSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <span>~{activeEvidenceProfile.estimatedPubmedCount.toLocaleString('de-DE')} Studien</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 10-Segment Visual Confidence Gauge */}
          <div
            role="meter"
            aria-label="Wissenschaftliche Konfidenzstärke"
            aria-valuenow={activeEvidenceProfile.consensusScorePct}
            aria-valuemin={0}
            aria-valuemax={100}
            className="grid grid-cols-10 gap-1"
          >
            {Array.from({ length: 10 }).map((_, idx) => {
              const active = idx < filledSegments;
              return (
                <div
                  key={idx}
                  className="h-2 rounded-sm transition-all duration-300"
                  style={{
                    backgroundColor: active
                      ? activeEvidenceProfile.tierColor
                      : 'rgba(30, 41, 59, 0.65)',
                    boxShadow: active ? `0 0 8px ${activeEvidenceProfile.tierColor}55` : 'none'
                  }}
                />
              );
            })}
          </div>

          {/* 4-Pillar Scientific Evidence Breakdown */}
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-1.5 pt-1 border-t border-slate-800/80 text-[10px] font-mono tabular-nums">
            <div className="space-y-0.5">
              <div className="flex justify-between text-slate-300">
                <span>PubMed Literaturdichte</span>
                <strong className="text-white">
                  {activeEvidenceProfile.dimensions.literatureDensityPct}%
                </strong>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400"
                  style={{ width: `${activeEvidenceProfile.dimensions.literatureDensityPct}%` }}
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between text-slate-300">
                <span>ICD-11 / AMDP Anker</span>
                <strong className="text-white">
                  {activeEvidenceProfile.dimensions.diagnosticAnchoringPct}%
                </strong>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-400"
                  style={{ width: `${activeEvidenceProfile.dimensions.diagnosticAnchoringPct}%` }}
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between text-slate-300">
                <span>RDoC / Neurobiologie</span>
                <strong className="text-white">
                  {activeEvidenceProfile.dimensions.mechanisticValidationPct}%
                </strong>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-400"
                  style={{ width: `${activeEvidenceProfile.dimensions.mechanisticValidationPct}%` }}
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between text-slate-300">
                <span>Klinische Replikation</span>
                <strong className="text-white">
                  {activeEvidenceProfile.dimensions.clinicalReplicationPct}%
                </strong>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400"
                  style={{ width: `${activeEvidenceProfile.dimensions.clinicalReplicationPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scientific Consensus Rationale & PubMed Evidence Citation */}
        <div className="space-y-1.5 text-xs">
          <p className="text-slate-300 leading-snug text-[11px]">
            {activeEvidenceProfile.consensusRationale}
          </p>
          <div className="text-[10px] font-mono text-slate-400">
            <strong className="text-slate-300">Evidenzbasis:</strong>{' '}
            {activeEvidenceProfile.studyTypesSummary}
          </div>

          {/* Live PubMed Pair Articles or Curated Landmark Reference */}
          <div className="p-2 rounded-lg bg-[#050811] border border-slate-800/90 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
              <span>
                {livePairArticles.length > 0
                  ? 'LIVE PUBMED-TREFFER FÜR DIESE KOPPLUNG:'
                  : 'SCHLÜSSELREFERENZ (PUBMED / KONSENS-LITERATUR):'}
              </span>
              <a
                href={activeEvidenceProfile.pubmedSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline inline-flex items-center gap-0.5"
              >
                <span>PubMed Query</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {livePairArticles.length > 0 ? (
              <div className="space-y-1">
                {livePairArticles.map((art) => (
                  <div key={art.pmid} className="text-[10.5px] leading-snug">
                    <a
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-300 hover:underline font-medium"
                    >
                      {art.title}
                    </a>
                    <div className="text-[9.5px] font-mono text-slate-400">
                      {art.authors} · {art.source} ({art.pubdate}) · PMID: {art.pmid}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[10.5px] leading-snug">
                <a
                  href={activeEvidenceProfile.landmarkCitation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-300 hover:underline font-medium"
                >
                  {activeEvidenceProfile.landmarkCitation.title}
                </a>
                <div className="text-[9.5px] font-mono text-slate-400 mt-0.5">
                  {activeEvidenceProfile.landmarkCitation.authors} ·{' '}
                  {activeEvidenceProfile.landmarkCitation.journal} (
                  {activeEvidenceProfile.landmarkCitation.year}) · PMID:{' '}
                  {activeEvidenceProfile.landmarkCitation.pmid}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  if (phenomenon) {
    const domain = getDomainById(phenomenon.domainId);
    const isInDiff = differentialIds.includes(phenomenon.id);
    const histMeta = getEntityHistoricalMeta(phenomenon.id, 'phenomenon');
    const histEpoch = getEpochById(histMeta.epochId);

    const prevalenceLabelMap: Record<string, string> = {
      pathognomonisch: 'Pathognomonisch / Hochspezifisch',
      leitsymptom: 'Leitsymptom / Kardinalsymptom',
      haeufig: 'Häufiges Begleitphänomen',
      gelegentlich: 'Gelegentliches Auftreten',
      selten: 'Selten / Spezielle Verlaufsform'
    };

    return (
      <aside
        aria-label="Phänomen-Dossier und Quellenspiegel"
        className="bg-[#060914]/82 backdrop-blur-2xl border border-slate-700/60 rounded-2xl p-3.5 sm:p-4 flex flex-col gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.75)]"
      >
        {/* Header Metadata (Zero-Pill Unboxed Discipline) */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400">
              <span className="font-semibold" style={{ color: domain?.color }}>
                {domain?.code} · {domain?.shortName}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">{phenomenon.amdpCode}</span>
              {phenomenon.hpoId && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{phenomenon.hpoId}</span>
                </>
              )}
              {phenomenon.icd11SymptomCode && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>ICD-11 {phenomenon.icd11SymptomCode}</span>
                </>
              )}
            </div>

            {onCollapse && (
              <button
                type="button"
                onClick={onCollapse}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-900/75 hover:bg-slate-800 border border-slate-700/70 text-[10.5px] font-mono text-slate-300 hover:text-white shrink-0 transition-colors"
                aria-label="Dossier-Fenster einklappen"
                title="Dossier einklappen"
              >
                <span>Einklappen</span>
                <PanelRightClose className="w-3.5 h-3.5 text-sky-400" />
              </button>
            )}
          </div>

          <h2
            className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {phenomenon.name}
          </h2>
          <p className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">
            EN: {phenomenon.englishName}
          </p>
        </div>

        {/* High-Craft Neuro-Anatomical Art Plate */}
        <div className="space-y-1.5">
          <PhenomenonArtwork
            phenomenonId={phenomenon.id}
            domainId={phenomenon.domainId}
            className="w-full h-32 rounded-lg"
          />
          <p className="text-[11px] text-slate-300 italic border-l-2 pl-2 py-0.5 truncate" style={{ borderColor: domain?.color }}>
            Signatur: {phenomenon.shortVisualTagline}
          </p>
        </div>

        {/* Add to Differential Combination Simulator */}
        <button
          type="button"
          onClick={() => onToggleDifferential(phenomenon.id)}
          className={`w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            isInDiff
              ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-lg shadow-sky-500/20'
              : 'bg-[#111726] text-slate-200 border-slate-700 hover:border-sky-500/60 hover:bg-[#161F33]'
          }`}
        >
          <span className="flex items-center gap-2">
            {isInDiff ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
            <span>
              {isInDiff
                ? 'In Differential-Auswahl aktiv'
                : 'Zur Differential-Auswahl hinzufügen'}
            </span>
          </span>
          <span className="font-mono tabular-nums">({differentialIds.length} aktiv)</span>
        </button>

        {/* VISUAL SCIENTIFIC CONFIDENCE / EVIDENCE STRENGTH INDICATOR (PUBMED / GRADE) */}
        {renderEvidenceStrengthSection()}

        {/* Clinical & Phenomenological Definition */}
        <div className="space-y-3.5 border-t border-slate-800/90 pt-4 text-sm">
          <div>
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Phänomenologische Definition (AMDP / Jaspers)
            </h3>
            <p className="text-slate-200 leading-relaxed text-[13px]">{phenomenon.definition}</p>
          </div>

          <div className="p-3.5 bg-[#070A12] border border-slate-800/90 rounded-lg">
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400/90 mb-1">
              Subjektives Innen-Erleben (Erste-Person-Perspektive)
            </h3>
            <p
              className="text-slate-200 text-[13px] leading-relaxed italic"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              „{phenomenon.subjectiveExperience}“
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Neurobiologisches & Pathophysiologisches Korrelat ({phenomenon.rdocDomain})
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">{phenomenon.neurobiology}</p>
          </div>

          {/* Historical Genesis & Evolution to RDoC */}
          <div
            className="p-3.5 bg-[#070B16] border rounded-lg space-y-1.5"
            style={{ borderColor: `${histEpoch.color}55` }}
          >
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 text-amber-300">
                <History className="w-3.5 h-3.5" style={{ color: histEpoch.color }} />
                <span>Historische Genese ({histMeta.yearLabel})</span>
              </h3>
              {onJumpToEpoch && (
                <button
                  type="button"
                  onClick={() => onJumpToEpoch(histEpoch.id)}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-slate-950 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: histEpoch.color }}
                >
                  Epoche {histEpoch.roman}: {histEpoch.shortTitle} →
                </button>
              )}
            </div>
            <div className="text-xs font-semibold text-white">
              {histMeta.historicalTerm} · <span className="text-slate-300 font-normal">{histMeta.pioneer}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{histMeta.evolutionSummary}</p>
            <div className="text-[10.5px] font-mono text-emerald-300 pt-0.5">
              Moderne RDoC-Domäne: <strong>{histMeta.rdocPillar}</strong>
            </div>
          </div>
        </div>

        {/* Associated Conditions Across All 6 Etiological Categories */}
        <div className="border-t border-slate-800/90 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
              Vorkommen bei Krankheiten, Neurodivergenz & Somatik ({phenomenon.conditions.length})
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Klick wechselt Fokus</span>
          </div>

          <div className="space-y-2.5">
            {phenomenon.conditions.map((assoc) => {
              const cond = getConditionById(assoc.conditionId);
              if (!cond) return null;
              const catMeta = CONDITION_CATEGORY_META[cond.category];
              const linkEvidence = computeLinkEvidenceConfidence(phenomenon.id, cond.id);
              const isFocusedEvidence =
                activeEvidenceProfile?.conditionId === cond.id;

              return (
                <div
                  key={assoc.conditionId}
                  className={`p-3 rounded-lg border transition-colors ${
                    isFocusedEvidence
                      ? 'border-emerald-500/60 bg-[#08111F]'
                      : 'border-slate-800 bg-[#070A12]/90 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectEntity(cond.id, 'condition')}
                      className="text-left font-semibold text-sm text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1"
                    >
                      <span>{cond.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                    <span className="font-mono text-xs font-semibold tabular-nums text-slate-200 shrink-0">
                      {Math.round(assoc.specificityScore * 100)}% Spez.
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400 mt-1">
                    <span style={{ color: catMeta.color }} className="font-semibold">
                      {catMeta.shortCode}: {cond.categoryLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>ICD-11 {cond.icd11Code}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300">{prevalenceLabelMap[assoc.prevalence] ?? assoc.prevalence}</span>
                  </div>

                  {/* Per-Card Visual Evidence Confidence Bar */}
                  <div className="mt-2 p-2 rounded bg-[#050811] border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono tabular-nums">
                      <span
                        className="font-semibold"
                        style={{ color: linkEvidence.tierColor }}
                      >
                        Konsens-Evidenz: {linkEvidence.consensusScorePct}% ({linkEvidence.shortTierBadge})
                      </span>
                      <button
                        type="button"
                        onClick={() => setFocusedCounterpartId(cond.id)}
                        className="text-emerald-400 hover:underline"
                      >
                        ~{linkEvidence.estimatedPubmedCount.toLocaleString('de-DE')} PubMed ↗
                      </button>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${linkEvidence.consensusScorePct}%`,
                          backgroundColor: linkEvidence.tierColor
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {assoc.clinicalNote}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Linked Co-Occurring Phenomena */}
        <div className="border-t border-slate-800/90 pt-4">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5 text-sky-400" />
            <span>Vernetzte Nachbar-Phänomene</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {phenomenon.relatedPhenomenaIds.map((relId) => {
              const rel = getPhenomenonById(relId);
              if (!rel) return null;
              return (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => onSelectEntity(rel.id, 'phenomenon')}
                  className="px-2.5 py-1.5 text-xs font-medium bg-[#111726] hover:bg-[#192238] text-slate-200 border border-slate-800 hover:border-slate-600 rounded-md transition-colors text-left"
                >
                  → {rel.name.split('(')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Wikipedia Mirror & Outbound Citations */}
        <div className="border-t border-slate-800/90 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>Wikipedia-Wissensspiegel (Live API)</span>
            </h3>
            <a
              href={
                wikiData?.pageUrl ??
                `https://de.wikipedia.org/wiki/${encodeURIComponent(phenomenon.wikiTitleDe)}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-sky-400 hover:text-sky-300 hover:underline inline-flex items-center gap-1"
            >
              <span>Wikipedia ({wikiData?.lang?.toUpperCase() ?? 'DE'})</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {wikiLoading ? (
            <p className="text-xs text-slate-400 font-mono">
              Lade aktuellen Enzyklopädie-Auszug von de.wikipedia.org…
            </p>
          ) : wikiData ? (
            <div className="p-3.5 bg-[#070A12] border border-slate-800 rounded-lg space-y-2">
              <div className="text-xs font-semibold text-white">
                {wikiData.title}{' '}
                {wikiData.description && (
                  <span className="font-normal text-slate-400">· {wikiData.description}</span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{wikiData.extract}</p>
            </div>
          ) : (
            <p className="text-xs text-slate-400 leading-relaxed">
              Direktlink zum Wikipedia-Hauptartikel:{' '}
              <a
                href={`https://de.wikipedia.org/wiki/${encodeURIComponent(phenomenon.wikiTitleDe)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline"
              >
                de.wikipedia.org/wiki/{phenomenon.wikiTitleDe}
              </a>
            </p>
          )}

          {/* PubMed & EMBL-EBI OLS4 Provenance Links */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                <span>PubMed & EMBL-EBI OLS4 Ontologie</span>
              </span>
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(phenomenon.pubmedQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <span>PubMed Suche</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {olsTerms.length > 0 && (
              <div className="text-[11px] font-mono text-slate-300 space-y-1">
                {olsTerms.slice(0, 2).map((t, i) => (
                  <div key={i} className="truncate">
                    [OLS4 {t.ontologyName}] <strong className="text-emerald-300">{t.oboId}</strong>: {t.label}
                  </div>
                ))}
              </div>
            )}

            {pubmedArticles.length > 0 && (
              <ul className="space-y-2 text-xs">
                {pubmedArticles.map((art) => (
                  <li key={art.pmid} className="text-slate-300 leading-snug">
                    <a
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:text-sky-300 hover:underline font-medium"
                    >
                      {art.title}
                    </a>
                    <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                      {art.authors} · {art.source} ({art.pubdate}) · PMID: {art.pmid}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>
    );
  }

  if (condition) {
    const catMeta = CONDITION_CATEGORY_META[condition.category];
    const linkedPhenomena = linkedPhenomenaForCondition;
    const histMeta = getEntityHistoricalMeta(condition.id, 'condition');
    const histEpoch = getEpochById(histMeta.epochId);

    return (
      <aside
        aria-label="Störungs- und Ursachen-Dossier"
        className="bg-[#060914]/76 backdrop-blur-2xl border border-slate-700/60 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-[0_20px_60px_rgba(0,0,0,0.75)]"
      >
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span className="font-semibold" style={{ color: catMeta.color }}>
                {catMeta.shortCode} · {condition.categoryLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">ICD-11 {condition.icd11Code}</span>
              {condition.hpoOrMondoId && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{condition.hpoOrMondoId}</span>
                </>
              )}
            </div>

            {onCollapse && (
              <button
                type="button"
                onClick={onCollapse}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900/75 hover:bg-slate-800 border border-slate-700/70 text-[11px] font-mono text-slate-300 hover:text-white shrink-0 transition-colors"
                aria-label="Dossier-Fenster einklappen"
                title="Dossier einklappen"
              >
                <span>Einklappen</span>
                <PanelRightClose className="w-3.5 h-3.5 text-sky-400" />
              </button>
            )}
          </div>

          <h2
            className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {condition.name}
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Klinisch-ätiologischer Knotenpunkt mit {linkedPhenomena.length} verknüpften Phänomenen
          </p>
        </div>

        {/* VISUAL SCIENTIFIC CONFIDENCE / EVIDENCE STRENGTH INDICATOR (PUBMED / GRADE) */}
        {renderEvidenceStrengthSection()}

        <div className="space-y-3.5 border-t border-slate-800/90 pt-4 text-sm">
          <div>
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Klinische Charakteristik
            </h3>
            <p className="text-slate-200 leading-relaxed text-[13px]">{condition.summary}</p>
          </div>

          <div className="p-3.5 bg-[#070A12] border border-slate-800 rounded-lg">
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400 mb-1">
              Pathophysiologischer & Neurobiologischer Kernmechanismus
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">{condition.keyMechanism}</p>
          </div>

          <div
            className="p-3.5 bg-[#070B16] border rounded-lg space-y-1.5"
            style={{ borderColor: `${histEpoch.color}55` }}
          >
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 text-amber-300">
                <History className="w-3.5 h-3.5" style={{ color: histEpoch.color }} />
                <span>Ideengeschichte ({histMeta.yearLabel})</span>
              </h3>
              {onJumpToEpoch && (
                <button
                  type="button"
                  onClick={() => onJumpToEpoch(histEpoch.id)}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-slate-950 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: histEpoch.color }}
                >
                  Epoche {histEpoch.roman}: {histEpoch.shortTitle} →
                </button>
              )}
            </div>
            <div className="text-xs font-semibold text-white">
              {histMeta.historicalTerm} · <span className="text-slate-300 font-normal">{histMeta.pioneer}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{histMeta.evolutionSummary}</p>
          </div>
        </div>

        <div className="border-t border-slate-800/90 pt-4">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-3">
            Zugeordnete Phänomene bei diesem Zustand ({linkedPhenomena.length})
          </h3>
          <div className="space-y-2.5">
            {linkedPhenomena.map((item) => {
              const dom = getDomainById(item.phenomenon.domainId);
              const linkEvidence = computeLinkEvidenceConfidence(item.phenomenon.id, condition.id);
              const isFocusedEvidence =
                activeEvidenceProfile?.phenomenonId === item.phenomenon.id;

              return (
                <div
                  key={item.phenomenon.id}
                  className={`p-3 rounded-lg border transition-colors ${
                    isFocusedEvidence
                      ? 'border-emerald-500/60 bg-[#08111F]'
                      : 'border-slate-800 bg-[#070A12]/90 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectEntity(item.phenomenon.id, 'phenomenon')}
                      className="text-left font-semibold text-sm text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1"
                    >
                      <span>{item.phenomenon.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                    <span className="font-mono text-xs font-semibold tabular-nums text-slate-200 shrink-0">
                      {Math.round(item.specificityScore * 100)}%
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    <span style={{ color: dom?.color }} className="font-semibold">
                      {dom?.shortName}
                    </span>{' '}
                    · {item.phenomenon.amdpCode} · {item.prevalence.toUpperCase()}
                  </div>

                  {/* Per-Card Visual Evidence Confidence Bar */}
                  <div className="mt-2 p-2 rounded bg-[#050811] border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono tabular-nums">
                      <span
                        className="font-semibold"
                        style={{ color: linkEvidence.tierColor }}
                      >
                        Konsens-Evidenz: {linkEvidence.consensusScorePct}% ({linkEvidence.shortTierBadge})
                      </span>
                      <button
                        type="button"
                        onClick={() => setFocusedCounterpartId(item.phenomenon.id)}
                        className="text-emerald-400 hover:underline"
                      >
                        ~{linkEvidence.estimatedPubmedCount.toLocaleString('de-DE')} PubMed ↗
                      </button>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${linkEvidence.consensusScorePct}%`,
                          backgroundColor: linkEvidence.tierColor
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{item.clinicalNote}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wikipedia Mirror for Condition */}
        <div className="border-t border-slate-800/90 pt-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>Wikipedia-Wissensspiegel</span>
            </h3>
            <a
              href={
                wikiData?.pageUrl ??
                `https://de.wikipedia.org/wiki/${encodeURIComponent(condition.wikiTitleDe)}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-sky-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Artikel öffnen</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          {wikiData && (
            <div className="p-3.5 bg-[#070A12] border border-slate-800 rounded-lg">
              <p className="text-xs text-slate-300 leading-relaxed">{wikiData.extract}</p>
            </div>
          )}
        </div>
      </aside>
    );
  }

  return null;
};

