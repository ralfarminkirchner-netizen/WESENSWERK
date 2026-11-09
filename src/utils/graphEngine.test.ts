import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterPhenomena,
  rankConditionsByPhenomena,
  buildBipartiteGraph,
  stepForceSimulation,
  computePhenomenonDensityClusters,
  stepMouseReactiveParticle,
  computeDomainArchipelagoCenters,
  spawnWaterRipple,
  stepWaterRipples,
  evaluateWaterSurfaceAt,
  WaterRippleWave,
  computeHistoricalTimelineLayout,
  stepTimelineMorphSimulation,
  buildCategoryPrevalenceMatrix,
  ALL_CONDITION_CATEGORIES,
  buildConditionAssociationHeatmap,
  classifyHeatmapIntensityTier,
  computeLinkEvidenceConfidence,
  classifyEvidenceConsensusTier,
  evaluateClinicalSimulationState
} from './graphEngine';
import { ALL_PHENOMENA, CONDITIONS_DATA, PHENOMENON_DOMAINS } from '../data/index';
import { HISTORICAL_EPOCHS, PHENOMENON_HISTORICAL_META, CONDITION_HISTORICAL_META } from '../data/historicalTimeline';
import { CLINICAL_SIMULATION_PROFILES } from '../data/clinicalSimulations';

test('dataset integrity: all 14 domains and >= 30 phenomena are populated with valid condition links', () => {
  assert.equal(PHENOMENON_DOMAINS.length, 14);
  assert.ok(ALL_PHENOMENA.length >= 30, `Expected >= 30 phenomena, got ${ALL_PHENOMENA.length}`);
  assert.ok(CONDITIONS_DATA.length >= 18, `Expected >= 18 conditions, got ${CONDITIONS_DATA.length}`);

  const conditionIds = new Set(CONDITIONS_DATA.map((c) => c.id));
  const phenomenonIds = new Set(ALL_PHENOMENA.map((p) => p.id));

  for (const p of ALL_PHENOMENA) {
    assert.ok(p.conditions.length >= 2, `Phenomenon ${p.id} must link to at least 2 conditions`);
    for (const assoc of p.conditions) {
      assert.ok(
        conditionIds.has(assoc.conditionId),
        `Unknown conditionId ${assoc.conditionId} in phenomenon ${p.id}`
      );
    }
    for (const rel of p.relatedPhenomenaIds) {
      assert.ok(
        phenomenonIds.has(rel),
        `Unknown relatedPhenomenaId ${rel} in phenomenon ${p.id}`
      );
    }
  }
});

test('filterPhenomena filters accurately by domain, condition category, and text search', () => {
  const perceptionOnly = filterPhenomena({ domainId: 'perception' });
  assert.ok(perceptionOnly.length >= 4);
  assert.ok(perceptionOnly.every((p) => p.domainId === 'perception'));

  const neurodivergentMatches = filterPhenomena({ conditionCategory: 'neurodivergent' });
  assert.ok(neurodivergentMatches.length >= 10);

  const searchHalluzination = filterPhenomena({ searchQuery: 'Stimmenhören' });
  assert.equal(searchHalluzination.length, 1);
  assert.equal(searchHalluzination[0].id, 'auditory_hallucinations_voices');
});

test('rankConditionsByPhenomena computes transdiagnostic differential ranking properly', () => {
  // Combining hyperfocus + executive paralysis + time distortion should rank ADHD at the very top
  const adhdCluster = rankConditionsByPhenomena([
    'hyperfocus_tunnel',
    'executive_paralysis',
    'subjective_time_distortion'
  ]);
  assert.ok(adhdCluster.length > 0);
  assert.equal(adhdCluster[0].condition.id, 'adhd');
  assert.equal(adhdCluster[0].matchedPhenomenaCount, 3);

  // Combining thought insertion + delusional perception + auditory hallucinations should rank Schizophrenia first
  const psychosisCluster = rankConditionsByPhenomena([
    'thought_insertion_withdrawal',
    'delusional_perception',
    'auditory_hallucinations_voices'
  ]);
  assert.equal(psychosisCluster[0].condition.id, 'schizophrenia');
  assert.equal(psychosisCluster[0].matchedPhenomenaCount, 3);
});

test('buildBipartiteGraph and stepForceSimulation produce finite bounded coordinates and domain archipelago centers', () => {
  const sectors = computeDomainArchipelagoCenters(1600, 920);
  assert.equal(sectors.size, 14);

  const { nodes, edges } = buildBipartiteGraph(ALL_PHENOMENA, true, 1600, 920);
  assert.ok(nodes.length > 40);
  assert.ok(edges.length > 80);

  const stepped = stepForceSimulation(nodes, edges, 1600, 920, 0.3);
  assert.equal(stepped.length, nodes.length);
  for (const n of stepped) {
    assert.ok(Number.isFinite(n.x) && Number.isFinite(n.y));
    assert.ok(n.x >= 0 && n.x <= 1600);
    assert.ok(n.y >= 0 && n.y <= 920);
  }
});

test('perlin3D and fbm3D generate smooth, continuous, bounded procedural noise for nebula waves', async () => {
  const { perlin3D, fbm3D } = await import('./perlinNoise');
  for (let i = 0; i < 50; i++) {
    const x = i * 0.13;
    const y = i * 0.09;
    const z = i * 0.05;
    const p = perlin3D(x, y, z);
    const f = fbm3D(x, y, z, 3);
    assert.ok(p >= -1.01 && p <= 1.01, `perlin3D out of bounds: ${p}`);
    assert.ok(f >= 0 && f <= 1, `fbm3D out of bounds: ${f}`);
  }
  // Verify spatial continuity (small step produces small delta)
  const f1 = fbm3D(1.25, 2.4, 0.5, 3);
  const f2 = fbm3D(1.255, 2.402, 0.5, 3);
  assert.ok(Math.abs(f1 - f2) < 0.05, `Expected smooth continuity, got delta ${Math.abs(f1 - f2)}`);
});

test('computePhenomenonDensityClusters and stepMouseReactiveParticle model phenomenon density clouds and cursor kinetics', () => {
  const { nodes } = buildBipartiteGraph(ALL_PHENOMENA, true, 1600, 920);
  const clouds = computePhenomenonDensityClusters(nodes, 1600, 920);

  // Should produce a density cloud for each active phenomenon domain
  assert.equal(clouds.length, 14);
  for (const c of clouds) {
    assert.ok(c.densityScore >= 0.2 && c.densityScore <= 1.0);
    assert.ok(c.radiusX >= 90 && c.radiusY >= 80);
    assert.ok(Number.isFinite(c.cx) && Number.isFinite(c.cy));
  }

  // Test mouse-reactive particle physics when cursor is active near the particle
  const initialParticle = {
    x: 500,
    y: 340,
    px: 500,
    py: 340,
    vx: 0.1,
    vy: -0.1,
    baseSpeed: 0.03,
    r: 1.5,
    color: '#38BDF8',
    phase: 0,
    excitation: 0,
    localDensity: 0
  };

  const steppedNearMouse = stepMouseReactiveParticle(
    initialParticle,
    { x: 520, y: 350, vx: 8.5, vy: -4.2, active: true, radius: 210 },
    clouds,
    0.5,
    1600,
    920
  );

  assert.ok(steppedNearMouse.excitation > 0.5, 'Particle near active mouse should gain kinetic excitation');
  assert.notEqual(steppedNearMouse.x, initialParticle.x, 'Particle position should advance');
  assert.ok(steppedNearMouse.localDensity >= 0 && steppedNearMouse.localDensity <= 1);
});

test('spawnWaterRipple, stepWaterRipples, and evaluateWaterSurfaceAt model interactive water ripples and light reflection warping', () => {
  let ripples: WaterRippleWave[] = [];
  ripples = spawnWaterRipple(ripples, 800, 460, '#38BDF8', 1.2);
  assert.equal(ripples.length, 1);
  assert.equal(ripples[0].x, 800);
  assert.equal(ripples[0].y, 460);

  const stepped = stepWaterRipples(ripples, 0.1);
  assert.equal(stepped.length, 1);
  assert.ok(stepped[0].radius > ripples[0].radius, 'Water ripple wave must expand outward');

  const sampleCalm = evaluateWaterSurfaceAt(820, 465, 1.0, []);
  const sampleRippled = evaluateWaterSurfaceAt(800 + stepped[0].radius, 460, 1.0, stepped, {
    worldX: 805,
    worldY: 462,
    vx: 12,
    vy: -6,
    active: true
  });

  assert.ok(Number.isFinite(sampleRippled.height));
  assert.ok(Number.isFinite(sampleRippled.displacementX));
  assert.ok(Number.isFinite(sampleRippled.displacementY));
  assert.notEqual(
    sampleCalm.displacementX,
    sampleRippled.displacementX,
    'Active water ripple and mouse touch must warp surface reflection displacement'
  );
});

test('computeHistoricalTimelineLayout and stepTimelineMorphSimulation organize all phenomena and conditions from Ancient Melancholia to Modern RDoC', () => {
  assert.equal(HISTORICAL_EPOCHS.length, 7);
  assert.equal(HISTORICAL_EPOCHS[0].id, 'antiquity');
  assert.equal(HISTORICAL_EPOCHS[6].id, 'rdoc_modern');

  // Verify every single phenomenon and condition has explicit historical metadata
  for (const p of ALL_PHENOMENA) {
    assert.ok(
      PHENOMENON_HISTORICAL_META[p.id],
      `Missing explicit historical metadata for phenomenon ${p.id}`
    );
  }
  for (const c of CONDITIONS_DATA) {
    assert.ok(
      CONDITION_HISTORICAL_META[c.id],
      `Missing explicit historical metadata for condition ${c.id}`
    );
  }

  const { nodes } = buildBipartiteGraph(ALL_PHENOMENA, true, 1600, 920);

  // 1. Check Epoch I (Ancient Melancholia) cumulative layout
  const antiquityLayout = computeHistoricalTimelineLayout(nodes, 'antiquity', 'cumulative', 1600, 920);
  assert.equal(antiquityLayout.columns.length, 7);
  assert.ok(antiquityLayout.unlockedPhenomenaCount >= 5, 'Antiquity should unlock ancient phenomena');
  assert.ok(antiquityLayout.unlockedConditionsCount >= 4, 'Antiquity should unlock ancient conditions like Melancholia');
  assert.ok(
    antiquityLayout.unlockedPhenomenaCount < ALL_PHENOMENA.length,
    'Antiquity cumulative mode should not unlock modern RDoC phenomena yet'
  );

  // 2. Check Epoch VII (Modern RDoC) cumulative layout
  const rdocLayout = computeHistoricalTimelineLayout(nodes, 'rdoc_modern', 'cumulative', 1600, 920);
  assert.equal(rdocLayout.unlockedPhenomenaCount, ALL_PHENOMENA.length);
  assert.equal(rdocLayout.unlockedConditionsCount, CONDITIONS_DATA.length);
  assert.ok(rdocLayout.evolutionArcs.length >= 15, 'Should generate historical evolution trajectory arcs');

  // Verify columns are strictly ordered left-to-right (antiquity on left, RDoC on right)
  for (let i = 1; i < rdocLayout.columns.length; i++) {
    assert.ok(
      rdocLayout.columns[i].x > rdocLayout.columns[i - 1].x,
      'Timeline epoch columns must be ordered strictly left to right'
    );
  }

  // 3. Check smooth coordinate morphing toward timeline targets
  const morphed = stepTimelineMorphSimulation(nodes, rdocLayout.nodeTargets, 0.5);
  assert.equal(morphed.length, nodes.length);
  const sampleTarget = rdocLayout.nodeTargets.get('major_depression')!;
  const beforeDist = Math.hypot(
    nodes.find((n) => n.id === 'major_depression')!.x - sampleTarget.targetX,
    nodes.find((n) => n.id === 'major_depression')!.y - sampleTarget.targetY
  );
  const afterDist = Math.hypot(
    morphed.find((n) => n.id === 'major_depression')!.x - sampleTarget.targetX,
    morphed.find((n) => n.id === 'major_depression')!.y - sampleTarget.targetY
  );
  assert.ok(afterDist <= beforeDist, 'stepTimelineMorphSimulation must move nodes toward their timeline target');
});

test('buildCategoryPrevalenceMatrix computes side-by-side prevalence comparison across all 6 diagnostic categories', () => {
  // 1. Empty state check
  const emptyMatrix = buildCategoryPrevalenceMatrix([]);
  assert.equal(emptyMatrix.totalSelectedPhenomena, 0);
  assert.equal(emptyMatrix.rows.length, 0);
  assert.equal(emptyMatrix.categories.length, 6);
  for (const catSummary of emptyMatrix.categories) {
    assert.equal(catSummary.coveredPhenomenaCount, 0);
    assert.equal(catSummary.coverageRatePct, 0);
  }

  // 2. Multi-phenomenon selection check
  const sampleIds = [
    'auditory_hallucinations_voices',
    'delusional_mood_salience',
    'derealization',
    'hyperfocus_tunnel'
  ];
  const matrix = buildCategoryPrevalenceMatrix(sampleIds);
  assert.equal(matrix.totalSelectedPhenomena, 4);
  assert.equal(matrix.rows.length, 4);
  assert.equal(matrix.categories.length, ALL_CONDITION_CATEGORIES.length);

  // Check auditory_hallucinations_voices row has psychiatric & substance/med matches
  const voicesRow = matrix.rows.find((r) => r.phenomenon.id === 'auditory_hallucinations_voices')!;
  assert.ok(voicesRow, 'Voices row must exist');
  assert.equal(voicesRow.cellsByCategory.psychisch.hasMatch, true);
  assert.equal(voicesRow.cellsByCategory.psychisch.dominantPrevalence, 'pathognomonisch');
  assert.ok(voicesRow.cellsByCategory.psychisch.peakPrevalenceRatePct >= 85);
  assert.equal(voicesRow.cellsByCategory.substanz_medikament.hasMatch, true);

  // Check hyperfocus_tunnel row has neurodivergent match as highest category
  const hyperfocusRow = matrix.rows.find((r) => r.phenomenon.id === 'hyperfocus_tunnel')!;
  assert.equal(hyperfocusRow.cellsByCategory.neurodivergent.hasMatch, true);
  assert.equal(hyperfocusRow.highestCategory, 'neurodivergent');

  // Check category summary metrics
  const psychCat = matrix.categories.find((c) => c.category === 'psychisch')!;
  assert.ok(psychCat.coveredPhenomenaCount >= 3);
  assert.ok(psychCat.coverageRatePct >= 75);
  assert.ok(psychCat.meanPrevalenceRatePct > 0);
  assert.ok(psychCat.topConditionId !== null);
});

test('buildConditionAssociationHeatmap computes weighted association matrix between phenomena and clinical conditions', () => {
  // 1. Empty selection
  const emptyHeatmap = buildConditionAssociationHeatmap([]);
  assert.equal(emptyHeatmap.totalSelectedPhenomena, 0);
  assert.equal(emptyHeatmap.columns.length, 0);
  assert.equal(emptyHeatmap.rows.length, 0);
  assert.equal(emptyHeatmap.peakCell, null);

  // 2. Intensity tier classification
  assert.equal(classifyHeatmapIntensityTier(0), 'none');
  assert.equal(classifyHeatmapIntensityTier(28), 'low');
  assert.equal(classifyHeatmapIntensityTier(52), 'moderate');
  assert.equal(classifyHeatmapIntensityTier(74), 'high');
  assert.equal(classifyHeatmapIntensityTier(91), 'critical');

  // 3. Multi-phenomenon selection (Kurt Schneider & Salience cluster)
  const psychosisIds = [
    'thought_insertion_withdrawal',
    'delusional_perception',
    'auditory_hallucinations_voices',
    'delusional_mood_salience'
  ];
  const heatmap = buildConditionAssociationHeatmap(psychosisIds, 'all', 8);
  assert.equal(heatmap.totalSelectedPhenomena, 4);
  assert.equal(heatmap.rows.length, 4);
  assert.ok(heatmap.columns.length > 0 && heatmap.columns.length <= 8);

  // First column should be schizophrenia with 100% coverage (4/4 phenomena)
  assert.equal(heatmap.columns[0].condition.id, 'schizophrenia');
  assert.equal(heatmap.columns[0].matchedCount, 4);
  assert.equal(heatmap.columns[0].coveragePct, 100);
  assert.ok(heatmap.columns[0].meanWeightedAssociationPct >= 80);

  // Verify cell values for thought_insertion_withdrawal x schizophrenia
  const thoughtRow = heatmap.rows.find((r) => r.phenomenon.id === 'thought_insertion_withdrawal')!;
  const schizoCell = thoughtRow.cellsByConditionId['schizophrenia'];
  assert.ok(schizoCell);
  assert.equal(schizoCell.hasAssociation, true);
  assert.equal(schizoCell.prevalence, 'pathognomonisch');
  assert.ok(schizoCell.weightedAssociationPct >= 85);
  assert.equal(schizoCell.intensityTier, 'critical');

  // Verify category filter works on heatmap columns
  const neuroHeatmap = buildConditionAssociationHeatmap(psychosisIds, 'neurologisch', 8);
  assert.ok(neuroHeatmap.columns.every((col) => col.condition.category === 'neurologisch'));
});

test('computeLinkEvidenceConfidence and classifyEvidenceConsensusTier evaluate scientific consensus and PubMed evidence strength', () => {
  assert.equal(classifyEvidenceConsensusTier(92).tier, 'level_1a');
  assert.equal(classifyEvidenceConsensusTier(80).tier, 'level_1b');
  assert.equal(classifyEvidenceConsensusTier(65).tier, 'level_2a');
  assert.equal(classifyEvidenceConsensusTier(45).tier, 'level_2b');

  // 1. High-consensus pathognomonic link: auditory_hallucinations_voices x schizophrenia
  const voicesSchiz = computeLinkEvidenceConfidence(
    'auditory_hallucinations_voices',
    'schizophrenia'
  );
  assert.equal(voicesSchiz.hasDirectLink, true);
  assert.equal(voicesSchiz.evidenceTier, 'level_1a');
  assert.ok(voicesSchiz.consensusScorePct >= 86, `Expected >= 86, got ${voicesSchiz.consensusScorePct}`);
  assert.ok(voicesSchiz.estimatedPubmedCount >= 1000);
  assert.equal(voicesSchiz.livePubmedVerified, false);
  assert.ok(voicesSchiz.pubmedSearchQuery.includes('Title/Abstract'));
  assert.ok(voicesSchiz.dimensions.literatureDensityPct >= 80);
  assert.ok(voicesSchiz.dimensions.diagnosticAnchoringPct >= 85);

  // 2. Live PubMed count override verification
  const voicesSchizLive = computeLinkEvidenceConfidence(
    'auditory_hallucinations_voices',
    'schizophrenia',
    4820
  );
  assert.equal(voicesSchizLive.livePubmedVerified, true);
  assert.equal(voicesSchizLive.estimatedPubmedCount, 4820);
  assert.ok(voicesSchizLive.consensusScorePct >= voicesSchiz.consensusScorePct);

  // 3. Unlinked pair returns hasDirectLink = false and 0% score
  const unlinked = computeLinkEvidenceConfidence('hyperfocus_tunnel', 'delirium');
  assert.equal(unlinked.hasDirectLink, false);
  assert.equal(unlinked.consensusScorePct, 0);
});

test('evaluateClinicalSimulationState iteratively updates phenomena, Bayesian multipliers, and the Association Heatmap across follow-up steps', () => {
  assert.ok(CLINICAL_SIMULATION_PROFILES.length >= 4);
  const validPhenIds = new Set(ALL_PHENOMENA.map((p) => p.id));
  const validCondIds = new Set(CONDITIONS_DATA.map((c) => c.id));

  // Verify every simulation profile references valid phenomena and conditions
  for (const prof of CLINICAL_SIMULATION_PROFILES) {
    assert.ok(prof.steps.length >= 3, `Profile ${prof.id} must have >= 3 follow-up steps`);
    for (const pid of prof.initialPhenomenaIds) {
      assert.ok(validPhenIds.has(pid), `Invalid initial phenomenonId ${pid} in ${prof.id}`);
    }
    for (const cid of prof.competingConditionIds) {
      assert.ok(validCondIds.has(cid), `Invalid competingConditionId ${cid} in ${prof.id}`);
    }
    for (const step of prof.steps) {
      assert.ok(step.options.length >= 2);
      for (const opt of step.options) {
        for (const ap of opt.addedPhenomenaIds) {
          assert.ok(validPhenIds.has(ap), `Invalid addedPhenomenaId ${ap} in ${prof.id}/${step.id}`);
        }
        for (const mc of Object.keys(opt.conditionMultipliers)) {
          assert.ok(validCondIds.has(mc), `Invalid conditionMultiplier key ${mc} in ${prof.id}/${step.id}`);
        }
      }
    }
  }

  // Test iterative walkthrough of Profile 1: Lena M. (Psychosis vs. Anti-NMDA Encephalitis)
  const nmdaProfile = CLINICAL_SIMULATION_PROFILES[0];

  // Step 0 (Baseline: 0 questions answered)
  const step0 = evaluateClinicalSimulationState(nmdaProfile, {});
  assert.equal(step0.answeredStepsCount, 0);
  assert.equal(step0.activePhenomenaIds.length, 3);
  assert.equal(step0.leadingHypothesis?.condition.id, 'schizophrenia');

  // Step 1: Select subacute viral prodrome with catatonia
  const step1 = evaluateClinicalSimulationState(nmdaProfile, {
    step_1_onset: 'opt_viral_subacute'
  });
  assert.equal(step1.answeredStepsCount, 1);
  assert.ok(step1.activePhenomenaIds.includes('catatonia_stupor_mutism'));
  assert.ok((step1.conditionMultipliers['autoimmune_encephalitis'] ?? 1) > 1.3);
  assert.ok((step1.conditionMultipliers['schizophrenia'] ?? 1) < 0.85);

  // Step 2 + 3: Select orofacial dyskinesias/brain fog + positive CSF Anti-NMDA IgG antibodies
  const step3 = evaluateClinicalSimulationState(nmdaProfile, {
    step_1_onset: 'opt_viral_subacute',
    step_2_motor_cognitive: 'opt_dyskinesia_brainfog',
    step_3_diagnostics: 'opt_csf_nmda_positive'
  });
  assert.equal(step3.answeredStepsCount, 3);
  assert.equal(step3.leadingHypothesis?.condition.id, 'autoimmune_encephalitis');
  assert.ok(
    (step3.leadingHypothesis?.rankDelta ?? 0) > 0,
    'Autoimmune encephalitis must climb in rank compared to baseline'
  );

  // Verify the simulated heatmap column #1 is now autoimmune_encephalitis with positive simulationDeltaPct
  assert.equal(step3.simulatedHeatmap.columns[0].condition.id, 'autoimmune_encephalitis');
  assert.ok(step3.simulatedHeatmap.columns[0].simulationDeltaPct > 0);

  // Verify individual heatmap cell for catatonia_stupor_mutism x autoimmune_encephalitis has positive simulationDeltaPct
  const catatoniaRow = step3.simulatedHeatmap.rows.find(
    (r) => r.phenomenon.id === 'catatonia_stupor_mutism'
  )!;
  assert.ok(catatoniaRow);
  const nmdaCell = catatoniaRow.cellsByConditionId['autoimmune_encephalitis'];
  assert.ok(nmdaCell);
  assert.ok(nmdaCell.weightedAssociationPct > nmdaCell.baselineWeightedAssociationPct);
  assert.ok(nmdaCell.simulationDeltaPct > 0);
});








