# 📋 GUÍA PARA AGENCIAS MARÍTIMAS
## Sistema de Gestión de Cruceros - Canal Punta Indio Km 118.5

---

## 🎯 ¿QUÉ ES ESTE SISTEMA?

Este sistema permite coordinar el paso de buques por el **Km 118.5 del Canal Punta Indio**, evitando que un buque que **SALE** del puerto se cruce con un buque que **ENTRA** al canal.

---

## 📊 CÓMO ENVIAR LOS DATOS DE SUS BUQUES

### **Paso 1: Descargar la Planilla**

La autoridad del canal les enviará un archivo llamado:
```
PLANILLA_CRUCEROS_VACIA.csv
```

### **Paso 2: Abrir en Excel**

1. Hacer doble clic en el archivo
2. Se abrirá en Microsoft Excel o Google Sheets
3. Verán una fila de ejemplo con el formato correcto

### **Paso 3: Completar los Datos**

Complete **UNA FILA POR CADA BUQUE** con la siguiente información:

#### **📌 DATOS DEL BUQUE**

| Campo | Descripción | Ejemplo |
|---|---|---|
| **buque** | Nombre del buque | MSC MONICA |
| **bandera** | País de bandera | PANAMA |
| **imo** | Código IMO completo | IMO1234567 |
| **eslora** | Eslora en metros | 294.12 |
| **manga** | Manga en metros | 32.24 |
| **puntal** | Puntal en metros | 19.40 |
| **calado** | **MUY IMPORTANTE** - Calado en metros | 9.50 |
| **agencia** | Nombre de su agencia | MSC ARGENTINA S.A. |

> ⚠️ **IMPORTANTE:** El **calado** determina la clase del buque (A, B o C) y los tiempos de navegación.

---

#### **📅 DATOS DE ENTRADA AL CANAL**

| Campo | Descripción | Ejemplo | Formato |
|---|---|---|---|
| **fechaEntrada** | Fecha de inicio de navegación | 15/01/2026 | DD/MM/YYYY |
| **horaEntrada** | Hora de inicio de navegación | 08:00 | HH:mm |

**¿Desde dónde arranca mi buque?**
- **Clase A** (calado ≥ 8.84m): Inicia desde **KM 239.100**
- **Clase B** (calado 7.32m - 8.83m): Inicia desde **KM 216**
- **Clase C** (calado ≤ 7.32m): Inicia desde **KM 59**

> 💡 **El sistema calculará automáticamente** a qué hora su buque pasará por el KM 118.5

---

#### **📅 DATOS DE SALIDA DEL PUERTO**

| Campo | Descripción | Ejemplo | Formato |
|---|---|---|---|
| **fechaSalida** | Fecha de salida del puerto | 17/01/2026 | DD/MM/YYYY |
| **horaSalida** | Hora ETD del puerto | 14:30 | HH:mm |

> ✅ **La fecha de salida PUEDE SER DÍAS DESPUÉS** de la entrada (cruceros que se quedan en puerto)

**Ejemplo:**
```
Entra:  15/01/2026 a las 08:00
Sale:   17/01/2026 a las 14:30  ← 2 días después ✅
```

---

#### **📝 DATOS ADICIONALES (Opcionales)**

| Campo | Descripción | Ejemplo |
|---|---|---|
| **fm** | Fondeadero | MVD, STS, etc. |
| **to** | Turn around | BZA/BHB |
| **situacion** | Estado del crucero | SIN CONFIRMAR |
| **notas** | Observaciones | Carga general |

**Valores válidos para "situacion":**
- `SIN CONFIRMAR` (por defecto)
- `CONFIRMADO`
- `CANCELADO`

---

### **Paso 4: Ejemplo Completo de una Fila**

```csv
MSC MONICA,PANAMA,IMO1234567,294.12,32.24,19.40,9.50,MSC ARGENTINA S.A.,15/01/2026,08:00,17/01/2026,14:30,MVD,BZA/BHB,SIN CONFIRMAR,Carga general
```

---

### **Paso 5: Guardar el Archivo**

1. Archivo → Guardar Como
2. Tipo: **CSV (delimitado por comas)**
3. Nombre: `cruceros_MSC_enero2026.csv` (o el nombre que prefiera)
4. Enviar por email a la autoridad del canal

---

## ⚠️ ERRORES COMUNES A EVITAR

### ❌ **ERROR 1: Formato de Fechas Incorrecto**
```
INCORRECTO: 2026-01-15  ❌
CORRECTO:   15/01/2026  ✅
```

### ❌ **ERROR 2: Formato de Horas Incorrecto**
```
INCORRECTO: 8:00 AM     ❌
INCORRECTO: 08:00:00    ❌
CORRECTO:   08:00       ✅
```

### ❌ **ERROR 3: Calado con Coma en vez de Punto**
```
INCORRECTO: 9,50  ❌
CORRECTO:   9.50  ✅
```

### ❌ **ERROR 4: Fecha de Salida ANTES de Fecha de Entrada**
```
INCORRECTO:
  Entrada: 17/01/2026
  Salida:  15/01/2026  ❌ (¡no puede salir antes de entrar!)

CORRECTO:
  Entrada: 15/01/2026
  Salida:  17/01/2026  ✅
```

### ❌ **ERROR 5: Dejar Campos Obligatorios Vacíos**

**Campos OBLIGATORIOS** (no pueden estar vacíos):
- ✅ buque
- ✅ imo
- ✅ calado
- ✅ fechaEntrada
- ✅ horaEntrada
- ✅ fechaSalida
- ✅ horaSalida

---

## 🕒 TIEMPOS DE NAVEGACIÓN (Referencia)

### **Para buques CLASE A (calado ≥ 8.84m):**
```
KM 239.100 → KM 118.5 → KM 0 (Puerto)
Tiempo estimado total: ~11 horas
```

### **Para buques CLASE B (calado 7.32m - 8.83m):**
```
KM 216 → KM 118.5 → KM 0 (Puerto)
Tiempo estimado total: ~10.5 horas
```

### **Para buques CLASE C (calado ≤ 7.32m):**
```
KM 59 → KM 118.5 → KM 0 (Puerto)
Tiempo estimado total: ~4 horas
```

> 💡 **No necesita calcular estos tiempos**. El sistema lo hace automáticamente.

---

## 📧 CONTACTO Y SOPORTE

Si tiene dudas sobre cómo completar la planilla, contacte a:

**Autoridad del Canal Punta Indio**
- Email: [email de contacto]
- Teléfono: [número de contacto]

---

## ✅ CHECKLIST ANTES DE ENVIAR

Antes de enviar su planilla, verifique:

- [ ] Todas las fechas en formato DD/MM/YYYY
- [ ] Todas las horas en formato HH:mm (24 horas)
- [ ] Calados con punto decimal (ej: 9.50)
- [ ] Fecha de salida >= Fecha de entrada
- [ ] Código IMO completo
- [ ] Nombre de su agencia incluido
- [ ] Archivo guardado como CSV

---

## 📖 EJEMPLO REAL PASO A PASO

### **Caso: MSC Monica**

**Su buque:**
- Nombre: MSC MONICA
- Calado: 9.50 metros → Clase A (≥ 8.84m)
- Inicia navegación desde KM 239.100

**Itinerario:**
- Llega a la zona del canal: 15/01/2026 a las 08:00
- Se queda 2 días operando en puerto
- Sale del puerto: 17/01/2026 a las 14:30

**Cómo completar la fila:**

```csv
MSC MONICA,PANAMA,IMO1234567,294.12,32.24,19.40,9.50,MSC ARGENTINA S.A.,15/01/2026,08:00,17/01/2026,14:30,MVD,BZA/BHB,SIN CONFIRMAR,Operación normal
```

**El sistema calculará automáticamente:**
- ⬇️ **Entrada:** Pasará por KM 118.5 el 15/01 alrededor de las 12:40
- ⬆️ **Salida:** Pasará por KM 118.5 el 17/01 alrededor de las 17:50

---

## 🎯 RESUMEN RÁPIDO

1. ✅ Abrir planilla en Excel
2. ✅ Una fila = Un buque
3. ✅ Fechas: DD/MM/YYYY
4. ✅ Horas: HH:mm
5. ✅ Calado con punto decimal
6. ✅ Guardar como CSV
7. ✅ Enviar por email

**¡Gracias por su colaboración!** 🚢⚓
