import React from 'react';

import SectionOptionComponent from '../section-option-component/SectionOptionComponent';

//import addImageRoute from '../../assets/images/section-options/add.png';
//import addWhiteImageRoute from '../../assets/images/section-options/add-white.png';
import editImageRoute from '../../assets/images/section-options/edit.png';
import editWhiteImageRoute from '../../assets/images/section-options/edit-white.png';
import deleteImageRoute from '../../assets/images/section-options/delete.png';
import deleteWhiteImageRoute from '../../assets/images/section-options/delete-white.png';

import './SectionOptionsComponent.scss';

function SectionOptionsComponent({ clickEditButtonCallback, clickDeleteButtonCallback }) {

  return (
    <div className="sectionOptions">
        {/* <SectionOptionComponent normalImageRoute={addImageRoute} hoveredImageRoute={addWhiteImageRoute} altText={"Add"} tooltipText={"Añadir subsección"}/> */}
        <SectionOptionComponent normalImageRoute={editImageRoute} hoveredImageRoute={editWhiteImageRoute} altText={"Edit"} tooltipText={"Editar sección"} clickOption={clickEditButtonCallback}/>
        <SectionOptionComponent normalImageRoute={deleteImageRoute} hoveredImageRoute={deleteWhiteImageRoute} altText={"Delete"} tooltipText={"Borrar sección"} clickOption={clickDeleteButtonCallback}/>
    </div>
  );
}

export default SectionOptionsComponent;