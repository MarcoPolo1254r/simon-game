const colors = [1,2,3,4];
let round = 1;
let gameSequence = [];
let playerSequence = [];
let isShowingSequence = true;

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
    gameSequence = getColorSequence(5);
    gameSequence.forEach((value,index) => {
        setTimeout(() => {
            let button = buttonMap[value];
            button.style.backgroundColor = button.dataset.color;
            setTimeout(() => {
                button.style.backgroundColor = 'white';
                if (index === gameSequence.length -1){
                    isShowingSequence = false;
                    console.log ("player can play")
                }
            }, 700);            
        }, index * 1400);
    })    
    return
};

function handlePlayerInput(input) {
    if (isShowingSequence) {
        alert('Wait until the full sequence is shown')
        return
    }
        playerSequence.push(input);
        console.log(playerSequence);
};

redButton.addEventListener('click',() => handlePlayerInput(1));
blueButton.addEventListener('click',() => handlePlayerInput(2));
greenButton.addEventListener('click',() => handlePlayerInput(3));
yellowButton.addEventListener('click',() => handlePlayerInput(4));

showSequence();