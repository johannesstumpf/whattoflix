// =========================================================
// Holt oder erstellt die accessCount-Elemente aus dem lokalen Speicher und gibt sie als Array zurück
// https://www.w3schools.com/js/js_json_parse.asp
// =========================================================
function getAccessCount() {
  let accessCount = localStorage.getItem("accessCount");
  if (!accessCount) {
    accessCount = {};
  } else {
    accessCount = JSON.parse(accessCount);
  }
  return accessCount;
}
// =========================================================
// Speichert das aktuelle accessCount-Objekt im lokalen Speicher
// Promt: 3.7.1
// =========================================================
function storeAccessCount(movieTitle) {
  let accessCount = getAccessCount();
  if (accessCount[movieTitle]) {
    accessCount[movieTitle]++;
  } else {
    accessCount[movieTitle] = 1;
  }
  accessCount = sortAccessCount(accessCount);
  localStorage.setItem("accessCount", JSON.stringify(accessCount));
}

// =========================================================
// Sortiert das accessCount-Objekt nach der Anzahl der Zugriffe
// Quelle: https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
// =========================================================
function sortAccessCount(accessCount) {
  return Object.fromEntries(
    Object.entries(accessCount).sort(([, a], [, b]) => b - a)
  );
}

// =========================================================
// Holt oder erstellt die Watchlist-Elemente aus dem lokalen Speicher und gibt sie als Array zurück
// Quelle: https://www.w3schools.com/js/js_json_parse.asp
// =========================================================
function getWatchlist() {
  let watchlist = localStorage.getItem("watchlist");
  if (!watchlist) {
    watchlist = [];
  } else {
    watchlist = JSON.parse(watchlist);
  }
  return watchlist;
}

// =========================================================
// Fügt einen Film zur Watchlist hinzu, wenn der Film noch nicht in der Watchlist ist
// Quelle:
// =========================================================
function addToWatchlist(movieTitle) {
  let watchlist = getWatchlist();
  if (watchlist.includes(movieTitle)) {
    return;
  }
  watchlist.push(movieTitle);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

// =========================================================
// Holt Filmdaten aus der JSON-Datei
// Quelle1: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// Quelle2: https://jakearchibald.com/2017/await-vs-return-vs-return-await/
// Promt: 3.7.2
// =========================================================
async function getMovieData(movieTitle) {
  return await fetch("/data/filme.json")
    .then((response) => response.json())
    .then((data) => {
      return data[movieTitle];
    });
}

// =========================================================
// Behandelt Klick-Ereignisse auf "Mehr anzeigen" und "Weniger anzeigen" Links innerhalb jedes Filmelements
// Promt: 3.7.3
// =========================================================
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("popularMoviesContainer")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("show-more-link")) {
        event.preventDefault();
        const movieItem = event.target.closest(".movie-item");
        movieItem.classList.add("expanded");
        event.target.style.display = "none";
        movieItem.querySelector(".show-less-link").style.display = "block";
      } else if (event.target.classList.contains("show-less-link")) {
        event.preventDefault();
        const movieItem = event.target.closest(".movie-item");
        movieItem.classList.remove("expanded");
        event.target.style.display = "none";
        movieItem.querySelector(".show-more-link").style.display = "block";
      }
    });
});
