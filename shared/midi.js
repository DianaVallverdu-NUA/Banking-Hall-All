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

  // notes going from 40 to 43
  const note = e.data[1];


  // WARNING: remove unused pages!
  switch(note) {
    case 40 : 
      return goToPage("a");

    case 41 : 
      return goToPage("b");

    case 42 : 
      return goToPage("c");

    case 43 : 
      return goToPage("d");
  }
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
