// =========================================================
// Funktion zur Anpassung des Headers beim Scrollen der Seite
// Quelle: https://www.w3schools.com/howto/howto_js_navbar_shrink_scroll.asp
// =========================================================
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  var header = document.getElementById("header");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    header.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  } else {
    header.style.backgroundColor = "rgba(0, 0, 0, 0)";
  }
}

// =========================================================
// Extrahiert die aktuelle Frage-ID aus der URL
// Promt: 3.1.1
// =========================================================
function getQuestionId() {
  const url = window.location.href;
  const questionId = url.match(/frage(\d+)\.html/)[1];
  return parseInt(questionId);
}

// =========================================================
// Durchläuft alle Buttons mit der Klasse "answer" und fügt den Eventlistener "click" hinzu
// Quelle: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
// =========================================================
document.querySelectorAll(".answer").forEach((button) => {
  button.addEventListener("click", () => {
    const questionId = getQuestionId();
    const nextQuestionId = questionId + 1;

    // =========================================================
    // Speichert den data-value (siehe frage1.html) im localStorage
    // Quelle: https://www.w3schools.com/jsref/met_storage_setitem.asp
    // =========================================================
    localStorage.setItem(
      "question" + questionId,
      button.getAttribute("data-value")
    );

    // =========================================================
    // Nachdem data-value gespeichert wurde, Weiterleitung zur nächsten Frage (frage + nextQuestionId + .html)
    // Quelle: https://www.w3schools.com/js/js_window_location.asp
    // Promt: 3.1.2
    // =========================================================
    if (nextQuestionId <= 5) {
      window.location.href = `frage${nextQuestionId}.html`;
    } else {
      window.location.href = "empfehlung.html";
    }
  });
});

// =========================================================
// Bewertung der Filme
// Promt: 3.1.3
// =========================================================
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

// =========================================================
// Holt die Benutzerantworten aus dem localStorage
// Prompt: 3.1.4
// =========================================================
let userAnswers = {};

for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);

  if (key.includes("question")) {
    userAnswers[key] = localStorage.getItem(key);
  }
}

// =========================================================
// Berechnet für jeden Film den Score basierend auf den Differenzen zwischen den Benutzerantworten und den Film-Bewertungen
// Quelle: https://www.w3schools.com/jsref/jsref_abs.asp
// Quelle: https://www.w3schools.com/jsref/jsref_push.asp
// Promt: 3.1.5
// =========================================================
let movieScores = [];
quizData.movies.forEach((movie) => {
  let score = 0;
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

// =========================================================
// Sortiert die Filme nach ihrem Score
// Quelle: https://www.w3schools.com/jsref/jsref_sort.asp
// =========================================================
movieScores.sort((a, b) => a.score - b.score);
console.log(movieScores);

// =========================================================
// Gibt die beste Empfehlung aus
// Quelle:
// =========================================================
let bestMovie = movieScores[0];

// Wert in localStorage speichern
localStorage.setItem("bestMovieTitle", bestMovie.title);
