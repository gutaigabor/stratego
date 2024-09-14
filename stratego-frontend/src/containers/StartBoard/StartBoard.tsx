import { Dispatch, SetStateAction } from "react";
import { Character } from "../../interfaces/Character";
import Board from "../../components/Board";

interface StartBoardState {
  board: Array<Array<Character | null>>;
  currentCharacterId?: string;
  remainingCharacters?: Array<Character>;
  setBoard: Dispatch<SetStateAction<(Character | null)[][]>>;
  setRemainingCharacters: Dispatch<SetStateAction<Character[] | undefined>>;
}

export const StartBoard = (props: StartBoardState) => {
  /* ----- Initialize ----- */
  const {
    board,
    currentCharacterId,
    remainingCharacters,
    setBoard,
    setRemainingCharacters,
  } = props;

  /* ----- Functions ----- */
  // Remove character from board and set actual counts
  const removeFromBoard = (i: number, j: number, existingCharacter: Character | null) => {
    // Remove character from board
    const tempBoard = [...board]
    tempBoard[i][j] = null;
    setBoard(tempBoard);

    // Increase the remaining count of character that got removed from board
    if (existingCharacter && remainingCharacters) {
      const tempRemainingCharacters = remainingCharacters.map(c => {
        if (c._id === existingCharacter._id) {
          return { ...c, count: c.count+1 };
        } else {
          return c;
        }
      });
      setRemainingCharacters(tempRemainingCharacters);

      return tempRemainingCharacters;
    }

    return remainingCharacters;
  }

  // Set character on board and decrease its count
  const setOnBoard = (i: number, j: number, modifiedCharacters?: Array<Character>) => {
    if (modifiedCharacters) {
      // Find character by id
      const currentCharacter = modifiedCharacters.find(c => c._id === currentCharacterId);

      // If character not found or character count is empty no action
      if (!currentCharacter || (currentCharacter && currentCharacter.count <= 0)) {
        return;
      }
      // Set chosen character on given cell
      const tempBoard = [...board]
      tempBoard[i][j] = currentCharacter;
      setBoard(tempBoard);

      // Decrease selected character's count
      const tempRemainingCharacters = modifiedCharacters.map(c => {
        if (c._id === currentCharacter._id) {
          if (c.count <= 0) {
            return c;
          }
          return { ...c, count: c.count-1 };
        } else {
          return c;
        }
      });
      setRemainingCharacters(tempRemainingCharacters);
    }
  }

  // Place character on board
  const placeCharacter = (i: number, j: number) => {
    // Get character from given cell
    const existingCharacter = board[i][j];
    // Remove character from board
    const modifiedCharacters = removeFromBoard(i, j, existingCharacter);
    // If selected character is not the same as the removed, place in its place
    if (existingCharacter?._id !== currentCharacterId) {
      setOnBoard(i, j, modifiedCharacters);
    }
  }

  /* ----- Render ----- */
  return (
    <Board board={board} onCellClick={placeCharacter}/>
  )
}