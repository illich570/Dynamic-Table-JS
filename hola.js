 //FALTA POR CALCULAR : CREAR ARREGLO PARA EL CAPITAL INVERTIDO(Tengo la principal, averiguar calcular los cobsecuentes), MONTO A GANAR, GANANCIA LIBERADA, CAPITAL LIBERADO(ESTO ESTA EN DUDA), MONTO TOTAL LIBERADO(DUDA)
//Despues de obtener todo estos datos,imprimir una primera tabla de prueba.

 //Codigo para calcular los porcentajes y el monto a ganar.
function getPercentAndMontos(){
  var capital = document.getElementById('monto').value;
  var plazos = getCortes();
  var montoArray = []
  var percentArray = []
  var value;
  var percent;
  var repe;
  if (plazos == 1) {
    percent= 50;
    value = (capital * percent)/100;
    repe =Number((value*1).toFixed(3))
    montoArray.push(repe);
    percentArray.push( percent + '%');
    } else if ( plazos == 2) {
      percent = 50;
      for (let i = 0; i < plazos; i++) {
        value = (capital * percent)/100;
          repe =Number((value*1).toFixed(3))
        montoArray.push(repe);
        percentArray.push( percent + '%');  
        }
        } else {
          percent = (capital>= 10000.00 && capital<= 99999.99) ? 50 :(
          (capital>= 100000.00 && capital<= 199999.99) ? 55 : (
            (capital>= 200000.00 && capital<= 499999.99 ? 60 : (
            (capital>= 500000.00 && capital<= 999999.99) ? 65 : (
              (capital>= 1000000.00 && capital<= 1999999.99) ? 70 : (
                (capital >= 2000000.00 && capital <= 4999999.99) ? 75 : (
                  (capital >= 5000000.00 && capital <= 9999999.99) ? 80 : (
                    (capital >= 10000000.00 && capital <= 49999999.99) ? 85 : (
                      (capital >= 50000000.00 && capital <= 99999999.99) ? 90 : (
                        (capital >= 100000000.00 && capital <= 199999999.99 ) ? 95 : (
                          (capital >= 200000000.00 && capital <= 499999999.99) ? 100 : 120)))))))))))    
     // FALTA FORMULA PARA CALCULAR LOS PORCENTAJES A PARTIR DE LAS INVERSIONES, HAY QUE CALCULARLA CON LAS TABLAS DE REFERENCIA
      for (let  i = 0; i < plazos; i++) {
      value = (capital * percent)/100;
      repe =Number((value*1).toFixed(3))
      montoArray.push(repe);
      percentArray.push( percent + '%'); 
      percent+= 2;
    }
      }
    var montosTotales = montoArray.slice();
    console.log(percentArray,montoTotales);
    return montosTotales;
}
// ESTO ES CODIGO PARA CREAR UN ARREGLO CONTENIENDO TODAS LAS FECHAS SUBSECUENTES A PARTIR DE LA FECHA INTRODUCIDA POR EL USUARIO.
var l;
function getFechas() {
  var fechas = [];
  var dias = document.getElementById('corte').value;
  var plazos = dias / 35;
  var prueba = document.getElementById('date').value;
  var fecha = new Date(`${prueba}`);
  l = fecha.setDate(fecha.getDate() + 35);
  var fechasI = fecha.toLocaleDateString('es-Es');
  fechas.push(fechasI);
  for (var i = 1; i < plazos; i++) {
    l = fecha.setDate(fecha.getDate() + 35);
    fechasI = fecha.toLocaleDateString('es-Es');
    fechas.push(fechasI);
  }
  console.log(fechas);
}


// Funcion para crear arreglo de la inversion principal
function arregloCapitalInvertido() {
var capital = document.getElementById("monto").value;
var plazos = getCortes();
var capitales = [];
capital = Number((capital*1).toFixed(3)).toLocaleString(); //Formateo de la cantidad ingresada en bolivares con puntos y decimales
for (var i = 0; i <= plazos ;i++) {
  capitales.push(capital);
}
console.log(capitales);
}



//Funcion para obtener las FILAS DE CADA TABLA, que proviene de los plazos de los dias de la inversion
  function getCortes(){
  var dias = document.getElementById('corte').value;
  var plazos = dias / 35;
  return plazos;
}

function getCapitalLiberado(){
  var capitalLiberado = [];
  var plazos = getCortes();
  var capital1= 100000;
  for( var i = 1 ; i <= plazos; i++){
    capitalLiberado.push('0,00');
    if( i == plazos){
      capitalLiberado.push(capital1);
    }
  }
  console.log(capitalLiberado);
}
//CALCULO DE LA ULTIMA COLUMNA  
function getMontoTotalLiberado(){
  var montosTotales = getPercentAndMontos();
  var plazos = getCortes();
  var capital1 = 1;
  var montoCompuesto;
  for( var i = 1 ; i <= plazos; i++){
    if( i == plazos){
      montoCompuesto = montosTotales[montosTotales.length - 1];
      var lastItem = parseFloat(montoCompuesto) + parseFloat(capital1);
      montosTotales.pop();
      montosTotales.push(lastItem);
    }
  }
console.log(montosTotales);
}
/*
var titulos = ['Fecha', 'Capital Invertido', '%', 'Monto a ganar', 'Ganancia', 'Capital', 'Monto total'];

function calcularCorte() {

  console.log(corte);
}

function getPercentAndMontos(){
  var capital = document.getElementById('monto').value;
  var plazos = getCortes();
  var montoArray = []
  var percentArray = []
  var value;
  var percent;
  var repe;
  if (plazos == 1) {
    percent= 50;
    value = (capital * percent)/100;
    repe =Number((value*1).toFixed(3))
    montoArray.push(repe);
    percentArray.push( percent + '%');
    } else if ( plazos == 2) {
      percent = 50;
      for (let i = 0; i < plazos; i++) {
        value = (capital * percent)/100;
          repe =Number((value*1).toFixed(3))
        montoArray.push(repe);
        percentArray.push( percent + '%');  
        }
        } else {
      percent = 50;
     // FALTA FORMULA PARA CALCULAR LOS PORCENTAJES A PARTIR DE LAS INVERSIONES, HAY QUE CALCULARLA CON LAS TABLAS DE REFERENCIA
      for (let  i = 0; i < plazos; i++) {
      value = (capital * percent)/100;
      repe =Number((value*1).toFixed(3))
      montoArray.push(repe);
      percentArray.push( percent + '%'); 
      percent+= 2;
    }
    }
    var montosTotales = montoArray.slice();
    return montosTotales;
  }
 






















var fecha = new Date(`${prueba}`);
function agregarPrincipal() {
  var l = fecha.getDate(fecha.setDate() + 35);
  var fecha = fecha.toISOString().slice(0, 10).replace(/-/g, '/');
  fechas.push(fechaPrin);
  console.log(fechas);
}
*/
