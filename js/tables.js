
var fechasDate = [];
var fechaString = [];
var columnas = 7;
var totalRows= 4;
var variablesControl = {
    ultima: 1,
    segunda: 2,
    primera: 3,
};

function testex(){  
    getDates();
    drawResume();
    drawTables();
    fillDate();
    fillTables();
    
}

function drawTables(){
    let titleTables = ['Fecha', 'Capital Invertido', '%', 'Monto a ganar', 'Ganancia', 'Capital', 'Monto total'];
    let divParent = document.getElementById("div-tables");
    let idCount= 1;
    var div = divParent;
    for( var tbl = 0; tbl < 11; tbl++){
        let table = document.createElement("table");
        table.setAttribute("class","table table-bordered table-dark mt-5");
        table.setAttribute("id",`table${idCount}`);
        for (let r = 0; r < totalRows+1 ; r++) {
            if( r== 0){
                let head = document.createElement("thead");
                for( let rHead = 0; rHead < 7; rHead++){
                    let th = document.createElement('th');
                    let thText= document.createTextNode(titleTables[rHead]);
                    th.appendChild(thText);
                    head.appendChild(th);
                }
                table.appendChild(head);
            }else{
                let row = document.createElement("tr");
                for(let c = 0; c < columnas; c++ ){
                    let cell = document.createElement("td");
                    cell.textContent = '0,00';
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
                cell.textContent = '0,00';
                row.appendChild(cell);
                }
                tResume.appendChild(row);
        }

    }

}


function fillDate(){
    let resumen = document.getElementById("tableResume");
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

function fillTables(){
    var last;
    var total;
    var celda1;
    var percent;
    var celda2;
    var celda3;
    var gananciaDinamica;
    var capitalDinamico;
    let tResume = document.getElementById('tableResume');
    let tables = document.getElementById('div-tables');
    let inputcapital = parseFloat(document.getElementById('inversion').value);

    for(let tablita = 0; tablita < 11; tablita++){

        if( tablita == 0 ){
            tables = tables.firstElementChild;
            percent = getPercent(inputcapital);
            for(let r = 0; r < 4; r++){
            tables.rows[r].cells[1].textContent = inputcapital.toLocaleString();
            gananciaDinamica = getGanancia(inputcapital,percent);
            r ==3 ? last = gananciaDinamica : false;
            tables.rows[r].cells[2].textContent = percent + '%';
            tables.rows[r].cells[3].textContent = gananciaDinamica.toLocaleString();
            percent = percent + 2;
            tables.rows[r].cells[6].textContent = gananciaDinamica.toLocaleString();
            }
            total = inputcapital +last;
            tables.rows[3].cells[6].textContent = total.toLocaleString();
            percent = getElementContent(1,1,3);
            console.log(percent);
        }
        if( tablita == 1){
            tables = tables.nextSibling;
            celda1 = getElementContent(1,1,3);
            capitalDinamico = formatNodeToFloat(celda1);
            percent = getPercent(capitalDinamico);
            for(let r = 0; r < 4; r++){
                tables.rows[r].cells[1].textContent = capitalDinamico.toLocaleString();
                gananciaDinamica = getGanancia(capitalDinamico,percent);
                tables.rows[r].cells[2].textContent = percent + '%';
                tables.rows[r].cells[3].textContent = gananciaDinamica.toLocaleString();
                tables.rows[r].cells[6].textContent = gananciaDinamica.toLocaleString();
                percent = percent + 2;
                r == 3 ? last = gananciaDinamica : false;
            }
            total = capitalDinamico + last;
            tables.rows[3].cells[6].textContent = total.toLocaleString();
        }
        if(tablita == 2){
            tables = tables.nextSibling;
            celda1 = getElementContent(1,2,3);
            celda2 = getElementContent(2,1,3);
            console.log(celda1,celda2);
            capitalDinamico = formatNodeToFloat(celda1) + formatNodeToFloat(celda2);
            console.log(capitalDinamico);
            percent = getPercent(capitalDinamico);
            for(let r = 0; r<4; r++){
                tables.rows[r].cells[1].textContent = capitalDinamico.toLocaleString();
                gananciaDinamica = getGanancia(capitalDinamico,percent);
                tables.rows[r].cells[2].textContent = percent + '%';
                tables.rows[r].cells[3].textContent = gananciaDinamica.toLocaleString();
                percent = percent + 2;
                r == 3 ? last = gananciaDinamica : false;
                tables.rows[r].cells[6].textContent = gananciaDinamica.toLocaleString();
            }
            total = capitalDinamico + last;
            tables.rows[3].cells[6].textContent = total.toLocaleString();
        }
        if(tablita > 2){
            tables = tables.nextSibling;
            celda1 = getElementContent(variablesControl.ultima,3,6);
            celda2 = getElementContent(variablesControl.segunda,2,3);
            celda3 = getElementContent(variablesControl.primera,1,3);
            console.log(celda1,celda2,celda3);
            capitalDinamico = formatNodeToFloat(celda1) + formatNodeToFloat(celda2)+ formatNodeToFloat(celda3);
            console.log(capitalDinamico);
            percent = getPercent(capitalDinamico);
            for(let r = 0; r<4; r++){
                tables.rows[r].cells[1].textContent = capitalDinamico.toLocaleString();
                gananciaDinamica = getGanancia(capitalDinamico,percent);
                tables.rows[r].cells[2].textContent = percent + '%';
                tables.rows[r].cells[3].textContent = gananciaDinamica.toLocaleString();
                percent = percent + 2;
                r == 3 ? last = gananciaDinamica : false;
                tables.rows[r].cells[6].textContent = gananciaDinamica.toLocaleString();
            }
            total = capitalDinamico + last;
            tables.rows[3].cells[6].textContent = total.toLocaleString();
            variablesControl.ultima++;
            variablesControl.segunda++;
            variablesControl.primera++;
        }
    }
    fillResumen(tResume);
}

function fillResumen(resumen){ //RESOLVER PROBLEMA PARA CALCULAR GANANCIA TOTAL A LA FECHA, CALCULAR MONTO INVERTIDO, REFACTORIZAR FUNCIONES.
    variablesControl.ultima = 1;
    variablesControl.segunda = 2;
    variablesControl.primera = 3;
    let indexTablaCapital = 1;
    let celda1;
    let celda2;
    let celda3;
    let gananciaDinamica;
    let montoTotal;
    for(let r = 1; r<11; r++){
        if(r == 0){
            resumen.rows[r].cells[2].textContent = getElementContent(1,1,3);
            resumen.rows[r].cells[4].textContent = getElementContent(1,1,3);
        }
        if(r == 1){
            celda1 = getElementContent(1,1,3);
            celda2 = getElementContent(2,0,3);
            gananciaDinamica = formatNodeToFloat(celda1) + formatNodeToFloat (celda2);
            resumen.rows[r].cells[2].textContent = gananciaDinamica.toLocaleString();
            celda1 = resumen.rows[r].cells[2].textContent;
            celda2 = resumen.rows[r].cells[3].textContent;
            montoTotal = formatNodeToFloat(celda1) + formatNodeToFloat(celda2);
            resumen.rows[r].cells[4].textContent = montoTotal.toLocaleString();
            
            
        }else{
            celda1 = getElementContent(variablesControl.ultima,3,3);
            celda2 = getElementContent(variablesControl.segunda,2,3);
            celda3 = getElementContent(variablesControl.primera,1,3);
            if(r >= 3){
                resumen.rows[r].cells[3].textContent = getElementContent(indexTablaCapital,0,1);
                indexTablaCapital++;
            }
            gananciaDinamica = formatNodeToFloat(celda1) + formatNodeToFloat(celda2) + formatNodeToFloat(celda3);
            resumen.rows[r].cells[2].textContent = gananciaDinamica.toLocaleString();
            celda1 = resumen.rows[r].cells[2].textContent;
            celda2 = resumen.rows[r].cells[3].textContent;
            montoTotal = formatNodeToFloat(celda1) + formatNodeToFloat(celda2);
            resumen.rows[r].cells[4].textContent = montoTotal.toLocaleString();
            variablesControl.ultima++;
            variablesControl.segunda++;
            variablesControl.primera++;
            
        }
        resumen.rows[r].cells[6].textContent = '105';
    }
};




    // TOMAR VALORES DEL DOM let r = tResume.rows[0].cells[1].textContent;
    // FORMATEAR DEL DOM A NUMEROS FLOTANTES PARA CALCULOSlet rr = formatNodeToFloat(r);









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

    function formatNodeToFloat(num){
        return parseFloat(num.replace(/\./g,'').replace(/,/,'.'));
    }

    function getGanancia(num1,num2){
        return (num1 * num2)/100;
    }

    function getElementContent(id,row,cell){
        return document.getElementById(`table${id}`).rows[row].cells[cell].textContent;
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
