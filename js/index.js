let isSearching = false;

searchBtn.addEventListener("click",()=>{
    let value = searchInput.value;
    if(value.trim() === "")return;
    else if(isSearching)return;
    const API_KEY = "b17f4ca5";
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${value}`;
    generateMovies(url);
})

/**
 * 
 * @param {string} link 
 */
async function generateMovies(link){
    movies.innerHTML = "";
    try{
        const response = await fetch(link);
        const json = response.json();
        let results;
        await json.then(data=>results = data.Search);

        let index = 0;
        for(let movie of results){
            if(movie.Type != "movie"){
                delete results[index];
            }
            index++;
        }

        for(let movie of results){
            if(movie || movie !== undefined){
                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie");
                movies.appendChild(movieDiv);
            }
        }

    }catch(error){
        console.log("error",error);
    }
    //Poster,title,year
}