import { useState } from "react"
import { useSocket } from "../../contexts/WebsocketContext"

export const Websocket = () => {
  /* ----- Initialize ----- */
  const [value, setValue] = useState('');
  const { socket } = useSocket();

  /* ----- Functions ----- */
  /* On submit send test message */
  const onSubmit = () => {
    socket?.emit('newMessage', value);
    setValue('');
  }

  /* ----- Render ----- */
  return (
    <div>
      <div>
        <h1>Websocket component</h1>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  )
}