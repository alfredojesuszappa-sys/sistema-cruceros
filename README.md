# 🚢 Sistema de Gestión de Cruceros Oceánicos

> **Sistema integral para la gestión y control de tráfico de cruceros en puertos marítimos**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/tu-usuario/sistema-cruceros/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características Principales](#-características-principales)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Instalación](#-instalación)
- [Versión Portable](#-versión-portable-windows)
- [Uso del Sistema](#-uso-del-sistema)
- [Documentación Técnica](#-documentación-técnica)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Roadmap](#-roadmap)
- [Contribución](#-contribución)
- [Licencia](#-licencia)
- [Autor](#-autor)

---

## 🎯 Descripción

El **Sistema de Gestión de Cruceros Oceánicos** es una aplicación web completa diseñada para facilitar la administración, planificación y control del tráfico de cruceros en puertos marítimos. Permite gestionar movimientos, calcular reservas de canal, detectar conflictos y generar reportes detallados.

### 🎁 Características Destacadas

- ✅ **100% Offline** - Funciona sin conexión a internet
- ✅ **Base de datos integrada** - 75 buques precargados
- ✅ **Cálculos automáticos** - Reservas de canal CPI/ACC
- ✅ **Detección de conflictos** - Sistema inteligente para KM 118.5
- ✅ **Reportes A3** - Generación de informes para impresión
- ✅ **Importación/Exportación** - Datos en Excel/CSV
- ✅ **Versión portable** - Ejecutable para Windows sin instalación

---

## 🌟 Características Principales

### 📊 Gestión de Movimientos

- **Registro de llegadas y salidas** de cruceros
- **Cálculo automático de tiempos:**
  - ETA (Estimated Time of Arrival)
  - ETD (Estimated Time of Departure)
  - Hora de amarre
  - Hora de zarpada
- **Estados del buque:**
  - En tránsito
  - En puerto
  - Zarpado
  - Cancelado

### 🛳️ Base de Datos de Buques

- **75 cruceros oceánicos** precargados
- **Información completa:**
  - Nombre del buque
  - Eslora, manga, puntal, calado
  - IMO, bandera
  - Agencia marítima
  - Capacidad de pasajeros
- **Búsqueda y filtrado** avanzado
- **Importación masiva** desde Excel/CSV

### 🚦 Gestión de Canales

#### Canal CPI (Canal Principal de Ingreso)
- Cálculo automático de reservas de entrada/salida
- Duración: 60 minutos desde ETA Practicaje

#### Canal ACC (Área de Control de Cruceros)
- Reserva de entrada: 15 min antes de ETA amarre
- Reserva de salida: Calculada desde hora de zarpada
- **Detección automática de conflictos** en KM 118.5

### 📈 Estadísticas y Reportes

- **Dashboard en tiempo real:**
  - Total de pasajeros ingresados/egresados
  - Buques en puerto
  - Próximas llegadas
  - Alertas de conflictos
- **Reporte A3 para impresión:**
  - Formato profesional
  - Exportable a PDF
  - Optimizado para impresión en A3 landscape

### 💾 Backup y Exportación

- **Exportación de datos** a Excel/CSV
- **Herramienta de backup** integrada
- **Importación/Restauración** de datos
- **Plantilla Excel** incluida

---

## 📸 Capturas de Pantalla

### Dashboard Principal
![Dashboard](docs/screenshots/dashboard.png)

### Gestión de Movimientos
![Movimientos](docs/screenshots/movimientos.png)

### Base de Datos de Buques
![Buques](docs/screenshots/buques.png)

### Reporte A3
![Reporte](docs/screenshots/reporte.png)

---

## 🚀 Instalación

### Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- Navegador web moderno (Chrome, Firefox, Edge)

### Instalación desde Código Fuente

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/sistema-cruceros.git
cd sistema-cruceros

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:4321
```

### Build para Producción

```bash
# Build estático
npm run build:static

# El resultado estará en /dist
```

---

## 💻 Versión Portable (Windows)

La versión portable **NO requiere instalación** y funciona completamente **offline**.

### 📥 Descarga

1. Ve a [Releases](https://github.com/tu-usuario/sistema-cruceros/releases)
2. Descarga `Sistema-Cruceros-Portable.zip`
3. Extrae el archivo ZIP
4. Ejecuta `INICIAR.bat`

### ✅ Requisitos

- Windows 7/8/10/11
- Node.js 18+ (se puede descargar desde [nodejs.org](https://nodejs.org))

### 🎮 Uso de la Versión Portable

```
Sistema-Cruceros-Portable/
├── 📄 INICIAR.bat          ← Doble clic para iniciar
├── 📄 LEEME_PRIMERO.txt    ← Instrucciones
├── 📄 index.html           ← Aplicación
└── 📁 _astro/              ← Archivos del sistema
```

**Pasos:**

1. **Doble clic en `INICIAR.bat`**
2. El navegador se abrirá automáticamente
3. ¡Listo para usar!

**Detener el servidor:**
- Cierra la ventana del símbolo del sistema
- O presiona `Ctrl + C`

---

## 📖 Uso del Sistema

### 1️⃣ Primer Inicio

Al abrir la aplicación por primera vez:

1. **Dashboard** muestra estadísticas en cero
2. **Base de datos de buques** cargada con 75 cruceros
3. **Sin movimientos registrados**

### 2️⃣ Registrar un Movimiento

1. Ve a **"Gestión de Movimientos"**
2. Click en **"+ Nuevo Movimiento"**
3. Completa el formulario:
   - Selecciona el buque
   - Ingresa fecha/hora de llegada (ETA Practicaje)
   - Define tiempo de estadía
   - Ingresa cantidad de pasajeros
4. Click en **"Guardar"**

El sistema calculará automáticamente:
- ✅ Hora de amarre (ETA Practicaje + 60 min)
- ✅ Hora de zarpada (Amarre + estadía)
- ✅ Reservas de canal CPI y ACC
- ✅ Detección de conflictos

### 3️⃣ Importar Datos desde Excel

1. Ve a **"Gestión de Movimientos"**
2. Click en **"Importar Excel/CSV"**
3. Descarga la plantilla incluida
4. Completa la plantilla con tus datos
5. Sube el archivo
6. ¡Listo! Los datos se importarán automáticamente

### 4️⃣ Generar Reporte A3

1. Ve a **"Reporte A3"**
2. Verifica los datos mostrados
3. Click en **"Imprimir / Exportar PDF"**
4. Selecciona:
   - Destino: **Guardar como PDF**
   - Diseño: **Horizontal**
   - Tamaño: **A3**
5. Guarda el archivo

### 5️⃣ Hacer Backup de Datos

**Opción A - Desde la aplicación:**
1. Ve a **"Configuración"**
2. Click en **"Exportar Datos"**

**Opción B - Herramienta de Backup:**
1. Abre `http://localhost:8080/backup-data.html`
2. Click en **"💾 Descargar Backup"**
3. Guarda el archivo JSON

---

## 📚 Documentación Técnica

### Documentos Incluidos

| Documento | Descripción |
|-----------|-------------|
| **[MANUAL_USUARIO.md](MANUAL_USUARIO.md)** | Guía completa para usuarios finales |
| **[DOCUMENTACION_TECNICA_INGENIERIA.md](DOCUMENTACION_TECNICA_INGENIERIA.md)** | Documentación técnica detallada |
| **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** | Guía rápida de inicio |
| **[CHANGELOG.md](CHANGELOG.md)** | Historial de cambios |

### Arquitectura del Sistema

```
┌─────────────────────────────────────────┐
│         INTERFAZ DE USUARIO             │
│  (React + Astro + shadcn/ui + Tailwind) │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│       LÓGICA DE NEGOCIO                 │
│  - Gestión de movimientos               │
│  - Cálculos de tiempos                  │
│  - Detección de conflictos              │
│  - Validaciones                         │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     CAPA DE PERSISTENCIA                │
│      localStorage (Browser)             │
│  - ships                                │
│  - crossingMovements                    │
│  - lastRecalculationTime                │
└─────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
sistema-cruceros/
├── 📁 src/
│   ├── 📁 components/          # Componentes React
│   │   ├── MainApp.tsx         # Componente principal
│   │   ├── Dashboard.tsx       # Dashboard estadísticas
│   │   ├── MovementManager.tsx # Gestión de movimientos
│   │   ├── ShipDatabase.tsx    # Base de datos buques
│   │   ├── CrossingManager.tsx # Gestión de cruceros
│   │   └── Statistics.tsx      # Estadísticas
│   ├── 📁 lib/
│   │   ├── ships.ts            # Datos de buques
│   │   └── utils.ts            # Utilidades
│   ├── 📁 pages/
│   │   ├── index.astro         # Página principal
│   │   └── api/                # Endpoints API
│   └── 📁 styles/
│       └── global.css          # Estilos globales
├── 📁 public/
│   ├── backup-data.html        # Herramienta de backup
│   └── plantilla_cruceros.csv  # Plantilla importación
├── 📁 docs/                    # Documentación
├── 📄 package.json
├── 📄 astro.config.mjs
├── 📄 tsconfig.json
├── 📄 tailwind.config.js
└── 📄 README.md
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **[Astro](https://astro.build/)** 5.13.5 - Framework web moderno
- **[React](https://react.dev/)** 19.1.1 - Librería UI
- **[TypeScript](https://www.typescriptlang.org/)** 5.0 - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** 4.1 - Framework CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI

### Librerías Principales
- **[Lucide React](https://lucide.dev/)** - Iconos
- **[date-fns](https://date-fns.org/)** - Manipulación de fechas
- **[React Hook Form](https://react-hook-form.com/)** - Formularios
- **[Zod](https://zod.dev/)** - Validación de esquemas
- **[Recharts](https://recharts.org/)** - Gráficos

### Almacenamiento
- **localStorage** (HTML5) - Persistencia de datos local

### Build & Deploy
- **[Vite](https://vitejs.dev/)** - Build tool
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - Hosting cloud
- **Node.js** - Versión portable

---

## 🗺️ Roadmap

### ✅ Versión 1.0 (Actual)
- [x] Gestión completa de movimientos
- [x] Base de datos de 75 buques
- [x] Cálculos automáticos de tiempos
- [x] Detección de conflictos
- [x] Reporte A3
- [x] Importación/Exportación Excel
- [x] Versión portable Windows

### 🔮 Versión 1.1 (Próximamente)
- [ ] **Multi-usuario:** Sistema de login y roles
- [ ] **Base de datos remota:** Sincronización en la nube
- [ ] **Notificaciones:** Alertas automáticas por email/SMS
- [ ] **Calendario visual:** Vista de calendario interactivo
- [ ] **Reportes personalizados:** Generador de reportes custom
- [ ] **API REST:** Integración con otros sistemas

### 🚀 Versión 2.0 (Futuro)
- [ ] **App móvil:** iOS y Android
- [ ] **IA predictiva:** Optimización de horarios con Machine Learning
- [ ] **Integración GPS:** Tracking en tiempo real
- [ ] **Multi-puerto:** Gestión de múltiples puertos
- [ ] **Blockchain:** Registro inmutable de movimientos

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 📝 Guías de Contribución

- Usa **TypeScript** para todo el código
- Sigue las convenciones de **ESLint**
- Escribe **tests** para nuevas funcionalidades
- Documenta los cambios en **CHANGELOG.md**
- Actualiza la documentación según corresponda

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Alfredo Jesus Zappa**

- 📧 Email: [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)
- 💼 LinkedIn: [linkedin.com/in/tu-perfil](https://linkedin.com/in/tu-perfil)
- 🐙 GitHub: [@tu-usuario](https://github.com/tu-usuario)

---

## 🙏 Agradecimientos

- Equipo de desarrollo de **Astro**
- Comunidad de **shadcn/ui**
- Todos los contribuidores del proyecto

---

## 📞 Soporte

¿Necesitas ayuda?

- 📖 [Documentación Completa](docs/)
- 💬 [Discusiones en GitHub](https://github.com/tu-usuario/sistema-cruceros/discussions)
- 🐛 [Reportar un Bug](https://github.com/tu-usuario/sistema-cruceros/issues)
- 📧 Email: soporte@ejemplo.com

---

## ⭐ ¿Te gustó el proyecto?

Si este proyecto te resultó útil, considera:

- ⭐ Darle una estrella en GitHub
- 🐛 Reportar bugs o sugerir mejoras
- 🤝 Contribuir con código
- 📢 Compartirlo con otros

---

<div align="center">

**Hecho con ❤️ por el equipo de Sistema de Cruceros**

[⬆ Volver arriba](#-sistema-de-gestión-de-cruceros-oceánicos)

</div>
