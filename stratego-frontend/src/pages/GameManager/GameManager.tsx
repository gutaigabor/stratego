import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar"
import { GameStateType, setGameState } from "../../reducers/game";
import { RootState } from "../../store";
import { useSocket } from "../../contexts/WebsocketContext";
import Lobby from "../../containers/Lobby";
import Home from "../../containers/Home";
import Setup from "../../containers/Setup";
import Game from "../../containers/Game";
import Result from "../../containers/Result";

export const GameManager = () => {
  /* ----- Initialize ----- */
  const dispatch = useDispatch();
  const { socket } = useSocket();

  /* ----- Collect data from redux store ----- */
  const gameState = useSelector<RootState, GameStateType>(state => state.game.gameState);
  const token = useSelector<RootState, string | undefined>(state => state.user.token);

  /*-----  Setup subscriptions ----- */
  useEffect(() => {
    if (socket) {
      socket.connect();
    }
  }, [socket]);

  useEffect(() => {
    if (token) {
      dispatch(setGameState(GameStateType.LOBBY));
    } else {
      dispatch(setGameState(GameStateType.NOT_CREATED));
    }
  }, [token]);

  /* ----- Functions ----- */
  const renderGameByState = () => {
    switch (gameState) {
      case GameStateType.NOT_CREATED:
        return <Home/>
      case GameStateType.LOBBY:
        return <Lobby/>
      case GameStateType.SETUP:
        return <Setup/>
      case GameStateType.IN_PROGRESS:
        return <Game/>
      case GameStateType.FINISHED:
        return <Result/>
      default:
        return <Home/>
    }
  }

  /* Render */
  return (
    <div>
      <NavBar></NavBar>
      <div>
        { renderGameByState() }
      </div>
    </div>
  )
}