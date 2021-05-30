import React, { useState } from 'react';

import Tooltip from '@material-ui/core/Tooltip';

import './SectionOptionComponent.scss';

function SectionOptionComponent({ normalImageRoute, hoveredImageRoute, altText, tooltipText, clickOption}) {

  const [hovered, setHover] = useState(false);

  return (
    <Tooltip title={tooltipText} placement="top">
        <div className="sectionOption" onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={clickOption}>
            { !hovered && <img className="optionImage" src={normalImageRoute} alt={altText}/> }
            {  hovered && <img className="optionImage" src={hoveredImageRoute} alt={altText}/> }
        </div>
    </Tooltip> 
  );
}

export default SectionOptionComponent;
