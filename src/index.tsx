import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './index.css';

// import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

declare global {
  interface Window {
    aptos: any;
  }
}

declare global {
  interface Window {
    martian: any;
  }
}

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
