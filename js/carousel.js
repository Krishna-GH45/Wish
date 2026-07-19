(function () {
  "use strict";

  var carousel = document.getElementById("wishCarousel");
  if (!carousel) return;

  var cards = carousel.querySelectorAll(".wish-card");
  var prevBtn = document.getElementById("prevWish");
  var nextBtn = document.getElementById("nextWish");
  var dotsContainer = document.getElementById("carouselDots");
  var current = 0;
  var total = cards.length;

  function buildDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";
    for (var i = 0; i < total; i++) {
      var dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Go to wish " + (i + 1));
      dot.dataset.index = i;
      dot.addEventListener("click", function () {
        goTo(parseInt(this.dataset.index, 10));
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    var dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === current);
    });
  }

  function goTo(index) {
    cards[current].classList.remove("active");
    current = (index + total) % total;
    cards[current].classList.add("active");
    updateDots();
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

  var touchStartX = 0;
  carousel.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  carousel.addEventListener(
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

  buildDots();
})();
