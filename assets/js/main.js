var cardContainer = $("div.container");
var health = 2;
var lives = 1;
var powerups = [];
var victory = false;
var canClick = true;


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
    $('#click')[0].play()
      .catch((error) => console.log(error.message));
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
          case 'mushroom': grow();
            break;

          case 'star': sound('invincible');
            break;

          case 'fire': grow('fire');
            break;

          case 'goomba': shrink();
            break;

          case 'koopa': shrink();
            break;

          case 'life': sound('oneup');
            break;

          case 'bones': shrink();
            break;

          case 'bowser': endgame();
            break;

          case 'coin': sound('score');
            break;
        }

        cardOne = null;
        cardTwo = null;
      }
    }
  }
}



function grow(fire) {

  if (fire === 'fire') {
    if (health === 1) {
      $('#player')[0].className = 'mario-to-fire firemario';
    } else if (health === 2) {
      $('#player')[0].className = 'super-to-fire firemario';
    }
    health = 3;
  } else if (health === 1) {
    $('#player')[0].className = 'mario-to-super mario';
    health = 2;
  }

  $('#grow')[0].play()
    .catch((error) => console.log(error.message));

  console.log('Health: ', health);
  console.log('Powerups: ', powerups);
  console.log('Lives: ', lives);
}

function sound(type) {
  $('#'+type)[0].play()
    .catch((error) => console.log(error.message));

  if (type === 'invincible') {
    $('#theme')[0].pause();
    $('#player')[0].className = 'mario starmario';
    powerups.push('invincible');
    setTimeout(() => {
      powerups.pop();
      $('#theme')[0].play()
        .catch((error) => console.log(error.message));
      $('#invincible')[0].pause()
    }, 5000);
  } else if (type === 'oneup') {
    ++lives;
  }
}

function endgame() {
  if (lives === 2 || powerups.length > 0) {
    $('body').append($('<div>', { class: 'win modal' }))
    $('#theme')[0].pause();
    $('#invincible')[0].pause();
    $('#victory')[0].play()
      .catch((error) => console.log(error.message));
  }
}


function shrink() {

  if (powerups.length === 0){
    --health;

    switch(health) {
      case 0: {
        --lives;
        if (lives === 1) {
          health = 2;
          $('#player')[0].className = 'mario';

          $('#theme')[0].pause();

          $('#death')[0].play()
            .catch((error) => console.log(error.message));

          $('#theme')[0].play()
            .catch((error) => console.log(error.message));

        } else if (lives === 0) {

          $('#theme')[0].pause();

          $('#death')[0].play()
            .catch((error) => console.log(error.message));

          $('body').append($('<div>', { class: 'lose modal' }))
        }
      }
      break;
      case 1: {
        $('#player')[0].className = 'super-to-mario minimario';

        $('#shrink')[0].play()
          .catch((error) => console.log(error.message));
      }
      break;
      case 2: {
        $('#player')[0].className = 'fire-to-super mario';

        $('#shrink')[0].play()
          .catch((error) => console.log(error.message));
      }
      break;
    }
  }

  console.log('Health: ', health);
  console.log('Powerups: ', powerups);
  console.log('Lives: ', lives);
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
