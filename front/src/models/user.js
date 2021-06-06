export class User {
    constructor(idUser,   // Mandatory 
        email,       // Mandatory 
        role,        // Mandatory
        name, 
    ) {
        this.idUser = idUser;
        this.email = email;
        this.role = role;
        this.name = name;
    }
}