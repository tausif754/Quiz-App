const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Transfer Text Markup Language", correct: false },
      { text: "Hyper Text Makeup Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Transferable Markup Language", correct: false },
    ],
  },
  {
    question: "What is the purpose of the declaration in an HTML document?",
    answers: [
      {
        text: "It defines the character encoding for the document.",
        correct: false,
      },
      { text: "It specifies the version of HTML being used.", correct: false },
      { text: "It links external stylesheets.", correct: false },
      {
        text: "It declares the document type and version of HTML.",
        correct: true,
      },
    ],
  },
  {
    question:
      "Which HTML tag is used to define a division or section that can contain other elements?",
    answers: [
      { text: "division", correct: false },
      { text: " p", correct: false },
      { text: "group", correct: false },
      { text: "div", correct: true },
    ],
  },
  {
    question:
      "Which of the following elements is used to define headings in HTML?",
    answers: [
      { text: "hd", correct: false },
      { text: "heading", correct: false },
      { text: "h", correct: false },
      { text: "h1", correct: true },
    ],
  },
  {
    question:
      "Which HTML tag is used to insert a thematic break or horizontal line?",
    answers: [
      { text: "line", correct: false },
      { text: "br", correct: false },
      { text: "hr", correct: true },
      { text: "thematic", correct: false },
    ],
  },
  {
    question:
      " What is the purpose of the title element in the head section of an HTML document?",
    answers: [
      { text: " To define the main content of the document", correct: false },
      { text: "To provide styling for the document", correct: false },
      {
        text: "To display a title in the browser's title bar or tab",
        correct: true,
      },
      { text: " To define a hyperlink", correct: false },
    ],
  },
  {
    question: "What is the purpose of formatting tags in HTML?",
    answers: [
      { text: "To add structure to a web page", correct: false },
      { text: " To define the content of a web page", correct: false },
      {
        text: "To format text and other content on a web page",
        correct: true,
      },
      { text: "To link to other web pages or resources", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to italicize text?",
    answers: [
      { text: "italictext", correct: false },
      { text: " italic", correct: false },
      { text: " em", correct: true },
      { text: " italicize", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to underline text?",
    answers: [
      { text: "u", correct: true },
      { text: "underline", correct: false },
      { text: "s", correct: false },
      { text: "strike", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to create an unordered list?",
    answers: [
      { text: " ul", correct: true },
      { text: " li", correct: false },
      { text: " ol", correct: false },
      { text: "dl", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");
// const timeElement = document.getElementById("time");

let currentQuestionIndex = 0;
// store the score
let score = 0;
// let timeLeft = 120;
// let timeInterval;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  // timeLeft = 120;
  // timeInterval = setInterval(updateTimer, 1000);
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    // writing here click function
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  // clearInterval(timeInterval);
  // timeLeft = 120;
  // timeInterval = setInterval(updateTimer, 1000);
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  // clearInterval(timeInterval);
  resetState();
  questionElement.innerHTML = `Congratulation You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

// here handle next button
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

/*
//timer function
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timeElement.textContent = `${minutes}:${seconds}`;
  timeLeft--;
  if (timeLeft < 0) {
    showScore();
    // clearInterval(timeInterval);
  }
}
*/

startQuiz();
