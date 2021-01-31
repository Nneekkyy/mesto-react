import React from "react";

function Card(props) {
    function handleClick() {
        props.onCardClick(props.item);
    }

    return (
        <li className="element">
            <img className="element__image" src={props.item.link} alt="#" onClick={handleClick}/>
            <button className="element__button-trash" type="button"></button>
            <div className="element__name-place">
                <h2 className="element__name-title">{props.item.name}</h2>
                <div className="element__like">
                    <button id="likeButton" className="element__button-like" type="button"></button>
                    <p className="element__like-counter">{props.item.likes.length}</p>
                </div>


            </div>
        </li>
    );
}
export default Card