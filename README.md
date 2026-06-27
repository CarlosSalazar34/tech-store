# Tech Store 🛒

Un proyecto de comercio electrónico para una tienda de tecnología. Consiste en una aplicación full-stack con un frontend moderno construido en Next.js y un backend robusto en FastAPI.

## Tecnologías Principales 🚀

### Frontend
- **Framework:** Next.js (versión 16.2.9)
- **Librería de UI:** React 19
- **Estilos:** Tailwind CSS 4
- **Lenguaje:** TypeScript

### Backend
- **Framework:** FastAPI
- **Base de Datos:** SQLAlchemy (ORM)
- **Pagos:** Integración con Stripe para procesamiento de pagos.
- **Lenguaje:** Python

## Estructura del Proyecto 📁

El repositorio está dividido en dos partes principales:

- `/frontend`: Contiene toda la lógica de la interfaz de usuario, componentes de React y páginas de Next.js.
- `/backend`: Contiene la lógica del servidor, modelos de la base de datos (SQLAlchemy) y la integración de la API (FastAPI y Stripe).

## Funcionalidades Principales ✨

- Listado de productos tecnológicos.
- Navegación por categorías y búsqueda.
- Carrito de compras y gestión del estado global (Context API).
- Integración de pasarela de pagos con Stripe (Checkout Sessions).

## Cómo ejecutar el proyecto 🛠️

### Frontend
1. Navega a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   pnpm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

### Backend
1. Navega a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Crea un entorno virtual e instala las dependencias (necesitarás configurar tus variables de entorno, por ejemplo `.env` con la API key de Stripe: `STRIPE_API_KEY`).
3. Ejecuta el servidor de FastAPI con Uvicorn:
   ```bash
   python app.py
   # o
   uvicorn app:app --reload
   ```
   La API estará disponible en `http://localhost:8000`.
