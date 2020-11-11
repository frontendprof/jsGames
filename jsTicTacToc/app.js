
const X_CLASS="x";
const CIRCLE_CLASS="circle";
const win_combinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]





const cellElements=document.querySelectorAll("[data-cell]");
const board=document.querySelector("#board");
const winMsgCont=document.querySelector(".winning-msg");
const winMsgTxt=document.querySelector(".data-winning-msg-txt");
const restartBtn=document.querySelector("#restartBtn");
let circleTurn;


startGame();
restartBtn.addEventListener("click",startGame);

function startGame(){
    circleTurn=false;
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click",handleClick);
        cell.addEventListener("click",handleClick,{once:true})
    })
    setBoardHoverClass();
    winMsgCont.classList.remove("show");

}


function handleClick(e){
    const cell=e.target;
    const currentClass=circleTurn?CIRCLE_CLASS:X_CLASS;
    // Placing mark
    placeMark(cell,currentClass);
    // Check for Win
    if(checkWin(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true)
    }else{
        //Switch Turns
        swapTurns();
        setBoardHoverClass();
    }
    
}

function endGame(draw){
    if(draw){
        winMsgTxt.innerText=`It is a draw`;
    }else{
        winMsgTxt.innerText=`${circleTurn?"O's":"X's"} Wins!!!`;
    }
    winMsgCont.classList.add("show");
}

function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}


function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn=!circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return win_combinations.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}