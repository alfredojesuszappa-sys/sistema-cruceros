# 🚀 INICIO RÁPIDO
## Sistema de Gestión de Cruceros - 3 Pestañas

---

## ⚡ EMPEZAR EN 30 SEGUNDOS

### 1️⃣ Iniciar el Sistema
```bash
npm run dev
```

### 2️⃣ Abrir en Navegador
```
http://localhost:3000
```

### 3️⃣ ¡Listo!
El sistema se abrirá mostrando el **Dashboard** 📊

---

## 📋 LAS 3 PESTAÑAS

```
┌──────────────────────────────────────────────────────────┐
│  📊 Dashboard  │  🚢 Sistema de Cruceros  │  💾 Base de Datos  │
└──────────────────────────────────────────────────────────┘
```

---

## 1️⃣ DASHBOARD 📊

### ¿Qué Verás?
- **Estadísticas generales** del sistema
- **Total de buques** registrados: 75
- **Clasificación** por clases (A, B, C)
- **Próximo crucero** programado
- **Estados** de cruceros (confirmados/pendientes/cancelados)
- **Conflictos** detectados

### ¿Qué Hacer?
✅ Revisar estadísticas del día  
✅ Ver próximo crucero  
✅ Verificar si hay conflictos  

**⏱️ Tiempo:** 1 minuto

---

## 2️⃣ SISTEMA DE CRUCEROS 🚢

### ¿Qué Verás?
- **Formulario** para agregar cruceros
- **Tabla** con todos los cruceros
- **4 Botones de acción:**
  - 🟡 Buscar Conflictos
  - 🔵 Importar Excel
  - 🟢 Exportar Datos
  - 🌸 Generar Reporte A3

### ¿Qué Hacer?

#### Para Detectar Conflictos:
1. Click en **🔍 Buscar Conflictos**
2. Ver timeline con conflictos
3. Leer las 2 soluciones propuestas
4. Click en **"Aplicar"** en la solución preferida
5. ✅ Conflicto resuelto

#### Para Agregar un Crucero:
1. Seleccionar buque del dropdown
2. Ingresar fecha y hora de entrada
3. Ingresar fecha y hora de salida
4. Seleccionar estado (Confirmado/Sin confirmar/Cancelado)
5. Click **"➕ Agregar Crucero"**

#### Para Generar Reporte:
1. Resolver todos los conflictos primero
2. Click **"📄 Generar Reporte A3"**
3. Se abre ventana con reporte
4. Imprimir o guardar PDF

**⏱️ Tiempo:** 2-3 minutos por tarea

---

## 3️⃣ BASE DE DATOS 💾

### ¿Qué Verás?
- **Búsqueda** en tiempo real
- **Filtros** por clase y agencia
- **Tabla** con todos los buques (75 precargados)
- **Botón** "➕ Agregar Buque"

### ¿Qué Hacer?

#### Para Buscar un Buque:
1. Escribir en el campo 🔍 Buscar
2. Resultados se filtran automáticamente

#### Para Agregar un Buque:
1. Click en **"➕ Agregar Buque"**
2. Completar formulario:
   - 🚢 Buque (obligatorio)
   - 🔢 IMO (obligatorio)
   - ⚓ Calado (obligatorio)
   - Otros campos opcionales
3. Ver **clasificación automática** (A/B/C)
4. Click **"💾 Guardar"**

#### Para Editar un Buque:
1. Click en **"✏️ Editar"** en la fila del buque
2. Modificar datos en el formulario
3. Click **"💾 Actualizar"**

#### Para Eliminar un Buque:
1. Click en **"🗑️ Eliminar"** en la fila del buque
2. Confirmar eliminación
3. ✅ Buque eliminado

**⏱️ Tiempo:** 1-2 minutos por tarea

---

## 🎯 PRIMER USO: GUÍA DE 5 MINUTOS

### Paso 1: Ver el Dashboard (1 min)
```
1. Iniciar: npm run dev
2. Abrir: http://localhost:3000
3. Revisar estadísticas
4. Notar que hay 1 conflicto detectado
```

### Paso 2: Resolver el Conflicto (2 min)
```
1. Click en pestaña "Sistema de Cruceros"
2. Click en "🔍 Buscar Conflictos"
3. Ver conflicto entre NORWEGIAN STAR y MSC SEAVIEW
4. Leer las 2 soluciones propuestas
5. Click en "Aplicar" en cualquier solución
6. ✅ Conflicto resuelto
```

### Paso 3: Generar Reporte (1 min)
```
1. Click en "📄 Generar Reporte A3"
2. Ver reporte en nueva ventana
3. (Opcional) Imprimir o guardar
```

### Paso 4: Explorar Base de Datos (1 min)
```
1. Click en pestaña "Base de Datos"
2. Buscar "MSC" en el buscador
3. Ver resultados filtrados
4. Click en "✏️ Editar" en MSC SEAVIEW
5. Ver formulario con datos
6. Click "Cancelar"
```

**⏱️ Total: 5 minutos**

---

## 📊 DATOS DE PRUEBA INCLUIDOS

### 75 Buques Precargados
- 15 Clase A (calado ≥ 8.84m)
- 28 Clase B (calado 7.33-8.83m)
- 32 Clase C (calado ≤ 7.32m)

### 3 Cruceros Programados

**1. MSC SEAVIEW** (Clase A)
- Entrada: 29/01/2026 10:00
- Salida: 31/01/2026 14:00
- Estado: CONFIRMADO

**2. NORWEGIAN STAR** (Clase B)
- Entrada: 27/01/2026 08:00
- Salida: 29/01/2026 14:00
- Estado: CONFIRMADO
- ⚠️ CONFLICTO con MSC SEAVIEW

**3. INSIGNIA** (Clase C)
- Entrada: 30/01/2026 06:00
- Salida: 01/02/2026 10:00
- Estado: SIN CONFIRMAR
- ✅ Sin conflictos

---

## 🎨 CARACTERÍSTICAS VISUALES

### Colores por Clase:
- 🔴 **Clase A** = Rojo (#ef4444)
- 🟠 **Clase B** = Ámbar (#f59e0b)
- 🟢 **Clase C** = Verde (#22c55e)

### Botones con Colores:
- 🟡 **Buscar Conflictos** = Amarillo pastel
- 🔵 **Importar Excel** = Azul pastel
- 🟢 **Exportar Datos** = Verde pastel
- 🌸 **Generar Reporte A3** = Rosa pastel

### Efectos Visuales:
- ✨ **Glassmorphism** en tarjetas
- 🎨 **Neumorphism** en botones
- 🔼 **Elevación 3D** en hover
- 🔄 **Transiciones suaves**

---

## 💡 CONSEJOS RÁPIDOS

### Dashboard:
💡 Las tarjetas tienen efecto hover 3D - ¡Pruébalas!  
💡 Los números se actualizan en tiempo real  

### Sistema de Cruceros:
💡 El reporte A3 solo se habilita cuando NO hay conflictos  
💡 Los horarios se calculan automáticamente al seleccionar buque  
💡 Puedes importar múltiples cruceros desde Excel  

### Base de Datos:
💡 La búsqueda filtra en tiempo real mientras escribes  
💡 La clasificación se actualiza automáticamente al cambiar el calado  
💡 Puedes filtrar por clase y agencia simultáneamente  

---

## ❓ PREGUNTAS FRECUENTES

### ¿Dónde se guardan los datos?
📦 En localStorage del navegador (datos persistentes)

### ¿Puedo usar el sistema sin internet?
✅ Sí, funciona 100% offline

### ¿Cómo exporto los datos?
💾 Click en "Exportar Datos" → Descarga archivo JSON

### ¿Cómo importo cruceros desde Excel?
📤 Click en "Importar Excel" → Seleccionar archivo .xlsx/.csv

### ¿Qué pasa si cierro el navegador?
💪 Los datos se mantienen (localStorage)

### ¿Puedo eliminar un buque que tiene cruceros?
⚠️ Primero debes eliminar los cruceros asociados

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### No veo datos al iniciar
**Solución:** Refresca la página (F5)

### El reporte A3 está deshabilitado
**Solución:** Resolver todos los conflictos primero

### No se calculan los horarios
**Solución:** Completar fecha y hora de entrada

### La búsqueda no funciona
**Solución:** Verificar que hay buques en la base de datos

### Error al importar Excel
**Solución:** Verificar formato del archivo (debe tener columnas correctas)

---

## 📚 DOCUMENTACIÓN COMPLETA

Si necesitas más detalles, consulta:

1. **GUIA_VISUAL_PESTAÑAS.md**
   - Screenshots ASCII de cada sección
   - Flujos de trabajo detallados

2. **SISTEMA_COMPLETO_CON_PESTAÑAS.md**
   - Documentación técnica completa
   - Especificaciones de funcionalidades

3. **RESUMEN_EJECUTIVO_PESTAÑAS.md**
   - Vista ejecutiva del proyecto
   - Métricas y estado

4. **COMO_PROBAR_SISTEMA.md**
   - Casos de prueba paso a paso
   - Validaciones

---

## 🎯 ACCIONES MÁS COMUNES

### Al Iniciar el Día:
1. ✅ Abrir Dashboard
2. ✅ Revisar estadísticas
3. ✅ Verificar conflictos

### Gestión Diaria:
1. ✅ Agregar nuevos cruceros
2. ✅ Buscar conflictos
3. ✅ Resolver conflictos
4. ✅ Generar reporte

### Al Finalizar el Día:
1. ✅ Exportar datos (backup)
2. ✅ Verificar que no hay conflictos
3. ✅ Generar reporte final

---

## 📱 ATAJOS DE TECLADO

```
Tab         → Navegar entre campos
Enter       → Enviar formulario
Escape      → Cerrar modal
Ctrl + F    → Buscar (en navegador)
F5          → Refrescar página
Ctrl + P    → Imprimir
```

---

## 🚀 COMANDOS ÚTILES

```bash
# Iniciar desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview

# Limpiar caché
npm run clean
```

---

## ✅ CHECKLIST RÁPIDO

### Primera Vez:
- [ ] Iniciar sistema (`npm run dev`)
- [ ] Ver Dashboard
- [ ] Explorar 3 cruceros de prueba
- [ ] Detectar conflicto
- [ ] Resolver conflicto
- [ ] Generar reporte
- [ ] Buscar un buque
- [ ] Agregar un buque de prueba

### Uso Diario:
- [ ] Revisar Dashboard
- [ ] Agregar cruceros del día
- [ ] Buscar conflictos
- [ ] Resolver conflictos
- [ ] Generar reporte
- [ ] Exportar backup

---

## 🎉 ¡LISTO PARA EMPEZAR!

```
┌─────────────────────────────────────────┐
│                                         │
│   🚢 Sistema de Gestión de Cruceros    │
│      Canal Punta Indio - KM 118.5      │
│                                         │
│   ✅ 3 Pestañas Operativas             │
│   ✅ 75 Buques Precargados             │
│   ✅ 3 Cruceros de Prueba              │
│   ✅ Diseño Moderno                    │
│   ✅ 100% Funcional                    │
│                                         │
│        🚀 ¡A NAVEGAR!                   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📞 SOPORTE

**¿Necesitas ayuda?**
- 📖 Lee la documentación completa
- 🔍 Busca en las FAQ
- 📝 Revisa los ejemplos de uso

---

**Versión 3.0 - Enero 2026**
**✅ Sistema Completo y Operativo**

⚓ **¡Buen viaje! **🚢
