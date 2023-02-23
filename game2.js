var buttonColors = ["green","red","yellow", "blue"]
var boxGen = [];
var playGen = [];

var start = false;
var level = 1;
var startButton = document.querySelector(".startButton");
var restartOps = document.querySelectorAll(".restartOps");
var restartYes = document.querySelector(".restartYes");
var restartNo = document.querySelector(".restartNo");
var grybButtons = document.querySelectorAll(".btn");

// Initial keypress starts game, then disables keypress
$(startButton).click(() => {
    if (!start){        
        start = true;
        $(startButton).hide();
        generate();
    }}
);

// Title & Information about current stage
function titles(msgVal){    
    switch (msgVal) {
        case 1:
            $("h1").text("Press any key to Start");
            break;
        case 2:
            $("h1").html("Level: "+level+"<br/>Wait for pattern...");
            break;
        case 3:
            $("h1").html("Level: "+level+"<br/>Your turn...");
            break;
        case 4:
            $("h1").html("WRONG!!");
            break;
        case 5:
            $("h1").text("Game Over (´･_･`)");
            break;
        case 6:
            $("h1").text("Restart?");
            break;
        case 7:
            $("h1").text("Goodbye... ( ･ั﹏･ั)");
            break;
        default:
            break;
    }
}

// Generates a sequence of colors
async function generate(){   
    playGen = [];
    let x = titles(2);
    let newbox = Math.floor(Math.random()*4);
    boxGen.push(buttonColors[newbox]);

    // Animate full sequence
    for(let i = 0; i<level; i++){
        var activeButton = (boxGen[i]);        
        await pause (500);
        animate(activeButton);
    }
    await pause(50);
    titles(3);   
}

// Animates the sequence generated and pressed
async function animate(activeButton) {
    if(activeButton != "wrong"){
        $("#" + activeButton).addClass("pressed");
        makeSound(activeButton);
        await pause(50);
        $("#" + activeButton).removeClass("pressed");
    }else{
        $("body").addClass("game-over");
        titles(5);
    }
}

// Makes sounds
function makeSound(activeButton){
    var audio = new Audio("sounds/"+activeButton+".mp3")
    audio.play();
}

//Check user's clicks
$(grybButtons).click(function () {
    if(start){
        var clicked = $(this).attr("id");
        animate(clicked);
        playGen.push(this.id);
        checkAnswer(playGen.length-1);
    }
})

async function checkAnswer(currentClick){
    if(playGen[currentClick] === boxGen[currentClick] ){    
        if(playGen.length === boxGen.length){
            level++;
            generate();
        }        
    }
    else{
        start = false;
        boxGen = [];
        level = 1;
        animate("wrong");
        makeSound("wrong");
        await pause(1000);
        titles(6);
        restart();
    }
}

function restart(){
    $(restartOps).show();
    $(restartYes).click(() => {
        if (!start){
            $(restartOps).hide();
            start = true;
            $("body").removeClass("game-over");
            generate();
        }}
    );
    $(restartNo).click(()=>{
        $(restartOps).hide();
        titles(7);
    })
}

// Pauses execution
function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}