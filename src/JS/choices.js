import Choices from 'choices.js';
let selectStateInputEl = document.querySelector('.genre-filter');
const choices = new Choices(selectStateInputEl, {
  searchEnabled: false,
  itemSelectText: '',
});
let selectGenre = document.querySelector('.genre');
const choicesgenre = new Choices(selectGenre, {
  itemSelectText: '',
});
