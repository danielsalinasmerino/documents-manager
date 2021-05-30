import React from 'react';

import logoEtsit from '../../assets/images/header/logo-etsit.png'; 
import logoUPM from '../../assets/images/header/LOGO-UPM-WT.png'; 
import optionsIcon from '../../assets/images/header/options.png';
import { upmLink, etsitLink } from '../../helpers/constants/links';

import './HeaderComponent.scss';

function HeaderComponent({ portalName }) {

    return (
        <div className="headerMainWrapper">
            <div className="logosWrapper">
                <a href={upmLink}><img className="logo" src={logoUPM} alt="UPM Logo"/></a>
                <a href={etsitLink}><img className="logo" src={logoEtsit} alt="ETSIT Logo"/></a>
            </div> 
            <div className="infoWrapper">
                <p className="title">Documentación del {portalName} (Impresos)</p>
                <p className="sub"><a href={etsitLink}>Escuela Técnica Superior de Ingenieros de Telecomunicaciones</a> de la <a href={upmLink}>Universidad Politécnica de Madrid</a></p>
            </div>
            <div className="optionsWrapper">
                <img className="optionsIcon" src={optionsIcon} alt="Options"/>
            </div> 
        </div>
    );
}

export default HeaderComponent;
