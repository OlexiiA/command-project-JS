import searchMove from "./search-move";


// import genresArray from './genresArray';
const genresArray = {
     28: "Action",
     12: "Adventure",
     16: "Animation",
     35: "Comedy",
     80: "Crime",
     99: "Documentary",
     18: "Drama",
     10751: "Family",
     14: "Fantasy",
     36: "History",
     27: "Horror",
     10402: "Music",
     9648: "Mystery",
     10749: "Romance",
     878: "Science Fiction",
     10770: "TV Movie",
     53: "Thriller",
     10752: "War",
     37: "Western"
  }


const form = document.querySelector('form#search-form');
const gallery = document.querySelector('.film-card');


// const gallery = document.querySelector('.film-card');

let searchQuery = '';

export const formListener = form.addEventListener('submit', onSubmitForm)

function renderCard(arr) {
    const markup = arr.map(({ poster_path, release_date, title, genre_ids }) => {
        // заглушка на отсутствующий постер
        let poster = `https://image.tmdb.org/t/p/w780${poster_path}`
        if (poster_path === null) {
            poster = './src/images/not-found.png'
        }
        console.log(poster)
        // ================================
        let releaseYear = release_date.slice(0, 4);
         let genresText = [] //! Перевод ID жанра в текст
  genre_ids.forEach(genre => {
    genresText.push(genresArray[genre])
  });
  let genresTextWithCommas = genresText.map(genre => genre).join(', ')
        return `<li class="card gallery__item">
    <a href="#" class="card__link">
        <div class="card__wrapper-img">
        <img class="card__img" src="https://image.tmdb.org/t/p/w780/${poster}" alt="movie's poster">
        </div>
        <div class="card__wrapper">
        <h3 class="card__title">${title}</h3>
        <p class="card__info">${genresTextWithCommas} | <span class="card__info-genre">${releaseYear}</span></p>
        </div>
    </a>
  </li>`;
}).join('');
    gallery.insertAdjacentHTML('beforeend', markup)
}

async function onSubmitForm(event) {
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
            const allertNotFound = document.querySelector('.gallery')
            gallery.innerHTML = ''
            allertNotFound.innerHTML = '<h2 class="not-found">Sorry, nothing was found for your search.</h2>'
            // alert('Sorry, nothing was found for your search.')
        }
    }
    catch (error) {
        console.log(error)
        
    }
    

    form.reset()
 }