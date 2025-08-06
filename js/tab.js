// Tab Functionality for Ad Examples
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const googleSwiper = document.querySelector(".google-swiper");
  const metaSwiper = document.querySelector(".meta-swiper");

  if (!tabButtons.length || !googleSwiper || !metaSwiper) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all tabs
      tabButtons.forEach((tab) => tab.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Show/hide swipers based on selected tab
      const isGoogleTab = this.textContent.includes("Google");
      if (isGoogleTab) {
        googleSwiper.style.display = "block";
        metaSwiper.style.display = "none";
        if (window.googleSwiperInstance) {
          window.googleSwiperInstance.update();
        }
      } else {
        googleSwiper.style.display = "none";
        metaSwiper.style.display = "block";
        if (window.metaSwiperInstance) {
          window.metaSwiperInstance.update();
        }
      }
    });
  });
});
