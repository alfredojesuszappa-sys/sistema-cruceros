# 📊 Guía de Importación CSV - Actualizada

## ✅ Corrección Aplicada

Se ha corregido el error de importación CSV. Ahora el sistema detecta automáticamente si el archivo es CSV o JSON y lo procesa correctamente.

---

## 📁 Formatos Soportados

### 1. **CSV con Comas (,)**
```csv
BUQUE,DIA_ENTRADA,HORA_ENTRADA,DIA_SALIDA,HORA_SALIDA,FM,TO,SITUACION,NOTAS
COSTA FORTUNA,2026-01-20,08:00,2026-01-22,10:00,MONTEVIDEO,BUENOS AIRES,CONFIRMADO,Primera entrada
```

### 2. **CSV con Punto y Coma (;)**
```csv
Buque;Fecha Entrada;Hora Entrada;Fecha Salida;Hora Salida;FM;TO;Situacion;Notas
Costa Fortuna;20/01/2026;08:00;22/01/2026;10:00;Montevideo;Buenos Aires;Confirmado;Primera entrada
```

### 3. **JSON (formato completo)**
```json
{
  "ships": [...],
  "crossings": [...]
}
```

---

## 📋 Columnas Soportadas (Flexible)

El sistema reconoce automáticamente las columnas con diferentes nombres:

| Dato | Nombres Aceptados |
|------|------------------|
| **Buque** | `BUQUE`, `Buque`, `Ship`, `SHIP`, `Vessel`, `Nombre` |
| **Fecha Entrada** | `DIA_ENTRADA`, `Dia Entrada`, `Fecha Entrada`, `Entry Date` |
| **Hora Entrada** | `HORA_ENTRADA`, `Hora Entrada`, `Entry Time` |
| **Fecha Salida** | `DIA_SALIDA`, `Dia Salida`, `Fecha Salida`, `Exit Date` |
| **Hora Salida** | `HORA_SALIDA`, `Hora Salida`, `Exit Time` |
| **FM** | `FM`, `Fondeadero`, `Berth` |
| **TO** | `TO`, `Turnaround` |
| **Situación** | `SITUACION`, `Situacion`, `Situation`, `Status` |
| **Notas** | `NOTAS`, `Notas`, `Notes`, `Observaciones` |

---

## 📅 Formatos de Fecha Soportados

1. **ISO 8601**: `2026-01-20` (YYYY-MM-DD) ✅ Recomendado
2. **Formato Europeo**: `20/01/2026` (DD/MM/YYYY)
3. **Formato Americano**: `01/20/2026` (MM/DD/YYYY)

---

## 🕐 Formato de Hora

- **Formato 24 horas**: `14:30`, `08:00`, `23:45`
- **Sin segundos**: Solo `HH:MM`
- **Si se omite**: Se usa `08:00` para entrada y `14:00` para salida

---

## ⚙️ Proceso de Importación

### 1. **Detección Automática**
```
¿Es CSV? → Detecta delimitador (,) o (;)
¿Es JSON? → Parsea como JSON
```

### 2. **Validación de Buques**
```
✅ Busca el buque en la base de datos
❌ Si no existe, omite esa fila (pero continúa con las demás)
```

### 3. **Validación de Datos**
```
✅ Verifica que las fechas sean válidas
✅ Calcula automáticamente los tiempos de navegación
✅ Aplica la situación (CONFIRMADO, SIN CONFIRMAR, CANCELADO)
```

### 4. **Resultado**
```
✅ X cruceros importados
⚠ Y errores (se muestran en consola)
```

---

## 🎯 Ejemplo Completo

### Archivo: `mis_cruceros.csv`
```csv
BUQUE,DIA_ENTRADA,HORA_ENTRADA,DIA_SALIDA,HORA_SALIDA,FM,TO,SITUACION,NOTAS
COSTA FORTUNA,2026-01-20,08:00,2026-01-22,10:00,MONTEVIDEO,BUENOS AIRES,CONFIRMADO,Primera entrada del mes
MSC MAGNIFICA,2026-01-21,14:00,2026-01-23,16:00,SANTOS,BUENOS AIRES,SIN CONFIRMAR,Pendiente confirmación
NORWEGIAN STAR,2026-01-22,06:30,2026-01-24,08:00,RIO DE JANEIRO,USHUAIA,CONFIRMADO,
CELEBRITY ECLIPSE,2026-01-23,10:00,2026-01-25,12:00,BUENOS AIRES,MONTEVIDEO,CONFIRMADO,Salida temprana
```

---

## ⚠️ Errores Comunes y Soluciones

### ❌ "Unexpected token 'B', "Buque ;Ban"... is not valid JSON"
**Causa**: El sistema intentaba parsear CSV como JSON  
**Solución**: ✅ **Corregido** - Ahora detecta automáticamente el formato

### ❌ "Buque no encontrado"
**Causa**: El nombre del buque no coincide con la base de datos  
**Solución**: 
1. Ve a la pestaña **"Base de Datos"**
2. Verifica el nombre exacto del buque
3. Asegúrate de que el nombre en el CSV coincida exactamente

### ❌ "Fechas faltantes"
**Causa**: Las columnas de fecha están vacías o mal nombradas  
**Solución**: Verifica que las columnas se llamen correctamente (ver tabla arriba)

### ❌ "Formato de fecha no válido"
**Causa**: La fecha no está en formato YYYY-MM-DD o DD/MM/YYYY  
**Solución**: Usa uno de los formatos soportados

---

## 🔍 Modo Debug (Consola del Navegador)

Para ver información detallada de la importación:

1. Abre las **DevTools** del navegador (F12)
2. Ve a la pestaña **Console**
3. Importa el archivo
4. Verás:
   - 📄 Headers detectados
   - 🔍 Delimitador usado
   - ✅ Cruceros importados correctamente
   - ⚠️ Errores encontrados

### Ejemplo de Output:
```
📄 Headers detectados: ['buque', 'dia entrada', 'hora entrada', ...]
📄 Headers normalizados: ['buque', 'dia entrada', 'hora entrada', ...]
🔍 Delimitador: ,
Fila 1: {buque: "COSTA FORTUNA", dia entrada: "2026-01-20", ...}
✅ Crucero importado: COSTA FORTUNA
Fila 2: {buque: "MSC MAGNIFICA", ...}
✅ Crucero importado: MSC MAGNIFICA
```

---

## 📖 Pasos para Importar

1. **Preparar el archivo CSV**
   - Puede usar Excel, Google Sheets, etc.
   - Guardar como CSV (UTF-8)

2. **Ir a "Gestión de Movimientos"**
   - Hacer clic en el botón **"📂 Importar Datos"**

3. **Seleccionar el archivo**
   - Elegir su archivo `.csv` o `.xlsx`

4. **Verificar el resultado**
   - ✅ Se mostrará un mensaje con el resultado
   - Los cruceros aparecerán en la tabla

5. **Revisar conflictos**
   - Si hay conflictos, resolver manualmente
   - Generar el reporte final

---

## 💡 Recomendaciones

✅ **Usa la plantilla oficial**: `plantilla_cruceros.csv`  
✅ **Verifica nombres de buques**: Deben estar en la base de datos primero  
✅ **Formato de fecha recomendado**: `YYYY-MM-DD`  
✅ **Guarda en UTF-8**: Para evitar problemas con acentos  
✅ **Revisa la consola**: Si hay errores, aparecerán ahí  

---

## 🆘 Soporte Técnico

Si después de seguir esta guía sigues teniendo problemas:

1. Abre la consola del navegador (F12)
2. Copia los mensajes de error
3. Verifica que los nombres de los buques existan en la base de datos
4. Revisa el formato de las fechas

---

**Última actualización**: 16 de Enero de 2026  
**Versión**: 5.1 - Corrección de importación CSV
