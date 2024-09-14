import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../contexts/WebsocketContext";
import { GameStateType, setGameState } from "../../reducers/game";
import Button from "../../components/Button";
import { Cell, CellPosition } from "../../interfaces/Character";
import { RootState } from "../../store";
import Board from "../../components/Board";

export const Game = () => {
  /* ----- Initialize ----- */
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const currentBoard = useSelector<RootState, Array<Array<Cell | null>> | undefined>(state => state.game.currentBoard);
  const matchId = useSelector<RootState, string | undefined>(state => state.game.matchId);
  const isMyTurn = useSelector<RootState, boolean | undefined>(state => state.game.isMyTurn);
  const userId = useSelector<RootState, string | undefined>(state => state.user.userId);

  /* ----- Setup state ----- */
  const [ activeCell, setActiveCell ] = useState<CellPosition | undefined>(undefined);

  /* ----- Functions ----- */
  const startFinishedState = () => {
    // Move to FINISHED stage in game
    dispatch(setGameState(GameStateType.FINISHED));
  }

  /* User move */
  const onCellClick = (i: number, j:number) => {
    if (isMyTurn && currentBoard) {
      const currentCell = currentBoard[i][j];
      if (currentCell && currentCell.userId === userId) {
        if (activeCell && activeCell.i === i && activeCell.j === j) {
          setActiveCell(undefined);
        } else {
          setActiveCell({ i, j });
        }
      } else if (activeCell) {
        socket?.emit('userMove', { matchId: matchId, from: { i: activeCell.i, j: activeCell.j }, to: { i, j}});
        setActiveCell(undefined);
      }
    }
  }

  /* ----- Render ----- */
  return (
    <div>
      <div>
        <h1>Game page</h1>
        {
          currentBoard &&
          <Board
            board={currentBoard}
            onCellClick={onCellClick}
            disabled={!isMyTurn}
            activeCell={activeCell}
          />
        }
        <Button text='Finish' onClick={startFinishedState}/>
      </div>
    </div>
  )
}