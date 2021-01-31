import React, {useEffect, useState} from "react";
import api from "../utils/Api";
import pencil from "../images/update-avatar.svg";
import Card from "./Card";

function Main(props) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);
    useEffect(() => {
        api.getAllData()
            .then((response => {
                const [userData, cardsData] = response;
                setCards(cardsData);
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
            }))
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__image" style={{backgroundImage: `url(${userAvatar})`}}
                         onClick={props.onEditAvatar}>
                    </div>
                    <img className="profile__image-hover" src={pencil} alt="Карандаш"/>
                    <div className="profile__info">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
                        <h2 className="profile__title">{userDescription}</h2>
                    </div>
                </div>
                <button className="profile__add" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((item) => <Card key={item._id} item={item} onCardClick={props.onCardClick}/>)}
                </ul>
            </section>
        </main>
    );
}

export default Main