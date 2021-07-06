let userClickPattern = [];
let pattern = [];
let buttonColours = ["green", "red", "yellow", "blue"];
let level = 0;
function playSound(colour) {
    var sound = new Audio("sounds/" + colour + ".mp3");
    sound.play();
}
function nextSequence() {
    $("h1").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    let randomColour = buttonColours[randomNumber];
    $("." + randomColour).fadeOut(100).fadeIn(100);
    playSound(randomColour);
    pattern.push(randomColour);
}

//start the game
$(document).on("keypress", () => {
    if (
        $("h1").text() == "Press A Key to Start" ||
        $("h1").text() == "Game Over, Press Any Key to Restart"
    ) {
        level = 1;
        nextSequence();
    }
});

// handler function
$(".btn").click(function () {
    let userChoosenColour = this.id;

    //push colour to user click pattern
    userClickPattern.push(userChoosenColour);

    //play sound
    playSound(userChoosenColour);

    // add class for blink
    $("." + userChoosenColour).addClass("pressed");

    //remove class after 100ms
    setTimeout(() => {
        $("." + userChoosenColour).removeClass("pressed");
    }, 100);

    checkgame();
});

// check
function checkgame() {
    
    if (userClickPattern[userClickPattern.length - 1] ==pattern[userClickPattern.length - 1])
    {
        //continue;
    }
    else {
        //game over
        userClickPattern.length = 0;
        pattern.length = 0;
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass('game-over');
        playSound("wrong");
        setTimeout(() => {
            $("body").removeClass('game-over');   
        }, 100);
    }


    if(userClickPattern.length==level)
    {
        console.log(userClickPattern);
        console.log(pattern);
        userClickPattern.length = 0;
        level++;
        setTimeout(() => {
            nextSequence();       
        }, 1000);
    } 
}
