import React, { useEffect } from 'react';
import eruda from 'eruda';

const App: React.FC = (props) => {
  const { children } = props;
  useEffect(() => {
    const env = new URLSearchParams(window.location.search).get('env');
    if (env === 'debug') {
      eruda.init();
    }
  }, []);
  return <>{children}</>;
};

export default App;
