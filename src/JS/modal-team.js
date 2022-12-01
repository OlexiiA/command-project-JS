const open = document.querySelector('.footer__button')
const close = document.querySelector('.btn-close')
const team = document.querySelector('.backdrop-team')

open.addEventListener('click', openModal)
close.addEventListener('click', closeModal)

function openModal() {
   team.classList.remove('is-hidden');
}
// my
function closeModal() {
   team.classList.add('is-hidden');
}