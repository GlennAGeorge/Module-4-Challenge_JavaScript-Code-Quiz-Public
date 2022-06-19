//variables

var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions 
var questionanswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentindex = 0;
var score = 0;
var count = 100;
var alert = document.getElementById("alert");
var info = document.getElementById("info");
// var addscore = document.getElementById("addscore");
// var submitresult = document.getElementById("submitresult");
var allScores = [];
var storedScores = JSON.parse(localStorage.getItem("userData"));


//quiz questions * 10
var questions = [
    {
        title: "Is JavaScript case-sensitive?",
        choices: ["yes","no",],
        answer : "yes"    
    },
    {
        title: "What will the following code return: Boolean(10 > 9)",
        choices: ["false","NAN","true",],
        answer : "true"    
    },
    {
        title: "Which operator is used to assign a value to a variable?",
        choices: ["x","-","*", "=", "all the above"],
        answer : "="    
    },
    {
        title: "How do you declare a JavaScript variable?",
        choices: ["var carName","variable carName","v carName",],
        answer : "var carName"    
    },
    {
        title: "Which event occurs when the user clicks on an HTML element?",
        choices: ["onchange","onclick","onmouseover", "onmouseclick"],
        answer : "onclick"    
    },
    {
        title: "JavaScript is the same as Java.",
        choices: ["true","false"],
        answer : "false"    
    },
    {
        title: "How do you find the number with the highest value of x and y?",
        choices:["Math.ceil(x, y)","Math.max(x, y)","ceil(x, y)", "top(x, y)"],
        answer : "Math.max(x, y)"    
    },
    {
        title: "How do you round the number 7.25, to the nearest integer?",
        choices: ["rnd(7.25)","Math.round(7.25)","Math.rnd(7.25)", "round(7.25)"],
        answer : "Math.round(7.25)  "    
    },
    {
        title: "How can you add a comment in a JavaScript?",
        choices: ["//comment","<!--comment-->","'comment"],
        answer : "//comment"    
    },
    {
        title: "How do you call a function named myFunction?",
        choices: ["call myFunction()","call function myFunction()","myFunction()"],
        answer : "myFunction()"    
    },
]

//start quiz
btnStart.addEventListener("click", starQuiz);
function starQuiz(){
    if(storedScores !==null) {
        allScores = storedScores;
    }
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timecounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions= questions[currentindex]
    console.log(nextQuestions.title)
    
        displayQuestion(nextQuestions)

    gametime()
}
btnScore.addEventListener("click" , function(){
    let name = document.getElementById("inputScore").value
    scorePage(name, count)
});

//timer 

function gametime(){

    var timeinterval = setInterval(function(){
        timer.innerText = count
         count--;
        }, 1000);

}
//results
function scorePage(a, b) {

    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "score.html";
}
//questions
function displayQuestion(question){
    titleitem.innerText=question.title
    question.choices.forEach(element => {
     var button =document.createElement("button")
    button.className="btn-primary btn-block text-left"
    button.innerText=element
    // questionanswers.innerHTML=""
    questionanswers.appendChild(button)
    button.addEventListener("click", displaynextQuestion)
    });
}


function displaynextQuestion(e){
    currentindex++
    if(currentindex < questions.length){
        correction(e.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML=""
        if(currentindex < questions.length){    
            nextQuestions= questions[currentindex]
            displayQuestion(nextQuestions)  
        }else {
            currentindex = 0
            displayQuestion(nextQuestions)  
        }

    }else{
        console.log("endgame")
        endgame()
        

    }
    
     
}
//quiz question response
function correction(response){
    
    if(response){
        alert.innerText= "Correct"
        console.log("")
    }else {
        alert.innerText="Incorrect"
        count = count -10
        timer.innerHTML = count
        console.log("Incorrect")

    }
    setTimeout(function(){
        alert.innerText=""
    
        }, 1000);

}

//end quiz
 function endgame (){
    // btnStart.classList.add("d-none")
    myScore.innaText = count
    addscore.classList.remove("d-none")
    timecounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
    addscore.classList.remove("d-none")


 }