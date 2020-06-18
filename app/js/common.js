$(document).ready(function(){

    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    function heightses() {
        if ($(window).width()>480) {

            $('.foot-item-title').height('auto').equalHeights();
        }
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    $('.intro-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        cssEase: 'linear',
        arrows: true,
        // dotsClass: "intro-dot"
    });

    $('.brands-slider').owlCarousel({
        loop:true,
        nav: true,
        // margin: 50,
        // autoplay: true,
        autoHeight: false,
        navText: ['', ''],
        responsive: {
            0: {
                dots: false,
                items: 1,
                margin: 25,
                autoHeight: true,
            },
            390: {
              items: 2,
              margin: 25,
              dots: false
            },
            768: {
                items: 3,
                slideBy: 3,
                dots: true,
                margin: 25
            },
            992: {
                items: 4,
                slideBy: 4,
                margin: 50
            },
            1200: {
                items: 5,
                slideBy: 5,
                margin: 50
            }
        }
    });

    $('.reviews-slider').owlCarousel({
        loop:true,
        nav: true,
        margin: 20,
        // autoplay: true,
        autoHeight: true,
        navText: ['', ''],
        items: 1,
        dots: false
    });

    //HOUR
    if($('#price-filters').length) {
        var range = document.getElementById('price-filters');
        var rangeMin = $('.range-wrap').data('min');
        var rangeMax = $('.range-wrap').data('max');
        var inputMin = document.getElementById('input-min');
        var inputMax = document.getElementById('input-max');
        var inputs = [inputMin, inputMax];



        noUiSlider.create(range, {
            start: [rangeMin, rangeMax],
            connect: true,
            // tooltips: true,
            range: {
                'min': rangeMin,
                'max': rangeMax
            },
            step: 1,
            format: wNumb({
                decimals: 0
            }),
            pips: {
                mode: 'count',
                values: 5,
                density: 100,
                stepped: true
            }
        });

        range.noUiSlider.on('update', function (values, handle) {
            inputs[handle].value = values[handle];
        });

        inputs.forEach(function (input, handle) {

            input.addEventListener('change', function () {
                range.noUiSlider.setHandle(handle, this.value);
            });

            input.addEventListener('keydown', function (e) {

                var values = range.noUiSlider.get();
                var value = Number(values[handle]);

                // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
                var steps = range.noUiSlider.steps();

                // [down, up]
                var step = steps[handle];

                var position;

                // 13 is enter,
                // 38 is key up,
                // 40 is key down.
                switch (e.which) {

                    case 13:
                        range.noUiSlider.setHandle(handle, this.value);
                        break;

                    case 38:

                        // Get step to go increase slider value (up)
                        position = step[1];

                        // false = no step is set
                        if (position === false) {
                            position = 1;
                        }

                        // null = edge of slider
                        if (position !== null) {
                            range.noUiSlider.setHandle(handle, value + position);
                        }

                        break;

                    case 40:

                        position = step[0];

                        if (position === false) {
                            position = 1;
                        }

                        if (position !== null) {
                            range.noUiSlider.setHandle(handle, value - position);
                        }

                        break;
                }
            });

            $('#reset-filter').on('click', function() {
                range.noUiSlider.reset()
            })

            $('#filter-options').on('change', function(e){
                e.stopImmediatePropagation();
                $('.btn-filter').attr('id', this.value)
            })

            $('.filter-options').styler();
        });
    }

    $('.preloader').fadeOut();

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });

    <!-- Javascript -->
    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    function initMap() {
        ymaps.ready(function(){
            var mapId = $('#map'),
                attitude = mapId.data("att"),
                longtitude = mapId.data("long"),
                zoom = mapId.data("zoom"),
                marker = mapId.data("marker"),
                map = new ymaps.Map("map", {
                    center: [attitude, longtitude],
                    controls: ['zoomControl'],
                    zoom: zoom
                }),

                myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: marker,
                    // Размеры метки.
                    iconImageSize: [26, 42],
                });

            map.geoObjects.add(myPlacemark);
            var position = map.getGlobalPixelCenter();

            if ($(window).width() >= 1200) {
                map.setGlobalPixelCenter([ position[0] - 250, position[1]]);
            }

            if (($(window).width() >= 992) && ($(window).width() < 1200)) {
                map.setGlobalPixelCenter([ position[0] - 200, position[1]]);
            }
        });
    }

    if( $('#map').length )         // use this if you are using id to check
    {
        setTimeout(function(){
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                initMap();
            });
        }, 2000);
    }
});
