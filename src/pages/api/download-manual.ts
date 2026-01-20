import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  // Contenido del manual embebido directamente
  const manualContent = `# 📖 MANUAL DE USUARIO
## Sistema de Gestión de Cruceros Oceánicos

**Versión:** 1.0.0  
**Fecha:** Enero 2026  
**Canal Punta Indio - KM 118.5**

---

## 📑 ÍNDICE

1. [Introducción](#introduccion)
2. [Inicio Rápido](#inicio-rapido)
3. [Panel Principal (Dashboard)](#dashboard)
4. [Base de Datos de Buques](#base-datos)
5. [Planilla de Cruceros](#planilla-cruceros)
6. [Reservas de Canal](#reservas-canal)
7. [Búsqueda y Filtros](#busqueda-filtros)
8. [Importación de Datos](#importacion)
9. [Generación de Reportes](#reportes)
10. [Resolución de Conflictos](#conflictos)
11. [Consejos y Mejores Prácticas](#consejos)
12. [Preguntas Frecuentes](#faq)
13. [Soporte](#soporte)

---

<a name="introduccion"></a>
## 🎯 1. INTRODUCCIÓN

### ¿Qué es este sistema?

El **Sistema de Gestión de Cruceros Oceánicos** es una aplicación web profesional diseñada para gestionar el tránsito de cruceros a través del Canal Punta Indio (KM 118.5).

### Características Principales

✅ **Gestión completa de buques** - Base de datos con toda la información técnica  
✅ **Planificación de cruceros** - Programación de entradas y salidas  
✅ **Cálculo automático** - Tiempos de tránsito calculados automáticamente  
✅ **Detección de conflictos** - Identifica solapamientos en KM 118.5  
✅ **Reservas de canal** - Gestión de cierres CPI y ACC  
✅ **Reportes profesionales** - Generación de reportes A3 para impresión  
✅ **Alertas inteligentes** - Notificaciones de cruceros próximos  

---

<a name="inicio-rapido"></a>
## 🚀 2. INICIO RÁPIDO

### Acceso al Sistema

1. Abrir navegador web (Chrome, Firefox, Edge)
2. Ir a la URL del sistema
3. El sistema carga automáticamente

### Navegación Básica

El sistema tiene **4 pestañas principales**:

\`\`\`
┌─────────────────────────────────────────────────┐
│  🏠 Dashboard  │  📚 Base Datos  │  ⚓ Cruceros  │  📅 Reservas  │
└─────────────────────────────────────────────────┘
\`\`\`

**Haz clic en cada pestaña para acceder a su funcionalidad**

---

<a name="dashboard"></a>
## 📊 3. PANEL PRINCIPAL (DASHBOARD)

### ¿Qué muestra?

El Dashboard es tu **centro de control visual**. Muestra:

- 📈 **Estadísticas generales**
  - Total de buques en base de datos
  - Total de cruceros programados
  - Cruceros por mes

- 🎨 **Distribución por clase**
  - Clase A (Calado ≥ 8.84m) - Color Rojo
  - Clase B (Calado 7.33-8.83m) - Color Naranja
  - Clase C (Calado ≤ 7.32m) - Color Verde

- 🏢 **Top 5 Agencias**
  - Ranking de agencias con más operaciones

---

<a name="base-datos"></a>
## 📚 4. BASE DE DATOS DE BUQUES

### Agregar un Buque

1. Click en **"Agregar Buque"**
2. Completar el formulario:
   - 🚢 Buque (obligatorio)
   - 🏴 Bandera
   - 🔢 IMO (obligatorio)
   - 📏 Eslora, Manga, Puntal
   - ⚓ Calado (obligatorio)
   - 🏢 Agencia

3. Click en **"Guardar"**

### Clasificación Automática

| Clase | Calado | Hasta KM | Color |
|-------|--------|----------|-------|
| **A** | ≥ 8.84m | 239 | 🔴 Rojo |
| **B** | 7.33 - 8.83m | 216 | 🟠 Naranja |
| **C** | ≤ 7.32m | 59 | 🟢 Verde |

---

<a name="planilla-cruceros"></a>
## ⚓ 5. PLANILLA DE CRUCEROS

### Agregar un Crucero

1. Click en **"Agregar Crucero"**
2. Completar:
   - Seleccionar buque
   - Fecha y hora de entrada
   - Fecha y hora de salida
   - Estado (Sin Confirmar/Confirmado/Cancelado)

3. Click en **"Agregar Crucero"**

### Cálculos Automáticos

El sistema calcula automáticamente **todos los tiempos de tránsito**:

- **Entrada:** KM 239 → KM 216 → KM 118.5 → Puerto
- **Salida:** Puerto → KM 59 → KM 118.5 → KM 239

---

<a name="reservas-canal"></a>
## 📅 6. RESERVAS DE CANAL

### Cálculo Automático de Reservas

**Reserva CPI Entrada:**
- Clase A: 6 horas antes del ETD
- Clase B: 5.5 horas antes del ETD
- Clase C: No aplica

**Reserva ACC Entrada:**
- Clase A: 2.5 horas antes del amarre
- Clase B: 2 horas antes del amarre
- Clase C: 1 hora antes del amarre

**Reserva ACC Salida:**
- Similar a entrada, calculado desde ETD salida

**Reserva CPI Salida:**
- Clase A: 6 horas antes de KM 118.5
- Clase B: 5.5 horas antes de KM 118.5
- Clase C: No aplica

---

<a name="busqueda-filtros"></a>
## 🔍 7. BÚSQUEDA Y FILTROS

### Búsqueda Global

En la parte superior: Busca por nombre, IMO, agencia o bandera.

### Filtros Avanzados

- 📅 Rango de fechas
- 🚢 Clase de buque (A/B/C)
- 🏢 Agencia marítima
- 📋 Estado (Confirmado/Sin confirmar/Cancelado)

---

<a name="importacion"></a>
## 📥 8. IMPORTACIÓN DE DATOS

### Formatos Soportados

- CSV (separado por \`;\` o \`,\`)
- Excel (.xlsx, .xls)
- JSON

### Proceso

1. Click en **"Importar"**
2. Seleccionar archivo
3. El sistema valida y procesa
4. Ver resultado con errores (si hay)

**Plantilla CSV:**
\`\`\`csv
Buque,Fecha Entrada,Hora Entrada,Fecha Salida,Hora Salida,Situacion
Celebrity Eclipse,20/01/2026,08:00,21/01/2026,14:00,CONFIRMADO
\`\`\`

---

<a name="reportes"></a>
## 📄 9. GENERACIÓN DE REPORTES

### Reporte A3 Profesional

1. Ir a **Planilla de Cruceros**
2. Resolver conflictos (si hay)
3. Click en **"Generar Reporte A3"**
4. Se abre nueva ventana
5. Usar Ctrl+P para imprimir

**Configuración de Impresión:**
- Orientación: Horizontal
- Papel: A3
- Márgenes: Normal (1cm)

---

<a name="conflictos"></a>
## ⚠️ 10. RESOLUCIÓN DE CONFLICTOS

### Detectar Conflictos

1. Click en **"Buscar Conflictos"**
2. El sistema analiza todos los cruceros
3. Muestra conflictos encontrados

### Resolver Conflictos

El sistema sugiere **2 opciones**:
1. **Retrasar salida** del buque saliente
2. **Adelantar entrada** del buque entrante

Click en **"Aplicar"** en la solución preferida.

---

<a name="consejos"></a>
## 💡 11. CONSEJOS Y MEJORES PRÁCTICAS

### Gestión Diaria

✅ Revisar **Notificaciones** de cruceros próximos  
✅ Verificar **Reservas de Canal** del día  
✅ Actualizar estados a "Confirmado"  
✅ Buscar conflictos antes de confirmar  

### Organización

📁 Mantener base de datos actualizada  
📅 Actualizar estados regularmente  
🔄 Solo editar reservas si hay cambio operativo real  

### Importación

✅ Usar plantilla oficial  
✅ Verificar nombres de buques  
✅ Revisar mensajes de error después de importar  

---

<a name="faq"></a>
## ❓ 12. PREGUNTAS FRECUENTES

**P: ¿Necesito instalar algo?**  
R: No. Es una aplicación web que funciona en el navegador.

**P: ¿Cómo se clasifica un buque?**  
R: Automáticamente por su calado (A ≥8.84m, B 7.33-8.83m, C ≤7.32m)

**P: ¿Por qué los tiempos no coinciden con mis cálculos?**  
R: Verifica la clase del buque y la hora de entrada/salida.

**P: ¿Las reservas se actualizan automáticamente?**  
R: Sí, cada vez que modificas un crucero.

**P: ¿Dónde se guardan mis datos?**  
R: Localmente en tu navegador (localStorage).

**P: ¿Cómo hago respaldo?**  
R: Click en "Exportar" y guarda el archivo JSON.

---

<a name="soporte"></a>
## 📞 13. SOPORTE

### Contacto

**Email:** alfredojesus.zappa@gmail.com

**Asunto sugerido:**
\`\`\`
[Sistema Cruceros] Consulta sobre [tema]
\`\`\`

### Información Útil al Contactar

1. Descripción del problema
2. Pasos para reproducir
3. Capturas de pantalla
4. Navegador y versión
5. Mensaje de error (si hay)

---

## 🎓 GLOSARIO

| Término | Significado |
|---------|-------------|
| **Calado** | Distancia vertical entre flotación y parte más baja del casco |
| **Eslora** | Longitud máxima del buque |
| **Manga** | Anchura máxima del buque |
| **IMO** | Número único de identificación (7 dígitos) |
| **ETD** | Estimated Time of Departure |
| **ETA** | Estimated Time of Arrival |
| **CPI** | Canal Punta Indio (KM 118.5) |
| **ACC** | Acceso al Canal |

---

## ✅ CHECKLIST RÁPIDA

### Nuevo Usuario
- [ ] Leer "Inicio Rápido"
- [ ] Explorar las 4 pestañas
- [ ] Agregar un buque de prueba
- [ ] Agregar un crucero de prueba
- [ ] Ver las reservas generadas

### Operación Diaria
- [ ] Revisar notificaciones
- [ ] Actualizar estados
- [ ] Agregar nuevos cruceros
- [ ] Buscar conflictos
- [ ] Generar reporte

---

## 🎉 CONCLUSIÓN

¡Felicitaciones! Ahora conoces el **Sistema de Gestión de Cruceros Oceánicos**.

**Recuerda:**
- ✅ Los datos se guardan automáticamente
- ✅ El sistema calcula todo por ti
- ✅ Siempre puedes usar la búsqueda global
- ✅ Los conflictos tienen soluciones sugeridas

---

**Sistema de Gestión de Cruceros Oceánicos**  
**Canal Punta Indio - KM 118.5**

*© 2026 - Todos los derechos reservados*  
*Contacto: alfredojesus.zappa@gmail.com*

**Versión:** 1.0.0  
**Última actualización:** Enero 2026
`;

  return new Response(manualContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown;charset=utf-8',
      'Content-Disposition': 'attachment; filename="Manual_Usuario_Sistema_Cruceros.md"',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
