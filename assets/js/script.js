var cardContainer = $("div.container");
var health = 2;
var lives = 1;
var canClick = true;
var powerups = [];
var victory = true;


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


class Card {
  constructor(type) {
    this.div = $("<div>", { id: type, class: "col-2", click: this.flipCard });
    this.cardBack = $("<div>", { class: "card back"});
    this.cardFace = $("<div>", { class: type + " hidden"});

    this.div.append(this.cardBack);
    this.div.append(this.cardFace);

    return (
      this.div
    )
  }

  flipCard() {
    if (canClick === false) {
      return
    }
    this.children[1].classList.toggle("hidden");
    this.children[0].classList.toggle("hidden");
    if (cardOne === null) {
      cardOne = this.children;
      $(cardOne).off('click');
    } else if (cardOne !== null && cardTwo === null) {
      cardTwo = this.children;
      if (cardTwo[1].className !== cardOne[1].className) {
        canClick = false;
        setTimeout(() => {
          cardOne[1].classList.toggle("hidden");
          cardOne[0].classList.toggle("hidden");
          cardTwo[1].classList.toggle("hidden");
          cardTwo[0].classList.toggle("hidden");
          cardOne = null;
          cardTwo = null;
          canClick=true}, 500);
      } else {
        $("." + cardOne[1].className).parent().off('click');

        switch (cardOne[1].className) {
          case 'mushroom': grow();
            break;

          case 'star': {
            powerups.push('star');
            setTimeout(() => powerups.pop(), 5000);
          }
            break;

          case 'fire': grow('fire');
            break;

          case 'goomba': shrink(1);
            break;

          case 'koopa': shrink(1);
            break;

          case 'life': oneup();
            break;

          case 'bones': shrink(1);
            break;


          case 'bowser': shrink(3);
            break;

          case 'coin': score();
            break;
        }

        cardOne = null;
        cardTwo = null;
      }
    }
  }
}

window.onload = setGame();


function grow(fire) {
  if (health === 1) {
    $('#player')[0].className = 'mario';
    health = 2;
  }
  if (fire === 'fire') {
    $('#player')[0].className = 'firemario';
    health = 3;
  }

  $('#grow')[0].play()
    .then((success) => console.log(success))
    .catch((error) => console.log(error.message));

  console.log('Health: ', health);
  console.log('Powerups: ', powerups);
  console.log('Lives: ', lives);
}


function score() {
  $('#score')[0].play()
    .then((success) => console.log(success))
    .catch((error) => console.log(error.message));
}


function shrink(damage) {

  if (powerups.length === 0){
    health -= damage;
    if (health <= 0) {
      --lives;
      if (lives === 0) {
        $('#death')[0].play()
          .then((success) => console.log(success))
          .catch((error) => console.log(error.message));
        alert('Game over!');
      } else if (victory === true) {
        $('#victory')[0].play()
          .then((success) => console.log(success))
          .catch((error) => console.log(error.message));
        alert('You win!');
      }
    } else if (health === 1) {
      $('#player')[0].className = 'minimario';
      $('#shrink')[0].play()
        .then((success) => console.log(success))
        .catch((error) => console.log(error.message));
    } else if (health === 2) {
      $('#player')[0].className = 'mario';
      $('#shrink')[0].play()
        .then((success) => console.log(success))
        .catch((error) => console.log(error.message));
    }
  }

  console.log('Health: ', health);
  console.log('Powerups: ', powerups);
  console.log('Lives: ', lives);
}




function oneup() {
  ++lives;
  $('#oneup')[0].play()
    .then((success) => console.log(success))
    .catch((error) => console.log(error.message));

  console.log('Health: ', health);
  console.log('Powerups: ', powerups);
  console.log('Lives: ', lives);
}


function setGame() {
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
