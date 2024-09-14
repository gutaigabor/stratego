import { Character } from "../../interfaces/Character";
import SetupCharacter from "../../components/SetupCharacter";

interface SetupCharactersState {
  remainingCharacters:  Array<Character> | undefined;
  chooseCharacter: (character: Character) => void;
  currentCharacterId?: string;
}

export const SetupCharacters = (props: SetupCharactersState) => {
  /* ----- Initialize ----- */
  const { remainingCharacters, chooseCharacter, currentCharacterId } = props;

  /* ----- Render ----- */
  return (
    <div className="flex flex-wrap mx-auto w-96 items-center justify-center">
      { remainingCharacters && remainingCharacters.map((character: Character, index: number) => {
        return (
          <SetupCharacter
            key={index}
            character={character}
            isChosen={currentCharacterId === character._id}
            onClick={() => chooseCharacter(character)}
          />
        );
      }) }
    </div>
  )
}