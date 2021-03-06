// Crear introduccion dinamica de las tablas a partir del cambio en el select de plazo, despues verificar de nuevo todos los calculos ya que estan erroneos.
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


function generarTabla(){ //Funcion principal que se llama desde el HTML
    if(first == true){ //Verifica si es primera vez que se ejecuta
    getFechas();//Calcula la fecha  apartir de la fecha introducida
    dibujarTablaResumen();//Dibuja el esquema de la tabla resumen
    dibujarTablas();//Dibuja el esquema de las tablas pequeñas
    //rellenarCeldasFechas();//Rellena las celdas de las fechas en todas las tablas
    //rellenarTablas();// Rellena las celdas de calculos de todas las tablas
    //first = false;
    }else{
        fechaString = [];
        fechasDate = [];
        getFechas();//Recalcula las fechas
        rellenarCeldasFechas();//Rellena las celdas de las fechas actualizadas
    }
}

    function recalculo(){//Funcion que se llama desde el input principal para calcular montos
            rellenarTablas();//Rellena las celdas de las tablas con el monto actualizado
            reiniciarInput();//Reinicia los input de la tabla resumen
    }

    function reiniciarInput(){
        for(let i = 1; i <= 11; i++){
            let prueba = document.getElementById(i);
            prueba.value = '';
        }

    }

function retiroResumen(id){//Funcion que toma valor del input de retiro de resumen y recalcula  las tablas a partir del monto retirado.
    if( document.getElementById(id).value != 0){
        let resumen = document.getElementById('tablaResumen');
        let val = document.getElementById(id);
        let celda1 = formatNodeToFloat(val.value);
        val.value = celda1.toLocaleString();
        let celda2 = formatNodeToFloat(resumen.rows[id -1].cells[7].textContent);
        let montoInvertido = celda2 - celda1;
        resumen.rows[id - 1].cells[7].textContent = montoInvertido.toLocaleString();
        celda2 = formatNodeToFloat(resumen.rows[id - 1].cells[1].textContent);
        let capitalInvertido = celda2 - celda1;
        resumen.rows[id - 1].cells[1].textContent = capitalInvertido.toLocaleString();
        rellenarTablas(id,montoInvertido,true);//Funcion con parametros para calcular las tablas con el monto deducido
    }
}

function dibujarTablas(tabla = 0, rows = totalRows){//Dibuja el esquema de las tabla pequeñas
    let titleTables = ['Fecha', 'Capital Inv.', '%', 'Monto ganar', 'Monto Ganado'];
    let divParent = document.getElementById("div-tables");
    let idAtributoTabla= tabla + 1;
    var div = divParent;
    console.log(tabla,rows);
    for(tabla; tabla < 11; tabla++){//Ciclo que cuenta las tablas
        let table = document.createElement("table");
        table.setAttribute("id",`table${idAtributoTabla}`);
        for (let indexRow = 0; indexRow <= rows ; indexRow++){//Ciclo que cuenta las filas
            if( indexRow== 0){//Si es la fila 0, Coloca los titulos
                let head = document.createElement("thead");
                for( let rHead = 0; rHead < 5; rHead++){
                    let th = document.createElement('th');
                    let thText= document.createTextNode(titleTables[rHead]);
                    th.appendChild(thText);
                    head.appendChild(th);
                }
                table.appendChild(head);
            }else{//Coloca formato de 4 columnas por cada fila
                let row = document.createElement("tr");
                for(let c = 0; c < columnas; c++ ){
                    let cell = document.createElement("td");
                    cell.textContent = '0,00';
                    row.appendChild(cell);
                    }
                    table.appendChild(row);
            }
        }
        div.appendChild(table);//Se agrega la tabla al div
        idAtributoTabla++;// Se contabiliza el id de las tablas
    }
}

function getFechas(){//Calcula las fechas adecuadas a partir de la fecha introducida
    let plazos = 22;
    let fecha = new Date(`${document.getElementById('fecha').value}`);
    fecha.setDate(fecha.getDate() + 1);
    fechasDate.push(fecha.getTime());//Introduce objetos de el arreglo de fechas
    fechaString.push(fecha.toLocaleDateString());//Introduce strings en el arreglo de fechas
    fecha.setDate(fecha.getDate() + 35);
    fechasDate.push(fecha.getTime());
    fechaString.push(fecha.toLocaleDateString());
    for (var i = 1; i < plazos; i++) {
    fecha.setDate(fecha.getDate() + 35);
    fechasDate.push(fecha.getTime());
    fechaString.push(fecha.toLocaleDateString());
    }
    console.log(fechaString);
    console.log(fechasDate);
}

function dibujarTablaResumen() {
    let indexInput = 0;//variable para colocar id a los inputs dentro de la tabla resumen
    let divTablaResumen = document.getElementById("div-resume");
    let titulosTResumen = ['Fecha','Capital Inv.','Ganancia T. H. la fecha','Capital T. H. la fecha','Monto T. liberado','Monto Ret.','Plazo','Monto Inv.'];
    let tablaResumen = document.createElement('table');
    tablaResumen.setAttribute('id','tablaResumen');
    for( let indexRow = 0; indexRow < 12; indexRow++){//Ciclo para contar las filas
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
            for(let celda = 0; celda < 7; celda++ ){//Ciclo que genera celdas en las filas
                if(celda == 5){
                    if (indexRow == 1){
                        let cell = document.createElement("td");
                        cell.textContent = '0,00';
                        row.appendChild(cell);
                    }else{
                        let cell = document.createElement("td");
                        let input = createInput(indexInput);
                        cell.appendChild(input);
                        row.appendChild(cell);
                    }
                }if(celda == 5){
                        let cell = document.createElement("td");
                        let select = createSelect(indexInput);
                        cell.appendChild(select);
                        row.appendChild(cell);
                }else{
                    let cell = document.createElement("td");
                    cell.textContent = '0,00';
                    row.appendChild(cell);
                }
                    //COLOCAR CLASES A LA COLUMNA PLAZO Y DESPUES RECORRERLAS CON EL DOM Y USAR EL .REPLACEWITH
            }
                tablaResumen.appendChild(row);
        }
        indexInput++;
    }
}

//let select = createSelect();

function rellenarCeldasFechas(){//Rellena las fechas de todas la tabla resumen
    let resumen = document.getElementById("tablaResumen");

    for( let i = 0; i <= 10; i++){
        let celda = resumen.rows[i].cells[0];
        celda.textContent = fechaString[i];
    }

    let divTablas = document.getElementById('div-tables');
    rellenarFechasTablas(divTablas);
}
function rellenarFechasTablas(divTablas){//Rellena las fechas de todas las tablas pequeñas
    let table = divTablas.firstElementChild;
    let indexFecha = 0;

    for( let i = 0; i < divTablas.childElementCount; i++){//Ciclo que recorre por fila las tablas y coloca las fechas
        for( let row = 0; row < totalRows; row++){
            let celdaF = table.rows[row].cells[0];
            celdaF.textContent = fechaString[indexFecha];
            indexFecha++;
        }
        table = table.nextSibling;
        indexFecha = indexFecha - 10;
    }

}

function rellenarTablas(index = 0, capitalModificado = 0, restar = false){// Rellena las celdas de los calculos de las tablas
    let indexTabla;
    index == 0 ?  indexTabla = 0 : indexTabla = index -1;
    variablesControl.ultima = 1;
    variablesControl.segunda = 2;
    variablesControl.primera = 3;
    let control= restar;
    let ultimaGanancia = 0;
    let montoTotal = 0;
    let celda1 = 0;
    let porcentaje = 0;
    let celda2 = 0;
    let celda3 = 0;
    let gananciaDinamica = 0;
    let capitalDinamico = 0;
    let tablas = document.getElementById('div-tables');
    tablas = tablas.firstElementChild;
    let inputcapital = parseFloat(document.getElementById('inversion').value);

    for(indexTabla; indexTabla < 11; indexTabla++){//ciclo que recorre las tablas

        if( indexTabla == 0 ){ // Equivale a la tabla 1
            porcentaje = getPorcentaje(inputcapital);
            tablas.rows[0].cells[1].textContent = inputcapital.toLocaleString(); //Inserta la capital en la fila 0
            tablas.rows[0].cells[2].textContent = porcentaje + '%';  //Inserta el porcentaje en la fila 0
            for(let indexRow = 1; indexRow < totalRows; indexRow++){
                tablas.rows[indexRow].cells[1].textContent = inputcapital.toLocaleString();//Inserta la capital
            gananciaDinamica = getGanancia(inputcapital,porcentaje);// Calcula la ganancia con el capital  y el porcentaje que aumenta 2% cada ciclo
            indexRow ==3 ? ultimaGanancia = gananciaDinamica : false; //Atajar el ultimo valor que se calcula para sumar al final del ciclo
            tablas.rows[indexRow].cells[2].textContent = porcentaje + '%';
            tablas.rows[indexRow].cells[3].textContent = gananciaDinamica.toLocaleString();//Inserta la ganancia en las filas
            tablas.rows[indexRow].cells[4].textContent = gananciaDinamica.toLocaleString();// Inserta la ganancia en la columna de monto Total
            porcentaje = porcentaje + 2;
            }
            montoTotal = inputcapital + ultimaGanancia; // Suma la capital con la ultima ganancia
            tablas.rows[3].cells[4].textContent = montoTotal.toLocaleString();// Inserta la suma total en la ultima columna de monto total
        }
        if( indexTabla == 1){//Equivale a la tabla 2
            tablas = reiniciarTabla(indexTabla + 1);//Reinicia la variable de control de las tablas
            celda1 = getElementContent(1,1,3);
            capitalDinamico = formatNodeToFloat(celda1);
            if(control === true){//Variable de parametro, reinicia las variables y le asigna la resta del input al capital para realizar de nuevo los calculos
                capitalDinamico = capitalModificado;
                variablesControl = reiniciarVariables(variablesControl);
                control = !control;
            }
            porcentaje = getPorcentaje(capitalDinamico);
            tablas.rows[0].cells[1].textContent = capitalDinamico.toLocaleString();
            tablas.rows[0].cells[2].textContent = porcentaje + '%';
            for(let indexRow = 1; indexRow < totalRows; indexRow++){
                tablas.rows[indexRow].cells[1].textContent = capitalDinamico.toLocaleString();
                gananciaDinamica = getGanancia(capitalDinamico,porcentaje);
                tablas.rows[indexRow].cells[2].textContent = porcentaje + '%';
                tablas.rows[indexRow].cells[3].textContent = gananciaDinamica.toLocaleString();
                tablas.rows[indexRow].cells[4].textContent = gananciaDinamica.toLocaleString();
                porcentaje = porcentaje + 2;
                indexRow == 3 ? ultimaGanancia = gananciaDinamica : false;
            }
            montoTotal = capitalDinamico + ultimaGanancia;
            tablas.rows[3].cells[4].textContent = montoTotal.toLocaleString();
        }
        if(indexTabla == 2){//Equivale a la tabla 3
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
            tablas.rows[0].cells[1].textContent = capitalDinamico.toLocaleString();
            tablas.rows[0].cells[2].textContent = porcentaje + '%';
            for(let indexRow = 1; indexRow < totalRows; indexRow++){
                tablas.rows[indexRow].cells[1].textContent = capitalDinamico.toLocaleString();
                gananciaDinamica = getGanancia(capitalDinamico,porcentaje);
                tablas.rows[indexRow].cells[2].textContent = porcentaje + '%';
                tablas.rows[indexRow].cells[3].textContent = gananciaDinamica.toLocaleString();
                indexRow == 3 ? ultimaGanancia = gananciaDinamica : false;
                tablas.rows[indexRow].cells[4].textContent = gananciaDinamica.toLocaleString();
                porcentaje += 2;
            }
            montoTotal = capitalDinamico + ultimaGanancia;
            tablas.rows[3].cells[4].textContent = montoTotal.toLocaleString();
        }
        if(indexTabla >2) {//Equivale a las tablas despues de la 3era
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
            tablas.rows[0].cells[1].textContent = capitalDinamico.toLocaleString();
            tablas.rows[0].cells[2].textContent = porcentaje + '%';
            for(let indexRow = 1; indexRow < totalRows; indexRow++){
                tablas.rows[indexRow].cells[1].textContent = capitalDinamico.toLocaleString();
                gananciaDinamica = getGanancia(capitalDinamico,porcentaje);
                tablas.rows[indexRow].cells[2].textContent = porcentaje + '%';
                tablas.rows[indexRow].cells[3].textContent = gananciaDinamica.toLocaleString();
                porcentaje = porcentaje + 2;
                indexRow == 3 ? ultimaGanancia = gananciaDinamica : false;
                tablas.rows[indexRow].cells[4].textContent = gananciaDinamica.toLocaleString();
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

function fillResumen(index = 1, restar = false){ //Rellena la tabla resumen
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
    for(indexRow; indexRow < 11; indexRow++){ //Ciclo para las filas de la tabla resumen
        if(indexRow == 1){//Equivale a la fila
            celda1 = getElementContent(1,0,1);
            celda2 = getElementContent(2,0,1);
            capitalDinamico = formatNodeToFloat(celda1) + formatNodeToFloat(celda2);
            resumen.rows[indexRow].cells[1].textContent = capitalDinamico.toLocaleString();// Rellena capital
            celda1 = getElementContent(1,1,3);
            celda2 = getElementContent(2,0,3);
            gananciaDinamica = formatNodeToFloat(celda1) + formatNodeToFloat (celda2);
            resumen.rows[indexRow].cells[2].textContent = gananciaDinamica.toLocaleString(); // Rellena ganancia hasta la fecha
            celda1 = getElementContent(2,0,1);
            celda2 = resumen.rows[indexRow].cells[3].textContent;
            montoTotal = formatNodeToFloat(celda1) + formatNodeToFloat(celda2);
            resumen.rows[indexRow].cells[4].textContent = montoTotal.toLocaleString();
            resumen.rows[indexRow].cells[7].textContent = montoTotal.toLocaleString(); // Rellena monto total


        } if(indexRow >1) {
            if(control === true){
                variablesControl = reiniciarVariables(variablesControl,indexRow);
                control = false;
            }
            celda1 = getElementContent(variablesControl.ultima,0,1);
            celda2 = getElementContent(variablesControl.segunda,0,1);
            celda3 = getElementContent(variablesControl.primera,0,1);
            capitalDinamico = formatNodeToFloat(celda1) + formatNodeToFloat(celda2) + formatNodeToFloat(celda3);
            resumen.rows[indexRow].cells[1].textContent = capitalDinamico.toLocaleString();
            if(indexRow >= 3){
                resumen.rows[indexRow].cells[3].textContent = getElementContent(indexTablaCapital,0,1);//Rellena capital total hasta la fecha
                indexTablaCapital++;
            }
            celda1 = getElementContent(variablesControl.ultima,3,3);
            celda2 = getElementContent(variablesControl.segunda,2,3);
            celda3 = getElementContent(variablesControl.primera,1,3);

            gananciaDinamica = formatNodeToFloat(celda1) + formatNodeToFloat(celda2) + formatNodeToFloat(celda3);
            resumen.rows[indexRow].cells[2].textContent = gananciaDinamica.toLocaleString();
            celda1 = resumen.rows[indexRow].cells[2].textContent;
            celda2 = resumen.rows[indexRow].cells[3].textContent;
            montoTotal = formatNodeToFloat(celda1) + formatNodeToFloat(celda2);
            resumen.rows[indexRow].cells[4].textContent = montoTotal.toLocaleString();
            resumen.rows[indexRow].cells[7].textContent = montoTotal.toLocaleString();
            variablesControl.ultima++;
            variablesControl.segunda++;
            variablesControl.primera++;

        }
        //resumen.rows[indexRow].cells[5]. = '105'; //ESTO RELLENA EL ESPACIO DE PLAZO
    }
}


    function getPorcentaje(num) {// Calcula el porcentaje de las ganancias a partir del monto
        let porcentaje = (num <=10000.00) ? 50 :(
            (num>= 10000.00 && num<= 999999.99) ? 50 :(
                (num>= 1000000.00 && num<= 1999999.99) ? 55 : (
                    (num>= 2000000.00 && num<= 4999999.99 ? 60 : (
                        (num>= 5000000.00 && num<= 9999999.99) ? 65 : (
                            (num>= 10000000.00 && num<= 19999999.99) ? 70 : (
                                (num >= 20000000.00 && num <= 49999999.99) ? 75 : (
                                    (num >= 50000000.00 && num <= 99999999.99) ? 80 : (
                                        (num >= 100000000.00 && num <= 499999999.99) ? 85 : (
                                            (num >= 500000000.00 && num <= 99999999.99) ? 90 : (
                                                (num >= 100000000.00 && num <= 4999999999.99 ) ? 95 : (
                                                    (num >= 5000000000.00 && num <= 99999999999.99) ? 100 : 120))))))))))))
        return porcentaje;
    }

function formatNodeToFloat(num){//Transforma un nodo de texto a flotante
    return parseFloat(num.replace(/\./g,'').replace(/,/,'.'));
}

function getGanancia(num1,num2){//Calcula el procentaje con la capital y el porcentaje
    return (num1 * num2)/100;
}

function getElementContent(id,row,cell){//Obtiene el elemento HTML a partir de su id, fila, celda.
    return document.getElementById(`table${id}`).rows[row].cells[cell].textContent;
}

function reiniciarTabla(id){//Funcion para seleccionar la tabla a partir del id
    let tabla = document.getElementById('div-tables').firstElementChild;
    for(let i = 0; i <= document.getElementById('div-tables').childElementCount; i++){
        if( tabla.id == `table${id}`){
            return tabla;
        }else{
            tabla = tabla.nextSibling;
        }
    }
}

function reiniciarVariables(varControl,indexTabla = 3){//Reinicia las variables de control
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



const createSelect = indexInput => {
    let select = document.createElement('select');
    select.setAttribute('class','selectPlazos');
    select.setAttribute('onchange',`putSelect(this.value,${indexInput})`);
    let dias = 35
    for(let plazos = 1; plazos <=11;plazos++){
        let option = document.createElement('option');
        option.text = dias;
        option.value = plazos;
        select.appendChild(option);
        dias += 35;
    }
    select.selectedIndex = 2;
    return select;
}

const createInput= indexInput => {
    let input = document.createElement("input");
    input.setAttribute("id",`${indexInput}`);
    input.setAttribute('placeholder',"0,00");
    input.setAttribute('style','width: 120px;');
    input.setAttribute('onblur',`retiroResumen(${indexInput})`);
    return input;
    }

function putSelect(e,index){
    let i = index;
    for(i; i <= 11; i++){
    let removeTable = document.getElementById(`table${i}`);
    let parentDiv = removeTable.parentElement;
    parentDiv.removeChild(removeTable);
    }
    console.log(index,e);
    dibujarTablas(index- 1 ,e);
}

function formattedChilean(value) {
        let realVal = "";

        value = value/parseInt(value) == 1 ? value.toLocaleString('es-ES') + ",00" : value.toLocaleString('es-ES');
        value = value.split("");

        for(let i = value.length; i > 0; i--){
            if(i == 11){
                value[(value.length - i)] = `'`;
            }
        }

        for(let i = 0; i < value.length; i++){
            realVal += value[i];
        }

        return realVal;
    }



/*    function putSelect(){
        let fila = document.getElementsByClassName('select');
        console.log(fila);
        for(let i = 0; i < fila.length; i++){
        let test = document.getElementsByClassName('select')[i];
        test.innerHTML = '';
        test.appendChild(createSelect());
        }
        console.log(document.getElementsByClassName('select'));
    }*/
