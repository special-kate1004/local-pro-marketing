// Form Functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, form.js script is running");
  let currentStep = 1;
  const totalSteps = 3;

  // Initialize form functionality
  function initializeForm() {
    console.log("Initializing form...");

    // Add event listeners
    addFormEventListeners();

    console.log("Form initialization complete");
  }

  // Show specific step
  function showStep(step) {
    console.log("showStep called with step:", step);
    // Hide all steps
    document.querySelectorAll(".form-step").forEach((stepEl) => {
      stepEl.classList.remove("active");
    });

    // Show current step
    const currentStepEl = document.querySelector(
      `.form-steps [data-step="${step}"]`
    );
    if (currentStepEl) {
      console.log("Showing step:", step, currentStepEl);
      currentStepEl.classList.add("active");
    } else {
      console.log("Step element not found for step:", step);
    }

    currentStep = step;
    console.log("Current step updated to:", currentStep);

    // Handle step 4 (success screen) - hide progress bar and form actions
    const progressBar = document.querySelector(".progress-bar");
    const formActions = document.querySelector(".form-actions");

    if (step === 4) {
      if (progressBar) progressBar.style.display = "none";
      if (formActions) formActions.style.display = "none";
    } else {
      if (progressBar) progressBar.style.display = "flex";
      if (formActions) formActions.style.display = "flex";
      // Update progress bar and form actions for steps 1-3
      updateProgressBar(step);
      updateFormActions();
    }
  }

  // Update global form actions
  function updateFormActions() {
    const backBtn = document.querySelector(".back-btn");
    const nextBtn = document.querySelector(".next-btn");
    const submitBtn = document.querySelector(".submit-btn");

    if (currentStep === 1) {
      // Step 1: Only show Next button
      backBtn.style.display = "none";
      nextBtn.style.display = "flex";
      submitBtn.style.display = "none";
    } else if (currentStep === 2) {
      // Step 2: Show Back and Next buttons
      backBtn.style.display = "flex";
      nextBtn.style.display = "flex";
      submitBtn.style.display = "none";
    } else if (currentStep === 3) {
      // Step 3: Show Back and Submit buttons
      backBtn.style.display = "flex";
      nextBtn.style.display = "none";
      submitBtn.style.display = "flex";
    }
  }

  // Update progress bar
  function updateProgressBar(step) {
    console.log("updateProgressBar called", step);
    const progressSteps = document.querySelectorAll(".step-circle");
    const progressLines = document.querySelectorAll(".step-line");

    progressSteps.forEach((stepEl, index) => {
      const stepNumber = index + 1;
      stepEl.classList.remove("active", "completed");

      if (stepNumber < step) {
        stepEl.classList.add("completed");
        stepEl.textContent = "✓";
        console.log("completed", step, stepNumber);
      } else if (stepNumber === step) {
        stepEl.classList.add("active");
        stepEl.textContent = stepNumber;
      } else {
        stepEl.textContent = stepNumber;
      }
    });

    progressLines.forEach((lineEl, index) => {
      const stepNumber = index + 1;
      lineEl.classList.remove("active", "completed");

      if (stepNumber < step - 1) {
        lineEl.classList.add("completed");
      } else if (stepNumber === step - 1) {
        lineEl.classList.add("active");
      }
    });
  }

  // Add event listeners
  function addFormEventListeners() {
    console.log("Adding form event listeners...");

    // Next button (now only one global button)
    const nextButton = document.querySelector(".next-btn");
    console.log("Found next button:", nextButton);
    if (nextButton) {
      console.log("Adding click listener to next button");
      nextButton.addEventListener("click", handleNext);
    }

    // Back button (now only one global button)
    const backButton = document.querySelector(".back-btn");
    console.log("Found back button:", backButton);
    if (backButton) {
      backButton.addEventListener("click", handleBack);
    }

    // Submit button
    const submitButton = document.querySelector(".submit-btn");
    console.log("Found submit button:", submitButton);
    if (submitButton) {
      submitButton.addEventListener("click", handleSubmit);
    }

    // Progress bar clicks
    document.querySelectorAll(".progress-step").forEach((step) => {
      step.addEventListener("click", handleProgressClick);
    });

    // Radio and checkbox change events
    const radioCheckboxes = document.querySelectorAll(
      'input[type="radio"], input[type="checkbox"]'
    );
    console.log("Found radio/checkbox inputs:", radioCheckboxes.length);

    radioCheckboxes.forEach((input) => {
      input.addEventListener("change", handleInputChange);
    });

    // Make entire checkbox items clickable
    const checkboxItems = document.querySelectorAll(".checkbox-item");
    console.log("Found checkbox items:", checkboxItems.length);

    checkboxItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        // Don't trigger if clicking on the input itself or URL field
        if (
          e.target.type === "checkbox" ||
          e.target.closest(".service-url-field")
        ) {
          return;
        }

        const checkbox = this.querySelector('input[type="checkbox"]');
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event("change"));
        }
      });

      // Also handle clicks on labels that contain checkboxes
      const label = item.querySelector("label.checkbox-option");
      if (label) {
        label.addEventListener("click", function (e) {
          // Prevent the default label behavior and handle it manually
          e.preventDefault();
          e.stopPropagation();

          const checkbox = this.querySelector('input[type="checkbox"]');
          if (checkbox) {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event("change"));
          }
        });
      }

      // Handle clicks on standalone labels (for Angi, Thumbtack, Yelp)
      const standaloneLabel = item.querySelector("label.checkbox-option");
      if (
        standaloneLabel &&
        !standaloneLabel.querySelector('input[type="checkbox"]')
      ) {
        standaloneLabel.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          // Find the checkbox that comes before this label
          const checkbox = this.previousElementSibling;
          if (checkbox && checkbox.type === "checkbox") {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event("change"));
          }
        });
      }
    });

    // Make entire radio items clickable
    const radioItems = document.querySelectorAll(".radio-item");
    console.log("Found radio items:", radioItems.length);

    radioItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        // Don't trigger if clicking on the input itself or URL field
        if (
          e.target.type === "radio" ||
          e.target.closest(".website-url-field")
        ) {
          return;
        }

        const radio = this.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          radio.dispatchEvent(new Event("change"));
        }
      });
    });

    console.log("Event listeners added successfully");
  }

  // Handle input changes to update wrapper classes
  function handleInputChange() {
    console.log(
      "Input changed:",
      this.type,
      this.name,
      this.value,
      this.checked
    );

    if (this.type === "radio") {
      // For radio buttons, handle the entire group
      const radioGroup = this.closest(".radio-group");
      if (radioGroup) {
        console.log("Processing radio group");
        // First, set all radio items in the group to inactive
        radioGroup.querySelectorAll(".radio-item").forEach((item) => {
          item.classList.remove("active-field-wrapper");
          item.classList.add("inactive-field-wrapper");
        });

        // Then, set the selected radio item to active
        const selectedItem = this.closest(".radio-item");
        if (selectedItem) {
          selectedItem.classList.remove("inactive-field-wrapper");
          selectedItem.classList.add("active-field-wrapper");
        }
      }
    } else {
      // For checkboxes, handle individually
      const item = this.closest(".checkbox-item");
      if (item) {
        if (this.checked) {
          item.classList.remove("inactive-field-wrapper");
          item.classList.add("active-field-wrapper");
        } else {
          item.classList.remove("active-field-wrapper");
          item.classList.add("inactive-field-wrapper");
        }
      }
    }
  }

  // Handle next button
  function handleNext() {
    console.log("Next button clicked, current step:", currentStep, totalSteps);
    if (validateCurrentStep()) {
      console.log("Validation passed, moving to next step");
      if (currentStep < totalSteps) {
        console.log(
          "Moving from step",
          currentStep,
          "to step",
          currentStep + 1
        );
        updateProgressBar(currentStep + 1);
        showStep(currentStep + 1);
      }
    } else {
      console.log("Validation failed for step", currentStep);
    }
  }

  // Handle back button
  function handleBack() {
    if (currentStep > 1) {
      showStep(currentStep - 1);
      updateProgressBar(currentStep - 1);
    }
  }

  // Handle submit
  function handleSubmit() {
    if (validateCurrentStep()) {
      // Here you would typically send the form data to your server
      console.log("Form submitted!");

      // Show step 4 (success screen)
      showStep(4);
    }
  }

  // Handle progress bar click
  function handleProgressClick() {
    const stepNumber = parseInt(this.getAttribute("data-step"));

    // Only allow navigation to completed steps or current step
    if (stepNumber <= currentStep) {
      showStep(stepNumber);
      updateProgressBar(stepNumber);
    }
  }

  // Helper function to validate URL format
  function isValidURL(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch (e) {
      return false;
    }
  }

  // Helper function to create error message
  function createErrorMessage(text) {
    const errorMsg = document.createElement("div");
    errorMsg.className = "error-message";
    errorMsg.textContent = text;
    return errorMsg;
  }

  // Validate current step
  function validateCurrentStep() {
    const currentStepEl = document.querySelector(
      `.form-steps [data-step="${currentStep}"]`
    );
    const requiredFields = currentStepEl.querySelectorAll("[required]");
    let isValid = true;

    // Clear all previous error messages
    currentStepEl.querySelectorAll(".error-message").forEach((msg) => {
      msg.remove();
    });

    requiredFields.forEach((field) => {
      // Remove error styling
      field.style.borderColor = "";

      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = "#e53e3e";

        // Create and show error message
        let errorText = "This field is required";

        // Set specific error message based on field type/name
        if (field.id === "industry") {
          errorText = "Please select your industry";
        } else if (field.id === "business-name") {
          errorText = "Please enter your business name";
        } else if (field.id === "location") {
          errorText = "Please enter your business location";
        } else if (field.id === "marketing-budget") {
          errorText = "Please select your marketing budget";
        } else if (field.id === "name") {
          errorText = "Please enter your name";
        } else if (field.id === "email") {
          errorText = "Please enter your email address";
        } else if (field.id === "phone") {
          errorText = "Please enter your phone number";
        }

        const errorMsg = createErrorMessage(errorText);

        // Insert error message after the form-group container
        const formGroup = field.closest(".form-group");
        if (formGroup) {
          formGroup.appendChild(errorMsg);
        } else {
          // Fallback: insert after the field itself
          field.parentNode.insertBefore(errorMsg, field.nextSibling);
        }
      }
    });

    // Additional validation for step 1 - industry dropdown validation
    if (currentStep === 1) {
      const industryField = currentStepEl.querySelector("#industry");
      if (industryField && industryField.value.trim()) {
        // Get all valid industry options
        const industryOptions = document.querySelectorAll(".dropdown-option");
        const validIndustries = Array.from(industryOptions).map((option) =>
          option.getAttribute("data-value")
        );

        // Check if entered value is a valid industry
        const enteredValue = industryField.value.trim();
        if (!validIndustries.includes(enteredValue)) {
          isValid = false;
          industryField.style.borderColor = "#e53e3e";

          // Create and show error message
          const errorMsg = createErrorMessage(
            "Please select a valid industry from the dropdown"
          );

          // Insert error message after the form-group container
          const formGroup = industryField.closest(".form-group");
          if (formGroup) {
            formGroup.appendChild(errorMsg);
          }
        }
      }
    }

    // Additional validation for step 1 - website radio button
    if (currentStep === 1) {
      const websiteRadios = currentStepEl.querySelectorAll(
        'input[name="website"]'
      );
      const websiteGroup = currentStepEl.querySelector(".radio-group");
      const websiteUrlField = currentStepEl.querySelector(
        '.website-url-field input[type="url"]'
      );

      console.log("Website validation - found radios:", websiteRadios.length);
      console.log("Website validation - radio group:", websiteGroup);

      // Check if any website radio button is selected
      const isWebsiteSelected = Array.from(websiteRadios).some(
        (radio) => radio.checked
      );

      console.log("Website validation - is selected:", isWebsiteSelected);
      console.log(
        "Website validation - radio states:",
        Array.from(websiteRadios).map((r) => ({
          value: r.value,
          checked: r.checked,
        }))
      );

      if (!isWebsiteSelected) {
        isValid = false;
        console.log("Website validation - showing error: no option selected");

        // Add error styling to radio group
        if (websiteGroup) {
          websiteGroup.style.border = "1px solid #e53e3e";
          websiteGroup.style.borderRadius = "8px";
          websiteGroup.style.padding = "8px";
        }

        // Create and show error message
        const errorMsg = createErrorMessage("Please select an option");

        // Insert error message after the form-group container
        const formGroup = websiteGroup
          ? websiteGroup.closest(".form-group")
          : null;
        if (formGroup) {
          formGroup.appendChild(errorMsg);
        }
      } else {
        // Remove error styling if previously set
        if (websiteGroup) {
          websiteGroup.style.border = "";
          websiteGroup.style.borderRadius = "";
          websiteGroup.style.padding = "";
        }

        // Check which option is selected
        const yesRadio = currentStepEl.querySelector(
          'input[name="website"][value="yes"]'
        );
        const noRadio = currentStepEl.querySelector(
          'input[name="website"][value="no"]'
        );

        if (yesRadio && yesRadio.checked) {
          // "Yes" is selected - check if URL field is filled
          if (!websiteUrlField || !websiteUrlField.value.trim()) {
            isValid = false;
            console.log("Website validation - showing error: URL required");

            // Add error styling to URL field
            if (websiteUrlField) {
              websiteUrlField.style.borderColor = "#e53e3e";
            }

            // Create and show error message
            const errorMsg = createErrorMessage(
              "Please enter your website URL"
            );

            // Insert error message after the URL field
            const urlFieldContainer = websiteUrlField
              ? websiteUrlField.closest(".website-url-field")
              : null;
            if (urlFieldContainer) {
              urlFieldContainer.appendChild(errorMsg);
            }
          } else if (!isValidURL(websiteUrlField.value.trim())) {
            // URL is filled but invalid format
            isValid = false;
            console.log(
              "Website validation - showing error: invalid URL format"
            );

            // Add error styling to URL field
            if (websiteUrlField) {
              websiteUrlField.style.borderColor = "#e53e3e";
            }

            // Create and show error message
            const errorMsg = createErrorMessage(
              "Please enter a valid URL (e.g., https://example.com)"
            );

            // Insert error message after the URL field
            const urlFieldContainer = websiteUrlField
              ? websiteUrlField.closest(".website-url-field")
              : null;
            if (urlFieldContainer) {
              urlFieldContainer.appendChild(errorMsg);
            }
          } else {
            // URL is filled and valid - remove any error styling
            if (websiteUrlField) {
              websiteUrlField.style.borderColor = "";
            }
            // Remove any existing error message
            const existingError = currentStepEl.querySelector(
              ".website-url-field .error-message"
            );
            if (existingError) {
              existingError.remove();
            }
          }
        } else if (noRadio && noRadio.checked) {
          // "No" is selected - no URL required, proceed
          console.log("Website validation - No selected, proceeding");
          // Remove any error styling from URL field
          if (websiteUrlField) {
            websiteUrlField.style.borderColor = "";
          }
          // Remove any existing error message
          const existingError = currentStepEl.querySelector(
            ".website-url-field .error-message"
          );
          if (existingError) {
            existingError.remove();
          }
        }
      }
    }

    // Additional validation for step 2 - service URL fields
    if (currentStep === 2) {
      const angiCheckbox = currentStepEl.querySelector('input[name="angi"]');
      const thumbtackCheckbox = currentStepEl.querySelector(
        'input[name="thumbtack"]'
      );
      const yelpCheckbox = currentStepEl.querySelector('input[name="yelp"]');

      const angiUrlField = currentStepEl.querySelector(
        '#angi-url-field input[type="url"]'
      );
      const thumbtackUrlField = currentStepEl.querySelector(
        '#thumbtack-url-field input[type="url"]'
      );
      const yelpUrlField = currentStepEl.querySelector(
        '#yelp-url-field input[type="url"]'
      );

      // Check Angi
      if (angiCheckbox && angiCheckbox.checked) {
        if (!angiUrlField || !angiUrlField.value.trim()) {
          isValid = false;

          // Add error styling to URL field
          if (angiUrlField) {
            angiUrlField.style.borderColor = "#e53e3e";
          }

          // Create and show error message
          const errorMsg = createErrorMessage(
            "Please enter your Angi profile URL"
          );

          // Insert error message after the URL field
          const urlFieldContainer = angiUrlField
            ? angiUrlField.closest(".service-url-field")
            : null;
          if (urlFieldContainer) {
            urlFieldContainer.appendChild(errorMsg);
          }
        } else if (!isValidURL(angiUrlField.value.trim())) {
          // URL is filled but invalid format
          isValid = false;

          // Add error styling to URL field
          if (angiUrlField) {
            angiUrlField.style.borderColor = "#e53e3e";
          }

          // Create and show error message
          const errorMsg = createErrorMessage(
            "Please enter a valid URL (e.g., https://example.com)"
          );

          // Insert error message after the URL field
          const urlFieldContainer = angiUrlField
            ? angiUrlField.closest(".service-url-field")
            : null;
          if (urlFieldContainer) {
            urlFieldContainer.appendChild(errorMsg);
          }
        } else {
          // URL is filled and valid - remove any error styling
          if (angiUrlField) {
            angiUrlField.style.borderColor = "";
          }
          // Remove any existing error message
          const existingError = currentStepEl.querySelector(
            "#angi-url-field .error-message"
          );
          if (existingError) {
            existingError.remove();
          }
        }
      }

      // Check Thumbtack
      if (thumbtackCheckbox && thumbtackCheckbox.checked) {
        if (!thumbtackUrlField || !thumbtackUrlField.value.trim()) {
          isValid = false;

          // Add error styling to URL field
          if (thumbtackUrlField) {
            thumbtackUrlField.style.borderColor = "#e53e3e";
          }

          // Create and show error message
          const errorMsg = createErrorMessage(
            "Please enter your Thumbtack profile URL"
          );

          // Insert error message after the URL field
          const urlFieldContainer = thumbtackUrlField
            ? thumbtackUrlField.closest(".service-url-field")
            : null;
          if (urlFieldContainer) {
            urlFieldContainer.appendChild(errorMsg);
          }
        } else if (!isValidURL(thumbtackUrlField.value.trim())) {
          // URL is filled but invalid format
          isValid = false;

          // Add error styling to URL field
          if (thumbtackUrlField) {
            thumbtackUrlField.style.borderColor = "#e53e3e";
          }

          // Create and show error message
          const errorMsg = createErrorMessage(
            "Please enter a valid URL (e.g., https://example.com)"
          );

          // Insert error message after the URL field
          const urlFieldContainer = thumbtackUrlField
            ? thumbtackUrlField.closest(".service-url-field")
            : null;
          if (urlFieldContainer) {
            urlFieldContainer.appendChild(errorMsg);
          }
        } else {
          // URL is filled and valid - remove any error styling
          if (thumbtackUrlField) {
            thumbtackUrlField.style.borderColor = "";
          }
          // Remove any existing error message
          const existingError = currentStepEl.querySelector(
            "#thumbtack-url-field .error-message"
          );
          if (existingError) {
            existingError.remove();
          }
        }
      }

      // Check Yelp
      if (yelpCheckbox && yelpCheckbox.checked) {
        if (!yelpUrlField || !yelpUrlField.value.trim()) {
          isValid = false;

          // Add error styling to URL field
          if (yelpUrlField) {
            yelpUrlField.style.borderColor = "#e53e3e";
          }

          // Create and show error message
          const errorMsg = createErrorMessage(
            "Please enter your Yelp profile URL"
          );

          // Insert error message after the URL field
          const urlFieldContainer = yelpUrlField
            ? yelpUrlField.closest(".service-url-field")
            : null;
          if (urlFieldContainer) {
            urlFieldContainer.appendChild(errorMsg);
          }
        } else if (!isValidURL(yelpUrlField.value.trim())) {
          // URL is filled but invalid format
          isValid = false;

          // Add error styling to URL field
          if (yelpUrlField) {
            yelpUrlField.style.borderColor = "#e53e3e";
          }

          // Create and show error message
          const errorMsg = createErrorMessage(
            "Please enter a valid URL (e.g., https://example.com)"
          );

          // Insert error message after the URL field
          const urlFieldContainer = yelpUrlField
            ? yelpUrlField.closest(".service-url-field")
            : null;
          if (urlFieldContainer) {
            urlFieldContainer.appendChild(errorMsg);
          }
        } else {
          // URL is filled and valid - remove any error styling
          if (yelpUrlField) {
            yelpUrlField.style.borderColor = "";
          }
          // Remove any existing error message
          const existingError = currentStepEl.querySelector(
            "#yelp-url-field .error-message"
          );
          if (existingError) {
            existingError.remove();
          }
        }
      }
    }

    // Additional validation for step 3
    if (currentStep === 3) {
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");

      if (email.value && !isValidEmail(email.value)) {
        isValid = false;
        email.style.borderColor = "#e53e3e";

        // Remove existing error message if any
        const formGroup = email.closest(".form-group");
        const existingError = formGroup
          ? formGroup.querySelector(".error-message")
          : null;
        if (existingError) existingError.remove();

        const errorMsg = createErrorMessage(
          "Please enter a valid email address"
        );

        if (formGroup) {
          formGroup.appendChild(errorMsg);
        } else {
          email.parentNode.insertBefore(errorMsg, email.nextSibling);
        }
      }

      if (phone.value && !isValidPhone(phone.value)) {
        isValid = false;
        phone.style.borderColor = "#e53e3e";

        // Remove existing error message if any
        const formGroup = phone.closest(".form-group");
        const existingError = formGroup
          ? formGroup.querySelector(".error-message")
          : null;
        if (existingError) existingError.remove();

        const errorMsg = createErrorMessage(
          "Please enter a valid phone number."
        );

        if (formGroup) {
          formGroup.appendChild(errorMsg);
        } else {
          phone.parentNode.insertBefore(errorMsg, phone.nextSibling);
        }
      }
    }

    return isValid;
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone validation
  function isValidPhone(phone) {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, "");

    // US phone number must have exactly 10 digits
    if (digitsOnly.length !== 10) {
      return false;
    }

    // For masked input, check if the format is complete (all digits filled)
    // The mask ensures format is (XXX) XXX-XXXX
    const maskedFormat = /^\(\d{3}\) \d{3}-\d{4}$/;
    return maskedFormat.test(phone);
  }

  // Reset form
  function resetForm() {
    // Reset all form fields
    document.querySelectorAll("input, select").forEach((field) => {
      field.value = "";
    });

    // Reset radio buttons
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.checked = false;
    });

    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Reset website field
    document.getElementById("website-url-field").classList.remove("active");

    // Reset service URL fields
    document.querySelectorAll(".service-url-field").forEach((field) => {
      field.classList.remove("active");
    });

    // Reset progress bar to first step
    const progressSteps = document.querySelectorAll(".step-circle");
    const progressLines = document.querySelectorAll(".step-line");

    // Reset all circles
    progressSteps.forEach((step, index) => {
      step.classList.remove("active", "completed");
      if (index === 0) {
        step.classList.add("active");
      }
    });

    // Reset all lines
    progressLines.forEach((line, index) => {
      line.classList.remove("active", "completed");
      if (index === 0) {
        line.classList.add("active");
      }
    });

    // Go back to first step
    showStep(1);
    updateProgressBar(1);
  }

  // Form Display/Hide Functionality
  function showForm() {
    // Hide header
    const header = document.querySelector(".site-header-wrapper");
    if (header) {
      header.style.display = "none";
    }

    // Hide image slider only on mobile (screen width <= 768px)
    if (window.innerWidth <= 768) {
      const imageSlider = document.querySelector(".image-slider-container");
      if (imageSlider) {
        imageSlider.style.display = "none";
      }
    }

    // Hide "Try it for free before you pay" section
    const tryItFreeSection = document.querySelector("#section-mobile-cta");
    if (tryItFreeSection) {
      tryItFreeSection.classList.add("d-none");
    }

    // Hide all sections except footer
    document
      .querySelectorAll("section:not(#section-footer):not(#section-form)")
      .forEach((section) => {
        section.style.display = "none";
      });

    // Show form section
    const formSection = document.getElementById("section-form");
    if (formSection) {
      formSection.style.display = "block";
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  function hideForm() {
    // Show header
    const header = document.querySelector(".site-header-wrapper");
    if (header) {
      header.style.display = "block";
    }

    // Show image slider
    const imageSlider = document.querySelector(".image-slider-container");
    if (imageSlider) {
      imageSlider.style.display = "block";
    }

    // Show "Try it for free before you pay" section
    const tryItFreeSection = document.querySelector("#section-mobile-cta");
    if (tryItFreeSection) {
      tryItFreeSection.classList.remove("d-none");
    }

    // Show all sections
    document.querySelectorAll("section").forEach((section) => {
      section.style.display = "block";
    });

    // Hide form section
    const formSection = document.getElementById("section-form");
    if (formSection) {
      formSection.style.display = "none";
    }
  }

  // Initialize image slider
  function initializeImageSlider() {
    const imageSlider = document.querySelector(".image-slider");
    if (imageSlider) {
      new Swiper(imageSlider, {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });
    }
  }

  // Initialize image slider on page load
  initializeImageSlider();

  // Initialize form on page load
  initializeForm();

  // Initialize video play buttons
  initializeVideoPlayButtons();

  // Initialize dropdown functionality
  initializeDropdown();

  // Initialize phone number masking
  initializePhoneMask();

  // Initialize video play buttons
  function initializeVideoPlayButtons() {
    console.log("Initializing video play buttons...");
    const testimonialVideos = document.querySelectorAll(".testimonial-video");
    console.log("Found testimonial videos:", testimonialVideos.length);

    testimonialVideos.forEach((videoContainer, index) => {
      const video = videoContainer.querySelector(".video-player");
      const playButton = videoContainer.querySelector(".play-button");

      console.log(`Video ${index + 1}:`, {
        video: video,
        playButton: playButton,
        videoContainer: videoContainer,
      });

      // Function to toggle video play/pause
      function toggleVideo() {
        console.log("Toggle video called, video paused:", video.paused);
        const overlay = videoContainer.querySelector(".video-overlay");

        if (video.paused) {
          video.play();
          if (playButton) {
            playButton.style.display = "none";
          }
          if (overlay) {
            overlay.style.display = "none";
          }
          // Remove dark overlay when playing
          videoContainer.style.setProperty("--dark-overlay-opacity", "0");
        } else {
          video.pause();
          if (playButton) {
            playButton.style.display = "block";
          }
          if (overlay) {
            overlay.style.display = "block";
          }
          // Restore dark overlay when paused
          videoContainer.style.setProperty("--dark-overlay-opacity", "1");
        }
      }

      // Click on video area to play/pause
      videoContainer.addEventListener("click", function (e) {
        console.log("Video container clicked");
        // Don't trigger if clicking on the overlay text
        if (!e.target.closest(".video-overlay")) {
          toggleVideo();
        }
      });

      // Click on play button to play/pause
      if (playButton) {
        console.log("Adding click listener to play button");
        playButton.addEventListener("click", function (e) {
          console.log("Play button clicked");
          e.stopPropagation(); // Prevent triggering video container click
          toggleVideo();
        });
      }

      // Show play button and overlay when video ends
      video.addEventListener("ended", function () {
        if (playButton) {
          playButton.style.display = "block";
        }
        const overlay = videoContainer.querySelector(".video-overlay");
        if (overlay) {
          overlay.style.display = "block";
        }
        // Restore dark overlay when video ends
        videoContainer.style.setProperty("--dark-overlay-opacity", "1");
      });
    });
  }

  // Initialize dropdown functionality
  function initializeDropdown() {
    const dropdownWrapper = document.querySelector(".dropdown-wrapper");
    const dropdownInput = document.querySelector(".dropdown-input");
    const dropdownOptions = document.querySelectorAll(".dropdown-option");
    const dropdownArrow = document.querySelector(".dropdown-arrow");

    if (!dropdownWrapper || !dropdownInput) return;

    // Toggle dropdown on input click
    dropdownInput.addEventListener("click", function (e) {
      e.preventDefault();
      dropdownWrapper.classList.toggle("open");
    });

    // Toggle dropdown on arrow click
    if (dropdownArrow) {
      dropdownArrow.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropdownWrapper.classList.toggle("open");
      });
    }

    // Handle option selection
    dropdownOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        dropdownInput.value = value;
        dropdownWrapper.classList.remove("open");

        // Update selected state
        dropdownOptions.forEach((opt) => opt.classList.remove("selected"));
        this.classList.add("selected");

        // Trigger input change for form validation
        dropdownInput.dispatchEvent(new Event("input"));
      });
    });

    // Search functionality
    dropdownInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();

      dropdownOptions.forEach((option) => {
        const optionText = option.textContent.toLowerCase();
        if (optionText.includes(searchTerm)) {
          option.classList.remove("hidden");
        } else {
          option.classList.add("hidden");
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!dropdownWrapper.contains(e.target)) {
        dropdownWrapper.classList.remove("open");
      }
    });

    // Handle keyboard navigation
    dropdownInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dropdownWrapper.classList.toggle("open");
      } else if (e.key === "Escape") {
        dropdownWrapper.classList.remove("open");
      }
    });
  }

  // Initialize phone number masking with IMask
  function initializePhoneMask() {
    const phoneInput = document.querySelector("#phone");

    if (phoneInput && window.IMask) {
      const phoneMask = IMask(phoneInput, {
        mask: "(000) 000-0000",
        lazy: false,
      });

      // Update the phone validation to work with masked input
      phoneInput.addEventListener("blur", function () {
        const value = phoneInput.value;
        const digitsOnly = value.replace(/\D/g, "");

        if (value && digitsOnly.length !== 10) {
          phoneInput.style.borderColor = "#e53e3e";

          // Remove existing error message if any
          const formGroup = phoneInput.closest(".form-group");
          const existingError = formGroup
            ? formGroup.querySelector(".error-message")
            : null;
          if (existingError) existingError.remove();

          const errorMsg = createErrorMessage(
            "Please enter a valid US phone number"
          );

          if (formGroup) {
            formGroup.appendChild(errorMsg);
          }
        } else {
          phoneInput.style.borderColor = "";
          // Remove any existing error message
          const formGroup = phoneInput.closest(".form-group");
          const existingError = formGroup
            ? formGroup.querySelector(".error-message")
            : null;
          if (existingError) existingError.remove();
        }
      });

      // Clear error when user starts typing
      phoneInput.addEventListener("input", function () {
        const formGroup = phoneInput.closest(".form-group");
        const existingError = formGroup
          ? formGroup.querySelector(".error-message")
          : null;
        if (existingError) existingError.remove();
        phoneInput.style.borderColor = "";
      });
    }
  }

  const ctaButtons = document.querySelectorAll(
    ".btn-primary, .hero-cta, .header-btn"
  );

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      showForm();
    });
  });
});
