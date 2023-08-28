class Pet {
    constructor(tutorName, petName, species, image, date, age) {
        this.tutorName = tutorName;
        this.petName = petName;
        this.species = species;
        this.image = image;
        this.date = date;
        this.age = this.calculateAge();
    }

    calculateAge() {
        let today = new Date();
        let birthDate = new Date(this.date);
        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();

        return (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) ? age - 1 : age;
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
    let render = document.getElementById("result");
    petList.pets.forEach(pet => {
        msg += `
        <div class="card" style="width: 18rem;">
        <img src="${pet.image}" alt="${pet.name}">
                <h2>${pet.name}</h2>
                <p>Tutor: ${pet.tutorName}</p>
                <p>Espécie: ${pet.species}</p>
                <p>Idade: ${pet.age}</p>
                <p>Data de nascimento: ${formatDate(pet.date)}</p>
        </div>
        `;
        render.innerHTML = msg;
    });
}

function isURLValid(url) {
    if (url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".gif") || url.endsWith(".jpeg")) {
        return true;
    } else {
        return false;
    }
}

function showList() {
    if (petList.pets.lenght == undefined ) {
        msgEmpty("Não há pets cadastrados" ,"error");
        return;
    }
    else {
        console.log("o",petList.pets.lenght);
        console.log("Passou pela funcao showList()");
        document.getElementById("form-container").classList.add("hidden");
    }
}

function showLogin() {
    document.getElementById("form-container").classList.remove("hidden");
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