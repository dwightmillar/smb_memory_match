var cardContainer = $("div.container");

var canClick = true;

var cardDeck = ['mushroom', 'mushroom',
  'star', 'star',
  'fire', 'fire',
  'goomba', 'goomba',
  'koopa', 'koopa',
  'life', 'life',
  'bones', 'bones',
  'bowser', 'bowser',
  'coin', 'coin']

var cardOne = null;
var cardTwo = null;

class Card {
  constructor(type) {
    this.div = $("<div>", { class: "col-2", click: this.flip });
    this.cardBack = $("<div>", { class: "card back"});
    this.cardFace = $("<div>", { class: type + " hidden"});
    this.div.append(this.cardBack);
    this.div.append(this.cardFace);

    return (
      this.div
    )
;
  }

  flip() {
    if (canClick === true) {
      this.children[1].classList.toggle("hidden");
      this.children[0].classList.toggle("hidden");
      if (cardOne === null) {
        cardOne = this.children;
        console.log(cardOne);
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
          cardOne = null;
          cardTwo = null;
        }
        console.log(cardTwo);
      }
    }
  }
}

for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
  let cardRow = $("<div>", { class: "row" });
  cardContainer.append(cardRow);
  for (var cardIndex = 0; cardIndex < 6; cardIndex++) {
    randomCardIndex = Math.floor(Math.random() * cardDeck.length);
    randomCard = new Card(cardDeck.splice(randomCardIndex, 1));
    $(cardRow).append(randomCard);
  }
}
