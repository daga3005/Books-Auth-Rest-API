# 📚 Books REST API

Una API REST construida con **Node.js** y **Express** que implementa autenticación mediante **JWT** y manejo de sesiones con cookies. El proyecto usa **PostgreSQL** como base de datos y **EJS** como motor de plantillas.

> ⚠️ **Estado del proyecto:** La autenticación (registro e inicio de sesión de usuarios) está completamente implementada así como ver la lista de libros y ver libros por ID. La funcionalidad para **registrar libros está pendiente**, por lo que el proyecto aún no está 100% funcional.

---

## 🛠️ Tecnologías usadas

- [Node.js](https://nodejs.org/)
- [Express v5](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [JSON Web Tokens (JWT)](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) — cifrado de contraseñas
- [EJS](https://ejs.co/) — motor de plantillas
- [Zod](https://zod.dev/) — validación de datos
- [dotenv](https://github.com/motdotla/dotenv) — variables de entorno
- [pnpm](https://pnpm.io/) — gestor de paquetes

---

## ✅ Requisitos previos

Antes de comenzar asegúrate de tener instalado:

- **Node.js** v18 o superior
- **pnpm** v10 o superior (`npm install -g pnpm`)
- **PostgreSQL** corriendo localmente

---

## 🚀 Instalación y configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/books-rest-api.git
cd books-rest-api
```

### 2. Instala las dependencias

```bash
pnpm install
```

### 3. Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DB_USER=postgres
DB_HOST=localhost
DB_SECRET_KEY=TU_CONTRASEÑA_DE_POSTGRES
DB_PORT=5432
DB_NAME=jwt_db

JWT_SECRET_KEY=TU_CLAVE_SECRETA_JWT
```

> Reemplaza los valores con tus propias credenciales. Nunca subas el `.env` real a GitHub.

### 4. Crea la base de datos en PostgreSQL

Conéctate a PostgreSQL y crea la base de datos que indicaste en `.env`:

```sql
CREATE DATABASE jwt_db;
```

> Si usas un nombre diferente en `DB_NAME`, asegúrate de que coincida aquí.

### 5. Inicia el servidor

```bash
pnpm dev
```

El servidor estará disponible en: `http://localhost:3000`

---

## 📁 Estructura del proyecto

```
books-rest-api/
├── index.js          # Punto de entrada de la aplicación
├── router/
│   └── routes.js     # Definición de rutas
├── .env              # Variables de entorno (no incluido en el repo)
├── package.json
└── README.md
```

---

## 🔐 Funcionalidades implementadas

- [x] Registro de usuarios con contraseña cifrada (bcrypt)
- [x] Inicio de sesión con generación de JWT
- [x] Manejo de sesión mediante cookies
- [x] Validación de datos con Zod
- [X] Listar libros 
- [ ] Registrar libros *(pendiente)*

## / EndPoints
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/register` | Registrar nuevo usuario |
| POST | `/login` | Iniciar sesión |
| GET | `/auth` | Página de autenticación ||
| GET | `/api/libros` | Obtener todos los libros |
| GET | `/api/libros/:id` | Obtener libro por ID |
---

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia el servidor en modo watch (recarga automática) |
| `pnpm lint` | Ejecuta ESLint para revisar el código |
| `pnpm lint:fix` | Ejecuta ESLint y corrige errores automáticamente |

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si quieres colaborar en las funcionalidades pendientes (CRUD de libros), abre un issue o un pull request.

---

## 📄 Licencia

ISC
