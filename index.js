import * as monaco from 'monaco-editor';
import config from './config/config.js';

const userHash = location.hash;
console.log(config.url + "/load/" + userHash)
fetch(config.url + "/load/" + userHash)
.then(function(response) {
    console.log(response);
    return response.json();
})
.then(function(result) {
    let assignment = document.getElementById("assignment-description");
    assignment.textContent = result.assignment;

    monaco.editor.create(document.getElementById('editor'), {
        value: "",
        language: result.language,
        lineNumbers: "on",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        theme: "vs-dark",
    });
});
