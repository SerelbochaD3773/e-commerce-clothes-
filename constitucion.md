---
title: Constitución del Proyecto — Panel Admin E-commerce (Inventario)
version: 2.0.0
status: vigente
ultima_actualizacion: 2026-05-24
---

# Constitución del Proyecto

> Especificación viva del sistema. Cada cambio en la arquitectura debe reflejarse aquí antes de implementarse (Spec-Driven Development).

---

## 1. Identidad

| Campo       | Valor                                  |
|-------------|----------------------------------------|
| Nombre      | Panel Admin E-commerce (Inventario)    |
| Dominio     | Gestión de catálogo de tienda en línea |
| Repositorio | `comercio-electronico`                 |

---

## 2. Stack tecnológico

| Capa         | Tecnología        | Versión | Propósito                      |
|-------------|-------------------|---------|--------------------------------|
| Framework   | React             | 19      | UI declarativa                  |
| Metaframework | Vite            | 8       | Build tool / HMR                |
| Ruteo       | React Router      | 7       | SPA navigation                  |
| Estilos     | Tailwind CSS      | 4       | Utility-first CSS               |
| HTTP        | Axios             | 1.15    | Cliente HTTP                    |
| Alertas     | SweetAlert2       | 11      | Modales y notificaciones        |
| Linter      | ESLint            | 10      | Calidad de código               |
| API Mock    | MockAPI / JSON Server | —    | Backend REST simulado           |

### 2.1 Justificación

- **React 19 + Vite 8**: build ultrarrápido, HMR instantáneo.
- **React Router 7**: ruteo declarativo con layouts anidados y protectores de ruta.
- **Tailwind 4**: utility-first, cero configuración, diseño responsivo rápido.
- **SweetAlert2**: alertas modales consistentes (obligatorio para confirmación DELETE).
- **Axios**: interceptores y mejor manejo de errores que fetch nativo.
- **MockAPI**: backend REST funcional sin servidor propio.

---

## 3. Arquitectura

### 3.1 Estructura de carpetas

```
comercio-electronico/
├── .agent/
│   └── skills/
│       └── crear-skills/
├── public/
├── src/
│   ├── assets/
│   ├── components/            # Componentes reutilizables
│   │   ├── LoadingSpinner.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductForm.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── SearchBar.jsx
│   ├── helpers/               # Funciones utilitarias puras
│   │   ├── alerts.js
│   │   ├── generator.js
│   │   └── local-storage.js
│   ├── layouts/               # Layouts reutilizables
│   │   └── AdminLayout.jsx
│   ├── pages/                 # Vistas completas
│   │   ├── LoginPage.jsx
│   │   └── ProductsPage.jsx
│   ├── routes/                # Configuración de rutas
│   │   └── routerApp.jsx
│   └── services/              # Capa de comunicación con API
│       └── productApi.js
├── constitucion.md
├── especificaciones.md
├── plan.md
├── package.json
└── vite.config.js
```

### 3.2 Árbol de componentes

```
<App>
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/productos" element={<ProductsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
</App>
```

### 3.3 Árbol interno de ProductsPage

```
<ProductsPage>
  <SearchBar />                     <!-- Filtro inline por nombre/categoría -->
  <button>Agregar producto</button> <!-- Abre modal con ProductForm -->
  <div.grid>
    <ProductCard />                 <!-- Por cada producto -->
  </div.grid>
  <Modal>                           <!-- Overlay para crear/editar -->
    <ProductForm mode="create|edit" />
  </Modal>
  <LoadingSpinner />                <!-- Mientras carga GET -->
</ProductsPage>
```

### 3.4 Flujo de datos

```
[Usuario] → (LoginPage) → localStorage.setItem('session')
    → (redirige a) → [ProductsPage]
      → useEffect → [services/productApi.js] → GET /productos
        → (data) → useState → render <ProductCard />
        → (error) → SweetAlert2 error
[Usuario] → (SearchBar) → useState → filter(productos, query) → render filtrado
[Usuario] → (ProductForm) → POST/PUT /productos → SweetAlert2 éxito → re-fetch
[Usuario] → (DELETE) → SweetAlert2 confirmación → DELETE /productos/:id
    → SweetAlert2 éxito → re-fetch
```

---

## 4. Rutas

| Path         | Componente      | Protegida | Descripción                     |
|--------------|-----------------|-----------|---------------------------------|
| `/login`     | `LoginPage`     | No        | Autenticación mock (usuario + PIN) |
| `/productos` | `ProductsPage`  | Sí        | CRUD + grid + búsqueda          |
| `*`          | `<Navigate>`    | —         | Redirige a `/login`             |

---

## 5. Modelo de datos

### 5.1 Producto (MockAPI)

```json
{
  "id": "1",
  "nombre": "Camiseta Urban Negra",
  "precio": 29.99,
  "categoria": "Ropa",
  "stock": 150,
  "imagen": "https://placehold.co/300x300/1a1a2e/ffffff?text=Producto"
}
```

Categorías: `Ropa`, `Electrónica`, `Hogar`, `Deportes`, `Accesorios`.

### 5.2 Sesión (LocalStorage)

```json
{
  "username": "admin",
  "pin": "1234",
  "loggedAt": "2026-05-24T12:00:00Z"
}
```

---

## 6. Servicios / API

Base URL: `https://[instancia].mockapi.io/api/v1/`

| Método | Endpoint           | Descripción                |
|--------|--------------------|----------------------------|
| GET    | `/productos`       | Listar todos los productos |
| GET    | `/productos/:id`   | Obtener un producto        |
| POST   | `/productos`       | Crear nuevo producto       |
| PUT    | `/productos/:id`   | Actualizar producto        |
| DELETE | `/productos/:id`   | Eliminar producto          |

---

## 7. Helpers

| Archivo            | Exportaciones                          | Propósito                          |
|--------------------|----------------------------------------|------------------------------------|
| `alerts.js`        | `questionAlert`, `errorAlert`, `redirectAlert`, `successAlert` | Alertas SweetAlert2 reutilizables |
| `generator.js`     | `generateToken`                        | Genera tokens aleatorios           |
| `local-storage.js` | `save`, `get`, `remove`, `clear`       | Wrapper de localStorage            |

---

## 8. Convenciones de código

### 8.1 Nombramiento

- **Archivos**: `PascalCase.jsx` para componentes, `camelCase.js` para utilerías.
- **Funciones**: `camelCase`, componentes en `PascalCase`.
- **Rutas**: plural (`/productos`).

### 8.2 Estilo

- Tailwind CSS — sin CSS modulares ni CSS-in-JS.
- Props desestructuradas en la firma.
- `export default` para componentes; `export` nombrado para helpers.

### 8.3 Comentarios

- No agregar comentarios en código. El código debe ser auto-documentado.
- `constitucion.md`, `especificaciones.md` y `plan.md` son los únicos documentos de especificación.

---

## 9. Backlog / Especificaciones futuras

- [ ] Paginación del inventario
- [ ] Ordenamiento por precio, stock, nombre
- [ ] Exportar inventario a CSV
- [ ] Tests unitarios (Vitest + React Testing Library)
- [ ] Panel de estadísticas (Dashboard)
- [ ] Variables de entorno (`.env`)

---

## 10. Procedimiento de actualización

1. Edita la sección correspondiente en este archivo **primero**.
2. Describe el cambio y la razón.
3. Incrementa la `version` en el frontmatter.
4. Implementa los cambios en el código.

> Cualquier PR que modifique la estructura del proyecto debe incluir la actualización de `constitucion.md`.
