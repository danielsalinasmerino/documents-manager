import React, { useState, useEffect } from 'react';

import DocumentsFormatInput from '../documents-format-input/DocumentsFormatInput';
import SectionModalBottomButtons from '../section-modal-bottom-buttons/SectionModalBottomButtons';
import SectionDocumentsInput from '../section-documents-input/SectionDocumentsInput';
import SectionPositionInput from '../section-position-input/SectionPositionInput';
import SectionModalHeader from '../section-modal-header/SectionModalHeader';
import SectionTextInput from '../section-text-input/SectionTextInput';

import { Document } from '../../models/document';
import { getRoutingInfo, makeId } from '../../helpers/functions/functions';
import { Section } from '../../models/section';
import { uploadFileEndpoint } from '../../services/endpoints';

import './SectionModalComponent.scss';

function SectionModalComponent({ sectiongsLength, saveSectionCallBack, saveDocumentCallback, closeModal, editSectionMode, sectionToEdit, documentsToEdit, editSectionCallBack, editDocumentCallback }) {

    const routingInfo = getRoutingInfo();
    const portalName = routingInfo.portalName;

    const [titleSection, setTitleSection] = useState("");

    const [contentSection, setContentSection] = useState("");
    const [errorContent, setErrorContent] = useState(false);
    const maxContentLength = "4000";

    const [positionsArray, setPostitionsArray] = useState([]);
    const [position, setPostition] = useState(0);

    const [documentsArray, setDocumentsArray] = useState([]);
    const [documentsSameNameError, setDocumentsSameNameError] = useState(false);
    const [documentsOnlyURLArray, setDocumentsOnlyURLArray] = useState([]);
    const [documentsOnlyURLSameNameError, setDocumentsOnlyURLSameNameError] = useState(false);

    const documentsFormatArray = [{ value: "list", label: "en lista." }, { value: "inline", label: "en línea." }];
    const [documentsFormat, setDocumentsFormat] = useState("list");

    useEffect(() => {
        var positionsArray = [];
        const sectiongsLengthHelper = sectiongsLength + 2;
        for (let i = 1; i < sectiongsLengthHelper; i++) {
            positionsArray.push({ value: i, label: i.toString() });
        }

        if (editSectionMode) {
            setTitleSection(sectionToEdit.title);
            setContentSection(sectionToEdit.description);
            var documentsArrayToEdit = documentsToEdit.filter(document => document.onlyURL === false);
            for (let i = 0; i < documentsArrayToEdit.length; i++) {
                documentsArrayToEdit[i].key = "document" + (i + 1);
                documentsArrayToEdit[i].uploaded = true;
                documentsArrayToEdit[i].error = false;
                documentsArrayToEdit[i].disableInput = true;
            }
            setDocumentsArray([...documentsArrayToEdit]);
            var documentsOnlyURLArrayToEdit = documentsToEdit.filter(document => document.onlyURL === true);
            for (let i = 0; i < documentsOnlyURLArrayToEdit.length; i++) {
                documentsOnlyURLArrayToEdit[i].key = "docu_url" + (i + 1);
                documentsOnlyURLArrayToEdit[i].uploaded = true;
                documentsOnlyURLArrayToEdit[i].error = false;
                documentsOnlyURLArrayToEdit[i].disableInput = false;
            }
            setDocumentsOnlyURLArray([...documentsOnlyURLArrayToEdit]);
            positionsArray.pop();
            setPostitionsArray(positionsArray);
            setPostition(sectionToEdit.position);
            setDocumentsFormat(sectionToEdit.documentsFormat);
        }
        else {
            setPostitionsArray(positionsArray);
            setPostition(sectiongsLength + 1);
        }
    }, [sectiongsLength, editSectionMode, sectionToEdit, documentsToEdit]);

    const saveSection = () => {
        // First we check the posible errors
        const documentError = checkDocumentErrors();

        if (documentError || errorContent || documentsSameNameError || documentsOnlyURLSameNameError) {
            // If we find errors we let the user know them
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
                portalName,
                documentsFormat
            );
            const allDocuments = documentsArray.concat(documentsOnlyURLArray);
            for (let i = 0; i < allDocuments.length; i++) {
                if (allDocuments[i].title.length !== 0) {
                    createNewDocumentAndSaveCallback(allDocuments[i], newSection.idSection);
                }
            }
            saveSectionCallBack(newSection);
        }
    }

    const createNewDocumentAndSaveCallback = (documentData, parentSectionID) => {
        if (documentData.onlyURL) {
            const newDocument = new Document(
                makeId(),
                documentData.title.trim(),
                documentData.originalDocumentName,
                new Date(),
                new Date(),
                parentSectionID,
                documentData.onlyURL,
                documentData.originalDocumentName
            );

            saveDocumentCallback(newDocument);
        }
        else {
            var formdata = new FormData();
            formdata.append("file", documentData.documentUrl);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(uploadFileEndpoint, requestOptions)
                .then(response => response.json())
                .then(result => {
                    const newDocument = new Document(
                        makeId(),
                        documentData.title.trim(),
                        result.filePath,
                        new Date(),
                        new Date(),
                        parentSectionID,
                        documentData.onlyURL,
                        documentData.originalDocumentName
                    );

                    saveDocumentCallback(newDocument);
                })
                .catch(error => console.log('error', error));
        }
    }

    const editSection = () => {
        // First we check the posible errors        
        const documentError = checkDocumentErrors();

        if (documentError || errorContent || documentsSameNameError || documentsOnlyURLSameNameError) {
            // If we find errors on the title we let the user know them   
        }
        else {
            // If we do not find errors we save the section            
            var sectionEditted = sectionToEdit;
            sectionEditted.title = titleSection;
            sectionEditted.description = contentSection;
            sectionEditted.oldPosition = sectionEditted.position;
            sectionEditted.position = position;
            sectionEditted.updatedAt = new Date();
            sectionEditted.documentsFormat = documentsFormat;
            const allDocuments = documentsArray.concat(documentsOnlyURLArray);
            for (let i = 0; i < allDocuments.length; i++) {
                if (allDocuments[i].title.length !== 0) {
                    if (allDocuments[i].idDocument !== undefined && allDocuments[i].idDocument !== null) {
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

    const checkDocumentErrors = () => {
        var documentError = false;
        const allDocuments = documentsArray.concat(documentsOnlyURLArray);
        for (let i = 0; i < allDocuments.length; i++) {
            (allDocuments[i].error) ? (documentError = true) : (documentError = false);
        }
        return documentError;
    }

    const onChangeTitleSection = (e) => {
        setTitleSection(e.target.value);
    }

    const onChangeContentSection = (e) => {
        setContentSection(e.target.value);
        (e.target.value.length > maxContentLength) ? setErrorContent(true) : setErrorContent(false);
    }

    const addDocument = (onlyURL) => {
        if (onlyURL) {
            documentsOnlyURLArray.push({ key: "docu_url" + (documentsOnlyURLArray.length + 1), uploaded: false, title: "", error: false, onlyURL: true, originalDocumentName: "" });
            setDocumentsOnlyURLArray([...documentsOnlyURLArray]);
        }
        else {
            documentsArray.push({ key: "document" + (documentsArray.length + 1), uploaded: false, title: "", error: false, onlyURL: false, originalDocumentName: "" });
            setDocumentsArray([...documentsArray]);
        }
    }

    const onChangeDocument = (e, eKey, onlyURL) => {
        const positionToChange = Number(eKey.slice(8)) - 1;
        var documentToChange = (onlyURL) ? documentsOnlyURLArray[positionToChange] : documentsArray[positionToChange];
        documentToChange.uploaded = true;
        documentToChange.title = (e.target.value.slice((e.target.value.lastIndexOf("\\") + 1), e.target.value.length));
        documentToChange.originalDocumentName = (e.target.value.slice((e.target.value.lastIndexOf("\\") + 1), e.target.value.length)).trim();
        documentToChange.error = false;
        if (onlyURL) {
            documentToChange.documentUrl = documentToChange.originalDocumentName;
            documentsOnlyURLArray[positionToChange] = documentToChange;
            setDocumentsOnlyURLArray([...documentsOnlyURLArray]);
            checkDocumentsOnlyURLSameNameError();
        }
        else {
            documentToChange.documentUrl = e.target.files[0];
            documentsArray[positionToChange] = documentToChange;
            setDocumentsArray([...documentsArray]);
            checkDocumentsSameNameError();
        }
    }

    const onChangeTitleDocument = (e, eKey, onlyURL) => {
        const positionToChange = Number(eKey.slice(8)) - 1;
        if (onlyURL) {
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
        if (onlyURL) {
            documentsOnlyURLArray.splice(positionToChange, 1);
            for (let i = 0; i < documentsOnlyURLArray.length; i++) {
                documentsOnlyURLArray[i].key = "docu_url" + (i + 1);
            }
            setDocumentsOnlyURLArray([...documentsOnlyURLArray]);
            checkDocumentsOnlyURLSameNameError();
        }
        else {
            documentsArray.splice(positionToChange, 1);
            for (let i = 0; i < documentsArray.length; i++) {
                documentsArray[i].key = "document" + (i + 1);
            }
            setDocumentsArray([...documentsArray]);
            checkDocumentsSameNameError();
        }
    }

    const checkDocumentsSameNameError = () => {
        let seen = new Set();
        var hasDuplicates = documentsArray.some(function (currentObject) { return seen.size === seen.add(currentObject.originalDocumentName).size; });
        setDocumentsSameNameError(hasDuplicates);
    }

    const checkDocumentsOnlyURLSameNameError = () => {
        let seen = new Set();
        var hasDuplicates = documentsOnlyURLArray.some(function (currentObject) { return seen.size === seen.add(currentObject.originalDocumentName).size; });
        setDocumentsOnlyURLSameNameError(hasDuplicates);
    }

    return (
        <div className="sectionModalWrapper">
            <SectionModalHeader title={editSectionMode ? 'Editar sección' : 'Nueva sección'} closeCallback={closeModal} />

            <SectionTextInput titleText={"Título"} errorMark={false} styleValue={"ownInput"} placeHolderText={"Escriba el título de la sección (opcional)"}
                identifier={"titleSection"} valueToShow={titleSection} onChangeCallback={onChangeTitleSection} />

            <SectionTextInput titleText={"Contenido"} errorMark={errorContent} styleValue={"ownTextarea"} placeHolderText={"Escriba el contenido de la sección (opcional)"}
                identifier={"contentSection"} valueToShow={contentSection} onChangeCallback={onChangeContentSection} textAreaMode={true} errorLengthSpan={true} maxContentLength={maxContentLength} />

            <SectionPositionInput editSectionMode={editSectionMode} sectionToEdit={sectionToEdit} sectiongsLength={sectiongsLength} positionsArray={positionsArray} setPostitionCallback={setPostition} />

            <SectionDocumentsInput addDocumentCallback={addDocument} onChangeDocumentCallback={onChangeDocument} onChangeTitleDocumentCallback={onChangeTitleDocument} deleteDocumentCallback={deleteDocument}
                documentsArray={documentsArray} documentsOnlyURLArray={documentsOnlyURLArray} documentsSameNameError={documentsSameNameError} documentsOnlyURLSameNameError={documentsOnlyURLSameNameError} />

            <DocumentsFormatInput editSectionMode={editSectionMode} sectionToEdit={sectionToEdit} documentsFormatArray={documentsFormatArray} setDocumentsFormatCallback={setDocumentsFormat} />

            <SectionModalBottomButtons cancelText={'Cancelar'} cancelCallback={closeModal} confirmText={'Guardar'} confirmCallback={editSectionMode ? editSection : saveSection} />
        </div>
    );
}

export default SectionModalComponent;