(function () {
  "use strict";

  var gallery = document.getElementById("photoGallery");
  var lightbox = document.getElementById("galleryLightbox");
  if (!gallery || !lightbox) return;

  var items = gallery.querySelectorAll(".gallery-item");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCounter = document.getElementById("lightboxCounter");
  var closeBtn = document.getElementById("lightboxClose");
  var prevBtn = document.getElementById("lightboxPrev");
  var nextBtn = document.getElementById("lightboxNext");
  var current = 0;
  var touchStartX = 0;

  function getSrc(index) {
    var img = items[index].querySelector("img");
    return img ? img.src : "";
  }

  function getAlt(index) {
    var img = items[index].querySelector("img");
    return img ? img.alt : "Gallery photo";
  }

  function openLightbox(index) {
    current = index;
    lightboxImg.src = getSrc(current);
    lightboxImg.alt = getAlt(current);
    lightboxCounter.textContent = current + 1 + " / " + items.length;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  function goTo(index) {
    current = (index + items.length) % items.length;
    lightboxImg.src = getSrc(current);
    lightboxImg.alt = getAlt(current);
    lightboxCounter.textContent = current + 1 + " / " + items.length;
  }

  items.forEach(function (item, i) {
    item.addEventListener("click", function () {
      openLightbox(i);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      goTo(current - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      goTo(current + 1);
    });
  }

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });

  lightbox.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    "touchend",
    function (e) {
      var diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) < 50) return;
      if (diff < 0) {
        goTo(current + 1);
      } else {
        goTo(current - 1);
      }
    },
    { passive: true }
  );
})();
