import { getUsername } from "../utils/storageLogin.js";

export default function createMenu() {
    const container = document.querySelector(".menu-container");
    const { pathname } = document.location; 
    const username = getUsername(); 
    
    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a> `

    if(username) {
        authLink = `<a href="add-books.html" class="${pathname === "/add-books.html" ? "active" : ""}">Add book |</a>
                    <span>Logged in as ${username}</span>`;
    }

    container.innerHTML =   `<div class="menu">
                                <a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Home |</a>
                                <a href="favorites.html" class="${pathname === "/favorites.html" ? "active" : ""}">Favorites |</a>
                                ${authLink}                            
                            </div>`
}