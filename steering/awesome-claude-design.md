---
inclusion: manual
---

# Awesome Claude Design - DESIGN.md Reference

A curated reference for design system patterns and aesthetic families. Use when scaffolding UI, picking a visual direction, or applying brand-consistent design tokens.

## What is DESIGN.md?

A single plain-text markdown file that describes a brand's visual language in a format AI agents can act on. The core idea: keep token, rule, and rationale in the same file.

| File | Who reads it | What it defines |
|------|-------------|-----------------|
| `AGENTS.md` | Coding agents | How to build the project |
| `DESIGN.md` | Design agents | How the project should look and feel |

## DESIGN.md Structure (9 Sections)

| # | Section | What it's for |
|---|---------|--------------|
| 1 | Visual Theme & Atmosphere | Setting tone, density, and mood |
| 2 | Color Palette & Roles | CSS variables with semantic names + hex |
| 3 | Typography Rules | Type scale and font choices |
| 4 | Component Stylings | Buttons, inputs, cards, nav with states |
| 5 | Layout Principles | Spacing scale, grid, whitespace rhythm |
| 6 | Depth & Elevation | Shadow tokens and surface hierarchy |
| 7 | Do's and Don'ts | Guardrails for generating new screens |
| 8 | Responsive Behavior | Breakpoints, touch targets, collapse behavior |
| 9 | Agent Prompt Guide | Reusable prompts for future projects |

## Aesthetic Families

### 1. Editorial Minimalism
Calm neutrals, serif or narrow-grotesque headlines, generous line-height, single accent. Built for reading, pricing pages, docs.
- Linear: `#fff / #0f0f14 / #5e6ad2` (Inter / Söhne)
- Stripe: `#fff / #0a2540 / #635bff` (Sohne / Camphor)
- Vercel: `#fff / #000 / single grayscale ramp` (Geist)

### 2. Terminal-Core
Monospace everywhere, phosphor-green or amber on near-black, hard edges, CLI metaphors.
- Ollama: `#000 / #fff / no accent` (Mono)
- Warp: `#0b0d14 / #16d5e6 / #ff7a59` (Roobert + JetBrains Mono)

### 3. Warm Editorial
Terracotta, cream, clay. Serif body, approachable, human.
- Claude/Anthropic: `#f4f3ee / #c96442 / #191817` (Styrene / Tiempos)
- Notion: `#fff / #37352f / warm grays` (Segoe + Lyon serif)

### 4. Data-Dense Pro
Charts are the hero. Tight spacing, saturated categorical palette, fixed-width numerals.
- ClickHouse: `#181818 / #faff69 / magenta` (Inter tabular)
- PostHog: `#1d4aff / #f9bd2b / #000` (Matter + Mono)
- Supabase: `#171717 / #3ecf8e` (Custom + mono)

### 5. Cinematic Dark
Film-grade gradients, oversized type, motion-forward, media-heavy hero. AI products and creator tools.
- RunwayML: `#000 / saturated magenta + cyan` (Custom grotesque)
- ElevenLabs: `#0a0a0a / electric blue / wave motifs` (Inter)

### 6. Playful Color
High-saturation, illustrated accents, rounded corners, decorative shapes. Consumer-friendly.
- Figma: `#0acf83 / #f24e1e / #a259ff` (Inter + Whyte)
- Duolingo: `#58cc02 / #fff / #ff4b4b` (DIN Rounded)

### 7. Glass / Soft-Futurism
Frosted blur, layered translucency, soft gradients, Apple-adjacent. Premium consumer.
- Apple: `#fff / #1d1d1f / system colors` (SF Pro)
- Arc Browser: `#fff / radial pastel gradients` (Custom)

### 8. Neon Brutalist
Hard edges, deliberate-ugly type mixing, oversized numerals, saturated single hue.
- The Verge: `#ff6600 / #000 / #fff` (Polysans + editorial serif)

### 9. Cult / Indie Picks
Indie SaaS, cult tools, unique character.
- Granola: AI notetaker warmth
- Superhuman: Premium email minimalism
- Obsidian: Personal-knowledge dark

## Picker: What Should I Use?

1. **Is your product read-heavy or scan-heavy?**
   - Read-heavy → Editorial Minimalism or Warm Editorial
   - Scan-heavy → Data-Dense Pro or Terminal-Core

2. **Who's the user?**
   - Developer → Terminal-Core or Data-Dense Pro
   - Designer/creator → Cinematic Dark or Playful Color
   - Consumer → Glass/Soft-Futurism or Playful Color
   - Prosumer → Warm Editorial

3. **Does the brand need to feel like it took courage?**
   - Yes → Neon Brutalist or Cult/Indie
   - No → Stay in families 1-7

## Anti-Slop Kit

```
NEVER use generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Cliched color schemes (purple gradients on white or dark backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

DO use:
- Unique fonts chosen for the brand, not defaults
- Cohesive colors and themes grounded in the product's story
- Animations for effects and micro-interactions
- Context-specific character in every component
```

## Remix Recipes

Mix tokens across families for novel looks:
- **Linear x Claude** - Linear's typography + Claude's terracotta + warm neutrals
- **Warp x Sentry** - Warp's mono grid + Sentry's lilac-purple
- **Stripe x A24** - Stripe's layout discipline + A24's poster boldness
- **Notion x Duolingo** - Notion's neutrals + Duolingo's greens

## Resources

- [VoltAgent/awesome-claude-design](https://github.com/VoltAgent/awesome-claude-design) - 68 brand DESIGN.md files
- [rohitg00/awesome-claude-design](https://github.com/rohitg00/awesome-claude-design) - Recipes, prompts, skills, teardowns
- [getdesign.md](https://getdesign.md/) - Browseable web UI for 60+ DESIGN.md files
- [google-labs-code/design.md](https://github.com/google-labs-code/design.md) - Official DESIGN.md spec

---

*Sources: [VoltAgent/awesome-claude-design](https://github.com/VoltAgent/awesome-claude-design), [rohitg00/awesome-claude-design](https://github.com/rohitg00/awesome-claude-design) - MIT License*
