import { baseUrl } from "./settings/api.js";
import { displayMessage } from "./ui/displayMessage.js";
import { getToken } from "./utils/storageLogin.js";
import deleteButton from "./utils/deleteButton.js";
import createMenu from "./ui/createMenu.js"; 
 
createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if(!id) {
    document.location.href = "/"; 
}

const productUrl = baseUrl + "articles/" + id; 

const form = document.querySelector("form"); 
const title = document.querySelector("#title"); 
const author = document.querySelector("#author"); 
const summary = document.querySelector("#summary"); 
const messageContainer = document.querySelector(".message-container"); 
const idInput = document.querySelector("#id-input"); 
const loading = document.querySelector(".edit-loading"); 

(async function() {   
    try {
        const response = await fetch(productUrl); 
        const details = await response.json(); 

        title.value = details.title; 
        author.value = details.author; 
        summary.value = details.summary; 
        idInput.value = details.id; 

        deleteButton(details.id);
    }
    catch(error) {
        displayMessage("warning", "An error has occured", ".message-container");
    }
    finally {
        loading.style.display = "none"; 
        form.style.display = "block"; 
    }  
}) ();

form.addEventListener("submit", submitForm); 

function submitForm(event) {
    event.preventDefault(); 

    messageContainer.innerHTML = ""; 

    const titleValue = title.value.trim(); 
    const authorValue = author.value.trim(); 
    const summaryValue = summary.value.trim(); 
    const idValue = idInput.value;

    updateProduct(titleValue, authorValue, summaryValue, idValue); 
}

async function updateProduct(title, author, summary, id) {
    const url = baseUrl + "articles/" + id; 
    const data = JSON.stringify({ title: title, author: author, summary: summary });
    const token = getToken();

    const options = {
        method: "PUT", 
        body: data, 
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options); 
        const json = await response.json(); 
        console.log(json);
        
        if(json.updated_at) {
            displayMessage("allgood", "Book is updated", ".message-container");
        }

        if(json.error) {
            displayMessage("warning", json.message, ".message-container");
        }
    }
    catch (error) {
        console.log(error)
    }
}