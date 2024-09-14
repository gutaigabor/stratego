interface ButtonState {
  text: string;
  onClick: () => void;
}

export const Button = (props: ButtonState) => {
  /* ----- Initialize ----- */
  const { text, onClick } = props;

  /* ----- Render ----- */
  return (
    <button onClick={onClick} className="cursor-pointer text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white m-2">
      { text }
    </button>
  )
}