# EJEMPLOS DE PRUEBA - SISTEMA DE CRUCEROS

**Fecha**: 14 Enero 2026  
**Versión**: 2.0 (Correcciones aplicadas)

---

## 🧪 CASOS DE PRUEBA

### PRUEBA 1: Agregar Crucero Clase A (Sin Conflictos)

**Datos de Entrada**:
```
Buque: MSC SEAVIEW
Clase: A (Calado 8.90m)
Fecha Entrada: 15/01/2026
Hora Entrada: 06:00
Fecha Salida: 17/01/2026
Hora Salida: 14:00
Situación: SIN CONFIRMAR
```

**Resultado Esperado**:
- ✅ Crucero agregado exitosamente
- ✅ Aparece en la tabla
- ✅ Al hacer clic en "Buscar Conflictos" → "No se detectaron conflictos"

**Tiempos Calculados**:
- KM 239: 06:00
- KM 118.5 (ENTRADA): 10:40
- KM 118.5 (SALIDA): 17:20
- ETA Puerto: 12:50

---

### PRUEBA 2: Agregar Crucero Clase C (Sin Conflictos)

**Datos de Entrada**:
```
Buque: EMERALD AZZURRA
Clase: C (Calado 3.80m)
Fecha Entrada: 15/01/2026
Hora Entrada: 08:00
Fecha Salida: 16/01/2026
Hora Salida: 10:00
```

**Resultado Esperado**:
- ✅ Crucero agregado
- ✅ NO aparece en timeline para KM 118.5 (ENTRADA)
- ✅ SÍ aparece en timeline para KM 118.5 (SALIDA)

**Tiempos Calculados**:
- KM 59: 08:00 (inicio)
- KM 118.5 (ENTRADA): NO APLICA ❌
- KM 118.5 (SALIDA): 13:20 ✅
- ETA Puerto: 10:34

---

### PRUEBA 3: Crear Conflicto Real

**Paso 1 - Agregar Buque Entrante**:
```
Buque: MSC MAGNIFICA
Clase: A (Calado 7.85m)
Fecha Entrada: 16/01/2026
Hora Entrada: 06:00
```

Esto da: **ETA KM 118.5 = 16/01/2026 10:40**

**Paso 2 - Agregar Buque Saliente (CONFLICTO)**:
```
Buque: COSTA FAVOLOSA
Clase: B (Calado 8.30m)
Fecha Entrada: 14/01/2026
Hora Entrada: 08:00
Fecha Salida: 16/01/2026
Hora Salida: 07:00  ← Aquí está el conflicto
```

Esto da: **ETD KM 118.5 = 16/01/2026 10:30**

**Resultado Esperado**:
- ⚠️ Diferencia: 10 minutos (MAGNIFICA llega a las 10:40, FAVOLOSA sale a las 10:30)
- ⚠️ Al hacer clic en "Buscar Conflictos" → Timeline se abre
- ⚠️ Muestra alerta roja con el conflicto
- ⚠️ Ofrece 2 propuestas de solución

**Propuestas que Verás**:

📋 **Opción 1: Retrasar SALIDA**
```
Buque: COSTA FAVOLOSA
Actual ETD Puerto: 16/01/2026 07:00
Nueva ETD Puerto:  16/01/2026 07:35 (retraso 35 min)
Razón: Mantener 30 min de margen + 15 min extra
```

📋 **Opción 2: Adelantar ENTRADA**
```
Buque: MSC MAGNIFICA
Actual Inicio: 16/01/2026 06:00
Nuevo Inicio:  16/01/2026 05:25 (adelanto 35 min)
Razón: Mantener 30 min de margen + 15 min extra
```

---

### PRUEBA 4: Resolver Conflicto

**Acción**:
1. Hacer clic en "Buscar Conflictos"
2. Observar el timeline con el conflicto
3. Hacer clic en "Aplicar Esta Solución" en cualquiera de las dos opciones

**Resultado Esperado**:
- ✅ Timeline se cierra
- ✅ Mensaje: "Horario actualizado. Use 'Buscar Conflictos' para verificar"
- ✅ El crucero seleccionado tiene su horario actualizado en la tabla
- ✅ Hacer clic nuevamente en "Buscar Conflictos"
- ✅ Mensaje: "No se detectaron conflictos"

---

### PRUEBA 5: Múltiples Cruceros Sin Conflictos

**Agregar en Secuencia**:

```
Crucero 1: MSC POESIA (Clase A)
  Entrada: 15/01/2026 06:00
  Salida:  17/01/2026 14:00
  
Crucero 2: NORWEGIAN STAR (Clase B)
  Entrada: 15/01/2026 14:00 ← 8 horas después
  Salida:  17/01/2026 20:00
  
Crucero 3: SAPPHIRE PRINCESS (Clase B)
  Entrada: 16/01/2026 06:00 ← día siguiente
  Salida:  18/01/2026 12:00
```

**Resultado Esperado**:
- ✅ Todos los cruceros agregados
- ✅ Todos aparecen en la tabla
- ✅ "Buscar Conflictos" → "No se detectaron conflictos"
- ✅ Timeline muestra todos en orden cronológico
- ✅ Ninguno marcado en rojo

---

### PRUEBA 6: Generar Planilla A3

**Prerequisito**: No debe haber conflictos activos

**Acción**:
1. Agregar varios cruceros sin conflictos
2. Verificar con "Buscar Conflictos"
3. Hacer clic en "Generar Planilla A3"

**Resultado Esperado**:
- ✅ Se abre el diálogo de impresión del navegador
- ✅ Vista previa muestra formato A3 horizontal
- ✅ Tabla completa con todos los datos
- ✅ Colores de clases visibles
- ✅ Fuente Aptos/Roboto, tamaño mínimo 10px

---

### PRUEBA 7: Importar CSV

**Acción**:
1. Hacer clic en "Descargar Planilla"
2. Abrir el CSV en Excel
3. Completar al menos 3 filas con datos válidos
4. Guardar como CSV
5. Hacer clic en "Importar CSV"
6. Seleccionar el archivo

**Formato de Ejemplo**:
```csv
buque,bandera,imo,eslora,manga,puntal,calado,agencia,fechaEntrada,horaEntrada,fechaSalida,horaSalida,fm,to,situacion,notas
MSC MONICA,PANAMA,IMO1234567,294.12,32.24,19.40,9.50,MSC,15/01/2026,08:00,17/01/2026,14:30,MVD,BZA/BHB,SIN CONFIRMAR,Carga general
NORWEGIAN EPIC,BAHAMAS,IMO7654321,325.00,40.50,20.00,8.60,NAVIJET,16/01/2026,10:00,18/01/2026,16:00,STS,,CONFIRMADO,
CARNIVAL DREAM,PANAMA,IMO1357924,306.00,37.20,18.50,8.20,INCHCAPE,17/01/2026,06:00,19/01/2026,12:00,,,SIN CONFIRMAR,Turismo
```

**Resultado Esperado**:
- ✅ Mensaje: "3 crucero(s) importado(s) exitosamente"
- ✅ Todos los cruceros aparecen en la tabla
- ✅ Fechas y horas correctamente parseadas
- ✅ Clases asignadas automáticamente según calado

---

## 🎯 VERIFICACIÓN DE CORRECCIONES

### ✅ Verificar que NO hay Loop Infinito

**Pasos**:
1. Crear un conflicto (seguir PRUEBA 3)
2. Hacer clic en "Buscar Conflictos" → Timeline se abre
3. Hacer clic en "Aplicar Esta Solución"
4. **VERIFICAR**: Timeline se cierra y NO vuelve a abrirse solo
5. **VERIFICAR**: No se detectan conflictos automáticamente
6. Hacer clic nuevamente en "Buscar Conflictos"
7. **RESULTADO**: Mensaje de éxito

### ✅ Verificar Clase C Correcta

**Pasos**:
1. Agregar crucero Clase C (calado < 7.32m)
2. Hacer clic en "Buscar Conflictos"
3. Ver el timeline
4. **VERIFICAR**: El buque Clase C NO aparece con "ENTRADA" en KM 118.5
5. **VERIFICAR**: El buque Clase C SÍ aparece con "SALIDA" en KM 118.5

### ✅ Verificar Detección Correcta

**Pasos**:
1. Agregar dos cruceros con 2 horas de diferencia en KM 118.5
2. Hacer clic en "Buscar Conflictos"
3. **RESULTADO ESPERADO**: "No se detectaron conflictos"
4. **VERIFICAR**: No se marca como conflicto (antes SÍ se marcaba)

---

## 📊 MÉTRICAS DE ÉXITO

- ✅ Detección manual funciona (botón amarillo)
- ✅ Timeline abre y cierra correctamente
- ✅ Propuestas de solución funcionan
- ✅ NO hay loops infinitos
- ✅ Clase C calculada correctamente
- ✅ Conflictos detectados solo cuando realmente existen
- ✅ Generación de planilla A3 disponible sin conflictos

---

## 🐛 SI ALGO FALLA

### Problema: Timeline no se abre
**Solución**: Verificar en consola del navegador (F12) si hay errores

### Problema: Conflictos fantasma
**Solución**: Revisar que los tiempos de entrada/salida sean correctos

### Problema: Clase C con conflictos en entrada
**Solución**: Esto NO debería pasar. Reportar como bug.

### Problema: Loop infinito persiste
**Solución**: Recargar la página completamente (Ctrl+Shift+R)

---

**Fin de los Ejemplos de Prueba**
