import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Provider Redux
import { Provider } from 'react-redux';

// store
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);