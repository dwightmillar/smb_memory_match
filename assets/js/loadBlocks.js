for (let blockIndex = 0; blockIndex < 10; blockIndex++){
  $('header').prepend($('<div>', { class: 'block'}));
  $('footer').append($('<div>', { class: 'block' }));
}

$('footer').prepend($('<button>', { id: 'play', class: 'play', text: 'PLAY'}));

$('#play').on('click', startGame);

function startGame() {
  setGame();
  $('header')[0].className = 'game';
  $('footer')[0].className = 'game';
}
