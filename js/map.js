 var itemsDetector = [{
     id: 1,
     center: [55.76246, 37.719405],
     name: 'АВИАМОТОРНАЯ',
     title: 'Дворникова, 7',
     hours: 'с 8:00 до 20:00',
     phone: '+ 7 (495) 798 40 44',
     mapSelector: 'map-avia',
     modalSelector: 'modal-avia'
            }, {
     id: 2,
     center: [55.833658, 37.402902],
     name: 'ВОЛОКОЛАМСКАЯ',
     title: 'Василия Петушкова, 3',
     hours: 'с 8:00 до 20:00',
     phone: '+ 7 (495) 798 40 44',
     mapSelector: 'map-voloko',
     modalSelector: 'modal-voloko'
            }];

 function tpl(data) {
     var out = '<span class="t1">' + data.name + '</span>' +
         '<span class="t2">' + data.title + '</span>' +
         '<span class="t3">' + data.hours + '</span>' +
         '<span class="t4">' + data.phone + '</span>';
     return out;
 }

 function createIco(item, placemark, id) {
     if (!id) id = item.id;
     placemark[id] = new ymaps.Placemark(item.center, {
         balloonContent: tpl(item),
         index: id
     }, {
         preset: 'islands#icon',
         iconColor: '#0095b6'
     });
     myMap.geoObjects.add(placemark[id]);
 }

 var myMap;


 var oMap = {
     mapMain: function () {
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
         var placemark = [];

         for (var j = 0, m = itemsDetector.length; j < m; j++) {
             createIco(itemsDetector[j], placemark);
         }
         myMap.behaviors.disable('scrollZoom');

         myMap.geoObjects.events.add('click', function (e) {
             var id = e.get('target').properties.get('index');
         });

         $(document).on('click', '.js-adr-list a', function () {
             $('.js-adr-list a').removeClass('active');
             $(this).addClass('active');
             var id = $(this).data('id');
             placemark[id].balloon.open();

         });
         $(document).click(function (event) {
             if (!$(event.target).is('.metka, ymaps span')) {
                 $('.metka').removeClass('active');
                 var id = $('.list-adress .item.active').data('id');
                 if (id) placemark[id].balloon.close();
             }
         });

     },
     mapAvia: function () {
         var mapId = 0;
         if (!$('#' + itemsDetector[mapId].mapSelector).length > 0) return false;
         myMap = new ymaps.Map(itemsDetector[mapId].mapSelector, {
             center: itemsDetector[mapId].center,
             zoom: 14,
             controls: ['zoomControl', 'fullscreenControl']
         });
         var placemark = [];
         createIco(itemsDetector[mapId], placemark);

         myMap.behaviors.disable('scrollZoom');

     },
     mapAviaModal: function () {
         var mapId = 0;
         if (!$('#' + itemsDetector[mapId].modalSelector).length > 0) return false;
         myMap = new ymaps.Map(itemsDetector[mapId].modalSelector, {
             center: itemsDetector[mapId].center,
             zoom: 14,
             controls: ['zoomControl', 'fullscreenControl']
         });
         var placemark = [];
         createIco(itemsDetector[mapId], placemark);

         myMap.behaviors.disable('scrollZoom');

     },
     mapVoloko: function () {
         var mapId = 1,
             mapSelector = itemsDetector[mapId].mapSelector;
         if (!$('#' + mapSelector).length > 0) return false;
         myMap = new ymaps.Map(mapSelector, {
             center: itemsDetector[mapId].center,
             zoom: 14,
             controls: ['zoomControl', 'fullscreenControl']
         });
         var placemark = [];
         createIco(itemsDetector[mapId], placemark);

         myMap.behaviors.disable('scrollZoom');
     },
     mapVolokoModal: function () {
         var mapId = 1,
             mapSelector = itemsDetector[mapId].modalSelector;
         if (!$('#' + mapSelector).length > 0) return false;
         myMap = new ymaps.Map(mapSelector, {
             center: itemsDetector[mapId].center,
             zoom: 14,
             controls: ['zoomControl', 'fullscreenControl']
         });
         var placemark = [];
         createIco(itemsDetector[mapId], placemark);

         myMap.behaviors.disable('scrollZoom');
     }
 }



 ymaps.ready(oMap.mapMain);
 ymaps.ready(oMap.mapVoloko);
 ymaps.ready(oMap.mapAvia);


 $(document).ready(function () {

     if ($('.shema-item').length > 0) {
         var shemaModal = 'shema-modal';
         addModal('', shemaModal);
         $(document).on('click', '.js-shema', function () {
             var id = $(this).data('id'),
                 content = '<div class="shema-item">' + $('#' + id).html() + '</div>';
             $('#' + shemaModal + ' .modal-body').html(content).find('.map > div').attr('id', 'modal-' + id).html('');
             $('#' + shemaModal).modal('show');
             if(id == 'voloko')  ymaps.ready(oMap.mapVolokoModal);
             if(id == 'avia')  ymaps.ready(oMap.mapAviaModal);
         });
     }


 });
