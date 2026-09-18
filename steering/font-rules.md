---
inclusion: auto
name: Font Rules
description: Rules for using Plus Jakarta Sans font in the SplitHuddle app. Apply when creating or editing any React Native screen, component, or UI file.
---

# Font Rules — Plus Jakarta Sans

This app uses **Plus Jakarta Sans** as the sole typeface. Follow these rules in every file that renders text.

## Importing Text

- **Never** import `Text` from `react-native` directly.
- **Always** import from the custom wrapper:

```tsx
import { Text } from '@/components/ui/Text';
```

- If you need animated text (with `entering`, `exiting`, layout animations), import `AnimatedText`:

```tsx
import { Text, AnimatedText } from '@/components/ui/Text';
```

- **Never** use `Animated.Text` from `react-native-reanimated` directly. Use `AnimatedText` instead.

## How It Works

The custom `Text` component (`src/components/ui/Text.tsx`) automatically maps `fontWeight` to the correct Plus Jakarta Sans font family variant:

| fontWeight | fontFamily |
|---|---|
| `'400'` / `'normal'` | `PlusJakartaSans_400Regular` |
| `'500'` | `PlusJakartaSans_500Medium` |
| `'600'` | `PlusJakartaSans_600SemiBold` |
| `'700'` / `'bold'` | `PlusJakartaSans_700Bold` |
| `'800'` | `PlusJakartaSans_800ExtraBold` |

If no `fontWeight` is specified, it defaults to `400 Regular`.

## Usage Examples

```tsx
// Regular text — no extra props needed
<Text style={{ fontSize: 14 }}>Hello</Text>

// Bold text — just set fontWeight, fontFamily is auto-resolved
<Text style={{ fontWeight: '700' }}>Bold heading</Text>

// Using Typography constants (preferred)
import { Typography } from '@/constants/theme';
<Text style={{ fontWeight: Typography.weights.semibold }}>Section title</Text>

// Animated text with entering animation
<AnimatedText entering={FadeInDown.duration(400)} style={{ fontWeight: '600' }}>
  Animated content
</AnimatedText>
```

## TextInput

`TextInput` components get `PlusJakartaSans_400Regular` automatically via `defaultProps` set in `_layout.tsx`. No extra action needed for inputs.

## Constants Reference

Use the `Fonts` and `Typography` constants from `@/constants/theme`:

```tsx
import { Fonts, Typography } from '@/constants/theme';

// Fonts.regular    = 'PlusJakartaSans_400Regular'
// Fonts.medium     = 'PlusJakartaSans_500Medium'
// Fonts.semibold   = 'PlusJakartaSans_600SemiBold'
// Fonts.bold       = 'PlusJakartaSans_700Bold'
// Fonts.extrabold  = 'PlusJakartaSans_800ExtraBold'

// Typography.weights.regular   = '400'
// Typography.weights.medium    = '500'
// Typography.weights.semibold  = '600'
// Typography.weights.bold      = '700'
// Typography.weights.extrabold = '800'
```

## Do NOT

- Do not import `Text` from `'react-native'`
- Do not use `Animated.Text` from `'react-native-reanimated'`
- Do not manually set `fontFamily` unless overriding with a completely different font
- Do not use numeric fontWeight values outside the 400–800 range (those are the only loaded variants)

## Icons — Lucide React Native only

This app uses **Lucide React Native** as the sole icon library. Follow these rules whenever you render an icon.

### Rules

- **Only** use icons from `lucide-react-native`. Do not introduce any other icon library (e.g. `@expo/vector-icons`, `react-native-vector-icons`, Ionicons, Feather, FontAwesome).
- **Never** import icons directly from `'lucide-react-native'` in a screen or component.
- **Always** import from the central registry:

```tsx
import { WalletIcon, PlusIcon, SearchIcon } from '@/components/Icons';
```

- If the icon you need is not yet registered, add it to `src/components/Icons.tsx` first, then import it from `@/components/Icons`.

```tsx
// In src/components/Icons.tsx
export const PiggyBankIcon: IconComponent = L.PiggyBank;
```

### Why the registry

Expo SDK 56's bundler aggressively tree-shakes named ES module imports from icon libraries. The registry uses `require('lucide-react-native')` to bypass this, so icons resolve reliably. Importing straight from the package may break in production bundles.

### Choosing the right icon

Pick icons that match SplitHuddle's domain (expense splitting, pockets, groups, money). Prefer the most semantically accurate Lucide icon over a generic one:

| Concept | Preferred Lucide icon |
|---|---|
| Pocket / balance / money | `Wallet`, `PiggyBank` |
| Expense / spending | `Receipt`, `HandCoins` |
| Group / members | `Users`, `User` |
| Add / create | `Plus` |
| Settle up / send money | `Send`, `ArrowRightLeft` |
| Lend / borrow | `HandCoins` |
| Reports / analytics | `BarChart3`, `TrendingUp` |
| Search | `Search` |
| Archive | `Archive` |
| Categories (food, fuel, travel, etc.) | `Utensils`, `Fuel`, `Plane`, `Hotel`, `ShoppingBag` |

Keep icon usage consistent: the same concept should use the same icon across every screen.

### Do NOT

- Do not import icons from `'lucide-react-native'` directly in screens or components
- Do not mix in other icon libraries or emoji where a Lucide icon fits
- Do not use a vague icon when a domain-specific one exists (e.g. use `Wallet` for a pocket, not a generic `Circle`)
