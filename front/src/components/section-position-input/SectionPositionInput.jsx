import React from 'react';
import Select from 'react-select';


function SectionPositionInput({ editSectionMode, sectionToEdit, sectiongsLength, positionsArray, setPostitionCallback }) {

    

    return (
        <div className="inputWrapper">
            <p className="inputTitle">Posición</p>
            <div className="ownSelector">
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

export default SectionPositionInput;