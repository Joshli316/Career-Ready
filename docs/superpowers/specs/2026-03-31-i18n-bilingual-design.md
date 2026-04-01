# CareerReady i18n — Bilingual English/Chinese Design Spec

**Date:** 2026-03-31
**Status:** Approved, ready to build

## Overview

Add a Chinese/English language toggle to CareerReady. All user-facing text — nav, headings, page content, buttons, placeholders, aria-labels — gets translated. The app is currently 100% hardcoded English with zero i18n infrastructure.

## Approach

JSON translation files + React Context. No external i18n library.

## Architecture

### Translation Files

Location: `src/lib/i18n/`

- `en.json` — English strings (source of truth)
- `zh.json` — Chinese translations, identical key structure

Key structure organized by page/section:

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "saved": "Saved",
    "loading": "Loading...",
    "error": "Something went wrong",
    "tryAgain": "Try again",
    "goBack": "Go back",
    "getStarted": "Get Started Free",
    "skipToContent": "Skip to main content"
  },
  "nav": {
    "knowYourself": "Know Yourself",
    "applications": "Applications",
    "resumes": "Resumes",
    "interviews": "Interviews",
    "jobSearch": "Job Search",
    "socialMedia": "Social Media",
    "landingTheJob": "Landing the Job",
    "contactLog": "Contact Log",
    "dashboard": "Dashboard"
  },
  "landing": {
    "heroTitle": "Land your first job, step by step.",
    "heroSubtitle": "8 connected tools that guide you from identifying your strengths to acing the interview.",
    ...
  },
  "knowYourself": {
    "title": "Know Yourself",
    "description": "...",
    "skills": {
      "title": "Skills Inventory",
      "softSkills": "Soft Skills",
      "hardSkills": "Hard Skills",
      ...
    },
    "beliefs": { ... },
    "branding": { ... },
    "focusGoals": { ... },
    "powerStatement": { ... },
    "workValues": { ... }
  },
  "applications": { ... },
  "resumes": { ... },
  "interviews": { ... },
  "jobSearch": { ... },
  "socialMedia": { ... },
  "landingTheJob": { ... },
  "contactLog": { ... }
}
```

### Language Context Provider

File: `src/lib/i18n/LanguageContext.tsx`

```typescript
interface LanguageContextType {
  language: 'en' | 'zh';
  setLanguage: (lang: 'en' | 'zh') => void;
  t: (key: string) => string;
}
```

Behavior:
- On mount, reads `localStorage.getItem('careerready-lang')` — defaults to `'en'`
- On language change, writes to localStorage and sets `document.documentElement.lang`
- `t(key)` takes a dot-notated path (e.g., `t('common.save')`) and returns the string from the active language's JSON
- If a key is missing, falls back to English, then returns the key itself as last resort

### Language Toggle Component

File: `src/components/ui/LanguageToggle.tsx`

- Compact toggle button: shows "EN" / "中"
- Placed in both `Sidebar.tsx` (desktop) and `TopNav.tsx` (mobile)
- Calls `setLanguage()` from context on click

### Root Layout Integration

File: `src/app/layout.tsx`

- Wrap app with `<LanguageProvider>`
- Initial `lang="en"` on `<html>`, updated dynamically via `useEffect`

### Font Stack

Update Tailwind config font family to:
```
"Inter", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif
```

No additional font downloads — system Chinese fonts cover all platforms.

## Scope

### What gets translated (all of it):
- Landing page: hero, benefits, phases, tool grid, CTAs (~100+ strings)
- Navigation: sidebar items, top nav, breadcrumbs
- All 8 tool hub pages: titles, descriptions, tool cards
- All 26 sub-pages: titles, descriptions, callouts, tips, questions, skill labels
- Shared UI components: button text, placeholders, aria-labels, toast messages, dialog text
- Error pages: error.tsx, not-found.tsx
- Loading states and empty states
- Tool config (`src/lib/config/tools.ts`): tool names, descriptions, phases

### What does NOT get translated:
- User-entered data (resumes, contacts, notes, STAR stories)
- AI-generated responses (Claude handles language naturally)
- URLs and route paths (no change)
- Brand name "CareerReady" (stays English everywhere)
- Code-facing strings (console logs, error codes)

## Pages and estimated string counts

| Area | Files | Est. strings |
|------|-------|-------------|
| Landing page | 1 | ~100 |
| Nav/layout | 3 | ~15 |
| Tool hub pages (8) | 8 | ~80 |
| Sub-pages (26) | 26 | ~400 |
| Shared UI components | 19 | ~30 |
| Error/not-found | 2 | ~10 |
| Tool config | 1 | ~25 |
| **Total** | **60** | **~660** |

## Toggle UX

- Toggle lives in sidebar (desktop) and top nav (mobile)
- Single click switches instantly — no page reload
- Choice persists via localStorage key `careerready-lang`
- First visit defaults to English
- All text swaps in place — no URL change, no routing change

## Future / Out of scope (not part of this build)

- Add bilingual OG image (show both English and Chinese text, or swap based on language)

## Implementation order

1. Create i18n infrastructure (`LanguageContext`, `en.json` skeleton, `LanguageToggle`)
2. Wire provider into root layout + add toggle to Sidebar and TopNav
3. Extract and translate landing page strings
4. Extract and translate tool config + nav items
5. Extract and translate each tool's pages (8 tools, ~3 sub-pages each)
6. Extract and translate shared UI components
7. Extract and translate error/not-found pages
8. Update font stack in Tailwind config
9. Test: toggle works, all text switches, localStorage persists, no missing keys
10. Verify responsive layout at 375px, 768px, 1024px (Chinese text may be wider/narrower)
