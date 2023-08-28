class Pet {
    constructor(tutorName, petName, species, image, date, age) {
        this.tutorName = tutorName;
        this.petName = petName;
        this.species = species;
        this.image = image;
        this.date = date;
        this.age = this.calculateAge();
        this.id = this.createId();
    }

    calculateAge() {
        let today = new Date();
        let birthDate = new Date(this.date);
        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();

        return (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) ? age - 1 : age;
    }

    createId() {
        return Math.floor(Math.random() * 1000);
    }

}

class PetList {
    constructor() {
        this.pets = [];
    }

    add(param) {
        if (verifyInputs()) {
            return;
        }
        else {
            this.pets.push(param);
            clearFields();
            showRender();
        }
    }

    countPets() {
        return this.pets.length;
    }


    removePet(id) {
        this.pets = this.pets.filter((pet) => pet.id !== id);
        showRender();
    }



}

function addPet() {
    const tutorName = document.getElementById("tutor-name").value;
    const petName = document.getElementById("pet-name").value;
    const species = document.getElementById("species").value;
    const image = document.getElementById("image").value;
    const date = document.getElementById("date").value;

    const pet = new Pet(tutorName, petName, species, image, date);

    petList.add(pet);
}

const petList = new PetList();

function sendMsg(msg, type, inputId) {
    const inputIdError = document.getElementById(`${inputId}-error`);


    if (msg) {
        inputIdError.innerHTML = `<p class="${type}">${msg}</p>`;
    } else {
        inputIdError.innerHTML = "";
    }
}

function formatDate(date) {
    console.log("Passou pela funcao dateinPTBR()");

    let dateArray = date.split("-");
    let datePTBR = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
    return datePTBR;
}
function showRender() {

    let content = "";

    petList.pets.forEach((pet) => {
        content += `
        <div class="card" style="width: 18rem;">
            <img src="${pet.image}" alt="${pet.petName}">
            <h2>${pet.petName}</h2>
            <p>Tutor: ${pet.tutorName}</p>
            <p>Espécie: ${pet.species}</p>
            <p>Idade: ${pet.age}</p>
            <p>Data de nascimento: ${formatDate(pet.date)}</p>
        <div id="buttons">
        <button id= "edit" onclick="editPet(${pet.id})">✏️Editar</button>
        <button id="remove" onclick="removePet(${pet.id})">🗑️Remover</button><br>
        <button id="favorite" onclick="favoritePet(${pet.id})">💗</button>
        </div>
        </div>
        `
    });

    document.getElementById("pet-list").innerHTML = content;

    const contador = petList.countPets()
    document.getElementById("contador").innerHTML = `Total: ${contador}`;

}

document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addPet();
    } else {
        editPet();
    };
});

function isURLValid(url) {
    if (url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".gif") || url.endsWith(".jpeg")) {
        return true;
    } else {
        return false;
    }
}

function showList() {
    if (petList.countPets() == 0) {
        msgEmpty("Não há pets cadastrados", "error");
        return;
    }
    else {
        document.getElementById("form-container").classList.add("hidden");
        document.getElementById("sub-div").classList.remove("hidden");
    }
}

function showLogin() {
    document.getElementById("form-container").classList.remove("hidden");
    document.getElementById("sub-div").classList.add("hidden");
}

function msgEmpty(msg, type) {
    const msgEmpty = document.getElementById("list-empty");

    msgEmpty.innerHTML = `<p class="${type}">${msg}</p>`;

    setTimeout(() => {
        msgEmpty.innerHTML = "";
    }, 3000);
}


function verifyInputs() {
    let tutorName = document.getElementById("tutor-name").value;
    let petName = document.getElementById("pet-name").value;
    let species = document.getElementById("species").value;
    let image = document.getElementById("image").value;
    let date = document.getElementById("date").value;

    let flag = false;

    if (tutorName == "") {
        sendMsg("Campo obrigatório", "error", "tutor-name");
        flag = true;
    } else {
        sendMsg("", "", "tutor-name");
    }

    if (petName == "") {
        sendMsg("Campo obrigatório", "error", "pet-name");
        flag = true;
    } else {
        sendMsg("", "", "pet-name");
    }

    if (species == "") {
        sendMsg("Campo obrigatório", "error", "species");
        flag = true;
    } else {
        sendMsg("", "", "species");
    }

    if (image == "") {
        sendMsg("Campo obrigatório", "error", "image");
        flag = true;
    } else if (!isURLValid(image)) {
        sendMsg("URL inválida", "error", "image");
        flag = true;
    }
    else {
        sendMsg("", "", "image");
    }

    if (date == "") {
        sendMsg("Campo obrigatório", "error", "date");
        flag = true;
    }
    else {
        sendMsg("", "", "date");
    }

    return flag;
}

function clearFields() {
    document.getElementById("tutor-name").value = "";
    document.getElementById("pet-name").value = "";
    document.getElementById("species").value = "";
    document.getElementById("image").value = "";
    document.getElementById("date").value = "";
}


function removePet(id) {
    petList.removePet(id);
}

function editPet(id) {
    const pet = petList.pets.find((pet) => pet.id === id);

    document.getElementById("tutor-name").value = pet.tutorName;
    document.getElementById("pet-name").value = pet.petName;
    document.getElementById("species").value = pet.species;
    document.getElementById("image").value = pet.image;
    document.getElementById("date").value = pet.date;

    document.getElementById("btn-add").classList.add("hidden");
    document.getElementById("btn-add").classList.remove("hidden");
    removePet(id);
    showLogin();
}

function favoritePet() {
    document.getElementById("favorite").classList.toggle("favorite");
}