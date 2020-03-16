let menuOpenButton = document.querySelector(".main-menu__btn--open");
let mainMenu = document.querySelector(".main-menu__list");
let menuCloseButton = document.querySelector(".main-menu__btn--close");

// Закрытие главного меню
menuCloseButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    mainMenu.classList.add("visually-hidden");
})

// Открытие главного меню
menuOpenButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    mainMenu.classList.remove("visually-hidden");
})

menuOpenButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    mainMenu.classList.remove("visually-hidden");
})