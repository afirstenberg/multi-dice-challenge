
function onUpdate( data ){
  console.log('update',data);
  let msg = document.getElementById('msg');
  msg.innerText = data.Send.Text;
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
