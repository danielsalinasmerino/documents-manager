import { Link } from "react-router-dom";
import React from 'react';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import './EditionButtonsMenuComponent.scss';

function EditionButtonsMenuComponent({ openModalCallback }) {

    return (
        <div className="buttonsMenu editionView">
            <StyledButtonComponent clickButton={openModalCallback} buttonText={'Añadir Sección'}/>
            <Link className="link-clean" to="/pas/gestor-documental/vista-previa">
                <StyledButtonComponent buttonText={'Vista Previa'}/>
            </Link>
            <StyledButtonComponent buttonText={'Publicar Cambios'}/>
            <StyledButtonComponent buttonText={'Gestión de Editores'}/>
        </div>
    );
}

export default EditionButtonsMenuComponent;
