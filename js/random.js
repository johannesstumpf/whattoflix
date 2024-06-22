// =========================================================
// Event-Listener für den "zufälliger Film"-Button auf der Startseite
// Quelle: https://www.w3schools.com/jsref/met_document_getelementbyid.asp
// Quelle: https://www.w3schools.com/jsref/met_document_addeventlistener.asp
// =========================================================
document
  .getElementById("random-movie-button")
  ?.addEventListener("click", async function (event) {
    // =========================================================
    // Verhindert die Standardaktion des Links
    // Quelle: https://www.w3schools.com/jsref/event_preventdefault.asp
    // =========================================================
    event.preventDefault();

    // =========================================================
    //Funktion, um Filme aus der JSON-Datei zu laden
    // Quelle: https://www.w3schools.com/jsref/api_fetch.asp
    // =========================================================
    fetch("/data/filme.json")
      .then((response) => response.json())
      .then((data) => {
        // =========================================================
        // Funktion, um einen zufälligen Film auszuwählen
        // Promt: 3.6
        // =========================================================
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
