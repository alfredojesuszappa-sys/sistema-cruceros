# 📖 INSTRUCCIONES - NUEVAS FUNCIONES DEL SISTEMA

## 🎯 CAMBIOS IMPLEMENTADOS

### 1️⃣ **CORRECCIÓN: Base de Datos** ✅

**Problema resuelto:** La pestaña "Base de Datos" ahora funciona correctamente.

**Cómo acceder:**
1. Clic en la pestaña **"Base de Datos"**
2. Verás la lista completa de 75 buques
3. Puedes buscar, filtrar y editar buques

---

### 2️⃣ **NUEVA FUNCIÓN: Horas de Clausura CPI/ACC** 🕐

**¿Qué muestra?**
Ahora puedes ver cuántas horas estarán clausurados los canales:
- **CPI (Canal Punta Indio):** Horas totales de clausura
- **ACC (Acceso Canal Costanero):** Horas totales de clausura

**¿Dónde ver?**
- Pestaña **"Reservas de Canal"**
- En la sección de estadísticas (tarjetas superiores)
- 2 nuevas tarjetas con íconos de reloj:
  - **Azul:** Horas CPI Clausurado 🕐
  - **Púrpura:** Horas ACC Clausurado 🕑

**¿Cómo se calcula?**

| Clase Buque | Horas CPI (Entrada + Salida) | Horas ACC (Entrada + Salida) |
|-------------|------------------------------|------------------------------|
| **Clase A** | 6h + 6h = **12h**           | 2.5h + 2.5h = **5h**        |
| **Clase B** | 5.5h + 5.5h = **11h**       | 2h + 2h = **4h**            |
| **Clase C** | No aplica                   | 1h + 1h = **2h**            |

**Ejemplo:**
Si tienes 8 cruceros Clase A programados:
- CPI: 8 × 12h = **96 horas clausurado**
- ACC: 8 × 5h = **40 horas clausurado**

---

### 3️⃣ **NUEVA FUNCIÓN: Exportar a Excel** 📊

**¿Para qué sirve?**
Descargar todas las reservas en formato Excel para:
- Compartir con otros departamentos
- Análisis offline
- Respaldo de datos

**¿Cómo usar?**

1. Ve a **"Reservas de Canal"**
2. En la esquina superior derecha, haz clic en el botón **verde "Excel"** 📥
3. Se descargará automáticamente un archivo `.csv`
4. Abre con Excel, LibreOffice o Google Sheets

**Nombre del archivo:**
```
reservas_canal_2026-01-16_1435.csv
```

**Contenido:**
- N°
- Buque
- Clase
- Agencia
- Reserva CPI Entrada
- Reserva ACC Entrada
- Reserva ACC Salida
- Reserva CPI Salida

---

### 4️⃣ **NUEVA FUNCIÓN: Exportar a PDF** 📄

**¿Para qué sirve?**
Imprimir o guardar como PDF un reporte completo con:
- Todas las estadísticas
- Tabla de reservas con colores
- Fecha y hora de generación

**¿Cómo usar?**

1. Ve a **"Reservas de Canal"**
2. En la esquina superior derecha, haz clic en el botón **rojo "PDF"** 📥
3. Se abrirá una nueva ventana con vista previa
4. Aparecerá automáticamente el diálogo de impresión
5. Opciones:
   - **Imprimir:** Selecciona impresora y dale "Imprimir"
   - **Guardar como PDF:** Selecciona "Guardar como PDF" en el selector de impresora

**Formato:**
- Tamaño: A4 Horizontal (Landscape)
- Incluye: Todas las estadísticas + Tabla completa + Footer

---

### 5️⃣ **NUEVA FUNCIÓN: Historial de Cambios** 📜

**¿Para qué sirve?**
Registra y muestra todos los cambios manuales que hagas en las reservas:
- Quién hizo el cambio
- Cuándo se hizo
- Qué campo se modificó
- Valor anterior y nuevo

**¿Cómo usar?**

#### **Ver Historial:**
1. Ve a **"Reservas de Canal"**
2. En la esquina superior derecha, haz clic en el botón **púrpura "Historial"** 📜
3. Se abrirá un modal con todos los cambios registrados
4. Los cambios están ordenados del más reciente al más antiguo

#### **Registrar un Cambio:**
1. En la tabla de reservas, haz clic en el botón **"✏️ Editar"** de un buque
2. Modifica los valores que necesites
3. Haz clic en **"💾 Guardar"**
4. El cambio quedará automáticamente registrado en el historial

#### **Ejemplo de Historial:**

```
╔═══════════════════════════════════════════════════════════╗
║  🚢 CELEBRITY ECLIPSE                                     ║
║  Por Operador • 16/01/2026 14:35                         ║
║                                                           ║
║  Reserva CPI Entrada                                     ║
║  14/01/2026 06:00 → 14/01/2026 05:30                    ║
║                                                           ║
║  Reserva ACC Entrada                                     ║
║  14/01/2026 10:30 → 14/01/2026 10:00                    ║
╚═══════════════════════════════════════════════════════════╝
```

---

### 6️⃣ **NUEVA FUNCIÓN: Vista Móvil Optimizada** 📱

**¿Qué cambió?**
Ahora el sistema se adapta automáticamente al tamaño de tu pantalla.

**Dispositivos soportados:**

#### **🖥️ Desktop (computadoras):**
- Vista completa con 6 tarjetas estadísticas en una fila
- Tabla con todas las columnas visibles
- Texto tamaño normal

#### **📱 Tablet:**
- Estadísticas en 2 columnas (3 filas)
- Tabla con scroll horizontal
- Texto ligeramente reducido

#### **📱 Smartphone:**
- Estadísticas en 1 columna (6 filas apiladas)
- Tabla optimizada con scroll
- Botones apilados verticalmente
- Texto y padding reducidos para mejor visualización

**No necesitas hacer nada especial:** El sistema detecta automáticamente el tamaño de pantalla y se adapta.

---

## 🎨 GUÍA VISUAL DE COLORES

Para que identifiques rápidamente cada sección:

### **Tarjetas de Estadísticas:**
- 🟢 **Verde:** Total de Reservas
- 🔵 **Azul:** Horas CPI Clausurado (con reloj 🕐)
- 🟣 **Púrpura:** Horas ACC Clausurado (con reloj 🕑)
- 🔴 **Rojo:** Clase A
- 🟠 **Ámbar:** Clase B
- 🟢 **Verde:** Clase C

### **Botones de Exportación:**
- 🟢 **Verde:** Exportar a Excel
- 🔴 **Rojo:** Exportar a PDF
- 🟣 **Púrpura:** Ver Historial

### **Columnas de la Tabla:**
- 🔵 **Fondo Azul:** Columnas de Entrada (CPI Entrada, ACC Entrada)
- 🟣 **Fondo Púrpura:** Columnas de Salida (ACC Salida, CPI Salida)

---

## 🚀 CASOS DE USO PRÁCTICOS

### **Caso 1: Necesito enviar las reservas por email**

1. Clic en **"Reservas de Canal"**
2. Clic en botón **verde "Excel"** 📥
3. Se descarga `reservas_canal_YYYY-MM-DD_HHmm.csv`
4. Adjunta el archivo a tu email y envía

---

### **Caso 2: Necesito imprimir el reporte para una reunión**

1. Clic en **"Reservas de Canal"**
2. Clic en botón **rojo "PDF"** 📥
3. Se abre ventana de impresión
4. Selecciona tu impresora
5. Clic en "Imprimir"

---

### **Caso 3: Necesito ver cuánto tiempo estará clausurado el canal**

1. Clic en **"Reservas de Canal"**
2. Mira las tarjetas de estadísticas en la parte superior
3. La tarjeta **azul con reloj** 🕐 muestra las horas CPI
4. La tarjeta **púrpura con reloj** 🕑 muestra las horas ACC

**Ejemplo:**
```
┌──────────────┐  ┌──────────────┐
│   🕐 126.5h  │  │   🕑 67.5h   │
│    Horas     │  │    Horas     │
│     CPI      │  │     ACC      │
│  Clausurado  │  │  Clausurado  │
└──────────────┘  └──────────────┘
```

Esto significa:
- El Canal Punta Indio estará clausurado **126.5 horas** en total
- El Acceso Canal Costanero estará clausurado **67.5 horas** en total

---

### **Caso 4: Modifiqué una reserva y quiero ver el historial**

1. Clic en **"Reservas de Canal"**
2. Edita una reserva (botón ✏️ Editar)
3. Cambia los valores necesarios
4. Clic en **💾 Guardar**
5. Clic en botón **púrpura "Historial"** 📜 en la esquina superior
6. Verás el cambio registrado con:
   - Fecha y hora
   - Campo modificado
   - Valor anterior
   - Valor nuevo

---

### **Caso 5: Estoy en mi teléfono y necesito revisar las reservas**

1. Abre el sistema desde tu navegador móvil
2. El diseño se adaptará automáticamente
3. Las estadísticas se apilarán verticalmente
4. La tabla tendrá scroll horizontal
5. Los botones se apilarán para mejor acceso

**Nota:** Todas las funciones están disponibles en móvil, solo cambia la distribución visual para mejor experiencia.

---

## 📊 INTERPRETACIÓN DE ESTADÍSTICAS

### **Total Reservas**
Cantidad total de cruceros programados con reservas activas.

### **Horas CPI Clausurado**
Suma de todas las horas que el Canal Punta Indio (km 118.5 hacia arriba) estará clausurado por cruceros Clase A y B.

**¿Por qué es importante?**
- Planificar tráfico alternativo
- Informar a otras embarcaciones
- Coordinar operaciones portuarias

### **Horas ACC Clausurado**
Suma de todas las horas que el Acceso Canal Costanero estará clausurado por todos los cruceros.

**¿Por qué es importante?**
- Gestionar acceso al puerto
- Coordinar con embarcaciones menores
- Planificar operaciones costeras

### **Clase A, B, C**
Cantidad de cruceros por cada clase:
- **Clase A:** Calado ≥ 8.84m (mayor restricción)
- **Clase B:** Calado 7.33-8.83m (restricción media)
- **Clase C:** Calado ≤ 7.32m (menor restricción)

---

## ⚙️ CONFIGURACIÓN Y ALMACENAMIENTO

### **¿Dónde se guardan los datos?**

Todos los datos se almacenan localmente en tu navegador usando **localStorage**:

- **Buques:** `ships_database`
- **Cruceros:** `ship_crossings`
- **Reservas editadas:** `channelReservations`
- **Historial:** `reservationHistory`

### **¿Qué significa esto?**

✅ **Ventajas:**
- Los datos no salen de tu computadora
- No necesitas conexión a internet (después de la primera carga)
- Mayor privacidad y seguridad
- Sistema portable (puede correr desde USB)

⚠️ **Consideraciones:**
- Los datos están en el navegador específico que usas
- Si borras los datos del navegador, se pierden las reservas editadas
- Usa las funciones de exportación regularmente para respaldos

### **¿Cómo hacer respaldos?**

**Opción 1: Exportar a Excel**
1. Exporta las reservas a CSV periódicamente
2. Guarda los archivos en una carpeta de respaldo

**Opción 2: Exportar datos completos** (próximamente)
- Sistema de exportación/importación JSON completo

---

## ❓ PREGUNTAS FRECUENTES

### **P: ¿Puedo editar manualmente todas las reservas?**
**R:** Sí, usa el botón ✏️ en cada fila para editar cualquier valor.

### **P: ¿Los cambios manuales afectan el cálculo automático?**
**R:** No, una vez editado manualmente, ese valor queda fijo hasta que lo vuelvas a editar.

### **P: ¿Puedo ver qué reservas fueron editadas manualmente?**
**R:** Sí, mira el historial (botón púrpura) para ver todos los cambios.

### **P: ¿El historial tiene límite de registros?**
**R:** No, todos los cambios se guardan sin límite.

### **P: ¿Puedo filtrar las reservas en el PDF/Excel?**
**R:** Sí, usa el buscador antes de exportar. Solo se exportarán las reservas filtradas.

### **P: ¿Las estadísticas se actualizan automáticamente?**
**R:** Sí, cada vez que cambies algo, las estadísticas se recalculan al instante.

### **P: ¿Funciona sin internet?**
**R:** Sí, después de la primera carga, todo funciona offline.

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### **Problema: La Base de Datos sigue en blanco**
**Solución:**
1. Refresca la página (F5 o Ctrl+R)
2. Si persiste, limpia la caché del navegador
3. Recarga la página

### **Problema: Las estadísticas muestran 0**
**Solución:**
1. Verifica que tengas cruceros en el "Sistema de Cruceros"
2. Las reservas se calculan automáticamente desde allí
3. Si no hay cruceros, no habrá reservas

### **Problema: El historial está vacío**
**Solución:**
- El historial solo muestra cambios MANUALES
- Si no has editado ninguna reserva, estará vacío
- Prueba editando una reserva para ver cómo funciona

### **Problema: El PDF no se abre**
**Solución:**
1. Verifica que tu navegador permita pop-ups
2. Algunos bloqueadores de publicidad pueden interferir
3. Prueba con otro navegador

### **Problema: El CSV no abre bien en Excel**
**Solución:**
1. El archivo usa formato UTF-8
2. En Excel: Datos → Desde texto/CSV → Selecciona el archivo
3. Asegúrate de seleccionar "UTF-8" como codificación

---

## 📞 SOPORTE

Si tienes problemas o sugerencias, documenta:
- ¿Qué estabas haciendo?
- ¿Qué esperabas que pasara?
- ¿Qué pasó en realidad?
- Capturas de pantalla si es posible

---

## 🎉 ¡LISTO!

Todas las nuevas funciones están activas y listas para usar.

**Resumen rápido:**
- ✅ Base de Datos funcional
- ✅ Estadísticas con horas de clausura
- ✅ Exportar a Excel/PDF
- ✅ Historial de cambios
- ✅ Vista móvil optimizada

**¡Disfruta del sistema mejorado! ⚓🚢**
