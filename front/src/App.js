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
import { readUserLoggedInEndpoint, readSectionsEndpoint, readDocumentsEndpoint, readUsersEndpoint } from './services/endpoints';
import { getRequestOptions } from './services/requestOptions';

import './App.scss';

function App() {

  const routingInfo = getRoutingInfo();

  const portalName = routingInfo.portalName;
  const routeFinal = routingInfo.routeFinal;
  const portalNameFront = routingInfo.portalNameFront;

  const [sections, setSections] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [users, setUsers] = useState([]);
  const [casUserLogged, setCasUserLogged] = useState({});

  useEffect(() => {

    // GET CAS user logged
    fetch((readUserLoggedInEndpoint), getRequestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setCasUserLogged(result);
      })
      .catch(error => console.log('error', error));

    // GET sections based on the context
    fetch((readSectionsEndpoint + '/' + portalName), getRequestOptions)
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

    // GET all users
    fetch(readUsersEndpoint, getRequestOptions)
      .then(response => response.text())
      .then(result => {
        setUsers(JSON.parse(result));
      })
      .catch(error => console.log('error', error));
  }, [portalName]);

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
          <EditorsManagementComponent portalName={portalNameFront} users={users} setUsersCallback={setUsers}/>
        </Route>
      </Switch>
      <Redirect to={routeFinal} />
    </Router>
  );
}

export default App;