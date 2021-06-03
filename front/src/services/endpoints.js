import { variables } from '../environment';

const endpointStart = variables.endpointStart;

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