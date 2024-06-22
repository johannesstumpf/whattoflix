// =========================================================
// Fügt der Kopfzeile eine Klasse hinzu, wenn beim Scrollen der Seite nach unten gescrollt wird
// Quelle: https://www.w3schools.com/jsref/met_element_queryselector.asp
// Quelle: https://www.w3schools.com/jsref/prop_win_scrolly.asp
// Promt: 3.8
// =========================================================
window.addEventListener("scroll", function () {
  const header = document.querySelector(".fixed-header");
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
