//
// Create the set of variables for the project
//
const dockerDeploy = true; //change to false when you are working on local 

const variables = {
    port: 3009,
    connection: (dockerDeploy) ? ('mongodb://mongo:27017/documents-manager') : ('mongodb://localhost:27017/documents-manager'),
    //nameOfMongoInstance: mongo (YOU CAN CHECK THIS ON docker-compose.yml)
    //mongoPort: 27017 (YOU CAN CHECK THIS ON docker-compose.yml)
}

module.exports = { variables };