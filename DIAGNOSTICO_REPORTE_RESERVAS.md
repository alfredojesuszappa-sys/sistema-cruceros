# 🔍 DIAGNÓSTICO: Reservas de Canal NO Aparecen en Reporte A3

## 📊 Problema Identificado

### Usuario reporta:
> "La planilla sistema de cruceros no está registrando las fechas de amarre y zarpada"

### Causa Raíz:
**El reporte A3 NO está mostrando las columnas correctas para AMARRE y ZARPADA**

---

## 🎯 Análisis del Código

### 1. Estructura de Datos (`ShipCrossing`)
```typescript
export interface ShipCrossing {
  diaEntrada: Date;        // ❌ Inicio del tránsito (KM 239/216/59)
  horaEntrada: string;     // ❌ Hora inicio navegación
  diaSalida: Date;         // ✅ Fecha de ZARPADA del puerto
  horaSalida: string;      // ✅ Hora de ZARPADA (ETD)
  entry: EntryKilometers;  // ✅ Incluye entry.etaPto (AMARRE)
  exit: ExitKilometers;    // ✅ Incluye exit.etdPto (ZARPADA)
}
```

### 2. Cálculos de Tiempo
```typescript
// ENTRADA: Calcular ETA a cada punto
entry.km239 = startTime;              // Inicio Clase A
entry.km118_5 = addMinutes(...);      // Paso KM 118.5
entry.etaPto = addMinutes(entry.km0, ENTRY_TIMES.AMARRE); // ✅ AMARRE EN PUERTO

// SALIDA: Calcular ETD desde puerto
exit.etdPto = etdPto;                 // ✅ ZARPADA DEL PUERTO
exit.km59 = addMinutes(etdPto, ...);  // Paso KM 59
exit.km118_5 = addMinutes(...);       // Paso KM 118.5
```

### 3. Reservas de Canal (ACC)
```typescript
// ENTRADA: ACC = etaPto - X horas ANTES del amarre
if (crossing.entry.etaPto) {
  let horasAntes = shipClass === 'A' ? 2.5 : shipClass === 'B' ? 2.0 : 1.5;
  const accInTime = addMinutes(crossing.entry.etaPto, -(horasAntes * 60));
  reservation.reservaACCEntrada = format(accInTime, 'dd/MM/yyyy HH:mm');
}

// SALIDA: ACC = etdPto - X horas ANTES de la zarpada
if (crossing.exit.etdPto) {
  let horasAntes = shipClass === 'A' ? 2.5 : shipClass === 'B' ? 2.0 : 1.5;
  const accOutTime = addMinutes(crossing.exit.etdPto, -(horasAntes * 60));
  reservation.reservaACCSalida = format(accOutTime, 'dd/MM/yyyy HH:mm');
}
```

---

## ❌ Error en el Reporte A3

### Columnas Actuales (INCORRECTAS):
```html
<th>Entrada</th>       <!-- diaEntrada / horaEntrada = Inicio tránsito ❌ -->
<th>Zarpada</th>       <!-- diaSalida / horaSalida = Zarpada ✅ -->
```

### Columnas que DEBERÍAN mostrarse:
```html
<th>⚓ Amarre (ETA Pto)</th>     <!-- entry.etaPto ✅ -->
<th>🚢 Zarpada (ETD Pto)</th>   <!-- exit.etdPto ✅ -->
```

---

## ✅ Solución

### 1. Cambiar las columnas del reporte para mostrar:
- **AMARRE** = `entry.etaPto` (hora calculada de llegada al puerto KM 0)
- **ZARPADA** = `exit.etdPto` (hora de zarpada del puerto KM 0)

### 2. Mantener las columnas existentes como información adicional:
- **Inicio Tránsito** = `diaEntrada` / `horaEntrada`
- **Fin Tránsito** = Según clase (KM 239/216/59)

---

## 📋 Plan de Corrección

### Paso 1: Actualizar la tabla en `CrossingManagerSimple2.tsx`
- Agregar columnas claras para "Amarre" y "Zarpada"
- Mostrar `entry.etaPto` y `exit.etdPto`

### Paso 2: Actualizar `generateCrossingReport` en `ships.ts`
- Cambiar las columnas del reporte HTML
- Asegurar que se muestren las fechas correctas

### Paso 3: Verificar cálculos de reservas
- Confirmar que ACC se calcula desde `etaPto` y `etdPto`
- Verificar que CPI se calcula correctamente

---

## 🎯 Resultado Esperado

### Tabla Planilla (ANTES):
| Entrada | ETA KM 118.5 | Zarpada | ETD KM 118.5 |
|---------|-------------|---------|-------------|
| 29/01 08:00 | 29/01 14:30 | 31/01 14:00 | 31/01 20:30 |

### Tabla Planilla (DESPUÉS):
| Entrada | ETA KM 118.5 | ⚓ Amarre | 🚢 Zarpada | ETD KM 118.5 | Salida |
|---------|-------------|----------|-----------|-------------|---------|
| 29/01 08:00 | 29/01 14:30 | **29/01 16:45** | **31/01 14:00** | 31/01 20:30 | 01/02 03:00 |

### Reservas ACC:
- **ACC Entrada**: 29/01 **14:15** (2:30h antes de Amarre **16:45**)
- **ACC Salida**: 31/01 **11:30** (2:30h antes de Zarpada **14:00**)

---

## 🚀 Estado
- [ ] Diagnóstico completado ✅
- [ ] Actualizar tabla planilla
- [ ] Actualizar reporte A3
- [ ] Verificar reservas ACC
- [ ] Probar con datos reales

---

**Fecha:** 2026-01-20
**Prioridad:** 🔴 CRÍTICA
**Impacto:** Las reservas de canal se calculan pero NO se muestran porque las columnas mostradas NO son las usadas en los cálculos.
