export class User {
    constructor(idUser,   // Mandatory 
        email,       // Mandatory 
        role,        // Mandatory 
    ) {
        this.idUser = idUser;
        this.email = email;
        this.role = role;
    }
}