import React from 'react';

import './DocumentComponent.scss';

function DocumentComponent({ documentUrl, title }) {

    return (
        <li>
            <a href={documentUrl} target="_blank" rel="noreferrer">{title}</a>
        </li> 
    );
}

export default DocumentComponent;
