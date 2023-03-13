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

// 7. TYPE FOR CELL: marked as string or null
type CellState = {
    markedBy: string | null;
    // string: "x", "o"
    element: Element;
}

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
            cell.textContent = id;

            // initialising the cell state so it can be tracked
            // they can also be tracked after eventlisteners have been listet for x and o
            gameState[id] = {
                markedBy: null,
                element: cell,
            }

            // append child (each single square) to the dom
            gameGrid?.appendChild(cell);

            cell.addEventListener("click", (event) => {
                if (!gameEndState){
                    // whose turn
                    const currentPlayer = players[turn];

                    // player (who's turn it is) adds symbol to the markdBy key for each specific cell
                    const cellState = gameState[id];
                    const isMarked = Boolean(cellState.markedBy);

                    if (!isMarked){
                        cellState.markedBy = currentPlayer.name;
                        // update cell to render the symbol on the tictactoe
                        cell.innerHTML = `<div class="flex justify-center items-center h-full"><p class="text-xl">${currentPlayer.symbol}</p></div>`;
                       
                        // put winning conditions 

                        // next turn
                        turn = (turn + 1) % players.length;
                        const nextPlayer = players[turn];
                        currentPlayerElement.textContent = `The current player is ${nextPlayer}`
                    }
                }
            })
        }
    }
};

// 2. GRID SIZE (so it can be changed later to 4x4 i.e.)
const gridSize = 3

// 3. GRAB #grid-container FROM DOM
const gameGrid = document.getElementById("grid-container");

// 4. GRID STYLING
const gridCellStyling = ["h-[200px]", "w-[200px]", "border", "border-black"];
// cell.classList.add("h-[200px]"), ...
// cell.classList.add("border"), ...


// 8A. UTILITY FUNCTION TO KEEP TRACK
function coordtoId(coord: Coordinates): string {
    // parameter (coord) as type (Coordinates) has to be the outcome string as "number-number"
    // *string* could also just be `${number}-&{number}`
    const [row, col] = coord;
    // because type Coordinates is [number, number]
    // position index 0 is row, position index 1 is col
    // array destructuring: coord is type Coordinates (which is an array)
    return `${row}-${col}`; 
}

// 8B. do reversed 8 (no clue why)
function IdToCoordinates(id: `${number}-&{number}`): Coordinates{
    const [row, col] = id.split("-")
    return [parseInt(row), parseInt(col)]
    // parseInt: passes a string into an interger
}

// 9. GRAB #current-player (paragraph) FROM DOM
const currentPlayerElement = document.getElementById("current-player") as Element;


// 10. GRAB reset-button FROM DOM
const resetButton =document.getElementById("reset-button")


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

// function winning() = {
//     for (let i = 0; i < winConditions.length; i++){
//         console.log()
//         if (currentGameState === (...winConditions)){

// const = document.getElementById
// '${players:name}, you've won the game!'
//         }
//     }
// }

// console.log(winConditions[0])
// const currentGameState = [`${number}-&{number}`, `${number}-&{number}`, `${number}-&{number}]




makeGrid();
