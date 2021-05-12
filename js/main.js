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
const fakeCmds = ['help', 'test', 'hello', 'quote'];

body.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    fakeInput = fakeInput.slice(0, -1); // delete last character
  } else if (e.key === 'Enter') {
    checkFakeInput(fakeInput);
    fakeInput = ''; // clear input
  } else if (e.key.match(fakeInputChars)?.length === 1) {
    fakeInput += e.key; // allow all other characters
  }

  // console.log(fakeInput);
  fakeIn.innerHTML = fakeInput;
})

const checkFakeInput = (input) => {
  if (input === '') {
    fakeOut.innerHTML = '>'; return; // return if input is empty
  } else {
    switch (input.toLowerCase()) {
      case 'help': fakeOut.innerHTML = `Available commands:${fakeCmds.map(cmd => ' ' + cmd)}`; break;
      case 'test': fakeOut.innerHTML = 'This is a test, do not be alarmed.'; break;
      case 'hello': fakeOut.innerHTML = 'Hello, world!'; break;
      case 'quote': fakeOut.innerHTML = '"Never trust a computer you can\'t throw out a window."'; break;
      default: fakeOut.innerHTML = `Command '${input}' not found`; break;
    }

    fakeOut.classList.add('fade');
    // add class with fadeout animation and then remove after 7s
    setTimeout(() => {
      fakeOut.classList.remove('fade');
    }, 1000);
  }
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
    title: '/about',
    background: '#00aa00',
    mount: aboutContent,
  });
})

contact.addEventListener('click', () => {
  const contactBox = new WinBox({
    ...wbDefaults,
    title: '/contact',
    x: 40,
    y: 80,
    height: '300px',
    mount: contactContent,
  });
})
