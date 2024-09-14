import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import WebsocketManager from './containers/WebsocketManager';
import { WebsocketProvider } from './contexts/WebsocketContext';

import { store, persistor } from './store';
import { router } from './routes';

import './App.css';

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WebsocketProvider>
            <WebsocketManager>
              <RouterProvider router={router} />
            </WebsocketManager>
          </WebsocketProvider>
        </PersistGate>
      </Provider>,
    </div>
  )
}

export default App
