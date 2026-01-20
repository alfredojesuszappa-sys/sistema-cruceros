# 🔧 CORRECCIÓN: ETA de Amarre - Tiempo KM 118.5 → KM 59

## 📋 PROBLEMA DETECTADO
El sistema **NO estaba calculando correctamente** el tiempo de navegación entre KM 118.5 y KM 59, lo que causaba que el **ETA de amarre** fuera incorrecto.

---

## ⏱️ TIEMPOS CORRECTOS DE ENTRADA

### Según la tabla oficial:

```
┌─────────────────┬──────────────┬────────────┐
│ TRAMO           │ TIEMPO       │ MINUTOS    │
├─────────────────┼──────────────┼────────────┤
│ KM 239 → 118.5  │ 4:40:00      │ 280 min    │
│ KM 216 → 118.5  │ 4:10:00      │ 250 min    │
│ KM 118.5 → 59   │ 2:30:00      │ 150 min ⭐ │ ← FALTABA
│ KM 59 → 37      │ 1:18:00      │ 78 min     │
│ KM 37 → 7.3     │ 1:46:00      │ 106 min    │
│ KM 7.3 → 0      │ 0:26:00      │ 26 min     │
│ AMARRE          │ 0:30:00      │ 30 min     │
└─────────────────┴──────────────┴────────────┘
```

---

## ✅ SOLUCIÓN IMPLEMENTADA

### 1️⃣ Agregado el tiempo faltante
```typescript
export const ENTRY_TIMES = {
  KM239_TO_KM118_5: 280,  // 4:40:00
  KM216_TO_KM118_5: 250,  // 4:10:00
  KM118_5_TO_KM59: 150,   // 2:30:00 ⭐ NUEVO - FALTABA
  KM59_TO_KM37: 78,       // 1:18:00
  KM37_TO_KM7_3: 106,     // 1:46:00
  KM7_3_TO_KM0: 26,       // 0:26:00
  AMARRE: 30,             // 0:30:00
};
```

### 2️⃣ Actualizado el cálculo para Clase A
```typescript
case 'A':
  entry.km239 = startTime;
  entry.km118_5 = addMinutes(startTime, ENTRY_TIMES.KM239_TO_KM118_5);
  entry.km59 = addMinutes(entry.km118_5, ENTRY_TIMES.KM118_5_TO_KM59); // ⭐ CORREGIDO
  entry.km37 = addMinutes(entry.km59, ENTRY_TIMES.KM59_TO_KM37);
  entry.km7_3 = addMinutes(entry.km37, ENTRY_TIMES.KM37_TO_KM7_3);
  entry.km0 = addMinutes(entry.km7_3, ENTRY_TIMES.KM7_3_TO_KM0);
  entry.etaPto = addMinutes(entry.km0, ENTRY_TIMES.AMARRE);
```

### 3️⃣ Actualizado el cálculo para Clase B
```typescript
case 'B':
  entry.km216 = startTime;
  entry.km118_5 = addMinutes(startTime, ENTRY_TIMES.KM216_TO_KM118_5);
  entry.km59 = addMinutes(entry.km118_5, ENTRY_TIMES.KM118_5_TO_KM59); // ⭐ CORREGIDO
  entry.km37 = addMinutes(entry.km59, ENTRY_TIMES.KM59_TO_KM37);
  entry.km7_3 = addMinutes(entry.km37, ENTRY_TIMES.KM37_TO_KM7_3);
  entry.km0 = addMinutes(entry.km7_3, ENTRY_TIMES.KM7_3_TO_KM0);
  entry.etaPto = addMinutes(entry.km0, ENTRY_TIMES.AMARRE);
```

---

## 📊 EJEMPLO DE CÁLCULO CORRECTO

### Clase A - Calado 10.5m
Si **ETA KM 239 = 06:00**

```
06:00 + 4:40 = 10:40 (KM 118.5)
10:40 + 2:30 = 13:10 (KM 59)     ⭐ AHORA CORRECTO
13:10 + 1:18 = 14:28 (KM 37)
14:28 + 1:46 = 16:14 (KM 7.3)
16:14 + 0:26 = 16:40 (KM 0)
16:40 + 0:30 = 17:10 (ETA AMARRE) ✅
```

### Clase B - Calado 8.0m
Si **ETA KM 216 = 06:00**

```
06:00 + 4:10 = 10:10 (KM 118.5)
10:10 + 2:30 = 12:40 (KM 59)     ⭐ AHORA CORRECTO
12:40 + 1:18 = 13:58 (KM 37)
13:58 + 1:46 = 15:44 (KM 7.3)
15:44 + 0:26 = 16:10 (KM 0)
16:10 + 0:30 = 16:40 (ETA AMARRE) ✅
```

---

## 🧪 CÓMO PROBAR

1. **Crear/Editar un Crucero**
   - Clase A (calado ≥ 8.84m)
   - ETA inicial: 06:00

2. **Verificar los tiempos calculados**
   - KM 239: 06:00
   - KM 118.5: 10:40
   - **KM 59: 13:10** ⭐ (antes estaba mal)
   - ETA Puerto: 17:10 ✅

3. **Repetir con Clase B**
   - Calado entre 7.33-8.83m
   - Verificar que KM 59 se calcule correctamente desde KM 118.5

---

## 📁 ARCHIVO MODIFICADO
- `src/lib/ships.ts` - Función `calculateEntryTimes()`

---

## ✅ RESULTADO
Ahora el **ETA de amarre** se calcula correctamente para todas las clases de buques, sumando el tiempo real de navegación desde KM 118.5 hasta KM 59.

---

**Fecha de corrección:** ${new Date().toLocaleDateString('es-ES')}
**Estado:** ✅ RESUELTO
