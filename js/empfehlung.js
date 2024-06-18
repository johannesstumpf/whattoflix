document.addEventListener("DOMContentLoaded", async () => {
  // Titel der besten Empfehlung aus localStorage abrufen und prüfen, ob es sich um die beste Empfehlung handelt oder eine zufällige Empfehlung ist
  let userSelection = localStorage.getItem("bestMovieTitle");
  let isBestMovie = true;
  if (!userSelection) {
    userSelection = localStorage.getItem("randomMovieTitle");
    isBestMovie = false;
  }
  const recommendedMovie = await getMovieData(userSelection);
  console.log(recommendedMovie);

  // Speichere den Film in accessCount, wenn es sich um die beste Empfehlung handelt
  if (isBestMovie) {
    storeAccessCount(recommendedMovie["movie-title"]);
  }

  // Setze die Informationen auf der Seite ein
  document.getElementById("movie-title").innerText =
    recommendedMovie["movie-title"];
  document.getElementById("movie-description").innerText =
    recommendedMovie["movie-description"];
  document.getElementById(
    "movie-link"
  ).href = `${recommendedMovie["movie-link"]}`;

  // Setze das Hintergrundbild
  document.body.style.backgroundImage = `url(${recommendedMovie["movie-image"]})`;

  // Füge den Film zur Watchlist hinzu oder entferne ihn
  const watchlistButton = document.getElementById("watchlist-button");
  let isInWatchlist = false; // Zustandvariable für den Watchlist-Status

  // Initialisiere den Button-Text basierend auf dem aktuellen Watchlist-Status
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
    event.preventDefault(); // Verhindert die Standardaktion des Links
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

// Funktion zum Überprüfen, ob der Film in der Watchlist ist
function isInWatchlistInStorage(movieTitle) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  return watchlist.includes(movieTitle);
}

// Beispiel für die addToWatchlist-Funktion
function addToWatchlist(movieTitle) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  if (!watchlist.includes(movieTitle)) {
    watchlist.push(movieTitle);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
}

// Beispiel für die removeFromWatchlist-Funktion
function removeFromWatchlist(movieTitle) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist = watchlist.filter((title) => title !== movieTitle);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}
