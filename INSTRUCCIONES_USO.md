# 🚢 GESTIÓN DE CRUCEROS OCEÁNICOS
## Canal Punta Indio - Km 118.5

---

## 📋 MANUAL DE USO

### 🎯 Funcionalidad Principal

Esta aplicación permite gestionar y planificar cruceros oceánicos en el Canal Punta Indio, específicamente para evitar conflictos en el punto crítico del **KM 118.5**.

---

## 🚀 INSTALACIÓN EN PENDRIVE

### Pasos para usar la aplicación portable:

1. **Copiar la aplicación al pendrive**
   - Copie toda la carpeta del proyecto al pendrive
   - La aplicación funciona completamente offline

2. **Abrir la aplicación**
   - Ejecute el comando de desarrollo: `npm run dev`
   - O compile la versión de producción: `npm run build` y `npm run preview`
   - Abra el navegador en `http://localhost:4321`

3. **Los datos se guardan en localStorage del navegador**
   - La aplicación recuerda todos los datos mientras use el mismo navegador
   - Use las funciones de Exportar/Importar para hacer backup

---

## 💾 GESTIÓN DE DATOS

### Exportar Datos
1. Haga clic en el botón **"Exportar"** (ícono de descarga)
2. Se descargará un archivo JSON con todos los datos
3. Guarde este archivo en el pendrive como backup
4. Nombre sugerido: `cruceros-backup-YYYY-MM-DD.json`

### Importar Datos
1. Haga clic en el botón **"Importar"** (ícono de subida)
2. Seleccione el archivo JSON de backup
3. Los datos se cargarán automáticamente
4. **IMPORTANTE:** Esto sobrescribirá los datos actuales

---

## 📝 AGREGAR UN CRUCERO

### Paso a paso:

1. **Haga clic en "Agregar Crucero"**

2. **Seleccione el Buque**
   - Elija de la lista de 75 buques precargados
   - Se mostrará automáticamente: IMO, Eslora, Calado, Clase y Agencia

3. **Complete los datos obligatorios (*)**
   - **Fecha:** Día de la operación
   - **Hora Inicio Navegación (ENTRADA):** 
     - Clase A: desde KM 239.100
     - Clase B: desde KM 216
     - Clase C: desde KM 59
   - **ETD Puerto (SALIDA):** Hora estimada de salida del puerto

4. **Datos opcionales**
   - **FM:** Fondeadero (MVD, STS, etc.)
   - **TO:** Turn Around (información de regreso)
   - **Situación:** Sin Confirmar / Confirmado / Cancelado
   - **Notas:** Observaciones adicionales

5. **Haga clic en "Agregar Crucero"**

### La aplicación calculará automáticamente:
- ✅ Todos los tiempos de paso por cada KM
- ✅ ETA al KM 118.5 (ENTRADA)
- ✅ ETD del KM 118.5 (SALIDA)
- ✅ ETA al Puerto
- ✅ Detección de conflictos

---

## ⚠️ DETECCIÓN DE CONFLICTOS

### Regla Fundamental:
> **El buque de ENTRADA siempre tiene prioridad sobre el buque de SALIDA**

### ¿Qué es un conflicto?
Un conflicto ocurre cuando:
- Un buque de SALIDA llega al KM 118.5 **antes** que un buque de ENTRADA
- O el margen de seguridad es menor a 15-30 minutos

### Alertas Visuales:
- 🔴 **Alerta roja en la parte superior**: Indica cantidad de conflictos
- 🔴 **Filas rojas en la tabla**: Cruceros con conflictos
- 🔴 **Ícono de alerta**: Junto al nombre del buque

### Ver Detalles de Conflictos:
1. Haga clic en **"Ver Timeline"** en la alerta roja
2. Se abrirá una ventana con:
   - Lista detallada de conflictos
   - Buques involucrados
   - Diferencia de tiempo
   - **Propuestas de solución**

### Propuestas Automáticas:
- **Propuesta A:** Retrasar la SALIDA (nuevo ETD Puerto)
- **Propuesta B:** Adelantar la ENTRADA (nueva hora de inicio)

---

## 🎛️ MARGEN DE SEGURIDAD

Configure el margen de seguridad deseado:
- **15 minutos:** Más restrictivo
- **30 minutos:** Recomendado (por defecto)

El sistema detectará conflictos cuando el tiempo entre cruceros sea menor al margen configurado.

---

## 📊 TABLA DE CRUCEROS

### Columnas:
- **N°:** Número secuencial automático
- **Buque:** Nombre del buque
- **Bandera:** País de registro
- **IMO:** Número de identificación internacional
- **Clase:** A (rojo), B (ámbar), C (verde)
- **Agencia:** Agencia marítima responsable
- **Fecha:** Día de operación
- **FM / TO:** Fondeadero / Turn Around
- **ETA KM 118.5:** Hora de paso entrada
- **ETD KM 118.5:** Hora de paso salida
- **ETA PTO:** Hora estimada de llegada al puerto
- **Situación:** Estado actual (selector desplegable)
- **Acciones:** Eliminar crucero

### Cambiar Situación:
Haga clic en el selector de situación para cambiar entre:
- 🔵 **Sin Confirmar** (azul)
- 🟢 **Confirmado** (verde)
- ⚫ **Cancelado** (gris)

**Nota:** Los cruceros CANCELADOS no se consideran en la detección de conflictos.

---

## 📅 TIMELINE VISUAL

### Acceso:
- Haga clic en **"Ver Timeline"** en la alerta de conflictos
- O acceda desde el botón en el encabezado

### Características:
- 📍 **Línea temporal vertical**: Ordenada cronológicamente
- ⬇️ **Eventos de ENTRADA**: Marcados en azul
- ⬆️ **Eventos de SALIDA**: Marcados en morado
- 🔴 **Conflictos**: Marcados en rojo con animación pulsante
- 🕒 **Hora exacta** de paso por KM 118.5
- 📋 **Detalles completos** de cada buque

### Leyenda:
- 🔴 Clase A (≥8.84m)
- 🟡 Clase B (7.33-8.83m)
- 🟢 Clase C (≤7.32m)
- ⬇️ Entrada al canal
- ⬆️ Salida del puerto
- 💥 Conflicto detectado

---

## 📄 GENERAR PLANILLA A3

### Botón "Generar Planilla A3":

#### Estado DESHABILITADO (gris):
- ⚠️ Hay conflictos sin resolver
- Mensaje: "Resolver conflictos antes de generar planilla"
- **Acción:** Resuelva los conflictos primero

#### Estado HABILITADO (verde):
- ✅ No hay conflictos
- Mensaje: "Generar Planilla A3"
- **Acción:** Haga clic para generar

### Generación de Planilla:
1. Se abre el diálogo de impresión del navegador
2. **Configuración recomendada:**
   - Tamaño: **A3**
   - Orientación: **Horizontal (Landscape)**
   - Márgenes: Mínimos (1cm)
   - Fuente: Aptos o Roboto 10px

3. **Opciones:**
   - Imprimir directamente
   - Guardar como PDF
   - Enviar a impresora

### Contenido de la Planilla:
- ✅ Todos los encabezados del Excel
- ✅ Todos los cruceros ordenados por fecha
- ✅ Formato optimizado para A3
- ✅ Letra legible 10px
- ✅ Tabla con bordes definidos

---

## ⏱️ TIEMPOS DE NAVEGACIÓN

### ENTRADA (Subiendo al Puerto):
```
KM 239.100 → KM 118.5  =  4:40:00  (Clase A)
KM 216.000 → KM 118.5  =  4:10:00  (Clase B)
KM 59      → KM 118.5  =  2:30:00  (Clase C - inverso)
KM 118.5   → KM 59     =  2:30:00
KM 59      → KM 37     =  1:18:00
KM 37      → KM 7.300  =  1:46:00
KM 7.300   → KM 0      =  0:26:00
AMARRE                 =  0:30:00
```

### SALIDA (Bajando desde el Puerto):
```
ETD PTO    → KM 59     =  3:20:00
KM 59      → KM 77     =  1:45:00
KM 77      → KM 118.5  =  1:45:00
KM 118.5   → KM 216    =  4:30:00  (Clase B)
KM 118.5   → KM 239.100=  5:00:00  (Clase A)
```

### Tiempos Totales Estimados:
- **Clase A ENTRADA:** ~11:10:00
- **Clase B ENTRADA:** ~10:40:00
- **Clase C ENTRADA:** ~4:00:00
- **Clase A SALIDA:** ~11:50:00
- **Clase B SALIDA:** ~11:20:00
- **Clase C SALIDA:** ~3:20:00

---

## 🎨 CLASIFICACIÓN DE BUQUES

### Por Calado:

| Clase | Calado | Color | Inicio Navegación |
|-------|--------|-------|-------------------|
| **A** | ≥ 8.84m | 🔴 Rojo | KM 239.100 |
| **B** | 7.33 - 8.83m | 🟡 Ámbar | KM 216 |
| **C** | ≤ 7.32m | 🟢 Verde | KM 59 |

**La clasificación es automática** según el calado del buque seleccionado.

---

## 🗃️ BASE DE DATOS DE BUQUES

### Gestión de Buques:

**Para acceder a la gestión de buques, use el Dashboard anterior:**
1. Los 75 buques están precargados
2. Puede agregar nuevos buques
3. Puede editar datos existentes
4. Puede eliminar buques (con precaución)

**Datos almacenados:**
- Nombre del Buque
- Bandera
- IMO
- Eslora (m)
- Manga (m)
- Puntal (m)
- Calado (m) ← **Determina la Clase**
- Agencia Marítima

---

## ⚙️ CONFIGURACIÓN

### Navegadores Compatibles:
- ✅ Google Chrome (recomendado)
- ✅ Microsoft Edge
- ✅ Firefox
- ✅ Safari

### Requisitos:
- JavaScript habilitado
- Cookies y localStorage habilitados
- Conexión a internet NO requerida (modo offline)

### Resolución Recomendada:
- Mínimo: 1366x768
- Óptimo: 1920x1080 o superior

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### "No se guardan los datos"
- **Causa:** localStorage bloqueado
- **Solución:** Habilite cookies y almacenamiento local en el navegador

### "No se exportan los datos"
- **Causa:** Bloqueo de descargas
- **Solución:** Permita descargas en el navegador

### "La planilla no se imprime en A3"
- **Causa:** Configuración incorrecta
- **Solución:** En el diálogo de impresión, seleccione "A3" y "Horizontal"

### "Perdí mis datos"
- **Causa:** localStorage borrado
- **Solución:** Importe el archivo de backup JSON

### "Los conflictos no desaparecen"
- **Causa:** Los tiempos siguen siendo conflictivos
- **Solución:** 
  1. Ajuste manualmente los horarios
  2. Use las propuestas del sistema
  3. Cambie la situación a "CANCELADO"

---

## 💡 CONSEJOS Y BUENAS PRÁCTICAS

### 1. **Backup Regular**
   - Exporte los datos al final de cada sesión
   - Guarde múltiples versiones con fecha
   - Conserve al menos las últimas 3 copias

### 2. **Planificación Anticipada**
   - Ingrese los cruceros con anticipación
   - Revise el timeline regularmente
   - Resuelva conflictos antes de confirmar

### 3. **Uso de Situaciones**
   - Use "SIN CONFIRMAR" para planificación inicial
   - Cambie a "CONFIRMADO" solo cuando esté seguro
   - Use "CANCELADO" en lugar de eliminar (mantiene historial)

### 4. **Margen de Seguridad**
   - Use 30 min para condiciones normales
   - Use 15 min solo en condiciones ideales
   - Considere clima y condiciones del canal

### 5. **Ordenamiento Automático**
   - La tabla se ordena automáticamente por fecha
   - Los cruceros más próximos aparecen primero
   - Facilita la planificación secuencial

---

## 📞 SOPORTE

### Ante dudas o problemas:
1. Consulte este manual
2. Revise los mensajes de error
3. Verifique la configuración del navegador
4. Pruebe en otro navegador

---

## 🔄 ACTUALIZACIONES

### Control de Versiones:
- La aplicación guarda datos en formato JSON
- Los backups son compatibles entre versiones
- Importe datos antiguos sin problema

---

## ✅ CHECKLIST DE USO DIARIO

- [ ] Abrir la aplicación
- [ ] Importar datos del día anterior (si es necesario)
- [ ] Revisar cruceros programados
- [ ] Agregar nuevos cruceros
- [ ] Verificar conflictos en el timeline
- [ ] Resolver conflictos detectados
- [ ] Actualizar situaciones (Confirmar/Cancelar)
- [ ] Generar planilla A3 final
- [ ] Exportar datos como backup
- [ ] Guardar archivo JSON en el pendrive

---

## 📊 RESUMEN DE FUNCIONES

| Función | Descripción | Ubicación |
|---------|-------------|-----------|
| Agregar Crucero | Nuevo crucero al sistema | Botón azul superior derecho |
| Ver Timeline | Visualización cronológica | Botón en alerta de conflictos |
| Exportar Datos | Backup en JSON | Botón "Exportar" |
| Importar Datos | Restaurar desde JSON | Botón "Importar" |
| Generar Planilla | Imprimir/PDF A3 | Botón verde inferior |
| Cambiar Situación | Confirmar/Cancelar | Selector en cada fila |
| Eliminar Crucero | Borrar registro | Ícono papelera en cada fila |
| Margen Seguridad | Ajustar 15/30 min | Selector superior derecho |

---

## 🎓 GLOSARIO

- **KM 118.5:** Punto crítico del canal donde se detectan cruceros
- **ETA:** Estimated Time of Arrival (Hora Estimada de Llegada)
- **ETD:** Estimated Time of Departure (Hora Estimada de Salida)
- **FM:** Fondeadero (lugar de anclaje: MVD, STS, etc.)
- **TO:** Turn Around (información de regreso)
- **IMO:** International Maritime Organization (número único del buque)
- **Calado:** Profundidad sumergida del buque
- **Eslora:** Longitud del buque
- **Manga:** Ancho del buque

---

**Versión:** 1.0  
**Fecha:** 2026-01-13  
**Sistema:** Gestión de Cruceros Oceánicos - Canal Punta Indio

---

✅ **¡Sistema Listo para Usar!**
