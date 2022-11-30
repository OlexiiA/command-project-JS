import { save, load, remove } from "./storage";
import axios from 'axios';

const closeBtn = document.querySelector('.modal__close');
const backdrop = document.querySelector('.modal__backdrop');
const galleryRef = document.querySelector('.gallery');
const modalRef = document.querySelector('.new-info');


closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
galleryRef.addEventListener('click', getModalCard);

function closeModal() {
  backdrop.classList.add('visually-hidden');
}

function openModal() {
  backdrop.classList.remove('visually-hidden');
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
        <div class="modal__table">${vote_average}/${vote_count}, ${popularity}, ${original_title}, ${genresWords}</div>
        <h3 class="modal__about">about</h3>
        <p class="modal__descr">${overview}</p>
        <ul class="modal__btns">
        <li>
        <button type="button" class="button wtched_btn">
        add to Watched
        </button>
        </li>
        <li>
        <button type="button" class="button queue_btn">add to queue</button>
        </li>
        </ul>
        </div>`;
        
  modalRef.insertAdjacentHTML('beforeend', modalMarkup);
}

async function getModalCard(evt) {
  if (!evt.path.includes("li.card.gallery__item")) {
    openModal();
    const currentId = evt.path.find(a => a.nodeName === "LI").id;
    let doModal = await loadMoreInfo(currentId);
    console.log('doModal', doModal);
    try {
      if (doModal.original_title !== undefined) {
      modalRef.innerHTML = '';
        renderModal(doModal);
        // addToList();
      } else {
        modalRef.innerHTML = ''
        alert('Sorry, nothing was found for your search.')
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// const myLibraryList = {
//   watchedList: [],
//   queueList: [],
// }

// function addToList() {
//   const addWatched = document.querySelector('.wtched_btn')
//   const addQueue = document.querySelector('.queue_btn')

//   addWatched.addEventListener('click', addToWatched)
//   addQueue.addEventListener('click', addToQueue)
// }


// function addToWatched(e) {
//   console.log(e);
// }

// function addToQueue(e) {
//   console.log(2);
// }
// function addToOtherList(id, removedList, pushedList) {
//     const filmIndex = removedList.indexOf(id) 
//     removedList.splice(filmIndex, 1)
//     pushedList.push(id)
// }