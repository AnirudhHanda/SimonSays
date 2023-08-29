let gameSeq = [];
let userSeq = [];

let highest = 0;


let started = false;
let level = 0;
let btns = ["c1", "c2", "c3", "c4"];

let h2 = document.querySelector("h2");

let start = document.querySelector("button");

start.addEventListener("click", function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    }, 250)
}

function levelUp(){
    level++;
    if(level > highest){
        highest = level;
        let span = document.querySelector("#highest");
        span.innerText = highest;
    }
    userSeq = [];
    h2.innerText = `Level ${level}`;

    // chooses random button
    let randomIdx = Math.floor(Math.random()*4);
    let randColor = btns[randomIdx];

    gameSeq.push(randColor);
    console.log(gameSeq);
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn); 
}

function checkBtn(idx){
    // console.log(`current level ${level}`);
    // let idx = level - 1;
    if(userSeq[idx] === gameSeq[idx]){
        // console.log("same value");
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 700);
        } else{
            h2.innerText = `👀 hmm go on...`;
        }
    } else{
        h2.innerHTML = `Game Over! <span>Your Score :${level}</span> <br> Press any key to start.`
        document.querySelector("body").style.backgroundColor = "#BF0034";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "black";
        }, 350);
        reset();
    }
}

function btnPress(){
    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    checkBtn(userSeq.length-1); 
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}
