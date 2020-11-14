let buttons = document.querySelectorAll("button");

buttons.forEach((it) => {
    it.addEventListener("click", (event) => event.preventDefault())
});


// Add Student Form Expand/Collapse
document.getElementById("addStudent").addEventListener("click", () => {
    document.getElementById("addEditForm").classList.toggle("hidden")
        ? document.getElementById("addStudent").innerText = "Expand Add Student Form"
        : document.getElementById("addStudent").innerText = "Collapse Add Student Form"
});

// SearchBar Expand/Collapse
const searchExColButton = document.getElementById("searchBar");
searchExColButton.addEventListener("click", () => {
    document.getElementById("searchBarForm").classList.toggle("hidden")
        ? searchExColButton.innerText = "Expand Search Bar"
        : searchExColButton.innerText = "Collapse Search Bar";
});

document.getElementById("search").addEventListener("click", () => {
    searchStudents(document.getElementById("searchField").value)
});

document.getElementById("searchField").addEventListener("keypress", () => {
    document.getElementById("searchField")
        ? document.getElementById("search").disabled = false
        : document.getElementById("search").disabled = true
});

