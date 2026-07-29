# Instatic Component Index

## Classification: NOT a Component Library

Instatic is a **self-hosted CMS platform**, not a component library or npm package.
The UI components in `src/ui/components/` are internal admin UI — tightly coupled
to Instatic's CSS Modules architecture and design token system.

**These cannot be directly extracted or installed as packages.**

## What CAN Be Reused (Patterns, Not Code)

### Utility Pattern: `cn()` Class Composition
```typescript
// From src/ui/cn.ts
type ClassName = string | false | null | undefined
export function cn(...inputs: ClassName[]): string {
  return inputs.filter(Boolean).join(' ')
}
```
**Kitser value**: Already has Tailwind `cn` via clsx. No action needed.

### Design Token Architecture
Instatic uses CSS custom properties for all design tokens:
- Fluid type scale (clamp-based, responsive)
- Fluid spacing scale (clamp-based, responsive)
- Surface/border/text/overlay color systems
- Semantic state colors (danger, warning, success)
- Structured z-index layers
- Shadow system

**Kitser value**: Can inform Kitser's token architecture. Already partially adopted.

### Component-Per-Folder Pattern
Each UI component gets its own directory with:
- Component file
- CSS Module file
- Types
- Tests (optional)

**Kitser value**: Already follows this pattern in `src/components/`.

### Scrollbar Styling
Instatic's scrollbar CSS is clean and minimal:
```css
* {
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
  scrollbar-width: thin;
}
```
**Kitser value**: Could adopt the CSS custom property approach for scrollbars.

### Skeleton Shimmer Animation
Global `skeletonShimmer` keyframes for consistent loading states.
**Kitser value**: Could add to globals.css for any loading states.

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
**Kitser value**: Already implemented identically.

## What CANNOT Be Reused

### UI Components
All 40+ components (Button, Card, Dialog, DataTable, etc.) are:
- Built for Instatic's admin UI, not public-facing sites
- Tightly coupled to CSS Modules (not Tailwind)
- Dependent on Instatic's token system
- Designed for dashboard/CMS interfaces, not luxury brand presentation

### Canvas Editor
The visual editor is the core product — cannot be extracted.

### Content Management
The data_tables/data_rows system is server-side infrastructure.

### Plugin System
QuickJS-WASM sandboxing is runtime-specific.

## Recommendation

**Do not clone or extract Instatic components.** Instead:
1. Study the design token architecture for inspiration
2. Adopt the fluid type/spacing scale patterns if useful
3. Use the scrollbar styling approach
4. Keep Kitser's existing Tailwind-based component system
