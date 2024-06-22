document.addEventListener("DOMContentLoaded", async () => {
  // =========================================================
  // Titel der besten Empfehlung aus localStorage abrufen und prüfen, ob es sich um die beste Empfehlung handelt oder eine zufällige Empfehlung ist
  // Quelle: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  // Prompt: 3.2.1
  // =========================================================
  let userSelection = localStorage.getItem("bestMovieTitle");
  let isBestMovie = true;
  if (!userSelection) {
    userSelection = localStorage.getItem("randomMovieTitle");
    isBestMovie = false;
  }

  // =========================================================
  // Speichere den Film in accessCount, wenn es sich um die beste Empfehlung handelt
  // Quelle: https://www.w3schools.com/js/js_async.asp
  // =========================================================
  const recommendedMovie = await getMovieData(userSelection);
  console.log(recommendedMovie);
  if (isBestMovie) {
    storeAccessCount(recommendedMovie["movie-title"]);
  }

  // =========================================================
  // Setze die Informationen auf der Seite ein
  // Quelle: https://www.w3schools.com/jsref/prop_node_innertext.asp
  // =========================================================
  document.getElementById("movie-title").innerText =
    recommendedMovie["movie-title"];
  document.getElementById("movie-description").innerText =
    recommendedMovie["movie-description"];
  document.getElementById(
    "movie-link"
  ).href = `${recommendedMovie["movie-link"]}`;

  // =========================================================
  // Setze das Hintergrundbild
  // Quelle: https://www.w3schools.com/jsref/prop_style_backgroundimage.asp
  // =========================================================
  document.body.style.backgroundImage = `url(${recommendedMovie["movie-image"]})`;

  // =========================================================
  // Füge den Film zur Watchlist hinzu oder entferne ihn
  // Quelle: https://www.w3schools.com/jsref/prop_node_innerhtml.asp
  // =========================================================
  const watchlistButton = document.getElementById("watchlist-button");
  let isInWatchlist = false;

  // =========================================================
  // Initialisiere den Button-Text basierend auf dem aktuellen Watchlist-Status
  // Quelle: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  // =========================================================
  let movieTitle =
    localStorage.getItem("bestMovieTitle") ||
    localStorage.getItem("randomMovieTitle");
  if (isInWatchlistInStorage(movieTitle)) {
    // Funktion zum Überprüfen, ob der Film in der Watchlist ist
    isInWatchlist = true;
    watchlistButton.innerHTML =
      '<i class="fa-solid fa-circle-minus"></i> Aus Watchlist entfernen';
  }

  watchlistButton.addEventListener("click", async function (event) {
    // =========================================================
    // Verhindert die Standardaktion des Links
    // Quelle: https://www.w3schools.com/jsref/event_preventdefault.asp
    // =========================================================
    event.preventDefault();
    isInWatchlist = !isInWatchlist;

    if (isInWatchlist) {
      watchlistButton.innerHTML =
        '<i class="fa-solid fa-circle-minus"></i> Aus Watchlist entfernen';
      addToWatchlist(movieTitle);
    } else {
      watchlistButton.innerHTML =
        '<i class="fa-solid fa-circle-plus"></i> Zur Watchlist hinzufügen';
      removeFromWatchlist(movieTitle);
    }
  });
});

// =========================================================
// Funktion zum Überprüfen, ob der Film in der Watchlist ist
// Promt: 3.2.2
// =========================================================
function isInWatchlistInStorage(movieTitle) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  return watchlist.includes(movieTitle);
}

// =========================================================
// Beispiel für die addToWatchlist-Funktion
// Promt: 3.2.3
// =========================================================
function addToWatchlist(movieTitle) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  if (!watchlist.includes(movieTitle)) {
    watchlist.push(movieTitle);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
}

// =========================================================
// Beispiel für die removeFromWatchlist-Funktion
// Promt: 3.2.4
// =========================================================
function removeFromWatchlist(movieTitle) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist = watchlist.filter((title) => title !== movieTitle);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}
