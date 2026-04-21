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




# Cómo probar la Autenticación JWT

Has implementado un sistema de autenticación básico. Aquí te explico cómo probarlo paso a paso usando herramientas como Postman, Insomnia o `curl`.

## 1. Preparación de los Endpoints

Asegúrate de que tu servidor esté corriendo:
```bash
npm run start:dev
```

### Endpoints disponibles:
- `POST /users`: Crear un usuario (público)
- `POST /auth/login`: Obtener el token JWT (público)
- `GET /users`: Listar usuarios (protegido con JWT)

---

## 2. Flujo de Prueba

### Paso A: Crear un usuario
Como todavía no tienes usuarios en la base de datos (o para probar uno nuevo), crea uno primero.

**Request:**
- **URL:** `http://localhost:3000/users`
- **Method:** `POST`
- **Body (JSON):**
  ```json
  {
    "name": "Juan Sanz",
    "email": "juan@example.com"
  }
  ```

### Paso B: Iniciar Sesión (Obtener el Token)
Usa el email del usuario creado para obtener tu Token.

**Request:**
- **URL:** `http://localhost:3000/auth/login`
- **Method:** `POST`
- **Body (JSON):**
  ```json
  {
    "email": "juan@example.com"
  }
  ```

**Response:**
Recibirás un objeto con el `access_token`. **Cópialo**.

### Paso C: Acceder a la ruta protegida
Intenta acceder a la lista de usuarios.

**Intento 1: Sin Token (Debe fallar)**
- **URL:** `http://localhost:3000/users`
- **Method:** `GET`
- **Resultado esperado:** `401 Unauthorized`

**Intento 2: Con Token (Debe funcionar)**
- **URL:** `http://localhost:3000/users`
- **Method:** `GET`
- **Headers:** 
  - `Authorization`: `Bearer TU_TOKEN_AQUI`
- **Resultado esperado:** Lista de usuarios en JSON.

---

## 3. Pruebas Unitarias (AuthGuard)

Si quieres probar el `AuthGuard` de forma automatizada, puedes crear un archivo `.spec.ts». Aquí tienes un ejemplo de cómo se vería la lógica central en Jest:

```typescript
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext } from '@nestjs/common';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'superSecretKey' });
    guard = new AuthGuard(jwtService);
  });

  it('should return true when token is valid', async () => {
    const token = jwtService.sign({ sub: 1 });
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { authorization: `Bearer ${token}` }
        })
      })
    } as ExecutionContext;

    expect(await guard.canActivate(context)).toBe(true);
  });

  it('should return false or throw when token is missing', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {}
        })
      })
    } as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrow();
  });
});
```
