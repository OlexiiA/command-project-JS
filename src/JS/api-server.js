import axios from 'axios';

const KEY = 'api_key=2913964819360854cc0ff757d62600b5'
const popularForDay = 'trending/all/day'

async function getData() {
    const apiData = await axios.get(
      `https://api.themoviedb.org/3/${popularForDay}?${KEY}`
    );
    return apiData.data.results;
  }
  
  export default { getData };