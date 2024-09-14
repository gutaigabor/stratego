import { Character } from "../../interfaces/Character";

interface CellState {
  i: number;
  j: number;
  character: Character | null;
  disabled?: boolean;
  isActiveCell?: boolean;
  onClick: () => void;
}

export const Cell = (props: CellState) => {
  /* ----- Initialize ----- */
  const { i, j, character, disabled, isActiveCell, onClick } = props;

  /* ----- Functions ----- */
  // Get the bg color for cells
  const getBackgroundColor = (i: number, j: number) =>{
    if (isActiveCell) {
      return 'bg-cell-pointer';
    }

    if (i % 2 === 0 && j % 2 === 0) {
      return 'bg-cell-light';
    } else if (i % 2 === 1 && j % 2 === 1) {
      return 'bg-cell-light';
    }
    return 'bg-cell-dark';
  }

  /* ----- Render ----- */
  return (
    <td
      onClick={onClick}
      className={`h-16 w-16 ${getBackgroundColor(i, j)} ${!disabled && 'hover:bg-cell-pointer cursor-pointer'}`}
    >
      {character?.characterType}
    </td>
  )
}