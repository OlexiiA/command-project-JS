const modalRefs = {
  closeBtn: document.querySelector(".modal__close"),
  backdrop: document.querySelector(".modal__backdrop"),
};

refs.openModalBtn.addEventListener("click", toggleModal);
refs.closeModalBtn.addEventListener("click", toggleModal);

function toggleModal() {
  refs.modal.classList.toggle("is-hidden");
  refs.body.classList.toggle("no-scroll");
}