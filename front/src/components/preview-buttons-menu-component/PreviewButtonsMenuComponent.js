import { Link } from "react-router-dom";
import React from 'react';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import { getRoutingInfo } from '../../helpers/functions/functions';

import './PreviewButtonsMenuComponent.scss';

function PreviewButtonsMenuComponent() {

    const routingInfo = getRoutingInfo();
    const portalName = routingInfo.portalName;

    return (
        <div className="buttonsMenuReversed">
            <Link className="link-clean" to={"/" + portalName + "/gestor-documental/edicion-contenidos"}>
                <StyledButtonComponent buttonText={'Activar Vista de Edición'} />
            </Link>
        </div>
    );
}

export default PreviewButtonsMenuComponent;