const playButton = document.getElementById('playIcon');

playButton.onclick = () => {
  
  const href = window.location.href;
  console.log(href + 'a');
  window.location.href = href + 'a';
}