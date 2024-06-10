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

                let image = document.createElement("img");
                image.src = movie.Poster;
                movieDiv.appendChild(image);

                let title = document.createElement("h2");
                title.classList.add('title');
                title.innerHTML = movie.Title;
                movieDiv.appendChild(title);
                
                let year = document.createElement("h3");
                year.classList.add('year');
                year.innerHTML = movie.Year;
                movieDiv.appendChild(year);
               
                let id = document.createElement("p");
                id.classList.add('imdbid');
                id.innerHTML = movie.imdbID;
                id.style.display = "none";
                movieDiv.appendChild(id);

                movies.appendChild(movieDiv);


                movieDiv.addEventListener("click",(event)=>{
                    let target = event.target.parentNode;
                    window.location = "film.html";
                })
            }
        }

    }catch(error){
        console.log("error",error);
    }
    //Poster,title,year
}