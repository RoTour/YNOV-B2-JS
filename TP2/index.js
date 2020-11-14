let students = [
    new Student("Mikasa", "Ackerman", new Date(1999, 1,10)),
    new Student("Eren", "Jaeger", new Date(2002,2,30)),
    new Student("Armin", "Arlert", new Date(2001,10,3))
]

let firstnameField = document.getElementById('firstnameInput')
let lastnameField = document.getElementById("lastnameInput")
let birthdateField = document.getElementById("birthdateInput")

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


// item is a Student
function createListElement(item) {
    let list = document.querySelector(".studentList")
    let newChild = document.createElement("li")
    let deleteButton = document.createElement("button")
    let characterName = document.createElement("p")
    characterName.innerText = item.getIdentity()
    characterName.addEventListener("click", () => {
        firstnameField.value = item.firstname
        lastnameField.value = item.lastname
        birthdateField.value = item.getBirthdateString()
        console.log(item.getBirthdateString())
    })

    deleteButton.onclick = () => {
        list.removeChild(newChild)
        students = students.filter(current => current !== item)
    }
    deleteButton.innerText = "X"

    newChild.appendChild(characterName)
    newChild.appendChild(deleteButton)

    list.appendChild(newChild)
}

function insertNewCharacter() {
    console.log("Creating character")
    let newCharacter = new Student(
        firstnameField.value,
        lastnameField.value,
        new Date(birthdateField.value)
    )
    students.push(newCharacter)
    createListElement(newCharacter)
}

students.forEach((item) => {
    console.log("adding student")
    createListElement(item)
})

document.getElementById("createStudentButton").addEventListener('click', (event) => {
    event.preventDefault()
})
document.getElementById("editStudentButton").addEventListener('click', (event) => {
    event.preventDefault()
})


