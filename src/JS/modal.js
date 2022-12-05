import axios from 'axios';
import Notiflix from 'notiflix';

const closeBtn = document.querySelector('.close__btn');
const backdrop = document.querySelector('.modal__backdrop');
const galleryRef = document.querySelector('.gallery');
const modalRef = document.querySelector('.new-info');
const trailerRef = document.querySelector('.trailer-thumb')

let currentId = 0

closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModalBackdrop);
galleryRef.addEventListener('click', getModalCard);


// -----------------modal render code--------------------

let myLibraryList = {
  watchedList: [],
  queueList: [],
  }

function closeModal() {
  backdrop.classList.add('visually-hidden');
}

function openModal() {
  backdrop.classList.remove('visually-hidden');
}

function closeModalBackdrop(evt) {
  if (evt.target !== backdrop) {
    return
  } 
  closeModal();
}

async function loadMoreInfo(ID) {
  const KEY = 'api_key=2913964819360854cc0ff757d62600b5';
  const url = `https://api.themoviedb.org/3/movie/${ID}?${KEY}&language=en-US`;
  const answer = await axios.get(url).then(response => response.data);
  return answer;
}

function renderModal(ans) {
  const {
    poster_path,
    original_title,
    title,
    overview,
    popularity,
    vote_average,
    vote_count,
    genres,
  } = ans;
  // заглушка на отсутствующий постер
  let filmIMG = `https://image.tmdb.org/t/p/w780${poster_path}`;
  if (poster_path === null || poster_path === undefined) {
    filmIMG = './src/images/not-found.png';
  }
  // ================================
  let genresWords = genres.map(genre => genre.name).join(', ');
  const modalMarkup = `<div class="modal__img-thumb">
        <img
        class="modal__img"
        src="${filmIMG}"
        alt="${original_title}"
        />
        </div>
        <div class="modal__info">
        <h2 class="modal__title">${title}</h2>
        <ul class="modal__table">
        <li><span class="table__name">Vote / Votes</span><span class="table__value"><span class="orange">${Math.round(vote_average * 10) / 10}</span> / <span class="grey">${vote_count}</span></span></li>
        <li><span class="table__name">Popularity</span><span class="table__value">${Math.round(popularity * 10) / 10}</span></li>
        <li><span class="table__name">Original Title</span><span class="table__value">${original_title}</span></li>
        <li><span class="table__name">Genre</span><span class="table__value">${genresWords}</span></li>
        </ul>
        <h3 class="modal__about">about</h3>
        <p class="modal__descr">${overview}</p>
        <ul class="modal__btns">
        <li>
        <button type="button" class="button wtchd_btn">
        add to Watched
        </button>
        </li>
        <li>
        <button type="button" class="button queue_btn">add to queue</button>
        </li>
        <li>
        <button type="button" class="button trailer__btn">Show trailers</button>
        </li>
        </ul>
        </div>`;
  modalRef.insertAdjacentHTML('beforeend', modalMarkup);
}

async function getModalCard(evt) {
  if (evt.target.nodeName === "UL") {return}
  if (!evt.path.includes("li.card.gallery__item")) {
    openModal();
    currentId = evt.path.find(a => a.nodeName === "LI").id;
    let doModal = await loadMoreInfo(currentId);
    let trailerLinks = await loadTrailerInfo(currentId);
    try {
      if (doModal.original_title !== undefined) {
      modalRef.innerHTML = '';
        renderModal(doModal);
        renderTrailerList(trailerLinks);
        addToList();
        doTrailerListener();
      } else {
        modalRef.innerHTML = ''
        alert('Sorry, nothing was found for your search.')
      }
    } catch (error) {
      console.log(error);
    }
  }
}
//---------------------modal trailer code------------------------------

function doTrailerListener() {
  const trailerBtnRef = document.querySelector('.trailer__btn');
  trailerBtnRef.addEventListener('click', toggleVision);
}

function toggleVision(evt) {
  trailerRef.classList.toggle('visually-hidden');
  if (evt.target.innerHTML === 'Show trailers') {
    evt.target.innerHTML = 'Hide trailers'; 
  } else {evt.target.innerHTML = 'Show trailers'; }
}

async function loadTrailerInfo(ID) {
  const KEY = 'api_key=2913964819360854cc0ff757d62600b5';
  const url = `https://api.themoviedb.org/3/movie/${ID}/videos?${KEY}&language=en-US`;
  const answer = await axios.get(url).then(response => response.data);
  return answer;
}

function renderTrailer(answ) {
  const {
    key,
    name,
  } = answ;
  let resString = `<li class="trailer-item">
        <a
          class="trailer-link"
          href="https://www.youtube.com/watch?v=${key}"
          target="_blank"
          rel="noreferrer noopener"
          >${name}</a>
      </li>`;
  return resString;
}

function renderTrailerList(res) {
  if (res.results.length !== 0) {
    const trailerList = res.results.reduce((markup, line) => { return markup + renderTrailer(line); }, ``);
    trailerRef.innerHTML = trailerList;
  } else {
    Notiflix.Notify.failure('Trailers not found!');
    trailerRef.innerHTML = `<li class="trailer-item">
        <a
          class="trailer-link"
          href="https://www.youtube.com/watch?v=iUVNspaiBAo"
          target="_blank"
          rel="noreferrer noopener"
          >Oops! Nothing found. Chillout and try again later!</a>
      </li>`;}
}

// --------------------Local Storage code------------------------------

function addToList() {
  const addWatched = document.querySelector('.wtchd_btn')
  const addQueue = document.querySelector('.queue_btn')

  addWatched.addEventListener('click', addToWatched)
  addQueue.addEventListener('click', addToQueue)
}

function addToWatched(e) {
  if (!myLibraryList.queueList.includes(currentId) && !myLibraryList.watchedList.includes(currentId)) {  
    myLibraryList.watchedList.push(currentId);
    Notiflix.Notify.info('Film added to "Watched"');
  }
    else if(myLibraryList.queueList.includes(currentId)) {
    addToOtherList(currentId, myLibraryList.queueList, myLibraryList.watchedList);
    Notiflix.Notify.info('Film turned into "Watched"');
  }

  return localStorage.setItem('myLibraryList', JSON.stringify(myLibraryList))
}

function addToQueue(e) {
  if (!myLibraryList.queueList.includes(currentId) && !myLibraryList.watchedList.includes(currentId)) {   
    myLibraryList.queueList.push(currentId);
    Notiflix.Notify.info('Film added to "Queue"');
  }
  else if(myLibraryList.watchedList.includes(currentId)) {
    addToOtherList(currentId, myLibraryList.watchedList, myLibraryList.queueList);
    Notiflix.Notify.info('Film turned into "Queue"');
  }
  return localStorage.setItem('myLibraryList', JSON.stringify(myLibraryList))
}

function addToOtherList(id, removedList, pushedList) {
    const filmIndex = removedList.indexOf(id) 
    removedList.splice(filmIndex, 1)
    pushedList.push(id)
}

function localStorageCheck(){
if (!localStorage.getItem("myLibraryList")){
  myLibraryList = {
    watchedList: [],
    queueList: [],
  }
    } else {
    const savedItems = localStorage.getItem("myLibraryList");
    myLibraryList = JSON.parse(savedItems);
  }

  }

localStorageCheck()