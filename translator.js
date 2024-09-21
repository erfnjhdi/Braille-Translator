const brailleMap = {
  'A': 'O.....',
  'B': 'O.O...',
  'C': 'OO....',
  'D': 'OO.O..',
  'E': 'O..O..',
  'F': 'OOO...',
  'G': 'OOOO..',
  'H': 'O.OO..',
  'I': '.OO...',
  'J': '.OOO..',
  'K': 'O...O.',
  'L': 'O.O.O.',
  'M': 'OO..O.',
  'N': 'OO.OO.',
  'O': 'O..OO.',
  'P': 'OOO.O.',
  'Q': 'OOOOO.',
  'R': 'O.OOO.',
  'S': '.OO.O.',
  'T': '.OOOO.',
  'U': 'O...OO',
  'V': 'O.O.OO',
  'W': '.OOO.O',
  'X': 'OO..OO',
  'Y': 'OO.OOO',
  'Z': 'O..OOO',

  // Numbers 
  '1': 'O.....',
  '2': 'O.O...',
  '3': 'OO....',
  '4': 'OO.O..',
  '5': 'O..O..',
  '6': 'OOO...',
  '7': 'OOOO..',
  '8': 'O.OO..',
  '9': '.OO...',
  '0': '.OOO..',

  // Punctuation
  '.': '..OO.O',
  ',': '..O...',
  '?': '..O.OO',
  '!': '..OOO.',
  ':': '..OO..',
  ';': '..O.O.',
  '-': '....OO',
  '/': '.O..O.',
  '<': '.OO..O',
  '>': 'O..OO.',
  '(': 'O.O..O',
  ')': 'O.O..O',
  'space': '......',

  // Special symbols
  'capital': '.....O',
  'number': '.O.OOO'
};

const reversedBrailleMap = {
    'O.....': 'A',
    'O.O...': 'B',
    'OO....': 'C',
    'OO.O..': 'D',
    'O..O..': 'E',
    'OOO...': 'F',
    'OOOO..': 'G',
    'O.OO..': 'H',
    '.OO...': 'I',
    '.OOO..': 'J',
    'O...O.': 'K',
    'O.O.O.': 'L',
    'OO..O.': 'M',
    'OO.OO.': 'N',
    'O..OO.': 'O',
    'OOO.O.': 'P',
    'OOOOO.': 'Q',
    'O.OOO.': 'R',
    '.OO.O.': 'S',
    '.OOOO.': 'T',
    'O...OO': 'U',
    'O.O.OO': 'V',
    '.OOO.O': 'W',
    'OO..OO': 'X',
    'OO.OOO': 'Y',
    'O..OOO': 'Z',
  
    // Punctuation
    '..OO.O': '.',
    '..O...': ',',
    '..O.OO': '?',
    '..OOO.': '!',
    '..OO..': ':',
    '..O.O.': ';',
    '....OO': '-',
    '.O..O.': '/',
    '.OO..O': '<',
    'O..OO.': '>',
    'O.O..O': '(',
    'O.O..O': ')',
    '......': 'space',
  
    // Special symbols
    '.....O': 'capital',
    '.O.OOO': 'number'
  };
  
  const revserseBrailleNum = {
    'O.....': '1',
    'O.O...': '2',
    'OO....': '3',
    'OO.O..': '4',
    'O..O..': '5',
    'OOO...': '6',
    'OOOO..': '7',
    'O.OO..': '8',
    '.OO...': '9',
    '.OOO..': '0',
  }

//function to check if letter is uppercase
const isUpper = (char) => char === char.toUpperCase() && char >= 'A' && char <= 'Z';

//function to check if char is number
function isInteger(char) {
    return /^[0-9]$/.test(char);
}

function isWhitespace(char) {
    return /\s/.test(char);
}

//function to translate from english string to braille
const translateToBraille  = (str) => {
    let result = "";
    let number = "";
    for (let c of str){
        if (isUpper(c)){
            result += brailleMap['capital'];
        }
        if (isInteger(c) && !number){
            result += brailleMap['number'];
            number = true;
        }
        if (isWhitespace(c)){
            result += brailleMap['space'];
            number = false;
        }
        else{
            result += brailleMap[c.toUpperCase()];
        }
    }
    return result
}

const translateToEng = (str) => {
    let temp = "";
    const array = [];
    let i = 0;
    for (let c of str){
        temp += c;
        i++;
        if (i === 6){
            array.push(temp);
            temp = "";
            i = 0;
        }
    }
    let result = "";
    let number = "";
    let value = "";
    let capital = "";

    for (let i = 0; i < array.length; i++){
        value = reversedBrailleMap[array[i]];
        if (value === 'capital'){
            capital = true;
            continue;
        }
        if (value === 'number'){
            number = true;
            continue;
        }
        if (value === 'space'){
            result += " ";
            number = false;
        }
        else{
            if (capital){
                result+= value;
                capital = false;
            }
            else if (number){
                result+=revserseBrailleNum[array[i]];
            }
            else{
                result+= value.toLowerCase();
            }
        }
    }
    return result
}

//check if given string is in braille
const isBraille = (str) => {
    let cut = str.slice(0, 6);
    return reversedBrailleMap[cut] !== undefined
}

const translate = (string) =>{
    if (isBraille(string)){
        const result = translateToEng(string);
        console.log(result);
    }
    else{
        const result = translateToBraille(string);
        console.log(result);
    }
}


translate(process.argv.slice(2).join(' '));


