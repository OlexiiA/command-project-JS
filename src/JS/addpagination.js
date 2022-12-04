import axios from 'axios';
import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { addMarkup, getData } from './api-server';
// import { showFilms, genre } from './search_my_genres';
const API_KEY = 'api_key=2913964819360854cc0ff757d62600b5';
const KEY = 'api_key=2913964819360854cc0ff757d62600b5';
const refs = {
  currentPage: 1,
  keyWord: '',
  paginationBox: document.querySelector('.tui-pagination'),
};



export async function getTrending(api_key, media_type, time_window, page) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/${media_type}/${time_window}?${api_key}&page=${page}`
      );
    return response;
  } catch (error) {
    console.error(error);
  }
}

function goToStart() {
  window.scrollTo({ //! плавный скрол вверх
    top: 0,
    left: 0,
    behavior: "smooth",
  })
};

getTrending(API_KEY, 'movie', 'week', refs.currentPage)
  .then(res => {
    addMarkup(res.data.results);
    pagination.reset(res.data.total_results);
  });

const cardCollection = document.querySelector('.film-card');
const container = document.getElementById('pagination');


const options = {
  totalItems: 20,
  itemsPerPage: 20,
  visiblePages: 3,
  page: refs.currentPage,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(container, options);


pagination.on('beforeMove', e => {
    refs.currentPage = e.page;
    cardCollection.innerHTML = '';
    getTrending(API_KEY, 'movie', 'week', refs.currentPage)
      .then(res => {
        addMarkup(res.data.results)
      }).then(goToStart())
  })


const paginationSearch = new Pagination(container, options);
// ======================================================================
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



let searchQuery = '';

export const formListener = form.addEventListener('submit', onSubmitForm)

function renderCard(arr) {
    const markup = arr.map(({ poster_path, release_date, title, genre_ids, id }) => {
        // заглушка на отсутствующий постер
        let poster = `https://image.tmdb.org/t/p/w780${poster_path}`
        if (poster_path === null) {
            poster = 'https://upload.wikimedia.org/wikipedia/commons/2/26/512pxIcon-sunset_photo_not_found.png'
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
        <img class="card__img" src="${poster}" id="${id}" >
        </div>
        <div class="card__wrapper">
        <h3 class="card__title">${title}</h3>
        <p class="card__info">${genresTextWithCommas} | <span class="card__info-genre">${releaseYear}</span></p>
        </div>
    </a>
  </li>`;
    }).join('');
    gallery.innerHTML = '';
    gallery.insertAdjacentHTML('beforeend', markup)
}

export async function onSubmitForm(event) {
  event.preventDefault()
  refs.currentPage = 1;
  searchQuery = event.currentTarget.searchQuery.value.trim()
  if (searchQuery === '') {
    return
  }
  const searchResponse = await searchMove(searchQuery, refs.currentPage)
  try {
    if (searchResponse.total_results > 0) {
      renderCard(searchResponse.results)
      paginationSearch.reset(searchResponse.total_results);
      paginationSearch.on('beforeMove', e => {
        refs.currentPage = e.page;
        const keyWord = searchQuery;
        searchMove(keyWord, refs.currentPage)
          .then(res => {
            renderCard(res.results)
          }).then(goToStart())
      })
    } else {
      gallery.innerHTML = `<li>
            <img class="allert-box" src="https://i.postimg.cc/BnKVk1zL/sorry.jpg"></img>
            </li>`
    }
  }
  catch (error) {
    console.log(error)
        
  }
    

  form.reset()
}
//  ========================================================================
const paginationGenres = new Pagination(container, options);

const searchBtn = document.querySelector('.genres-btn')
const select = document.querySelector('.genre-filter')
let genresList = []

searchBtn.addEventListener('click', showFilms)
select.addEventListener('change', onSelectChange)


async function genre(genresListWithCommas, page) {
   const apiData = await axios.get(
   `https://api.themoviedb.org/3/discover/movie?${KEY}&with_genres=${genresListWithCommas}&page=${page}`
   );
   // console.log(apiData.data.results);
   return apiData;
}

const divRef = document.querySelector(`.film-card`)

function addMarkupGenre(data) {
const tamplate = data.map(({ title, release_date, poster_path, genre_ids, id}) => {
   let releaseYear = release_date.slice(0, 4);

   if (poster_path === null) { //! Проверка на пустую картинку
            poster = 'https://upload.wikimedia.org/wikipedia/commons/2/26/512pxIcon-sunset_photo_not_found.png'
      }
   
   let genresText = [] //! Перевод ID жанра в текст
   genre_ids.forEach(genre => {
      genresText.push(genresArray[genre])
   });
   let genresTextWithCommas = genresText.map(genre => genre).join(', ')

   return `<li class="card gallery__item rotateY" id="${id}">
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
divRef.innerHTML = tamplate; 
};

async function showFilms(e) { //! Рендер разметки по нажатию на кнопку
  e.preventDefault()
  refs.currentPage = 1;
  let genresListWithCommas = genresList.map(genre => genre).join(',')
  genre(genresListWithCommas, refs.currentPage).then(res => addMarkupGenre(res.data.results))
  console.log(genresListWithCommas);
  // paginationGenres.reset(genresListWithCommas.total_results)
  paginationGenres.on('beforeMove', e => {
    refs.currentPage = e.page;
    divRef.innerHTML = '';
    genre(genresListWithCommas, refs.currentPage)
      .then(res => {
        addMarkupGenre(res.data.results)
      }).then(goToStart())
  })
};

      
function onSelectChange(event) { //! Добавляет в список жанры, если уже есть то удаляет
   if (genresList.includes(event.target.id)){
      genresList.splice(genresList.indexOf('event.target.id',1))
   } else {
      genresList.push(event.target.id)
   }
   // console.log(genresList);
}




