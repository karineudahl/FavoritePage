import { baseUrl } from "./settings/api.js";
import { displayMessage } from "./ui/displayMessage.js";
import { showAllBooks } from "./ui/showAllBooks.js";
import { searchBooks } from "./ui/searchBooks.js";
import createMenu from "./ui/createMenu.js"; 

createMenu()

const booksUrl = baseUrl + "articles";

(async function() {
    try {
        const response = await fetch(booksUrl);
        const books = await response.json();

        showAllBooks(books);
        searchBooks(books);
        
    } catch (error) {
        displayMessage("error", "An error has occoured", ".books-container");
    }
})();