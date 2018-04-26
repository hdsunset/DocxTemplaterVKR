window.IQc = { entity: 'x', ENTITIES: { x: 'x' } } //фикс 
/////////import 'style.css';


function openXlsx(file) {
  return XlsxPopulate.fromDataAsync(file);
}

let wb;
let students; 

$("#file-input").on('change', (e) => {
  var file = document.getElementById('file-input').files[0];
  openXlsx(file).then(workbook => {
    wb = workbook
    let length = wb.sheet('students')._rows.length - 2
    students = new Array(length)
    let counter = 0;
    var data = new Array();
    for (let i = 2; i <= length + 1; i++ ){
      students[i-2] = {
        date: workbook.sheet("students").cell('BA'+i).value(),
        num_prot: workbook.sheet("students").cell('BB'+i).value(),
        spec_numb: workbook.sheet("students").cell('AQ'+i).value(),
        spec_nazv: workbook.sheet("students").cell('AR'+i).value(),
        name_IP: workbook.sheet("students").cell('C'+i).value(),
        mark: workbook.sheet("students").cell('AD'+i).value(),
        letter: workbook.sheet("students").cell('AB'+i).value(),
        number: workbook.sheet("students").cell('AC'+i).value(),
        name_DP: workbook.sheet("students").cell('I'+i).value(),
        obrazov: workbook.sheet("students").cell('K'+i).value(),
        otlichie: workbook.sheet("students").cell('BH'+i).value(),
        text: workbook.sheet("students").cell('BK'+i).value(),
        recenzent: workbook.sheet("students").cell('AH'+i).value(),
        tema: workbook.sheet("students").cell('L'+i).value(),
        magister: workbook.sheet("students").cell('AT'+i).value(),
        profil: workbook.sheet("students").cell('AS'+i).value(),
        ruk_F: workbook.sheet("students").cell('M'+i).value(),
        ruk_IO: workbook.sheet("students").cell('N'+i).value(),
        ruk_F_RP: workbook.sheet("students").cell('P'+i).value(),
        secretar: workbook.sheet("students").cell('AU'+i).value()
      }
      var row = {};
      row["name_IP"]=students[i-2].name_IP;
      row["spec_numb"]=students[i-2].spec_numb;
      row["spec_nazv"]=students[i-2].spec_nazv;
      row["tema"]=students[i-2].tema;
      row["ruk_F"]=students[i-2].ruk_F;
      row["letter"]=students[i-2].letter;
      row["recenzent"]=students[i-2].recenzent;
      row["secretar"]=students[i-2].secretar;
      row["date"]=students[i-2].date;
      data[i-2] = row;
      //console.log(students[i-2].mark)
     //console.log(data)
    }
    //students.forEach(e => addCheckbox(e.name_IP))
    //console.log(students.mark)
  var source =
  {
      localdata: data,
      datatype: "array"
  };
  var dataAdapter = new $.jqx.dataAdapter(source, {
      loadComplete: function (data) { },
      loadError: function (xhr, status, error) { }      
  });
  $("#grid").jqxGrid(
  {   
      source: dataAdapter,
      theme: 'energyblue',      
      width: '100%',
      height: '100%',
      sortable: true,
      filterable: true,
      showfilterrow: true,
      //autoheight: true,
      selectionmode: 'multiplerows',
      
      //pageable: true,
      //selectionmode: 'checkbox',
      columns: [
        { text: 'ФИО', datafield: 'name_IP', width: 200 },
        { text: 'Номер спец.', datafield: 'spec_numb', width: 80 },
        { text: 'Назв. спец.', datafield: 'spec_nazv', width: 200 },
        { text: 'Тема диплома', datafield: 'tema', width: 270 },
        { text: 'Руководитель', datafield: 'ruk_F', width: 120 },
        { text: 'Рецензент', datafield: 'recenzent', width: 140 },
        { text: 'Секретарь', datafield: 'secretar', width: 140 },        
        { text: 'Дата сдачи', datafield: 'date', width: 100 },
      ]
  });
  //var selectedStuds = [];
  // $('#grid').on('rowselect', function (event) {
              
  //             var args = event.args;
  //             var row = args.rowindex;
  //             selectedStuds = selectedStuds.push(args.row.name_IP);
  //             console.log(selectedStuds);
                          
  // });
  //$("#sumbit-button").jqxButton();
  //var rows = $("grid").jqxGrid('getrows');
  //console.log(rows[0])
  // $("#sumbit-button").click(function () {
  //   var firstColumnData = [];
    
  //     var rows = $('#grid').jqxGrid('getrows');
  //     var result = "";
  //     for (var i = 0; i < rows.length; i++) {
  //         firstColumnData.push(rows[i].firstname);
  //     }
  //     console.log(firstColumnData);           
  // });
 
})
})


//конец чтения из excel

/////////////////////нажатие на кнопку подтверждения//////////////////////////
// $("#form").submit((e) => {
//   e.preventDefault();
  
//   getChecked($("#form"), list => {
//     $.ajax({
//       type: 'POST',
//       url: '/getWord',
//       data: JSON.stringify(list),
//       success: (data) => {
//         data.forEach(e => window.open(e, '_blank'))
//       }
//     })
//   })
// })


//////////////////////работающая функция проверки чекбоксов формы//////////////////////
// function getChecked(form, callback) { // передается массив данных form
//    let arr = Array.from(form[0]);
//    arr.shift()
//    arr.pop()
//    let studs = students;
//    arr.forEach((elem, index) => {
//      studs[index].checked = //$("#jqxcheckbox").jqxCheckBox('checked');;
//    })
//    studs = studs.filter(elem => elem.checked)
//    callback(studs);
//    return studs; // возвращается список студентов
//  }

// $("#sumbit-button").click(function () {
//   // var rows = $("#grid").jqxGrid('selectedrowindexes');
//   // var selectedRecords = new Array();
//   // for (var m = 0; m < rows.length; m++) {
//   //     var row = $("#grid").jqxGrid('getrowdata', rows[m]);
//   //     selectedRecords[selectedRecords.length] = row;
//   // }
//   // console.log(selectedRecords);
//   var gridDataArray = $('#myGrid').data('kendoGrid')._data;
//   var columnName = 'ФИО';
//   for (var index=0; index<gridDataArray.length;index++) {
//     columnDataVector[index] = gridDataArray[index][columnName];
//   };
//   alert(columnDataVector);

// });

$("#submit_button").jqxButton({
  theme: 'energyblue',
  height: 40
});


$("#extract_button").jqxButton({
  theme: 'energyblue',
  height: 40
});

$("#selectAll").jqxToggleButton({
  theme: 'energyblue',
  height: 40
});
// $("#form").submit((e) => {
//   e.preventDefault();
  
//   getChecked($("#form"), list => {
//     $.ajax({
//       type: 'POST',
//       url: '/getWord',
//       data: JSON.stringify(list),
//       success: (data) => {
//         data.forEach(e => window.open(e, '_blank'))
//       }
//     })
//   })
// })
 function getChecked(form, callback) { // передается массив данных form
  //  let arr = Array.from(form[0]);
////    arr.shift()
//    arr.pop()
//    let studs = students;
//    arr.forEach((elem, index) => {
//      studs[index].checked = //$("#jqxcheckbox").jqxCheckBox('checked');;
//    })
//    studs = studs.filter(elem => elem.checked)
var rows = $("#grid").jqxGrid('selectedrowindexes');
var selectedRecords = new Array();

for (var m=0; m<rows.length; m++){
  selectedRecords[m] = students[rows[m]];
}
// for (var m = 0; m < rows.length; m++) {
//     var row = $("#grid").jqxGrid('getrowdata', rows[m]);
//     selectedRecords[selectedRecords.length] = row;
// }
//console.log(selectedRecords[0].name_IP);
/// МАССИВ ОДНИХ ФИО
// var selectedStuds = new Array();
// for (var i=0;i<selectedRecords.length; i++) {
//   selectedStuds[i] = selectedRecords[i].name_IP;
// }
  console.log(selectedRecords);
  callback (selectedRecords);
  return selectedRecords;
//    callback(studs);
//    return studs; // возвращается список студентов
  }

////нажатие на кнопку сгенерировать протокол ВКР//////////////////
$("#form").submit((e) => {
  e.preventDefault();
  
  ///ЗАПРОС НА СЕРВЕР////////////////

  getChecked($("#form"), selectedRecords => {
  $.ajax({
    type: 'POST',
    url: '/getWordProtokol',
    data: JSON.stringify(selectedRecords),
    success: (data) => {
      data.forEach(e => window.open(e, '_blank'))
      }
    });
  });
});

$("#extract_button").click((e) => {
  e.preventDefault();
  
  ///ЗАПРОС НА СЕРВЕР////////////////

  getChecked($("#form"), selectedRecords => {
  $.ajax({
    type: 'POST',
    url: '/getWordExtract',
    data: JSON.stringify(selectedRecords),
    success: (data) => {
      data.forEach(e => window.open(e, '_blank'))
      }
    });
  });
});
//var trigger = false;
$("#selectAll").on('click', function () {
  var toggled = $("#selectAll").jqxToggleButton('toggled');
  if (toggled) {
    $('#grid').jqxGrid('selectallrows');
  }
  else $("#grid").jqxGrid('clearselection');
});

// добавление чекбоксов/////////////////////////////////////////////
function addCheckbox(name) {
  var container = $('#cblist');
  var inputs = container.find('input');
  var id = inputs.length+1;
  $('<li></li>').appendTo(container);
  $('<input />', { type: 'checkbox', id: 'cb'+id, value: name }).appendTo(container);
  $('<label />', { 'for': 'cb'+id, text: name }).appendTo(container);
}
/////////////////////////////GRID//////////////////////////////////
// var data = new Array();
// var firstNames =
// [
//     "Andrew", "Nancy", "Shelley", "Regina", "Yoshi", "Antoni", "Mayumi", "Ian", "Peter", "Lars", "Petra", "Martin", "Sven", "Elio", "Beate", "Cheryl", "Michael", "Guylene"
// ];
// var lastNames =
// [
//     "Fuller", "Davolio", "Burke", "Murphy", "Nagase", "Saavedra", "Ohno", "Devling", "Wilson", "Peterson", "Winkler", "Bein", "Petersen", "Rossi", "Vileid", "Saylor", "Bjorn", "Nodier"
// ];
// var productNames =
// [
//     "Black Tea", "Green Tea", "Caffe Espresso", "Doubleshot Espresso", "Caffe Latte", "White Chocolate Mocha", "Cramel Latte", "Caffe Americano", "Cappuccino", "Espresso Truffle", "Espresso con Panna", "Peppermint Mocha Twist"
// ];
// var priceValues =
// [диплома
//     "2.25", "1.5", "3.0", "3.3", "4.5", "3.6", "3.8", "2.5", "5.0", "1.75", "3.25", "4.0"
// ];
// for (var i = 0; i < 100; i++) {
//     var row = {};
//     var productindex = Math.floor(Math.random() * productNames.length);
//     var price = parseFloat(priceValues[productindex]);
//     var quantity = 1 + Math.round(Math.random() * 10);
//     row["firstname"] = firstNames[Math.floor(Math.random() * firstNames.length)];
//     row["lastname"] = lastNames[Math.floor(Math.random() * lastNames.length)];
//     row["productname"] = productNames[productindex];
//     row["price"] = price;
//     row["quantity"] = quantity;
//     row["total"] = price * quantity;
//     data[i] = row;
// }
// var source =
// {
//     localdata: data,
//     datatype: "array"
// };
// var dataAdapter = new $.jqx.dataAdapter(source, {
//     loadComplete: function (data) { },
//     loadError: function (xhr, status, error) { }      
// });
// $("#jqxgrid").jqxGrid(
// {
//     source: dataAdapter,
//     columns: [
//       { text: 'First Name', datafield: 'firstname', width: 100 },
//       { text: 'Last Name', datafield: 'lastname', width: 100 },
//       { text: 'Product', datafield: 'productname', width: 180 },
//       { text: 'Quantity', datafield: 'quantity', width: 80, cellsalign: 'right' },
//       { text: 'Unit Price', datafield: 'price', width: 90, cellsalign: 'right', cellsformat: 'c2' },
//       { text: 'Total', datafield: 'total', width: 100, cellsalign: 'right', cellsformat: 'c2' }
//     ]
// });
// //});

