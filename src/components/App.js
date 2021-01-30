import React from 'react'
import {useEffect, useState} from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'




function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }


  return (

      <div className="body">
      <div className="page">
        <Header />
        <Main  onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}/>

        <Footer />
        <PopupWithForm id='popupEdit' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input id="nameField" className="popup__field popup__field_name" type="text" name="name"
               placeholder="Имя"
               value="" minLength="2" maxLength="40" required />
        <span id='nameField-error'></span>
        <input id="titleField" className="popup__field popup__field_title" type="text" name="about"
               placeholder="О себе"
               value="" minLength="2" maxLength="200" required />
        <span id='titleField-error'></span>
        </PopupWithForm>
        <PopupWithForm id="popupAdd" title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input id="placeField" className="popup__field popup__field_add-card popup__field_place" type="text"
                 name="name"
                 placeholder="Название" value="" minLength="2" maxLength="30" required />
          <span id='placeField-error'></span>
          <input id="sourceField" className="popup__field popup__field_add-card popup__field_source" type="url"
                 name="link"
                 placeholder="Ссылка на картинку" value="" required />
          <span id='sourceField-error'></span>
        </PopupWithForm>
        <PopupWithForm id='popupAvatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input id="updateField" className="popup__field popup__field_update" type="url" name="link"
                 placeholder="Ссылка на картинку" value="" required />
          <span id='updateField-error'></span>
        </PopupWithForm>
         <div id='popupConfirm' className="popup popup_confirm">
          <div className="popup__container">
            <button className="popup__close popup__close_edit-profile" type="button"></button>
            <div className="popup__area">
              <h2 className="popup__title">Вы уверены?</h2>
              <form className="popup__fields popup__fields-confirm" name="popups" noValidate>
                <button className="popup__button" type="submit" value="Да">Да</button>
              </form>
            </div>
          </div>
        </div>
        <div id='popupImage' className="popup popup_image">
          <div className="popup__container">
            <button className="popup__close popup__close_image" type="button"></button>
            <img className="popup__image-full" src="#" alt="#" />
              <p className="popup__image-sign"></p>
          </div>
        </div>

      </div>
      </div>
  );
}

export default App;
