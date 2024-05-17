let secondsSinceInteraction = 0;

function setupController() {
  WebMidi.enable()
    .then(onEnabled)
    .catch((err) => alert(err));

  setInterval(intervalFunction, 1000);
}

// gets called when a MIDI control change message is intercepted
function allCC(e) {
  secondsSinceInteraction = 0;
  hideMessage();

  //pass on to group CC
  customCC(e);
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
}
