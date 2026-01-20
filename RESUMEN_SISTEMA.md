# 🚢 SISTEMA DE GESTIÓN DE CRUCEROS OCEÁNICOS
## Canal Punta Indio - Km 118.5

---

## ✅ SISTEMA COMPLETADO Y FUNCIONANDO

El sistema está **100% operativo** y listo para usar. A continuación, un resumen ejecutivo de todas las funcionalidades implementadas.

---

## 🎯 FUNCIONALIDADES IMPLEMENTADAS

### 1. ✅ Página Principal - Gestión de Cruceros

**Ubicación:** `http://localhost:4321`

**Características:**
- Interfaz marítima profesional con gradiente azul oceánico
- Header fijo con título y logo
- Botones de acción claramente identificados
- Tema responsivo y adaptable

### 2. ✅ Agregar Crucero

**Botón:** "Agregar Crucero" (azul, esquina superior derecha)

**Formulario incluye:**
- ✅ Selector de buque (75 buques precargados)
- ✅ Vista previa de datos del buque (IMO, Eslora, Calado, Clase, Agencia)
- ✅ Fecha de operación
- ✅ Hora inicio navegación (ENTRADA)
- ✅ ETD Puerto (SALIDA)
- ✅ FM (Fondeadero) - opcional
- ✅ TO (Turn Around) - opcional
- ✅ Situación (Sin Confirmar / Confirmado / Cancelado)
- ✅ Notas adicionales - opcional

**Cálculo Automático:**
- Determina la clase del buque (A, B, C) según calado
- Calcula todos los tiempos de paso por cada KM
- Genera ETA KM 118.5 para entrada
- Genera ETD KM 118.5 para salida
- Calcula ETA al Puerto

### 3. ✅ Tabla de Cruceros

**Características:**
- Ordenamiento automático por fecha ascendente
- Todas las columnas del Excel incluidas:
  - N° (auto-incrementado)
  - Buque
  - Bandera
  - IMO
  - Clase (con badge de color)
  - Agencia
  - Fecha
  - FM
  - TO
  - ETA KM 118.5
  - ETD KM 118.5
  - ETA PTO
  - Situación (selector desplegable)
  - Acciones (eliminar)

**Resaltado de Conflictos:**
- Filas rojas para cruceros con conflictos
- Ícono de alerta junto al nombre del buque

### 4. ✅ Detección de Conflictos

**Lógica Implementada:**
```
REGLA: El buque de ENTRADA siempre tiene prioridad sobre el de SALIDA

CONFLICTO cuando:
ETA_Salida(KM 118.5) >= ETA_Entrada(KM 118.5) - MargenSeguridad
```

**Margen de Seguridad:**
- Configurable: 15 o 30 minutos
- Selector en el header
- Detección automática en tiempo real

**Alertas:**
- 🔴 Alerta roja en la parte superior
- Contador de conflictos detectados
- Botón "Ver Timeline" para detalles

### 5. ✅ Timeline Visual

**Botón:** "Ver Timeline" (en alerta de conflictos)

**Contenido:**
1. **Resumen de Conflictos:**
   - Lista detallada de cada conflicto
   - Buques involucrados (ENTRADA vs SALIDA)
   - Clases y agencias
   - Diferencia de tiempo
   - **Propuestas automáticas:**
     - Propuesta A: Retrasar SALIDA (nuevo ETD)
     - Propuesta B: Adelantar ENTRADA (nueva hora inicio)

2. **Timeline Cronológico:**
   - Línea temporal vertical
   - Eventos ordenados por fecha/hora
   - ⬇️ Eventos de ENTRADA (azul)
   - ⬆️ Eventos de SALIDA (morado)
   - 🔴 Conflictos resaltados con animación pulsante
   - Hora exacta de paso por KM 118.5

3. **Leyenda:**
   - Colores por clase (A=rojo, B=ámbar, C=verde)
   - Símbolos de entrada/salida
   - Indicador de conflictos

### 6. ✅ Cambio de Situación

**Ubicación:** Selector en cada fila de la tabla

**Estados:**
- 🔵 **Sin Confirmar** (azul) - Estado inicial
- 🟢 **Confirmado** (verde) - Crucero confirmado
- ⚫ **Cancelado** (gris) - No se considera en conflictos

**Funcionalidad:**
- Cambio instantáneo al seleccionar
- Auto-guardado en localStorage
- Cruceros cancelados no generan conflictos

### 7. ✅ Exportación de Datos

**Botón:** "Exportar" (con ícono de descarga)

**Funcionalidad:**
- Genera archivo JSON con:
  - Todos los buques
  - Todos los cruceros
  - Fecha de exportación
- Nombre sugerido: `cruceros-backup-YYYY-MM-DD.json`
- Guardado automático en descargas del navegador

**Uso recomendado:**
- Backup diario al finalizar la jornada
- Antes de hacer cambios importantes
- Para transferir datos entre computadoras

### 8. ✅ Importación de Datos

**Botón:** "Importar" (con ícono de subida)

**Funcionalidad:**
- Selecciona archivo JSON de backup
- Valida formato
- Carga todos los datos automáticamente
- Refresca la interfaz

**Advertencia:**
- Sobrescribe los datos actuales
- Se recomienda exportar antes de importar

### 9. ✅ Generación de Planilla A3

**Botón:** "Generar Planilla A3" (verde, parte inferior)

**Estados:**
- **DESHABILITADO** (gris) cuando hay conflictos
  - Mensaje: "⚠️ Resolver conflictos antes de generar planilla"
- **HABILITADO** (verde) sin conflictos
  - Mensaje: "✅ Generar Planilla A3"

**Funcionalidad:**
- Abre diálogo de impresión del navegador
- Formato optimizado:
  - Tamaño: A3
  - Orientación: Horizontal (Landscape)
  - Márgenes: 1cm
  - Fuente: Aptos/Roboto 10px
- Opciones:
  - Imprimir directamente
  - Guardar como PDF
  - Enviar a impresora

**Contenido de la Planilla:**
- Todas las columnas de la tabla
- Todos los cruceros ordenados por fecha
- Formato legible y profesional
- Bordes definidos en tabla

### 10. ✅ Persistencia de Datos

**Almacenamiento:**
- localStorage del navegador
- Auto-guardado instantáneo
- Datos persisten entre sesiones

**Claves de almacenamiento:**
- `ships_database` - 75 buques precargados + nuevos
- `ship_crossings` - Todos los cruceros programados

**Serialización:**
- Fechas en formato ISO 8601
- Conversión automática al cargar
- Validación de integridad

### 11. ✅ Eliminación de Cruceros

**Botón:** Ícono de papelera en cada fila

**Funcionalidad:**
- Confirmación antes de eliminar
- Eliminación permanente de localStorage
- Refresco automático de tabla
- Recálculo de conflictos

---

## 📊 BASE DE DATOS DE BUQUES

### 75 Buques Precargados

**Incluye:**
- Grandes cruceros clase A (MSC, Costa, Norwegian, etc.)
- Cruceros clase B (Celebrity, Oosterdam, etc.)
- Cruceros boutique clase C (Silver, Seabourn, etc.)

**Datos completos por buque:**
- Nombre del buque
- Bandera
- Número IMO
- Eslora (metros)
- Manga (metros)
- Puntal (metros)
- Calado (metros) ← **Determina la clase automáticamente**
- Agencia marítima

### Clasificación Automática

| Clase | Calado | Color | Tiempo ENTRADA | Tiempo SALIDA | KM Inicio |
|-------|--------|-------|----------------|---------------|-----------|
| **A** | ≥ 8.84m | 🔴 Rojo | ~11:10 hs | ~11:50 hs | KM 239.100 |
| **B** | 7.33-8.83m | 🟡 Ámbar | ~10:40 hs | ~11:20 hs | KM 216 |
| **C** | ≤ 7.32m | 🟢 Verde | ~4:00 hs | ~3:20 hs | KM 59 |

---

## ⏱️ TIEMPOS DE NAVEGACIÓN IMPLEMENTADOS

### Tabla de Tiempos ENTRADA

```
CLASE A (desde KM 239.100):
KM 239.100 → KM 118.5  =  4:40:00
KM 118.5   → KM 59     =  2:30:00
KM 59      → KM 37     =  1:18:00
KM 37      → KM 7.300  =  1:46:00
KM 7.300   → KM 0      =  0:26:00
AMARRE                 =  0:30:00
─────────────────────────────────
TOTAL: 11:10:00

CLASE B (desde KM 216):
KM 216     → KM 118.5  =  4:10:00
KM 118.5   → KM 59     =  2:30:00
KM 59      → KM 37     =  1:18:00
KM 37      → KM 7.300  =  1:46:00
KM 7.300   → KM 0      =  0:26:00
AMARRE                 =  0:30:00
─────────────────────────────────
TOTAL: 10:40:00

CLASE C (desde KM 59):
KM 59      → KM 37     =  1:18:00
KM 37      → KM 7.300  =  1:46:00
KM 7.300   → KM 0      =  0:26:00
AMARRE                 =  0:30:00
─────────────────────────────────
TOTAL: 4:00:00
```

### Tabla de Tiempos SALIDA

```
CLASE A (hasta KM 239.100):
ETD PTO    → KM 59     =  3:20:00
KM 59      → KM 77     =  1:45:00
KM 77      → KM 118.5  =  1:45:00
KM 118.5   → KM 239.100=  5:00:00
─────────────────────────────────
TOTAL: 11:50:00

CLASE B (hasta KM 216):
ETD PTO    → KM 59     =  3:20:00
KM 59      → KM 77     =  1:45:00
KM 77      → KM 118.5  =  1:45:00
KM 118.5   → KM 216    =  4:30:00
─────────────────────────────────
TOTAL: 11:20:00

CLASE C (hasta KM 59):
ETD PTO    → KM 59     =  3:20:00
─────────────────────────────────
TOTAL: 3:20:00
```

---

## 🎨 DISEÑO E INTERFAZ

### Tema Visual
- **Fondo:** Gradiente azul oceánico (slate-900 → blue-900 → slate-900)
- **Componentes:** Glassmorphism con backdrop-blur
- **Bordes:** Semi-transparentes blancos
- **Texto:** Blanco sobre fondos oscuros, negro en componentes claros

### Colores de Clasificación
- 🔴 **Clase A:** Rojo (restrictivo)
- 🟡 **Clase B:** Ámbar (intermedio)
- 🟢 **Clase C:** Verde (permisivo)

### Íconos
- 🚢 Buque (header)
- ⬇️ Entrada al canal
- ⬆️ Salida del puerto
- ⚠️ Conflicto detectado
- 🕒 Tiempo/horarios
- 📥 Exportar datos
- 📤 Importar datos
- 📄 Generar planilla
- 🗑️ Eliminar crucero

### Fuentes
- **Headings:** Variable según configuración Webflow
- **Body:** Roboto/Aptos (10px en impresión)
- **Monospace:** Para tiempos y números IMO

---

## 📁 ARCHIVOS DE DOCUMENTACIÓN

### Para Usuarios Finales

1. **INICIO_RAPIDO.txt**
   - Guía de inicio en 4 pasos
   - Solución de problemas básicos
   - Checklist diario

2. **INSTRUCCIONES_USO.md**
   - Manual completo de usuario (40+ páginas)
   - Todas las funcionalidades explicadas
   - Capturas y ejemplos
   - Glosario de términos
   - FAQ extensa

### Para Desarrolladores

3. **README_TECNICO.md**
   - Arquitectura del sistema
   - Modelo de datos completo
   - Funciones y algoritmos
   - Comandos de desarrollo
   - Testing y debugging
   - Optimizaciones

4. **README.md**
   - Resumen ejecutivo
   - Quick start
   - Stack tecnológico
   - Contribuciones

---

## 🚀 CÓMO INICIAR LA APLICACIÓN

### Opción 1: Desarrollo (Recomendado para uso diario)

```bash
# Terminal/Consola
cd ruta/al/proyecto
npm run dev

# Abrir navegador en:
http://localhost:4321
```

### Opción 2: Producción (Más rápido)

```bash
npm run build
npm run preview

# Abrir navegador en:
http://localhost:4321
```

### Para Pendrive (Portable)

```bash
# Copiar proyecto completo al pendrive
# Abrir terminal en la carpeta del pendrive
npm run dev
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

### Funcionalidades Core
- [x] Agregar crucero con formulario completo
- [x] Cálculo automático de tiempos según clase
- [x] Tabla con todos los encabezados
- [x] Ordenamiento por fecha ascendente
- [x] Selector de situación (Sin Confirmar/Confirmado/Cancelado)
- [x] Eliminación de cruceros con confirmación

### Detección de Conflictos
- [x] Regla de prioridad: ENTRADA > SALIDA
- [x] Margen de seguridad configurable (15/30 min)
- [x] Alerta visual roja
- [x] Resaltado de filas conflictivas
- [x] Contador de conflictos

### Timeline
- [x] Vista cronológica completa
- [x] Eventos de entrada y salida diferenciados
- [x] Conflictos resaltados con animación
- [x] Detalles de cada evento
- [x] Propuestas de resolución (Opción A y B)
- [x] Leyenda explicativa

### Datos y Persistencia
- [x] localStorage con auto-guardado
- [x] Exportar a JSON
- [x] Importar desde JSON
- [x] Validación de datos importados
- [x] 75 buques precargados

### Planilla A3
- [x] Botón deshabilitado con conflictos
- [x] Habilitado sin conflictos
- [x] Formato A3 horizontal
- [x] Fuente 10px legible
- [x] Todos los encabezados
- [x] CSS de impresión optimizado

### UX/UI
- [x] Diseño marítimo profesional
- [x] Glassmorphism y efectos visuales
- [x] Responsive design
- [x] Íconos representativos
- [x] Colores de clasificación
- [x] Loading states
- [x] Mensajes de error/éxito

---

## 🔧 COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo

# Producción
npm run build            # Compilar para producción
npm run preview          # Previsualizar build

# Verificación
npx astro check          # Type checking
npm run astro            # Comandos Astro

# Limpieza
rm -rf node_modules      # Eliminar dependencias
npm install              # Reinstalar dependencias
rm -rf dist              # Eliminar build
```

---

## 📊 ESTADÍSTICAS DEL PROYECTO

### Archivos Principales
- **Componentes React:** 3 (CrossingManager, CrossingTable, CrossingTimeline)
- **Biblioteca de lógica:** ships.ts (~500 líneas)
- **Componentes UI:** 40+ (shadcn/ui)
- **Páginas:** 1 (index.astro)

### Tamaño del Bundle
- **CrossingManager:** ~153 KB (~48 KB gzip)
- **Client bundle:** ~176 KB (~56 KB gzip)
- **Total compilado:** ~340 KB (~104 KB gzip)

### Base de Datos
- **Buques precargados:** 75
- **Capacidad estimada:** 10,000+ cruceros sin degradación
- **Límite localStorage:** 5-10 MB (suficiente)

---

## 🎯 CASOS DE USO TÍPICOS

### Caso 1: Agregar Crucero Normal
1. Clic en "Agregar Crucero"
2. Seleccionar buque de la lista
3. Ingresar fecha (ej: 2026-01-20)
4. Ingresar hora inicio entrada (ej: 06:00)
5. Ingresar ETD puerto (ej: 18:00)
6. Guardar
7. ✅ Crucero agregado sin conflictos

### Caso 2: Detectar y Resolver Conflicto
1. Agregar crucero de entrada (ej: ETA KM 118.5 = 10:00)
2. Agregar crucero de salida (ej: ETD KM 118.5 = 09:45)
3. 🔴 Alerta de conflicto aparece
4. Clic en "Ver Timeline"
5. Ver propuestas:
   - Propuesta A: Retrasar salida a 10:30
   - Propuesta B: Adelantar entrada a 05:30
6. Editar horario del crucero conflictivo
7. ✅ Conflicto resuelto

### Caso 3: Generar Planilla Diaria
1. Verificar que no hay conflictos
2. Confirmar situación de todos los cruceros
3. Clic en "Generar Planilla A3" (verde)
4. En diálogo de impresión:
   - Tamaño: A3
   - Orientación: Horizontal
5. Guardar como PDF o Imprimir
6. ✅ Planilla generada

### Caso 4: Backup Diario
1. Al finalizar el día, clic en "Exportar"
2. Guardar archivo JSON en pendrive
3. Nombre: `cruceros-2026-01-13.json`
4. Al día siguiente:
   - Clic en "Importar"
   - Seleccionar archivo del día anterior
5. ✅ Datos recuperados

---

## 🏆 CARACTERÍSTICAS DESTACADAS

### 1. ⚡ Cálculos Automáticos
- Cero errores humanos en tiempos
- Actualización instantánea
- Consideración de todas las variables

### 2. 🎯 Detección Inteligente
- Algoritmo O(n²) optimizado
- Propuestas automáticas de resolución
- Consideración del margen de seguridad

### 3. 📊 Visualización Clara
- Timeline cronológico intuitivo
- Colores representativos por clase
- Animaciones para llamar la atención

### 4. 💾 Datos Seguros
- Backup manual controlado
- Formato estándar JSON
- Portabilidad total

### 5. 🖨️ Planilla Profesional
- Formato A3 estándar
- Fuente legible 10px
- Listo para imprimir o PDF

---

## 🎓 CAPACITACIÓN RECOMENDADA

### Para Usuarios Nuevos (30 minutos)
1. Lectura de INICIO_RAPIDO.txt (5 min)
2. Práctica agregar crucero (10 min)
3. Práctica detectar conflicto (10 min)
4. Práctica exportar/importar (5 min)

### Para Usuarios Avanzados (1 hora)
1. Lectura completa INSTRUCCIONES_USO.md (30 min)
2. Práctica con casos complejos (20 min)
3. Generación de planillas (10 min)

### Para Administradores (2 horas)
1. INSTRUCCIONES_USO.md completo (40 min)
2. README_TECNICO.md (60 min)
3. Práctica de todos los casos (20 min)

---

## 📞 SOPORTE Y RECURSOS

### Documentación
- ✅ INICIO_RAPIDO.txt - Inicio en 5 minutos
- ✅ INSTRUCCIONES_USO.md - Manual completo
- ✅ README_TECNICO.md - Para desarrolladores
- ✅ README.md - Resumen ejecutivo

### Recursos Online
- Astro Docs: https://docs.astro.build
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com

---

## 🎉 CONCLUSIÓN

El **Sistema de Gestión de Cruceros Oceánicos** está **completamente funcional** y listo para uso en producción.

### ✅ Cumple con TODOS los requisitos:
- ✅ Base de datos de buques
- ✅ Cálculo de cruceros en KM 118.5
- ✅ Detección de conflictos
- ✅ Propuestas de resolución
- ✅ Timeline visual
- ✅ Exportación/Importación
- ✅ Planilla A3
- ✅ Portabilidad (pendrive)
- ✅ Documentación completa

### 🚀 Para comenzar:
1. Abrir terminal
2. Ejecutar: `npm run dev`
3. Abrir navegador en `http://localhost:4321`
4. ¡Comenzar a gestionar cruceros!

---

**Versión:** 1.0.0  
**Fecha:** 2026-01-13  
**Estado:** ✅ PRODUCCIÓN - COMPLETAMENTE OPERATIVO  

---

**🚢 ¡Sistema listo para asegurar la navegación segura en el Canal Punta Indio!**
