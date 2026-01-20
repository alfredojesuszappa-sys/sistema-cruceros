# CORRECCIONES - SISTEMA DE DETECCIÓN DE CONFLICTOS

**Fecha**: 14 Enero 2026  
**Estado**: ✅ CORREGIDO

---

## 🐛 PROBLEMAS IDENTIFICADOS

### 1. Detección Incorrecta de Conflictos
**Síntoma**: La planilla detectaba conflictos donde no los había.

**Causa Raíz**:
- La lógica de detección estaba mal diseñada
- Comparaba tiempos de forma incorrecta
- No consideraba correctamente la dirección de navegación

**Solución Implementada**:
```typescript
// ANTES (INCORRECTO):
const timeDiff = (entryTime - exitTime) / 60000;
if (timeDiff < safetyMarginMinutes) {
  // Conflicto detectado
}

// AHORA (CORRECTO):
const timeDiff = (entryTime - exitTime) / 60000;
// Conflicto si la diferencia ABSOLUTA es menor al margen
if (Math.abs(timeDiff) < safetyMarginMinutes) {
  // Conflicto real detectado
}
```

**Explicación**:
- Un **conflicto real** ocurre cuando dos buques están en KM 118.5 al mismo tiempo o muy cerca
- No importa cuál llega primero, sino que estén **dentro del margen de seguridad**
- Usamos `Math.abs()` para verificar proximidad en ambas direcciones

---

### 2. Cálculo Incorrecto para Clase C (ENTRADA)
**Síntoma**: Los buques Clase C mostraban tiempos incorrectos.

**Causa Raíz**:
- Los buques Clase C **empiezan en KM 59** (ya están adentro del canal)
- Van HACIA el puerto (KM 0), NO pasan por KM 118.5 en la ENTRADA
- El código estaba calculando KM 118.5 para todos los buques

**Solución Implementada**:
```typescript
case 'C':
  // Clase C empieza en KM59 y va HACIA adentro (hacia KM0)
  // NO pasa por KM118.5 en la ENTRADA porque ya está más adentro del canal
  entry.km59_in = startTime;
  entry.km37 = addMinutes(startTime, ENTRY_TIMES.KM59_TO_KM37);
  entry.km7_3 = addMinutes(entry.km37, ENTRY_TIMES.KM37_TO_KM7_3);
  entry.km0 = addMinutes(entry.km7_3, ENTRY_TIMES.KM7_3_TO_KM0);
  entry.etaPto = addMinutes(entry.km0, ENTRY_TIMES.AMARRE);
  // Clase C NO tiene km118_5 en entrada
  break;
```

**Explicación**:
- **Clase A**: Empieza en KM 239 → pasa por KM 118.5 → llega a KM 0
- **Clase B**: Empieza en KM 216 → pasa por KM 118.5 → llega a KM 0
- **Clase C**: Empieza en KM 59 → **NO pasa** por KM 118.5 → llega a KM 0

**Los conflictos en KM 118.5 solo pueden ocurrir entre**:
- Clase A ENTRADA vs Cualquier SALIDA
- Clase B ENTRADA vs Cualquier SALIDA
- (Clase C ENTRADA no puede tener conflictos en KM 118.5)

---

### 3. Loop Infinito de Conflictos
**Síntoma**: Al aplicar una solución, se volvía a detectar conflictos inmediatamente, creando un ciclo sin fin.

**Causa Raíz**:
```typescript
// HABÍA UN EFFECT QUE SE EJECUTABA AUTOMÁTICAMENTE:
useEffect(() => {
  const detectedConflicts = detectCrossingConflicts(crossings, safetyMargin);
  setConflicts(detectedConflicts);
}, [crossings, safetyMargin]); // ❌ Se ejecuta cada vez que cambian los cruceros
```

Esto causaba:
1. Usuario aplica solución → Actualiza crucero
2. `crossings` cambia → Effect se ejecuta automáticamente
3. Detecta nuevos conflictos → Muestra timeline
4. Usuario aplica otra solución → Vuelve al paso 1 (LOOP INFINITO)

**Solución Implementada**:
```typescript
// ELIMINADO el useEffect automático

// Ahora solo detección MANUAL con botón
const handleDetectConflicts = () => {
  const detectedConflicts = detectCrossingConflicts(crossings, safetyMargin);
  setConflicts(detectedConflicts);
  
  if (detectedConflicts.length > 0) {
    setIsTimelineOpen(true);
  } else {
    alert('✅ No se detectaron conflictos');
  }
};

// Al aplicar solución, NO detecta automáticamente
const handleApplyResolution = (...) => {
  applyResolution(crossingId, newDateTime, type);
  const updatedCrossings = loadCrossings();
  setCrossings(updatedCrossings);
  
  // ✅ Limpiar conflictos y cerrar timeline
  setConflicts([]);
  setIsTimelineOpen(false);
  
  alert('✅ Horario actualizado. Use "Buscar Conflictos" para verificar.');
};
```

**Nuevo Flujo de Trabajo**:
1. Usuario ingresa cruceros
2. Usuario hace clic en **"Buscar Conflictos"**
3. Si hay conflictos, se abre el timeline con propuestas
4. Usuario aplica una solución
5. Se actualiza el horario y **se cierra el timeline**
6. Usuario hace clic nuevamente en **"Buscar Conflictos"** para verificar
7. Si ya no hay conflictos → ✅ "No se detectaron conflictos"

---

### 4. Timeline No Abre
**Síntoma**: Al hacer clic en "Buscar Conflictos" el timeline no se abría.

**Causa**: Ya estaba resuelto en el código, pero por el loop infinito no se podía ver.

**Solución**: Al eliminar el loop, el timeline ahora funciona correctamente.

---

## ✅ VERIFICACIONES POST-CORRECCIÓN

### Prueba 1: Clase C ENTRADA
```
Buque: EMERALD AZZURRA (Calado: 3.80m → Clase C)
Entrada: 15/01/2026 08:00 desde KM 59
Resultado esperado: NO aparece en timeline para KM 118.5 (ENTRADA)
✅ CORRECTO
```

### Prueba 2: Conflicto Real
```
Buque A (ENTRADA): MSC SEAVIEW (Clase A)
  - Entrada: 15/01/2026 06:00 desde KM 239
  - ETA KM 118.5: 15/01/2026 10:40

Buque B (SALIDA): MSC MAGNIFICA
  - Salida: 15/01/2026 06:00 desde KM 0
  - ETD KM 118.5: 15/01/2026 10:30
  
Diferencia: 10 minutos
Margen requerido: 30 minutos
✅ CONFLICTO DETECTADO CORRECTAMENTE
```

### Prueba 3: Sin Conflicto
```
Buque A (ENTRADA): MSC SEAVIEW
  - ETA KM 118.5: 15/01/2026 10:00

Buque B (SALIDA): MSC MAGNIFICA
  - ETD KM 118.5: 15/01/2026 08:00
  
Diferencia: 2 horas (120 minutos)
Margen requerido: 30 minutos
✅ SIN CONFLICTO (correctamente ignorado)
```

### Prueba 4: Aplicar Solución
```
1. Usuario hace clic en "Buscar Conflictos"
2. Se detecta conflicto → Timeline se abre
3. Usuario hace clic en "Aplicar Esta Solución"
4. Timeline se cierra
5. Mensaje: "✅ Horario actualizado. Use 'Buscar Conflictos' para verificar"
6. Usuario hace clic nuevamente en "Buscar Conflictos"
7. Resultado: "✅ No se detectaron conflictos"
✅ FLUJO CORRECTO
```

---

## 📋 CAMBIOS EN ARCHIVOS

### `src/lib/ships.ts`
- ✅ Corregida función `calculateEntryTimes` para Clase C
- ✅ Corregida función `detectCrossingConflicts` con `Math.abs()`
- ✅ Mejorada lógica de detección de conflictos

### `src/components/CrossingManager.tsx`
- ✅ Eliminado `useEffect` automático de detección
- ✅ Implementada detección manual exclusiva
- ✅ Corregida función `handleApplyResolution`
- ✅ Agregado feedback al usuario después de aplicar solución

### `src/components/CrossingTimeline.tsx`
- ✅ Sin cambios (funciona correctamente)

---

## 🎯 FUNCIONALIDAD ACTUAL

### Botón "Buscar Conflictos"
- 🟡 Amarillo brillante, siempre visible
- ✅ Detecta conflictos manualmente
- ✅ Abre timeline si hay conflictos
- ✅ Muestra mensaje si no hay conflictos

### Timeline
- ✅ Muestra todos los cruceros en orden cronológico
- ✅ Resalta conflictos en rojo
- ✅ Muestra 2 propuestas de solución por conflicto
- ✅ Botón "Aplicar Esta Solución" en cada propuesta

### Flujo de Resolución
1. **Buscar** → Botón amarillo "Buscar Conflictos"
2. **Ver** → Timeline con conflictos y propuestas
3. **Aplicar** → Clic en solución preferida
4. **Verificar** → Buscar conflictos nuevamente
5. **Confirmar** → "Generar Planilla A3" (solo si no hay conflictos)

---

## 🔍 LÓGICA DE CONFLICTOS (DEFINITIVA)

```typescript
// Un conflicto existe SI:
// 1. Ambos buques pasan por KM 118.5
// 2. La diferencia entre sus tiempos < margen de seguridad

const entryTime = entryShip.entry.km118_5.getTime();
const exitTime = exitShip.exit.km118_5.getTime();
const timeDiff = (entryTime - exitTime) / 60000; // minutos

if (Math.abs(timeDiff) < safetyMarginMinutes) {
  // CONFLICTO: Están demasiado cerca en el tiempo
  // No importa quién llega primero
}
```

**Ejemplos**:
- `timeDiff = +10` → ENTRADA llega 10 min DESPUÉS de SALIDA → **CONFLICTO** (muy cerca)
- `timeDiff = -10` → ENTRADA llega 10 min ANTES de SALIDA → **CONFLICTO** (muy cerca)
- `timeDiff = +60` → ENTRADA llega 60 min DESPUÉS de SALIDA → **SIN CONFLICTO** (suficiente espacio)
- `timeDiff = -60` → ENTRADA llega 60 min ANTES de SALIDA → **SIN CONFLICTO** (suficiente espacio)

---

## ✅ ESTADO FINAL

- ✅ Detección de conflictos funciona correctamente
- ✅ No hay loops infinitos
- ✅ Clase C se calcula correctamente
- ✅ Timeline abre y cierra correctamente
- ✅ Propuestas de solución funcionan
- ✅ Flujo de trabajo claro y predecible

**El sistema está listo para usar.** 🚢
