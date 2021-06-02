import { Link } from "react-router-dom";
import React from 'react';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import './PreviewButtonsMenuComponent.scss';

function PreviewButtonsMenuComponent() {

    return (
        <div className="buttonsMenuReversed">
            <Link className="link-clean" to="/pas/gestor-documental/edicion-contenidos">
                <StyledButtonComponent buttonText={'Activar Vista de Edición'} />
            </Link>
        </div>
    );
}

export default PreviewButtonsMenuComponent;
