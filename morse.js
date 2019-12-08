// @ts-check

const alphabet = {
  // Latin => https://en.wikipedia.org/wiki/Morse_code
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  // Numbers
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  // Punctuation
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  "'": '.----.',
  '!': '-.-.--',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  _: '..--.-',
  '"': '.-..-.',
  $: '...-..-',
  '@': '.--.-.',
  '¿': '..-.-',
  '¡': '--...-',
  ' ': '/',
  // Latin Extended => https://ham.stackexchange.com/questions/1379/international-characters-in-morse-code
  Ã: '.--.-',
  Á: '.--.-',
  Å: '.--.-',
  À: '.--.-',
  Â: '.--.-',
  Ä: '.-.-',
  Ą: '.-.-',
  Æ: '.-.-',
  Ç: '-.-..',
  Ć: '-.-..',
  Ĉ: '-.-..',
  Č: '--.',
  Ð: '..--.',
  È: '.-..-',
  Ę: '..-..',
  Ë: '..-..',
  É: '..-..',
  Ê: '-..-.',
  Ğ: '--.-.',
  Ĝ: '--.-.',
  Ĥ: '----',
  İ: '.-..-',
  Ï: '-..--',
  Ì: '.---.',
  Ĵ: '.---.',
  Ł: '.-..-',
  Ń: '--.--',
  Ñ: '--.--',
  Ó: '---.',
  Ò: '---.',
  Ö: '---.',
  Ô: '---.',
  Ø: '---.',
  Ś: '...-...',
  Ş: '.--..',
  Ș: '----',
  Š: '----',
  Ŝ: '...-.',
  ß: '......',
  Þ: '.--..',
  Ü: '..--',
  Ù: '..--',
  Ŭ: '..--',
  Ž: '--..-',
  Ź: '--..-.',
  Ż: '--..-'
};

function encode(message) {
  // const chars = Object.keys(alphabet).join('');

  // const charsEscaped = chars.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');

  // const charsRegex = new RegExp(`[${charsEscaped}]`, 'gi');

  // const newMessage = message.replace(charsRegex, c => {
  //   console.log(c, c.toUpperCase());
  //   return alphabet[c.toUpperCase()] + ' ';
  // });

  let newMessage = '';
  message.split('').forEach(c => {
    const morse = alphabet[c.toUpperCase()] || false;

    if (morse) {
      newMessage += morse + ' ';
    }
  });

  return newMessage;
}

module.exports = { encode };
