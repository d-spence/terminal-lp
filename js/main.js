const body = document.querySelector('body');
const fake = document.querySelector('#fake');
const about = document.querySelector('#about');
const contact = document.querySelector('#contact');
const aboutContent = document.querySelector('#about-content');
const contactContent = document.querySelector('#contact-content');

// Fake input
let fakeInput = ''; // variable which stores fake terminal input
let fakeInputChars = new RegExp(/[a-z0-9]/, 'gi');

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
  fake.innerHTML = fakeInput;
})

const checkFakeInput = (input) => {
  return;
}

// WinBox
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
