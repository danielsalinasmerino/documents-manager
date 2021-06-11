import React from 'react';
import Select from 'react-select';


function SectionPositionInput({ editSectionMode, sectionToEdit, sectiongsLength, positionsArray, setPostitionCallback }) {

    

    return (
        <div className="inputWrapper" style={inputWrapperInline}>
            <p className="inputTitle" style={inputTitleFixed}>Posición</p>
            <div className="ownSelector" style={ownSelectorFixed}>
                <Select 
                    defaultValue={editSectionMode ?                             
                        {value: sectionToEdit.position, label: (sectionToEdit.position).toString()} :                             
                        {value: (sectiongsLength + 1), label: (sectiongsLength + 1).toString()}}
                    placeholder="Escoja la posición de la sección (obligatorio)"
                    options={positionsArray} 
                    onChange={(e) => setPostitionCallback(e.value)}/>
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
    width: 80
}

export default SectionPositionInput;