# 🧪 CÓMO PROBAR EL SISTEMA DE VALIDACIÓN

## 📋 Preparación

1. **Abrir la aplicación** en el navegador
2. **Abrir la consola del navegador** (F12)
3. **Limpiar datos previos** (opcional):
   ```javascript
   localStorage.clear()
   ```
4. **Recargar la página** (Ctrl+Shift+R)

---

## ✅ Prueba 1: Validación Correcta

### Objetivo
Verificar que datos correctos se aceptan sin problemas.

### Pasos:

1. Click en **"Agregar Crucero"**

2. Seleccionar buque:
   ```
   MAJESTIC PRINCESS - REINO UNIDO (Clase A)
   ```

3. Ingresar datos de ENTRADA:
   ```
   Fecha: 29/01/2026
   Hora:  20:30
   ```

4. **Observar:** Debe aparecer un cuadro azul que dice:
   ```
   ℹ️ Información calculada:
   • Amarre estimado: 31/01/2026, 07:40
   • Salida recomendada desde: 31/01/2026, 13:40 (6h después)
   ```

5. Ingresar datos de SALIDA:
   ```
   Fecha: 31/01/2026
   Hora:  19:45
   ```

6. **Observar:** Debe aparecer un checkmark verde (✅) junto a "SALIDA DEL PUERTO"

7. Completar campos opcionales:
   ```
   FM: STS
   TO: PDE
   Situación: CONFIRMADO
   ```

8. Click en **"Agregar Crucero"**

### ✅ Resultado Esperado:
- El formulario se cierra
- El crucero aparece en la tabla
- No hay errores en la consola

---

## ❌ Prueba 2: Error de Salida Antes de Amarre

### Objetivo
Verificar que el sistema detecta cuando un buque intenta salir antes de amarrar.

### Pasos:

1. Click en **"Agregar Crucero"**

2. Seleccionar buque:
   ```
   MAJESTIC PRINCESS - REINO UNIDO (Clase A)
   ```

3. Ingresar datos de ENTRADA:
   ```
   Fecha: 29/01/2026
   Hora:  20:30
   ```

4. **Observar:** Amarre estimado debe ser **31/01/2026, 07:40**

5. Ingresar datos de SALIDA **INCORRECTOS**:
   ```
   Fecha: 30/01/2026  ← ¡ANTES DEL AMARRE!
   Hora:  19:45
   ```

6. **Observar inmediatamente:**

   a) Aparece una alerta roja en la parte superior:
   ```
   ⚠️ Errores de Validación
   
   ❌ El buque amarra aprox. a las 31/01, 07:40.
      La salida no puede ser antes de esa hora.
   ```

   b) Los campos de fecha/hora de salida tienen **borde rojo**

   c) El botón cambió a:
   ```
   [❌ Corrija los errores para continuar]
   ```
   (y está deshabilitado)

7. Intentar hacer click en el botón → **No hace nada** (está deshabilitado)

### ✅ Resultado Esperado:
- El error se detecta en tiempo real
- El botón está deshabilitado
- No se puede agregar el crucero con datos incorrectos
- Los mensajes son claros y útiles

---

## ⚠️ Prueba 3: Advertencia de Estadía Corta

### Objetivo
Verificar que el sistema advierte sobre estadías muy cortas en puerto.

### Pasos:

1. Click en **"Agregar Crucero"**

2. Seleccionar buque:
   ```
   MSC SEAVIEW - MALTA (Clase A)
   ```

3. Ingresar datos de ENTRADA:
   ```
   Fecha: 28/01/2026
   Hora:  20:30
   ```

4. **Observar:** Amarre estimado debe ser **30/01/2026, 07:40**

5. Ingresar datos de SALIDA con estadía corta:
   ```
   Fecha: 30/01/2026
   Hora:  10:00  ← Solo 2.3 horas después del amarre
   ```

6. **Observar:**
   - No hay error crítico (❌)
   - Pero puede aparecer una advertencia (⚠️)
   - El botón **sí está habilitado** (es solo una advertencia)

7. Click en **"Agregar Crucero"**

### ✅ Resultado Esperado:
- La advertencia se muestra pero no bloquea
- El crucero se puede agregar si el usuario lo confirma
- Esto permite flexibilidad en casos especiales

---

## 📊 Prueba 4: Importación CSV con Errores

### Objetivo
Verificar la validación masiva en importación de archivos CSV.

### Preparación del CSV:

1. Click en **"Descargar Planilla"**

2. Abrir el archivo CSV en Excel/Notepad

3. Agregar estas 3 filas (después de la fila de ejemplo):

```csv
OOSTERDAM,PAISES BAJOS,IMO9221281,294.12,32.24,19.40,9.50,GPS,26/01/2026,19:45,28/01/2026,20:00,PDE,STS,CONFIRMADO,Válido
MSC SEAVIEW,MALTA,IMO9745378,323.6,41,19.8,9.80,MSC,30/01/2026,20:30,29/01/2026,20:00,RIO,MVD,CONFIRMADO,Error: sale antes de entrar
COSTA DIADEMA,ITALIA,IMO9636888,306.4,37.2,19.5,9.30,NAVIJET,28/01/2026,21:00,29/01/2026,00:00,MVD,STS,CONFIRMADO,Advertencia: estadía corta
```

4. Guardar como `prueba_validacion.csv`

### Pasos de Importación:

1. En la aplicación, click en **"Importar CSV"**

2. Click en **"Seleccionar Archivo"**

3. Seleccionar `prueba_validacion.csv`

4. **Observar el reporte:**
   ```
   📊 REPORTE DE IMPORTACIÓN

   ❌ ERRORES (1 fila):

   • MSC SEAVIEW:
     - MSC SEAVIEW: Fecha/hora de salida (29/01/2026 20:00) 
       debe ser posterior a la entrada (30/01/2026 20:30)

   ⚠️ ADVERTENCIAS (1 fila):

   • COSTA DIADEMA:
     - COSTA DIADEMA: Tiempo entre entrada y salida muy corto 
       (2.5h). Se recomienda al menos 6 horas.

   ✅ VÁLIDOS: 2 cruceros listos para importar

   ¿Desea importar solo las filas válidas y omitir las que tienen errores?
   ```

5. Click en **"Aceptar"**

6. **Observar confirmación:**
   ```
   ✅ 2 crucero(s) importado(s) exitosamente
   ⚠️ 1 fila(s) omitida(s) por errores
   ```

### ✅ Resultado Esperado:
- Se importan OOSTERDAM y COSTA DIADEMA
- Se omite MSC SEAVIEW (tiene error crítico)
- El usuario recibe un reporte claro de qué pasó con cada fila

---

## 🔍 Verificación en la Consola

### Logs que debes ver:

Cuando agregas un crucero correctamente:
```
🚢 calculateEntryTimes START:
  buque: "MAJESTIC PRINCESS"
  ...
  → KM118.5: [fecha correcta]

🚢 calculateExitTimes START:
  buque: "MAJESTIC PRINCESS"
  ...
  → KM118.5: [fecha correcta]
```

Cuando hay un error de validación:
```
(No se llaman las funciones de cálculo porque se detiene antes)
```

---

## 📸 Capturas de Pantalla

### Estado Normal (Todo OK):
```
┌─────────────────────────────────────────┐
│ 📤 NAVEGACIÓN DE SALIDA              ✅ │
│                                         │
│ ℹ️ Información calculada:               │
│ • Amarre estimado: 31/01/2026 07:40    │
│ • Salida recomendada desde:            │
│   31/01/2026 13:40 (6h después)        │
│                                         │
│ Fecha: [31/01/2026]  Hora: [19:45]     │
│                                         │
│        [Agregar Crucero]                │
└─────────────────────────────────────────┘
```

### Estado de Error:
```
┌─────────────────────────────────────────┐
│ ⚠️ Errores de Validación                │
│                                         │
│ ❌ El buque amarra aprox. a las        │
│    31/01, 07:40. La salida no puede    │
│    ser antes de esa hora.              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 📤 NAVEGACIÓN DE SALIDA                 │
│                                         │
│ Fecha: [30/01/2026]  Hora: [19:45]     │
│        ↑ BORDE ROJO   ↑ BORDE ROJO     │
│                                         │
│ [❌ Corrija los errores para continuar] │
│          (botón deshabilitado)          │
└─────────────────────────────────────────┘
```

---

## ✅ Checklist de Verificación

Después de todas las pruebas, verifica que:

### Formulario Manual:
- [ ] Muestra información calculada de amarre
- [ ] Muestra salida recomendada
- [ ] Detecta salida antes de amarre
- [ ] Muestra errores en tiempo real
- [ ] Deshabilita botón cuando hay errores
- [ ] Campos con error tienen borde rojo
- [ ] Checkmark verde cuando todo OK

### Importación CSV:
- [ ] Genera reporte detallado
- [ ] Separa errores de advertencias
- [ ] Permite importar solo válidos
- [ ] Muestra contadores de éxito/error
- [ ] Omite filas con errores críticos

### Calidad de Datos:
- [ ] No permite salida antes de entrada
- [ ] No permite salida antes de amarre
- [ ] Advierte sobre estadías cortas
- [ ] Valida rangos de calado
- [ ] Tiempos de navegación coherentes

---

## 🚨 Problemas Comunes y Soluciones

### Problema: No veo la información calculada

**Solución:**
1. Asegúrate de haber seleccionado un buque
2. Verifica que ingresaste fecha y hora de entrada
3. Recarga la página (Ctrl+Shift+R)

### Problema: El botón no se deshabilita con errores

**Solución:**
1. Verifica que el error sea crítico (❌) no advertencia (⚠️)
2. Revisa la consola del navegador (F12) por errores
3. Limpia localStorage y recarga

### Problema: Los errores no aparecen en tiempo real

**Solución:**
1. Asegúrate de completar TODOS los campos requeridos
2. Los errores solo aparecen cuando hay datos completos
3. Revisa que los formatos de fecha/hora sean correctos

---

## 🎯 Resultado Final Esperado

Después de completar todas las pruebas, deberías haber verificado que:

✅ El sistema **previene** errores antes de ingresarlos
✅ La interfaz **guía** al usuario con información útil
✅ Los mensajes de error son **claros y accionables**
✅ La validación funciona tanto en **formulario manual** como en **importación CSV**
✅ Los datos en la tabla son **100% coherentes y válidos**

---

## 📞 ¿Encontraste un Bug?

Si encuentras un comportamiento inesperado:

1. **Anota exactamente:**
   - Qué hiciste (pasos para reproducir)
   - Qué esperabas que pasara
   - Qué pasó en realidad

2. **Captura:**
   - Screenshot del error
   - Contenido de la consola (F12)

3. **Reporta:**
   - Al administrador del sistema
   - Incluye toda la información del punto 1 y 2

---

**¡Buena suerte con las pruebas! 🚀**

**Última actualización:** 14 de Enero de 2026
