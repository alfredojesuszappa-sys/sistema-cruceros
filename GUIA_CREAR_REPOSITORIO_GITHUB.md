\# 🐙 Guía Paso a Paso: Crear Repositorio en GitHub



\## 📋 Tabla de Contenidos



1\. \[Crear Cuenta en GitHub](#1️⃣-crear-cuenta-en-github)

2\. \[Crear Nuevo Repositorio](#2️⃣-crear-nuevo-repositorio)

3\. \[Configurar Git en Windows](#3️⃣-configurar-git-en-windows)

4\. \[Conectar Proyecto Local con GitHub](#4️⃣-conectar-proyecto-local-con-github)

5\. \[Subir Código a GitHub](#5️⃣-subir-código-a-github)

6\. \[Crear Release con ZIP Portable](#6️⃣-crear-release-con-zip-portable)

7\. \[Troubleshooting](#7️⃣-troubleshooting)



---



\## 1️⃣ Crear Cuenta en GitHub



\### Si ya tienes cuenta, salta al paso 2 ✅



1\. \*\*Ve a:\*\* https://github.com

2\. \*\*Click en\*\* "Sign up" (Registrarse)

3\. \*\*Completa:\*\*

&nbsp;  - Email

&nbsp;  - Contraseña

&nbsp;  - Username (tu nombre de usuario único)

4\. \*\*Verifica tu email\*\*

5\. \*\*Elige plan gratuito\*\* (Free)



---



\## 2️⃣ Crear Nuevo Repositorio



\### Opción A: Desde la Web



1\. \*\*Inicia sesión\*\* en GitHub

2\. \*\*Click en el botón "+"\*\* (arriba derecha)

3\. \*\*Selecciona\*\* "New repository"



&nbsp;  !\[Crear Repositorio](https://docs.github.com/assets/cb-29762/mw-1440/images/help/repository/repo-create-global-nav-update.webp)



4\. \*\*Completa el formulario:\*\*



&nbsp;  ```

&nbsp;  Repository name: sistema-cruceros

&nbsp;  Description: Sistema de Gestión de Cruceros Oceánicos - Control de tráfico marítimo

&nbsp;  

&nbsp;  ☑️ Public (recomendado para portfolios)

&nbsp;  ☐ Private (si quieres que sea privado)

&nbsp;  

&nbsp;  ☐ Add a README file (NO marcar, ya tienes uno)

&nbsp;  ☐ Add .gitignore (NO marcar, ya tienes uno)

&nbsp;  ☐ Choose a license (puedes agregarlo después)

&nbsp;  ```



5\. \*\*Click en\*\* "Create repository"



6\. \*\*¡IMPORTANTE!\*\* Copia la URL que aparece:

&nbsp;  ```

&nbsp;  https://github.com/TU-USUARIO/sistema-cruceros.git

&nbsp;  ```



---



\## 3️⃣ Configurar Git en Windows



\### Verificar si Git está instalado



```powershell

git --version

```



\*\*Si muestra la versión (ej: `git version 2.43.0`)\*\* ✅ Salta al paso 3.2



\*\*Si dice "no se reconoce"\*\* ⬇️ Instalar Git:



\### 3.1 Instalar Git



1\. \*\*Descarga:\*\* https://git-scm.com/download/win

2\. \*\*Ejecuta el instalador\*\*

3\. \*\*Acepta todas las opciones por defecto\*\*

4\. \*\*Reinicia PowerShell\*\*

5\. \*\*Verifica:\*\*

&nbsp;  ```powershell

&nbsp;  git --version

&nbsp;  ```



\### 3.2 Configurar Git (primera vez)



```powershell

\# Configurar tu nombre

git config --global user.name "Tu Nombre"



\# Configurar tu email (el mismo de GitHub)

git config --global user.email "tu-email@ejemplo.com"



\# Verificar configuración

git config --list

```



---



\## 4️⃣ Conectar Proyecto Local con GitHub



\### Paso 1: Abrir PowerShell en la carpeta del proyecto



```powershell

cd C:\\Users\\ajzappa\\Documents\\sistema-cruceros

```



\### Paso 2: Verificar que Git está inicializado



```powershell

git status

```



\*\*Si dice "not a git repository"\*\*, inicializa Git:



```powershell

git init

```



\### Paso 3: Conectar con GitHub



```powershell

\# Reemplaza TU-USUARIO con tu usuario de GitHub

git remote add origin https://github.com/TU-USUARIO/sistema-cruceros.git



\# Verificar

git remote -v

```



\*\*Deberías ver:\*\*

```

origin  https://github.com/TU-USUARIO/sistema-cruceros.git (fetch)

origin  https://github.com/TU-USUARIO/sistema-cruceros.git (push)

```



---



\## 5️⃣ Subir Código a GitHub



\### Paso 1: Preparar archivos



```powershell

\# Ver qué archivos hay

git status



\# Agregar TODOS los archivos

git add .



\# Verificar

git status

```



\### Paso 2: Crear commit



```powershell

git commit -m "🚀 Initial commit - Sistema de Cruceros v1.0



\- Sistema completo de gestión de cruceros

\- Base de datos de 75 buques

\- Cálculos automáticos de canal CPI/ACC

\- Detección de conflictos

\- Reporte A3

\- Versión portable incluida"

```



\### Paso 3: Cambiar rama a main



```powershell

\# Verificar rama actual

git branch



\# Si dice "master", cambiar a "main"

git branch -M main

```



\### Paso 4: Subir a GitHub (Push)



```powershell

git push -u origin main

```



\*\*⚠️ Autenticación:\*\*



GitHub pedirá autenticación. Tienes 2 opciones:



\#### Opción A: Token de Acceso Personal (Recomendado)



1\. Ve a: https://github.com/settings/tokens

2\. Click "Generate new token" → "Generate new token (classic)"

3\. \*\*Nombre:\*\* `sistema-cruceros-token`

4\. \*\*Expiración:\*\* 90 días (o sin expiración)

5\. \*\*Permisos:\*\* Marca `repo` (todos)

6\. Click "Generate token"

7\. \*\*¡COPIA EL TOKEN!\*\* (no lo volverás a ver)

8\. Usa el token como \*\*contraseña\*\* cuando Git lo pida



\#### Opción B: GitHub CLI



```powershell

\# Instalar GitHub CLI

winget install GitHub.cli



\# Autenticar

gh auth login



\# Seguir las instrucciones en pantalla

```



\### Paso 5: Verificar en GitHub



1\. Ve a: `https://github.com/TU-USUARIO/sistema-cruceros`

2\. \*\*¡Deberías ver todos tus archivos!\*\* 🎉



---



\## 6️⃣ Crear Release con ZIP Portable



\### ¿Qué es un Release?



Un \*\*Release\*\* en GitHub es una versión oficial de tu proyecto que incluye:

\- Código fuente empaquetado

\- Archivos binarios (como tu ZIP portable)

\- Notas de la versión (changelog)



\### Paso a Paso:



\#### 1. Ve a tu repositorio en GitHub



```

https://github.com/TU-USUARIO/sistema-cruceros

```



\#### 2. Click en "Releases" (lado derecho)



!\[Releases](https://docs.github.com/assets/cb-47682/mw-1440/images/help/releases/releases-overview.webp)



\#### 3. Click en "Create a new release"



\#### 4. Completa el formulario:



\*\*🏷️ Tag version:\*\*

```

v1.0.0

```



\*\*📝 Release title:\*\*

```

🚢 Sistema de Cruceros v1.0.0 - Primera Versión Estable

```



\*\*📄 Descripción:\*\*

```markdown

\## 🎉 Primera Versión Oficial



Sistema completo de gestión de cruceros oceánicos para puertos marítimos.



\### ✨ Características Principales



\- ✅ Gestión completa de movimientos de cruceros

\- ✅ Base de datos de 75 buques precargados

\- ✅ Cálculo automático de reservas de canal (CPI/ACC)

\- ✅ Detección inteligente de conflictos en KM 118.5

\- ✅ Generación de reportes A3 para impresión

\- ✅ Importación/Exportación de datos Excel/CSV

\- ✅ \*\*Versión portable para Windows\*\* (incluida)



\### 📥 Descargas



\#### 💻 Versión Portable (Windows)

\*\*Recomendado para usuarios finales\*\*



\- 📦 \*\*Sistema-Cruceros-Portable.zip\*\* (ver archivos adjuntos abajo)

\- No requiere instalación

\- Funciona 100% offline

\- Incluye servidor Node.js embebido



\*\*Requisitos:\*\*

\- Windows 7/8/10/11

\- Node.js 18+ (\[Descargar](https://nodejs.org))



\*\*Instrucciones:\*\*

1\. Descarga el archivo ZIP

2\. Extrae en cualquier carpeta

3\. Doble clic en `INICIAR.bat`

4\. ¡Listo!



\#### 👨‍💻 Código Fuente

Para desarrolladores que quieran modificar o compilar el proyecto.



\### 📚 Documentación



\- \[Manual de Usuario](MANUAL\_USUARIO.md)

\- \[Documentación Técnica](DOCUMENTACION\_TECNICA\_INGENIERIA.md)

\- \[Guía de Inicio Rápido](INICIO\_RAPIDO.md)



\### 🐛 Reportar Problemas



Si encuentras algún bug o tienes sugerencias, por favor \[crea un issue](https://github.com/TU-USUARIO/sistema-cruceros/issues).



---



\*\*Desarrollado por:\*\* Alfredo Jesus Zappa  

\*\*Fecha:\*\* 20 de Enero, 2026  

\*\*Licencia:\*\* MIT

```



\#### 5. Adjuntar el archivo ZIP



En la sección \*\*"Attach binaries"\*\*:



1\. Click en "Attach binaries by dropping them here or selecting them"

2\. Busca y selecciona: `Sistema-Cruceros-Portable.zip`

3\. Espera a que se suba (verás una barra de progreso)



\#### 6. Marcar como "Latest release"



☑️ \*\*Set as the latest release\*\*



\#### 7. Publicar



Click en \*\*"Publish release"\*\* 🚀



---



\## 7️⃣ Troubleshooting



\### ❌ Error: "Permission denied (publickey)"



\*\*Solución:\*\* Usar token de acceso personal en lugar de contraseña



\### ❌ Error: "fatal: not a git repository"



\*\*Solución:\*\*

```powershell

cd C:\\Users\\ajzappa\\Documents\\sistema-cruceros

git init

```



\### ❌ Error: "src refspec main does not match any"



\*\*Solución:\*\*

```powershell

\# Crear commit primero

git add .

git commit -m "Initial commit"

git push -u origin main

```



\### ❌ Error: "Updates were rejected"



\*\*Solución:\*\*

```powershell

\# Forzar push (solo si es tu primer push)

git push -u origin main --force

```



\### ❌ El ZIP no se sube al Release



\*\*Posibles causas:\*\*

\- Archivo muy grande (GitHub acepta hasta 2 GB)

\- Conexión interrumpida

\- Formato no soportado



\*\*Solución:\*\*

\- Verificar tamaño del archivo

\- Intentar subirlo nuevamente

\- Usar GitHub CLI:

&nbsp; ```powershell

&nbsp; gh release create v1.0.0 Sistema-Cruceros-Portable.zip

&nbsp; ```



---



\## 📋 Checklist Final



Antes de publicar tu repositorio, verifica:



\- \[ ] ✅ README.md completo y actualizado

\- \[ ] ✅ .gitignore configurado (excluye node\_modules, dist, etc.)

\- \[ ] ✅ MANUAL\_USUARIO.md incluido

\- \[ ] ✅ DOCUMENTACION\_TECNICA\_INGENIERIA.md incluido

\- \[ ] ✅ package.json con información correcta

\- \[ ] ✅ Código funcional (probado localmente)

\- \[ ] ✅ Sin credenciales o datos sensibles

\- \[ ] ✅ Licencia agregada (opcional pero recomendado)

\- \[ ] ✅ ZIP portable creado y probado

\- \[ ] ✅ Release publicado con el ZIP adjunto



---



\## 🎓 Comandos Útiles de Git



\### Ver historial de commits

```powershell

git log --oneline

```



\### Ver cambios no guardados

```powershell

git diff

```



\### Deshacer último commit (mantiene cambios)

```powershell

git reset --soft HEAD~1

```



\### Ver archivos ignorados

```powershell

git status --ignored

```



\### Actualizar desde GitHub

```powershell

git pull origin main

```



\### Ver ramas

```powershell

git branch -a

```



---



\## 🌟 Siguiente Nivel



Una vez que tu repositorio esté público:



\### 1. Agregar Badges al README



```markdown

\[!\[GitHub release](https://img.shields.io/github/v/release/TU-USUARIO/sistema-cruceros)](https://github.com/TU-USUARIO/sistema-cruceros/releases)

\[!\[GitHub stars](https://img.shields.io/github/stars/TU-USUARIO/sistema-cruceros)](https://github.com/TU-USUARIO/sistema-cruceros/stargazers)

\[!\[GitHub forks](https://img.shields.io/github/forks/TU-USUARIO/sistema-cruceros)](https://github.com/TU-USUARIO/sistema-cruceros/network)

```



\### 2. Agregar a tu Portfolio



\- LinkedIn: Agrega el proyecto a tu sección de proyectos

\- Portafolio personal: Enlaza al repositorio

\- Resume: Incluye el link de GitHub



\### 3. Compartir



\- Twitter/X con hashtags: #WebDev #OpenSource #React #TypeScript

\- LinkedIn post mostrando el proyecto

\- Dev.to escribiendo un artículo técnico

\- Reddit en r/webdev o r/typescript



\### 4. Mantener Actualizado



```powershell

\# Cada vez que hagas cambios

git add .

git commit -m "Descripción del cambio"

git push origin main



\# Crear nuevos releases cuando agregues features importantes

```



---



\## 🎯 Resumen de URLs



Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub:



\- \*\*Repositorio:\*\* https://github.com/TU-USUARIO/sistema-cruceros

\- \*\*Releases:\*\* https://github.com/TU-USUARIO/sistema-cruceros/releases

\- \*\*Issues:\*\* https://github.com/TU-USUARIO/sistema-cruceros/issues

\- \*\*Wiki:\*\* https://github.com/TU-USUARIO/sistema-cruceros/wiki



---



\## ✅ ¡Listo!



Ahora tienes tu proyecto:



\- ✅ \*\*Publicado en GitHub\*\*

\- ✅ \*\*Con Release oficial\*\*

\- ✅ \*\*ZIP portable descargable\*\*

\- ✅ \*\*Documentación completa\*\*

\- ✅ \*\*Listo para compartir\*\*



\*\*¡Felicitaciones! 🎉\*\*



---



<div align="center">



\*\*¿Necesitas ayuda?\*\*



\[📧 Contacto](mailto:tu-email@ejemplo.com) • \[💬 Discusiones](https://github.com/TU-USUARIO/sistema-cruceros/discussions)



</div>



