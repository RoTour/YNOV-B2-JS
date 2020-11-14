function clearList(list) {
    let child = list.lastElementChild
    while (child) {
        list.removeChild(child);
        child = list.lastElementChild
    }
}

function clearInputs() {
    firstnameField.value = "";
    lastnameField.value = "";
    birthdateField.value = undefined;
}

function hasSigned(item) {
    item.classList.toggle("hasSigned")
}

function populateList(characters) {
    clearList(list);
    charactersOnScreen = characters;
    console.log("filling list")
    characters.forEach((it) => list.appendChild(createListItem(it)));
}
