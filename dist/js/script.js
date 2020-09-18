//гамбургер
window.addEventListener('DOMContentLoaded', () => {
    const navList = document.querySelector('.nav__list'),
    navItem = document.querySelectorAll('.nav__item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        navList.classList.toggle('nav__list_active');
    });

    navItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            navList.classList.toggle('nav__list_active');
        });
    });
});

$(document).ready(function(){
    $('.carousel').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow:'<button type="button" class="slick-prev"><img src="icons/arrow-left.png"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow-right.png"></img></button>',
        responsive: [
            {
              breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: false,
                },
            },
        ],
    });

     
    // Карточки в каталоге с ценами

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.prices__block').eq(i).toggleClass('prices__block_active');
                $('.prices__add').eq(i).toggleClass('prices__add_active');
            });
        });
    }
    toggleSlide('.button_prices_back');
    toggleSlide('.button_prices_next');
    
    //Валидация форм

    function valodateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true,
                },
                message: {
                    required: true,
                    minlength: 2,
                    maxlength: 50
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: {
                    required: "Пожалуйста, введите свой телефон"
                },
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введён адрес почты"
                },
                message: {
                    required: "Пожалуйста, введите сообщение",
                    minlength: jQuery.validator.format("Введите от 2 до 150 символов!"),
                    maxlength: jQuery.validator.format("Максимальный объём сообщения 150 символов!"),
                }
            }
    
        });
    }
    valodateForms('#consultation-form');
    valodateForms('#questions-form');

    //Маска ввода номера

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    

   

    
});


          


/*$(document).ready(function(){
    $('.carusel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow:'<button type="button" class="slick-prev"><img src="icons/catalog/left_arrow.png"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/catalog/right_arrow.png"></img></button>',
        responsive: [
            {
              breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: false,
                },
            },
        ],
        
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Модальные окна 

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_mini').on('click', function() {
        $('.overlay, #order').fadeIn('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        })
    });

    //Валидация форм

    function valodateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: "required",
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой телефон",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введён адрес почты"
                }
            }
    
        });
    };
    valodateForms('#consultation-form');
    valodateForms('#consultation form');
    valodateForms('#order form');

    //Маска ввода номера

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //Smooth scroll and pageup

    $(window).scroll(function(){
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    $("a[href^='#up']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    new WOW().init();

});*/