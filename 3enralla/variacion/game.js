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

function multiplayer(nj1, nj2) {
    //Sacamos random para ver quien empieza
    var turno = Math.random() < 0.5;
    if (turno) {
        document.getElementById("turno").innerText = "Turno " + nj1;
    } else {
        document.getElementById("turno").innerText = "Turno " + nj2;
    }

    //Recuperamos el marcador de localstorage o lo creamos si no existe
    if (localStorage.getItem("3nr_m1") !== null && localStorage.getItem("3nr_m2") !== null) {
        document.getElementById("marcador").innerText = nj1 + " " + localStorage.getItem("3nr_m1") + " - " + localStorage.getItem("3nr_m2") + " " + nj2;
    } else {
        localStorage.setItem("3nr_m1", 0);
        localStorage.setItem("3nr_m2", 0);
        document.getElementById("marcador").innerText = nj1 + " " + localStorage.getItem("3nr_m1") + " - " + localStorage.getItem("3nr_m2") + " " + nj2;
    }

    //Inicializamos los arrays de jugadores y posiciones 
    var players = [new Array(), new Array()];
    var posibilidades = [null, null, null, null, null, null, null, null, null];
    var rondas = 0;
    document.getElementById("ronda").innerText = "Ronda " + rondas;

    //Creamos el campo en sessionstorage donde se guarda el cambio de posicion de las fichas 
    sessionStorage.setItem("3nr_cambio", 9);

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
                    proxturno = nj2;
                    player = 0;
                } else {
                    //turno j2
                    color = document.getElementById("color2").value;
                    proxturno = nj1;
                    player = 1;
                }


                if (players[player].length < 3) {
                    //aun no estan las 3 fichas colocadas
                    posibilidades[this.id] = turno;
                    players[player].push(this.id);
                    this.style = "background: " + color;
                    document.getElementById("turno").innerText = "Turno " + proxturno;
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

                    document.getElementById("turno").innerText = "Turno " + proxturno;
                    turno = !turno;
                    sessionStorage.setItem("3nr_cambio", 9);

                    rondas++;
                    document.getElementById("ronda").innerText = "Ronda " + rondas;
                }

                if (check_win(players[player])) {

                    // alert("J" + (player + 1) + " gana");
                    if (player == 0) {
                        namej = nj1;
                    } else {
                        namej = nj2;
                    }
                    Swal.fire({
                        title: namej + " gana",
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'Continuar'
                    }).then((result) => {
                        player = player + 1;

                        this_marcador = parseInt(localStorage.getItem("3nr_m" + player)) + 1;
                        localStorage.setItem("3nr_m" + player, this_marcador);

                        document.getElementById("marcador").innerText = nj1 + " " + localStorage.getItem("3nr_m1") + " - " + localStorage.getItem("3nr_m2") + " " + nj2;

                        document.querySelectorAll('.posicion').forEach(element => {

                            element.style = "background: white";

                        });

                        players = [new Array(), new Array()];
                        posibilidades = [null, null, null, null, null, null, null, null, null];

                        turno = Math.random() < 0.5;
                        if (turno) {
                            document.getElementById("turno").innerText = "Turno " + nj1;
                        } else {
                            document.getElementById("turno").innerText = "Turno " + nj2;
                        }

                        rondas = 0;
                        document.getElementById("ronda").innerText = "Ronda " + rondas;
                        document.getElementById("color1").disabled = false;
                        document.getElementById("color2").disabled = false;

                        check_final_win();
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
        document.getElementById("marcador").innerText = nj1 + " " + localStorage.getItem("3nr_m1") + " - " + localStorage.getItem("3nr_m2") + " " + nj2;
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function single_player() {

    var nj1 = "J1";
    var nj2 = "IA";

    //Sacamos random para ver quien empieza
    var turno = true;
    if (turno) {
        document.getElementById("turno").innerText = "Turno " + nj1;
    } else {
        document.getElementById("turno").innerText = "Turno " + nj2;
    }

    //Recuperamos el marcador de localstorage o lo creamos si no existe
    if (localStorage.getItem("3nr_m1") !== null && localStorage.getItem("3nr_m2") !== null) {
        document.getElementById("marcador").innerText = nj1 + " " + localStorage.getItem("3nr_m1") + " - " + localStorage.getItem("3nr_m2") + " " + nj2;
    } else {
        localStorage.setItem("3nr_m1", 0);
        localStorage.setItem("3nr_m2", 0);
        document.getElementById("marcador").innerText = nj1 + " " + localStorage.getItem("3nr_m1") + " - " + localStorage.getItem("3nr_m2") + " " + nj2;
    }

    if (localStorage.getItem("3nr_estadisticas") !== null) {
        document.getElementById("estadisticas").innerHTML = localStorage.getItem("3nr_estadisticas");
    } else {
        localStorage.setItem("3nr_estadisticas", "Estadisticas J1:<br>");
        document.getElementById("estadisticas").innerHTML = localStorage.getItem("3nr_estadisticas");
    }

    //Inicializamos los arrays de jugadores y posiciones 
    var players = [new Array(), new Array()];
    var posibilidades = [null, null, null, null, null, null, null, null, null];
    var rondas = 0;
    document.getElementById("ronda").innerText = "Ronda " + rondas;

    //Creamos el campo en sessionstorage donde se guarda el cambio de posicion de las fichas 
    sessionStorage.setItem("3nr_cambio", 9);

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
                    proxturno = nj2;
                    player = 0;
                } else {
                    //turno j2
                    color = document.getElementById("color2").value;
                    proxturno = nj1;
                    player = 1;
                }


                if (players[player].length < 3) {
                    //aun no estan las 3 fichas colocadas
                    posibilidades[this.id] = turno;
                    players[player].push(this.id);
                    this.style = "background: " + color;
                    document.getElementById("turno").innerText = "Turno " + proxturno;
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

                    document.getElementById("turno").innerText = "Turno " + proxturno;
                    turno = !turno;
                    sessionStorage.setItem("3nr_cambio", 9);

                    rondas++;
                    document.getElementById("ronda").innerText = "Ronda " + rondas;
                }

                if (check_win(players[player])) {

                    // alert("J" + (player + 1) + " gana");
                    if (player == 0) {
                        namej = nj1;
                    } else {
                        namej = nj2;
                    }
                    Swal.fire({
                        title: namej + " gana",
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'Continuar'
                    }).then((result) => {
                        player = player + 1;

                        this_marcador = parseInt(localStorage.getItem("3nr_m" + player)) + 1;
                        localStorage.setItem("3nr_m" + player, this_marcador);

                        document.getElementById("marcador").innerText = nj1 + " " + localStorage.getItem("3nr_m1") + " - " + localStorage.getItem("3nr_m2") + " " + nj2;

                        document.querySelectorAll('.posicion').forEach(element => {

                            element.style = "background: white";

                        });

                        players = [new Array(), new Array()];
                        posibilidades = [null, null, null, null, null, null, null, null, null];

                        turno = true;
                        if (turno) {
                            document.getElementById("turno").innerText = "Turno " + nj1;
                        } else {
                            document.getElementById("turno").innerText = "Turno " + nj2;
                        }

                        localStorage.setItem("3nr_estadisticas", localStorage.getItem("3nr_estadisticas") + "Gana J1 con " + rondas + " rondas<br>");
                        document.getElementById("estadisticas").innerHTML = localStorage.getItem("3nr_estadisticas");
                        rondas = 0;
                        document.getElementById("ronda").innerText = "Ronda " + rondas;
                        document.getElementById("color1").disabled = false;
                        document.getElementById("color2").disabled = false;

                        check_final_win();
                    });
                } else if (turno == false) {
                    // await sleep(2000);

                    if (players[1].length < 3) {

                        posibilidades_null = 0;
                        for (let i = 0; i < posibilidades.length; i++) {
                            if (posibilidades[i] == null) {
                                posibilidades_null++;
                            }
                        }


                        posicion_cambia = Math.floor(Math.random() * ((posibilidades_null - 1) - 0)) + 0;

                        z = 0;
                        var posicion_nueva = "";
                        for (let i = 0; i < posibilidades.length; i++) {
                            if (posibilidades[i] == null) {
                                if (z == posicion_cambia) {
                                    posicion_nueva = i;
                                }
                                z++;
                            }
                        }

                        document.getElementById(posicion_nueva).style = "background: " + document.getElementById("color2").value + ";";
                        posibilidades[posicion_nueva] = false;
                        players[1].push(posicion_nueva);

                    } else {
                        console.log("cambia");
                        posicion_cambia = Math.floor(Math.random() * (3 - 0)) + 0;

                        var z = 0;
                        var posicion_nueva = "";
                        for (let i = 0; i < posibilidades.length; i++) {
                            if (posibilidades[i] == null) {
                                if (z == posicion_cambia) {
                                    posicion_nueva = i;
                                } else {
                                    z++;
                                }
                            }
                        }

                        document.getElementById(players[1][posicion_cambia]).style = "background: white;";
                        document.getElementById(posicion_nueva).style = "background: " + document.getElementById("color2").value + ";";
                        posibilidades[posicion_nueva] = false;
                        posibilidades[players[1][posicion_cambia]] = null;

                        players[1][posicion_cambia] = posicion_nueva;
                    }
                    turno++;
                    document.getElementById("turno").innerText = "Turno " + nj1;
                    if (check_win(players[1])) {
                        // alert("J" + (player + 1) + " gana");
                        player = 1;

                        if (player == 0) {
                            namej = nj1;
                        } else {
                            namej = nj2;
                        }
                        Swal.fire({
                            title: namej + " gana",
                            text: '',
                            icon: 'success',
                            confirmButtonText: 'Continuar'
                        }).then((result) => {
                            player = player + 1;

                            this_marcador = parseInt(localStorage.getItem("3nr_m" + player)) + 1;
                            localStorage.setItem("3nr_m" + player, this_marcador);

                            document.getElementById("marcador").innerText = nj1 + " " + localStorage.getItem("3nr_m1") + " - " + localStorage.getItem("3nr_m2") + " " + nj2;

                            document.querySelectorAll('.posicion').forEach(element => {

                                element.style = "background: white";

                            });

                            players = [new Array(), new Array()];
                            posibilidades = [null, null, null, null, null, null, null, null, null];

                            turno = true;
                            if (turno) {
                                document.getElementById("turno").innerText = "Turno " + nj1;
                            } else {
                                document.getElementById("turno").innerText = "Turno " + nj2;
                            }

                            rondas = 0;
                            document.getElementById("ronda").innerText = "Ronda " + rondas;
                            document.getElementById("color1").disabled = false;
                            document.getElementById("color2").disabled = false;

                            check_final_win();
                        });
                    }
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
        localStorage.removeItem("3nr_estadisticas");
        document.getElementById("marcador").innerText = nj1 + " " + localStorage.getItem("3nr_m1") + " - " + localStorage.getItem("3nr_m2") + " " + nj2;
    });
}






document.getElementById("singleplayer").addEventListener('click', function() {
    document.getElementById("eleccion").style.display = "none";
    document.getElementById("juego").style.display = "block";

    localStorage.setItem("3nr_m1", 0);
    localStorage.setItem("3nr_m2", 0);
    localStorage.removeItem("3nr_estadisticas");

    single_player();
});

function vacio(text) {
    if (text.length > 0) {
        return true;
    }
    return false;
}

document.getElementById("multiplayer").addEventListener('click', function() {
    document.getElementById("eleccion").style.display = "none";
    document.getElementById("selectnames").style.display = "block";

    document.getElementById("play_button").addEventListener('click', function() {
        var nj1 = document.getElementById("nj1").value;
        var nj2 = document.getElementById("nj2").value;

        if (vacio(nj1) && vacio(nj2) && nj1 !== nj2) {
            localStorage.setItem("3nr_m1", 0);
            localStorage.setItem("3nr_m2", 0);

            document.getElementById("selectnames").style.display = "none";
            document.getElementById("juego").style.display = "block";

            multiplayer(nj1, nj2);
        } else {
            Swal.fire({
                title: 'Campos vacíos',
                text: 'Debes poner nombres diferentes a los jugadores',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    });
});