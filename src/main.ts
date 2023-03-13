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
    // 
}

// 1. FUNCTION WITH LOOP TO CREATE CELLS
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

            // append child(each single square) to the dom
            gameGrid?.appendChild(cell);
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
    // *string* could also just be '${number}-&{number}'
    const [row, col] = coord;
    // because type Coordinates is [number, number]
    // position index 0 is row, position index 1 is col
    // array destructuring: coord is type Coordinates (which is an array)
    return '${row}-${col}';
}

// 8B. do reversed 8 (no clue why)
function IdToCoordinates(id: '${number}-&{number}'): Coordinates{
    const [row, col] = id.split("-")
    return [parseInt(row), parseInt(col)]
    // parseInt: passes a string into an interger
}

// 9. GRAB #current-player PARAGRAPH FROM DOM
const currentPlayer = document.getElementById("current-player")


makeGrid();
