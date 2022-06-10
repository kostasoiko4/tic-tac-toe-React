import './App.css';
import Board from './Board';
import Square from './Square';
import {useState, useEffect} from 'react';

const defaultSquares = () => (new Array(9)).fill(null);

// winning lines
const lines = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function App() {

  const [squares, setSquares] = useState(defaultSquares());
  const [winner, setWinner] = useState(null);

  // check when changes happes on the squares
  useEffect(() => {

    // find specific lines
    const linesThatAre = (a,b,c) => {
      return lines.filter(squareIndexes => {
        const squareValues = squareIndexes.map(index => squares[index]); // get the values of the squares by index
        return JSON.stringify([a,b,c].sort()) === JSON.stringify(squareValues.sort()); // compare given arrays with wanted arrays
      });
    };

    // winning condition
    const playerOneWon = linesThatAre('x','x','x').length > 0; // find at least one array that is X,X,X
    const playerTwoWon = linesThatAre('o','o','o').length > 0; // find at least one array that is O,O,O

    // display result
    playerOneWon ? setWinner('x') : (playerTwoWon && setWinner('o'));

  },[squares]);

  function handleSquareClick(index) {
    
    const isPlayerOneTurn = squares.filter(square => square !== null).length % 2 === 0; // player one always goes on even number of squares that are empty

    if(squares[index] === null && !winner){
      if(isPlayerOneTurn){ // player one turn
        let newSquares = squares;
        newSquares[index] = 'x';
        setSquares([...newSquares]);
      } else { // player two turn
        let newSquares = squares;
        newSquares[index] = 'o';
        setSquares([...newSquares]);
      }
    }
  }

  function restart(){
    setSquares(defaultSquares());
    setWinner(null);
  }

  return (
    <main>
      <Board>
        {squares.map((square,index) => 
          <Square
            // booleans if square is set as X or O 
            x = {square === 'x' ? 1 : 0}
            o = {square === 'o' ? 1 : 0}
            onClick={() => handleSquareClick(index)}
          />
        )}
      </Board>
      <button className="restart" onClick={() => restart()}>Restart</button>
      {winner && ( winner === 'x' ? ( // if player one won
        <div className="result">Player One Won!</div>
      ) : ( // if player two won
        <div className="result">Player Two Won!</div>
      ))}
    </main>
  );
}

export default App;
