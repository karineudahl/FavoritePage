import { showAllBooks } from "./showAllBooks.js";

export function searchBooks(book) {
    const search = document.querySelector(".search"); 

    search.onkeyup = function() {
        const searchValue = event.target.value.trim().toLowerCase();
        
        const filteredBooks = book.filter(function(book) {
            if(book.title.toLowerCase().includes(searchValue)) {
                return true;
            }
        });

        showAllBooks(filteredBooks);
    }
}