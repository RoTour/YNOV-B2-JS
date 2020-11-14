async function postMatch(newMatch) {
    try {
        DOM.get("notice").innerText = "Uploading match..."
        await matchesService.postNewMatch(JSON.stringify(newMatch))
        DOM.get("notice").innerText = ""
    } catch (e) {
        DOM.get("notice").innerText = e.message;
    }
}

function buildMatchFromInputs() {
    return new Match(
        undefined,
        DOM.get("homeTeamField").value,
        DOM.get("visitorTeamField").value,
        [
            parseInt(DOM.get("homeTeamScore").value),
            parseInt(DOM.get("visitorTeamScore").value)
        ],
        new Date(DOM.get("matchDate").value)
    );
}

DOM.get("submitButton").addEventListener("click", () => {
    const newMatch = buildMatchFromInputs();
    postMatch(newMatch)
        .then(() => {
            window.location.replace("home.html")
        })
        .catch((error) => {
            DOM.get("notice").innerText =
                "ERROR while uploading to the server: " + error.message
        });
})