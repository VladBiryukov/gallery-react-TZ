import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

const store = createStore(reducer)
store.subscribe(() => {
    let localStore = store.getState();
    localStorage.removeItem('gallery-redux');
    localStorage.setItem('gallery-redux', JSON.stringify(localStore.galleryItems));
})
 
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();




 
