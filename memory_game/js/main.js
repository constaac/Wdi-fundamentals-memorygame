var cards = [
    {
        rank: 'queen',
        suit: 'hearts',
        cardImage: 'images/queen-of-hearts.png'
    },
    {
        rank: 'queen',
        suit: 'diamonds',
        cardImage: 'images/queen-of-diamonds.png'
    },
    {
        rank: 'king',
        suit: 'hearts',
        cardImage: 'images/king-of-hearts.png'
    },
    {
        rank: 'king',
        suit: 'diamonds',
        cardImage: 'images/king-of-diamonds.png'
    }
];
var cardsInPlay = [];
var sc1 = 0;
var sc2 = 0;
var checkForMatch = function() {
    if (cardsInPlay.length === 2) {
        if (cardsInPlay[0] === cardsInPlay[1]) {
            alert("You found a match!")
            sc1 += 1;
            var wins = function() {
                document.getElementById('score1').innerHTML = sc1;
            }
            wins();
        } else {
            alert("Sorry, try again.")
            sc2 += 1;
            var losses = function() {
                document.getElementById('score2').innerHTML = sc2;
            }
            losses();
        }
    }
}
var flipCard = function() {
    var cardId = this.getAttribute('data-id');
    console.log("User flipped " + cards[cardId].rank);
    cardsInPlay.push(cards[cardId].rank);
    console.log(cards[cardId].suit);
    console.log(cards[cardId].cardImage);
    this.setAttribute('src',cards[cardId].cardImage);
    checkForMatch();
}
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

var resetScoreButton = function() {
    document.getElementById('score1').innerHTML = 0;
    document.getElementById('score2').innerHTML = 0;
    sc1 = 0;
    sc2 = 0;
}

var resetCardsButton = function() {
    var myNode = document.getElementById("game-board");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    cardsInPlay = [];
    shuffle(cards);
    createBoard();
}

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}
shuffle(cards);
createBoard();