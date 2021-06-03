import { Link } from "react-router-dom";
import React from 'react';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import { getRoutingInfo } from '../../helpers/functions/functions';

import './EditionButtonsMenuComponent.scss';

function EditionButtonsMenuComponent({ openModalCallback }) {

    const routingInfo = getRoutingInfo();
    const portalName = routingInfo.portalName;

    return (
        <div className="buttonsMenu editionView">
            <StyledButtonComponent clickButton={openModalCallback} buttonText={'Añadir Sección'}/>
            <Link className="link-clean" to={"/" + portalName + "/gestor-documental/gestion-editores"}>
                <StyledButtonComponent buttonText={'Gestión de Editores'}/>
            </Link>
            <Link className="link-clean" to={"/" + portalName + "/gestor-documental/vista-previa"}>
                <StyledButtonComponent buttonText={'Vista Previa'}/>
            </Link>
        </div>
    );
}

export default EditionButtonsMenuComponent;
