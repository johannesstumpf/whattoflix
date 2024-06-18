document.addEventListener("DOMContentLoaded", () => {
  const results = [];
  for (let i = 1; i <= 5; i++) {
    const value = localStorage.getItem(`frage${i}`);
    results.push(parseInt(value));
  }

  // Beispielhafte Berechnung (hier individuell anpassen)
  const total = results.reduce((acc, cur) => acc + cur, 0);
  console.log("Gesamtergebnis:", total);

  // Quiz.json importieren und verarbeiten
  fetch("/data/quiz.json")
    .then((response) => response.json())
    .then((data) => {
      // Beispielhafte Nutzung der importierten Daten
      const differences = data.map((item) => {
        return {
          title: item.title,
          diff: Math.abs(item.value - total),
        };
      });

      // Sortieren nach Differenz
      differences.sort((a, b) => a.diff - b.diff);

      // Ausgabe der besten Ergebnisse
      const ergebnisContainer = document.getElementById("ergebnis-container");
      differences.slice(0, 3).forEach((result) => {
        const p = document.createElement("p");
        p.textContent = `Film: ${result.title}, Differenz: ${result.diff}`;
        ergebnisContainer.appendChild(p);
      });
    });
});
