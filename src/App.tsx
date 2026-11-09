import React, { useState, useMemo } from 'react';
import {
  ALL_PHENOMENA,
  PHENOMENON_DOMAINS,
  CONDITIONS_DATA,
  CONDITION_CATEGORY_META,
  getDomainById,
  getConditionById,
  getPhenomenonById
} from './data/index';
import { PhenomenonDomainId, ConditionCategory } from './data/types';
import { HistoricalEpochId } from './data/historicalTimeline';
import { filterPhenomena } from './utils/graphEngine';
import { PhenomenonArtwork } from './components/PhenomenonArtwork';
import { NetworkGraphCanvas } from './components/NetworkGraphCanvas';
import { InspectorPanel } from './components/InspectorPanel';
import { DifferentialCombinator } from './components/DifferentialCombinator';
import {
  Search,
  Network,
  LayoutGrid,
  SlidersHorizontal,
  BookOpen,
  X,
  ArrowUpRight,
  Filter,
  ChevronDown,
  ChevronUp,
  PanelRightOpen,
  Sparkles,
  History
} from 'lucide-react';

type ActiveWorkspaceTab = 'graph' | 'atlas' | 'combinator' | 'taxonomy';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveWorkspaceTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const t = params.get('tab');
      if (t === 'combinator' || t === 'atlas' || t === 'taxonomy' || t === 'graph') {
        return t;
      }
    }
    return 'graph';
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<PhenomenonDomainId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<ConditionCategory | 'all'>('all');
  const [selectedConditionFilter, setSelectedConditionFilter] = useState<string>('all');

  // Floating Collapsible HUD Drawer States
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(true);
  const [isArtStripOpen, setIsArtStripOpen] = useState<boolean>(false);

  // Interactive Historical Timeline Mode State ("Zeitstrahl-Modus: Antike Melancholie ➔ RDoC")
  const [isTimelineMode, setIsTimelineMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('timeline') === '1';
    }
    return false;
  });
  const [activeEpochId, setActiveEpochId] = useState<HistoricalEpochId>('rdoc_modern');

  const [inspectedId, setInspectedId] = useState<string>('auditory_hallucinations_voices');
  const [inspectedType, setInspectedType] = useState<'phenomenon' | 'condition'>('phenomenon');

  const [differentialIds, setDifferentialIds] = useState<string[]>([
    'hyperfocus_tunnel',
    'executive_paralysis',
    'subjective_time_distortion',
    'sensory_overload_flooding'
  ]);

  const filteredPhenomena = useMemo(() => {
    return filterPhenomena({
      searchQuery,
      domainId: selectedDomain,
      conditionCategory: selectedCategory,
      conditionId: selectedConditionFilter
    });
  }, [searchQuery, selectedDomain, selectedCategory, selectedConditionFilter]);

  const handleSelectEntity = (id: string, type: 'phenomenon' | 'condition') => {
    setInspectedId(id);
    setInspectedType(type);
  };

  const handleToggleDifferential = (phenomenonId: string) => {
    setDifferentialIds((prev) =>
      prev.includes(phenomenonId)
        ? prev.filter((id) => id !== phenomenonId)
        : [...prev, phenomenonId]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDomain('all');
    setSelectedCategory('all');
    setSelectedConditionFilter('all');
  };

  const totalAssociations = useMemo(() => {
    return ALL_PHENOMENA.reduce((sum, p) => sum + p.conditions.length, 0);
  }, []);

  const activeEntitySummary = useMemo(() => {
    if (inspectedType === 'phenomenon') {
      const p = getPhenomenonById(inspectedId);
      const d = p ? getDomainById(p.domainId) : undefined;
      return {
        title: p?.name.split('(')[0].trim() ?? inspectedId,
        code: p?.amdpCode ?? '',
        color: d?.color ?? '#38BDF8'
      };
    } else {
      const c = getConditionById(inspectedId);
      const cat = c ? CONDITION_CATEGORY_META[c.category] : undefined;
      return {
        title: c?.name.split('(')[0].trim() ?? inspectedId,
        code: c?.icd11Code ?? '',
        color: cat?.color ?? '#A855F7'
      };
    }
  }, [inspectedId, inspectedType]);

  const hasActiveFilter = Boolean(
    searchQuery ||
      selectedDomain !== 'all' ||
      selectedCategory !== 'all' ||
      selectedConditionFilter !== 'all'
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#04060C] text-[#F1F5F9] selection:bg-sky-500/30 selection:text-sky-200">
      {/* =====================================================================
          LAYER 0: 100% FULLSCREEN BIOLUMINESCENT CONNECTOME STAGE
      ===================================================================== */}
      <main
        id="top"
        className={
          activeTab === 'graph'
            ? 'fixed inset-0 w-screen h-screen z-0'
            : 'fixed inset-0 w-screen h-screen z-0 invisible pointer-events-none'
        }
      >
        <NetworkGraphCanvas
          phenomena={filteredPhenomena}
          selectedNodeId={inspectedId}
          selectedNodeType={inspectedType}
          onSelectNode={(id, type) => {
            handleSelectEntity(id, type);
          }}
          isTimelineMode={isTimelineMode}
          onToggleTimelineMode={(next) => {
            const target = next !== undefined ? next : !isTimelineMode;
            setIsTimelineMode(target);
            if (target) {
              setActiveTab('graph');
              setIsInspectorOpen(false);
            }
          }}
          activeEpochId={activeEpochId}
          onSelectEpoch={(epochId) => setActiveEpochId(epochId)}
        />
      </main>

      {/* =====================================================================
          FLOATING ELEMENT 1 (TOP-LEFT): SEMI-TRANSPARENT NAVIGATION & COLLAPSIBLE FILTER POD
      ===================================================================== */}
      <header
        aria-label="Schwebende Hauptnavigation und Filtersteuerung"
        className="fixed top-3 left-3 z-30 flex flex-col items-start gap-2 max-w-[calc(100vw-24px)] lg:max-w-[calc(100vw-415px)] pointer-events-none"
      >
        {/* Compact Semi-Transparent Glass Bar */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-2 px-3.5 py-2 bg-[#050812]/68 backdrop-blur-2xl border border-slate-700/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.65)]">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('graph');
            }}
            className="text-base font-bold tracking-wider text-white whitespace-nowrap shrink-0 pr-2 border-r border-slate-700/70"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            PHAENOMENE
          </a>

          {/* Live Compact Telemetry Badge */}
          <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-slate-300 pr-2 border-r border-slate-700/70 tabular-nums">
            <span className="text-sky-400 font-semibold">{filteredPhenomena.length}</span>
            <span className="text-slate-400">Phänomene</span>
            <span>·</span>
            <span className="text-purple-300 font-semibold">{CONDITIONS_DATA.length}</span>
            <span className="text-slate-400">Ursachen</span>
            <span>·</span>
            <span className="text-emerald-300 font-semibold">{totalAssociations}</span>
            <span className="text-slate-400">Synapsen</span>
          </div>

          {/* Workspace Mode Switcher */}
          <nav aria-label="Hauptnavigation" className="flex flex-wrap items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => {
                setActiveTab('graph');
                setIsTimelineMode(false);
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'graph' && !isTimelineMode
                  ? 'bg-sky-400 text-slate-950 font-semibold shadow-sm shadow-sky-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Konnektom</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const entering = !(activeTab === 'graph' && isTimelineMode);
                setActiveTab('graph');
                setIsTimelineMode(entering);
                if (entering) {
                  setIsInspectorOpen(false);
                }
              }}
              aria-pressed={activeTab === 'graph' && isTimelineMode}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'graph' && isTimelineMode
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm shadow-amber-400/35'
                  : 'text-amber-300 hover:text-white hover:bg-amber-950/60 border border-amber-500/40'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Zeitstrahl-Modus</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'atlas' ? 'graph' : 'atlas')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'atlas'
                  ? 'bg-sky-400 text-slate-950 font-semibold shadow-sm shadow-sky-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kunst-Atlas ({ALL_PHENOMENA.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'combinator' ? 'graph' : 'combinator')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'combinator'
                  ? 'bg-sky-400 text-slate-950 font-semibold shadow-sm shadow-sky-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Kombinator ({differentialIds.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'taxonomy' ? 'graph' : 'taxonomy')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'taxonomy'
                  ? 'bg-sky-400 text-slate-950 font-semibold shadow-sm shadow-sky-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Taxonomie</span>
            </button>
          </nav>

          {/* Collapsible Filter & Domain Drawer Toggle Button */}
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all whitespace-nowrap shrink-0 ${
              isFilterDrawerOpen || hasActiveFilter
                ? 'border-sky-400/70 bg-sky-950/60 text-sky-200'
                : 'border-slate-700/70 bg-slate-900/65 text-slate-200 hover:bg-slate-800/80'
            }`}
            aria-expanded={isFilterDrawerOpen}
            aria-label="Such- und Domänenfilter ein- oder ausklappen"
          >
            <Filter className="w-3.5 h-3.5 text-sky-400" />
            <span>
              Filter & 14 Domänen
              {hasActiveFilter ? ` (${filteredPhenomena.length})` : ''}
            </span>
            {isFilterDrawerOpen ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Collapsible Semi-Transparent Filter & Domain Drawer */}
        {isFilterDrawerOpen && (
          <section
            aria-label="Observatorium-Steuerung und Filter"
            className="pointer-events-auto w-full max-w-3xl p-3.5 bg-[#050812]/78 backdrop-blur-2xl border border-slate-700/65 rounded-2xl space-y-3 shadow-[0_20px_60px_rgba(0,0,0,0.75)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="relative flex-1 min-w-[200px]">
                <label htmlFor="phenomenon-search" className="sr-only">
                  Phänomen, Symptom, Krankheit oder ICD-Code suchen
                </label>
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="phenomenon-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Suche: Stimmenhören, Hyperfokus, Delir…"
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-[#060914]/90 border border-slate-700/80 rounded-lg focus:outline-none focus:border-sky-400 text-slate-100 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Suchfeld leeren"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <label htmlFor="category-filter" className="sr-only">
                Nach Ursachen-Kategorie filtern
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ConditionCategory | 'all')}
                className="w-full sm:w-44 px-2.5 py-1.5 text-xs bg-[#060914]/90 border border-slate-700/80 rounded-lg text-slate-200 focus:outline-none focus:border-sky-400 truncate"
              >
                <option value="all">Alle 6 Ursachen-Kategorien</option>
                {(Object.keys(CONDITION_CATEGORY_META) as ConditionCategory[]).map((catKey) => (
                  <option key={catKey} value={catKey}>
                    {CONDITION_CATEGORY_META[catKey].shortCode} – {CONDITION_CATEGORY_META[catKey].label}
                  </option>
                ))}
              </select>

              <label htmlFor="condition-filter" className="sr-only">
                Nach spezifischer Krankheit oder Neurodivergenz filtern
              </label>
              <select
                id="condition-filter"
                value={selectedConditionFilter}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedConditionFilter(val);
                  if (val !== 'all') {
                    handleSelectEntity(val, 'condition');
                  }
                }}
                className="w-full sm:w-48 px-2.5 py-1.5 text-xs bg-[#060914]/90 border border-slate-700/80 rounded-lg text-slate-200 focus:outline-none focus:border-sky-400 truncate"
              >
                <option value="all">Alle {CONDITIONS_DATA.length} Störungen / Zustände</option>
                {CONDITIONS_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name.split('(')[0].trim()} ({c.icd11Code})
                  </option>
                ))}
              </select>

              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-2.5 py-1.5 text-xs font-medium text-rose-300 bg-rose-950/60 hover:bg-rose-900/70 border border-rose-800 rounded-lg whitespace-nowrap shrink-0"
                >
                  Zurücksetzen
                </button>
              )}
            </div>

            {/* 14 Phenomenological Domain Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setSelectedDomain('all')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedDomain === 'all'
                    ? 'bg-white text-slate-950 font-semibold'
                    : 'bg-[#06080E]/80 text-slate-300 border border-slate-800 hover:border-slate-600'
                }`}
              >
                Alle 14 Domänen ({ALL_PHENOMENA.length})
              </button>
              {PHENOMENON_DOMAINS.map((dom) => {
                const isSelected = selectedDomain === dom.id;
                return (
                  <button
                    key={dom.id}
                    type="button"
                    onClick={() => setSelectedDomain(isSelected ? 'all' : dom.id)}
                    className={`px-2 py-1 text-[11px] font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'text-white border-transparent font-semibold shadow-md'
                        : 'bg-[#06080E]/80 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white'
                    }`}
                    style={isSelected ? { backgroundColor: dom.color } : undefined}
                  >
                    {dom.code.replace('DOM-', '')}. {dom.shortName}
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </header>

      {/* =====================================================================
          FLOATING ELEMENT 2 (RIGHT): SEMI-TRANSPARENT COLLAPSIBLE DOSSIER DRAWER
      ===================================================================== */}
      {activeTab === 'graph' && (
        <div className="fixed top-3 right-3 z-30 flex flex-col items-end pointer-events-none max-w-[calc(100vw-24px)]">
          {!isInspectorOpen ? (
            <button
              type="button"
              onClick={() => setIsInspectorOpen(true)}
              className="pointer-events-auto inline-flex items-center gap-2.5 px-3.5 py-2 bg-[#050812]/72 backdrop-blur-2xl border border-slate-700/65 hover:border-sky-400/70 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.65)] text-xs transition-all group"
              aria-label="Phänomen- und Ursachen-Dossier ausklappen"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  backgroundColor: activeEntitySummary.color,
                  boxShadow: `0 0 10px ${activeEntitySummary.color}`
                }}
              />
              <span className="font-mono text-[11px] text-slate-400">{activeEntitySummary.code}</span>
              <span className="font-semibold text-white truncate max-w-[180px] sm:max-w-[240px]">
                {activeEntitySummary.title}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-mono text-[10px] group-hover:bg-sky-400 group-hover:text-slate-950 transition-colors">
                <PanelRightOpen className="w-3 h-3" />
                <span>Dossier öffnen</span>
              </span>
            </button>
          ) : (
            <div className="pointer-events-auto w-[340px] sm:w-[370px] max-h-[calc(100vh-96px)] overflow-y-auto rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.75)]">
              <InspectorPanel
                selectedId={inspectedId}
                selectedType={inspectedType}
                onSelectEntity={handleSelectEntity}
                differentialIds={differentialIds}
                onToggleDifferential={handleToggleDifferential}
                onCollapse={() => setIsInspectorOpen(false)}
                onJumpToEpoch={(epochId) => {
                  setActiveTab('graph');
                  setIsTimelineMode(true);
                  setActiveEpochId(epochId);
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          FLOATING ELEMENT 3 (BOTTOM-LEFT): SEMI-TRANSPARENT COLLAPSIBLE ART-PLATE DOCK
      ===================================================================== */}
      {activeTab === 'graph' && !isTimelineMode && (
        <div className="fixed bottom-3 left-3 z-20 flex flex-col items-start gap-2 max-w-[calc(100vw-24px)] sm:max-w-[540px] pointer-events-none">
          {isArtStripOpen && (
            <div className="pointer-events-auto w-full p-3 bg-[#050812]/76 backdrop-blur-2xl border border-slate-700/65 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.75)] space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-white font-mono">
                  Neuro-Geometrische Bildtafeln ({filteredPhenomena.length})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('atlas')}
                    className="text-[11px] font-semibold text-sky-400 hover:text-sky-300 hover:underline"
                  >
                    Voll-Atlas öffnen →
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsArtStripOpen(false)}
                    className="p-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300"
                    aria-label="Bildtafeln-Leiste einklappen"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-stretch gap-2.5 overflow-x-auto pb-1">
                {filteredPhenomena.slice(0, 12).map((p) => {
                  const dom = getDomainById(p.domainId);
                  const isSelected = inspectedType === 'phenomenon' && inspectedId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        handleSelectEntity(p.id, 'phenomenon');
                        setIsInspectorOpen(true);
                      }}
                      className={`w-44 shrink-0 text-left p-2 rounded-xl border transition-all flex flex-col gap-1.5 group ${
                        isSelected
                          ? 'border-sky-400 bg-[#0F172A]/90 ring-1 ring-sky-400'
                          : 'border-slate-800/90 bg-[#060914]/80 hover:border-slate-600'
                      }`}
                    >
                      <PhenomenonArtwork
                        phenomenonId={p.id}
                        domainId={p.domainId}
                        compact
                        className="w-full h-24 rounded-lg"
                      />
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 truncate">
                          <span style={{ color: dom?.color }} className="font-semibold">
                            {dom?.shortName}
                          </span>{' '}
                          · {p.amdpCode}
                        </div>
                        <div className="text-xs font-bold text-white truncate group-hover:text-sky-300">
                          {p.name}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsArtStripOpen((v) => !v)}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#050812]/68 backdrop-blur-xl border border-slate-700/60 hover:border-sky-400/60 rounded-xl text-xs font-medium text-slate-200 shadow-lg transition-all"
            aria-expanded={isArtStripOpen}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Bildtafeln-Vorschau ({filteredPhenomena.length})</span>
            {isArtStripOpen ? (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        </div>
      )}

      {/* =====================================================================
          FLOATING ELEMENT 4: SEMI-TRANSPARENT OVERLAY MODALS FOR SECONDARY WORKSPACES
          (Kunst-Atlas, Differential-Kombinator, Taxonomie) over the Live Connectome
      ===================================================================== */}
      {activeTab !== 'graph' && (
        <div
          role="dialog"
          aria-label="Schwebendes Arbeitsbereich-Fenster"
          className="fixed inset-x-3 top-20 bottom-3 z-40 bg-[#050812]/96 border border-slate-700/65 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.85)] overflow-y-auto p-4 sm:p-5"
        >
          <div className="max-w-[1400px] mx-auto space-y-4">
            {/* Floating Overlay Top Bar with Close to Fullscreen Connectome CTA */}
            <div className="flex items-center justify-between gap-4 pb-2.5 border-b border-slate-800/80 sticky top-0 z-10 bg-[#050812]/95 px-2 py-1.5 rounded-xl">
              <div className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                {activeTab === 'atlas'
                  ? `VISUELLER PHÄNOMEN-ATLAS (${filteredPhenomena.length} BILDTAFELN)`
                  : activeTab === 'combinator'
                  ? 'TRANSDIAGNOSTISCHER DIFFERENTIAL-KOMBINATOR'
                  : 'TAXONOMIE & WISSENSCHAFTLICHE ONTOLOGIE (AMDP · RDoC · ICD-11)'}
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('graph')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 text-xs font-semibold transition-colors shadow-lg shadow-sky-500/20"
              >
                <X className="w-3.5 h-3.5" />
                <span>Schließen (Vollbild-Konnektom)</span>
              </button>
            </div>

            {/* WORKSPACE VIEW 2: FULL VISUAL ATLAS SIDE-BY-SIDE + INSPECTOR */}
            {activeTab === 'atlas' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                  {filteredPhenomena.length === 0 ? (
                    <div className="bg-[#0B0F1A]/80 border border-slate-800 rounded-xl p-10 text-center space-y-3">
                      <p className="text-sm text-slate-300">
                        Keine Phänomene entsprechen Ihrer aktuellen Filterkombination.
                      </p>
                      <button
                        type="button"
                        onClick={handleResetFilters}
                        className="px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 rounded-lg"
                      >
                        Alle Filter zurücksetzen
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {filteredPhenomena.map((p) => {
                        const dom = getDomainById(p.domainId);
                        const isSelected = inspectedType === 'phenomenon' && inspectedId === p.id;
                        return (
                          <article
                            key={p.id}
                            className={`bg-[#080C18]/85 rounded-xl border p-4 flex flex-col justify-between gap-4 transition-all shadow-xl ${
                              isSelected
                                ? 'border-sky-400 ring-1 ring-sky-400'
                                : 'border-slate-800 hover:border-slate-600'
                            }`}
                          >
                            <div className="space-y-3">
                              <button
                                type="button"
                                onClick={() => handleSelectEntity(p.id, 'phenomenon')}
                                className="w-full text-left block group"
                              >
                                <PhenomenonArtwork
                                  phenomenonId={p.id}
                                  domainId={p.domainId}
                                  className="w-full h-48 rounded-lg mb-3 group-hover:opacity-95 transition-opacity"
                                />
                                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                                  <span style={{ color: dom?.color }} className="font-semibold">
                                    {dom?.code} · {dom?.shortName}
                                  </span>
                                  <span>·</span>
                                  <span>{p.amdpCode}</span>
                                </div>
                                <h3
                                  className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors mt-1"
                                  style={{ fontFamily: 'var(--font-display)' }}
                                >
                                  {p.name}
                                </h3>
                                <p className="text-xs text-slate-400 italic mt-0.5">
                                  {p.shortVisualTagline}
                                </p>
                              </button>

                              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                                {p.definition}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-slate-800/90 space-y-1.5">
                              <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase">
                                Vorkommen bei ({p.conditions.length} Zuordnungen):
                              </div>
                              <div className="space-y-1">
                                {p.conditions.map((assoc) => {
                                  const cond = getConditionById(assoc.conditionId);
                                  if (!cond) return null;
                                  const catMeta = CONDITION_CATEGORY_META[cond.category];
                                  return (
                                    <button
                                      key={assoc.conditionId}
                                      type="button"
                                      onClick={() => handleSelectEntity(cond.id, 'condition')}
                                      className="w-full text-left flex items-center justify-between text-xs py-1.5 px-2 rounded-md bg-[#060912]/80 hover:bg-slate-800/80 transition-colors"
                                    >
                                      <span className="truncate pr-2">
                                        <strong style={{ color: catMeta.color }} className="font-mono text-[10px]">
                                          [{catMeta.shortCode}]
                                        </strong>{' '}
                                        <span className="font-medium text-slate-200">{cond.name.split('(')[0].trim()}</span>
                                      </span>
                                      <span className="font-mono text-[10px] text-slate-400 shrink-0 tabular-nums">
                                        {assoc.prevalence} ({Math.round(assoc.specificityScore * 100)}%)
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5 xl:col-span-4 sticky top-14">
                  <InspectorPanel
                    selectedId={inspectedId}
                    selectedType={inspectedType}
                    onSelectEntity={handleSelectEntity}
                    differentialIds={differentialIds}
                    onToggleDifferential={handleToggleDifferential}
                  />
                </div>
              </div>
            )}

            {/* WORKSPACE VIEW 3: DIFFERENTIAL COMBINATOR */}
            {activeTab === 'combinator' && (
              <DifferentialCombinator
                selectedPhenomenaIds={differentialIds}
                onTogglePhenomenon={handleToggleDifferential}
                onSetPreset={(ids) => setDifferentialIds(ids)}
                onInspectEntity={(id, type) => {
                  handleSelectEntity(id, type);
                  setIsInspectorOpen(true);
                  setActiveTab('graph');
                }}
              />
            )}

            {/* WORKSPACE VIEW 4: TAXONOMY & SCIENTIFIC SOURCES */}
            {activeTab === 'taxonomy' && (
              <div className="space-y-6">
                <div className="bg-[#080C18]/85 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl">
                  <h2
                    className="text-2xl font-semibold text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Wissenschaftliches Fundament: Warum Phänomene statt Diagnoseschubladen?
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                    In der klassischen Medizin und Psychiatrie werden Symptome oft nur als Unterpunkte einzelner
                    Krankheiten gelehrt. In der Realität des menschlichen Erlebens treten jedoch fast alle
                    psychischen und neurokognitiven Phänomene <strong className="text-white">transdiagnostisch</strong> auf: Eine
                    ausgeprägte <em>Reizüberflutung</em> findet sich bei Autismus und ADHS ebenso wie bei Migräne,
                    ME/CFS oder im Prodromalstadium einer Psychose. Eine <em>Katatonie</em> ist in über der Hälfte
                    der Fälle nicht schizophren, sondern Ausdruck einer schweren affektiven Störung oder einer
                    behandelbaren <em>Anti-NMDA-Rezeptor-Autoimmunenzephalitis</em>.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    <div className="p-4 bg-[#060912] border border-slate-800 rounded-xl space-y-1.5">
                      <div className="text-xs font-mono font-bold text-sky-400">01. AMDP-SYSTEM</div>
                      <h3 className="text-sm font-bold text-white">
                        Arbeitsgemeinschaft für Methodik und Dokumentation in der Psychiatrie
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Auf Karl Jaspers’ <em>Allgemeiner Psychopathologie</em> (1913) und Kurt Schneider
                        aufbauende standardisierte Systematik von über 100 psychopathologischen Einzelphänomenen.
                      </p>
                    </div>

                    <div className="p-4 bg-[#060912] border border-slate-800 rounded-xl space-y-1.5">
                      <div className="text-xs font-mono font-bold text-emerald-400">02. NIMH RDoC & HiTOP</div>
                      <h3 className="text-sm font-bold text-white">
                        Research Domain Criteria & Neurodivergenz-Forschung
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Transdiagnostische Matrix neuronaler Funktionsdomänen (Negative/Positive Valenz, Kognitive
                        Systeme, Soziale Prozesse, Arousal, Sensomotorik) und neurodivergenter Modelle
                        (Monotropismus, Double-Empathy).
                      </p>
                    </div>

                    <div className="p-4 bg-[#060912] border border-slate-800 rounded-xl space-y-1.5">
                      <div className="text-xs font-mono font-bold text-purple-400">03. ICD-11 & HPO / MONDO</div>
                      <h3 className="text-sm font-bold text-white">
                        WHO ICD-11 Kapitel 06/08/21 & Human Phenotype Ontology
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Internationale Codierung sowohl auf Symptomebene (ICD-11 MB20–MB29, HPO HP:0000707) als
                        auch auf ätiologischer Ebene inklusive Neurologie, Endokrinologie und Immunologie.
                      </p>
                    </div>

                    <div className="p-4 bg-[#060912] border border-slate-800 rounded-xl space-y-1.5">
                      <div className="text-xs font-mono font-bold text-amber-400">04. LIVE WISSENSSPIEGEL</div>
                      <h3 className="text-sm font-bold text-white">
                        Wikipedia REST API, NCBI PubMed & EMBL-EBI OLS4
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Jeder Knoten im Atlas ruft in Echtzeit den aktuellen Enzyklopädie-Artikel der
                        deutsch-/englischsprachigen Wikipedia, PubMed-Forschungsliteratur und OLS4-Ontologiedaten ab.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#080C18]/85 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl">
                  <h3
                    className="text-lg font-semibold text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Übersicht der 14 Phänomenologischen Domänen
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PHENOMENON_DOMAINS.map((dom) => {
                      const domPhenomena = ALL_PHENOMENA.filter((p) => p.domainId === dom.id);
                      return (
                        <div
                          key={dom.id}
                          className="p-4 rounded-xl border border-slate-800 bg-[#060912] space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold" style={{ color: dom.color }}>
                              {dom.code} · {dom.amdpSection}
                            </span>
                            <span className="text-xs font-mono text-slate-400">
                              {domPhenomena.length} Phänomene
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white">{dom.name}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{dom.description}</p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {domPhenomena.map((p) => (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => {
                                  handleSelectEntity(p.id, 'phenomenon');
                                  setIsInspectorOpen(true);
                                  setActiveTab('graph');
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-[#111726] text-slate-200 border border-slate-700 rounded-md hover:border-sky-400 hover:text-sky-300 transition-colors"
                              >
                                <span>{p.name.split('(')[0].trim()}</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

