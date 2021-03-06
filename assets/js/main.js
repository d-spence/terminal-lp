const body = document.querySelector('body');
const fakeIn = document.querySelector('#fake-in');
const fakeOut = document.querySelector('#fake-out');
const about = document.querySelector('#about');
const contact = document.querySelector('#contact');
const aboutContent = document.querySelector('#about-content');
const contactContent = document.querySelector('#contact-content');

// Fake input
let fakeInput = ''; // variable which stores fake terminal input
const fakeInputChars = new RegExp(/[a-z 0-9]/, 'gi');
const fakeCmds = ['help', 'test', 'quote', 'shutdown', 'destroy', 'abort', 'hello'];
let iid = null; // interval id

body.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (e.key === 'Backspace') {
    fakeInput = fakeInput.slice(0, -1); // delete last character
  } else if (e.key === 'Enter') {
    checkFakeInput(fakeInput);
    fakeInput = ''; // clear input
  } else if (e.key.match(fakeInputChars)?.length === 1) {
    fakeInput += e.key; // allow all other characters
  }

  fakeIn.innerHTML = fakeInput;
});

const checkFakeInput = (input) => {
  switch (input.toLowerCase()) {
    case '': fakeOut.innerHTML = ''; return; // return if input is empty
    case 'help': fakeOut.innerHTML = `Available commands:${fakeCmds.map(cmd => ' ' + cmd)}`; break;
    case 'test': fakeOut.innerHTML = 'This is a test, please remain calm.'; break;
    case 'quote': fakeOut.innerHTML = '"Never trust a computer you can\'t throw out a window."'; break;
    case 'shutdown': fakeOut.innerHTML = 'Shut down will occur in 9999999999999999 hours...'; break;
    case 'destroy': selfDestruct(); break;
    case 'abort': abortDestruct(); break;
    case 'hello': fakeOut.innerHTML = 'Hello, world!'; break;
    default: fakeOut.innerHTML = `Command '${input}' not found`; break;
  }

  fadeOutput();
}

const selfDestruct = () => {
  let i = 30;
  iid = setInterval(() => {
    i--;
    if (i > -1) {
      fakeOut.innerHTML = `Page will self-destruct in t-${i} seconds...`;
    } else {
      // body.innerHTML = '<a href="https://dspence.net/">Back</a>'; // destroy page
      body.innerHTML = '<video id="exp" src="assets/vid/exp.mp4" muted loop autoplay></video>'; // destroy page
      console.log('Self-destruct was successful!');
      clearInterval(iid);
    }
  }, 1000);
}

const abortDestruct = () => {
  if (iid) {
    clearInterval(iid);
    iid = null;
    fakeOut.innerHTML = `Self-destruct sequence was aborted.`;
  } else {
    fakeOut.innerHTML = `Nothing to abort.`;
  }
}

const fadeOutput = () => {
  // add class with fadein animation and remove after timeout
  fakeOut.classList.add('fade');
  setTimeout(() => {
    fakeOut.classList.remove('fade');
  }, 1000);
}

// WinBox configuration
const wbDefaults = {
  width: '400px',
  height: '400px',
  background: '#00aa00',
  top: 20,
  right: 20,
  left: 20,
  onfocus: function () {
    this.setBackground('#00aa00');
  },
  onblur: function () {
    this.setBackground('#777');
  },
}

about.addEventListener('click', () => {
  const aboutBox = new WinBox({
    ...wbDefaults,
    title: '~/about',
    background: '#00aa00',
    mount: aboutContent,
  });
});

contact.addEventListener('click', () => {
  const contactBox = new WinBox({
    ...wbDefaults,
    title: '~/contact',
    x: 40,
    y: 80,
    height: '300px',
    mount: contactContent,
  });
});
