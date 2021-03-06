import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { createMemoryHistory } from 'history';

import App from './components/App';
import configureStore from './redux/configureStore';

const history = createMemoryHistory();
const sheet = new ServerStyleSheet();


module.exports = function render({ url }, initialState) {
  // Model the initial state
  // console.log('ssr')
  history.push(url);
  const store = configureStore(history, initialState);
  const content = renderToString(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router location={url}>
          <StyleSheetManager sheet={sheet.instance}>
            <App />
          </StyleSheetManager>

          {/* <Route path="/" component={App} /> */}
        </Router>
      </ConnectedRouter>
    </Provider>,
  );
  const preloadedState = store.getState();
  const styleTags = sheet.getStyleTags();
  // console.log(styleTags);
  return {
    styleTags,
    content,
    preloadedState,
  };
};
