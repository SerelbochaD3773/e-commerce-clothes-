# Plan de Implementación: Integración de Estilos Velvora desde Stitch

Este plan detalla cómo traeremos los estilos del sistema de diseño **Velvora** desde la cuenta de Stitch del usuario y los aplicaremos en la aplicación local React con Tailwind CSS v4.

## Resumen del Sistema de Diseño Velvora (Stitch)

Hemos consultado la cuenta de Stitch y encontrado el **Velvora Identity System** (ID de Asset: `9c12afd5c98947549c489261c31435b0`) bajo el proyecto *Minimalist Professional Fashion Store*. Sus características clave son:
- **Estética:** Alta fidelidad, estilo técnico y minimalista, temática oscura ("Noir") de alto contraste con acentos eléctricos "Volt".
- **Colores:** Base oscura (#131313) y negro puro (#000000), con acentos en azul eléctrico/volt (#00f0ff) y blanco de alto brillo (#ffffff) para texto.
- **Tipografía:** Tipografía geométrica **Montserrat** en toda la interfaz.
- **Bordes/Esquinas:** Esquinas ligeramente redondeadas a `0.25rem` (4px).

---

## Cambios Propuestos

### Configuración Global y Fuentes

#### [MODIFY] index.html
- Añadir el enlace a Google Fonts para cargar la fuente **Montserrat** con diferentes pesos (300, 400, 600, 700).

### Estilos y Configuración de Tailwind CSS v4

#### [MODIFY] src/index.css
- Implementar la directiva `@theme` de Tailwind CSS v4 para agregar o redefinir los tokens de Velvora:
  - Redefinir la fuente predeterminada `--font-sans` para que use `Montserrat`.
  - Configurar la paleta de colores de Velvora (colores `background`, `surface`, `primary`, `secondary`, `tertiary` y contenedores semánticos).
  - Configurar las escalas de espaciado (`gutter`, `margin`, `stack-sm`, `stack-md`, `stack-lg`).
  - Configurar el radio de bordes (`radius-sm`, `radius-md`, `radius-lg`, `radius-xl`).
- Agregar clases de utilidades específicas para efectos y degradados técnicos descritos en la guía de estilo de Velvora (como el brillo eléctrico en hover/active y las visualizaciones con tonalidades "lava-lit").

---

## Plan de Verificación

### Verificación Manual
1. Validar que la fuente **Montserrat** se descargue y renderice correctamente en el navegador.
2. Comprobar que los nuevos colores del tema (oscuro, acentos azul eléctrico/volt) se apliquen correctamente a la interfaz.
3. Verificar la responsividad de los elementos y que los bordes redondeados cumplan con la métrica de `0.25rem` (4px) por defecto.
