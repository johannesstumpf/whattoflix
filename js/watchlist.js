async function updateWatchlist() {
  // Get watchlist items from localStorage (function from global.js)
  const watchlist = getWatchlist();
  console.log(watchlist);

  // Get the container where the Watchlist items will be displayed
  const container = document.getElementById("WatchlistContainer");
  const noMoviesMessage = document.getElementById("no-movies-message");
  const currentMovieTitle = document.getElementById("current-movie-title");
  const sliderControls = document.getElementById("slider-controls");

  // Clear previous items in the container
  container.innerHTML = "";

  if (watchlist.length === 0) {
    // Show "No movies" message if watchlist is empty
    noMoviesMessage.style.display = "block";
    currentMovieTitle.style.display = "none";
    sliderControls.style.display = "none";
  } else {
    // Hide "No movies" message if watchlist is not empty
    noMoviesMessage.style.display = "none";
    currentMovieTitle.style.display = "block";
    sliderControls.style.display = "flex";

    // Create a new item for each movie (loop for each movie in the watchlist)
    for (let movieTitle of watchlist) {
      const movieData = await getMovieData(movieTitle);

      // Create a new slide element
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide", "tranding-slide");

      // Create the slide content
      const slideContent = `
        <div class="tranding-slide-img">
          <img src="${movieData["movie-image"]}" alt="${movieData["movie-title"]}" />
        </div>
        <a class="movie-link" href="${movieData["movie-link"]}" target="_blank">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <span class="movie-title" style="display:none;">${movieData["movie-title"]}</span>
      `;

      // Append the content to the slide
      slide.innerHTML = slideContent;

      // Append the slide to the container
      container.appendChild(slide);
    }

    // Initialize the Swiper instance after adding all slides
    var TrandingSlider = new Swiper('.tranding-slider', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: watchlist.length > 1, // Enable looping only if more than one slide
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChange: function () {
          var currentIndex = this.realIndex;
          var titles = document.querySelectorAll('.swiper-slide .movie-title');
          var links = document.querySelectorAll('.swiper-slide .movie-link');
          var activeTitle = titles[currentIndex];
          var centeredTitle = document.querySelector('#current-movie-title .movie-titel');
          centeredTitle.textContent = activeTitle.textContent;
          document.getElementById('open-movie-link').href = links[currentIndex].href;
        }
      },
      loopAdditionalSlides: 5,
    });

    // Set initial title and link
    var initialTitles = document.querySelectorAll('.swiper-slide .movie-title');
    var initialLinks = document.querySelectorAll('.swiper-slide .movie-link');
    document.querySelector('#current-movie-title .movie-titel').textContent = initialTitles[0].textContent;
    document.getElementById('open-movie-link').href = initialLinks[0].href;

    // Add event listener to the remove button
    document.getElementById('remove-movie-button').addEventListener('click', function(event) {
      event.preventDefault();
      const currentIndex = TrandingSlider.realIndex;
      const titles = document.querySelectorAll('.swiper-slide .movie-title');
      const titleToRemove = titles[currentIndex].textContent;
      removeFromWatchlist(titleToRemove);
      updateWatchlist();
    });
  }
}

// Function to remove a movie from the watchlist
function removeFromWatchlist(title) {
  let watchlist = getWatchlist();
  watchlist = watchlist.filter(movieTitle => movieTitle !== title);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

// Call the function to update the watchlist
updateWatchlist();
