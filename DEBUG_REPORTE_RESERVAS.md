# 🔍 Debug: Reporte A3 - Horarios de Reservas

## Fecha: 16 de Enero 2026 - 22:27

---

## 🎯 Problema Reportado

El reporte A3 no está cargando correctamente los horarios de las reservas.

---

## 🔧 Mejoras Aplicadas para Debug

### 1. Logs Mejorados en `generateCrossingReport` (ships.ts)

#### Al inicio de la función:
```typescript
console.log('📊 ========== INICIO GENERACIÓN REPORTE ==========');
console.log('📊 generateCrossingReport - Crossings:', crossings.length);
console.log('📊 generateCrossingReport - Ships:', ships.length);
console.log('📊 generateCrossingReport - Reservas recibidas:', reservations?.length || 0);

if (reservations && reservations.length > 0) {
  console.log('📋 Primeras 3 reservas recibidas:');
  reservations.slice(0, 3).forEach((r, i) => {
    console.log(`  ${i + 1}. Reserva:`, {
      cruiseId: r.cruiseId,
      buque: r.buque,
      clase: r.clase,
      CPI_IN: r.reservaCPIEntrada,
      ACC_IN: r.reservaACCEntrada,
      ACC_OUT: r.reservaACCSalida,
      CPI_OUT: r.reservaCPISalida
    });
  });
}
```

#### En el mapeo de reservas:
```typescript
reservations.forEach((r: any) => {
  reservationsMap.set(r.cruiseId, r);
  console.log(`  → Mapeando: cruiseId=${r.cruiseId} → buque=${r.buque}`);
});

console.log('🗺️ Total reservas mapeadas:', reservationsMap.size);
console.log('🗺️ CruiseIds en el mapa:', Array.from(reservationsMap.keys()));
```

#### En el bucle de generación de filas:
```typescript
console.log(`🔍 Row ${index + 1}/${sortedCrossings.length}:`, {
  crossingId: crossing.id,
  shipId: ship.id,
  shipName: ship.buque,
  clase: clase,
  reservationFound: !!reservation,
  reservationCruiseId: reservation?.cruiseId,
  reservationBuque: reservation?.buque
});

if (reservation) {
  console.log(`  ✅ Reserva encontrada para ${ship.buque}:`, {
    CPI_IN: reservation.reservaCPIEntrada,
    ACC_IN: reservation.reservaACCEntrada,
    ACC_OUT: reservation.reservaACCSalida,
    CPI_OUT: reservation.reservaCPISalida
  });
} else {
  console.warn(`  ❌ NO se encontró reserva para crossing.id=${crossing.id}`);
}
```

---

### 2. Logs Mejorados en `handleGenerateReport` (CrossingManagerSimple2.tsx)

```typescript
console.log('📊 ========== PREPARANDO REPORTE ==========');
console.log('📊 Total de crossings:', crossings.length);

const savedReservations = localStorage.getItem('channelReservations');
console.log('📦 localStorage channelReservations:', savedReservations ? 'EXISTE' : 'NO EXISTE');

if (savedReservations) {
  reservations = JSON.parse(savedReservations);
  console.log('📊 Reservas cargadas:', reservations.length);
  
  if (reservations.length > 0) {
    console.log('📋 Primeras 3 reservas:');
    reservations.slice(0, 3).forEach((r, i) => {
      console.log(`  ${i + 1}.`, {
        cruiseId: r.cruiseId,
        buque: r.buque,
        clase: r.clase,
        CPI_IN: r.reservaCPIEntrada,
        ACC_IN: r.reservaACCEntrada
      });
    });
    
    // Verificar IDs de crossings vs IDs de reservas
    const crossingIds = new Set(crossings.map(c => c.id));
    const reservationIds = new Set(reservations.map(r => r.cruiseId));
    
    console.log('🔍 Análisis de IDs:');
    console.log('  - Crossing IDs:', Array.from(crossingIds).slice(0, 5));
    console.log('  - Reservation cruiseIds:', Array.from(reservationIds).slice(0, 5));
    
    const matching = reservations.filter(r => crossingIds.has(r.cruiseId));
    console.log(`  - Coincidencias: ${matching.length}/${reservations.length}`);
  }
}

console.log('🚀 Generando HTML del reporte...');
```

---

## 🧪 Cómo Probar

### Paso 1: Generar el Reporte
1. Abrir la aplicación
2. Ir a la pestaña **"Cruceros"**
3. Hacer clic en **"Generar Reporte A3"**

### Paso 2: Revisar la Consola del Navegador

Deberías ver una salida similar a esta:

```
📊 ========== PREPARANDO REPORTE ==========
📊 Total de crossings: 122
📦 localStorage channelReservations: EXISTE
📊 Reservas cargadas: 122
📋 Primeras 3 reservas:
  1. { cruiseId: "abc123", buque: "Celebrity Eclipse", clase: "A", CPI_IN: "20/01/2026 08:00", ACC_IN: "20/01/2026 15:30" }
  2. { cruiseId: "def456", buque: "Seven Seas Navigator", clase: "B", CPI_IN: "21/01/2026 09:30", ACC_IN: "21/01/2026 16:00" }
  3. { cruiseId: "ghi789", buque: "Silver Cloud", clase: "C", CPI_IN: "No aplica", ACC_IN: "22/01/2026 14:00" }
🔍 Análisis de IDs:
  - Crossing IDs: ["abc123", "def456", "ghi789", ...]
  - Reservation cruiseIds: ["abc123", "def456", "ghi789", ...]
  - Coincidencias: 122/122
🚀 Generando HTML del reporte...

📊 ========== INICIO GENERACIÓN REPORTE ==========
📊 generateCrossingReport - Crossings: 122
📊 generateCrossingReport - Ships: 75
📊 generateCrossingReport - Reservas recibidas: 122
📋 Primeras 3 reservas recibidas:
  1. Reserva: { cruiseId: "abc123", buque: "Celebrity Eclipse", clase: "A", CPI_IN: "20/01/2026 08:00", ACC_IN: "20/01/2026 15:30", ACC_OUT: "21/01/2026 12:00", CPI_OUT: "21/01/2026 08:00" }
  [...]
🗺️ Total reservas mapeadas: 122
🗺️ CruiseIds en el mapa: ["abc123", "def456", "ghi789", ...]

🔍 Row 1/122: { crossingId: "abc123", shipId: "1", shipName: "Celebrity Eclipse", clase: "A", reservationFound: true, reservationCruiseId: "abc123", reservationBuque: "Celebrity Eclipse" }
  ✅ Reserva encontrada para Celebrity Eclipse: { CPI_IN: "20/01/2026 08:00", ACC_IN: "20/01/2026 15:30", ACC_OUT: "21/01/2026 12:00", CPI_OUT: "21/01/2026 08:00" }

[... más filas ...]
```

---

## 🔍 Qué Buscar en los Logs

### ✅ Señales de que TODO está bien:

1. **localStorage existe:**
   ```
   📦 localStorage channelReservations: EXISTE
   ```

2. **Reservas se cargan:**
   ```
   📊 Reservas cargadas: 122
   ```

3. **Datos de reservas son correctos:**
   ```
   CPI_IN: "20/01/2026 08:00"  // ✅ Formato correcto
   ACC_IN: "20/01/2026 15:30"  // ✅ Formato correcto
   ```

4. **IDs coinciden:**
   ```
   - Coincidencias: 122/122  // ✅ Todos coinciden
   ```

5. **Reservas se mapean correctamente:**
   ```
   🗺️ Total reservas mapeadas: 122  // ✅ Todas mapeadas
   ```

6. **Reservas se encuentran en el bucle:**
   ```
   ✅ Reserva encontrada para Celebrity Eclipse
   ```

---

### ❌ Señales de problemas:

1. **localStorage no existe:**
   ```
   📦 localStorage channelReservations: NO EXISTE
   ⚠️ No hay reservas guardadas en localStorage
   ```
   **Solución:** Ir a la pestaña "Reservas de Canal" para que se calculen

2. **Datos vacíos o incorrectos:**
   ```
   CPI_IN: "N/A"  // ❌ Debería tener fecha
   CPI_IN: ""     // ❌ Vacío
   ```
   **Solución:** Verificar que el cálculo de reservas funcione

3. **IDs no coinciden:**
   ```
   - Coincidencias: 0/122  // ❌ Ninguno coincide
   ```
   **Solución:** Problema con los IDs, verificar cómo se generan

4. **Reservas no se encuentran:**
   ```
   ❌ NO se encontró reserva para crossing.id=abc123
   ```
   **Solución:** Verificar el mapeo de IDs

---

## 🎯 Posibles Causas del Problema

### 1. localStorage Vacío
**Síntoma:** `localStorage channelReservations: NO EXISTE`

**Causa:** Las reservas nunca se calcularon

**Solución:**
1. Ir a la pestaña "Reservas de Canal"
2. Esperar a que se calculen automáticamente
3. Volver a generar el reporte

---

### 2. IDs No Coinciden
**Síntoma:** `Coincidencias: 0/122`

**Causa:** Los IDs de `crossing.id` no coinciden con `reservation.cruiseId`

**Solución:** Verificar cómo se generan los IDs en:
- `addCrossing()` en `ships.ts`
- `calculateReservations()` en `ChannelReservations.tsx`

**Verificar en logs:**
```
Crossing IDs: ["abc123", ...]
Reservation cruiseIds: ["xyz789", ...]  // ❌ No coinciden
```

---

### 3. Formato de Fecha Incorrecto
**Síntoma:** Las reservas se encuentran pero el reporte muestra "N/A"

**Causa:** `formatReservation()` no puede parsear el formato

**Ejemplo:**
```
CPI_IN: "2026-01-20T08:00:00"  // ❌ Formato ISO (incorrecto)
CPI_IN: "20/01/2026 08:00"     // ✅ Formato correcto
```

**Solución:** Verificar que `calculateReservations()` use:
```typescript
reservation.reservaCPIEntrada = format(reserva, 'dd/MM/yyyy HH:mm');
```

---

### 4. Reservas No Se Guardan
**Síntoma:** Las reservas se calculan pero no se guardan en localStorage

**Causa:** `localStorage.setItem()` no se está llamando

**Solución:** Verificar que en `ChannelReservations.tsx` se llame:
```typescript
localStorage.setItem('channelReservations', JSON.stringify(calculated));
```

---

## 📋 Checklist de Diagnóstico

Ejecuta este checklist en orden:

- [ ] 1. Abrir la aplicación y la consola del navegador (F12)
- [ ] 2. Ir a la pestaña "Reservas de Canal"
- [ ] 3. Verificar que se vean las reservas calculadas en la tabla
- [ ] 4. Ir a Application > Local Storage > verificar que existe `channelReservations`
- [ ] 5. Volver a la pestaña "Cruceros"
- [ ] 6. Hacer clic en "Generar Reporte A3"
- [ ] 7. Revisar los logs en la consola
- [ ] 8. Identificar en qué paso falla según los logs
- [ ] 9. Aplicar la solución correspondiente
- [ ] 10. Volver a generar el reporte

---

## 🔄 Configuración que Funcionó (Referencia)

Según `CORRECCION_REPORTE_Y_MANUAL.md`, la configuración que funcionaba es:

### formatReservation (ships.ts):
```typescript
const formatReservation = (value?: string) => {
  if (!value || value === 'No aplica' || value === 'Error cálculo' || value === 'N/A') {
    return '<span style="color: #94a3b8; font-size: 10px;">N/A</span>';
  }
  
  try {
    if (value.includes('/') && value.includes(':')) {
      const parts = value.trim().split(' ');
      if (parts.length >= 2) {
        const fecha = parts[0]; // DD/MM/YYYY
        const hora = parts[1];  // HH:mm
        return `<div class="date">${fecha}</div><div class="time">${hora}</div>`;
      }
    }
    return `<div class="time">${value}</div>`;
  } catch (error) {
    return `<div class="time">${value}</div>`;
  }
};
```

### Formato de fecha en calculateReservations:
```typescript
reservation.reservaCPIEntrada = format(reserva, 'dd/MM/yyyy HH:mm');
```

### Mapeo de reservas:
```typescript
const reservationsMap = new Map();
reservations.forEach((r: any) => {
  reservationsMap.set(r.cruiseId, r);
});
```

### Búsqueda de reserva:
```typescript
const reservation = reservationsMap.get(crossing.id);
```

---

## 📊 Próximos Pasos

1. ✅ **Generar el reporte** con los logs mejorados
2. 🔍 **Revisar la consola** y copiar los logs
3. 📋 **Identificar** en qué paso está fallando
4. 🔧 **Aplicar** la solución correspondiente
5. ✅ **Verificar** que las reservas se muestren correctamente

---

**Nota:** Los logs ahora son mucho más detallados. Comparte los logs de la consola para identificar exactamente dónde está el problema.

---

**Estado:** 🔍 DEBUG EN PROGRESO  
**Fecha:** 16 de Enero 2026  
**Versión:** v4.2-debug  

---

**Contacto:** alfredojesus.zappa@gmail.com
