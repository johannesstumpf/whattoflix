// Cleaning local storage for every key that includes "question"
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
