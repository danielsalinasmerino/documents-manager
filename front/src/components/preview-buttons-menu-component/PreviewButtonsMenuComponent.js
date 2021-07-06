import React from 'react';
import urljoin from 'url-join';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import { getRoutingInfo } from '../../helpers/functions/functions';
import { variables } from '../../environment';

import './PreviewButtonsMenuComponent.scss';
const service = variables.service;

function PreviewButtonsMenuComponent() {

    const routingInfo = getRoutingInfo();
    const portalName = routingInfo.portalName;
    const routeEdition = urljoin(service, portalName, '/gestor-documental/edicion-contenidos')

    return (
        <div className="buttonsMenuReversed">
            <h1>Bienvenido/a</h1>
            <a className="link-clean" href={routeEdition}>
                <StyledButtonComponent buttonText={'Activar Vista de Edición'} />
            </a>
        </div>
    );
}

export default PreviewButtonsMenuComponent;