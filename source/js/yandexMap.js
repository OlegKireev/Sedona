ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [34.86529365, -111.75496437],
            zoom: 7,
            controls: ['smallMapDefaultSet']
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Мы находимся здесь',
            balloonContent: 'ул. Большая Конюшенная д. 19/8'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            // iconImageHref: '../img/logo-mobile.svg',
            // Размеры метки.
            // iconImageSize: [113, 106],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            // iconImageOffset: [-47, -104]
        });

    myMap.geoObjects
        .add(myPlacemark)
});