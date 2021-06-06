import React from 'react';

import UnathorizedButtonsMenuComponent from '../unauthorized-buttons-menu-component/UnauthorizedButtonsMenuComponent';

import './UnauthorizedComponent.scss';

function UnauthorizedComponent() {

    return (
        <>
            <h1>Usted no está autorizado con permisos de edición. Si considera que debería estar autorizado, contacte con Secretaria.</h1>
            <UnathorizedButtonsMenuComponent />
        </>
    );
}

export default UnauthorizedComponent;