/* Constants(API, Key etc.) */
const api = "https://translate.yandex.net/api/v1.5/tr.json";
const keyLocation = "apikey.json";
let key = "";

/* Elements(Inputs, Buttons etc.) */
let sourceText = document.getElementById("sourceText");
let resultText = document.getElementById("resultText");
let languages = document.getElementById("languages");
let translateButton = document.getElementById("translateButton");

/* EventListeners */
languages.addEventListener("change", getTargetLanguage);
translateButton.addEventListener("click", translate);
document.addEventListener("DOMContentLoaded", function () {
    getApiKey(function (response) {
        key = response;
        console.log("Key: ", key);
    });
});

/*
    Your API key should be in a JSON file(same directory with JS file);

    File Name: apikey.json
    Format: { "key" : "paste api key here" }
*/

function getApiKey(callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.status === 200) {
            callback(JSON.parse(xhr.responseText).key);
        }
    }
    xhr.open("GET", keyLocation);
    xhr.send();
}

function getTargetLanguage() {
    return languages.value;
}

function showAlert(type, message) {
    const leftCard = document.querySelector(".left");

    const div = document.createElement("div");
    div.className = "alert alert-" + type;
    div.textContent = message;

    leftCard.appendChild(div);

    setTimeout(function () {
        div.remove();
    }, 1500);
}

function translate() {
    const targetLanguage = getTargetLanguage();

    if (targetLanguage === "none") {
        showAlert("warning", "Please select target language!")
    } else {
        const url = api + "/translate?key=" + key + "&text=" + sourceText.value + "&lang=" + targetLanguage;
        console.log("Request:", url);

        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status === 200) {
                resultText.innerText = JSON.parse(xhr.responseText).text;
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }
}
