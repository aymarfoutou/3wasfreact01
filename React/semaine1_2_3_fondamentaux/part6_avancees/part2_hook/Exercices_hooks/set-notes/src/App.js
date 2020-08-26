import React, { useContext } from 'react';

import './App.css';
import { NotesContext } from './reducer/notes';

const App = () => {
  const [state, dispatch] = useContext(NotesContext);
  return (
    <div className="App">
      <p>Hello</p>
  { state.notes.map((note, i) => <p key={i}>{note}</p>)}
    </div>
  );
}

export default App;
