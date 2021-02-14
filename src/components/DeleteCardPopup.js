import React from 'react'
import {useRef} from 'react'
import PopupWithForm from "./PopupWithForm";


export default function DeleteCardPopup (props) {
    const idRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        props.onDeleteCard({});

    }
    return (
        <PopupWithForm  isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}  ref ={idRef} button={'Да'} id='popupConfirm' title='Вы уверены?' name='confirm'>
        </PopupWithForm>
    );
}