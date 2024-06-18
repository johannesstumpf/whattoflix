// Get or create accessCount items from localStorage and return them as an array
function getAccessCount() {
  let accessCount = localStorage.getItem("accessCount");
  if (!accessCount) {
    accessCount = {};
  } else {
    accessCount = JSON.parse(accessCount);
  }
  return accessCount;
}

// Store the current accessCount object in localStorage
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

// Sort the accessCount object by the number of accesses
function sortAccessCount(accessCount) {
  return Object.fromEntries(
    Object.entries(accessCount).sort(([, a], [, b]) => b - a)
  );
}

// Get or create watchlist items from localStorage and return them as an array
function getWatchlist() {
  let watchlist = localStorage.getItem("watchlist");
  if (!watchlist) {
    watchlist = [];
  } else {
    watchlist = JSON.parse(watchlist);
  }
  return watchlist;
}

// Add movie to watchlist if the movie is not already in the watchlist
function addToWatchlist(movieTitle) {
  let watchlist = getWatchlist();
  if (watchlist.includes(movieTitle)) {
    return;
  }
  watchlist.push(movieTitle);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

// Get movie data from the JSON file
async function getMovieData(movieTitle) {
  return await fetch("/data/filme.json")
    .then((response) => response.json())
    .then((data) => {
      return data[movieTitle];
    });
}
