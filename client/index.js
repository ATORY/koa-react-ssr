import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import App from "./components/App";
import { ConnectedRouter } from 'connected-react-router'

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__
const store = configureStore(history, preloadedState);
hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}> 
      <Router>
      
        <App />
        {/* <Route path="/" component={App} /> */}
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'development') {


const socket = new WebSocket('ws://localhost:9876');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    if (event.data === 'reload') {
        location.reload(true);
    }
});
};
