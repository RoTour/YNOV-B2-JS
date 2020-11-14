const form = DOM.get("editForm");
let match;

async function getSelectedMatch() {
    try {
        let vars = getUrlVars();
        match = await matchesService.getById(vars.id);
        form.elements.homeTeam.value = match.homeTeam;
        form.elements.visitorTeam.value = match.visitorTeam;
        form.elements.homeTeamScore.value = match.score[0];
        form.elements.visitorTeamScore.value = match.score[1];
        form.elements.matchDate.value = match.date.substr(0,10);
    } catch (e) {
        document.getElementById("notice").innerText = e.message;
    }
}

async function updateMatch(editedMatch) {
    try {
        DOM.get("notice").innerText = "Uploading match..."
        await matchesService.updateMatch(JSON.stringify(editedMatch), editedMatch.id)
        DOM.get("notice").innerText = ""
    } catch (e) {
        DOM.get("notice").innerText = e.message;
    }
}

function buildMatchFromInputs() {
    return new Match(
        getUrlVars().id,
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
    const editedMatch = buildMatchFromInputs();
    updateMatch(editedMatch)
        .then(() => {
            window.location.replace("home.html")
        })
        .catch((error) => {
            DOM.get("notice").innerText =
                "ERROR while uploading to the server: " + error.message
        });
})

getSelectedMatch();
