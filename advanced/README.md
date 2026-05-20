# Advanced Percy + Cypress example — STUB

**Status:** Phase 1 stub. `matrix.yml` is populated with the matrix-row plan for `@percy/cypress` based on SDK API research. Test code in `cypress/e2e/todomvc_advanced.cy.js` is **not yet written**.

See the basic example at the repo root for the minimum integration. See [`matrix.yml`](./matrix.yml) for the planned matrix-row coverage.

## What this example will cover

Each `it(...)` block in `cypress/e2e/todomvc_advanced.cy.js` will exercise one row of the matrix (widths, percyCSS, minHeight, enableJavaScript, scope, discovery, domTransformation, responsiveSnapshotCapture, labels, testCase, devicePixelRatio, regions via `createRegion`, readiness preset, browsers, cross-origin iframe handling). Global SDK config — readiness preset, default widths, discovery — will live in `.percy.yml`.

## Run locally (once tests are written)

```bash
cd advanced
npm install
export PERCY_TOKEN="<your project token>"      # do NOT commit
npm run test:advanced
```

Or in `--testing` (no real token, asserts via `/test/requests`):

```bash
npm run test:advanced:ci
```

## Coverage matrix

States: `Covered` / `N/A — <reason>` / `Planned` / `Deprecated`. Source of truth: [`matrix.yml`](./matrix.yml).

> Phase 1 stub: most rows are currently `Planned` (matrix populated, test code TBD). The basic example exercises three bare `cy.percySnapshot()` calls with no options.
