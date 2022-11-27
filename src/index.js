import './JS/switcher';

import API from "./JS/api-server";

//! Пример запроса на популярные 20 фильмов (первая загрузка)
const popularForDay = 'trending/all/day'
let proba = API.getData(popularForDay)
console.log(proba);