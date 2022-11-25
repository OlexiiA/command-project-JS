import axios from 'axios';

async function getData() {
    const apiData = await axios.get(
      `https://api.themoviedb.org/3/movie/550?api_key=2913964819360854cc0ff757d62600b5`
    );
    return apiData;
  }
  
  export default { getData };