# 📥 CÓMO DESCARGAR TU PROYECTO DE WEBFLOW A TU PC

## 🎯 Objetivo
Bajar tu proyecto del Webflow Cloud a tu disco local para subirlo a GitHub.

---

## ⚠️ IMPORTANTE
Tu proyecto actual está en **Webflow Cloud** (en línea), NO en tu PC.

Por eso los comandos git no funcionan en `C:\users\ajzappa\documents`.

---

## 📋 PASOS PARA DESCARGAR

### OPCIÓN A: Desde Webflow Workbench

1. **Abre tu proyecto en Webflow**
   - Ve a: https://webflow.com/dashboard
   - Abre tu proyecto "Sistema de Cruceros"

2. **Busca la opción de exportar** (si existe)
   - En algunos planes de Webflow puedes exportar el código
   - Busca: Settings → Export Code

3. **Si NO tienes opción de exportar:**
   - Webflow Apps solo te da acceso en la nube
   - Necesitas usar GitHub Desktop (OPCIÓN 1 arriba)

---

### OPCIÓN B: Crear localmente y copiar manualmente

Si puedes ver tu código en Webflow:

1. **Crea la carpeta local:**
   ```powershell
   cd C:\users\ajzappa\Documents
   mkdir sistema-cruceros
   cd sistema-cruceros
   ```

2. **Inicializa Git:**
   ```powershell
   git init
   ```

3. **Copia los archivos uno por uno** (tedioso pero funciona):
   - Desde Webflow, copia el contenido de cada archivo
   - Crea los archivos localmente con Notepad++ o VS Code
   - Estructura:
     ```
     sistema-cruceros/
     ├── src/
     │   ├── components/
     │   ├── pages/
     │   └── ...
     ├── package.json
     ├── README.md
     └── ...
     ```

4. **Después haz commit y push:**
   ```powershell
   git add .
   git commit -m "Backup inicial"
   git remote add origin https://github.com/alfredojesuzzappa-sys/sistema-cruceros.git
   git push -u origin main
   ```

---

## ✅ RECOMENDACIÓN FINAL

**USA GITHUB DESKTOP** (es mucho más fácil en Windows):

1. Instala GitHub Desktop
2. Crea repo vacío localmente
3. Copia tus archivos manualmente a esa carpeta
4. GitHub Desktop hace el resto automáticamente

---

## ❓ ¿Necesitas los archivos del proyecto?

Si no puedes exportar desde Webflow, puedo:
- Crear un ZIP con todo el código
- Enviarte los archivos principales
- Guiarte archivo por archivo

**¿Qué prefieres?** 🤔
