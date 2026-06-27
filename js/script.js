console.log("Thu Htet portfolio loaded.");

const reveals = document.querySelectorAll(".reveal");

function revealSections() {
    reveals.forEach(section => {
        const windowHeight = window.innerHeight;
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;

        const revealPoint = 120;

        if (sectionTop < windowHeight - revealPoint && sectionBottom > revealPoint) {
            section.classList.add("active");
        } else {
            section.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxLinks = document.querySelectorAll(".lightbox-link");

lightboxLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        lightboxImage.src = link.href;
        lightboxImage.alt = link.querySelector("img").alt;

        lightbox.classList.add("active");
    });
});

function closeLightbox() {
    lightbox.classList.remove("active");
    lightboxImage.src = "";
}

if (lightbox && lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
}

const mediaLightbox = document.getElementById("mediaLightbox");
const mediaLightboxImage = document.getElementById("mediaLightboxImage");
const mediaLightboxVideo = document.getElementById("mediaLightboxVideo");
const mediaLightboxClose = document.getElementById("mediaLightboxClose");

const imageLinks = document.querySelectorAll(".lightbox-link");
const videoTriggers = document.querySelectorAll(".video-trigger");

function openImageLightbox(imageSrc, imageAlt) {
    if (!mediaLightbox) return;

    mediaLightbox.classList.add("active");

    mediaLightboxImage.src = imageSrc;
    mediaLightboxImage.alt = imageAlt;
    mediaLightboxImage.classList.add("active");

    mediaLightboxVideo.classList.remove("active");
    mediaLightboxVideo.pause();
}

function openVideoLightbox(videoSrc) {
    if (!mediaLightbox) return;

    mediaLightbox.classList.add("active");

    mediaLightboxVideo.querySelector("source").src = videoSrc;
    mediaLightboxVideo.load();
    mediaLightboxVideo.classList.add("active");

    mediaLightboxImage.classList.remove("active");
    mediaLightboxImage.src = "";
}

function closeMediaLightbox() {
    if (!mediaLightbox) return;

    mediaLightbox.classList.remove("active");

    mediaLightboxImage.classList.remove("active");
    mediaLightboxImage.src = "";

    mediaLightboxVideo.classList.remove("active");
    mediaLightboxVideo.pause();
    mediaLightboxVideo.querySelector("source").src = "";
}

imageLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const image = link.querySelector("img");
        openImageLightbox(link.href, image.alt);
    });
});

videoTriggers.forEach(button => {
    button.addEventListener("click", () => {
        openVideoLightbox(button.dataset.video);
    });
});

if (mediaLightbox && mediaLightboxClose) {
    mediaLightboxClose.addEventListener("click", closeMediaLightbox);

    mediaLightbox.addEventListener("click", event => {
        if (event.target === mediaLightbox) {
            closeMediaLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMediaLightbox();
        }
    });
}