# Advanced Percy + Cypress example

This directory exercises the full applicable Percy SDK feature surface for `@percy/cypress`. See the basic example at the repo root for the minimum integration.

## What this example covers

A single Cypress spec (`cypress/e2e/todomvc_advanced.cy.js`) where each `it(...)` block exercises one row of the [Percy SDK Advanced Feature Matrix](../../../docs/advanced-example-feature-matrix.md). Global SDK config — readiness preset, default widths, discovery — lives in `.percy.yml` and is consumed by every snapshot.

## Run locally

```bash
cd advanced
npm install
export PERCY_TOKEN="<your project token>"      # do NOT commit this
npm run test:advanced
```

To run without a real token (CI assertion mode):

```bash
npm run test:advanced:ci   # uses --testing + PERCY_TOKEN=fake_token
```

The CI variant asserts every matrix row appears in the captured POST bodies at the local `/test/requests` endpoint. No real Percy build is created.

## Coverage matrix

States: `Covered` / `N/A — <reason>` / `Planned` / `Deprecated`. Source of truth is [`matrix.yml`](./matrix.yml); this table is regenerated from it (do not hand-edit).

| Feature | State | Test |
|---|---|---|
| widths | Covered | `exercises widths` |
| percyCSS | Covered | `exercises percyCSS` |
| minHeight | Covered | `exercises minHeight` |
| enableJavaScript | Covered | `exercises enableJavaScript` |
| scope | Covered | `exercises scope` |
| discovery options | Covered | `exercises discovery options` |
| domTransformation | Covered | `exercises domTransformation` |
| responsiveSnapshotCapture | Covered | `exercises responsiveSnapshotCapture` |
| labels | Covered | `exercises labels` |
| testCase | Covered | `exercises testCase` |
| devicePixelRatio | Covered | `exercises devicePixelRatio` |
| regions | Covered | `exercises regions` |
| readiness preset | Covered | `exercises readiness preset` |
| browsers override | Covered | `exercises browsers override` |
| cross-origin iframe handling | Covered | automatic via `@percy/cypress >= 3.1.8` |
| cookie capture via `getCookies` | Covered | automatic via `@percy/cypress >= 3.1.8` |
| `.percy.yml` global config | Covered | `.percy.yml` consumed at build start |
| environment info reporting | Covered | automatic via `@percy/cypress` client info |
| PERCY_SERVER_ADDRESS via env | Covered | CI advanced job picks up `PERCY_SERVER_ADDRESS` |
| `cliEnableJavascript` alias | Planned | — |
| `disableShadowDOM` | Planned | — |
| `enableLayout` | Planned | — |
| `reshuffleInvalidTags` | Planned | — |
| `scopeOptions.scroll` | Planned | — |
| sync mode | Planned | — |
| regions via `createRegion` helper | Planned | — |
