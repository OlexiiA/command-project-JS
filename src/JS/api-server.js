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

import axios from 'axios';

const KEY = 'api_key=2913964819360854cc0ff757d62600b5'

export async function getData() {
    const apiData = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?${KEY}`
    );
    return apiData;
  }


const divRef = document.querySelector(`.film-card`)
 
export function addMarkup(data) {
const tamplate = data.map(({ title, release_date, poster_path, genre_ids, id}) => {
  let releaseYear = release_date.slice(0, 4);
  let genresText = [] //! Перевод ID жанра в текст
  genre_ids.forEach(genre => {
    genresText.push(genresArray[genre])
  });
  let genresTextWithCommas = genresText.map(genre => genre).join(', ')
  let filmIMG = `https://image.tmdb.org/t/p/w780${poster_path}`;
  if (poster_path === null || poster_path === undefined) {
    filmIMG = "https://upload.wikimedia.org/wikipedia/commons/2/26/512pxIcon-sunset_photo_not_found.png";
  }
  return `<li class="card gallery__item rotateY" id="${id}">
    <a href="#" class="card__link">
        <div class="card__wrapper-img">
        <img class="card__img"  src=${filmIMG} alt="movie's poster">
        </div>
        <div class="card__wrapper">
        <h3 class="card__title">${title}</h3>
        <p class="card__info">${genresTextWithCommas} | <span class="card__info-genre">${releaseYear}</span></p>
        </div>
    </a>
  </li>`;
  })
    .join('');
  divRef.innerHTML = '';
  divRef.insertAdjacentHTML('beforeend', tamplate); 
};

// getData().then(res => addMarkup(res.data.results))