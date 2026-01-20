# 🚢 SISTEMA DE GESTIÓN DE CRUCEROS OCEÁNICOS

## 📌 Resumen Ejecutivo

Sistema completo para la gestión de cruceros de buques oceánicos en el Canal Punta Indio (Km 118.5), con detección automática de conflictos, validación en tiempo real y generación de reportes.

## ✨ Características Principales

### 🎯 Gestión Inteligente
- ✅ Cálculo automático de tiempos de navegación según clase de buque
- ✅ Validación lógica de horarios entrada/salida
- ✅ Detección de conflictos en KM 118.5
- ✅ Propuestas automáticas de resolución

### 📊 Base de Datos
- 75 buques precargados con datos completos
- Clasificación automática A/B/C según calado
- CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Búsqueda y filtros avanzados

### 📁 Importación/Exportación
- Planilla CSV con formato estandarizado
- Validación exhaustiva de datos importados
- Backup/Restore en formato JSON
- Reporte detallado de errores

### 📈 Visualización
- Timeline interactivo de cruceros
- Tabla con información completa
- Alertas visuales de conflictos
- Resaltado de estados

### 🖨️ Reportes
- Planilla A3 optimizada para impresión
- Formato profesional horizontal
- Bloqueo si hay conflictos activos
- Generación instantánea

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    INTERFAZ DE USUARIO                      │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │   Dashboard  │  │ Base de Datos│  │Sistema Cruceros │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
│                                              │              │
└──────────────────────────────────────────────┼──────────────┘
                                               │
                   ┌───────────────────────────┼─────────────────┐
                   │                           │                 │
          ┌────────▼────────┐      ┌──────────▼──────┐  ┌──────▼──────┐
          │ CrossingManager │      │ CrossingTable   │  │ Timeline    │
          └────────┬────────┘      └─────────────────┘  └─────────────┘
                   │
          ┌────────▼────────┐
          │   ships.ts      │  ← Lógica de negocio
          │  (Core Logic)   │
          └────────┬────────┘
                   │
          ┌────────▼────────┐
          │  localStorage   │  ← Persistencia de datos
          └─────────────────┘
```

## 📋 Flujo de Trabajo Típico

### 1️⃣ Agregar un Crucero
```
Usuario → Selecciona buque → Ingresa fechas/horas → 
Sistema valida → Calcula ETAs → Guarda
```

### 2️⃣ Detectar Conflictos
```
Usuario → Click "Buscar Conflictos" → Sistema analiza → 
Detecta colisiones → Muestra en Timeline → Propone soluciones
```

### 3️⃣ Resolver Conflictos
```
Usuario → Revisa Timeline → Selecciona solución → 
Sistema ajusta horarios → Verifica nuevamente
```

### 4️⃣ Generar Planilla
```
Sistema verifica conflictos → Si OK: Genera planilla A3 → 
Usuario imprime/guarda PDF
```

## 🔧 Componentes Técnicos

### Frontend
- **Framework**: Astro 5 + React 19
- **UI**: shadcn/ui + Tailwind CSS 4
- **Icons**: Lucide React
- **Validación**: Zod + React Hook Form

### Lógica de Negocio
- **Algoritmo de cruceros**: Basado en velocidades por clase
- **Detección de conflictos**: Comparación temporal con márgenes
- **Validación**: Multi-nivel (formato, lógica, tiempos)

### Persistencia
- **Storage**: localStorage (navegador)
- **Formato**: JSON estructurado
- **Backup**: Exportación/Importación completa

## 📊 Datos y Estructura

### Tiempos de Navegación

#### Entrada (por clase)
| Clase | Inicio      | Tiempo a KM 118.5 | Tiempo Total |
|-------|-------------|-------------------|--------------|
| A     | KM 239.100  | 4:40:00           | ~11:10:00    |
| B     | KM 216      | 4:10:00           | ~10:40:00    |
| C     | KM 59       | 2:30:00           | ~4:00:00     |

#### Salida (todas las clases)
| Tramo         | Tiempo    |
|---------------|-----------|
| KM 0 → 59     | 3:20:00   |
| KM 59 → 77    | 1:45:00   |
| KM 77 → 118.5 | 1:45:00   |
| KM 118.5 → 216| 4:30:00   |
| KM 118.5 → 239| 5:00:00   |

### Clasificación de Buques
- **Clase A**: Calado ≥ 8.84m (Mayor restricción)
- **Clase B**: 7.32m < Calado < 8.83m (Media restricción)
- **Clase C**: Calado ≤ 7.32m (Menor restricción)

## ⚙️ Configuración

### Márgenes de Seguridad
```javascript
// Configurable en la interfaz
const SAFETY_MARGINS = {
  short: 15,   // 15 minutos
  normal: 30   // 30 minutos (por defecto)
};
```

### Validaciones
```javascript
// Configuración de validaciones
const VALIDATIONS = {
  minPortStay: 6,        // Mínimas 6 horas en puerto
  navTimeVariance: 1,    // ±1 hora de tolerancia
  dateFormat: 'DD/MM/YYYY',
  timeFormat: 'HH:mm'
};
```

## 🚀 Instalación y Uso

### Requisitos
- Node.js 18+
- NPM 9+
- Navegador moderno (Chrome, Firefox, Edge, Safari)

### Instalación
```bash
# Clonar el repositorio
git clone [repository-url]

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

### Acceso
```
Desarrollo: http://localhost:4321
Producción: https://[tu-dominio]/app
```

## 📖 Documentación Adicional

- [GUIA_VISUAL_CRUCEROS.md](GUIA_VISUAL_CRUCEROS.md) - Guía visual detallada
- [INTEGRACION_SISTEMA_CRUCEROS.md](INTEGRACION_SISTEMA_CRUCEROS.md) - Detalles técnicos
- [INICIO_RAPIDO.txt](INICIO_RAPIDO.txt) - Guía de inicio rápido

## 🎓 Capacitación

### Video Tutoriales (Sugeridos)
1. Introducción al sistema (5 min)
2. Agregar y gestionar cruceros (10 min)
3. Detección y resolución de conflictos (15 min)
4. Importación masiva desde CSV (10 min)
5. Generación de reportes (5 min)

### Material de Apoyo
- Planilla CSV de ejemplo con datos
- Manual de usuario en PDF
- FAQ (Preguntas frecuentes)

## 🔒 Seguridad y Respaldo

### Datos Locales
- Todos los datos se almacenan en el navegador
- No hay transmisión a servidores externos
- Total privacidad y control

### Recomendaciones de Backup
```javascript
// Frecuencia sugerida
Daily:    Exportar JSON al final del día
Weekly:   Backup completo en USB/nube
Monthly:  Archivo histórico
```

## 🐛 Solución de Problemas

### Problema: No se muestran los datos
**Solución**: Verificar que localStorage esté habilitado

### Problema: Errores al importar CSV
**Solución**: Usar la planilla en blanco descargada del sistema

### Problema: Conflictos no se detectan
**Solución**: Click manual en "Buscar Conflictos"

### Problema: Planilla no se genera
**Solución**: Resolver todos los conflictos primero

## 📞 Soporte

### Contacto
- Email: [tu-email]
- Tel: [tu-telefono]
- Horario: Lunes a Viernes 9:00-18:00

### Actualizaciones
- Versión actual: **2.0**
- Última actualización: **15/01/2026**
- Próxima revisión: **15/04/2026**

## 📝 Changelog

### v2.0 (15/01/2026)
- ✅ Sistema completo de cruceros implementado
- ✅ Detección de conflictos con Timeline visual
- ✅ Importación CSV con validación exhaustiva
- ✅ Generación de planilla A3
- ✅ Integración completa con base de datos

### v1.0 (13/01/2026)
- ✅ Dashboard y estadísticas
- ✅ Base de datos de 75 buques
- ✅ Clasificación automática
- ✅ CRUD de buques

## 🎯 Roadmap Futuro

### v2.1 (Q2 2026)
- [ ] Notificaciones automáticas de conflictos
- [ ] Historial de cambios con auditoría
- [ ] Filtros avanzados y búsqueda global
- [ ] Exportación a PDF directo

### v3.0 (Q3 2026)
- [ ] API REST para integración externa
- [ ] Sincronización multi-usuario
- [ ] Dashboard en tiempo real
- [ ] App móvil nativa

## 📄 Licencia

Uso interno exclusivo. Todos los derechos reservados.

---

**Sistema de Gestión de Cruceros Oceánicos v2.0**  
**Canal Punta Indio - Km 118.5**  
**© 2026 - Gestión Marítima**

🚢 ⚓ 🌊
