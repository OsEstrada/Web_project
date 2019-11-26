import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import ConnectedApp from './components/router';
import store from './utils/userStorage/store';
import * as serviceWorker from './serviceWorker';
import { CometChat } from '@cometchat-pro/chat';
import config from './utils/config';

CometChat.init(config.appID)

render(
    <Provider store={store}>
        {console.log(store)}
        <ConnectedApp />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


