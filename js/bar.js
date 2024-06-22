//quelle: https://www.w3schools.com/howto/howto_js_progressbar.asp
// Prompt 3.11

document.addEventListener("DOMContentLoaded", function() {
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => {
        answer.addEventListener('click', function() {
            const questionContainer = document.getElementById('question-container');
            const currentQuestion = parseInt(questionContainer.getAttribute('data-question'), 10);

            if (currentQuestion === 5) {
                showLoadingBar();
            }
        });
    });
});

function showLoadingBar() {
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.add('active');

    const loadingBar = document.getElementById('loading-bar');
    let width = 0;
    const interval = setInterval(frame, 150); 

    function frame() {
        if (width >= 100) {
            clearInterval(interval);
            window.location.href = "empfehlung.html"; 
        } else {
            width += 5; 
            loadingBar.style.width = width + '%';
        }
    }
}