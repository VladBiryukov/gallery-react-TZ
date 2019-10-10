import React from 'react';
import { connect } from 'react-redux'

function ItemGallry(props) {
   return (
      <div id={props.item.id}
         className='gallery__card' >
         <img src={props.item.url} onClick={props.onImg} className='gallery__img' alt={props.item.id} />
         <div className='gallery__box-comment' onClick={() => props.toggleInput()}>
            <div className='gallery__comment'>{props.item.comment}</div>
         </div>
         <div className='gallery__close'
            onClick={props.onClose}
         >&times;</div>
      </div>
   )
}

function EditItemGallry(props) {
   return (
      <div id={props.item.id}
         className='gallery__card' >
         <img src={props.item.url} onClick={props.onImg} className='gallery__img' alt={props.item.id} />
         <div className='gallery__box-comment'>

            <textarea
               className='gallery__input-change'
               defaultValue={props.item.comment}
               onKeyDown={event => { 
                  if (event.keyCode === 13) {
                     props.editComment(event.target.value);
                     props.toggleInput();
                  }
                  else if (event.keyCode === 27) {
                     props.toggleInput();
                  }
               }}
               onBlur={event => {
                  props.editComment(event.target.value);
                  props.toggleInput();
               }}
            />

         </div>
         <div className='gallery__close'
            onClick={props.onClose}
         >&times;</div>
      </div>
   )
}




function BidImg(props) {
   return (
      <div className='gallery__modal-big-img'
         onClick={e => { if (e.target.nodeName !== 'IMG') props.onImg() }}>
         <img alt='Show imag' className='gallery__img-big' src={props.url} />
      </div>
   )
}

class GalleryRedux extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         showImg: false,
         urlGigImg: ''

      }
      this.addItem = this.addItem.bind(this)
      this.removeItem = this.removeItem.bind(this);
      this.handleClickImg = this.handleClickImg.bind(this);
      this.toggleInput = this.toggleInput.bind(this);
      this.editComment = this.editComment.bind(this);
   }

   addItem() {
      this.props.onAddItem(this.inputUrl.value, this.inputComment.value);
   }
   removeItem(id) {
      this.props.onCloseRemove(id);
   }

   toggleInput(id, comment) {
      this.props.toggleInput(id, comment);
   }
   editComment(comment) {
      this.props.editComment(comment);
   }



   handleClickImg(url) {
      url = url || ''
      let clone = !this.state.showImg;
      this.setState({
         showImg: clone,
         urlGigImg: url
      })
   }

   renderBigImg() {
      if (this.state.showImg) {
         return (
            <BidImg
               onImg={this.handleClickImg.bind(this)}
               url={this.state.urlGigImg}
            />
         )
      }
   }

   renderItemsGallery(props) {
      return props.gallery.map(item => {
         if (!item.edit) {
            return (
               <ItemGallry
                  key={item.id}
                  item={item}
                  onClose={this.removeItem.bind(this, item.id)}
                  onImg={this.handleClickImg.bind(this, item.url)}
                  toggleInput={this.toggleInput.bind(this, item.id)}
               />
            )
         }
         else return (
            <EditItemGallry
               key={item.id}
               item={item}
               onClose={this.removeItem.bind(this, item.id)}
               onImg={this.handleClickImg.bind(this, item.url)}
               editComment={this.editComment.bind(this)}
               toggleInput={this.toggleInput.bind(this, item.id)}
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
                  {this.renderBigImg()}
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
      },

      editComment: (comment) => {
         dispatch({ type: 'EDIT_COMMENT', comment: comment })
      },
      toggleInput: (id) => {
         dispatch({ type: 'TOGGLE_INPUT', id: id })
      }
   })
)(GalleryRedux);