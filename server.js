const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended: true}))
const generateDocx = require('generate-docx');
const requestJS = require('request');

app.get('/download', (req, res) => {
console.log(req.query)
  res.download(__dirname+'/'+req.query.file)
  //тут можно удалять файл
})

app.post('/getWord', (req, res) => {
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
            res.send(ans);
          }
        }
      });
    })
  })
})

// отображение HTML страницы
app.get('/',  (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000);
