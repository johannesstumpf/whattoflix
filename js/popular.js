// =========================================================
// Funktion zur Aktualisierung der beliebten Filme
// Quelle: https://www.w3schools.com/js/js_async.asp
// =========================================================
async function updatePopularMovies() {
  // Holt accessCount-Elemente aus dem lokalen Speicher (Funktion aus global.js)
  const accessCount = getAccessCount();
  console.log(accessCount);

  // =========================================================
  // Ermittelt die fünf beliebtesten Filme basierend auf accessCount
  // Quelle: https://www.w3schools.com/jsref/jsref_object_keys.asp
  // Quelle: https://www.w3schools.com/jsref/jsref_slice_string.asp
  // =========================================================
  const popularMovies = Object.keys(accessCount).slice(0, 5);
  console.log(popularMovies);

  // Holt das Template aus der HTML
  const template = document.getElementById("popularMoviesItemTemplate");

  // Holt den Container, in dem die PopularMovie-Elemente angezeigt werden sollen
  const container = document.getElementById("popularMoviesContainer");

  // =========================================================
  // Leert vorherige Elemente im Container
  // Promt: 3.7.2
  // =========================================================
  container.innerHTML = "";

  // =========================================================
  // Erstellt für jeden Film ein neues Element (Schleife für jeden Film in popularMovies)
  // Quelle: https://www.youtube.com/watch?v=OSficvLDefM
  // Promt: 3.7.3
  // =========================================================
  for (let movieTitle of popularMovies) {
    const movieData = await getMovieData(movieTitle);

    const clone = document.importNode(template.content, true);
    clone
      .querySelector(".movie-image")
      .setAttribute("src", movieData["movie-image"]);
    clone.querySelector(".movie-title").textContent = movieData["movie-title"];
    clone.querySelector(".movie-description").textContent =
      movieData["movie-description"];
    clone
      .querySelector(".movie-link")
      .setAttribute("href", movieData["movie-link"]);

    container.appendChild(clone);
  }
}
updatePopularMovies();
