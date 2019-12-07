
import React from 'react';
import './App.css';
import Scene from './utils/Scene';
import Entry from './pages/Entry';
function App() {
  let sc = new Scene(0x1099bb);
  document.body.appendChild(sc.getView());
  new Entry(sc);
  return (<div />);
}

export default App;
