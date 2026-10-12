const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    }
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const heroSlides = [...document.querySelectorAll(".hero-slide")];
const slideNumber = document.querySelector("[data-slide-number]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (heroSlides.length > 1 && slideNumber && !reducedMotion.matches) {
  let activeSlide = heroSlides.findIndex((slide) => slide.classList.contains("is-active"));
  if (activeSlide < 0) activeSlide = 0;

  window.setInterval(() => {
    if (document.hidden) return;
    heroSlides[activeSlide].classList.remove("is-active");
    activeSlide = (activeSlide + 1) % heroSlides.length;
    heroSlides[activeSlide].classList.add("is-active");
    slideNumber.textContent = String(activeSlide + 1).padStart(2, "0");
  }, 3000);
}

const dobField = document.querySelector('input[name="dateOfBirth"]');

if (dobField instanceof HTMLInputElement) {
  const today = new Date();
  const latestBirthDate = new Date(today.getFullYear() - Number(dobField.dataset.ageMin), today.getMonth(), today.getDate());
  const earliestBirthDate = new Date(today.getFullYear() - Number(dobField.dataset.ageMax) - 1, today.getMonth(), today.getDate() + 1);
  const toDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  dobField.max = toDateString(latestBirthDate);
  dobField.min = toDateString(earliestBirthDate);
}

const photoField = document.querySelector('input[name="playerPhoto"]');
const photoName = document.querySelector(".file-name");

if (photoField instanceof HTMLInputElement && photoName) {
  photoField.addEventListener("change", () => {
    const file = photoField.files?.[0];
    photoName.textContent = file ? file.name : "";
  });
}

const trialForm = document.querySelector("#trial-form");
const formStatus = document.querySelector("#form-status");

if (trialForm instanceof HTMLFormElement && formStatus) {
  trialForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const photoInput = trialForm.elements.namedItem("playerPhoto");
    if (photoInput instanceof HTMLInputElement && photoInput.files?.[0]) {
      const file = photoInput.files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxBytes = Number(photoInput.dataset.maxBytes);
      if (!allowedTypes.includes(file.type) || file.size > maxBytes) {
        photoInput.setCustomValidity("Choose a JPG, PNG or WebP image smaller than 5 MB.");
        photoInput.reportValidity();
        return;
      }
      photoInput.setCustomValidity("");
    }

    if (!trialForm.reportValidity()) return;
    formStatus.textContent = "Thanks — the form is ready to connect to the academy's secure registration service.";
  });
}

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  if (!(form instanceof HTMLFormElement)) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const status = form.querySelector('[role="status"]');
    if (status) status.textContent = "Scout access will be available when the secure portal launches.";
  });
});
