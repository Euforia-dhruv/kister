# Theatre.js Analysis

## Purpose

Animation library for high-fidelity motion graphics. Theatre provides both a visual animation editor (Studio) and a runtime (Core) for creating and playing back complex animations on 3D objects, HTML, SVG, and more.

## Classification

- **Type:** npm package
- **Category:** Animation library (visual + programmatic)
- **npm packages:** `@theatre/core`, `@theatre/studio`
- **Version:** 1.0 coming soon (development temporarily in private repo)

## License

- `@theatre/core` — Apache 2.0
- `@theatre/studio` — AGPL 3.0

## Tech Stack

- Three.js integration
- React integration (`@theatre/react`)
- TypeScript
- WebGL-based visual editor

## Installation

```bash
npm install @theatre/core @theatre/studio
```

For React bindings:
```bash
npm install @theatre/core @theatre/studio @theatre/react
```

## Key Features

- **Visual animation editor** — WYSIWYG keyframe editor in the browser (dev tool)
- **Keyframe editor** — Create and tweak keyframes visually with curves, easing, and snapping
- **Animate anything** — 3D objects (Three.js), HTML/CSS, SVG, arbitrary JS objects
- **Three.js + React integration** — First-class support for React Three Fiber workflows
- **Micro-interactions** — Button hovers, scroll reveals, cursor effects
- **Choreography** — Sequence multiple animations with precise timing
- **Sheet-based** — Organize animations into sheets, sequences, and props
- **Programmatic API** — Full control via `sheet.sequence` for code-driven animation

## Basic Usage

```js
import { getProject } from '@theatre/core'
import studio from '@theatre/studio'

// Initialize studio (dev only)
studio.initialize()

// Create a project
const project = getProject('My Project')

// Create a sheet and sequence
const sheet = project.sheet('Scene')
const obj = sheet.object('Box', {
  position: { x: 0, y: 0, z: 0 },
  color: '#ff0000'
})

// Animate
sheet.sequence.play({
  range: [0, 2],
  rate: 1,
})
```

### React Integration

```jsx
import { editable as e } from '@theatre/react'

function Scene() {
  return (
    <e.mesh theatreKey="Box" position={[0, 0, 0]}>
      <boxGeometry />
      <e.meshStandardMaterial theatreKey="Material" color="#ff0000" />
    </e.mesh>
  )
}
```

## Resources

- https://www.theatrejs.com
- https://github.com/theatre-js/theatre
