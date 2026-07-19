(function () {
  "use strict";

  var container = document.querySelector(".hearts-bg");
  if (!container) return;

  var hearts = ["💗", "💕", "💖", "💝", "🌸", "✨"];
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) return;

  function createHeart() {
    var el = document.createElement("span");
    el.className = "heart-float";
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.fontSize = Math.random() * 14 + 12 + "px";
    el.style.animationDuration = Math.random() * 6 + 8 + "s";
    container.appendChild(el);

    el.addEventListener("animationend", function () {
      el.remove();
    });
  }

  setInterval(createHeart, 900);
})();
