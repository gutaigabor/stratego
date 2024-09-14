import Cell from "../Cell";
import { CellPosition, Character, Cell as CharacterCell } from "../../interfaces/Character";

interface BoardState {
  board: Array<Array<Character| CharacterCell | null>>;
  disabled?: boolean;
  activeCell?: CellPosition;
  onCellClick: (i: number, j: number) => void;
}

export const Board = (props: BoardState) => {
  /* ----- Initialize ----- */
  const { board, disabled, activeCell, onCellClick } = props;

  /* ----- Render ----- */
  return (
    <table className="text-left text-sm font-light mx-auto">
      <tbody>
        { board.map((row: Array<Character| CharacterCell | null>, indexI: number) => {
          return (
            <tr key={indexI}>
              { row.map((cell: Character| CharacterCell | null, indexJ: number) => {
                return (
                  <Cell
                    key={indexJ}
                    i={indexI}
                    j={indexJ}
                    character={cell && 'character' in cell ? cell.character : cell}
                    isActiveCell={activeCell && activeCell.i === indexI && activeCell.j === indexJ}
                    onClick={() => onCellClick(indexI, indexJ)}
                    disabled={disabled}/>
                )
              }) }
            </tr>
          )
        }) }
      </tbody>
    </table>
  )
}