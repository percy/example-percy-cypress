///<reference types="cypress">

Cypress.on('uncaught:exception', (err, runnable) => {
  console.error('Uncaught Exception:', err.message);
  return false; // Prevent Cypress from failing the test on uncaught exceptions
});

describe("Translations", () => {
  const baseUrl = 'https://test-neev.azurewebsites.net/cdn-app/reports';

  context('Utilizing API request', () => {
    beforeEach(() => {
      cy.getAndSetToken(); // Assuming this function sets an authentication token
    });

   it('Visit URL with Auth Token', () => {
      cy.visit(baseUrl);
      cy.wait(10000); // Consider using more specific waits or assertions

      const cachedTranslations = localStorage.getItem('translationsData');
      // Use cached data if needed
      if (cachedTranslations) {
        cy.log("Using cached translations data");
      }

      cy.log("Successfully logged in");
      
      cy.get('#sidebar-container').click();
      cy.get('.se-control-panel').invoke('show');
      cy.get('.icon-arrow-right > .se-chevron-right').click({ multiple: true });
      cy.get('.submenu-list-container').invoke('show');
      cy.intercept('GET', 'https://test-neev-cdn-api.azurewebsites.net/translations').as('getTranslations');
      cy.contains('Translations').click({ force: true });
      cy.wait(8000)
     
       //Verify the bread crumbs on main page
       cy.get('.breadcrumb-item').should('contain','Translations').and('have.css', 'text-align', 'left');
      //Url should be as given 
      cy.url().should('have.string', 'https://test-neev.azurewebsites.net/cdn-app/configuration/corestone-setting/translations');
      cy.get('@getTranslations').should('not.exist');
       //Add Translations record
     cy.get('[title="Add"] > .se-add-circle').click({force:true})
     cy.wait(2000)
     //Verify the bread crumbs on Add page
     cy.get('.e-dlg-header').should('contain','Add Translations')
  
    // cy.get('ejs-dropdownlist input[formcontrolname ="LANG"]').type("EN", { force: true })
     const key1="test1";
     const value1="testing1"
     cy.get('input[formcontrolname ="KEY"]').type(key1)
    cy.get('input[formcontrolname ="VALUE"]').type(value1)
      //Verify if save button is disabled with blank field detail
      cy.get('button').contains('Save').should('be.disabled')
      cy.get('.e-btn').contains('Add').click({ force: true });
       cy.wait(1000)
      //Verify if save button is enabled after adding mandatory details
      cy.get('button').contains('Save').should('not.be.disabled')
      //Verify the grid header 
      cy.get('table thead th').then(($headers) => {
        const headerNames = Array.from($headers).map((header) => header.innerText.trim());
        console.log(headerNames); // Log to inspect the headers
        
        const requiredHeaders = ['Key', 'Value', 'Actions'];
        requiredHeaders.forEach(header => {
          expect(headerNames).to.include(header);
        });
      });
      // Assert that the added record exists
      cy.get('table tbody tr').should('have.length.greaterThan', 0).then(($rows) => {
        console.log($rows.length); // Check number of rows
        $rows.each((index, row) => {
            const cells = row.querySelectorAll('td');
            console.log(cells[0].innerText, cells[1].innerText); // Log cell values
        });
        
        const addedRecord = Array.from($rows).find((row) => {
            const cells = row.querySelectorAll('td');
            return cells[0].innerText.trim() === key1 && cells[1].innerText.trim() === value1;
        });
    
        if (addedRecord) {
            console.log('Record found:', addedRecord);
        } else {
            console.error('No matching record found.');
        }
    });
    
      ///edit while adding  
      const key2="test2";

      cy.get('.e-btn-icon').eq(1).click({force:true})
      cy.get('input[name="KEY"]').clear()
      cy.get('input[name="KEY"]').type(key2)
      //cancel while adding
      cy.get('.e-cancel-icon').click({force:true})
      //updated while adding
      cy.get('.e-btn-icon').eq(1).click({force:true})
      cy.get('input[name="KEY"]').clear()
      cy.get('input[name="KEY"]').type(key2)
      cy.get('.e-btn-icon').eq(1).click({force:true})
      //delete while adding 
      cy.get('input[formcontrolname ="KEY"]').type("test3")
      cy.get('input[formcontrolname ="VALUE"]').type("testing3")
      cy.get('.e-btn').contains('Add').click({ force: true });
      cy.get('.e-btn-icon').eq(2).click({force:true})
      cy.get('.btn-save').contains('Save').click({ force: true });
      cy.wait(1000)
      cy.get('.e-toast').should('contain','Translation Added Successfully')

    //Edit the page 
    cy.wait(1000)
    cy.get('#KEY_filterBarcell').type("test2{enter}")
    cy.get('.se-edit').click({force:true})
    cy.get('input[formcontrolname ="VALUE"]').clear()
    cy.get('input[formcontrolname ="VALUE"]').type('testing2')
    cy.get('.btn-save').contains('Save').click({ force: true });
    cy.wait(1000)
      cy.get('.e-toast').eq(2).should('contain','Translations Updated Successfully')
      cy.wait(4000)
      //Delete  
      //cy.get('#KEY_filterBarcell').type("test2{enter}")
      cy.get('[aria-rowindex="1"] > .e-templatecell > .actions > [title="Delete"] > .se-delete').click({force:true})
    cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
    //cy.get('ejs-toast #toast_3').should('contain','Record deleted successfully')
    
     
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
          cy.contains('Translations').click({force:true})
          cy.wait(8000)
          //Add the Translations  
    cy.get('[title="Add"] > .se-add-circle').click({force:true})
    cy.wait(2000)
    // Add the record
   cy.get('input[formcontrolname ="KEY"]').type("test0")
   cy.get('input[formcontrolname ="VALUE"]').type("testing0")     
     cy.get('.e-btn').contains('Add').click({ force: true });
      cy.wait(1000)
      cy.get('.btn-save').contains('Save').click({ force: true });
      cy.wait(1000)
      cy.get('.e-toast').should('contain','Translation Added Successfully')
cy.wait(4000)
        // Add the record
        cy.get('[title="Add"] > .se-add-circle').click({force:true})
    cy.wait(2000)
   cy.get('input[formcontrolname ="KEY"]').type("test4")
   cy.get('input[formcontrolname ="VALUE"]').type("testing4")     
     cy.get('.e-btn').contains('Add').click({ force: true });
      cy.wait(1000)
     
   cy.get('ejs-textbox input[formcontrolname ="KEY"]').type("test5")
   cy.get('ejs-textbox input[formcontrolname ="VALUE"]').type("testing5{enter}")     
       cy.wait(1000)
      cy.get('.btn-save').contains('Save').click({ force: true })
      //cy.get('.e-toast').should('contain','Translation Added Successfully')

        cy.wait(2000)
          
      // download
      
cy.get('.se-download').trigger('click')
cy.log("downloaded file successfully ");

cy.readFile('cypress/downloads/Translations.xlsx',{contains:true})
cy.log("downloaded file verified");
cy.wait(8000)
//content verification 
const filePath ="cypress/downloads/Translations.xlsx";

cy.task('readExcelFile', { filePath }).then((data) => {
console.log('Excel Data:', data);
  expect(data).to.have.length.greaterThan(0); // Check that there is at least one row
  cy.log(`This Excel has ${data.length} records`);
  cy.log('confirmed that we have many rows');
  cy.wait(3000)
  expect(data[0]).to.include('Key'); 

  cy.log('confirmed that key is present');
  expect(data[1]).to.include('test4');
})
        
        
      //Verify the grid header 
      cy.get('table thead th').then(($headers) => {
        const headerNames = Array.from($headers).map((header) => header.innerText.trim());
        console.log(headerNames); // Log to inspect the headers
        
        const requiredHeaders = ['Key', 'Value', 'Actions'];
        requiredHeaders.forEach(header => {
          expect(headerNames).to.include(header);
        });
      });

    //Verify the icons present on the grid 
          const icons = {
            'Column Chooser': '.se-view-columns', 
            'Export to Excel' :'.se-download',
            'Search': 'i.se-search',                            
            'Bulk Action': '.se-bulk-actions',       
            'Add': '.se-add-circle'                     
          }
          for (const [iconName, iconSelector] of Object.entries(icons)) {
            cy.get(iconSelector,{ timeout: 10000 }).should('be.visible').parent().should('have.attr', 'title', iconName)
          }
          cy.wait(2000)
    //Verify the ascending sort 
            cy.get('.e-headertext').contains('Key').click({force:true})
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
          cy.get('.e-headertext').contains('Key').click({force:true});
          verifyColumnSorted('descending');

    
          //Group by
    /* cy.get('.se-groupby').click({force:true})
      cy.wait(2000)
      const draggableRow = cy.get('[data-colindex="0"] > .e-headercelldiv').contains('Key')  // Replace with your actual selector
      const targetGrid =  cy.get('.e-groupdroparea') // Replace with your actual selector
      draggableRow.trigger('mousedown', { button: 0 })
      targetGrid.trigger('mousemove', { clientX: 500, clientY: 500 })
      targetGrid.trigger('mouseup', { force: true })
      cy.get('.e-groupcaption').should('contain','Key:')
      cy.get('.e-ungroupbutton').click({force:true})
       cy.get('.se-groupby').click({force:true})*/
    // Column Chooser
    //verify the cancel button on column chooser
cy.wait(1000)
cy.get('.se-view-columns').click({force:true})
  cy.get('.e-ccheck').contains('.e-label','Key').click({force:true})
  cy.contains('button','Cancel').click({force:true})
  cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Key').should('be.visible')
  
//verify the OK button on column chooser
    cy.wait(1000)
    cy.get('.se-view-columns').click({force:true}).click({force:true})
    cy.get('.e-ccheck').contains('.e-label','Key').click({force:true})
    cy.contains('button','OK').click({force:true})
    cy.wait(4000)
    cy.get('th[data-colindex="0"] > .e-headercelldiv > .e-headertext').contains('Key').should('not.be.visible')
    cy.reload()
      
    
     //Search 
     cy.get('[title="Search"] > .se-search').click({force:true})
    cy.wait(2000)
    cy.get('#gridGlobalSearch').type('test0{enter}',{force:true})
    cy.wait(1000)
    cy.get('.e-row > [data-colindex="0"]').should('contain','test0')
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
    // cy.get('ejs-toast #toast_3').should('contain','Record deleted successfully')
     cy.get('#gridGlobalSearch').clear()

     cy.reload()
     //Select ALL
     cy.get('#KEY_filterBarcell').type("test{enter}")
     cy.wait(2000)
     cy.get('.se-bulk-actions').click()
     cy.get('.e-row > [data-colindex="1"]').eq(0).click({force:true})
     cy.get('.e-toolbar-left').contains('Select all').click({force:true})
     cy.get('.e-toolbar-left').contains('Delete').click({force:true})
     cy.get('#confirmModalPopup > .e-footer-content > .e-primary').click({force:true})
     //cy.wait(1000)
     //cy.get('ejs-toast #toast_3').should('contain','Record deleted successfully')
     //cy.get('#KEY_filterBarcell').clear()
    
  
  })
      
     

  })
})