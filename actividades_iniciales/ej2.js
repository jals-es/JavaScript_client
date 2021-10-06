'use strict';

/**
 * Apartado 1
 * Realiza los siguientes pasos (muestra por consola el resultado después de aplicar cada uno):
 * - Crea un array con 4 elementos
 * - Concatena 2 elementos más al final y 2 al principio
 * - Elimina las posiciones de la 3 a la 5 (ambas incluidas)
 * - Inserta 2 elementos más entre el penúltimo y el último
 * - Muestra el array del paso anterior, pero con los elementos separados por " ==> "
 */

console.log('--------------- APARTADO 1 -----------------');
var miarray = new Array("Antoni", "Juan Antonio", "Rameti", "Pablo");
miarray.push("Kevin", "Juanmi");
miarray.splice(0, 0, 'Abel');
miarray.splice(0, 0, 'Hugo');

// console.log(miarray);

miarray.splice(3, 3);

// console.log(miarray);

miarray.splice(4, 0, "Juanjo");
miarray.splice(4, 0, "Javi");


var elements = miarray[0];
for (var i = 1; i < miarray.length; i++) {
    elements = elements + ' ==> ' + miarray[i];
}

console.log(elements);

/**
 * Apartado 2
 * Crea una función que reciba como primer parámetro el nombre de un alumno, seguido
 * de un número indeterminado de notas (usa spread para agruparlas en un array).
 * Utiliza el método reduce para sumar las notas y calcula la media, que deberás mostrar por consola.
 * Posible llamada -> printMedia("Pepe", 4.25, 6, 8.5, 9)
 */

console.log('--------------- APARTADO 2 -----------------');

function printMedia() {

    var suma_total = 0;
    var nom = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
        suma_total = suma_total + arguments[i];
    }

    var media_notas = suma_total / (arguments.length - 1);

    console.log('La media de las notas de ' + nom + ' es ==> ' + media_notas);

}

printMedia("Pepe", 4.25, 6, 8.5, 9);
printMedia("Antoni", 5, 4, 5, 8, 9, 0, 4);
printMedia("Juan Antonio", 9, 8, 10, 10);

/**
 * Apartado 3
 * Crea un array de cadenas y ordénalo usando el método sort de mayor a menor longitud .
 * Imprime el array original (antes de ordenarlo) y el resultado
 */

console.log('--------------- APARTADO 3 -----------------');

var array = new Array("Antoni", "Juan Antonio", "Rameti", "Pablo");
console.log(array);

array.sort((a, b) => b.length - a.length);

console.log(array);

/**
 * Apartado 4
 * Crea un array de números de más de una cifra. Mapea ese array en otro que sea la suma de las cifras de cada número. No puedes usar bucles.
 * Pista: Puedes convertir los números a cadena primero y después con Array.from(cadena) la transformas a array de caracteres (que puedes sumar)
 * Imprime el array original y el resultado
 */

console.log('--------------- APARTADO 4 -----------------');

var numarray = new Array(11, 21, 23, 99, 20, 1, 231);
var digitos = numarray.map(function(num) {

    num = String(num);

    var thisdigitos = num.split('');
    return thisdigitos.reduce((a, b) => parseInt(a) + parseInt(b), 0);
});

console.log(digitos);

/**
 * Apartado 5
 * A partir del siguiente array que contiene productos con mensajes sobre los mismos:
 * - Filtra los mensajes que empiecen por ERROR (usa el método startsWith).
 * - Después recórrelos y mételos en un objeto Map cuya clave sea el nombre del producto
 * y cuyo valor sea un array con los mensajes de error asociados al producto.
 * - Recorre el objeto Map mostrando, para cada producto, que errores tiene asociados.
 */

console.log('--------------- APARTADO 5 -----------------');

let mensajes = [
    ['Silla', 'ERROR: Stock no coincide'],
    ['Mesa', 'Pedido de 2 unidades'],
    ['Silla', 'ERROR: El precio no puede ser menor a 1'],
    ['Mesa', 'ERROR: No se pueden enviar 0 unidades'],
    ['Cama', 'ERROR: El fabricante no tiene ese modelo'],
    ['Silla', 'Se ha borrado el producto de la base de datos'],
    ['Mesa', 'ERROR: El stock no puede ser negativo']
];
var miarray = new Array();
var productos = mensajes.map((prod, index) => {
    if (prod[1].startsWith('ERROR')) {
        if (miarray[prod[0]] == undefined) {
            miarray[prod[0]] = new Array();
        }
        miarray[prod[0]].push(prod[1]);
    }

    if (index == (mensajes.length - 1)) {
        return miarray;
    }
});

var errores = productos[mensajes.length - 1];
// console.log(errores);

for (var index in errores) {
    console.log("Errores de " + index + ":");
    for (var i in errores[index]) {
        console.log((parseInt(i) + 1) + ". " + errores[index][i]);
    }
}

/**
 * Apartado 6
 * Crea una función calcule el área de un triángulo. Esta función recibirá 3 parámetros:
 * 2 lados del triángulo, y el ańgulo entre ellos (en grados).
 * Para calcular el área con estos datos debemos aplicar la fórmula: (1/2)*lado1*lado2*seno(ángulo).
 * Debes tener en cuenta que para aplicar la fórmula, el ángulo debe estar en radianes. Para pasarlo
 * a radianes lo multiplicamos por PI y dividimos entre 180.
 */

console.log('--------------- APARTADO 6 -----------------');

var area_triangulo = (lado1, lado2, angulo) => {
    angulo = ((angulo * Math.PI) / 180);
    var area = (1 / 2) * lado1 * lado2 * Math.sin(angulo);
    console.log(area);
}

area_triangulo(12, 20, 60);
area_triangulo(18, 25, 30);

/**
 * Apartado 7
 * Crea una función que reciba una cadena con una fecha en formato "YYYY-MM-DD". Muestra la fecha (ej: 2019-02-28) con
 * el siguiente formato: Jueves, 28 de Febrero de 2019.
 * Debes formatear la fecha usando los métodos de la clase Date para obtener, día de la semana, día del mes, mes, y año.
 * No puedes usar librerías como moment.js para ayudarte.
 * Para mostrar el nombre del mes o del día de la semana, puedes crearte un array que los contenga (los días de la semana empiezan por domingo -> 0)
 * Métodos de la clase Date: https://www.w3schools.com/jsref/jsref_obj_date.asp
 * Llama a la función varias veces.
 */

console.log('--------------- APARTADO 7 -----------------');

var fecha_bonita = (fecha_num) => {
    var fecha_num = new Date(fecha_num);

    var dia_num = fecha_num.getDate();
    var dia_nom = "";
    switch (fecha_num.getDay()) {
        case 0:
            dia_nom = "Domingo";
            break;
        case 1:
            dia_nom = "Lunes";
            break;
        case 2:
            dia_nom = "Martes";
            break;
        case 3:
            dia_nom = "Miercoles";
            break;
        case 4:
            dia_nom = "Jueves";
            break;
        case 5:
            dia_nom = "Viernes";
            break;
        case 6:
            dia_nom = "Sabado";
            break;
    }

    var mes = "";
    switch (fecha_num.getMonth()) {
        case 0:
            mes = "Enero";
            break;
        case 1:
            mes = "Febrero";
            break;
        case 2:
            mes = "Marzo";
            break;
        case 3:
            mes = "Abril";
            break;
        case 4:
            mes = "Mayo";
            break;
        case 5:
            mes = "Junio";
            break;
        case 6:
            mes = "Julio";
            break;
        case 7:
            mes = "Agosto";
            break;
        case 8:
            mes = "Septiembre";
            break;
        case 9:
            mes = "Octubre";
            break;
        case 10:
            mes = "Noviembre";
            break;
        case 11:
            mes = "Diciembre";
            break;
    }
    console.log(dia_nom + ", " + dia_num + " de " + mes + " de " + fecha_num.getFullYear() + ".");
}

fecha_bonita('2021-09-13');
fecha_bonita('1999-02-9');
fecha_bonita('2999-12-29');

console.log('--------------------------------------------');
console.log('-------------- Hecho por:   ----------------');
console.log('-------------- Juan Antonio ----------------');
console.log('-------------- López  Seguí ----------------');
console.log('--------------------------------------------');