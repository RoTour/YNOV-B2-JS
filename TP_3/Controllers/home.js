let matches = [];
let pageManager = {
    pageIndex: 1,
    NB_ITEM_PER_PAGE: 10
}


function setButtons() {
    DOM.get("pageNext").disabled = pageManager.isLastPage
    DOM.get("pagePrevious").disabled = pageManager.pageIndex === 1
    DOM.get("pageNumber").innerText = pageManager.pageIndex;
}

async function loadMatches() {
    try {
        DOM.get("notice").innerText = "LOADING"
        matches = await matchesService.getAll(`size=${pageManager.NB_ITEM_PER_PAGE}&page=${pageManager.pageIndex}`);
        populateList(matches);
        pageManager.isLastPage = matches.totalCount <= pageManager.NB_ITEM_PER_PAGE * pageManager.pageIndex;
        setButtons()
        DOM.get("notice").innerText = "";
    } catch (e) {
        DOM.get("notice").innerText = e.message;
    }
}

function clearList() {
    const parent = DOM.get("matchesTableBody");
    while (parent.firstChild) { parent.firstChild.remove(); }
}

function populateList(matches) {
    clearList();
    const tableBody = DOM.get("matchesTableBody");
    matches.forEach(it => {
        const newRow = DOM.create("tr");
        newRow.appendChild(setInnerText(DOM.create("td"), it.homeTeam));
        newRow.appendChild(setInnerText(DOM.create("td"), " [" + it.score[0] + "-" + it.score[1] + "] "));
        newRow.appendChild(setInnerText(DOM.create("td"), it.visitorTeam));
        newRow.appendChild(
                encapInTd(
                    setParamToLink(createLink("Edit", "editmatch.html", "primary"), "id", it.id),
                        createLink("Delete", `javascript: matchesService.deleteMatch("${it.id}")`, "danger")
                )
        );
        tableBody.appendChild(newRow);
    })
}

DOM.get("pagePrevious").addEventListener("click", () => {
    pageManager.pageIndex--;
    loadMatches();
})

DOM.get("pageNext").addEventListener("click", () => {
    pageManager.pageIndex++;
    loadMatches();
})



loadMatches();