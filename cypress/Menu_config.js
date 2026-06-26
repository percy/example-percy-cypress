///<reference types="cypress">
Cypress.on('uncaught:exception', (err, runnable) => {
  console.error('Uncaught Exception:', err.message)
return false
})
describe("Menu Configuration",()=>
{
  baseurl = 'https://test-neev.azurewebsites.net/cdn-app/reports'
},()=>{

context('Utilizing API request',()=>{
beforeEach(()=>cy.getAndSetToken());

 it('Menu Configuration CRD operation', () => {
  cy.visit('https://test-neev.azurewebsites.net/cdn-app/reports');
   cy.wait(10000)
    cy.log("successfully login")
    const num = Date.now(); 
    const n = num.toString();
    cy.wait(15000)
    cy.get('#sidebar-container').click()
    cy.get('.se-control-panel').invoke('show')
    cy.wait(2000)
    cy.get('.icon-arrow-right > .se-chevron-right').click({multiple:true})
    cy.get('.submenu-list-container').invoke('show')
    cy.wait(2000)
     cy.contains('Menu Configuration').click({force:true})
      //Verify the bread crumbs on main page
      cy.get('.breadcrumb-item').should('contain',' Menu Configuration ')
     cy.wait(3000)
      //delete if already exists
      cy.get('#application_filterBarcell').type('TestTT1{enter}')
      cy.get('body').then(($body) => {
        if ($body.find('.e-emptyrow').length > 0 && $body.find('.e-emptyrow').text().includes("No records to display")) {
          // If "No records to display" message is found, do nothing
          cy.log('No records found, no deletion needed.');
          cy.get('#application_filterBarcell').clear().type('{enter}')
        } else {
    cy.get('.se-delete').click({force:true})
    cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
     cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Record deleted successfully')
        }
      })

     //Add Menu config record
   cy.get('[title="Add"] > .se-add-circle').click({force:true})
   cy.wait(2000)
   //Verify the bread crumbs on Add page
   cy.get('.breadcrumb-item').should('contain','Add')
    //Verify if save button is disabled with blank field detail
    cy.get('button').contains('Save').should('be.disabled')

   cy.get('input[formcontrolname ="application"]').type('TestTT1')
   cy.get('.addNewMenuRow').contains('button', 'Add Level 1 Item').click({force:true})
    
    cy.get('input[formcontrolname ="TILE_ID"]').type('Tilenm1')
    cy.get('input[formcontrolname ="HEADER"]').type('header1')
    cy.get('input[formcontrolname ="NAME"]').type('Testing1')
    cy.get('input[formcontrolname ="ROUTER_LINK"]').type('link1')
    cy.get('input[formcontrolname ="icon"]').type('icon1')
    cy.get('input[formcontrolname ="DESCRIPTION_TRANSLATE"]').type('testing menu1')
    //Verify the delete button is working 
    cy.get('.se-delete').click({force:true})
    
    cy.get('.addNewMenuRow').contains('button', 'Add Level 1 Item').click({force:true})
    cy.get('input[formcontrolname ="TILE_ID"]').type('Tilenm1')
    cy.get('input[formcontrolname ="HEADER"]').type('header1')
    cy.get('input[formcontrolname ="NAME"]').type('Testing1')
    cy.get('input[formcontrolname ="ROUTER_LINK"]').type('link1')
    cy.get('input[formcontrolname ="icon"]').type('icon1')
    cy.get('input[formcontrolname ="DESCRIPTION_TRANSLATE"]').type('testing menu1 {enter}')

       cy.wait(2000)
   //Verify if save button is enabled after adding mandatory details
   cy.get('button').contains('Save').should('not.be.disabled')
   //record cancelled 
   cy.contains('Cancel').click({force:true})

     //Add Menu config record
     cy.get('[title="Add"] > .se-add-circle').click({force:true})
     cy.wait(2000)
     cy.get('input[formcontrolname ="application"]').type('TestTT1')
     cy.get('.addNewMenuRow').contains('button', 'Add Level 1 Item').click({force:true})
      
      cy.get('input[formcontrolname ="TILE_ID"]').type('Tilenm1')
      cy.get('input[formcontrolname ="HEADER"]').type('header1')
      cy.get('input[formcontrolname ="NAME"]').type('Testing1')
      cy.get('input[formcontrolname ="ROUTER_LINK"]').type('link1')
      cy.get('input[formcontrolname ="icon"]').type('icon1')
      cy.get('input[formcontrolname ="DESCRIPTION_TRANSLATE"]').type('testing menu1')
      cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
      cy.wait(1000)
      cy.get('.e-toast').should('contain','Record added successfully')
      
    //View the menu config record 
   cy.wait(2000)
   cy.get('#application_filterBarcell').clear()
    cy.get('#application_filterBarcell').type('TestTT1{enter}',{force:true})
    cy.wait(2000)
    cy.get('.se-view').click({force:true})
    cy.wait(9000)
    //Verify the bread crumbs on view page
     cy.get('.breadcrumb-item').should('contain','View ')
     cy.get('.listingDataIn').find('p').should('not.have.attr', 'contenteditable', 'true');
     cy.get('.breadcrumb-item').contains('Menu Configuration').click({force:true})     

    //Delete the tile config record
      cy.get('#application_filterBarcell').type('TestTT1{enter}',{force:true})
           cy.get('.se-delete').click({force:true})
          cy.contains('button', 'No').click({force:true})
          cy.wait(1000)
          cy.get('.se-delete').click({force:true})
      cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
      cy.get('.e-toast').should('contain','Record deleted successfully')
      cy.screenshot();
    })

  it('Main Page verification ', () => {
      cy.visit('https://test-neev.azurewebsites.net/cdn-app/reports');
       cy.wait(10000)
          cy.get('#sidebar-container').click()
          cy.get('.se-control-panel').invoke('show')
          cy.wait(2000)
          cy.get('.icon-arrow-right > .se-chevron-right').click({multiple:true})
          cy.get('.submenu-list-container').invoke('show')
          cy.wait(2000)
          cy.contains('Menu Configuration').click({force:true})
          cy.wait(8000)
          //Verify the bread crumbs on main page
      cy.get('.breadcrumb-item').should('contain',' Menu Configuration ')

      //Verify the grid header 
      cy.get('table thead th').then(($headers) => {
        const headerNames = Array.from($headers).map((header) => header.innerText.trim());
        console.log(headerNames); // Log to inspect the headers
        
        const requiredHeaders = ['Application', 'Configuration', 'Actions'];
        requiredHeaders.forEach(header => {
          expect(headerNames).to.include(header);
        });
      });

    //Verify the icons present on the grid 
          const icons = {
            'Column Chooser': '.se-view-columns', 
            'Search': 'i.se-search',                 
            'Bulk Action': '.se-bulk-actions',       
            'Add': '.se-add-circle'                      
          };
          for (const [iconName, iconSelector] of Object.entries(icons)) {
            cy.get(iconSelector,{ timeout: 10000 }).should('be.visible').parent().should('have.attr', 'title', iconName)
          }
          cy.wait(2000)
    //Verify the ascending sort 
            cy.get('.e-headertext').contains('Application').click({force:true})
          //  Verify that data is sorted in ascending order
          verifyColumnSorted('ascending');
          function verifyColumnSorted(order) {
            cy.get('[aria-rowindex="1"] > [data-colindex="0"]') 
              .then($cells => {
                const values = Array.from($cells).map(cell => cell.innerText.trim());
                const sortedValues = [...values].sort();
                if (order === 'descending') {
                  sortedValues.reverse(); // Reverse the array for descending order
                }
                expect(values).to.deep.equal(sortedValues);
              })
            }
            cy.wait(2000)
    // Verify the desending sort 
          cy.get('.e-headertext').contains('Application').click({force:true});
          verifyColumnSorted('descending');

    
          //Group by
    /* cy.get('.se-groupby').click({force:true})
      cy.wait(2000)
      const draggableRow = cy.get('[data-colindex="0"] > .e-headercelldiv').contains('Application')  // Replace with your actual selector
      const targetGrid =  cy.get('.e-groupdroparea') // Replace with your actual selector
      draggableRow.trigger('mousedown', { button: 0 })
      targetGrid.trigger('mousemove', { clientX: 500, clientY: 500 })
      targetGrid.trigger('mouseup', { force: true })
      cy.get('.e-groupcaption').should('contain','Application:')
      cy.get('.e-ungroupbutton').click({force:true})
       cy.get('.se-groupby').click({force:true})*/
    // Column Chooser
    //verify the cancel button on column chooser
cy.wait(1000)
cy.get('.se-view-columns').click({force:true})
  cy.get('.e-ccheck').contains('.e-label','Application').click({force:true})
  cy.contains('button','Cancel').click({force:true})
  cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Application').should('be.visible')
  
//verify the OK button on column chooser
    cy.wait(1000)
    cy.get('.se-view-columns').click({force:true}).click({force:true})
    cy.get('.e-ccheck').contains('.e-label','Application').click({force:true})
    cy.contains('button','OK').click({force:true})
    cy.wait(4000)
    cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Application').should('not.be.visible')
    cy.reload()
   //Add Menu config record
   cy.get('[title="Add"] > .se-add-circle').click({force:true})
   cy.wait(2000)
   cy.get('input[formcontrolname ="application"]').type('TestTT1')
   cy.get('.addNewMenuRow').contains('button', 'Add Level 1 Item').click({force:true})
    
    cy.get('input[formcontrolname ="TILE_ID"]').type('Tilenm1')
    cy.get('input[formcontrolname ="HEADER"]').type('header1')
    cy.get('input[formcontrolname ="NAME"]').type('Testing1')
    cy.get('input[formcontrolname ="ROUTER_LINK"]').type('link1')
    cy.get('input[formcontrolname ="icon"]').type('icon1')
    cy.get('input[formcontrolname ="DESCRIPTION_TRANSLATE"]').type('testing menu1')
    cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
    cy.wait(1000)
    cy.get('.e-toast').should('contain','Record added successfully')
    //Add Menu config record
   cy.get('[title="Add"] > .se-add-circle').click({force:true})
   cy.wait(2000)
   cy.get('input[formcontrolname ="application"]').type('TestTT2')
   cy.get('.addNewMenuRow').contains('button', 'Add Level 1 Item').click({force:true})
    
    cy.get('input[formcontrolname ="TILE_ID"]').type('Tilenm1')
    cy.get('input[formcontrolname ="HEADER"]').type('header1')
    cy.get('input[formcontrolname ="NAME"]').type('Testing1')
    cy.get('input[formcontrolname ="ROUTER_LINK"]').type('link1')
    cy.get('input[formcontrolname ="icon"]').type('icon1')
    cy.get('input[formcontrolname ="DESCRIPTION_TRANSLATE"]').type('testing menu1')
    cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
    cy.wait(1000)
    cy.get('.e-toast').should('contain','Record added successfully')
        cy.wait(2000)
        //Add Menu config record
   cy.get('[title="Add"] > .se-add-circle').click({force:true})
   cy.wait(2000)
   cy.get('input[formcontrolname ="application"]').type('TestTT3')
   cy.get('.addNewMenuRow').contains('button', 'Add Level 1 Item').click({force:true})
    
    cy.get('input[formcontrolname ="TILE_ID"]').type('Tilenm1')
    cy.get('input[formcontrolname ="HEADER"]').type('header1')
    cy.get('input[formcontrolname ="NAME"]').type('Testing1')
    cy.get('input[formcontrolname ="ROUTER_LINK"]').type('link1')
    cy.get('input[formcontrolname ="icon"]').type('icon1')
    cy.get('input[formcontrolname ="DESCRIPTION_TRANSLATE"]').type('testing menu1')
    cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
    cy.wait(1000)
    cy.get('.e-toast').should('contain','Record added successfully')
    cy.wait(2000)
     //Search 
     cy.get('[title="Search"] > .se-search').click({force:true})
    cy.wait(2000)
    cy.get('#gridGlobalSearch').type('TestTT1{enter}',{force:true})
    cy.wait(1000)
    cy.get('.e-row > [data-colindex="0"]').should('contain','TestTT1')
    //Bulk delete 
            //By manually selecting the record 
cy.wait(2000)
cy.get('.se-bulk-actions').click({force:true})
cy.get('.e-row > [data-colindex="2"]').eq(0).click({force:true})
cy.get('.e-toolbar-left').contains('Clear').click({force:true})
cy.get('.e-toolbar-left').contains('Clear').should('not.exist')
cy.wait(1000)
cy.get('.e-row > [data-colindex="2"]').eq(0).click({force:true})
cy.get('.e-toolbar-left').contains('Delete').click({force:true})
cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Record deleted successfully')
cy.get('#application_filterBarcell').clear()

cy.reload()
//Select ALL
cy.get('#application_filterBarcell').type('TestTT{enter}',{force:true})
cy.wait(2000)
cy.get('.se-bulk-actions').click()
cy.get('.e-row > [data-colindex="1"]').eq(0).click({force:true})
cy.get('.e-toolbar-left').contains('Select all').click({force:true})
cy.get('.e-toolbar-left').contains('Delete').click({force:true})
cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
cy.wait(1000)
cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Record deleted successfully')
cy.get('#application_filterBarcell').clear()



    
  })  
     








})
})