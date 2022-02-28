let cards = document.querySelectorAll('.memory-card');

let modalWindow = document.querySelector('.window');
let text = document.querySelector('.text');
let closeBtn = document.querySelector('.start');

let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockCard = false;
let step = 0;
let flippedCard = 0;

let audio = new Audio();


cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard(){
    if(lockCard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard){

        hasFlippedCard = true;
        firstCard = this;
        playAudioFlip();
    } else {
    
        secondCard = this;
        playAudioFlip();
        checkMatches();
    }
    console.log(firstCard, secondCard); 
}


function checkMatches(){
    if(firstCard.dataset.image === secondCard.dataset.image){
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        flippedCard++;
        console.log(flippedCard);
        resetBoard()
    }else{
        lockCard = true;
        setTimeout(()=> {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard()
            
        }, 1500);
        
    }
    step++;
    console.log(step);
}

function resetBoard(){
    [hasFlippedCard, lockCard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffleCards(){
    

    cards.forEach(card => {
        let random = Math.floor(Math.random()*cards.length);
        card.style.order = random;
    });
}

window.addEventListener('load', shuffleCards);

/*----------------MODALWINDOW--------------------------------*/

if(flippedCard === 10){
    playAudioWin();
    text.innerHTML = `You open all cards in ${step} steps`
    modalWindow.classList.add('open');
}

function removeFlip(){
    cards.forEach(card => card.classList.remove('flip'));
    shuffleCards();
    flippedCard = 0;
    step = 0;
    hasFlippedCard = false;
    lockCard = false;
}
function closeModalWindow(){
    modalWindow.classList.remove('open');
    removeFlip();
}

closeBtn.addEventListener('click', closeModalWindow);

/*-----------------AUDIO----------------*/



function playAudioFlip(){
    audio.src = 'assets/audio/sound.mp3';
    playAudio();
}


function playAudio(){
    audio.play();
}

function playAudioWin(){
    audio.src = 'assets/audio/win.mp3';
    playAudio();
}