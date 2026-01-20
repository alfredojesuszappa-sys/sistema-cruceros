\# 📦 Guía Completa: Crear y Distribuir Releases en GitHub



\## 🎯 Objetivo



Aprender a crear releases profesionales en GitHub para distribuir tu aplicación portable de manera organizada y profesional.



---



\## 📋 Tabla de Contenidos



1\. \[¿Qué es un Release?](#-qué-es-un-release)

2\. \[Preparación Pre-Release](#-preparación-pre-release)

3\. \[Crear Release en GitHub](#-crear-release-en-github)

4\. \[Versionado Semántico](#-versionado-semántico)

5\. \[Escribir Notas de Release](#-escribir-notas-de-release)

6\. \[Adjuntar Archivos](#-adjuntar-archivos)

7\. \[Automatización con GitHub Actions](#-automatización-con-github-actions)

8\. \[Promoción del Release](#-promoción-del-release)



---



\## 🤔 ¿Qué es un Release?



Un \*\*Release\*\* (versión) en GitHub es:



\- 📦 \*\*Empaquetado oficial\*\* de tu código en un punto específico del tiempo

\- 🏷️ \*\*Etiquetado con versión\*\* (ej: v1.0.0, v2.1.3)

\- 📝 \*\*Documentado\*\* con changelog y notas

\- 💾 \*\*Distribuible\*\* con archivos binarios adjuntos (ZIP, EXE, etc.)



\### Beneficios



✅ \*\*Para usuarios:\*\*

\- Descargas fáciles y claras

\- Saben qué versión están usando

\- Pueden ver qué cambió entre versiones



✅ \*\*Para desarrolladores:\*\*

\- Control de versiones claro

\- Historial de cambios documentado

\- Punto de referencia para rollbacks



---



\## 🛠️ Preparación Pre-Release



Antes de crear un release, asegúrate de:



\### 1️⃣ Verificar que todo funciona



```powershell

cd C:\\Users\\ajzappa\\Documents\\sistema-cruceros



\# Probar el build

npm run build:static



\# Probar la versión portable

.\\build-simple-portable.ps1



\# Verificar que inicia correctamente

cd Sistema-Cruceros-Portable

.\\INICIAR.bat

```



\### 2️⃣ Actualizar versión en package.json



```json

{

&nbsp; "name": "sistema-cruceros",

&nbsp; "version": "1.0.0",  // ← Actualizar aquí

&nbsp; "description": "Sistema de Gestión de Cruceros Oceánicos"

}

```



\### 3️⃣ Actualizar CHANGELOG.md



```markdown

\# Changelog



\## \[1.0.0] - 2026-01-20



\### Agregado

\- Sistema completo de gestión de cruceros

\- Base de datos de 75 buques

\- Cálculo automático de reservas CPI/ACC

\- Detección de conflictos en KM 118.5

\- Reporte A3 para impresión

\- Versión portable para Windows



\### Cambiado

\- N/A (primera versión)



\### Corregido

\- N/A (primera versión)



\### Eliminado

\- N/A (primera versión)

```



\### 4️⃣ Crear tag en Git



```powershell

\# Crear tag anotado

git tag -a v1.0.0 -m "Release v1.0.0 - Primera versión estable"



\# Ver tags

git tag -l



\# Subir tag a GitHub

git push origin v1.0.0

```



\### 5️⃣ Preparar archivos para distribuir



```powershell

\# Crear el ZIP portable

.\\build-simple-portable.ps1



\# Verificar que se creó

dir Sistema-Cruceros-Portable.zip



\# Opcional: Crear checksum para verificación

certutil -hashfile Sistema-Cruceros-Portable.zip SHA256 > Sistema-Cruceros-Portable.zip.sha256

```



---



\## 🚀 Crear Release en GitHub



\### Método 1: Interface Web (Recomendado para principiantes)



\#### Paso 1: Ir a Releases



1\. Ve a tu repositorio: `https://github.com/TU-USUARIO/sistema-cruceros`

2\. Click en \*\*"Releases"\*\* (panel derecho)

3\. Click en \*\*"Draft a new release"\*\*



\#### Paso 2: Seleccionar Tag



\- \*\*Choose a tag:\*\* Selecciona `v1.0.0` o escribe uno nuevo

\- Si es nuevo, GitHub lo creará automáticamente



\#### Paso 3: Título del Release



```

🚢 Sistema de Cruceros v1.0.0 - Primera Versión Estable

```



\*\*Tips para títulos:\*\*

\- Usa emojis para hacerlo visual

\- Incluye el número de versión

\- Sé descriptivo pero conciso



\#### Paso 4: Descripción del Release



Usa esta plantilla:



```markdown

\## 🎉 Primera Versión Oficial



Sistema completo de gestión de cruceros oceánicos para control de tráfico marítimo.



\### ✨ Características Principales



\#### 🚢 Gestión de Movimientos

\- Registro completo de llegadas y salidas

\- Cálculo automático de tiempos (ETA, ETD, amarre, zarpada)

\- Estados del buque (en tránsito, en puerto, zarpado, cancelado)



\#### 🛳️ Base de Datos

\- \*\*75 buques precargados\*\* con información completa

\- Búsqueda y filtrado avanzado

\- Importación masiva desde Excel/CSV



\#### 🚦 Reservas de Canal

\- \*\*CPI:\*\* Cálculo automático (60 min desde ETA)

\- \*\*ACC:\*\* Entrada y salida con detección de conflictos

\- \*\*Alertas automáticas\*\* para conflictos en KM 118.5



\#### 📊 Reportes y Estadísticas

\- Dashboard en tiempo real

\- Reporte A3 optimizado para impresión

\- Exportación a Excel/CSV/PDF



\#### 💾 Backup y Persistencia

\- Almacenamiento local (localStorage)

\- Herramienta de backup integrada

\- Importación/Exportación de datos



\### 📥 Instalación



\#### Para Usuarios (Versión Portable)



\*\*Descarga:\*\* `Sistema-Cruceros-Portable.zip` (ver archivos adjuntos abajo)



\*\*Requisitos:\*\*

\- Windows 7/8/10/11

\- Node.js 18+ → \[Descargar aquí](https://nodejs.org)



\*\*Pasos:\*\*

1\. Descargar el ZIP

2\. Extraer en cualquier carpeta

3\. Doble clic en `INICIAR.bat`

4\. El navegador se abrirá automáticamente

5\. ¡Listo para usar!



\*\*Características de la versión portable:\*\*

\- ✅ No requiere instalación

\- ✅ Funciona 100% offline

\- ✅ Incluye servidor Node.js embebido

\- ✅ Datos almacenados localmente

\- ✅ Portable en USB



\#### Para Desarrolladores (Código Fuente)



```bash

git clone https://github.com/TU-USUARIO/sistema-cruceros.git

cd sistema-cruceros

npm install

npm run dev

```



\### 📚 Documentación



\- 📖 \[Manual de Usuario Completo](https://github.com/TU-USUARIO/sistema-cruceros/blob/main/MANUAL\_USUARIO.md)

\- 🛠️ \[Documentación Técnica](https://github.com/TU-USUARIO/sistema-cruceros/blob/main/DOCUMENTACION\_TECNICA\_INGENIERIA.md)

\- 🚀 \[Guía de Inicio Rápido](https://github.com/TU-USUARIO/sistema-cruceros/blob/main/INICIO\_RAPIDO.md)



\### 🛠️ Stack Tecnológico



\- \*\*Frontend:\*\* React 19 + TypeScript 5 + Astro 5

\- \*\*UI:\*\* Tailwind CSS 4 + shadcn/ui

\- \*\*Almacenamiento:\*\* localStorage (HTML5)

\- \*\*Build:\*\* Vite + Node.js (portable)



\### 📊 Estadísticas del Proyecto



\- \*\*Archivos de código:\*\* 45+

\- \*\*Líneas de código:\*\* ~8,000

\- \*\*Componentes React:\*\* 12

\- \*\*Tiempo de desarrollo:\*\* 3 semanas

\- \*\*Tests ejecutados:\*\* 100% funcionales



\### 🐛 Problemas Conocidos



\- Ninguno reportado en esta versión



\### 📝 Notas de la Versión



\- Primera versión estable lista para producción

\- Sistema completo y funcional

\- Documentación técnica completa

\- Manual de usuario incluido



\### 🔜 Próximas Características (v1.1)



\- \[ ] Sistema multi-usuario con login

\- \[ ] Sincronización en la nube (opcional)

\- \[ ] Notificaciones automáticas

\- \[ ] Vista de calendario interactiva

\- \[ ] API REST para integraciones



\### 🤝 Contribuciones



Las contribuciones son bienvenidas. Ver \[CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.



\### 📄 Licencia



MIT License - Ver \[LICENSE](LICENSE) para más información.



\### 👨‍💻 Desarrollado por



\*\*Alfredo Jesus Zappa\*\*

\- 📧 Email: tu-email@ejemplo.com

\- 💼 LinkedIn: \[linkedin.com/in/tu-perfil](https://linkedin.com/in/tu-perfil)

\- 🐙 GitHub: \[@tu-usuario](https://github.com/tu-usuario)



\### 🙏 Agradecimientos



Gracias a todos los que contribuyeron con ideas y feedback durante el desarrollo.



---



\## 📊 Checksums (Verificación de Integridad)



\### Sistema-Cruceros-Portable.zip

```

SHA256: \[se generará automáticamente al subir el archivo]

```



Para verificar la integridad del archivo descargado:



\*\*Windows PowerShell:\*\*

```powershell

certutil -hashfile Sistema-Cruceros-Portable.zip SHA256

```



\*\*Linux/Mac:\*\*

```bash

sha256sum Sistema-Cruceros-Portable.zip

```



---



\*\*Fecha de lanzamiento:\*\* 20 de Enero, 2026  

\*\*Commit:\*\* \[hash del commit]  

\*\*Tamaño del release:\*\* ~0.5 MB (código) + ~0.2 MB (portable)



---



<div align="center">



\*\*¿Encontraste un bug? \[Repórtalo aquí](https://github.com/TU-USUARIO/sistema-cruceros/issues)\*\*



\*\*¿Tienes preguntas? \[Únete a las discusiones](https://github.com/TU-USUARIO/sistema-cruceros/discussions)\*\*



⭐ \*\*Si te gustó este proyecto, dale una estrella en GitHub\*\* ⭐



</div>

```



\#### Paso 5: Adjuntar Archivos



En la sección \*\*"Attach binaries"\*\*:



1\. Arrastra y suelta o haz clic para seleccionar:

&nbsp;  - `Sistema-Cruceros-Portable.zip`

&nbsp;  - `Sistema-Cruceros-Portable.zip.sha256` (opcional)

&nbsp;  - `MANUAL\_USUARIO.pdf` (si lo tienes)



2\. Espera a que se suban (verás barra de progreso)



\#### Paso 6: Opciones Finales



\- ☑️ \*\*Set as the latest release\*\* (marcar)

\- ☐ \*\*Set as a pre-release\*\* (NO marcar, es versión estable)

\- ☐ \*\*Create a discussion\*\* (opcional, para feedback)



\#### Paso 7: Publicar



Click en \*\*"Publish release"\*\* 🚀



---



\### Método 2: GitHub CLI (Para usuarios avanzados)



```powershell

\# Instalar GitHub CLI (si no lo tienes)

winget install GitHub.cli



\# Autenticar

gh auth login



\# Crear release con archivos adjuntos

gh release create v1.0.0 `

&nbsp; Sistema-Cruceros-Portable.zip `

&nbsp; --title "🚢 Sistema de Cruceros v1.0.0 - Primera Versión Estable" `

&nbsp; --notes-file RELEASE\_NOTES.md



\# Verificar

gh release view v1.0.0

```



---



\## 🏷️ Versionado Semántico



\### Formato: MAJOR.MINOR.PATCH



```

v1.2.3

&nbsp; │ │ └─ PATCH: Correcciones de bugs (1.2.3 → 1.2.4)

&nbsp; │ └─── MINOR: Nuevas características (1.2.0 → 1.3.0)

&nbsp; └───── MAJOR: Cambios que rompen compatibilidad (1.0.0 → 2.0.0)

```



\### Ejemplos del Proyecto



| Versión | Descripción | Cuándo usar |

|---------|-------------|-------------|

| \*\*v1.0.0\*\* | Primera versión estable | Primera release |

| \*\*v1.0.1\*\* | Corrección de bugs menores | Fix de errores pequeños |

| \*\*v1.1.0\*\* | Agregar multi-usuario | Nueva característica importante |

| \*\*v1.1.1\*\* | Fix en el login | Corrección post-feature |

| \*\*v2.0.0\*\* | Migrar a base de datos SQL | Cambio que rompe compatibilidad |



\### Pre-releases



Para versiones en desarrollo:



```

v1.0.0-alpha.1    # Alfa: En desarrollo activo

v1.0.0-beta.1     # Beta: Feature-complete, probando

v1.0.0-rc.1       # Release Candidate: Casi lista

v1.0.0            # Estable: Lista para producción

```



---



\## 📝 Escribir Notas de Release



\### Estructura Recomendada



```markdown

\## \[Versión] - YYYY-MM-DD



\### 🎉 Destacados

\- Feature más importante

\- Segunda feature destacada



\### ✨ Agregado (Added)

\- Nueva funcionalidad X

\- Nueva funcionalidad Y



\### 🔄 Cambiado (Changed)

\- Mejora en la UI de Z

\- Optimización de rendimiento



\### 🐛 Corregido (Fixed)

\- Bug #123: Error al cargar datos

\- Bug #456: Crash al exportar



\### 🗑️ Eliminado (Removed)

\- Feature deprecada X



\### ⚠️ Deprecado (Deprecated)

\- Feature Y será eliminada en v2.0



\### 🔒 Seguridad (Security)

\- Parche de seguridad para CVE-XXXX

```



\### Ejemplo Real v1.1.0



```markdown

\## \[1.1.0] - 2026-02-15



\### 🎉 Destacados



Esta versión introduce el \*\*sistema multi-usuario\*\* con roles y permisos, permitiendo que múltiples operadores usen el sistema simultáneamente.



\### ✨ Agregado



\- \*\*Sistema de Login:\*\*

&nbsp; - Autenticación con usuario y contraseña

&nbsp; - Roles: Admin, Operador, Visualizador

&nbsp; - Sesiones persistentes

\- \*\*Gestión de Usuarios:\*\*

&nbsp; - Panel de administración de usuarios

&nbsp; - Permisos granulares por rol

&nbsp; - Log de actividad de usuarios

\- \*\*Notificaciones:\*\*

&nbsp; - Alertas en tiempo real para conflictos

&nbsp; - Notificaciones de cambios por otros usuarios

&nbsp; - Sistema de bandeja de entrada



\### 🔄 Cambiado



\- \*\*UI mejorada:\*\*

&nbsp; - Nuevo diseño del dashboard más limpio

&nbsp; - Iconos actualizados (Lucide 0.534)

&nbsp; - Mejor responsive en tablets

\- \*\*Rendimiento:\*\*

&nbsp; - Carga 40% más rápida

&nbsp; - Optimización de queries localStorage

&nbsp; - Lazy loading de componentes pesados



\### 🐛 Corregido



\- #12: Error al importar CSV con acentos

\- #23: Conflicto al zarpar dos buques simultáneos

\- #34: Reporte A3 no mostraba todas las páginas

\- #45: Hora de zarpada se desincronizaba al editar



\### ⚠️ Deprecado



\- La función `calculateOldTimes()` será eliminada en v2.0

\- Usar `calculateTimes()` en su lugar



\### 🔒 Seguridad



\- Sanitización de inputs en formularios

\- Validación de tokens de sesión

\- Protección contra XSS en campos de texto



\### 📊 Métricas



\- \*\*Bugs corregidos:\*\* 15

\- \*\*Nuevas features:\*\* 8

\- \*\*Mejoras de rendimiento:\*\* 3x más rápido en carga inicial

\- \*\*Cobertura de tests:\*\* 85% → 92%



\### 🙏 Contribuidores



Gracias a @usuario1, @usuario2 por sus contribuciones.



\### 📥 Instalación



Igual que v1.0.0. Ver instrucciones arriba.



\### ⬆️ Migración desde v1.0.0



\*\*Automática:\*\* Los datos se migrarán automáticamente al abrir la app.



\*\*Opcional - Backup recomendado:\*\*

1\. Exportar datos desde v1.0.0

2\. Instalar v1.1.0

3\. Importar datos



\### 🔗 Enlaces



\- \[Documentación actualizada](https://github.com/TU-USUARIO/sistema-cruceros/wiki)

\- \[Video tutorial multi-usuario](https://youtu.be/ejemplo)

\- \[Comparación v1.0 vs v1.1](https://github.com/TU-USUARIO/sistema-cruceros/compare/v1.0.0...v1.1.0)

```



---



\## 📎 Adjuntar Archivos



\### Tipos de archivos recomendados



| Archivo | Descripción | Tamaño máx. |

|---------|-------------|-------------|

| \*\*.zip\*\* | Versión portable | 2 GB |

| \*\*.exe\*\* | Instalador Windows | 2 GB |

| \*\*.dmg\*\* | Instalador macOS | 2 GB |

| \*\*.AppImage\*\* | Linux portable | 2 GB |

| \*\*.pdf\*\* | Manual usuario | 100 MB |

| \*\*.sha256\*\* | Checksum | 1 KB |



\### Cómo adjuntar



\#### Método 1: Drag \& Drop (Web)



1\. En la página de crear release

2\. Scroll hasta \*\*"Attach binaries"\*\*

3\. Arrastra los archivos

4\. Espera a que se suban



\#### Método 2: GitHub CLI



```powershell

gh release upload v1.0.0 Sistema-Cruceros-Portable.zip

```



\#### Método 3: Git LFS (archivos grandes > 100MB)



```powershell

\# Instalar Git LFS

git lfs install



\# Trackear archivos grandes

git lfs track "\*.zip"

git add .gitattributes

git commit -m "Track large files with LFS"

git push

```



---



\## 🤖 Automatización con GitHub Actions



\### Crear Release Automático al Push de Tag



Crea el archivo `.github/workflows/release.yml`:



```yaml

name: Create Release



on:

&nbsp; push:

&nbsp;   tags:

&nbsp;     - 'v\*'



jobs:

&nbsp; build:

&nbsp;   runs-on: windows-latest

&nbsp;   

&nbsp;   steps:

&nbsp;     - name: Checkout code

&nbsp;       uses: actions/checkout@v3

&nbsp;     

&nbsp;     - name: Setup Node.js

&nbsp;       uses: actions/setup-node@v3

&nbsp;       with:

&nbsp;         node-version: '18'

&nbsp;     

&nbsp;     - name: Install dependencies

&nbsp;       run: npm ci

&nbsp;     

&nbsp;     - name: Build static version

&nbsp;       run: npm run build:static

&nbsp;     

&nbsp;     - name: Create portable ZIP

&nbsp;       run: |

&nbsp;         powershell -File build-simple-portable.ps1

&nbsp;     

&nbsp;     - name: Create Release

&nbsp;       uses: softprops/action-gh-release@v1

&nbsp;       with:

&nbsp;         files: Sistema-Cruceros-Portable.zip

&nbsp;         body\_path: RELEASE\_NOTES.md

&nbsp;       env:

&nbsp;         GITHUB\_TOKEN: ${{ secrets.GITHUB\_TOKEN }}

```



\### Uso



```powershell

\# Simplemente crea y push un tag

git tag v1.0.0

git push origin v1.0.0



\# GitHub Actions se encargará del resto

```



---



\## 📢 Promoción del Release



\### 1️⃣ Anunciar en Redes Sociales



\#### Twitter/X



```

🚢 ¡Acabo de lanzar Sistema de Cruceros v1.0.0!



Sistema completo para gestión de tráfico marítimo:

✅ 75 buques precargados

✅ Cálculos automáticos

✅ Detección de conflictos

✅ Versión portable Windows



🔗 github.com/TU-USUARIO/sistema-cruceros



\#webdev #typescript #react #opensource

```



\#### LinkedIn



```

Orgulloso de presentar mi último proyecto: Sistema de Gestión de Cruceros v1.0.0



Después de 3 semanas de desarrollo, he completado un sistema integral para control de tráfico de cruceros oceánicos en puertos marítimos.



🎯 Características principales:

• Gestión completa de movimientos

• Base de datos de 75 buques

• Cálculo automático de reservas de canal

• Detección inteligente de conflictos

• Generación de reportes profesionales

• Versión portable sin instalación



🛠️ Stack técnico:

React 19 | TypeScript 5 | Astro 5 | Tailwind CSS 4 | Node.js



📦 100% open source y disponible en GitHub



\#DesarrolloWeb #TypeScript #React #OpenSource #Maritime #PortManagement

```



\### 2️⃣ Publicar en Plataformas



\- \*\*Product Hunt:\*\* Lanzar el proyecto

\- \*\*Hacker News:\*\* Show HN: Sistema de Cruceros

\- \*\*Reddit:\*\* r/webdev, r/typescript, r/reactjs

\- \*\*Dev.to:\*\* Escribir artículo técnico

\- \*\*Hashnode:\*\* Tutorial de implementación



\### 3️⃣ Email a Stakeholders



```

Asunto: 🚢 Sistema de Cruceros v1.0.0 - Disponible ahora



Hola \[Nombre],



Me complace informarte que la primera versión estable del Sistema de Gestión de Cruceros está disponible.



\*\*Descarga:\*\* https://github.com/TU-USUARIO/sistema-cruceros/releases/tag/v1.0.0



\*\*Características principales:\*\*

\- Sistema completo de gestión de movimientos

\- 75 buques precargados

\- Cálculos automáticos de canal

\- Versión portable Windows (sin instalación)



\*\*Documentación:\*\*

\- Manual de Usuario: \[link]

\- Guía de Inicio Rápido: \[link]



Si tienes alguna pregunta o feedback, no dudes en contactarme.



Saludos,

Alfredo

```



---



\## ✅ Checklist Pre-Release



Antes de publicar, verifica:



\### Código

\- \[ ] Todo el código funciona correctamente

\- \[ ] Tests pasan (si los hay)

\- \[ ] No hay TODOs o console.logs olvidados

\- \[ ] Sin credenciales hardcodeadas



\### Documentación

\- \[ ] README.md actualizado

\- \[ ] CHANGELOG.md completo

\- \[ ] Manual de usuario revisado

\- \[ ] Documentación técnica actualizada



\### Versión

\- \[ ] package.json actualizado

\- \[ ] Tag de Git creado

\- \[ ] Commit final hecho



\### Build

\- \[ ] Build estático funciona

\- \[ ] ZIP portable creado y probado

\- \[ ] Tamaño del archivo razonable

\- \[ ] Checksum generado



\### GitHub

\- \[ ] Repositorio público (si aplica)

\- \[ ] Issues cerrados referenciados

\- \[ ] Pull requests mergeados

\- \[ ] Branch main actualizado



---



\## 🎓 Recursos Adicionales



\- \[Semantic Versioning](https://semver.org/)

\- \[Keep a Changelog](https://keepachangelog.com/)

\- \[GitHub Releases Docs](https://docs.github.com/en/repositories/releasing-projects-on-github)

\- \[Conventional Commits](https://www.conventionalcommits.org/)



---



<div align="center">



\*\*¡Tu release está listo para el mundo! 🚀\*\*



\[⬆ Volver arriba](#-guía-completa-crear-y-distribuir-releases-en-github)



</div>



