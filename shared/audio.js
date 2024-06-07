const playAudio = () => {
  const href = window.location.href;
  const currentPage = href[href.length - 2];

  const audioFile = `../shared/audio/${currentPage}.mp3`;

  const audio = new Audio(audioFile);
  audio.loop = true;

  audio.play();
};

playAudio();