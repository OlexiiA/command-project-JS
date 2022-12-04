import axios from 'axios';
import Pagination from 'tui-pagination';


let pageNumber = 0;
// const queueList = [13, 55, 123, 145, 158, 122, 67, 88, 95, 89, 81, 75, 86, 99, 83, 64, 77, 66, 87];
// const watchedList = [14,159,124,146,158,129,68,90,96,91,82,76,85,100,198,65,78,62,189];
const KEY = 'api_key=2913964819360854cc0ff757d62600b5'

const gallery = document.querySelector('.gallery--my-library')
const filmCard = document.querySelector('.film-card--my-library')
const queueButton = document.querySelector('.button-list__switch--queue')
const watchedButton = document.querySelector('.button-list__switch--watched')
const container = document.getElementById('pagination');
const clearBtn = document.querySelector('.button-clearer')


const savedItems = localStorage.getItem("myLibraryList");
let myLibraryList = JSON.parse(savedItems);


if (!localStorage.getItem("myLibraryList")) {
  myLibraryList ={
    watchedList: [],
    queueList: [],
  
  }
  localStorage.setItem('myLibraryList', JSON.stringify(myLibraryList)); 
}

clearBtn.addEventListener('click', clearAll)

function clearAll() {
  alert('Do you want to clear my-library?')
  clearGallery()
  myLibraryList ={
    watchedList: [],
    queueList: [],
  
  }
  localStorage.setItem('myLibraryList', JSON.stringify(myLibraryList));
  



  // if (queueButton.classList.contains('is-active')) {
  //   let watchedList = myLibraryList.watchedList.map(movie => movie)
  //   const clearedObject = {
  //     watchedList: [],
  //     queueList: [] 
  //   }
  //   localStorage.setItem('myLibraryList', JSON.stringify(clearedObject))
    
  //   watchedList = []

  //   return localStorage.setItem('myLibraryList', JSON.stringify(clearedObject))
    
  // } else if(watchedButton.classList.contains('is-active')){
  //   let queueList = myLibraryList.queueList.map(movie => movie)
  //   const clearedObject = {
  //     watchedList: [],
  //     queueList: queueList
  //   } 
  //   queueList = []
  //   return localStorage.setItem('myLibraryList', JSON.stringify(clearedObject))
    
  // }
}

const findMovieByID = async (id) => {
    const answer = await axios.get(`https://api.themoviedb.org/3/movie/${id}?${KEY}&language=en-US`).then(response => response.data);
    return answer
}


export function addMarkup({ title, release_date, poster_path, genres, id}) {
    
    let releaseYear = release_date.slice(0, 4);
   let genresTextWithCommas = genres.map(genre => genre.name).join(', ')
    
    const tamplate = 
  
    `<li class="card gallery__item rotateY" id="${id}">
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


function listLengthCalculation() {
    let length = 0;    
  if (myLibraryList.queueList === undefined || myLibraryList.watchedList === undefined) {
    return length = 0;
  } else if (queueButton.classList.contains('is-active')) {
    return length = myLibraryList.queueList.length
} else if (watchedButton.classList.contains('is-active')){
    return length = myLibraryList.watchedList.length
}
}

const options = {
  totalItems: listLengthCalculation(),
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
  filmCard.innerHTML = '';
  if (queueButton.classList.contains('is-active')) {
    showFilms(myLibraryList.queueList)
  }
  else {
    showFilms(myLibraryList.watchedList)
  }  
 
});
function pageNumberCalculation() {
    if (pageNumber > 1) {
        pageNumber = (pageNumber - 1) * 9
    }
    else if (pageNumber === 1) {
        pageNumber = pageNumber - 1
    }
}

async function showFilms(filmsList) { 
    clearGallery();
    pagination.reset()

    for (let i = pageNumber; i < pageNumber + 9; i++) {
       await findMovieByID(filmsList[i]).then(answer => addMarkup(answer));   
    } 
}



watchedButton.addEventListener('click', onWatchedButtonClick)
queueButton.addEventListener('click', onQueueButtonClick)

function onQueueButtonClick() {
    pageNumber = 0;
    const savedItems = localStorage.getItem("myLibraryList");
    const myLibraryList = JSON.parse(savedItems);
    queueButton.classList.add('is-active');
    watchedButton.classList.remove('is-active');

    showFilms(myLibraryList.queueList);
}

function onWatchedButtonClick() {
    pageNumber = 0;
    const savedItems = localStorage.getItem("myLibraryList");
    const myLibraryList = JSON.parse(savedItems);
    queueButton.classList.remove('is-active');
    watchedButton.classList.add('is-active');
    
    showFilms(myLibraryList.watchedList);
}



showFilms(myLibraryList.watchedList)
