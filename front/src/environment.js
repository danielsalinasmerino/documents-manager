//
// Create the set of variables for the project
//
const dockerDeploy = true; //change to false when you are working on local 

export const variables = {
    service: (dockerDeploy) ? ('https://pruebas.etsit.upm.es') : ("http://localhost:3009"),
    endpointStart: (dockerDeploy) ? ('https://pruebas.etsit.upm.es/pas/gestor-documental/api/') : ("http://localhost:3009/pas/gestor-documental/api/"),
    //port: 3009, (YOU CAN CHECK THIS ON docker-compose.yml)
}