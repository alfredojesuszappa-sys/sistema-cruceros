# 🚢 GUÍA RÁPIDA - SISTEMA DE CRUCEROS V3.0

## 🎯 Acceso Rápido

### Iniciar la Aplicación
```bash
npm run dev
```
Luego abrir: `http://localhost:3000`

---

## 🎨 INTERFAZ PRINCIPAL

### Secciones Visibles

```
┌─────────────────────────────────────────────────────┐
│          GESTIÓN DE CRUCEROS OCEÁNICOS              │
│          📍 Canal Punta Indio - KM 118.5            │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [🔍 Buscar Conflictos] [📤 Importar Excel]        │
│  [💾 Exportar Datos]    [📄 Generar Reporte A3]    │
│                                                     │
├─────────────────────────────────────────────────────┤
│  ⚠️ PANEL DE CONFLICTOS                            │
│  (Solo visible después de "Buscar Conflictos")     │
│                                                     │
│  🚨 Conflicto detectado:                           │
│  - Buque entrante vs Buque saliente                │
│  - Diferencia: XX minutos                          │
│  💡 Soluciones propuestas:                         │
│    [Aplicar] Retrasar salida                       │
│    [Aplicar] Adelantar entrada                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│  ➕ AGREGAR CRUCERO                                │
│                                                     │
│  [Buque ▼] [Fecha Entrada] [Hora Entrada]         │
│  [Fecha Salida] [Hora Salida] [Estado ▼]          │
│                                                     │
│  [➕ Agregar Crucero]                              │
│                                                     │
├─────────────────────────────────────────────────────┤
│  📋 PLANILLA DE CRUCEROS                           │
│                                                     │
│  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐     │
│  │ N°  │Buque│Entra│ETA  │Amarre│...│Estado│     │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤     │
│  │  1  │MSC..│29/01│14:40│16:50│...│✓CONF │     │
│  │  2  │NORW.│27/01│20:25│22:35│...│✓CONF │     │
│  │  3  │INSI.│30/01│ --- │08:30│...│⏳PEND│     │
│  └─────┴─────┴─────┴─────┴─────┴─────┴─────┘     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🔧 FUNCIONES PRINCIPALES

### 1️⃣ Buscar Conflictos

**Botón:** 🔍 Buscar Conflictos (Amarillo)

**Qué hace:**
- Analiza todos los cruceros CONFIRMADOS y SIN CONFIRMAR
- Busca conflictos en el KM 118.5
- Detecta si dos buques están muy cerca en tiempo (< 30 min)
- Muestra un panel con los conflictos encontrados

**Resultado:**
- ✅ Sin conflictos: "✅ ¡No se encontraron conflictos!"
- ⚠️ Con conflictos: Muestra panel con detalles y soluciones

**Ejemplo de conflicto:**
```
🚨 Conflicto en KM 118.5
├─ Buque Entrante: MSC SEAVIEW
│  → ETA KM 118.5: 29/01 14:40
├─ Buque Saliente: NORWEGIAN STAR
│  → ETD KM 118.5: 29/01 20:25
└─ Diferencia: 345 minutos

💡 Soluciones propuestas:
1. ⏰ Retrasar Salida
   NORWEGIAN STAR → 29/01 15:30
   [Aplicar]

2. ⏰ Adelantar Entrada
   MSC SEAVIEW → 29/01 09:15
   [Aplicar]
```

---

### 2️⃣ Importar Excel

**Botón:** 📤 Importar Excel (Azul)

**Qué hace:**
- Permite cargar cruceros desde un archivo Excel/CSV
- Formatos aceptados: `.xlsx`, `.xls`, `.csv`
- Valida y procesa los datos automáticamente

**Formato del Excel:**
```csv
Buque,FechaEntrada,HoraEntrada,FechaSalida,HoraSalida,Estado
MSC SEAVIEW,2026-01-29,10:00,2026-01-31,14:00,CONFIRMADO
NORWEGIAN STAR,2026-01-27,08:00,2026-01-29,14:00,CONFIRMADO
INSIGNIA,2026-01-30,06:00,2026-02-01,10:00,SIN CONFIRMAR
```

**Columnas requeridas:**
- `Buque`: Nombre del buque (debe existir en la BD)
- `FechaEntrada`: Formato YYYY-MM-DD
- `HoraEntrada`: Formato HH:mm
- `FechaSalida`: Formato YYYY-MM-DD
- `HoraSalida`: Formato HH:mm
- `Estado`: CONFIRMADO / SIN CONFIRMAR / CANCELADO

---

### 3️⃣ Exportar Datos

**Botón:** 💾 Exportar Datos (Verde)

**Qué hace:**
- Exporta todos los datos en formato JSON
- Incluye:
  - Base de datos de buques
  - Todos los cruceros registrados
  - Fecha de exportación

**Archivo generado:**
`cruceros-YYYY-MM-DD.json`

**Uso:**
- Backup de datos
- Transferir datos entre dispositivos
- Importar en otra instancia del sistema

---

### 4️⃣ Generar Reporte A3

**Botón:** 📄 Generar Reporte A3 (Rosa)

**Estado:**
- 🔴 Deshabilitado: Cuando hay conflictos sin resolver
- 🟢 Habilitado: Cuando NO hay conflictos

**Qué hace:**
- Genera un reporte imprimible en formato A3 horizontal
- Abre en nueva ventana
- Auto-impresión al cargar

**Contenido:**
```
┌─────────────────────────────────────────────┐
│  GESTIÓN DE CRUCEROS OCEÁNICOS              │
│  📍 Canal Punta Indio - KM 118.5            │
│  Fecha: 15/01/2026 22:25                    │
├─────────────────────────────────────────────┤
│  # │Buque│Clase│Agencia│Entrada│ETA│...│   │
├─────────────────────────────────────────────┤
│  1 │MSC..│  A  │MSC    │29/01..│...│CONF│  │
│  2 │NORW.│  B  │NAVIJ..│27/01..│...│CONF│  │
│  3 │INSI.│  C  │NAVIJ..│30/01..│...│PEND│  │
├─────────────────────────────────────────────┤
│  Total: 3 | Confirmados: 2 | Pendientes: 1 │
└─────────────────────────────────────────────┘
```

**Optimizado para:**
- Papel A3 (297 × 420 mm)
- Orientación: Horizontal
- Márgenes: 1cm
- Fuente: Aptos/Roboto 10px

---

## 📊 COLUMNAS DE LA PLANILLA

### Columnas Principales

| # | Columna | Descripción | Clase |
|---|---------|-------------|-------|
| 1 | N° | Número secuencial | Todas |
| 2 | Buque | Nombre, Bandera, IMO, Dimensiones, Clase | Todas |
| 3 | 📥 Entrada | Fecha/Hora inicio navegación | A, B, C |
| 4 | ETA Km. 118,5 | Hora llegada al punto crítico | A, B |
| 5 | ⚓ Amarre | Hora estimada de amarre en puerto | Todas |
| 6 | ETA Km. 59 (C) | Hora llegada a KM 59 (solo Clase C) | C |
| 7 | 📤 Zarpada | Hora de salida del puerto | Todas |
| 8 | ETD Km. 118,5 | Hora salida del punto crítico | A, B |
| 9 | ETD Km. 59 (C) | Hora salida de KM 59 (solo Clase C) | C |
| 10 | 🚢 Salida | Fecha/Hora fin navegación | A, B, C |
| 11 | Estado | CONFIRMADO / SIN CONFIRMAR / CANCELADO | Todas |
| 12 | Acciones | [Eliminar] | Todas |

### Colores Especiales

**Columnas con fondo:**
- **ETA Km. 118,5**: 🟢 Verde claro (entrada)
- **ETD Km. 118,5**: 🔴 Rojo claro (salida)
- **ETA/ETD Km. 59 (C)**: 🟢 Verde claro (solo Clase C)

**Clases de buques:**
- **Clase A**: 🔴 Rojo (Calado ≥ 8.84m)
- **Clase B**: 🟠 Ámbar (Calado 7.33-8.83m)
- **Clase C**: 🟢 Verde (Calado ≤ 7.32m)

**Estados:**
- **✓ CONFIRMADO**: 🟢 Verde
- **⏳ SIN CONFIRMAR**: 🟡 Amarillo
- **✖ CANCELADO**: ⚪ Gris

---

## 🎮 FLUJO DE TRABAJO RECOMENDADO

### Flujo Normal

```
1. Agregar Cruceros
   ↓
2. Buscar Conflictos
   ↓
3. Si hay conflictos:
   → Aplicar resoluciones
   → Volver a buscar conflictos
   ↓
4. Cuando no hay conflictos:
   → Generar Reporte A3
   → Imprimir
```

### Flujo con Importación

```
1. Preparar Excel con datos
   ↓
2. Importar Excel
   ↓
3. Verificar datos importados
   ↓
4. Buscar Conflictos
   ↓
5. Resolver conflictos (si los hay)
   ↓
6. Generar Reporte A3
```

---

## 🚨 EJEMPLOS DE USO

### Ejemplo 1: Agregar un Crucero Nuevo

**Datos:**
- Buque: COSTA FAVOLOSA
- Entrada: 05/02/2026 08:00
- Salida: 07/02/2026 18:00
- Estado: SIN CONFIRMAR

**Pasos:**
1. Seleccionar "COSTA FAVOLOSA" del dropdown
2. Ingresar fecha entrada: `2026-02-05`
3. Ingresar hora entrada: `08:00`
4. Ingresar fecha salida: `2026-02-07`
5. Ingresar hora salida: `18:00`
6. Seleccionar estado: "SIN CONFIRMAR"
7. Click en "➕ Agregar Crucero"

**Resultado:**
- ✅ Crucero agregado a la planilla
- 🔄 Todos los tiempos calculados automáticamente
- 📊 Tabla actualizada con el nuevo crucero

---

### Ejemplo 2: Resolver un Conflicto

**Situación:**
- MSC SEAVIEW (entrada) llega a KM 118.5 a las 14:40
- NORWEGIAN STAR (salida) llega a KM 118.5 a las 20:25
- ⚠️ Diferencia: Solo 345 minutos (5h 45min)

**Pasos:**
1. Click en "🔍 Buscar Conflictos"
2. Ver panel con conflicto detectado
3. Revisar las 2 propuestas:
   - Opción 1: Retrasar NORWEGIAN STAR
   - Opción 2: Adelantar MSC SEAVIEW
4. Click en "Aplicar" en la opción elegida
5. ✅ Horarios actualizados automáticamente
6. 🔄 Volver a buscar conflictos para verificar

**Resultado:**
- ✅ Conflicto resuelto
- 📊 Planilla actualizada con nuevos horarios
- 🟢 Botón "Generar Reporte A3" ahora habilitado

---

### Ejemplo 3: Generar Reporte A3

**Requisito:**
- ✅ Todos los conflictos resueltos

**Pasos:**
1. Verificar que no hay conflictos (buscar primero)
2. Click en "📄 Generar Reporte A3"
3. Se abre nueva ventana con el reporte
4. Auto-impresión se inicia
5. Configurar impresora:
   - Papel: A3
   - Orientación: Horizontal
   - Márgenes: 1cm

**Resultado:**
- 📄 Reporte profesional impreso
- 📊 Todos los datos en formato tabla
- 🎨 Colores y estilos optimizados

---

## 🔑 ATAJOS DE TECLADO

**No implementados aún, pero sugeridos:**
- `Ctrl + N`: Nuevo crucero
- `Ctrl + S`: Guardar/Exportar
- `Ctrl + F`: Buscar conflictos
- `Ctrl + P`: Generar reporte

---

## ⚙️ CONFIGURACIÓN AVANZADA

### Margen de Seguridad

**Default:** 30 minutos

**Para cambiar:**
1. Editar `src/lib/ships.ts`
2. Buscar la función `detectCrossingConflicts`
3. Cambiar el parámetro `safetyMarginMinutes`

```typescript
export function detectCrossingConflicts(
  crossings: ShipCrossing[],
  safetyMarginMinutes: number = 30  // ← Cambiar aquí
): CrossingConflict[] {
  // ...
}
```

---

### Tiempos de Navegación

**Para modificar tiempos:**
1. Editar `src/lib/ships.ts`
2. Modificar las constantes `ENTRY_TIMES` y `EXIT_TIMES`

```typescript
export const ENTRY_TIMES = {
  KM239_TO_KM118_5: 280,  // ← en minutos
  KM216_TO_KM118_5: 250,
  // ...
};
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Problema: No aparecen los cruceros de prueba

**Solución:**
```javascript
// En la consola del navegador:
localStorage.clear()
location.reload()
```

---

### Problema: Los conflictos no se detectan

**Verificar:**
1. Estado de los cruceros (deben ser CONFIRMADO o SIN CONFIRMAR)
2. Las clases de los buques (Clase C no genera conflictos en KM 118.5 en entrada)
3. Los horarios (diferencia menor a 30 min)

---

### Problema: El botón "Generar Reporte A3" está deshabilitado

**Causa:**
Hay conflictos sin resolver

**Solución:**
1. Click en "🔍 Buscar Conflictos"
2. Ver panel de conflictos
3. Aplicar resoluciones
4. Verificar que no queden conflictos

---

### Problema: Error al importar Excel

**Verificar formato:**
- Columnas correctas
- Nombres de buques existen en la BD
- Fechas en formato YYYY-MM-DD
- Horas en formato HH:mm
- Estados válidos (CONFIRMADO, SIN CONFIRMAR, CANCELADO)

---

## 📚 RECURSOS ADICIONALES

### Documentación Completa
- `CAMBIOS_COMPLETADOS_V3.md`: Detalle técnico de todos los cambios
- `RESPALDO_CODIGO_FUNCIONANDO.md`: Backup de la versión anterior
- `README.md`: Información general del proyecto

### Archivos Importantes
- `src/lib/ships.ts`: Lógica de negocio y cálculos
- `src/components/CrossingManagerSimple2.tsx`: Interfaz principal
- `src/pages/index.astro`: Punto de entrada

---

## 🎉 ¡LISTO PARA USAR!

El sistema está completamente funcional con:
- ✅ 75 buques en la base de datos
- ✅ 3 cruceros de prueba con conflictos
- ✅ Sistema de detección y resolución de conflictos
- ✅ Importación desde Excel
- ✅ Exportación de datos
- ✅ Generación de reportes A3
- ✅ Diseño profesional y responsive

**¡Comienza a usar el sistema ahora! 🚢⚓**
