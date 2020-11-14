const promiseCharacterService = () => {
    return {
        getAll: (url = "../characters.json") => new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        const rawCharacters = JSON.parse(this.responseText)["characters"];
                        let characters = rawCharacters.map((raw) =>
                            new Character(raw.firstname, raw.lastname, new Date(raw.birthdate)));
                        resolve(characters)
                    } else {
                        console.log(this.status, this.statusText);
                        reject(new Error("Network Error"))
                    }
                }
            };
            request.open('GET', url, true)
            request.send(null)
        })
    }
}
