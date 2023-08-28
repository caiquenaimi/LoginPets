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
            showRender();
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

function verifyInputs() {
    let tutorName = document.getElementById("tutorName").value;
    let petName = document.getElementById("petName").value;
    let species = document.getElementById("species").value;
    let image = document.getElementById("image").value;
    let date = document.getElementById("date").value;

    let flag = false;

    if (tutorName == "") {
        sendMsg("Campo obrigatório", "error", "tutorName");
        flag = true;
    } else {
        sendMsg("", "", "name");
    }

    if (petName == "") {
        sendMsg("Campo obrigatório", "error", "petName");
        flag = true;
    } else {
        sendMsg("", "", "petName");
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
    } else {
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