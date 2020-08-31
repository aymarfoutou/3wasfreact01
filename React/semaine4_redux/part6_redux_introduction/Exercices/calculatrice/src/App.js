import React from 'react';
import './App.css';

import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const { message } = useSelector(state => state);
  return (
    <div>
      { message }
    </div>
  );
}

export default App;
