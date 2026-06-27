# Tech Store 🛒 (Sí, otra tienda online, pero esta es mejor)

Sí, es la misma tienda que probablemente has visto un millón de veces en tutoriales, pero esta está hecha en Next.js con un diseño que no te hará llorar sangre. La verdad, siento que un e-commerce es el proyecto perfecto para aprender (y para sufrir con el manejo del estado). Consiste en una aplicación full-stack con un frontend moderno construido en Next.js y un backend robusto (o al menos lo intenta) en FastAPI.

## Tecnologías Principales 🚀 (Con las que me peleo a diario)

### Frontend (Donde las cosas se ven bonitas)
- **Framework:** Next.js (versión 16.2.9) - Porque usar React a secas ya pasó de moda.
- **Librería de UI:** React 19 - Lo último de lo último.
- **Estilos:** Tailwind CSS 4 - Para no escribir un solo archivo `.css` y aún así centrar un div (a veces).
- **Lenguaje:** TypeScript - Para que el compilador me grite cuando me equivoco de tipo (y lo agradezco).

### Backend (Donde ocurre la magia negra)
- **Framework:** FastAPI - Rápido, furioso y en Python.
- **Base de Datos:** SQLAlchemy (ORM) - Porque escribir SQL crudo da miedito.
- **Pagos:** Integración con Stripe - Para que la gente (ojalá) me dé su dinero.
- **Lenguaje:** Python - 🐍 (Suficiente dicho).

## Estructura del Proyecto 📁 (El orden dentro del caos)

El repositorio está dividido en dos partes principales, como debe ser para no volvernos locos:

- `/frontend`: Contiene toda la lógica de la interfaz de usuario, componentes de React y páginas de Next.js (y algunos `console.log` olvidados).
- `/backend`: Contiene la lógica del servidor, modelos de la base de datos (SQLAlchemy) y la integración de la API para que el frontend no hable solo.

## Funcionalidades Principales ✨ (Lo que en teoría funciona)

- Listado de productos tecnológicos (que probablemente no te alcance para comprar).
- Navegación por categorías y búsqueda (para encontrar rápido lo que no vas a comprar).
- Carrito de compras y gestión del estado global usando Context API (gracias por no romperte en cada render).
- Integración de pasarela de pagos con Stripe (para cobrarte en dólares virtuales).

## Cómo ejecutar el proyecto 🛠️ (Si te atreves)

### Frontend
1. Navega a la carpeta del frontend, no seas tímido:
   ```bash
   cd frontend
   ```
2. Instala las dependencias (ve por un café, esto puede tardar):
   ```bash
   pnpm install
   ```
3. Ejecuta el servidor de desarrollo y reza para que todo compile a la primera:
   ```bash
   pnpm dev
   ```
   La aplicación estará disponible en `http://localhost:3000`. ¡Ve y admírala!

### Backend
1. Navega a la carpeta del backend, donde las cosas se ponen serias:
   ```bash
   cd backend
   ```
2. Crea un entorno virtual e instala las dependencias. ¡Ah! Y no olvides configurar tus variables de entorno, por ejemplo `.env` con la API key de Stripe (`STRIPE_API_KEY`), o el backend te tirará un error que no querrás leer.
3. Ejecuta el servidor de FastAPI con Uvicorn (el unicornio veloz):
   ```bash
   python app.py
   # o si te sientes pro:
   uvicorn app:app --reload
   ```
   La API estará disponible en `http://localhost:8000`. ¡Listo para recibir peticiones!
