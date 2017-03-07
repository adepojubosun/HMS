var XLSX = require('xlsx');
var workbook = XLSX.readFile('/home/bosun/NodeProjects/RUN_HMS/lib/STOCK.xlsx');
var sheet_name_list = workbook.SheetNames;



sheet_name_list.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    var headers = {};
    var data = [];
    for(z in worksheet) {
        if(z[0] === '!') continue;
        //parse out the column, row, and value
        var col = z.substring(0,1);
        var row = parseInt(z.substring(1));
        var value = worksheet[z].v;

        //store header names
        if(row == 1) {
            headers[col] = value;
            continue;
        }

        if(!data[row]) data[row]={};
        data[row][headers[col]] = value;
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();
    for(var i=0; i<data.length; i++){
        console.log(data[i]);
    }
    
});