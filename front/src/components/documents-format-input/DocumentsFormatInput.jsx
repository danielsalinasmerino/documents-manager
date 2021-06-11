import React from 'react';
import Select from 'react-select';


function DocumentsFormatInput({ editSectionMode, sectionToEdit, documentsFormatArray, setDocumentsFormatCallback }) {



    return (
        <div className="inputWrapper" style={inputWrapperInline}>
            <p className="inputTitle" style={inputTitleFixed}>El formato de presentación de los documentos será</p>
            <div className="ownSelector" style={ownSelectorFixed}>
                <Select
                    defaultValue={editSectionMode ?
                        {
                            value: sectionToEdit.documentsFormat,
                            label: (sectionToEdit.documentsFormat === 'list' ? "en lista." : "en línea.")
                        } :
                        {
                            value: "list",
                            label: "en lista."
                        }}
                    placeholder="Escoja la posición de la sección (obligatorio)"
                    options={documentsFormatArray}
                    onChange={(e) => setDocumentsFormatCallback(e.value)} />
            </div>
        </div>
    );
}

// We declare special styles for this type of input to avoid code repetition
const inputWrapperInline = {
    flexDirection: "row"
}

const inputTitleFixed = {
    marginRight: 20,
}

const ownSelectorFixed = {
    width: 150
}

export default DocumentsFormatInput;