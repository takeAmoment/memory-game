let cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockCard = false;

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard(){
    if(lockCard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard){

        hasFlippedCard = true;
        firstCard = this;
    } else {
    
        secondCard = this;
        checkMatches();
    }
    console.log(firstCard, secondCard);

    
    
}

function checkMatches(){
    if(firstCard.dataset.image === secondCard.dataset.image){
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard()
    }else{
        lockCard = true;
        setTimeout(()=> {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard()
            
        }, 1500);
        
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