
var fechasDate = [];
var fechaString = [];
var columnas = 5;
var totalRows= 4;
var variablesControl = {
    ultima: 1,
    segunda: 2,
    primera: 3,
};
var first = true;

function generarTabla(){
    if(first == true){  
    getFechas();
    dibujarTablaResumen();
    dibujarTablas();
    rellenarCeldasFechas();
    rellenarTablas();
    first = false;
    }else{
        fechaString = [];
        fechasDate = [];
        getFechas();
        rellenarCeldasFechas();
    }
}

    function recalculo(){
        if( fechaString != []){
            rellenarTablas();
            reiniciarInput();
        }
    }

    function reiniciarInput(){
        for(let i = 1; i <= 11; i++){
            let prueba = document.getElementById(i);
            prueba.value = '';
        }
        
    }

function retiroResumen(id){
    if( document.getElementById(id).value != 0){
        let resumen = document.getElementById('tablaResumen');
        let val = document.getElementById(id);
        let celda1 = formatNodeToFloat(val.value);
        val.value = celda1.toLocaleString();
        let celda2 = formatNodeToFloat(resumen.rows[id -1].cells[6].textContent);
        let montoInvertido = celda2 - celda1;
        resumen.rows[id - 1].cells[6].textContent = montoInvertido.toLocaleString();
        celda2 = formatNodeToFloat(resumen.rows[id - 1].cells[1].textContent);
        let capitalInvertido = celda2 - celda1;
        resumen.rows[id - 1].cells[1].textContent = capitalInvertido.toLocaleString();
        rellenarTablas(id,montoInvertido,true);
    }
}

function dibujarTablas(){
    let titleTables = ['Fecha', 'Capital Inv.', '%', 'Monto ganar', 'Monto Ganado'];
    let divParent = document.getElementById("div-tables");
    let idAtributoTabla= 1;
    var div = divParent;
    for( let tbl = 0; tbl < 11; tbl++){
        let table = document.createElement("table");
        //table.setAttribute("class","table table-bordered table-dark mt-5");
        table.setAttribute("id",`table${idAtributoTabla}`);
        for (let indexRow = 0; indexRow <= totalRows ; indexRow++) {
            if( indexRow== 0){
                let head = document.createElement("thead");
                for( let rHead = 0; rHead < 5; rHead++){
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
        idAtributoTabla++;
    }
}

function getFechas() {
    let plazos = 14;
    let fecha = new Date(`${document.getElementById('fecha').value}`);
    fecha.setDate(fecha.getDate() + 1);
    fechasDate.push(fecha.getTime());
    fechaString.push(fecha.toLocaleDateString());
    fecha.setDate(fecha.getDate() + 35);
    fechasDate.push(fecha.getTime());
    fechaString.push(fecha.toLocaleDateString());
    for (var i = 1; i < plazos; i++) {
    fecha.setDate(fecha.getDate() + 35);
    fechasDate.push(fecha.getTime());
    fechaString.push(fecha.toLocaleDateString());
    }
    console.log(fechaString);
}

function dibujarTablaResumen() {
    var indexInput = 0;
    let divTablaResumen = document.getElementById("div-resume");
    let titulosTResumen = ['Fecha','Capital Inv.','Ganancia T. H. la fecha','Capital T. H. la fecha','Monto T. liberado','Monto Ret.','Plazo','Monto Inv.'];
    let tablaResumen = document.createElement('table');
    //tablaResumen.setAttribute('class','table table-bordered table-dark mt-5');
    tablaResumen.setAttribute('id','tablaResumen');
    for( let indexRow = 0; indexRow < 12; indexRow++){
        
        if(indexRow == 0) {
            var head  = tablaResumen.createTHead();
            for( let rHead = 0; rHead <= 7; rHead++){
                let th = document.createElement('th');
                th.textContent = titulosTResumen[rHead];
                head.appendChild(th);
            }
            tablaResumen.appendChild(head);
            divTablaResumen.appendChild(tablaResumen);
        }else{
            let row = document.createElement("tr");
            for(let celda = 0; celda <= 7; celda++ ){
                if(celda != 5){
                let cell = document.createElement("td");
                cell.textContent = '0,00';
                row.appendChild(cell);
                }else{
                    let input = document.createElement("input");
                    input.setAttribute("id",`${indexInput}`);
                    input.setAttribute('placeholder',"0,00");
                    input.setAttribute('style','width: 120px;');
                    input.setAttribute('onblur',`retiroResumen(${indexInput})`);
                    row.appendChild(input);
                    
                }
            }
                tablaResumen.appendChild(row);
        }
        indexInput++;
    }
}


function rellenarCeldasFechas(){
    let resumen = document.getElementById("tablaResumen");
    for( let i = 0; i <= 10; i++){
        let celda = resumen.rows[i].cells[0];
        celda.textContent = fechaString[i];
    }
    let divTablas = document.getElementById('div-tables');
    rellenarFechasTablas(divTablas);
}
function rellenarFechasTablas(divTablas){
    let table = divTablas.firstElementChild;
    let indexFecha = 0;
    for( let i = 0; i < divTablas.childElementCount; i++){
        for( let row = 0; row < 4; row++){
            let celdaF = table.rows[row].cells[0];
            celdaF.textContent = fechaString[indexFecha];
            indexFecha++;
        }
        table = table.nextSibling;
        indexFecha = indexFecha - 3;
    }
}

function rellenarTablas(index = 0, capitalModificado = 0, restar = false){
    let indexTabla;
    index == 0 ?  indexTabla = 0 : indexTabla = index -1;
    variablesControl.ultima = 1;
    variablesControl.segunda = 2;
    variablesControl.primera = 3;
    let control= restar;
    var ultimaGanancia = 0;
    var montoTotal = 0;
    let celda1 = 0;
    var porcentaje = 0;
    let celda2 = 0;
    let celda3 = 0;
    let gananciaDinamica = 0;
    var capitalDinamico = 0;
    let tablas = document.getElementById('div-tables');
    tablas = tablas.firstElementChild;
    let inputcapital = parseFloat(document.getElementById('inversion').value);

    for(indexTabla; indexTabla < 11; indexTabla++){

        if( indexTabla == 0 ){ // EQUIVALE A LA TABLA 1
            porcentaje = getPorcentaje(inputcapital);
            tablas.rows[0].cells[1].textContent = inputcapital.toLocaleString(); //INSERTA LA CAPITAL EN LA FILA 0
            tablas.rows[0].cells[2].textContent = porcentaje + '%';  //INSERTA EL PORCENTAJE EN LA FILA 0
            for(let indexRow = 1; indexRow < 4; indexRow++){
                tablas.rows[indexRow].cells[1].textContent = inputcapital.toLocaleString();//INSERTA LA CAPITAL 
            gananciaDinamica = getGanancia(inputcapital,porcentaje);// CALCULA LA GANANCIA CON EL CAPITAL Y EL POCENTAJE QUE AUMENTA DE 2% CADA CICLO
            indexRow ==3 ? ultimaGanancia = gananciaDinamica : false; //Atajar el ultimo valor que se calcula para sumar al final del ciclo
            tablas.rows[indexRow].cells[2].textContent = porcentaje + '%';
            tablas.rows[indexRow].cells[3].textContent = gananciaDinamica.toLocaleString();//INSSERTA LA GANANCIA EN LAS FILAS
            tablas.rows[indexRow].cells[4].textContent = gananciaDinamica.toLocaleString();// INSERTA LA GANANCIA EN LA COLUMNA MONTO TOTAL
            porcentaje = porcentaje + 2;
            }
            montoTotal = inputcapital + ultimaGanancia;
            tablas.rows[3].cells[4].textContent = montoTotal.toLocaleString();
            porcentaje = getElementContent(1,1,3);
        }
        if( indexTabla == 1){
            tablas = reiniciarTabla(indexTabla + 1);
            celda1 = getElementContent(1,1,3);
            capitalDinamico = formatNodeToFloat(celda1);
            if(control === true){
                capitalDinamico = capitalModificado;
                variablesControl = reiniciarVariables(variablesControl);
                control = !control;
            }
            porcentaje = getPorcentaje(capitalDinamico);
            tablas.rows[0].cells[1].textContent = capitalDinamico.toLocaleString();//INSERTA LA CAPITAL EN LA FILA 0
            tablas.rows[0].cells[2].textContent = porcentaje + '%';//INSERTA EL PORCENTAJE EN LA FILA 0
            for(let indexRow = 1; indexRow < 4; indexRow++){
                tablas.rows[indexRow].cells[1].textContent = capitalDinamico.toLocaleString();
                gananciaDinamica = getGanancia(capitalDinamico,porcentaje);
                tablas.rows[indexRow].cells[2].textContent = porcentaje + '%'; // CALCULA LA GANANCIA CON EL CAPITAL Y EL POCENTAJE QUE AUMENTA DE 2% CADA CICLO
                tablas.rows[indexRow].cells[3].textContent = gananciaDinamica.toLocaleString();//INSSERTA LA GANANCIA EN LAS FILAS
                tablas.rows[indexRow].cells[4].textContent = gananciaDinamica.toLocaleString();//inserta la ganancia en la columna monto total
                porcentaje = porcentaje + 2;
                indexRow == 3 ? ultimaGanancia = gananciaDinamica : false; //Atajar el ultimo valor
            }
            montoTotal = capitalDinamico + ultimaGanancia;
            tablas.rows[3].cells[4].textContent = montoTotal.toLocaleString(); // Rellena el Ultimo monto en Monto montoTotal
        }
        if(indexTabla == 2){
            tablas = reiniciarTabla(indexTabla + 1);
            celda1 = getElementContent(1,2,3);
            celda2 = getElementContent(2,1,3);
            capitalDinamico = formatNodeToFloat(celda1) + formatNodeToFloat(celda2);
            if(control === true){
                capitalDinamico = capitalModificado;
                control = !control;
                variablesControl = reiniciarVariables(variablesControl);
            }
            porcentaje = getPorcentaje(capitalDinamico);
            tablas.rows[0].cells[1].textContent = capitalDinamico.toLocaleString();//INSERTA LA CAPITAL EN LA FILA 0
            tablas.rows[0].cells[2].textContent = porcentaje + '%';//INSERTA EL PORCENTAJE EN LA FILA 0
            for(let indexRow = 1; indexRow < 4; indexRow++){
                tablas.rows[indexRow].cells[1].textContent = capitalDinamico.toLocaleString();
                gananciaDinamica = getGanancia(capitalDinamico,porcentaje);// CALCULA LA GANANCIA CON EL CAPITAL Y EL POCENTAJE QUE AUMENTA DE 2% CADA CICLO
                tablas.rows[indexRow].cells[2].textContent = porcentaje + '%';
                tablas.rows[indexRow].cells[3].textContent = gananciaDinamica.toLocaleString();//INSSERTA LA GANANCIA EN LAS FILAS
                indexRow == 3 ? ultimaGanancia = gananciaDinamica : false;//Atajar el ultimo valor
                tablas.rows[indexRow].cells[4].textContent = gananciaDinamica.toLocaleString();//INSSERTA LA GANANCIA EN LA COLUMNA MONTO TOTAL
                porcentaje += 2;
            }
            montoTotal = capitalDinamico + ultimaGanancia;
            tablas.rows[3].cells[4].textContent = montoTotal.toLocaleString();// Rellena el Ultimo monto en Monto montoTotal
        }
        if(indexTabla >2) {
            tablas = reiniciarTabla(indexTabla + 1);
            celda1 = getElementContent(variablesControl.ultima,3,4);
            celda2 = getElementContent(variablesControl.segunda,2,3);
            celda3 = getElementContent(variablesControl.primera,1,3);
            capitalDinamico = formatNodeToFloat(celda1) + formatNodeToFloat(celda2)+ formatNodeToFloat(celda3);
            if(control === true){
                capitalDinamico = capitalModificado;
                variablesControl = reiniciarVariables(variablesControl,indexTabla);
                control = !control;
            }
            porcentaje = getPorcentaje(capitalDinamico);
            tablas.rows[0].cells[1].textContent = capitalDinamico.toLocaleString();//INSERTA LA CAPITAL EN LA FILA 0
            tablas.rows[0].cells[2].textContent = porcentaje + '%';//INSERTA EL PORCENTAJE EN LA FILA 0
            for(let indexRow = 1; indexRow < 4; indexRow++){
                tablas.rows[indexRow].cells[1].textContent = capitalDinamico.toLocaleString();
                gananciaDinamica = getGanancia(capitalDinamico,porcentaje);// CALCULA LA GANANCIA CON EL CAPITAL Y EL POCENTAJE QUE AUMENTA DE 2% CADA CICLO
                tablas.rows[indexRow].cells[2].textContent = porcentaje + '%';
                tablas.rows[indexRow].cells[3].textContent = gananciaDinamica.toLocaleString();//INSSERTA LA GANANCIA EN LAS FILAS
                porcentaje = porcentaje + 2;
                indexRow == 3 ? ultimaGanancia = gananciaDinamica : false;
                tablas.rows[indexRow].cells[4].textContent = gananciaDinamica.toLocaleString();//INSSERTA LA GANANCIA EN LA COLUMNA MONTO TOTAL
            }
            montoTotal = capitalDinamico + ultimaGanancia;
            tablas.rows[3].cells[4].textContent = montoTotal.toLocaleString();
            variablesControl.ultima++;
            variablesControl.segunda++;
            variablesControl.primera++;
        }
    }
    fillResumen(index,true);
}

function fillResumen(index = 1, restar = false){ //RESOLVER PROBLEMA PARA CALCULAR CAPITAL INVERTIDO, CALCULAR MONTO INVERTIDO, REFACTORIZAR FUNCIONES.
    let resumen = document.getElementById('tablaResumen');
    let indexRow = index;
    let control = restar;
    variablesControl.ultima = 1;
    variablesControl.segunda = 2;
    variablesControl.primera = 3; /// ESTAS VARIABLES CONTROLAN EL FLUJO DE MOVIMIENTO ENTRE LAS 3 TABLAS EN LOS CICLOS.
    let indexTablaCapital = 1;
    let celda1 = 0;
    let celda2 = 0;
    let celda3 = 0;
    let gananciaDinamica = 0;
    let capitalDinamico = 0;
    let montoTotal;
    resumen.rows[0].cells[1].textContent = getElementContent(1,0,1);
    for(indexRow; indexRow < 11; indexRow++){
        if(indexRow == 1){
            celda1 = getElementContent(1,0,1);
            celda2 = getElementContent(2,0,1);
            capitalDinamico = formatNodeToFloat(celda1) + formatNodeToFloat(celda2);
            resumen.rows[1].cells[1].textContent = capitalDinamico.toLocaleString();// RELLENA CAPITAL EN LA TABLA RESUMEN
            celda1 = getElementContent(1,1,3);
            celda2 = getElementContent(2,0,3);
            gananciaDinamica = formatNodeToFloat(celda1) + formatNodeToFloat (celda2);
            resumen.rows[indexRow].cells[2].textContent = gananciaDinamica.toLocaleString(); // RELLENA GANANCIA HASTA LA FECHA
            celda1 = getElementContent(2,0,1);
            celda2 = resumen.rows[indexRow].cells[3].textContent;
            montoTotal = formatNodeToFloat(celda1) + formatNodeToFloat(celda2);
            resumen.rows[indexRow].cells[4].textContent = montoTotal.toLocaleString();
            resumen.rows[indexRow].cells[6].textContent = montoTotal.toLocaleString(); // RELLENA MONTO TOTAL LIBERADO
            
            
        } if(indexRow >1) {
            if(control === true){
                variablesControl = reiniciarVariables(variablesControl,indexRow);
                control = false;
            }
            celda1 = getElementContent(variablesControl.ultima,0,1);
            celda2 = getElementContent(variablesControl.segunda,0,1);
            celda3 = getElementContent(variablesControl.primera,0,1);
            capitalDinamico = formatNodeToFloat(celda1) + formatNodeToFloat(celda2) + formatNodeToFloat(celda3);
            resumen.rows[indexRow].cells[1].textContent = capitalDinamico.toLocaleString();// RELLENA CAPITAL EN TABLA RESUMEN
            if(indexRow >= 3){
                resumen.rows[indexRow].cells[3].textContent = getElementContent(indexTablaCapital,0,1);//RELLENA CAPITAL LIBERADO HASTA LA FECHA
                indexTablaCapital++;
            }
            celda1 = getElementContent(variablesControl.ultima,3,3);
            celda2 = getElementContent(variablesControl.segunda,2,3);
            celda3 = getElementContent(variablesControl.primera,1,3);
            
            gananciaDinamica = formatNodeToFloat(celda1) + formatNodeToFloat(celda2) + formatNodeToFloat(celda3);
            resumen.rows[indexRow].cells[2].textContent = gananciaDinamica.toLocaleString(); // RELLENA GANANCIA HASTA LA FECHA
            celda1 = resumen.rows[indexRow].cells[2].textContent;
            celda2 = resumen.rows[indexRow].cells[3].textContent;
            montoTotal = formatNodeToFloat(celda1) + formatNodeToFloat(celda2);
            resumen.rows[indexRow].cells[4].textContent = montoTotal.toLocaleString(); // RELLENA MONTO TOTAL LIBERADO
            resumen.rows[indexRow].cells[6].textContent = montoTotal.toLocaleString(); // RELLENA MONTO INVERTIDO
            variablesControl.ultima++;
            variablesControl.segunda++;
            variablesControl.primera++;
            
        }
        resumen.rows[indexRow].cells[5].textContent = '105'; //ESTO RELLENA EL ESPACIO DE PLAZO
    }
}


    function getPorcentaje(num) {
        let porcentaje = (num <=10000.00) ? 50 :(
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
        return porcentaje;
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

    function reiniciarTabla(id){
        let tabla = document.getElementById('div-tables').firstElementChild;
        for (let i = 0; i <= document.getElementById('div-tables').childElementCount; i++){
            if( tabla.id == `table${id}`){
                return tabla;
            }else{
                tabla = tabla.nextSibling;
            }
        }
    }

    function reiniciarVariables(varControl,indexTabla = 3){
        if(indexTabla <3){
            varControl.ultima = 1;
            varControl.segunda = 2;
            varControl.primera = 3;
            return varControl;
        }
        varControl.ultima = indexTabla - 2;
        varControl.segunda = indexTabla -1;
        varControl.primera = indexTabla;
        return varControl;
    }
