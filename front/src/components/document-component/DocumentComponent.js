import React from 'react';

import './DocumentComponent.scss';

function DocumentComponent({ documentUrl, title, format = "list", elementsTotal, elementIndex }) {

    return (
        <>
            { format !== "list" &&
                <>
                    {(elementIndex !== (elementsTotal - 1)) && <><a href={documentUrl} target="_blank" rel="noreferrer">{title}</a>, </>}
                    {(elementIndex === (elementsTotal - 1)) && <><a href={documentUrl} target="_blank" rel="noreferrer">{title}</a></>}
                </>
            }
            { format === "list" && <li>
                <a href={documentUrl} target="_blank" rel="noreferrer">{title}</a>
            </li>}
        </>

    );
}

export default DocumentComponent;
