import React, { useState } from 'react';

import EditorsManagementButtonsMenuComponent from '../editors-management-buttons-menu-component/EditorsManagementButtonsMenuComponent';
import HeaderComponent from '../header-component/HeaderComponent';
import UserOptionsComponent from '../user-options-component/UserOptionsComponent';

import './EditorsManagementComponent.scss';

function EditorsManagementComponent({ portalName, users }) {

    return (
        <div className="main-wrapper">
            <HeaderComponent portalName={portalName} />
            <h1>Bienvenido/a a la vista de gestión de editores</h1>
            <EditorsManagementButtonsMenuComponent />
            <table className="editors-table">
                <tr className="title-row">
                    <th className="title-element-big">Correo</th>
                    <th className="title-element-small">Opciones</th>
                </tr>
                {users.map(user =>
                    <tr className="content-row">
                        <td className="content-element-big">{user.email}</td>
                        <td className="content-element-small">
                            <UserOptionsComponent clickEditButtonCallback={() => console.log('Edit')} clickDeleteButtonCallback={() => console.log('Delete')} />
                        </td>
                    </tr>
                )}
            </table>
            {/* <EditionButtonsMenuComponent openModalCallback={openModal}/>
            <SectionsComponent sections={sections} documents={documents} editableSections={true} editSectionCallback={openModal} deleteSectionCallback={openDeleteSectionModal}/>
             */}
            {/* Modal to create or edit a section */}
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
            {/* Modal to delete a user */}
            {/* <Modal
                isOpen={modalDeleteUserIsOpen}
                onRequestClose={closeDeleteUserModal}
                style={modalDeleteSectionCustomStyles}
                ariaHideApp={false}
                contentLabel="Delete User Modal">
                <DeleteSecionModalComponent
                    closeDeleteUserModal={closeDeleteUserModal}
                    confirmDeleteUser={confirmDeleteUser} />
            </Modal> */}
        </div>
    );
}

export default EditorsManagementComponent;