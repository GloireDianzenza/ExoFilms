let isSearching = false;

searchBtn.addEventListener("click",()=>{
    let value = searchInput.value;
    if(value.trim() === "")return;
    else if(isSearching)return;
    const API_KEY = "b17f4ca5";
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${value}`;
    console.log(url);
})

/**
 * 
 * @param {string} link 
 */
async function generateMovies(link){

}