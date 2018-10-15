# Description
Simple document generator by template. In order to use the service, you need to go to the 'https://localhost:3000' in your browser, select the database file (.xlsx only). After that, you will see a grid with the data from your database. You only need to specify the path to the template and click the "Generate document" button, after which you will be asked to download the document. This service does not require installed MS Word.
***
# Install
At first, you need to install Node.js platform with the compatible editor: (VSC, WebStorm, Atom,...).
To lanch the project you need to download all files into the same directory and install the [NPM](https://www.npmjs.com/get-npm). Then go into your directory and run this command: 
**npm install**
This command will install all npm references (node modules). When install will finished, run:
**node server**
You started your local server to run this API. Now go to http://localhost:3000/. 
***
# Usage
In this page you can chose the Excel-file and then you could chose the following rows to generate the VKR-documents. In this GRID table you could do anything you want to display the range off students you want to print.
If you'll chose 3-more documents it will be uploaded by an archive.
