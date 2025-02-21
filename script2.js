function start() {
    let name = document.getElementById('input').value;
    window.location.href = "index2.html";

}

const data = [
    {
        question: "1. Who is the founder of Google?",
        a: "Larry Page",
        b: "Steve Jobs",
        c: "Bill Gates",
        d: "Mark Zuckerberg",
        correct: "a",
    },
    {
        question: "2. Who is the founder of Microsoft?",
        a: "Elon Musk",
        b: "Bill Gates",
        c: "Jeff Bezos",
        d: "Steve Jobs",
        correct: "b",
    },
    {
        question: "3. What does PK stand for?",
        a: "Programming Knowledge",
        b: "Public Key",
        c: "Pakistan",
        d: "Player Kill",
        correct: "c",
    },
    {
        question: "4. Who is the founder of Facebook?",
        a: "Larry Page",
        b: "Sundar Pichai",
        c: "Mark Zuckerberg",
        d: "Tim Cook",
        correct: "c",
    },
    {
        question: "5. What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Rome",
        correct: "c",
    },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const optionC = document.getElementById("optionC");
const optionD = document.getElementById("optionD");
const submitBtn = document.getElementById("submit");
const timerEl = document.getElementById("timer");
const questionNumberEl = document.getElementById("questionNumber");

let currentQuiz = 0;
let score = 0;
let time = 20;
let timer;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = data[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    optionA.innerText = currentQuizData.a;
    optionB.innerText = currentQuizData.b;
    optionC.innerText = currentQuizData.c;
    optionD.innerText = currentQuizData.d;
    questionNumberEl.innerText = currentQuiz + 1;

    resetTimer();
}

function deselectAnswers() {
    answerEls.forEach(answerEl => (answerEl.checked = false));
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function resetTimer() {
    clearInterval(timer);
    time = 20;
    timerEl.innerText = time;
    timer = setInterval(() => {
        time--;
        timerEl.innerText = time;
        if (time === 0) {
            moveToNextQuestion();
        }
    }, 1000);
}

function moveToNextQuestion() {
    clearInterval(timer);

    const answer = getSelected();
    if (answer === data[currentQuiz].correct) {
        score++;
    }

    currentQuiz++;

    if (currentQuiz < data.length) {
        loadQuiz();
    } else {
        quiz.innerHTML = `
            <h2>You answered ${score}/${data.length} questions correctly!</h2>
            <button onclick="location.reload()">Try Again</button>
        `;
    }
}

submitBtn.addEventListener("click", moveToNextQuestion);