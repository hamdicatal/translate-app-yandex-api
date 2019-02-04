/*
    - Your API key should be in a JSON file(same directory with JS file);

    File Name: apikey.json
    Format: { "key" : "paste api key here" }

    - You can get your key from here; https://translate.yandex.com/developers/keys
*/

//constants(api, key etc.)
const api = "https://translate.yandex.net/api/v1.5/tr.json";
const keyLocation = "apikey.json";
let key = "";

// dom elements
let sourceText = document.getElementById("sourceText");
let resultText = document.getElementById("resultText");
let languages = document.getElementById("languages");
let translateButton = document.getElementById("translateButton");

// eventListeners
languages.addEventListener("change", getTargetLanguage);
translateButton.addEventListener("click", translate);
document.addEventListener("DOMContentLoaded", function () {
    getApiKey(function (response) {
        key = response;
        console.log("Key: ", key);
    });
});

// for getting api key from json file
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

// get target language from select box
function getTargetLanguage() {
    return languages.value;
}

// for alert messages
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

// translate text to target language from source language(auto detect by api)
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
