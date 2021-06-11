import React from 'react';

import DocumentComponent from '../document-component/DocumentComponent';

import './DocumentsComponent.scss';

function DocumentsComponent({ documents, format = "list" }) {

    return (
        <>
            { format !== "list" && <div className="sectionDocumentsList" style={marginBottomHelper}>
                {documents.map((element, index) =>
                    <DocumentComponent
                        key={element.idDocument}
                        documentUrl={element.documentUrl}
                        title={element.title}
                        format={format}
                        elementIndex={index}
                        elementsTotal={documents.length} />
                )
                }
            </div>}
            { format === "list" && <ul className="sectionDocumentsList">
                {
                    documents.map((element, index) =>
                        <DocumentComponent
                            key={element.idDocument}
                            documentUrl={element.documentUrl}
                            title={element.title}
                            format={format}
                            elementIndex={index}
                            elementsTotal={documents.length} />
                    )
                }
            </ul>}
        </>

    );
}

const marginBottomHelper = {
    marginBottom: 7
}

export default DocumentsComponent;
