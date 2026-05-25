---
name: velvora-styles
description: >
  Habilidad para cargar y aplicar el sistema de diseño Velvora (especificaciones de Stitch, colores, tipografías e implementación plan).
  Se activa al solicitar 'aplicar tema de Velvora', 'cargar estilos de Velvora', 'usar diseño de Velvora', o cualquier referencia a Velvora Identity System.
frontmatter:
  level: 1
  intent: high
---

# Velvora Styles

Habilidad diseñada para integrar y hacer cumplir el sistema de diseño **Velvora Identity System** en el proyecto React + Tailwind CSS v4.

## Quick start

Puedes leer la especificación completa del sistema de diseño ejecutando:
```powershell
# Ver especificaciones del sistema de diseño en JSON
Get-Content -Path ".agent/skills/velvora-styles/resources/design_system.json" -Raw
```

## Workflow procedural

Cuando se active esta skill, el agente debe seguir estos pasos en orden:

1. **Leer las especificaciones del diseño**:
   - Acceder al archivo de recursos `design_system.json` para obtener los valores exactos de colores, tipografías, radios de borde y espaciado de Velvora.
   - Acceder a `implementation_plan.md` en los recursos de la skill para entender la estrategia planeada.

2. **Cargar fuentes en index.html**:
   - Verificar si el archivo `index.html` ya incluye los enlaces de Google Fonts para **Montserrat**. Si no, agregarlos.

3. **Configurar el tema en index.css**:
   - Integrar la sección `@theme` en `src/index.css` mapeando las variables de Velvora a los tokens de Tailwind v4.
   - Definir variables CSS personalizadas para animaciones, resplandores o sombras basados en acentos "Volt".

4. **Guiar al desarrollador en componentes**:
   - Enseñar al desarrollador a utilizar las nuevas clases semánticas de Velvora (ej. `bg-velvora-bg`, `text-velvora-primary`, `font-velvora`, etc.) o aplicar cambios globales sobre componentes de la interfaz de usuario.

## Recursos de la Skill

- [design_system.json](file:///c:/Users/andre/REACT-IVO/e-commerce/comercio-electronico/.agent/skills/velvora-styles/resources/design_system.json): Especificación JSON del sistema de diseño Velvora.
- [implementation_plan.md](file:///c:/Users/andre/REACT-IVO/e-commerce/comercio-electronico/.agent/skills/velvora-styles/resources/implementation_plan.md): El plan de implementación previamente diseñado.

## Restricciones

- No cambiar archivos de producción a menos que se solicite específicamente.
- Asegurar que todos los estilos sean de alto contraste y sigan la estética de temática oscura ("Noir") y moderna de Velvora.
