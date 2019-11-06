
var fechasDate = [];
var fechaString = [];
var columnas = 7;
var totalRows= 4;

function testex(){
    getDates();
    drawResume();
    drawTables();
    fillDate();
    fillCapital();
}

function drawTables(){
    let titleTables = ['Fecha', 'Capital Invertido', '%', 'Monto a ganar', 'Ganancia', 'Capital', 'Monto total'];
    let divParent = document.getElementById("div-tables");
    let idCount= 1;
    var div = divParent;
    for( var tbl = 0; tbl < 11; tbl++){
        var table = document.createElement("table");
        table.setAttribute("class","table table-bordered table-dark mt-5");
        table.setAttribute("id",`table${idCount}`);
        for (var r = 0; r < totalRows+1 ; r++) {
            if( r== 0){
                var head = document.createElement("thead");
                for( let rHead = 0; rHead < 7; rHead++){
                    var th = document.createElement('th');
                    var thText= document.createTextNode(titleTables[rHead]);
                    th.appendChild(thText);
                    head.appendChild(th);
                }
                table.appendChild(head);
            }else{
                var row = document.createElement("tr");
                for(var c = 0; c < columnas; c++ ){
                    var cell = document.createElement("td");
                    cell.textContent = 'HOLA';
                    row.appendChild(cell);
                    }
                    table.appendChild(row);
            }
        }
        div.appendChild(table);
        idCount++;
    }
}


function getDates() {
    let plazos = 14;
    let prueba = document.getElementById('fecha').value;
    let fecha = new Date(`${prueba}`);
    fecha.setDate(fecha.getDate() + 35);
    fechasDate.push(fecha.getTime());
    fechaString.push(fecha.toLocaleDateString());
    for (var i = 1; i < plazos; i++) {
    fecha.setDate(fecha.getDate() + 35);
    fechasDate.push(fecha.getTime());
    fechaString.push(fecha.toLocaleDateString());
    }
}


function drawResume() {
    let divResume = document.getElementById("div-resume");
    let titleResume = ['Fecha','Capital Inv.','Ganancia T. H. la fecha','Capital T. H. la fecha','Monto T. liberado','Monto Ret.','Plazo','Monto Inv.'];
    let tResume = document.createElement('table');
    tResume.setAttribute('class','table table-bordered table-dark mt-5');
    tResume.setAttribute('id','tableResume');
    for( let r = 0; r < 12; r++){
        if(r == 0) {
            var head  = tResume.createTHead();
            for( let rHead = 0; rHead <= 7; rHead++){
                let th = document.createElement('th');
                th.textContent = titleResume[rHead];
                head.appendChild(th);
            }
            tResume.appendChild(head);
            divResume.appendChild(tResume);
        }else{
            let row = document.createElement("tr");
            for(let c = 0; c < columnas + 1; c++ ){
                let cell = document.createElement("td");
                cell.textContent = 'HOLA';
                row.appendChild(cell);
                }
                tResume.appendChild(row);
        }

    }
    
}


function fillDate(){
    let resumen = document.getElementById("tableResume");// Aqui ignora totalmente la existencia de un Thead asi que la primera row es directamente correcta.
    for( let i = 0; i <= 10; i++){
        let celda = resumen.rows[i].cells[0];
        celda.textContent = fechaString[i];
    }
    let divParent = document.getElementById('div-tables');
    fill(divParent);
}
function fill(divParent){
    let table = divParent.firstElementChild;
    let countF = 0;
    for( let i = 0; i < divParent.childElementCount; i++){
        for( let r = 0; r < 4; r++){
            let celdaF = table.rows[r].cells[0];
            celdaF.textContent = fechaString[countF];
            countF++;
        }
        table = table.nextSibling;
        countF = countF - 3;
    }
}

function fillCapital(){//RESOLVER PROBLEMA CON LA TOMA DE LOS DATOS de numeros
    let tResume = document.getElementById('tableResume');
    let tables = document.getElementById('div-tables');
    let inputcapital = parseFloat(document.getElementById('inversion').value);
    tResume.rows[0].cells[1].textContent = inputcapital.toLocaleString();
    tables.firstElementChild.rows[0].cells[1].textContent = inputcapital.toLocaleString();
    let percent = getPercent(inputcapital);
    let r = tResume.rows[0].cells[1].textContent + 250000;
    console.log(r);
    }

    function getPercent(num) {
        let percent = (num <=10000.00) ? 50 :(
            (num>= 10000.00 && num<= 99999.99) ? 50 :(
                (num>= 100000.00 && num<= 199999.99) ? 55 : (
                    (num>= 200000.00 && num<= 499999.99 ? 60 : (
                        (num>= 500000.00 && num<= 999999.99) ? 65 : (
                            (num>= 1000000.00 && num<= 1999999.99) ? 70 : (
                                (num >= 2000000.00 && num <= 4999999.99) ? 75 : (
                                    (num >= 5000000.00 && num <= 9999999.99) ? 80 : (
                                        (num >= 10000000.00 && num <= 49999999.99) ? 85 : (
                                            (num >= 50000000.00 && num <= 99999999.99) ? 90 : (
                                                (num >= 100000000.00 && num <= 199999999.99 ) ? 95 : (
                                                    (num >= 200000000.00 && num <= 499999999.99) ? 100 : 120))))))))))))
        return percent;
    }

//ELEMENTOS CON NODOS
/*function readTables(DIVPARENT){
    var tableN = divParent.firstElementChild;
    if(DIVPARENT.hasChildNodes()){
        console.log(`Hola, este div tiene ${DIVPARENT.childElementCount}`);
        for( let i = 0; i < divParent.childElementCount; i++){
            console.log(tableN);
            if( i == 5 ){
            console.log(tableN.rows)
            }
            tableN = tableN.nextSibling;
        }
    }
}*/

//<script  src="./js/popper.min.js"></script>