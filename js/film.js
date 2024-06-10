const queryString = window.location.search;
const paremeters = new URLSearchParams(queryString);
const id = paremeters.get("id");
if(id == null || id.trim() === "")window.location = "index.html";
const API_KEY = "b17f4ca5";
const movie = getMovie(id);
if(movie == null)window.location = "index.html";
console.log(movie);

/**
 * 
 * @param {string} imdbID 
 * @returns {Promise<Object>}
 */
async function getMovie(imdbID){
    try{
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`;
        const response = await fetch(url);
        return {};
    }catch(error){
        console.error("error",error);
        return null;
    }
}