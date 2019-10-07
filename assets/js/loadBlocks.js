var percentAccuracy = 0;


$('div.bot').prepend($('<button>', { id: 'play' }));
$('#play').on('click touchstart', startGame);

function startGame() {
  $('#play').remove();
  setGame();
  var topBricks = document.getElementById('top');
  var bottomBricks = document.getElementById('bot');

  var topBricksPos = 0;
  var bottomBricksPos = 50;
  var animation = setInterval(frame, 10);
  function frame() {
    if (bottomBricksPos === 88) {
      clearInterval(animation);
      $('.home').css('display','none');
      $('#bot').addClass('game');
    } else {
      topBricksPos -= 1.4;
      bottomBricksPos += 1;
      topBricks.style.top = topBricksPos + '%';
      bottomBricks.style.top = bottomBricksPos + '%';
    }
  }


}
