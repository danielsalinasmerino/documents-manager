//
// Create the set of variables for the project
//
const dockerDeploy = true; //change to false when you are working on local 

export const variables = {
    endpointStart: (dockerDeploy) ? ('https://pruebas.etsit.upm.es/api/') : ("http://localhost:8080/api/"),
    //port: 3009, (YOU CAN CHECK THIS ON docker-compose.yml)
}