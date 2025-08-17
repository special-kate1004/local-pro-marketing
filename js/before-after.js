document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".center-divider");
  const vooltContent = document.querySelector(".voolt-content");
  const competitorContent = document.querySelector(".competitor-content");

  if (!slider || !vooltContent || !competitorContent) return;

  let isDragging = false;
  let startX = 0;
  let startLeft = 0;
  let sliderPosition = 50; // default center

  updateSliderPosition();

  // Mouse events
  slider.addEventListener("mousedown", startDragging);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDragging);

  // Touch events
  slider.addEventListener("touchstart", startDragging, { passive: false });
  document.addEventListener("touchmove", drag, { passive: false });
  document.addEventListener("touchend", stopDragging);

  function startDragging(e) {
    e.preventDefault();
    isDragging = true;
    const clientX = e.type.startsWith("mouse")
      ? e.clientX
      : e.touches[0].clientX;
    startX = clientX;
    startLeft = sliderPosition;
    slider.style.cursor = "grabbing";
  }

  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = e.type.startsWith("mouse")
      ? e.clientX
      : e.touches[0].clientX;
    const deltaX = clientX - startX;
    const containerWidth = slider.parentElement.offsetWidth;

    sliderPosition = Math.max(
      0,
      Math.min(100, startLeft + (deltaX / containerWidth) * 100)
    );
    updateSliderPosition();
  }

  function stopDragging() {
    if (!isDragging) return;
    isDragging = false;
    slider.style.cursor = "grab";
  }

  function updateSliderPosition() {
    slider.style.left = `${sliderPosition}%`;
    vooltContent.style.clipPath = `inset(0 ${100 - sliderPosition}% 0 0)`;
    competitorContent.style.clipPath = `inset(0 0 0 ${sliderPosition}%)`;
  }

  // Keyboard support
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      sliderPosition = Math.max(0, sliderPosition - 5);
      updateSliderPosition();
    } else if (e.key === "ArrowRight") {
      sliderPosition = Math.min(100, sliderPosition + 5);
      updateSliderPosition();
    }
  });

  // Initial cursor
  slider.style.cursor = "grab";
});
