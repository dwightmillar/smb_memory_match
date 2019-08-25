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
var accuracy = 0;
var points = 0;
var matches = 0;


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
        $("." +  cardOneType).parent().off('click');

        switch ( cardOneType) {
          case 'mushroom':
            points += 100;
            grow();
            break;

          case 'star':
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
            points += 200;
            grow('fire');
            break;

          case 'goomba':
            points += 100;
            shrink();
            break;

          case 'koopa':
            points += 200;
            shrink();
            break;

          case 'life':
            ++lives;
            sounds.soundEffect('oneup');
            break;

          case 'bones':
            points += 300;
            shrink();
            break;

          case 'bowser':
            points += 1000;
            endgame();
            break;

          case 'coin': sounds.soundEffect('score');
            points += 500;
            break;
        }

        cardOne = null;
        cardTwo = null;
      }
    }
  }
}



function grow(fire) {
  ++tries;
  ++matches;

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
  ++tries;
  ++matches;
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

  let scoreTable = $('<div>', { class: 'container-fluid scoretable'});

  let attemptsRow = $('<div>', { class: 'row' });

  let attemptsLabel = $('<div>', { class: 'col-6', text: 'Attempts: '});
  let attempts = $('<div>', { class: 'col-6', text: tries });
  attemptsRow.append(attemptsLabel);
  attemptsRow.append(attempts);

  let accuracyRow = $('<div>', { class: 'row' });

  let accuracyLabel = $('<div>', { class: 'col-6',text: 'Accuracy: ' });
  let accuracy = $('<div>', { class: 'col-6', text: Math.round(matches/tries*100) + '%'});
  accuracyRow.append(accuracyLabel);
  accuracyRow.append(accuracy);

  let pointsRow = $('<div>', { class: 'row' });

  let pointsLabel = $('<div>', { class: 'col-6', text: 'Points: ' });
  let pointCount = $('<div>', { class: 'col-6', text: points });
  pointsRow.append(pointsLabel);
  pointsRow.append(pointCount);

  let buttonRow = $('<div>', { class: 'row' })

  let buttonDiv = $('<div>', { class: 'col-12' });
  let playButton = $('<button>', { id: 'play', class: 'play', text: 'PLAY AGAIN?' })
  buttonRow.append(buttonDiv).append(playButton);

  scoreTable.append(attemptsRow);
  scoreTable.append(accuracyRow);
  scoreTable.append(pointsRow);
  scoreTable.append(buttonRow);

  $('body').append($('<div>', { class: type + ' modal' }))
  $('div.modal').append($(scoreTable));
  $('div.modal').append();
  $('#play').on('click', resetGame);

}


function shrink() {
  ++tries;
  ++matches;

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

  health = 2;
  canClick = true;
  tries = 0;
  accuracy = 0;
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
