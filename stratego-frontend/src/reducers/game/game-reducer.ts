import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell, Character } from '../../interfaces/Character';

export enum GameStateType {
  NOT_CREATED = 'NOT_CREATED',
  LOBBY = 'LOBBY',
  SETUP = 'SETUP',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED'
}

export type GameState = {
  gameState: GameStateType,
  matchId?: string,
  characters?: Array<Character>,
  currentBoard?: Array<Array<Cell>>,
  isRedUser?: boolean,
  isMyTurn?: boolean,
  gameResult?: string
};

const initialState : GameState = {
  gameState: GameStateType.NOT_CREATED
};

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState: (
      state,
      { payload: gameState }: PayloadAction<GameStateType>
    ) => {
      state.gameState = gameState;
    },
    setMatchId: (
      state,
      { payload: matchId }: PayloadAction<string>
    ) => {
      state.matchId = matchId;
    },
    setCharacters: (
      state,
      { payload: characters }: PayloadAction<Array<Character>>
    ) => {
      state.characters = characters;
    },
    setCurrentBoard: (
      state,
      { payload: currentBoard }: PayloadAction<Array<Array<Cell>>>
    ) => {
      state.currentBoard = currentBoard;
    },
    setIsRedUser: (
      state,
      { payload: isRedUser }: PayloadAction<boolean>
    ) => {
      state.isRedUser = isRedUser;
    },
    setIsMyTurn: (
      state,
      { payload: isMyTurn }: PayloadAction<boolean>
    ) => {
      state.isMyTurn = isMyTurn;
    },
    setGameResult: (
      state,
      { payload: gameResult }: PayloadAction<string>
    ) => {
      state.gameResult = gameResult;
    }
  }
});


export const { setGameState, setCharacters, setMatchId, setCurrentBoard, setIsRedUser, setIsMyTurn, setGameResult } = slice.actions;

export default slice.reducer;
