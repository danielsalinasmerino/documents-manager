export class Section {
    constructor(idSection,   // Mandatory 
                title,       // Mandatory 
                description,
                createdAt,   // Mandatory 
                updatedAt,   // Mandatory 
                position,    // Mandatory 
                parentID,
                portalID,     // Mandatory
                documentsFormat 
                ) {
      this.idSection = idSection;
      this.title = title;
      this.description = description;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.position = position;
      this.parentID = parentID;
      this.portalID = portalID;
      this.documentsFormat = documentsFormat;
    }
}