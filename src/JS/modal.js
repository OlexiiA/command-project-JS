const closeBtn = document.querySelector(".modal__close");
const backdrop = document.querySelector(".modal__backdrop");

closeBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

function closeModal() {
  backdrop.classList.add("visually-hidden");
}

