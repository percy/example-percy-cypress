///<reference types="cypress">
Cypress.on('uncaught:exception', (err, runnable) => {
  console.error('Uncaught Exception:', err.message)
return false
})
describe("Topic Type Configuration",()=>
{
  baseurl = 'https://test-neev.azurewebsites.net/cdn-app/reports'
},()=>{

context('Utilizing API request',()=>{
beforeEach(()=>cy.getAndSetToken());

it('Topic type CRUD operation', () => {
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
     cy.contains('Topic Type Configuration').click({force:true})
      //Verify the bread crumbs on main page
      cy.get('.breadcrumb-item').should('contain',' Topic Type Configuration ')
     cy.wait(3000)
      //delete if already exists
      cy.get('#TOPIC_TYPE_filterBarcell').type('TestTT1{enter}')
      cy.get('body').then(($body) => {
        if ($body.find('.e-emptyrow').length > 0 && $body.find('.e-emptyrow').text().includes("No records to display")) {
          // If "No records to display" message is found, do nothing
          cy.log('No records found, no deletion needed.');
          cy.get('#TOPIC_TYPE_filterBarcell').clear().type('{enter}')
        } else {
    cy.get('.se-delete').click({force:true})
    cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
     cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Topic Type Deleted Successfully')
        }
      })

     //Add Topic type config record
   cy.get('[title="Add"] > .se-add-circle').click({force:true})
   cy.wait(2000)
   //Verify the bread crumbs on Add page
   cy.get('.breadcrumb-item').should('contain','Add')

   cy.get('input[formcontrolname ="TOPIC_TYPE"]').type('TestTT1')
    //Verify if save button is disabled with blank field detail
    cy.get('button').contains('Save').should('be.disabled')
   cy.wait(2000)
  
   //add Payload Schema record
   cy.get('[title="Add"] > .se-add-circle').first().click({force:true})
   //cy.get('ejs-dropdownlist .e-input-group').type("EN", { force: true })
    cy.get('input[name="FIELD"]').type("test_field1")
    cy.get('.e-dropdownbase').type("dd1{enter}").tab()
    
    cy.get(':nth-child(3) > .e-input-group > .e-input-group-icon').type("string{enter}")
    cy.get('input[name="DESCRIPTION"]').type("testtype1")
    cy.get('ejs-dropdownlist .e-input-group').type("EN", { force: true })
    cy.get('.mr-1').click({force:true})
    cy.wait(1000)
    cy.get('topic-type-description .se-add-circle').click({force:true})
    cy.get('tr > :nth-child(1) > .e-input-group').type("EN - English", { force: true })
    cy.get('input[name="DESCRIPTION"]').type("testenglish{enter}")
    //Verify if save button is enabled after adding mandatory details
    cy.get('button').contains('Save').should('not.be.disabled')
    cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
      
    cy.wait(1000)
    cy.get('.e-toast').should('contain','Record added successfully')
    
    //View the topic type record 
   cy.wait(2000)
    cy.get('#TOPIC_TYPE_filterBarcell').type('TestTT1{enter}',{force:true})
    cy.wait(2000)
    cy.get('.se-view').click({force:true})
    cy.wait(9000)
    //Verify the bread crumbs on view page
     cy.get('.breadcrumb-item').should('contain',' TestTT1 ')
    cy.get('.main-title').should('contain','TestTT1')
    cy.get('.listingDataIn').eq(1).find('p').should('not.have.attr', 'contenteditable', 'true');
    cy.get(':nth-child(1) > a').contains('Topic Type Configuration').click({force:true})
     
    
    //verify if after adding detail cancel button is workign or not  
     cy.get('[title="Add"] > .se-add-circle').click({force:true})
     cy.wait(2000)
     cy.get('input[formcontrolname ="TOPIC_TYPE"]').type('TestTT1')
      cy.wait(2000)
     //add description record
     cy.get('[title="Add"] > .se-add-circle').first().click({force:true})
     cy.get('ejs-dropdownlist .e-input-group').type("EN", { force: true })
      cy.get('input[name="FIELD"]').type("test_field1")
      cy.get('.e-dropdownbase').type("dd1{enter}").tab()
      
      cy.get(':nth-child(3) > .e-input-group > .e-input-group-icon').type("string{enter}")
      cy.get('input[name="DESCRIPTION"]').type("testtype1")
      cy.get('ejs-dropdownlist .e-input-group').type("EN", { force: true })
      cy.get('.mr-1').click({force:true})
      cy.wait(1000)
      cy.get('topic-type-description .se-add-circle').click({force:true})
      cy.get('tr > :nth-child(1) > .e-input-group').type("EN - English", { force: true })
      cy.get('input[name="DESCRIPTION"]').type("testenglish{enter}")  
       cy.wait(2000)
       cy.get('button').contains('Cancel').click({force:true})

//EDIT the topic type record
    cy.wait(2000)

    cy.get('#TOPIC_TYPE_filterBarcell').type('TestTT1{enter}',{force:true})
    cy.wait(1000)
    cy.get('.se-edit').click({force:true})
    //Verify the bread crumbs on edit page
    cy.get('.breadcrumb-item').should('contain',' TestTT1 ')
    cy.wait(5000)
    //add 2nd Payload Schema record
    cy.get('[title="Add"] > .se-add-circle').first().click({force:true})
    cy.wait(10000)
     cy.get('input[name="FIELD"]').type("test_field2")
     cy.get('.e-dropdownbase').type("dd2{enter}").tab()  
     cy.get(':nth-child(3) > .e-input-group > .e-input-group-icon').type("string{enter}")
     cy.get('input[name="DESCRIPTION"]').type("testtype2")
     cy.get('ejs-dropdownlist .e-input-group').type("EN{enter}", { force: true })
     cy.get('.mr-1').click({force:true})
    //edit and cancel 2nd Payload Schema record
     cy.get('#gridGlobalSearchsearchField').clear()
     cy.get('#gridGlobalSearchsearchField').type('test_field2{enter}')
    cy.get('.se-edit').first().click({force:true})
    cy.get('input[name="FIELD"]').clear()
    cy.get('input[name="FIELD"]').type("test_field2")
    cy.contains('Cancel').click({force:true})
    //edit and save 2nd Payload Schema record
    cy.get('#gridGlobalSearchsearchField').clear()
    cy.get('#gridGlobalSearchsearchField').type('test_field2{enter}')
    cy.get('.se-edit').first().click({force:true})
    cy.get('input[name="FIELD"]').clear()
    cy.get('input[name="FIELD"]').type("test_field2")
    cy.get('.mr-1').click({force:true})
  //payload delete button
    cy.get('#gridGlobalSearchsearchField').clear()
    cy.get('#gridGlobalSearchsearchField').type('test_field2{enter}')
    cy.get('.se-delete').first().click({force:true})
    cy.get('.e-footer-content').contains('button', 'No').click({force:true})
    cy.get('#gridGlobalSearchsearchField').type('{enter}')
    cy.get('.se-delete').first().click({force:true})
    
    cy.get('.e-footer-content >.e-primary').eq(1).click({force:true})
    
    cy.get('#gridGlobalSearchsearchField').clear()
    cy.wait(5000)

    //Add description 
  
    cy.get('topic-type-description .se-add-circle').click({force:true})
    cy.get('tr > :nth-child(1) > .e-input-group').type("EN - English", { force: true })
    cy.get('input[name="DESCRIPTION"]').type("testenglish1{enter}")
    //Column chooser working or not
    /*cy.wait(1000)
    cy.get('topic-type-description .se-view-columns').click({force:true})
      cy.get('.e-ccheck').contains('.e-label','Language').click({force:true})
      cy.get('.e-footer-content > .e-cc-cnbtn').eq(1).click({force:true})
      cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Language').should('be.visible')
      
    //verify the OK button on column chooser
        cy.wait(1000)
        cy.get('topic-type-description .se-view-columns').click({force:true}).click({force:true})
        cy.get('.e-ccheck').contains('.e-label','Language').click({force:true})
        cy.get('.e-footer-content > .e-cc_okbtn').eq(1).click({force:true})
        cy.wait(4000)
        cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Language').should('not.be.visible')*/
       

    //edit and save 2nd description record
    cy.get('#gridGlobalSearchtopicType').type('testenglish1{enter}')
    cy.get('.se-edit').eq(1).click({force:true})
    cy.get('input[name="DESCRIPTION"]').clear()
    cy.get('input[name="DESCRIPTION"]').type("testenglish2{enter}")
   
    //edit and cancel 2nd description record
    cy.get('#gridGlobalSearchtopicType').clear()
    cy.get('#gridGlobalSearchtopicType').type('testenglish2{enter}')
    cy.get('.se-edit').eq(1).click({force:true})
    cy.get('input[name="DESCRIPTION"]').type("testenglish2")
    cy.get('[title="Cancel"]').click({force:true})

    cy.get('#gridGlobalSearchtopicType').type('{enter}')
    cy.get('topic-type-description .se-delete').click({force:true})
    cy.get('topic-type-description .e-footer-content').contains('button', 'No').focused().click({force:true})
    cy.wait(1000)
    cy.get('#gridGlobalSearchtopicType').clear()
    cy.get('#gridGlobalSearchtopicType').type('testenglish2{enter}')

    cy.get('topic-type-description .se-delete').click({force:true})
    cy.get('topic-type-description .e-footer-content >.e-primary').eq(1).click({force:true})
   //cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})  
    cy.get('.form-action-footer-section > .d-flex > :nth-child(1) > .e-control').click({force:true})
    cy.wait(1000)
    cy.get('.e-toast').should('contain','Record updated successfully')


    //Delete the topic type record
      cy.get('#TOPIC_TYPE_filterBarcell').type('TestTT1{enter}',{force:true})
           cy.get('.se-delete').click({force:true})
          cy.contains('button', 'No').click({force:true})
          cy.wait(1000)
          cy.get('.se-delete').click({force:true})
      cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
      cy.get('.e-toast').should('contain','Topic Type Deleted Successfully')
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
          cy.contains('Topic Type Configuration').click({force:true})
          cy.wait(8000)
          //Verify the bread crumbs on main page
      cy.get('.breadcrumb-item').should('contain',' Topic Type Configuration ')

      //Verify the grid header 
      cy.get('table thead th').then(($headers) => {
        const headerNames = Array.from($headers).map((header) => header.innerText.trim());
        console.log(headerNames); // Log to inspect the headers
        
        const requiredHeaders = ['Topic Type', 'Description', 'Actions'];
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
            cy.get('.e-headertext').contains('Topic Type').click({force:true})
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
          cy.get('.e-headertext').contains('Topic Type').click({force:true});
          verifyColumnSorted('descending');

    
          //Group by
   /*  cy.get('.se-groupby').click({force:true})
      cy.wait(2000)
      const draggableRow = cy.get('[data-colindex="0"] > .e-headercelldiv').contains('Topic Type')  // Replace with your actual selector
      const targetGrid =  cy.get('.e-groupdroparea') // Replace with your actual selector
      draggableRow.trigger('mousedown', { button: 0 })
      targetGrid.trigger('mousemove', { clientX: 500, clientY: 500 })
      targetGrid.trigger('mouseup', { force: true })
      cy.get('.e-groupcaption').should('contain','Topic Type:')
      cy.get('.e-ungroupbutton').click({force:true})
       cy.get('.se-groupby').click({force:true})*/
    // Column Chooser
    //verify the cancel button on column chooser
cy.wait(1000)
cy.get('.se-view-columns').click({force:true})
  cy.get('.e-ccheck').contains('.e-label','Topic Type').click({force:true})
  cy.contains('button','No').click({force:true})
  cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Topic Type').should('be.visible')
  
//verify the OK button on column chooser
    cy.wait(1000)
    cy.get('.se-view-columns').click({force:true}).click({force:true})
    cy.get('.e-ccheck').contains('.e-label','Topic Type').click({force:true})
    cy.contains('button','Yes').click({force:true})
    cy.wait(4000)
    cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Topic Type').should('not.be.visible')
    cy.reload()
      
    //Add the Topic Type config    
   cy.get('[title="Add"] > .se-add-circle').click({force:true})
   cy.wait(8000)
   cy.get('input[formcontrolname ="TOPIC_TYPE"]').type('{enter}TestTT1')
   cy.wait(2000)
  
   //add Payload Schema record
   cy.get('[title="Add"] > .se-add-circle').first().click({force:true})
   
    cy.get('input[name="FIELD"]').type("test_field1")
    cy.get('.e-dropdownbase').type("dd1{enter}").tab()
    
    cy.get(':nth-child(3) > .e-input-group > .e-input-group-icon').type("string{enter}")
    cy.get('input[name="DESCRIPTION"]').type("testtype1")
    cy.get('ejs-dropdownlist .e-input-group').type("EN{enter}")
    cy.get('.mr-1').click({force:true})
    cy.wait(1000)
    cy.get('topic-type-description .se-add-circle').click({force :true})
    cy.get('tr > :nth-child(1) > .e-input-group').type("EN - English", { force: true })
    cy.get('input[name="DESCRIPTION"]').type("testenglish{enter}")
    cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
    cy.wait(1000)
    cy.get('.e-toast').should('contain','Record added successfully')

     
   cy.get('[title="Add"] > .se-add-circle').click({force:true})
   cy.wait(8000)
   cy.get('input[formcontrolname ="TOPIC_TYPE"]').type('{enter}TestTT2')
   cy.wait(2000)
  
   //add Payload Schema record
   cy.get('[title="Add"] > .se-add-circle').first().click({force:true})
   
    cy.get('input[name="FIELD"]').type("test_field2")
    cy.get('.e-dropdownbase').type("dd2{enter}").tab()
    
    cy.get(':nth-child(3) > .e-input-group > .e-input-group-icon').type("string{enter}")
    cy.get('input[name="DESCRIPTION"]').type("testtype2")
    cy.get('ejs-dropdownlist .e-input-group').type("EN{enter}")
    cy.get('.mr-1').click({force:true})
    cy.wait(1000)
    cy.get('topic-type-description .se-add-circle').click({force :true})
    cy.get('tr > :nth-child(1) > .e-input-group').type("EN - English", { force: true })
    cy.get('input[name="DESCRIPTION"]').type("testenglish{enter}")
    cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
    cy.wait(1000)
    cy.get('.e-toast').should('contain','Record added successfully')

     
   cy.get('[title="Add"] > .se-add-circle').click({force:true})
   cy.wait(8000)
   cy.get('input[formcontrolname ="TOPIC_TYPE"]').type('{enter}TestTT3')
   cy.wait(2000)
  
   //add Payload Schema record
   cy.get('[title="Add"] > .se-add-circle').first().click({force:true})
   
    cy.get('input[name="FIELD"]').type("test_field3")
    cy.get('.e-dropdownbase').type("dd3{enter}").tab()
    
    cy.get(':nth-child(3) > .e-input-group > .e-input-group-icon').type("string{enter}")
    cy.get('input[name="DESCRIPTION"]').type("testtype3")
    cy.get('ejs-dropdownlist .e-input-group').type("EN{enter}")
    cy.get('.mr-1').click({force:true})
    cy.wait(1000)
    cy.get('topic-type-description .se-add-circle').click({force :true})
    cy.get('tr > :nth-child(1) > .e-input-group').type("EN - English", { force: true })
    cy.get('input[name="DESCRIPTION"]').type("testenglish{enter}")
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
     cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Topic Type Deleted Successfully')
   
     cy.reload()
     //Select ALL
     cy.get('#TOPIC_TYPE_filterBarcell').type('TestTT{enter}',{force:true})
    
     cy.wait(8000)
     cy.get('.se-bulk-actions').click()
     cy.get('.e-row > [data-colindex="1"]').eq(0).click({force:true})
     cy.get('.e-toolbar-left').contains('Select all').click({force:true})
     cy.get('.e-toolbar-left').contains('Delete').click({force:true})
     cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
     cy.wait(1000)
     cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Topic Types Deleted Successfully')
     cy.get('#TOPIC_TYPE_filterBarcell').clear()
   
    })  
     
  })
})