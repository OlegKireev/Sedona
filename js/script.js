let menuOpenButton = document.querySelector(".main-menu__btn--open");
let mainMenu = document.querySelector(".main-menu__list");
let menuCloseButton = document.querySelector(".main-menu__btn--close");

// Закрытие главного меню
// menuCloseButton.addEventListener("click", function (evt) {
//     evt.preventDefault();
//     mainMenu.classList.add("display-none");
// })

// // Открытие главного меню
// menuOpenButton.addEventListener("click", function (evt) {
//     evt.preventDefault();
//     mainMenu.classList.remove("display-none");
// })


menu = $('.main-menu__list');
menuButtonOpen = $('.main-menu__btn--open');
menuButtonClose = $('.main-menu__btn--close');

// Прячем меню на мобильной версии если загрузился js 
$(document).ready (function(){
    var w = $(window).width(); 
    if(w < 768) {
        menu.hide();
    }
}); 

$(function() {

    // Открываем меню по кнопен "Бургер"
    menuButtonOpen.on('click', function(e) {
        e.preventDefault(); 
        menu.slideToggle();
    });
  
    // Показываем меню при увеличении ширины окна 
    $(window).resize(function(){
        var w = $(this).width(); 
        if(w > 768 && menu.is(':hidden')) {
        menu.removeAttr('style');
        }
    });
  
    // Прячем меню при усеньшении ширины окна 
    $(window).resize(function(){
        var w = $(this).width(); 
        if(w < 768) {
        menu.hide();
        }
    });

    // Закрываем меню по кнопке "Х"
    menuButtonClose.on('click', function(e) {                
        var w = $(window).width(); 
        if(w < 768 ) {
        menu.slideToggle(); 
        }
    });
//   $('.open-menu').height($(window).height());
});
