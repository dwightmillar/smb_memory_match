var cardContainer = $("div.container");
var health = 2;
var lives = 1;
var powerups = [];
var canClick = true;

var sounds = new Sounds();


var cardDeck =
['mushroom', 'mushroom',
  'star', 'star',
  'fire', 'fire',
  'goomba', 'goomba',
  'koopa', 'koopa',
  'life', 'life',
  'bones', 'bones',
  'bowser', 'bowser',
  'coin', 'coin'];

var cardOne = null;
var cardTwo = null;
var cardOneType = null;
var cardTwoType = null;

var tries = 0;
var percentAccuracy = 0;
var points = 0;
var matches = 0;
var digits = 0;
var score = 0;


class Card {
  constructor(type) {
    this.div = $("<div>", { class: "col-2", click: this.flipCard });
    this.cardBack = $("<div>", { class: "back"});
    this.cardFace = $("<div>", { class: type + " hidden"});
    this.canClick = true;

    this.div.append(this.cardBack);
    this.div.append(this.cardFace);

    return (
      this.div
    )

    this.flipCard = this.flipCard.bind(this);
  }

  flipCard() {
    if (canClick === false || this.canClick === false) {
      return
    }
    sounds.soundEffect('click');
    this.canClick = false;
    this.children[1].classList.toggle("hidden");
    this.children[0].classList.toggle("hidden");
    this.classList.toggle("bounce");
    if (cardOne === null) {
      cardOne = this;
      cardOneType = cardOne.children[1].className;
    } else if (cardOne !== null && cardTwo === null) {
      cardTwo = this;
      cardTwoType = cardTwo.children[1].className;
      if ( cardTwoType !==  cardOneType) {
        ++tries;
        canClick = false;
        setTimeout(() => {
          cardOne.classList.toggle("bounce");
          cardOne.children[1].classList.toggle("hidden");
          cardOne.children[0].classList.toggle("hidden");
          cardTwo.classList.toggle("bounce");
          cardTwo.children[1].classList.toggle("hidden");
          cardTwo.children[0].classList.toggle("hidden");
          cardOne.canClick = true;
          cardTwo.canClick = true;
          canClick = true;
          cardOne = null;
          cardTwo = null;
        }, 500);
      } else {
        ++matches;
        $("." +  cardOneType).parent().off('click');

        switch ( cardOneType) {
          case 'mushroom':
            updatePointCounter(100);
            grow();
            break;

          case 'star':
            updatePointCounter(100);
            powerups.push('invincible');
            setTimeout(() => powerups.pop(), 5000);
            sounds.invincibleMusic();
            switch(health) {
              case 1:
                $('#player').addClass('starminimario');
                setTimeout(() => $('#player')[0].className = 'minimario', 5000);
                 break;
              case 2:
                $('#player').addClass('starmario');
                setTimeout(() => $('#player')[0].className = 'mario', 5000);
                break;
              case 3:
                $('#player').addClass('starfiremario');
                setTimeout(() => $('#player')[0].className = 'firemario', 5000);
                break;
            }
            break;

          case 'fire':
            updatePointCounter(100);
            grow('fire');
            break;

          case 'goomba':
            updatePointCounter(100);
            shrink();
            break;

          case 'koopa':
            updatePointCounter(100);
            shrink();
            break;

          case 'life':
            updatePointCounter(100);
            ++lives;
            sounds.soundEffect('oneup');
            break;

          case 'bones':
            updatePointCounter(100);
            shrink();
            break;

          case 'bowser':
            updatePointCounter(100);
            endgame();
            break;

          case 'coin':
            sounds.soundEffect('score');
            updatePointCounter(100);
            break;
        }

        cardOne = null;
        cardTwo = null;
      }
    }
  }
}

function updatePointCounter(addPoints) {
  calculateAccuracy();

  if(addPoints) {
    points = (points + addPoints) + '';
    score = Math.round(points * percentAccuracy) + '';

    digits = points.split('');
    points = Number(points);

    scoreDigits = score.split('');
    score = Number(score);

    accuracyDigits = (percentAccuracy + '').split('');

    for (let digitIndex = 0; digitIndex < 4; digitIndex++) {
      let currentDigit = digits[digits.length - 1 - digitIndex];
      $('.points > .digit')[3 - digitIndex].style.backgroundImage = `url("./assets/images/${currentDigit}.png")`;
    }
  }

  console.log('score: ',score);
  console.log('digits: ',digits);



  if (!addPoints) {
    for (let digitIndex = 0; digitIndex < 4; digitIndex++) {
      let currentDigit = digits[digits.length - 1 - digitIndex];
      $('.col-4 > .digit#points')[3 - digitIndex].style.backgroundImage = `url("./assets/images/${currentDigit}.png")`;
    }
    for (let digitIndex = 0; digitIndex < 3; digitIndex++) {
      let currentDigit = accuracyDigits[accuracyDigits.length - 1 - digitIndex];
      $('.col-4 > .digit#accuracy')[2 - digitIndex].style.backgroundImage = `url("./assets/images/${currentDigit}.png")`;
    }
    for (let digitIndex = 0; digitIndex < 4; digitIndex++) {
      let currentDigit = scoreDigits[scoreDigits.length - 1 - digitIndex];
      $('.col-4 > .digit#score')[3 - digitIndex].style.backgroundImage = `url("./assets/images/${currentDigit}.png")`;
    }
  }
};

function calculateAccuracy() {
  if (tries) {
    percentAccuracy = (matches / tries).toFixed(2);
  }
  console.log('accuracy: ',percentAccuracy);
};



function grow(fire) {

  if (fire === 'fire') {
    if (health === 1) {
      $('#player').addClass('mario-to-fire');
    } else if (health === 2) {
      $('#player').addClass('super-to-fire');
    }
    setTimeout(() => $('#player')[0].className = 'firemario', 800);
    health = 3;
  } else if (health === 1) {
    $('#player').addClass('mario-to-super');
    setTimeout(() => $('#player')[0].className = 'mario', 800);
    health = 2;
  }

  sounds.soundEffect('grow');

  console.log('Health: ', health);
  console.log('Powerups: ', powerups);
  console.log('Lives: ', lives);
}


function endgame() {
  canClick = false;

  if (lives === 2 || powerups.length > 0) {
    createModal('win');
    sounds.victoryMusic();
  } else {
    createModal('lose');
    sounds.deathMusic();
  }
}

function createModal(type) {

  const scoreTable = $('<div>', { class: 'container-fluid scoretable'});

  const labelsRow = $('<div>', { class: 'row' });

  const pointsLabel = $('<div>', { class: 'col-4', css: {"background-image": "url(./assets/images/points.png)"} });
  const accuracyLabel = $('<div>', { class: 'col-4', css: { "background-image": "url(./assets/images/accuracy.png)"} });
  const scoreLabel = $('<div>', { class: 'col-4', css: { "background-image": "url(./assets/images/score.png)"} });
  labelsRow.append(pointsLabel);
  labelsRow.append(accuracyLabel);
  labelsRow.append(scoreLabel);

  const numbersRow = $('<div>', { class: 'row' });

  const numberOfPoints = $('<div>', { class: 'col-4', css: { "padding-left": "7%" } });
    numberOfPoints.append($('<div>', { class: 'digit', id: 'points' }));
    numberOfPoints.append($('<div>', { class: 'digit', id: 'points' }));
    numberOfPoints.append($('<div>', { class: 'digit', id: 'points' }));
    numberOfPoints.append($('<div>', { class: 'digit', id: 'points' }));


  const accuracyScore = $('<div>', { class: 'col-4', css: { "padding-left": "7%" } });
    accuracyScore.append($('<div>', { class: 'digit', id: 'accuracy' }));
    accuracyScore.append($('<div>', { class: 'digit', id: 'accuracy' }));
    accuracyScore.append($('<div>', { class: 'digit', id: 'accuracy' }));
    accuracyScore.append($('<div>', { class: 'digit', css: { "background-image": "url(./assets/images/percent-sign.png)" }}));


  const scoreColumn = $('<div>', { class: 'col-4', css: { "padding-left": "7%" } });
    scoreColumn.append($('<div>', { class: 'digit', id: 'score' }));
    scoreColumn.append($('<div>', { class: 'digit', id: 'score' }));
    scoreColumn.append($('<div>', { class: 'digit', id: 'score' }));
    scoreColumn.append($('<div>', { class: 'digit', id: 'score' }));

  numbersRow.append(numberOfPoints);
  numbersRow.append(accuracyScore);
  numbersRow.append(scoreColumn);

  const buttonRow = $('<div>', { class: 'row' })

  const buttonDiv = $('<div>', { class: 'col-12' });
  const playButton = $('<button>', { id: 'play', class: 'play', text: 'PLAY AGAIN?' })
  buttonRow.append(buttonDiv).append(playButton);

  scoreTable.append(labelsRow);
  scoreTable.append(numbersRow);
  scoreTable.append(buttonRow);

  $('body').append($('<div>', { class: type + ' modal' }))
  $('div.modal').append($(scoreTable));
  $('div.modal').append();
  $('#play').on('click', resetGame);

  updatePointCounter();

}


function shrink() {

  if (powerups.length === 0){
    --health;

    switch(health) {
      case 0: {
        --lives;
        sounds.deathMusic();
        if (lives === 1) {
          health = 2;
          $('#player')[0].className = 'mario';
        } else if (lives === 0) {
          canClick = false;
          createModal('lose');
        }
      }
      break;
      case 1: {
        $('#player').addClass('super-to-mario');
        setTimeout(() => $('#player')[0].className = 'minimario', 800);
        sounds.soundEffect('shrink');
      }
      break;
      case 2: {
        $('#player').addClass('fire-to-super');
        setTimeout(() => $('#player')[0].className = 'mario', 800);
        sounds.soundEffect('shrink');
      }
      break;
    }
  }

  console.log('Health: ', health);
  console.log('Powerups: ', powerups);
  console.log('Lives: ', lives);
}

function resetGame() {
  $('div.row').remove();
  $('.modal').remove();

  for (let digitIndex = 0; digitIndex < 4; digitIndex++) {
    $('.points > .digit')[3 - digitIndex].style.backgroundImage = `url("./assets/images/0.png")`;
  }

  health = 2;
  canClick = true;
  tries = 0;
  percentAccuracy = 0;
  points = 0;
  matches = 0;
  $('#player')[0].className = 'mario';

  cardDeck =
    ['mushroom', 'mushroom',
      'star', 'star',
      'fire', 'fire',
      'goomba', 'goomba',
      'koopa', 'koopa',
      'life', 'life',
      'bones', 'bones',
      'bowser', 'bowser',
      'coin', 'coin'];

  setGame();
}


function setGame() {
  $('#theme')[0].play()
    .catch((error) => console.log(error.message));

  for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
    let cardRow = $("<div>", { class: "row" });
    cardContainer.append(cardRow);
    for (var cardIndex = 0; cardIndex < 6; cardIndex++) {
      randomCardIndex = Math.floor(Math.random() * cardDeck.length);
      randomCard = new Card((cardDeck.splice(randomCardIndex, 1))[0]);
      $(cardRow).append(randomCard);
    }
  }
}
