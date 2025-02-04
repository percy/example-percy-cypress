///<reference types="cypress">
Cypress.on('uncaught:exception', (err, runnable) => {
  console.error('Uncaught Exception:', err.message)
return false
})
describe("Tile Config",()=>
{
  baseurl = 'https://test-neev.azurewebsites.net/cdn-app/reports'
},()=>{

context('Utilizing API request',()=>{
beforeEach(()=>cy.getAndSetToken())

const num = Date.now(); 
    const n = num.toString();
 it('Visit URL with Auth Token', () => {
  cy.visit('https://test-neev.azurewebsites.net/cdn-app/reports');
   cy.wait(10000)
    cy.log("successfully login")
    
    cy.wait(9000)
    cy.get('#sidebar-container').click()
    cy.get('.se-control-panel').invoke('show')
    cy.wait(2000)
    cy.get('.icon-arrow-right > .se-chevron-right').click({multiple:true})
    cy.get('.submenu-list-container').invoke('show')
    cy.wait(2000)
     cy.contains('Tiles Configuration').click({force:true})
     cy.wait(3000)
     //Add Tile config record
    cy.get('[title="Add"] > .se-add-circle').click({force:true})
     //Verify the bread crumbs on Add page
   cy.get('.breadcrumb-item').should('contain','Add')
   cy.wait(2000)
   cy.get('input[formcontrolname ="group"]').type('{enter}test1')
   cy.get('input[formcontrolname ="program"]').type('{enter}test_program')
    //Verify if save button is disabled with blank field detail
    cy.get('button').contains('Save').should('be.disabled')
   cy.wait(2000)
  
   cy.get('input[formcontrolname ="header"]').type('{enter}test_header'+n)
  cy.get('input[formcontrolname ="masterEntity"]').type('test_Entity')
   cy.get('.queryFieldContainer').contains('Query *').invoke('show').click()
   cy.wait(1000)
   cy.get('#Grid_add').click({force:true})
   cy.get('#Gridkey').type("OBJECT")
   cy.get('#Gridvalue').type("test")
   cy.get('.e-tbar-btn-text').contains("Update").click({force:true})
   cy.get('#add').contains("Cancel").click()

   cy.get('input[formcontrolname ="DOCTYPES"]').type('ORIGINAL_INVOICE{enter}')
   cy.wait(2000)
   cy.get('.col > .d-flex > .e-switch-wrapper > .e-switch-handle').click({force:true})
   //add search field record
   cy.get('.e-toolbar-items > .e-toolbar-right > .e-toolbar-item > .toolbar > .icon > [title="Add"] > .se-add-circle').first().click({force:true})   
   cy.get('input[name="fieldID"]').type("test").tab()
   cy.wait(1000)
    cy.get('input[name="fieldLabel"]').type("test1")
    cy.wait(1000)
    cy.get('select[name="fieldType___type"]').type("string{enter}",{force:true})
    cy.get('[title="Save"]').click({force:true})


    //add result field
    cy.get('#gridresultColumn .se-add-circle').click({force:true})
    cy.get('input[name="fieldId"]').type("test").tab()
    
    cy.get('input[name="fieldName"]').type("test1")
    cy.get('.resultColumnsBox  select[name="fieldType___type"]').type("string{enter}",{force:true})
    cy.get('.resultColumnsBox [title="Save"]').click({force:true})
    //Verify if save button is enabled after adding mandatory details
    cy.get('button').contains('Save').should('not.be.disabled')
    cy.get('.form-action-footer-section > .d-flex > :nth-child(1) > .e-control').click({force:true})
  
    cy.wait(1000)
    cy.get('ejs-toast > .e-toast').should('contain','Record added successfully')
    
    //View the tile config record 
    cy.get('#header_filterBarcell').type('test_header{enter}',{force:true})
    cy.wait(2000)
    cy.get('.se-view').click({force:true})
    cy.wait(9000)
    
      //Verify the bread crumbs on view page
     cy.get('.breadcrumb-item').should('contain','test_program')
    cy.get('.main-title').should('contain','test_header')
    cy.get(':nth-child(1) > a').contains('Tiles Configuration').click({force:true})

//EDIT the tile config record
    cy.wait(2000)
    cy.get('#header_filterBarcell').type('test_header{enter}',{force:true})
    cy.wait(1000)
    cy.get('.se-edit').click({force:true})
    //Verify the bread crumbs on edit page
    cy.get('.breadcrumb-item').should('contain',' test_program ')
    cy.get('.col > .d-flex > .e-switch-wrapper > .e-switch-handle').click({force:true})
    cy.get('.form-action-footer-section > .d-flex > :nth-child(1) > .e-control').click({force:true})
    cy.wait(1000)
    cy.get('.e-toast').should('contain','Record updated successfully')
//Delete the tile config record
cy.get('#header_filterBarcell').type('test_header{enter}',{force:true})
      cy.get('.se-delete').click({force:true})
      cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
      cy.get('.e-toast').should('contain','Records deleted successfully')
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
      cy.contains('Tiles Configuration').click({force:true})

      //Verify the grid header 
      cy.get('table thead th').then(($headers) => {
        const headerNames = Array.from($headers).map((header) => header.innerText.trim());
        console.log(headerNames); // Log to inspect the headers
        
        const requiredHeaders = ['Header', 'Group','Visible','Program','Navigation Key','Sub Header','Count','Footer','Master Entity','Collection', 'Actions'];
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
          }
          for (const [iconName, iconSelector] of Object.entries(icons)) {
            cy.get(iconSelector,{ timeout: 10000 }).should('be.visible').parent().should('have.attr', 'title', iconName)
          }
          cy.wait(2000)
    //Verify the ascending sort 
            cy.get('.e-headertext').contains('Header').click({force:true})
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
          cy.get('.e-headertext').contains('Header').click({force:true});
          verifyColumnSorted('descending');

  
    //Group by
      cy.get('.se-groupby').click({force:true})
      const draggableRow = cy.get('[data-colindex="1"] > .e-headercelldiv').contains('Group')  
       const targetGrid =  cy.get('.e-groupdroparea') 
      draggableRow.trigger('mousedown', { button: 0 })
      targetGrid.trigger('mousemove', { clientX: 500, clientY: 500 })
      targetGrid.trigger('mouseup', { force: true })
      cy.get('.e-groupcaption').should('contain','Group:')
      cy.get('.e-ungroupbutton').click({force:true})
       cy.get('.se-groupby').click({force:true})
       
  //column chooser
 //verify the cancel button on column chooser
 cy.wait(1000)
 cy.get('.se-view-columns').click({force:true})
   cy.get('.e-ccheck').contains('.e-label','Header').click({force:true})
   cy.contains('button','No').click({force:true})
   cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Header').should('be.visible')
   
 //verify the OK button on column chooser
     cy.wait(1000) 
 cy.get('.se-view-columns').click({force:true}).click({force:true})
  cy.get('.e-ccheck').contains('.e-label','Header').click({force:true})
  cy.contains('button','Yes').click({force:true})
  cy.wait(1000)
  cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Header').should('not.be.visible')
 
  cy.reload();
  cy.wait(4000)
      //Add Tile config record
    cy.get('[title="Add"] > .se-add-circle').click({force:true})
   cy.wait(2000)
   cy.get('input[formcontrolname ="group"]').type('{enter}test1')
   cy.get('input[formcontrolname ="program"]').type('{enter}test_program')
   cy.get('input[formcontrolname ="header"]').type('{enter}test_header'+n)
   cy.get('input[formcontrolname ="masterEntity"]').type('test_Entity')

   cy.get('.queryFieldContainer').contains('Query *').invoke('show').click()
   cy.wait(1000)
   cy.get('#Grid_add').click({force:true})
   cy.get('#Gridkey').type("OBJECT")
   cy.get('#Gridvalue').type("test")
   cy.get('.e-tbar-btn-text').contains("Update").click({force:true})
   cy.get('#add').contains("Cancel").click()

   cy.get('input[formcontrolname ="DOCTYPES"]').type('ORIGINAL_INVOICE{enter}')
   cy.wait(2000)
   cy.get('.col > .d-flex > .e-switch-wrapper > .e-switch-handle').click({force:true})
   //add search field record
   cy.get('.e-toolbar-items > .e-toolbar-right > .e-toolbar-item > .toolbar > .icon > [title="Add"] > .se-add-circle').first().click({force:true})   
   cy.get('input[name="fieldID"]').type("test")
    cy.get('input[name="fieldLabel"]').type("test1")
    cy.get('select[name="fieldType___type"]').type("string{enter}",{force:true})
    cy.get('[title="Save"]').click({force:true})


    //add result field
    cy.get('#gridresultColumn .se-add-circle').click({force:true})
    cy.get('input[name="fieldId"]').type("test").tab()
    
    cy.get('input[name="fieldName"]').type("test1")
    cy.get('.resultColumnsBox  select[name="fieldType___type"]').type("string{enter}",{force:true})
    cy.get('.resultColumnsBox [title="Save"]').click({force:true})

    cy.get('.form-action-footer-section > .d-flex > :nth-child(1) > .e-control').click({force:true})
  
    cy.wait(1000)
    cy.get('ejs-toast > .e-toast').should('contain','Record added successfully')
    cy.wait(8000)
     //Add Tile config record
     cy.get('[title="Add"] > .se-add-circle').click({force:true})
     cy.wait(2000)
     cy.get('input[formcontrolname ="group"]').type('{enter}test1')
     cy.get('input[formcontrolname ="program"]').type('{enter}test_program1')
     cy.get('input[formcontrolname ="header"]').type('{enter}test_header11'+n)
     cy.get('input[formcontrolname ="masterEntity"]').type('test_Entity1')
  
     cy.get('.queryFieldContainer').contains('Query *').invoke('show').click()
     cy.wait(1000)
     cy.get('#Grid_add').click({force:true})
     cy.get('#Gridkey').type("OBJECT")
     cy.get('#Gridvalue').type("test")
     cy.get('.e-tbar-btn-text').contains("Update").click({force:true})
     cy.get('#add').contains("Cancel").click()
  
     cy.get('input[formcontrolname ="DOCTYPES"]').type('ORIGINAL_INVOICE{enter}')
     cy.wait(2000)
     cy.get('.col > .d-flex > .e-switch-wrapper > .e-switch-handle').click({force:true})
     //add search field record
     cy.get('.e-toolbar-items > .e-toolbar-right > .e-toolbar-item > .toolbar > .icon > [title="Add"] > .se-add-circle').first().click({force:true})   
     cy.get('input[name="fieldID"]').type("test")
      cy.get('input[name="fieldLabel"]').type("test1")
      cy.get('select[name="fieldType___type"]').type("string{enter}",{force:true})
      cy.get('[title="Save"]').click({force:true})
  
  cy.wait(2000)
      //add result field
      cy.get('#gridresultColumn .se-add-circle').click({force:true})
      cy.get('input[name="fieldId"]').type("test").tab()
      
      cy.get('input[name="fieldName"]').type("test1")
      cy.get('.resultColumnsBox  select[name="fieldType___type"]').type("string{enter}",{force:true})
      cy.get('.resultColumnsBox [title="Save"]').click({force:true})
  
      cy.get('.form-action-footer-section > .d-flex > :nth-child(1) > .e-control').click({force:true})
    
      cy.wait(1000)
      cy.get('ejs-toast > .e-toast').should('contain','Record added successfully')
      cy.wait(8000)
       //Add Tile config record
    cy.get('[title="Add"] > .se-add-circle').click({force:true})
    cy.wait(2000)
    cy.get('input[formcontrolname ="group"]').type('{enter}test2')
    cy.get('input[formcontrolname ="program"]').type('{enter}test_program2')
    cy.get('input[formcontrolname ="header"]').type('{enter}test_header12'+n)
    cy.get('input[formcontrolname ="masterEntity"]').type('test_Entity2')
 cy.wait(1000)
    cy.get('.queryFieldContainer').contains('Query *').invoke('show').click()
    cy.wait(1000)
    cy.get('#Grid_add').click({force:true})
    cy.get('#Gridkey').type("OBJECT")
    cy.get('#Gridvalue').type("test")
    cy.get('.e-tbar-btn-text').contains("Update").click({force:true})
    cy.get('#add').contains("Cancel").click()
 
    cy.get('input[formcontrolname ="DOCTYPES"]').type('ORIGINAL_INVOICE{enter}')
    cy.wait(2000)
    cy.get('.col > .d-flex > .e-switch-wrapper > .e-switch-handle').click({force:true})
    //add search field record
    cy.get('.e-toolbar-items > .e-toolbar-right > .e-toolbar-item > .toolbar > .icon > [title="Add"] > .se-add-circle').first().click({force:true})   
    cy.get('input[name="fieldID"]').type("test")
     cy.get('input[name="fieldLabel"]').type("test1")
     cy.get('select[name="fieldType___type"]').type("string{enter}",{force:true})
     cy.get('[title="Save"]').click({force:true})
 cy.wait(1000)
 
     //add result field
     cy.get('#gridresultColumn .se-add-circle').click({force:true})
     cy.get('input[name="fieldId"]').type("test").tab()
     
     cy.get('input[name="fieldName"]').type("test1")
     cy.get('.resultColumnsBox  select[name="fieldType___type"]').type("string{enter}",{force:true})
     cy.get('.resultColumnsBox [title="Save"]').click({force:true})
 
     cy.get('.form-action-footer-section > .d-flex > :nth-child(1) > .e-control').click({force:true})
   
     cy.wait(1000)
     cy.get('ejs-toast > .e-toast').should('contain','Record added successfully')
     cy.wait(8000)
      
     //Search 
     cy.get('[title="Search"] > .se-search').click({force:true})
    cy.wait(2000)
    cy.get('#gridGlobalSearch').type('test_header{enter}',{force:true})
    cy.get('.e-row > [data-colindex="0"]').should('contain','test_header')
    //Bulk delete 
     
//By manually selecting the record 
cy.wait(2000)
cy.get('.se-bulk-actions').click({force:true})
cy.get('.e-row > [data-colindex="0"]').eq(0).click({force:true})
cy.get('.e-toolbar-left').contains('Clear').click({force:true})
cy.get('.e-toolbar-left').contains('Clear').should('not.exist')
cy.wait(1000)
cy.get('.e-row > [data-colindex="0"]').eq(0).click({force:true})
cy.get('.e-toolbar-left').contains('Delete').click({force:true})
cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Records deleted successfully')
cy.get('#header_filterBarcell').clear()

cy.reload()
//Select ALL
cy.get('#header_filterBarcell').type('test_header1{enter}')
cy.wait(2000)
cy.get('.se-bulk-actions').click()
cy.get('.e-row > [data-colindex="0"]').eq(0).click({force:true})
cy.get('.e-toolbar-left').contains('Select all').click({force:true})
cy.get('.e-toolbar-left').contains('Delete').click({force:true})
cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
cy.wait(1000)
cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Records deleted successfully')
cy.get('#header_filterBarcell').clear()



})
})
})