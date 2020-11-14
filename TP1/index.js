let characters = [
    new Character("Mikasa", "Ackerman", new Date(1999, 1,10)),
    new Character("Eren", "Jaeger", new Date(2002,2,30)),
    new Character("Armin", "Arlet", new Date(2001,10,3))
]

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}



function createListElement(item) {
    let list = document.querySelector(".characters")
    let newChild = document.createElement("li")
    let deleteButton = document.createElement("button")
    let characterName = document.createElement("p")
    characterName.innerText = item.getIdentity()
    let agePopup = document.createElement("li")
    agePopup.innerText = item.getAge().toString()
    agePopup.classList.add("agePopup")
    characterName.onclick = () => {
        if(!newChild.isExpanded){
            newChild.isExpanded = true
            insertAfter(agePopup, newChild)
        } else {
            newChild.isExpanded = false
            list.removeChild(agePopup)
        }
    }
    deleteButton.onclick = () => {list.removeChild(newChild)
        if(newChild.isExpanded) list.removeChild(agePopup)
        characters = characters.filter(current => current !== item)
    }
    deleteButton.innerText = "X"

    newChild.appendChild(characterName)
    newChild.appendChild(deleteButton)

    list.appendChild(newChild)
}

function insertNewCharacter() {
    console.log("Creating character")
    let newCharacter = new Character(
        document.getElementById("firstnameInput").value,
        document.getElementById("lastnameInput").value,
        new Date(document.getElementById("birthdayInput").value)
    )
    characters.push(newCharacter)
    createListElement(newCharacter)
}

characters.forEach((item) => {
    createListElement(item)
})

document.getElementById("validateForm").addEventListener('click', (event) => {
    event.preventDefault()
})