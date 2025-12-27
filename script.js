const colors = [1,2,3,4];
let round = 1;
let gameSequence = [];

const redButton = document.querySelector('#redButton');
const blueButton = document.querySelector('#blueButton');
const greenButton = document.querySelector('#greenButton');
const yellowButton = document.querySelector('#yellowButton');

const buttonMap = {
    1: redButton,
    2: blueButton,
    3: greenButton,
    4: yellowButton
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);   // Ensure min is treated as an integer
  max = Math.floor(max);  // Ensure max is treated as an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getColorSequence (round) {
    const getColorSequence = [];
    let selectedColor = 0;
    for (let i = 0; i < round; i++ ) {
        selectedColor = colors[getRandomIntInclusive(1,4)-1]
        getColorSequence.push(selectedColor);
    }
    return getColorSequence;
}

function showSequence(){
    gameSequence = getColorSequence(10);
    gameSequence.forEach((value,index) => {
        setTimeout(() => {
            let button = buttonMap[value];
            button.style.backgroundColor = button.dataset.color;
            setTimeout(() => {
                button.style.backgroundColor = 'white';
            }, 700);            
        }, index * 1400);
    })    
    return
};



function play(){
    showSequence()
    return ;
}

play();