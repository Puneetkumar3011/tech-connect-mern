import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

Modal.setAppElement('#root')
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
