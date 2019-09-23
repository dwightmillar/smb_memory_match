var percentAccuracy = 0;


$('div.bot').prepend($('<button>', { id: 'play', class: 'play', text: 'PLAY'}));
$('#play').on('click', startGame);

function startGame() {
  setGame();
  var topBricks = document.getElementById('top');
  var bottomBricks = document.getElementById('bot');
  var topBricksPos = 0;
  var bottomBricksPos = 50;
  var animation = setInterval(frame, 10);
  function frame() {
    if (bottomBricksPos === 88) {
      clearInterval(animation);
    } else {
      topBricksPos -= 1.4;
      ++bottomBricksPos;
      topBricks.style.top = topBricksPos + '%';
      bottomBricks.style.top = bottomBricksPos + '%';
    }
  }

  $('body').on('click', () => $('.info').remove());
  setTimeout(() => {
    $('#play').remove();
    $('body').prepend($('<div>', { class: 'info modal' }));
  }, 650);
}
