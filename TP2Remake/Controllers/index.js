const get = (id) => document.getElementById(id);
const create = (element) => document.createElement(element);
const selectAll = (selectors) => document.querySelectorAll(selectors);

const DOM = {
    get,
    create,
    selectAll
}

DOM.selectAll("button").forEach((it) => {
    it.addEventListener("click", (button) => {
        button.preventDefault();
    })
})