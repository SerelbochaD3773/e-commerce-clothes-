---
title: Especificaciones — Panel Admin E-commerce (Inventario)
version: 1.0.0
status: vigente
ultima_actualizacion: 2026-05-24
---

# Especificaciones del Sistema

## 1. Especificaciones funcionales

### 1.1 Mock de Autenticación

| ID     | EF-01                           |
|--------|---------------------------------|
| Nombre | Inicio de sesión                |
| Descripción | El usuario ingresa "Nombre de Usuario" y "PIN" (cualquier valor) en `/login` |
| Criterios | Al enviar, guardar `{ username, pin, loggedAt }` en LocalStorage y redirigir a `/productos`. Sin PIN no se autentica (campo requerido). |

| ID     | EF-02                           |
|--------|---------------------------------|
| Nombre | Protección de rutas             |
| Descripción | Si no hay sesión en LocalStorage, redirigir automáticamente a `/login` |
| Criterios | Implementar un componente `<ProtectedRoute>` que verifique `localStorage` antes de renderizar el panel. |

| ID     | EF-03                           |
|--------|---------------------------------|
| Nombre | Cerrar sesión                   |
| Descripción | Botón en el Navbar que elimina los datos de LocalStorage y redirige a `/login` |
| Criterios | Al hacer clic → `localStorage.clear()` → navegación a `/login`. |

| ID     | EF-04                           |
|--------|---------------------------------|
| Nombre | Mostrar usuario logueado        |
| Descripción | El Navbar muestra el nombre del usuario autenticado |
| Criterios | Leer `username` de LocalStorage y renderizarlo en el Navbar. |

### 1.2 CRUD de Productos

| ID     | EF-05                           |
|--------|---------------------------------|
| Nombre | GET — Listar inventario         |
| Descripción | Vista `/productos` que muestra todos los productos en grid de tarjetas o tabla |
| Criterios | Llamar a `GET /productos` de MockAPI/JSON Server al montar el componente. Mostrar spinner mientras carga. |

| ID     | EF-06                           |
|--------|---------------------------------|
| Nombre | POST — Crear producto           |
| Descripción | Formulario completo para añadir producto con validaciones |
| Criterios | Campos: nombre, precio, categoría, stock, imagen. Validar precio ≥ 0, stock ≥ 0. Mostrar alerta de éxito con SweetAlert2. |

| ID     | EF-07                           |
|--------|---------------------------------|
| Nombre | PUT/PATCH — Editar producto     |
| Descripción | Actualizar precio y/o stock de un producto existente |
| Criterios | Modal o formulario inline. Actualizar vía `PUT /productos/:id`. Validar numéricos no negativos. |

| ID     | EF-08                           |
|--------|---------------------------------|
| Nombre | DELETE — Eliminar producto      |
| Descripción | Borrar producto del catálogo    |
| Criterios | **Confirmación obligatoria** con SweetAlert2 (`questionAlert`). Si OK → `DELETE /productos/:id`. Alerta de éxito posterior. |

### 1.3 Búsqueda y filtro

| ID     | EF-09                           |
|--------|---------------------------------|
| Nombre | Filtro por nombre o categoría   |
| Descripción | Input que filtra productos cargados del inventario |
| Criterios | Usar `useState` + `filter()` del lado del cliente. Filtrar por `nombre` o `categoria`. Sin recargar API. |

---

## 2. Especificaciones de rutas

| Path          | Componente         | Protegida | Descripción                     |
|---------------|--------------------|-----------|---------------------------------|
| `/login`      | `LoginPage`        | No        | Formulario de autenticación     |
| `/productos`  | `ProductsPage`     | Sí        | Grid/tabla + CRUD + búsqueda    |

- `<ProtectedRoute>` envuelve las rutas del panel.
- Ruta comodín `*` redirige a `/login` o a una página 404.

---

## 3. Especificaciones de componentes

### 3.1 Árbol de componentes

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

### 3.2 Catálogo de componentes

| Componente       | Propósito                                    |
|------------------|----------------------------------------------|
| `LoginPage`      | Formulario username + PIN + validación       |
| `ProtectedRoute` | HOC que verifica sesión en LocalStorage      |
| `AdminLayout`    | Layout con Navbar + slot para children       |
| `Navbar`         | Muestra username + botón cerrar sesión       |
| `ProductsPage`   | Grid/tabla + modal formulario + buscador     |
| `ProductCard`    | Tarjeta individual (imagen, nombre, precio, stock, acciones) |
| `ProductForm`    | Formulario reutilizable para crear/editar    |
| `SearchBar`      | Input de búsqueda con filtro inline          |
| `LoadingSpinner` | Indicador visual de carga                    |

### 3.3 ProductForm — Validaciones

| Campo      | Tipo     | Requerido | Validación                |
|------------|----------|-----------|---------------------------|
| nombre     | texto    | sí        | Longitud ≥ 1              |
| precio     | número   | sí        | ≥ 0                       |
| categoria  | texto    | sí        | Selección de lista fija   |
| stock      | número   | sí        | ≥ 0                       |
| imagen     | URL/texto| no        | Si se ingresa, debe ser URL válida |

---

## 4. Modelo de datos

### 4.1 Entidad Producto

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

Categorías válidas: `Ropa`, `Electrónica`, `Hogar`, `Deportes`, `Accesorios`.

### 4.2 Sesión (LocalStorage)

```json
{
  "username": "admin",
  "pin": "1234",
  "loggedAt": "2026-05-24T12:00:00Z"
}
```

---

## 5. API Contract

Base URL: `https://[tu-instancia].mockapi.io/api/v1/`

| Método | Endpoint              | Body                           | Respuesta éxito              |
|--------|-----------------------|--------------------------------|------------------------------|
| GET    | `/productos`          | —                              | `Producto[]`                 |
| GET    | `/productos/:id`      | —                              | `Producto`                   |
| POST   | `/productos`          | `{ nombre, precio, categoria, stock, imagen }` | `Producto` (con id) |
| PUT    | `/productos/:id`      | `{ nombre, precio, categoria, stock, imagen }` | `Producto`          |
| DELETE | `/productos/:id`      | —                              | `{}`                         |

Códigos de error esperados: `400` (validación), `404` (no encontrado), `500` (servidor).

---

## 6. Estados de UI por componente

### ProductsPage

| Estado       | Indicador                                    |
|--------------|----------------------------------------------|
| Cargando     | `<LoadingSpinner />` + texto "Cargando productos..." |
| Vacío        | Mensaje "No hay productos registrados" + botón "Agregar primero" |
| Error        | Alerta SweetAlert2 con mensaje + botón reintentar |
| Con datos    | Grid de `<ProductCard />` + `<SearchBar />`  |

### ProductForm (crear/editar)

| Estado       | Indicador                                    |
|--------------|----------------------------------------------|
| Envío        | Botón deshabilitado + texto "Guardando..."   |
| Error        | SweetAlert2 con descripción del error        |
| Éxito        | SweetAlert2 "Producto guardado" + cerrar modal |

---

## 7. Maquetación (UI)

| Elemento     | Especificación                               |
|--------------|----------------------------------------------|
| Login        | Card centrada, fondo degradado oscuro        |
| Navbar       | Sticky top, sombra, username a la izquierda, botón cerrar sesión a la derecha |
| Grid productos | 1 col en mobile, 2 en tablet, 3-4 en desktop |
| Filtro       | Input con icono de lupa, debounce implícito (cada tecla) |
| Modal        | Overlay semitransparente, card centrada, animación de entrada |
| Botones      | Consistencia cromática: acción principal azul, peligro rojo, cancelar gris |
| Colores      | Tema oscuro corporativo (ej: `#1a1a2e`, `#16213e`, `#0f3460`, `#e94560`) |

---

## 8. Restricciones técnicas

- No usar librerías de estado global (Redux, Zustand).
- No usar frameworks CSS (solo Tailwind).
- No usar TypeScript (JavaScript puro con JSX).
- Todo el filtrado es del lado del cliente.
- MockAPI debe tener CORS habilitado (lo está por defecto).
