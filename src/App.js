import React from 'react';
import './Gallery/Gallery'
import Gallery from './Gallery/Gallery'
import './index.css'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this)
    this.removeInput = this.removeInput.bind(this)
    this.showImg = this.showImg.bind(this)
  }

  addItem() {
    this.props.onAddItem(this.inputUrl.value, this.inputComment.value)
  }
  removeInput(id) {
    this.props.onCloseRemove(id)
  }

  showImg(id){

  }
 
  render() {
    return(
      <div className ='App'>
        <Gallery/>
      </div>
    )
    return (
      <div className="App">
        <input placeholder='URL' defaultValue='https://2i.by/wp-content/uploads/2015/07/miniatyura1.jpg' ref={input => this.inputUrl = input} />
        <input placeholder='Comment' ref={input => this.inputComment = input} />
        <button onClick={this.addItem}>add item</button>

        <div className='gallery__box-cards'>
          {this.props.gallery.map(item => {
            return (
              <div id={item.id} key={item.id}
                className='gallery__card' >
                <img src={item.url} className='gallery__img' alt={item.id} />
                <div className='gallery__box-comment'>
                  <div className='gallery__comment'>{item.comment}</div>
                </div>
                <div className='gallery__close'
                  onClick={() => this.removeInput(item.id)}
                >&times;</div>
              </div>
            )
          })}
        </div> 
      </div> 
    );
  }
}

export default connect(
  state => ({
    gallery: state
  }),
  dispatch => ({
    onAddItem: (url, comment) => {
      let itemGallery = {
        id: `photo${+new Date()}`,
        edit: false,
        comment: comment,
        url: url
      }
      dispatch({ type: 'ADD_ITEM_GALLERY', itemGallery })
    },

    onCloseRemove: (id) => {
      dispatch({ type: 'REMOVE_ITEM_GALLERY', id })
    }

  })
)(App);
