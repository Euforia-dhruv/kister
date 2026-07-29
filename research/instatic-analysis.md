# Instatic — Repository Analysis

## Purpose
Self-hosted CMS with integrated visual canvas editor. Outputs clean static HTML/CSS pages.
Positioning: "The open-source alternative to Webflow, Framer and WordPress."

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Runtime | Bun (server + tooling) |
| Language | TypeScript (everywhere) |
| Admin UI | React 19 (React Compiler), Vite, Zustand + Mutative |
| State | Zustand + Mutative (immutable state) |
| Editor | Custom canvas, TipTap rich text, CodeMirror code |
| Drag & Drop | dnd-kit |
| Server | `Bun.serve` with hand-written router |
| Database | SQLite or Postgres |
| Validation | TypeBox (schema-first) |
| Styling | CSS Modules (NOT Tailwind) |
| Plugins | QuickJS-WASM sandbox |
| Icons | Pixelarticons |
| Testing | Bun test, Playwright E2E |

## License
MIT — no tiers, no open-core. Full usage rights.

## Version
0.0.14 (pre-1.0, intentionally early)

## Repository Structure
```
instatic/
├── src/
│   ├── admin/          # React admin app
│   ├── core/           # Server logic, plugin SDK, publisher
│   ├── modules/base/   # Canvas modules (editor blocks)
│   ├── styles/         # Global CSS with design tokens
│   ├── ui/             # Reusable UI components
│   │   ├── components/ # 40+ component folders
│   │   ├── lib/        # UI utilities
│   │   ├── cn.ts       # Class composition helper
│   │   ├── pillAccent.ts
│   │   └── railAccent.ts
│   └── __tests__/      # Architecture tests
├── server/             # Bun server
├── docs/               # Documentation
├── public/             # Static assets
├── examples/           # Plugin templates
├── tests/e2e/          # Playwright tests
└── vendor/             # Vendored dependencies (pixel-art-icons)
```

## UI Components (src/ui/components/)
- Alert, Button, Card, Checkbox, Code, ColorInput
- ContextMenu, ControlRow, DataTable, DateTimePicker
- Dialog, EmptyState, ErrorBoundary, FileUpload
- FilterBar, FloatingActionBar, FormField, Heading
- Image, Input, Kbd, RangeTabs, SearchBar
- Section, SegmentedControl, Select, Separator
- Skeleton, SplitButton, Stack, Switch, Tabs
- TagPill, Text, Toast, Tooltip, Widget, WidgetList
- charts/

## Design Philosophy
- **Core Framework integration**: Built-in design token engine
- **Semantic HTML output**: Published pages use clean markup, no div soup
- **CSS Modules**: Not Tailwind — scoped styles with CSS custom properties
- **Token-first**: Color, type, spacing scales as CSS variables
- **Accessibility**: prefers-reduced-motion support, ARIA semantics
- **Dark/Light theming**: Full theme token system with light mode override

## Design Token System (from globals.css)
- **Type scale**: Fluid clamp-based (3xs to 7xl), responsive
- **Spacing scale**: Fluid clamp-based (4xs to 12xl)
- **Color surfaces**: 5 surface levels + body
- **Borders**: 4 levels (subtle, muted, default, strong)
- **Text**: 5 levels (bright, default, muted, subtle, disabled)
- **Overlay**: 10 opacity levels (5%-90%)
- **Scrim**: 10 opacity levels for shadows/backdrops
- **Accents**: 10 accent colors with 10% tints
- **Semantic states**: Danger, Warning, Success with text/bg variants
- **Radius**: 5 token levels
- **Shadows**: Panel, input-focus, tooltip, canvas-specific
- **Z-index layers**: Structured layering system

## Key Dependencies
- @fontsource-variable/inter (Inter Variable font)
- @tiptap/* (Rich text editor)
- @codemirror/* (Code editor)
- @dnd-kit/* (Drag and drop)
- @sinclair/typebox (Schema validation)
- zustand + mutative (State management)
- sharp (Image processing)
- quickjs-emscripten (Plugin sandbox)
- lru-cache (Caching)
- dompurify (HTML sanitization)

## What Makes It Different
1. Self-hosted, one Bun server, no vendor lock-in
2. Outputs clean static HTML/CSS (no framework runtime)
3. Core Framework built-in (design token engine)
4. Visual canvas editor with real-time multi-breakpoint editing
5. Sandboxed plugin system (QuickJS-WASM)
6. AI agent that edits canvas as real nodes
7. Content model: universal data_tables + data_rows store
