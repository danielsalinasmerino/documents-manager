import Modal from 'react-modal';
import React, { useState } from 'react';

import DeleteSecionModalComponent from '../delete-section-modal-component/DeleteSectionModalComponent';
import EditionButtonsMenuComponent from '../edition-buttons-menu-component/EditionButtonsMenuComponent';
import HeaderComponent from '../header-component/HeaderComponent';
import SectionsComponent from '../sections-component/SectionsComponent';
import SectionModalComponent from '../section-modal-component/SectionModalComponent';

import { createDocumentEndpoint, deleteDocumentByIdEndpoint, deleteSectionByIdEndpoint, updateDocumentByIdEndpoint, updateSectionByIdEndpoint } from '../../services/endpoints';
import { functionPostRequestOptions, functionPutRequestOptions, deleteRequestOptions } from '../../services/requestOptions';
import { modalCustomStyles } from '../../helpers/constants/modalCustomStyles';
import { modalDeleteSectionCustomStyles } from '../../helpers/constants/modalDeleteSectionCustomStyles';
import { sortArrayOfSectionsByPosition, reorderSectionsAfterEdition, addNewSection, deleteSelectedSection, deleteDocumentsFromSelectedSection } from '../../helpers/functions/functions';

import './EditionComponent.scss';

function EditionComponent({ portalName, sections, documents, setSectionsCallback, setDocumentsCallback }) {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [editSectionMode, setEditSectionMode] = useState(false);
    const [sectionToEdit, setSectionToEdit] = useState({});
    const [documentsToEdit, setDocumentsToEdit] = useState([]);
    const [documentsToDelete, setDocumentsToDelete] = useState([]);
    const [modalDeleteSectonIsOpen, setModalDeleteSectonIsOpen] = useState(false);
    const [sectionToDelete, setSectionToDelete] = useState({});

    // Logic to create or edit a section

    const openModal = (sectionToEdit = {}, documentsToEdit = []) => {
        if(sectionToEdit !== {} && sectionToEdit.title){
            setSectionToEdit(sectionToEdit);
            setDocumentsToEdit([...documentsToEdit]); 
            setDocumentsToDelete([...documentsToEdit]);
            setEditSectionMode(true);
        }
        setIsOpen(true);
    }
    
    const closeModal = (cancelClose = false) => {
        setSectionToEdit({});
        if(documentsToDelete.length > 0 && !cancelClose){
            deletePendingDocuments();
        }
        setDocumentsToEdit([...[]]); 
        setDocumentsToDelete([...[]]);
        setEditSectionMode(false);
        setIsOpen(false);
    }
    
    const saveSection = (section) => {
        sections = addNewSection(sections, section);
        setSectionsCallback([...sortArrayOfSectionsByPosition(sections)]);
        closeModal();
    }

    const saveDocument = (document) => {
        // CREATE a document
        var raw = JSON.stringify(document);
        const postRequestOptions = functionPostRequestOptions(raw);
        fetch(createDocumentEndpoint, postRequestOptions)
            .then(response => response.text())
            .then(result => {
                    //console.log(result)
                })
            .catch(error => console.log('error', error));
        documents.push(document);
        setDocumentsCallback([...(documents)]);
    }

    const editSection = (section) => {           
        const newPositionEdittedSection = section.position; 
        const oldPositionEdittedSection = section.oldPosition;
        delete section.oldPosition;
        delete section._id;
        sections = reorderSectionsAfterEdition(sections, oldPositionEdittedSection, newPositionEdittedSection);
        sections[newPositionEdittedSection - 1] = section;
        // UPDATE a section
        var raw = JSON.stringify(section);
        const putRequestOptions = functionPutRequestOptions(raw);
        fetch((updateSectionByIdEndpoint + '/' + section.idSection), putRequestOptions)
            .then(response => response.text())
            .then(result => {
                    //console.log(result)
                })
            .catch(error => console.log('error', error));                  
        setSectionsCallback([...sections]);            
        closeModal();    
    }

    const editDocument = (document) => {           
        delete document.key;
        delete document.uploaded;
        delete document.error;
        delete document.disableInput;
        delete document._id;
        const index = documents.map(element => element.idDocument).indexOf(document.idDocument);
        // UPDATE a document
        var raw = JSON.stringify(document);
        const putRequestOptions = functionPutRequestOptions(raw);
        fetch((updateDocumentByIdEndpoint + '/' + document.idDocument), putRequestOptions)
            .then(response => response.text())
            .then(result => {
                //console.log(result)
            })
            .catch(error => console.log('error', error));
        documents[index] = document;
        setDocumentsCallback([...(documents)]);
        const indexEdit = documentsToDelete.map(element => element.idDocument).indexOf(document.idDocument);
        documentsToDelete.splice(indexEdit, 1);
        setDocumentsToDelete([...(documentsToDelete)]);
    }

    const deletePendingDocuments = () => {
        for(let i = 0; i < documentsToDelete.length; i++){
            const index = documents.map(element => element.idDocument).indexOf(documentsToDelete[i].idDocument);
            // DELETE a document
            fetch((deleteDocumentByIdEndpoint + '/' + documentsToDelete[i].idDocument), deleteRequestOptions)
                .then(response => response.text())
                .then(result => {
                    //console.log(result)
                })
                .catch(error => console.log('error', error));

            documents.splice(index, 1);
            setDocumentsCallback([...(documents)]);
        }
    }

    const openDeleteSectionModal = (sectionToDelete = {}) => {
        setSectionToDelete(sectionToDelete);
        setModalDeleteSectonIsOpen(true);
    } 
    
    const closeDeleteSectionModal = () => {
        setSectionToDelete({});
        setModalDeleteSectonIsOpen(false);
    }

    const confirmDeleteSection = () => {
        deleteSection();
        setSectionToDelete({});
        setModalDeleteSectonIsOpen(false);
    }

    const deleteSection = () => {
        // DELETE a section
        fetch((deleteSectionByIdEndpoint + '/' + sectionToDelete.idSection), deleteRequestOptions)
            .then(response => response.text())
            .then(result => {
                //console.log(result)
            })
            .catch(error => console.log('error', error));
        const documentsToDeleteHelper = documents.filter(document => document.sectionID === sectionToDelete.idSection);
        for(let i = 0; i < documentsToDeleteHelper.length; i++){
            // DELETE a document
            fetch((deleteDocumentByIdEndpoint + '/' + documentsToDeleteHelper[i].idDocument), deleteRequestOptions)
                .then(response => response.text())
                .then(result => {
                    //console.log(result)
                })
                .catch(error => console.log('error', error));
        }
        sections = deleteSelectedSection(sections, sectionToDelete);
        documents = deleteDocumentsFromSelectedSection(documents, sectionToDelete);              
        setSectionsCallback([...sections]);
        setDocumentsCallback([...(documents)]);            
        closeModal();   
    }

    return (
        <div className="main-wrapper">
            <HeaderComponent portalName={portalName}/>
            <h1>Bienvenido/a a la vista de edición de Documentación del {portalName}</h1>
            <EditionButtonsMenuComponent openModalCallback={openModal}/>
            <SectionsComponent sections={sections} documents={documents} editableSections={true} editSectionCallback={openModal} deleteSectionCallback={openDeleteSectionModal}/>
            {/* Modal to create or edit a section */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => closeModal(true)}
              style={modalCustomStyles}
              ariaHideApp={false}
              contentLabel="New/Edit Section Modal">
              <SectionModalComponent
                closeModal={() => closeModal(true)}
                saveSectionCallBack={saveSection}
                saveDocumentCallback={saveDocument}
                editSectionMode={editSectionMode}
                sectionToEdit={sectionToEdit}
                documentsToEdit={documentsToEdit}
                editSectionCallBack={editSection}
                editDocumentCallback={editDocument}
                sectiongsLength={sections.length}/>
            </Modal>
            {/* Modal to delete a section */}
            <Modal
              isOpen={modalDeleteSectonIsOpen}
              onRequestClose={closeDeleteSectionModal}
              style={modalDeleteSectionCustomStyles}
              ariaHideApp={false}
              contentLabel="Delete Section Modal">
              <DeleteSecionModalComponent
                closeDeleteSectionModal={closeDeleteSectionModal}
                confirmDeleteSection={confirmDeleteSection}/>
            </Modal>
        </div>
    );
}

export default EditionComponent;