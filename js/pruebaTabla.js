var titulos = ['Fecha', 'Capital Invertido', '%', 'Monto a ganar', 'Ganancia', 'Capital', 'Monto total'];
var fechaString = [];
var fechasDate = [];
var capitales = [];
var percentArray = [];
var gananciaArray = [];
var ganaLiberadaArray = [];
var capitalLiberadoArray = [];
var montoTotalArray = [];
var plazos;
var l;
var totalRows;
var columna = 7; //CALCULAR DIFERENCIA DE FECHAS PARA LA 5TA COLUMNA DE LA TABLA BASE.

function testTable(){
if ( document.getElementById('monto').value != '' && document.getElementById('date').value != '' && document.getElementById('corte').value != undefined ){
    if(document.getElementById("tabla")){
        var tbl = document.getElementById("tabla");
        var div1 = document.getElementById("div1");
        div1.removeChild(tbl);
        drawTable();
    }else{
    drawTable();
    }
}
}
    function drawTable() {
        if(plazos == undefined){
            getFechas();
            arregloCapitalInvertido();
            getPercentAndMontos();
            getGananciaLiberada();
            getCapitalLiberado();
            getMontoTotal();
            totalRows = plazos;
        }else{
            getFechas();
            arregloCapitalInvertido();
            getPercentAndMontos();
            getGananciaLiberada();
            getCapitalLiberado();
            getMontoTotal();
            totalRows = plazos;
        }
        var cellText;
        var div1 = document.getElementById('div1');
        var tbl = document.createElement("table");
        div1.setAttribute("class","container");
        tbl.setAttribute("class","table table-bordered table-dark");
        tbl.setAttribute("id","tabla");
        
        for (var r = 0; r < totalRows+1 ; r++) {
            if( r == 0){
                var head = document.createElement("thead");
                for( var rHead = 0; rHead < 7; rHead++){
                    var th = document.createElement('th');
                    var thText= document.createTextNode(titulos[rHead]);
                    th.appendChild(thText);
                    head.appendChild(th);
                }
                tbl.appendChild(head);
            }else{
                var row = document.createElement("tr");
                for (var c = 0; c < columna; c++) {
                    var cell = document.createElement("td");
                    switch(c){
                        case 0:
                            cellText = document.createTextNode(fechaString[r-1]);
                            break;
                        case 1:
                            cellText = document.createTextNode(capitales[r-1].toLocaleString());
                            break;
                        case 2:
                            cellText = document.createTextNode(percentArray[r-1]);
                            break;
                        case 3:
                            cellText = document.createTextNode(gananciaArray[r-1].toLocaleString());
                            break;
                        case 4:
                            cellText = document.createTextNode(ganaLiberadaArray[r-1].toLocaleString());
                            break;
                        case 5:
                            cellText = document.createTextNode(capitalLiberadoArray[r-1].toLocaleString());
                            break;
                        case 6:
                            cellText = document.createTextNode(montoTotalArray[r-1].toLocaleString());
                        break;
                        default:
                            cellText = document.createTextNode("Sunshine");
                    }
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                tbl.appendChild(row);
            }
// add the row to the end of the table body
        }
    div1.appendChild(tbl);
     // appends <table> into <div1>
}



function getFechas() {
    fechasDate = [];
    fechaString = [];
    var dias = document.getElementById('corte').value;
    plazos = dias / 35;
    var prueba = document.getElementById('date').value;
    var fecha = new Date(`${prueba}`);
    l = fecha.setDate(fecha.getDate() + 35);
    var fechasI = fecha;
    fechasDate.push(fechasI.getTime());
    fechaString.push(fechasI.toLocaleDateString());
    for (var i = 1; i < plazos; i++) {
    l = fecha.setDate(fecha.getDate() + 35);
    fechasI = fecha;
    fechasDate.push(fechasI.getTime());
    fechaString.push(fechasI.toLocaleDateString());
}

}

function arregloCapitalInvertido() {
    var capital = document.getElementById("monto").value;
    plazos = getCortes();
    capitales = [];
    capital = Number((capital*1).toFixed(3)); //Formateo de la cantidad ingresada en bolivares con puntos y decimales
    for (var i = 0; i <= plazos ;i++) {
    capitales.push(capital);
    }
}

function getCortes(){
    var dias = document.getElementById('corte').value;
    var plazos = dias / 35;
    return plazos;
}

function getPercentAndMontos(){
    var capital = document.getElementById('monto').value;
    var plazos = getCortes();
    gananciaArray = []
    percentArray = []
    var value;
    var percent;
    var repe;
    if (plazos == 1) {
        percent= 50;
        value = (capital * percent)/100;
        repe =Number((value*1).toFixed(3))
        gananciaArray.push(repe);
        percentArray.push( percent + '%');
    } else if ( plazos == 2) {
        percent = 50;
        for (let i = 0; i < plazos; i++) {
            value = (capital * percent)/100;
            repe =Number((value*1).toFixed(3))
            gananciaArray.push(repe);
            percentArray.push( percent + '%');  
        }
    } else {
        percent = (capital <=10000.00) ? 50 :(
            (capital>= 10000.00 && capital<= 99999.99) ? 50 :(
                (capital>= 100000.00 && capital<= 199999.99) ? 55 : (
                    (capital>= 200000.00 && capital<= 499999.99 ? 60 : (
                        (capital>= 500000.00 && capital<= 999999.99) ? 65 : (
                            (capital>= 1000000.00 && capital<= 1999999.99) ? 70 : (
                                (capital >= 2000000.00 && capital <= 4999999.99) ? 75 : (
                                    (capital >= 5000000.00 && capital <= 9999999.99) ? 80 : (
                                        (capital >= 10000000.00 && capital <= 49999999.99) ? 85 : (
                                            (capital >= 50000000.00 && capital <= 99999999.99) ? 90 : (
                                                (capital >= 100000000.00 && capital <= 199999999.99 ) ? 95 : (
                                                    (capital >= 200000000.00 && capital <= 499999999.99) ? 100 : 120))))))))))))    
       // FALTA FORMULA PARA CALCULAR LOS PORCENTAJES A PARTIR DE LAS INVERSIONES, HAY QUE CALCULARLA CON LAS TABLAS DE REFERENCIA
        for (let  i = 0; i < plazos; i++) {
        value = (capital * percent)/100;
        repe =Number((value*1).toFixed(3))
        gananciaArray.push(repe);
        percentArray.push( percent + '%'); 
        percent+= 2;
        }
    }
}

function getGananciaLiberada(){
    var today = new Date();
    var pru = today.getTime();
    ganaLiberadaArray = [];
    ganaLiberadaArray = gananciaArray.slice();
    for (var i = 0; i < gananciaArray.length; i++){
        if( pru <= fechasDate[i]){
            ganaLiberadaArray[i] = "No liberado";
        }
    }
    console.log(fechasDate);
}

function getCapitalLiberado(){
    capitalLiberadoArray = [];
    var capital = document.getElementById('monto').value;
    for( var i = 0; i < capitales.length; i++){
        capitalLiberadoArray.push(0.00);
        if( i == capitales.length - 2){
            capitalLiberadoArray[i] = capital + 1;
        }
    }
}

function getMontoTotal(){
    var capital = document.getElementById('monto').value;
    montoTotalArray = [];
    montoTotalArray = gananciaArray.slice();
    montoTotalArray[montoTotalArray.length-1] = montoTotalArray[montoTotalArray.length - 1] + parseFloat(capital);
}