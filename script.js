const playButton = document.getElementById('playIcon');

playButton.onclick = () => {
  
  const href = window.location.href;
  window.location.href = href + 'a';
}