import axios from 'axios';
import Pagination from 'tui-pagination';


let pageNumber = 1
const list = [13,55,123,145,158,122,67,88,95,89,81,75,86,99,83,64,77,66,87,];
const KEY = 'api_key=2913964819360854cc0ff757d62600b5'

const gallery = document.querySelector('.gallery')
const filmCard = document.querySelector('.film-card')
const queueButton = document.querySelector('.button-list__switch--queue')
const watchedButton = document.querySelector('.button-list__switch--watched')
const container = document.getElementById('pagination');


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



const options = {
  totalItems: list.length,
  itemsPerPage: 9,
  visiblePages: 3,
  page: pageNumber,
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
    pageNumber = e.page;
    pageNumberCalculation()
    console.log(pageNumber);
  filmCard.innerHTML = '';
  if (queueButton.classList.contains('is-active')) {
    showQueueFilms()
  }
  else {
    showWatchedFilms()
  }  
 
});
function pageNumberCalculation() {
    if (pageNumber > 1) {
        pageNumber = (pageNumber - 1) * 9
        console.log(pageNumber);
    }
    else if (pageNumber === 1) {
        pageNumber = pageNumber - 1
    }
}

async function showWatchedFilms() { 
    clearGallery();
    pagination.reset()

    for (let i = pageNumber; i < pageNumber + 9; i++) {
        console.log(i);
       await findMovieByID(list[i]).then(answer => addMarkup(answer));   
    } 
}
async function showQueueFilms() { 
    clearGallery();
    pagination.reset()
    for (let i = pageNumber; i < pageNumber + 9; i++) {
       await findMovieByID(list[i]).then(answer => addMarkup(answer)); 
        
    } 
}
showWatchedFilms(list)

watchedButton.addEventListener('click', onQueueButtonClick)
queueButton.addEventListener('click', onWatchedButtonClick)

function onQueueButtonClick() {
    pageNumber = 0;
    queueButton.classList.remove('is-active');
    watchedButton.classList.add('is-active');
    showQueueFilms()
}

function onWatchedButtonClick() {
    pageNumber = 0;
    queueButton.classList.add('is-active');
    watchedButton.classList.remove('is-active');
   showWatchedFilms()
}








