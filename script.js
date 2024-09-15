let boxes=document.querySelectorAll('.box')
let restartGame=document.querySelector('.btn-restart')
let newGame=document.querySelector('.btn-new')
let msgContainer=document.querySelector('.msg-container')
let msg=document.querySelector('.msg')

let winnerPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6]
]
let turn0;
function disabledboxes(){
    for(let box of boxes){
        box.disabled=true;
    }
}
function enabledboxes(){
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
function showWinner(winner){
    msg.innerText=`Congratulations Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledboxes();
}

function showTie() {
    msg.innerText = `It's a Tie!`;
    msgContainer.classList.remove("hide");
    disabledboxes();
}

function checkWinner() {
    let allFilled = true;
    for (let pattern of winnerPattern) {
        let position1Value = boxes[pattern[0]].innerText;
        let position2Value = boxes[pattern[1]].innerText;
        let position3Value = boxes[pattern[2]].innerText;
        if (position1Value !== "" && position1Value === position2Value && position2Value === position3Value) {
            showWinner(position1Value);
            return;
        }
    }
    
    // Check if all boxes are filled
    for (let box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
            break;
        }
    }
    
    if (allFilled) {
        showTie();
    }
}

boxes.forEach((box)=>{
    box.addEventListener('click',() => {
        if(turn0){
            box.innerText="O";
            turn0=false;
        }else{
            box.innerText="X";
            turn0=true;
        }
        checkWinner();
    })
})

function gameStart(){
    turn0=true;
    enabledboxes();
    msgContainer.classList.add("hide");
}

restartGame.addEventListener('click',gameStart);
newGame.addEventListener('click',gameStart);
gameStart();