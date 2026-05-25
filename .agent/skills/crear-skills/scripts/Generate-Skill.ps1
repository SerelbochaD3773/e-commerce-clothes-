# SAFETY: Review before executing
<#
.SYNOPSIS
  Genera la estructura y boilerplate inicial de una skill para Antigravity.

.DESCRIPTION
  Crea la carpeta .agent/skills/<Name>/, escribe un SKILL.md mínimo,
  y opcionalmente las subcarpetas scripts/ y examples/.

.PARAMETER Name
  Nombre de la skill en kebab-case (ej: "mi-skill").

.PARAMETER Description
  Descripción corta en tercera persona (máx 1024 caracteres).

.PARAMETER WithScripts
  Crea la carpeta scripts/.

.PARAMETER WithExamples
  Crea la carpeta examples/.

.EXAMPLE
  .\Generate-Skill.ps1 -Name "mi-skill" -Description "Ayuda al usuario a hacer X" -WithScripts -WithExamples
#>

param(
  [Parameter(Mandatory = $true)]
  [string]$Name,

  [Parameter(Mandatory = $true)]
  [string]$Description,

  [switch]$WithScripts,
  [switch]$WithExamples
)

$root = ".agent\skills\$Name"

if (Test-Path -LiteralPath $root) {
  Write-Warning "La carpeta '$root' ya existe. Abortando."
  exit 1
}

# Crear estructura
New-Item -ItemType Directory -Path $root -Force | Out-Null
if ($WithScripts) { New-Item -ItemType Directory -Path "$root\scripts" -Force | Out-Null }
if ($WithExamples) { New-Item -ItemType Directory -Path "$root\examples" -Force | Out-Null }

# Escribir SKILL.md mínimo
$skillContent = @"---
name: $Name
description: >
  $Description
frontmatter:
  level: 1
  intent: high
---

# $([cultureinfo]::CurrentCulture.TextInfo.ToTitleCase($Name.Replace('-',' ')))

## Quick start

`[Pendiente: agrega un comando de inicio rápido]`

## Workflow procedural

1. Pendiente
"@

Set-Content -Path "$root\SKILL.md" -Value $skillContent

Write-Host "✔ Skill '$Name' creada en $root"
Write-Host "  Edita SKILL.md para completar el workflow procedimental."
if ($WithScripts) { Write-Host "  Agrega scripts en $root\scripts\" }
if ($WithExamples) { Write-Host "  Agrega ejemplos en $root\examples\" }
