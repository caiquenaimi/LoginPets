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
        }
    }

    countPets() {
        return this.pets.length;
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

    showRender();


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
    let msg = "";
    let render = document.getElementById("pet-list");
    petList.pets.forEach(pet => {
        msg += `
        <div class="card" style="width: 18rem;">
        <img src="${pet.image}" alt="${pet.petName}">
                <h2>${pet.petName}</h2>
                <p>Tutor: ${pet.tutorName}</p>
                <p>Espécie: ${pet.species}</p>
                <p>Idade: ${pet.age}</p>
                <p>Data de nascimento: ${formatDate(pet.date)}</p>
                <button id= "edit" onclick="editPet(${pet.id})">✏️Editar</button>
                <button id="remove" onclick="removePet(${pet.id})">🗑️Remover</button>
        </div>
        `;
        render.innerHTML = msg;
    });

    const contador = petList.countPets()
    document.getElementById("contador").innerHTML = `Total: ${contador}`;

}

document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addPet();
    } else {
        return;
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
    petList.pets = petList.pets.filter(pet => { pet.id != id });
    showRender();
}