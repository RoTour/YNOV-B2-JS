let characters = [];
let selectedCharacter = null;
let validated = false;

function fillInputsWith(character) {
    DOM.get("firstnameField").value = character.firstname;
    DOM.get("lastnameField").value = character.lastname;
    DOM.get("birthDateField").value = character.birthDate;
}

function selectChar(character) {

}

function populateTable(data, filtered = false) {
    clearChildrenOf("tableBody");
    const tableBody = DOM.get("tableBody");

    if (!filtered) {
        characters = data;
    }

    data.forEach((character) => {
        const newRow = DOM.create("tr");

        const nameBox = setInnerText(DOM.create("td"), character.getIdentity())
        nameBox.addEventListener("click", () => {
            if (validated) return;
            if (selectedCharacter && selectedCharacter === character) {
                selectedCharacter = null;
                clearInputs();
            } else {
                selectedCharacter = character;
                fillInputsWith(character);
            }
        })

        const deleteButton = DOM.create("button");
        deleteButton.innerText = "X";
        deleteButton.className = "btn btn-danger";
        deleteButton.addEventListener("click", () => {
            characters = characters.filter((it) => it !== character);
            populateTable(characters);
        })

        const signButton = DOM.create("input");
        signButton.type = "checkbox";
        signButton.checked = character.hasSigned;
        signButton.addEventListener("click", () => {
            character.hasSigned = signButton.checked;
        })

        newRow.appendChild(nameBox);
        newRow.appendChild(encapInTd(signButton, deleteButton));

        tableBody.appendChild(newRow);
        character.associatedRow = newRow;
        if (validated) highlightStudents()
    });

}

(async () => {
    try {
        DOM.get("infoNotice").innerText = `Loading data...`;
        characters = await characterService.getAll()
        console.log(characters);
        populateTable(characters);
        DOM.get("infoNotice").innerText = ``;
    } catch (e) {
        DOM.get("infoNotice").innerText = ``;
        DOM.get("errorNotice").innerText = `Error : ${e.message}; try refreshing the page`;
    }

})()

function getInputs() {
    return new Character(
        DOM.get("firstnameField").value,
        DOM.get("lastnameField").value,
        DOM.get("birthDateField").value
    );
}

function searchStudents(searchString) {

    const filteredList = characters
        .filter(it => it.getIdentity().toUpperCase().includes(searchString.toUpperCase()));

    populateTable(filteredList, true)
}

function highlightStudents() {
    characters.forEach((it) => {
        if (it.hasSigned) it.associatedRow.className = "highlighted"
    })
}


DOM.get("submitButton").addEventListener("click", () => {
    const newChar = getInputs();
    clearInputs();
    if (selectedCharacter) {
        // selectedCharacter = newChar;
        const idx = characters.findIndex((element) => element === selectedCharacter);
        characters[idx] = newChar;
    } else {
        characters.push(newChar);
    }
    populateTable(characters);
});

DOM.get("submitSearch").addEventListener("click", () => {
    searchStudents(DOM.get("searchField").value);
    if (validated) validateList();
});

function validateList() {
    DOM.selectAll("table input, table button, .edit-form *").forEach((it) => {
        it.disabled = true;
    })
}

DOM.get("validateButton").addEventListener("click", () => {
    if (!validated && confirm("Confirm list?")) {
        validated = true;
        validateList();
        highlightStudents();
    }
});