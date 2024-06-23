async function updateWatchlist() {
  // Holen der Watchlist-Einträge aus dem localStorage (Funktion aus global.js)
  const watchlist = getWatchlist();
  console.log(watchlist);

  // =========================================================
  // Holen des Containers, in dem die Watchlist-Einträge angezeigt werden
  // Quelle: https://www.w3schools.com/jsref/met_document_getelementbyid.asp
  // =========================================================
  const container = document.getElementById("WatchlistContainer");
  const noMoviesMessage = document.getElementById("no-movies-message");
  const currentMovieTitle = document.getElementById("current-movie-title");
  const sliderControls = document.getElementById("slider-controls");

  // =========================================================
  // Vorherige Einträge im Container löschen
  // Promt: 3.4.1
  // =========================================================
  container.innerHTML = "";

  if (watchlist.length === 0) {
    // "Keine Filme" Nachricht anzeigen, wenn die Watchlist leer ist
    noMoviesMessage.style.display = "block";
    currentMovieTitle.style.display = "none";
    sliderControls.style.display = "none";
  } else {
    // "Keine Filme" Nachricht ausblenden, wenn die Watchlist nicht leer ist
    noMoviesMessage.style.display = "none";
    currentMovieTitle.style.display = "block";
    sliderControls.style.display = "flex";

    // Für jeden Film einen neuen Eintrag erstellen (Schleife für jeden Film in der Watchlist)
    for (let movieTitle of watchlist) {
      const movieData = await getMovieData(movieTitle);

      // Neues Slide-Element erstellen
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide", "tranding-slide");

      // Slide-Inhalt erstellen
      const slideContent = `
        <div class="tranding-slide-img">
          <img src="${movieData["movie-image"]}" alt="${movieData["movie-title"]}" />
        </div>
        <a class="movie-link" href="${movieData["movie-link"]}" target="_blank">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <span class="movie-title" style="display:none;">${movieData["movie-title"]}</span>
      `;

      // Inhalt dem Slide hinzufügen
      slide.innerHTML = slideContent;

      // Slide dem Container hinzufügen
      container.appendChild(slide);
    }

    // =========================================================
    // Initialisieren der Swiper-Instanz nach dem Hinzufügen aller Slides
    // Quelle: Slider basierend auf https://www.youtube.com/watch?v=li-ylRo7VEc&t=44s&ab_channel=cods
    // =========================================================
    var TrandingSlider = new Swiper(".tranding-slider", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loop: watchlist.length > 1,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        slideChange: function () {
          var currentIndex = this.realIndex;
          var titles = document.querySelectorAll(".swiper-slide .movie-title");
          var links = document.querySelectorAll(".swiper-slide .movie-link");
          var activeTitle = titles[currentIndex];
          var centeredTitle = document.querySelector(
            "#current-movie-title .movie-titel"
          );
          centeredTitle.textContent = activeTitle.textContent;
          document.getElementById("open-movie-link").href =
            links[currentIndex].href;
        },
      },
      loopAdditionalSlides: 5,
    });

    // =========================================================
    // Setzen des initialen Titels und Links
    // Quelle: https://www.youtube.com/watch?v=OSficvLDefM
    // Quelle: https://www.w3schools.com/jsref/met_document_queryselectorall.asp
    // =========================================================
    var initialTitles = document.querySelectorAll(".swiper-slide .movie-title");
    var initialLinks = document.querySelectorAll(".swiper-slide .movie-link");
    document.querySelector("#current-movie-title .movie-titel").textContent =
      initialTitles[0].textContent;
    document.getElementById("open-movie-link").href = initialLinks[0].href;

    // =========================================================
    // Eventlistener für den Entfernungs-Button hinzufügen
    // Prompt: 3.5
    // =========================================================
    document
      .getElementById("remove-movie-button")
      .addEventListener("click", function (event) {
        event.preventDefault();
        const currentIndex = TrandingSlider.realIndex;
        const titles = document.querySelectorAll(".swiper-slide .movie-title");
        const titleToRemove = titles[currentIndex].textContent;
        removeFromWatchlist(titleToRemove);
        updateWatchlist();
      });
  }
}

// =========================================================
// Funktion zum Entfernen eines Films aus der Watchlist
// Prompt: 3.5
// =========================================================
function removeFromWatchlist(title) {
  let watchlist = getWatchlist();
  watchlist = watchlist.filter((movieTitle) => movieTitle !== title);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

updateWatchlist();
