// let menuOpenButton = document.querySelector(".main-menu__btn--open");
// let mainMenu = document.querySelector(".main-menu__list");
// let menuCloseButton = document.querySelector(".main-menu__btn--close");

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
        if(w >= 768 && menu.is(':hidden')) {
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


modal = $('.modal');
modalFail = $('.modal--fail');
modalSuccess = $('.modal--success');
modalButtonClose = $('.modal__btn');
submitButton = $('.form__submit');

modalButtonClose.on('click', function(e) {                   
    modal.addClass("display-none");
});

// $('.form__submit').on('click', function() {
//     $('input').filter(function(){
//         return $(this).toggleClass('empty', !this.value)
//     });
// });

// $("form button,form input[type='button'],input[type='submit']").on('click',
//                     function(t) {
//                         var test = true;
//                         var selecter
//                         if ($(this)[0].form) {
//                             selecter = $(this)[0].form
//                         } else if ($(this).attr('form')) {
//                             selecter = $('form[name=' + $(this).attr('form') + ']')
//                         } else {
//                             console.warn('где форма?')
//                             return true;
//                         }
//                         $(selecter).find('input[required]').each(function(index, element) {
//                             let x = $(element).val()
//                             if (x === false || x == '' || x == 'undefind') {
//                                 // console.log('X')
//                                 test = false
//                                 var tooltip = $('<span>', {
//                                     css: {
//                                         'width': 'fit - content',
//                                         'z-index': 9999,
//                                         'background': 'red',
//                                         'color': '#20272F',
//                                         'padding': '5px',
//                                         'border-radius': '2px'
//                                     },
//                                     html: '<i class="fas fa-exclamation-circle" style="color:gold;"></i> Не заполнено поле'
//                                 }).appendTo('body');
//                                 $(tooltip).offset({
//                                     top: $(element).offset().top - $(element).height() - 7,
//                                     left: $(element).offset().left
//                                 })
//                                 $(tooltip).fadeOut(0).fadeIn(500)
//                                 setTimeout(() => {
//                                     $(tooltip).fadeOut(500)
//                                     setTimeout(() => {
//                                         $(tooltip).remove()
//                                     }, 500);
//                                 }, 2500);

//                             } else {
//                                 // console.log('O')
//                             }
//                         });
//                         if (test) {
//                             eval($(t.currentTarget).attr('data-click'))
//                         }
//                     }
//                 )

// $(".form__submit").on("click", function(s) {
//     s.preventDefault();
//     var e = $(this).closest("form"),
//       n = !0;
//     return $("form").find("input.required").removeClass("error"), e.find("input.required, textarea.required").each(function() {
//       return "" === $(this).val() ? ($(this).addClass("error"), $(this).focus(), n = !1, !1) : void 0
//     }), n && ($("form").find("input.required, textarea.required").parent().removeClass("error"), e.submit()), !1
//   });