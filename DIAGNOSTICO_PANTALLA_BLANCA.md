# 🔍 DIAGNÓSTICO: Pantalla en Blanco en Sistema de Cruceros

## 📊 Problema Reportado

**Usuario:** "PODES ARREGLAR EL TEMA DE LA PANTALLA EN BLANCO DE LA PESTAÑA SISTEMA DE CRUCEROS?"

---

## 🎯 Causa Probable

### 1. **Datos Antiguos en localStorage**
Los cruceros existentes en localStorage fueron creados ANTES de agregar los campos:
- `entry.etaPto` (Amarre)
- `exit.etdPto` (Zarpada)

### 2. **Error en el Renderizado**
Cuando el componente intenta acceder a `crossing.exit.etdPto`:
```typescript
{crossing.exit.etdPto ? (
  format(crossing.exit.etdPto, 'dd/MM/yy')  // ❌ ERROR: etdPto = undefined
) : <span>—</span>}
```

Si `etdPto` no existe o no es una fecha válida, `format()` lanza un error y React muestra pantalla en blanco.

---

## ✅ Soluciones

### Opción 1: Migración Automática de Datos (Recomendada)
Agregar una función que actualice todos los cruceros existentes para incluir los campos faltantes.

### Opción 2: Validación Defensiva
Agregar validaciones para evitar errores si los campos no existen.

### Opción 3: Limpiar y Recargar
Borrar todos los datos y empezar de nuevo (pérdida de datos).

---

## 🔧 Implementación: Migración + Validación

### 1. Función de Migración
```typescript
function migrateCrossingsData() {
  const stored = localStorage.getItem('ship_crossings');
  if (!stored) return;
  
  const crossings = JSON.parse(stored);
  const ships = loadShips();
  
  const migrated = crossings.map(crossing => {
    // Verificar si faltan campos
    if (!crossing.entry.etaPto || !crossing.exit.etdPto) {
      const ship = ships.find(s => s.id === crossing.ship.id);
      if (ship) {
        // Recalcular tiempos
        const entryDateTime = new Date(`${crossing.diaEntrada}T${crossing.horaEntrada}:00`);
        const exitDateTime = new Date(`${crossing.diaSalida}T${crossing.horaSalida}:00`);
        
        crossing.entry = calculateEntryTimes(ship, entryDateTime);
        crossing.exit = calculateExitTimes(ship, exitDateTime);
      }
    }
    return crossing;
  });
  
  localStorage.setItem('ship_crossings', JSON.stringify(migrated));
}
```

### 2. Validación Defensiva en el Renderizado
```typescript
{/* Zarpada - con validación */}
<td>
  {crossing.exit?.etdPto instanceof Date && !isNaN(crossing.exit.etdPto.getTime()) ? (
    <>
      <div>{format(crossing.exit.etdPto, 'dd/MM/yy')}</div>
      <div>{format(crossing.exit.etdPto, 'HH:mm')}</div>
    </>
  ) : <span style={{ color: '#64748b' }}>—</span>}
</td>
```

---

## 🚀 Plan de Acción

1. ✅ Agregar función de migración en MainApp
2. ✅ Ejecutar migración en useEffect de inicialización
3. ✅ Agregar validaciones defensivas en CrossingManagerSimple2
4. ✅ Agregar manejo de errores con try/catch
5. ✅ Mostrar mensaje de error amigable si algo falla

---

**Prioridad:** 🔴 CRÍTICA  
**Estado:** En proceso de corrección
