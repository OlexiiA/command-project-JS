import axios from 'axios';

const pageNumber = 1
const list = [13,55,123,145,158,122,67,88,95,89];
const KEY = 'api_key=2913964819360854cc0ff757d62600b5'

const gallery = document.querySelector('.gallery')
const filmCard = document.querySelector('.film-card')
const queueButton = document.querySelector('.button-list__switch--queue')
const watchedButton = document.querySelector('.button-list__switch--watched')

console.log(watchedButton);



const findMovieByID = async (id) => {
    const answer = await axios.get(`https://api.themoviedb.org/3/movie/${id}?${KEY}&language=en-US`).then(response => response.data);
    console.log(answer);
    return answer
}


export function addMarkup({ title, release_date, poster_path, genres}) {
    
    let releaseYear = release_date.slice(0, 4);
   let genresTextWithCommas = genres.map(genre => genre.name).join(', ')
    
    const tamplate = 
  
    `<li class="card gallery__item">
    <a href="#" class="card__link">
        <div class="card__wrapper-img">
        <img class="card__img" src="https://image.tmdb.org/t/p/w780/${poster_path}" alt="movie's poster">
        </div>
        <div class="card__wrapper">
        <h3 class="card__title">${title}</h3>
        <p class="card__info">${genresTextWithCommas} | <span class="card__info-genre">${releaseYear}</span></p>
        </div>
    </a>
  </li>`
  filmCard.insertAdjacentHTML('beforeend', tamplate); 
};

function clearGallery() {
    filmCard.innerHTML = '';
}

async function showWatchedFilms() { 
    clearGallery()
    for (let i = pageNumber - 1; i < pageNumber + 8; i++) {
       await findMovieByID(list[i]).then(answer => addMarkup(answer)); 
        
    } 
}
async function showQueueFilms() { 
    clearGallery()
    for (let i = pageNumber - 1; i < pageNumber + 8; i++) {
       await findMovieByID(list[i]).then(answer => addMarkup(answer)); 
        
    } 
}
showWatchedFilms(list)

queueButton.addEventListener('click', showQueueFilms)
watchedButton.addEventListener('click', showWatchedFilms)

