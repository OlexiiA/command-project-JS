import axios from 'axios';


export default async function searchMove(value, pageNumber) {
    const KEY = 'api_key=2913964819360854cc0ff757d62600b5'
    const url = 'https://api.themoviedb.org/3/search/movie'
    const filter = `?${KEY}&query=${value}&language=en-US&page=${pageNumber}&include_adult=false`
    return await axios.get(`${url}${filter}`).then(response => response.data);
  }