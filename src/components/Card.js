import React from "react";

function Card (props) {
    return (
        <li className="element">
            <img className="element__image" src={props.link} alt="#" />
            <button className="element__button-trash" type="button"></button>
            <div className="element__name-place">
                <h2 className="element__name-title">{props.name}</h2>
                <div className="element__like">
                    <button id="likeButton" className="element__button-like" type="button"></button>
                    <p className="element__like-counter"></p>
                </div>


            </div>
        </li>
    );
};
export default Card