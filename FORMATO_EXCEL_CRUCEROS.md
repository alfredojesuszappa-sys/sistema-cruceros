# 📊 FORMATO PARA ARCHIVO EXCEL DE CRUCEROS

## Descripción General
Este documento describe el formato del archivo Excel que debes crear para importar datos de cruceros al sistema.

---

## 📝 Estructura del Archivo Excel

### Nombre del archivo
- Formato recomendado: `cruceros_YYYY-MM-DD.xlsx`
- Ejemplo: `cruceros_2026-01-15.xlsx`

### Hoja de cálculo
- Nombre de la hoja: `Cruceros` (o cualquier nombre)
- Primera fila: Encabezados de columnas
- Filas siguientes: Datos de los cruceros

---

## 📋 COLUMNAS REQUERIDAS

### 1. BUQUE
- **Tipo:** Texto
- **Obligatorio:** SÍ
- **Descripción:** Nombre del buque
- **Importante:** El buque DEBE existir en la base de datos del sistema
- **Ejemplo:** `COSTA FORTUNA`, `MSC MAGNIFICA`

### 2. DIA_ENTRADA
- **Tipo:** Fecha
- **Formato:** `YYYY-MM-DD` o `DD/MM/YYYY`
- **Obligatorio:** SÍ
- **Descripción:** Fecha de entrada al canal
- **Ejemplos:** 
  - `2026-01-20`
  - `20/01/2026`

### 3. HORA_ENTRADA
- **Tipo:** Hora
- **Formato:** `HH:MM` (24 horas)
- **Obligatorio:** SÍ
- **Descripción:** Hora de inicio de navegación
- **Ejemplos:**
  - `08:00`
  - `14:30`
  - `23:45`

### 4. DIA_SALIDA
- **Tipo:** Fecha
- **Formato:** `YYYY-MM-DD` o `DD/MM/YYYY`
- **Obligatorio:** SÍ
- **Descripción:** Fecha de salida del canal
- **Ejemplos:**
  - `2026-01-22`
  - `22/01/2026`

### 5. HORA_SALIDA
- **Tipo:** Hora
- **Formato:** `HH:MM` (24 horas)
- **Obligatorio:** SÍ
- **Descripción:** Hora de inicio de navegación de salida
- **Ejemplos:**
  - `10:00`
  - `16:30`
  - `20:00`

### 6. FM (From)
- **Tipo:** Texto
- **Obligatorio:** SÍ
- **Descripción:** Puerto de origen
- **Ejemplos:**
  - `MONTEVIDEO`
  - `SANTOS`
  - `RIO DE JANEIRO`

### 7. TO
- **Tipo:** Texto
- **Obligatorio:** SÍ
- **Descripción:** Puerto de destino
- **Ejemplos:**
  - `BUENOS AIRES`
  - `USHUAIA`
  - `MONTEVIDEO`

### 8. SITUACION
- **Tipo:** Texto
- **Obligatorio:** SÍ
- **Valores permitidos:**
  - `SIN CONFIRMAR`
  - `CONFIRMADO`
  - `CANCELADO`
- **Descripción:** Estado actual del crucero
- **Ejemplo:** `CONFIRMADO`

### 9. NOTAS
- **Tipo:** Texto
- **Obligatorio:** NO
- **Descripción:** Observaciones adicionales
- **Ejemplos:**
  - `Cambio de horario solicitado`
  - `Crucero especial VIP`
  - `Requiere practico especial`

---

## 📊 EJEMPLO DE ARCHIVO EXCEL

| BUQUE | DIA_ENTRADA | HORA_ENTRADA | DIA_SALIDA | HORA_SALIDA | FM | TO | SITUACION | NOTAS |
|-------|-------------|--------------|------------|-------------|----|----|-----------|-------|
| COSTA FORTUNA | 2026-01-20 | 08:00 | 2026-01-22 | 10:00 | MONTEVIDEO | BUENOS AIRES | CONFIRMADO | Primera entrada del mes |
| MSC MAGNIFICA | 2026-01-21 | 14:00 | 2026-01-23 | 16:00 | SANTOS | BUENOS AIRES | SIN CONFIRMAR | Pendiente confirmación |
| NORWEGIAN STAR | 2026-01-22 | 06:30 | 2026-01-24 | 08:00 | RIO DE JANEIRO | USHUAIA | CONFIRMADO | |
| CELEBRITY ECLIPSE | 2026-01-23 | 10:00 | 2026-01-25 | 12:00 | BUENOS AIRES | MONTEVIDEO | CONFIRMADO | Salida temprana |

---

## 🔄 PROCESO DE IMPORTACIÓN

### Paso 1: Crear el archivo Excel
1. Abre Microsoft Excel, Google Sheets o LibreOffice Calc
2. Crea las columnas con los nombres exactos descritos arriba
3. Completa los datos de los cruceros
4. Guarda el archivo en formato `.xlsx`

### Paso 2: Convertir a JSON (Método manual)
Puedes usar herramientas online como:
- https://www.convertcsv.com/excel-to-json.htm
- https://beautifytools.com/excel-to-json-converter.php

**Configuración de conversión:**
- Primera fila como encabezados: SÍ
- Formato de salida: JSON Array
- Minificar: NO

### Paso 3: Subir al sistema
Una vez convertido a JSON, el formato será:

```json
[
  {
    "BUQUE": "COSTA FORTUNA",
    "DIA_ENTRADA": "2026-01-20",
    "HORA_ENTRADA": "08:00",
    "DIA_SALIDA": "2026-01-22",
    "HORA_SALIDA": "10:00",
    "FM": "MONTEVIDEO",
    "TO": "BUENOS AIRES",
    "SITUACION": "CONFIRMADO",
    "NOTAS": "Primera entrada del mes"
  },
  {
    "BUQUE": "MSC MAGNIFICA",
    "DIA_ENTRADA": "2026-01-21",
    "HORA_ENTRADA": "14:00",
    "DIA_SALIDA": "2026-01-23",
    "HORA_SALIDA": "16:00",
    "FM": "SANTOS",
    "TO": "BUENOS AIRES",
    "SITUACION": "SIN CONFIRMAR",
    "NOTAS": "Pendiente confirmación"
  }
]
```

---

## 🚨 VALIDACIONES DEL SISTEMA

El sistema validará automáticamente:

1. **Existencia del buque:** El nombre del buque debe existir en la base de datos
2. **Formato de fechas:** Deben ser fechas válidas
3. **Formato de horas:** Deben estar en formato HH:MM
4. **Situación válida:** Solo se aceptan los 3 valores permitidos
5. **Coherencia de fechas:** La fecha de salida debe ser posterior a la de entrada
6. **Clasificación:** El sistema calculará automáticamente la clase del buque (A, B, C) según su calado
7. **Tiempos de navegación:** Se calcularán automáticamente los ETA y ETD para KM 118.5
8. **Detección de conflictos:** Se verificarán cruces prohibidos automáticamente

---

## 🎯 CÁLCULOS AUTOMÁTICOS

El sistema calculará automáticamente:

### Para ENTRADAS:
- **Clase A (calado ≥ 8.84m):** 
  - Inicia en KM 239.100
  - Llega a KM 118.5 en 4:40:00
  
- **Clase B (7.32m < calado ≤ 8.83m):**
  - Inicia en KM 216
  - Llega a KM 118.5 en 4:10:00
  
- **Clase C (calado ≤ 7.32m):**
  - Inicia en KM 59
  - Llega a KM 118.5 en 2:30:00

### Para SALIDAS:
- **Clase A:** 5:00:00 desde KM 118.5 hasta KM 239.100
- **Clase B:** 4:30:00 desde KM 118.5 hasta KM 216
- **Clase C:** 1:45:00 desde KM 118.5 hasta KM 77

---

## 📞 CONTACTO Y SOPORTE

Si tienes dudas sobre el formato o necesitas ayuda:
1. Revisa los ejemplos en este documento
2. Verifica que los buques existan en la base de datos
3. Asegúrate de usar los formatos correctos de fecha y hora

---

## 📌 NOTAS IMPORTANTES

- ⚠️ **Sensibilidad a mayúsculas:** Los nombres de buques son sensibles a mayúsculas/minúsculas
- ⚠️ **Formato de hora:** Usa siempre formato 24 horas (00:00 a 23:59)
- ⚠️ **Zona horaria:** Todas las horas son en hora local argentina (UTC-3)
- ⚠️ **Backup:** Mantén siempre una copia de seguridad de tus archivos Excel
- ✅ **Validación:** Después de importar, verifica que no haya conflictos en el sistema

---

**Última actualización:** 15 de Enero de 2026
**Versión del sistema:** 2.0
