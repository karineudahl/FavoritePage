import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storageLogin.js";

export default function deleteButton(id) {
    const deleteButton = document.querySelector(".delete-button"); 

    deleteButton.onclick = async function() {
        console.log(id);

        const doDelete = confirm("Do you want to delete this book?")

        if(doDelete) {
            const url = baseUrl + "articles/" + id; 
            const token = getToken(); 
    
            const options = {
                method: "DELETE", 
                headers: {
                    Authorization: `Bearer ${token}`
                },
            };
    
            try {
                const response = await fetch(url, options); 
                const json = await response.json(); 
                
                location.href = "/";
            }
            catch(error) {
                console.log(error)
            }
        }
    }; 
}