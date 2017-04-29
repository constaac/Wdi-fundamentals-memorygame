//Array containing all possible cards
var cards = [{
    rank: 'queen',
    suit: 'hearts',
    cardImage: 'images/queen-of-hearts.png'
}, {
    rank: 'queen',
    suit: 'diamonds',
    cardImage: 'images/queen-of-diamonds.png'
}, {
    rank: 'king',
    suit: 'hearts',
    cardImage: 'images/king-of-hearts.png'
}, {
    rank: 'king',
    suit: 'diamonds',
    cardImage: 'images/king-of-diamonds.png'
}];

//Array to hold flipped cards
var cardsInPlay = [];

//Define Score Variables Globally
var sc1 = 0;
var sc2 = 0;

//Checks if two cards have been chosen - reacts based on yes/no match
var checkForMatch = function() {
    if (cardsInPlay.length === 2) {
        if (cardsInPlay[0] === cardsInPlay[1]) {
            //alert("You found a match!") A Requirement, but annoying
            sc1 += 1;
            var wins = function() {
                document.getElementById('score1').innerHTML = sc1;
            }
            wins();
            winOutcome();
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




// this function sets the value  of the bet to be made
let bettingChoice = function(x) {
    betPossible()
    resetCardsButton()
    var betChoice = 'nothing'
    
    if (x === 'k') {
        var betChoice = 'king';
        

    }
    if (x === 'q') {
        var betChoice = 'queen';


    }
    console.log(' loop is finished:' + betChoice)

}

// set up an initial function to see if first if they have points to bet
// if they have points to bet then we can run the bigger function that will check if the first card
// flipped is the same as the bet

var betPossible = function(){
    if (sc1 > 0){
        console.log(sc1)
    }
    else {
        console.log( 'you need to play a round first to bet points')
    }
}

//Shows Card face and Pushes to Cards in Play Array (Contains unnecessary console logs)
var flipCard = function() {
    var cardId = this.getAttribute('data-id');
    console.log("User flipped " + cards[cardId].rank);
    cardsInPlay.push(cards[cardId].rank);
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
    shuffle(cards);
    createBoard();
    resetOutcome();
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