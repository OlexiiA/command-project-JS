import axios from 'axios';
import Pagination from 'tui-pagination';
import addMarkup from './api-server';

const API_KEY = 'api_key=2913964819360854cc0ff757d62600b5';


const refs = {
  currentPage: 1,
  paginationBox: document.querySelector('.tui-pagination'),
};



async function getTrending(api_key, media_type, time_window, page) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/${media_type}/${time_window}?api_key=${api_key}&page=${page}`
      );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// getTrending(API_KEY, 'movie', 'week', refs.currentPage)
//   .then(data => {
//     addMarkup(data.results);
//     pagination.reset(data.total_results);
//   })
//   .then(hideLoader);

  
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

// pagination.on('beforeMove', e => {
//   refs.currentPage = e.page;
// //   showLoader();
//   getTrending(API_KEY, 'movie', 'week', refs.currentPage)
//     .then(data => {
//       addMarkup(data.results);
//     })
//     .then(topFunction)
//     .then(hideLoader);
// });
paganation.on('afterMove', (event) => {
     refs.currentPage = event.page;
     console.log(currentPage);
});

paganation.on('beforeMove', (event) => {
    refs.currentPage = event.page;

    
});


export default addpagination; 