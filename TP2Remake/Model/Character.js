class Character {

    constructor(firstname, lastname, birthDate, hasSigned = false) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthDate = birthDate;
        this.hasSigned = hasSigned;
    }

    getIdentity() {
        return`${this.firstname} ${this.lastname}`
    }
}