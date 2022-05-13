import React from 'react';
import IRouter from './router';
import { QNWhiteBoardStore } from './components';
import UserStore from './store';

function App() {
  return (
    <QNWhiteBoardStore>
      <UserStore>
        <IRouter />
      </UserStore>
    </QNWhiteBoardStore>
  );
}

export default App;
