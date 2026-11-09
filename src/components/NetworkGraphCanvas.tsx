import React, { useEffect, useState, useRef, useMemo } from 'react';
import { PhenomenonEntity } from '../data/types';
import {
  buildBipartiteGraph,
  stepForceSimulation,
  computePhenomenonDensityClusters,
  stepMouseReactiveParticle,
  computeDomainArchipelagoCenters,
  spawnWaterRipple,
  stepWaterRipples,
  evaluateWaterSurfaceAt,
  computeHistoricalTimelineLayout,
  stepTimelineMorphSimulation,
  TimelineFilterScope,
  ReactiveParticleState,
  MouseFieldState,
  WaterRippleWave
} from '../utils/graphEngine';
import {
  HISTORICAL_EPOCHS,
  HistoricalEpochId,
  RDOC_MATRIX_PILLARS
} from '../data/historicalTimeline';
import { perlin3D, fbm3D } from '../utils/perlinNoise';
import { NodeSymbol } from './NodeSymbol';
import { HistoricalTimelineDock } from './HistoricalTimelineDock';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Play,
  Pause,
  Eye,
  EyeOff,
  Sparkles,
  Flame,
  Zap,
  Waves,
  CloudFog,
  Tag,
  ChevronUp,
  ChevronDown,
  Sliders,
  Compass,
  Droplets,
  History
} from 'lucide-react';

interface NetworkGraphCanvasProps {
  phenomena: PhenomenonEntity[];
  selectedNodeId: string;
  selectedNodeType: 'phenomenon' | 'condition';
  onSelectNode: (id: string, type: 'phenomenon' | 'condition') => void;
  isTimelineMode?: boolean;
  onToggleTimelineMode?: (next?: boolean) => void;
  activeEpochId?: HistoricalEpochId;
  onSelectEpoch?: (epochId: HistoricalEpochId) => void;
}

type ParticleMode = 'high' | 'focus' | 'off';
type NebulaVeilMode = 'mystic' | 'subtle' | 'off';
type DensityCloudMode = 'full' | 'contours' | 'off';
type LabelMode = 'smart' | 'all' | 'minimal';
type WaterReflectionMode = 'vivid' | 'calm' | 'off';
type EdgeClarityMode = 'focus' | 'all';

interface CursorWakeRipple {
  x: number;
  y: number;
  age: number;
  color: string;
}

export const NetworkGraphCanvas: React.FC<NetworkGraphCanvasProps> = ({
  phenomena,
  selectedNodeId,
  onSelectNode,
  isTimelineMode: externalTimelineMode,
  onToggleTimelineMode,
  activeEpochId: externalEpochId,
  onSelectEpoch
}) => {
  const [internalTimelineMode, setInternalTimelineMode] = useState<boolean>(false);
  const [internalEpochId, setInternalEpochId] = useState<HistoricalEpochId>('rdoc_modern');
  const [timelineFilterScope, setTimelineFilterScope] = useState<TimelineFilterScope>('cumulative');
  const [isTimelinePlaying, setIsTimelinePlaying] = useState<boolean>(false);

  const isTimelineMode = externalTimelineMode ?? internalTimelineMode;
  const currentEpochId = externalEpochId ?? internalEpochId;

  const handleToggleTimeline = (next?: boolean) => {
    const targetVal = next !== undefined ? next : !isTimelineMode;
    setInternalTimelineMode(targetVal);
    onToggleTimelineMode?.(targetVal);
    if (!targetVal) {
      setIsTimelinePlaying(false);
    }
  };

  const handleChangeEpoch = (epochId: HistoricalEpochId) => {
    setInternalEpochId(epochId);
    onSelectEpoch?.(epochId);
  };

  const [showConditionNodes, setShowConditionNodes] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [particleMode, setParticleMode] = useState<ParticleMode>('high');
  const [nebulaVeilMode, setNebulaVeilMode] = useState<NebulaVeilMode>('mystic');
  const [densityCloudMode, setDensityCloudMode] = useState<DensityCloudMode>('full');
  const [waterMode, setWaterMode] = useState<WaterReflectionMode>('vivid');
  const [edgeClarityMode, setEdgeClarityMode] = useState<EdgeClarityMode>('focus');
  const [showDomainIslands, setShowDomainIslands] = useState<boolean>(true);
  const [labelMode, setLabelMode] = useState<LabelMode>('smart');
  const [intenseGlow, setIntenseGlow] = useState<boolean>(true);
  const [electricDischarges, setElectricDischarges] = useState<boolean>(true);
  const [isHudExpanded, setIsHudExpanded] = useState<boolean>(false);
  const [isLegendExpanded, setIsLegendExpanded] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(0.94);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: -75, y: -8 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState<boolean>(false);

  // Tracks transient high-voltage surge when the user interacts with a node (click, hover, drag)
  const interactionSurgeRef = useRef<number>(0.75);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Widescreen Full-Viewport internal resolution
  const width = 1600;
  const height = 920;

  // Tracks interactive mouse field in world & canvas coordinates for the reactive water & particle system
  const mouseFieldRef = useRef<MouseFieldState & { worldX: number; worldY: number }>({
    x: width / 2,
    y: height / 2,
    worldX: width / 2,
    worldY: height / 2,
    vx: 0,
    vy: 0,
    active: false,
    radius: 240
  });
  const mouseTrailRef = useRef<CursorWakeRipple[]>([]);
  const waterRipplesRef = useRef<WaterRippleWave[]>([]);

  const initialGraph = useMemo(() => {
    return buildBipartiteGraph(phenomena, showConditionNodes, width, height);
  }, [phenomena, showConditionNodes]);

  const [nodes, setNodes] = useState(initialGraph.nodes);
  const edges = initialGraph.edges;

  const timelineLayout = useMemo(() => {
    return computeHistoricalTimelineLayout(
      initialGraph.nodes,
      currentEpochId,
      timelineFilterScope,
      width,
      height
    );
  }, [initialGraph.nodes, currentEpochId, timelineFilterScope]);

  useEffect(() => {
    let current = initialGraph.nodes;
    if (isTimelineMode) {
      for (let i = 0; i < 16; i++) {
        current = stepTimelineMorphSimulation(current, timelineLayout.nodeTargets, 0.45);
      }
    } else {
      for (let i = 0; i < 48; i++) {
        current = stepForceSimulation(current, initialGraph.edges, width, height, 0.28);
      }
    }
    setNodes(current);
    // Seed initial gentle water ripples around the center and focal nodes
    let seeded: WaterRippleWave[] = [];
    seeded = spawnWaterRipple(seeded, width * 0.5, height * 0.5, '#38BDF8', 1.15);
    seeded = spawnWaterRipple(seeded, width * 0.35, height * 0.38, '#A855F7', 0.9);
    seeded = spawnWaterRipple(seeded, width * 0.65, height * 0.62, '#10B981', 0.95);
    waterRipplesRef.current = seeded;
  }, [initialGraph]);

  // Smoothly morph node coordinates when switching between Radial Archipelago and Chronological Timeline Mode
  // Automatically calibrate camera pan & zoom when toggling between Radial Archipelago and Historical Timeline Mode
  useEffect(() => {
    if (isTimelineMode) {
      setZoom(0.94);
      setPan({ x: 0, y: -12 });
    } else {
      setIsTimelinePlaying(false);
      setZoom(0.94);
      setPan({ x: -75, y: -8 });
    }
  }, [isTimelineMode]);

  useEffect(() => {
    if (!isTimelineMode && !isSimulating) return;
    let steps = 0;
    const interval = window.setInterval(() => {
      steps++;
      if (isTimelineMode) {
        if (steps > 40 && !draggingNodeId) return;
        setNodes((prev) =>
          stepTimelineMorphSimulation(prev, timelineLayout.nodeTargets, 0.32)
        );
      } else {
        if (steps > 85 && !draggingNodeId) return;
        setNodes((prev) =>
          stepForceSimulation(prev, edges, width, height, draggingNodeId ? 0.18 : 0.08)
        );
      }
    }, 40);
    return () => window.clearInterval(interval);
  }, [isSimulating, isTimelineMode, timelineLayout, edges, draggingNodeId]);

  // Spawn resonant water ripples along the newly activated historical epoch column when scrubbing epochs
  useEffect(() => {
    if (!isTimelineMode) return;
    interactionSurgeRef.current = 1.0;
    const activeCol = timelineLayout.columns.find((c) => c.isActiveEpoch);
    if (activeCol) {
      let ripples = waterRipplesRef.current;
      ripples = spawnWaterRipple(ripples, activeCol.x, 240, activeCol.epoch.color, 1.35);
      ripples = spawnWaterRipple(ripples, activeCol.x, 460, activeCol.epoch.color, 1.45);
      ripples = spawnWaterRipple(ripples, activeCol.x, 680, activeCol.epoch.color, 1.25);
      waterRipplesRef.current = ripples;
    }
  }, [isTimelineMode, currentEpochId, timelineLayout.columns]);

  // Auto-Chronik Playback Timer: steps from Ancient Melancholia (Epoch I) to Modern RDoC (Epoch VII)
  useEffect(() => {
    if (!isTimelineMode || !isTimelinePlaying) return;
    const timer = window.setInterval(() => {
      const idx = HISTORICAL_EPOCHS.findIndex((e) => e.id === currentEpochId);
      const nextIdx = (idx + 1) % HISTORICAL_EPOCHS.length;
      const nextEpoch = HISTORICAL_EPOCHS[nextIdx];
      handleChangeEpoch(nextEpoch.id);
      if (nextEpoch.representativeIds.length > 0) {
        const repId = nextEpoch.representativeIds[0];
        const matchingNode = initialGraph.nodes.find((n) => n.id === repId);
        if (matchingNode) {
          onSelectNode(matchingNode.id, matchingNode.type);
        }
      }
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isTimelineMode, isTimelinePlaying, currentEpochId, initialGraph.nodes]);

  const activeFocusId = hoveredNodeId ?? selectedNodeId;
  const isActivelyInteracting = Boolean(hoveredNodeId || draggingNodeId);

  const connectedNodeIds = useMemo(() => {
    const set = new Set<string>([activeFocusId]);
    for (const e of edges) {
      if (e.source === activeFocusId) set.add(e.target);
      if (e.target === activeFocusId) set.add(e.source);
    }
    return set;
  }, [activeFocusId, edges]);

  const maxDegree = useMemo(() => {
    return Math.max(1, ...nodes.map((n) => n.degree));
  }, [nodes]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, (typeof nodes)[0]>();
    for (const n of nodes) map.set(n.id, n);
    return map;
  }, [nodes]);

  // Compute live Phenomenon-Density Atmospheric Nebula Clouds from phenomenon spatial clustering
  const densityClouds = useMemo(() => {
    return computePhenomenonDensityClusters(nodes, width, height);
  }, [nodes]);

  // Compute live Domain Archipelago Island centroids so each AMDP domain has a clear orientation badge
  const domainIslandClusters = useMemo(() => {
    const baseSectors = computeDomainArchipelagoCenters(width, height);
    const grouped = new Map<
      string,
      {
        domainId: string;
        code: string;
        shortName: string;
        color: string;
        cx: number;
        cy: number;
        count: number;
      }
    >();

    for (const n of nodes) {
      if (n.type !== 'phenomenon' || !n.domainId) continue;
      const sec = baseSectors.get(n.domainId);
      if (!sec) continue;
      const existing = grouped.get(n.domainId);
      if (!existing) {
        grouped.set(n.domainId, {
          domainId: n.domainId,
          code: sec.code,
          shortName: sec.shortName,
          color: sec.color,
          cx: n.x,
          cy: n.y,
          count: 1
        });
      } else {
        existing.cx += n.x;
        existing.cy += n.y;
        existing.count += 1;
      }
    }

    return Array.from(grouped.values()).map((g) => ({
      ...g,
      cx: g.cx / g.count,
      cy: g.cy / g.count
    }));
  }, [nodes]);

  const activeNodeObj = nodeMap.get(activeFocusId);

  // Trigger a high-voltage discharge surge & resonant water ripple whenever the user selects, hovers, or drags a node
  useEffect(() => {
    interactionSurgeRef.current = 1.0;
    const focusNode = nodeMap.get(activeFocusId);
    if (focusNode) {
      waterRipplesRef.current = spawnWaterRipple(
        waterRipplesRef.current,
        focusNode.x,
        focusNode.y,
        focusNode.color,
        1.35
      );
    }
  }, [selectedNodeId, hoveredNodeId, draggingNodeId, activeFocusId, nodeMap]);

  // Initialize deterministic 210-particle mouse-reactive background particle system
  const reactiveParticlesRef = useRef<ReactiveParticleState[]>([]);
  useEffect(() => {
    const palette = ['#38BDF8', '#A855F7', '#10B981', '#F59E0B', '#EC4899', '#6366F1', '#2DD4BF'];
    const arr: ReactiveParticleState[] = [];
    for (let i = 0; i < 210; i++) {
      const seed = (i * 9301 + 49297) % 233280;
      const r1 = seed / 233280;
      const r2 = ((seed * 7) % 233280) / 233280;
      const r3 = ((seed * 13) % 233280) / 233280;
      const startX = r1 * width;
      const startY = r2 * height;
      arr.push({
        x: startX,
        y: startY,
        px: startX,
        py: startY,
        vx: (r3 - 0.5) * 0.45,
        vy: (((seed * 19) % 233280) / 233280 - 0.5) * 0.45,
        baseSpeed: 0.022 + (i % 5) * 0.009,
        r: 1.0 + (i % 4) * 0.65,
        color: palette[i % palette.length],
        phase: r1 * Math.PI * 2,
        excitation: 0,
        localDensity: 0
      });
    }
    reactiveParticlesRef.current = arr;
  }, []);

  // Keep latest state in refs for the 60fps Canvas animation loop
  const renderStateRef = useRef({
    nodes,
    edges,
    nodeMap,
    densityClouds,
    activeFocusId,
    activeFocusColor: activeNodeObj?.color ?? '#38BDF8',
    isActivelyInteracting,
    connectedNodeIds,
    maxDegree,
    zoom,
    pan,
    particleMode,
    nebulaVeilMode,
    densityCloudMode,
    waterMode,
    intenseGlow,
    electricDischarges
  });

  useEffect(() => {
    renderStateRef.current = {
      nodes,
      edges,
      nodeMap,
      densityClouds,
      activeFocusId,
      activeFocusColor: activeNodeObj?.color ?? '#38BDF8',
      isActivelyInteracting,
      connectedNodeIds,
      maxDegree,
      zoom,
      pan,
      particleMode,
      nebulaVeilMode,
      densityCloudMode,
      waterMode,
      intenseGlow,
      electricDischarges
    };
  }, [
    nodes,
    edges,
    nodeMap,
    densityClouds,
    activeFocusId,
    activeNodeObj,
    isActivelyInteracting,
    connectedNodeIds,
    maxDegree,
    zoom,
    pan,
    particleMode,
    nebulaVeilMode,
    densityCloudMode,
    waterMode,
    intenseGlow,
    electricDischarges
  ]);

  // 60FPS HTML5 Canvas: Procedural Perlin Nebula Veil, Phenomenon-Density Clouds, Mouse-Reactive Particles & Bio-Electric Discharges
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Offscreen low-res buffer for smooth hardware-upscaled Volumetric Domain-Warped Perlin Nebula Clouds
    const bufW = 114;
    const bufH = 68;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = bufW;
    offCanvas.height = bufH;
    const offCtx = offCanvas.getContext('2d');
    const imgData = offCtx ? offCtx.createImageData(bufW, bufH) : null;

    let animId = 0;
    let time = 0;

    const renderFrame = () => {
      time += 0.016;
      const {
        nodes: curNodes,
        edges: curEdges,
        nodeMap: curNodeMap,
        densityClouds: curDensityClouds,
        activeFocusId: curFocusId,
        activeFocusColor: curFocusColor,
        isActivelyInteracting: curInteracting,
        connectedNodeIds: curConnected,
        maxDegree: curMaxDeg,
        zoom: curZoom,
        pan: curPan,
        particleMode: curParticleMode,
        nebulaVeilMode: curNebulaMode,
        densityCloudMode: curDensityMode,
        waterMode: curWaterMode,
        intenseGlow: curIntenseGlow,
        electricDischarges: curElectric
      } = renderStateRef.current;

      const mouseState = mouseFieldRef.current;
      // Decay mouse velocity smoothly between mousemove events
      mouseState.vx *= 0.88;
      mouseState.vy *= 0.88;

      if (curInteracting) {
        interactionSurgeRef.current = Math.min(1.0, interactionSurgeRef.current + 0.08);
      } else {
        interactionSurgeRef.current = Math.max(0.45, interactionSurgeRef.current * 0.985);
      }
      const surge = interactionSurgeRef.current;

      ctx.clearRect(0, 0, width, height);

      // ============================================================================
      // 1. DEEP BATHYMETRIC WATER & PERLIN-NOISE NEBULA VEIL ("WASSERBECKEN & NEBEL")
      // ============================================================================
      if (curNebulaMode !== 'off') {
        const veilIntensity = curNebulaMode === 'mystic' ? 1.0 : 0.48;
        const focusRgb = hexToRgbTuple(curFocusColor);

        // Pre-parse top density cloud RGB tuples so the Perlin buffer also reflects phenomenon density hotspots
        const topClouds = curDensityClouds.slice(-4).map((c) => ({
          nx: ((c.cx - width / 2) * curZoom + width / 2 + curPan.x) / width,
          ny: ((c.cy - height / 2) * curZoom + height / 2 + curPan.y) / height,
          rx: (c.radiusX * curZoom) / width,
          ry: (c.radiusY * curZoom) / height,
          score: c.densityScore,
          rgb: hexToRgbTuple(c.dominantColor)
        }));

        // 1A. Volumetric Domain-Warped 3D Perlin fBM Cloud & Deep Water Field (Upscaled smoothly)
        if (offCtx && imgData) {
          const data = imgData.data;
          const zTime = time * 0.16;
          const driftX = time * 0.11 - curPan.x * 0.0012;
          const driftY = time * 0.07 - curPan.y * 0.0012;

          let ptr = 0;
          for (let py = 0; py < bufH; py++) {
            const ny = py / bufH;
            const dyCenter = (ny - 0.5) * 2;
            for (let px = 0; px < bufW; px++) {
              const nx = px / bufW;
              const dxCenter = (nx - 0.5) * 2;
              const vignette = Math.max(0, 1 - (dxCenter * dxCenter * 0.65 + dyCenter * dyCenter * 0.75));

              const sx = nx * 3.4 + driftX;
              const sy = ny * 2.6 + driftY;
              const warp = perlin3D(sx * 0.85, sy * 0.85, zTime * 0.9) * 0.65;
              const nVal = fbm3D(sx + warp, sy - warp * 0.7, zTime, 2);

              // Compute local Phenomenon-Density Cloud amplification in the volumetric Perlin buffer
              let densityBoost = 0;
              let cloudR = focusRgb[0];
              let cloudG = focusRgb[1];
              let cloudB = focusRgb[2];
              if (curDensityMode !== 'off') {
                for (let cIdx = 0; cIdx < topClouds.length; cIdx++) {
                  const tc = topClouds[cIdx];
                  const ddx = (nx - tc.nx) / Math.max(0.08, tc.rx);
                  const ddy = (ny - tc.ny) / Math.max(0.08, tc.ry);
                  const dSq = ddx * ddx + ddy * ddy;
                  if (dSq < 1.6) {
                    const w = Math.exp(-dSq * 1.4) * tc.score;
                    if (w > densityBoost) {
                      densityBoost = w;
                      cloudR = tc.rgb[0];
                      cloudG = tc.rgb[1];
                      cloudB = tc.rgb[2];
                    }
                  }
                }
              }

              const mist =
                Math.max(0, nVal - 0.32 + densityBoost * 0.22) *
                (1.55 + densityBoost * 0.65) *
                vignette *
                veilIntensity;

              const colorWave = 0.5 + 0.5 * perlin3D(sx * 0.6 + 5.2, sy * 0.6 - 3.1, zTime * 0.6);
              const targetR = densityBoost > 0.15 ? cloudR : focusRgb[0];
              const targetG = densityBoost > 0.15 ? cloudG : focusRgb[1];
              const targetB = densityBoost > 0.15 ? cloudB : focusRgb[2];

              const r = Math.min(
                255,
                Math.floor(3 + mist * (18 * (1 - colorWave) + targetR * 0.55 * colorWave))
              );
              const g = Math.min(
                255,
                Math.floor(9 + mist * (74 * (1 - colorWave) + targetG * 0.58 * colorWave))
              );
              const b = Math.min(
                255,
                Math.floor(20 + mist * (148 * (1 - colorWave) + targetB * 0.76 * colorWave))
              );

              data[ptr++] = r;
              data[ptr++] = g;
              data[ptr++] = b;
              data[ptr++] = Math.min(248, Math.floor(175 + mist * 85));
            }
          }

          offCtx.putImageData(imgData, 0, 0);
          ctx.save();
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(offCanvas, 0, 0, width, height);
          ctx.restore();
        }

        // 1B. Flowing Perlin-Noise Ethereal Water-Mist Ribbons
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const waveCount = curNebulaMode === 'mystic' ? 12 : 7;
        const xStep = 28;

        for (let wIdx = 0; wIdx < waveCount; wIdx++) {
          const baseFrac = (wIdx + 0.5) / waveCount;
          const baseY = height * (0.08 + baseFrac * 0.84);

          const waveColor =
            wIdx % 3 === 0
              ? curFocusColor
              : wIdx % 3 === 1
              ? '#38BDF8'
              : '#0EA5E9';

          const ribbonPoints: { x: number; y: number; thickness: number }[] = [];

          for (let x = -20; x <= width + 20; x += xStep) {
            const nx = (x - curPan.x * 0.25) * 0.0024;
            const ny = wIdx * 0.42;
            const primaryWave = perlin3D(nx, ny, time * 0.22);
            const harmonicRipple = perlin3D(nx * 2.3 + time * 0.32, ny * 1.7, time * 0.15);

            let mouseWavePush = 0;
            if (mouseState.active) {
              const mdx = x - mouseState.x;
              const mdy = baseY - mouseState.y;
              const mDistSq = mdx * mdx + mdy * mdy;
              if (mDistSq < 36000) {
                mouseWavePush = Math.exp(-mDistSq / 18000) * (mouseState.vy * 1.2 + Math.sin(time * 6) * 14);
              }
            }

            const yOffset = primaryWave * 64 + harmonicRipple * 24 + mouseWavePush;
            const thicknessNoise = 0.5 + 0.5 * perlin3D(nx * 1.5, ny + 4.1, time * 0.18);
            const thickness = (22 + thicknessNoise * 48) * veilIntensity;

            ribbonPoints.push({
              x,
              y: baseY + yOffset,
              thickness
            });
          }

          ctx.beginPath();
          for (let i = 0; i < ribbonPoints.length; i++) {
            const pt = ribbonPoints[i];
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          for (let i = ribbonPoints.length - 1; i >= 0; i--) {
            const pt = ribbonPoints[i];
            ctx.lineTo(pt.x, pt.y + pt.thickness);
          }
          ctx.closePath();

          const ribbonAlpha = (0.038 + (wIdx % 4) * 0.011) * veilIntensity;
          ctx.fillStyle = hexToRgba(waveColor, ribbonAlpha);
          ctx.fill();

          ctx.beginPath();
          for (let i = 0; i < ribbonPoints.length; i++) {
            const pt = ribbonPoints[i];
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.strokeStyle = hexToRgba(
            waveColor,
            (0.11 + 0.05 * Math.sin(time * 0.9 + wIdx)) * veilIntensity
          );
          ctx.lineWidth = wIdx % 3 === 0 ? 1.5 : 1.0;
          ctx.stroke();
        }
        ctx.restore();
      } else {
        const bgGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          20,
          width * 0.5,
          height * 0.5,
          width * 0.58
        );
        bgGrad.addColorStop(0, 'rgba(10, 28, 62, 0.38)');
        bgGrad.addColorStop(0.5, 'rgba(6, 15, 34, 0.22)');
        bgGrad.addColorStop(1, 'rgba(3, 6, 14, 0)');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // ============================================================================
      // 2. MOUSE-REACTIVE BACKGROUND PARTICLE SYSTEM & KINETIC VORTEX WAKE
      // ============================================================================
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      if (mouseState.active) {
        const cursorGrad = ctx.createRadialGradient(
          mouseState.x,
          mouseState.y,
          4,
          mouseState.x,
          mouseState.y,
          mouseState.radius * 0.85
        );
        cursorGrad.addColorStop(0, hexToRgba(curFocusColor, 0.22));
        cursorGrad.addColorStop(0.45, hexToRgba('#38BDF8', 0.09));
        cursorGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.beginPath();
        ctx.arc(mouseState.x, mouseState.y, mouseState.radius * 0.85, 0, Math.PI * 2);
        ctx.fillStyle = cursorGrad;
        ctx.fill();
      }

      // Advance & draw decaying screen-space cursor wake ripples
      for (let rIdx = mouseTrailRef.current.length - 1; rIdx >= 0; rIdx--) {
        const rip = mouseTrailRef.current[rIdx];
        rip.age += 0.032;
        if (rip.age >= 1) {
          mouseTrailRef.current.splice(rIdx, 1);
          continue;
        }
        const radius = 8 + rip.age * 74;
        const alpha = (1 - rip.age) * 0.24;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(rip.color, alpha);
        ctx.lineWidth = 1.3 * (1 - rip.age);
        ctx.stroke();
      }

      // Step & Render 210 Mouse-Reactive & Density-Aware Quanta Particles
      if (curParticleMode !== 'off') {
        const particles = reactiveParticlesRef.current;
        const excitedParticles: ReactiveParticleState[] = [];

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const flowAngle =
            perlin3D(p.x * 0.0032, p.y * 0.0032, time * 0.16) * Math.PI * 2;

          const nextP = stepMouseReactiveParticle(
            p,
            mouseState,
            curDensityClouds,
            flowAngle,
            width,
            height
          );
          particles[i] = nextP;

          if (nextP.excitation > 0.24) {
            excitedParticles.push(nextP);
          }

          const baseAlpha = 0.2 + 0.32 * (0.5 + 0.5 * Math.sin(nextP.phase));
          const densityAlphaBoost = nextP.localDensity * 0.26;
          const excitationBoost = nextP.excitation * 0.45;
          const finalAlpha = Math.min(0.96, baseAlpha + densityAlphaBoost + excitationBoost);
          const dynamicRadius =
            nextP.r * (1 + nextP.localDensity * 0.42 + nextP.excitation * 0.85);

          const speedSq = nextP.vx * nextP.vx + nextP.vy * nextP.vy;
          if (nextP.excitation > 0.12 || speedSq > 0.6) {
            const streakScale = 2.8 + nextP.excitation * 4.5;
            ctx.beginPath();
            ctx.moveTo(nextP.x, nextP.y);
            ctx.lineTo(
              nextP.x - nextP.vx * streakScale,
              nextP.y - nextP.vy * streakScale
            );
            ctx.strokeStyle = hexToRgba(
              nextP.excitation > 0.55 ? '#E0F2FE' : nextP.color,
              finalAlpha * 0.75
            );
            ctx.lineWidth = Math.max(0.9, dynamicRadius * 0.75);
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(nextP.x, nextP.y, dynamicRadius, 0, Math.PI * 2);
          ctx.fillStyle =
            nextP.excitation > 0.68
              ? `rgba(255, 255, 255, ${finalAlpha})`
              : hexToRgba(nextP.color, finalAlpha);
          ctx.fill();
        }

        if (excitedParticles.length > 1) {
          ctx.lineWidth = 0.85;
          const maxLinks = Math.min(excitedParticles.length, 32);
          for (let a = 0; a < maxLinks; a++) {
            const pa = excitedParticles[a];
            for (let b = a + 1; b < maxLinks; b++) {
              const pb = excitedParticles[b];
              const dx = pa.x - pb.x;
              const dy = pa.y - pb.y;
              const dSq = dx * dx + dy * dy;
              if (dSq < 6400) {
                const linkAlpha =
                  (1 - Math.sqrt(dSq) / 80) *
                  Math.min(pa.excitation, pb.excitation) *
                  0.42;
                ctx.beginPath();
                ctx.moveTo(pa.x, pa.y);
                ctx.lineTo(pb.x, pb.y);
                ctx.strokeStyle = hexToRgba('#38BDF8', linkAlpha);
                ctx.stroke();
              }
            }
          }
        }
      }

      // Apply synchronized World Pan & Zoom Transform
      ctx.translate(curPan.x + width / 2, curPan.y + height / 2);
      ctx.scale(curZoom, curZoom);
      ctx.translate(-width / 2, -height / 2);

      // ============================================================================
      // 2.5 RESPONSIVE WATER SURFACE, CAUSTIC WAVE LINES, MOUSE RIPPLES & NODE LIGHT REFLECTIONS
      // ============================================================================
      waterRipplesRef.current = stepWaterRipples(waterRipplesRef.current, 0.016);

      // Periodically emit a gentle autonomous drop ripple from the active node so the water surface stays alive
      if (
        curWaterMode !== 'off' &&
        Math.floor(time * 60) % 95 === 0 &&
        curNodes.length > 0
      ) {
        const focal = curNodeMap.get(curFocusId) ?? curNodes[Math.floor(time * 10) % curNodes.length];
        if (focal) {
          waterRipplesRef.current = spawnWaterRipple(
            waterRipplesRef.current,
            focal.x,
            focal.y,
            focal.color,
            0.75
          );
        }
      }

      if (curWaterMode !== 'off') {
        const waterIntensity = curWaterMode === 'vivid' ? 1.0 : 0.55;
        const curRipples = waterRipplesRef.current;

        // A. Interactive Caustic Water-Wave Horizon Lines that bend & part when touched by the mouse cursor
        const waterLines = curWaterMode === 'vivid' ? 18 : 11;
        for (let wl = 0; wl < waterLines; wl++) {
          const baseY = 55 + (wl / Math.max(1, waterLines - 1)) * (height - 110);
          ctx.beginPath();
          let maxLineShimmer = 0;
          for (let wx = 40; wx <= width - 40; wx += 36) {
            const surf = evaluateWaterSurfaceAt(wx, baseY, time, curRipples, mouseState);
            if (surf.causticShimmer > maxLineShimmer) maxLineShimmer = surf.causticShimmer;
            const wy = baseY + surf.height * 2.2 + surf.displacementY * 0.9;
            if (wx === 40) ctx.moveTo(wx, wy);
            else ctx.lineTo(wx, wy);
          }
          ctx.strokeStyle = hexToRgba(
            wl % 2 === 0 ? '#38BDF8' : curFocusColor,
            (0.055 + maxLineShimmer * 0.11) * waterIntensity
          );
          ctx.lineWidth = 0.85 + maxLineShimmer * 0.75;
          ctx.stroke();
        }

        // B. Expanding Concentric Water Ripple Wavefronts (Mouse-Touch & Node Drops)
        for (let rIdx = 0; rIdx < curRipples.length; rIdx++) {
          const rip = curRipples[rIdx];
          const fade = Math.pow(1 - rip.age, 1.35) * waterIntensity;
          if (fade <= 0.01) continue;

          // Primary outer gravity wave ring (slightly elliptical water perspective)
          ctx.save();
          ctx.translate(rip.x, rip.y);
          ctx.scale(1.12, 0.88);

          ctx.beginPath();
          ctx.arc(0, 0, rip.radius, 0, Math.PI * 2);
          ctx.strokeStyle = hexToRgba(rip.color, fade * 0.46);
          ctx.lineWidth = Math.max(0.9, 2.4 * (1 - rip.age));
          ctx.stroke();

          // Secondary inner capillary wave harmonic ring
          if (rip.radius > 18) {
            ctx.beginPath();
            ctx.arc(0, 0, rip.radius * 0.68, 0, Math.PI * 2);
            ctx.strokeStyle = hexToRgba('#38BDF8', fade * 0.28);
            ctx.lineWidth = Math.max(0.7, 1.4 * (1 - rip.age));
            ctx.stroke();
          }

          // Top-angled specular water crest highlight
          ctx.beginPath();
          ctx.arc(0, 0, rip.radius, Math.PI * 1.12, Math.PI * 1.88);
          ctx.strokeStyle = `rgba(224, 242, 254, ${fade * 0.58})`;
          ctx.lineWidth = Math.max(0.8, 1.6 * (1 - rip.age));
          ctx.stroke();

          ctx.restore();
        }

        // C. SPECULAR NODE LIGHT REFLECTIONS ON THE RIPPLING WATER SURFACE ("REFLEKTIERTE KNOTEN-LICHTER")
        for (let nIdx = 0; nIdx < curNodes.length; nIdx++) {
          const node = curNodes[nIdx];
          const isSelected = node.id === curFocusId;
          const isConnected = curConnected.has(node.id);
          const isDimmed = curFocusId && !isConnected;
          const importance = Math.max(0.2, node.degree / curMaxDeg);

          if (isDimmed && importance < 0.35 && curWaterMode !== 'vivid') continue;

          const reflectionSlices = isSelected || isConnected ? 8 : 5;
          const startY = node.y + node.radius * 0.68;

          for (let s = 0; s < reflectionSlices; s++) {
            const frac = s / reflectionSlices;
            const sliceBaseY = startY + 5 + s * 6.2;
            const surf = evaluateWaterSurfaceAt(node.x, sliceBaseY, time + nIdx * 0.13, curRipples, mouseState);

            // Water waves physically displace and shimmer each horizontal reflection strip!
            const rx = node.x + surf.displacementX * (1.35 + frac * 1.8);
            const ry = sliceBaseY + surf.displacementY * 0.55;
            const baseWidth =
              node.radius * (1.35 - frac * 0.72) * (isSelected ? 1.45 : isConnected ? 1.18 : 0.92);
            const dynamicWidth = Math.max(
              3.5,
              baseWidth + Math.sin(time * 4.5 + s * 1.4 + nIdx) * 3.2 + Math.abs(surf.displacementX) * 1.6
            );
            const sliceHeight = isSelected ? 2.4 : 1.7;

            const baseAlpha = isSelected
              ? 0.52
              : isConnected
              ? 0.34
              : isDimmed
              ? 0.08
              : 0.22 + importance * 0.14;
            const alpha =
              baseAlpha * (1 - frac * 0.78) * (0.75 + surf.causticShimmer * 0.65) * waterIntensity;

            ctx.beginPath();
            ctx.ellipse(rx, ry, dynamicWidth, sliceHeight, 0, 0, Math.PI * 2);
            ctx.fillStyle = hexToRgba(node.color, Math.min(0.88, alpha));
            ctx.fill();

            // Specular white-gold water glint at the center of top reflection slices
            if (s < 3 && (isSelected || isConnected || surf.causticShimmer > 0.52)) {
              ctx.beginPath();
              ctx.ellipse(rx, ry, dynamicWidth * 0.42, sliceHeight * 0.55, 0, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(240, 249, 255, ${Math.min(0.75, alpha * 0.85)})`;
              ctx.fill();
            }
          }
        }
      }

      // ============================================================================
      // 3. ATMOSPHERIC PHENOMENON-DENSITY NEBULA CLOUDS ("PHÄNOMEN-DICHTE-NEBELWOLKEN")
      // ============================================================================
      if (curDensityMode !== 'off' && curDensityClouds.length > 0) {
        for (let cIdx = 0; cIdx < curDensityClouds.length; cIdx++) {
          const cloud = curDensityClouds[cIdx];
          const breath = 0.5 + 0.5 * Math.sin(time * 1.1 + cIdx * 0.85);

          let cursorCloudBoost = 0;
          if (mouseState.active) {
            const mdx = mouseState.worldX - cloud.cx;
            const mdy = mouseState.worldY - cloud.cy;
            const mDist = Math.hypot(mdx, mdy);
            const cloudAvgR = (cloud.radiusX + cloud.radiusY) * 0.6;
            if (mDist < cloudAvgR) {
              cursorCloudBoost = (1 - mDist / cloudAvgR) * 0.45;
            }
          }

          const effectiveDensity = Math.min(1.2, cloud.densityScore + cursorCloudBoost);

          if (curDensityMode === 'full') {
            const lobeCount = 3;
            for (let lobe = 0; lobe < lobeCount; lobe++) {
              const angle = time * (lobe % 2 === 0 ? 0.18 : -0.14) + lobe * ((Math.PI * 2) / lobeCount) + cIdx;
              const perlinShift = perlin3D(cloud.cx * 0.005 + lobe, cloud.cy * 0.005, time * 0.25);
              const offsetR = (14 + perlinShift * 18) * (lobe === 0 ? 0.3 : 1);
              const lx = cloud.cx + Math.cos(angle) * offsetR;
              const ly = cloud.cy + Math.sin(angle) * offsetR;
              const lobeRadius =
                Math.max(cloud.radiusX, cloud.radiusY) *
                (lobe === 0 ? 1.08 + breath * 0.08 : 0.78 + breath * 0.06);

              const lobeColor = lobe === 1 ? cloud.secondaryColor : cloud.dominantColor;
              const coreAlpha =
                (0.08 + effectiveDensity * 0.14) * (lobe === 0 ? 1.0 : 0.72);

              const cloudGrad = ctx.createRadialGradient(
                lx,
                ly,
                lobeRadius * 0.08,
                lx,
                ly,
                lobeRadius
              );
              cloudGrad.addColorStop(0, hexToRgba(lobeColor, coreAlpha));
              cloudGrad.addColorStop(0.48, hexToRgba(lobeColor, coreAlpha * 0.52));
              cloudGrad.addColorStop(0.8, hexToRgba(cloud.secondaryColor, coreAlpha * 0.18));
              cloudGrad.addColorStop(1, hexToRgba(lobeColor, 0));

              ctx.beginPath();
              ctx.arc(lx, ly, lobeRadius, 0, Math.PI * 2);
              ctx.fillStyle = cloudGrad;
              ctx.fill();
            }
          }

          if (cloud.densityScore >= 0.42 || curDensityMode === 'contours' || cursorCloudBoost > 0.1) {
            const contourRings = cloud.densityScore >= 0.72 ? 2 : 1;
            for (let ring = 0; ring < contourRings; ring++) {
              const ringScale = ring === 0 ? 0.62 : 0.88;
              const steps = 36;
              ctx.beginPath();
              for (let s = 0; s <= steps; s++) {
                const theta = (s / steps) * Math.PI * 2;
                const nMod = perlin3D(
                  Math.cos(theta) * 1.3 + cIdx,
                  Math.sin(theta) * 1.3 + ring,
                  time * 0.28
                );
                const rx = cloud.radiusX * ringScale * (1 + nMod * 0.16);
                const ry = cloud.radiusY * ringScale * (1 + nMod * 0.16);
                const px = cloud.cx + Math.cos(theta) * rx;
                const py = cloud.cy + Math.sin(theta) * ry;
                if (s === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
              }
              ctx.closePath();
              ctx.strokeStyle = hexToRgba(
                cloud.dominantColor,
                (ring === 0 ? 0.2 : 0.12) * effectiveDensity
              );
              ctx.lineWidth = ring === 0 ? 1.2 : 0.8;
              ctx.setLineDash(ring === 0 ? [6, 6] : [3, 7]);
              ctx.stroke();
              ctx.setLineDash([]);
            }
          }
        }
      }

      // ============================================================================
      // 4. VOLUMETRIC PULSATING NODE BIOLUMINESCENCE AURAS
      // ============================================================================
      if (curIntenseGlow) {
        for (let i = 0; i < curNodes.length; i++) {
          const node = curNodes[i];
          const importance = Math.max(0.18, node.degree / curMaxDeg);
          const isSelected = node.id === curFocusId;
          const isConnected = curConnected.has(node.id);
          const isDimmed = curFocusId && !isConnected;

          if (isDimmed && importance < 0.5) continue;

          const pulseFreq = isSelected ? 4.8 + surge * 2 : isConnected ? 3.2 : 1.6 + importance * 1.8;
          const pulseWave = 0.5 + 0.5 * Math.sin(time * pulseFreq + i * 0.7);

          const baseAuraRadius =
            node.radius *
            (isSelected
              ? 4.4 + surge * 1.3 + pulseWave * 1.3
              : isConnected
              ? 2.9 + importance * 1.4 + surge * 0.5 + pulseWave * 0.8
              : 1.7 + importance * 2.0 + pulseWave * 0.5);

          const peakAlpha = isSelected
            ? 0.54 + surge * 0.18 + pulseWave * 0.18
            : isConnected
            ? 0.26 + importance * 0.15 + surge * 0.1 + pulseWave * 0.12
            : isDimmed
            ? 0.05
            : 0.11 + importance * 0.2 + pulseWave * 0.08;

          const grad = ctx.createRadialGradient(
            node.x,
            node.y,
            node.radius * 0.2,
            node.x,
            node.y,
            baseAuraRadius
          );
          grad.addColorStop(0, hexToRgba(node.color, Math.min(0.95, peakAlpha)));
          grad.addColorStop(0.45, hexToRgba(node.color, Math.min(0.8, peakAlpha * 0.44)));
          grad.addColorStop(1, hexToRgba(node.color, 0));

          ctx.beginPath();
          ctx.arc(node.x, node.y, baseAuraRadius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      // ============================================================================
      // 5. DIRECTIONAL BIO-ELECTRIC SYNAPTIC DISCHARGES & ACTION-POTENTIAL WAVEFRONTS
      // ============================================================================
      for (let eIdx = 0; eIdx < curEdges.length; eIdx++) {
        const edge = curEdges[eIdx];
        const isHighlighted =
          edge.source === curFocusId || edge.target === curFocusId;

        const rawS = curNodeMap.get(edge.source);
        const rawT = curNodeMap.get(edge.target);
        if (!rawS || !rawT) continue;

        const reverseDir =
          isHighlighted
            ? edge.target === curFocusId
            : rawT.type === 'condition' && rawS.type === 'phenomenon';

        const startNode = reverseDir ? rawT : rawS;
        const endNode = reverseDir ? rawS : rawT;

        const midX = (rawS.x + rawT.x) / 2 + (height / 2 - (rawS.y + rawT.y) / 2) * 0.08;
        const midY = (rawS.y + rawT.y) / 2 + ((rawS.x + rawT.x) / 2 - width / 2) * 0.08;

        const dischargeColor =
          edge.kind === 'phenomenon_link'
            ? '#38BDF8'
            : isHighlighted
            ? startNode.color
            : rawT.color;

        // 5A. BIO-ELECTRIC LIGHTNING DISCHARGE ANIMATION
        if (curElectric) {
          const spontaneousTrigger =
            !isHighlighted &&
            curParticleMode === 'high' &&
            edge.weight >= 0.85 &&
            Math.sin(time * 2.2 + eIdx * 1.7) > 0.72;

          if (isHighlighted || spontaneousTrigger) {
            const waveSpeed = isHighlighted
              ? 0.65 + surge * 0.55 + edge.weight * 0.2
              : 0.45;
            const waveHead = (time * waveSpeed + (eIdx * 0.19) % 1) % 1;

            const numArcs = isHighlighted && surge > 0.7 ? 2 : 1;
            const segments = isHighlighted ? 20 : 12;
            const maxJitter = isHighlighted
              ? (4.2 + surge * 6.5) * (edge.weight > 0.85 ? 1.15 : 0.9)
              : 2.8;

            for (let arcIdx = 0; arcIdx < numArcs; arcIdx++) {
              const pts: { x: number; y: number; nx: number; ny: number; u: number }[] = [];

              for (let sStep = 0; sStep <= segments; sStep++) {
                const u = sStep / segments;
                const inv = 1 - u;
                const bx =
                  inv * inv * startNode.x +
                  2 * inv * u * midX +
                  u * u * endNode.x;
                const by =
                  inv * inv * startNode.y +
                  2 * inv * u * midY +
                  u * u * endNode.y;

                const tx =
                  2 * inv * (midX - startNode.x) + 2 * u * (endNode.x - midX);
                const ty =
                  2 * inv * (midY - startNode.y) + 2 * u * (endNode.y - midY);
                const tLen = Math.hypot(tx, ty) || 1;
                const nx = -ty / tLen;
                const ny = tx / tLen;

                const endPin = Math.sin(u * Math.PI);
                const distFromWave = Math.abs(u - waveHead);
                const waveEnvelope =
                  0.32 + 0.68 * Math.exp(-Math.pow(distFromWave / 0.26, 2));

                const hfNoise =
                  Math.sin(u * 29 - time * (26 + arcIdx * 9) + eIdx * 3.7 + arcIdx * 2.1) *
                    0.62 +
                  Math.cos(u * 53 + time * 38 - eIdx * 5.3) * 0.38;

                const offset =
                  hfNoise * maxJitter * endPin * waveEnvelope * (arcIdx === 0 ? 1 : -0.75);

                pts.push({
                  x: bx + nx * offset,
                  y: by + ny * offset,
                  nx,
                  ny,
                  u
                });
              }

              // Outer Ionized Plasma Glow Path
              ctx.beginPath();
              for (let i = 0; i < pts.length; i++) {
                if (i === 0) ctx.moveTo(pts[i].x, pts[i].y);
                else ctx.lineTo(pts[i].x, pts[i].y);
              }
              ctx.strokeStyle = hexToRgba(
                dischargeColor,
                isHighlighted ? (arcIdx === 0 ? 0.45 + surge * 0.28 : 0.28) : 0.22
              );
              ctx.lineWidth = isHighlighted ? (arcIdx === 0 ? 4.2 + surge * 2 : 2.6) : 2.0;
              ctx.stroke();

              // Inner High-Voltage White/Cyan Lightning Core
              ctx.beginPath();
              let startedCore = false;
              for (let i = 0; i < pts.length; i++) {
                const u = pts[i].u;
                const rel = u - waveHead;
                const inWaveWindow =
                  isHighlighted
                    ? (rel >= -0.36 && rel <= 0.1) || (waveHead < 0.36 && u > 1 - (0.36 - waveHead))
                    : Math.abs(rel) < 0.2;

                if (inWaveWindow || (isHighlighted && surge > 0.82 && arcIdx === 0)) {
                  if (!startedCore) {
                    ctx.moveTo(pts[i].x, pts[i].y);
                    startedCore = true;
                  } else {
                    ctx.lineTo(pts[i].x, pts[i].y);
                  }
                } else {
                  startedCore = false;
                }
              }
              ctx.strokeStyle =
                arcIdx === 0
                  ? `rgba(240, 249, 255, ${isHighlighted ? 0.78 + surge * 0.2 : 0.45})`
                  : hexToRgba('#38BDF8', 0.65);
              ctx.lineWidth = isHighlighted ? (arcIdx === 0 ? 1.5 + surge * 0.6 : 1.0) : 0.9;
              ctx.stroke();

              // Forked Lightning Micro-Tendrils & Directional Wavefront Chevron (➤)
              if (isHighlighted && arcIdx === 0) {
                const headIdx = Math.min(
                  pts.length - 2,
                  Math.max(2, Math.floor(waveHead * segments))
                );
                const hp = pts[headIdx];
                const nextP = pts[headIdx + 1];
                const dirX = nextP.x - hp.x;
                const dirY = nextP.y - hp.y;
                const forkSign = headIdx % 2 === 0 ? 1 : -1;
                const branchLen = 8 + surge * 10;

                ctx.beginPath();
                ctx.moveTo(hp.x, hp.y);
                ctx.lineTo(
                  hp.x + dirX * 1.4 + hp.nx * forkSign * branchLen,
                  hp.y + dirY * 1.4 + hp.ny * forkSign * branchLen
                );
                ctx.strokeStyle = hexToRgba('#E0F2FE', 0.65 + surge * 0.25);
                ctx.lineWidth = 1.1;
                ctx.stroke();

                const angle = Math.atan2(dirY, dirX);
                const chevSize = 5.5 + surge * 2.2;
                ctx.save();
                ctx.translate(hp.x, hp.y);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(chevSize, 0);
                ctx.lineTo(-chevSize * 0.7, -chevSize * 0.65);
                ctx.lineTo(-chevSize * 0.3, 0);
                ctx.lineTo(-chevSize * 0.7, chevSize * 0.65);
                ctx.closePath();
                ctx.fillStyle = '#FFFFFF';
                ctx.fill();
                ctx.strokeStyle = dischargeColor;
                ctx.lineWidth = 1.2;
                ctx.stroke();
                ctx.restore();
              }

              // Post-Synaptic Target Impact Flash when Wavefront Reaches End Node
              if (isHighlighted && arcIdx === 0 && waveHead > 0.86) {
                const impactProgress = (waveHead - 0.86) / 0.14;
                const impactRadius =
                  endNode.radius + 3 + impactProgress * (10 + surge * 8);
                ctx.beginPath();
                ctx.arc(endNode.x, endNode.y, impactRadius, 0, Math.PI * 2);
                ctx.strokeStyle = hexToRgba('#FFFFFF', (1 - impactProgress) * 0.85);
                ctx.lineWidth = 2.0;
                ctx.stroke();
              }
            }
          }
        }

        // 5B. SYNAPTIC ACTION-POTENTIAL COMET PARTICLES
        if (curParticleMode !== 'off') {
          if (curParticleMode === 'focus' && !isHighlighted) continue;
          if (!isHighlighted && eIdx % 2 !== 0) continue;

          const numPackets = isHighlighted ? (edge.weight > 0.85 ? 3 : 2) : 1;
          const speed = isHighlighted
            ? 0.44 + surge * 0.22 + edge.weight * 0.16
            : 0.18 + (eIdx % 5) * 0.03;

          for (let p = 0; p < numPackets; p++) {
            const offset = (eIdx * 0.17 + p / numPackets) % 1;
            const u = (time * speed + offset) % 1;

            const tailSteps = isHighlighted ? 5 : 3;
            for (let step = tailSteps - 1; step >= 0; step--) {
              const tailU = Math.max(0, Math.min(1, u - step * 0.022));
              const inv = 1 - tailU;
              const bx =
                inv * inv * startNode.x +
                2 * inv * tailU * midX +
                tailU * tailU * endNode.x;
              const by =
                inv * inv * startNode.y +
                2 * inv * tailU * midY +
                tailU * tailU * endNode.y;

              const frac = 1 - step / tailSteps;
              const radius = isHighlighted
                ? step === 0
                  ? 3.2 + surge * 0.8
                  : 2.4 * frac
                : 1.7 * frac;
              const alpha = isHighlighted
                ? step === 0
                  ? 0.98
                  : 0.58 * frac
                : 0.35 * frac;

              ctx.beginPath();
              ctx.arc(bx, by, radius, 0, Math.PI * 2);
              ctx.fillStyle =
                step === 0 && isHighlighted ? '#FFFFFF' : hexToRgba(dischargeColor, alpha);
              ctx.fill();

              if (step === 0 && isHighlighted) {
                ctx.beginPath();
                ctx.arc(bx, by, 7.5 + surge * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = hexToRgba(dischargeColor, 0.35);
                ctx.fill();
              }
            }
          }
        }
      }

      ctx.restore();
      animId = window.requestAnimationFrame(renderFrame);
    };

    animId = window.requestAnimationFrame(renderFrame);
    return () => window.cancelAnimationFrame(animId);
  }, []);

  const handleSvgMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width) * width;
      const relY = ((e.clientY - rect.top) / rect.height) * height;
      const worldX = (relX - pan.x - width / 2) / zoom + width / 2;
      const worldY = (relY - pan.y - height / 2) / zoom + height / 2;

      waterRipplesRef.current = spawnWaterRipple(
        waterRipplesRef.current,
        worldX,
        worldY,
        activeNodeObj?.color ?? '#38BDF8',
        1.5
      );
    }

    if (
      (e.target as Element).tagName === 'svg' ||
      (e.target as Element).getAttribute('data-bg') === 'true'
    ) {
      setIsPanning(true);
      panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width) * width;
      const relY = ((e.clientY - rect.top) / rect.height) * height;
      const worldX = (relX - pan.x - width / 2) / zoom + width / 2;
      const worldY = (relY - pan.y - height / 2) / zoom + height / 2;

      // Update mouse kinetic field for the reactive water & background particle system
      const prevMouse = mouseFieldRef.current;
      const dvx = relX - prevMouse.x;
      const dvy = relY - prevMouse.y;
      const moveSpeed = Math.hypot(dvx, dvy);

      mouseFieldRef.current = {
        x: relX,
        y: relY,
        worldX,
        worldY,
        vx: prevMouse.active ? prevMouse.vx * 0.45 + dvx * 0.55 : 0,
        vy: prevMouse.active ? prevMouse.vy * 0.45 + dvy * 0.55 : 0,
        active: true,
        radius: 215
      };

      // Emit a screen-space cursor wake ripple & a world-space water ripple when touching/moving across the water
      if (moveSpeed > 4.5) {
        if (mouseTrailRef.current.length < 14) {
          mouseTrailRef.current.push({
            x: relX,
            y: relY,
            age: 0,
            color: activeNodeObj?.color ?? '#38BDF8'
          });
        }

        // Find if cursor is near any node so the water wave picks up that node's reflected light color
        let waveColor = activeNodeObj?.color ?? '#38BDF8';
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dSq = (n.x - worldX) * (n.x - worldX) + (n.y - worldY) * (n.y - worldY);
          if (dSq < 8500) {
            waveColor = n.color;
            break;
          }
        }

        const lastWave = waterRipplesRef.current[waterRipplesRef.current.length - 1];
        const distFromLast = lastWave
          ? Math.hypot(worldX - lastWave.x, worldY - lastWave.y)
          : 999;

        if (distFromLast > 26) {
          waterRipplesRef.current = spawnWaterRipple(
            waterRipplesRef.current,
            worldX,
            worldY,
            waveColor,
            Math.min(1.6, 0.65 + moveSpeed * 0.04)
          );
        }
      }

      if (draggingNodeId) {
        setNodes((prev) =>
          prev.map((n) =>
            n.id === draggingNodeId
              ? {
                  ...n,
                  x: Math.max(45, Math.min(width - 45, worldX)),
                  y: Math.max(45, Math.min(height - 45, worldY)),
                  vx: 0,
                  vy: 0
                }
              : n
          )
        );
        return;
      }
    }

    if (isPanning) {
      setPan({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y
      });
    }
  };

  const handleSvgMouseUp = () => {
    setDraggingNodeId(null);
    setIsPanning(false);
  };

  const handleSvgMouseLeave = () => {
    setDraggingNodeId(null);
    setIsPanning(false);
    mouseFieldRef.current.active = false;
  };

  const handleResetView = () => {
    interactionSurgeRef.current = 1.0;
    if (isTimelineMode) {
      setZoom(0.94);
      setPan({ x: 0, y: -12 });
      setNodes((prev) => stepTimelineMorphSimulation(prev, timelineLayout.nodeTargets, 1.0));
      return;
    }
    setZoom(0.94);
    setPan({ x: -75, y: -8 });
    let current = initialGraph.nodes;
    for (let i = 0; i < 42; i++) {
      current = stepForceSimulation(current, initialGraph.edges, width, height, 0.28);
    }
    setNodes(current);
  };

  const cycleParticleMode = () => {
    setParticleMode((prev) => (prev === 'high' ? 'focus' : prev === 'focus' ? 'off' : 'high'));
  };

  const cycleNebulaVeilMode = () => {
    setNebulaVeilMode((prev) =>
      prev === 'mystic' ? 'subtle' : prev === 'subtle' ? 'off' : 'mystic'
    );
  };

  const cycleDensityCloudMode = () => {
    setDensityCloudMode((prev) =>
      prev === 'full' ? 'contours' : prev === 'contours' ? 'off' : 'full'
    );
  };

  const cycleWaterMode = () => {
    setWaterMode((prev) =>
      prev === 'vivid' ? 'calm' : prev === 'calm' ? 'off' : 'vivid'
    );
  };

  const cycleLabelMode = () => {
    setLabelMode((prev) =>
      prev === 'smart' ? 'all' : prev === 'all' ? 'minimal' : 'smart'
    );
  };

  const handleSvgWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    const delta = e.deltaY < 0 ? 0.12 : -0.12;
    setZoom((z) => Math.max(0.5, Math.min(2.6, +(z + delta).toFixed(2))));
  };

  return (
    <div className="relative w-full h-full bg-[#030711] overflow-hidden">
      {/* Layer 1: High-FPS HTML5 Canvas for Responsive Water Surface, Node Light Reflections, Perlin Nebula & Bio-Electric Discharges */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Layer 2: Full-Viewport Interactive Vector SVG Connectome */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        data-testid="phenomena-network-svg"
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleSvgMouseDown}
        onMouseMove={handleSvgMouseMove}
        onMouseUp={handleSvgMouseUp}
        onMouseLeave={handleSvgMouseLeave}
        onWheel={handleSvgWheel}
        role="region"
        aria-label="Interaktives Phänomen- und Störungs-Graphennetzwerk im Vollbild"
      >
        <defs>
          <pattern id="obsidian-star-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#1E293B"
              strokeWidth="0.45"
              strokeOpacity="0.22"
            />
            <circle cx="24" cy="24" r="0.7" fill="#38BDF8" fillOpacity="0.3" />
          </pattern>

          {/* Directional Signal Arrowhead Marker for Active Synapses */}
          <marker
            id="signal-direction-chevron"
            viewBox="0 0 12 12"
            refX="9"
            refY="6"
            markerWidth="6.5"
            markerHeight="6.5"
            orient="auto"
          >
            <path
              d="M 1 2 L 10 6 L 1 10 L 3.4 6 Z"
              fill="#FFFFFF"
              stroke="#38BDF8"
              strokeWidth="0.8"
            />
          </marker>

          {/* Intense Bioluminescent Bloom Filter for Active & Hub Nodes */}
          <filter id="hyper-node-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blurOuter" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blurInner" />
            <feMerge>
              <feMergeNode in="blurOuter" />
              <feMergeNode in="blurInner" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Subtle Bloom Filter for Basal Nodes */}
          <filter id="basal-node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          data-bg="true"
          width={width}
          height={height}
          fill="url(#obsidian-star-grid)"
        />

        <g
          transform={`translate(${pan.x + width / 2}, ${pan.y + height / 2}) scale(${zoom}) translate(${-width / 2}, ${-height / 2})`}
        >
          {/* =====================================================================
              MODE A: RADIAL ASTRONOMICAL WATER-BASIN ORBITS & 14 DOMAIN ARCHIPELAGO ISLANDS
          ===================================================================== */}
          {!isTimelineMode && (
            <>
              <ellipse
                cx={width / 2}
                cy={height / 2}
                rx={width * 0.175}
                ry={height * 0.185}
                fill="none"
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="4 6"
                strokeOpacity="0.45"
              />
              <ellipse
                cx={width / 2}
                cy={height / 2}
                rx={width * 0.325}
                ry={height * 0.335}
                fill="none"
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="6 6"
                strokeOpacity="0.45"
              />
              {showConditionNodes && (
                <ellipse
                  cx={width / 2}
                  cy={height / 2}
                  rx={width * 0.445}
                  ry={height * 0.435}
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="1.2"
                  strokeDasharray="8 6"
                  strokeOpacity="0.5"
                />
              )}

              {/* 14 AMDP Domain Archipelago Island Beacons ("Domänen-Archipel für mehr Übersicht") */}
              {showDomainIslands &&
                domainIslandClusters.map((island) => {
                  const isFocusDomain = activeNodeObj?.domainId === island.domainId;
                  return (
                    <g
                      key={island.domainId}
                      transform={`translate(${island.cx}, ${island.cy})`}
                      className="pointer-events-none"
                    >
                      <ellipse
                        rx={66 + island.count * 10}
                        ry={48 + island.count * 7}
                        fill={island.color}
                        fillOpacity={isFocusDomain ? 0.09 : 0.035}
                        stroke={island.color}
                        strokeWidth={isFocusDomain ? 1.4 : 0.8}
                        strokeOpacity={isFocusDomain ? 0.55 : 0.24}
                        strokeDasharray="5 5"
                      />
                      <g transform={`translate(0, ${-(42 + island.count * 6)})`}>
                        <rect
                          x={-(island.shortName.length * 3.1 + 26)}
                          y="-8"
                          width={island.shortName.length * 6.2 + 52}
                          height="15"
                          rx="7.5"
                          fill="#040814"
                          fillOpacity={isFocusDomain ? 0.88 : 0.65}
                          stroke={island.color}
                          strokeWidth={isFocusDomain ? 1.2 : 0.7}
                          strokeOpacity={isFocusDomain ? 0.9 : 0.45}
                        />
                        <text
                          textAnchor="middle"
                          y="2.5"
                          fontSize="8.5"
                          fontFamily="JetBrains Mono, monospace"
                          fontWeight={600}
                          letterSpacing="0.06em"
                          fill={isFocusDomain ? '#FFFFFF' : island.color}
                          fillOpacity={isFocusDomain ? 0.98 : 0.85}
                        >
                          {island.code.replace('DOM-', '')} · {island.shortName.toUpperCase()}
                        </text>
                      </g>
                    </g>
                  );
                })}
            </>
          )}

          {/* =====================================================================
              MODE B: CHRONOLOGICAL 7-EPOCH TIMELINE STRATA & EVOLUTION TRAJECTORIES
              (From Ancient Melancholia 400 BCE to Modern RDoC Classification)
          ===================================================================== */}
          {isTimelineMode && (
            <g className="pointer-events-none">
              {/* Horizontal Stratum Divider between Upper Phenomena & Lower Etiological Conditions */}
              <line
                x1={78}
                y1={458}
                x2={width - 78}
                y2={458}
                stroke="#38BDF8"
                strokeWidth="1.1"
                strokeDasharray="6 6"
                strokeOpacity="0.4"
              />
              <rect
                x={82}
                y={122}
                width={255}
                height={17}
                rx={5}
                fill="#040814"
                fillOpacity="0.88"
                stroke="#38BDF8"
                strokeWidth="0.8"
                strokeOpacity="0.5"
              />
              <text
                x={92}
                y={133.5}
                fontSize="8.8"
                fontFamily="JetBrains Mono, monospace"
                fontWeight={600}
                fill="#38BDF8"
              >
                ▲ PHÄNOMEN-STRATUM (SUBJEKTIVES ERLEBEN)
              </text>

              <rect
                x={82}
                y={464}
                width={285}
                height={17}
                rx={5}
                fill="#040814"
                fillOpacity="0.88"
                stroke="#A855F7"
                strokeWidth="0.8"
                strokeOpacity="0.5"
              />
              <text
                x={92}
                y={475.5}
                fontSize="8.8"
                fontFamily="JetBrains Mono, monospace"
                fontWeight={600}
                fill="#C084FC"
              >
                ▼ NOSOLOGIE & ÄTIOLOGIE-STRATUM (KRANKHEITEN)
              </text>

              {/* Chronological Time Arrow Axis along the Top */}
              <line
                x1={105}
                y1={90}
                x2={width - 85}
                y2={90}
                stroke="#475569"
                strokeWidth="2"
                markerEnd="url(#signal-direction-chevron)"
              />

              {/* 7 Historical Epoch Columns */}
              {timelineLayout.columns.map((col) => {
                const { epoch, x, width: colW, isActiveEpoch, isReached } = col;
                return (
                  <g key={epoch.id} transform={`translate(${x}, 0)`}>
                    {/* Column Vertical Water-Basin Corridor */}
                    <rect
                      x={-colW * 0.48}
                      y={66}
                      width={colW * 0.96}
                      height={528}
                      rx={16}
                      fill={epoch.color}
                      fillOpacity={isActiveEpoch ? 0.085 : isReached ? 0.028 : 0.01}
                      stroke={epoch.color}
                      strokeWidth={isActiveEpoch ? 1.8 : 0.8}
                      strokeOpacity={isActiveEpoch ? 0.75 : isReached ? 0.28 : 0.12}
                      strokeDasharray={isActiveEpoch ? undefined : '5 5'}
                    />

                    {/* Central Chronological Meridian Line */}
                    <line
                      x1={0}
                      y1={116}
                      x2={0}
                      y2={584}
                      stroke={epoch.color}
                      strokeWidth={isActiveEpoch ? 1.4 : 0.75}
                      strokeOpacity={isActiveEpoch ? 0.55 : isReached ? 0.24 : 0.1}
                      strokeDasharray="3 5"
                    />

                    {/* Top Epoch Header Banner */}
                    <g transform="translate(0, 90)">
                      <rect
                        x={-colW * 0.46}
                        y={-24}
                        width={colW * 0.92}
                        height={44}
                        rx={10}
                        fill="#040814"
                        fillOpacity={isActiveEpoch ? 0.95 : 0.84}
                        stroke={epoch.color}
                        strokeWidth={isActiveEpoch ? 2 : 1}
                        strokeOpacity={isActiveEpoch ? 1 : isReached ? 0.65 : 0.3}
                      />
                      <text
                        textAnchor="middle"
                        y={-8}
                        fontSize="9.2"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight={700}
                        fill={isActiveEpoch ? '#FFFFFF' : epoch.accentColor}
                      >
                        EPOCHE {epoch.roman} · {epoch.keyYearLabel}
                      </text>
                      <text
                        textAnchor="middle"
                        y={6}
                        fontSize="10.2"
                        fontWeight={700}
                        fill={isActiveEpoch ? epoch.accentColor : '#F1F5F9'}
                      >
                        {epoch.shortTitle}
                      </text>
                      <text
                        textAnchor="middle"
                        y={16}
                        fontSize="7.6"
                        fontFamily="JetBrains Mono, monospace"
                        fill="#94A3B8"
                      >
                        {col.phenomenonCount} Phän. · {col.conditionCount} Urs.
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* RDoC 6-Construct Convergence Targets on the Right Edge of Epoch VII */}
              {RDOC_MATRIX_PILLARS.map((pillar, pIdx) => {
                const ry = 158 + pIdx * 54;
                return (
                  <g
                    key={pillar.id}
                    transform={`translate(${width - 102}, ${ry})`}
                    opacity={timelineLayout.activeEpoch.id === 'rdoc_modern' ? 0.98 : 0.58}
                  >
                    <rect
                      x={-44}
                      y={-11}
                      width={88}
                      height={22}
                      rx={6}
                      fill="#040915"
                      stroke={pillar.color}
                      strokeWidth={timelineLayout.activeEpoch.id === 'rdoc_modern' ? 1.4 : 0.8}
                    />
                    <text
                      textAnchor="middle"
                      y={-1}
                      fontSize="7.8"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight={700}
                      fill={pillar.color}
                    >
                      {pillar.shortCode}
                    </text>
                    <text
                      textAnchor="middle"
                      y={8}
                      fontSize="6.8"
                      fill="#E2E8F0"
                    >
                      {pillar.id}
                    </text>
                  </g>
                );
              })}

              {/* Historical Evolution Trajectory Arcs (Connecting Ancient & Classical Precursors to RDoC) */}
              {timelineLayout.evolutionArcs.map((arc) => {
                const sNode = nodeMap.get(arc.sourceId);
                const tNode = nodeMap.get(arc.targetId);
                if (!sNode || !tNode) return null;

                const isFocusArc =
                  arc.sourceId === activeFocusId ||
                  arc.targetId === activeFocusId ||
                  arc.isCurrentEpochTarget;

                const dx = tNode.x - sNode.x;
                const c1x = sNode.x + dx * 0.42;
                const c1y = sNode.y - 18;
                const c2x = sNode.x + dx * 0.62;
                const c2y = tNode.y + 18;
                const evoPath = `M ${sNode.x},${sNode.y} C ${c1x},${c1y} ${c2x},${c2y} ${tNode.x},${tNode.y}`;

                return (
                  <g key={arc.id} opacity={arc.isUnlocked ? 1 : 0.14}>
                    <path
                      d={evoPath}
                      fill="none"
                      stroke={arc.color}
                      strokeWidth={isFocusArc ? 2.6 : 1.3}
                      strokeOpacity={isFocusArc ? 0.88 : 0.42}
                      strokeDasharray={isFocusArc ? '8 6' : '4 5'}
                      className={isFocusArc ? 'animate-synaptic-flow' : undefined}
                      markerEnd={isFocusArc ? 'url(#signal-direction-chevron)' : undefined}
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* Curved Bezier Synaptic Edges Oriented Along Active Signal Direction */}
          {edges.map((edge) => {
            const rawS = nodeMap.get(edge.source);
            const rawT = nodeMap.get(edge.target);
            if (!rawS || !rawT) return null;

            const isHighlighted =
              edge.source === activeFocusId || edge.target === activeFocusId;
            const isDimmed = activeFocusId && !isHighlighted;

            const reverseDir = isHighlighted && edge.target === activeFocusId;
            const startNode = reverseDir ? rawT : rawS;
            const endNode = reverseDir ? rawS : rawT;

            const strokeColor = isHighlighted
              ? edge.kind === 'phenomenon_link'
                ? '#38BDF8'
                : startNode.color
              : edge.kind === 'phenomenon_link'
              ? '#38BDF8'
              : '#334155';

            const midX = (rawS.x + rawT.x) / 2 + (height / 2 - (rawS.y + rawT.y) / 2) * 0.08;
            const midY = (rawS.y + rawT.y) / 2 + ((rawS.x + rawT.x) / 2 - width / 2) * 0.08;

            const dx = endNode.x - midX;
            const dy = endNode.y - midY;
            const dist = Math.hypot(dx, dy) || 1;
            const padEnd = isHighlighted ? endNode.radius + 5 : 0;
            const endX = endNode.x - (dx / dist) * padEnd;
            const endY = endNode.y - (dy / dist) * padEnd;

            const pathD = `M ${startNode.x},${startNode.y} Q ${midX},${midY} ${endX},${endY}`;

            // In 'focus' clarity mode, non-highlighted background edges are kept ultra-clean so the symbols & islands shine
            const bgOpacity =
              edgeClarityMode === 'focus'
                ? edge.kind === 'phenomenon_link'
                  ? 0.16
                  : 0.055
                : isDimmed
                ? 0.12
                : 0.34;

            return (
              <g key={edge.id}>
                {isHighlighted && (
                  <>
                    {/* Outer Ionized Synaptic Aura Sheath */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={
                        isActivelyInteracting
                          ? edge.weight > 0.85
                            ? 9
                            : 6.5
                          : edge.weight > 0.85
                          ? 6.5
                          : 4.5
                      }
                      strokeOpacity={isActivelyInteracting ? 0.34 : 0.2}
                    />
                    {/* Directional High-Voltage Electric Surge Stream */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth={
                        isActivelyInteracting
                          ? edge.weight > 0.85
                            ? 2.4
                            : 1.8
                          : edge.weight > 0.85
                          ? 1.7
                          : 1.2
                      }
                      strokeOpacity={isActivelyInteracting ? 0.92 : 0.68}
                      strokeDasharray={isActivelyInteracting ? '10 14 3 11' : '6 18'}
                      className={
                        isActivelyInteracting
                          ? 'animate-electric-surge'
                          : 'animate-synaptic-flow'
                      }
                    />
                  </>
                )}
                <path
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isHighlighted ? (edge.weight > 0.85 ? 2.5 : 1.8) : 0.85}
                  strokeOpacity={isHighlighted ? 0.94 : bgOpacity}
                  strokeDasharray={edge.kind === 'phenomenon_link' ? '5 4' : undefined}
                  markerEnd={isHighlighted ? 'url(#signal-direction-chevron)' : undefined}
                />
              </g>
            );
          })}

          {/* Nodes with Bespoke Symbols (<NodeSymbol />), Pulsating Activity & Smart Non-Overlapping Labels */}
          {nodes.map((node, idx) => {
            const isSelected = node.id === selectedNodeId;
            const isHovered = node.id === hoveredNodeId;
            const isConnected = connectedNodeIds.has(node.id);
            const timelineNodeInfo = isTimelineMode
              ? timelineLayout.nodeTargets.get(node.id)
              : undefined;

            const isLockedInTimeline = Boolean(
              isTimelineMode && timelineNodeInfo && !timelineNodeInfo.isUnlocked
            );
            const isEpochGenesisNode = Boolean(
              isTimelineMode && timelineNodeInfo && timelineNodeInfo.isCurrentEpoch
            );

            const isDimmed =
              isLockedInTimeline ||
              (!isTimelineMode && activeFocusId && !isConnected) ||
              (isTimelineMode && activeFocusId && !isConnected && !isEpochGenesisNode);

            const importance = Math.max(0.18, node.degree / maxDegree);
            const isHubNode = importance >= 0.56 || isEpochGenesisNode;
            const showFullBadge =
              labelMode === 'all' ||
              (labelMode === 'smart' &&
                (isSelected ||
                  isHovered ||
                  isEpochGenesisNode ||
                  (!isTimelineMode && (isConnected || importance >= 0.68)))) ||
              (labelMode === 'minimal' && (isSelected || isHovered));

            const showSubtleText =
              labelMode === 'smart' && !showFullBadge && !isLockedInTimeline;

            const pulseRadius =
              node.radius +
              4 +
              importance * 9 +
              (isSelected || isHovered || isEpochGenesisNode ? 8 : isConnected ? 3.5 : 0);

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onMouseEnter={() => {
                  setHoveredNodeId(node.id);
                  interactionSurgeRef.current = 1.0;
                }}
                onMouseLeave={() => setHoveredNodeId(null)}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setDraggingNodeId(node.id);
                  interactionSurgeRef.current = 1.0;
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  interactionSurgeRef.current = 1.0;
                  onSelectNode(node.id, node.type);
                }}
                role="button"
                tabIndex={0}
                aria-label={`${node.type === 'phenomenon' ? 'Phänomen' : 'Störung/Ursache'}: ${node.label} (${
                  timelineNodeInfo ? `${timelineNodeInfo.meta.yearLabel}, ` : ''
                }${node.subLabel})`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    interactionSurgeRef.current = 1.0;
                    onSelectNode(node.id, node.type);
                  }
                }}
                opacity={isLockedInTimeline ? 0.16 : isDimmed ? 0.36 : 1}
              >
                {/* 0. Epoch Genesis Golden Halo Ring when node belongs to the active historical epoch */}
                {isEpochGenesisNode && (
                  <circle
                    r={node.radius + 7}
                    fill="none"
                    stroke={timelineNodeInfo?.epoch.accentColor ?? '#FDE68A'}
                    strokeWidth="2.2"
                    strokeDasharray="4 3"
                    className="animate-reticle-spin"
                  />
                )}

                {/* 1. Continuous Pulsating Importance & Activity Aura Ring */}
                {intenseGlow && !isLockedInTimeline && (
                  <circle
                    r={pulseRadius}
                    fill={isEpochGenesisNode ? timelineNodeInfo?.epoch.color ?? node.color : node.color}
                    fillOpacity={
                      isSelected || isHovered
                        ? 0.34
                        : isEpochGenesisNode
                        ? 0.26
                        : isConnected
                        ? 0.16 + importance * 0.12
                        : 0.07 + importance * 0.1
                    }
                    stroke={node.color}
                    strokeWidth={isSelected || isHovered || isHubNode ? 1.5 : 0.8}
                    strokeOpacity={isSelected || isHovered ? 0.95 : 0.35 + importance * 0.45}
                    className={
                      isSelected || isHovered || isEpochGenesisNode || (isConnected && isHubNode)
                        ? 'animate-node-fast-pulse'
                        : 'animate-node-pulse'
                    }
                    style={{
                      animationDelay: `${(idx % 9) * -0.35}s`
                    }}
                  />
                )}

                {/* 2. Expanding Sonar Water-Ripple Waves for Active Focus & High-Centrality Hubs */}
                {intenseGlow &&
                  !isLockedInTimeline &&
                  (isSelected || isHovered || isEpochGenesisNode || (isHubNode && isConnected)) && (
                    <>
                      <circle
                        r={node.radius + 3}
                        fill="none"
                        stroke={
                          isSelected || isHovered
                            ? '#FFFFFF'
                            : isEpochGenesisNode
                            ? timelineNodeInfo?.epoch.accentColor ?? node.color
                            : node.color
                        }
                        strokeWidth={isSelected || isHovered ? 2.2 : 1.3}
                        className="animate-sonar-ripple"
                      />
                      {(isSelected || isHovered) && (
                        <circle
                          r={node.radius + 3}
                          fill="none"
                          stroke={node.color}
                          strokeWidth="1.6"
                          className="animate-sonar-ripple-delayed"
                        />
                      )}
                    </>
                  )}

                {/* 3. Rotating Harmonic Telemetry Reticle for Selected Node or Top Hubs */}
                {(isSelected || isHovered || (isHubNode && !isDimmed)) && (
                  <circle
                    r={node.radius + (isSelected || isHovered ? 9 : 5)}
                    fill="none"
                    stroke={isSelected || isHovered ? '#FFFFFF' : node.color}
                    strokeWidth={isSelected || isHovered ? 1.5 : 1}
                    strokeOpacity={isSelected || isHovered ? 0.95 : 0.65}
                    strokeDasharray={isSelected || isHovered ? '5 4 2 4' : '3 5'}
                    className={isSelected || isHovered ? 'animate-reticle-spin' : 'animate-reticle-reverse'}
                  />
                )}

                {/* 4. Bespoke Semantic Node Medallion & Miniature Vector Illustration */}
                <g
                  filter={
                    isSelected || isHovered || isConnected || isHubNode
                      ? 'url(#hyper-node-glow)'
                      : 'url(#basal-node-glow)'
                  }
                >
                  <NodeSymbol
                    node={node}
                    isSelected={isSelected}
                    isHovered={isHovered}
                    isConnected={isConnected}
                    isHubNode={isHubNode}
                  />
                </g>

                {/* 4.5 Chronological Year Tag above the Node Medallion in Timeline Mode */}
                {isTimelineMode && timelineNodeInfo && !isLockedInTimeline && (
                  <g transform={`translate(0, ${-(node.radius + 10)})`}>
                    <rect
                      x={-(timelineNodeInfo.meta.yearLabel.length * 2.8 + 7)}
                      y="-7"
                      width={timelineNodeInfo.meta.yearLabel.length * 5.6 + 14}
                      height="12.5"
                      rx="4"
                      fill={isEpochGenesisNode ? timelineNodeInfo.epoch.color : '#040814'}
                      fillOpacity="0.92"
                      stroke={timelineNodeInfo.epoch.color}
                      strokeWidth="0.9"
                    />
                    <text
                      textAnchor="middle"
                      y="2"
                      fontSize="7.8"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight={700}
                      fill={isEpochGenesisNode ? '#020617' : timelineNodeInfo.epoch.accentColor}
                    >
                      {timelineNodeInfo.meta.yearLabel}
                    </text>
                  </g>
                )}

                {/* 5. Smart Decluttered Node Labels */}
                {showFullBadge && (
                  <g transform={`translate(0, ${node.radius + 15})`}>
                    <rect
                      x={-Math.min(120, node.label.length * 3.25 + 11)}
                      y="-9"
                      width={Math.min(240, node.label.length * 6.5 + 22)}
                      height="17.5"
                      rx="5"
                      fill={isSelected || isHovered ? node.color : '#050914'}
                      fillOpacity={isSelected || isHovered ? 0.96 : 0.84}
                      stroke={
                        isSelected || isHovered
                          ? '#FFFFFF'
                          : isConnected || isEpochGenesisNode
                          ? node.color
                          : hexToRgba(node.color, 0.6)
                      }
                      strokeWidth={isSelected || isHovered ? 1.4 : 0.9}
                    />
                    <text
                      textAnchor="middle"
                      y="2.5"
                      fontSize="9.5"
                      fontWeight={isSelected || isHovered || isConnected || isEpochGenesisNode ? 600 : 500}
                      fill={isSelected || isHovered ? '#03060E' : '#F8FAFC'}
                    >
                      {isHubNode && !isSelected && !isHovered && !isTimelineMode ? '★ ' : ''}
                      {node.label.length > 26 ? `${node.label.slice(0, 24)}…` : node.label}
                    </text>
                  </g>
                )}

                {showSubtleText && (
                  <text
                    textAnchor="middle"
                    y={node.radius + 13}
                    fontSize="8.5"
                    fontWeight={500}
                    fill="#E2E8F0"
                    fillOpacity="0.72"
                    style={{ textShadow: '0 1px 4px rgba(0,0,0,0.95)' }}
                  >
                    {node.label.length > 20 ? `${node.label.slice(0, 18)}…` : node.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* FLOATING SEMI-TRANSPARENT COLLAPSIBLE HUD: EFFECTS & CAMERA DOCK (Bottom-Right) */}
      <div className="absolute bottom-3 right-3 z-20 flex flex-col items-end gap-2 max-w-[min(94vw,640px)]">
        {isHudExpanded && (
          <div className="p-2.5 bg-[#050812]/76 backdrop-blur-2xl border border-slate-700/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.65)] flex flex-wrap items-center justify-end gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={cycleWaterMode}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-medium transition-all whitespace-nowrap shrink-0 ${
                waterMode !== 'off'
                  ? 'border-cyan-400/60 bg-cyan-950/50 text-cyan-200 hover:bg-cyan-900/50'
                  : 'border-slate-700/70 bg-slate-900/60 text-slate-400 hover:bg-slate-800/70'
              }`}
              aria-label="Responsives Wasser und Lichtreflexionen umschalten"
            >
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {waterMode === 'vivid'
                  ? 'Wasser & Lichtreflexe: Intensiv'
                  : waterMode === 'calm'
                  ? 'Wasser & Lichtreflexe: Sanft'
                  : 'Wasser-Reflexe: Aus'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowDomainIslands((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-medium transition-all whitespace-nowrap shrink-0 ${
                showDomainIslands
                  ? 'border-emerald-400/60 bg-emerald-950/45 text-emerald-200 hover:bg-emerald-900/50'
                  : 'border-slate-700/70 bg-slate-900/60 text-slate-400 hover:bg-slate-800/70'
              }`}
              aria-label="Domänen-Inseln zur Orientierung ein- oder ausblenden"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showDomainIslands ? 'Domänen-Inseln: An' : 'Domänen-Inseln: Aus'}</span>
            </button>

            <button
              type="button"
              onClick={cycleDensityCloudMode}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-medium transition-all whitespace-nowrap shrink-0 ${
                densityCloudMode !== 'off'
                  ? 'border-teal-400/60 bg-teal-950/45 text-teal-200 hover:bg-teal-900/50'
                  : 'border-slate-700/70 bg-slate-900/60 text-slate-400 hover:bg-slate-800/70'
              }`}
              aria-label="Atmosphärische Phänomen-Dichte-Nebelwolken umschalten"
            >
              <CloudFog className="w-3.5 h-3.5 text-teal-400" />
              <span>
                {densityCloudMode === 'full'
                  ? 'Dichte-Wolken: Aktiv'
                  : densityCloudMode === 'contours'
                  ? 'Dichte-Wolken: Konturen'
                  : 'Dichte-Wolken: Aus'}
              </span>
            </button>

            <button
              type="button"
              onClick={cycleNebulaVeilMode}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-medium transition-all whitespace-nowrap shrink-0 ${
                nebulaVeilMode !== 'off'
                  ? 'border-indigo-400/60 bg-indigo-950/45 text-indigo-200 hover:bg-indigo-900/50'
                  : 'border-slate-700/70 bg-slate-900/60 text-slate-400 hover:bg-slate-800/70'
              }`}
              aria-label="Prozeduralen Perlin-Noise-Nebelschleier umschalten"
            >
              <Waves className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                {nebulaVeilMode === 'mystic'
                  ? 'Nebelschleier: Mystisch'
                  : nebulaVeilMode === 'subtle'
                  ? 'Nebelschleier: Sanft'
                  : 'Nebelschleier: Aus'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setElectricDischarges((v) => !v);
                interactionSurgeRef.current = 1.0;
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-medium transition-all whitespace-nowrap shrink-0 ${
                electricDischarges
                  ? 'border-amber-400/60 bg-amber-950/45 text-amber-200 hover:bg-amber-900/50'
                  : 'border-slate-700/70 bg-slate-900/60 text-slate-400 hover:bg-slate-800/70'
              }`}
              aria-label="Elektrische Synapsen-Entladungen umschalten"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{electricDischarges ? 'Entladung: Aktiv' : 'Entladung: Aus'}</span>
            </button>

            <button
              type="button"
              onClick={cycleParticleMode}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-medium transition-all whitespace-nowrap shrink-0 ${
                particleMode !== 'off'
                  ? 'border-sky-500/60 bg-sky-950/45 text-sky-200 hover:bg-sky-900/50'
                  : 'border-slate-700/70 bg-slate-900/60 text-slate-400 hover:bg-slate-800/70'
              }`}
              aria-label="Maus-reaktives Partikelsystem umschalten"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>
                {particleMode === 'high'
                  ? 'Partikel: Maus-Aktiv'
                  : particleMode === 'focus'
                  ? 'Partikel: Fokus'
                  : 'Partikel: Aus'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIntenseGlow((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-medium transition-all whitespace-nowrap shrink-0 ${
                intenseGlow
                  ? 'border-purple-500/60 bg-purple-950/45 text-purple-200 hover:bg-purple-900/50'
                  : 'border-slate-700/70 bg-slate-900/60 text-slate-400 hover:bg-slate-800/70'
              }`}
              aria-label="Pulsierenden Knoten-Glow umschalten"
            >
              <Flame className="w-3.5 h-3.5 text-purple-400" />
              <span>{intenseGlow ? 'Aktivitäts-Glow: Max' : 'Glow: Dezent'}</span>
            </button>

            <button
              type="button"
              onClick={cycleLabelMode}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700/70 bg-slate-900/65 text-slate-200 hover:bg-slate-800/80 font-medium transition-colors whitespace-nowrap shrink-0"
              aria-label="Knoten-Beschriftungen umschalten"
            >
              <Tag className="w-3.5 h-3.5 text-sky-400" />
              <span>
                {labelMode === 'smart'
                  ? 'Labels: Fokus'
                  : labelMode === 'all'
                  ? 'Labels: Alle'
                  : 'Labels: Minimal'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowConditionNodes((v) => !v)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700/70 bg-slate-900/65 text-slate-200 hover:bg-slate-800/80 font-medium transition-colors whitespace-nowrap shrink-0"
              aria-label={showConditionNodes ? 'Ursachen-Knoten ausblenden' : 'Ursachen-Knoten einblenden'}
            >
              {showConditionNodes ? <Eye className="w-3.5 h-3.5 text-sky-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
              <span>{showConditionNodes ? 'Ursachen-Orbit' : 'Nur Phänomene'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSimulating((v) => !v)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-700/70 bg-slate-900/65 text-slate-200 hover:bg-slate-800/80 font-medium transition-colors whitespace-nowrap shrink-0"
              aria-label={isSimulating ? 'Physik-Simulation pausieren' : 'Physik-Simulation starten'}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isSimulating ? 'Kraftfeld' : 'Fixiert'}</span>
            </button>
          </div>
        )}

        {/* Always-accessible Compact Floating Camera, Clarity & Water-Reflection Toggle Pill */}
        <div className="flex flex-wrap items-center justify-end gap-1.5 px-2.5 py-1.5 bg-[#050812]/78 backdrop-blur-xl border border-slate-700/60 rounded-xl text-[11px] text-slate-200 shadow-lg">
          {!isTimelineMode && activeNodeObj && (
            <span className="hidden md:inline-flex items-center gap-1 text-amber-300 font-mono pr-1.5 border-r border-slate-700/70">
              ⚡ {activeNodeObj.label.slice(0, 16)} ➔ {Math.max(0, connectedNodeIds.size - 1)} Ziele
            </span>
          )}

          {!isTimelineMode && (
            <>
              <button
                type="button"
                onClick={() => handleToggleTimeline()}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border font-semibold transition-all border-amber-400/60 bg-amber-950/50 text-amber-200 hover:bg-amber-900/60"
                aria-pressed={isTimelineMode}
                title="Historischen Zeitstrahl-Modus (400 v. Chr. bis RDoC) umschalten"
              >
                <History className="w-3.5 h-3.5" />
                <span>Zeitstrahl-Ansicht</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setEdgeClarityMode((m) => (m === 'focus' ? 'all' : 'focus'))
                }
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border font-medium transition-all ${
                  edgeClarityMode === 'focus'
                    ? 'border-emerald-400/60 bg-emerald-950/50 text-emerald-200'
                    : 'border-slate-700/70 bg-slate-900/70 text-slate-300'
                }`}
                title="Zwischen aufgeräumtem Fokus-Netz und allen Synapsen wechseln"
              >
                <Compass className="w-3 h-3 text-emerald-400" />
                <span>{edgeClarityMode === 'focus' ? 'Übersicht: Fokus' : 'Alle Synapsen'}</span>
              </button>

              <button
                type="button"
                onClick={cycleWaterMode}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border font-medium transition-all ${
                  waterMode !== 'off'
                    ? 'border-cyan-400/60 bg-cyan-950/50 text-cyan-200'
                    : 'border-slate-700/70 bg-slate-900/70 text-slate-400'
                }`}
                title="Responsives Wasser & Lichtreflexionen umschalten"
              >
                <Droplets className="w-3 h-3 text-cyan-400" />
                <span>{waterMode === 'vivid' ? 'Wasser: Aktiv' : waterMode === 'calm' ? 'Wasser: Sanft' : 'Wasser: Aus'}</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(2.6, +(z + 0.2).toFixed(2)))}
            data-testid="graph-zoom-in-btn"
            className="p-1 rounded-md hover:bg-slate-800/80 text-slate-200 transition-colors"
            aria-label="Netzwerk vergrößern"
            title="Vergrößern"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-[10px] text-slate-400 tabular-nums">
            {Math.round(zoom * 100)}%
          </span>

          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(2)))}
            className="p-1 rounded-md hover:bg-slate-800/80 text-slate-200 transition-colors"
            aria-label="Netzwerk verkleinern"
            title="Verkleinern"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleResetView}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-800/80 text-slate-200 font-medium transition-colors"
            aria-label="Netzwerk-Ansicht zurücksetzen"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Kalibrieren</span>
          </button>

          {!isTimelineMode && (
            <button
              type="button"
              onClick={() => setIsLegendExpanded((v) => !v)}
              className="px-2 py-1 rounded-md border border-slate-700/60 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 font-mono text-[10px] transition-colors"
            >
              {isLegendExpanded ? 'Legende ▾' : 'Legende ▴'}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsHudExpanded((v) => !v)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border font-medium transition-all ${
              isHudExpanded
                ? 'border-sky-400/70 bg-sky-950/60 text-sky-200'
                : 'border-slate-700/70 bg-slate-900/70 text-sky-300 hover:bg-slate-800/80'
            }`}
            aria-expanded={isHudExpanded}
          >
            <Sliders className="w-3 h-3" />
            <span>Effekte</span>
            {isHudExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
        </div>

        {/* Collapsible Semi-Transparent Signal & Topology Legend Pill */}
        {isLegendExpanded && (
          <div className="px-3 py-1.5 bg-[#050812]/72 backdrop-blur-xl border border-slate-800/70 rounded-xl text-[10.5px] text-slate-300 flex flex-wrap items-center gap-2 shadow-md">
            <span className="font-mono font-semibold text-sky-400">TOPOLOGIE:</span>
            <span>● <strong className="text-white">Phänomen-Symbolmedaillon</strong></span>
            <span>·</span>
            <span>❖ <strong className="text-white">Ursachen-Oktogon</strong></span>
            <span>·</span>
            <span className="text-amber-300">⏳ 7 Epochen (400 v.Chr. ➔ RDoC)</span>
            <span>·</span>
            <span className="text-cyan-300">💧 Wasser-Lichtreflexe & Maus-Wellen</span>
          </div>
        )}
      </div>

      {/* FLOATING INTERACTIVE HISTORICAL TIMELINE SCRUBBER DOCK (Bottom-Center) */}
      {isTimelineMode && (
        <HistoricalTimelineDock
          activeEpochId={currentEpochId}
          onSelectEpoch={(epId) => {
            setIsTimelinePlaying(false);
            handleChangeEpoch(epId);
          }}
          filterScope={timelineFilterScope}
          onToggleFilterScope={() =>
            setTimelineFilterScope((s) => (s === 'cumulative' ? 'epoch_only' : 'cumulative'))
          }
          isPlaying={isTimelinePlaying}
          onTogglePlay={() => setIsTimelinePlaying((p) => !p)}
          columns={timelineLayout.columns}
          unlockedPhenomenaCount={timelineLayout.unlockedPhenomenaCount}
          unlockedConditionsCount={timelineLayout.unlockedConditionsCount}
          onSelectEntity={onSelectNode}
          onExitTimelineMode={() => handleToggleTimeline(false)}
        />
      )}
    </div>
  );
};

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) {
    return `rgba(56, 189, 248, ${alpha})`;
  }
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hexToRgbTuple(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) {
    return [56, 189, 248];
  }
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16)
  ];
}
