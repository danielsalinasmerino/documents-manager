import { variables } from '../environment';

const endpointStart = variables.endpointStart;

// User logged endpoint
export const readUserLoggedInEndpoint = endpointStart + "user-logged";
// Upload document
export const uploadFileEndpoint = endpointStart + "upload-file";

// Sections related endpoints
export const createSectionEndpoint = endpointStart + "sections";
export const readSectionsEndpoint = endpointStart + "sections";
//export const readSectionsPasEndpoint = endpointStart + "sections/pas";
//export const readSectionsPdiEndpoint = endpointStart + "sections/pdi";
//export const readSectionsEstudiantesEndpoint = endpointStart + "sections/estudiantes";
export const updateSectionByIdEndpoint = endpointStart + "sections";
export const deleteSectionByIdEndpoint = endpointStart + "sections/delete";

// Documents related endpoints
export const createDocumentEndpoint = endpointStart + "documents";
export const readDocumentsEndpoint = endpointStart + "documents";
export const updateDocumentByIdEndpoint = endpointStart + "documents";
export const deleteDocumentByIdEndpoint = endpointStart + "documents/delete";

// Users related endpoints
export const createUserEndpoint = endpointStart + "users";
export const readUsersEndpoint = endpointStart + "users";
export const updateUserByIdEndpoint = endpointStart + "users";
export const deleteUserByIdEndpoint = endpointStart + "users/delete";