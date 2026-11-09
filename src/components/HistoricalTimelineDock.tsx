import React, { useState } from 'react';
import {
  HISTORICAL_EPOCHS,
  HistoricalEpochId,
  RDOC_MATRIX_PILLARS,
  getEpochById
} from '../data/historicalTimeline';
import { TimelineFilterScope, TimelineEpochColumn } from '../utils/graphEngine';
import { getPhenomenonById, getConditionById } from '../data/index';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  History,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

interface HistoricalTimelineDockProps {
  activeEpochId: HistoricalEpochId;
  onSelectEpoch: (epochId: HistoricalEpochId) => void;
  filterScope: TimelineFilterScope;
  onToggleFilterScope: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  columns: TimelineEpochColumn[];
  unlockedPhenomenaCount: number;
  unlockedConditionsCount: number;
  onSelectEntity: (id: string, type: 'phenomenon' | 'condition') => void;
  onExitTimelineMode: () => void;
}

export const HistoricalTimelineDock: React.FC<HistoricalTimelineDockProps> = ({
  activeEpochId,
  onSelectEpoch,
  filterScope,
  onToggleFilterScope,
  isPlaying,
  onTogglePlay,
  columns,
  unlockedPhenomenaCount,
  unlockedConditionsCount,
  onSelectEntity,
  onExitTimelineMode
}) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState<boolean>(true);
  const activeEpoch = getEpochById(activeEpochId);
  const currentIdx = HISTORICAL_EPOCHS.findIndex((e) => e.id === activeEpochId);

  const handleStepPrev = () => {
    const prevIdx = (currentIdx - 1 + HISTORICAL_EPOCHS.length) % HISTORICAL_EPOCHS.length;
    onSelectEpoch(HISTORICAL_EPOCHS[prevIdx].id);
  };

  const handleStepNext = () => {
    const nextIdx = (currentIdx + 1) % HISTORICAL_EPOCHS.length;
    onSelectEpoch(HISTORICAL_EPOCHS[nextIdx].id);
  };

  return (
    <section
      aria-label="Interaktiver Historischer Zeitstrahl von der antiken Melancholie bis zur modernen RDoC-Klassifikation"
      className="fixed bottom-2.5 left-3 lg:left-[43%] lg:-translate-x-1/2 z-30 w-[calc(100vw-24px)] max-w-[980px] pointer-events-none flex flex-col gap-1.5"
    >
      {/* Collapsible Historical Paradigm & Epoch Dossier Card */}
      {isDetailsExpanded && (
        <div
          className="pointer-events-auto bg-[#050814]/88 backdrop-blur-2xl border rounded-xl px-3 py-2 shadow-[0_16px_48px_rgba(0,0,0,0.85)] transition-all"
          style={{ borderColor: `${activeEpoch.color}66` }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="space-y-0.5 flex-1 min-w-[260px]">
              <div className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-mono">
                <span
                  className="px-1.5 py-0.5 rounded font-bold text-slate-950"
                  style={{ backgroundColor: activeEpoch.color }}
                >
                  EPOCHE {activeEpoch.roman} · {activeEpoch.eraRange}
                </span>
                <span className="text-white font-bold text-xs sm:text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                  {activeEpoch.title}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-sky-300 tabular-nums">
                  {unlockedPhenomenaCount} Phänomene & {unlockedConditionsCount} Ursachen aktiv
                </span>
              </div>

              <p className="text-[11px] text-slate-300 leading-snug line-clamp-2 max-w-3xl">
                {activeEpoch.paradigmSummary}{' '}
                <span className="text-slate-400 font-mono text-[10px]">
                  ({activeEpoch.pioneers})
                </span>
              </p>
            </div>

            {/* Representative Milestone Entities for Instant Inspection */}
            <div className="flex flex-wrap items-center gap-1 shrink-0">
              <span className="text-[9.5px] font-mono uppercase tracking-wider text-slate-400 mr-1 hidden xl:inline">
                Meilensteine:
              </span>
              {activeEpoch.representativeIds.slice(0, 4).map((repId) => {
                const phen = getPhenomenonById(repId);
                const cond = !phen ? getConditionById(repId) : undefined;
                const label = phen
                  ? phen.name.split('(')[0].trim()
                  : cond
                  ? cond.name.split('(')[0].trim()
                  : repId;
                const type = phen ? 'phenomenon' : 'condition';

                return (
                  <button
                    key={repId}
                    type="button"
                    onClick={() => onSelectEntity(repId, type)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-[#0B1224]/90 hover:bg-slate-800 text-slate-100 border border-slate-700/80 hover:border-white/60 transition-colors"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: activeEpoch.color }}
                    />
                    <span className="truncate max-w-[140px]">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* When Epoch VII (Modern RDoC) is active, display the 6 NIMH RDoC Biobehavioral Matrix Pillars */}
          {activeEpoch.id === 'rdoc_modern' && (
            <div className="mt-1.5 pt-1.5 border-t border-slate-800/90 flex flex-wrap items-center gap-1">
              <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-emerald-400 mr-1">
                RDoC-Matrix:
              </span>
              {RDOC_MATRIX_PILLARS.map((pillar) => (
                <span
                  key={pillar.id}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#080E1C] border border-slate-800 text-[10px] font-mono text-slate-200"
                  title={pillar.circuits}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: pillar.color }}
                  />
                  <strong style={{ color: pillar.color }}>{pillar.shortCode}</strong>
                  <span className="truncate max-w-[125px]">
                    {pillar.germanTitle.split('(')[0].trim()}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Chronological Epoch Scrubber Bar & Playback Controls */}
      <div className="pointer-events-auto bg-[#050814]/90 backdrop-blur-2xl border border-slate-700/70 rounded-xl p-2 shadow-[0_16px_50px_rgba(0,0,0,0.85)] flex flex-col gap-1.5">
        {/* Top Control Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 pr-2 border-r border-slate-700/80">
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span>ZEITSTRAHL-MODUS (400 v. Chr. ➔ RDoC)</span>
            </span>

            <button
              type="button"
              onClick={handleStepPrev}
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 text-slate-200 transition-colors"
              aria-label="Vorherige historische Epoche"
              title="Vorherige Epoche"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onTogglePlay}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                isPlaying
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/25'
                  : 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border-sky-400/60'
              }`}
              aria-label={isPlaying ? 'Chronik-Wiedergabe pausieren' : 'Chronik-Wiedergabe starten'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Epochen-Reise abspielen'}</span>
            </button>

            <button
              type="button"
              onClick={handleStepNext}
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 text-slate-200 transition-colors"
              aria-label="Nächste historische Epoche"
              title="Nächste Epoche"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleFilterScope}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-colors ${
                filterScope === 'cumulative'
                  ? 'bg-emerald-950/60 border-emerald-400/60 text-emerald-200'
                  : 'bg-purple-950/60 border-purple-400/60 text-purple-200'
              }`}
              aria-label="Zeitstrahl-Filter zwischen kumulativer Ansicht und Einzel-Epoche umschalten"
            >
              {filterScope === 'cumulative' ? (
                <>
                  <Layers className="w-3 h-3 text-emerald-400" />
                  <span>Kumulativ (Bis Epoche {activeEpoch.roman})</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>Fokus: Nur Epoche {activeEpoch.roman}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsDetailsExpanded((v) => !v)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 text-[11px] text-slate-300"
              aria-expanded={isDetailsExpanded}
              aria-label="Epochen-Beschreibung ein- oder ausklappen"
            >
              <span>Epochen-Tafel</span>
              {isDetailsExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={onExitTimelineMode}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/70 border border-rose-700/70 text-[11px] font-medium text-rose-200 transition-colors"
              aria-label="Zeitstrahl-Modus beenden und zum radialen Domänen-Archipel zurückkehren"
            >
              <X className="w-3.5 h-3.5" />
              <span>Radial-Archipel</span>
            </button>
          </div>
        </div>

        {/* 7 Interactive Historical Epoch Track Buttons */}
        <div
          role="group"
          aria-label="Historische Epochen der Phänomenologie"
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5"
        >
          {HISTORICAL_EPOCHS.map((epoch, idx) => {
            const col = columns[idx];
            const isSelected = epoch.id === activeEpochId;
            const isReached =
              filterScope === 'cumulative' ? epoch.order <= activeEpoch.order : isSelected;
            const count = (col?.phenomenonCount ?? 0) + (col?.conditionCount ?? 0);

            return (
              <button
                key={epoch.id}
                type="button"
                onClick={() => onSelectEpoch(epoch.id)}
                aria-pressed={isSelected}
                aria-label={`Epoche ${epoch.roman}: ${epoch.shortTitle} (${epoch.keyYearLabel})`}
                className={`text-left px-2.5 py-2 rounded-xl border transition-all flex flex-col justify-between gap-1 ${
                  isSelected
                    ? 'bg-slate-900/95 shadow-lg scale-[1.01]'
                    : isReached
                    ? 'bg-[#080E1E]/85 border-slate-700/80 hover:border-slate-500'
                    : 'bg-[#040710]/65 border-slate-800/70 opacity-60 hover:opacity-90'
                }`}
                style={
                  isSelected
                    ? {
                        borderColor: epoch.color,
                        boxShadow: `0 0 18px ${epoch.color}40`
                      }
                    : undefined
                }
              >
                <div className="flex items-center justify-between gap-1">
                  <span
                    className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: isSelected ? epoch.color : `${epoch.color}25`,
                      color: isSelected ? '#020617' : epoch.accentColor
                    }}
                  >
                    {epoch.roman} · {epoch.keyYearLabel}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 tabular-nums">
                    +{count}
                  </span>
                </div>

                <div className="text-xs font-semibold text-white truncate">
                  {epoch.shortTitle}
                </div>

                {/* Progress Bar Indicator */}
                <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: isSelected ? '100%' : isReached ? '100%' : '0%',
                      backgroundColor: epoch.color,
                      opacity: isSelected ? 1 : 0.55
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
