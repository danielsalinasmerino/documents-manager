import { Link } from "react-router-dom";
import React from 'react';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import './PreviewButtonsMenuComponent.scss';

function PreviewButtonsMenuComponent() {

    return (
        <div className="buttonsMenu">
            <Link className="link-clean" to="/pas/gestor-documental/edition">
                <StyledButtonComponent buttonText={'Volver a Vista de Edición'} />
            </Link>
        </div>
    );
}

export default PreviewButtonsMenuComponent;
