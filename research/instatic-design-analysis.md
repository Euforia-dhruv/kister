# Instatic Design Analysis

## Typography

### Approach
Fluid type scale using CSS `clamp()`. Mathematical progression from 3xs (8px) to 7xl (56px).

### Token Structure
```css
--text-{size}: clamp(min, calc(base + fluid), max);
```

### Scale Steps
3xs → 2xs → xs → s → m → l → xl → 2xl → 3xl → 4xl → 5xl → 6xl → 7xl

### Font
Inter Variable (100-900 weight), loaded via @fontsource-variable/inter.

### Observations
- Pure utility for admin UI — not designed for public-facing editorial typography
- No display/serif fonts — purely functional
- Fluid scaling is mathematically rigorous

---

## Spacing

### Approach
Fluid spacing scale using CSS `clamp()`. Same mathematical approach as type.

### Token Structure
```css
--space-{size}: clamp(min, calc(base + fluid), max);
```

### Scale Steps
px → 4xs → 3xs → 2xs → xs → s → m → l → xl → 2xl → 3xl → 4xl → 5xl → 6xl → 7xl → 8xl → 9xl → 10xl → 11xl → 12xl

### Observations
- Very granular (19 steps) — more than most design systems
- Designed for dense admin UI, not luxury whitespace
- Mathematical consistency is strong

---

## Grid

### Approach
CSS Grid with custom properties for grid-related values.

### Observations
- Standard CSS Grid usage
- No custom grid system or framework
- Components use flexbox primarily

---

## Animation

### Approach
- Minimal by design
- `prefers-reduced-motion` support enforced globally
- Skeleton shimmer animation for loading states
- Transition-based (no keyframe animations in admin)

### Key Pattern
```css
@keyframes skeletonShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Observations
- Animation is functional, not decorative
- Admin UI prioritizes clarity over motion
- No GSAP, Framer Motion, or complex choreography

---

## Interaction

### Approach
- dnd-kit for drag and drop
- Keyboard-first with ⌘K command palette
- Focus management via CSS `:focus-visible`
- Tooltip system for contextual help

### Focus Ring
```css
--focus-ring: 0 0 0 1px var(--overlay-20);
```

### Observations
- Interaction designed for productivity, not delight
- Keyboard shortcuts are first-class
- No hover effects for marketing purposes

---

## Color System

### Token Architecture
```
Surfaces:    --bg-body, --bg-surface (5 levels)
Borders:     --border-subtle, --border-muted, --border, --border-strong
Text:        --text-bright, --text, --text-muted, --text-subtle, --text-disabled
Overlays:    --overlay-5 through --overlay-90 (white, 10 steps)
Scrims:      --scrim-10 through --scrim-90 (black, 10 steps)
Accents:     --accent-1 through --accent-10, each with -10 tint
States:      --danger, --warning, --success (text + bg variants)
Syntax:      GitHub Dark-inspired code colors
Charts:      --chart-series-min/max with glow variants
```

### Dark/Light Theming
Full token override via `[data-editor-theme='light']` attribute selector.

### Observations
- Comprehensive token system — 100+ color tokens
- Designed for admin UI density, not brand expression
- Light theme is a complete re-token, not just color inversion

---

## Accessibility

### Patterns
- `prefers-reduced-motion` global support
- `:focus-visible` for keyboard navigation
- Semantic HTML structure
- ARIA attributes on interactive elements
- `aria-busy="true"` on loading skeletons

### Observations
- Strong accessibility foundation
- Admin-specific (not public site patterns)
- Keyboard-first design philosophy

---

## Responsive Behavior

### Approach
- Fluid type/spacing via `clamp()` — inherently responsive
- No media query breakpoints in design tokens
- Editor canvas shows multiple breakpoints simultaneously
- Admin UI is desktop-first (not mobile-optimized)

### Observations
- Fluid tokens reduce need for breakpoint-specific CSS
- Admin UI assumes desktop viewport
- Canvas editor handles responsive preview internally

---

## Performance

### Approach
- CSS Modules for scoped styles (no runtime CSS-in-JS)
- Minimal CSS output (utility classes generated, not framework)
- Skeleton loading for async content
- LRU caching for frequently accessed data

### Observations
- Performance-focused architecture
- No framework runtime on published pages
- Static output is the primary optimization

---

## Best Practices to Adopt

1. **Fluid type/spacing scales**: Mathematical clamp-based scaling
2. **Comprehensive token system**: Surface, border, text, overlay layers
3. **Reduced motion support**: Global media query enforcement
4. **Skeleton shimmer**: Consistent loading state animation
5. **Scrollbar styling**: CSS custom property approach
6. **Focus management**: `:focus-visible` with token-based rings

## Best Practices NOT to Adopt

1. **Admin-first design**: Instatic UI is for dashboards, not brand sites
2. **CSS Modules**: Kitser uses Tailwind (better for rapid iteration)
3. **Inter font**: Kitser uses Inter but could benefit from display font pairing
4. **Dense spacing**: Admin UI density doesn't suit luxury brand whitespace
5. **Dark-only default**: Kitser needs warm luxury palette, not cold admin dark
