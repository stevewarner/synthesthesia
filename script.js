// create audio context (think of this as the amp)
window.AudioContext = window.AudioContext || window.webkitAudioContext;
let ctx = new AudioContext();

// oscilator
let o = ctx.createOscillator();
o.type = 'sine';
o.start(0);

// gain
let g = ctx.createGain();
g.gain.value = 0;
o.connect(g);
g.connect(ctx.destination);

// notesByKeycode[65].frequency
// note frequencies from https://pages.mtu.edu/~suits/notefreqs.html
const notesByKeycode = {
  65: { noteName: 'c4', frequency: 261.63, color: '#c0392b' }, 
  87: { noteName: 'c#4', frequency: 277.18, color: '#e74c3c' }, 
  83: { noteName: 'd4', frequency: 293.66, color: '#e67e22' }, // D orange
  69: { noteName: 'd#4', frequency: 311.13, color: '#f39c12' }, // D#
  68: { noteName: 'e4', frequency: 329.63, color: '#f1c40f' }, // E yellow
  70: { noteName: 'f4', frequency: 349.23, color: '#27ae60' }, // F green
  84: { noteName: 'f#4', frequency: 369.99, color: '#1abc9c' }, // F#
  71: { noteName: 'g4', frequency: 392.00, color: '#2980b9' }, // G blue
  89: { noteName: 'ab4', frequency: 415.30, color: '#526eff' }, // Ab
  72: { noteName: 'a4', frequency: 440.00, color: '#3e49bb' }, // A indigo
  85: { noteName: 'bb4', frequency: 466.16, color: '#7f4fc9' }, // Bb
  74: { noteName: 'b4', frequency: 493.88, color: '#682cbf' }, // B violet
  75: { noteName: 'c5', frequency: 523.25, color: '#c0392b' }, // C
  79: { noteName: 'c#5', frequency: 554.37, color: '#e74c3c' }, // C#
  76: { noteName: 'd5', frequency: 587.33, color: '#e67e22' }  // D
};

function startNote(e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  let keyCode = e.keyCode; //use this to get color from color obj
  if (key) { 
    // play note
    let frq = notesByKeycode[keyCode].frequency;
    if (frq) {
        o.frequency.value = frq;
        g.gain.value = 1;
    }
    // change background color
    backgroundColor(keyCode);
    // add css class
    key.classList.add('playing');
    document.getElementById('header').innerHTML = "Press a key.";   
  } else {
    document.getElementById('header').innerHTML = "Not that key.";
  }
}

// stop
function stopNote(e) {
  g.gain.value = 0;
  //remove css
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (key) key.classList.remove('playing'); 
}

// listen for keydown event
window.addEventListener('keydown', startNote);

// keyup
window.addEventListener('keyup', stopNote);

function backgroundColor(keyCode) {
  document.body.style.background = notesByKeycode[keyCode].color;
}