export class Document {
    constructor(idDocument,           // Mandatory 
                title,                // Mandatory 
                documentUrl,          // Mandatory 
                createdAt,            // Mandatory 
                updatedAt,            // Mandatory 
                sectionID,            // Mandatory 
                onlyURL,              // Mandatory 
                originalDocumentName, 
                ) {
      this.idDocument = idDocument;
      this.title = title;
      this.documentUrl = documentUrl;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.sectionID = sectionID;
      this.onlyURL = onlyURL;
      this.originalDocumentName = originalDocumentName;
    }
}