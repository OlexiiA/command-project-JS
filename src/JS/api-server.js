import axios from 'axios';

const KEY = 'api_key=2913964819360854cc0ff757d62600b5'

async function getData(reqest) {
    const apiData = await axios.get(
      `https://api.themoviedb.org/3/${reqest}?${KEY}`
    );
    return apiData.data.results;
  }
  
  export default { getData };