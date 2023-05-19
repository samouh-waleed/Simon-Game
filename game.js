const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = []; // save the random colour into new array

let userClickedPattern = []; //all user clicked colours saved into one array
let level = 0; // track the lvls
let start = true; //to press the enter key once

// when ENTER key has pressed, call nextSequence() function to start the game
$(document).keypress(function (event) {
  if (event.key == "Enter" && start == true) {
    // Check if the pressed key is 'Enter'
    // Countdown logic
    let countdown = 3;
    // const countdownInterval = setInterval(() => { // create a timer that calls a callback function
    //   $("#level-title").text("game starts in " + countdown + ":");
    //   countdown--;

    //   if (countdown < 0) {
    //     clearInterval(countdownInterval);// stop the countdownInterval variable from running if sec<0. Last thing it will print is 1
    //     nextSequence();
    //   }
    // }, 1000);

    // THIS CODE IS EQUVLANT TO THE ABOVE ONE. The above code has an arrow function WHILE the below code has a named function 'myTimer' is used
    const myVar = setInterval(myTimer, 1000); // this is used to create a timer that calls the 'myTimer' function every 1 second until countdown reaches 0
    function myTimer() {
      $("#level-title").text("game starts in " + countdown + ":");
      countdown--;
      if (countdown < 0) {
        myTimer = clearInterval(myVar); //clearInteval function is called to stop the timer
        nextSequence(); //the game starts
      }
      start = false;
    }
  }
});

// This is the main function that starts the game
function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4); //ramdome number from 0-3 (0,1,2,3)
  const randomChosenColour = buttonColours[randomNumber]; //get randome colour from the above array
  console.log(randomChosenColour); // to check if the game works from the Console
  gamePattern.push(randomChosenColour); //add the colour into the new array

  const currentRndBox = $("#" + randomChosenColour); // Select the button with the same id as the randomChosenColour

  $("#level-title").text("Level " + (level + 1));
  level++;
  playSound(randomChosenColour);
  flashButton(currentRndBox);
}

// When button is clciked trigger a handler function that grabs its id for that colour
$(".btn").click(function (event) {
  // event papameter is used to pass info about the click event that occured
  const userChosenColour = event.target; // refers to the specific button that was clicked by the user
  const userChosenColourId = userChosenColour.id; // acccess properties of the clicked button such as id

  userClickedPattern.push(userChosenColourId);

  playSound(userChosenColourId);
  animatePress(userChosenColourId);

  checkAnswer(userClickedPattern.length - 1);
});

// currentLvl represent the index of the user's latest click in the userClickedPattern
function checkAnswer(currentLvl) {
  // check the user colour with the game colour
  if (userClickedPattern[currentLvl] == gamePattern[currentLvl]) {
    // Check if the user's latest click matches the corresponding color in the game's sequence
    if (currentLvl == level - 1) {
      //checks if the user clicked all the buttons in the current lvl pattern
      //It is checking if currentLvl (which is the index of the last button that the user clicked) is equal to level-1 (which is the index of the last button in the current level's pattern).
      userClickedPattern = []; //reset for the next level
      setTimeout(nextSequence, 500);
      console.log("CORRECT");
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 1000);
    setTimeout(() => {
      $("#level-title").text("Game Over, Press Enter Key to Restart");
    }, 1500);

    startOver();
    console.log("WRONG");
  }
}

// Function to flash the random button
function flashButton(button) {
  button.animate({ opacity: 0.5 }, 100, function () {
    //the fuctoin will be excuted once the animation is completed
    button.animate({ opacity: 1 }, 100); // the callback function ensure that the second animation starts only after the first animation has finished
  });
}

function playSound(currentBox) {
  //play sounds
  const audio = new Audio("sounds/" + currentBox + ".mp3");
  audio.play(currentBox);
}

function animatePress(currentColour) {
  const element = $("#" + currentColour).addClass("pressed");
  if (element.length) {
    //if the id has the class pressed added then we add the time out
    setTimeout(() => {
      element.removeClass("pressed");
    }, 100);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  start = true;
}
