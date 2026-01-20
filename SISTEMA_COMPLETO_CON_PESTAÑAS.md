# 🚢 SISTEMA COMPLETO DE GESTIÓN DE CRUCEROS
## VERSIÓN CON 3 PESTAÑAS

---

## 📋 ESTRUCTURA DEL SISTEMA

El sistema ahora cuenta con **3 pestañas principales** para una gestión completa:

### 1️⃣ Dashboard 📊
**Vista general del sistema**

- **Estadísticas Principales:**
  - Total de buques registrados
  - Cruceros programados (confirmados/pendientes)
  - Conflictos detectados
  - Agencias marítimas operando

- **Tarjetas de Clasificación:**
  - Clase A (rojo): Buques con calado ≥ 8.84m
  - Clase B (ámbar): Buques con calado 7.33-8.83m
  - Clase C (verde): Buques con calado ≤ 7.32m

- **Información del Próximo Crucero:**
  - Nombre del buque
  - Fecha y hora de entrada
  - ETA KM 118.5
  - Agencia marítima

- **Estados de Cruceros:**
  - ✓ Confirmados
  - ⏳ Sin Confirmar
  - ✖ Cancelados

- **Información del Sistema:**
  - Canal: Punta Indio - KM 118.5
  - Margen de seguridad: 30 minutos
  - Puntos de control
  - Estado operativo

---

### 2️⃣ Sistema de Cruceros 🚢
**Gestión completa de cruceros oceánicos**

#### Funcionalidades:

**A. Formulario de Entrada/Salida:**
- Selección de buque desde base de datos
- Fecha y hora de entrada
- Cálculo automático de ETAs
- Fecha y hora de salida
- Cálculo automático de ETDs
- Columnas especiales para Clase C (KM 59)
- Estado del crucero (Sin confirmar / Confirmado / Cancelado)

**B. Detección de Conflictos:**
- Botón "🔍 Buscar Conflictos" (amarillo pastel)
- Timeline visual de conflictos
- Panel de soluciones automáticas (2 propuestas por conflicto)
- Informe detallado con buques, horarios y soluciones
- Aplicación automática de resoluciones

**C. Importación de Datos:**
- Botón "📤 Importar Excel" (azul pastel)
- Soporte para .xlsx, .xls, .csv
- Validación automática de datos
- Importación masiva de cruceros

**D. Exportación:**
- Botón "💾 Exportar Datos" (verde pastel)
- Descarga en formato JSON
- Backup completo del sistema

**E. Reporte A3:**
- Botón "📄 Generar Reporte A3" (rosa pastel)
- Solo habilitado cuando no hay conflictos
- Formato profesional optimizado para impresión
- Tamaño A3 horizontal
- Auto-impresión

**F. Tabla de Cruceros:**
- Vista completa de todos los cruceros
- Columnas con datos calculados
- ETAs y ETDs automáticos
- Colores por clase (A: rojo, B: ámbar, C: verde)
- Acciones: Editar y Eliminar

---

### 3️⃣ Base de Datos 💾
**Gestión completa de buques**

#### Funcionalidades:

**A. Búsqueda Avanzada:**
- 🔍 Búsqueda por nombre, IMO o agencia
- Búsqueda en tiempo real

**B. Filtros:**
- 🎯 Filtrar por Clase (A, B, C, Todas)
- 🏢 Filtrar por Agencia

**C. Agregar Nuevo Buque:**
- Botón prominente "➕ Agregar Buque"
- Formulario modal completo:
  - 🚢 Buque (obligatorio)
  - 🏴 Bandera
  - 🔢 IMO (obligatorio)
  - 📏 Eslora (metros)
  - ↔️ Manga (metros)
  - ↕️ Puntal (metros)
  - ⚓ Calado (metros, obligatorio)
  - 🏢 Agencia marítima
- Clasificación automática en tiempo real
- Validación de campos

**D. Editar Buque:**
- Botón "✏️ Editar" en cada fila
- Formulario pre-llenado
- Actualización inmediata

**E. Eliminar Buque:**
- Botón "🗑️ Eliminar" en cada fila
- Confirmación de seguridad
- Eliminación permanente

**F. Tabla Completa:**
- Vista de todos los buques
- Columnas ordenadas:
  - N°
  - Buque
  - Bandera
  - IMO
  - Eslora (m)
  - Manga (m)
  - Puntal (m)
  - Calado (m)
  - Clase (con color)
  - Agencia
  - Acciones
- Diseño responsive
- Hover effects

---

## 🎨 DISEÑO Y ESTILOS

### Tarjetas Glassmorphism:
```css
- Background: rgba(255, 255, 255, 0.1)
- Backdrop filter: blur(10px)
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Box shadow: 0 8px 32px rgba(0, 0, 0, 0.3)
- Hover: translateY(-5px) con shadow aumentado
```

### Botones Neumorphism:
```css
🟡 Buscar Conflictos:  #fef3c7 (amarillo pastel)
🔵 Importar Excel:     #bfdbfe (azul pastel)
🟢 Exportar Datos:     #bbf7d0 (verde pastel)
🌸 Generar Reporte A3: #fbcfe8 (rosa pastel)
```

### Colores por Categoría:
```css
🔴 Clase A: #ef4444 (rojo)
🟠 Clase B: #f59e0b (ámbar)
🟢 Clase C: #22c55e (verde)
```

### Responsive Design:
- **Mobile** (< 640px): 1 columna, botones apilados
- **Tablet** (640-1024px): 2-3 columnas
- **Desktop** (> 1024px): 6 columnas, layout completo

---

## 🗂️ NAVEGACIÓN

### Tabs Horizontales:
- Posición: Sticky top
- Background: rgba(0, 0, 0, 0.3) con blur
- Indicador visual de pestaña activa
- Transiciones suaves
- Iconos + texto

### Iconos:
- 📊 Dashboard: LayoutDashboard
- 🚢 Sistema de Cruceros: Ship
- 💾 Base de Datos: Database

---

## 📊 DATOS DE PRUEBA

### 3 Cruceros Pre-cargados con Conflictos:

#### 1. MSC SEAVIEW (Clase A)
```
Entrada: 29/01/2026 10:00
Salida:  31/01/2026 14:00
Calado:  8.90m
Agencia: MSC Argentina
Estado:  CONFIRMADO
```

#### 2. NORWEGIAN STAR (Clase B)
```
Entrada: 27/01/2026 08:00
Salida:  29/01/2026 14:00
Calado:  7.80m
Agencia: Norwegian Cruise Line Argentina
Estado:  CONFIRMADO
⚠️ CONFLICTO con MSC SEAVIEW
```

#### 3. INSIGNIA (Clase C)
```
Entrada: 30/01/2026 06:00
Salida:  01/02/2026 10:00
Calado:  6.50m
Agencia: Oceania Cruises Argentina
Estado:  SIN CONFIRMAR
✅ Sin conflictos
```

---

## 🚀 CÓMO USAR EL SISTEMA

### 1️⃣ Iniciar el Sistema
```bash
npm run dev
```
Acceder a: `http://localhost:3000`

### 2️⃣ Dashboard (Vista Inicial)
1. Revisar estadísticas generales
2. Ver próximo crucero programado
3. Verificar conflictos pendientes
4. Consultar estados de cruceros

### 3️⃣ Gestionar Cruceros
1. Click en "Sistema de Cruceros"
2. Ver tabla de cruceros programados
3. Click en "🔍 Buscar Conflictos"
4. Revisar timeline y soluciones
5. Aplicar resoluciones
6. Click en "📄 Generar Reporte A3" (cuando no hay conflictos)

### 4️⃣ Administrar Buques
1. Click en "Base de Datos"
2. Usar búsqueda y filtros
3. Agregar nuevos buques
4. Editar o eliminar existentes
5. Ver clasificación automática

---

## 🔧 ARCHIVOS PRINCIPALES

```
src/
├── components/
│   ├── MainApp.tsx              # Componente principal con pestañas
│   ├── Dashboard.tsx            # Dashboard con estadísticas
│   ├── CrossingManagerSimple2.tsx # Sistema de cruceros
│   └── ShipDatabase.tsx         # Base de datos de buques
├── lib/
│   └── ships.ts                 # Lógica de negocio
└── pages/
    └── index.astro              # Punto de entrada
```

---

## ✅ VERIFICACIÓN FINAL

### Compilación:
```
✓ No hay errores de TypeScript
✓ Build completado exitosamente
✓ Todas las importaciones resueltas
```

### Funcionalidades:
- ✅ 3 pestañas navegables
- ✅ Dashboard con estadísticas
- ✅ Sistema de cruceros completo
- ✅ Base de datos funcional
- ✅ Búsqueda y filtros
- ✅ CRUD de buques
- ✅ Detección de conflictos
- ✅ Generación de reportes
- ✅ Importación de Excel
- ✅ Exportación de datos
- ✅ 3 cruceros de prueba
- ✅ Diseño responsive
- ✅ Estilos glassmorphism
- ✅ Botones neumorphism

---

## 📱 RESPONSIVE

### Mobile (< 640px):
- Tarjetas en 1 columna
- Botones apilados verticalmente
- Tabla con scroll horizontal
- Formularios adaptados

### Tablet (640-1024px):
- Tarjetas en 2-3 columnas
- Botones en 2 filas
- Layout optimizado

### Desktop (> 1024px):
- Tarjetas en grid de 4-6 columnas
- Todos los botones visibles
- Layout completo

---

## 🎯 PRÓXIMOS PASOS

1. **Iniciar el sistema:**
   ```bash
   npm run dev
   ```

2. **Explorar las 3 pestañas:**
   - Dashboard → Ver estadísticas
   - Sistema de Cruceros → Gestionar cruceros
   - Base de Datos → Administrar buques

3. **Probar funcionalidades:**
   - Buscar conflictos
   - Aplicar resoluciones
   - Agregar/Editar buques
   - Generar reportes

---

## 🎉 ESTADO DEL PROYECTO

**✅ SISTEMA COMPLETO Y FUNCIONAL**

- 3 pestañas operativas
- Todas las funcionalidades implementadas
- Diseño moderno y responsive
- 3 cruceros de prueba con conflictos
- Documentación completa
- Listo para producción

---

## 📚 DOCUMENTACIÓN ADICIONAL

Para más información, consultar:

- `GUIA_RAPIDA_V3.md` - Guía de uso paso a paso
- `CAMBIOS_COMPLETADOS_V3.md` - Detalle técnico completo
- `COMO_PROBAR_SISTEMA.md` - Guía de pruebas
- `RESUMEN_FINAL_V3.md` - Resumen ejecutivo

---

**🚢 Sistema de Gestión de Cruceros Oceánicos**
**Canal Punta Indio - KM 118.5**
**Versión 3.0 - Completa con 3 Pestañas**

✅ **LISTO PARA USAR**
