import React from 'react';
import ReactDOM from 'react-dom';
import MemoryGame from './components/MemoryGame.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MemoryGame />, document.getElementById('root'));
registerServiceWorker();
