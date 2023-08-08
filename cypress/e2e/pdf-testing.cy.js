describe('PDF Testing', function () {
    it('snapshots correctly', () => {
        
        
        cy.request({
            url: 'https://www.africau.edu/images/default/sample.pdf',
            encoding: 'base64',
        }).then((response) => {

            const pdfData = response.body;

            cy.document().invoke(
                {},
                'write',
                `<iframe src="data:application/pdf;base64,${pdfData}" height="1024" width="100%"></iframe>`
            );

            cy.wait(2000);
            cy.percySnapshot('PDF File');

        });
    })
})
