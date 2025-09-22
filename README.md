# LegalSuite API

Una API RESTful construida con Node.js y TypeScript siguiendo los principios de Clean Architecture, implementando patrones Repository, Datasources, Adaptadores y aplicando las mejores prácticas SOLID.

## Arquitectura

Este proyecto implementa Clean Architecture.

### Patrones implementados

- Repository Pattern para abstracción de datos
- Adapter Pattern para conectar capas externas
- Dependency Injection para inversión de control
- Use Case Pattern para encapsular lógica de negocio

## Prerrequisitos

- Node.js >= 18.0.0
- Docker
- npm

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>

cd test-legalsuite
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo de configuración

Crea un archivo `.env` basándote en `.env.example`:

```bash
cp .env.example .env
```

Completa los valores necesarios en el archivo `.env` siguiendo el ejemplo proporcionado.

### 4. Configurar Docker (opcional)

Si usas Docker, inicia los servicios:

```bash
docker-compose up -d
```

### 5. Ejecutar migraciones

```bash
npm run migrate
```

### 6. Ejecutar semillas

```bash
npm run seed
```

### 7. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La API estará disponible en `http://localhost:<puerto_asignado>`

## Scripts disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar versión compilada
- `npm run migrate` - Ejecutar migraciones
- `npm run seed` - Ejecutar semillas
- `npm test` - Ejecutar tests

## Documentación

`https://documenter.getpostman.com/view/13575923/2sB3HtFwtm`
