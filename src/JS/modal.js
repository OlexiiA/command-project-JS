// import { save, load, remove } from "./storage";
import axios from 'axios';

const closeBtn = document.querySelector(".modal__close");
const backdrop = document.querySelector(".modal__backdrop");
const galleryRef = document.querySelector(".gallery");
const modalRef = document.querySelector(".new-info");

closeBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);
galleryRef.addEventListener("click", getModalCard);

function closeModal() {
  backdrop.classList.add("visually-hidden");
}

function openModal() {
  backdrop.classList.remove("visually-hidden");
}

function getModalCard(evt) {
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  openModal();
  const currentId = evt.target.id;
  const doModal = await loadMoreInfo(currentId);
  try {
    if (doModal.length > 0) {
      modalRef.innerHTML = ''
      renderModal(doModal.results)
    } else {
      modalRef.innerHTML = ''
      alert('Sorry, nothing was found for your search.')
    }
  }
  catch (error) {
    console.log(error)
  }
}

async function loadMoreInfo(ID) {
  const KEY = 'api_key=2913964819360854cc0ff757d62600b5'
  const url = `https://api.themoviedb.org/3/movie/${ID}?api_key=${KEY}&language=en-US`
  return await axios.get(url).then(response => response.data);
}

function renderModal(arr) {
  const modalMarkup = arr.map(({ poster_path, original_title, title, overview, popularity, vote_average, vote_count, genres}) => {
    // заглушка на отсутствующий постер
    let poster = `https://image.tmdb.org/t/p/w780${poster_path}`
    if (poster_path === null) {
      poster = './src/images/not-found.png'
    }
    // ================================
    let genresWords = [] //! Перевод массива жанров в текст
    genres.forEach(genre => {genresWords.push(JSON.parse(genre).name)});
    let genresTextWithCommas = genresText.map(genre => genre.join(', '))
    return `<div class="modal__img-thumb">
        <img
          class="modal__img"
          src="https://image.tmdb.org/t/p/w780/${poster_path}"
          alt="${original_title}"
        />
      </div>
      <div class="modal__info">
        <h2 class="modal__title">${title}</h2>
        <div class="modal__table">${vote_average}/${vote_count}, ${popularity}, ${original_title}, ${genresTextWithCommas}</div>
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
        </ul>
      </div>`;
  }).join('');
  modalRef.insertAdjacentHTML('beforeend', modalMarkup)
}