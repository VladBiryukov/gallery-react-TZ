import React from 'react';
import /* Gallery from */ './Gallery/Gallery';
import './index.css';
import GalleryRedux from './GalleryRedux/GalleryRedux';



export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <GalleryRedux />
      </div>
    )
  }
}