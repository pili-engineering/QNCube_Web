import React from 'react';
import IRouter from './router';
import UserStore from './store/UserStore';

function App() {
  return (
    <UserStore excludeRoutes={['/recent/qrcode', '/recent/image']}>
      <IRouter />
    </UserStore>
  );
}

export default App;
