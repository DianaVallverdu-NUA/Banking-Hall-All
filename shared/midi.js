let first = true;
let secondsSinceInteraction = 0;

function setupController() {
  WebMidi.enable()
    .then(onEnabled)
    .catch((err) => alert(err));

  setInterval(intervalFunction, 1000);
}

// gets called when a MIDI control change message is intercepted
function allCC(e) {
  //check if track changing
  // if (e.controller.number === 35) {
  //   console.log(e.data[2]);
  //   if (e.data[2] >= 127 * 0.5) showB();
  //   if (e.data[2] < 127 * 0.5) showA();
  //   return;
  // }
    //check if track changing
    if (e.controller.number === 61 && e.data[2]) return nextPage();
    if (e.controller.number === 60 && e.data[2]) return previousPage();  

  //if first message is showing -> hide
  if (first) {
    hideMessage();
    playAudio();
  }

  //if not first -> check if need to show message
  if (!first && secondsSinceInteraction >= secondsToDisplayMessage) {
    displayMessage();
    setTimeout(() => hideMessage(), 15000);
  }

  //reset values
  first = false;
  secondsSinceInteraction = 0;

  //pass on to group CC
  customCC(e);
}

function allNoteOn(e) {
  //if first message is showing -> hide
  if (first) {
    hideMessage();
    playAudio();
  }

  //if not first -> check if need to show message
  if (!first && secondsSinceInteraction >= secondsToDisplayMessage) {
    displayMessage();
    setTimeout(() => hideMessage(), 15000);
  }

  //reset values
  first = false;
  secondsSinceInteraction = 0;

  //check if track changing
  // if (e.controller.number === 61 && e.data[2] === 0) nextPage();
  // if (e.controller.number === 60 && e.data[2] === 0) previousPage();

  //pass on to group CC
  customNotes(e);
}

// ===================================
// gets called by MIDI library once MIDI enabled
function onEnabled() {
  // Display available MIDI input devices
  if (WebMidi.inputs.length < 1) {
  } else {
    WebMidi.inputs.forEach((device, index) => {
      // console.log(`${index}: ${device.name}`);
    });
  }
  myController = WebMidi.inputs[0];
  myController.channels[1].addListener("controlchange", allCC);

  // read note messages
  myController.channels[1].addListener("noteon", allNoteOn);
}
