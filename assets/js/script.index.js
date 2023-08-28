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

