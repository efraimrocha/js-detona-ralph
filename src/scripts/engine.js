// state -> Aqui são fefinidos os elementos as variaveis que estão estão divididas em
// duas sessões; view e values. Em view estarão os elemntos que será mostrado para o jogador e em values estão valores para cáculos e controle do game.
const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        socre: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        message: document.querySelector("#message")
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions:{
        countDownTimerId: setInterval(countDown, 1000),
        timerId: null,
    }
};

// Contagem de tempo regressivo.
function countDown(){

    //Implementa uma suvtação do tempo setado.
    state.values.curretTime--;

    //Atualiza a o tempo na view do game.
    state.view.timeLeft.textContent = state.values.curretTime;

    // verifica se tempo engotou
    if (state.values.curretTime <= 0){
        playSound("game-over");
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        message("GAME OVER!");
        // alert("Game over! Your resul: " + state.values.result);
    }
};

function message(message){
    state.view.message.textContent = `${message}`;
}

// Toca um audio de forma genérica. Para isto, o arquivo deve está no formato mp3.
function playSound(audioName){
    let audio = new Audio(`./src/sounds/${audioName}.mp3`)
    audio.volume = 0.05;
    audio.play();
};

//Escolhe o quadrado em que o inimigo irá aparecer de forma randômica.
function randomSquare(){

    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

// Função qu eativa a movimentação do enemy.
function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
};

function addListnerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
            if (square.id === state.values.hitPosition){
                state.values.result++
                state.view.socre.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        }) 
    });
};

function liveDown(){

}

function init() {
   moveEnemy();
   addListnerHitBox();
};

init();