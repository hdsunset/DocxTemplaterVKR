const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended: true}))
const generateDocx = require('generate-docx');
const requestJS = require('request');
const JSZip = require('jszip');
const fs = require('fs');

app.get('/download', (req, res) => {
console.log(req.query)
  res.download(__dirname+'/'+req.query.file)
  //тут можно удалять файл
  console.log("file uploaded");
})


//////ДЛЯ ПРОТОКОЛА ВКР////////////////////////////////////////////////////////////////////////
app.post('/getWordProtokol', (req, res) => {
  let requests = JSON.parse(`[${Object.keys(req.body)[0]}]`)
  let ans = [];
  requests.forEach( (request, index) => {
    const options = {
     template: {
       filePath: 'protocol.docx',
       data: request
     },
     save: {
       filePath: request.name_DP+'.docx'
     }
    }
    let url = encodeURI(`https://ws3.morpher.ru/russian/declension?s=${request.name_IP}&format=json`);
    requestJS(url, function(err, response, body) {
      request.name_RP = JSON.parse(body).Р;
      generateDocx(options, (error, message) => {
        if (error) {
          console.error(error)
        } else {
          ans.push('/download?file='+request.name_DP+'.docx')
          if (ans.length === requests.length) {
            if (ans.length <= 2) res.send(ans);
            else {
              let zip = new JSZip();
              for (var i = 0; i < requests.length; i++){
                zip.file(requests[i].name_DP+'.docx', fs.readFileSync(__dirname+'/'+requests[i].name_DP+'.docx'))
              }
              zip.generateAsync({type : "uint8array"}).then((result => {
                fs.writeFileSync("Archive_studs.zip", result)
                ans = ['/download?file=Archive_studs.zip']
                res.send(ans);
              }))
            }
          }
        }
      });
    });
  });
});

///////////////ДЛЯ ВЫПИСКИ////////////////////////////////////////////////////
app.post('/getWordExtract', (req, res) => {
  let requests = JSON.parse(`[${Object.keys(req.body)[0]}]`)
  let ans = [];
  requests.forEach( (request, index) => {
    const options = {
     template: {
       filePath: 'protocol_extract.docx',
       data: request
     },
     save: {
       filePath: request.name_DP+'.docx'
     }
    }
    let url = encodeURI(`https://ws3.morpher.ru/russian/declension?s=${request.name_IP}&format=json`);
    requestJS(url, function(err, response, body) {
      request.name_RP = JSON.parse(body).Р;
      generateDocx(options, (error, message) => {
        if (error) {
          console.error(error)
        } else {
          ans.push('/download?file='+request.name_DP+'.docx')
          if (ans.length === requests.length) {
            if (ans.length <= 2) res.send(ans);
            else {
              let zip = new JSZip();
              for (var i = 0; i < requests.length; i++){
                zip.file(requests[i].name_DP+'.docx', fs.readFileSync(__dirname+'/'+requests[i].name_DP+'.docx'))
              }
              zip.generateAsync({type : "uint8array"}).then((result => {
                fs.writeFileSync("Arc.zip", result)
                ans = ['/download?file=Arc.zip']
                res.send(ans);
              }))
            }
          }
        }
      });
    });
  });
});

// отображение HTML страницы
app.get('/',  (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000);
