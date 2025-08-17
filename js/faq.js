// FAQ Accordion Functionality
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const toggleIcon = item.querySelector(".toggle-icon");

    question.addEventListener("click", function () {
      const isActive = answer.classList.contains("active");

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        const otherAnswer = otherItem.querySelector(".faq-answer");
        const otherIcon = otherItem.querySelector(".toggle-icon");

        if (otherItem !== item) {
          otherAnswer.classList.remove("active");
          otherIcon.classList.remove("rotated");
        }
      });

      // Toggle current item
      if (isActive) {
        answer.classList.remove("active");
        toggleIcon.classList.remove("rotated");
      } else {
        answer.classList.add("active");
        toggleIcon.classList.add("rotated");
      }
    });
  });
});
