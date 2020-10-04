
// document.querySelector("#pl1TotalScore")
// document.querySelector("#pl2TotalScore")
// document.querySelector("#pl1TemporaryScore")
// document.querySelector("#pl2TemporaryScore")


const badNumbers = [7, 11];
const goodNumbers = [5, 10];
const bonusTimeout = 600;
const maxRandom = 15;
const winningScore = 200;

let player1Moves = true;
let isGameOver = false;
let player1TotalScore = 0;
let player1TempScore = 0;

let player2TotalScore = 0;
let player2TempScore = 0;



function getRandom() {
    return Math.floor(Math.random() * maxRandom) + 1;
}

document.querySelector("#pl1Random").addEventListener("click", function () {
    if (player1Moves && !isGameOver) {
        let random = getRandom();
        if (badNumbers.includes(random)) {
            player1TempScore = 0;
            switchMove();
            document.querySelector("#pl1TemporaryScore").value = 0;
            return;
        }
        if (goodNumbers.includes(random)) {
            console.log(random);
            document.querySelector("#bonus").hidden = false;
            setTimeout(function () { document.querySelector("#bonus").hidden = true; }, bonusTimeout);
            random *= 2;
        }
        console.log(random);
        player1TempScore += random;
        document.querySelector("#pl1TemporaryScore").value = player1TempScore;
    }
});

document.querySelector("#pl1TakeScore").addEventListener("click", function () {
    if (player1Moves && !isGameOver) {
        player1TotalScore += player1TempScore;
        document.querySelector("#pl1TotalScore").value = player1TotalScore;

        player1TempScore = 0;
        document.querySelector("#pl1TemporaryScore").value = 0;
        switchMove();
    }

});


document.querySelector("#pl2Random").addEventListener("click", function () {
    if (!player1Moves && !isGameOver) {
        let random = getRandom();
        if (badNumbers.includes(random)) {
            player2TempScore = 0;
            switchMove();
            document.querySelector("#pl2TemporaryScore").value = 0;
            return;
        }
        if (goodNumbers.includes(random)) {
            document.querySelector("#bonus").hidden = false;
            setTimeout(function () { document.querySelector("#bonus").hidden = true; }, bonusTimeout);
            random *= 2;
        }
        console.log(random);
        player2TempScore += random;
        document.querySelector("#pl2TemporaryScore").value = player2TempScore;
    }
});

document.querySelector("#pl2TakeScore").addEventListener("click", function () {
    if (!player1Moves && !isGameOver) {
        player2TotalScore += player2TempScore;
        document.querySelector("#pl2TotalScore").value = player2TotalScore;
        player2TempScore = 0;
        document.querySelector("#pl2TemporaryScore").value = 0;
        switchMove();

        if (player1TotalScore > winningScore || player2TotalScore > winningScore) {
            if (player1TotalScore > player2TotalScore) {
                document.querySelector("#playerWon").innerHTML = "Player 1 Won !!!";
            } else if (player1TotalScore < player2TotalScore) {
                document.querySelector("#playerWon").innerHTML = "Player 2 Won !!!";
            } else {
                document.querySelector("#playerWon").innerHTML = "Friendship Won !!!";
            }
            document.querySelector("#btnRestart").attributes.removeNamedItem("hidden");
            isGameOver = true;
        }
    }
});

document.querySelector("#btnRestart").addEventListener("click", function () {
    document.querySelector("#pl1TotalScore").value = 0;
    document.querySelector("#pl2TotalScore").value = 0;
    player1TotalScore = 0;
    player2TotalScore = 0;
    player1TempScore = 0;
    player2TempScore = 0;
    player1Moves = true;
    document.querySelector("#playerWon").innerHTML = "";
    document.querySelector("#btnRestart").hidden = true;
    isGameOver = false;
});



function switchMove() {
    player1Moves = !player1Moves;

    if (player1Moves) {
        document.querySelector("#playerMove").innerHTML = "Player 1 Moves";
    }
    else {
        document.querySelector("#playerMove").innerHTML = "Player 2 Moves";
    }
}



