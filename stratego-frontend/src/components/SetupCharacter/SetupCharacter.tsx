import { Character } from "../../interfaces/Character";

interface SetupCharacterState {
    character: Character;
    isChosen?: boolean;
    onClick: () => void;
}

export const SetupCharacter = (props: SetupCharacterState) => {
  /* ----- Initialize ----- */
  const { character, isChosen, onClick } = props;

  /* ----- Render ----- */
  return (
    <div
        onClick={onClick}
        className={`grid cursor-pointer text-sm w-24 p-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white m-2 ${isChosen ? 'bg-emerald-900' : ''}`}
    >
      <h1 className="mx-auto">{ character.characterType }</h1>
      <p className="mx-auto">Count: { character.count }</p>
    </div>
  )
}