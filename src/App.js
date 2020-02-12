
import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Scene from './utils/Scene';
import Entry from './pages/Entry';
import View from './utils/View';

function App() {
  let sc = new Scene(0xffffff);
  document.body.appendChild(sc.getView());
  new Entry(sc);
  return (<View sc={sc} />);
}

export default App;
