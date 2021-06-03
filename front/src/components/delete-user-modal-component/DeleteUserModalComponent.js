import React from 'react';

import SectionModalBottomButtons from '../section-modal-bottom-buttons/SectionModalBottomButtons';
import SectionModalHeader from '../section-modal-header/SectionModalHeader';

// We import the SCSS from the section modal component; it is not mandatory to duplicate the same code on different files
import '../section-modal-component/SectionModalComponent.scss';

function DeleteUserModalComponent({ closeDeleteUserModal, confirmDeleteUser }) {

    return (
        <div className="sectionModalWrapper">
            <SectionModalHeader title={'Borrar usuario'} closeCallback={closeDeleteUserModal}/>

            <div className="modalText">
                <p className="text">Si borra el usuario, no podrá acceder a la vista de edición. ¿Está seguro de que desea borrar el usuario?</p>
            </div>

            <SectionModalBottomButtons cancelText={'Cancelar'} cancelCallback={closeDeleteUserModal} confirmText={'Borrar'} confirmCallback={confirmDeleteUser}/>
        </div>
    );
}

export default DeleteUserModalComponent;