//varibles
let questionIndex = 0;
let timer = questions.length * 10;
let timerId;

//DOM elements
let timeEl = document.querySelector("#time");
let jumbotron = document.querySelector("#jumbotron");
let startBtn = document.querySelector("#startBtn");
let quizSection = document.querySelector("#quiz-section");
let questionHeading = document.querySelector("#question-heading")
let result = document.querySelector("result");
let scoreSection = document.querySelector("#score-section");
let summitBtn= document.querySelector("#submitBtn");
let initials= document.querySelector("#initials");
let viewScore = document.querySelector("#viewScore");

let questionsEl = document.querySelector("#questions");
let choicesEl = document.querySelector("#choices");

//start game
function start() {
    jumbotron.setAttribute("class", "hide");

    quizSection.setAttribute("class", "show");

    timerId = setInterval(tick, 1000);

    timeEl.textContent = timer;

    question();
}

//time penality 
function tick() {
    timer--;
    timeEl.textContent = time;

    if (timer <= 0) {
        endQuiz();
    }
}
//questions
function question() {
    let currentQuestion = questions[currentQuestionIndex];

    let titleEL = document.getElementById("question-heading");
    titleEL.textContent = currentQuestion.title;

    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, i) {

        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
    
        choiceNode.textContent = i + 1 + ". " + choice;
    
        choiceNode.onclick = questionClick;
    
        choicesEl.appendChild(choiceNode);
      });
    }
//question click
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {

        timer -= 15;

        if (timer < 0) {
            timer = 0;
        }

        timeEl.textContent = timer;

        result.textContent = "Wrong!"
    } else {
        result.textContent = "Correct!";
    }

    //result alert
    result.setAttribute("class", "result");
    setTimeout(function () {
        result.setAttribute("class", "result hide");
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        question();
    }
}

//end quiz
function endQuiz() {
    clearInterval(timerId);

    
}
