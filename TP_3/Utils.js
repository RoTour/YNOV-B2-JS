function setClasses(classes, element){
    element.className = classes
    return element
}

function setInnerText(element, txt) {
    element.innerHTML = txt;
    return element;
}

function createLink(name, url, type = "success") {
    const newLink = document.createElement("a");
    newLink.href = url;
    newLink.innerText = name;
    newLink.className = "btn btn-"+type;
    return newLink;
}

function setParamToLink(link, paramName, paramValue) {
    const url = new URL(link.href);
    url.searchParams.append(paramName, paramValue);
    link.href = url;
    return link;
}

function encapInTd(...element) {
    const newTd = document.createElement("td");

    element.forEach((it) => {
        newTd.appendChild(it);
    })

    return newTd;
}

function getUrlVars() {
    let vars = {};
    window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        (m, key, value) => vars[key] = value
    );
    return vars;
}

