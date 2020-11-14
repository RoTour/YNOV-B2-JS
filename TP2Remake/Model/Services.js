const characterService = (() => {
    function executeRequest(callback = null, url = "../characters.json", method = "GET", header = null, data = null) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status >= 200 && this.status < 300) {
                        if (callback) resolve(callback(this))
                        else resolve("Ok")
                    } else {
                        reject(
                            new Error("Error while requesting the server:  " + this.status + " " + this.statusText)
                        );
                    }
                }
            };
            request.open(method, url, true);
            if (header) request.setRequestHeader(header.name, header.value);
            request.send(data);
        })
    }

    return {
        getAll: () => executeRequest(
            (response) => {
                return JSON.parse(response.responseText)["characters"]
                    .map((it) =>
                        new Character(it.firstname, it.lastname, it.birthDate, it.hasSigned)
                    )
            }
        )
    }
})()