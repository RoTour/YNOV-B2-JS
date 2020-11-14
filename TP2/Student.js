class Student {


    constructor(firstname, lastname, birthdate) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
    }

    getIdentity() {
        return this.firstname + " " + this.lastname
    }

    getAge() {
        let ageDifMs = Date.now() - this.birthdate.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    getBirthdateString() {
        return this.birthdate.getFullYear() + '-' + this.birthdate.getMonth() + '-' + this.birthdate.getDay()
    }
}