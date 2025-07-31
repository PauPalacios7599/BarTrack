# BarTrack

BarTrack es una aplicación web diseñada para gestionar el stock, movimientos de productos y recuentos físicos en el bar de un hotel. 

## Funcionalidades principales

- ✅ Gestión de productos: creación, modificación, eliminación, filtrado y carga desde Excel.
- 📦 Registro automático de movimientos al crear productos (entrada) o hacer salidas manuales.
- 🔍 Página de movimientos con filtro por nombre o ID.
- 📊 Dashboard con métricas clave y productos más vendidos. (Pendiente ya que requiere de las salidas que provienen del TPV del negocio)
- 🧮 Página de recuento físico con comparación contra stock del sistema y alerta por diferencia.
- 🔐 Registro, login y roles (empleado / administrador).

## Tecnologías utilizadas

### Frontend
- React + Vite
- Tailwind CSS
- Axios
- Recharts

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT, Bcrypt
- Cloudinary (para archivos, opcional)

## Instalación

### Requisitos
- Node.js
- MongoDB Atlas
- `.env` con las variables necesarias (ver ejemplo más abajo)

### Pasos

1. Clona el repositorio
2. Instala dependencias en frontend y backend
3. Configura las variables de entorno
4. Ejecuta `npm run dev` en ambos proyectos

## Variables de entorno necesarias

En `backend/.env`:

```
PORT=5000
MONGODB_URI=...
JWT_SECRET=...

```

## Autor

Creado por Pau Palacios Gordillo ✨

## Licencia

MIT
