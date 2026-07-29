# Kitser ↔ Instatic Mapping

## Decision: NO Direct Component Integration

Instatic is a CMS platform, not a component library. Its UI components are:
- Internal admin UI (not public-facing)
- Built on CSS Modules (not Tailwind)
- Designed for dashboard density (not luxury brand presentation)
- Tightly coupled to Instatic's architecture

**Verdict: Do not install, clone, or extract Instatic components.**

---

## What to USE (Patterns & Inspiration)

### 1. Fluid Type Scale Pattern
**Source**: Instatic's `--text-*` CSS custom properties
**Kitser adoption**: Already uses `clamp()` in Tailwind utilities. Could formalize into a type scale token system for consistency.

### 2. Spacing Scale Pattern
**Source**: Instatic's `--space-*` CSS custom properties
**Kitser adoption**: Already uses Tailwind spacing. The mathematical approach is sound.

### 3. Color Token Architecture
**Source**: Instatic's layered surface/border/text/overlay system
**Kitser adoption**: Already has similar layers (void, concrete, stone, ash, smoke, mist, linen, bone, ember). Could formalize further.

### 4. Scrollbar Styling
**Source**: Instatic's CSS custom property scrollbar approach
**Kitser adoption**: Replace current hardcoded scrollbar CSS with token-based approach.

### 5. Skeleton Shimmer
**Source**: Instatic's global `skeletonShimmer` keyframes
**Kitser adoption**: Add to globals.css for any loading states (if needed).

### 6. Focus Ring Pattern
**Source**: Instatic's `--focus-ring` token
**Kitser adoption**: Already has `:focus-visible` styling. Could formalize into token.

---

## What NOT to Use

### Navigation
**Instatic**: Admin sidebar, command palette (⌘K)
**Kitser**: Has custom architectural nav with scroll-aware behavior, mobile hamburger. Instatic's nav is for dashboards, not luxury sites.

### Footer
**Instatic**: No public footer (CMS admin only)
**Kitser**: Has custom minimal footer. No replacement needed.

### Mega Menu
**Instatic**: Not present (admin UI doesn't need mega menus)
**Kitser**: Could build if needed, but Instatic doesn't have one to copy.

### Contact
**Instatic**: Form handling via data tables, no pre-built contact form component
**Kitser**: Has custom contact form. No replacement needed.

### Layout
**Instatic**: Admin page layouts (sidebar + content)
**Kitser**: Has custom site layout (Nav + Content + Footer). No match.

### Responsive Utilities
**Instatic**: Fluid tokens reduce media query needs
**Kitser**: Could adopt fluid token approach. Already partially implemented.

### Hero
**Instatic**: No hero components (admin UI)
**Kitser**: Has custom cinematic intro + hero sections. Completely different context.

### Generic Landing Sections
**Instatic**: Not present (CMS, not marketing site)
**Kitser**: Custom sections for philosophy, collections, brands, showroom. No match.

### Generic Marketing Copy
**Instatic**: Admin UI text, not marketing copy
**Kitser**: Custom editorial copy. No match.

### Default Branding
**Instatic**: CoreBunch/Instatic branding
**Kitser**: Premium kitchen brand identity. Never clone branding.

### Default Colors
**Instatic**: Dark admin UI (#000 body, #1b1b1b surface, neon accents)
**Kitser**: Warm luxury palette (void, linen, ember, copper). No match.

### Default Typography
**Instatic**: Inter Variable (admin UI)
**Kitser**: Inter for body, could add display font for headlines. Inter overlap is fine.

---

## Recommended Actions

### Do Now
1. ✅ Study Instatic's fluid type/spacing patterns for inspiration
2. ✅ Adopt scrollbar styling approach (token-based)
3. ✅ Add skeleton shimmer to globals.css (if loading states needed)

### Consider Later
1. Formalize Kitser's type scale into CSS custom properties (like Instatic)
2. Formalize Kitser's spacing scale into CSS custom properties
3. Add focus ring token for consistency

### Never Do
1. ❌ Install Instatic as a dependency
2. ❌ Clone Instatic repository into Kitser
3. ❌ Copy any Instatic UI components
4. ❌ Adopt Instatic's admin UI design language
5. ❌ Use Instatic's dark-only color scheme
6. ❌ Replace Kitser's Tailwind with CSS Modules

---

## Summary

| Aspect | Instatic | Kitser | Action |
|--------|----------|--------|--------|
| Purpose | CMS platform | Premium brand site | No overlap |
| Components | Admin UI (40+) | Site components | Don't use |
| Styling | CSS Modules | Tailwind | Don't change |
| Typography | Inter Variable | Inter + display | Study pattern |
| Colors | Dark admin | Warm luxury | Don't adopt |
| Spacing | Fluid tokens | Tailwind scale | Study pattern |
| Animation | Minimal/functional | Cinematic/GSAP | Don't adopt |
| Navigation | Admin sidebar | Scroll-aware nav | Don't use |
| Layout | Dashboard | Editorial | Don't use |

**Final Verdict**: Instatic is an impressive CMS, but it solves a different problem than Kitser. The only value is architectural inspiration for design token systems. No components should be extracted or integrated.
