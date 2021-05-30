import React, { useState, useEffect } from 'react';

import SectionModalBottomButtons from '../section-modal-bottom-buttons/SectionModalBottomButtons';
import SectionDocumentsInput from '../section-documents-input/SectionDocumentsInput';
import SectionPositionInput from '../section-position-input/SectionPositionInput';
import SectionModalHeader from '../section-modal-header/SectionModalHeader';
import SectionTextInput from '../section-text-input/SectionTextInput';

import { Document } from '../../models/document';
import { makeId } from '../../helpers/functions/functions'; 
import { Section } from '../../models/section';

import './SectionModalComponent.scss';

function SectionModalComponent({ sectiongsLength, saveSectionCallBack, saveDocumentCallback, closeModal, editSectionMode, sectionToEdit, documentsToEdit, editSectionCallBack, editDocumentCallback}) {

    const [titleSection, setTitleSection] = useState("");
    const [errorTitle, setErrorTitle] = useState(false);

    const [contentSection, setContentSection] = useState("");
    const [errorContent, setErrorContent] = useState(false);
    const maxContentLength = "4000";

    const [positionsArray, setPostitionsArray] = useState([]);
    const [position, setPostition] = useState(0);

    const [documentsArray, setDocumentsArray] = useState([]);
    const [documentsSameNameError, setDocumentsSameNameError] = useState(false);
    const [documentsOnlyURLArray, setDocumentsOnlyURLArray] = useState([]);
    const [documentsOnlyURLSameNameError, setDocumentsOnlyURLSameNameError] = useState(false);

    useEffect(() => {
        var positionsArray = [];
        const sectiongsLengthHelper = sectiongsLength + 2;
        for(let i = 1; i < sectiongsLengthHelper; i++){            
            positionsArray.push({value: i, label: i.toString()});        
        }

        if(editSectionMode){
            setTitleSection(sectionToEdit.title);
            setContentSection(sectionToEdit.description);
            var documentsArrayToEdit = documentsToEdit.filter(document => document.onlyURL === false);
            for(let i = 0; i < documentsArrayToEdit.length; i++){
                documentsArrayToEdit[i].key = "document" + (i + 1);
                documentsArrayToEdit[i].uploaded = true;
                documentsArrayToEdit[i].error = false;
                documentsArrayToEdit[i].disableInput = true;
            }
            setDocumentsArray([...documentsArrayToEdit]); 
            var documentsOnlyURLArrayToEdit = documentsToEdit.filter(document => document.onlyURL === true);
            for(let i = 0; i < documentsOnlyURLArrayToEdit.length; i++){
                documentsOnlyURLArrayToEdit[i].key = "docu_url" + (i + 1);
                documentsOnlyURLArrayToEdit[i].uploaded = true;
                documentsOnlyURLArrayToEdit[i].error = false;
                documentsOnlyURLArrayToEdit[i].disableInput = false;
            }
            setDocumentsOnlyURLArray([...documentsOnlyURLArrayToEdit]); 
            positionsArray.pop();            
            setPostitionsArray(positionsArray);            
            setPostition(sectionToEdit.position);
        }
        else {
            setPostitionsArray(positionsArray);            
            setPostition(sectiongsLength + 1);
        }
    }, [sectiongsLength, editSectionMode, sectionToEdit, documentsToEdit]);

    const saveSection = () => {
        // First we check the posible errors
        const titleSectionError = checkTitleSectionErrors();
        const documentError = checkDocumentErrors();

        if(titleSectionError || documentError || errorContent || documentsSameNameError || documentsOnlyURLSameNameError){
            // If we find errors we let the user know them
            (titleSectionError && setErrorTitle(true));
        }
        else {
            // If we do not find errors we save the section
            const newSection = new Section(
                makeId(),
                titleSection.trim(),
                contentSection.trim(),
                new Date(),
                new Date(),
                position,
                null, // To do (parentID)
                null  // To do (portalID)
            );
            const allDocuments = documentsArray.concat(documentsOnlyURLArray);
            for(let i = 0; i < allDocuments.length; i++){
                if(allDocuments[i].title.length !== 0){
                    createNewDocumentAndSaveCallback(allDocuments[i], newSection.idSection);
                }
            }
            saveSectionCallBack(newSection);
        }
    }

    const createNewDocumentAndSaveCallback = (documentData, parentSectionID) => {
        const newDocument = new Document(
            makeId(),
            documentData.title.trim(),
            documentData.onlyURL ? documentData.originalDocumentName : 'https://www.google.es/', // TO DO
            new Date(),
            new Date(),
            parentSectionID,
            documentData.onlyURL,
            documentData.originalDocumentName
        ); 
        saveDocumentCallback(newDocument);
    }

    const editSection = () => {            
        // First we check the posible errors        
        const titleSectionError = checkTitleSectionErrors();        
        const documentError = checkDocumentErrors();
                
        if(titleSectionError || documentError || errorContent || documentsSameNameError || documentsOnlyURLSameNameError){            
            // If we find errors on the title we let the user know them            
            (titleSectionError && setErrorTitle(true));        
        }        
        else {            
            // If we do not find errors we save the section            
            var sectionEditted = sectionToEdit;            
            sectionEditted.title = titleSection;            
            sectionEditted.description = contentSection;
            sectionEditted.oldPosition = sectionEditted.position;         
            sectionEditted.position = position;
            sectionEditted.updatedAt = new Date();
            const allDocuments = documentsArray.concat(documentsOnlyURLArray);
            for(let i = 0; i < allDocuments.length; i++){
                if(allDocuments[i].title.length !== 0){
                    if(allDocuments[i].idDocument !== undefined && allDocuments[i].idDocument !== null){
                        allDocuments[i].updatedAt = new Date();
                        editDocumentCallback(allDocuments[i]);
                    }
                    else {
                        createNewDocumentAndSaveCallback(allDocuments[i], sectionEditted.idSection);
                    }
                }
            } 
            editSectionCallBack(sectionEditted);        
        }    
    }

    const checkTitleSectionErrors = () => {
        const titleSectionTrim = titleSection.trim();
        return (titleSectionTrim.length === 0);
    }

    const checkDocumentErrors = () => {
        var documentError = false;
        const allDocuments = documentsArray.concat(documentsOnlyURLArray);
        for(let i = 0; i < allDocuments.length; i++){
            (allDocuments[i].error) ? (documentError = true) : (documentError = false);
        }
        return documentError;
    }

    const onChangeTitleSection = (e) => {
        setTitleSection(e.target.value);
        setErrorTitle(false);
    }

    const onChangeContentSection = (e) => {
        setContentSection(e.target.value);
        (e.target.value.length > maxContentLength) ? setErrorContent(true) : setErrorContent(false);
    }

    const addDocument = (onlyURL) => {
        if(onlyURL){
            documentsOnlyURLArray.push({key: "docu_url" + (documentsOnlyURLArray.length + 1), uploaded: false, title: "", error: false, onlyURL: true, originalDocumentName: ""});
            setDocumentsOnlyURLArray([...documentsOnlyURLArray]); 
        }
        else{
            documentsArray.push({key: "document" + (documentsArray.length + 1), uploaded: false, title: "", error: false, onlyURL: false, originalDocumentName: ""});
            setDocumentsArray([...documentsArray]);
        } 
    }

    const onChangeDocument = (e, eKey, onlyURL) => {
        const positionToChange = Number(eKey.slice(8)) - 1;
        var documentToChange = (onlyURL) ? documentsOnlyURLArray[positionToChange] : documentsArray[positionToChange];
        documentToChange.uploaded = true;
        documentToChange.title = (e.slice((e.lastIndexOf("\\") + 1), e.length));
        documentToChange.originalDocumentName = (e.slice((e.lastIndexOf("\\") + 1), e.length)).trim();
        documentToChange.error = false;
        if(onlyURL){
            documentToChange.documentUrl = documentToChange.originalDocumentName;
            documentsOnlyURLArray[positionToChange] = documentToChange;
            setDocumentsOnlyURLArray([...documentsOnlyURLArray]);
            checkDocumentsOnlyURLSameNameError();
        }
        else {
            if(documentToChange.documentUrl !== undefined && documentToChange.documentUrl !== null){
                documentToChange.documentUrl = 'https://www.google.es/';
            }
            documentsArray[positionToChange] = documentToChange;
            setDocumentsArray([...documentsArray]); 
            checkDocumentsSameNameError();
        }
    }

    const onChangeTitleDocument = (e, eKey, onlyURL) => {
        const positionToChange = Number(eKey.slice(8)) - 1;
        if(onlyURL){
            documentsOnlyURLArray[positionToChange].title = e;
            (e.trim().length > 0) ? documentsOnlyURLArray[positionToChange].error = false : documentsOnlyURLArray[positionToChange].error = true;
            setDocumentsOnlyURLArray([...documentsOnlyURLArray]); 
        }
        else {
            documentsArray[positionToChange].title = e;
            (e.trim().length > 0) ? documentsArray[positionToChange].error = false : documentsArray[positionToChange].error = true;
            setDocumentsArray([...documentsArray]);
        }
    }

    const deleteDocument = (eKey, onlyURL) => {
        const positionToChange = Number(eKey.slice(8)) - 1;
        if(onlyURL){
            documentsOnlyURLArray.splice(positionToChange, 1);
            for(let i = 0; i < documentsOnlyURLArray.length; i++){
                documentsOnlyURLArray[i].key = "docu_url" + (i + 1);
            }
            setDocumentsOnlyURLArray([...documentsOnlyURLArray]); 
            checkDocumentsOnlyURLSameNameError();
        }
        else {
            documentsArray.splice(positionToChange, 1);
            for(let i = 0; i < documentsArray.length; i++){
                documentsArray[i].key = "document" + (i + 1);
            }
            setDocumentsArray([...documentsArray]);  
            checkDocumentsSameNameError();
        }
    }

    const checkDocumentsSameNameError = () => {
        let seen = new Set();
        var hasDuplicates = documentsArray.some(function(currentObject) { return seen.size === seen.add(currentObject.originalDocumentName).size; });
        setDocumentsSameNameError(hasDuplicates);
    }

    const checkDocumentsOnlyURLSameNameError = () => {
        let seen = new Set();
        var hasDuplicates = documentsOnlyURLArray.some(function(currentObject) { return seen.size === seen.add(currentObject.originalDocumentName).size; });
        setDocumentsOnlyURLSameNameError(hasDuplicates);
    }

    return (
        <div className="sectionModalWrapper">
            <SectionModalHeader title={editSectionMode ? 'Editar sección' : 'Nueva sección'} closeCallback={closeModal}/>

            <SectionTextInput titleText={"Título"} errorMark={errorTitle} styleValue={"ownInput"} placeHolderText={"Escriba el título de la sección (obligatorio)"} 
                identifier={"titleSection"} valueToShow={titleSection} onChangeCallback={onChangeTitleSection}/>

            <SectionTextInput titleText={"Contenido"} errorMark={errorContent} styleValue={"ownTextarea"} placeHolderText={"Escriba el contenido de la sección (opcional)"} 
                identifier={"contentSection"} valueToShow={contentSection} onChangeCallback={onChangeContentSection} textAreaMode={true} errorLengthSpan={true} maxContentLength={maxContentLength} />

            <SectionPositionInput editSectionMode={editSectionMode } sectionToEdit={sectionToEdit} sectiongsLength={sectiongsLength} positionsArray={positionsArray} setPostitionCallback={setPostition}/>

            <SectionDocumentsInput addDocumentCallback={addDocument} onChangeDocumentCallback={onChangeDocument} onChangeTitleDocumentCallback={onChangeTitleDocument} deleteDocumentCallback={deleteDocument} 
                documentsArray={documentsArray} documentsOnlyURLArray={documentsOnlyURLArray} documentsSameNameError={documentsSameNameError} documentsOnlyURLSameNameError={documentsOnlyURLSameNameError}/>

            <SectionModalBottomButtons cancelText={'Cancelar'} cancelCallback={closeModal} confirmText={'Guardar'} confirmCallback={editSectionMode ? editSection : saveSection}/>
        </div>
    );
}

export default SectionModalComponent;