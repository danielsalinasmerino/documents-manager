import React, { useState, useEffect } from 'react';

import SectionModalBottomButtons from '../section-modal-bottom-buttons/SectionModalBottomButtons';
import SectionModalHeader from '../section-modal-header/SectionModalHeader';
import SectionTextInput from '../section-text-input/SectionTextInput';

import { makeId } from '../../helpers/functions/functions'; 
import { User } from '../../models/user';

// We import the SCSS from the section modal component; it is not mandatory to duplicate the same code on different files
import '../section-modal-component/SectionModalComponent.scss';

function UserModalComponent({ closeModal, saveUserCallBack, editUserMode, userToEdit, editUserCallBack }) {

    const [emailUser, setEmailUser] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);

    useEffect(() => {
        if(editUserMode){
            setEmailUser(userToEdit.email);
        }
    }, [ editUserMode,userToEdit ]);

    const saveUser = () => {
        // First we check the posible errors
        const emailUserError = checkEmailUserErrors();

        if(emailUserError){
            // If we find errors we let the user know them
            (emailUserError && setErrorEmail(true));
        }
        else {
            // If we do not find errors we save the user
            const newUser = new User(
                makeId(),
                (emailUser.trim()).toLowerCase(),
                'editor',
            );
            saveUserCallBack(newUser);
        }
    }

    const editUser = () => {            
        // First we check the posible errors        
        const emailUserError = checkEmailUserErrors();
                
        if(emailUserError){
            // If we find errors we let the user know them
            (emailUserError && setErrorEmail(true));
        }       
        else {            
            // If we do not find errors we save the user            
            var userEditted = userToEdit;            
            userEditted.email= (emailUser.trim()).toLowerCase();
            editUserCallBack(userEditted);        
        }    
    }

    const checkEmailUserErrors = () => {
        const emailUserTrim = emailUser.trim();
        return ((emailUserTrim.length === 0) || (validateEmail(emailUserTrim)));
    }

    const validateEmail = (email) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            return false;
        }
        else {
            return true;
        }
    }

    const onChangeEmailUser = (e) => {
        setEmailUser(e.target.value);
        setErrorEmail(false);
    }

    return (
        <div className="sectionModalWrapper">
            <SectionModalHeader title={editUserMode ? 'Editar usuario' : 'Nuevo usuario'} closeCallback={closeModal}/>

            <SectionTextInput titleText={"Correo"} errorMark={errorEmail} styleValue={"ownInput"} placeHolderText={"Escriba el correo del usuario (obligatorio)"} 
                identifier={"emailUser"} valueToShow={emailUser} onChangeCallback={onChangeEmailUser}/>

            <SectionModalBottomButtons cancelText={'Cancelar'} cancelCallback={closeModal} confirmText={'Guardar'} confirmCallback={editUserMode? editUser : saveUser}/>
        </div>
    );
}

export default UserModalComponent;