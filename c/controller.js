const CCSLIDER1 = 2;
const CCSLIDER2 = 3;
const CCSLIDER3 = 4;
const CCSLIDER4 = 5;
const CCSLIDER5 = 6;
const CCSLIDER6 = 8;
const CCSLIDER7 = 9;
const CCSLIDER8 = 12;
const CCSLIDER9 = 86;
let myController;
let R;
let G;
let B;
let gradientposIris;

// gets called when a MIDI control change message is intercepted
function customCC(e) {
//   console.log('moving slider', e.controller.number, e.data);
  let ratio = e.data[2] / 127;
  switch (e.controller.number) {
    case CCSLIDER1: {
      R = 255 * ratio;
      break;
    }

    case CCSLIDER2: {
      G = 150 * ratio;
      break;
    }
    case CCSLIDER3: {
      B = 75 * ratio;
      break;
    }
    case CCSLIDER4: {
      rotationYratio = (PI / 16) * ratio;
      break;
    }

    case CCSLIDER5: {
      rotationXratio = (PI / 16) * ratio;
      break;
    }

    case CCSLIDER6: {
      displacement = ratio;
      break;
    }
    case CCSLIDER7: {
      
      break;
    }

    case CCSLIDER8:
      break;
    case CCSLIDER9:
        gradientposIris = ratio;
      break;
  }
}
