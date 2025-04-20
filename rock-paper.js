

let isAutoplaying = false;
let intervalId;

function autoPlay(){
    if(!isAutoplaying){
        const playerMove = pickComputermove();
       intervalId = setInterval (  () => {
        playGame(playerMove);
        }, 1000);
        isAutoplaying = true;
        document.querySelector('.auto-play-btn').innerHTML = 'Stop Play';
    } else {clearInterval(intervalId); isAutoplaying = false;
        document.querySelector('.auto-play-btn').innerHTML = 'Auto Play';
    }
    }



const finalScoor =  (JSON.parse(localStorage.getItem('scoor'))) || {
    wins: 0,
    Losses: 0,
    Ties: 0
}
   //Button Event
    document.querySelector('.js-Rock-btn').addEventListener('click',() => {
        playGame('Rock')
    })

    document.querySelector('.js-Paper-btn').addEventListener('click',() => {
        playGame('Paper')
    })

    document.querySelector('.js-Secisser-btn').addEventListener('click',() => {
        playGame('Secisser')
    })
    document.querySelector('.auto-play-btn').addEventListener('click', ()=>{autoPlay();})

    document.querySelector('.btn-reset').addEventListener('click', ()=>{
    massageDisply();
    })
    


    //Keyboard Event
    document.body.addEventListener('keydown', (event) => {
        if(event.key === 'r') { playGame('Rock')}
        else if(event.key === 'p'){playGame('Paper')}
        else if (event.key === 's') {playGame('Secisser')}
        else if (event.key === 'Backspace') { 
           massageDisply();}
        else if (event.key === 'a'){autoPlay(); }
    })
    

function playGame(playerMove) {
    const result = pickComputermove();
    let scoor = '';
    /* Return value diye plear move kora hoice function use kore*/

     if (playerMove === 'Secisser') {
    if (result === 'Rock') { scoor = 'You Loss';
    } else if (result === 'Paper') {  scoor = 'You Win';
    } else if (result === 'Secisser') { scoor = 'Tie';}

     } else if (playerMove === 'Paper') {
    if (result === 'Rock') { scoor = 'You Win';} 
    else if (result === 'Paper') {  scoor = 'Tie'}
    else if (result === 'Secisser') { scoor = 'You Loss'}

    }  else if (playerMove === 'Rock') {
        if (result === 'Rock') { scoor = 'Tie';} 
     else if (result === 'Paper') {  scoor = 'You Loss'}
     else if (result === 'Secisser') { scoor = 'You Win'}
     
     /*Update Scoor Board With Object*/
    } if (scoor === 'You Win') {finalScoor.wins ++;}
     else if (scoor === 'You Loss') { finalScoor.Losses ++;}
     else if (scoor === 'Tie') {finalScoor.Ties ++;}


        
    
        localStorage.setItem('scoor', JSON.stringify(finalScoor))
     
        document.querySelector('.js-result').innerHTML = scoor;
     
        document.querySelector('.js-move').innerHTML = `You Pick <img class="move-img1" src="img/${playerMove}-emoji.png"> - Computer Pick <img class="move-img1" src="img/${result}-emoji.png">`
        upDateScoor()
    }


    /* Function kora hoice computer move and retur kora hoice value*/
    function upDateScoor() {
        document.querySelector('.js-scoor').innerHTML = `Wins: ${finalScoor.wins}. Losses: ${finalScoor.Losses}. Ties: ${finalScoor.Ties}`;
    }

   



    function pickComputermove() {
    const randomNumber = Math.random();
    let result = '';
    if (randomNumber >= 0 && randomNumber <= 1/3) {result = 'Rock' ;  
    } else if (randomNumber >= 1/3 && randomNumber <= 2/3) { result = 'Paper';
     } else if (randomNumber >= 2/3 && randomNumber <= 1 ) {result = 'Secisser' ; }
     return result;
    }

    function resetGame(){ 
        finalScoor.wins = 0;
        finalScoor.Losses = 0;
        finalScoor.Ties = 0 ;
        localStorage.removeItem (JSON.parse(localStorage.getItem('scoor')));
        upDateScoor();

    }





 function massageDisply(){
       const massageBox= document.querySelector('.js-massage-btn');
       massageBox.innerHTML =`Are You Sure You Want To Reset The Score? <button class="js-yes-btn">Yes</button> <button class="js-no-btn">No</button>`;
        document.querySelector('.js-yes-btn').addEventListener('click', () => {resetGame(); massageBox.innerHTML= ''; })
        document.querySelector('.js-no-btn').addEventListener ('click', ()=>{massageBox.innerHTML = '';})
        }


