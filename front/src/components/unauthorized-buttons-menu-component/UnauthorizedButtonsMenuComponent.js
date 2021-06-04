import { Link } from "react-router-dom";
import React from 'react';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import { getRoutingInfo } from '../../helpers/functions/functions';

import './UnauthorizedButtonsMenuComponent.scss';

function UnauthorizedButtonsMenuComponent({ }) {

    const routingInfo = getRoutingInfo();
    const portalName = routingInfo.portalName;

    return (
        <div className="buttonsMenu editionView">
            <Link className="link-clean" to={"/" + portalName + "/gestor-documental/vista-previa"}>
                <StyledButtonComponent buttonText={'Vista Previa'}/>
            </Link>
        </div>
    );
}

export default UnauthorizedButtonsMenuComponent;
