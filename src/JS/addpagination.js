import axios from 'axios';
import Pagination from 'tui-pagination';
import {addMarkup, getData} from './api-server';

const API_KEY = 'api_key=2913964819360854cc0ff757d62600b5';

const showLoader = () => {
  document.querySelector('body').classList.add('scroll-hidden');
  document.querySelector('.loader').classList.remove('is-hidden');
}

const hideLoader = () => {
  document.querySelector('body').classList.remove('scroll-hidden');
  document.querySelector('.loader').classList.add('is-hidden');
}

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

getTrending(API_KEY, 'movie', 'week', refs.currentPage)
  .then(data => {
    addMarkup(data.results);
    pagination.reset(data.total_results);
  })
  .then(hideLoader);

  
const container = document.getElementById('pagination-container');


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
  showLoader();
  getTrending(API_KEY, 'movie', 'week', refs.currentPage)
    .then(data => {
      addMarkup(data.results);
    })
    // .then(topFunction)
    .then(hideLoader);
});


function onSubmitBtnClick(e) {
  e.preventDefault();
  const keyWord = refs.keyWord;
  console.log(keyWord);
  showLoader();
  getSearch(keyWord, API_KEY, refs.currentPage)
    .then(data => {
      console.log(data.results);
      if (data.results.length === 0) {
        refs.alertBox.classList.remove('visually-hidden');
        refs.searchForm.reset();
        refs.cardCollection.innerHTML = '';
        pagination.reset(0);
        refs.paginationBox.classList.add('visually-hidden');
      } else {
        refs.paginationBox.classList.remove('visually-hidden');
        refs.alertBox.classList.add('visually-hidden');
        listMovies(data.results);
        paginationSearch.reset(data.total_results);
          paginationSearch.on('beforeMove', e => {
            refs.currentPage = e.page;
            getSearch(keyWord, API_KEY, refs.currentPage)
            .then(data => {
            listMovies(data.results);
        })
        .then(topFunction)
        .then(hideLoader);
        refs.searchForm.reset();
    });
      }
    })
    .then(hideLoader);
}