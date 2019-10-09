import React from 'react';
import './Gallery/gallery.css'
import Gallery from './Gallery/Gallery'
import './index.css'
// import { connect } from 'react-redux'
import GalleryRedux from './GalleryRedux/GalleryRedux.js'



export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.addItem = this.addItem.bind(this)
  //   this.removeInput = this.removeInput.bind(this) 
  // }

  // addItem() {
  //   this.props.onAddItem(this.inputUrl.value, this.inputComment.value)
  // }
  // removeInput(id) {
  //   this.props.onCloseRemove(id)
  // }


  render() {
    return (
      <div className='App'>
        <Gallery />
        {/* <GalleryRedux /> */}
      </div>
    )

  }
}