'use strict';

/**
 * Apartado 1
 * Crea una función que reciba 2 cadenas por parámetro. Dicha función imprimirá por consola qué cadena
 * tiene mayor longitud. Si el tipo de algún parámetro no es string (typeof param !== "string"),
 * debes imprimir un error.
 * Llama a la función 3 veces con diferentes parámetros. En una de esas llamadas pásale por parámetro un valor que no sea string.
 */

console.log('--------------- APARTADO 1 -----------------');

function cadena_mayor_longitud(cadena1, cadena2) {

    if (typeof cadena1 !== "string" || typeof cadena2 !== "string") {
        console.log("Error, necesito dos strings.");
    } else {
        if (cadena1.length > cadena2.length) {
            console.log('La cadena1 es mas larga que la cadena2');
        } else if (cadena1.length < cadena2.length) {
            console.log('La cadena2 es mas larga que la cadena1');
        } else {
            console.log('Las cadenas son iguales');
        }
    }

}
cadena_mayor_longitud("esdrújula", "llana");
cadena_mayor_longitud("aguda", 20);
cadena_mayor_longitud("yo soy la cadena más larga", "yo soy una cadena aún más larga");

/**
 * Apartado 2
 * Crea una función que reciba 2 números por parámetro, el primer número indicará cuantas veces debemos imprimir el segundo
 * por pantalla, pero en cada iteración muéstra el valor anterior multiplicado por 2.
 * Ejemplo: Si recibimos 4 y 6 imprimiremos: 6 12 24 48
 * Llama a la función varias veces.
 */

console.log('--------------- APARTADO 2 -----------------');

function multiplicar_numeros_x_veces(parametro1, parametro2) {
    if (typeof parametro1 !== "number" || typeof parametro2 !== "number") {
        console.log("Error, necesito dos numeros.");
    } else {
        for (var i = 0; i < parametro1; i++) {
            if (i > 0) {
                parametro2 = parametro2 * 2;
            }
            console.log(parametro2);
        }
    }
}
multiplicar_numeros_x_veces(4, 6);
multiplicar_numeros_x_veces(3, 9);
multiplicar_numeros_x_veces(10, 2);
/**
 * Apartado 3
 * Crea una función que reciba 2 parámetros. El primero será una cadena y el segundo otra cadena que contendrá un caracter.
 * Convierte ambos parámetros a cadena y comprueba que efectivamente, el segundo parámetro tiene una longitud de 1.
 * Debes mostrar cuantas veces aparece el caracter recibido en la cadena.
 * Ejemple: Si recibimos "carcasa" y "a", debemos indicar que aparece 3 veces dicha letra en la cadena.
 * Llama a la función varias veces.
 */

console.log('--------------- APARTADO 3 -----------------');

function mostrar_caracter(cadena1, cadena2) {

    cadena1 = new String(cadena1);
    cadena2 = new String(cadena2);
    if (cadena2.length == 1) {
        var rep = 0;
        for (var i = 0; i < cadena1.length; i++) {
            if (cadena1[i] == cadena2) {
                rep++;
            }
        }

        console.log('El caracter "' + cadena2 + '" se repite ' + rep + ' veces.');
    } else {
        console.log("La cadena 2 debe ser solo 1 caracter.")
    }

}

mostrar_caracter("carcasa", "a");
mostrar_caracter("carcasa", "afsjaf");
mostrar_caracter(12, "1");

/**
 * Apartado 4
 * Crea una función que reciba 3 parámetros (nombre de producto, precio e impuesto en porcentaje sobre 100).
 * Dicha función hará lo siguiente:
 * - Los parámetros deberán tener un valor por defecto por si no los recibe que deben ser: "Producto genérico", 100 y 21.
 * - Convierte el nombre de producto a string (por si acaso) y los otros 2 a número. Si el precio o el impuesto no son
 *   numéros válidos (NaN) muestra un error. Si son válidos, muestra por consola el nombre del producto y el precio final contando impuestos.
 * - Llama a la función varias veces, omitiendo parámetros, con todos los parámetros, y pasándo algún valor no númerico en el precio o impuesto.
 */

console.log('--------------- APARTADO 4 -----------------');

function calcular_precio(nombre = "Producto genérico", precio = 100, impuesto = 21) {

    var check = true;

    nombre = new String(nombre);
    precio = parseInt(precio);

    if (Number.isNaN(precio)) {
        console.log("El precio no es un numero");

        check = false;
    }

    impuesto = parseInt(impuesto);

    if (Number.isNaN(impuesto)) {
        console.log("El impuesto no es un numero");
        check = false;
    } else {
        if (impuesto > 100) {
            console.log("El impuesto tiene que ser menor que 100");
            check = false;
        }
    }

    if (check) {
        impuesto = impuesto + 100;
        var precio_total = (precio * impuesto) / 100;
        console.log(nombre + ' --> ' + precio_total + "€");
    }
}

calcular_precio(undefined, 200, undefined);
calcular_precio("Pizza", 4, 10);
calcular_precio(undefined, "pizza", "peperoni");

/**
 * Apartado 5
 * Crea una función de tipo flecha (arrow function) que reciba 2 parámetros. Una cadena completa y un trozo de cadena a buscar.
 * La función debe comprobar si el trozo de cadena de búsqueda se encuentra dentro de la cadena completa e imprimir
 * por consola un mensaje indicando si ha encontrado coincidencia o no.
 * La búsqueda no debe ser sensible a mayúsculas o minúsculas, por lo que debes comparar ambas cadenas previa transformación
 * a minúsculas (o a mayúsculas). Ej: La cadena "Santiago de Compostela" contiene la cadena de búsqueda "COMPO".
 * Llama a la función varias veces.
 */

console.log('--------------- APARTADO 5 -----------------');

var ap5 = (cadena1, cadena2) => {

    var cadena1o = cadena1;
    var cadena2o = cadena2;

    cadena1 = new String(cadena1);
    cadena2 = new String(cadena2);

    cadena1 = cadena1.toUpperCase();
    cadena2 = cadena2.toUpperCase();

    if (cadena1.match(cadena2)) {
        console.log('La cadena "' + cadena2o + '" esta dentro de la cadena "' + cadena1o + '".');
    } else {
        console.log('No se encontro la cadena "' + cadena2o + '" en la cadena "' + cadena1o + '".');
    }
}

ap5("hola que @1tal", "QuE @1t");
ap5("Santiago de Compostela", "COMPO");
ap5("Santiago de Compostela", "tesla");

console.log('--------------------------------------------');
console.log('-------------- Hecho por:   ----------------');
console.log('-------------- Juan Antonio ----------------');
console.log('-------------- López  Seguí ----------------');
console.log('--------------------------------------------');