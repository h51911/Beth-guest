import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
        <HashRouter>
            <App />
        </HashRouter>
    , document.getElementById('root'));

serviceWorker.unregister();