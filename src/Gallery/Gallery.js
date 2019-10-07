import React from 'react';
import './gallery.css'
// function name() {

//    function Card(props) {
//       return <div id={props.item.id} className='gallery__card'></div>
//    }
//    function BoxComment(props) {
//       return <div className='gallery__box-comment' />
//    }
//    function TextArea(props) {
//       return <textarea className='gallery__input-change' />
//    }
//    function Comment(props) {
//       return <div className='gallery__comment'>{props.item.comment}</div>
//    }
//    function Img(props) {
//       return <img src={props.item.url} className='gallery__img' alt={props.item.id} />
//    }
//    function Close(params) {
//       return <div className='gallery__close'>×</div>
//    }

//    function ItemGallery(props) {

//       return (

//          <div id={props.item.id} className='gallery__card'>
//             <img src={props.item.url} className='gallery__img' alt={props.item.id} />
//             <div className='gallery__box-comment'>
//                <textarea className='gallery__input-change'></textarea>
//                <div className='gallery__comment'>{props.item.comment}</div>
//             </div>
//             <div className='gallery__close'>×</div>
//          </div>
//       )

//    }
// }



class Gallery extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         gallery: [
            { id: 'photo1570296458531', edit: false, comment: 'tree on a background of stars', url: 'https://2i.by/wp-content/uploads/2015/07/miniatyura1.jpg' },
            { id: 'photo1570296458533', edit: false, comment: 'stars in the sky', url: 'https://cdn-st1.rtr-vesti.ru/vh/pictures/hd/172/806/8.jpg' },
            { id: 'photo1570296458534', edit: false, comment: 'field with spikelets', url: 'https://i.ytimg.com/vi/-6PdUhK1q3E/maxresdefault.jpg' },
            { id: 'photo1570296458535', edit: false, comment: 'trees in the field', url: 'https://bigpicture.ru/wp-content/uploads/2011/06/1309.jpg' },
            { id: 'photo1570296458536', edit: false, comment: 'road in the field', url: 'https://cs8.pikabu.ru/post_img/big/2017/12/24/6/1514109360155876505.jpg' },
            { id: 'photo1570296458537', edit: false, comment: 'mountains on the background of stars', url: 'https://spacegid.com/wp-content/uploads/2015/04/IMG_0531-1024x683.jpg' },
            { id: 'photo1570296458538', edit: false, comment: 'stars in the sky', url: 'https://cdn-st1.rtr-vesti.ru/vh/pictures/hd/172/806/8.jpg' },
            { id: 'photo1570296458539', edit: false, comment: 'field with spikelets', url: 'https://i.ytimg.com/vi/-6PdUhK1q3E/maxresdefault.jpg' },
            { id: 'photo1570296458540', edit: false, comment: 'tree on a background of stars end', url: 'https://bigpicture.ru/wp-content/uploads/2011/06/1309.jpg' },
         ],
         urlGigImg: 'https://2i.by/wp-content/uploads/2015/07/miniatyura1.jpg',
         showImg: false,
         showModalAdd: false
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleClickImg = this.handleClickImg.bind(this)
      this.toddleModalAdd = this.toddleModalAdd.bind(this)
   }




   toddleModalAdd() {
      this.setState(() => this.state.showModalAdd = !this.state.showModalAdd)
   }

   handleChange(event) {
      this.setState(
         this.state.gallery.map(item => {
            if (item.edit) {
               item.comment = event.target.value
            }
            return item.comment
         })
      )
   }

   handleClickImg() {
      this.setState(() => this.state.showImg = !this.state.showImg)
   }



   toggleInput(item) {
      this.setState(
         this.state.gallery.map(photo => {
            if (photo.id === item.id) {
               photo.edit = !photo.edit
               return photo
            }
            else {
               photo.edit = false
               return photo
            }
         })
      )
   }

   removeItemGallery(id) {
      this.setState(
         this.state.gallery = this.state.gallery.filter(itemGallery => {
            return itemGallery.id !== id
         })
      )
   }

   renderItemEdit(item) {
      return (
         <div id={item.id} key={item.id} className='gallery__card'>
            <img src={item.url} className='gallery__img'
               alt={item.id}
               onClick={() => {
                  this.handleClickImg()
                  this.state.urlGigImg = item.url
               }} />

            <div className='gallery__box-comment' >
               <textarea
                  className='gallery__input-change'
                  defaultValue={item.comment}
                  onChange={this.handleChange}
                  onBlur={() => { this.toggleInput(item) }}
                  onKeyDown={e => {
                     if (e.keyCode === 13) {
                        this.toggleInput(item)
                     }
                  }}
               />
            </div>
            <div className='gallery__close'
               onClick={() => this.removeItemGallery(item.id)}
            >&times;</div>
         </div >
      )
   }


   showModalAdd() {
      if (this.state.showModalAdd) {
         return (
            <div className='gallery__modal'>
               <div className='gallery__modal-content'>
                  <textarea placeholder='URL' type='text' className='gallery__input gallery__input_url'></textarea>
                  <textarea placeholder='Commnet' type='text' className='gallery__input gallery__input_comment'></textarea>
                  <div className='gallery__btn gallery__btn_add-post'>Add post</div>
               </div>
            </div>
         )
      }
   }

   showBigImg() {
      if (this.state.showImg) {
         return (
            <div className='gallery__modal-big-img'
               onClick={e => { if (e.target.nodeName !== 'IMG') this.handleClickImg() }}
            >
               <img src={this.state.urlGigImg} alt='Show imag' className='gallery__img-big gallery__img-big_js' />
            </div >
         )
      }
   }

   renderItem(item) {
      return (
         <div id={item.id} key={item.id} className='gallery__card'>
            <img src={item.url}
               className='gallery__img'
               alt={item.id}
               onClick={() => {
                  this.handleClickImg()
                  this.state.urlGigImg = item.url
               }}
            />
            <div className='gallery__box-comment'
               onClick={() => { this.toggleInput(item) }}>
               <div className='gallery__comment'>{item.comment}</div>
            </div>
            <div className='gallery__close'
               onClick={() => this.removeItemGallery(item.id)}
            >&times;</div>
         </div>
      )
   }


   renderItemsGallery() {
      return this.state.gallery.map(item => {
         if (item.edit) {
            return (
               this.renderItemEdit(item)
            )
         }
         else {
            return (
               this.renderItem(item)
            )
         }
      })
   }


   renderBtnAdd() {
      return (
         <div className='gallery__btn gallery__btn_open-modal'
            onClick={() => {

               this.toddleModalAdd()
               console.log(this.state.showModalAdd);

            }}
         >AddPhoto
         </div>
      )
   }

   galleryDefault() {
      if (!localStorage.getItem('gallery')) {
         let galleryDefault = [
            { id: 'photo1570296458531', recomment: false, comment: 'tree on a background of stars', url: 'https://2i.by/wp-content/uploads/2015/07/miniatyura1.jpg' },
            { id: 'photo1570296458533', recomment: false, comment: 'stars in the sky', url: 'https://cdn-st1.rtr-vesti.ru/vh/pictures/hd/172/806/8.jpg' },
            { id: 'photo1570296458534', recomment: false, comment: 'field with spikelets', url: 'https://i.ytimg.com/vi/-6PdUhK1q3E/maxresdefault.jpg' },
            { id: 'photo1570296458535', recomment: false, comment: 'trees in the field', url: 'https://bigpicture.ru/wp-content/uploads/2011/06/1309.jpg' },
            { id: 'photo1570296458536', recomment: false, comment: 'road in the field', url: 'https://cs8.pikabu.ru/post_img/big/2017/12/24/6/1514109360155876505.jpg' },
            { id: 'photo1570296458537', recomment: false, comment: 'mountains on the background of stars', url: 'https://spacegid.com/wp-content/uploads/2015/04/IMG_0531-1024x683.jpg' },
            { id: 'photo1570296458538', recomment: false, comment: 'stars in the sky', url: 'https://cdn-st1.rtr-vesti.ru/vh/pictures/hd/172/806/8.jpg' },
            { id: 'photo1570296458539', recomment: false, comment: 'field with spikelets', url: 'https://i.ytimg.com/vi/-6PdUhK1q3E/maxresdefault.jpg' },
         ];
         localStorage.setItem('gallery', JSON.stringify(galleryDefault));
      }
   }


   render() {
      return (
         <div className='gallery'>
            <div className='container'>
               <div className='gallery__block'>
                  {this.renderBtnAdd()}
                  <div className='gallery__box-cards'>
                     {this.showModalAdd()}
                     {this.showBigImg()}
                     {this.renderItemsGallery()}
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
export default Gallery