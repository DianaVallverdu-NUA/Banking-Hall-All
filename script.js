const playButton = document.getElementById('playIcon');

playButton.onclick = () => {
  
  const href = window.location.href;
  if(href[href.length -1] == '/')
    window.location.href = href + 'a';
  else 
    window.location.href = href + '/a';
}