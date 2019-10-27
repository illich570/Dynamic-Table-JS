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
var columna = 7; 


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