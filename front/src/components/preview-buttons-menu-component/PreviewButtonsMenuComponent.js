import { Link } from "react-router-dom";
import React from 'react';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import { getRoutingInfo } from '../../helpers/functions/functions';
import { variables } from '../../environment';

import './PreviewButtonsMenuComponent.scss';

function PreviewButtonsMenuComponent() {

    const routingInfo = getRoutingInfo();
    const portalName = routingInfo.portalName;

    return (
        <div className="buttonsMenuReversed">
            <a className="link-clean" href={variables.service + "/" + portalName + "/gestor-documental/edicion-contenidos"}>
                <StyledButtonComponent buttonText={'Activar Vista de Edición'} />
            </a>
        </div>
    );
}

export default PreviewButtonsMenuComponent;