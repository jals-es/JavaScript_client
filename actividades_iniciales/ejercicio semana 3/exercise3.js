"use strict";

// Edita sólo este fichero

newEvent.image.addEventListener('change', event => {
    let file = event.target.files[0];
    let reader = new FileReader();

    if (file) reader.readAsDataURL(file);

    reader.addEventListener('load', e => {

        document.getElementById('imgPreview').src = reader.result;
        document.getElementById('imgPreview').className = "img-thumbnail";
    });
});

function v_vacio(valor) {
    if (valor.length !== 0) {
        return true;
    }
    return false;
}

newEvent.addEventListener('submit', event => {
    event.preventDefault();
    var check = true;
    let i = 0;
    document.querySelectorAll('.form-control').forEach(element => {
        if (v_vacio(element.value)) {
            element.className = 'form-control is-valid';
        } else {
            element.className = 'form-control is-invalid';
            check = false;
        }
        i++;
    });

    if (check) {
        document.querySelectorAll('.form-control').forEach(element => {
            element.className = 'form-control';
        });
        document.getElementById('imgPreview').className = "img-thumbnail d-none";
        create_event();
        newEvent.reset();
    }


});

function create_event() {
    var card = document.createElement("div");
    card.setAttribute("class", "card");

    var img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("src", document.getElementById("imgPreview").src);
    card.appendChild(img);

    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    var cadrTitle = document.createElement("h4");
    cadrTitle.setAttribute("class", "card-title");
    cadrTitle.innerText = document.getElementById("name").value;
    cardBody.appendChild(cadrTitle);

    var cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerText = document.getElementById("description").value;
    cardBody.appendChild(cardText);

    card.appendChild(cardBody);

    var cardFooter = document.createElement("div");
    cardFooter.setAttribute("class", "card-footer");

    var textMuted = document.createElement("small");
    textMuted.setAttribute("class", "text-muted");

    var date = document.getElementById("date").value.split("-");
    textMuted.innerText = date[2] + "/" + date[1] + "/" + date[0];

    var cardPrice = document.createElement("span");
    cardPrice.setAttribute("class", "float-right");
    cardPrice.innerText = "Precio " + document.getElementById("price").value + "€";
    textMuted.appendChild(cardPrice);

    cardFooter.appendChild(textMuted);

    card.appendChild(cardFooter);


    document.getElementById("eventsContainer").appendChild(card);

}