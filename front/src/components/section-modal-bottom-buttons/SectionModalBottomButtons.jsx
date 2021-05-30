import React from 'react';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

function SectionModalBottomButtons({ cancelText, cancelCallback, confirmText, confirmCallback }) {

    

    return (
        <div className="bottomWrapper">
            <StyledButtonComponent
                buttonText={cancelText}
                clickButton={cancelCallback}>
            </StyledButtonComponent>
            <StyledButtonComponent
                buttonText={confirmText}
                clickButton={confirmCallback}>
            </StyledButtonComponent>
        </div>
    );
}

export default SectionModalBottomButtons;