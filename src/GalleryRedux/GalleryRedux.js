import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
function ItemGallry({ item, onClose, onImg, toggleInput }) {
   return (
      <div id={item.id}
         className='gallery__card' >
         <img src={item.url} onClick={onImg} className='gallery__img' alt={item.id} />
         <div className='gallery__box-comment' onClick={() => toggleInput()}>
            <div className='gallery__comment'>{item.comment}</div>
         </div>
         <div className='gallery__close'
            onClick={onClose}
         >&times;</div>
      </div>
   )
}
ItemGallry.propTypes = {
   item: PropTypes.object,
   onClose: PropTypes.func,
   onImg: PropTypes.func,
   toggleInput: PropTypes.func
}


function EditItemGallry({ item, onClose, onImg, editComment, toggleInput }) {
   return (
      <div id={item.id}
         className='gallery__card' >
         <img src={item.url} onClick={onImg} className='gallery__img' alt={item.id} />
         <div className='gallery__box-comment'>

            <textarea
               className='gallery__input-change'
               defaultValue={item.comment}
               onKeyDown={event => {
                  if (event.keyCode === 13) {
                     editComment(event.target.value);
                     toggleInput();
                  }
                  else if (event.keyCode === 27) {
                     toggleInput();
                  }
               }}
               onBlur={event => {
                  editComment(event.target.value);
                  toggleInput();
               }}
            />

         </div>
         <div className='gallery__close'
            onClick={onClose}
         >&times;</div>
      </div>
   )
}

EditItemGallry.propTypes = {
   item: PropTypes.object.isRequired,
   onClose: PropTypes.func,
   onImg: PropTypes.func,
   editComment: PropTypes.func,
   toggleInput: PropTypes.func
}


function BidImg({ onImg, url }) { 
   return (
      <div className='gallery__modal-big-img'
         onClick={e => { if (e.target.nodeName !== 'IMG') onImg() }}>
         <img alt='Show imag' className='gallery__img-big' src={url} />
      </div>
   )
}

BidImg.propTypes = {
   onImg: PropTypes.func,
   url: PropTypes.string
}

class GalleryRedux extends React.Component {

   state = {
      showImg: false,
      urlBigImg: ''
   }


   addItem = () => {
      this.props.onAddItem(this.inputUrl.value, this.inputComment.value);
   }
   removeItem = id => {
      this.props.onCloseRemove(id);
   }

   toggleInput = (id, comment) => {
      this.props.toggleInput(id, comment);
   }
   editComment = (comment) => {
      this.props.editComment(comment);
   }



   handleClickImg = (url) => {
      url = url || ''
      let clone = !this.state.showImg;
      this.setState({
         showImg: clone,
         urlBigImg: url
      });
   }

   renderBigImg = () => {
      if (this.state.showImg) {
         return (
            <BidImg
               onImg={this.handleClickImg}
               url={this.state.urlBigImg}
            />
         )
      }
   }

   renderItemsGallery = props => {
      return props.gallery.galleryItems.map(item => {
         if (!item.edit) {
            console.log('renderItems')
            console.log(typeof item == 'object');

            return (
               <ItemGallry
                  key={item.id}
                  item={item}
                  onClose={() => this.removeItem(item.id)}
                  onImg={() => this.handleClickImg(item.url)}
                  toggleInput={() => this.toggleInput(item.id)}
               />
            )
         }
         else return (
            <EditItemGallry
               key={item.id}
               item={item}
               onClose={() => this.removeItem(item.id)}
               onImg={() => this.handleClickImg(item.url)}
               editComment={this.editComment}
               toggleInput={() => this.toggleInput(item.id)}
            />
         )
      })
   }

   render() {
      const styles = {
         controlBox: {
            padding: '5px',
         },
         input: {
            marginRight: '10px',
            width: '210px',
            borderRadius: '3px',
            padding: '10px 20px',
            border: ' 1px solid black'
         },
         button: {
            background: 'rgba(0, 1, 5, 0.86)',
            color: 'white',
            border: '1px solid gray',
            borderRadius: '3px',
            padding: '10px 20px',
            textTransform: 'uppercase'
         }
      }
      return (
         <div className='gallery'>
            <div className='container'>
               <div className='gallery__block'>
                  {this.renderBigImg()}
                  {console.log('render()')}
                  <div className='control-box' style={styles.controlBox}>
                     <input style={styles.input} placeholder='URL' defaultValue='https://2i.by/wp-content/uploads/2015/07/miniatyura1.jpg' ref={input => this.inputUrl = input} />
                     <input style={styles.input} placeholder='Comment' defaultValue='Произвольный текст' ref={input => this.inputComment = input} />
                     <button style={styles.button} onClick={this.addItem}>add photo</button>
                  </div>

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