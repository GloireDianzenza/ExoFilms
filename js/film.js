const queryString = window.location.search;
const paremeters = new URLSearchParams(queryString);
const id = paremeters.get("id");
if(id == null || id.trim() === "")window.location = "index.html";
const API_KEY = "b17f4ca5";
let movie;
getMovie(id).then(data=>console.log(data));
console.log(movie);

/**
 * 
 * @param {string} imdbID 
 * @returns {Object}
 */
async function getMovie(imdbID){
    try{
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`;
        const response = await fetch(url);
        const json = response.json();
        let results;
        await json.then(data => results = data);
        movie = results;
    }catch(error){
        console.error("error",error);
        return;
    }
}