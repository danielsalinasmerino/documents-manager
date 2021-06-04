import React from 'react';

import SectionOptionComponent from '../section-option-component/SectionOptionComponent';

//import addImageRoute from '../../assets/images/section-options/add.png';
//import addWhiteImageRoute from '../../assets/images/section-options/add-white.png';
import editImageRoute from '../../assets/images/section-options/edit.png';
import editWhiteImageRoute from '../../assets/images/section-options/edit-white.png';
import deleteImageRoute from '../../assets/images/section-options/delete.png';
import deleteWhiteImageRoute from '../../assets/images/section-options/delete-white.png';

import './UserOptionsComponent.scss';

function UserOptionsComponent({ usersNumber, clickEditButtonCallback, clickDeleteButtonCallback }) {

  return (
    <div className="sectionOptions">
      <SectionOptionComponent normalImageRoute={editImageRoute} hoveredImageRoute={editWhiteImageRoute} altText={"Edit"} tooltipText={"Editar usuario"} clickOption={clickEditButtonCallback} />
      { (usersNumber > 1) &&
        <SectionOptionComponent normalImageRoute={deleteImageRoute} hoveredImageRoute={deleteWhiteImageRoute} altText={"Delete"} tooltipText={"Borrar usuario"} clickOption={clickDeleteButtonCallback} />
      }
    </div>
  );
}

export default UserOptionsComponent;