/* eslint-disable react-hooks/exhaustive-deps */
import { PropsWithChildren, useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../contexts/WebsocketContext"
import { RootState } from "../../store";
import { WebsocketStatusType, setStatus } from "../../reducers/websocket";
import { GameStateType, setCharacters, setCurrentBoard, setGameResult, setGameState, setIsMyTurn, setIsRedUser, setMatchId } from "../../reducers/game";
import { Cell, Character } from "../../interfaces/Character";

export const WebsocketManager: React.FC<PropsWithChildren<unknown>> = ({children}) => {
  /* ----- Initialize ----- */
  const { setSocket } = useSocket();
  const dispatch = useDispatch();
  const token = useSelector<RootState, string | undefined>(state => state.user.token);

  /* ----- Setup subscriptions ----- */
  /* ----- If token set in redux store initialize WS connection ----- */
  useEffect(() => {
    if (!token || !setSocket) {
      return;
    }

    // Create connection with authentication
    const socket = io('http://localhost:9001', {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      },
      autoConnect: false,
      reconnection: false,
    });

    // Set socket in Context
    setSocket(socket);

    // Handle connection error
    socket.on('connect_error', () => {
       console.log('Connection Error');
    });

    // Handle successful connection
    socket.on('connect', () => {
      console.log('Connected');
      dispatch(setStatus(WebsocketStatusType.CONNECTED));
    });

    // Handle onMessage channel
    socket.on('onMessage', (data) => {
      console.log('On Message');
      console.log(data);
    });

    // Handle onGetCharacters channel
    socket.on('onGetCharacters', (data: { characters: Array<Character> }) => {
      // Set characters in redux store
      dispatch(setCharacters(data.characters));
    });

    // Handle onIsRedUser channel
    socket.on('onIsRedUser', (data: boolean) => {
      // Set isRedUser in store
      dispatch(setIsRedUser(data));
      dispatch(setIsMyTurn(data === true));
    });

    // Handle onReadyInLobby channel
    socket.on('onReadyInLobby', (data: string) => {
      // Step to Setup stage
      dispatch(setMatchId(data));
      dispatch(setGameState(GameStateType.SETUP));
    });

    // Handle onReadyInSetup channel
    socket.on('onReadyInSetup', (data: Array<Array<Cell>>) => {
      // Step to Setup stage
      dispatch(setCurrentBoard(data));
      dispatch(setGameState(GameStateType.IN_PROGRESS));
    });

    // Handle opponentDisconnect channel
    socket.on('opponentDisconnect', () => {
      // If opponent disconnects move back to LOBBY state
      dispatch(setGameState(GameStateType.LOBBY));
    });

    // onUserMove
    socket.on('onUserMove', (data: { isMyTurn: boolean, board: Array<Array<Cell>>, message: string, status: string }) => {
      if (data.status === 'win' || data.status === 'lose') {
        dispatch(setGameResult(data.status));
        dispatch(setGameState(GameStateType.FINISHED));
      }
      dispatch(setCurrentBoard(data.board));
      dispatch(setIsMyTurn(data.isMyTurn));
    });

    // On component destroy disconnect from WS
    return () => {
      console.log('Unregister events');
      socket.disconnect();
    }
  }, [token]);

  /* ----- Render ----- */
  return (
    <>
      { children }
    </>
  )
}