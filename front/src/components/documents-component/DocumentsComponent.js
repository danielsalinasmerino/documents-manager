import React from 'react';

import DocumentComponent from '../document-component/DocumentComponent';

import './DocumentsComponent.scss';

function DocumentsComponent({ documents }) {

    return (
        <ul className="sectionDocumentsList">
            { 
                documents.map(element => 
                    <DocumentComponent 
                        key={element.idDocument}
                        documentUrl={element.documentUrl}
                        title={element.title}/>
                )
            }
        </ul>
    );
}

export default DocumentsComponent;
