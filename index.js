const cards = document.querySelectorAll('.memory-card');
const screen = document.getElementById('screen');
const moves = document.querySelector('#Move-left');
const commentScreen = document.querySelector('.comments');
const cardScreen = document.querySelector('#cards-count');
let cardCount = 6;
let move = 11;

const boardState = Array(cards.length);
boardState.fill(null);


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;
    if (this === firstCard) return;
this.classList.add('flip');

            if (!hasFlippedCard) {
                //first click
                hasFlippedCard = true;
                firstCard = this;
                return; 
            }
        
                //second click
                hasFlippedCard = false;
                secondCard = this;
            

        move--
        if (move >=2 && move <=15) {
            moves.innerText = `${move} Moves left`;
        }

        if (move == 1) {
            moves.innerText = 'Last move left';
        }
        if (move == 0) {
            gameOver()
            moves.innerText = 'No Moves left';
        }
        checkForMatch();

 }

 function matched(){
    let choices = ['Good', 'Well done', 'Excellent','Great'];
    let randomNumber = Math.floor(Math.random()*4);
    return choices[randomNumber]
 };

 function notMached(){
    let choices = ['Try again', 'Not a match'];
    let randomNumber = Math.floor(Math.random()*2);
    return choices[randomNumber]
 }

//Checking for matching cards
function checkForMatch() {
      let isMatch = firstCard.dataset.framework ===
      secondCard.dataset.framework;
      if (isMatch) {
        cardCount--
        cardScreen.innerText =  `${cardCount}-Cards to Match`;
        screen.classList.add('green-glow');
        setTimeout(
            function removeGreenGlow(){
                screen.classList.remove('green-glow');
            },1500);

            commentScreen.classList.add('green-glow');
            setTimeout(
                function removeGreenGlow(){
                    commentScreen.classList.remove('green-glow');
                },1500)
      }

      else {
        screen.classList.add('red-glow');
        setTimeout(
            function removeRedGlow(){
                screen.classList.remove('red-glow');
            },1500
        )

        commentScreen.classList.add('red-glow');
        setTimeout(
            function removeRedGlow(){
                commentScreen.classList.remove('red-glow');
            },1500
        )
      }

      if (cardCount == 0) {
        cardScreen.innerText = 'Success!!!';
        gameOver();
      }

      let motivationalText = matched();

      screen.innerText = motivationalText;
      isMatch ? disableCards() : unflipCards();

}

function disableCards() {
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);


    resetBoard();
}
function unflipCards() {
    lockBoard = true;
            //not a match
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                resetBoard();
            }, 1500)

            let motiveText = notMached();
            screen.innerText = motiveText;

}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false. false];
    [firstCard, secondCard] = [null, null];

}

(function shuffile() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

function gameOver(){
    commentScreen.innerText = 'Game over click here to restart';
    cards.forEach(card => card.removeEventListener('click',flipCard));
    commentScreen.classList.add('cursor');

    commentScreen.addEventListener('click',function(){
        location.reload();
    });
}

cards.forEach(card => card.addEventListener('click',flipCard));






