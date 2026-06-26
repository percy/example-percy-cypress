///<reference types="cypress">
Cypress.on('uncaught:exception', (err, runnable) => {
  console.error('Uncaught Exception:', err.message)
return false
})
describe("Tie template Configuration",()=>
{
  baseurl = 'https://test-neev.azurewebsites.net/cdn-app/reports'
},()=>{

context('Utilizing API request',()=>{
beforeEach(()=>cy.getAndSetToken());

 it('Tile template CRUD operation', () => {
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
     cy.contains('Tile Template Configuration').click({force:true})
      //Verify the bread crumbs on main page
      cy.get('.breadcrumb-item').should('contain',' Tile Template Configuration ')
     cy.wait(3000)
         
    //Add the Tile Template config    
        cy.get('[title="Add"] > .se-add-circle').click({force:true})
         cy.wait(2000)
         //Verify the bread crumbs on Add page
     cy.get('.breadcrumb-item').should('contain','Add')
         cy.get('input[formcontrolname ="CDN_OBJECT"]').type('{enter}test1_obj'+n)
          //Verify if save button is disabled with blank field detail
        cy.get('button').contains('Save').should('be.disabled')
         const yourfixturefileName = 'tileTemplate.json';
         cy.get('#templateUpload').attachFile(yourfixturefileName);
         //uploaded file deleted 
         cy.get('.clearUpload').click({force:true})
         cy.wait(1000)
         //again uploaded 
         cy.get('#templateUpload').attachFile(yourfixturefileName);
         cy.get('[title="Add"] > .se-add-circle').click({force:true})
         cy.get('tr > :nth-child(1) > .e-input-group').type('EN - English{enter}',{force:true})
         cy.wait(1000)
         cy.get('input[name="DESCRIPTION"]').type('testing tile template config{enter}'+n)
      // Click the switch to turn it on
        cy.get('ejs-switch .e-switch-on').click({force:true});

        // Assert that the text "Active" is displayed
        cy.get('span.ml-2').should('contain.text', 'Active');

        // Click the switch to turn it off
          cy.get('ejs-switch .e-switch-on').click({force:true}); 

        // Assert that the text "Inactive" is displayed
          cy.get('span.ml-2').should('contain.text', 'Inactive');
         cy.wait(2000)
         //Verify if save button is enabled after adding mandatory details
    cy.get('button').contains('Save').should('not.be.disabled')

         //Add description 
  
    cy.get('tile-template-description .se-add-circle').click({force:true})
    cy.get('tr > :nth-child(1) > .e-input-group').type("EN - English", { force: true })
    cy.get('input[name="DESCRIPTION"]').type("testenglish1{enter}")
    //Column chooser working or not
   /* cy.wait(1000)
    cy.get('tile-template-description .se-view-columns').click({force:true})
      cy.get('.e-ccheck').contains('.e-label','Language').click({force:true})
      cy.get('.e-footer-content > .e-cc-cnbtn').click({force:true})
      cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Language').should('be.visible')
      
    //verify the OK button on column chooser
        cy.wait(1000)
        cy.get('tile-template-description .se-view-columns').click({force:true}).click({force:true})
        cy.get('.e-ccheck').contains('.e-label','Language').click({force:true})
        cy.get('.e-footer-content > .e-cc_okbtn').click({force:true})
        cy.wait(4000)
        cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Language').should('not.be.visible')
        cy.wait(1000)
        cy.get('tile-template-description .se-view-columns').click({force:true}).click({force:true})
        cy.get('.e-ccheck').contains('.e-label','Language').click({force:true})
        cy.get('.e-footer-content > .e-cc_okbtn').click({force:true})
        cy.wait(4000)
        cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Language').should('be.visible')*/
        

    //edit and save 2nd description record
    cy.get('#gridGlobalSearchtileTemplate').type('testenglish1{enter}')
    cy.get('.se-edit').click({force:true})
    cy.get('input[name="DESCRIPTION"]').clear()
    cy.get('input[name="DESCRIPTION"]').type("testenglish2{enter}")
   
    //edit and cancel 2nd description record
    cy.get('#gridGlobalSearchtileTemplate').clear()
    cy.get('#gridGlobalSearchtileTemplate').type('testenglish2{enter}')
    cy.get('.se-edit').click({force:true})
    cy.get('input[name="DESCRIPTION"]').type("testenglish2")
    cy.get('[title="Cancel"]').click({force:true})

    cy.get('#gridGlobalSearchtileTemplate').type('{enter}')
    cy.get('tile-template-description .se-delete').click({force:true})
    cy.get('tile-template-description .e-footer-content').contains('button', 'No').click({force:true})
    cy.wait(1000)
    cy.get('#gridGlobalSearchtileTemplate').clear()
    cy.get('#gridGlobalSearchtileTemplate').type('testenglish2{enter}')
    cy.get('tile-template-description .se-delete').click({force:true})
    cy.get('tile-template-description .e-footer-content').eq(1).contains('button', 'Yes').click({force:true})
    //cy.get('#grid_2124154804_0EditConfirm > .e-footer-content > .e-primary').click({force:true});
  
    cy.get('.form-action-footer-section > .d-flex > :nth-child(1) > .e-control').click({force:true})
   
    cy.wait(2000)
   cy.get('.e-toast').should('contain','Record added successfully')// add page completed 
  


 
 //EDIT
      cy.wait(2000)
       cy.get('#DESCRIPTION_filterBarcell').type('testing tile template config{enter}'+n)

        //verify view icon does not exist in action column
       cy.get('.se-view').should('not.exist')

       cy.get('.se-edit').first().click({force:true})
      // cy.get('[title="Edit"]').click({force:true})
       cy.wait(2000)
       //Verify the bread crumbs on Edit page
     cy.get('.breadcrumb-item').should('contain','test1_obj')
     //object name is readonly 
     cy.get('input[formcontrolname="CDN_OBJECT"]').should('have.attr', 'readonly');
     cy.get('#gridGlobalSearchtileTemplate').type('testing tile template{enter}')
     cy.get('.se-edit').click({force:true})
     cy.get('input[name="DESCRIPTION"]').clear()
     cy.get('input[name="DESCRIPTION"]').type('testing tile template config1{enter}',{force:true})  
       //cy.get('[title="Save"]').click({force:true})
       cy.wait(1000)
       cy.get('.form-action-footer-section > .d-flex > :nth-child(1) > .e-control').click({force:true})
       //cy.wait(1000)
       cy.get('.e-toast-message').should('contain','Record updated successfully')

 //delete
      cy.wait(2000)
       cy.get('#DESCRIPTION_filterBarcell').type('testing tile template {enter}')
       cy.get('.se-delete').first().click({force:true})
       cy.wait(2000)
       cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
       cy.get('.e-toast').should('contain','Document Deleted Successfully')
         }) 
       


   it(' Main page Verification', () => {
          cy.visit('https://test-neev.azurewebsites.net/cdn-app/reports');
           cy.wait(10000)
              cy.get('#sidebar-container').click()
              cy.get('.se-control-panel').invoke('show')
              cy.wait(2000)
              cy.get('.icon-arrow-right > .se-chevron-right').click({multiple:true})
              cy.get('.submenu-list-container').invoke('show')
              cy.wait(2000)
              cy.contains('Tile Template Configuration').click({force:true})
              
        
              //Group by
         cy.get('.se-groupby').click({force:true})
          cy.wait(2000)
          const draggableRow = cy.get('[data-colindex="0"] > .e-headercelldiv').contains('Object Name')  // Replace with your actual selector
          const targetGrid =  cy.get('.e-groupdroparea') // Replace with your actual selector
          draggableRow.trigger('mousedown', { button: 0 })
          targetGrid.trigger('mousemove', { clientX: 500, clientY: 500 })
          targetGrid.trigger('mouseup', { force: true })
          cy.get('.e-groupcaption').should('contain','Object Name:')
          cy.get('.e-ungroupbutton').click({force:true})
           cy.get('.se-groupby').click({force:true})

           //Verify the grid header 
      cy.get('table thead th').then(($headers) => {
        const headerNames = Array.from($headers).map((header) => header.innerText.trim());
        console.log(headerNames); // Log to inspect the headers
        
        const requiredHeaders = ['Object Name', 'Description', 'Active','Last Updated', 'Actions'];
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
            cy.get('.e-headertext').contains('Object Name').click({force:true})
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
          cy.get('.e-headertext').contains('Object Name').click({force:true});
          verifyColumnSorted('descending');

        // Column Chooser
        cy.wait(1000)
        //verify the cancel button on column chooser
        cy.wait(1000)
        cy.get('.se-view-columns').click({force:true})
        cy.get('.e-ccheck').contains('.e-label','Object Name').click({force:true})
        cy.contains('button','No').click({force:true})
        cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Object Name').should('be.visible')
        cy.wait(1000)
        cy.get('.se-view-columns').click({force:true}).click({force:true})  
        cy.get('.e-ccheck').contains('.e-label','Object Name').click({force:true})
        cy.contains('button','Yes').click({force:true})
        cy.wait(4000)
        cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Object Name').should('not.be.visible')
        cy.reload()
        cy.wait(8000)
        
        //Add the Tile Template config    
        cy.get('[title="Add"] > .se-add-circle').click({force:true})
        cy.wait(2000)
        cy.get('input[formcontrolname ="CDN_OBJECT"]').type('{enter}test1_obj1')
        const yourfixturefileName = 'tileTemplate.json';
        cy.get('#templateUpload').attachFile(yourfixturefileName);
        cy.get('[title="Add"] > .se-add-circle').click({force:true})
        cy.get('tr > :nth-child(1) > .e-input-group').type('EN - English{enter}',{force:true})
        cy.get('input[name="DESCRIPTION"]').type('testing tile template config1{enter}')
        cy.wait(2000)
        cy.get('.form-action-footer-section > .d-flex > :nth-child(1) > .e-control').click({force:true})
        cy.wait(2000)
        cy.get('.e-toast').should('contain','Record added successfully')

        cy.get('[title="Add"] > .se-add-circle').click({force:true})
        cy.wait(2000)
        cy.get('input[formcontrolname ="CDN_OBJECT"]').type('{enter}test1_obj2')
        const yourfixturefileName1 = 'tileTemplate.json';
        cy.get('#templateUpload').attachFile(yourfixturefileName1);
        cy.get('[title="Add"] > .se-add-circle').click({force:true})
        cy.get('tr > :nth-child(1) > .e-input-group').type('EN - English{enter}',{force:true})
        cy.get('input[name="DESCRIPTION"]').type('testing tile template config2{enter}')
        cy.wait(2000)
        cy.get('.form-action-footer-section > .d-flex > :nth-child(1) > .e-control').click({force:true})
        cy.wait(2000)
        cy.get('.e-toast').should('contain','Record added successfully')

        cy.get('[title="Add"] > .se-add-circle').click({force:true})
        cy.wait(2000)
        cy.get('input[formcontrolname ="CDN_OBJECT"]').type('{enter}test1_obj3')
        const yourfixturefileName2 = 'tileTemplate.json';
        cy.get('#templateUpload').attachFile(yourfixturefileName2);
        cy.get('[title="Add"] > .se-add-circle').click({force:true})
        cy.get('tr > :nth-child(1) > .e-input-group').type('EN - English{enter}',{force:true})
        cy.get('input[name="DESCRIPTION"]').type('testing tile template config3{enter}')
        cy.wait(2000)
        cy.get('.form-action-footer-section > .d-flex > :nth-child(1) > .e-control').click({force:true})
        cy.wait(2000)
        cy.get('.e-toast').should('contain','Record added successfully')
            cy.wait(2000)
         //Search 
         cy.get('[title="Search"] > .se-search').click({force:true})
        cy.wait(2000)
        cy.get('#gridGlobalSearch').type('test1_obj1{enter}',{force:true})
        cy.get('.e-row > [data-colindex="0"]').should('contain','test1_obj1')
        
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
        cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Document Deleted Successfully')
        //cy.get('#gridGlobalSearch').clear()

        cy.reload()
        //Select ALL
        cy.get('#CDN_OBJECT_filterBarcell').type('test1_obj{enter}',{force:true})
        cy.wait(2000)
        cy.get('.se-bulk-actions').click()
        cy.get('.e-row > [data-colindex="1"]').eq(0).click({force:true})
        cy.get('.e-toolbar-left').contains('Select all').click({force:true})
        cy.get('.e-toolbar-left').contains('Delete').click({force:true})
        cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
        cy.wait(1000)
        cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Document Deleted Successfully')
        cy.get('#CDN_OBJECT_filterBarcell').clear()
      


         })
        

        })
      })