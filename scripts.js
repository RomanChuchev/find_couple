const cards = document.querySelectorAll('.card');
let hasFlipCard = false
let firstCard, secondCard
let blockCard = false
let hasTimer = false
let cardPair = 0
let interval
let x = 0
let y = 0
let z = 0

let restart = document.getElementById('restart')
let finish = document.getElementById('finish')
let minutes = document.getElementById('minutes')
let seconds = document.getElementById('seconds')
let top_minutes = document.getElementById('top_minutes')




function flipCard() {

    timerStart()
    if (blockCard) return;
    if (this === firstCard) return;


    this.classList.add('flip');
    this.classList.add('no-event');
    if (!hasFlipCard) {
        hasFlipCard = true;
        firstCard = this;
    } else {
        secondCard = this;

        compareCards()
    }
}


function compareCards() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        firstCard.removeEventListener('click', flipCard)
        secondCard.removeEventListener('click', flipCard)

        cardPair += 2;

        resetBoard()
    } else {
        blockCard = true
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard()
        }, 500);

    }

}

function resetBoard() {
    finishGame()


    firstCard.classList.remove('no-event');
    secondCard.classList.remove('no-event');

    hasFlipCard = blockCard = false;
    firstCard = secondCard = null;
}

function timerStart() {
    if (hasTimer === true) return;
    interval = setInterval(timer, 10);
    hasTimer = true
}


function timer() {
    ++x
    if (x < 10) {
        seconds.textContent = '0' + x;
    } else if (x < 60) {
        seconds.textContent = x;
    } else {
        seconds.textContent = 00;
        x = 0;
        ++y;
        if (y < 10) {
            minutes.textContent = '0' + y
        } else if (y < 60) {
            minutes.textContent = y;
        } else {
            y = 0;
            ++z;
            if (z < 10) {
                top_minutes.textContent = '0' + z
            } else top_minutes.textContent = z
        }
    }
}

function finishGame() {
    if (cardPair === cards.length) {
        clearInterval(interval);
        setTimeout(() => {
            finish.classList.remove('no-event');
            text.textContent = "Ваше время: " + top_minutes.textContent + '.' + minutes.textContent + '.' + seconds.textContent;
            seconds.textContent = '00'
            minutes.textContent = '00'
            top_minutes.textContent = '00'
            finish.classList.remove('hidden')
            finish.classList.add('visible');
        }, 1000);

    }

}

function restartGame() {
    location.reload();
}
restart.addEventListener('click', restartGame);


cards.forEach(card => {
    card.addEventListener('click', flipCard)

    let ramdomIndex = Math.floor(Math.random() * cards.length - cards.length);
    card.style.order = ramdomIndex;
})