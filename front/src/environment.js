//
// Create the set of variables for the project
//
let urljoin = require('url-join');
const endpointStartHelper = "pas/gestor-documental/api/";

const devServerEndpoint = "http://localhost:3009";
const serverEndpoint = process.env.NODE_ENV === "development" ? devServerEndpoint : window.location.origin
const finalVariables = {
    service: window.location.origin,
    endpointStart: urljoin(serverEndpoint, endpointStartHelper)
}
export const variables = finalVariables;