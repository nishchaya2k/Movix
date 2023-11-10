import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import {store } from "./store/store.js"
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

//becoz of strictmode, api calls happen 2 time,
// we get to know when we print it on console
//and in it it checks whether the response is 
//same when called after 1 time