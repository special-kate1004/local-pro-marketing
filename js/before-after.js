// Before/After Slider Functionality
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".center-divider");
  const vooltContent = document.querySelector(".voolt-content");
  const competitorContent = document.querySelector(".competitor-content");

  if (!slider || !vooltContent || !competitorContent) return;

  let isDragging = false;
  let startX = 0;
  let startLeft = 0;

  // Initialize slider position (50% by default)
  let sliderPosition = 50;
  updateSliderPosition();

  // Mouse events
  slider.addEventListener("mousedown", startDragging);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDragging);

  // Touch events for mobile
  slider.addEventListener("touchstart", startDragging);
  document.addEventListener("touchmove", drag);
  document.addEventListener("touchend", stopDragging);

  function startDragging(e) {
    isDragging = true;
    const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    startX = clientX;
    startLeft = sliderPosition;
    slider.style.cursor = "grabbing";
  }

  function drag(e) {
    if (!isDragging) return;

    e.preventDefault();
    const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const deltaX = clientX - startX;
    const containerWidth = slider.parentElement.offsetWidth;

    // Calculate new position (0-100%)
    sliderPosition = Math.max(
      0,
      Math.min(100, startLeft + (deltaX / containerWidth) * 100)
    );
    updateSliderPosition();
  }

  function stopDragging() {
    isDragging = false;
    slider.style.cursor = "grab";
  }

  function updateSliderPosition() {
    // Update the visual position of the slider
    slider.style.left = `${sliderPosition}%`;

    // Update the content visibility - reveal Voolt content from left, competitor from right
    vooltContent.style.clipPath = `inset(0 ${100 - sliderPosition}% 0 0)`;
    competitorContent.style.clipPath = `inset(0 0 0 ${sliderPosition}%)`;
  }

  // Add keyboard support
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      sliderPosition = Math.max(0, sliderPosition - 5);
      updateSliderPosition();
    } else if (e.key === "ArrowRight") {
      sliderPosition = Math.min(100, sliderPosition + 5);
      updateSliderPosition();
    }
  });
});
