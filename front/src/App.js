import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';

import EditionComponent from './components/edition-component/EditionComponent';
import EditorsManagementComponent from './components/editors-management-component/EditorsManagementComponent';
import PreviewComponent from './components/preview-component/PreviewComponent';

import { getRoutingInfo, sortArrayOfSectionsByPosition } from './helpers/functions/functions';
import { readSectionsEndpoint, readDocumentsEndpoint } from './services/endpoints';
import { getRequestOptions } from './services/requestOptions';

import './App.scss';

function App() {

  const routingInfo = getRoutingInfo();

  const portalName = routingInfo.portalName;
  const routeFinal = routingInfo.routeFinal;
  const portalNameFront = routingInfo.portalNameFront;

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
        <Route path={"/" + portalName + "/gestor-documental/vista-previa"}>
          <PreviewComponent portalName={portalNameFront} sections={sections} documents={documents} />
        </Route>
        <Route path={"/" + portalName + "/gestor-documental/edicion-contenidos"}>
          <EditionComponent portalName={portalNameFront} sections={sections} documents={documents} setSectionsCallback={setSections} setDocumentsCallback={setDocuments} />
        </Route>
        <Route path={"/" + portalName + "/gestor-documental/gestion-editores"}>
          <EditorsManagementComponent portalName={portalNameFront} />
        </Route>
      </Switch>
      <Redirect to={routeFinal} />
    </Router>
  );
}

export default App;