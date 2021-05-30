import React from 'react';

import SectionComponent from '../section-component/SectionComponent';

import './SectionsComponent.scss';

function SectionsComponent({ sections, documents, editableSections, editSectionCallback, deleteSectionCallback }) {

    const clickEditButton = (element, elementDocuments) => {
        editSectionCallback(element, elementDocuments);
    }

    const clickDeleteButton = (element) => {
        deleteSectionCallback(element);
    }

    const  getSectionDocuments = (idSection) => {
        return documents.filter(document => { return document.sectionID === idSection });
    }

    return (
        <div>
            { 
                sections.map(element => 
                    <SectionComponent 
                        key={element.idSection} 
                        editableSection={editableSections}
                        title={element.title} 
                        description={element.description}
                        documents={getSectionDocuments(element.idSection)}
                        clickEditButtonCallback={() => clickEditButton(element, getSectionDocuments(element.idSection))}
                        clickDeleteButtonCallback={() => clickDeleteButton(element)}/>
                )
            }
        </div>
    );
}

export default SectionsComponent;