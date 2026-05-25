# Ejemplo de salida: Skill "docker-cleanup"

## Escenario

El usuario dice: *"Necesito una skill para limpiar contenedores e imágenes Docker huérfanas"*

## Estructura generada

```
.agent/skills/docker-cleanup/
├── SKILL.md
└── scripts/
    └── Clean-Docker.ps1
```

## SKILL.md generado

```yaml
---
name: docker-cleanup
description: >
  Limpia contenedores detenidos, imágenes colgantes y volúmenes no usados
  de Docker en el sistema local. Se activa cuando el usuario dice
  "limpiar docker", "docker cleanup", "docker prune",
  "liberar espacio docker", "docker limpieza".
frontmatter:
  level: 1
  intent: high
---
```

## Proceso

1. El agente preguntó: *"¿Necesitas scripts/ o examples/? ¿Cuál es la descripción exacta?"*
2. Usuario: *"Solo scripts/, una descripción de limpieza Docker"*
3. El agente ejecutó `Generate-Skill.ps1 -Name "docker-cleanup" -Description "..." -WithScripts`
4. El agente editó SKILL.md para agregar el workflow procedural
5. El agente creó `scripts/Clean-Docker.ps1` con lógica de `docker prune`
6. Validación: nombre de carpeta = `name:` = H1, descripción ≤ 1024 chars, script con advertencia de seguridad
