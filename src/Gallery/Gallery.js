import React from 'react';
import './gallery.css'

class Gallery extends React.Component { 
 
   constructor(props) {
      super(props)
      if (!localStorage.getItem('gallery-react')) {
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
         ]
         localStorage.setItem('gallery-react', JSON.stringify(galleryDefault))
      }

      this.gallery = JSON.parse(localStorage.getItem('gallery-react'))
      this.gallery.map(item => item.edit = false)

      this.state = {
         gallery: this.gallery,
         urlGigImg: '',
         showImg: false,
         showModalAdd: false,
         newUrl: 'https://i.ytimg.com/vi/-6PdUhK1q3E/maxresdefault.jpg',
         newComment: 'Тут произвольный текст',
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleClickImg = this.handleClickImg.bind(this)
      this.toddleModalAdd = this.toddleModalAdd.bind(this)
      this.handleChangeNewComment = this.handleChangeNewComment.bind(this)
      this.handleChangeNewUrl = this.handleChangeNewUrl.bind(this)
      this.addNewItem = this.addNewItem.bind(this)
   }

   // gal() {
   //    let a = [
   //       { id: 'photo1570296458531', edit: false, comment: 'tree on a background of stars', url: 'https://2i.by/wp-content/uploads/2015/07/miniatyura1.jpg' },
   //       { id: 'photo1570296458533', edit: false, comment: 'stars in the sky', url: 'https://cdn-st1.rtr-vesti.ru/vh/pictures/hd/172/806/8.jpg' },
   //       { id: 'photo1570296458534', edit: false, comment: 'field with spikelets', url: 'https://i.ytimg.com/vi/-6PdUhK1q3E/maxresdefault.jpg' },
   //       { id: 'photo1570296458535', edit: false, comment: 'trees in the field', url: 'https://bigpicture.ru/wp-content/uploads/2011/06/1309.jpg' },
   //       { id: 'photo1570296458536', edit: false, comment: 'road in the field', url: 'https://cs8.pikabu.ru/post_img/big/2017/12/24/6/1514109360155876505.jpg' },
   //       { id: 'photo1570296458537', edit: false, comment: 'mountains on the background of stars', url: 'https://spacegid.com/wp-content/uploads/2015/04/IMG_0531-1024x683.jpg' },
   //       { id: 'photo1570296458538', edit: false, comment: 'stars in the sky', url: 'https://cdn-st1.rtr-vesti.ru/vh/pictures/hd/172/806/8.jpg' },
   //       { id: 'photo1570296458539', edit: false, comment: 'field with spikelets', url: 'https://i.ytimg.com/vi/-6PdUhK1q3E/maxresdefault.jpg' },
   //       { id: 'photo1570296458540', edit: false, comment: 'tree on a background of stars end', url: 'https://bigpicture.ru/wp-content/uploads/2011/06/1309.jpg' },
   //    ]
   // }


   handleChange(event) {
      this.setState(
         this.state.gallery.map(item => {
            if (item.edit) item.comment = event.target.value
            return item.comment
         })
      )
      localStorage.removeItem('gallery-react')
      localStorage.setItem('gallery-react', JSON.stringify(this.state.gallery))
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

   handleChangeNewComment(event) {
      this.setState({ newComment: event.target.value })
   }



   handleChangeNewUrl(event) {
      this.setState({ newUrl: event.target.value })
   }

   addNewItem() {
      let clone = [...this.state.gallery]
      let newItem = {
         id: `photo${+new Date()}`,
         edit: false,
         comment: this.state.newComment,
         url: this.state.newUrl
      }
      clone.push(newItem)
      this.setState({ gallery: clone })
      this.updateLocalStor()
   }



   toddleModalAdd() {
      let clone = !this.state.showModalAdd
      this.setState({ showModalAdd: clone })
   }


   handleClickImg(url) {
      let clone = !this.state.showImg

      this.setState({
         showImg: clone,
         urlGigImg: url
      })
   }


   updateLocalStor() {
      setTimeout(() => {
         localStorage.removeItem('gallery-react')
         localStorage.setItem('gallery-react', JSON.stringify(this.state.gallery))
      }, 100);
   }


   removeItemGallery(id) {

      let clone = [...this.state.gallery]
      clone = clone.filter(itemGallery => itemGallery.id !== id)
      this.setState({ gallery: clone })
      this.updateLocalStor()

   }

   renderItem(item) {
      return (
         <div id={item.id} key={item.id}
            className='gallery__card' >
            <img src={item.url}
               className='gallery__img'
               alt={item.id}
               onClick={() => {
                  this.handleClickImg(item.url)
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
   renderItemEdit(item) {
      return (
         <div id={item.id} key={item.id} className='gallery__card'>
            <img src={item.url} className='gallery__img'
               alt={item.id}
               onClick={() => {
                  this.handleClickImg(item.url)
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
            <div className='gallery__modal'
               onClick={e => {
                  if (e.target.className === 'gallery__modal') {
                     this.toddleModalAdd()
                  }
               }}
            >
               <div className='gallery__modal-content'>
                  <textarea placeholder='URL' type='text' className='gallery__input gallery__input_url'
                     defaultValue={this.state.newUrl}
                     onChange={this.handleChangeNewUrl}
                  />
                  <textarea placeholder='Commnet' type='text' className='gallery__input gallery__input_comment'
                     defaultValue={this.state.newComment}
                     onChange={this.handleChangeNewComment}

                  />
                  <div className='gallery__btn gallery__btn_add-post'
                     onClick={() => {
                        this.addNewItem()
                        this.toddleModalAdd()
                     }}
                  >Add post</div>
               </div>
            </div>
         )
      }
      else return null
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




   renderItemsGallery() {
      return this.state.gallery.map(item => {
         if (item.edit) return (this.renderItemEdit(item))
         else return (this.renderItem(item))
      })
   }


   renderBtnAdd() {
      return (
         <div className='gallery__btn gallery__btn_open-modal'
            onClick={this.toddleModalAdd}>AddPhoto
         </div>
      )
   }




   render() {
      return (
         <div className='gallery'>
            <div className='container'>
               <div className='gallery__block'>
                  {this.renderBtnAdd()}
                  {this.showModalAdd()}
                  <div className='gallery__box-cards'>
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