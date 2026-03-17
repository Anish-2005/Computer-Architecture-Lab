# Contributing to Computer Architecture Lab

Thanks for contributing. This guide keeps changes consistent and reviewable.

## Ground Rules

- Keep pull requests focused on one logical change.
- Prefer small, reviewable commits.
- Update documentation when behavior or setup changes.
- Do not include secrets, API keys, or environment credentials in commits.

## Development Setup

```bash
git clone https://github.com/Anish-2005/computer-architecture-lab.git
cd computer-architecture-lab
npm install
npm run dev
```

## Validation Checklist

Run these before opening a PR:

```bash
npm run lint
npm run build
```

## Branch Naming

Use one of these prefixes:

- `feature/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `refactor/<short-description>`

Examples:

- `feature/rtl-export-button`
- `fix/waveform-time-scale`
- `docs/readme-refresh`

## Commit Message Style

Use clear, imperative messages.

Format:

```text
type(scope): summary
```

Examples:

- `feat(rtl): add entity port filtering`
- `fix(labs): handle empty assignment response`
- `docs(readme): update setup instructions`

## Pull Request Checklist

- [ ] I ran `npm run lint` and fixed issues.
- [ ] I ran `npm run build` successfully.
- [ ] I tested the relevant route(s) locally.
- [ ] I updated docs/screenshots if UI or behavior changed.
- [ ] I linked related issue(s), if applicable.

## UI and UX Expectations

For frontend changes:

- Keep visual style consistent with existing dark-cyan design language.
- Preserve responsive behavior across mobile and desktop.
- Avoid adding heavy dependencies for small UI changes.

## Code Areas

- Routes: `src/App.jsx`
- Page modules: `src/pages/*`
- Shared styling: `src/App.css`

## Reporting Bugs

When opening an issue, include:

- Expected behavior
- Actual behavior
- Steps to reproduce
- Browser/OS details
- Screenshots or screen recording (if UI-related)

## Questions

Open a GitHub issue for discussion before implementing large changes (major refactors, architectural changes, or new subsystems).
