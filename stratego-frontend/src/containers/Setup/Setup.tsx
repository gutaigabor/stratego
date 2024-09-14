import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { RootState } from "../../store";
import { useSocket } from "../../contexts/WebsocketContext";
import StartBoard from "../StartBoard";
import { Character } from "../../interfaces/Character";
import SetupCharacters from "../SetupCharacters";
import InactiveBoard from "../../components/InactiveBoard";
import { BOARD_ROW_COL, START_BOARD_ROW } from "../../constants";

export const Setup = () => {
  /* ----- Initialize ----- */
  const { socket } = useSocket();
  const characters = useSelector<RootState, Array<Character> | undefined>(state => state.game.characters);
  const matchId = useSelector<RootState, string | undefined>(state => state.game.matchId);
  const isRedUser = useSelector<RootState, boolean | undefined>(state => state.game.isRedUser);

  /* ----- Setup state ----- */
  const [ board, setBoard ] = useState<Array<Array<Character | null>>>([]);
  const [ remainingCharacters, setRemainingCharacters ] = useState<Array<Character> | undefined>(undefined);
  const [ currentCharacterId, setCurrentCharacterId ] = useState<string | undefined>(undefined);
  const [ isReady, setIsReady ] = useState<boolean>(false);

  /* ----- Setup subscriptions ----- */
  useEffect(() => {
    // Get characters through WS
    socket?.emit('getCharacters');
    
    // Init board
    setStartBoard();
  }, []);

  // Initialize remaining characters
  useEffect(() => {
    if (characters) {
      setRemainingCharacters(characters);
    }
  }, [characters]);

  /* ----- Functions ----- */
  const startSetupState = () => {
    // Move to IN_PROGRESS stage in game
    if (isAllCharacterPlaced()) {
      setIsReady(!isReady);
      socket?.emit('readyInSetup', { matchId: matchId, board: board });
    }
    
  }

  const isAllCharacterPlaced = () => {
    const placed = board.find(row => {
      return row.find(cell => {
        return cell == null;
      }) != null;
    });

    return !placed;
  }

  // Create starter board and fill every cell with null value
  const setStartBoard = () => {
    const initBoard: Array<Array<Character | null>> = [];

    // Create board matrix
    for (let i = 0; i < START_BOARD_ROW; i++) {
      const row: Array<Character | null> = [];
      for (let j = 0; j < BOARD_ROW_COL; j++) {
        const cell = null;
        row.push(cell);
      }
      initBoard.push(row);
    }

    setBoard(initBoard);
  }

  // Choose character to be placed
  const chooseCharacter = (character: Character) => {
    setCurrentCharacterId(character._id);
  }

  /* ----- Render ----- */
  return (
    <div>
      <div>
        <h1>Setup page</h1>
        <SetupCharacters
          remainingCharacters={remainingCharacters}
          chooseCharacter={chooseCharacter}
          currentCharacterId={currentCharacterId}
        />
        { !isRedUser && <InactiveBoard/> }
        <StartBoard
          board={board}
          currentCharacterId={currentCharacterId}
          remainingCharacters={remainingCharacters}
          setBoard={setBoard}
          setRemainingCharacters={setRemainingCharacters}
        />
        { isRedUser && <InactiveBoard/> }
        <Button text={isReady ? 'Cancel' : 'Ready'} onClick={startSetupState}/>
      </div>
    </div>
  )
}