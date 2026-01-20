# 📖 MANUAL DE USUARIO
## Sistema de Gestión de Cruceros Oceánicos

**Versión:** 1.0.0  
**Fecha:** Enero 2026  
**Canal Punta Indio - KM 118.5**

---

## 📑 ÍNDICE

1. [Introducción](#introduccion)
2. [Inicio Rápido](#inicio-rapido)
3. [Panel Principal (Dashboard)](#dashboard)
4. [Base de Datos de Buques](#base-datos)
5. [Planilla de Cruceros](#planilla-cruceros)
6. [Reservas de Canal](#reservas-canal)
7. [Búsqueda y Filtros](#busqueda-filtros)
8. [Importación de Datos](#importacion)
9. [Generación de Reportes](#reportes)
10. [Resolución de Conflictos](#conflictos)
11. [Consejos y Mejores Prácticas](#consejos)
12. [Preguntas Frecuentes](#faq)
13. [Soporte](#soporte)

---

<a name="introduccion"></a>
## 🎯 1. INTRODUCCIÓN

### ¿Qué es este sistema?

El **Sistema de Gestión de Cruceros Oceánicos** es una aplicación web profesional diseñada para gestionar el tránsito de cruceros a través del Canal Punta Indio (KM 118.5).

### Características Principales

✅ **Gestión completa de buques** - Base de datos con toda la información técnica  
✅ **Planificación de cruceros** - Programación de entradas y salidas  
✅ **Cálculo automático** - Tiempos de tránsito calculados automáticamente  
✅ **Detección de conflictos** - Identifica solapamientos en KM 118.5  
✅ **Reservas de canal** - Gestión de cierres CPI y ACC  
✅ **Reportes profesionales** - Generación de reportes A3 para impresión  
✅ **Alertas inteligentes** - Notificaciones de cruceros próximos  

---

<a name="inicio-rapido"></a>
## 🚀 2. INICIO RÁPIDO

### Acceso al Sistema

1. Abrir navegador web (Chrome, Firefox, Edge)
2. Ir a la URL del sistema
3. El sistema carga automáticamente

### Navegación Básica

El sistema tiene **4 pestañas principales**:

```
┌─────────────────────────────────────────────────┐
│  🏠 Dashboard  │  📚 Base Datos  │  ⚓ Cruceros  │  📅 Reservas  │
└─────────────────────────────────────────────────┘
```

**Haz clic en cada pestaña para acceder a su funcionalidad**

---

<a name="dashboard"></a>
## 📊 3. PANEL PRINCIPAL (DASHBOARD)

### ¿Qué muestra?

El Dashboard es tu **centro de control visual**. Muestra:

- 📈 **Estadísticas generales**
  - Total de buques en base de datos
  - Total de cruceros programados
  - Cruceros por mes

- 🎨 **Distribución por clase**
  - Clase A (Calado ≥ 8.84m) - Color Rojo
  - Clase B (Calado 7.33-8.83m) - Color Naranja
  - Clase C (Calado ≤ 7.32m) - Color Verde

- 🏢 **Top 5 Agencias**
  - Ranking de agencias con más operaciones

### Cómo Interpretar

```
Total Buques: 45     ←  Buques en tu base de datos
Total Cruceros: 122   ←  Cruceros programados
```

**Uso:** Vista rápida del estado operacional

---

<a name="base-datos"></a>
## 📚 4. BASE DE DATOS DE BUQUES

### ¿Qué es?

Registro maestro de todos los buques que operan en el canal.

### Agregar un Buque

1. Click en **"Agregar Buque"** (botón azul superior derecho)
2. Completar el formulario:

```
🚢 Buque: *           Celebrity Eclipse
🏴 Bandera:           Bahamas
🔢 IMO: *             9404314
📏 Eslora (m):        317.20
↔️ Manga (m):         36.80
↕️ Puntal (m):        8.30
⚓ Calado (m): *      8.10
🏢 Agencia:           Maruba
```

**Campos obligatorios:** Marcados con *

3. Click en **"Guardar"**

### Clasificación Automática

El sistema clasifica automáticamente según el **calado**:

| Clase | Calado | Hasta KM | Color |
|-------|--------|----------|-------|
| **A** | ≥ 8.84m | 239 | 🔴 Rojo |
| **B** | 7.33 - 8.83m | 216 | 🟠 Naranja |
| **C** | ≤ 7.32m | 59 | 🟢 Verde |

> 💡 **Tip:** Al ingresar el calado, verás la clase asignada automáticamente

### Editar un Buque

1. Buscar el buque en la tabla
2. Click en **"Editar"** (botón azul)
3. Modificar datos
4. Click en **"Actualizar"**

### Eliminar un Buque

1. Click en **"Eliminar"** (botón rojo)
2. Confirmar acción

> ⚠️ **Advertencia:** No se puede eliminar un buque si tiene cruceros programados

### Buscar y Filtrar

**Búsqueda:**
```
🔍 Buscar: Celebrity
```
Busca por: Nombre, IMO, o Agencia

**Filtros:**
- 🎯 **Filtrar por Clase:** Todas / A / B / C
- 🏢 **Filtrar por Agencia:** Seleccionar de lista

---

<a name="planilla-cruceros"></a>
## ⚓ 5. PLANILLA DE CRUCEROS

### ¿Qué es?

El **corazón del sistema**. Aquí gestionas todos los cruceros programados.

### Agregar un Crucero

1. Click en **"Agregar Crucero"** (botón verde)
2. Completar formulario:

```
🚢 Buque:              Celebrity Eclipse (seleccionar de lista)
📥 Fecha Entrada:      20/01/2026
🕐 Hora Entrada:       08:00
📤 Fecha Salida:       21/01/2026
🕐 Hora Salida:        14:00
📋 Estado:             Sin Confirmar / Confirmado / Cancelado
```

3. Click en **"Agregar Crucero"**

### ¿Qué calcula automáticamente?

El sistema calcula **todos los tiempos de tránsito**:

#### Para Clase A (Calado ≥ 8.84m):

**ENTRADA:**
```
KM 239 (ETD)    →  08:00
KM 216         →  09:00  (+1h)
KM 118.5 (CPI) →  11:00  (+2h)
KM 37          →  14:00  (+3h)
KM 7.3         →  15:15  (+1h 15min)
Puerto (Amarre)→  15:45  (+30min)
```

**SALIDA:**
```
Puerto (ETD)   →  14:00
KM 59          →  16:00  (+2h)
KM 77          →  16:45  (+45min)
KM 118.5 (CPI) →  18:30  (+1h 45min)
KM 216         →  20:30  (+2h)
KM 239         →  21:30  (+1h)
```

#### Para Clase B (Calado 7.33-8.83m):

**Inicia en KM 216** (no pasa por KM 239)

#### Para Clase C (Calado ≤ 7.32m):

**Inicia en KM 59** (no pasa por KM 216 ni 239)

> 💡 **Tip:** Todos estos cálculos son automáticos. Solo ingresas entrada y salida.

### Tabla de Cruceros

La tabla muestra **toda la información**:

```
| N° | Buque | 📥 Entrada | ETA KM 118.5 | ⚓ Amarre | 📤 Zarpada | ETD KM 118.5 | 🚢 Salida | Estado | Acciones |
```

**Colores de Clase:**
- 🔴 **Rojo:** Clase A
- 🟠 **Naranja:** Clase B
- 🟢 **Verde:** Clase C

### Estados de Crucero

| Estado | Significado | Color |
|--------|-------------|-------|
| ⏳ **Sin Confirmar** | Tentativo, puede cambiar | 🟡 Amarillo |
| ✅ **Confirmado** | Confirmado por agencia | 🟢 Verde |
| ❌ **Cancelado** | Crucero cancelado | ⚪ Gris |

**Cambiar estado:**
- Click en el dropdown de "Estado" en la fila del crucero
- Seleccionar nuevo estado

### 🔔 Notificaciones de Cruceros Próximos

En la parte superior verás **alertas automáticas**:

#### ⚡ URGENTE (24 horas o menos)
```
┌──────────────────────────────────────────────┐
│ ⚠️  Celebrity Eclipse                        │
│ 🇧🇸 Bahamas • IMO 9404314                    │
│ 20/01/2026  08:00 • En 18h          ⚡ URGENTE│
└──────────────────────────────────────────────┘
```
**Fondo amarillo destacado**

#### 🕐 PRÓXIMO (24-48 horas)
```
┌──────────────────────────────────────────────┐
│ 🕐  MSC Magnifica                            │
│ 🇮🇹 Italia • IMO 9387086                     │
│ 21/01/2026  09:00 • En 36h                   │
└──────────────────────────────────────────────┘
```
**Fondo azul**

> 💡 **Tip:** Estas alertas te ayudan a priorizar tu trabajo diario

---

<a name="reservas-canal"></a>
## 📅 6. RESERVAS DE CANAL

### ¿Qué son las Reservas?

Las reservas son los **horarios de clausura del canal** necesarios para cada crucero:

- **CPI (Canal Punta Indio - KM 118.5):** Punto crítico donde entran y salen
- **ACC (Acceso al Canal):** Canal desde puerto hasta KM 118.5

### Cálculo Automático

El sistema calcula **4 reservas por crucero**:

#### 1. Reserva CPI Entrada
- **Clase A:** 6 horas antes del ETD
- **Clase B:** 5.5 horas antes del ETD
- **Clase C:** No aplica (no pasa por CPI)

#### 2. Reserva ACC Entrada
- **Clase A:** 2.5 horas antes del amarre
- **Clase B:** 2 horas antes del amarre
- **Clase C:** 1 hora antes del amarre

#### 3. Reserva ACC Salida
- **Clase A:** 2.5 horas antes del ETD salida
- **Clase B:** 2 horas antes del ETD salida
- **Clase C:** 1 hora antes del ETD salida

#### 4. Reserva CPI Salida
- **Clase A:** 6 horas antes de KM 118.5 salida
- **Clase B:** 5.5 horas antes de KM 118.5 salida
- **Clase C:** No aplica

### Ejemplo Práctico

```
Crucero: Celebrity Eclipse (Clase A)
Entrada: 20/01/2026 08:00
Salida:  21/01/2026 14:00

RESERVAS CALCULADAS:
┌─────────────────────────────────────────┐
│ 🔵 Reserva CPI Entrada:                 │
│    20/01/2026 02:00  (6h antes)         │
│                                         │
│ 🔵 Reserva ACC Entrada:                 │
│    20/01/2026 13:15  (2.5h antes amarre)│
│                                         │
│ 🟣 Reserva ACC Salida:                  │
│    21/01/2026 11:30  (2.5h antes ETD)   │
│                                         │
│ 🟣 Reserva CPI Salida:                  │
│    21/01/2026 12:30  (6h antes KM 118.5)│
└─────────────────────────────────────────┘
```

### Editar Reservas Manualmente

A veces necesitas **ajustar operativamente**:

1. Click en **"✏️ Editar"** en la fila del crucero
2. Modificar las horas que necesites
3. Click en **"💾 Guardar"**

> 🔐 **Historial:** Cada cambio manual se registra en el historial

### Ver Historial de Cambios

1. Click en **"📜 Historial"** (botón morado)
2. Ver todos los cambios realizados:

```
Celebrity Eclipse
Por Operador • 20/01/2026 10:30

Cambios realizados:
─────────────────────────────────
Reserva CPI Entrada
De: 20/01/2026 02:00
A:  20/01/2026 02:30
─────────────────────────────────
```

### Estadísticas de Reservas

En la parte superior verás:

```
┌───────────────┬───────────────┬──────────┬──────────┬──────────┐
│ Total: 122    │ CPI: 485h     │ ACC: 305h│ Clase A: │ Clase B: │
│ Reservas      │ Clausurado    │ Clausurado│    40    │    68    │
└───────────────┴───────────────┴──────────┴──────────┴──────────┘
```

### Exportar Reservas

**A Excel (CSV):**
1. Click en **"📥 Excel"**
2. Se descarga archivo CSV
3. Abrir con Excel/Google Sheets

**A PDF:**
1. Click en **"📥 PDF"**
2. Se abre vista de impresión
3. Click en "Imprimir" o "Guardar como PDF"

---

<a name="busqueda-filtros"></a>
## 🔍 7. BÚSQUEDA Y FILTROS

### Búsqueda Global (Navbar)

En la parte superior de la página:

```
┌────────────────────────────────────────────────┐
│  🔍 Buscar por nombre de buque, IMO, agencia... │
└────────────────────────────────────────────────┘
```

**Funciona en TODAS las pestañas:**
- Base de Datos
- Planilla de Cruceros
- Reservas de Canal

**Busca por:**
- Nombre de buque
- Número IMO
- Agencia marítima
- Bandera

**Uso:**
1. Escribir en el campo
2. Resultados instantáneos
3. Click en "✕" para limpiar

### Filtros Avanzados (Planilla de Cruceros)

Click en **"▶ Filtros Avanzados"** para expandir:

```
┌─────────────────────────────────────────────────┐
│  📅 Desde:     [20/01/2026]                     │
│  📅 Hasta:     [31/01/2026]                     │
│  🚢 Clase:     [Todas ▼]                        │
│  🏢 Agencia:   [Filtrar por agencia...]         │
│  📋 Estado:    [Todos ▼]                        │
│                                                 │
│  [Limpiar Filtros]                              │
└─────────────────────────────────────────────────┘
```

**Ejemplos de uso:**

**Filtro 1: Cruceros de Enero Confirmados**
```
Desde: 01/01/2026
Hasta: 31/01/2026
Estado: Confirmado
```

**Filtro 2: Solo Clase A de una Agencia**
```
Clase: A
Agencia: Maruba
```

**Filtro 3: Cruceros del Fin de Semana**
```
Desde: 25/01/2026
Hasta: 26/01/2026
```

> 💡 **Tip:** Puedes combinar múltiples filtros

### Contador de Resultados

```
📋 Planilla de Cruceros  [45 de 122]
                          ↑     ↑
                  Filtrados   Total
```

---

<a name="importacion"></a>
## 📥 8. IMPORTACIÓN DE DATOS

### ¿Cuándo usar?

Cuando tienes **muchos cruceros** para cargar de una vez.

### Formatos Soportados

- ✅ **CSV** (separado por `;` o `,`)
- ✅ **Excel** (.xlsx, .xls)
- ✅ **JSON**

### Paso 1: Descargar Plantilla

1. Ir a **Planilla de Cruceros**
2. Click en **"📥 Descargar Plantilla"** (si está disponible)

O crear archivo CSV con estas columnas:

```csv
Buque,Fecha Entrada,Hora Entrada,Fecha Salida,Hora Salida,Situacion
Celebrity Eclipse,20/01/2026,08:00,21/01/2026,14:00,CONFIRMADO
MSC Magnifica,22/01/2026,09:00,23/01/2026,15:00,SIN CONFIRMAR
```

### Paso 2: Completar Datos

**Columnas obligatorias:**
- `Buque` - Nombre exacto (debe existir en Base de Datos)
- `Fecha Entrada` - Formato: DD/MM/YYYY o YYYY-MM-DD
- `Hora Entrada` - Formato: HH:MM
- `Fecha Salida` - Formato: DD/MM/YYYY o YYYY-MM-DD
- `Hora Salida` - Formato: HH:MM

**Columnas opcionales:**
- `Situacion` - SIN CONFIRMAR, CONFIRMADO, CANCELADO
- `FM` - Fondeadero/Muelle
- `TO` - Turnaround
- `Notas` - Observaciones

### Paso 3: Importar

1. Click en **"📤 Importar"**
2. Seleccionar archivo
3. Esperar procesamiento
4. Ver resultado:

```
✅ Importación completada

📊 Cruceros importados: 45
⚠️ Errores: 2
📋 Total de cruceros en sistema: 122

Errores encontrados:
• Fila 23: Buque "Unknown Ship" no encontrado
• Fila 31: Fecha inválida
```

### Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| Buque no encontrado | Nombre no coincide | Verificar nombre exacto en Base de Datos |
| Fecha inválida | Formato incorrecto | Usar DD/MM/YYYY o YYYY-MM-DD |
| Hora inválida | Formato incorrecto | Usar HH:MM (24 horas) |

---

<a name="reportes"></a>
## 📄 9. GENERACIÓN DE REPORTES

### Reporte A3 Profesional

**¿Qué incluye?**
- Listado completo de cruceros
- Información técnica de buques
- Tiempos de entrada y salida
- Reservas de canal integradas
- Clasificación por colores
- Logo y fecha de generación
- Formato profesional para impresión

### Generar Reporte

1. Ir a **Planilla de Cruceros**
2. Resolver todos los conflictos (si hay)
3. Click en **"📄 Generar Reporte A3"**
4. Se abre nueva ventana con reporte
5. Click derecho → **"Imprimir"** o **Ctrl+P**

### Configuración de Impresión

```
Configuración recomendada:
───────────────────────────
Orientación: Horizontal
Papel: A3
Márgenes: Normal (1cm)
Escala: 100%
```

### Vista Previa

El reporte se ve así:

```
╔═══════════════════════════════════════════════════╗
║  SISTEMA DE CRUCEROS OCEÁNICOS                    ║
║  Canal Punta Indio - KM 118.5                     ║
║  Generado: 20/01/2026 10:30                       ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║  [Tabla completa con todos los cruceros]          ║
║                                                   ║
╠═══════════════════════════════════════════════════╣
║  Sistema de Gestión de Cruceros Oceánicos         ║
║  © 2026 - alfredojesus.zappa@gmail.com           ║
╚═══════════════════════════════════════════════════╝
```

---

<a name="conflictos"></a>
## ⚠️ 10. RESOLUCIÓN DE CONFLICTOS

### ¿Qué es un Conflicto?

Un conflicto ocurre cuando **dos cruceros intentan pasar por KM 118.5 al mismo tiempo**.

**Regla:** Debe haber **mínimo 1 hora** entre:
- Un buque saliendo
- Un buque entrando

### Detectar Conflictos

1. Ir a **Planilla de Cruceros**
2. Click en **"🔍 Buscar Conflictos"**
3. El sistema analiza todos los cruceros

### Ejemplo de Conflicto

```
┌────────────────────────────────────────────────┐
│ 🚨 CONFLICTO EN KM 118.5                       │
├────────────────────────────────────────────────┤
│ Buque Entrante:  Celebrity Eclipse             │
│ ETA KM 118.5:    20/01 11:00                  │
│                                                │
│ Buque Saliente:  MSC Magnifica                 │
│ ETD KM 118.5:    20/01 11:15                  │
│                                                │
│ Diferencia:      15 minutos ⚠️                 │
│ Mínimo requerido: 60 minutos                   │
└────────────────────────────────────────────────┘
```

### Soluciones Propuestas

El sistema sugiere **2 soluciones**:

#### Opción 1: Retrasar Salida
```
┌────────────────────────────────────────────────┐
│ ⏰ RETRASAR SALIDA                             │
│                                                │
│ MSC Magnifica → 20/01 10:00                   │
│ (Retrasar zarpada 45 minutos)                 │
│                                                │
│ [Aplicar]                                      │
└────────────────────────────────────────────────┘
```

#### Opción 2: Adelantar Entrada
```
┌────────────────────────────────────────────────┐
│ ⏰ ADELANTAR ENTRADA                           │
│                                                │
│ Celebrity Eclipse → 20/01 12:15                │
│ (Adelantar entrada 45 minutos)                 │
│                                                │
│ [Aplicar]                                      │
└────────────────────────────────────────────────┘
```

### Aplicar Solución

1. Leer ambas opciones
2. Decidir cuál es más viable operativamente
3. Click en **"Aplicar"** en la opción elegida
4. El sistema actualiza automáticamente:
   - Horarios del crucero
   - Tiempos de tránsito
   - Reservas de canal
5. Volver a buscar conflictos para verificar

### Sin Conflictos

```
✅ ¡No se encontraron conflictos!
Todos los cruceros están programados correctamente.

Puedes generar el Reporte A3 con seguridad.
```

---

<a name="consejos"></a>
## 💡 11. CONSEJOS Y MEJORES PRÁCTICAS

### Gestión Diaria

✅ **Empezar el día:**
1. Revisar **Notificaciones** de cruceros próximos
2. Verificar **Reservas de Canal** del día
3. Actualizar estados a "Confirmado" si corresponde

✅ **Agregar nuevos cruceros:**
1. Verificar que el buque esté en **Base de Datos**
2. Si no existe, agregarlo primero
3. Ingresar datos completos y precisos
4. Buscar conflictos inmediatamente

✅ **Antes de enviar reportes:**
1. Resolver todos los conflictos
2. Confirmar todos los cruceros posibles
3. Generar Reporte A3
4. Verificar visualmente antes de imprimir

### Organización

📁 **Base de Datos de Buques:**
- Mantener actualizada
- Un buque = Un registro (no duplicar)
- Validar datos técnicos con especificaciones oficiales

📅 **Planilla de Cruceros:**
- Actualizar estados regularmente
- Eliminar cruceros cancelados
- Mantener ordenado por fecha

🔄 **Reservas:**
- Solo editar si hay cambio operativo real
- Documentar cambios en notas

### Importación

✅ **Preparar archivo:**
- Usar plantilla oficial
- Verificar nombres de buques
- Formato de fechas consistente

✅ **Después de importar:**
- Revisar mensajes de error
- Corregir datos problemáticos
- Buscar conflictos

### Seguridad

🔐 **Copias de seguridad:**
- Exportar datos regularmente (botón Exportar)
- Guardar archivos JSON en lugar seguro
- Mantener respaldos semanales

⚠️ **Eliminar datos:**
- Doble confirmación para eliminar
- No eliminar buques con cruceros activos
- Verificar antes de "Eliminar Todos"

---

<a name="faq"></a>
## ❓ 12. PREGUNTAS FRECUENTES

### General

**P: ¿Necesito instalar algo?**  
R: No. Es una aplicación web que funciona en el navegador.

**P: ¿Funciona sin internet?**  
R: Requiere conexión inicial. Los datos se guardan localmente.

**P: ¿Puedo usar en móvil?**  
R: Sí, pero la experiencia es mejor en computadora de escritorio.

### Buques

**P: ¿Cómo se clasifica un buque?**  
R: Automáticamente por su calado:
- A: ≥ 8.84m
- B: 7.33-8.83m
- C: ≤ 7.32m

**P: ¿Puedo cambiar la clase manualmente?**  
R: No. La clase depende del calado. Modifica el calado para cambiar la clase.

**P: ¿Qué pasa si elimino un buque con cruceros?**  
R: El sistema no te dejará. Primero debes eliminar sus cruceros.

### Cruceros

**P: ¿Por qué los tiempos no coinciden con mis cálculos?**  
R: Verifica:
- Clase del buque correcta
- Hora de entrada/salida correcta
- Los tiempos siguen las tablas oficiales de tránsito

**P: ¿Puedo cambiar los tiempos calculados?**  
R: No directamente. Los tiempos se calculan automáticamente. Si necesitas cambiarlos, modifica la hora de entrada/salida.

**P: ¿Qué hago si dos cruceros tienen el mismo horario?**  
R: El sistema detectará el conflicto. Usa "Buscar Conflictos" y aplica la solución sugerida.

### Reservas

**P: ¿Las reservas se actualizan automáticamente?**  
R: Sí. Cada vez que modificas un crucero, las reservas se recalculan.

**P: ¿Puedo editar una reserva manualmente?**  
R: Sí. Click en "Editar" en la fila de reservas. El cambio quedará registrado en el historial.

**P: ¿Por qué dice "No aplica" en algunas reservas?**  
R: Los buques Clase C no pasan por KM 118.5, por lo tanto no tienen reservas CPI.

### Reportes

**P: No puedo generar el reporte A3**  
R: Verifica que no haya conflictos sin resolver. El botón estará deshabilitado si hay conflictos.

**P: El reporte no se ve bien al imprimir**  
R: Configura:
- Papel: A3
- Orientación: Horizontal
- Escala: 100%

### Importación

**P: ¿Por qué falló la importación?**  
R: Revisa el mensaje de error. Comúnmente:
- Buque no existe en Base de Datos
- Formato de fecha incorrecto
- Columnas faltantes

**P: ¿Puedo importar buques y cruceros a la vez?**  
R: No. Primero importa/agrega los buques, luego los cruceros.

### Datos

**P: ¿Dónde se guardan mis datos?**  
R: Localmente en tu navegador (localStorage).

**P: ¿Se sincronizan entre dispositivos?**  
R: No. Cada dispositivo tiene sus propios datos.

**P: ¿Cómo hago respaldo?**  
R: Click en "Exportar" y guarda el archivo JSON.

---

<a name="soporte"></a>
## 📞 13. SOPORTE

### Contacto

**Email:** alfredojesus.zappa@gmail.com

**Asunto sugerido para emails:**
```
[Sistema Cruceros] Consulta sobre [tema]
```

### Información Útil al Contactar

Incluye siempre:
1. **Descripción del problema** - Qué intentabas hacer
2. **Pasos para reproducir** - Cómo llegaste al error
3. **Capturas de pantalla** - Si es posible
4. **Navegador y versión** - Chrome 120, Firefox 121, etc.
5. **Mensaje de error** - Si apareció alguno

### Ejemplo de Mensaje de Soporte

```
Asunto: [Sistema Cruceros] Error al importar CSV

Hola,

Estoy intentando importar un archivo CSV con 50 cruceros
pero recibo el error "Buque no encontrado" en todas las filas.

Pasos que seguí:
1. Descargué la plantilla
2. Completé los datos
3. Click en Importar
4. Seleccioné el archivo

Adjunto:
- Captura del error
- Archivo CSV usado

Navegador: Chrome 120.0.6099.129
Sistema: Windows 11

Gracias!
```

---

## 📚 RECURSOS ADICIONALES

### Documentos Disponibles

- 📘 **Manual de Usuario** - Este documento
- 📗 **Documentación Técnica** - Para el equipo de ingeniería
- 📙 **Guía de Importación** - Tutorial detallado de importación

### Videos Tutorial (Si están disponibles)

- 🎥 Introducción al Sistema (5 min)
- 🎥 Agregar y Gestionar Cruceros (10 min)
- 🎥 Resolución de Conflictos (8 min)
- 🎥 Generación de Reportes (5 min)

---

## 🎓 GLOSARIO

| Término | Significado |
|---------|-------------|
| **Calado** | Distancia vertical entre la línea de flotación y la parte más baja del casco |
| **Eslora** | Longitud máxima del buque |
| **Manga** | Anchura máxima del buque |
| **Puntal** | Altura desde la quilla hasta la cubierta principal |
| **IMO** | Número único de identificación de buques (7 dígitos) |
| **ETD** | Estimated Time of Departure (Hora estimada de salida) |
| **ETA** | Estimated Time of Arrival (Hora estimada de llegada) |
| **CPI** | Canal Punta Indio (KM 118.5) |
| **ACC** | Acceso al Canal |
| **KM** | Kilómetro (marca de distancia en el canal) |
| **Clase A/B/C** | Clasificación según calado del buque |
| **Conflicto** | Solapamiento de dos buques en el mismo punto |
| **Reserva** | Horario de clausura del canal para tránsito |

---

## ✅ CHECKLIST RÁPIDA

### ✓ Nuevo Usuario
- [ ] Leer sección "Inicio Rápido"
- [ ] Explorar las 4 pestañas
- [ ] Agregar un buque de prueba
- [ ] Agregar un crucero de prueba
- [ ] Ver las reservas generadas
- [ ] Probar la búsqueda global

### ✓ Operación Diaria
- [ ] Revisar notificaciones de cruceros próximos
- [ ] Actualizar estados de cruceros
- [ ] Agregar nuevos cruceros
- [ ] Buscar y resolver conflictos
- [ ] Generar reporte del día
- [ ] Exportar respaldo

### ✓ Fin de Semana/Mes
- [ ] Revisar cruceros pendientes
- [ ] Eliminar cruceros cancelados
- [ ] Exportar datos para respaldo
- [ ] Verificar consistencia de datos
- [ ] Actualizar base de buques si hay nuevos

---

## 🎉 CONCLUSIÓN

¡Felicitaciones! Ahora conoces todas las funcionalidades del **Sistema de Gestión de Cruceros Oceánicos**.

Este manual es tu guía de referencia rápida. Consúltalo cada vez que tengas dudas.

**Recuerda:**
- ✅ Los datos se guardan automáticamente
- ✅ El sistema calcula todo por ti
- ✅ Hay ayuda visual en cada paso
- ✅ Siempre puedes buscar con la búsqueda global
- ✅ Los conflictos tienen soluciones sugeridas

---

**Sistema de Gestión de Cruceros Oceánicos**  
**Canal Punta Indio - KM 118.5**

*© 2026 - Todos los derechos reservados*  
*Contacto: alfredojesus.zappa@gmail.com*

---

**Versión del Manual:** 1.0.0  
**Última actualización:** Enero 2026
