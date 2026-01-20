# 🚀 INICIO RÁPIDO - Sistema de Cruceros V2.0

---

## ⚡ PRIMEROS PASOS (5 minutos)

### **1️⃣ Abrir la Aplicación**
```
Hacer doble clic en: index.html
O abrir desde USB/carpeta local
```

### **2️⃣ Agregar un Crucero de Prueba**
1. Clic en **[➕ Agregar Crucero]** (botón azul superior derecho)
2. Seleccionar un buque de la lista
3. Completar **ENTRADA** (sección azul):
   - Fecha: 15/01/2026
   - Hora: 08:00
4. Completar **SALIDA** (sección púrpura):
   - Fecha: 17/01/2026 (2 días después)
   - Hora: 14:30
5. Clic en **[Agregar Crucero]**

### **3️⃣ Buscar Conflictos**
1. Clic en **[🔍 Buscar Conflictos]** (botón amarillo)
2. Si hay conflictos, aparecerá el timeline
3. Clic en **[➡️ Aplicar Esta Solución]** para resolver

---

## 📊 CARGA MASIVA CON EXCEL (10 minutos)

### **Paso 1: Descargar Planilla**
```
Clic en: [📊 Descargar Planilla] (botón verde)
```

### **Paso 2: Completar en Excel**
```
1. Abrir PLANILLA_CRUCEROS_VACIA.csv
2. Ver ejemplo en fila 3
3. Completar UNA FILA POR BUQUE
4. Guardar como CSV
```

### **Paso 3: Importar Datos**
```
1. Clic en: [📤 Importar CSV] (botón púrpura)
2. Seleccionar archivo CSV
3. ¡Listo! Todos los cruceros se cargan automáticamente
```

---

## 🎯 FORMATO RÁPIDO DE PLANILLA

### **Encabezados (copiar tal cual):**
```
buque,bandera,imo,eslora,manga,puntal,calado,agencia,fechaEntrada,horaEntrada,fechaSalida,horaSalida,fm,to,situacion,notas
```

### **Ejemplo de fila:**
```
MSC MONICA,PANAMA,IMO1234567,294.12,32.24,19.40,9.50,MSC ARGENTINA S.A.,15/01/2026,08:00,17/01/2026,14:30,MVD,BZA/BHB,SIN CONFIRMAR,Carga general
```

### **Reglas clave:**
- ✅ Fechas: DD/MM/YYYY (15/01/2026)
- ✅ Horas: HH:mm (08:00)
- ✅ Calado: 9.50 (con punto, no coma)
- ✅ fechaSalida >= fechaEntrada (puede ser días después)

---

## 🎨 BOTONES PRINCIPALES

```
┌─────────────────────────────────────────────┐
│ HEADER - Barra Superior                     │
├─────────────────────────────────────────────┤
│                                              │
│  [Margen: 30min ▼]    ← Cambiar margen     │
│                                              │
│  [🔍 Buscar Conflictos]   ← Detectar manual│
│  [📊 Descargar Planilla]  ← Para agencias  │
│  [📤 Importar CSV]        ← Carga masiva   │
│  [💾 Exportar JSON]       ← Backup datos   │
│  [➕ Agregar Crucero]     ← Agregar manual  │
│                                              │
└─────────────────────────────────────────────┘
```

---

## 🚨 SOLUCIÓN DE PROBLEMAS COMUNES

### ❓ **No aparece el timeline de conflictos**
✅ **Solución:** Hacer clic en **[🔍 Buscar Conflictos]** primero

### ❓ **Error al importar CSV**
✅ **Verificar:**
- Fechas en formato DD/MM/YYYY
- Horas en formato HH:mm
- Calado con punto decimal (9.50)
- Archivo guardado como CSV

### ❓ **Conflicto detectado pero no se puede resolver**
✅ **Solución:** Hacer clic en el botón **[➡️ Aplicar Esta Solución]** dentro del timeline

### ❓ **Los datos no se guardan**
✅ **Nota:** Los datos se guardan automáticamente en localStorage del navegador

---

## 📖 WORKFLOW COMPLETO

```
┌─────────────────────────────────────────────┐
│ OPCIÓN A: Carga Manual                      │
├─────────────────────────────────────────────┤
│ 1. [➕ Agregar Crucero]                     │
│ 2. Completar formulario                      │
│ 3. Repetir para cada buque                   │
│ 4. [🔍 Buscar Conflictos]                   │
│ 5. [➡️ Aplicar Solución]                    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ OPCIÓN B: Carga Masiva (RECOMENDADA)       │
├─────────────────────────────────────────────┤
│ 1. [📊 Descargar Planilla]                  │
│ 2. Enviar a agencias                         │
│ 3. Recibir planillas completadas             │
│ 4. [📤 Importar CSV]                        │
│ 5. [🔍 Buscar Conflictos]                   │
│ 6. [➡️ Aplicar Solución]                    │
└─────────────────────────────────────────────┘
```

---

## 🎯 ATAJOS DE TECLADO

Próximamente...

---

## 📚 DOCUMENTACIÓN COMPLETA

Para más detalles, consultar:

- **`CAMBIOS_IMPLEMENTADOS.md`** → Documentación técnica completa
- **`GUIA_AGENCIAS_MARITIMAS.md`** → Guía para agencias marítimas
- **`RESUMEN_MEJORAS_V2.md`** → Resumen ejecutivo de mejoras

---

## 💡 CONSEJOS ÚTILES

### **✅ Mejores Prácticas:**
1. Usar **carga masiva CSV** para múltiples cruceros
2. Buscar conflictos **manualmente** después de cargar todos los datos
3. Exportar JSON **regularmente** como backup
4. Mantener la planilla CSV como **respaldo** de los datos

### **⚠️ Evitar:**
- ❌ No agregar cruceros uno por uno si son muchos
- ❌ No buscar conflictos después de cada crucero
- ❌ No olvidar aplicar las soluciones propuestas

---

## 🆘 SOPORTE

Si tiene problemas:
1. Revisar esta guía
2. Consultar `GUIA_AGENCIAS_MARITIMAS.md`
3. Verificar formato de datos
4. Contactar soporte técnico

---

## ✨ CARACTERÍSTICAS V2.0

✅ Fechas separadas (entrada/salida)  
✅ Cruceros de múltiples días  
✅ Detección manual de conflictos  
✅ Aplicación automática de soluciones  
✅ Carga masiva desde Excel/CSV  
✅ Planillas para agencias  
✅ Interfaz con códigos de color  
✅ 100% portable (USB)  
✅ Sin conexión a internet  

**¡Sistema completo y listo para usar!** 🚢⚓🎯
