function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function tira_maquina(ronda, max, min, tiradas, block_tirar, vel) {
    console.log("Velocidad -> " + vel);
    await sleep(1000);
    for (let i = 0; i < tiradas.length; i++) {
        document.getElementById(tiradas[i]).style.transform = "scale(1.1)";
        await sleep(vel);
        document.getElementById(tiradas[i]).style.transform = "scale(1.0)";
        await sleep(vel);
    }

    new_posicion = Math.round(Math.random() * (max - min) + min);
    // console.log(new_posicion);
    document.getElementById(new_posicion).style.transform = "scale(1.1)";
    await sleep(vel);
    document.getElementById(new_posicion).style.transform = "scale(1.0)";
    await sleep(vel);
    tiradas.push(new_posicion);

    block_tirar = true;
    console.log(block_tirar);
    console.log(tiradas);
}

function game() {
    var tiradas = new Array();
    var ronda = 1;
    var max = 0;
    var min = 3;
    var block_tirar = true;
    var mi_tirada = new Array();
    var vel = 500;

    document.getElementById("ronda").innerText = ronda;


    tira_maquina(ronda, max, min, tiradas, block_tirar, vel);

    document.querySelectorAll('.color').forEach(element => {
        element.addEventListener("click", function() {

            console.log(tiradas[mi_tirada.length]);

            if (tiradas[mi_tirada.length] == this.id) {

                console.log("entra");

                mi_tirada.push(this.id);



                if (tiradas.length == mi_tirada.length) {
                    tira_maquina(ronda, max, min, tiradas, block_tirar, vel);
                    mi_tirada = new Array();
                    ronda++;
                    document.getElementById("ronda").innerText = ronda;
                }
            } else {
                alert("error");
                tiradas = new Array();
                ronda = 1;
                max = 0;
                min = 3;
                block_tirar = true;
                mi_tirada = new Array();
                document.getElementById("ronda").innerText = ronda;
            }

            switch (ronda) {
                case 10:
                    vel = 400;
                    break;
                case 15:
                    document.getElementById("colores2").style.display = "block";
                    max = 5;
                    break;
                case 20:
                    document.getElementById("colores3").style.display = "block";
                    max = 7;
                    break;
            }

        });
    });
}


document.getElementById("start").addEventListener("click", function() {
    game();
});