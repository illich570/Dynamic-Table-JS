var titulos = ['Fecha', 'Capital Invertido', '%', 'Monto a ganar', 'Ganancia', 'Capital', 'Monto total'];
var columnas = 7;
var totalRows= 5;
function testex(){
    const tabla = document.getElementById('example');
    testx();
    console.log(tabla.rows);
}

function testx(){
    var textContent;
    var div = document.getElementById("container");
    for( var tbl = 0; tbl < 11; tbl++){
        var tableTest = document.createElement("table");
        tableTest.setAttribute("class","table table-bordered table-dark mt-5");
        var greet = 0;
        for (var r = 0; r < totalRows+1 ; r++) {
            if( r== 0){
                var head = document.createElement("thead");
                for( var rHead = 0; rHead < 7; rHead++){
                    var th = document.createElement('th');
                    var thText= document.createTextNode(titulos[rHead]);
                    th.appendChild(thText);
                    head.appendChild(th);
                }
                tableTest.appendChild(head);
            }else{
                var row = document.createElement("tr");
                for(var c = 0; c < columnas; c++ ){
                    var cell = document.createElement("td");
                    textContent = document.createTextNode(` Hola soy ${greet}`);
                    greet++;
                    cell.appendChild(textContent);
                    row.appendChild(cell);
                    }
                    tableTest.appendChild(row);
            }
        }
        div.appendChild(tableTest);
    }
}