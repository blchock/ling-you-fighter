
import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Scene from './utils/Scene';
import Entry from './pages/Entry';
import View from './utils/View';

String.prototype.gblen = function() {    
  var len = 0;    
  for (var i=0; i<this.length; i++) {    
      if (this.charCodeAt(i)>127 || this.charCodeAt(i)===94) {    
           len += 2;    
       } else {    
           len ++;    
       }    
   }    
  return len;    
}   

function App() {
  let sc = new Scene(0xffffff);
  document.body.appendChild(sc.getView());
  new Entry(sc);
  return (<View sc={ sc } />);
}

export default App;
