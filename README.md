# NestJS User Management API


API REST básica construida con **NestJS**, **TypeORM** y **SQLite**.

## Requisitos Implementados

- **Entidad `User`**: `id` auto-generado, `name` y `email` único.
- **`UsersController`**:
  - `GET /users`: Recupera todos los usuarios.
  - `POST /users`: Crea un usuario nuevo.
- **`UsersService`**: Lógica de persistencia encapsulada.
- **Configuración**: TypeORM configurado con SQLite para una ejecución inmediata sin bases de datos externas.

## Endpoints

### 1. Obtener Usuarios
- **URL**: `GET /users`
- **Respuesta**: `Array<User>`

### 2. Crear Usuario
- **URL**: `POST /users`
- **Cuerpo (JSON)**:
  ```json
  {
    "name": "Nombre de Usuario",
    "email": "usuario@ejemplo.com"
  }
  ```

## Instalación y Ejecución

1. **Instalar dependencias**:
   ```bash
   npm install
   ```
docker-compose up --build

docker-compose down

2. **Ejecutar servidor**:
   ```bash
   npm run start:dev
   ```

El servidor estará disponible en `http://localhost:3000`.


He creado el proyecto NestJS siguiendo todos los requisitos solicitados. El sistema utiliza TypeORM con una base de datos SQLite (archivo local db.sqlite) para facilitar la ejecución inmediata sin necesidad de configurar servidores de base de datos externos.

Detalles de la Implementación:
Entidad User: Definida en src/users/user.entity.ts con campos id, name y email (único).
Servicio UsersService: Implementado en src/users/users.service.ts utilizando @InjectRepository para manejar la persistencia.
Controlador UsersController: Ubicado en src/users/users.controller.ts con los métodos GET /users y POST /users.
Módulo UsersModule: Agrupa la funcionalidad y se integra en el AppModule.
Configuración: AppModule incluye TypeOrmModule.forRoot configurado para sincronizar automáticamente el esquema de la base de datos.
Instrucciones para ejecutar:
Instalar dependencias (ya preparadas en el entorno):
bash
npm install
Iniciar el servidor:
bash
npm run start:dev
Probar la API:
POST /users: Cuerpos JSON como {"name": "Zodde", "email": "zodde@example.com"}.
GET /users: Devuelve la lista completa de usuarios creados.
El proyecto está listo para ser expandido y sigue las mejores prácticas de TypeScript y NestJS.



# Prompt 

Crea un proyecto en NestJS con TypeORM que implemente una API REST básica para manejar usuarios. 

Requisitos:
- Entidad `User` con los campos: id (autogenerado), name (string), email (string único).
- Controlador `UserController` con dos endpoints:
  - `GET /users`: devuelve todos los usuarios.
  - `POST /users`: crea un nuevo usuario a partir de un objeto JSON.
- Servicio `UserService` que maneje la lógica de persistencia usando el repositorio de TypeORM.
- Usa decoradores de NestJS para definir controlador, servicio y entidad.
- El código debe estar en TypeScript y seguir buenas prácticas de NestJS.

crea un archivo requer.http para ejecutar en mi editor el codigo con REST API 
Probar la API:
POST /users: Cuerpos JSON como {"name": "Zodde", "email": "zodde@example.com"}.
GET /users: Devuelve la lista completa de usuarios creados.