import { useState } from "react";
import Button from "../../components/Button"
import { useSocket } from "../../contexts/WebsocketContext";

export const Lobby = () => {
  /* ----- Initialize ----- */
  const { socket } = useSocket();

  /* ----- Setup state ----- */
  const [ isReady, setIsReady ] = useState<boolean>(false);

  /* ----- Functions ----- */
  const startSetupState = () => {
    // Move to SETUP stage in game
    setIsReady(!isReady);
    socket?.emit('readyInLobby');
  }

  /* ----- Render ----- */
  return (
    <div>
      <div>
        <h1>Lobby page</h1>
        <Button text={isReady ? 'Cancel' : 'Ready'} onClick={startSetupState}/>
      </div>
    </div>
  )
}