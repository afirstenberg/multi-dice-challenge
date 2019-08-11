
function onUpdate( data ){
  console.log('update',data);

  const scoreValue = document.getElementById('score-value');
  const highScoreValue = document.getElementById('high-score-value');
  const highScoreNew = document.getElementById('high-score-new');

  scoreValue.innerText = data.total || '';
  highScoreValue.innerText = data.highScore || '';
  let highScoreBadgeClass = data.isNewHighScore ? 'visible' : 'hidden';
  highScoreNew.className = highScoreBadgeClass;
}

function onTtsMark( mark ){
  console.log('mark',mark);
}

// Make sure we avoid the header
interactiveCanvas.getHeaderHeightPx().then( height => {
  let header = document.getElementById('header');
  console.log('height',height,window.innerHeight);
  header.style.height = `${height}px`;
});

// Setup callbacks
interactiveCanvas.ready({
  onUpdate:  data => onUpdate(  data ),
  onTtsMark: mark => onTtsMark( mark )
});
