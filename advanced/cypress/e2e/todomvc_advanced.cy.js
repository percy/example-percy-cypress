// PER-8195 Phase 1 — cypress advanced example.
// Each test exercises one row of the Advanced Feature Matrix. See ../../matrix.yml
// for the canonical mapping of test name -> matrix row.

describe('TodoMVC Advanced', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.new-todo').should('exist').type('Walk the dog{enter}')
  })

  it('exercises widths', () => {
    cy.percySnapshot('TodoMVC Advanced > exercises widths', {
      widths: [375, 768, 1280, 1920],
    })
  })

  it('exercises percyCSS', () => {
    cy.percySnapshot('TodoMVC Advanced > exercises percyCSS', {
      percyCSS: '.todo-list li { background: #fffde7 !important; }',
    })
  })

  it('exercises minHeight', () => {
    cy.percySnapshot('TodoMVC Advanced > exercises minHeight', {
      minHeight: 2000,
    })
  })

  it('exercises enableJavaScript', () => {
    cy.percySnapshot('TodoMVC Advanced > exercises enableJavaScript', {
      enableJavaScript: true,
    })
  })

  it('exercises scope', () => {
    // Cypress runs tests in an iframe; `scope` targets the application
    // document, not the Cypress runner.
    cy.percySnapshot('TodoMVC Advanced > exercises scope', {
      scope: '.todoapp',
    })
  })

  it('exercises discovery options', () => {
    cy.percySnapshot('TodoMVC Advanced > exercises discovery options', {
      discovery: {
        allowedHostnames: ['localhost'],
        networkIdleTimeout: 500,
      },
    })
  })

  it('exercises domTransformation', () => {
    cy.percySnapshot('TodoMVC Advanced > exercises domTransformation', {
      domTransformation: `(documentClone) => {
        const banner = documentClone.createElement('div');
        banner.textContent = 'Snapshot via domTransformation';
        banner.style.cssText = 'background:#1976d2;color:#fff;padding:8px;';
        documentClone.body.prepend(banner);
      }`,
    })
  })

  it('exercises responsiveSnapshotCapture', () => {
    cy.percySnapshot('TodoMVC Advanced > exercises responsiveSnapshotCapture', {
      responsiveSnapshotCapture: true,
      widths: [375, 1280],
    })
  })

  it('exercises labels', () => {
    cy.percySnapshot('TodoMVC Advanced > exercises labels', {
      labels: 'smoke,sdk-cypress',
    })
  })

  it('exercises testCase', () => {
    cy.percySnapshot('TodoMVC Advanced > exercises testCase', {
      testCase: 'todomvc-advanced-suite',
    })
  })

  it('exercises devicePixelRatio', () => {
    cy.percySnapshot('TodoMVC Advanced > exercises devicePixelRatio', {
      devicePixelRatio: 2,
    })
  })

  it('exercises regions', () => {
    cy.percySnapshot('TodoMVC Advanced > exercises regions', {
      regions: [
        {
          algorithm: 'ignore',
          elementSelector: { boundingBox: { x: 0, y: 0, width: 200, height: 100 } },
        },
      ],
    })
  })

  it('exercises readiness preset', () => {
    // global readiness preset is also set in .percy.yml; this test overrides
    // it locally to confirm per-snapshot override works.
    cy.percySnapshot('TodoMVC Advanced > exercises readiness preset', {
      readiness: { preset: 'strict', timeoutMs: 5000 },
    })
  })

  it('exercises browsers override', () => {
    cy.percySnapshot('TodoMVC Advanced > exercises browsers override', {
      browsers: ['chrome', 'firefox'],
    })

    cy.get('.todo-list li').should('have.length', 1)
  })
})
