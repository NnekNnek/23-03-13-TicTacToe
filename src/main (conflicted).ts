import './style.css'

// types come first OR ther'll be a seperate type-file

// 5. TYPE FOR COORDINATES [number, number]
type Coordinates = [number, number]
// = is an array, also a tuple because there is more than on value to it 

// 6. TYPE FOR PLAYER: name | symbol | score
type Player = {
    name: string;
    symbol: "x" |"o";
    score: number
}
// pics instead of s/o? make a type called Symbol, x:"./" and o:"./".
// then add the type Symbol to the type Player (symbol: Symbol)

// 7. TYPE FOR CELL: marked as string or null
type CellState = {
    markedBy: string | null;
    // string: "x", "o"
    element: Element;
}


// 2. GRID SIZE (so it can be changed later to 4x4 i.e.)
const gridSize = 3

// 3. GRAB #grid-container FROM DOM
const gameGrid = document.getElementById("grid-container");

// 4. GRID STYLING
const gridCellStyling = ["h-[200px]", "w-[200px]", "border-2", "border-purple-400"];
// cell.classList.add("h-[200px]"), ...
// cell.classList.add("border"), ...


// 1. FUNCTION WITH LOOP TO CREATE CELLS AND MAKING THE CELLS CLICKABLE
function makeGrid(){
    for (let row = 0; row < gridSize; row++){
        // 1. 1st row (of divs)
        // 4. 2nd row

        for (let col = 0; col < gridSize; col++){
            // 2. in 1st row col1 (div), col2 (div), col3 (div)
            // 3. loop back to row
            // 5. in 2nd row col1, col2, col3
            // 6. loop back to row... repeat

            // create grid cells
            const cell = document.createElement("div");

            // add styling
            cell.classList.add(...gridCellStyling);

            // GENERATE IDs
            const id = coordtoId([row,col]);
            // coordToId is a function, so 'const id' is bind to the function with turn numbers into a string
            cell.id = id;

            // initialising the cell state so it can be tracked
            // they can also be tracked after eventlisteners have been listet for x and o
            gameState[id] = {
                markedBy: null,
                element: cell,
            }

            // append child (each single square) to the dom
            gameGrid?.appendChild(cell);

            // 18. DISPLAY SCORE
            const display1 = document.getElementById("player1");
            display1.textContent = `Score of ${players[0].name}: ${players[0].score}`;
            const display2 = document.getElementById("player2");
            display2.textContent = `Score of ${players[1].name}: ${players[1].score}`;
            


            cell.addEventListener("click", (event) => {
                if (!gameEndState){
                    // whose turn if game is not completed
                    const currentPlayer = players[turn];
                    // give me player of index[turn] --> initial value of turn = 0

                    // player (who's turn it is) adds symbol to the markdBy key for each specific cell
                    const cellState = gameState[id];
                    const isMarked = Boolean(cellState.markedBy);
                    // converting it into a Booloean to check whether it's marked or not

                    if (!isMarked){
                        cellState.markedBy = currentPlayer.name;
                        // update cell to render the symbol on the tictactoe
                        cell.innerHTML = `<div class="flex justify-center items-center h-full"><p class="text-xl">${currentPlayer.symbol}</p></div>`;
                       
                        // put winning conditions 
                        const gameWinner = didIWin();
                        
                        if (gameWinner){
                            // if it equals to true, then...
                            displayWinner();
                            gameEndState = true;
                            
                            if (turn == 0){
                                newScore(scoreP1)
                            } else {newScore(scoreP2)};

                            return
                        }

                        // next turn
                        turn = (turn + 1) % players.length;
                        // modulus always give a WHOLE number
                        // first time: 0+1 % 2 = 1
                        // outcome is either 0 or 1
                        const nextPlayer = players[turn];
                        currentPlayerElement.textContent = `The current player is ${nextPlayer.name}`
                    }
                }
            })
        }
    }
};


// 8A. UTILITY FUNCTION TO KEEP TRACK
function coordtoId(coord: Coordinates): string {
    // parameter (coord) as type (Coordinates) has to be the outcome string as "number-number"
    // IDs can NOT be numbers! So we have to transform them
    // *string* could also just be `${number}-&{number}`
    const [row, col] = coord;
    // because type Coordinates is [number, number]
    // position index 0 is row, position index 1 is col
    // array destructuring: coord is type Coordinates (which is an array)
    return `${row}-${col}`; 
}


// 8B. TAKES IDs (string) AND MAKES THEM INTO COORDINATES (numbers) AGAIN
function IdToCoordinates(id: `${number}-${number}`): Coordinates{
    const [row, col] = id.split("-")
    return [parseInt(row), parseInt(col)]
    // parseInt(constructor): passes a string into an interger
}

// 9. GRAB #current-player (paragraph) FROM DOM
const currentPlayerElement = document.getElementById("current-player") as Element;


// 10. GRAB reset-button FROM DOM
const resetButton = document.getElementById("reset-button")


// 11. MAKE PLAYERS
const players: Player[] =[
    // 'Player[]' can also be written as 'Array<Player>'
    {name: "Player 1", symbol: "x", score: 0},
    {name: "Player 2", symbol: "o", score: 0},
]

// 12. INITIAL GAME STATE & CURRENT PLAYER
let turn = 0;
// game starts at 0

let gameEndState = false;
// several possibilities: by win, no more moves possible...
// has the game reached its end?

currentPlayerElement.textContent = `The current player is ${players[0].name}`;
// intial state is player 1
// is used to display a message to the players

let gameState: Record<string, CellState> = {};
// tracking the game from the initial state to the end state
// CellState refers to the type
// ?


// 13. WINNING CONDITIONS
const winConditions = [
    ["0-0", "0-1", "0-2"],
    ["1-0", "1-1", "1-2"],
    ["2-0", "2-1", "2-2"],
    ["0-0", "1-0", "2-0"],
    ["0-1", "1-1", "2-1"],
    ["0-2", "1-2", "2-2"],
    ["0-0", "1-1", "2-2"],
    ["2-0", "1-1", "0-2"],
]


// 14. FUNCTION FOR WINNING CONDITION
function didIWin(){
    for (const winCondition of winConditions){
        const [cell1, cell2, cell3] = winCondition.map((id)=> gameState[id])
        // map is like a for-each loop, goes through each item
        // 'gameState[id]' access the game state, to see wheter those cells have been markedBy

        const winner = 
        cell1.markedBy !=null && 
        cell2.markedBy !=null && 
        cell3.markedBy !=null && 
        // are all 3 cells filled with a symbol
        cell1.markedBy == cell2.markedBy &&
        cell1.markedBy == cell3.markedBy;
        // if all 3 cells have the same symbol

        if (winner){
            // defined in the const above
            cell1.element.classList.add("bg-pink-300");
            cell2.element.classList.add("bg-pink-300");
            cell3.element.classList.add("bg-pink-300");
            
            return true
        }
    } 
}



// 15. DISPLAY A CONGRATS-MESSAGE
function displayWinner (){
    currentPlayerElement.textContent = `CONGRATS ${players[turn].name}, you've won :)`;
    currentPlayerElement.classList.add("text-4xl");
}


// 16. RESETTING THE GAME TO PLAY AGAIN
function resetGrid(){
    while (gameGrid?.lastChild){
    // if my grid has a child (one of the 9 cells), remove that child (cell)
    // while-loop
        gameGrid.removeChild(gameGrid.lastChild)
    }

    // setting it back to the beginning
    gameEndState = false;
    turn = 0;
    gameState = {};
    currentPlayerElement.textContent = `The current player is ${players[0].name}`;
    currentPlayerElement.classList.add("text-base");
    
    makeGrid();
}

// 17. RESET BUTTON
resetButton?.addEventListener("click", resetGrid);



// after a win, define winner
// to the winners score add 1
// save the new score
// keep the score after resetbutton



// 19a. ADD 1 TO SCORE
// binding each players score in a let
let scoreP1 = players[0].score;
let scoreP2 = players[1].score ;

// 19b. ADD 1 TO SCORE
function newScore (scoreX:number){
    return scoreX + 1;
};

function displayS

console.log(newScore(scoreP1))

console.log(newScore(players[turn].score));

makeGrid();
