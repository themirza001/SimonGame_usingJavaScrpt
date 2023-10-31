var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern = [];
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("level-title").text("Level" +level);
        nextSequence();
        started=true;
    }
});
$(".btn").click(function(){

    var userChoosenBtn=$(this).attr("id");
    userClickedPattern.push(userChoosenBtn);

    playSound(userChoosenBtn);
    animatePress(userChoosenBtn);

    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currLevel){
    if(gamePattern[currLevel]===userClickedPattern[currLevel]){
        console.log("Till now sequence is right");//no role for logic of game,just for me
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("You Are Wrong!");//for me
        // var audio=new Audio("sounds/wrong.mp3");
        // audio.play();
        playSound("wrong");

        $("body").addClass("game-over");

        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver_Game();
    }
}
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level"+level);
    var randomNo=Math.floor(Math.random() * 4);
    var randomChoosenColor=buttonColours[randomNo];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    animatePress(randomChoosenColor);
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function startOver_Game(){
    level=0;
    gamePattern=[];
    started=false;
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      },100);
}