import React from 'react';

import SectionModalBottomButtons from '../section-modal-bottom-buttons/SectionModalBottomButtons';
import SectionModalHeader from '../section-modal-header/SectionModalHeader';

// We import the SCSS from the section modal component; it is not mandatory to duplicate the same code on different files
import '../section-modal-component/SectionModalComponent.scss';

function DeleteSectionModalComponent({ closeDeleteSectionModal, confirmDeleteSection }) {

    return (
        <div className="sectionModalWrapper">
            <SectionModalHeader title={'Borrar sección'} closeCallback={closeDeleteSectionModal}/>

            <div className="modalText">
                <p className="text">Si borra la sección, se borrarán tambien los documentos o enlaces asociados. ¿Está seguro de que desea borrar la sección?</p>
            </div>

            <SectionModalBottomButtons cancelText={'Cancelar'} cancelCallback={closeDeleteSectionModal} confirmText={'Borrar'} confirmCallback={confirmDeleteSection}/>
        </div>
    );
}

export default DeleteSectionModalComponent;