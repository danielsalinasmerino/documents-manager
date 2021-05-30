import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';

import EditionComponent from './components/edition-component/EditionComponent';
import PreviewComponent from './components/preview-component/PreviewComponent';

import { sortArrayOfSectionsByPosition } from './helpers/functions/functions';
import { readSectionsEndpoint, readDocumentsEndpoint } from './services/endpoints';
import { getRequestOptions } from './services/requestOptions';

import './App.scss';

function App() {

  const portalName = 'PAS';

  const [sections, setSections] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {

    // GET all sections
    fetch(readSectionsEndpoint, getRequestOptions)
      .then(response => response.text())
      .then(result => {
        setSections(sortArrayOfSectionsByPosition(JSON.parse(result)));
      })
      .catch(error => console.log('error', error));

    // GET all documents
    fetch(readDocumentsEndpoint, getRequestOptions)
      .then(response => response.text())
      .then(result => {
        setDocuments(JSON.parse(result));
      })
      .catch(error => console.log('error', error));
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/pas/gestor-documental/preview">
          <PreviewComponent portalName={portalName} sections={sections} documents={documents}/>
        </Route>
        <Route path="/pas/gestor-documental/edition">
          <EditionComponent portalName={portalName} sections={sections} documents={documents} setSectionsCallback={setSections} setDocumentsCallback={setDocuments}/>
        </Route>
      </Switch>
      <Redirect to="/pas/gestor-documental/edition"/>
    </Router>
  );
}

export default App;