# Gestor documental

## Posibles despliegues

Actualmente se puede desplegar la aplicación tanto en local (o desarrollo) como en pruebas (o pruebas/*staging*). Para cada entorno existe una plantilla de variables de entorno en la carpeta **`env/`**. 
    - Si se despliega con Docker debe cambiarse en el docker-compose.override.yml la ruta del fichero con las variables de entorno correspondiente.
    - Si se despliega directamente desde el host se debe cambiar el contenido del fichero **`.env`** por el del entorno correspondiente.

### Desplegar en local

Ideal para hacer desarrollos normales o cambios, más cómodo. Para trabajar en local, habrá que realizar estos cambios:

1. (Sin Docker) El fichero _**.env**_, cambiarlo entero por el contenido del fichero _**../env/local.env**_.

Una vez hayamos completado estos pasos, es tan sencillo como correr **npm start** y tendremos nuestra aplicación corriendo (la parte del *BACK*).

- Acceder a: [http://localhost:3009/pas/gestor-documental](http://localhost:3009/pas/gestor-documental)
- Acceder a: [http://localhost:3009/pdi/gestor-documental](http://localhost:3009/pdi/gestor-documental)

### Desplegar en pruebas

Para desplegar el pruebas, es suficiente con conectarnos a _**host027**_ (via *SSH*) y desde el *root* de nuestro proyecto correr _**docker-compose build**_ y después _**docker-compose up**_.

- Acceder a: [https://pruebas.etsit.upm.es/pas/gestor-documental](https://pruebas.etsit.upm.es/pas/gestor-documental)
- Acceder a: [https://pruebas.etsit.upm.es/pdi/gestor-documental](https://pruebas.etsit.upm.es/pdi/gestor-documental)

### Desplegar en producción

- Acceder a: [https://portal.etsit.upm.es/pas/gestor-documental](https://portal.etsit.upm.es/pas/gestor-documental)
- Acceder a: [https://portal.etsit.upm.es/pdi/gestor-documental](https://portal.etsit.upm.es/pdi/gestor-documental)

## Otras consideraciones

### Popular la Base de Datos

Si se quiere, se puede popular la base de datos con una serie de datos que se encuentran en _**helpers/resources**_ (se pueden añadir nuevos usuarios, secciones... si es necesario). Popular la base de datos borra todo el contenido anterior y genera nuevo contenido basado en los archivos *mock's*. 

Para popular en _**local**_, es suficiente con correr _**npm run populate**_ en lugar de *npm start*.

Para popular en nuestro despliegue en _**pruebas**_ , es suficiente con _**cambiar en Dockerfile, CMD ["npm", "start"] por CMD ["npm", "run", "populate"]**_.

### Usuarios de rol administrador

Al hacer un despliegue en *local* o en *pruebas*, siempre se comprueba que haya al menos un usuario con derechos de administrador (en este caso, se puede consultar el archivo _**helpers/resources/adminUsers.js**_). Si existe, no pasa nada, si no, se crea. Lo normal es que exista puesto que desde el *front* no se permite al usuario editar o borrar a este tipo de usuarios.

