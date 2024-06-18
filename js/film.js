const queryString = new URL(window.location.origin+"/film.html?id="+localStorage.getItem("id"));
//Récupérer l'id dans le LocalStorage, sinon revenir à index
const paremeters = queryString.searchParams;
const id = paremeters.get("id");
if(id == null || id.trim() === "" || localStorage.getItem("id") === null)window.location = "index.html";
const API_KEY = "b17f4ca5";
let movie;
getMovie(id).then(data=>{
    movie = data;
    console.table(movie);
    

    const movieDiv = document.querySelector("article.main");
    movieDiv.querySelector('img').src = movie.Poster;
    movieDiv.querySelector('.title').innerHTML = movie.Title;
    movieDiv.querySelector('.year').innerHTML = movie.Year;
    movieDiv.querySelector('.rated').innerHTML = movie.Rated;
    movieDiv.querySelector('.runtime').innerHTML = movie.Runtime;
    movieDiv.querySelector('.genre').innerHTML = movie.Genre;
    movieDiv.querySelector('.director').innerHTML = movie.Director;
    movieDiv.querySelector('.actors').innerHTML = movie.Actors;
    movieDiv.querySelector('.plot').innerHTML = movie.Plot;
    movieDiv.querySelector('.country').innerHTML = movie.Country;
    movieDiv.querySelector('.rating').innerHTML = movie.imdbRating;
    //Insérer le plus de données dans le HTML

});

/**
 * 
 * @param {string} imdbID 
 * @returns {Object | void}
 */
async function getMovie(imdbID){
    //Récupérer le film mais en détails et un seul film
    try{
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`;
        const response = await fetch(url);
        const json = response.json();
        let results;
        await json.then(data => results = data);
        return results;
    }catch(error){
        console.error("error",error);
        return;
    }
}