import React from 'react'
import {useState, useEffect} from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import ESC_KEYCODE from '../utils/keycode'
import api from "../utils/Api";
import {UserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'


function App() {
    const [currentUser, setCurrentUser] = useState({
        name: '',
        about: '',
        avatar: ''
    });
    const [cards, setCards] = useState([]);
    useEffect(() => {
        api.getAllData()
            .then((response => {
                const [userData, cardsData] = response;
                setCards(cardsData);
                setCurrentUser(userData);
            }))
            .catch((err) => {
                console.log(err);
            })
    }, [])
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
        console.log(currentUser)
    }

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    const [selectedCard, setSelectedCard] = useState(false);

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(false);
    }
    function onKeyPressed(e) {
        if (e.keyCode === ESC_KEYCODE) {
            closeAllPopups();
        }
    }
    function handleCardLike(item) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = item.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(item._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === item._id ? newCard : c);
            // Обновляем стейт
            setCards(newCards);
        });
    }
    function handleUpdateUser(formData) {
        api.saveEditedInfo(formData)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleCardDelete(item) {

        api.deleteCard(item._id).then(() => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.filter((c) => c._id !== item._id);
            // Обновляем стейт
            setCards(newCards);
        });
    }
    return (
        <UserContext.Provider value={currentUser}>
            <div className="body" onKeyDown={onKeyPressed} tabIndex="0" >
                <div className="page" >
                    <Header/>
                    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                          cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />

                    <Footer/>

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} updateEditProfile={handleUpdateUser}/>
                    <PopupWithForm id="popupAdd" title='Новое место' name='add-card' isOpen={isAddPlacePopupOpen}
                                   onClose={closeAllPopups}>
                        <input id="placeField" className="popup__field popup__field_add-card popup__field_place" type="text"
                               name="name"
                               placeholder="Название" minLength="2" maxLength="30" required/>
                        <span id='placeField-error'></span>
                        <input id="sourceField" className="popup__field popup__field_add-card popup__field_source"
                               type="url"
                               name="link"
                               placeholder="Ссылка на картинку" required/>
                        <span id='sourceField-error'></span>
                    </PopupWithForm>
                    <PopupWithForm id='popupAvatar' title='Обновить аватар' name='update-avatar'
                                   isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                        <input id="updateField" className="popup__field popup__field_update" type="url" name="link"
                               placeholder="Ссылка на картинку" required/>
                        <span id='updateField-error'></span>
                    </PopupWithForm>
                    <PopupWithForm id='popupConfirm' title='Вы уверены?' name='confirm'>
                    </PopupWithForm>
                    <ImagePopup id='popupImage' card={selectedCard} onClose={closeAllPopups}>
                    </ImagePopup>
                </div>
            </div>
        </UserContext.Provider>

    );
}

export default App;
