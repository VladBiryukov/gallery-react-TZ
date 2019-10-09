import React from 'react';
// import './Gallery/gallery.css'
import { connect } from 'react-redux'

function ItemGallry(props) {
   return (
      <div id={props.item.id}
         className='gallery__card' >
         <img src={props.item.url} className='gallery__img' alt={props.item.id} />
         <div className='gallery__box-comment'>
            <div className='gallery__comment'>{props.item.comment}</div>
         </div>
         <div className='gallery__close'
            onClick={props.onClose}
         >&times;</div>
      </div>
   )
}


class GalleryRedux extends React.Component {

   constructor(props) {
      super(props);
      this.addItem = this.addItem.bind(this)
      this.removeItem = this.removeItem.bind(this)
   }

   addItem() {
      this.props.onAddItem(this.inputUrl.value, this.inputComment.value)
   }
   removeItem(id) {
      this.props.onCloseRemove(id)
   }

   renderItemsGallery(props) {
      return props.gallery.map(item => {
         return (
            <ItemGallry
               key={item.id}
               item={item}
               onClose={this.removeItem.bind(this, item.id)}
            />
         )
      })
   }

   render() {
      return (
         <div className='gallery'>
            <div className='container'>
               <div className='gallery__block'>
                  <input style={{ marginLeft: '5px' }} placeholder='URL' defaultValue='https://2i.by/wp-content/uploads/2015/07/miniatyura1.jpg' ref={input => this.inputUrl = input} />
                  <input style={{ marginLeft: '5px' }} placeholder='Comment' ref={input => this.inputComment = input} />
                  <button onClick={this.addItem}>add item</button>

                  <div className='gallery__box-cards'>
                     {this.renderItemsGallery(this.props)}
                  </div>
               </div>
            </div>
         </div>
      )
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
)(GalleryRedux);