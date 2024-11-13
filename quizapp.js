// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAo1ddO2xeEctQLZEz_9GIw-WGjfLgvZtE",
    authDomain: "quiz-app-948ec.firebaseapp.com",
    projectId: "quiz-app-948ec",
    storageBucket: "quiz-app-948ec.firebasestorage.app",
    messagingSenderId: "356433685829",
    appId: "1:356433685829:web:15fc504da8b7e52180e22c"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
  var database = firebase.database();

var questions = [  
    {  
      question: "Q1: HTML Stands for?",
      option1: "Hyper Text Markup Language",
      option2: "Hyper Tech Markup Language",
      option3: "Hyper Touch Markup Language",
      corrAnswer: "Hyper Text Markup Language",
    },  
    {  
      question: "CSS Stands for",  
      option1: "Cascoding Style Sheets",
      option2: "Cascading Style Sheets",     
      option3: "Cascating Style Sheets",
      corrAnswer: "Cascading Style Sheets",
    },
    {
      question: "Which tag is used for most large heading",  
      option1: "<h6>",
      option2: "<h2>",
      option3: "<h1>",  
      corrAnswer: "<h1>",   
    },  
    {
      question: "Which tag is used to make element unique ",
      option1: "id",
      option2: "class  ",
      option3: "label",
      corrAnswer: "id",
    },
    {
      question: "Any element assigned with id, can be get in css ",
      option1: "by # tag",
      option2: "by @ tag",
      option3: "by & tag",
      corrAnswer: "by # tag",
    },
    {
      question: "CSS can be used with ______ methods ",
      option1: "8",
      option2: "3",
      option3: "4",
      corrAnswer: "3",
    },
    {
      question: "In JS variable types are ____________ ",
      option1: "6",
      option2: "3",
      option3: "8",
      corrAnswer: "8",
    },
    {
      question: "In array we can use key name and value ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
    {
      question: "toFixed() is used to define length of decimal ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "True",
    },
    {
      question: "push() method is used to add element in the start of array ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
  ];


  var quesElement = document.getElementById('ques');
  var option1 = document.getElementById('opt1');
  var option2 = document.getElementById('opt2');
  var option3 = document.getElementById('opt3');
  var index = 0;
  var score = 0;
  var timer = document.getElementById('timer');
  var min = 1;
  var sec = 59;
  var timeInterval;



  function timers() {
    timer.innerText = `${min}:${sec}`;
    sec--

    if(sec < 0) {
        min--
        sec = 59;
    }


    if(min < 0) {
        min = 0;
        sec = 0;
        clearInterval(timeInterval);
        nextQuestion();
        }
  }

  // Function to start the timer
function startTimer() {
    timerInterval = setInterval(timers, 1000); 
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval); 
}

// Function to reset the timer
function resetTimer() {
    min = 1; 
    sec = 59; 
    clearInterval(timerInterval); 
    startTimer(); 
}


  




  function nextQuestion(){


    stopTimer()


    var options = document.getElementsByClassName('options');
    var button = document.getElementById('btn');
    
    for(var i = 0; i <options.length;i++){

       if(options[i].checked){
          var userSelectedInput = options[i].value;

          console.log(userSelectedInput);
          
          var getoptions = questions[index - 1][`option${userSelectedInput}`] ;

          var correctAnswer = questions[index - 1]['corrAnswer'];

        if(getoptions === correctAnswer){
            score++
        }
    
       }
        
        options[i].checked = false
    }

    button.disabled = true


    // index++;

    if(index >= questions.length){
      

        
        var finalScorePercentage = (score / questions.length) * 100


        

        if (finalScorePercentage <= 20) {
            Swal.fire({
                title: "Poor!",
                text: `Your Final Score is ${finalScorePercentage}%`,
                icon: "error"
            });
        } else if (finalScorePercentage > 20 && finalScorePercentage <= 40) {
            Swal.fire({
                title: "Average!",
                text: `Your Final Score is ${finalScorePercentage}%`,
                icon: "warning"
            });
        } else if (finalScorePercentage > 40 && finalScorePercentage <= 60) {
            Swal.fire({
                title: "Do more Practice!",
                text: `Your Final Score is ${finalScorePercentage}%`,
                icon: "info"
            });
        } else {
            Swal.fire({
                title: "Good job!",
                text: `Your Final Score is ${finalScorePercentage}%`,
                icon: "success" ,
            });

            // nextQuestion();
        }

       

        showRestartButton();
        endQuiz();
    }
          else {
            quesElement.innerText = questions[index].question;
            option1.innerText = questions[index].option1;
            option2.innerText = questions[index].option2;
            option3.innerText = questions[index].option3;
            index++;


            resetTimer()
        }

    //          // =====Object for Database=====
    //  var quizObj = {
    //     selectedQuestion: selectedQuestion,
    //     selectedAns: selectedAns,
    //     correctAnswer: correctAnswer
    // }

    //   // ====Sending Data to Firebase Database====
    //   firebase.database().ref('JavaScript-Quiz').push(quizObj)

        
    }


     // Register function
  function register(email, password) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => Swal.fire("Success", "Registration successful", "success"))
      .catch((error) => Swal.fire("Error", error.message, "error"));
  }
  
  // Login function
  function login(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Swal.fire("Success", "Login successful", "success");
        document.getElementById("authSection").style.display = "none";
        document.getElementById("quizSection").style.display = "block";
      })
      .catch((error) => Swal.fire("Error", error.code));
  }
  
  // Show login form
  function showLoginForm() {
    Swal.fire({
      title: "Login",
      html:
        '<input id="loginEmail" class="swal2-input" placeholder="Email">' +
        '<input id="loginPassword" type="password" class="swal2-input" placeholder="Password">',
      focusConfirm: false,
      preConfirm: () => {
        var email = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").value;
        login(email, password);
      },
    });
  }
  
  // Show register form
  function showRegisterForm() {
    Swal.fire({
      title: "Register",
      html:
        '<input id="registerEmail" class="swal2-input" placeholder="Email">' +
        '<input id="registerPassword" type="password" class="swal2-input" placeholder="Password">',
      focusConfirm: false,
      preConfirm: () => {
        var email = document.getElementById("registerEmail").value;
        var password = document.getElementById("registerPassword").value;
        register(email, password);
        nextQuestion()
      },
    });
  }


  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    // Swal.fire(`Quiz Finished! Your score is ${score}`)  ;
    Swal.fire({
      title: `Quiz Finished! Your score is ${score}`,
      showCancelButton: false,
      confirmButtonText: "Okay",
    }).then((result) => {
      if (result.isConfirmed) {
        saveScore();
        window.location.reload();
      }
    });
   
  }


        function showRestartButton() {
            var restartButton = document.getElementById('restart-btn');
            restartButton.style.display = 'block';
            restartButton.onclick = function() {
                restartQuiz()
        }

        function restartQuiz() {
            index = 0;
            score = 0;

             // Reset the question content
    quesElement.innerText = questions[index].question;
    option1.innerText = questions[index].option1;
    option2.innerText = questions[index].option2;
    option3.innerText = questions[index].option3;

    // Reset timer and start again
    resetTimer();

            nextQuestion()

    // Hide the restart button again
    document.getElementById('restart-btn').style.display = 'none';

        }
    }


    


  function clicked() {
    var button = document.getElementById('btn');
    button.disabled = false;
  }


  

  startTimer();


   // Save score to Firebase
   function saveScore() {
    // Ensure the user is logged in before saving
    if (auth.currentUser) {
        database.ref('scores/' + auth.currentUser.uid).push({
            score: score,
            timestamp: Date.now() // Optional: You can save the timestamp when the quiz was taken
        })
        .then(() => {
            Swal.fire("Success", "Score saved", "success");
        })
        .catch((error) => {
            Swal.fire("Error", error.message, "error");
        });
    } else {
        Swal.fire("Error", "No user logged in", "error");
    }
}


// Get score 
function getScores() {
  if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      database.ref('scores/' + userId).once('value', function(snapshot) {
          var scores = snapshot.val();
          console.log(scores); // This will log all scores stored for this user
      });
  } else {
      Swal.fire("Error", "No user logged in", "error");
  }
}
