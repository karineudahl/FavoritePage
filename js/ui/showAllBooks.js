import { getExistingFavs } from "../utils/getExistingFavs.js";

export function showAllBooks (books) {
    const booksContainer = document.querySelector(".books-container");
    booksContainer.innerHTML = "";
    const favourites = getExistingFavs();

    books.forEach(function (book) {
        let starIcon = "far"; 
        const doesObjectExist = favourites.find(function (fav) {
            return parseInt(fav.id) === book.id;
        });

        if(doesObjectExist) {
            starIcon = "fas"; 
        }

        booksContainer.innerHTML += `<div class="book-spesific-container">
                                        <div>
                                            <a href="edit-books.html?id=${book.id}">${book.title}</a>
                                            <p>Author: ${book.author}</p>
                                            <p>Summary: ${book.summary}</p>
                                        </div>
                                        <div class="book-spesific-icon-container">
                                            <i class="${starIcon} fa-star" data-id="${book.id}" data-title="${book.title}" data-author="${book.author}" data-summary="${book.summary}"></i>
                                        </div>
                                    </div>`
    });

    const favButtons = document.querySelectorAll(".book-spesific-icon-container i"); 

    favButtons.forEach(function (button) {
        button.addEventListener("click", handleClick);
    });

    function handleClick() {

        this.classList.toggle("fas")
        this.classList.toggle("far")

        const id = this.dataset.id;
        const title = this.dataset.title;
        const author = this.dataset.author;
        const summary = this.dataset.summary;

        const currentFavs = getExistingFavs();

        const favoriteExist = currentFavs.find(function(fav) {
            return fav.id === id;
        });

        if(favoriteExist === undefined) {
            const books = { id: id, title: title, author: author, summary: summary}; 
            currentFavs.push(books);
            saveFavs(currentFavs);
        } 
        else {
            const newFavs = currentFavs.filter(fav => fav.id !== id);
            saveFavs(newFavs);
        }
    }

    function saveFavs(favs) {
        localStorage.setItem("favorites", JSON.stringify(favs));
    }
}