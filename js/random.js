// Event-Listener für den "zufälliger Film"-Button auf der Startseite
document
  .getElementById("random-movie-button")
  ?.addEventListener("click", async function (event) {
    event.preventDefault(); // Verhindert die Standardaktion des Links

    // Funktion, um Filme aus der JSON-Datei zu laden
    fetch("/data/filme.json")
      .then((response) => response.json())
      .then((data) => {
        // Funktion, um einen zufälligen Film auszuwählen
        function getRandomMovie(movies) {
          const keys = Object.keys(movies);
          return movies[keys[Math.floor(Math.random() * keys.length)]];
        }

        // Zufälligen Film im localStorage speichern
        const randomMovie = getRandomMovie(data);
        localStorage.setItem("randomMovieTitle", randomMovie["movie-title"]);
        // Auf die neue Seite weiterleiten
        window.location.href = "empfehlung.html";
      });
  });
