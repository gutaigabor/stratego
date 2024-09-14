import { useEffect, useState } from "react";
import { BLUE_START_ROW, BOARD_ROW_COL } from "../../constants";

export const InactiveBoard = () => {
  /* ----- Setup state ----- */
  const [ board, setBoard ] = useState<Array<Array<number>>>([]);

  /* ----- Setup subscriptions ----- */
  useEffect(() => {    
    const initBoard: Array<Array<number>> = [];

    // Create board matrix
    for (let i = 0; i< BLUE_START_ROW; i++) {
      const row: Array<number> = [];
      for (let j =0; j < BOARD_ROW_COL; j++) {
        const cell = 0;
        row.push(cell);
      }
      initBoard.push(row);
    }

    setBoard(initBoard);
  }, []);

  /* ----- Functions ----- */
  // Get the bg color for inactive cells
  const getBackgroundColor = (i: number, j: number) =>{
    if (i % 2 === 0 && j % 2 === 0) {
      return 'bg-gray-300';
    } else if (i % 2 === 1 && j % 2 === 1) {
      return 'bg-gray-300';
    }
    return 'bg-gray-400';
  }

  /* ----- Render ----- */
  return (
    <table className="text-left text-sm font-light mx-auto">
      <tbody>
        { board.map((row: Array<number>, indexI: number) => {
          return (
            <tr key={indexI}>
              { row.map((cell: number, indexJ: number) => {
                return (
                  <td key={indexJ} className={`h-16 w-16 ${getBackgroundColor(indexI, indexJ)}`}></td>
                )
              }) }
            </tr>
          )
        }) }
      </tbody>
    </table>
  )
}