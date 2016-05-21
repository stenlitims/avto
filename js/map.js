 var itemsDetector = [{
     id: 1,
     center: [55.76246, 37.719405],
     name: 'АВИАМОТОРНАЯ',
     title: 'Дворникова, 7',
     hours: 'с 8:00 до 20:00',
     phone: '+ 7 (495) 798 40 44'
            }, {
     id: 2,
     center: [55.833658, 37.402902],
     name: 'ВОЛОКОЛАМСКАЯ',
     title: 'Василия Петушкова, 3',
     hours: 'с 8:00 до 20:00',
     phone: '+ 7 (495) 798 40 44'
            }]



 ymaps.ready(init);
 var myMap;

 function init() {

     var mapSelector = 'map',
         center = [55.80396, 37.800393];
     if ($('#map2').length > 0) {
         mapSelector = 'map2';
         center = [55.80396, 37.600393];
     }

     myMap = new ymaps.Map(mapSelector, {
         center: center,
         zoom: 11,
         controls: ['zoomControl', 'searchControl', 'fullscreenControl']
     });
     var tpl = function (data) {
         var out = '<span class="t1">' + data.name + '</span>' +
             '<span class="t2">' + data.title + '</span>' +
             '<span class="t3">' + data.hours + '</span>' +
             '<span class="t4">' + data.phone + '</span>';
         return out;
     }
     var placemark = [];
     var createIco = function (item) {
         placemark[item.id] = new ymaps.Placemark(item.center, {
             balloonContent: tpl(item),
             index: item.id
         }, {
             preset: 'islands#icon',
             iconColor: '#0095b6'
         });
         myMap.geoObjects.add(placemark[item.id]);
     }
     for (var j = 0, m = itemsDetector.length; j < m; j++) {
         createIco(itemsDetector[j]);
     }

     $(document).on('click', '.js-adr-list a', function () {
         $('.js-adr-list a').removeClass('active');
         $(this).addClass('active');
         var id = $(this).data('id');
         placemark[id].balloon.open();

     });

     myMap.behaviors.disable('scrollZoom');

     myMap.geoObjects.events.add('click', function (e) {
         var id = e.get('target').properties.get('index');
     });

     $(document).click(function (event) {
         if (!$(event.target).is('.metka, ymaps span')) {
             $('.metka').removeClass('active');
             var id = $('.list-adress .item.active').data('id');
             if (id) placemark[id].balloon.close();
         }
     });
 }
