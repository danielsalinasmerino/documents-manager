import Modal from 'react-modal';
import React, { useState } from 'react';

import DeleteUserModalComponent from '../delete-user-modal-component/DeleteUserModalComponent';
import EditorsManagementButtonsMenuComponent from '../editors-management-buttons-menu-component/EditorsManagementButtonsMenuComponent';
import HeaderComponent from '../header-component/HeaderComponent';
import UserOptionsComponent from '../user-options-component/UserOptionsComponent';

import { createUserEndpoint, deleteUserByIdEndpoint, updateUserByIdEndpoint } from '../../services/endpoints';
import { functionPostRequestOptions, functionPutRequestOptions, deleteRequestOptions } from '../../services/requestOptions';
import { modalDeleteSectionCustomStyles } from '../../helpers/constants/modalDeleteSectionCustomStyles';

import './EditorsManagementComponent.scss';

function EditorsManagementComponent({ portalName, users, setUsersCallback }) {

    /* const [modalIsOpen, setIsOpen] = useState(false);
    const [editSectionMode, setEditSectionMode] = useState(false);
    const [sectionToEdit, setSectionToEdit] = useState({}); */
    const [modalDeleteUserIsOpen, setModalDeleteUserIsOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState({});

    const openDeleteUserModal = (userToDelete = {}) => {
        setUserToDelete(userToDelete);
        setModalDeleteUserIsOpen(true);
    }

    const closeDeleteUserModal = () => {
        setUserToDelete({});
        setModalDeleteUserIsOpen(false);
    }

    const confirmDeleteUser = () => {
        deleteUser();
        setUserToDelete({});
        setModalDeleteUserIsOpen(false);
    }

    const deleteUser = () => {
        const index = users.map(element => element.idUser).indexOf(userToDelete.idUser);
        // DELETE a user
        fetch((deleteUserByIdEndpoint + '/' + userToDelete.idUser), deleteRequestOptions)
            .then(response => response.text())
            .then(result => {
                //console.log(result)
            })
            .catch(error => console.log('error', error));
        users.splice(index, 1);
        setUsersCallback([...users]);
        closeDeleteUserModal();
    }

    return (
        <div className="main-wrapper">
            <HeaderComponent portalName={portalName} />
            <h1>Bienvenido/a a la vista de gestión de editores</h1>
            <EditorsManagementButtonsMenuComponent />
            {/* Table */}
            <table className="editors-table">
                <tr className="title-row">
                    <th className="title-element-big">Correo</th>
                    <th className="title-element-small">Opciones</th>
                </tr>
                {users.map(user =>
                    <tr className="content-row">
                        <td className="content-element-big">{user.email}</td>
                        <td className="content-element-small">
                            <UserOptionsComponent clickEditButtonCallback={() => console.log('Edit')} clickDeleteButtonCallback={() => openDeleteUserModal(user)} />
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
            <Modal
                isOpen={modalDeleteUserIsOpen}
                onRequestClose={closeDeleteUserModal}
                style={modalDeleteSectionCustomStyles}
                ariaHideApp={false}
                contentLabel="Delete User Modal">
                <DeleteUserModalComponent
                    closeDeleteUserModal={closeDeleteUserModal}
                    confirmDeleteUser={confirmDeleteUser} />
            </Modal>
        </div>
    );
}

export default EditorsManagementComponent;