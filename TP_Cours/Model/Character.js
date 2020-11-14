class Character {

    constructor(firstname, lastname, birthdate, hasSigned = false) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.hasSigned =  hasSigned;
    }

    getIdentity() {
        return this.firstname + " " + this.lastname
    }

    getAge() {
        let ageDifMs = Date.now() - this.birthdate.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

}