const matchesService = (() => {

    function executeRequest(url, callback, method = "GET", header = null, data = null) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status >= 200 && this.status < 300) {
                        if(callback) resolve(callback(this))
                        else resolve("Ok")
                    } else {
                        reject(
                            new Error("Error while requesting the server:  " + this.status + " " + this.statusText)
                        );
                    }
                }
            };
            request.open(method, url, true);
            if(header) request.setRequestHeader(header.name, header.value);
            request.send(data);
        })
    }
    return {
        getAll: (params = "") => {
            return executeRequest(
                "https://js-ingesup-b2.herokuapp.com/matches?sort=-date&"+params,
                (response) => {
                    const result = JSON.parse(response.responseText).map((it) =>
                        new Match(it.id, it.homeTeam, it.visitorTeam, it.score, it.date ));
                    result.totalCount = response.getResponseHeader("X-Total-Count");
                    return result;
                }
            )
        },
        getById: (id) => {
            return executeRequest(
                "https://js-ingesup-b2.herokuapp.com/matches/" + id,
                (response) => {
                    const res = JSON.parse(response.responseText);
                    return new Match(res.id, res.homeTeam, res.visitorTeam, res.score, res.date);
                }
            )
        },
        updateMatch: (updatedMatchJSON, matchId) => {
            return executeRequest(
                "https://js-ingesup-b2.herokuapp.com/matches/"+matchId,
                null,
                'PUT',
                {name: "Content-Type", value: "application/json"},
                updatedMatchJSON
            )
        },
        postNewMatch: (newMatchJSON) => {
            return executeRequest(
                "https://js-ingesup-b2.herokuapp.com/matches",
                null,
                'POST',
                {name: "Content-Type", value: "application/json"},
                newMatchJSON
            )
        },
        deleteMatch: (id) => {
            return executeRequest(
                "https://js-ingesup-b2.herokuapp.com/matches/"+id,
                () => {
                    console.log("OK");
                    location.reload();
                },
                'DELETE'
            )
        }
    }
})();