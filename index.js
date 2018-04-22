const generateDocx = require('generate-docx');

var N=20; // number of a row
const XlsxPopulate = require('xlsx-populate');
var arrValues = new Array();
/// склонение по падежам
var request = require('request');
//var word = "Пономарёв Евгений Александрович";
//request(encodeURI(`https://ws3.morpher.ru/russian/declension?s=${word}&format=json`), function (error, response, body) {
//var padej = JSON.parse(body);
//console.log(padej.Р);
///
//});
// Load an existing workbook
XlsxPopulate.fromFileAsync("./merge.xlsx")
   .then(workbook => {
       // Modify the workbook.
     arrValues[0] = workbook.sheet("students").cell('BA'+N).value();
     arrValues[1] = workbook.sheet("students").cell('BB'+N).value();
     arrValues[2] = workbook.sheet("students").cell('AQ'+N).value();
     arrValues[3] = workbook.sheet("students").cell('AR'+N).value();
     arrValues[4] = workbook.sheet("students").cell('C'+N).value();
     
    //  let Func = (){
    //  let promise = new Promise((resolve, reject) => {
    var word = arrValues[4];
    request(encodeURI(`https://ws3.morpher.ru/russian/declension?s=${word}&format=json`), function (error, response, body) {

    padej= JSON.parse(body).Р;
     
    //  console.log(padej);
    // });
    // resolve(padej);
    //  }); 
    // };
    // Func()
    // .then((result) =>{
    //   consoole.log(result);
    // })
    // .catch((errorMessage) => {
    //   console.log(errorMessage);
    // });
     arrValues[5] = padej;
     //console.log(arrValues[4]);
     //console.log(arrValues[5]);
     arrValues[6] = workbook.sheet("students").cell('AD'+N).value();
     arrValues[7] = workbook.sheet("students").cell('AB'+N).value();
     arrValues[8] = workbook.sheet("students").cell('AC'+N).value();
     arrValues[9] = workbook.sheet("students").cell('I'+N).value();
     arrValues[10] = workbook.sheet("students").cell('K'+N).value();
     arrValues[11] = workbook.sheet("students").cell('BH'+N).value();
     arrValues[12] = workbook.sheet("students").cell('BK'+N).value();
     arrValues[13] = workbook.sheet("students").cell('AH'+N).value();

     
       //console.log(value);
   });
  });

  const options = {
    template: {
      filePath: 'protocol_extract.docx',
      data: {
        'date': arrValues[0],
        'num_prot': arrValues[1],
        'spec_numb': arrValues[2],
        'spec_nazv': arrValues[3],
        'name_IP': arrValues[4],
        'name_RP': arrValues[5],
        'mark': arrValues[6],
        'letter': arrValues[7],
        'number': arrValues[8],
        'name_DP': arrValues[9],
        'obrazov': arrValues[10],
        'otlichie': arrValues[11],
        'text': arrValues[12],
        'recenzent': arrValues[13]
       // 'body': 'My body is my temple'
      }
    },
    save: {
      filePath: N+'.docx'
    }
   }
   generateDocx(options, (error, message) => {
    if (error) {
      console.error(error)
    } else {
      console.log(message)
    }
   });

