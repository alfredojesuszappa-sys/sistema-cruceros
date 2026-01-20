# 🚀 GUÍA COMPLETA: Subir Proyecto a GitHub

Esta guía te llevará paso a paso para subir tu Sistema de Cruceros a GitHub.

---

## 📋 REQUISITOS PREVIOS

### 1. Tener una Cuenta de GitHub
Si no tienes una:
1. Ve a [github.com](https://github.com)
2. Clic en "Sign up"
3. Completa el formulario de registro
4. Verifica tu email

### 2. Instalar Git (si no lo tienes)

**Windows:**
1. Descarga desde [git-scm.com](https://git-scm.com/download/win)
2. Ejecuta el instalador
3. Usa las opciones por defecto

**Mac:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git  # Ubuntu/Debian
sudo yum install git      # CentOS/RedHat
```

### 3. Configurar Git (primera vez)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

---

## 🎯 OPCIÓN 1: SUBIR DESDE WEBFLOW (RECOMENDADO)

Si estás trabajando en Webflow, ya tienes todo en la nube. Solo necesitas:

### Paso 1: Descargar el Código
En Webflow Designer:
1. Ve a tu proyecto
2. Menú superior → "Export code"
3. Descarga el archivo ZIP
4. Descomprímelo en una carpeta

### Paso 2: Abrir Terminal/PowerShell
**Windows:**
- Presiona `Win + R`
- Escribe `powershell`
- Enter

**Mac/Linux:**
- Presiona `Cmd + Espacio` (Mac) o `Ctrl + Alt + T` (Linux)
- Escribe "Terminal"
- Enter

### Paso 3: Navegar a la Carpeta
```bash
cd ruta/a/tu/proyecto
# Ejemplo: cd C:\Users\TuNombre\Documents\sistema-cruceros
```

### Paso 4: Inicializar Git
```bash
git init
git add .
git commit -m "🚀 Versión inicial del Sistema de Cruceros"
```

### Paso 5: Crear Repositorio en GitHub

**Opción A: Desde la Web (Más Fácil)**
1. Ve a [github.com](https://github.com)
2. Clic en el botón **"+"** (arriba derecha) → "New repository"
3. Completa:
   - **Repository name:** `sistema-cruceros`
   - **Description:** "Sistema de gestión de cruceros - Canal Punta Indio"
   - **Visibility:** 
     - ✅ **Private** (recomendado para proyectos comerciales)
     - ⚠️ Public (si quieres compartir con el mundo)
   - **NO marques** "Initialize with README" (ya lo tienes)
4. Clic en **"Create repository"**

**Opción B: Desde GitHub CLI**
```bash
# Instalar GitHub CLI primero
# Windows: winget install GitHub.cli
# Mac: brew install gh

gh auth login
gh repo create sistema-cruceros --private --source=. --remote=origin
```

### Paso 6: Conectar y Subir
GitHub te mostrará comandos similares a estos:

```bash
git remote add origin https://github.com/TU_USUARIO/sistema-cruceros.git
git branch -M main
git push -u origin main
```

**¡IMPORTANTE!** Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

### Paso 7: Verificar
Ve a `https://github.com/TU_USUARIO/sistema-cruceros`

Deberías ver todos tus archivos! ✅

---

## 🖥️ OPCIÓN 2: DESDE TU COMPUTADORA LOCAL

Si ya tienes el proyecto en tu computadora:

### Paso 1: Abrir Terminal en la Carpeta del Proyecto

**Windows (PowerShell):**
1. Abre el Explorador de Archivos
2. Navega a tu carpeta del proyecto
3. En la barra de direcciones, escribe `powershell` y presiona Enter

**Mac/Linux:**
1. Abre Terminal
2. Escribe `cd` seguido de la ruta:
   ```bash
   cd ~/Documents/sistema-cruceros
   ```

### Paso 2: Verificar que Estás en la Carpeta Correcta
```bash
ls
# Deberías ver archivos como: package.json, src/, astro.config.mjs, etc.
```

### Paso 3: Inicializar Git
```bash
# Inicializar repositorio
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "🚀 Versión inicial del Sistema de Cruceros v5.3"
```

### Paso 4: Crear Repositorio en GitHub
1. Ve a [github.com/new](https://github.com/new)
2. Rellena:
   ```
   Repository name: sistema-cruceros
   Description: Sistema de gestión de cruceros - Canal Punta Indio
   Visibility: Private (recomendado)
   ```
3. **NO marques** "Add a README file"
4. Clic en "Create repository"

### Paso 5: Conectar Local con GitHub
Copia los comandos que GitHub te muestra, o usa estos (reemplazando TU_USUARIO):

```bash
git remote add origin https://github.com/TU_USUARIO/sistema-cruceros.git
git branch -M main
git push -u origin main
```

### Paso 6: Autenticación
GitHub te pedirá autenticación:

**Opción A: Personal Access Token (Recomendado)**
1. Ve a GitHub.com → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. "Generate new token" → "Generate new token (classic)"
4. Nombre: "Sistema Cruceros"
5. Selecciona permisos: `repo` (todos los sub-items)
6. "Generate token"
7. **COPIA EL TOKEN** (solo se muestra una vez)
8. Úsalo como contraseña cuando Git te lo pida

**Opción B: GitHub CLI**
```bash
# Instalar GitHub CLI
# Windows: winget install GitHub.cli
# Mac: brew install gh

# Autenticarse
gh auth login

# Subir
git push -u origin main
```

---

## 🔄 COMANDOS BÁSICOS PARA ACTUALIZAR

### Después del Primer Push

Cada vez que hagas cambios:

```bash
# 1. Ver qué archivos cambiaron
git status

# 2. Agregar cambios
git add .

# 3. Hacer commit con mensaje descriptivo
git commit -m "✨ Descripción de los cambios"

# 4. Subir a GitHub
git push
```

### Ejemplos de Mensajes de Commit
```bash
git commit -m "✨ Agregar nueva funcionalidad de alertas"
git commit -m "🐛 Corregir cálculo de ETA de amarre"
git commit -m "📝 Actualizar documentación"
git commit -m "🎨 Mejorar diseño del dashboard"
git commit -m "⚡ Optimizar rendimiento de tablas"
```

---

## 🎯 SOLUCIÓN DE PROBLEMAS COMUNES

### ❌ Error: "Git no se reconoce como comando"

**Solución:**
```bash
# Instalar Git primero
# Windows: https://git-scm.com/download/win
# Luego cerrar y reabrir PowerShell/Terminal
```

### ❌ Error: "Permission denied (publickey)"

**Solución:** Usar HTTPS en lugar de SSH:
```bash
git remote set-url origin https://github.com/TU_USUARIO/sistema-cruceros.git
git push
```

### ❌ Error: "Repository not found"

**Solución:** Verificar que el repositorio existe:
1. Ve a `https://github.com/TU_USUARIO/sistema-cruceros`
2. Si no existe, créalo primero en GitHub
3. Verifica que el nombre sea exacto (case-sensitive)

### ❌ Error: "Authentication failed"

**Solución:** Usar Personal Access Token:
1. Ve a GitHub → Settings → Developer settings → Personal access tokens
2. Genera un nuevo token
3. Copia el token
4. Úsalo como contraseña cuando Git te lo pida

### ❌ Archivos muy grandes

**Solución:** Verificar .gitignore:
```bash
# Ver qué archivos se van a subir
git status

# Si ves node_modules/ o dist/, no deberían estar
# Verificar que .gitignore esté correctamente configurado
cat .gitignore
```

---

## 📂 ESTRUCTURA DE ARCHIVOS EN GITHUB

Después de subir, tu repositorio se verá así:

```
sistema-cruceros/
├── 📄 README.md                    ← Descripción del proyecto
├── 📄 .gitignore                   ← Archivos a ignorar
├── 📄 package.json                 ← Dependencias
├── 📄 astro.config.mjs             ← Config de Astro
├── 📁 src/                         ← Código fuente
│   ├── components/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── 📁 public/                      ← Archivos estáticos
│   ├── MANUAL_USUARIO.md
│   └── DOCUMENTACION_TECNICA_INGENIERIA.md
└── 📁 generated/                   ← Assets generados
```

---

## 🔐 SEGURIDAD Y BUENAS PRÁCTICAS

### ⚠️ NO Subir Archivos Sensibles

Verifica que `.gitignore` incluye:
```
.env
.env.local
.env.production
*.log
node_modules/
dist/
```

### 🔍 Verificar Antes de Subir
```bash
# Ver qué se va a subir
git status

# Ver el contenido del próximo commit
git diff --cached
```

### 🔄 Hacer Commits Frecuentes
```bash
# Cada vez que completes una funcionalidad
git add .
git commit -m "✨ Descripción clara del cambio"
git push
```

---

## 🎓 COMANDOS GIT ESENCIALES

### Ver Estado
```bash
git status                  # Ver archivos modificados
git log                     # Ver historial de commits
git log --oneline           # Historial compacto
```

### Deshacer Cambios
```bash
git checkout -- archivo.ts  # Descartar cambios de un archivo
git reset HEAD~1            # Deshacer último commit (mantener cambios)
git reset --hard HEAD~1     # Deshacer último commit (eliminar cambios)
```

### Ramas
```bash
git branch                  # Ver ramas
git branch nueva-feature    # Crear rama
git checkout nueva-feature  # Cambiar a rama
git merge nueva-feature     # Fusionar rama
```

### Actualizar desde GitHub
```bash
git pull                    # Descargar cambios
```

---

## 📱 APLICACIONES DE ESCRITORIO (Alternativa)

Si prefieres no usar la terminal:

### GitHub Desktop (Más Fácil)
1. Descarga [GitHub Desktop](https://desktop.github.com)
2. Instala y abre
3. File → Add Local Repository
4. Selecciona tu carpeta del proyecto
5. Clic en "Publish repository"
6. Marca "Private" si quieres
7. Clic en "Publish"

### VS Code (Si usas este editor)
1. Abre tu proyecto en VS Code
2. Panel izquierdo → Icono de "Source Control" (Ctrl+Shift+G)
3. Clic en "Initialize Repository"
4. Escribe mensaje de commit
5. Clic en "✓" (commit)
6. Clic en "..." → "Push to..." → "GitHub"

---

## ✅ CHECKLIST FINAL

Antes de considerar terminado:

- [ ] Repositorio creado en GitHub
- [ ] Código subido completamente
- [ ] README.md visible en GitHub
- [ ] .gitignore configurado correctamente
- [ ] No hay archivos sensibles (.env, logs)
- [ ] Documentación incluida (manuales)
- [ ] El proyecto build sin errores (`npm run build`)

---

## 🎯 PRÓXIMOS PASOS

Después de subir a GitHub:

1. **Agregar Colaboradores** (si trabajan en equipo)
   - Settings → Collaborators → Add people

2. **Configurar GitHub Pages** (si quieres demo pública)
   - Settings → Pages → Source: main branch

3. **Crear Releases** (versiones)
   - Releases → Create a new release
   - Tag: v5.3
   - Descripción de cambios

4. **Automatizar Deploy** (CI/CD)
   - GitHub Actions para deploy automático a Cloudflare

---

## 📞 AYUDA ADICIONAL

### Recursos Oficiales
- [GitHub Docs](https://docs.github.com)
- [Git Book](https://git-scm.com/book/es)
- [GitHub Learning Lab](https://lab.github.com)

### Videos Tutoriales
- [Git y GitHub para Principiantes](https://www.youtube.com/results?search_query=git+github+tutorial+español)

### Cheat Sheets
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

## 🎉 ¡FELICITACIONES!

Si llegaste hasta aquí y seguiste todos los pasos, tu proyecto debería estar en GitHub! 🚀

**URL de tu repositorio:**
```
https://github.com/TU_USUARIO/sistema-cruceros
```

---

**Fecha:** Enero 2026  
**Versión del Sistema:** 5.3  
**Guía creada por:** Sistema de Cruceros Team
