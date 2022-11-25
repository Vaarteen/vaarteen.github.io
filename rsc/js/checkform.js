window.addEventListener("DOMContentLoaded", start);

function start() {
    const form = document.querySelector("form");
    form.addEventListener("submit", checkForm)
}

/**
 * Vérifie les données du formulaire.
 *
 * @returns true si le formulaire est correct, false sinon
 */
function checkForm() {
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const msg = document.getElementById("msg");
    if (checkEmpty(msg) || checkEmpty(subject) || !isEmail(email)) {
        return false;
    }
    return true;
}

/**
 * Vérifie si value est une chaine vide après suppression des espaces initiaux et finaux.
 *
 * @param {string} value La chaine à tester
 * @returns true si value est vide, false sinon
 */
function checkEmpty(value) {
    if (typeof value !== "string" || value.trim().length == 0) {
        return false;
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
    if (typeof value !== "string" || !value.match(/^.?.*@.?.*\.[a-zA-Z]{2,5}$/)) {
        return false;
    }
    return false;
}
