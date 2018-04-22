const XlsxPopulate = require('xlsx-populate');

// Load an existing workbook
XlsxPopulate.fromFileAsync("./merge1.xlsx")
   .then(workbook => {
       // Modify the workbook.
       const value = workbook.sheet("sheet").cell("B2").value();
       
       // Log the value.
       console.log(value);
   });