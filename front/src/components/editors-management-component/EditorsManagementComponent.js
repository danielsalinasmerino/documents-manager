import React, { useState } from 'react';

import HeaderComponent from '../header-component/HeaderComponent';

import './EditorsManagementComponent.scss';

function EditorsManagementComponent({ portalName }) {

    return (
        <div className="main-wrapper">
            <HeaderComponent portalName={portalName}/>
            <h1>Bienvenido/a a la vista de gestión de editores</h1>
            {/* <EditionButtonsMenuComponent openModalCallback={openModal}/>
            <SectionsComponent sections={sections} documents={documents} editableSections={true} editSectionCallback={openModal} deleteSectionCallback={openDeleteSectionModal}/>
             */}{/* Modal to create or edit a section */}
            {/* <Modal
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
            </Modal> */}
            {/* Modal to delete a section */}
            {/* <Modal
              isOpen={modalDeleteSectonIsOpen}
              onRequestClose={closeDeleteSectionModal}
              style={modalDeleteSectionCustomStyles}
              ariaHideApp={false}
              contentLabel="Delete Section Modal">
              <DeleteSecionModalComponent
                closeDeleteSectionModal={closeDeleteSectionModal}
                confirmDeleteSection={confirmDeleteSection}/>
            </Modal> */}
        </div>
    );
}

export default EditorsManagementComponent;