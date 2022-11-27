import genresData from './genres.json';
import axios from 'axios';

const KEY = 'api_key=2913964819360854cc0ff757d62600b5'

const searchBtn = document.querySelector('.genres-btn')
const select = document.querySelector('.genre-filter')
let genresList = []



searchBtn.addEventListener('click', showFilms)
select.addEventListener('change', onSelectChange)


async function genre(genresListWithCommas) {
   const apiData = await axios.get(
   `https://api.themoviedb.org/3/discover/movie?${KEY}&with_genres=${genresListWithCommas}`
   );
   return apiData;
}

const divRef = document.querySelector(`.film-card`)

function addMarkup(data) {
const tamplate = data.map(({ title, release_date, poster_path}) => {
   let releaseYear = release_date.slice(0, 4);
   return `<li class="card gallery__item">
      <a href="#" class="card__link">
         <div class="card__wrapper-img">
         <img class="card__img" src="https://image.tmdb.org/t/p/w780/${poster_path}" alt="movie's poster">
         </div>
         <div class="card__wrapper">
         <h3 class="card__title">${title}</h3>
         <p class="card__info"><span class="card__info-genre">${releaseYear}</span></p>
         </div>
      </a>
   </li>`;
   })
   .join('');
divRef.innerHTML = tamplate; 
};

function showFilms() { //! Рендер разметки по нажатию на кнопку
   let genresListWithCommas = genresList.map(genre => genre).join(',')
   genre(genresListWithCommas).then(res => addMarkup(res.data.results))
   
   console.log(genresListWithCommas);
}

function onSelectChange(event) { //! Добавляет в список жанры, если уже есть то удаляет
   if (genresList.includes(event.target.id)){
      genresList.splice(genresList.indexOf('event.target.id',1))
   } else {
      genresList.push(event.target.id)
   }
   console.log(genresList);
}