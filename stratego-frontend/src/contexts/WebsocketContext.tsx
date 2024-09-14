/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState, PropsWithChildren } from "react";
import { Socket } from "socket.io-client";

interface SocketState {
    socket: Socket | undefined;
    setSocket(socket: Socket): void;
}

const defaultSocketState : SocketState = {
  socket: undefined,
  setSocket: () => {}
};

// Create WS context
const SocketContext = createContext(defaultSocketState);

// Custom hook to access socket
export const useSocket = () => useContext(SocketContext);

// Websocket Context Provider
export const WebsocketProvider : React.FC<PropsWithChildren<unknown>> = ({children}) => {
    /* ----- Initialize ----- */
    const [socket, setSocket] = useState<Socket | undefined>(undefined);

    /* ----- Render ----- */
    return (
      <SocketContext.Provider value={{socket, setSocket}}>
          {children}
      </SocketContext.Provider>
    );
};