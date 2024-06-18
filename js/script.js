window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var header = document.getElementById("header");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    header.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; // Leicht transparenter schwarzer Hintergrund
  } else {
    header.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Transparenter Hintergrund
  }
}

// Current Question ID gets extracted from the URL
function getQuestionId() {
  const url = window.location.href;
  const questionId = url.match(/frage(\d+)\.html/)[1];
  return parseInt(questionId);
}

// Loop through all buttons with class "answer" and add event listener "click"
document.querySelectorAll(".answer").forEach((button) => {
  button.addEventListener("click", () => {
    const questionId = getQuestionId();
    const nextQuestionId = questionId + 1;

    // Store data-value (see frage1.html) to localStorage
    localStorage.setItem(
      "question" + questionId,
      button.getAttribute("data-value")
    );

    // After data-value is stored redirect to next question (fragen + nextQuestionId + .html)
    if (nextQuestionId <= 5) {
      window.location.href = `frage${nextQuestionId}.html`;
    } else {
      window.location.href = "empfehlung.html";
    }
  });
});

// Rating films
const quizData = {
  questions: [
    {
      id: 1,
      criteria: "action",
    },
    {
      id: 2,
      criteria: "comedy",
    },
    {
      id: 3,
      criteria: "romance",
    },
    {
      id: 4,
      criteria: "thriller",
    },
    {
      id: 5,
      criteria: "fantasy",
    },
  ],
  movies: [
    {
      title: "Godzilla",
      ratings: {
        action: 5,
        comedy: 1,
        romance: 1,
        thriller: 3,
        fantasy: 4,
      },
    },
    {
      title: "Spiderman",
      ratings: {
        action: 4,
        comedy: 3,
        romance: 2,
        thriller: 3,
        fantasy: 5,
      },
    },
    {
      title: "Kong: Skull Island",
      ratings: {
        action: 5,
        comedy: 2,
        romance: 1,
        thriller: 4,
        fantasy: 4,
      },
    },
    {
      title: "Badland Hunters",
      ratings: {
        action: 4,
        comedy: 1,
        romance: 1,
        thriller: 5,
        fantasy: 3,
      },
    },
    {
      title: "Matrix",
      ratings: {
        action: 5,
        comedy: 1,
        romance: 1,
        thriller: 5,
        fantasy: 5,
      },
    },
    {
      title: "Kung Fu Panda",
      ratings: {
        action: 3,
        comedy: 5,
        romance: 1,
        thriller: 1,
        fantasy: 4,
      },
    },
    {
      title: "Shrek",
      ratings: {
        action: 2,
        comedy: 5,
        romance: 3,
        thriller: 1,
        fantasy: 4,
      },
    },
    {
      title: "The Wolf of Wall Street",
      ratings: {
        action: 2,
        comedy: 5,
        romance: 1,
        thriller: 5,
        fantasy: 1,
      },
    },
    {
      title: "Zurueck in die Zukunft",
      ratings: {
        action: 4,
        comedy: 5,
        romance: 3,
        thriller: 4,
        fantasy: 4,
      },
    },
    {
      title: "Ted",
      ratings: {
        action: 1,
        comedy: 5,
        romance: 1,
        thriller: 2,
        fantasy: 2,
      },
    },
    {
      title: "Fifty Shades of Grey",
      ratings: {
        action: 1,
        comedy: 1,
        romance: 5,
        thriller: 4,
        fantasy: 2,
      },
    },
    {
      title: "Twilight",
      ratings: {
        action: 2,
        comedy: 1,
        romance: 5,
        thriller: 3,
        fantasy: 4,
      },
    },
    {
      title: "Breaking Dawn",
      ratings: {
        action: 2,
        comedy: 1,
        romance: 5,
        thriller: 3,
        fantasy: 4,
      },
    },
    {
      title: "Eclipse",
      ratings: {
        action: 2,
        comedy: 1,
        romance: 5,
        thriller: 3,
        fantasy: 4,
      },
    },
    {
      title: "Through My Window",
      ratings: {
        action: 3,
        comedy: 1,
        romance: 3,
        thriller: 5,
        fantasy: 2,
      },
    },
    {
      title: "Birdbox",
      ratings: {
        action: 3,
        comedy: 1,
        romance: 1,
        thriller: 5,
        fantasy: 3,
      },
    },
    {
      title: "Split",
      ratings: {
        action: 3,
        comedy: 1,
        romance: 1,
        thriller: 5,
        fantasy: 2,
      },
    },
    {
      title: "Gesetz der Rache",
      ratings: {
        action: 5,
        comedy: 1,
        romance: 1,
        thriller: 5,
        fantasy: 1,
      },
    },
    {
      title: "San Andreas",
      ratings: {
        action: 5,
        comedy: 2,
        romance: 1,
        thriller: 4,
        fantasy: 3,
      },
    },
    {
      title: "The Equalizer",
      ratings: {
        action: 5,
        comedy: 1,
        romance: 1,
        thriller: 5,
        fantasy: 1,
      },
    },
    {
      title: "Aquaman",
      ratings: {
        action: 5,
        comedy: 2,
        romance: 2,
        thriller: 3,
        fantasy: 5,
      },
    },
    {
      title: "Pikachu",
      ratings: {
        action: 3,
        comedy: 3,
        romance: 1,
        thriller: 2,
        fantasy: 4,
      },
    },
    {
      title: "Chihiros Reise ins Zauberland",
      ratings: {
        action: 2,
        comedy: 1,
        romance: 2,
        thriller: 1,
        fantasy: 5,
      },
    },
    {
      title: "Jumanji",
      ratings: {
        action: 4,
        comedy: 5,
        romance: 1,
        thriller: 3,
        fantasy: 4,
      },
    },
    {
      title: "Ghost Rider",
      ratings: {
        action: 4,
        comedy: 1,
        romance: 1,
        thriller: 3,
        fantasy: 5,
      },
    },
  ],
};

// getting userAnswers from localStorage by iterating over all keys
let userAnswers = {};

for (let i = 0; i < localStorage.length; i++) {
  // get localStorage key by index (0,1,2,3,...)
  let key = localStorage.key(i);

  if (key.includes("question")) {
    userAnswers[key] = localStorage.getItem(key);
  }
}

// Calculating difference between the user answers and the movie ratings
let movieScores = [];

quizData.movies.forEach((movie) => {
  // Setting score to 0 for each movie
  let score = 0;

  // TODO: Calculate the score by iterating to 5
  quizData.questions.forEach((question) => {
    let answerValue = userAnswers[`question${question.id}`];

    if (answerValue) {
      score += Math.abs(movie.ratings[question.criteria] - answerValue);
    }
  });

  movieScores.push({
    title: movie.title,
    score: score,
  });
});

// Sort movies by score
movieScores.sort((a, b) => a.score - b.score);
console.log(movieScores);

// Beste Empfehlung ausgeben
let bestMovie = movieScores[0];

console.log(
  `Wir empfehlen dir den Film: ${bestMovie.title} mit einem Score von: ${bestMovie.score}`
);

// Wert in localStorage speichern
localStorage.setItem("bestMovieTitle", bestMovie.title);
