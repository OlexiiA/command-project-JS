import searchMove from "./search-move";

export const form = document.querySelector('form#search-form');
// const gallery = document.querySelector('.film-card');
let searchQuery = '';

const divRef = document.querySelector(`.film-card`)
function renderCard(arr) {
    const markup = arr.map(({ poster_path, release_date, title, original_title }) => {
        let releaseYear = release_date.slice(0, 4);
    return `<div class="film-card">
        <img class="film-photo"
          src="https://image.tmdb.org/t/p/w780${poster_path}"
          alt="Poster: ${original_title}" />
        <h2 class="film-title"> ${title} </h2>
        <p class="film-year"> ${releaseYear} </p>
      </div>`;  
}).join('');
    divRef.insertAdjacentHTML('beforeend', markup)
}

export async function onSubmitForm(event) {
    event.preventDefault()
    searchQuery = event.currentTarget.searchQuery.value.trim()
     if (searchQuery === '') {
        return
    }
    const searchResponse = await searchMove(searchQuery)
    try {
        console.log(searchResponse.results)
        console.log(searchResponse.total_pages)
        console.log(searchResponse.total_results)
        if (searchResponse.total_results > 0) {
            divRef.innerHTML = ''
            renderCard(searchResponse.results)
        }
    }
    catch (error) {
        console.log(error)
    }
    

    // form.reset()
 }