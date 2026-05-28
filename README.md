# Velvora — E-commerce Admin Panel

Panel administrativo y tienda en línea para **Velvora**, una marca de ropa urbana premium.  
La aplicación permite gestionar inventario de productos, visualizar órdenes, y navegar un catálogo con filtros interactivos.

## Funcionalidades

- **Autenticación simulada** con username + PIN (persistencia en LocalStorage)
- **CRUD de productos** vía MockAPI (crear, editar, eliminar)
- **Catálogo** con búsqueda y filtros por categoría, talla, color, ajuste y precio
- **Dashboard** con KPIs, gráfico de ventas y distribución por categoría
- **Reporte detallado** con análisis de ventas, órdenes recientes y rendimiento de productos
- **Protección de rutas** (redirección al login si no hay sesión)

## Stack Tecnológico

| Tecnología | Versión |
|---|---|
| React | 19 |
| Vite | 8 |
| react-router-dom | 7 |
| Tailwind CSS | 4 |
| SweetAlert2 | 11 |
| Lucide React | 1 |
| Axios | 1 |

## API Mockeada

La aplicación consume una API REST simulada alojada en MockAPI:

```
https://6a150b2a91ff9a63de075a78.mockapi.io
```

Endpoints disponibles:

| Endpoint | Recurso |
|---|---|
| `/products` | Productos del catálogo |
| `/order` | Órdenes de compra |

Puedes modificar los datos directamente desde el panel de MockAPI.

## Instalación y Ejecución

```bash
# Clonar el repositorio
git clone https://github.com/SerelbochaD3773/e-commerce-clothes-.git
cd e-commerce-clothes-

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
├── context/          # Contextos de React (CartContext)
├── helpers/          # Utilidades (local-storage, alerts)
├── layouts/          # Layouts (StoreLayout, AdminLayout)
├── pages/            # Páginas de la aplicación
├── routes/           # Configuración de rutas
└── services/         # Conexión con API (MockAPI)
```

## Convención de Ramas

```
main ── develop ── feature/*
```

- `main` — Código listo para producción
- `develop` — Integración de características
- `feature/*` — Ramas de desarrollo
- `fix/*` — Correcciones de bugs
