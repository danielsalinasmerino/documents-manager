import React from 'react';

import closeModalImageRoute from '../../assets/images/close.png';


function SectionModalHeader({ title, closeCallback}) {

    

    return (
        <div className="modalHeader">
            <p className="titleHeader">{title}</p>
            <img className="closeModal" src={closeModalImageRoute} alt="Close Modal" onClick={closeCallback}/>
        </div>
    );
}

export default SectionModalHeader;