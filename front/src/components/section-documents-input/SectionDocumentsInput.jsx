import React from 'react';

import addImageRoute from '../../assets/images/section-options/add.png';
import deleteImageRoute from '../../assets/images/section-options/delete.png';


function SectionDocumentsInput({ addDocumentCallback, onChangeDocumentCallback, onChangeTitleDocumentCallback, deleteDocumentCallback, documentsArray, documentsSameNameError, documentsOnlyURLArray, documentsOnlyURLSameNameError }) {

    

    return (
        <div className="inputWrapper">
            <p className="inputTitle">A continuación puede añadir documentos o enlaces</p>
            <div className="inputLine">
                <p className="inputSubTitle">Documentos</p>
                <img className="optionDocumentImage smallMarginTop" onClick={() => addDocumentCallback(false)} src={addImageRoute} alt={"Añadir documento"}/>
            </div>
            {documentsSameNameError && <div className="inputLine">
                <p className="inputSubTitle error">No se admiten documentos duplicados</p>
            </div>}
            { 
                documentsArray.map(element => 
                    <div key={element.key} className="fullWidth">
                        <div className="inputLine">
                            {(!element.disableInput) && <input 
                                className="ownInput ownInputFile marginTop smallFontSize "
                                type="file" 
                                id="file" 
                                name="myfile"
                                onChange={(e) => onChangeDocumentCallback(e.target.value, element.key, false)}/>}
                            {(element.disableInput) && <p className="lineTextFullWidth"><b>Documento: {element.originalDocumentName}</b></p>}
                            <img className="optionDocumentImage" onClick={() => deleteDocumentCallback(element.key, false)} src={deleteImageRoute} alt={"Borrar documento"}/>
                        </div>
                            { element.uploaded && 
                            <div className="inputLine">
                                <p className="lineText">El nombre del documento que se mostrará será:</p>
                                <input
                                    className={element.error ? "ownInput ownInputHalf error smallFontSize" : "ownInput ownInputHalf smallFontSize"}
                                    placeholder="Escriba el nombre del documento"
                                    type="text"
                                    id="titleDocument"
                                    value={element.title}
                                    onChange={(e) => onChangeTitleDocumentCallback(e.target.value, element.key, false)}/>
                            </div> }
                    </div>
                )
            }
            <div className="inputLine">
                <p className="inputSubTitle">Enlaces</p>
                <img className="optionDocumentImage smallMarginTop" onClick={() => addDocumentCallback(true)} src={addImageRoute} alt={"Añadir enlace"}/>
            </div>
            {documentsOnlyURLSameNameError && <div className="inputLine">
                <p className="inputSubTitle error">No se admiten enlaces duplicados</p>
            </div>}
            { 
                documentsOnlyURLArray.map(element => 
                    <div key={element.key} className="fullWidth">
                        <div className="inputLine">
                        <input 
                            className="ownInput ownInputFile marginTop smallFontSize "
                            placeholder="Escriba el enlace"
                            type="text" 
                            id="file" 
                            value={element.originalDocumentName}
                            onChange={(e) => onChangeDocumentCallback(e.target.value, element.key, true)}/>
                            <img className="optionDocumentImage" onClick={() => deleteDocumentCallback(element.key, true)} src={deleteImageRoute} alt={"Borrar enlace"}/>
                        </div>
                            { element.uploaded && 
                            <div className="inputLine">
                                <p className="lineText">El nombre del enlace que se mostrará será:</p>
                                <input
                                    className={element.error ? "ownInput ownInputHalf error smallFontSize" : "ownInput ownInputHalf smallFontSize"}
                                    placeholder="Escriba el nombre del enlace"
                                    type="text"
                                    id="titleDocument"
                                    value={element.title}
                                    onChange={(e) => onChangeTitleDocumentCallback(e.target.value, element.key, true)}/>
                            </div> }
                    </div>
                )
            }
        </div>
    );
}

export default SectionDocumentsInput;