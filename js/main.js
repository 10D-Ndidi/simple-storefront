$(document).ready(function () {
  var contentBlock = document.getElementById('content');

  const body = document.body;
  const background = document.querySelector(".nav__bg");
  const mainHeader = document.querySelector(".page-header");
  const nav = document.querySelector(".page-header nav");
  const menu = document.querySelector(".page-header .menu");
  const scrollUp = "scroll-up";
  const scrollDown = "scroll-down";
  const navBg = "nav-bg";
  const sticky = "sticky";
  let lastScroll = 0;


  // Nav Menu

  window.addEventListener("scroll", () => {

    if (window.pageYOffset < 60) {
      if (body.classList.contains(scrollDown)) {
        return
      } else if (background.classList.contains('active')) {
        background.classList.remove('active');
        mainHeader.classList.remove(sticky);
        return;
      }
    }

    if (window.pageYOffset < 540) {
      const currentScroll = window.pageYOffset;


      if (currentScroll == 0) {
        body.classList.remove(scrollUp);
        background.classList.remove('active');
        return;
      }

      if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
        // down
        background.classList.remove('active');
        // mainHeader.classList.remove('active');
        body.classList.remove(scrollUp);
        body.classList.add(scrollDown);
      } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
        // up
        background.classList.add('active');

        // mainHeader.classList.add('active');
        body.classList.remove(scrollDown);
        body.classList.add(scrollUp);
      }

      lastScroll = currentScroll;
    } else {
      if (body.classList.contains(scrollUp)) {
        body.classList.remove(scrollUp);
        return
      };
      if (body.classList.contains(scrollDown)) {
        body.classList.remove(scrollDown);
        return
      };
      background.classList.add('active');
      mainHeader.classList.add(sticky);
      return;
    }
  })

  // Anchor Tag
  $('a.scroll__btn').click(function (e) {
    contentBlock.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    e.preventDefault();
  })


  // Add To Cart
  $('button.addToCart').click(function (e) {
    let stockAmt = document.getElementById('stock').innerHTML;
    document.getElementById("stock").innerHTML = parseInt(stockAmt, 10) + 1;
    e.preventDefault();
  });

  // Hero Img
  const heroBg = document.querySelector('.hero__section');
  const vL1 = document.querySelector('.variant__label--1');
  const vL2 = document.querySelector('.variant__label--2');
  const vL3 = document.querySelector('.variant__label--3');
  const removeBg = function () {
    heroBg.classList.remove('bgAnimate')
  };

  $(".variant__label--1").on({
    click: function () {
      $(".hero__section").css("background-image", "url('./assets/img/16x9Hero.jpg')");
    },
  }, 300);
  $(".variant__label--2").on({
    click: function () {
      $(".hero__section").css("background-image", "url('./assets/img/earring-2.jpg')");
    },
  }, 300);
  $(".variant__label--3").on({
    click: function () {
      $(".hero__section").css("background-image", "url('./assets/img/earring-3.jpg')");
    },
  }, 300);
  vL1.addEventListener('click', function () {
    heroBg.classList.add('bgAnimate');
    setTimeout(function () {
      removeBg();
    }, 600);
  });
  vL2.addEventListener('click', function () {
    heroBg.classList.add('bgAnimate');
    setTimeout(function () {
      removeBg();
    }, 600);
  });
  vL3.addEventListener('click', function () {
    heroBg.classList.add('bgAnimate');
    setTimeout(function () {
      removeBg();
    }, 600);
  });

  // carousel interval & swipe
  $('.carousel').carousel({
    interval: 6000,
    touch: true
  });
  // carousel height
  function normalizeSlideHeights() {
    $('.carousel').each(function () {
      var items = $('.carousel-item', this);

      items.css('min-height', 0);

      var maxHeight = Math.max.apply(null,
        items.map(function () {
          return $(this).outerHeight()
        }).get());
      items.css('min-height', maxHeight + 'px');
    });

  }
  // fixed height carousel
  $(window).on(
    'load resize orientationchange',
    normalizeSlideHeights);
});


// lazyloading
const images = document.querySelectorAll('[data-src]');
const imgBg = document.querySelector('.lazy__bg');

function preloadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) {
    return;
  }
  img.src = src;
}

const imgOptions = {
  threshold: 0,
  rootMargin: "0px 0px 0px 0px"
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      imgBg.classList.add('loaded');
      entry.target.classList.add('loaded');
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  })
}, imgOptions);

images.forEach(image => {
  imgObserver.observe(image);
});