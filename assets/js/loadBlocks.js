for (let blockIndex = 0; blockIndex < 10; blockIndex++){
  $('footer').append($('<div>', { class: 'block' }));
}
for (let blockIndex = 0; blockIndex < 10; blockIndex++) {
  $('header').prepend($('<div>').addClass('block').css('left', (blockIndex * 10) + 'vw'));
}

$('footer').prepend($('<button>', { id: 'play', class: 'play', text: 'PLAY'}));

$('#play').on('click', startGame);

function startGame() {
  setGame();
  $('header')[0].className = 'game';
  $('footer')[0].className = 'game';
}
