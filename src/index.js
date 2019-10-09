import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';



if (!localStorage.getItem('gallery-redux')) {
    let galleryDefault = [
        { id: 'photo1570296458531', edit: false, comment: 'tree on a background of stars', url: 'https://2i.by/wp-content/uploads/2015/07/miniatyura1.jpg' },
        { id: 'photo1570296458533', edit: false, comment: 'stars in the sky', url: 'https://cdn-st1.rtr-vesti.ru/vh/pictures/hd/172/806/8.jpg' },
        { id: 'photo1570296458534', edit: false, comment: 'field with spikelets', url: 'https://i.ytimg.com/vi/-6PdUhK1q3E/maxresdefault.jpg' },
        { id: 'photo1570296458535', edit: false, comment: 'trees in the field', url: 'https://bigpicture.ru/wp-content/uploads/2011/06/1309.jpg' },
        { id: 'photo1570296458536', edit: false, comment: 'road in the field', url: 'https://cs8.pikabu.ru/post_img/big/2017/12/24/6/1514109360155876505.jpg' },
        { id: 'photo1570296458537', edit: false, comment: 'mountains on the background of stars', url: 'https://spacegid.com/wp-content/uploads/2015/04/IMG_0531-1024x683.jpg' },
        { id: 'photo1570296458538', edit: false, comment: 'stars in the sky', url: 'https://cdn-st1.rtr-vesti.ru/vh/pictures/hd/172/806/8.jpg' },
        { id: 'photo1570296458539', edit: false, comment: 'field with spikelets', url: 'https://i.ytimg.com/vi/-6PdUhK1q3E/maxresdefault.jpg' },
        { id: 'photo1570296458540', edit: false, comment: 'tree on a background of stars end', url: 'https://bigpicture.ru/wp-content/uploads/2011/06/1309.jpg' },
    ];
    localStorage.setItem('gallery-redux', JSON.stringify(galleryDefault));
}

const initState = JSON.parse(localStorage.getItem('gallery-redux'));
initState.map(item => item.edit = false);




function initGallery(state = initState, action) {
    switch (action.type) {
        case 'ADD_ITEM_GALLERY': return [...state, action.itemGallery]
        case 'REMOVE_ITEM_GALLERY': return [...state].filter(item => item.id !== action.id)

        default: return state
    }
}
const store = createStore(initGallery)

store.subscribe(() => {
    console.log(store.getState());
    let localStore = store.getState()
    localStorage.removeItem('gallery-redux');
    localStorage.setItem('gallery-redux', JSON.stringify(localStore));
})



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
