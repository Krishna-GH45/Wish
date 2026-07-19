(function () {
  "use strict";

  var pages = document.querySelectorAll(".page");
  var navButtons = document.querySelectorAll("[data-nav]");

  function showPage(pageId) {
    pages.forEach(function (page) {
      page.classList.remove("page-active");
    });

    var target = document.getElementById(pageId);
    if (target) {
      target.classList.add("page-active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  navButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pageId = btn.getAttribute("data-nav");
      if (pageId) {
        showPage(pageId);
      }
    });
  });

  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    img.addEventListener("error", function () {
      var fallback = img.getAttribute("data-fallback");
      if (fallback && img.src.indexOf(fallback) === -1) {
        img.src = fallback;
      }
    });
  });
})();
