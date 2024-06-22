// =========================================================
// Löschen aller Einträge in localStorage, die mit "question" beginnen
// Promt: 3.9
// =========================================================
document.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (
      key.includes("question") ||
      key.includes("bestMovieTitle") ||
      key.includes("randomMovieTitle")
    ) {
      localStorage.removeItem(key);
      i--;
    }
  }
});
