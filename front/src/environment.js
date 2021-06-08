//
// Create the set of variables for the project
//
const DEV = false;
const PRUEBAS = true;
const PROD = false;

if((DEV + PRUEBAS + PROD) !== 1 || (DEV + PRUEBAS + PROD) > 1){
    console.log('Please, configure correctly this file. One, and only one, of the variables must be true.')
}

const endpointStartHelper = "pas/gestor-documental/api/";

const localVariables = {
    service: "http://localhost:3009",
    endpointStart: "http://localhost:3009/" + endpointStartHelper,
}

const pruebasVariables = {
    service: "https://pruebas.etsit.upm.es",
    endpointStart: "https://pruebas.etsit.upm.es/" + endpointStartHelper,
}

const prodVariables = {
    // TO DO
}

var finalVariables;

if(DEV){
    finalVariables = localVariables;
}
if(PRUEBAS){
    finalVariables = pruebasVariables;
}
if(PROD){
    finalVariables = prodVariables;
}

export const variables = finalVariables;