import { Link } from "react-router-dom";
import React from 'react';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import './EditorsManagementButtonsMenuComponent.scss';

function EditorsManagementButtonsMenuComponent(){

    return (
        <div className="buttonsMenu editionView">
            <Link className="link-clean" to="/pas/gestor-documental/edicion-contenidos">
                <StyledButtonComponent buttonText={'Vista de Edición'}/>
            </Link>
        </div>
    );
}

export default EditorsManagementButtonsMenuComponent;