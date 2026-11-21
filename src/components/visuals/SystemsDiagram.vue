<script setup lang="ts">
/**
 * Signature visual: business systems connected through one integration layer,
 * with an AI agent working on top of it.
 *
 * Drawn as an axonometric technical diagram that uses the exact edge slope of
 * the Syntekra symbol (69 / 126.65 ≈ 28.6°). The central layer reuses the
 * symbol's facet colors. Geometry is computed once; nothing runs after render
 * apart from a single CSS pulse along the connectors on first load.
 */

type Point = [number, number]

const SLOPE = 69 / 126.65
const ANGLE = Math.atan(SLOPE)
const COS = Math.cos(ANGLE)
const SIN = Math.sin(ANGLE)
const UNIT = 34

function project(x: number, y: number, z = 0): Point {
  return [(x - y) * COS * UNIT, (x + y) * SIN * UNIT - z * UNIT]
}

function points(list: Point[]): string {
  return list.map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(' ')
}

type Tone = 'core' | 'system' | 'agent'
type LabelPlacement = 'above' | 'below'

interface PlateSpec {
  id: string
  label: string
  cx: number
  cy: number
  size: number
  z: number
  height: number
  tone: Tone
  placement: LabelPlacement
}

const plateSpecs: PlateSpec[] = [
  {
    id: 'erp',
    label: 'ERP',
    cx: 5,
    cy: 0.5,
    size: 2,
    z: 0,
    height: 0.3,
    tone: 'system',
    placement: 'above',
  },
  {
    id: 'crm',
    label: 'CRM',
    cx: 0.5,
    cy: 5,
    size: 2,
    z: 0,
    height: 0.3,
    tone: 'system',
    placement: 'above',
  },
  {
    id: 'core',
    label: 'Integration layer',
    cx: 5,
    cy: 5,
    size: 3,
    z: 0,
    height: 0.5,
    tone: 'core',
    placement: 'below',
  },
  {
    id: 'accounting',
    label: 'Accounting',
    cx: 9.5,
    cy: 5,
    size: 2,
    z: 0,
    height: 0.3,
    tone: 'system',
    placement: 'below',
  },
  {
    id: 'documents',
    label: 'Documents',
    cx: 5,
    cy: 9.5,
    size: 2,
    z: 0,
    height: 0.3,
    tone: 'system',
    placement: 'below',
  },
  {
    id: 'agent',
    label: 'AI agent',
    cx: 5,
    cy: 5,
    size: 2,
    z: 2.8,
    height: 0.3,
    tone: 'agent',
    placement: 'above',
  },
]

const plates = plateSpecs.map((spec) => {
  const half = spec.size / 2
  const x0 = spec.cx - half
  const x1 = spec.cx + half
  const y0 = spec.cy - half
  const y1 = spec.cy + half
  const zt = spec.z + spec.height
  const zb = spec.z
  const inset = 0.32

  const top = points([
    project(x0, y0, zt),
    project(x1, y0, zt),
    project(x1, y1, zt),
    project(x0, y1, zt),
  ])
  const inner = points([
    project(x0 + inset, y0 + inset, zt),
    project(x1 - inset, y0 + inset, zt),
    project(x1 - inset, y1 - inset, zt),
    project(x0 + inset, y1 - inset, zt),
  ])
  const left = points([
    project(x0, y1, zt),
    project(x1, y1, zt),
    project(x1, y1, zb),
    project(x0, y1, zb),
  ])
  const right = points([
    project(x1, y0, zt),
    project(x1, y1, zt),
    project(x1, y1, zb),
    project(x1, y0, zb),
  ])

  const [topX, topY] = project(x0, y0, zt)
  const [, bottomY] = project(x1, y1, zb)
  const labelPos =
    spec.placement === 'above'
      ? { x: topX, y: topY - 14 }
      : { x: project(x1, y1, zb)[0], y: bottomY + 24 }

  return { ...spec, top, inner, left, right, labelPos }
})

const corePlate = plates.find((p) => p.id === 'core')!
const agentPlate = plates.find((p) => p.id === 'agent')!
const backPlates = plates.filter((p) => p.id === 'erp' || p.id === 'crm')
const frontPlates = plates.filter((p) => p.id === 'accounting' || p.id === 'documents')

/** Connectors run along the isometric axes, from each system to the core layer. */
const connectorZ = 0.15
const connectors = [
  { id: 'erp', from: project(5, 1.5, connectorZ), to: project(5, 3.5, connectorZ) },
  { id: 'crm', from: project(1.5, 5, connectorZ), to: project(3.5, 5, connectorZ) },
  { id: 'accounting', from: project(6.5, 5, connectorZ), to: project(8.5, 5, connectorZ) },
  { id: 'documents', from: project(5, 6.5, connectorZ), to: project(5, 8.5, connectorZ) },
].map((c, i) => ({
  ...c,
  d: `M${c.from[0].toFixed(1)} ${c.from[1].toFixed(1)} L${c.to[0].toFixed(1)} ${c.to[1].toFixed(1)}`,
  delay: `${0.6 + i * 0.28}s`,
}))

const agentLinkFrom = project(5, 5, 0.5)
const agentLinkTo = project(5, 5, 2.8)
const agentLink = `M${agentLinkFrom[0].toFixed(1)} ${agentLinkFrom[1].toFixed(1)} L${agentLinkTo[0].toFixed(1)} ${agentLinkTo[1].toFixed(1)}`

/** Ground lattice: one point per grid unit, a quiet reference to a technical drawing. */
const lattice: Point[] = []
for (let x = 0; x <= 10; x++) {
  for (let y = 0; y <= 10; y++) {
    const point = project(x, y, 0)
    // Only keep points inside the visible area.
    if (Math.abs(point[0]) <= 208) lattice.push(point)
  }
}

const viewBox = '-214 -14 428 330'
</script>

<template>
  <svg
    class="systems-diagram block h-auto w-full"
    :viewBox="viewBox"
    role="img"
    aria-labelledby="systems-diagram-title systems-diagram-desc"
  >
    <title id="systems-diagram-title">Connected systems diagram</title>
    <desc id="systems-diagram-desc">
      ERP, CRM, accounting and document systems connected through a central integration layer, with
      an AI agent operating on top of that layer.
    </desc>

    <g class="lattice" aria-hidden="true">
      <circle v-for="(pt, i) in lattice" :key="i" :cx="pt[0]" :cy="pt[1]" r="1.1" />
    </g>

    <!-- Systems behind the core -->
    <g v-for="plate in backPlates" :key="plate.id" class="plate plate--system">
      <polygon class="face-left" :points="plate.left" />
      <polygon class="face-right" :points="plate.right" />
      <polygon class="face-top" :points="plate.top" />
      <polygon class="face-inner" :points="plate.inner" />
    </g>

    <g aria-hidden="true">
      <template v-for="c in connectors" :key="c.id">
        <path class="connector" :d="c.d" />
        <path class="pulse" :d="c.d" pathLength="100" :style="{ animationDelay: c.delay }" />
      </template>
    </g>

    <!-- Core integration layer, using the symbol's facet colors -->
    <g class="plate plate--core">
      <polygon class="face-left" :points="corePlate.left" />
      <polygon class="face-right" :points="corePlate.right" />
      <polygon class="face-top" :points="corePlate.top" />
      <polygon class="face-inner" :points="corePlate.inner" />
    </g>

    <g v-for="plate in frontPlates" :key="plate.id" class="plate plate--system">
      <polygon class="face-left" :points="plate.left" />
      <polygon class="face-right" :points="plate.right" />
      <polygon class="face-top" :points="plate.top" />
      <polygon class="face-inner" :points="plate.inner" />
    </g>

    <path class="agent-link" :d="agentLink" aria-hidden="true" />
    <path
      class="pulse pulse--up"
      :d="agentLink"
      pathLength="100"
      aria-hidden="true"
      style="animation-delay: 1.9s"
    />

    <g class="plate plate--agent">
      <polygon class="face-left" :points="agentPlate.left" />
      <polygon class="face-right" :points="agentPlate.right" />
      <polygon class="face-top" :points="agentPlate.top" />
      <polygon class="face-inner" :points="agentPlate.inner" />
    </g>

    <g class="labels" aria-hidden="true">
      <text
        v-for="plate in plates"
        :key="plate.id"
        :x="plate.labelPos.x"
        :y="plate.labelPos.y"
        text-anchor="middle"
        :class="{ 'label-strong': plate.tone !== 'system' }"
      >
        {{ plate.label }}
      </text>
    </g>
  </svg>
</template>

<style scoped>
.lattice circle {
  fill: var(--sx-line-strong);
}

.plate polygon {
  stroke-linejoin: round;
  stroke-width: 1;
}

.plate--system .face-top {
  fill: var(--sx-surface);
  stroke: var(--sx-line-strong);
}
.plate--system .face-left {
  fill: var(--sx-raised);
  stroke: var(--sx-line-strong);
}
.plate--system .face-right {
  fill: var(--sx-line);
  stroke: var(--sx-line-strong);
}
.plate--system .face-inner {
  fill: none;
  stroke: var(--sx-line);
}

.plate--core .face-top {
  fill: #1162fe;
}
.plate--core .face-left {
  fill: #0548c7;
}
.plate--core .face-right {
  fill: #03328e;
}
.plate--core .face-inner {
  fill: none;
  stroke: rgb(255 255 255 / 0.28);
}

.plate--agent .face-top {
  fill: var(--sx-surface);
  stroke: #00c8fc;
}
.plate--agent .face-left,
.plate--agent .face-right {
  fill: var(--sx-raised);
  stroke: #00c8fc;
}
.plate--agent .face-inner {
  fill: none;
  stroke: #00c8fc;
  stroke-dasharray: 3 3;
  opacity: 0.8;
}

.connector {
  fill: none;
  stroke: var(--sx-ink);
  stroke-opacity: 0.45;
  stroke-width: 1.25;
}

.agent-link {
  fill: none;
  stroke: #00c8fc;
  stroke-width: 1.25;
  stroke-dasharray: 3 4;
}

.labels text {
  fill: var(--sx-muted);
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
}
.labels .label-strong {
  fill: var(--sx-ink);
}

/* A single pulse along each connector on first load. Static when motion is reduced. */
.pulse {
  fill: none;
  stroke: #00c8fc;
  stroke-width: 2.25;
  stroke-linecap: round;
  stroke-dasharray: 14 120;
  stroke-dashoffset: 14;
  opacity: 0;
}

@media (prefers-reduced-motion: no-preference) {
  .pulse {
    animation: pulse-travel 1.1s cubic-bezier(0.45, 0, 0.2, 1) both;
  }
}

@keyframes pulse-travel {
  0% {
    stroke-dashoffset: 14;
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: -100;
    opacity: 0;
  }
}
</style>
