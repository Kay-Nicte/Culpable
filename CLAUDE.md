# Culpable - Juego de chat/investigación

## Descripción
Juego estilo "I'm Innocent" donde Andrea investiga si su marido Damián le es infiel. Spoiler: no lo era, preparaba una fiesta sorpresa de aniversario.

## Stack
- HTML/CSS/JS vanilla (sin frameworks)
- Sistema i18n propio (`i18n.js`) con soporte ES/EN
- Interfaz tipo móvil/chat

## Estructura
```
index.html   → Estructura HTML (pantallas: inicio, intro, teléfono, final)
styles.css   → Estilos (tema oscuro, interfaz móvil)
i18n.js      → Traducciones y motor i18n (I18N.t('key'))
game.js      → Motor del juego (estado, flujo, chat engine)
```

## Flujo de agentes

| Agente       | Modelo  | Rol |
|-------------|---------|-----|
| researcher  | Opus    | Investiga antes de implementar: docs, SDKs, issues conocidos. Crea plan en docs/ |
| implementer | Sonnet  | Ejecuta el plan paso a paso. Lee de docs/, no improvisa. Tiene Figma MCP |
| tester      | Haiku   | Traduce el test plan del researcher a código. No decide qué testear |
| fixer       | Sonnet  | Diagnostica y arregla bugs con análisis de impacto |
| explorer    | Haiku   | Solo lectura. Responde preguntas rápidas sobre el codebase |

**Flujo:** researcher (Opus) → /clear → implementer (Sonnet) → /clear → tester (Haiku)

## Convenciones
- Todos los textos visibles al usuario van en `i18n.js`, nunca hardcodeados en HTML/JS
- Nuevos idiomas: añadir `I18N.register('xx', { ... })` en `i18n.js`
- El guion (diálogos) vive dentro de cada traducción en `script.*`
- La lógica de flujo (desbloqueos, fases, flags) vive en `FLOW` dentro de `game.js`
