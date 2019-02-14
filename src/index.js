import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import CalculatorApp from './App';
import calculatorReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

let store = createStore(calculatorReducer);

ReactDOM.render(
<Provider store={store}>
  <CalculatorApp />
</Provider>
, document.getElementById('root'));