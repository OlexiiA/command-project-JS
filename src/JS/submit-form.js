import searchMove from "./search-move";

export const form = document.querySelector('form#search-form');
const gallery = document.querySelector('.film-card');
let searchQuery = '';

export function formListener() {form.addEventListener('submit', onSubmitForm)}

function renderCard(arr) {
    const markup = arr.map(({ poster_path, release_date, title, original_title }) => {
        let poster = `https://image.tmdb.org/t/p/w780${poster_path}`
        console.log(poster)
        if (poster_path === null) {
            poster = '../images/not-found.png'
        }
        console.log(poster)
        let releaseYear = release_date.slice(0, 4);
    return `<div class="film-card">
        <img class="film-photo"
          src=${poster}
          alt="Poster: ${original_title}" />
        <h2 class="film-title"> ${title} </h2>
        <p class="film-year"> ${releaseYear} </p>
      </div>`;  
}).join('');
    gallery.insertAdjacentHTML('beforeend', markup)
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
            gallery.innerHTML = ''
            renderCard(searchResponse.results)
        } else {
            gallery.innerHTML = ''
            alert('Sorry, nothing was found for your search.')
        }
    }
    catch (error) {
        console.log(error)
        
    }
    

    form.reset()
 }