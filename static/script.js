
// =========================================
// PORTFOLIO JAVASCRIPT
// Image Lightbox and Navigation
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");

    // Stop if the lightbox elements are unavailable.
    if (!lightbox || !lightboxImage || !lightboxCaption) {
        return;
    }

    // Collect all project and certificate images.
    const images = Array.from(
        document.querySelectorAll(".portfolio-gallery img")
    );

    const closeButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");

    let currentIndex = 0;
    let lastFocusedElement = null;

    // =====================================
    // DISPLAY SELECTED IMAGE
    // =====================================

    function showImage(index) {

        if (!images.length) {
            return;
        }

        // Loop back to the first or last image.
        currentIndex = (index + images.length) % images.length;

        const selectedImage = images[currentIndex];

        lightboxImage.src =
            selectedImage.currentSrc || selectedImage.src;

        lightboxImage.alt =
            selectedImage.alt || "Portfolio image";

        // Get the project or certificate title.
        const item = selectedImage.closest(".portfolio-item");

        const title = item
            ? item.querySelector("summary")
            : null;

        const titleText = title
            ? title.textContent.trim()
            : "Portfolio Image";

        const imageDescription =
            selectedImage.alt || "Portfolio image";

        lightboxCaption.textContent =
            titleText + " — " + imageDescription;
    }


    // =====================================
    // OPEN IMAGE VIEWER
    // =====================================

    function openLightbox(index) {

        lastFocusedElement = document.activeElement;

        showImage(index);

        lightbox.classList.add("is-open");

        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("lightbox-open");

        if (closeButton) {
            closeButton.focus();
        }
    }


    // =====================================
    // CLOSE IMAGE VIEWER
    // =====================================

    function closeLightbox() {

        lightbox.classList.remove("is-open");

        lightbox.setAttribute("aria-hidden", "true");

        document.body.classList.remove("lightbox-open");

        lightboxImage.removeAttribute("src");

        // Return keyboard focus to the selected thumbnail.
        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus === "function"
        ) {
            lastFocusedElement.focus();
        }
    }


    // =====================================
    // PREVIOUS IMAGE
    // =====================================

    function showPreviousImage() {
        showImage(currentIndex - 1);
    }


    // =====================================
    // NEXT IMAGE
    // =====================================

    function showNextImage() {
        showImage(currentIndex + 1);
    }


    // =====================================
    // IMAGE CLICK AND KEYBOARD SUPPORT
    // =====================================

    images.forEach(function (image, index) {

        image.addEventListener("click", function () {
            openLightbox(index);
        });

        // Make images keyboard accessible.
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");

        image.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                openLightbox(index);
            }
        });

    });


    // =====================================
    // BUTTON EVENTS
    // =====================================

    if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
    }

    if (previousButton) {
        previousButton.addEventListener(
            "click",
            showPreviousImage
        );
    }

    if (nextButton) {
        nextButton.addEventListener(
            "click",
            showNextImage
        );
    }


    // =====================================
    // CLICK OUTSIDE IMAGE TO CLOSE
    // =====================================

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    // =====================================
    // KEYBOARD NAVIGATION
    // =====================================

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("is-open")) {
            return;
        }

        if (event.key === "Escape") {

            closeLightbox();

        } else if (event.key === "ArrowLeft") {

            showPreviousImage();

        } else if (event.key === "ArrowRight") {

            showNextImage();

        }

    });

});
