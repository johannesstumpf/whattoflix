async function updatePopularMovies() {
  //Get accessCount items from localStorage (function from global.js)
  const accessCount = getAccessCount();
  console.log(accessCount);

  //Get the top 5 most popular movies by accessCount
  const popularMovies = Object.keys(accessCount).slice(0, 5);
  console.log(popularMovies);

  //Get template from HTML
  const template = document.getElementById("popularMoviesItemTemplate");

  //Get the container where the PopularMovie items will be displayed
  const container = document.getElementById("popularMoviesContainer");

  //Clear previous items in the container
  container.innerHTML = "";

  //Create a new item for each movie (loop for each movie in accessCount)
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

// Call the function to update popular movies
updatePopularMovies();

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
