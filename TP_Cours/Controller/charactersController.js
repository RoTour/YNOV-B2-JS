let list = document.getElementById("characterList");
let firstnameField = document.getElementById('firstnameInput');
let lastnameField = document.getElementById("lastnameInput");
let birthdateField = document.getElementById("birthdateInput");
let charactersOnScreen = [];
let allCharacters = [];
let selectedChar = null;

function createListItem(newCharacter) {
    let newElement = {
        child: document.createElement("li"),
        deleteButton: document.createElement("button"),
        characterName: document.createElement("p"),
        signedCheckBox: document.createElement("input")
    };

    newElement.characterName.innerText = newCharacter.getIdentity();

    // Fill input fields with character is clicked
    newElement.child.addEventListener("click", () => {
        if (!newCharacter) return
        firstnameField.value = newCharacter.firstname;
        lastnameField.value = newCharacter.lastname;
        birthdateField.value = newCharacter.birthdate.toISOString().substr(0, 10);
        if (newElement.child.classList.contains("itemSelected")) {
            unselect(newCharacter, newElement);
        } else {
            for (let i = 0; i < list.children.length; i++) {
                list.children[i].classList.remove("itemSelected");
            }
            select(newCharacter, newElement)
        }
    });

    newElement.deleteButton.addEventListener("click", () => {
        list.removeChild(newElement.child);
        unselect(newCharacter);
        charactersOnScreen = charactersOnScreen.filter((it) => it !== newCharacter);
        newCharacter = null;
        console.log(charactersOnScreen)
    })

    newElement.deleteButton.innerText = "X";

    if(newCharacter.hasSigned) {
        newElement.signedCheckBox.checked = true;
        hasSigned(newElement.child);
    }
    newElement.signedCheckBox.type = "checkbox";
    newElement.signedCheckBox.addEventListener("change", () => {
        newCharacter.hasSigned = newElement.signedCheckBox.checked;
        hasSigned(newElement.child)
    })


    newElement.child.appendChild(newElement.characterName);
    const buttonsDiv = document.createElement("div");
    buttonsDiv.appendChild(newElement.signedCheckBox)
    buttonsDiv.appendChild(newElement.deleteButton)

    newElement.child.appendChild(
        buttonsDiv
    )
    // newElement.child.appendChild(newElement.signedCheckBox);
    // newElement.child.appendChild(newElement.deleteButton);

    return newElement.child
}

// Function called when CREATE CHARACTER Button is clicked
function newCharacterCreated() {
    let newCharacter = new Character(
        firstnameField.value,
        lastnameField.value.toUpperCase(),
        birthdateField.value ? new Date(birthdateField.value) : new Date()
    );
    charactersOnScreen.push(newCharacter)
    populateList(charactersOnScreen)
    clearInputs()
}

// Function called when EDIT CHARACTER Button is clicked
function editCharacter() {
    selectedChar.firstname = firstnameField.value;
    selectedChar.lastname = lastnameField.value.toUpperCase()
    selectedChar.birthdate = new Date(birthdateField.value)
    populateList(charactersOnScreen)
    unselect(selectedChar)
}

function unselect(character, associateListElmnt) {
    if (associateListElmnt) associateListElmnt.child.classList.remove("itemSelected");
    clearInputs();
    document.getElementById("createCharacterButton").disabled = false;
    document.getElementById("editCharacterButton").disabled = true;
    selectedChar = null;
}

function select(character, associateListElmnt) {
    associateListElmnt.child.classList.add("itemSelected");
    selectedChar = character;
    document.getElementById("createCharacterButton").disabled = true;
    document.getElementById("editCharacterButton").disabled = false;
}

function searchStudents(searchString) {
    const filteredList = allCharacters
        .filter(it => it.getIdentity().toUpperCase().includes(searchString.toUpperCase()));
    populateList(filteredList)
}

async function refreshFromJson() {
    try {
        allCharacters = await promiseCharacterService().getAll()
        populateList(allCharacters);
    } catch (e) {
        console.log(e)
    }
}

refreshFromJson()
