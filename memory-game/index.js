let cards = document.querySelectorAll('.memory-card');

let modalWindow = document.querySelector('.window');
let text = document.querySelector('.text');
let closeBtn = document.querySelector('.start');

let settingBtn = document.querySelector('.settings');
let settingBody = document.querySelector('.settings-body');
let limit = document.getElementById('limit');

let volumeBtn = document.querySelector('.volume');
let range = document.querySelector('.range');


let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockCard = false;
let step = 0;
let flippedCard = 0;

let audio = new Audio();
audio.volume = 1;




cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard(){
    if(lockCard) return;
    if(this === firstCard) return;

        this.classList.add('flip');
    blockLimit();

    if(!hasFlippedCard){

        hasFlippedCard = true;
        firstCard = this;
        playAudioFlip();
    } else {
    
        secondCard = this;
        playAudioFlip();
        checkMatches();
    }
    if(limit.value > 0){
        step--;
    } else {
        step++;
    }
    
    console.log(step);
     
}


function checkMatches(){
    if(firstCard.dataset.image === secondCard.dataset.image){
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        flippedCard++;
        checkIsAllCardsFlipped();
        resetBoard()
    }else{
        lockCard = true;
        setTimeout(()=> {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard()
            
        }, 1500);
        checkIsAllCardsFlipped();
    }
    
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

function checkIsAllCardsFlipped(){
    if(limit.value === 0 && flippedCard === 10){
        playAudioWin();
        text.innerHTML = `You open all cards in ${step} steps`
        modalWindow.classList.add('open');
    } else if (limit.value > 0 && flippedCard === 10 && step > 0){
        playAudioWin();
        text.innerHTML = `You open all cards in ${step} steps`
        modalWindow.classList.add('open');
    } else if(limit.value > 0 && step <= 0){
        text.innerHTML = `You lose. Try again`
        modalWindow.classList.add('open');
    }
}

function removeFlip(){
    // cards.forEach(card => card.classList.remove('flip'));
    // shuffleCards();
    flippedCard = 0;
    step = 0;
    hasFlippedCard = false;
    lockCard = false;
    unblockLimit();
    cards.forEach(card => card.classList.remove('flip'));
    shuffleCards();
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

/*----------SETTINGS----------*/

function openSettingWindow(){
    settingBody.classList.toggle('open');
}
settingBtn.addEventListener('click', function(event){
    event.preventDefault();
    openSettingWindow();
});



/*----------------Settings--------------------*/

limit.addEventListener('change', function(){
    step = limit.value;   
})

function blockLimit(){
    for(let option of limit){
        option.disabled = true;
    }
}

function unblockLimit(){
    for(let option of limit){
        option.disabled = false;
    }
}
/*-------------VOLUME---------------------*/
let unVolume = false;

function changeVolume(){
    volumeBtn.classList.toggle('mute');
    if(!unVolume){
        audio.volume = 0;
        range.value = 0;
        unVolume = true;
    } else if (unVolume){
        range.value = 5;
        audio.volume = range.value/10;
        unVolume = false;
    }
    
}

volumeBtn.addEventListener('click', function(event){
    event.preventDefault();
    changeVolume();
    
})
range.addEventListener('change', function(){
    audio.volume = range.value/10;
})