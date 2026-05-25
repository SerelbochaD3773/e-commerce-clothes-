---
name: crear-skills
description: >
  Genera nuevas skills modulares que cumplen el Estándar Abierto de Habilidades
  de Antigravity. Se activa cuando el usuario dice "crear una skill",
  "generar skill", "nueva skill", "skill para [tema]",
  "quiero una skill que...", "crea un asistente de", "necesito una skill de",
  o cualquier frase equivalente en español que exprese la intención de crear
  un nuevo módulo de habilidad reutilizable para el agente. También responde
  a "meta-skill", "skill generadora", "skill factory" y variaciones similares.
frontmatter:
  level: 1
  intent: high
---

# Creador de Skills

## Quick start

```powershell
# Desde la raíz del proyecto, generar una skill nueva:
.\.agent\skills\crear-skills\scripts\Generate-Skill.ps1 -Name "mi-skill" -Description "Descripción breve en tercera persona (máx 1024 caracteres)"
```

## Workflow procedural

Sigue estos pasos **en orden** cuando se active esta skill:

### 1. Recolectar requisitos

Pregunta al usuario lo siguiente (si no lo ha especificado ya):

- **Nombre** de la skill (kebab-case, ej: `mi-skill`)
- **Descripción** (tercera persona, máximo 1024 caracteres, debe funcionar como trigger de alta intención)
- ¿Necesita **scripts/**? (si la tarea es determinista o repetitiva → sí)
- ¿Necesita **examples/**? (si hay casos de uso no obvios o configuración compleja → sí)

### 2. Determinar estructura

```
.agent/skills/[nombre]/
├── SKILL.md
├── scripts/       # (opcional) lógica determinista o batch
└── examples/      # (opcional) ejemplos de uso
```

### 3. Redactar SKILL.md

Escribe el archivo manualmente usando el siguiente **template**:

```markdown
---
name: [nombre]
description: >
  [Descripción de alta intención en tercera persona. Máx 1024 caracteres.
  Enumera frases activadoras exactas. Actúa como trigger para el agente.]
frontmatter:
  level: 1
  intent: high
---

# [Nombre formateado]

## Quick start

`[Comando o bloque de código que el usuario ejecuta inmediatamente]`

## Workflow procedural

1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

## Uso de herramientas

- Usa **bash** para leer scripts/ complementarios solo cuando el flujo lo requiera.
- Usa **read** para leer archivos de examples/ si el usuario pide ver un ejemplo.

## Restricciones

- No incrustes datasets grandes en SKILL.md; indícale al agente que lea desde un archivo externo.
- Para lógica determinista, prioriza scripts/ antes que generación creativa.
- Recuerda al usuario revisar cualquier script generado antes de ejecutarlo.
```

### 4. Generar scripts/ (si aplica)

Si la skill requiere lógica repetitiva o determinista:
1. Decide si el script debe ser `.ps1` (Windows) o `.sh` (Unix)
2. Colócalo en `scripts/`
3. En SKILL.md, sección **Quick start**, referencia el script
4. Añade una advertencia de seguridad: _"Revisa el contenido del script antes de ejecutarlo"_

### 5. Generar examples/ (si aplica)

Si la skill tiene configuraciones complejas o casos de uso no obvios:
1. Crea uno o varios archivos `.md` dentro de `examples/`
2. Cada ejemplo debe ser autocontenido y ejecutable

### 6. Escribir los archivos

Usa **write** para crear cada archivo. Usa **bash** solo para crear directorios (`New-Item` en PowerShell).

### 7. Validación final

Verifica que:
- [ ] `name` en frontmatter coincide con el nombre de la carpeta
- [ ] `description` ≤ 1024 caracteres, en tercera persona, con frases activadoras
- [ ] Existe al menos un Quick Start ejecutable
- [ ] Los scripts/ tienen advertencia de seguridad
- [ ] No hay datos grandes incrustados (usa archivos externos)

## Uso de herramientas

- Usa **bash** para crear los directorios de la nueva skill.
- Usa **bash** para leer los scripts en `scripts/` de la skill actual si necesitas generar boilerplate.
- Usa **write** para crear SKILL.md y cualquier archivo en `scripts/` o `examples/`.
- Usa **question** si necesitas clarificar requisitos con el usuario.
- Usa **read** para leer este mismo archivo si pierdes contexto durante la ejecución.

## Restricciones

- **Eficiencia de tokens:** No copies el template completo de SKILL.md en cada respuesta. Solo genera las secciones que cambian.
- **Seguridad:** Todos los scripts generados deben incluir un comentario que diga `# SAFETY: Review before executing`.
- **Consistencia:** El nombre de la carpeta, el `name:` del frontmatter y el título H1 deben coincidir.
