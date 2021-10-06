//Sacamos random para ver quien empieza
var turno = Math.random() < 0.5;
if (turno) {
    document.getElementById("turno").innerText = "Turno J1";
} else {
    document.getElementById("turno").innerText = "Turno J2";
}

//Recuperamos el marcador de localstorage o lo creamos si no existe
if (localStorage.getItem("3nr_m1") !== null && localStorage.getItem("3nr_m2") !== null) {
    document.getElementById("marcador").innerText = "J1 " + localStorage.getItem("3nr_m1") + " - " + localStorage.getItem("3nr_m2") + " J2";
} else {
    localStorage.setItem("3nr_m1", 0);
    localStorage.setItem("3nr_m2", 0);
    document.getElementById("marcador").innerText = "J1 " + localStorage.getItem("3nr_m1") + " - " + localStorage.getItem("3nr_m2") + " J2";
}

//Inicializamos los arrays de jugadores y posiciones 
var players = [new Array(), new Array()];
var posibilidades = [null, null, null, null, null, null, null, null, null];
var rondas = 0;
document.getElementById("ronda").innerText = "Ronda " + rondas;

//Creamos el campo en sessionstorage donde se guarda el cambio de posicion de las fichas 
sessionStorage.setItem("3nr_cambio", 9);


//Funcion que comprueba si has ganado
function check_win(jugador) {

    // console.log(jugador);

    //Declaramos array con todas las posibilidades de victoria
    var posibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //Iniciamos las variables de comprobacion
    var check1 = false;
    var check2 = false;
    var check3 = false;

    //Recorremos el array de posibilidades de victoria para comprobar si nuestra combinacion esta entre las ganadoras
    for (let i = 0; i < posibilidades.length; i++) {

        //Comprobamos si nuestras posiciones existen en la posibilidad
        if (posibilidades[i].indexOf(parseInt(jugador[0])) > -1) check1 = true;
        if (posibilidades[i].indexOf(parseInt(jugador[1])) > -1) check2 = true;
        if (posibilidades[i].indexOf(parseInt(jugador[2])) > -1) check3 = true;


        if (check1 && check2 && check3) {
            //Si nuestras 3 posiciones existen, hemos ganado
            return true;
        } else {
            //Si no existen volvemos a poner los comprobadores a false
            check1 = false;
            check2 = false;
            check3 = false;
        }
    }

    //Si llega aqui es que no nuestra combinacion no coincide con las posibilidades de victoria, por lo que aun no hemos ganado
    return false;
}

//Cojemos todad las posiciones y las recorremos con un bucle
document.querySelectorAll('.posicion').forEach(element => {

    //Añadimos eventos de click a las 9 fichas
    element.addEventListener('click', function() {
        document.getElementById("color1").disabled = true;
        document.getElementById("color2").disabled = true;
        if (posibilidades[this.id] == null) {
            //La posicion esta vacía
            if (turno) {
                //turno j1
                color = document.getElementById("color1").value;
                proxturno = 2;
                player = 0;
            } else {
                //turno j2
                color = document.getElementById("color2").value;
                proxturno = 1;
                player = 1;
            }


            if (players[player].length < 3) {
                //aun no estan las 3 fichas colocadas
                posibilidades[this.id] = turno;
                players[player].push(this.id);
                this.style = "background: " + color;
                document.getElementById("turno").innerText = "Turno J" + proxturno;
                turno = !turno;

                rondas++;
                document.getElementById("ronda").innerText = "Ronda " + rondas;
            } else if (sessionStorage.getItem("3nr_cambio") != 9) {

                //cogemos la posicion anterior y la pasamos a blanco
                ant_position = sessionStorage.getItem("3nr_cambio");
                document.getElementById(ant_position).style = "background: white";

                posibilidades[ant_position] = null;
                posibilidades[this.id] = turno;

                // console.log("antposition = " + players.indexOf(ant_position));
                players[player][players[player].indexOf(ant_position)] = this.id;

                this.style = "background: " + color;

                document.getElementById("turno").innerText = "Turno J" + proxturno;
                turno = !turno;
                sessionStorage.setItem("3nr_cambio", 9);

                rondas++;
                document.getElementById("ronda").innerText = "Ronda " + rondas;
            }

            if (check_win(players[player])) {

                // alert("J" + (player + 1) + " gana");
                Swal.fire({
                    title: "J" + (player + 1) + " gana",
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    player = player + 1;

                    this_marcador = parseInt(localStorage.getItem("3nr_m" + player)) + 1;
                    localStorage.setItem("3nr_m" + player, this_marcador);

                    document.getElementById("marcador").innerText = "J1 " + localStorage.getItem("3nr_m1") + " - " + localStorage.getItem("3nr_m2") + " J2";

                    document.querySelectorAll('.posicion').forEach(element => {

                        element.style = "background: white";

                    });

                    players = [new Array(), new Array()];
                    posibilidades = [null, null, null, null, null, null, null, null, null];

                    turno = Math.random() < 0.5;
                    if (turno) {
                        document.getElementById("turno").innerText = "Turno J1";
                    } else {
                        document.getElementById("turno").innerText = "Turno J2";
                    }

                    rondas = 0;
                    document.getElementById("ronda").innerText = "Ronda " + rondas;
                    document.getElementById("color1").disabled = false;
                    document.getElementById("color2").disabled = false;
                });
            }

        } else {
            //The position is full

            if (posibilidades[this.id] == turno && sessionStorage.getItem("3nr_cambio") == 9 && players[player].length == 3) {
                this.style = "background: blue";

                sessionStorage.setItem("3nr_cambio", this.id);
            }

        }
    });
});

//Funcion para resetear el marcador
document.getElementById("reset-marcador").addEventListener('click', function() {
    localStorage.setItem("3nr_m1", 0);
    localStorage.setItem("3nr_m2", 0);
    document.getElementById("marcador").innerText = "J1 " + localStorage.getItem("3nr_m1") + " - " + localStorage.getItem("3nr_m2") + " J2";
});