for (let blockIndex = 0; blockIndex < 10; blockIndex++) {
  $('header').prepend($('<div>').addClass('block').css('left', (blockIndex * 10) + 'vw'));
  $('footer').append($('<div>').addClass('block').css('left', (blockIndex * 10) + 'vw'));
}

for (let blockIndex = 0; blockIndex < 10; blockIndex++) {
  $('header').append($('<div>').addClass('block').css('left', (blockIndex * 10) + 'vw').css('bottom', 30 + 'vw'));
  $('footer').append($('<div>').addClass('block').css('left', (blockIndex * 10) + 'vw').css('top', 30 + 'vw'));
}

for (let blockIndex = 0; blockIndex < 10; blockIndex++) {
  $('header').append($('<div>').addClass('block').css('left', (blockIndex * 10) + 'vw').css('bottom', 60 + 'vw'));
  $('footer').append($('<div>').addClass('block').css('left', (blockIndex * 10) + 'vw').css('top', 60 + 'vw'));
}


$('footer').prepend($('<button>', { id: 'play', class: 'play', text: 'PLAY'}));
$('#play').on('click', startGame);

function startGame() {
  setGame();
  $('header')[0].className = 'game';
  $('footer')[0].className = 'game';
  $('body').on('click', () => $('.info').remove());
  setTimeout(() => {
    $('#play').remove();
    $('body').prepend($('<div>', { class: 'info modal' }));
  }, 650);
}
