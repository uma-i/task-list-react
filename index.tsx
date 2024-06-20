import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const data=[
    {id:"s1", name:"Finish adding tasks", checked:true},
    {id:"s2", name:"Deletion feature", checked:false},
    {id:"s3", name:"Add a countdown/timer", checked:false}
]

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App tasks={data}/>
  </React.StrictMode>
);

reportWebVitals();
