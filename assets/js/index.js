//variables

let quizQuestions = document.getElementById("quiz-questions");
let timer = document.getElementById("timer");
let btnStart = document.getElementById("btn-start");
let timecounter = document.getElementById("timecounter");
let titleitem = document.getElementById("title-item");
let nextQuestions;
let questionanswers = document.getElementById("question-answers");
let myScore = document.getElementById("score");
let btnScore = document.getElementById("btnScore");
let currentindex = 0;
let score = 0;
let count = 100;
let alert = document.getElementById("alert");
let info = document.getElementById("info");
let allScores = [];
let storedScores = JSON.parse(localStorage.getItem("userData"));

//quiz questions * 10
let questions = [
	{
		questionText: "Is JavaScript case-sensitive?",
		options: ["yes", "no"],
		answer: "yes",
	},
	{
		questionText: "What will the following code return: Boolean(10 > 9)",
		options: ["false", "NAN", "true"],
		answer: "true",
	},
	{
		questionText: "Which operator is used to assign a value to a variable?",
		options: ["x", "-", "*", "=", "all the above"],
		answer: "=",
	},
	{
		questionText: "How do you declare a JavaScript variable?",
		options: ["var carName", "variable carName", "v carName"],
		answer: "var carName",
	},
	{
		questionText: "Which event occurs when the user clicks on an HTML element?",
		options: ["onchange", "onclick", "onmouseover", "onmouseclick"],
		answer: "onclick",
	},
	{
		questionText: "JavaScript is the same as Java.",
		options: ["true", "false"],
		answer: "false",
	},
	{
		questionText:
			"How do you find the number with the highest value of x and y?",
		options: ["Math.ceil(x, y)", "Math.max(x, y)", "ceil(x, y)", "top(x, y)"],
		answer: "Math.max(x, y)",
	},
	{
		questionText: "How do you round the number 7.25, to the nearest integer?",
		options: ["rnd(7.25)", "Math.round(7.25)", "Math.rnd(7.25)", "round(7.25)"],
		answer: "Math.round(7.25)  ",
	},
	{
		questionText: "How can you add a comment in a JavaScript?",
		options: ["//comment", "<!--comment-->", "'comment"],
		answer: "//comment",
	},
	{
		questionText: "How do you call a function named myFunction?",
		options: [
			"call myFunction()",
			"call function myFunction()",
			"myFunction()",
		],
		answer: "myFunction()",
	},
];

//start quiz
btnStart.addEventListener("click", starQuiz);
function starQuiz() {
	if (storedScores !== null) {
		allScores = storedScores;
	}
	info.classList.add("d-none");
	btnStart.classList.add("d-none");
	timecounter.classList.remove("d-none");
	quizQuestions.classList.remove("d-none");
	nextQuestions = questions[currentindex];
	console.log(nextQuestions.questionText);

	displayQuestion(nextQuestions);

	gametime();
}
btnScore.addEventListener("click", function () {
	let name = document.getElementById("inputScore").value;
	scorePage(name, count);
});

//timer

function gametime() {
	let timeinterval = setInterval(function () {
		timer.innerText = count;
		count--;
	}, 1000);
}
//results
function scorePage(a, b) {
	let userData = {
		inits: a,
		userScore: b,
	};
	allScores.push(userData);

	localStorage.setItem("userData", JSON.stringify(allScores));
	location.href = "score.html";
}
//questions
function displayQuestion(question) {
	titleitem.innerText = question.questionText;
	question.options.forEach((element) => {
		let button = document.createElement("button");
		button.className = "btn-primary btn-block text-left";
		button.innerText = element;

		questionanswers.appendChild(button);
		button.addEventListener("click", displaynextQuestion);
	});
}

function displaynextQuestion(e) {
	currentindex++;
	if (currentindex < questions.length) {
		correction(e.target.innerText == nextQuestions.answer);
		questionanswers.innerHTML = "";
		if (currentindex < questions.length) {
			nextQuestions = questions[currentindex];
			displayQuestion(nextQuestions);
		} else {
			currentindex = 0;
			displayQuestion(nextQuestions);
		}
	} else {
		console.log("endgame");
		endgame();
	}
}
//quiz question response
function correction(response) {
	if (response) {
		alert.innerText = "Correct";
		console.log("");
	} else {
		alert.innerText = "Incorrect";
		count = count - 10;
		timer.innerHTML = count;
		console.log("Incorrect");
	}
	setTimeout(function () {
		alert.innerText = "";
	}, 1000);
}

//end quiz
function endgame() {
	myScore.innaText = count;
	addscore.classList.remove("d-none");
	timecounter.classList.add("d-none");
	quizQuestions.classList.add("d-none");
	addscore.classList.remove("d-none");
}
