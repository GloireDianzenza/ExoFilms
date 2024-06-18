let isSearching = false;
//Je n'ai pas envie d'exécuter à nouveau le fetch pendant qu'il est déjà utilisé

searchBtn.addEventListener("click",()=>{
    //Fonction pour commencer la recherche avec le click du bouton dans l'input, du moment que l'input n'est pas vide
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
    //Fonction qui génère une liste de films en fonction du link contenant le texte à rechercher
    isSearching = true;
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
                //Je limite la liste qu'aux films
            }
            index++;
        }

        for(let movie of results){
            //Le if permet d'éviter les variables movie vides
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


                movieDiv.addEventListener("click",()=>{
                    //Rajouter le imdbID dans le LocalStorage
                    localStorage.setItem("id",movie.imdbID);
                    window.location = `film.html?id=${movie.imdbID}`;
                })
            }
        }

    }catch(error){
        console.error("error",error);
    }
    isSearching = false;
    //Poster,title,year -> Ce qui sera affiché
}