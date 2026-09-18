---
inclusion: manual
---

# Web Design Guidelines (Vercel)

Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".

## How It Works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

## Usage

When reviewing UI code:
1. Fetch guidelines from the source URL above
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.

## Core Principles (Summary)

### Layout
- Use CSS Grid for page-level layout, Flexbox for component-level
- Respect the natural document flow
- Design for content-first, not device-first
- Use logical properties (inline/block) over physical (left/right)

### Typography
- Use a modular type scale
- Set body text between 16-20px
- Line length between 45-75 characters
- Use proper hierarchy (only one h1 per page)

### Color
- Minimum 4.5:1 contrast ratio for text (WCAG AA)
- Don't use color alone to convey information
- Support dark mode via prefers-color-scheme
- Use CSS custom properties for theme tokens

### Motion
- Respect prefers-reduced-motion
- Keep animations under 400ms for UI transitions
- Use easing curves, never linear for UI motion
- Animate transform and opacity only when possible

### Accessibility
- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Provide visible focus indicators
- Include skip navigation links
- ARIA labels where semantic HTML isn't sufficient
- Touch targets minimum 44x44px

### Performance
- Lazy load below-the-fold images
- Use responsive images (srcset/sizes)
- Minimize layout shifts (reserve space for async content)
- Prefer CSS over JavaScript for visual effects

### Forms
- Always use labels (not placeholder-only)
- Group related inputs with fieldset/legend
- Show validation errors inline, near the field
- Support autocomplete attributes

### Navigation
- Keep primary navigation consistent across pages
- Indicate current page/section
- Support both mouse and keyboard navigation
- Breadcrumbs for deep hierarchies

---

*Source: [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) - MIT License*
