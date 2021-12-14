import { baseUrl } from "./settings/api.js";
import { getToken } from "./utils/storageLogin.js";
import { displayMessage } from "./ui/displayMessage.js";
import createMenu from "./ui/createMenu.js"; 

createMenu();

const form = document.querySelector("form"); 
const title = document.querySelector("#title"); 
const author = document.querySelector("#author"); 
const summary = document.querySelector("#summary"); 
const messageContainer = document.querySelector(".message-container"); 

form.addEventListener("submit", submitForm); 

function submitForm(event) {
    event.preventDefault(); 

    messageContainer.innerHTML = ""; 

    const titleValue = title.value.trim(); 
    const authorValue = author.value.trim(); 
    const summaryValue = summary.value.trim(); 

    // if(titleValue.length === 0 || authorValue,length === 0 || summaryValue === 0) {
    //     return displayMessage("warning", "Please fill out title, author and summary", ".message-container");
    // }

    addProduct(titleValue, authorValue, summaryValue);
}

async function addProduct(title, author, summary) {
    const url = baseUrl + "articles"; 

    const data = JSON.stringify({ title: title, author: author, summary: summary });

    const token = getToken();

    const options = {
        method: "POST", 
        body: data, 
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }; 

    try {
        const response = await fetch(url, options); 
        const json = await response.json(); 

        if(json.created_at) {
            displayMessage("allgood", "Book added to the list", ".message-container");
            form.reset(); 
        }

        if(json.error) {
            displayMessage("warning", json.message, ".message-container"); 
        }
    }
    catch(error) {
        displayMessage("warning", "An error occoured", ".message-container");
    }
}