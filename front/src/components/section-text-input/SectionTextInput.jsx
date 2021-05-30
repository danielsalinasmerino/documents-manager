import React from 'react';


function SectionTextInput({ titleText, errorMark, styleValue, placeHolderText, identifier, valueToShow, onChangeCallback, textAreaMode = false,
                            errorLengthSpan = false, maxContentLength = 0 }) {

    

    return (
        <div className="inputWrapper">
            <p className="inputTitle">{titleText}</p>
            { (!textAreaMode) && <input
                className={errorMark ? (styleValue + " error") : (styleValue)}
                placeholder={placeHolderText}
                type="text"
                id={identifier}
                value={valueToShow}
                onChange={(e) => onChangeCallback(e)}/>}
            { (textAreaMode) && <textarea
                className={errorMark ? (styleValue + " error") : (styleValue)}
                placeholder={placeHolderText}
                type="text"
                id={identifier}
                value={valueToShow}
                onChange={(e) => onChangeCallback(e)}/>}
            { (errorLengthSpan) && <span className={errorMark ? "contentLength errorContentLength" : "contentLength"}>{valueToShow.length}/{maxContentLength}</span>}
        </div>
    );
}

export default SectionTextInput;