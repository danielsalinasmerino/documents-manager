import { Link } from "react-router-dom";
import React from 'react';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import { getRoutingInfo } from '../../helpers/functions/functions';

import './EditorsManagementButtonsMenuComponent.scss';

function EditorsManagementButtonsMenuComponent({ openModalCallback }){

    const routingInfo = getRoutingInfo();
    const portalName = routingInfo.portalName;

    return (
        <div className="buttonsMenu editionView">
            <StyledButtonComponent clickButton={openModalCallback} buttonText={'Añadir Editor'}/>
            <Link className="link-clean" to={"/" + portalName + "/gestor-documental/edicion-contenidos"}>
                <StyledButtonComponent buttonText={'Volver a Vista de Edición'}/>
            </Link>
        </div>
    );
}

export default EditorsManagementButtonsMenuComponent;