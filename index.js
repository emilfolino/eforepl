import * as monaco from 'monaco-editor';
import config from './config/config.js';

(function IIFE() {
    const userHash = location.hash.replace("#", "");
    let url = config.url + "/load/" + userHash;

    let editor;
    let runButton = document.getElementById("run");

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        let assignment = document.getElementById("assignment-description");
        assignment.textContent = result.assignment;

        editor = monaco.editor.create(document.getElementById('editor'), {
            value: "",
            language: result.language,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            theme: "vs-dark",
        });

        runButton.addEventListener("click", function(event) {
            executeCode(event, editor.getModel().getValue(), userHash);
        });
    });
})();

function executeCode(event, editorValue, hash) {
    let encoded = btoa(editorValue);

    let data = {
        hash: hash,
        code: encoded,
    };

    fetch(config.url + "/save", {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        })
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            renderOutput(data.result);
        });
}

function renderOutput(output) {
    let outputElement = document.getElementById("output");

    outputElement.textContent = atob(output);
}
