'use strict';


//гАМБУРГЕР
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
    valodateForms('#callback-form');
    valodateForms('#calculation-form');


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


    // PageUp и анимация

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
        let top = window.pageYOffset|| document.body.scrollTop || document.documentElement.scrollTop;
        if(top > 1000) {
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
        pageUp.addEventListener('click', function(e) {   // клик
            // document.documentElement.scrollTop = 0;
            up();
            clearInterval(nullId);
        });
    });
    function up() {  
        let top = window.pageYOffset|| document.body.scrollTop || document.documentElement.scrollTop,
            t; 
        if(top > 0) {  
            window.scrollBy(0,((top+100)/-10));  
            t = setTimeout(up, 20);  
        } else {
            clearTimeout(t);  
            return false;  
        }
    }
    /*
    +100 - это высота на которой скрипт начинает замедлятся вверху.
    -10 - это количество пикселей, которое прокручивается при движении на верх.
    20 - это 0,02 секунды за которые прокручиваются те 10 пикселей что указаны как (-10)
    */
    new WOW().init();

    //Плавный переход по ссылкам a href^='#'"
    let links = document.querySelectorAll("a[href*='#']"); 
    for (let link of links) {
        link.addEventListener('click', function(e) {
           e.preventDefault();
            let id = link.getAttribute('href');
            if (e.target && /\w$/.test(id)) {  //id заканчивается на букву (чтобы исключить pageup)
                let targetElem = document.querySelector('' + id);
                targetElem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }




    //Модальные окна 
    const btnHeader = document.querySelector('.header__button'),
        btnPromo = document.querySelector('.promo__button'),
        btnFooter = document.querySelector('.footer__button'),
        overlay = document.querySelector('.overlay'),
        modal =  document.querySelectorAll('.modal'),
        modalCons = document.querySelectorAll('.modal')[0],
        modalCalc = document.querySelectorAll('.modal')[1],
        modalTnx = document.querySelectorAll('.modal')[2],
        forms = document.querySelectorAll('form');

    document.addEventListener('click', function(e) {
        if (e.target && e.target == btnHeader || e.target == btnFooter) {
            overlay.style.display = 'block';
            modalCons.style.display = 'block';
        } else if (e.target && e.target == btnPromo) {
            overlay.style.display = 'block';
            modalCalc.style.display = 'block';
        }
    });    
    overlay.addEventListener('click', function(e){
        if (e.target && e.target.classList.contains('modal__close')){
            overlay.style.display = 'none';
            for( let i = 0; i < modal.length; i++) {
                modal[i].style.display = "none";
            }
            for (let i = 0; i < forms.length; i++) {
                forms[i].reset();
            }
        }
    });

    for (let form of forms) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            let index = 0;
            let inputs = form.querySelectorAll('input');
            let textareas = form.querySelectorAll('textarea');
            let arr = [...inputs, ...textareas];
            for (let elem of arr) {
                if(!elem.classList.contains('error')) {
                    index += 1;
                }
            }
            if (index == arr.length) {

                let formData = new FormData(form);

                let response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    let result = await response.json();
                    alert(result.message);
                    for( let i = 0; i < modal.length; i++) {
                        modal[i].style.display = "none";
                    }
                    overlay.style.display = 'block'; 
                    modalTnx.style.display = 'block';

                } else {
                    alert("Ошибка");
                }


                
            }
        });
    
    }
   

});



        