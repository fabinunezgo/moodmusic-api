
# MoodMusic API

API REST desarrollada en Node.js que recomienda música con base en emociones humanas. Incluye autenticación con JWT, autorización por roles, CRUDs completos, middleware personalizado, documentación Swagger y protección de seguridad.



## Objetivos del Proyecto

- Aplicar los conocimientos sobre REST APIs, middlewares, seguridad y modularidad.

- Implementar arquitectura escalable basada en rutas, controladores, servicios y modelos.

- Integrar autenticación mediante JWT y autorización basada en roles.

- Asegurar la robustez, seguridad y control mediante middlewares externos y personalizados.

- Crear un proyecto original con valor funcional y aplicabilidad real.

- Documentar profesionalmente todos los endpoints con Swagger UI.



## Arquitectura del Proyecto
    moodmusic-api/
    ├ node_modules
    └ src/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── authController.js
    │   └── cancionesController.js
    │   └── emocionesController.js
    │   └── rolesController.js
    │   └── usuariosController.js
    ├── Middleware/
    │   └── auth.middleware.js
    │   └── error.middleware.js
    │   └── registro.middleware.js
    │   └── role.middleware.js
    │   └── validator.middleware.js
    ├── models/
    │   └── Cancion.js
    │   └── Emocion.js
    │   └── Playlist.js
    │   └── PlaylistCancion.js
    │   └── Rol.js
    │   └── Usuario.js
    ├── routes/
    │   └── auth.routes.js
    │   └── canciones.routes.js
    │   └── emociones.routes.js
    │   └── roles.routes.js
    │   └── usuarios.routes.js
    ├── services/
    │   └── auth.service.js
    │   └── canciones.service.js
    │   └── emociones.service.js
    │   └── roles.service.js
    │   └── usuarios.service.js
    ├── swagger/
    │   └── swagger.js
    │   └── swagger.yaml
    ├── validators/
    │   └── auth.validators.js
    │   └── canciones.validators.js
    │   └── emociones.validators.js
    │   └── usuarios.validators.js
    ├── app.js
    ├── .env
    ├── package-lock.json
    ├── package.json
    ├── server.js

## Documetación en Swagger UI

http://localhost:3000/docs/

## Despliegue de la API 
https://www.phpmyadmin.co/



## Entidades del Proyecto

- Usuarios
- Roles
- Emociones
- Canciones

Cada una de estas entidades cumple con su respectivo CRUD completo y endpoints. En total cumple con los más de 15 endpoints solicitados.


## Seguridad Implementada
 - JWT Authentication
 - Autorización basada en roles
 - CORS configurado
 - Rate Limiting
 - Validación de datos
 - Middleware personalizado
 
## Tecnologías Utilizadas

**Backend:** Node.js, Express.js, MySQL, JWT, bcrypt

**Seguridad:** Helmet, Rate Limit, CORS, Middleware personalizado

**Documentación:** Swagger UI.


## Instalación y Ejecución

1️. Clonar el repositorio
git clone https://github.com/fabinunezgo/moodmusic-api.git

2️. Instalar dependencias
npm install

3️. Crear archivo .env
PORT=3000
JWT_SECRET=supersecreto123
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=moodmusic

4️. Levantar el servidor en modo desarrollo
npm run dev

5️. Acceder a la documentación
http://localhost:3000/docs


## Autores 

- [Fabiana Núñez](https://www.github.com/fabinunezgo)
- [Lesly Araya](https://www.github.com/LeslyAraya)
- [Thyfanny Martinez ](https://www.github.com/Maryel16-MG) 
- [Mariana Pacheco](https://www.github.com/Pachecopacha)

