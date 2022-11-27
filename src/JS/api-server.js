
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
const tamplate = data.map(({ title, release_date, poster_path, genre_ids}) => {
  let releaseYear = release_date.slice(0, 4);
  
  let genresText = [] //! Перевод ID жанра в текст
  genre_ids.forEach(genre => {
    genresText.push(genresArray[genre])
  });
  let genresTextWithCommas = genresText.map(genre => genre).join(', ')

  return `<li class="card gallery__item">
    <a href="#" class="card__link">
        <div class="card__wrapper-img">
        <img class="card__img" src="https://image.tmdb.org/t/p/w780/${poster_path}" alt="movie's poster">
        </div>
        <div class="card__wrapper">
        <h3 class="card__title">${title}</h3>
        <p class="card__info">${genresTextWithCommas} | <span class="card__info-genre">${releaseYear}</span></p>
        </div>
    </a>
  </li>`;
  })
  .join('');
  divRef.insertAdjacentHTML('beforeend', tamplate); 
};

getData().then(res => addMarkup(res.data.results))