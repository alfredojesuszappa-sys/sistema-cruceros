\# Changelog



Todos los cambios notables en este proyecto serán documentados en este archivo.



El formato está basado en \[Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),

y este proyecto adhiere a \[Semantic Versioning](https://semver.org/lang/es/).



---



\## \[1.0.0] - 2026-01-20



\### 🎉 Primera Versión Estable



Esta es la primera versión oficial del Sistema de Gestión de Cruceros Oceánicos, lista para producción.



\### ✨ Agregado



\#### Gestión de Movimientos

\- Sistema completo de registro de llegadas y salidas de cruceros

\- Cálculo automático de tiempos:

&nbsp; - ETA (Estimated Time of Arrival)

&nbsp; - ETD (Estimated Time of Departure)

&nbsp; - Hora de amarre (ETA Practicaje + 60 minutos)

&nbsp; - Hora de zarpada (Hora amarre + tiempo de estadía)

\- Estados del buque:

&nbsp; - En tránsito

&nbsp; - En puerto

&nbsp; - Zarpado

&nbsp; - Cancelado

\- Formulario de edición completo con validaciones

\- Opción de eliminar movimientos individuales

\- Opción de eliminar todos los movimientos



\#### Base de Datos de Buques

\- Base de datos precargada con \*\*75 cruceros oceánicos\*\*

\- Información completa de cada buque:

&nbsp; - Nombre del buque

&nbsp; - Dimensiones (eslora, manga, puntal, calado)

&nbsp; - IMO (International Maritime Organization number)

&nbsp; - Bandera

&nbsp; - Agencia marítima

&nbsp; - Capacidad de pasajeros

\- Búsqueda y filtrado avanzado

\- Vista de tabla con paginación

\- Importación masiva desde Excel/CSV

\- Exportación de base de datos

\- Plantilla Excel incluida (`plantilla\_cruceros.csv`)



\#### Gestión de Canales



\*\*Canal CPI (Canal Principal de Ingreso):\*\*

\- Cálculo automático de reserva de entrada:

&nbsp; - Inicio: ETA Practicaje

&nbsp; - Fin: ETA Practicaje + 60 minutos

\- Cálculo automático de reserva de salida:

&nbsp; - Inicio: Hora de zarpada

&nbsp; - Fin: Hora de zarpada + 60 minutos



\*\*Canal ACC (Área de Control de Cruceros):\*\*

\- Cálculo automático de reserva de entrada:

&nbsp; - Inicio: 15 minutos antes de hora de amarre

&nbsp; - Fin: Hora de amarre

\- Cálculo automático de reserva de salida:

&nbsp; - Inicio: Hora de zarpada

&nbsp; - Fin: Hora de zarpada + 60 minutos

\- \*\*Detección automática de conflictos en KM 118.5:\*\*

&nbsp; - Identifica solapamientos de horarios

&nbsp; - Alerta visual en la tabla

&nbsp; - Detalles del conflicto en tooltip



\#### Dashboard y Estadísticas

\- \*\*Tarjetas de resumen:\*\*

&nbsp; - Total de pasajeros ingresados

&nbsp; - Total de pasajeros egresados

&nbsp; - Buques actualmente en puerto

&nbsp; - Próximas llegadas (próximas 24 horas)

\- \*\*Alertas de conflictos:\*\*

&nbsp; - Lista de conflictos detectados en ACC

&nbsp; - Información de buques en conflicto

&nbsp; - Horarios solapados resaltados

\- Actualización en tiempo real de estadísticas



\#### Reportes

\- \*\*Reporte A3 para impresión:\*\*

&nbsp; - Formato optimizado para A3 landscape

&nbsp; - Incluye todos los movimientos registrados

&nbsp; - Reservas de canal CPI y ACC

&nbsp; - Conflictos resaltados en rojo

&nbsp; - Información completa de pasajeros

&nbsp; - Diseño profesional con logo

&nbsp; - Exportable a PDF

\- Botón de impresión directo

\- Vista previa antes de imprimir



\#### Importación/Exportación

\- \*\*Importación desde Excel/CSV:\*\*

&nbsp; - Soporte para archivos .csv y .xlsx

&nbsp; - Plantilla incluida con formato correcto

&nbsp; - Validación de datos al importar

&nbsp; - Mapeo automático de columnas

&nbsp; - Manejo de errores con mensajes claros

\- \*\*Exportación de datos:\*\*

&nbsp; - Exportar movimientos a Excel

&nbsp; - Exportar base de datos de buques

&nbsp; - Descarga de plantilla

\- \*\*Herramienta de backup (`backup-data.html`):\*\*

&nbsp; - Exportar todos los datos a JSON

&nbsp; - Importar datos desde backup JSON

&nbsp; - Borrar todos los datos

&nbsp; - Estadísticas de almacenamiento

&nbsp; - Verificación de integridad



\#### Interfaz de Usuario

\- \*\*Diseño moderno y profesional:\*\*

&nbsp; - Tema flat design sin gradientes

&nbsp; - Colores corporativos (azul naval)

&nbsp; - Iconos de Lucide React

&nbsp; - Componentes shadcn/ui

&nbsp; - Responsive design (desktop, tablet, mobile)

\- \*\*Navegación por pestañas:\*\*

&nbsp; - Dashboard

&nbsp; - Gestión de Movimientos

&nbsp; - Gestión de Buques

&nbsp; - Estadísticas

&nbsp; - Reporte A3

&nbsp; - Manual de Usuario

\- \*\*Feedback visual:\*\*

&nbsp; - Mensajes toast para acciones

&nbsp; - Indicadores de carga

&nbsp; - Animaciones sutiles

&nbsp; - Estados de hover y focus claros



\#### Almacenamiento

\- \*\*localStorage (HTML5):\*\*

&nbsp; - Almacenamiento persistente local

&nbsp; - No requiere servidor

&nbsp; - Capacidad: ~5-10 MB

&nbsp; - Tres colecciones de datos:

&nbsp;   - `ships`: Base de datos de buques (75 buques, ~11 KB)

&nbsp;   - `crossingMovements`: Movimientos registrados

&nbsp;   - `lastRecalculationTime`: Timestamp de última actualización

\- \*\*Backup y restauración:\*\*

&nbsp; - Herramienta dedicada de backup

&nbsp; - Exportación a archivo JSON

&nbsp; - Importación desde JSON

&nbsp; - Verificación de integridad SHA256



\#### Versión Portable

\- \*\*Build para Windows:\*\*

&nbsp; - Script PowerShell `build-simple-portable.ps1`

&nbsp; - Archivo batch `INICIAR.bat` para inicio fácil

&nbsp; - Archivo batch mejorado `INICIAR\_MEJORADO.bat`

&nbsp; - Servidor Node.js embebido

&nbsp; - 100% offline (sin conexión a internet)

&nbsp; - Sin instalación requerida

&nbsp; - Portable en USB

&nbsp; - Archivo ZIP distribuible (~0.2 MB)

\- \*\*Configuraciones incluidas:\*\*

&nbsp; - `astro.config.static.mjs` para build estático

&nbsp; - `astro.config.portable.mjs` para versión portable

&nbsp; - `astro.config.mjs` para Cloudflare Workers (deploy cloud)



\#### Documentación

\- \*\*Manual de Usuario (`MANUAL\_USUARIO.md`):\*\*

&nbsp; - Guía completa paso a paso

&nbsp; - Capturas de pantalla

&nbsp; - Casos de uso reales

&nbsp; - Solución de problemas

&nbsp; - FAQ

\- \*\*Documentación Técnica (`DOCUMENTACION\_TECNICA\_INGENIERIA.md`):\*\*

&nbsp; - Arquitectura del sistema

&nbsp; - Diagramas de flujo

&nbsp; - API interna

&nbsp; - Estructura de datos

&nbsp; - Guía de desarrollo

\- \*\*Guías de Inicio:\*\*

&nbsp; - `INICIO\_RAPIDO.md`: Guía rápida 5 minutos

&nbsp; - `INICIO\_RAPIDO\_PORTABLE.md`: Para versión portable

&nbsp; - `¡EMPIEZA\_AQUI\_PORTABLE!.txt`: Instrucciones visuales

\- \*\*Guías de Deployment:\*\*

&nbsp; - `GUIA\_CREAR\_REPOSITORIO\_GITHUB.md`: Subir a GitHub

&nbsp; - `INSTRUCCIONES\_RELEASE.md`: Crear releases

&nbsp; - `CREAR\_VERSION\_PORTABLE.md`: Build portable

\- \*\*README.md profesional:\*\*

&nbsp; - Badges de versión

&nbsp; - Capturas de pantalla

&nbsp; - Tabla de contenidos

&nbsp; - Instrucciones de instalación

&nbsp; - Roadmap del proyecto

&nbsp; - Contribución y licencia



\#### Stack Tecnológico

\- \*\*Frontend:\*\*

&nbsp; - Astro 5.13.5 (framework web)

&nbsp; - React 19.1.1 (librería UI)

&nbsp; - TypeScript 5.0 (tipado estático)

&nbsp; - Tailwind CSS 4.1.11 (estilos)

&nbsp; - shadcn/ui (componentes)

\- \*\*Librerías:\*\*

&nbsp; - Lucide React 0.533.0 (iconos)

&nbsp; - date-fns 4.1.0 (fechas)

&nbsp; - React Hook Form 7.61.1 (formularios)

&nbsp; - Zod 4.0.13 (validación)

&nbsp; - Recharts 2.15.4 (gráficos)

\- \*\*Build \& Deploy:\*\*

&nbsp; - Vite (bundler)

&nbsp; - Node.js (servidor portable)

&nbsp; - Cloudflare Workers (deploy cloud)



\### 🔄 Cambiado



N/A (primera versión)



\### 🐛 Corregido



\#### Fix aplicados durante desarrollo:

\- Corrección de error `.toFixed()` en campos numéricos (`eslora`, `manga`, `puntal`, `calado`)

\- Validación de tipos en datos de buques importados

\- Sincronización de timestamps con zona horaria local

\- Formato de fechas en reporte A3

\- Cálculo de hora de amarre (ETA + 60 min)

\- Cálculo de hora de zarpada correcta

\- Detección de conflictos en ACC entrada/salida

\- Importación CSV con caracteres especiales y acentos

\- Pantalla en blanco al iniciar (hydration de React)

\- Mensaje de carga visible durante hydration

\- Actualización de lista de buques tras importación



\### 🗑️ Eliminado



N/A (primera versión)



\### ⚠️ Deprecado



N/A (primera versión)



\### 🔒 Seguridad



\- Validación de inputs en todos los formularios (Zod)

\- Sanitización de datos importados

\- Verificación de tipos TypeScript estricta

\- Sin credenciales hardcodeadas

\- Sin conexión externa requerida (100% offline)



\### 📊 Estadísticas del Proyecto



\- \*\*Archivos de código:\*\* 45+

\- \*\*Líneas de código:\*\* ~8,000

\- \*\*Componentes React:\*\* 12

\- \*\*Páginas Astro:\*\* 3

\- \*\*APIs:\*\* 2 endpoints

\- \*\*Tiempo de desarrollo:\*\* 3 semanas

\- \*\*Tests manuales:\*\* 100+ casos

\- \*\*Documentos:\*\* 15+ archivos markdown

\- \*\*Buques precargados:\*\* 75



\### 📦 Archivos del Release



\- `Sistema-Cruceros-Portable.zip` (versión portable Windows)

\- Código fuente (GitHub)



\### 🎯 Casos de Uso Probados



\- ✅ Registro de movimiento simple

\- ✅ Edición de movimiento existente

\- ✅ Eliminación de movimiento

\- ✅ Importación CSV con 10+ cruceros

\- ✅ Exportación a Excel

\- ✅ Detección de conflicto en ACC

\- ✅ Generación de reporte A3

\- ✅ Backup y restauración de datos

\- ✅ Uso offline completo

\- ✅ Versión portable en USB



\### 🐛 Problemas Conocidos



Ninguno reportado en esta versión.



\### 🔜 Próximas Versiones



Ver \[ROADMAP.md](ROADMAP.md) para el plan de desarrollo futuro.



---



\## \[Unreleased]



\### Planificado para v1.1.0



\- Sistema multi-usuario con login

\- Roles y permisos (Admin, Operador, Visualizador)

\- Notificaciones automáticas

\- Vista de calendario interactiva

\- Sincronización en la nube (opcional)

\- API REST para integraciones

\- App móvil (PWA)



---



\## Notas



\### Formato de este Changelog



\- \*\*Agregado\*\* para nuevas funcionalidades.

\- \*\*Cambiado\*\* para cambios en funcionalidades existentes.

\- \*\*Deprecado\*\* para funcionalidades que serán eliminadas.

\- \*\*Eliminado\*\* para funcionalidades eliminadas.

\- \*\*Corregido\*\* para corrección de bugs.

\- \*\*Seguridad\*\* para parches de seguridad.



\### Enlaces



\- \[Repositorio GitHub](https://github.com/TU-USUARIO/sistema-cruceros)

\- \[Documentación](https://github.com/TU-USUARIO/sistema-cruceros/wiki)

\- \[Reportar Bug](https://github.com/TU-USUARIO/sistema-cruceros/issues)



---



\[1.0.0]: https://github.com/TU-USUARIO/sistema-cruceros/releases/tag/v1.0.0

\[Unreleased]: https://github.com/TU-USUARIO/sistema-cruceros/compare/v1.0.0...HEAD



