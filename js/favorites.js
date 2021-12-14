import { getExistingFavs } from "./utils/getExistingFavs.js";
import createMenu from "./ui/createMenu.js"; 

createMenu();

let favorites = getExistingFavs();

const favoritesContainer = document.querySelector(".favorites-container"); 
const clearAllButton = document.querySelector(".clear-button"); 

function showFavorites() {
    if(favorites.length === 0) {
        favoritesContainer.innerHTML = "You have not stored any favorites."
    }
    
    if(favorites.length > 0) {
        clearAllButton.style.display = "block";  
    }

    favorites.forEach((favoriteBook) => {
        favoritesContainer.innerHTML += `<div class="book-spesific-container">
                                            <div>
                                                <h2>${favoriteBook.title}</h2>
                                                <p>Author: ${favoriteBook.author}</p>
                                                <p>Summary: ${favoriteBook.summary}</p>
                                            </div>
                                            <div class="book-spesific-icon-container">
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-trash" data-id="${favoriteBook.id}"></i>
                                            </div>
                                        </div>`   
    });

    const trashCans = document.querySelectorAll(".fa-trash"); 

    trashCans.forEach(function(can) {
    can.addEventListener("click", removeFromList); 
    });
}

showFavorites()

function removeFromList(event) {
    for (let i = 0; i < favorites.length; i++) {
        if(favorites[i].id === event.target.dataset.id){
            favorites.splice(i, 1);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            location.reload();
            break;
        }
    }
}

clearAllButton.addEventListener("click", function() {
    localStorage.removeItem("favorites");
    favoritesContainer.innerHTML = "You have now removed your favorites."
    clearAllButton.style.display = "none";
});