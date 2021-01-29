import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './app/store'
import { setIsFlagMode } from './features/board/boardSlice';

import './index.css';

const targetKey = 'Shift'

const pressHandler = ( key, isKeyPressed) => {
  if (key === targetKey) {
    store.dispatch(setIsFlagMode(isKeyPressed));
  }
};

window.addEventListener('keydown', (event) => pressHandler(event.key, true));
window.addEventListener('keyup', (event) => pressHandler(event.key, false));

const render = () => {
  const App = require('./app/App').default

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render)
}