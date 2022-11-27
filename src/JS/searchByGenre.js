// import genresData from './genres.json';
// import { API_service } from './api-server';
// import renderFilmsMarkup from '';

// const filmsApi = new API_service();
// const select = document.querySelector('.genre');

// select.addEventListener('change', onSelectChange);

// async function onSelectChange() {
//   try {
//     filmsApi.genreId = genresData
//       .filter(({ name }) => name === select.value)
//       .map(({ id }) => id)
//       .join('');

//     const films = await filmsApi.fetchMovieByGenre();
//     renderFilmsMarkup(films);
//   } catch (error) {
//     console.log(error);
//   }
// }
