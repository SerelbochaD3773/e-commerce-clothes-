---
title: Plan de Desarrollo — Panel Admin E-commerce (Inventario)
version: 1.0.0
inicio: 2026-05-20
fin: 2026-05-27
estado: en_progreso
---

# Plan de Desarrollo

## 1. Estrategia de ramas

```
main
└── develop
    ├── feature/project-setup        (Vite + estructura + dependencias)
    ├── feature/auth-system          (Login + ProtectedRoute + LocalStorage)
    ├── feature/product-card         (Componente ProductCard + grid)
    ├── feature/api-integration      (CRUD con MockAPI + servicios)
    ├── feature/product-form         (Formulario crear/editar + validaciones)
    ├── feature/delete-confirmation  (DELETE + SweetAlert2)
    ├── feature/search-filter        (Buscador inline por nombre/categoría)
    ├── feature/loading-spinner      (Estados asíncronos + spinners)
    ├── feature/ui-enhancements      (Responsive, colores, layout final)
    └── feature/readme-deploy        (README.md + deploy Vercel/Netlify)
```

### Convención de commits

| Formato                     | Ejemplo                                  |
|-----------------------------|------------------------------------------|
| `feat: mensaje`             | `feat: add product form validation`      |
| `fix: mensaje`              | `fix: correct api endpoint url`          |
| `style: mensaje`            | `style: enhance navbar responsive design` |
| `docs: mensaje`             | `docs: update README with deploy url`    |
| `refactor: mensaje`         | `refactor: extract ProductForm component` |

---

## 2. Fases y tareas

### Fase 1 — Setup (día 1)

| Tarea                        | Rama                          | Esfuerzo |
|------------------------------|-------------------------------|----------|
| Inicializar Vite + React     | `feature/project-setup`       | 15 min   |
| Instalar dependencias        | `feature/project-setup`       | 10 min   |
| Configurar Tailwind          | `feature/project-setup`       | 10 min   |
| Crear estructura de carpetas | `feature/project-setup`       | 10 min   |
| Configurar MockAPI (remoto)  | `feature/project-setup`       | 15 min   |
| Merge a `develop`            | —                             | —        |

### Fase 2 — Autenticación (día 1-2)

| Tarea                        | Rama                          | Esfuerzo |
|------------------------------|-------------------------------|----------|
| Crear `LoginPage`            | `feature/auth-system`         | 30 min   |
| Crear `ProtectedRoute`       | `feature/auth-system`         | 20 min   |
| Implementar `local-storage.js` helpers | `feature/auth-system` | 15 min   |
| Configurar router con protección | `feature/auth-system`   | 15 min   |
| Navbar con username + logout | `feature/auth-system`         | 20 min   |
| Merge a `develop`            | —                             | —        |

### Fase 3 — Componente ProductCard (día 2)

| Tarea                        | Rama                          | Esfuerzo |
|------------------------------|-------------------------------|----------|
| Crear `ProductCard`          | `feature/product-card`        | 30 min   |
| Grid responsivo con Tailwind | `feature/product-card`        | 20 min   |
| Merge a `develop`            | —                             | —        |

### Fase 4 — API Integration (día 2-3)

| Tarea                        | Rama                          | Esfuerzo |
|------------------------------|-------------------------------|----------|
| Crear `services/productApi.js` | `feature/api-integration`   | 20 min   |
| GET productos con axios      | `feature/api-integration`     | 20 min   |
| ProductsPage con datos       | `feature/api-integration`     | 30 min   |
| Merge a `develop`            | —                             | —        |

### Fase 5 — Formulario de producto (día 3-4)

| Tarea                        | Rama                          | Esfuerzo |
|------------------------------|-------------------------------|----------|
| Crear `ProductForm`          | `feature/product-form`        | 40 min   |
| Validaciones (precio ≥ 0, stock ≥ 0) | `feature/product-form` | 20 min   |
| POST — crear producto        | `feature/product-form`        | 20 min   |
| PUT — editar producto        | `feature/product-form`        | 20 min   |
| Merge a `develop`            | —                             | —        |

### Fase 6 — Eliminación con confirmación (día 4)

| Tarea                        | Rama                          | Esfuerzo |
|------------------------------|-------------------------------|----------|
| DELETE con SweetAlert2 confirmación | `feature/delete-confirmation` | 30 min   |
| Alerta de éxito post-eliminación | `feature/delete-confirmation` | 10 min   |
| Merge a `develop`            | —                             | —        |

### Fase 7 — Búsqueda y filtro (día 4-5)

| Tarea                        | Rama                          | Esfuerzo |
|------------------------------|-------------------------------|----------|
| Crear `SearchBar`            | `feature/search-filter`       | 20 min   |
| Integrar `filter()` en ProductsPage | `feature/search-filter` | 20 min   |
| Merge a `develop`            | —                             | —        |

### Fase 8 — Loading spinners (día 5)

| Tarea                        | Rama                          | Esfuerzo |
|------------------------------|-------------------------------|----------|
| Crear `LoadingSpinner`       | `feature/loading-spinner`     | 15 min   |
| Integrar en ProductsPage     | `feature/loading-spinner`     | 15 min   |
| Merge a `develop`            | —                             | —        |

### Fase 9 — UI y responsive (día 5-6)

| Tarea                        | Rama                          | Esfuerzo |
|------------------------------|-------------------------------|----------|
| Refinar paleta cromática     | `feature/ui-enhancements`     | 20 min   |
| Responsive design (mobile first) | `feature/ui-enhancements`  | 30 min   |
| Layout del AdminLayout       | `feature/ui-enhancements`     | 20 min   |
| Merge a `develop`            | —                             | —        |

### Fase 10 — README y deploy (día 6-7)

| Tarea                        | Rama                          | Esfuerzo |
|------------------------------|-------------------------------|----------|
| Escribir README.md           | `feature/readme-deploy`       | 30 min   |
| Deploy en Vercel/Netlify     | `feature/readme-deploy`       | 30 min   |
| Merge a `develop` → `main`   | —                             | —        |

---

## 3. Dependencias entre tareas

```
setup → auth → product-card → api-integration → product-form → delete → search → spinner → ui → readme
                                        ↓
                                  (todas dependen de setup)
```

- `api-integration` requiere `product-card` (usa el componente en el grid).
- `product-form` requiere `api-integration` (necesita POST/PUT).
- `delete-confirmation` requiere `api-integration` (necesita DELETE).
- `search-filter` requiere `api-integration` (filtra datos cargados).

---

## 4. Hitos (milestones)

| Hito | Fecha       | Entregable                          |
|------|-------------|-------------------------------------|
| M1   | 2026-05-21 | Scaffold + dependencias + MockAPI   |
| M2   | 2026-05-22 | Login funcional + protección rutas  |
| M3   | 2026-05-23 | Grid de productos con datos         |
| M4   | 2026-05-24 | CRUD completo (crear, editar, eliminar) |
| M5   | 2026-05-25 | Búsqueda + filtro + spinners        |
| M6   | 2026-05-26 | UI final + responsive               |
| M7   | 2026-05-27 | README + deploy + merge a main      |

---

## 5. Riesgos y mitigaciones

| Riesgo                              | Mitigación                                      |
|-------------------------------------|-------------------------------------------------|
| MockAPI rate limiting               | Usar JSON Server local como fallback            |
| CORS en desarrollo                  | Vite proxy config en `vite.config.js`           |
| Tiempo insuficiente para UI         | Priorizar funcionalidad sobre estética          |
| Conflictos de merge                 | Mantener ramas cortas y merge frecuente a develop |

---

## 6. Definición de "Done" (DoD)

- [ ] Código compila sin errores (`npm run build`)
- [ ] Linter pasa sin warnings (`npm run lint`)
- [ ] Funcionalidad probada manualmente en navegador
- [ ] Commits con mensajes convencionales
- [ ] Rama mergeada a `develop`
- [ ] `constitucion.md` actualizado si hubo cambios arquitectónicos
