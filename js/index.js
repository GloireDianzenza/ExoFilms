let isSearching = false;

searchBtn.addEventListener("click",()=>{
    let value = searchInput.value;
    if(value.trim() === "")return;
    else if(isSearching)return;
})