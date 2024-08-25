
// Cache DOM Elements
const button = document.getElementById("button");
const userInput = document.getElementById("user-input");
const printArea = document.getElementById("print-area");

/** 
* @param {HTMLElement} parent
* @param {...HTMLElement} children 
*/


//GAME

// DOM CHACHE
const gameElement = document.getElementsByClassName("block")[0];
const characterCreationForm = document.getElementById("character-creation-form");
const gameSection = document.getElementById("game-section");
const gameBoardContainer = document.getElementById ("game-board-container");
const gameResetButton = document.getElementsByClassName("game-reset-button")[0];

gameResetButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    stopStopwatch();
    elapsedTime = 0;
    stopwatchElement.innerText = "00:00:00";
    counterValue.innerText = 0;
    counterValueInt = 0;
    levelCounter = "1";
    levelCounterInt = 1;
    winTitle.classList.add("hidden");


    document.getElementById("level-counter").innerText = levelCounter;
    newGameElement.remove(newGameElement);
})

let newGameElement;

characterCreationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    newGameElement = document.createElement("div");
    newGameElement.classList.add("block")
    newGameElement.classList.add("five")
    gameBoardContainer.appendChild(newGameElement);
    
    
    const form = event.target;
    const formData = new FormData(form);

    const formObject = Object.fromEntries(formData.entries());


    console.log(formObject);
    newGameElement.character = formObject;

  

    const emojiHeader = document.createElement("h1");
    emojiHeader.classList = ("emoji-header");
    const characterEmoji = document.createTextNode(newGameElement.character.emoji);
    emojiHeader.appendChild(characterEmoji);
    newGameElement.appendChild(emojiHeader);

    const charAttContainer = document.createElement("ul");
    charAttContainer.classList = ("char-att-container");
    newGameElement.appendChild(charAttContainer);

    const liName = document.createElement("li");
    liName.classList = ("game-element-li");
    const characterName = document.createTextNode("Name: " + newGameElement.character['character name'])
    liName.appendChild(characterName);
    charAttContainer.appendChild(liName);

    const liClass = document.createElement("li");
    liClass.classList = ("game-element-li");
    const characterClass = document.createTextNode("Class: " + newGameElement.character.class)
    liClass.appendChild(characterClass);
    charAttContainer.appendChild(liClass);

    const liSpecialMove = document.createElement("li");
    liSpecialMove.classList = ("game-element-li");
    const characterSpecialMove = document.createTextNode("Special Move: " + newGameElement.character['special move'])
    liSpecialMove.appendChild(characterSpecialMove);
    charAttContainer.appendChild(liSpecialMove);

    const liActivateCommand = document.createElement("li");
    liActivateCommand.classList = ("game-element-li");
    const activateCommand = document.createTextNode("Activate Command: " + newGameElement.character['activate SM command'])
    liActivateCommand.appendChild(activateCommand);
    charAttContainer.appendChild(liActivateCommand);

    const chosenColor = newGameElement.character.color; 

    newGameElement.style.backgroundColor = chosenColor;
    
});


// STEP COUNTER

let counterValue = document.getElementById("counter-value");
let counterValueInt = 0;

let levelCounter = document.getElementById("level-counter").innerText;
let levelCounterInt = parseInt(levelCounter);

const winTitle = document.getElementById("winner-title");


document.addEventListener("keydown", (event) => {
    if(event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "ArrowDown") {
        counterValue.innerText++;
        counterValueInt++;
    }




    if (counterValueInt === 50) {
        let activateSM = prompt("Activate Special Move!")
        if (activateSM === newGameElement.character["activate SM command"]) {
            newGameElement.classList.remove(newGameElement.classList[1]);
            newGameElement.classList.add("winner");
            winTitle.classList.remove(winTitle.classList[0]);
            stopStopwatch();
            const newUl = document.createElement("ul")
            document.getElementById("leaderboard-container").appendChild(newUl);
            const newLiContainer = document.createElement("div");
           
            newLiContainer.classList=("li-container");
            newUl.appendChild(newLiContainer);
           
            const liName = document.createElement("li")
            liName.appendChild(document.createTextNode(newGameElement.character["character name"]));
            newLiContainer.appendChild(liName);
            
            const liClass = document.createElement("li")
            liClass.appendChild(document.createTextNode(newGameElement.character.class));
            newLiContainer.appendChild(liClass);
            
            const liEmoji = document.createElement("li")
            liEmoji.appendChild(document.createTextNode(newGameElement.character.emoji));
            newLiContainer.appendChild(liEmoji);
         
            const liColor = document.createElement("li")
            liColor.appendChild(document.createTextNode(newGameElement.character.color));
            newLiContainer.appendChild(liColor);
            
            const liSpecialMove = document.createElement("li")
            liSpecialMove.appendChild(document.createTextNode(newGameElement.character["special move"]));
            newLiContainer.appendChild(liSpecialMove);

            const liCommand = document.createElement("li")
            liCommand.appendChild(document.createTextNode(newGameElement.character["activate SM command"]));
            newLiContainer.appendChild(liCommand);

            const liTime = document.createElement("li")
            liTime.appendChild(document.createTextNode(stopwatchElement.innerText));
            newLiContainer.appendChild(liTime);


            
        }
        else {alert("Wrong command!")}

    }
    else if (counterValueInt >= 40) {
        levelCounter = "5";
        levelCounterInt = 5;
    }
    else if (counterValueInt >= 30) {
        levelCounter = "4";
        levelCounterInt = 4;
    }
    else if (counterValueInt >= 20) {
        levelCounter = "3";
        levelCounterInt = 3;
    }
    else if (counterValueInt > 10) {
        levelCounter = "2";
        levelCounterInt = 2;
    }
    else {
        levelCounter = "1";
        levelCounterInt = 2;
    }

    document.getElementById("level-counter").innerText = levelCounter;

})


//RESET STEP COUNTER WHEN HITTING THE WALL
const originalAlert = window.alert

window.alert = (message) => {
    counterValue.innerText = 0;
    counterValueInt = 0;
    gameBoardContainer.style.borderColor = "#ff0000";
    gameBoardContainer.style.borderWidth = "10px";
    
    setTimeout(() => {originalAlert(message)}, 20)
    
    
    setTimeout(() => {
        gameBoardContainer.style.borderColor = "#000000";
        gameBoardContainer.style.borderWidth = "1px";
    }, 500);
}




//CHARACTER MOVEMENT WITH ARROW KEYS

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
        const boxClass = newGameElement.classList[1];
        
        switch(boxClass) {
            case "one":
                newGameElement.classList.remove("one")
                newGameElement.classList.add("two")
                break;
            case "two":
                newGameElement.classList.remove("two")
                newGameElement.classList.add("three")
                break;
            case "three":
                alert("Move back sir");
                break;
            case "four":
                newGameElement.classList.remove("four")
                newGameElement.classList.add("five")
                break;
            case "five":
                newGameElement.classList.remove("five")
                newGameElement.classList.add("six")
                break;
            case "six":
                alert("Move back sir");
                break;
            case "seven":
                newGameElement.classList.remove("seven")
                newGameElement.classList.add("eight")
                break;
            case "eight":
                newGameElement.classList.remove("eight")
                newGameElement.classList.add("nine")
                break;
            case "nine":
                alert("Move back sir");
                break;
            default: 
                console.log("somethings wrong")
        }
        }

    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
        const boxClass = newGameElement.classList[1];
        
        switch(boxClass) {
            case "one":
                alert("Move back sir");
                break;
            case "two":
                newGameElement.classList.remove("two")
                newGameElement.classList.add("one")
                break;
            case "three":
                newGameElement.classList.remove("three")
                newGameElement.classList.add("two")
                break;
            case "four":
                alert("Move back sir");
                break;
            case "five":
                newGameElement.classList.remove("five")
                newGameElement.classList.add("four")
                break;
            case "six":
                newGameElement.classList.remove("six")
                newGameElement.classList.add("five")
                break;
            case "seven":
                alert("Move back sir");
                break;
            case "eight":
                newGameElement.classList.remove("eight")
                newGameElement.classList.add("seven")
                break;
            case "nine":
                newGameElement.classList.remove("nine")
                newGameElement.classList.add("eight")
                break;
            default: 
                console.log("somethings wrong")
        }
        }

    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
        const boxClass = newGameElement.classList[1];
        
        switch(boxClass) {
            case "one":
                newGameElement.classList.remove("one")
                newGameElement.classList.add("four")
                break;
            case "two":
                newGameElement.classList.remove("two")
                newGameElement.classList.add("five")
                break;
            case "three":
                newGameElement.classList.remove("three")
                newGameElement.classList.add("six")
                break;
            case "four":
                newGameElement.classList.remove("four")
                newGameElement.classList.add("seven")
                break;
            case "five":
                newGameElement.classList.remove("five")
                newGameElement.classList.add("eight")
                break;
            case "six":
                newGameElement.classList.remove("six")
                newGameElement.classList.add("nine")
                break;
            case "seven":
                alert("Move back sir");
                break;
            case "eight":
                alert("Move back sir");
                break;
            case "nine":
                alert("Move back sir");
                break;
            default: 
                console.log("somethings wrong")
        }
        }

    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") {
        const boxClass = newGameElement.classList[1];
        
        switch(boxClass) {
            case "one":
                alert("Move back sir");
                break;
            case "two":
                alert("Move back sir");
                break;
            case "three":
                alert("Move back sir");
                break;
            case "four":
                newGameElement.classList.remove("four")
                newGameElement.classList.add("one")
                break;
            case "five":
                newGameElement.classList.remove("five")
                newGameElement.classList.add("two")
                break;
            case "six":
                newGameElement.classList.remove("six")
                newGameElement.classList.add("three")
                break;
            case "seven":
                newGameElement.classList.remove("seven")
                newGameElement.classList.add("four")
                break;
            case "eight":
                newGameElement.classList.remove("eight")
                newGameElement.classList.add("five")
                break;
            case "nine":
                newGameElement.classList.remove("nine")
                newGameElement.classList.add("six")
                break;
            default: 
                console.log("somethings wrong")
        }
        }

    })

//STOPWATCH//

    const submitButton = document.getElementsByClassName("game-submit-button")[0];
    let stopwatchElement = document.getElementById("stopwatch");
    let startTime;
    let elapsedTime = 0;
    let stopwatchInterval;
    
    function startStopwatch() {
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateStopwatch, 10); // Update every 10 milliseconds
    }
    
    function updateStopwatch() {
        elapsedTime = Date.now() - startTime;
    
        let milliseconds = Math.floor((elapsedTime % 1000) / 10); // Display only two digits for milliseconds
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    
        // Format the time
        milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
    
        stopwatchElement.innerText = `${minutes}:${seconds}:${milliseconds}`;
    }
    
    function stopStopwatch() {
        clearInterval(stopwatchInterval);
    }
    
    function resetStopwatch() {
        clearInterval(stopwatchInterval);
        elapsedTime = 0;
        stopwatchElement.innerText = "00:00:00";
    }

submitButton.addEventListener("click", startStopwatch);