let cards = document.querySelectorAll('.memory-card');

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard(){
    console.log('flip')
    this.classList.toggle('flip');
}
