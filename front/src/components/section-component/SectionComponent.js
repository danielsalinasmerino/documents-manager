import React from 'react';

import DocumentsComponent from '../documents-component/DocumentsComponent';
import SectionOptionsComponent from '../section-options-component/SectionOptionsComponent';

import './SectionComponent.scss';

const format = "";

function SectionComponent({ title, description, documents, editableSection, clickEditButtonCallback, clickDeleteButtonCallback }) {

  return (
    <div className={editableSection ? "sectionWrapper editable" : "sectionWrapper"}>
      <div className="sectionMain">
        <p className="sectionTittle">{title}</p>
        <p className="sectionDescription">{description}</p>
        <DocumentsComponent documents={documents} format={format || "list"} />
      </div>
      {
        editableSection && <SectionOptionsComponent clickEditButtonCallback={clickEditButtonCallback} clickDeleteButtonCallback={clickDeleteButtonCallback} />
      }
    </div>
  );
}

export default SectionComponent;