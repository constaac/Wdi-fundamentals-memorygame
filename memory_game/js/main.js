//Array containing all possible cards - added "number" to help with same-pick check function
var cards = [{
    rank: 'queen',
    suit: 'hearts',
    cardImage: 'images/queen-of-hearts.png',
    number: '1'
}, {
    rank: 'queen',
    suit: 'diamonds',
    cardImage: 'images/queen-of-diamonds.png',
    number: '2'
}, {
    rank: 'king',
    suit: 'hearts',
    cardImage: 'images/king-of-hearts.png',
    number: '3'
}, {
    rank: 'king',
    suit: 'diamonds',
    cardImage: 'images/king-of-diamonds.png',
    number: '4'
}];

//Array containing flipped cards
var cardsInPlay = [];

//Define Score Variables Globally
var sc1 = 0;
var sc2 = 0;

//Update Wins Score
var wins = function() {
    document.getElementById('score1').innerHTML = sc1;
}

//Checks if two cards have been chosen - reacts based on yes/no match
var checkForMatch = function() {
    if (cardsInPlay.length === 2) {
        if (cardsInPlay[0] === cardsInPlay[1]) {
            console.log(betChoice + " card 0 is " + cardsInPlay[0] + " and card 1 is " + cardsInPlay[1]);
            if (betChoice === 'king' && (cardsInPlay[0] === 'king' && cardsInPlay[1] === 'king')) {
                sc1 += 4;
                wins();
                winOutcome();
            } else if (betChoice === 'queen' && (cardsInPlay[0] === 'queen' && cardsInPlay[1] === 'queen')) {
                sc1 += 4;
                wins();
                winOutcome();
            } else {
                //alert("You found a match!") A Requirement, but annoying
                sc1 += 1;
                wins();
                winOutcome();
            }
        } else {
            //alert("Sorry, try again.") A Requirement, but annoying
            sc2 += 1;
            var losses = function() {
                document.getElementById('score2').innerHTML = sc2;
            }
            losses();
            loseOutcome();
        }
    }
}

//Initialize bet choice variable globally
var betChoice = "blank";

// this function sets the value  of the bet to be made
var bettingChoice = function(x) {
    if (sc1 > 0) {
        resetCardsButton();
        sc1 -= 1;
        document.getElementById('score1').innerHTML = sc1;
        if (x === 'k') {
            betChoice = 'king';
            console.log(betChoice);
        }
        if (x === 'q') {
            betChoice = 'queen';
            console.log(betChoice);
        }
    } else {
        alert('You must have "Win Points" before you place a bet!');
    };
};

//Generate Array of Card Images Already Flipped
cardsInPlayID = [];

//Shows Card face and Pushes to Cards in Play Array (Contains unnecessary console logs)
var flipCard = function() {
        var cardId = this.getAttribute('data-id');
        //Checking for same-card picks
        if (cardsInPlayID.length >= 1) {
            if (cardsInPlayID[0] === cards[cardId].number) {
            alert("You can't pick the same card multiple times!");
            return;
            }
        }
        console.log("User flipped " + cards[cardId].rank);
        cardsInPlay.push(cards[cardId].rank);
        cardsInPlayID.push(cards[cardId].number);
        console.log(cards[cardId].suit);
        console.log(cards[cardId].cardImage);
        this.setAttribute('src', cards[cardId].cardImage);
        checkForMatch();
}

//Adds Card Back images to the Div with a For Loop (4 Times) - Contains an Unnecesary Console Log
var createBoard = function() {
    for (var i = 0; i < cards.length; i++) {
        var cardElement = document.createElement('img');
        cardElement.setAttribute('src', 'images/back.png');
        cardElement.setAttribute('data-id', i);
        cardElement.addEventListener('click', flipCard);
        document.getElementById('game-board').appendChild(cardElement);
        console.log(cardElement);
    }
}

//ToDo --> Condense the following into one function
//Display Winning Outcome (Green Text)
var winOutcome = function() {
    document.getElementById('outcome').innerHTML = "You've found a match!";
    document.getElementById('outcome').style.color = "green";
}

//Display Losing Outcome (Red Text)
var loseOutcome = function() {
    document.getElementById('outcome').innerHTML = "Sorry, try again!";
    document.getElementById('outcome').style.color = "red";
}

//Resets Outcome - Prompt to choose again (Reset Text Color)
var resetOutcome = function() {
    document.getElementById('outcome').innerHTML = "Choose two cards...";
    document.getElementById('outcome').style.color = "black";
}

//Sets User's Score to (0 - 0)
var resetScoreButton = function() {
    document.getElementById('score1').innerHTML = 0;
    document.getElementById('score2').innerHTML = 0;
    sc1 = 0;
    sc2 = 0;
}

//Shuffles Cards and Recreates Game Board
var resetCardsButton = function() {
    var myNode = document.getElementById("game-board");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    cardsInPlay = [];
    cardsInPlayID = [];
    shuffle(cards);
    createBoard();
    resetOutcome();
    betChoice = "blank";
}

//Function to shuffle order of Cards Array
var shuffle = function(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

//Initial Shuffle and Creation of Gameboard (Happens Once)
shuffle(cards);
createBoard();