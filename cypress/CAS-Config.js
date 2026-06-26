///<reference types="cypress">
Cypress.on('uncaught:exception', (err, runnable) => {
    console.error('Uncaught Exception:', err.message)
  return false
})
describe("CAS Config",()=>
  {
    baseurl = 'https://test-neev.azurewebsites.net/cdn-app/reports'
    
  },()=>{
  
  context('Utilizing API request',()=>{
  beforeEach(()=>cy.getAndSetToken())
  


 it('CRUD Operation for nuxeo ', () => {
  cy.visit('https://test-neev.azurewebsites.net/cdn-app/reports');
   cy.wait(10000)
      cy.log("Successfully login")
      const num = Date.now(); 
      const n = num.toString();
      cy.wait(9000)
      cy.get('#sidebar-container').click()
      cy.get('.se-control-panel').invoke('show')
      cy.wait(2000)
      cy.get('.icon-arrow-right > .se-chevron-right').click({multiple:true})
      cy.get('.submenu-list-container').invoke('show')
      cy.wait(5000)
      
          cy.contains('CAS Configuration').click({force:true})
          cy.get('.e-gridcontent > .e-content').click({force:true})
          cy.wait(8000)        
      //delete if already exists
          cy.get('#CREP_filterBarcell').type('test_crep1{enter}')
          cy.get('body').then(($body) => {
            if ($body.find('.e-emptyrow').length > 0 && $body.find('.e-emptyrow').text().includes("No records to display")) {
              // If "No records to display" message is found, do nothing
              cy.log('No records found, no deletion needed.');
              cy.get('#CREP_filterBarcell').clear().type('{enter}')
            } else {
        cy.get('.se-delete').click({force:true})
        cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
         cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Archive Service Configuration Deleted Successfully')
            }
          })

         
   //Add the CAS config    
       cy.get('[title="Add"] > .se-add-circle').click({force:true})
        cy.wait(2000)
        cy.get('.breadcrumb-item').should('contain',"Add")
       
        cy.get('ejs-dropdownlist > div').type('NX - Nuxeo{enter} ')
        cy.wait(1000)
        cy.get('input[formcontrolname ="CREP"]').type('test_crep1{enter}')
      
        cy.wait(1000)
        cy.get('input[formcontrolname ="UNAME"]').type('testun{enter}'+n)
        cy.get('input[formcontrolname ="PASSWD"]').type('testing{enter}')
        cy.get('input[formcontrolname ="CLOUD_BUCKET"]').type('testcbuck{enter}')
        cy.get('input[formcontrolname ="DESCRIPTION"]').type('testdesc{enter}')
        cy.wait(1000)
        //verify that the save button is disabled 
       cy.get('button').contains('Save').should('be.disabled')
       // cy.wait(1000)
        cy.get('input[formcontrolname ="ENDPOINT_URL"]').type('/test{enter}{enter}') 
        cy.get('input[formcontrolname ="NUXEO_TYPE"]').type('CDER{enter}')
        cy.wait(2000)
        cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})

        cy.wait(1000)
        cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Record added successfully')

        //Edit  -T38   
         cy.wait(1000)
          //T40 Point 2
         cy.get('#UNAME_filterBarcell').type('testun{enter}'+n )
         cy.wait(1000)

      cy.get('.se-edit').eq(0).click({force:true})
      cy.wait(2000)
      //T38 breadcrumb of edit page
      cy.get('.breadcrumb-item').should('contain',"test_crep1")
      cy.get('input[formcontrolname ="DESCRIPTION"]').should('have.value','testdesc')
      cy.get('input[formcontrolname ="ENDPOINT_URL"]').type('/test{enter}{enter}') 
      cy.wait(2000)
      cy.get('input[formcontrolname ="NUXEO_TYPE"]').clear({force:true})
      cy.get('input[formcontrolname ="NUXEO_TYPE"]').type('CDER1{enter}',{force:true})
      cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
      cy.wait(2000)
      cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Record updated successfully')
       cy.wait(2000)
      //Test connection - Verify the test Connection check button in nuxeo page.
  cy.wait(8000)
  const testValue2 = 'test_crep1';
  cy.get('#CREP_filterBarcell').type(`${testValue2}{enter}`)
  cy.wait(1000)
cy.get('.se-link').eq(0).click({force:true})
cy.log("This service is connected")
cy.log(1000)
cy.get('ejs-toast .e-toast-message > .e-toast-content',{ timeout: 10000 }).should('be.visible').and('contain',`Test connection is currently not supported for NX content repositories`)
cy.wait(3000)
cy.get('#CREP_filterBarcell').clear()



      //Verify the bread crumb-2
      cy.wait(1000)
         cy.get('#UNAME_filterBarcell').type('testun{enter}'+n )
         cy.wait(1000)
      cy.get('.se-edit').eq(0).click({force:true})
      cy.wait(2000)
      cy.get('.breadcrumb-item').should('contain','test_crep1')
      cy.get('.breadcrumb-item').contains('Archive Service Configuration').click({force:true})
         cy.wait(5000)
        
      //delete
     cy.get('#CREP_filterBarcell').type('test_crep1{enter}')
     //verify view icon does not exist in action column
     cy.get('.se-view').should('not.exist')
      cy.get('.se-delete').click({force:true})
      cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
       cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Archive Service Configuration Deleted Successfully')
       cy.get('#CREP_filterBarcell').clear()

       //Test Connection for the new service which is not yet connected
     cy.wait(1000)
     const testValue = 'MDTEST';
     cy.get('#CREP_filterBarcell').type(`${testValue}{enter}`)
     cy.wait(1000)
  cy.get('.se-link').eq(0).click({force:true})
  cy.log("This service is not yet connected")
  //cy.wait(1000)
  cy.get('ejs-toast .e-toast-message > .e-toast-content').should('be.visible').and('contain',`Connection couldn\'t be established to the ${testValue} content repository. Double check connectivity settings and CAS service availability.`)
  cy.get('#CREP_filterBarcell').clear()

  //Test connection - Verify the test Connection check button in CAS Config page.
  cy.wait(8000)
     const testValue1 = 'MD';
     cy.get('#CREP_filterBarcell').type(`${testValue1}{enter}`)
     cy.wait(1000)
  cy.get('.se-link').eq(0).click({force:true})
  cy.log("This service is connected")
  cy.log(1000)
  cy.get('ejs-toast .e-toast-message > .e-toast-content',{ timeout: 10000 }).should('be.visible').and('contain',`Connection successfully established to ${testValue1}`)
  cy.wait(3000)
  cy.get('#CREP_filterBarcell').clear()

     })
      it('Main page Verification ', () => {
      cy.visit('https://test-neev.azurewebsites.net/cdn-app/reports');
       cy.wait(10000)
          cy.get('#sidebar-container').click()
          cy.get('.se-control-panel').invoke('show')
          cy.wait(2000)
          cy.get('.icon-arrow-right > .se-chevron-right').click({multiple:true})
          cy.get('.submenu-list-container').invoke('show')
          cy.wait(2000)
          cy.contains('CAS Configuration').click({force:true})
          
          cy.wait(2000)
          //T35 -1Verify that CAS configurations contains the bread crumbs
                cy.get('.breadcrumb-item').should('contain',"Archive Service Configuration")
                cy.wait(2000)
          //T35.2.Verify the grid header 
                cy.get('table thead th').then(($headers) => {
                  const headerNames = Array.from($headers).map((header) => header.innerText.trim());
                  
                  // Check if all required headers are present
                  const requiredHeaders = [
                    'Content Repository',
                    'User Name',
                    'Password',
                    'Endpoint URL',
                    'Description',
                    'Actions'
      
                  ];
            
                  requiredHeaders.forEach(header => {
                    expect(headerNames).to.include(header);
                  });
                });
                cy.wait(1000)
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
                cy.wait(1000)
          //T35.6Verify the ascending sort 
                  cy.get('.e-headertext').contains('Content Repository').click({force:true});
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
          // T35.7Verify the desending sort 
                cy.get('.e-headertext').contains('Content Repository').click({force:true});
                verifyColumnSorted('descending');            
          //T-41 Group by
     /* cy.get('.se-groupby').click({force:true})
      cy.wait(2000)
      const draggableRow = cy.get('[data-colindex="1"] > .e-headercelldiv').contains('User Name') 
      const targetGrid =  cy.get('.e-groupdroparea') 
      draggableRow.trigger('mousedown', { button: 0 })
      targetGrid.trigger('mousemove', { clientX: 500, clientY: 500 })
      targetGrid.trigger('mouseup', { force: true })
      cy.get('.e-groupcaption').should('contain','User Name:')
      cy.get('.e-ungroupbutton').click({force:true})
       cy.get('.se-groupby').click({force:true})*/
  // Verify that the Column Chooser 
  cy.wait(1000)
  //verify the cancel button on column chooser
  cy.get('.se-view-columns').click({force:true})
  cy.get('.e-ccheck').contains('.e-label','Content Repository').click({force:true})
  cy.contains('button','Cancel').click({force:true})
  cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Content Repository').should('be.visible')
  //verify the OK button on column chooser
  cy.wait(1000)
  cy.get('.se-view-columns').click({force:true}).click({force:true})
  cy.wait(4000)
  cy.get('.e-ccheck').contains('.e-label','Content Repository').click({force:true})
  cy.contains('button','OK').click({force:true})
  cy.wait(2000)
  cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Content Repository').should('not.be.visible')
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
      cy.get('.e-ccsearch').type("Description").click({force:true})
      cy.get('.e-cc-contentdiv') .invoke('text').should('contain',"Description")
      cy.get('.e-cc-contentdiv') .invoke('text').should('not.contain',"Content Repository")
    })

  
  cy.reload()
  cy.wait(4000)
   //T36.1.Add CAS config record
   cy.get('[title="Add"] > .se-add-circle').click({force:true})
        cy.wait(2000)
        
        cy.get('ejs-dropdownlist > div').type('NX - Nuxeo{enter} ')
        cy.wait(1000)
        cy.get('input[formcontrolname ="CREP"]').type('test_crep1{enter}')
        cy.get('input[formcontrolname ="UNAME"]').type('testun{enter}')
        // verified the password view icon
        const pass1 = 'testing';
        cy.get('input[formcontrolname ="PASSWD"]').type(pass1)
        cy.get('input[formcontrolname ="PASSWD"]').should('have.attr', 'type', 'password');
        cy.get('.se-view').click({force:true});
        cy.get('input[formcontrolname ="PASSWD"]').should('have.attr', 'type', 'text');
        cy.get('input[formcontrolname ="PASSWD"]').should('have.value', pass1);


        cy.get('input[formcontrolname ="CLOUD_BUCKET"]').type('testcbuck{enter}')
        cy.get('input[formcontrolname ="ENDPOINT_URL"]').type('/test{enter}{enter}') 
        cy.get('input[formcontrolname ="NUXEO_TYPE"]').type('CDER{enter}')
        cy.wait(2000)
        cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
            
        cy.wait(2000)
        cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Record added successfully')
        cy.wait(4000)
        cy.get('[title="Add"] > .se-add-circle').click({force:true})
        cy.wait(2000)
       
        cy.get('ejs-dropdownlist > div').type('NX - Nuxeo{enter} ')
        cy.wait(1000)
        cy.get('input[formcontrolname ="CREP"]').type('test_crep2{enter}')
        cy.get('input[formcontrolname ="UNAME"]').type('testun1{enter}')
        cy.get('input[formcontrolname ="PASSWD"]').type('testing{enter}')
        cy.get('input[formcontrolname ="CLOUD_BUCKET"]').type('testcbuck{enter}')
        cy.get('input[formcontrolname ="ENDPOINT_URL"]').type('/test{enter}{enter}') 
        cy.get('input[formcontrolname ="NUXEO_TYPE"]').type('CDER{enter}')
        cy.wait(2000)
        cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
        cy.wait(2000)
        cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Record added successfully')
        //T36.1.Add CAS config record
   cy.get('[title="Add"] > .se-add-circle').click({force:true})
   cy.wait(2000)
   
   cy.get('ejs-dropdownlist > div').type('NX - Nuxeo{enter} ')
   cy.wait(1000)
   cy.get('input[formcontrolname ="CREP"]').type('test_crep3{enter}')
   cy.get('input[formcontrolname ="UNAME"]').type('testun{enter}')
   // verifyied the password view icon
   const pass3 = 'testing';
   cy.get('input[formcontrolname ="PASSWD"]').type(pass3)
   cy.get('input[formcontrolname ="CLOUD_BUCKET"]').type('testcbuck{enter}')
   cy.get('input[formcontrolname ="ENDPOINT_URL"]').type('/test{enter}{enter}') 
   cy.get('input[formcontrolname ="NUXEO_TYPE"]').type('CDER{enter}')
   cy.wait(2000)
   cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
       
   cy.wait(2000)
   cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Record added successfully')

     //T-40 Search 
     cy.get('[title="Search"] > .se-search').click({force:true})
    cy.wait(2000)
    cy.get('#gridGlobalSearch').type('testun{enter}',{force:true})
    cy.get('.e-row > [data-colindex="1"]').should('contain','testun')
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
    cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Archive Service Configuration Deleted Successfully')
    cy.wait(5000)
    //Select ALL
    cy.get('#CREP_filterBarcell').type('test_crep{enter}',{force:true})
    cy.wait(2000)
    cy.get('.se-bulk-actions').click().click()
    cy.get('.e-row > [data-colindex="1"]').eq(0).click({force:true})
    cy.get('.e-toolbar-left').contains('Select all').click({force:true})
    cy.get('.e-toolbar-left').contains('Delete').click({force:true})
    cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
    cy.wait(1000)
    cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Archive Service Configurations Deleted Successfully')
   
     })
    
    
   it('CRUD Operation for S3 ', () => {
      cy.visit('https://test-neev.azurewebsites.net/cdn-app/reports');
       cy.wait(10000)
          cy.log("Successfully login")
          const num = Date.now(); 
          const n = num.toString();
          cy.wait(9000)
          cy.get('#sidebar-container').click()
          cy.get('.se-control-panel').invoke('show')
          cy.wait(2000)
          cy.get('.icon-arrow-right > .se-chevron-right').click({multiple:true})
          cy.get('.submenu-list-container').invoke('show')
          cy.wait(2000)
          
              cy.contains('CAS Configuration').click({force:true})
              cy.get('.e-gridcontent > .e-content').click({force:true})
                 cy.wait(3000)        
            //delete if already exists
            cy.get('#CREP_filterBarcell').type('test_crep1{enter}')
            cy.get('body').then(($body) => {
              if ($body.find('.e-emptyrow').length > 0 && $body.find('.e-emptyrow').text().includes("No records to display")) {
                // If "No records to display" message is found, do nothing
                cy.log('No records found, no deletion needed.');
              } else {
          cy.get('.se-delete').click({force:true})
          cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
           cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Archive Service Configuration Deleted Successfully')
              }
            })
           //Add the CAS config    
           cy.get('[title="Add"] > .se-add-circle').click({force:true})
            cy.wait(2000)

            cy.get('.note-txt').should('have.text',"Note: Please keep a note your connection password as for security reasons, you won\'t be able to view it again after saving")
            
            cy.get('ejs-dropdownlist > div').type('S3 - Amazon Web Services S3 Storage{enter} ')
            cy.wait(1000)
            
            cy.get('input[formcontrolname ="CREP"]').type('test_crep1{enter}')
            cy.get('input[formcontrolname ="UNAME"]').type('testun{enter}'+n)
            cy.get('input[formcontrolname ="PASSWD"]').type('testing{enter}')
            cy.get('input[formcontrolname ="CLOUD_BUCKET"]').type('testcbuck{enter}')
            cy.get('input[formcontrolname ="DESCRIPTION"]').type('test_description{enter}{enter}') 
            cy.get('input[formcontrolname ="REGION"]').type('region_test{enter}')
            cy.get('input[formcontrolname ="PREFIX"]').type('prefix_test{enter}')
            cy.get('input[formcontrolname ="SUFFIX"]').type('suffix_test{enter}')
            cy.wait(2000)
            cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
                
            cy.wait(1000)
            cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Record added successfully')
            
            //Edit     
             cy.wait(1000)
             cy.get('#CREP_filterBarcell').type('test_crep1{enter}')
             cy.wait(1000)
          cy.get('.se-edit').eq(0).click({force:true})
          cy.wait(2000)
          cy.get('input[formcontrolname ="PREFIX"]').clear({force:true})
          cy.get('input[formcontrolname ="PREFIX"]').type('test_pre{enter}',{force:true})
          cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
          cy.wait(2000)
          cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Record updated successfully')
  
          //delete
         cy.get('#UNAME_filterBarcell').type('testun{enter}'+n)
          cy.get('.se-delete').click({force:true})
          cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
           cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Archive Service Configuration Deleted Successfully')
    
})
  it('CRUD Operation for azure ', () => {
            cy.visit('https://test-neev.azurewebsites.net/cdn-app/reports');
             cy.wait(10000)
                cy.log("Successfully login")
                const num = Date.now(); 
                const n = num.toString();
                cy.wait(9000)
                cy.get('#sidebar-container').click()
                cy.get('.se-control-panel').invoke('show')
                cy.wait(2000)
                cy.get('.icon-arrow-right > .se-chevron-right').click({multiple:true})
                cy.get('.submenu-list-container').invoke('show')
                cy.wait(2000)
                
                    cy.contains('CAS Configuration').click({force:true})
                    cy.get('.e-gridcontent > .e-content').click({force:true})
                        cy.wait(3000)        
                  //delete if already exists
                  cy.get('#CREP_filterBarcell').type('test_crep1{enter}')
                  cy.get('body').then(($body) => {
                    if ($body.find('.e-emptyrow').length > 0 && $body.find('.e-emptyrow').text().includes("No records to display")) {
                      // If "No records to display" message is found, do nothing
                      cy.log('No records found, no deletion needed.');
                    } else {
                cy.get('.se-delete').click({force:true})
                cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
                 cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Archive Service Configuration Deleted Successfully')
                    }
                  })
                 //Cancel the cas config    
                 cy.get('[title="Add"] > .se-add-circle').click({force:true})
                  cy.wait(2000)
      
                  cy.get('.note-txt').should('have.text',"Note: Please keep a note your connection password as for security reasons, you won\'t be able to view it again after saving")
                  
                  cy.get('ejs-dropdownlist > div').type('AZ - Microsoft Azure Cloud Storage{enter} ')
                  cy.wait(1000)
                  
                  cy.get('input[formcontrolname ="CREP"]').type('test_crep1{enter}')
                  cy.get('input[formcontrolname ="UNAME"]').type('testun{enter}'+n)
                  cy.get('input[formcontrolname ="PASSWD"]').type('testing{enter}')
                  cy.get('input[formcontrolname ="CLOUD_BUCKET"]').type('testcbuck{enter}')
                  cy.get('input[formcontrolname ="DESCRIPTION"]').type('test_description{enter}{enter}') 
                 cy.get('button').contains('Cancel').click({force:true})

                 //Add the record
                  cy.wait(2000) 
                  cy.get('[title="Add"] > .se-add-circle').click({force:true})
                  cy.wait(2000)
      
                  cy.get('.note-txt').should('have.text',"Note: Please keep a note your connection password as for security reasons, you won\'t be able to view it again after saving")
                  
                  cy.get('ejs-dropdownlist > div').type('AZ - Microsoft Azure Cloud Storage{enter} ')
                  cy.wait(1000)
                  
                  cy.get('input[formcontrolname ="CREP"]').type('test_crep1{enter}')
                  cy.get('input[formcontrolname ="UNAME"]').type('testun{enter}'+n)
                  cy.get('input[formcontrolname ="PASSWD"]').type('testing{enter}')
                  cy.get('.se-view').click()
                  cy.get('input[formcontrolname="PASSWD"]').should('have.value', 'testing')
                  
                  cy.get('input[formcontrolname ="CLOUD_BUCKET"]').type('testcbuck{enter}')
                 
                  // Verify that  ‘Description’ label (optional string) field is added as CAS config item
                  cy.get('input[formcontrolname ="DESCRIPTION"]').type('test_description *{enter}{enter}') 
                  cy.contains('Description').parent().find('input').should('not.contain', '*')
                  
                  //Verify if save button is enabled after adding mandatory details
                  cy.get('button').contains('Save').should('not.be.disabled')
                  
                  cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
                   
                  cy.wait(1000)
                  cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Record added successfully')
                  
                  //Edit     
                   cy.wait(1000)
                   cy.get('#CREP_filterBarcell').type('test_crep1{enter}')
                   cy.wait(1000)
                   cy.get('.se-edit').eq(0).click({force:true})
                   cy.wait(2000)
                   cy.get('input[formcontrolname ="DESCRIPTION"]').clear({force:true})
                   cy.get('input[formcontrolname ="DESCRIPTION"]').type('test_des{enter}',{force:true})
                   cy.get('.d-flex > :nth-child(1) > .e-control').click({force:true})
                   cy.wait(2000)
                   cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Record updated successfully')           
          
                //delete
               cy.get('#UNAME_filterBarcell').type('testun{enter}'+n)
                cy.get('.se-delete').click({force:true})
                cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
                 cy.get('ejs-toast .e-toast-message > .e-toast-content').should('contain','Archive Service Configuration Deleted Successfully')
          
               })

    })
  })
  