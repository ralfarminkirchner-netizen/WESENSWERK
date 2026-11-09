import React from 'react';
import { PHENOMENON_DOMAINS } from '../data/index';
import { PhenomenonDomainId } from '../data/types';

interface PhenomenonArtworkProps {
  phenomenonId: string;
  domainId: PhenomenonDomainId;
  visualArchetype?: string;
  className?: string;
  compact?: boolean;
}

// Anatomical cranial/cortical profile path centered around (200, 125)
const HEAD_PROFILE =
  'M 162,195 C 162,175 154,162 146,154 C 136,145 129,140 129,133 C 129,127 136,124 138,118 C 140,111 131,105 133,98 C 135,91 144,88 146,79 C 150,55 172,38 202,38 C 238,38 262,62 262,98 C 262,126 246,148 232,164 C 224,174 222,186 222,195';

const BRAIN_GYRI =
  'M 162,88 C 168,68 188,55 212,58 C 234,60 246,78 244,102 C 242,120 226,134 208,134 C 194,134 184,126 176,126 C 166,126 158,112 162,88 Z';

export const PhenomenonArtwork: React.FC<PhenomenonArtworkProps> = ({
  phenomenonId,
  domainId,
  className = '',
  compact = false
}) => {
  const domain = PHENOMENON_DOMAINS.find((d) => d.id === domainId);
  const accent = domain?.color ?? '#38BDF8';
  const uid = `art-${phenomenonId}`;

  const renderMasterpiece = () => {
    switch (phenomenonId) {
      case 'quantitative_vigilance_reduction':
        // Submerging consciousness: luminous neural crown sinking beneath dense horizontal abyssal strata
        return (
          <g>
            <path d={HEAD_PROFILE} fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity="0.45" />
            <path d={BRAIN_GYRI} fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="204" cy="86" r="24" fill={`url(#glow-${uid})`} />
            <circle cx="204" cy="86" r="5" fill="#F8FAFC" />
            {[112, 128, 144, 160, 176, 192].map((y, i) => (
              <g key={y}>
                <path
                  d={`M 25,${y} Q 115,${y - 8 + (i % 2) * 16} 200,${y} T 375,${y}`}
                  fill="none"
                  stroke={i < 2 ? accent : '#64748B'}
                  strokeWidth={1.8 - i * 0.18}
                  strokeOpacity={0.75 - i * 0.1}
                />
                <rect
                  x="20"
                  y={y}
                  width="360"
                  height="22"
                  fill="#06080E"
                  fillOpacity={0.22 + i * 0.1}
                />
              </g>
            ))}
          </g>
        );

      case 'consciousness_narrowing':
        // Laser-sharp conical aperture slicing through an occluded starfield into a single hyper-illuminated focal point
        return (
          <g>
            <g className="animate-slow-spin" opacity="0.28">
              <circle cx="200" cy="125" r="88" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="2 8" />
              <circle cx="200" cy="125" r="68" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="6 6" />
            </g>
            <polygon points="200,18 134,225 266,225" fill={`url(#beam-${uid})`} />
            <line x1="200" y1="18" x2="134" y2="225" stroke={accent} strokeWidth="1.5" strokeOpacity="0.85" />
            <line x1="200" y1="18" x2="266" y2="225" stroke={accent} strokeWidth="1.5" strokeOpacity="0.85" />
            <circle cx="200" cy="158" r="26" fill="none" stroke={accent} strokeWidth="1.5" />
            <circle cx="200" cy="158" r="12" fill={accent} fillOpacity="0.35" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="200" cy="158" r="4" fill="#FFFFFF" />
            <path d="M 30,158 L 164,158 M 236,158 L 370,158" stroke="#334155" strokeWidth="1" strokeDasharray="3 5" />
          </g>
        );

      case 'consciousness_expansion_shift':
        // Sacred hyper-dimensional Merkaba / polyhedral prism bursting from the pineal/cortical center
        return (
          <g>
            <g className="animate-slow-spin">
              <circle cx="200" cy="125" r="92" fill="none" stroke={accent} strokeWidth="0.9" strokeDasharray="4 4" strokeOpacity="0.6" />
              <polygon
                points="200,28 284,172 116,172"
                fill={accent}
                fillOpacity="0.08"
                stroke={accent}
                strokeWidth="1.6"
              />
              <polygon
                points="200,222 284,78 116,78"
                fill="#F59E0B"
                fillOpacity="0.08"
                stroke="#F59E0B"
                strokeWidth="1.6"
              />
            </g>
            <path d={HEAD_PROFILE} fill="none" stroke="#E2E8F0" strokeWidth="1.4" strokeOpacity="0.65" />
            <circle cx="200" cy="105" r="36" fill={`url(#glow-${uid})`} />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1={200 + Math.cos(rad) * 14}
                  y1={105 + Math.sin(rad) * 14}
                  x2={200 + Math.cos(rad) * 86}
                  y2={105 + Math.sin(rad) * 86}
                  stroke={deg % 60 === 0 ? '#FDE68A' : accent}
                  strokeWidth={deg % 60 === 0 ? '1.4' : '0.8'}
                  strokeOpacity="0.55"
                />
              );
            })}
            <circle cx="200" cy="105" r="6" fill="#FFFFFF" />
          </g>
        );

      case 'disorientation_spacetime':
        // Fractured celestial astrolabe & non-Euclidean perspective grid with floating cardinal shards
        return (
          <g>
            <path
              d="M 40,195 L 140,125 L 360,145 L 260,210 Z"
              fill="none"
              stroke="#334155"
              strokeWidth="1.2"
            />
            <path
              d="M 75,55 L 215,35 L 330,115 L 185,125 Z"
              fill="none"
              stroke={accent}
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeOpacity="0.5"
            />
            <g className="animate-reverse-slow-spin">
              <circle cx="200" cy="118" r="64" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="18 8 4 8" />
              <circle cx="200" cy="118" r="44" fill="none" stroke="#F43F5E" strokeWidth="1.2" strokeDasharray="12 10" />
            </g>
            <polygon points="200,48 210,110 200,98 190,110" fill="#F43F5E" transform="rotate(42 200 118)" />
            <polygon points="200,188 210,126 200,138 190,126" fill={accent} transform="rotate(-19 200 118)" />
            <circle cx="200" cy="118" r="6" fill="#FFFFFF" />
            <text x="272" y="64" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">t ≠ t₀</text>
            <text x="98" y="178" fill="#F43F5E" fontSize="10" fontFamily="JetBrains Mono">Δx,y = ∞</text>
          </g>
        );

      case 'subjective_time_distortion':
        // Relativistic gravitational funnel warping clockwork rings into frozen stasis vs hyper-acceleration
        return (
          <g>
            <ellipse cx="200" cy="52" rx="95" ry="22" fill="none" stroke={accent} strokeWidth="1.6" />
            <ellipse cx="200" cy="86" rx="58" ry="14" fill="none" stroke={accent} strokeWidth="1.3" strokeDasharray="6 4" />
            <ellipse cx="200" cy="125" rx="18" ry="6" fill={accent} fillOpacity="0.4" stroke="#FFFFFF" strokeWidth="1.5" />
            <ellipse cx="200" cy="164" rx="58" ry="14" fill="none" stroke="#F59E0B" strokeWidth="1.3" strokeDasharray="3 3" />
            <ellipse cx="200" cy="198" rx="95" ry="22" fill="none" stroke="#F59E0B" strokeWidth="1.8" />
            <path d="M 105,52 C 145,95 182,110 182,125 C 182,140 145,155 105,198" fill="none" stroke="#94A3B8" strokeWidth="1.2" />
            <path d="M 295,52 C 255,95 218,110 218,125 C 218,140 255,155 295,198" fill="none" stroke="#94A3B8" strokeWidth="1.2" />
            <circle cx="200" cy="125" r="4.5" fill="#FFFFFF" />
          </g>
        );

      case 'cognitive_dysfunction_brain_fog':
        // Cortical connectome partially dissolved into luminous drifting spore-particles and broken synaptic bridges
        return (
          <g>
            <path d={HEAD_PROFILE} fill="none" stroke="#64748B" strokeWidth="1.4" />
            <path d={BRAIN_GYRI} fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" strokeDasharray="5 6" />
            {[
              [172, 78],
              [205, 68],
              [232, 86],
              [186, 108],
              [222, 114],
              [265, 62],
              [292, 88],
              [278, 122]
            ].map(([nx, ny], idx) => (
              <g key={idx}>
                <circle cx={nx} cy={ny} r={idx < 5 ? 5 : 3.5} fill={idx < 5 ? '#FFFFFF' : accent} fillOpacity={idx < 5 ? 0.9 : 0.45} />
                <circle cx={nx} cy={ny} r={idx < 5 ? 12 : 8} fill={accent} fillOpacity="0.12" />
              </g>
            ))}
            <path
              d="M 172,78 L 205,68 M 186,108 L 222,114 M 205,68 L 265,62 M 232,86 L 292,88"
              stroke={accent}
              strokeWidth="1.2"
              strokeDasharray="2 7"
            />
            <ellipse cx="218" cy="96" rx="76" ry="38" fill={`url(#glow-${uid})`} />
          </g>
        );

      case 'confabulation':
        // Kintsugi memory architecture: broken dark marble arch seamlessly bridged by luminous golden filigree threads
        return (
          <g>
            <path
              d="M 55,190 A 145,130 0 0 1 152,72"
              fill="none"
              stroke="#334155"
              strokeWidth="18"
              strokeLinecap="butt"
            />
            <path
              d="M 248,72 A 145,130 0 0 1 345,190"
              fill="none"
              stroke="#334155"
              strokeWidth="18"
              strokeLinecap="butt"
            />
            {/* Kintsugi gold lattice filling the amnesia void */}
            <polygon
              points="152,64 200,44 248,64 236,88 200,78 164,88"
              fill="#F59E0B"
              fillOpacity="0.22"
              stroke="#FBBF24"
              strokeWidth="2"
            />
            <path
              d="M 152,72 L 182,58 L 200,76 L 220,56 L 248,72 M 164,88 L 200,44 L 236,88"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="1.4"
            />
            <circle cx="200" cy="62" r="5" fill="#FFFFFF" />
            <circle cx="200" cy="62" r="28" fill={`url(#glow-${uid})`} />
          </g>
        );

      case 'deja_vu_jamais_vu':
        // Phase-shifted Möbius twin profiles: one hyper-familiar golden echo, one estranged spectral blueprint
        return (
          <g>
            <g transform="translate(-26, 0)">
              <path d={HEAD_PROFILE} fill="none" stroke="#F59E0B" strokeWidth="2" />
            </g>
            <g transform="translate(26, 0)">
              <path d={HEAD_PROFILE} fill="none" stroke={accent} strokeWidth="1.8" strokeDasharray="4 4" />
            </g>
            <path
              d="M 200,125 C 155,60 75,60 75,125 C 75,190 155,190 200,125 C 245,60 325,60 325,125 C 325,190 245,190 200,125 Z"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
            <circle cx="132" cy="125" r="18" fill="#F59E0B" fillOpacity="0.2" stroke="#FBBF24" strokeWidth="1.5" />
            <circle cx="268" cy="125" r="18" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="200" cy="125" r="6" fill="#FFFFFF" />
          </g>
        );

      case 'flight_of_ideas':
        // High-velocity bifurcating neural lightning tree erupting from the frontal lobe across the cosmos
        return (
          <g>
            <path d={HEAD_PROFILE} fill="none" stroke="#475569" strokeWidth="1.4" />
            <circle cx="168" cy="92" r="10" fill="#FFFFFF" />
            <circle cx="168" cy="92" r="32" fill={`url(#glow-${uid})`} />
            <path
              d="M 168,92 L 215,58 L 275,66 L 335,28 L 372,34 M 215,58 L 255,24 L 315,18 M 275,66 L 328,82 L 368,68"
              fill="none"
              stroke={accent}
              strokeWidth="2.2"
            />
            <path
              d="M 168,92 L 228,112 L 292,98 L 355,134 M 228,112 L 275,156 L 342,168 M 275,156 L 312,195"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.8"
            />
            <path
              d="M 168,92 L 118,52 L 62,38 M 118,52 L 75,84"
              fill="none"
              stroke="#EC4899"
              strokeWidth="1.6"
            />
            {[
              [372, 34],
              [315, 18],
              [368, 68],
              [355, 134],
              [342, 168],
              [62, 38]
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4.5" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
            ))}
          </g>
        );

      case 'thought_inhibition_retardation':
        // Dense concentric gravity rings compressing and braking a central thought pendulum
        return (
          <g>
            {[84, 68, 52, 36].map((r, i) => (
              <circle
                key={r}
                cx="200"
                cy="132"
                r={r}
                fill="none"
                stroke="#475569"
                strokeWidth={3.5 - i * 0.5}
                strokeOpacity={0.35 + i * 0.15}
              />
            ))}
            <line x1="200" y1="18" x2="182" y2="132" stroke="#E2E8F0" strokeWidth="2.5" />
            <circle cx="182" cy="132" r="16" fill="#0F172A" stroke={accent} strokeWidth="3" />
            <circle cx="182" cy="132" r="5" fill={accent} />
            <path d="M 212,122 L 252,122 M 212,134 L 268,134 M 212,146 L 244,146" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'thought_blocking_derailment':
        // Coherent harmonic sine-wave stream cleanly guillotined by a vertical obsidian fault-line
        return (
          <g>
            <path
              d="M 25,125 C 50,65 75,185 100,125 C 125,65 150,185 175,125 L 196,125"
              fill="none"
              stroke={accent}
              strokeWidth="3"
            />
            <path
              d="M 25,125 C 50,85 75,165 100,125 C 125,85 150,165 175,125"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />
            {/* Fault guillotine */}
            <line x1="200" y1="22" x2="200" y2="228" stroke="#F43F5E" strokeWidth="2.5" />
            <rect x="201" y="25" width="170" height="200" fill="#06080E" fillOpacity="0.82" />
            <circle cx="200" cy="125" r="8" fill="#F43F5E" />
            <circle cx="200" cy="125" r="26" fill="none" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3 4" />
            <line x1="224" y1="125" x2="355" y2="125" stroke="#334155" strokeWidth="1.5" strokeDasharray="2 10" />
          </g>
        );

      case 'incoherence_paralogia':
        // Deconstructed Babel prism: geometric syntax shards colliding in non-linear trajectories
        return (
          <g>
            <polygon points="85,68 148,42 132,118" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.8" />
            <polygon points="188,36 254,68 212,126 164,98" fill="#F59E0B" fillOpacity="0.16" stroke="#F59E0B" strokeWidth="1.8" />
            <polygon points="268,58 338,88 292,158" fill="#EC4899" fillOpacity="0.16" stroke="#EC4899" strokeWidth="1.8" />
            <polygon points="118,142 192,134 168,204" fill="#10B981" fillOpacity="0.16" stroke="#10B981" strokeWidth="1.8" />
            <path
              d="M 132,118 L 212,126 L 292,158 M 164,98 L 192,134"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1.2"
              strokeDasharray="4 5"
            />
            <circle cx="212" cy="126" r="5" fill="#FFFFFF" />
          </g>
        );

      case 'rumination_perseveration':
        // Hypnotic recursive labyrinth / Lorentz-attractor loop trapping a glowing thought particle
        return (
          <g>
            <g className="animate-slow-spin">
              {[86, 70, 54, 38, 22].map((r, idx) => (
                <circle
                  key={r}
                  cx="200"
                  cy="125"
                  r={r}
                  fill="none"
                  stroke={idx % 2 === 0 ? accent : '#818CF8'}
                  strokeWidth={2.2 - idx * 0.2}
                  strokeDasharray={`${r * 1.4} ${r * 0.35}`}
                />
              ))}
            </g>
            <circle cx="200" cy="125" r="10" fill="#F43F5E" />
            <circle cx="200" cy="125" r="32" fill={`url(#glow-${uid})`} />
          </g>
        );

      case 'obsessive_thoughts_impulses':
        // High-tension interlocking horological escapement wheels with an ego-dystonic crimson intrusion spike
        return (
          <g>
            <g className="animate-slow-spin">
              <circle cx="156" cy="122" r="48" fill="none" stroke={accent} strokeWidth="6" strokeDasharray="10 6" />
              <circle cx="156" cy="122" r="34" fill="none" stroke={accent} strokeWidth="1.5" />
            </g>
            <g className="animate-reverse-slow-spin">
              <circle cx="246" cy="128" r="42" fill="none" stroke="#F59E0B" strokeWidth="6" strokeDasharray="9 5" />
              <circle cx="246" cy="128" r="28" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
            </g>
            <polygon points="200,32 214,108 200,96 186,108" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="156" cy="122" r="6" fill="#FFFFFF" />
            <circle cx="246" cy="128" r="6" fill="#FFFFFF" />
          </g>
        );

      case 'flashbacks_intrusions':
        // High-energy temporal fracture: crimson memory shard shattering the present-time glass plane
        return (
          <g>
            <line x1="25" y1="145" x2="375" y2="145" stroke="#94A3B8" strokeWidth="2" />
            <polygon
              points="200,18 156,145 192,145 172,218 248,118 210,118"
              fill="#F43F5E"
              fillOpacity="0.88"
              stroke="#FFFFFF"
              strokeWidth="1.2"
            />
            <circle cx="192" cy="145" r="48" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="5 4" />
            <circle cx="192" cy="145" r="76" fill="none" stroke="#F43F5E" strokeWidth="1" strokeDasharray="2 6" />
            <path d="M 192,145 L 125,95 M 192,145 L 268,88 M 192,145 L 135,192" stroke="#FDE68A" strokeWidth="1.2" />
          </g>
        );

      case 'delusional_mood_salience':
        // Aberrant Salience constellation: mundane grid nodes suddenly igniting into an apophenic red-gold web
        return (
          <g>
            {[70, 135, 200, 265, 330].map((cx) =>
              [55, 125, 195].map((cy) => {
                const isSalient =
                  (cx === 135 && cy === 55) ||
                  (cx === 265 && cy === 125) ||
                  (cx === 200 && cy === 195) ||
                  (cx === 70 && cy === 125);
                return (
                  <g key={`${cx}-${cy}`}>
                    {isSalient && <circle cx={cx} cy={cy} r="26" fill="#F43F5E" fillOpacity="0.22" />}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSalient ? 7.5 : 3}
                      fill={isSalient ? '#FDE68A' : '#334155'}
                      stroke={isSalient ? '#F43F5E' : 'none'}
                      strokeWidth="2"
                    />
                  </g>
                );
              })
            )}
            <polygon
              points="70,125 135,55 265,125 200,195"
              fill="#F43F5E"
              fillOpacity="0.1"
              stroke="#F43F5E"
              strokeWidth="2"
            />
            <line x1="70" y1="125" x2="265" y2="125" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="4 3" />
          </g>
        );

      case 'delusional_perception':
        // Two-linked transformation: objective sensory geometry on left refracting through a singular beam into a sovereign revelation eye
        return (
          <g>
            <circle cx="96" cy="125" r="38" fill="none" stroke="#94A3B8" strokeWidth="2" />
            <line x1="96" y1="125" x2="96" y2="96" stroke="#E2E8F0" strokeWidth="2.5" />
            <line x1="96" y1="125" x2="120" y2="125" stroke="#E2E8F0" strokeWidth="2.5" />
            <path d="M 136,125 L 234,125" stroke="#F43F5E" strokeWidth="3" />
            <polygon points="234,117 248,125 234,133" fill="#F43F5E" />
            <polygon
              points="298,58 356,125 298,192 240,125"
              fill="#F43F5E"
              fillOpacity="0.16"
              stroke="#F43F5E"
              strokeWidth="2"
            />
            <ellipse cx="298" cy="125" rx="26" ry="14" fill="none" stroke="#FDE68A" strokeWidth="2" />
            <circle cx="298" cy="125" r="6" fill="#FFFFFF" />
          </g>
        );

      case 'persecutory_referential_delusion':
        // Panopticon vector field: multiple external optical lenses locking laser crosshairs onto a central figure
        return (
          <g>
            <circle cx="200" cy="125" r="22" fill="none" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="200" cy="125" r="8" fill="#FFFFFF" />
            {[
              [64, 52],
              [336, 52],
              [64, 198],
              [336, 198],
              [200, 32]
            ].map(([ex, ey], i) => (
              <g key={i}>
                <line x1={ex} y1={ey} x2="200" y2="125" stroke="#F43F5E" strokeWidth="1.2" strokeOpacity="0.7" strokeDasharray="5 4" />
                <ellipse cx={ex} cy={ey} rx="18" ry="10" fill="#0F172A" stroke={accent} strokeWidth="1.8" />
                <circle cx={ex} cy={ey} r="4.5" fill="#F43F5E" />
              </g>
            ))}
          </g>
        );

      case 'cotard_capgras_monothematic_delusions':
        // Dual monothematic study: hollow anatomical wireframe (Cotard negation) beside an identical mask with severed affective cord (Capgras)
        return (
          <g>
            <g transform="translate(-58, 0)">
              <path d={HEAD_PROFILE} fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 5" />
              <circle cx="200" cy="105" r="20" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="2 4" />
            </g>
            <g transform="translate(58, 0)">
              <path d={HEAD_PROFILE} fill={accent} fillOpacity="0.14" stroke={accent} strokeWidth="2" />
              <circle cx="200" cy="105" r="12" fill="#F43F5E" fillOpacity="0.4" stroke="#F43F5E" strokeWidth="1.5" />
            </g>
            <line x1="168" y1="125" x2="232" y2="125" stroke="#F43F5E" strokeWidth="2" strokeDasharray="3 4" />
            <line x1="192" y1="112" x2="208" y2="138" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="208" y1="112" x2="192" y2="138" stroke="#FFFFFF" strokeWidth="2.5" />
          </g>
        );

      case 'auditory_hallucinations_voices':
        // Corollary discharge breakdown: vocal acoustic interference rings converging into the temporal auditory cortex
        return (
          <g>
            <path d={HEAD_PROFILE} fill="none" stroke="#E2E8F0" strokeWidth="1.6" />
            <circle cx="208" cy="112" r="8" fill="#FFFFFF" />
            <circle cx="208" cy="112" r="28" fill={`url(#glow-${uid})`} />
            {[28, 46, 64, 82].map((r, i) => (
              <path
                key={`left-${r}`}
                d={`M ${125 - r * 0.6},${112 - r} A ${r},${r} 0 0 0 ${125 - r * 0.6},${112 + r}`}
                fill="none"
                stroke={accent}
                strokeWidth={2.4 - i * 0.35}
                strokeOpacity={0.9 - i * 0.15}
              />
            ))}
            {[28, 46, 64, 82].map((r, i) => (
              <path
                key={`right-${r}`}
                d={`M ${285 + r * 0.6},${112 - r} A ${r},${r} 0 0 1 ${285 + r * 0.6},${112 + r}`}
                fill="none"
                stroke="#EC4899"
                strokeWidth={2.4 - i * 0.35}
                strokeOpacity={0.9 - i * 0.15}
              />
            ))}
          </g>
        );

      case 'visual_hallucinations_illusions':
        // Optical crystalline prism projecting spectral geometric apparitions into dark space
        return (
          <g>
            <polygon
              points="125,48 72,182 178,182"
              fill={accent}
              fillOpacity="0.15"
              stroke="#E2E8F0"
              strokeWidth="2"
            />
            <line x1="22" y1="132" x2="98" y2="116" stroke="#FFFFFF" strokeWidth="2.5" />
            <polygon points="152,96 345,42 345,88 158,118" fill={accent} fillOpacity="0.22" />
            <polygon points="158,118 345,88 345,142 164,142" fill="#EC4899" fillOpacity="0.18" />
            <polygon points="164,142 345,142 345,198 172,164" fill="#F59E0B" fillOpacity="0.18" />
            <circle cx="298" cy="118" r="28" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeDasharray="4 3" />
            <circle cx="298" cy="118" r="8" fill="#FFFFFF" />
          </g>
        );

      case 'olfactory_gustatory_hallucinations':
        // Uncinate fit: rising iridescent vapor filaments swirling directly into the limbic uncus/amygdala
        return (
          <g>
            <path d={HEAD_PROFILE} fill="none" stroke="#64748B" strokeWidth="1.4" />
            <circle cx="192" cy="118" r="14" fill={accent} fillOpacity="0.35" stroke={accent} strokeWidth="2" />
            <path
              d="M 92,215 C 72,175 138,162 118,132 C 102,108 152,115 192,118"
              fill="none"
              stroke={accent}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 135,220 C 115,178 168,168 152,140 C 138,118 172,124 192,118"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 178,220 C 165,185 205,165 192,118"
              fill="none"
              stroke="#EC4899"
              strokeWidth="1.8"
              strokeDasharray="4 4"
            />
          </g>
        );

      case 'coenesthesia_bodily_hallucinations':
        // Somatic wireframe torso traversed by high-voltage bioelectric interference arcs
        return (
          <g>
            <path
              d="M 155,42 L 245,42 L 262,95 L 242,198 L 158,198 L 138,95 Z"
              fill={accent}
              fillOpacity="0.08"
              stroke={accent}
              strokeWidth="1.6"
            />
            <line x1="200" y1="42" x2="200" y2="198" stroke="#475569" strokeWidth="1.2" strokeDasharray="3 3" />
            <path
              d="M 118,78 L 176,92 L 158,118 L 234,106 L 212,144 L 284,158"
              fill="none"
              stroke="#F43F5E"
              strokeWidth="2.4"
            />
            {[
              [176, 92],
              [234, 106],
              [200, 72],
              [184, 156],
              [218, 168]
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="5" fill="#FDE68A" stroke="#F43F5E" strokeWidth="1.5" />
            ))}
          </g>
        );

      case 'depersonalization':
        // Out-of-body phase separation: solid anatomical profile watching its own luminous glass-shell double drift apart
        return (
          <g>
            <g transform="translate(-38, 8)">
              <path d={HEAD_PROFILE} fill="#1E293B" stroke="#94A3B8" strokeWidth="1.8" />
            </g>
            <g transform="translate(38, -10)">
              <path
                d={HEAD_PROFILE}
                fill={accent}
                fillOpacity="0.16"
                stroke={accent}
                strokeWidth="2.2"
                strokeDasharray="6 3"
              />
              <circle cx="204" cy="96" r="6" fill="#FFFFFF" />
            </g>
            <path
              d="M 158,104 L 234,86 M 164,138 L 240,120"
              stroke={accent}
              strokeWidth="1.4"
              strokeDasharray="3 4"
            />
          </g>
        );

      case 'derealization':
        // Translucent refractive glass barrier separating the observer from a wireframe 2D theatrical world
        return (
          <g>
            <g transform="translate(-75, 10) scale(0.88)">
              <path d={HEAD_PROFILE} fill="none" stroke="#E2E8F0" strokeWidth="2" />
            </g>
            {/* Refractive Glass Wall */}
            <polygon
              points="192,18 208,10 208,222 192,230"
              fill={accent}
              fillOpacity="0.24"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            {/* Flat 2D Wireframe Backdrop */}
            <polygon points="255,112 298,64 342,112" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 4" />
            <rect x="266" y="112" width="64" height="72" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="235" y1="184" x2="365" y2="184" stroke="#475569" strokeWidth="1" />
          </g>
        );

      case 'thought_insertion_withdrawal':
        // Ruptured ego-boundary membrane with exogenous vector spears piercing into and extracting from the cortex
        return (
          <g>
            <circle
              cx="200"
              cy="125"
              r="68"
              fill={accent}
              fillOpacity="0.08"
              stroke={accent}
              strokeWidth="2.2"
              strokeDasharray="10 7"
            />
            <path d={BRAIN_GYRI} fill="none" stroke="#E2E8F0" strokeWidth="1.4" strokeOpacity="0.6" />
            {/* Inward Insertion Vector */}
            <line x1="38" y1="68" x2="178" y2="112" stroke="#F43F5E" strokeWidth="3" />
            <polygon points="178,105 192,116 174,119" fill="#F43F5E" />
            {/* Outward Withdrawal / Broadcasting Vector */}
            <line x1="222" y1="128" x2="362" y2="172" stroke="#38BDF8" strokeWidth="3" />
            <polygon points="362,165 376,176 358,179" fill="#38BDF8" />
            <circle cx="200" cy="120" r="8" fill="#FFFFFF" />
          </g>
        );

      case 'anhedonia_loss_of_pleasure':
        // Eclipse of reward: radiant golden lotus/sun half-encased in monochromatic obsidian frost crystals
        return (
          <g>
            <circle cx="200" cy="125" r="58" fill={`url(#glow-${uid})`} />
            {/* Left warm vibrant side */}
            <path d="M 200,45 A 80,80 0 0 0 200,205 Z" fill={accent} fillOpacity="0.28" stroke={accent} strokeWidth="2" />
            {/* Right frozen crystalline grey side */}
            <polygon
              points="200,45 256,64 282,125 256,186 200,205"
              fill="#1E293B"
              stroke="#64748B"
              strokeWidth="2"
            />
            <line x1="200" y1="45" x2="256" y2="186" stroke="#475569" strokeWidth="1" />
            <line x1="200" y1="205" x2="256" y2="64" stroke="#475569" strokeWidth="1" />
            <line x1="200" y1="20" x2="200" y2="230" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="5 4" />
          </g>
        );

      case 'feeling_of_feelinglessness':
        // Petrified geometric polyhedron suspended in a vacuum chamber with flatlined zero-amplitude waves
        return (
          <g>
            <polygon
              points="200,46 262,88 238,182 162,182 138,88"
              fill="#0F172A"
              stroke="#94A3B8"
              strokeWidth="2"
            />
            <path
              d="M 200,46 L 200,182 M 138,88 L 262,88 M 138,88 L 200,132 L 262,88"
              fill="none"
              stroke="#475569"
              strokeWidth="1.2"
            />
            <line x1="25" y1="125" x2="138" y2="125" stroke={accent} strokeWidth="2" />
            <line x1="262" y1="125" x2="375" y2="125" stroke={accent} strokeWidth="2" />
            <circle cx="200" cy="118" r="5" fill="#64748B" />
          </g>
        );

      case 'parathymia_affect_incontinence':
        // Phase-inverted emotional masks with discordant harmonic and chaotic waveforms
        return (
          <g>
            <circle cx="152" cy="122" r="46" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <path d="M 130,136 Q 152,110 174,136" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
            <circle cx="248" cy="122" r="46" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="2" />
            <path d="M 226,112 Q 248,142 270,112" fill="none" stroke="#FDE68A" strokeWidth="2.5" />
            <line x1="172" y1="68" x2="228" y2="176" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 4" />
          </g>
        );

      case 'euphoria_expansive_mood':
        // Supernova corona: golden solar eruption expanding past all containment rings
        return (
          <g>
            <circle cx="200" cy="125" r="78" fill={`url(#glow-${uid})`} />
            <g className="animate-slow-spin">
              {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const len = deg % 40 === 0 ? 94 : 68;
                return (
                  <line
                    key={deg}
                    x1={200 + Math.cos(rad) * 26}
                    y1={125 + Math.sin(rad) * 26}
                    x2={200 + Math.cos(rad) * len}
                    y2={125 + Math.sin(rad) * len}
                    stroke={deg % 40 === 0 ? '#FDE68A' : accent}
                    strokeWidth={deg % 40 === 0 ? '2.4' : '1.4'}
                    strokeLinecap="round"
                  />
                );
              })}
            </g>
            <circle cx="200" cy="125" r="24" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        );

      case 'alexithymia_interoception':
        // High-amplitude visceral cardiac/insula signal hitting an undeciphered cryptographic matrix
        return (
          <g>
            <path
              d="M 28,125 L 78,125 L 96,62 L 118,188 L 142,84 L 160,125 L 195,125"
              fill="none"
              stroke={accent}
              strokeWidth="3"
            />
            <line x1="195" y1="35" x2="195" y2="215" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
            <rect x="220" y="65" width="135" height="120" rx="8" fill="#0F172A" stroke="#64748B" strokeWidth="1.8" />
            {[88, 112, 136, 160].map((y) => (
              <line key={y} x1="242" y1={y} x2="332" y2={y} stroke="#334155" strokeWidth="4" strokeDasharray="12 8 4 8" />
            ))}
          </g>
        );

      case 'ambivalence_affective_volitional':
        // Binary gravitational lock: two counter-rotating cores pulling a central nexus in exact opposite directions
        return (
          <g>
            <circle cx="110" cy="125" r="36" fill="#38BDF8" fillOpacity="0.16" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="290" cy="125" r="36" fill={accent} fillOpacity="0.16" stroke={accent} strokeWidth="2" />
            <line x1="110" y1="125" x2="290" y2="125" stroke="#FFFFFF" strokeWidth="2.5" />
            <polygon points="65,125 88,113 88,137" fill="#38BDF8" />
            <polygon points="335,125 312,113 312,137" fill={accent} />
            <circle cx="200" cy="125" r="14" fill="#06080E" stroke="#FFFFFF" strokeWidth="3" />
          </g>
        );

      case 'rejection_sensitive_dysphoria':
        // Microscopic external needle impact triggering a massive concentric crimson shockwave across the chest/insula
        return (
          <g>
            <line x1="35" y1="55" x2="168" y2="118" stroke="#E2E8F0" strokeWidth="2" />
            <polygon points="168,112 180,122 164,124" fill="#FFFFFF" />
            {[18, 38, 60, 84].map((r, i) => (
              <circle
                key={r}
                cx="215"
                cy="128"
                r={r}
                fill={i === 0 ? accent : 'none'}
                fillOpacity={i === 0 ? 0.5 : 0}
                stroke={accent}
                strokeWidth={3 - i * 0.5}
                strokeDasharray={i > 1 ? '6 4' : undefined}
              />
            ))}
          </g>
        );

      case 'abulia_drive_inhibition':
        // Massive obsidian monolith anchored to a flat horizon with an unignited spark chamber
        return (
          <g>
            <line x1="25" y1="188" x2="375" y2="188" stroke="#475569" strokeWidth="2" />
            <rect x="135" y="68" width="130" height="120" rx="4" fill="#0F172A" stroke="#64748B" strokeWidth="2.5" />
            <circle cx="200" cy="128" r="18" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="3 5" />
            <circle cx="200" cy="128" r="3" fill={accent} />
          </g>
        );

      case 'executive_paralysis':
        // High-RPM glowing turbine core physically decoupled by a 12mm gap from the transmission wheel
        return (
          <g>
            <g className="animate-slow-spin">
              <circle cx="132" cy="125" r="48" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="5" strokeDasharray="12 6" />
            </g>
            <circle cx="132" cy="125" r="12" fill="#FFFFFF" />
            <line x1="200" y1="38" x2="200" y2="212" stroke="#F43F5E" strokeWidth="2" strokeDasharray="5 5" />
            <circle cx="268" cy="125" r="48" fill="none" stroke="#475569" strokeWidth="5" strokeDasharray="12 6" />
            <circle cx="268" cy="125" r="10" fill="#334155" />
          </g>
        );

      case 'catatonia_stupor_mutism':
        // Crystalline geometric exoskeletal cage immobilizing a blazing high-voltage internal storm
        return (
          <g>
            <polygon
              points="200,28 282,75 282,175 200,222 118,175 118,75"
              fill="#0F172A"
              stroke="#E2E8F0"
              strokeWidth="3"
            />
            <polygon
              points="200,56 172,124 206,124 182,192 236,112 202,112"
              fill={accent}
              stroke="#FFFFFF"
              strokeWidth="1"
            />
            <circle cx="200" cy="125" r="48" fill={`url(#glow-${uid})`} />
          </g>
        );

      case 'echolalia_echopraxia':
        // Twin symmetrical acoustic/motor waveforms reflecting across a silver mirror axis
        return (
          <g>
            <path
              d="M 35,125 C 65,45 95,205 125,125 C 145,75 165,175 182,125"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="3"
            />
            <line x1="200" y1="25" x2="200" y2="225" stroke={accent} strokeWidth="2" strokeDasharray="6 4" />
            <path
              d="M 218,125 C 235,175 255,75 275,125 C 305,205 335,45 365,125"
              fill="none"
              stroke={accent}
              strokeWidth="3"
            />
          </g>
        );

      case 'psychomotor_agitation_hyperkinesia':
        // High-frequency kinetic seismograph oscillation with erratic energy arcs
        return (
          <g>
            <polyline
              points="25,125 58,42 86,208 118,32 148,214 178,28 208,218 238,38 268,204 298,48 328,192 372,125"
              fill="none"
              stroke={accent}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <circle cx="178" cy="28" r="5" fill="#FFFFFF" />
            <circle cx="208" cy="218" r="5" fill="#FFFFFF" />
          </g>
        );

      case 'premonitory_urge_tics':
        // Steeply building sensory pressure wave culminating in a vertical discharge spike and sudden calm
        return (
          <g>
            <path
              d="M 30,175 C 95,175 155,145 195,32 L 212,175 L 370,175"
              fill="none"
              stroke={accent}
              strokeWidth="3.5"
            />
            <circle cx="195" cy="32" r="9" fill="#FFFFFF" stroke={accent} strokeWidth="3" />
            <circle cx="195" cy="32" r="34" fill={`url(#glow-${uid})`} />
          </g>
        );

      case 'morning_low_circadian':
        // Shifted circadian phase wave: deep abyssal trough at dawn (04:00) rising to a golden zenith at night
        return (
          <g>
            <line x1="30" y1="125" x2="370" y2="125" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
            <path
              d="M 30,125 C 95,220 155,220 215,125 C 275,30 325,30 370,85"
              fill="none"
              stroke={accent}
              strokeWidth="3.5"
            />
            <circle cx="122" cy="194" r="9" fill="#0F172A" stroke="#F43F5E" strokeWidth="2.5" />
            <circle cx="298" cy="54" r="11" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.5" />
          </g>
        );

      case 'hypnagogic_sleep_paralysis':
        // Liminal REM threshold: immobilized horizontal body beneath a wide-awake cortical eye and dream crescent
        return (
          <g>
            <line x1="65" y1="182" x2="335" y2="182" stroke="#64748B" strokeWidth="8" strokeLinecap="round" />
            <ellipse cx="200" cy="102" rx="54" ry="26" fill="#0F172A" stroke={accent} strokeWidth="2.5" />
            <circle cx="200" cy="102" r="12" fill={accent} />
            <circle cx="200" cy="102" r="4" fill="#FFFFFF" />
            <path d="M 278,48 A 32,32 0 1 0 312,92 A 24,24 0 1 1 278,48 Z" fill="#C084FC" />
          </g>
        );

      case 'hyperfocus_tunnel':
        // Monotropic laser beam: scattered ambient frequencies focused by a crystal lens into a single blinding coherent beam
        return (
          <g>
            <line x1="25" y1="62" x2="142" y2="105" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="25" y1="125" x2="142" y2="125" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="25" y1="188" x2="142" y2="145" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 4" />
            <ellipse cx="148" cy="125" rx="14" ry="64" fill={accent} fillOpacity="0.24" stroke="#FFFFFF" strokeWidth="2" />
            <polygon points="162,121 372,112 372,138 162,129" fill={accent} />
            <line x1="162" y1="125" x2="372" y2="125" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="355" cy="125" r="28" fill={`url(#glow-${uid})`} />
          </g>
        );

      case 'sensory_overload_flooding':
        // Unfiltered P50 gating collapse: five overlapping high-frequency wave emitters crashing into an unshielded core
        return (
          <g>
            {[
              [125, 78, '#38BDF8'],
              [275, 78, '#F59E0B'],
              [125, 172, '#EC4899'],
              [275, 172, '#A855F7'],
              [200, 52, accent]
            ].map(([cx, cy, col], i) => (
              <g key={i}>
                <circle cx={Number(cx)} cy={Number(cy)} r="46" fill="none" stroke={String(col)} strokeWidth="1.8" strokeOpacity="0.75" />
                <circle cx={Number(cx)} cy={Number(cy)} r="68" fill="none" stroke={String(col)} strokeWidth="1.2" strokeDasharray="5 4" strokeOpacity="0.55" />
              </g>
            ))}
            <circle cx="200" cy="125" r="16" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="2.5" />
          </g>
        );

      case 'autistic_meltdown_shutdown':
        // Bifurcated autonomic crisis: left half eruptive plasma discharge (Meltdown), right half hermetically sealed vault (Shutdown)
        return (
          <g>
            <path
              d="M 190,125 L 75,45 M 190,125 L 48,125 M 190,125 L 75,205 M 190,125 L 118,32 M 190,125 L 118,218"
              stroke="#F43F5E"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 210,48 A 77,77 0 0 1 210,202 Z"
              fill="#0F172A"
              stroke={accent}
              strokeWidth="3"
            />
            <circle cx="238" cy="125" r="8" fill="#FFFFFF" />
          </g>
        );

      case 'stimming_self_regulation':
        // Harmonic Lissajous figure-eight oscillator generating calm concentric equilibrium rings
        return (
          <g>
            <circle cx="200" cy="125" r="88" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.35" />
            <circle cx="200" cy="125" r="68" fill="none" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
            <path
              d="M 200,125 C 155,62 88,62 88,125 C 88,188 155,188 200,125 C 245,62 312,62 312,125 C 312,188 245,188 200,125 Z"
              fill={accent}
              fillOpacity="0.16"
              stroke={accent}
              strokeWidth="3"
            />
            <circle cx="136" cy="125" r="6" fill="#FFFFFF" />
            <circle cx="264" cy="125" r="6" fill="#FFFFFF" />
          </g>
        );

      case 'masking_camouflaging':
        // Symmetrical porcelain architectural facade concealing an intricate polychromatic neural nebula behind it
        return (
          <g>
            <circle cx="168" cy="125" r="56" fill={`url(#glow-${uid})`} />
            <polygon
              points="118,62 188,44 218,125 182,202 112,184"
              fill="#F59E0B"
              fillOpacity="0.22"
              stroke="#F59E0B"
              strokeWidth="1.8"
            />
            <circle cx="158" cy="125" r="38" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="5 3" />
            <rect
              x="212"
              y="52"
              width="82"
              height="146"
              rx="40"
              fill="#1E293B"
              stroke="#E2E8F0"
              strokeWidth="2.5"
            />
            <line x1="234" y1="104" x2="248" y2="104" stroke="#E2E8F0" strokeWidth="2" />
            <line x1="262" y1="104" x2="276" y2="104" stroke="#E2E8F0" strokeWidth="2" />
            <path d="M 238,152 Q 253,164 268,152" fill="none" stroke="#E2E8F0" strokeWidth="2" />
          </g>
        );

      case 'synesthesia_crossmodal':
        // Chromatic acoustic-geometric transduction: musical staff frequencies crystallizing into luminous 3D polyhedra
        return (
          <g>
            {[72, 102, 132, 162, 192].map((x, i) => (
              <rect
                key={x}
                x={x}
                y={125 - (i % 2 === 0 ? 35 : 58)}
                width="12"
                height={i % 2 === 0 ? 70 : 116}
                rx="6"
                fill={['#38BDF8', '#10B981', '#F59E0B', '#EC4899', '#A855F7'][i]}
              />
            ))}
            <path d="M 218,125 L 252,125" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="288" cy="82" r="22" fill="#38BDF8" fillOpacity="0.45" stroke="#38BDF8" strokeWidth="2" />
            <polygon points="335,72 365,128 305,128" fill="#10B981" fillOpacity="0.45" stroke="#10B981" strokeWidth="2" />
            <rect x="278" y="138" width="42" height="42" rx="6" fill="#F59E0B" fillOpacity="0.45" stroke="#F59E0B" strokeWidth="2" />
          </g>
        );

      case 'splitting_black_white':
        // Total binary eclipse: sphere cleaved by a razor-sharp crimson fault into blinding gold and absolute obsidian
        return (
          <g>
            <path d="M 200,45 A 80,80 0 0 0 200,205 Z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
            <path d="M 200,45 A 80,80 0 0 1 200,205 Z" fill="#06080E" stroke="#E2E8F0" strokeWidth="2" />
            <line x1="200" y1="20" x2="200" y2="230" stroke="#F43F5E" strokeWidth="3" />
          </g>
        );

      case 'double_empathy_social_semiotics':
        // Analog sine wave and digital square wave meeting inside a central Rosetta translation prism
        return (
          <g>
            <path d="M 25,125 C 55,65 85,185 115,125 C 135,85 155,165 172,125" fill="none" stroke="#38BDF8" strokeWidth="3" />
            <polygon
              points="200,82 232,125 200,168 168,125"
              fill={accent}
              fillOpacity="0.24"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <polyline
              points="228,125 228,82 262,82 262,168 296,168 296,82 330,82 330,168 365,168 365,125"
              fill="none"
              stroke="#10B981"
              strokeWidth="3"
            />
          </g>
        );

      case 'prosopagnosia_facial_blindness':
        // Deconstructed portrait: crisp ocular and nasal feature tiles floating in non-integrated spatial planes
        return (
          <g>
            <ellipse cx="200" cy="125" rx="56" ry="72" fill="none" stroke="#64748B" strokeWidth="1.8" strokeDasharray="6 4" />
            <rect x="154" y="84" width="34" height="22" fill="#0F172A" stroke={accent} strokeWidth="2" />
            <circle cx="171" cy="95" r="4" fill="#FFFFFF" />
            <rect x="214" y="94" width="34" height="22" fill="#0F172A" stroke={accent} strokeWidth="2" />
            <circle cx="231" cy="105" r="4" fill="#FFFFFF" />
            <polygon points="200,112 188,142 212,142" fill="none" stroke="#F59E0B" strokeWidth="2" />
            <rect x="174" y="158" width="52" height="16" fill="none" stroke="#E2E8F0" strokeWidth="2" />
          </g>
        );

      case 'alice_in_wonderland_metamorphopsia':
        // Non-Euclidean optical chamber warping scale between microscopic and Brobdingnagian proportions
        return (
          <g>
            <path d="M 30,25 L 200,125 L 30,225 M 370,25 L 200,125 L 370,225" fill="none" stroke="#334155" strokeWidth="1.4" />
            <circle cx="105" cy="125" r="9" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
            <circle cx="282" cy="125" r="64" fill={accent} fillOpacity="0.16" stroke={accent} strokeWidth="2.5" />
            <circle cx="282" cy="125" r="42" fill="none" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="4 4" />
          </g>
        );

      case 'body_dysmorphic_distortion':
        // Hyper-focal convex loupe magnifying a millimeter detail into a towering jagged peak
        return (
          <g>
            <line x1="45" y1="132" x2="152" y2="132" stroke="#94A3B8" strokeWidth="2.5" />
            <line x1="248" y1="132" x2="355" y2="132" stroke="#94A3B8" strokeWidth="2.5" />
            <circle cx="200" cy="125" r="52" fill="#0F172A" stroke={accent} strokeWidth="2.5" />
            <path d="M 152,132 L 182,118 L 200,68 L 218,118 L 248,132" fill="none" stroke="#F43F5E" strokeWidth="3" />
          </g>
        );

      default:
        // somatization_functional_dissociation: Predictive coding top-down override blocking intact neural pathways
        return (
          <g>
            <path d={HEAD_PROFILE} fill="none" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="200" cy="82" r="22" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="2" />
            <line x1="200" y1="104" x2="200" y2="146" stroke="#FFFFFF" strokeWidth="3" />
            <rect x="162" y="142" width="76" height="18" rx="4" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="200" y1="160" x2="165" y2="212" stroke="#64748B" strokeWidth="2" strokeDasharray="4 5" />
            <line x1="200" y1="160" x2="235" y2="212" stroke="#64748B" strokeWidth="2" strokeDasharray="4 5" />
          </g>
        );
    }
  };

  // Deterministic constellation of floating neural quanta particles per phenomenonId
  const quantaPoints = [
    { x: 46, y: 54, r: 1.8, delay: '0s' },
    { x: 352, y: 48, r: 2.2, delay: '-1.1s' },
    { x: 64, y: 186, r: 1.6, delay: '-2.3s' },
    { x: 338, y: 192, r: 2.0, delay: '-0.7s' },
    { x: 118, y: 36, r: 1.4, delay: '-1.8s' },
    { x: 288, y: 212, r: 1.5, delay: '-2.9s' },
    { x: 88, y: 122, r: 1.3, delay: '-0.4s' },
    { x: 314, y: 118, r: 1.7, delay: '-1.5s' }
  ];

  return (
    <div
      className={`relative overflow-hidden select-none bg-[#050811] border border-slate-800/90 shadow-[inset_0_0_32px_rgba(0,0,0,0.75)] ${className}`}
    >
      <svg
        viewBox="0 0 400 250"
        className="w-full h-full block"
        role="img"
        aria-label={`Visuelle Kunst-Tafel für ${phenomenonId}`}
      >
        <defs>
          <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.48" />
            <stop offset="55%" stopColor={accent} stopOpacity="0.14" />
            <stop offset="100%" stopColor="#050811" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`beam-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.52" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.04" />
          </linearGradient>
          <pattern id={`fine-grid-${uid}`} width="25" height="25" patternUnits="userSpaceOnUse">
            <path
              d="M 25 0 L 0 0 0 25"
              fill="none"
              stroke="#1E293B"
              strokeWidth="0.6"
              strokeOpacity="0.5"
            />
            <circle cx="12.5" cy="12.5" r="0.6" fill={accent} fillOpacity="0.3" />
          </pattern>
          <filter id={`plate-bloom-${uid}`} x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="glow1" />
            <feMerge>
              <feMergeNode in="glow1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Deep Obsidian Canvas + Fine Astronomical Coordinate Grid */}
        <rect width="400" height="250" fill="#050811" />
        <rect width="400" height="250" fill={`url(#fine-grid-${uid})`} />

        {/* Multi-Layered Bioluminescent Ambient Nebula */}
        <circle cx="200" cy="125" r="122" fill={`url(#glow-${uid})`} />

        {/* Subtle Outer Rotating Harmonic Ring */}
        <g className="animate-slow-spin">
          <circle
            cx="200"
            cy="125"
            r="102"
            fill="none"
            stroke={accent}
            strokeWidth="0.8"
            strokeOpacity="0.28"
            strokeDasharray="3 9 12 9"
          />
        </g>

        {/* Floating Bioluminescent Quanta Particles */}
        {quantaPoints.map((pt, i) => (
          <g
            key={i}
            className="animate-quanta-float"
            style={{ animationDelay: pt.delay }}
          >
            <circle cx={pt.x} cy={pt.y} r={pt.r * 2.6} fill={accent} fillOpacity="0.22" />
            <circle cx={pt.x} cy={pt.y} r={pt.r} fill={i % 2 === 0 ? '#FFFFFF' : accent} />
          </g>
        ))}

        {/* Corner Calibration Hairlines */}
        <path
          d="M 12,24 L 12,12 L 24,12 M 376,12 L 388,12 L 388,24 M 12,226 L 12,238 L 24,238 M 376,238 L 388,238 L 388,226"
          fill="none"
          stroke={accent}
          strokeWidth="1.2"
          strokeOpacity="0.55"
        />

        {/* Main Phenomenological Artwork with Optical Bioluminescent Bloom */}
        <g filter={`url(#plate-bloom-${uid})`}>{renderMasterpiece()}</g>

        {/* Editorial Plate Inscription */}
        {!compact && (
          <g>
            <text
              x="18"
              y="234"
              fontSize="9.5"
              fontFamily="JetBrains Mono, monospace"
              fill="#94A3B8"
              letterSpacing="0.08em"
            >
              {domain?.code} · {domain?.shortName.toUpperCase()}
            </text>
            <text
              x="382"
              y="234"
              textAnchor="end"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fill={accent}
              letterSpacing="0.06em"
            >
              TAFEL {phenomenonId.slice(0, 6).toUpperCase()}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
