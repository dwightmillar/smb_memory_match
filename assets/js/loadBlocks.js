var percentAccuracy = 0;


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
