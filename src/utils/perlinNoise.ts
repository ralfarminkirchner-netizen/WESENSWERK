/**
 * Deterministic 3D Perlin Gradient Noise & Fractal Brownian Motion (fBM) Engine
 * Used for the procedural "Nebelschleier" (Nebula Veil & Flowing Perlin Waves)
 * in the Bioluminescent Connectome Observatory.
 */

const PERM = new Uint8Array(512);
const GRAD3: [number, number, number][] = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
  [1, 1, 0], [0, -1, 1], [-1, 1, 0], [0, -1, -1]
];

// Initialize deterministic permutation table
(() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let seed = 1337;
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807) % 2147483647;
    const j = seed % (i + 1);
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }
  for (let i = 0; i < 512; i++) {
    PERM[i] = p[i & 255];
  }
})();

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t: number, a: number, b: number): number {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number, z: number): number {
  const g = GRAD3[hash & 15];
  return g[0] * x + g[1] * y + g[2] * z;
}

/**
 * Computes smooth 3D Perlin gradient noise in range [-1, 1].
 */
export function perlin3D(x: number, y: number, z: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;

  const fx = x - Math.floor(x);
  const fy = y - Math.floor(y);
  const fz = z - Math.floor(z);

  const u = fade(fx);
  const v = fade(fy);
  const w = fade(fz);

  const A = PERM[X] + Y;
  const AA = PERM[A] + Z;
  const AB = PERM[A + 1] + Z;
  const B = PERM[X + 1] + Y;
  const BA = PERM[B] + Z;
  const BB = PERM[B + 1] + Z;

  return lerp(
    w,
    lerp(
      v,
      lerp(u, grad(PERM[AA], fx, fy, fz), grad(PERM[BA], fx - 1, fy, fz)),
      lerp(u, grad(PERM[AB], fx, fy - 1, fz), grad(PERM[BB], fx - 1, fy - 1, fz))
    ),
    lerp(
      v,
      lerp(u, grad(PERM[AA + 1], fx, fy, fz - 1), grad(PERM[BA + 1], fx - 1, fy, fz - 1)),
      lerp(
        u,
        grad(PERM[AB + 1], fx, fy - 1, fz - 1),
        grad(PERM[BB + 1], fx - 1, fy - 1, fz - 1)
      )
    )
  );
}

/**
 * Multi-octave Fractal Brownian Motion (fBM) over 3D Perlin noise, normalized to [0, 1].
 */
export function fbm3D(x: number, y: number, z: number, octaves = 3): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let maxAmp = 0;

  for (let i = 0; i < octaves; i++) {
    value += amplitude * perlin3D(x * frequency, y * frequency, z * frequency);
    maxAmp += amplitude;
    amplitude *= 0.5;
    frequency *= 2.02;
  }

  return Math.max(0, Math.min(1, (value / maxAmp + 1) * 0.5));
}
