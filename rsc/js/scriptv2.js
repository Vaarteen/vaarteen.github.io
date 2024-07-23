window.addEventListener("DOMContentLoaded", updateContent);

/**
 * Mise à jour de tout le contenu de la page d'accueil
 */
async function updateContent() {
    let oldDay = showDate(Date.now());
    // Mise à jour de la date et de l'heure
    updateDate(oldDay);
    // Automatisation de la mise à jour toute les secondes
    setInterval(updateDate, 1000, oldDay);
    // Mise à jour de l'éphéméride, des températures et des prévision météo
    await updateEphemerisAndWeatherAndTemperature();
    // Mise à jour des saints du jour
    // pas besoin de await car pas de ligne suivante à exécuter
    updateSaints();
}

/**
 * Mise à jour de la date et de l'heure
 */
function updateDate(oldDay) {
    // On utilise la même date pour l'affichage de la date et de l'heure
    const now = Date.now();
    // On affiche la date et on la récupère pour vérifier le changement de jour
    const newDay = showDate(now);
    // On affiche l'heure
    showTime(now);
    // En cas de changement de jour on remet le contenu complet à jour
    if (!oldDay || oldDay !== newDay) {
        // On n'oublie pas de changer le jour de référence !
        oldDay = newDay;
        // On rappelle la fonction d'update
        updateContent();
    }
}

/**
 * Mise à jour des données concernant la météo, l'éphéméride et les températures.
 */
async function updateEphemerisAndWeatherAndTemperature() {
    try {
        const data = await getJSONData("https://www.prevision-meteo.ch/services/json/toulouse");
        showEphemeris(data);
        showWeather(data);
        showTemperature(data);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Mise à jour de la liste des saints du jour.
 * WARNING : nécessite la présence d'un outil permettant d'outrepasser les limite CORS
 */
async function updateSaints() {
    try {
        const data = await getJSONData("https://nominis.cef.fr/json/nominis.php");
        showSaints(data);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Affiche la date au format courant du navigateur sur la page d'accueil.
 *
 * @param {Number} value L'instant présent en millisecondes par rapport à l'epoch
 * @returns La date au format courant du navigateur
 */
function showDate(value) {
    const newDay = new Intl.DateTimeFormat()
        .format(value);
    document.getElementById("date")
        .textContent = newDay;
    return newDay;
}

/**
 * Affiche l'heure au format français hh:mm:ss sur la page d'accueil.
 *
 * @param {Number} value L'instant présent en milliseconde par rapport à l'epoch
 */
function showTime(value) {
    const locale = "fr-FR";
    const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };
    document.getElementById("time")
        .textContent = new Intl.DateTimeFormat(locale, options)
            .format(value);
}

/**
 * Affiche l'heure de lever et de coucher du soleil sur la page d'accueil.
 *
 * @param {Object} data Les données issues de l'API https://www.prevision-meteo.ch/
 */
async function showEphemeris(data) {
    document.getElementById("sunrise")
        .textContent = data.city_info.sunrise;
    document.getElementById("sunset")
        .textContent = data.city_info.sunset;
}

/**
 * Affiche les températures du jour sur la page d'accueil.
 *
 * @param {Object} data Les données issues de l'API https://www.prevision-meteo.ch/
 */
function showTemperature(data) {
    const minTemp = data.fcst_day_0.tmin;
    const maxTemp = data.fcst_day_0.tmax;
    const meanTemp = Math.round((minTemp + maxTemp) / 2);
    document.getElementById("minTemp")
        .textContent = minTemp;
    document.getElementById("maxTemp")
        .textContent = maxTemp;
    document.getElementById("meanTemp")
        .textContent = meanTemp;
}

/**
 * Affiche les prévision météo à 3 jours sur la page d'accueil.
 *
 * @param {Object} data Les données issues de l'API https://www.prevision-meteo.ch/
 */
function showWeather(data) {
    for (let d = 0; d < 3; d++) {
        const todayData = data[`fcst_day_${d}`];
        const todayElt = document.querySelector(`#day${d}Weather div:first-of-type`);
        const imgElt = document.querySelector(`#day${d}Weather img`);
        const conditionsElt = document.querySelector(`#day${d}Weather div:last-of-type`);
        todayElt.textContent = todayData.day_long;
        imgElt.src = todayData.icon;
        imgElt.alt = todayData.condition_key;
        conditionsElt.textContent = todayData.condition;
    }
}

/**
 * Affiche la liste des saints du jour sur la page d'accueil.
 *
 * @param {Object} data Les données issues de l'API https://nominis.cef.fr/json/nominis.php
 */
function showSaints(data) {
    document.getElementById("saints")
        .textContent = Object.keys(data.response.prenoms.majeurs)
            .join(", ");
}

/**
 * Collecte et retourne les données extraites d'une API fournissant des données en JSON.
 *
 * @param {String} url L'URL à contacter retournant des données au format JSON
 * @returns L'objet extrait de la réponse de l'API
 */
async function getJSONData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Données non collectées.");
        throw err;
    }
}
