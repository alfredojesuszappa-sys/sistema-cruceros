# 📤 Cómo Subir el Sistema de Cruceros a un Repositorio Git

## Prerequisitos
- Tener Git instalado en tu computadora
- Tener una cuenta en GitHub, GitLab o Bitbucket

---

## Paso 1: Inicializar Git (si no está inicializado)

```bash
git init
```

## Paso 2: Configurar Git (primera vez)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

## Paso 3: Verificar archivos a subir

```bash
# Ver qué archivos se subirán
git status
```

## Paso 4: Agregar archivos al staging

```bash
# Agregar todos los archivos
git add .

# O agregar archivos específicos
git add src/
git add package.json
git add README.md
```

## Paso 5: Crear el primer commit

```bash
git commit -m "Initial commit: Sistema de Gestión de Cruceros v1.0"
```

---

## Paso 6: Crear repositorio remoto

### Opción A: GitHub
1. Ve a https://github.com/new
2. Crea un nuevo repositorio
3. **NO inicialices con README, .gitignore o licencia** (ya los tienes localmente)
4. Copia la URL del repositorio

### Opción B: GitLab
1. Ve a https://gitlab.com/projects/new
2. Crea un nuevo proyecto
3. Copia la URL del repositorio

### Opción C: Bitbucket
1. Ve a https://bitbucket.org/repo/create
2. Crea un nuevo repositorio
3. Copia la URL del repositorio

---

## Paso 7: Conectar repositorio local con remoto

```bash
# Reemplaza la URL con la de tu repositorio
git remote add origin https://github.com/TU_USUARIO/sistema-cruceros.git

# Verificar que se agregó correctamente
git remote -v
```

## Paso 8: Subir los cambios

```bash
# Renombrar rama a 'main' (si es necesario)
git branch -M main

# Subir por primera vez
git push -u origin main
```

---

## 🎯 Comandos posteriores (para futuros cambios)

```bash
# 1. Ver estado de los archivos
git status

# 2. Agregar cambios
git add .

# 3. Crear commit con descripción
git commit -m "Descripción de los cambios realizados"

# 4. Subir cambios
git push
```

---

## 📋 Comandos útiles adicionales

```bash
# Ver historial de commits
git log --oneline

# Ver ramas
git branch

# Crear nueva rama
git checkout -b nombre-nueva-rama

# Cambiar de rama
git checkout nombre-rama

# Descargar cambios del repositorio remoto
git pull

# Ver diferencias
git diff
```

---

## ⚠️ Archivos que NO deberías subir

El archivo `.gitignore` ya está configurado para ignorar:

- `node_modules/` - Dependencias (se instalan con `npm install`)
- `.env` - Variables de entorno sensibles
- `dist/` - Archivos compilados
- `.wrangler/` - Caché de Cloudflare

**IMPORTANTE**: Si tienes información sensible en `.env`, asegúrate de que esté en `.gitignore`

---

## 🔒 Configurar variables de entorno en el repositorio

Si usas servicios como GitHub Actions o Vercel:

1. No subas el archivo `.env`
2. Configura las variables en la configuración del servicio:
   - GitHub: Settings → Secrets and variables → Actions
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site settings → Environment variables

---

## 📱 Ejemplo completo desde cero

```bash
# 1. Inicializar
git init

# 2. Agregar archivos
git add .

# 3. Primer commit
git commit -m "Initial commit: Sistema de Gestión de Cruceros"

# 4. Conectar con GitHub (crea el repo primero en github.com)
git remote add origin https://github.com/tu-usuario/sistema-cruceros.git

# 5. Subir
git branch -M main
git push -u origin main
```

---

## ✅ Verificación final

Después de subir, verifica en tu repositorio remoto que:

- ✅ Todos los archivos estén presentes
- ✅ El archivo `.env` NO esté visible
- ✅ La carpeta `node_modules/` NO esté visible
- ✅ El README.md se vea correctamente

---

## 🆘 Problemas comunes

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin TU_URL_AQUI
```

### Error: "failed to push some refs"
```bash
# Si el repositorio remoto tiene archivos que no tienes localmente
git pull origin main --allow-unrelated-histories
git push origin main
```

### Olvidé agregar un archivo al .gitignore
```bash
# Remover del seguimiento (pero mantener el archivo local)
git rm --cached nombre-archivo
git commit -m "Remove sensitive file from tracking"
git push
```

---

## 📚 Recursos adicionales

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [GitLab Documentation](https://docs.gitlab.com/)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)

---

## 🎓 Flujo de trabajo recomendado

```
1. Hacer cambios en el código
2. Probar localmente (npm run dev)
3. git add .
4. git commit -m "Descripción clara del cambio"
5. git push
6. Verificar en el repositorio remoto
```

---

**¡Listo!** Tu sistema de gestión de cruceros estará respaldado y versionado en la nube 🚀
