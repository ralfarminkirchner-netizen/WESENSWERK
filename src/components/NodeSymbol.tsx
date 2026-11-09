import React from 'react';
import { GraphNode } from '../data/types';

interface NodeSymbolProps {
  node: GraphNode;
  isSelected: boolean;
  isHovered: boolean;
  isConnected: boolean;
  isHubNode: boolean;
}

/**
 * Renders a bespoke, high-contrast miniature art medallion and semantic vector symbol
 * directly inside each Connectome node (53/40 Phenomena + 24 Conditions/Etiologies).
 * Designed for crystal-clear legibility at any zoom level on the water surface.
 */
export const NodeSymbol: React.FC<NodeSymbolProps> = ({
  node,
  isSelected,
  isHovered,
  isConnected,
  isHubNode
}) => {
  const r = node.radius;
  const scale = r / 15.5;
  const active = isSelected || isHovered;
  const primaryStroke = active ? '#FFFFFF' : '#F8FAFC';
  const accent = node.color;

  const renderPhenomenonGlyph = (id: string) => {
    switch (id) {
      // DOM-01: Bewusstsein
      case 'quantitative_vigilance_reduction':
        // Sinking sun/crown beneath horizontal water-sleep strata
        return (
          <g>
            <circle cx="0" cy="-2.5" r="3.8" fill="#FDE68A" />
            <path d="M -8,1.5 Q -4,0 0,1.5 T 8,1.5" fill="none" stroke="#38BDF8" strokeWidth="1.6" />
            <path d="M -6.5,5 Q 0,3.5 6.5,5" fill="none" stroke={primaryStroke} strokeWidth="1.3" opacity="0.85" />
            <path d="M 0,-8.5 L 0,-5.5 M -5,-6.5 L -3,-4.5 M 5,-6.5 L 3,-4.5" stroke="#FDE68A" strokeWidth="1.3" strokeLinecap="round" />
          </g>
        );

      case 'consciousness_narrowing':
        // Laser spotlight cone focusing on a bright target point
        return (
          <g>
            <polygon points="0,-8.5 -6.5,6.5 6.5,6.5" fill={accent} fillOpacity="0.42" stroke={primaryStroke} strokeWidth="1.3" />
            <circle cx="0" cy="3.5" r="2.6" fill="#FFFFFF" />
            <circle cx="0" cy="-8.5" r="1.6" fill="#FDE68A" />
          </g>
        );

      case 'consciousness_expansion_shift':
        // Sacred Merkaba 6-pointed star prism
        return (
          <g>
            <polygon points="0,-8.5 7.4,4.5 -7.4,4.5" fill={accent} fillOpacity="0.3" stroke="#FDE68A" strokeWidth="1.35" />
            <polygon points="0,8.5 7.4,-4.5 -7.4,-4.5" fill="#F59E0B" fillOpacity="0.25" stroke="#FFFFFF" strokeWidth="1.35" />
            <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
          </g>
        );

      // DOM-02: Orientierung & Zeit
      case 'disorientation_spacetime':
        // Fractured compass rose with tilted cardinal needles
        return (
          <g>
            <circle cx="0" cy="0" r="7.2" fill="none" stroke={accent} strokeWidth="1.2" strokeDasharray="3 2" />
            <polygon points="0,-8 2.3,0 0,-1.5 -2.3,0" fill="#F43F5E" transform="rotate(28)" />
            <polygon points="0,8 2.3,0 0,1.5 -2.3,0" fill="#38BDF8" transform="rotate(-22)" />
            <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
          </g>
        );

      case 'subjective_time_distortion':
        // Relativistic hourglass & warped clock hands
        return (
          <g>
            <polygon points="-5.5,-7.5 5.5,-7.5 0,0 5.5,7.5 -5.5,7.5 0,0" fill={accent} fillOpacity="0.32" stroke="#FDE68A" strokeWidth="1.4" strokeLinejoin="round" />
            <line x1="-6.5" y1="-7.5" x2="6.5" y2="-7.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="-6.5" y1="7.5" x2="6.5" y2="7.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="0" cy="0" r="1.7" fill="#FFFFFF" />
          </g>
        );

      // DOM-03: Aufmerksamkeit & Gedächtnis
      case 'cognitive_dysfunction_brain_fog':
        // Dissolving cloud + scattered synaptic sparks (Brain Fog)
        return (
          <g>
            <path d="M -5.5,3.5 C -8,3.5 -8.5,-1 -5.5,-1.8 C -4.5,-5.5 1.5,-5.8 3,-2.2 C 6.5,-2.2 7.5,3.5 4,3.5 Z" fill={accent} fillOpacity="0.38" stroke="#E2E8F0" strokeWidth="1.4" />
            <circle cx="-3.5" cy="6.5" r="1.3" fill="#FFFFFF" />
            <circle cx="0.5" cy="7.2" r="1.3" fill="#38BDF8" />
            <circle cx="4.5" cy="6.2" r="1.3" fill="#FDE68A" />
          </g>
        );

      case 'confabulation':
        // Broken arch bridged with golden Kintsugi lightning seam
        return (
          <g>
            <path d="M -7.5,5.5 A 7.8,7.8 0 0 1 -2.2,-6.5" fill="none" stroke="#94A3B8" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 2.2,-6.5 A 7.8,7.8 0 0 1 7.5,5.5" fill="none" stroke="#94A3B8" strokeWidth="2.4" strokeLinecap="round" />
            <polyline points="-2.8,-6 0,-8.5 0.8,-3.5 3,-6" fill="none" stroke="#FBBF24" strokeWidth="1.8" strokeLinejoin="round" />
            <circle cx="0" cy="-6" r="1.8" fill="#FFFFFF" />
          </g>
        );

      case 'deja_vu_jamais_vu':
        // Twin overlapping phase-echo rings (Golden Familiar + Cyan Estranged)
        return (
          <g>
            <circle cx="-2.8" cy="0" r="5.4" fill="#F59E0B" fillOpacity="0.26" stroke="#FBBF24" strokeWidth="1.5" />
            <circle cx="2.8" cy="0" r="5.4" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2.5 2" />
            <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
          </g>
        );

      // DOM-04: Formales Denken
      case 'flight_of_ideas':
        // High-velocity bifurcating neural lightning tree
        return (
          <g>
            <polyline points="-7,4 -2,0 3,-6 7.5,-7" fill="none" stroke="#FDE68A" strokeWidth="1.7" strokeLinecap="round" />
            <polyline points="-2,0 4,1 8,5.5" fill="none" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round" />
            <polyline points="-2,0 -1,-6.5 3,-8.5" fill="none" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="-7" cy="4" r="2" fill="#FFFFFF" />
            <circle cx="7.5" cy="-7" r="1.6" fill="#FFFFFF" />
            <circle cx="8" cy="5.5" r="1.6" fill="#FFFFFF" />
          </g>
        );

      case 'thought_inhibition_retardation':
        // Heavy pendulum braked inside thick gravity arcs
        return (
          <g>
            <path d="M -7,-2 A 7.5,7.5 0 0 0 7,-2" fill="none" stroke="#94A3B8" strokeWidth="1.6" strokeDasharray="2.5 2" />
            <line x1="0" y1="-8" x2="-1.8" y2="2.5" stroke="#FFFFFF" strokeWidth="1.8" />
            <circle cx="-1.8" cy="3.2" r="3.6" fill={accent} stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        );

      case 'thought_blocking_derailment':
        // Sine wave cleanly guillotined by a vertical red fault line
        return (
          <g>
            <path d="M -8.5,0 Q -5.5,-6 -2.5,0 T 1,0" fill="none" stroke="#38BDF8" strokeWidth="1.9" />
            <line x1="1.8" y1="-8" x2="1.8" y2="8" stroke="#F43F5E" strokeWidth="2.2" />
            <line x1="4.2" y1="0" x2="8.5" y2="0" stroke="#64748B" strokeWidth="1.5" strokeDasharray="1.5 2" />
            <circle cx="1.8" cy="0" r="2.1" fill="#FFFFFF" />
          </g>
        );

      case 'incoherence_paralogia':
        // Shattered geometric syntax shards
        return (
          <g>
            <polygon points="-7,-5 -1,-7.5 -2.5,-1" fill="#38BDF8" fillOpacity="0.5" stroke="#FFFFFF" strokeWidth="1.1" />
            <polygon points="2,-6.5 7.5,-2 1.5,1.5" fill="#F59E0B" fillOpacity="0.5" stroke="#FFFFFF" strokeWidth="1.1" />
            <polygon points="-5,2 1,1.5 -1.5,7.5" fill="#EC4899" fillOpacity="0.5" stroke="#FFFFFF" strokeWidth="1.1" />
            <polygon points="2.5,3 7.5,6.5 2,8" fill="#10B981" fillOpacity="0.5" stroke="#FFFFFF" strokeWidth="1.1" />
          </g>
        );

      // DOM-05: Befürchtungen & Zwang
      case 'rumination_perseveration':
        // Hypnotic recursive spiral vortex
        return (
          <g>
            <path
              d="M 0,0 C 2,-2 4,0 3,2.5 C 1.5,5 -3,4.5 -4.5,1.5 C -6,-2 -3,-6.5 1.5,-6.5 C 6.5,-6.5 8.5,-1 6.5,4 C 4.5,8.2 -2,9 -6.5,5.5"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="1.65"
              strokeLinecap="round"
            />
            <circle cx="0" cy="0" r="2" fill="#F43F5E" />
          </g>
        );

      case 'obsessive_thoughts_impulses':
        // Interlocking horological cogwheels + crimson intrusion spike
        return (
          <g>
            <circle cx="-3" cy="1.5" r="4.4" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="2.5 1.5" />
            <circle cx="3.5" cy="1.5" r="3.8" fill="none" stroke="#38BDF8" strokeWidth="1.8" strokeDasharray="2.2 1.4" />
            <polygon points="0,-8.5 2.4,-1 0,-2.2 -2.4,-1" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="0.8" />
          </g>
        );

      case 'flashbacks_intrusions':
        // High-voltage lightning bolt shattering the horizontal time plane
        return (
          <g>
            <line x1="-8" y1="2" x2="8" y2="2" stroke="#94A3B8" strokeWidth="1.4" />
            <polygon points="1,-8.5 -4.5,0.5 0,0.5 -2.5,8.5 5,-1 0.5,-1" fill="#F43F5E" stroke="#FDE68A" strokeWidth="1.1" />
          </g>
        );

      // DOM-06: Wahn & Bedeutung
      case 'delusional_mood_salience':
        // Glowing apophenia constellation web
        return (
          <g>
            <polygon points="-6,3 -2,-6 6,-1 1,6.5" fill="#F43F5E" fillOpacity="0.28" stroke="#F43F5E" strokeWidth="1.4" />
            <line x1="-6" y1="3" x2="6" y2="-1" stroke="#FDE68A" strokeWidth="1.1" strokeDasharray="2 1.5" />
            <circle cx="-6" cy="3" r="2" fill="#FDE68A" />
            <circle cx="-2" cy="-6" r="2.2" fill="#FFFFFF" />
            <circle cx="6" cy="-1" r="2" fill="#FDE68A" />
            <circle cx="1" cy="6.5" r="2" fill="#FDE68A" />
          </g>
        );

      case 'delusional_perception':
        // All-seeing revelation eye inside a crimson diamond
        return (
          <g>
            <polygon points="0,-8.5 8.5,0 0,8.5 -8.5,0" fill="#F43F5E" fillOpacity="0.28" stroke="#FDE68A" strokeWidth="1.4" />
            <ellipse cx="0" cy="0" rx="5.2" ry="3" fill="#060A14" stroke="#FFFFFF" strokeWidth="1.3" />
            <circle cx="0" cy="0" r="1.8" fill="#F43F5E" />
          </g>
        );

      case 'persecutory_referential_delusion':
        // Panopticon target reticle with converging laser crosshairs
        return (
          <g>
            <circle cx="0" cy="0" r="6.2" fill="none" stroke="#F43F5E" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
            <line x1="-8.5" y1="0" x2="-3.5" y2="0" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="3.5" y1="0" x2="8.5" y2="0" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="0" y1="-8.5" x2="0" y2="-3.5" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="0" y1="3.5" x2="0" y2="8.5" stroke="#FDE68A" strokeWidth="1.5" />
          </g>
        );

      case 'cotard_capgras_monothematic_delusions':
        // Twin severed masks (hollow dashed vs solid impostor)
        return (
          <g>
            <ellipse cx="-3.6" cy="0" rx="3.6" ry="5.5" fill="none" stroke="#94A3B8" strokeWidth="1.4" strokeDasharray="2 1.5" />
            <ellipse cx="3.6" cy="0" rx="3.6" ry="5.5" fill={accent} fillOpacity="0.35" stroke="#FFFFFF" strokeWidth="1.4" />
            <line x1="-1.5" y1="-6.5" x2="1.5" y2="6.5" stroke="#F43F5E" strokeWidth="1.8" />
          </g>
        );

      // DOM-07: Sinnestäuschungen & Wahrnehmung
      case 'auditory_hallucinations_voices':
        // Acoustic soundwave arcs converging on a central auditory core
        return (
          <g>
            <circle cx="0" cy="0" r="2.4" fill="#FFFFFF" />
            <path d="M -4.2,-3.8 A 5,5 0 0 0 -4.2,3.8" fill="none" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M -6.8,-6.2 A 8.2,8.2 0 0 0 -6.8,6.2" fill="none" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 4.2,-3.8 A 5,5 0 0 1 4.2,3.8" fill="none" stroke="#EC4899" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M 6.8,-6.2 A 8.2,8.2 0 0 1 6.8,6.2" fill="none" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );

      case 'visual_hallucinations_illusions':
        // Optical prism dispersing rainbow spectrum rays + luminous iris
        return (
          <g>
            <polygon points="-1,-7.5 -7.5,5.5 5.5,5.5" fill={accent} fillOpacity="0.32" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
            <line x1="2.2" y1="-1.5" x2="8.5" y2="-4.5" stroke="#38BDF8" strokeWidth="1.6" />
            <line x1="3.2" y1="0.8" x2="8.8" y2="0.5" stroke="#FDE68A" strokeWidth="1.6" />
            <line x1="4" y1="3" x2="8.5" y2="5" stroke="#EC4899" strokeWidth="1.6" />
            <circle cx="-1" cy="1" r="1.8" fill="#FFFFFF" />
          </g>
        );

      case 'olfactory_gustatory_hallucinations':
        // Rising aromatic/uncinate vapor plumes
        return (
          <g>
            <path d="M -4,7 C -6.5,3 -1.5,1 -3.5,-3 C -4.5,-5.5 -1,-7.5 0,-8" fill="none" stroke="#FDE68A" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M 0.5,7.5 C -1.5,3.5 3.5,1.5 1.5,-2.5 C 0.5,-5 3.5,-6.5 4.5,-7.5" fill="none" stroke="#38BDF8" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="-1" cy="-5.5" r="1.5" fill="#FFFFFF" />
            <circle cx="3.5" cy="-4.5" r="1.4" fill="#EC4899" />
          </g>
        );

      case 'coenesthesia_bodily_hallucinations':
        // Somatic torso silhouette crossed by bioelectric arcs
        return (
          <g>
            <polygon points="-4.5,-6.5 4.5,-6.5 6,-1 4,7 -4,7 -6,-1" fill={accent} fillOpacity="0.25" stroke="#E2E8F0" strokeWidth="1.3" />
            <polyline points="-7,-1 -1.5,1 1.5,-2.5 7,1.5" fill="none" stroke="#FDE68A" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
          </g>
        );

      // DOM-08: Ich-Erleben & Dissoziation
      case 'depersonalization':
        // Out-of-body twin silhouettes drifting apart
        return (
          <g>
            <circle cx="-3.2" cy="-2.5" r="3" fill="#94A3B8" />
            <path d="M -7.5,6.5 C -7.5,2.5 -5.5,1 -3.2,1 C -1,1 1,2.5 1,6.5" fill="none" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="3.2" cy="-3.5" r="3" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 1.2" />
            <path d="M -1,5.5 C -1,1.5 1,0 3.2,0 C 5.5,0 7.5,1.5 7.5,5.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2.5 1.5" />
          </g>
        );

      case 'derealization':
        // Refractive glass barrier splitting observer from wireframe world
        return (
          <g>
            <circle cx="-5" cy="0" r="2.6" fill="#FFFFFF" />
            <line x1="-0.5" y1="-8" x2="-0.5" y2="8" stroke="#38BDF8" strokeWidth="2.2" />
            <polygon points="3,-4 7.5,0 3,4" fill="none" stroke="#FDE68A" strokeWidth="1.4" strokeDasharray="2 1.5" />
            <rect x="3" y="-5.5" width="4.8" height="11" fill="none" stroke="#94A3B8" strokeWidth="1.1" strokeDasharray="2 2" />
          </g>
        );

      case 'thought_insertion_withdrawal':
        // Open cranium ring pierced by exogenous inward & outward signal arrows
        return (
          <g>
            <circle cx="0" cy="0" r="5.8" fill="none" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3.2 2" />
            <line x1="-8.5" y1="-4.5" x2="-1" y2="-0.5" stroke="#F43F5E" strokeWidth="1.9" />
            <polygon points="-1,-0.5 -4.2,-0.2 -2.8,-3.2" fill="#F43F5E" />
            <line x1="1" y1="0.5" x2="8.5" y2="4.5" stroke="#38BDF8" strokeWidth="1.9" />
            <polygon points="8.5,4.5 5.2,4.2 6.8,1.5" fill="#38BDF8" />
            <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
          </g>
        );

      // DOM-09: Affektivität
      case 'anhedonia_loss_of_pleasure':
        // Half-eclipsed sun (left warm gold, right frozen dark slate)
        return (
          <g>
            <path d="M 0,-6.5 A 6.5,6.5 0 0 0 0,6.5 Z" fill="#FBBF24" stroke="#FDE68A" strokeWidth="1.2" />
            <path d="M 0,-6.5 A 6.5,6.5 0 0 1 0,6.5 Z" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.2" />
            <line x1="0" y1="-8.5" x2="0" y2="8.5" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2 1.5" />
          </g>
        );

      case 'feeling_of_feelinglessness':
        // Petrified crystal heart/gem with flatlined zero-amplitude line
        return (
          <g>
            <polygon points="0,-7 6,-2 3.8,6.5 -3.8,6.5 -6,-2" fill="#0F172A" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="-8.5" y1="0" x2="8.5" y2="0" stroke="#FFFFFF" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="1.8" fill="#F43F5E" />
          </g>
        );

      case 'parathymia_affect_incontinence':
        // Discordant phase-inverted dual emotion wave masks
        return (
          <g>
            <path d="M -7.5,-2 Q -4,-7 -0.5,-2" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
            <path d="M 0.5,2 Q 4,7 7.5,2" fill="none" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
            <line x1="-4" y1="6.5" x2="4" y2="-6.5" stroke="#FFFFFF" strokeWidth="1.4" strokeDasharray="2 2" />
          </g>
        );

      case 'euphoria_expansive_mood':
        // Blazing supernova sunburst
        return (
          <g>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1={Math.cos(rad) * 3.5}
                  y1={Math.sin(rad) * 3.5}
                  x2={Math.cos(rad) * 8.2}
                  y2={Math.sin(rad) * 8.2}
                  stroke="#FDE68A"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              );
            })}
            <circle cx="0" cy="0" r="3.6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.3" />
          </g>
        );

      case 'alexithymia_interoception':
        // ECG heartbeat wave hitting a locked cipher box
        return (
          <g>
            <polyline points="-8.5,0 -5,0 -3.2,-6 -1,6 1,-2 2.5,0" fill="none" stroke="#F43F5E" strokeWidth="1.8" strokeLinejoin="round" />
            <rect x="3" y="-4.5" width="5.2" height="9" rx="1.2" fill="#1E293B" stroke="#FFFFFF" strokeWidth="1.3" />
            <circle cx="5.6" cy="0" r="1.2" fill="#FDE68A" />
          </g>
        );

      case 'ambivalence_affective_volitional':
        // Opposing bi-directional vector arrows locked in tension
        return (
          <g>
            <line x1="-7.5" y1="0" x2="7.5" y2="0" stroke="#FFFFFF" strokeWidth="1.8" />
            <polygon points="-8.5,0 -4.2,-3.5 -4.2,3.5" fill="#38BDF8" />
            <polygon points="8.5,0 4.2,-3.5 4.2,3.5" fill="#F43F5E" />
            <circle cx="0" cy="0" r="2.2" fill="#FDE68A" />
          </g>
        );

      case 'rejection_sensitive_dysphoria':
        // Sharp needle strike igniting concentric crimson shockwaves
        return (
          <g>
            <circle cx="1.5" cy="1" r="6" fill="none" stroke="#F43F5E" strokeWidth="1.4" strokeDasharray="2.5 1.5" />
            <circle cx="1.5" cy="1" r="3.2" fill="#F43F5E" fillOpacity="0.5" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="-8" y1="-6.5" x2="0" y2="0" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      // DOM-10: Antrieb & Psychomotorik
      case 'abulia_drive_inhibition':
        // Heavy monolith block anchored to a flat horizon with a tiny unlit spark
        return (
          <g>
            <line x1="-8" y1="6" x2="8" y2="6" stroke="#94A3B8" strokeWidth="1.6" />
            <rect x="-5" y="-5.5" width="10" height="11.5" rx="1.5" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="0" cy="0.5" r="1.8" fill="#F59E0B" />
          </g>
        );

      case 'executive_paralysis':
        // Decoupled transmission gears separated by a red fault line
        return (
          <g>
            <circle cx="-4.2" cy="0" r="3.8" fill="none" stroke="#FDE68A" strokeWidth="1.8" strokeDasharray="2.2 1.3" />
            <line x1="0" y1="-7.5" x2="0" y2="7.5" stroke="#F43F5E" strokeWidth="1.6" strokeDasharray="2 2" />
            <circle cx="4.5" cy="0" r="3.8" fill="none" stroke="#64748B" strokeWidth="1.8" strokeDasharray="2.2 1.3" />
          </g>
        );

      case 'catatonia_stupor_mutism':
        // Hexagonal crystal cage locking a high-voltage lightning spark inside
        return (
          <g>
            <polygon points="0,-8 7,-4 7,4 0,8 -7,4 -7,-4" fill="none" stroke="#E2E8F0" strokeWidth="1.6" />
            <polygon points="0.5,-5 -2.5,0.5 0.5,0.5 -1,5.5 3,-0.5 0,-0.5" fill="#FDE68A" />
          </g>
        );

      case 'echolalia_echopraxia':
        // Mirrored symmetrical waveforms across a vertical axis
        return (
          <g>
            <path d="M -8,0 Q -5,-6 -2,0 T -1,0" fill="none" stroke="#FFFFFF" strokeWidth="1.7" />
            <line x1="0" y1="-7.5" x2="0" y2="7.5" stroke="#FDE68A" strokeWidth="1.3" strokeDasharray="2 1.5" />
            <path d="M 1,0 Q 2,6 5,0 T 8,0" fill="none" stroke="#38BDF8" strokeWidth="1.7" />
          </g>
        );

      case 'psychomotor_agitation_hyperkinesia':
        // High-frequency kinetic seismograph oscillation
        return (
          <g>
            <polyline
              points="-8,0 -5,-6.5 -2,6.5 1,-7.5 4,6.5 7,-4 8.5,0"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'premonitory_urge_tics':
        // Steeply building pressure wave culminating in a vertical release spike
        return (
          <g>
            <path d="M -8,4.5 C -3,4.5 -1,1 0.5,-7.5 L 2.5,4.5 L 8,4.5" fill="none" stroke="#FFFFFF" strokeWidth="1.9" strokeLinejoin="round" />
            <circle cx="0.5" cy="-7.5" r="2" fill="#FDE68A" />
          </g>
        );

      // DOM-11: Schlaf & Zirkadianik
      case 'morning_low_circadian':
        // Shifted circadian wave: deep morning trough rising to evening zenith star
        return (
          <g>
            <path d="M -8,0 C -4,7.5 0,7.5 2.5,0 C 4.5,-6 7,-6 8.5,-3" fill="none" stroke="#38BDF8" strokeWidth="1.9" />
            <circle cx="-2.8" cy="4.8" r="1.8" fill="#F43F5E" />
            <circle cx="6" cy="-4.5" r="2.2" fill="#FDE68A" />
          </g>
        );

      case 'hypnagogic_sleep_paralysis':
        // Wide-open REM eye + crescent moon above immobilized horizontal bar
        return (
          <g>
            <line x1="-6.5" y1="5.5" x2="6.5" y2="5.5" stroke="#94A3B8" strokeWidth="2.4" strokeLinecap="round" />
            <ellipse cx="-1" cy="-1" rx="5.2" ry="2.8" fill="#060A14" stroke="#FFFFFF" strokeWidth="1.4" />
            <circle cx="-1" cy="-1" r="1.6" fill="#38BDF8" />
            <path d="M 4.5,-7 A 3.2,3.2 0 1 0 7.5,-3.5 A 2.5,2.5 0 1 1 4.5,-7 Z" fill="#FDE68A" />
          </g>
        );

      // DOM-12: Neurodivergenz & Sensorik
      case 'hyperfocus_tunnel':
        // Crystal lens converging scattered rays into a laser beam
        return (
          <g>
            <line x1="-8" y1="-4.5" x2="-2" y2="-1.5" stroke="#94A3B8" strokeWidth="1.2" />
            <line x1="-8" y1="4.5" x2="-2" y2="1.5" stroke="#94A3B8" strokeWidth="1.2" />
            <ellipse cx="-1.5" cy="0" rx="2" ry="6.2" fill="#10B981" fillOpacity="0.35" stroke="#FFFFFF" strokeWidth="1.4" />
            <line x1="0.5" y1="0" x2="8.5" y2="0" stroke="#FDE68A" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        );

      case 'sensory_overload_flooding':
        // Multi-directional sensory waves bombarding a central core
        return (
          <g>
            <circle cx="0" cy="0" r="2.6" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="-4" cy="-3.5" r="4.2" fill="none" stroke="#38BDF8" strokeWidth="1.3" />
            <circle cx="4" cy="-3.5" r="4.2" fill="none" stroke="#FDE68A" strokeWidth="1.3" />
            <circle cx="0" cy="4" r="4.2" fill="none" stroke="#EC4899" strokeWidth="1.3" />
          </g>
        );

      case 'autistic_meltdown_shutdown':
        // Left half eruptive red rays (Meltdown), right half sealed shield (Shutdown)
        return (
          <g>
            <path d="M -1,0 L -7.5,-5.5 M -1,0 L -8.5,0 M -1,0 L -7.5,5.5" stroke="#F43F5E" strokeWidth="1.9" strokeLinecap="round" />
            <path d="M 0.5,-6.5 A 6.5,6.5 0 0 1 0.5,6.5 Z" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.6" />
          </g>
        );

      case 'stimming_self_regulation':
        // Harmonious infinity / Lissajous figure-8 loop
        return (
          <g>
            <path
              d="M 0,0 C -3,-5 -7.5,-5 -7.5,0 C -7.5,5 -3,5 0,0 C 3,-5 7.5,-5 7.5,0 C 7.5,5 3,5 0,0 Z"
              fill={accent}
              fillOpacity="0.28"
              stroke="#FFFFFF"
              strokeWidth="1.7"
            />
            <circle cx="-4.2" cy="0" r="1.4" fill="#FDE68A" />
            <circle cx="4.2" cy="0" r="1.4" fill="#38BDF8" />
          </g>
        );

      case 'masking_camouflaging':
        // Theatrical mask in front of a colorful hidden star
        return (
          <g>
            <circle cx="-3" cy="0" r="4.8" fill="#F59E0B" fillOpacity="0.35" stroke="#FDE68A" strokeWidth="1.3" strokeDasharray="2 1.5" />
            <rect x="-0.5" y="-6" width="7" height="12" rx="3.5" fill="#1E293B" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="1.8" cy="-1.8" r="0.9" fill="#FFFFFF" />
            <circle cx="4.4" cy="-1.8" r="0.9" fill="#FFFFFF" />
            <path d="M 1.6,2.2 Q 3.1,3.6 4.6,2.2" fill="none" stroke="#38BDF8" strokeWidth="1.3" />
          </g>
        );

      case 'synesthesia_crossmodal':
        // Sound frequency bars transforming into a chromatic triangle/gem
        return (
          <g>
            <line x1="-6.8" y1="-3.5" x2="-6.8" y2="3.5" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
            <line x1="-3.8" y1="-6" x2="-3.8" y2="6" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
            <line x1="-0.8" y1="-2.5" x2="-0.8" y2="2.5" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
            <polygon points="5,-5.5 8.2,4.5 1.8,4.5" fill="#10B981" fillOpacity="0.45" stroke="#FFFFFF" strokeWidth="1.4" />
          </g>
        );

      // DOM-13: Soziale Kognition
      case 'splitting_black_white':
        // Binary black-and-gold sphere cleaved by a diagonal red slash
        return (
          <g>
            <path d="M 0,-6.5 A 6.5,6.5 0 0 0 0,6.5 Z" fill="#FDE68A" />
            <path d="M 0,-6.5 A 6.5,6.5 0 0 1 0,6.5 Z" fill="#090D16" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="0" y1="-8.2" x2="0" y2="8.2" stroke="#F43F5E" strokeWidth="2" />
          </g>
        );

      case 'double_empathy_social_semiotics':
        // Analog sine wave and digital square wave meeting at a central diamond
        return (
          <g>
            <path d="M -8.5,0 Q -6,-5.5 -3.5,0 T -1.5,0" fill="none" stroke="#38BDF8" strokeWidth="1.7" />
            <polygon points="0,-3.5 2.5,0 0,3.5 -2.5,0" fill="#FFFFFF" />
            <polyline points="2,0 2,-4 5,-4 5,4 8,4 8,0" fill="none" stroke="#FDE68A" strokeWidth="1.7" />
          </g>
        );

      case 'prosopagnosia_facial_blindness':
        // Displaced floating eye & mouth feature tiles
        return (
          <g>
            <rect x="-6.5" y="-5.5" width="5" height="3.8" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.3" />
            <circle cx="-4" cy="-3.6" r="1" fill="#FFFFFF" />
            <rect x="1.5" y="-3.5" width="5" height="3.8" fill="#0F172A" stroke="#FDE68A" strokeWidth="1.3" />
            <circle cx="4" cy="-1.6" r="1" fill="#FFFFFF" />
            <rect x="-3.5" y="3" width="7" height="2.8" fill="none" stroke="#FFFFFF" strokeWidth="1.3" />
          </g>
        );

      // DOM-14: Körperschema & Somatopsychik
      case 'alice_in_wonderland_metamorphopsia':
        // Micropsia vs Macropsia: tiny dot beside giant glowing ring
        return (
          <g>
            <circle cx="-5.2" cy="0" r="1.8" fill="#FFFFFF" />
            <circle cx="2.5" cy="0" r="5.5" fill={accent} fillOpacity="0.28" stroke="#FDE68A" strokeWidth="1.6" />
            <circle cx="2.5" cy="0" r="2.8" fill="none" stroke="#FFFFFF" strokeWidth="1.1" strokeDasharray="2 1.5" />
          </g>
        );

      case 'body_dysmorphic_distortion':
        // Magnifying glass warping a straight line into a sharp red spike
        return (
          <g>
            <circle cx="0" cy="-0.5" r="5.5" fill="#0A0F1D" stroke="#FFFFFF" strokeWidth="1.5" />
            <polyline points="-7.5,1.5 -3,1.5 0,-5.5 3,1.5 7.5,1.5" fill="none" stroke="#F43F5E" strokeWidth="1.8" strokeLinejoin="round" />
          </g>
        );

      default:
        // somatization_functional_dissociation
        return (
          <g>
            <circle cx="0" cy="-4.5" r="2.8" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="0" y1="-1.5" x2="0" y2="2" stroke="#FFFFFF" strokeWidth="1.6" />
            <rect x="-4.8" y="1.5" width="9.6" height="3" rx="1" fill="#F43F5E" />
            <line x1="-2.5" y1="5" x2="-4.5" y2="8" stroke="#94A3B8" strokeWidth="1.3" strokeDasharray="1.5 1.5" />
            <line x1="2.5" y1="5" x2="4.5" y2="8" stroke="#94A3B8" strokeWidth="1.3" strokeDasharray="1.5 1.5" />
          </g>
        );
    }
  };

  const renderConditionGlyph = (id: string) => {
    switch (id) {
      case 'schizophrenia':
        // Split prism with aberrant salience spark
        return (
          <g>
            <polygon points="-1,-7 -7,5 5,5" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
            <polygon points="2,-5 -4,7 8,7" fill="none" stroke="#F43F5E" strokeWidth="1.5" />
            <circle cx="0.5" cy="1" r="2" fill="#FFFFFF" />
          </g>
        );

      case 'bipolar_disorder':
        // Dual manic zenith & depressive trough wave with solar/lunar poles
        return (
          <g>
            <path d="M -7.5,0 Q -3.8,-8.5 0,0 T 7.5,0" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
            <circle cx="-3.8" cy="-5.2" r="2" fill="#FDE68A" />
            <circle cx="3.8" cy="5.2" r="2" fill="#38BDF8" />
          </g>
        );

      case 'major_depression':
        // Downward gravity chevron + eclipsed core
        return (
          <g>
            <circle cx="0" cy="-2.5" r="3.8" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.4" />
            <polyline points="-5.5,2 0,7 5.5,2" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );

      case 'ptsd_cptsd':
        // Fractured shield with lightning stress fissure
        return (
          <g>
            <path d="M 0,-7.5 L 6,-4.5 L 5,2.5 L 0,7.5 L -5,2.5 L -6,-4.5 Z" fill="none" stroke="#E2E8F0" strokeWidth="1.4" />
            <polyline points="1,-7 -2,0 2,0 -1,7" fill="none" stroke="#F43F5E" strokeWidth="1.9" />
          </g>
        );

      case 'borderline_pd':
        // Dual contrasting hemispheres with intense affective flame
        return (
          <g>
            <path d="M -5.5,-1 A 4,4 0 0 1 0,-4.5 A 4,4 0 0 1 5.5,-1 L 0,6.5 Z" fill="#F43F5E" fillOpacity="0.45" stroke="#FFFFFF" strokeWidth="1.4" />
            <line x1="0" y1="-6.5" x2="0" y2="7.5" stroke="#FDE68A" strokeWidth="1.6" />
          </g>
        );

      case 'ocd':
        // Triple interlocking CSTC feedback loop triangle
        return (
          <g>
            <circle cx="0" cy="-3.5" r="3.2" fill="none" stroke="#FDE68A" strokeWidth="1.5" />
            <circle cx="-3.5" cy="2.8" r="3.2" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
            <circle cx="3.5" cy="2.8" r="3.2" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        );

      case 'panic_anxiety':
        // Sympathetic adrenaline pulse spike
        return (
          <g>
            <polyline points="-8,0 -3.5,0 -1.5,-7.5 1.5,7.5 3.5,-3 5.5,0 8,0" fill="none" stroke="#FDE68A" strokeWidth="1.9" strokeLinejoin="round" />
          </g>
        );

      case 'dissociative_disorders':
        // Three phase-shifted diamond shards
        return (
          <g>
            <polygon points="-4,-5 0,0 -4,5 -8,0" fill="none" stroke="#94A3B8" strokeWidth="1.3" />
            <polygon points="0,-5 4,0 0,5 -4,0" fill={accent} fillOpacity="0.35" stroke="#FFFFFF" strokeWidth="1.4" />
            <polygon points="4,-5 8,0 4,5 0,0" fill="none" stroke="#38BDF8" strokeWidth="1.3" strokeDasharray="2 1.5" />
          </g>
        );

      case 'anorexia_bdd':
        // Warped concave mirror frame
        return (
          <g>
            <path d="M -5,-7 Q -2,0 -5,7 L 5,7 Q 2,0 5,-7 Z" fill={accent} fillOpacity="0.28" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="1.8" fill="#FDE68A" />
          </g>
        );

      case 'adhd':
        // Atomic dopamine star-orbit with kinetic spark
        return (
          <g>
            <ellipse cx="0" cy="0" rx="7.5" ry="3.2" fill="none" stroke="#34D399" strokeWidth="1.4" transform="rotate(32)" />
            <ellipse cx="0" cy="0" rx="7.5" ry="3.2" fill="none" stroke="#FDE68A" strokeWidth="1.4" transform="rotate(-32)" />
            <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
          </g>
        );

      case 'autism_spectrum':
        // Neurodiversity infinity spectrum loop
        return (
          <g>
            <path
              d="M 0,0 C -2.8,-4.8 -7,-4.8 -7,0 C -7,4.8 -2.8,4.8 0,0 C 2.8,-4.8 7,-4.8 7,0 C 7,4.8 2.8,4.8 0,0 Z"
              fill="none"
              stroke="#34D399"
              strokeWidth="2"
            />
            <circle cx="-3.8" cy="0" r="1.5" fill="#FDE68A" />
            <circle cx="3.8" cy="0" r="1.5" fill="#FFFFFF" />
          </g>
        );

      case 'tourette_tics':
        // Sensorimotor basal ganglia discharge arc
        return (
          <g>
            <circle cx="0" cy="2" r="3.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M -5,-2 L -2,-7 M 0,-3.5 L 0,-8.5 M 5,-2 L 2,-7" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        );

      case 'synesthesia_gifted':
        // Chromatic cross-modal star lattice
        return (
          <g>
            <polygon points="0,-7.5 6.5,3.8 -6.5,3.8" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
            <circle cx="0" cy="-7.5" r="1.8" fill="#FDE68A" />
            <circle cx="6.5" cy="3.8" r="1.8" fill="#EC4899" />
            <circle cx="-6.5" cy="3.8" r="1.8" fill="#34D399" />
          </g>
        );

      case 'temporal_lobe_epilepsy':
        // Ictal hypersynchronous EEG spike-and-wave
        return (
          <g>
            <circle cx="0" cy="0" r="6.2" fill="none" stroke="#C084FC" strokeWidth="1.2" strokeDasharray="2 2" />
            <polyline points="-7,1 -2.5,1 0,-7.5 2,6.5 4.2,-2 7,1" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
          </g>
        );

      case 'lewy_body_parkinson':
        // Alpha-synuclein halo inclusion body
        return (
          <g>
            <circle cx="0" cy="0" r="6.2" fill="none" stroke="#C084FC" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="3.2" fill="#FDE68A" fillOpacity="0.8" />
            <circle cx="3.8" cy="-3.8" r="1.5" fill="#FFFFFF" />
          </g>
        );

      case 'alzheimer_ftd':
        // Cortical network with dissolving upper nodes
        return (
          <g>
            <line x1="-4" y1="4" x2="0" y2="-2" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="4" y1="4" x2="0" y2="-2" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="-4" cy="4" r="2.2" fill="#FFFFFF" />
            <circle cx="4" cy="4" r="2.2" fill="#FFFFFF" />
            <circle cx="0" cy="-3.5" r="2.6" fill="none" stroke="#FDE68A" strokeWidth="1.4" strokeDasharray="2 1.5" />
          </g>
        );

      case 'migraine_alice':
        // Scintillating scotoma zigzag fortification aura
        return (
          <g>
            <polyline
              points="-3,-6.5 2,-5 -1,-1.5 4.5,0 0,3.5 4,6.5 -3,7"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="1.9"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'narcolepsy':
        // Crescent moon intersecting an awake theta wave
        return (
          <g>
            <path d="M -2,-6.5 A 6,6 0 1 0 5,4.5 A 4.8,4.8 0 1 1 -2,-6.5 Z" fill="#FDE68A" />
            <path d="M -7,2 Q -3.5,-3 0,2 T 7,2" fill="none" stroke="#38BDF8" strokeWidth="1.6" />
          </g>
        );

      case 'charles_bonnet':
        // Ocular lens projecting geometric release patterns
        return (
          <g>
            <ellipse cx="0" cy="2" rx="6" ry="3.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="0" cy="2" r="1.8" fill="#C084FC" />
            <polygon points="0,-7.5 3,-2.5 -3,-2.5" fill="#FDE68A" />
          </g>
        );

      case 'stroke_tbi_korsakoff':
        // Cerebral hemisphere with vascular focal star
        return (
          <g>
            <path d="M -6,2 C -6,-4 -1,-6.5 3,-5 C 6.5,-3.5 7,2 4,5.5 Z" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="1.5" cy="-1" r="2.6" fill="#F43F5E" stroke="#FDE68A" strokeWidth="1.2" />
          </g>
        );

      case 'autoimmune_encephalitis':
        // Y-shaped IgG autoantibody locking onto a synaptic receptor
        return (
          <g>
            <polyline points="-5,-6.5 0,-1 0,5.5" fill="none" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
            <line x1="5" y1="-6.5" x2="0" y2="-1" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
            <path d="M -4,6.5 Q 0,3.5 4,6.5" fill="none" stroke="#38BDF8" strokeWidth="1.8" />
          </g>
        );

      case 'delirium_sepsis_metabolic':
        // Acute confusional thermal/metabolic whirlpool
        return (
          <g>
            <circle cx="0" cy="0" r="6" fill="none" stroke="#FBBF24" strokeWidth="1.6" strokeDasharray="3 2" />
            <path d="M -3.5,-3.5 L 3.5,3.5 M 3.5,-3.5 L -3.5,3.5" stroke="#F43F5E" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
          </g>
        );

      case 'thyroid_endocrine':
        // Butterfly endocrine gland emblem
        return (
          <g>
            <ellipse cx="-3.5" cy="0" rx="3" ry="5.2" fill="#F59E0B" fillOpacity="0.45" stroke="#FFFFFF" strokeWidth="1.4" transform="rotate(-14 -3.5 0)" />
            <ellipse cx="3.5" cy="0" rx="3" ry="5.2" fill="#F59E0B" fillOpacity="0.45" stroke="#FFFFFF" strokeWidth="1.4" transform="rotate(14 3.5 0)" />
            <circle cx="0" cy="0" r="1.6" fill="#FDE68A" />
          </g>
        );

      case 'b12_iron_deficiency':
        // Myelin sheath / cobalt hexagonal ring
        return (
          <g>
            <polygon points="0,-6.5 5.6,-3.2 5.6,3.2 0,6.5 -5.6,3.2 -5.6,-3.2" fill="none" stroke="#FDE68A" strokeWidth="1.6" />
            <circle cx="0" cy="0" r="2.4" fill="#F43F5E" />
          </g>
        );

      case 'mecfs_longcovid_pots':
        // Low-energy cellular battery + orthostatic pulse
        return (
          <g>
            <rect x="-6" y="-3.8" width="10.5" height="7.6" rx="1.4" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="4.5" y="-1.8" width="2" height="3.6" fill="#FFFFFF" />
            <rect x="-4.2" y="-2" width="3.2" height="4" fill="#F43F5E" />
          </g>
        );

      case 'substance_intox_withdrawal':
        // Chemical Erlenmeyer flask / molecular ring
        return (
          <g>
            <polygon points="-2,-6.5 2,-6.5 2,-2.5 6.5,5.5 -6.5,5.5 -2,-2.5" fill="#F43F5E" fillOpacity="0.35" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="0" cy="2.2" r="1.6" fill="#FDE68A" />
          </g>
        );

      case 'medication_neuroleptic_side_effects':
        // Two-tone pharmacological capsule
        return (
          <g transform="rotate(-35)">
            <rect x="-3.2" y="-6.8" width="6.4" height="13.6" rx="3.2" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M -3.2,0 L 3.2,0 L 3.2,3.6 A 3.2,3.2 0 0 1 -3.2,3.6 Z" fill="#F43F5E" />
          </g>
        );

      default:
        // sleep_deprivation_stress_grief
        return (
          <g>
            <path d="M -1,-6.5 A 6,6 0 1 0 6,3.5 A 4.8,4.8 0 1 1 -1,-6.5 Z" fill="#2DD4BF" stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="2" cy="-2" r="1.6" fill="#FDE68A" />
          </g>
        );
    }
  };

  if (node.type === 'phenomenon') {
    return (
      <g>
        {/* Outer Medallion Shell */}
        <circle
          r={r}
          fill="#050A16"
          stroke={active ? '#FFFFFF' : accent}
          strokeWidth={active ? 3 : isHubNode ? 2.4 : 1.9}
        />
        {/* Inner Translucent Domain Color Lens */}
        <circle
          r={r * 0.84}
          fill={accent}
          fillOpacity={active ? 0.34 : isConnected ? 0.24 : 0.16}
          stroke={active ? '#FDE68A' : accent}
          strokeWidth="0.75"
          strokeOpacity="0.65"
        />
        {/* Bespoke Phenomenon Vector Artwork */}
        <g transform={`scale(${scale.toFixed(3)})`}>{renderPhenomenonGlyph(node.id)}</g>
      </g>
    );
  }

  // Octagonal / Diamond Medallion for Condition / Etiology Nodes
  const d = r * 1.16;
  const c = r * 0.82;
  const octagonPts = `0,${-d} ${c},${-c} ${d},0 ${c},${c} 0,${d} ${-c},${c} ${-d},0 ${-c},${-c}`;

  return (
    <g>
      <polygon
        points={octagonPts}
        fill="#070C1B"
        stroke={active ? '#FFFFFF' : accent}
        strokeWidth={active ? 2.8 : isHubNode ? 2.3 : 1.8}
      />
      <circle
        r={r * 0.78}
        fill={accent}
        fillOpacity={active ? 0.36 : isConnected ? 0.24 : 0.16}
      />
      <g transform={`scale(${(scale * 0.92).toFixed(3)})`}>{renderConditionGlyph(node.id)}</g>
    </g>
  );
};
