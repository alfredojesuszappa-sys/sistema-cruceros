# 🛡️ SISTEMA DE VALIDACIÓN DE DATOS

## Descripción General

El sistema de validación previene errores lógicos en los datos de entrada, asegurando que todos los cruceros tengan información coherente y realista antes de ser agregados a la planificación.

## ✅ Validaciones Implementadas

### 1. Validación Temporal Básica

**Error crítico:** La fecha/hora de salida debe ser posterior a la de entrada

```
❌ INCORRECTO:
Entrada: 29/01/2026 20:30
Salida:  28/01/2026 19:45  ← ¡Antes de la entrada!

✅ CORRECTO:
Entrada: 29/01/2026 20:30
Salida:  31/01/2026 19:45
```

**Previene:** Buques que "salen" antes de llegar.

---

### 2. Validación de Amarre vs Salida

**Error crítico:** El buque no puede salir antes de amarrar en el puerto

El sistema calcula automáticamente la hora estimada de amarre según:
- Clase A: ~11h 10min desde inicio de navegación
- Clase B: ~10h 40min desde inicio de navegación
- Clase C: ~4h desde inicio de navegación

```
❌ INCORRECTO:
Entrada:           29/01/2026 20:30
Amarre calculado:  31/01/2026 07:40
Salida ingresada:  30/01/2026 19:45  ← ¡Antes del amarre!

✅ CORRECTO:
Entrada:           29/01/2026 20:30
Amarre calculado:  31/01/2026 07:40
Salida ingresada:  31/01/2026 19:45  ← Después del amarre
```

**Previene:** Errores lógicos en la secuencia temporal del crucero.

---

### 3. Validación de Estadía Mínima

**Advertencia:** Tiempo mínimo recomendado en puerto: 6 horas

```
⚠️ ADVERTENCIA:
Amarre: 31/01/2026 07:40
Salida: 31/01/2026 10:00
Estadía: 2.3 horas ← Muy corto para operaciones

✅ RECOMENDADO:
Amarre: 31/01/2026 07:40
Salida: 31/01/2026 14:00 o posterior
Estadía: 6+ horas
```

**Motivo:** Las operaciones portuarias (desembarque, abastecimiento, mantenimiento) requieren tiempo.

---

### 4. Validación de Tiempos de Navegación

**Advertencia:** Los tiempos de navegación deben estar dentro de rangos esperados

**Entrada:**
- Clase A: ~11h 10min (KM 239.1 → KM 0)
- Clase B: ~10h 40min (KM 216 → KM 0)
- Clase C: ~4h (KM 59 → KM 0)

**Salida:**
- Todas las clases: ~6h 50min (KM 0 → KM 118.5)

```
⚠️ Si el tiempo calculado difiere >1 hora del esperado:
"Tiempo de navegación inusual: 15.2h (esperado ~11.2h para Clase A)"
```

**Previene:** Errores en fechas/horas ingresadas que generan tiempos irreales.

---

### 5. Validación de Calado (Importación CSV)

**Error crítico:** El calado debe estar en rango válido

```
❌ INCORRECTO:
Calado: 0.0m    ← Inválido
Calado: 25.0m   ← Fuera de rango

✅ CORRECTO:
Calado: 7.50m   ← Clase C
Calado: 8.20m   ← Clase B
Calado: 9.50m   ← Clase A
```

**Rango válido:** 0.1m a 20.0m

---

### 6. Validación de Rango de Fechas (Importación CSV)

**Advertencia:** Fechas deben estar en rango razonable

```
⚠️ ADVERTENCIAS:

Fecha > 1 año en el pasado:
"Fecha de entrada más de 1 año en el pasado (15/01/2024)"

Fecha > 2 años en el futuro:
"Fecha de entrada más de 2 años en el futuro (15/01/2028)"
```

**Motivo:** Detectar posibles errores de tipeo en el año.

---

### 7. Validación de Formato IMO (Importación CSV)

**Advertencia:** El código IMO debe seguir el formato estándar

```
⚠️ ADVERTENCIA:
"Código IMO no tiene formato estándar (1234567)"
Debería: "IMO9614141"

✅ CORRECTO:
IMO9614141
IMO 9614141
```

---

## 🎯 Tipos de Mensajes de Validación

### ❌ Errores Críticos
- **Bloquean** la operación
- Deben ser corregidos obligatoriamente
- Ejemplos:
  - Salida antes de entrada
  - Salida antes de amarre
  - Calado inválido

### ⚠️ Advertencias
- **No bloquean** la operación
- Se recomienda revisar/corregir
- El usuario puede continuar si está seguro
- Ejemplos:
  - Estadía muy corta
  - Tiempos de navegación inusuales
  - Fechas fuera de rango típico

---

## 💻 Interfaz de Validación

### En el Formulario de Agregado

1. **Validación en Tiempo Real**
   - Mientras completa el formulario, se validan los datos automáticamente
   - Los errores aparecen en una alerta roja en la parte superior
   - Los campos con errores se marcan con borde rojo

2. **Información Calculada**
   - Muestra la hora estimada de amarre
   - Muestra la hora mínima recomendada de salida
   - Indicador visual verde (✅) cuando todo es válido

3. **Botón de Agregar**
   - Se deshabilita si hay errores críticos
   - Cambia el texto: "❌ Corrija los errores para continuar"
   - Solo se habilita cuando todos los datos son válidos

### En la Importación CSV

1. **Reporte Detallado**
   - Muestra todos los errores encontrados por buque
   - Muestra todas las advertencias por buque
   - Cuenta cuántas filas son válidas

2. **Opciones de Importación**
   - Si hay errores: "¿Importar solo las filas válidas?"
   - Si hay advertencias: "¿Continuar a pesar de las advertencias?"
   - Permite al usuario decidir cómo proceder

3. **Resumen Final**
   - "✅ X cruceros importados exitosamente"
   - "⚠️ Y filas omitidas por errores"

---

## 📋 Ejemplos Prácticos

### Ejemplo 1: Error de Fecha de Salida

**Entrada del usuario:**
```
Buque: MAJESTIC PRINCESS
Clase: A
Entrada: 29/01/2026 20:30
Salida:  30/01/2026 19:45  ← ERROR
```

**Mensaje del sistema:**
```
❌ ERROR LÓGICO: El buque no puede salir ANTES de amarrar.
   • Amarre estimado: 31/01/2026 07:40
   • Salida ingresada: 30/01/2026 19:45
   ➡️ La salida debe ser DESPUÉS del amarre.
```

**Corrección:**
```
Salida: 31/01/2026 19:45 ✅
```

---

### Ejemplo 2: Advertencia de Estadía Corta

**Entrada del usuario:**
```
Buque: MSC SEAVIEW
Entrada: 28/01/2026 20:30
Salida:  30/01/2026 09:00
```

**Mensaje del sistema:**
```
⚠️ ADVERTENCIA: Estadía en puerto muy corta (1.3 horas).
   Se recomienda un mínimo de 6 horas para operaciones portuarias.
```

**Opciones:**
- Continuar (si es intencional)
- Ajustar salida a 30/01/2026 14:00 o posterior

---

### Ejemplo 3: Importación CSV con Errores

**Archivo CSV con 4 cruceros:**
- OOSTERDAM: ✅ Válido
- MSC SEAVIEW: ❌ Salida antes de entrada
- COSTA DIADEMA: ✅ Válido (⚠️ estadía corta)
- MAJESTIC PRINCESS: ❌ Calado inválido

**Reporte del sistema:**
```
📊 REPORTE DE IMPORTACIÓN

❌ ERRORES (2 filas):

• MSC SEAVIEW:
  - Fecha/hora de salida (29/01/2026 20:00) debe ser 
    posterior a la entrada (30/01/2026 01:10)

• MAJESTIC PRINCESS:
  - Calado inválido (0.0m). Debe estar entre 0.1 y 20 metros.

⚠️ ADVERTENCIAS (1 fila):

• COSTA DIADEMA:
  - Tiempo entre entrada y salida muy corto (2.5h). 
    Se recomienda al menos 6 horas.

✅ VÁLIDOS: 2 cruceros listos para importar

¿Desea importar solo las filas válidas y omitir las que tienen errores?
```

**Resultado:**
- Se importan: OOSTERDAM y COSTA DIADEMA
- Se omiten: MSC SEAVIEW y MAJESTIC PRINCESS
- Usuario debe corregir el CSV y reimportar los 2 con errores

---

## 🔧 Configuración

Las validaciones están configuradas con valores conservadores que pueden ajustarse en el código si es necesario:

```typescript
// Estadía mínima en puerto (horas)
const minStayHours = 6;

// Margen de tolerancia en tiempos de navegación (horas)
const navigationTolerance = 1;

// Rango de calado válido (metros)
const caladoMin = 0.1;
const caladoMax = 20.0;
```

---

## 🎓 Guía Rápida para Usuarios

### Al Agregar un Crucero Manualmente:

1. ✅ Complete primero los datos de entrada
2. 👀 Observe la "hora de amarre estimada" que aparece
3. ✅ Ingrese la fecha/hora de salida DESPUÉS del amarre estimado
4. 👀 Verifique que no aparezcan errores (❌) en rojo
5. ✅ Si ve el checkmark verde (✅), puede agregar el crucero

### Al Importar desde CSV:

1. ✅ Descargue la planilla en blanco
2. ✅ Complete los datos en Excel
3. ⚠️ Verifique que las fechas de salida sean posteriores a las de entrada
4. ⚠️ Calcule manualmente tiempos aproximados de amarre
5. ✅ Importe el CSV
6. 👀 Lea atentamente el reporte de validación
7. ✅ Corrija errores si los hay y reimporte

---

## 📞 Soporte

Si encuentra datos válidos que el sistema rechaza incorrectamente, o si necesita ajustar los criterios de validación, consulte con el administrador del sistema.

**Última actualización:** 14 de Enero de 2026
