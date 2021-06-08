import Modal from 'react-modal';
import React, { useState } from 'react';

import DeleteUserModalComponent from '../delete-user-modal-component/DeleteUserModalComponent';
import EditorsManagementButtonsMenuComponent from '../editors-management-buttons-menu-component/EditorsManagementButtonsMenuComponent';
import HeaderComponent from '../header-component/HeaderComponent';
import UserModalComponent from '../user-modal-component/UserModalComponent';
import UserOptionsComponent from '../user-options-component/UserOptionsComponent';
import UnauthorizedComponent from '../unauthorized-component/UnauthorizedComponent';

import { createUserEndpoint, deleteUserByIdEndpoint, updateUserByIdEndpoint } from '../../services/endpoints';
import { functionPostRequestOptions, functionPutRequestOptions, deleteRequestOptions } from '../../services/requestOptions';
import { modalUserCustomStyles } from '../../helpers/constants/modalUserCustomStyles';
import { modalDeleteSectionCustomStyles } from '../../helpers/constants/modalDeleteSectionCustomStyles';

import './EditorsManagementComponent.scss';

function EditorsManagementComponent({ portalName, users, setUsersCallback, possibleEditor }) {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [editUserMode, setEditUserMode] = useState(false);
    const [userToEdit, setUserToEdit] = useState({});
    const [modalDeleteUserIsOpen, setModalDeleteUserIsOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState({});

    const openModal = (userToEdit = {}) => {
        if (userToEdit !== {} && userToEdit.email) {
            setUserToEdit(userToEdit);
            setEditUserMode(true);
        }
        setIsOpen(true);
    }

    const closeModal = () => {
        setUserToEdit({});
        setEditUserMode(false);
        setIsOpen(false);
    }

    const saveUser = (user) => {
        // CREATE a user
        var raw = JSON.stringify(user);
        const postRequestOptions = functionPostRequestOptions(raw);
        fetch(createUserEndpoint, postRequestOptions)
            .then(response => response.text())
            .then(result => {
                //console.log(result)
            })
            .catch(error => console.log('error', error));
        users.push(user);
        setUsersCallback([...users.sort((a, b) => (a.email > b.email) ? 1 : -1)]);
        closeModal();
    }

    const editUser = (user) => {
        delete user._id;
        // UPDATE a user
        var raw = JSON.stringify(user);
        const putRequestOptions = functionPutRequestOptions(raw);
        fetch((updateUserByIdEndpoint + '/' + user.idUser), putRequestOptions)
            .then(response => response.text())
            .then(result => {
                //console.log(result)
            })
            .catch(error => console.log('error', error));
        setUsersCallback([...users.sort((a, b) => (a.email > b.email) ? 1 : -1)]);
        closeModal();
    }

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
        // DELETE a user
        fetch((deleteUserByIdEndpoint + '/' + userToDelete.idUser), deleteRequestOptions)
            .then(response => response.text())
            .then(result => {
                //console.log(result)
            })
            .catch(error => console.log('error', error));
        var newUsers = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].idUser !== userToDelete.idUser) {
                newUsers.push(users[i]);
            }
        }
        setUsersCallback([...newUsers.sort((a, b) => (a.email > b.email) ? 1 : -1)]);
        closeDeleteUserModal();
    }

    return (
        <div className="main-wrapper">
            <HeaderComponent portalName={portalName} />
            {
                possibleEditor && (<>
                    <h1>Bienvenido/a a la vista de gestión de editores</h1>
                    <EditorsManagementButtonsMenuComponent openModalCallback={openModal} />
                    {/* Table */}
                    <table className="editors-table">
                        <tr className="title-row">
                            <th className="title-element-big">Correo</th>
                            <th className="title-element-big">Nombre</th>
                            <th className="title-element-small">Opciones</th>
                        </tr>
                        {users.map(user =>
                            <tr className="content-row">
                                <td className="content-element-big">{user.email}</td>
                                <td className="content-element-big">{user.name}</td>
                                <td className="content-element-small">
                                    {(user.role === 'editor') &&
                                        <UserOptionsComponent clickEditButtonCallback={() => openModal(user)} clickDeleteButtonCallback={() => openDeleteUserModal(user)} />
                                    }
                                    {(user.role === 'admin') &&
                                        <div className='admin-text'>Administrador</div>
                                    }
                                </td>
                            </tr>
                        )}
                    </table>
                    {/* Modal to create or edit a user */}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => closeModal(true)}
                        style={modalUserCustomStyles}
                        ariaHideApp={false}
                        contentLabel="New/Edit User Modal">
                        <UserModalComponent
                            closeModal={() => closeModal(true)}
                            saveUserCallBack={saveUser}
                            editUserMode={editUserMode}
                            userToEdit={userToEdit}
                            editUserCallBack={editUser} />
                    </Modal>
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
                </>)
            }
            {
                !possibleEditor && (
                    <UnauthorizedComponent />
                )
            }
        </div>
    );
}

export default EditorsManagementComponent;