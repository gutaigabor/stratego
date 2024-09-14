import { useDispatch, useSelector } from "react-redux";
import { GameStateType, setGameState } from "../../reducers/game";
import Button from "../../components/Button";
import { RootState } from "../../store";

export const Result = () => {
  /* ----- Initialize ----- */
  const dispatch = useDispatch();
  const gameResult = useSelector<RootState, string | undefined>(state => state.game.gameResult);

  /* ----- Functions ----- */
  const startLobbyState = () => {
    // Move to LOBBY stage in game
    dispatch(setGameState(GameStateType.LOBBY));
  }

  /* ----- Render ----- */
  return (
    <div>
      <div>
        <h1>Result page</h1>
        <h2>{gameResult}</h2>
        <Button text='Back to Lobby' onClick={startLobbyState}/>
      </div>
    </div>
  )
}