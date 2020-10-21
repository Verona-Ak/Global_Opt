'use strict';
//гамбургер
window.addEventListener('DOMContentLoaded', function() {
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

    // Slick слайдер
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
                    arrows: true
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

    
    // Скролл для текста внутри карточек
    const prices = document.querySelectorAll('.prices'),
        moreInf = document.querySelectorAll(".prices__descr_moreinf"),
        catalog = document.querySelector('.catalog');
    
    catalog.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('button_prices_next')) {
          setOverflow(e.target);  
        }
        
    });

    function setOverflow(item) {
        for (let i = 0; i < prices.length; i++) {
            let btnNext = document.querySelectorAll('.button_prices_next')[i];
            if (item == btnNext) {
                let arr = [],
                    str = moreInf[i].textContent;
                str = str.replace(/[\s\.,!\?:;'"\(\)]/g, '');
                for (let b = 0; b < str.length; b++) {
                    arr.push(str[b]);
                }
                moreInf[i].style.overflowY = (arr.length >= 220) ? 'scroll' : 'hidden'; 
            }
        }

    }

    // PageUp, скролл и анимация
    const pageUp = document.getElementsByClassName('pageup')[0];
    // Установка таймера для анимации
    let time = 0;
    let timerId = setInterval(timeCalc, 1000);
    function timeCalc() {
        time++;
        // console.log(time);
        if (time >= 10) {
            pageUp.classList.add('pageup__animated');
        } else {
            pageUp.classList.remove('pageup__animated');
        }
        return time;
    }
    //Событие скролла (таймер обнуляется)
    document.addEventListener('scroll', function() {
        if(document.documentElement.scrollTop > 1000) {
            pageUp.style.display = 'block';
        } else {
            pageUp.style.display = 'none';
        }
        time = 0;
        return time;
    });
    
    // Событие мыши на объект, таймер выше "на паузе"
    pageUp.addEventListener('mouseover', () => {     // наведение
        let nullId = setInterval(nullation, 1000);
        function nullation() {
            time = 0;
            return time; 
        }
        pageUp.addEventListener('mouseleave', ()=> {   // мышь покидает обьект
            clearInterval(nullId);
        });
        pageUp.addEventListener('click', function() {   // клик
            document.documentElement.scrollTop = 0;
            clearInterval(nullId);
        });
    });
    
  
    new WOW().init();

});



          


/*$(document).ready(function(){
   

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

   
    

});*/