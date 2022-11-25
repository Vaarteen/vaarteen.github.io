window.addEventListener("DOMContentLoaded", start);

function start() {
    const form = document.querySelector("form");
    form.addEventListener("submit", checkForm)
}

/**
 * Vérifie les données du formulaire.
 */
function checkForm(evt) {
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const msg = document.getElementById("msg");
    // On nettoie les entrées
    msg.value = msg.value.trim();
    subject.value = subject.value.trim();
    email.value = email.value.trim();
    let isFormOk = true;
    if (checkEmpty(msg.value)) {
        showError(msg);
        isFormOk = false;
    } else {
        hideError(msg);
    }
    if (checkEmpty(subject.value)) {
        showError(subject);
        isFormOk = false;
    } else {
        hideError(subject);
    }
    if (!isEmail(email.value)) {
        showError(email);
        isFormOk = false;
    } else {
        hideError(email);
    }
    if (!isFormOk) {
        evt.preventDefault();
    }
}

/**
 * Vérifie si value est une chaine vide après suppression des espaces initiaux et finaux.
 *
 * @param {string} value La chaine à tester
 * @returns true si value est vide, false sinon
 */
function checkEmpty(value) {
    if (typeof value === "string" && value.length == 0) {
        return true;
    }
    return false;
}

/**
 * Vérifie si value est une adresse mail valide.
 *
 * @param {string} value La chaine à tester
 * @returns true si value est un email valide, false sinon
 */
function isEmail(value) {
    if (checkEmpty(value)) {
        return true;
    }
    if (typeof value === "string" && value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/g)) {
        return true;
    }
    return false;
}

/**
 * Affiche le message d'erreur associé à elt.
 *
 * @param {HTMLElement} elt L'élément en erreur
 */
function showError(elt) {
    const parent = elt.closest("div");
    parent.lastElementChild.classList.add("show");
}

/**
 * Cache le message d'erreur associé à elt.
 *
 * @param {HTMLElement} elt L'élément en erreur
 */
function hideError(elt) {
    const parent = elt.closest("div");
    parent.lastElementChild.classList.remove("show");
}
