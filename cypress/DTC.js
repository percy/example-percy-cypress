///<reference types="cypress">
Cypress.on('uncaught:exception', (err, runnable) => {
  console.error('Uncaught Exception:', err.message)
return false
})
describe("Document type Configuration",()=>
{
  baseurl = 'https://test-neev.azurewebsites.net/cdn-app/reports'
},()=>{

context('Utilizing API request',()=>{
beforeEach(()=>cy.getAndSetToken());


 it('Visit URL with Auth Token', () => {
  cy.percySnapshot( 'DTC_test', { widths: [768, 992, 1200] });
  cy.visit('https://test-neev.azurewebsites.net/cdn-app/reports');
   cy.wait(10000)
      cy.log("successfully login")
      const num = Date.now(); 
      const n = num.toString();
      cy.wait(9000)
      cy.get('#sidebar-container').click()
      cy.get('.se-control-panel').invoke('show')
      cy.wait(2000)
      cy.get('.icon-arrow-right > .se-chevron-right').click({multiple:true})
      cy.get('.submenu-list-container').invoke('show')
      cy.contains('Document Type Configuration').click({force:true})
       //Verify the bread crumbs on main page
       cy.get('.breadcrumb-item').should('contain',' Document Type Configuration ')
      cy.wait(5000)
          
  
            //Add the Document type config    
           cy.get('[title="Add"] > .se-add-circle').click({force:true})
            cy.wait(4000)
                //Verify the bread crumbs on Add page
            cy.get('.breadcrumb-item').should('contain','Add')
            cy.get('input[formcontrolname ="DOC_TYPE"]').type('doctype_test{enter}'+n)
           cy.wait(3000)
            cy.get('ejs-dropdownlist [formcontrolname="CREP"]').type('MD{enter}')
      
            cy.wait(1000)
            cy.get('ejs-dropdownlist [formcontrolname ="FORMAT"]').type('*{enter}')
            //Verify if save button is disabled with blank field detail
            cy.get('button').contains('Save').should('be.disabled')
            cy.get('[title="Add"] > .se-add-circle').click({force:true})
            cy.wait(2000)
            cy.get('tr > :nth-child(1) > .e-input-group').type('EN - English', { force: true });
            cy.wait(1000)
            cy.get('input[name="DESCRIPTION"]').type('testing DTC{enter}')
            cy.wait(2000)
            // Verify that description editable 
            cy.get('.se-edit').eq(0).click({force:true})

            cy.get('input[name="DESCRIPTION"]').type('1{enter}')
            // Verify that description deletable 
             cy.get('.se-delete').eq(0).click({force:true})
             cy.wait(1000)
             cy.get('.e-footer-content').contains('button', 'No').should('be.visible').click({force:true})
             cy.wait(1000)
             cy.get('.se-delete').eq(0).click({force:true})
             cy.get('.e-footer-content > .e-control.e-btn.e-lib.e-primary.e-flat', { multiple: true }).each(($el) => {
              cy.wrap($el).click({ force: true });
          });
             cy.wait(2000)
            //Add descripiton again
            cy.get('[title="Add"] > .se-add-circle').click({force:true})
            cy.wait(2000)
           // cy.get('tr > :nth-child(1) > .e-input-group').type('EN - English{enter}')
           cy.get('tr > :nth-child(1) > .e-input-group').type('EN - English', { force: true });
           cy.wait(1000) 
            cy.get('input[name="DESCRIPTION"]').type('testing DTC{enter}')
            cy.wait(2000)

            //Verify if save button is enabled after adding mandatory details
            cy.get('button').contains('Save').should('not.be.disabled')
            cy.wait(2000)
            cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
            
            cy.wait(2000)
            cy.get('.e-toast').should('contain','Record added successfully')
              
            //verify if after adding detail cancel button is workign or not 
              cy.get('[title="Add"] > .se-add-circle').click({force:true})
              cy.get('input[formcontrolname ="DOC_TYPE"]').type('doctype_test{enter}'+n)
              cy.wait(3000)
              cy.get('ejs-dropdownlist [formcontrolname="CREP"]').type('MD{enter}')
              cy.wait(3000)
              //Verify that format contains dropdown list -need to do it manually 
           
              cy.get('ejs-dropdownlist [formcontrolname="FORMAT"]').type('PDF');
              cy.get('ejs-dropdownlist [formcontrolname="FORMAT"]').should('be.visible') .should('contain',"PDF");

            
              cy.get('[title="Add"] > .se-add-circle').click({force:true})
            cy.wait(2000)
            //cy.get('tr > :nth-child(1) > .e-input-group').type('EN - English')
            cy.get('tr > :nth-child(1) > .e-input-group').type('EN - English', { force: true });
            cy.wait(1000)
            cy.get('input[name="DESCRIPTION"]').type('testing DTC{enter}')
            cy.wait(2000)
            cy.get('button').contains('Cancel').click({force:true})


            //Edit     
          cy.get('#DESCRIPTION_filterBarcell').type('testing DTC{enter}')
          cy.get('.se-edit').eq(0).click({force:true})
          //cy.get('input[formcontrolname ="FORMAT"]').clear()
          //Verify the bread crumbs on edit
          cy.get('.breadcrumb-item').should('contain','doctype_test')

          cy.get('ejs-dropdownlist [formcontrolname ="FORMAT"]').type('pdf{enter}',{force:true})
          cy.contains('button','Save').click({force:true}) 
          cy.wait(1000)
          cy.get('ejs-toast >.e-toast').should('contain','Record updated successfully')
        

          //Delete
          cy.get('#DOC_TYPE_filterBarcell').type('doctype_test{enter}'+n)
          //verify view icon does not exist in action column
          cy.get('.se-view').should('not.exist')

          cy.get('.se-delete').click({force:true})
          cy.contains('button', 'No').click({force:true})
          cy.wait(1000)
          cy.get('.se-delete').click({force:true})
          cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
          cy.wait(1000)
          cy.get('.e-toast').should('contain','Document Type Deleted Successfully')
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
      cy.contains('Document Type Configuration').click({force:true})
      
      cy.wait(1000)
      //Verify the bread crumbs on main page
      cy.get('.breadcrumb-item').should('contain',' Document Type Configuration ')

      //Verify the grid header 
         cy.get('table thead th').then(($headers) => {
            const headerNames = Array.from($headers).map((header) => header.innerText.trim());
            
            // Check if all required headers are present
            const requiredHeaders = [
              'Document Type',
              'Content Repository',
              'Format',
              'Description',
              'Actions'
            ];
      
            requiredHeaders.forEach(header => {
              expect(headerNames).to.include(header);
            });
          });
    //Verify the icons present on the grid 
          const icons = {
            'Column Chooser': '.se-view-columns', 
            'Search': 'i.se-search',                 
            'Group By': '.se-groupby',             
            'Bulk Action': '.se-bulk-actions',       
            'Add': '.se-add-circle'                      
          };
          for (const [iconName, iconSelector] of Object.entries(icons)) {
            cy.get(iconSelector,{ timeout: 10000 }).should('be.visible').parent().should('have.attr', 'title', iconName)
          }
          cy.wait(2000)
    //Verify the ascending sort 
            cy.get('.e-headertext').contains('Document Type').click({force:true})
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
          cy.get('.e-headertext').contains('Document Type').click();
          verifyColumnSorted('descending');

      //Group by
 cy.get('.se-groupby').click({force:true})
  cy.wait(2000)
  const draggableRow = cy.get('[data-colindex="0"] > .e-headercelldiv').contains('Document Type')  // Replace with your actual selector
  const targetGrid =  cy.get('.e-groupdroparea') // Replace with your actual selector
  draggableRow.trigger('mousedown', { button: 0 })
  targetGrid.trigger('mousemove', { clientX: 500, clientY: 500 })
  targetGrid.trigger('mouseup', { force: true })
  cy.get('.e-groupcaption').should('contain','Document Type:')
  cy.get('.e-ungroupbutton').click({force:true})
   cy.get('.se-groupby').click({force:true})
// Column Chooser
//verify the cancel button on column chooser
cy.wait(1000)
cy.get('.se-view-columns').click({force:true})
  cy.get('.e-ccheck').contains('.e-label','Document Type').click({force:true})
  cy.contains('button','No').click({force:true})
  cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Document Type').should('be.visible')
  
//verify the OK button on column chooser
cy.wait(1000)
cy.get('.se-view-columns').click({force:true}).click({force:true})
cy.get('.e-ccheck').contains('.e-label','Document Type').click({force:true})
cy.contains('button','Yes').click({force:true})
cy.wait(4000)
cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Document Type').should('not.be.visible')
//verify the scroll bar in column chooser
cy.wait(1000)
  cy.get('.se-view-columns').click({force:true})
  const scrollableElement = '.e-cc-contentdiv';

    // Get the initial scroll position
    cy.get(scrollableElement).then(($el) => {
      const initialScrollTop = $el[0].scrollTop;

      // Scroll down
      cy.get(scrollableElement).scrollTo('bottom');

      // Get the new scroll position
      cy.get(scrollableElement).then(($el) => {
        const newScrollTop = $el[0].scrollTop;

        // Assert that the scroll position has changed
        expect(newScrollTop).to.be.greaterThan(initialScrollTop);
        cy.get(`${scrollableElement} > :last-child`) // Adjust the selector as needed
        .invoke('text') // Get the text content of the last item
        .then((lastItemText) => {
          // Print the last item to the console
          cy.log('Last Item:', lastItemText);
        })
      })
      cy.get('.e-ccsearch').type("DESCRIPTION").click({force:true})
      cy.get('.e-cc-contentdiv') .invoke('text').should('contain',"DESCRIPTION")
      cy.get('.e-cc-contentdiv') .invoke('text').should('not.contain',"Content Repository")
    })



cy.reload()
cy.wait(4000)
//Add DTC record
cy.get('[title="Add"] > .se-add-circle').click({force:true})
cy.wait(2000)
cy.get('input[formcontrolname ="DOC_TYPE"]').type('doctype_test{enter}')
cy.get('ejs-dropdownlist [formcontrolname="CREP"] ').type('MD{enter}')
cy.get('ejs-dropdownlist [formcontrolname ="FORMAT"]').type('test_format{enter}')
cy.get('[title="Add"] > .se-add-circle').click({force:true})
cy.wait(2000)
cy.get('tr > :nth-child(1) > .e-input-group').type('EN - English', { force: true });
 cy.wait(1000)
cy.get('input[name="DESCRIPTION"]').type('testing DTC1{enter}')
cy.wait(2000)
cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})       
cy.wait(1000)
cy.get('.e-toast').should('contain','Record added successfully')
    cy.wait(2000)
    //Add DTC record
cy.get('[title="Add"] > .se-add-circle').click({force:true})
cy.wait(2000)
cy.get('input[formcontrolname ="DOC_TYPE"]').type('doctype_test1{enter}')
cy.get('ejs-dropdownlist [formcontrolname="CREP"] ').type('MD{enter}')
cy.get('ejs-dropdownlist [formcontrolname ="FORMAT"]').type('test_format{enter}')
cy.get('[title="Add"] > .se-add-circle').click({force:true})
cy.wait(2000)
cy.get('tr > :nth-child(1) > .e-input-group').type('EN - English', { force: true });
 cy.wait(1000)
cy.get('input[name="DESCRIPTION"]').type('testing DTC2{enter}')
cy.wait(2000)
cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})       
cy.wait(1000)
cy.get('.e-toast').should('contain','Record added successfully')
//Add DTC record
cy.get('[title="Add"] > .se-add-circle').click({force:true})
cy.wait(2000)
cy.get('input[formcontrolname ="DOC_TYPE"]').type('doctype_test2{enter}')
cy.get('ejs-dropdownlist [formcontrolname="CREP"] ').type('MD{enter}')
cy.get('ejs-dropdownlist [formcontrolname ="FORMAT"]').type('test_format{enter}')
cy.get('[title="Add"] > .se-add-circle').click({force:true})
cy.wait(2000)
cy.get('tr > :nth-child(1) > .e-input-group').type('EN - English', { force: true });
 cy.wait(1000)
cy.get('input[name="DESCRIPTION"]').type('testing DTC3{enter}')
cy.wait(2000)
cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})       
cy.wait(1000)
cy.get('.e-toast').should('contain','Record added successfully')


 //Search 
 cy.get('[title="Search"] > .se-search').click({force:true})
cy.wait(2000)
cy.get('#gridGlobalSearch').type('testing DTC1{enter}',{force:true})
cy.get('.e-row > [data-colindex="4"]').should('contain','testing DTC1')
//Bulk delete 
//By manually selecting the record 
cy.wait(2000)
cy.get('.se-bulk-actions').click({force:true})
cy.get('.e-row > [data-colindex="1"]').eq(0).click({force:true})
cy.get('.e-toolbar-left').contains('Clear').click({force:true})
cy.get('.e-toolbar-left').contains('Clear').should('not.exist')
cy.wait(1000)
cy.get('.e-row > [data-colindex="1"]').eq(0).click({force:true})
cy.get('.e-toolbar-left').contains('Delete').click({force:true})
cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Document Type Deleted Successfully')
cy.get('#DESCRIPTION_filterBarcell').clear()

cy.reload()
//Select ALL
cy.get('#DESCRIPTION_filterBarcell').type('testing DTC{enter}{enter}')
cy.wait(2000)
cy.get('.se-bulk-actions').click()
cy.get('.e-row > [data-colindex="1"]').eq(0).click({force:true})
cy.get('.e-toolbar-left').contains('Select all').click({force:true})
cy.get('.e-toolbar-left').contains('Delete').click({force:true})
cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
cy.wait(1000)
cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Document Types Deleted Successfully')
cy.get('#DESCRIPTION_filterBarcell').clear()




})  






})
})
