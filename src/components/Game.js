import { useState } from 'react';
import Board from './Board';

export default function Game() {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length-1);
    }

    function jumpTo(nextMove){
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) =>{
        let description;

        if(move > 0 && move < currentMove){
            description="Ir al movimiento #" + move;
        }else if(move === currentMove){
            description = "Estás en el movimiento #" + move;
        }else{
            description="Ir al inicio del juego";
        }
        return (
            <li key={move}>
                {move!==currentMove ? (
                    <button onClick={() => jumpTo(move)}>{description} </button>
                ):(
                    <label onClick={() => jumpTo(move)}>
                        {description} 
                    </label>
                )}
            </li>
        )
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}