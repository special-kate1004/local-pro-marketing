// Swiper Slider Functionality for Ad Examples
document.addEventListener("DOMContentLoaded", function () {
  const googleSwiper = document.querySelector(".google-swiper");
  const metaSwiper = document.querySelector(".meta-swiper");

  if (!googleSwiper || !metaSwiper) return;

  // Initialize Swiper instances
  let googleSwiperInstance = null;
  let metaSwiperInstance = null;

  function initializeSwipers() {
    // Initialize Google Swiper
    googleSwiperInstance = new Swiper(".google-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".google-swiper .swiper-button-next",
        prevEl: ".google-swiper .swiper-button-prev",
      },
      breakpoints: {
        // Mobile (768px and below)
        320: {
          slidesPerView: 1.2,
          spaceBetween: 10,
        },
        // Desktop (769px and above)
        769: {
          slidesPerView: 1.8,
          spaceBetween: 20,
        },
      },
    });

    // Initialize Meta Swiper
    metaSwiperInstance = new Swiper(".meta-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".meta-swiper .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".meta-swiper .swiper-button-next",
        prevEl: ".meta-swiper .swiper-button-prev",
      },
      breakpoints: {
        // Mobile (768px and below)
        320: {
          slidesPerView: 1.2,
          spaceBetween: 10,
        },
        // Desktop (769px and above)
        769: {
          slidesPerView: 1.8,
          spaceBetween: 20,
        },
      },
    });
  }

  // Initialize swipers
  initializeSwipers();

  // Export swiper instances for use in other files
  window.googleSwiperInstance = googleSwiperInstance;
  window.metaSwiperInstance = metaSwiperInstance;
});

// How It Works Swiper
document.addEventListener("DOMContentLoaded", function () {
  const howItWorksSwiper = document.querySelector(".how-it-works-swiper");

  if (!howItWorksSwiper) return;

  // Initialize How It Works Swiper
  const howItWorksSwiperInstance = new Swiper(".how-it-works-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    // pagination: {
    //   el: ".how-it-works-swiper .swiper-pagination",
    //   clickable: true,
    // },
    breakpoints: {
      // Mobile (768px and below)
      320: {
        slidesPerView: 1.4,
        spaceBetween: 20,
      },
      // Desktop (769px and above)
      769: {
        slidesPerView: 2.6,
        spaceBetween: 40,
      },
    },
  });

  // Export for use in other files
  window.howItWorksSwiperInstance = howItWorksSwiperInstance;
});
