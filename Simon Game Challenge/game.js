
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0


$(document).on("keydown", function() {
   if (level === 0) {
   
   $("h1").text("Level 0");
   nextSequence()
   }
});

$(document).click(function(e){
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
});


function checkAnswer(lastColor) {
    if (userClickedPattern[lastColor] === gamePattern[lastColor]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }  else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver()
    }

}

function nextSequence() {
    // playCurrentSequence();
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * (3 + 1));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(name) {
    sound = new Audio("./sounds/" + name + ".mp3");
    sound.play()

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
}


function playCurrentSequence() {
    for (i=0; i<gamePattern.length-1; i++) {
        setTimeout(function(){
           playSound(gamePattern[i]);
           $("#"+ gamePattern[i]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); 
        },500)
        
    }
}