import React, {useContext}from "react";
import {UserContext} from "../contexts/CurrentUserContext";

function Card({item}) {
    const currentUser = useContext(UserContext);
    // function handleClick() {
    //     props.onCardClick(props.item);
    // }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = item.owner._id === currentUser._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__button-trash ${isOwn ? 'element__button-trash_visible' : ''}`
    );

    return (
        <li className="element">
            <img className="element__image" src={item.link} alt="#" />
            <button className={cardDeleteButtonClassName} type="button" />
            <div className="element__name-place">
                <h2 className="element__name-title">{item.name}</h2>
                <div className="element__like">
                    <button id="likeButton" className="element__button-like" type="button" />
                    <p className="element__like-counter">{item.likes.length}</p>
                </div>


            </div>
        </li>
    );
}
export default Card