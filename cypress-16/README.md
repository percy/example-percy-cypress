# Percy + Cypress 16: component tests and subdomain navigation

Two Cypress 16 examples:

| Spec | What it shows |
|---|---|
| [`cypress/component/card.cy.jsx`](./cypress/component/card.cy.jsx) | `cy.percySnapshot()` in a React + Vite component test |
| [`cypress/e2e/subdomain.cy.js`](./cypress/e2e/subdomain.cy.js) | `cy.percySnapshot()` after navigating from `a.lvh.me` to `b.lvh.me` |

> **Needs `@percy/cypress` 3.2.0-beta.0 or newer.** `package.json` pins the current release
> (3.1.9), which this directory's specs are written for once the beta is out. With 3.1.9 the
> component snapshots post the whole spec page at the CLI's default widths, and the subdomain spec
> fails. Install the beta to run them:
>
> ```bash
> npm install --save-dev @percy/cypress@3.2.0-beta.0
> ```
>
> These specs aren't part of the repo's CI run.

## Setup

```bash
cd cypress-16
npm install
export PERCY_TOKEN=<your token>
```

`cypress.config.js` passes the address `percy exec` starts on to the SDK with
`expose: { PERCY_SERVER_ADDRESS: process.env.PERCY_SERVER_ADDRESS }`, because Cypress 16 removed
`Cypress.env()`. To run Percy on a port other than 5338 (`percy exec --port <port>`) with Cypress 16,
use `@percy/cli` 1.33.0-beta.0 or newer.

## Component testing

```bash
npm run test:component
```

`cypress/support/component.js` imports `@percy/cypress`; the support file for e2e tests isn't loaded
in component tests. In a component test the SDK snapshots the mounted component:

- width: the test's viewport, including `cy.viewport()` calls (500px by default)
- minimum height: the test's viewport height
- scope: `[data-cy-root]`, the element Cypress mounts into
- URL: without Cypress's `?specPath=` query

Options passed to `cy.percySnapshot()` win, as in the third test, which renders at 375 and 1280.
Pass `percyComponentDefaults: false` to a snapshot to turn the defaults off.

## Subdomain navigation

```bash
npm run test:subdomain
```

`site/server.cjs` serves two pages on port 8010 (set `SITE_PORT` to change it): one for
`a.lvh.me` and one for `b.lvh.me`. `lvh.me` and its subdomains resolve to `127.0.0.1`, so no
`/etc/hosts` change is needed.

Since Cypress 14, `b.lvh.me` is a different origin from `a.lvh.me`, and commands that touch it run
inside `cy.origin()`. The spec calls `cy.percySnapshot()` *after* the `cy.origin()` block, and the
SDK captures the page through `cy.origin()` itself.
