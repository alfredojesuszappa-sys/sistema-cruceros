# ═══════════════════════════════════════════════════════
# 🚢 SISTEMA DE GESTIÓN DE CRUCEROS
# Construcción de versión portable SIMPLE (sin Electron)
# ═══════════════════════════════════════════════════════

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   🚢 SISTEMA DE GESTIÓN DE CRUCEROS" -ForegroundColor White
Write-Host "   Versión Portable Simple (sin Electron)" -ForegroundColor Gray
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "🔍 Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Node.js no encontrado" -ForegroundColor Red
    Write-Host "   Descarga Node.js desde: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}
Write-Host "   ✅ Node.js $nodeVersion instalado" -ForegroundColor Green
Write-Host ""

# Paso 1: Construir aplicación
Write-Host "🏗️  PASO 1: Construyendo aplicación..." -ForegroundColor Yellow
Write-Host "   (Esto puede tomar 2-4 minutos)" -ForegroundColor Gray
Write-Host ""

# Usar astro build directamente (sin npm run)
npx astro build --output=static

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Error al construir la aplicación" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "   ✅ Aplicación construida" -ForegroundColor Green
Write-Host ""

# Paso 2: Crear estructura portable
Write-Host "📦 PASO 2: Creando paquete portable..." -ForegroundColor Yellow
Write-Host ""

$portableDir = "Sistema-Cruceros-Portable"
$distDir = "dist"

# Crear directorio portable
if (Test-Path $portableDir) {
    Remove-Item -Path $portableDir -Recurse -Force
}
New-Item -ItemType Directory -Path $portableDir | Out-Null

# Copiar archivos construidos
Write-Host "   📂 Copiando archivos..." -ForegroundColor Gray
Copy-Item -Path "$distDir\*" -Destination $portableDir -Recurse

# Copiar documentación
if (Test-Path "MANUAL_USUARIO.md") {
    Copy-Item -Path "MANUAL_USUARIO.md" -Destination "$portableDir\MANUAL_USUARIO.md"
}
if (Test-Path "DOCUMENTACION_TECNICA_INGENIERIA.md") {
    Copy-Item -Path "DOCUMENTACION_TECNICA_INGENIERIA.md" -Destination "$portableDir\DOCUMENTACION_TECNICA.md"
}

# Crear archivo de inicio simple con servidor HTTP
$startScriptContent = @'
@echo off
title Sistema de Gestion de Cruceros
echo.
echo ═══════════════════════════════════════════════════════
echo    🚢 SISTEMA DE GESTION DE CRUCEROS
echo    Version Portable
echo ═══════════════════════════════════════════════════════
echo.
echo ✅ Iniciando servidor local...
echo.
echo 📍 La aplicacion se abrira automaticamente en tu navegador
echo 🌐 URL: http://localhost:8080
echo.
echo ⚠️  NO CIERRES ESTA VENTANA mientras uses el sistema
echo    Para detener el servidor: presiona Ctrl+C
echo.
echo ═══════════════════════════════════════════════════════
echo.

REM Abrir navegador después de 2 segundos
start "" /min cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:8080"

REM Iniciar servidor HTTP simple con Python o Node
where python >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Usando Python para el servidor...
    python -m http.server 8080
) else (
    where node >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] Usando Node.js para el servidor...
        npx serve -s . -l 8080
    ) else (
        echo [ERROR] No se encontro Python ni Node.js
        echo Por favor instala Node.js desde https://nodejs.org/
        pause
        exit
    )
)
'@

Set-Content -Path "$portableDir\INICIAR.bat" -Value $startScriptContent -Encoding ASCII

# Crear archivo README
$readmeContent = @'
# 🚢 SISTEMA DE GESTIÓN DE CRUCEROS - Versión Portable

## 📋 INSTRUCCIONES DE USO

### ✅ Requisitos previos:
- Windows 7 o superior
- Node.js instalado (si no lo tienes, descárgalo de https://nodejs.org/)
- O Python 3.x (alternativa)

### 🚀 CÓMO INICIAR EL SISTEMA:

1. Haz doble clic en el archivo: **INICIAR.bat**
2. Se abrirá una ventana negra (consola) - NO LA CIERRES
3. Tu navegador se abrirá automáticamente con el sistema
4. Si no se abre automáticamente, ve a: http://localhost:8080

### 🛑 CÓMO CERRAR EL SISTEMA:

- Simplemente cierra la ventana negra (consola)
- O presiona Ctrl+C en la consola

### 📂 CÓMO COPIAR A OTRA COMPUTADORA:

1. Copia toda la carpeta "Sistema-Cruceros-Portable" a un pendrive
2. Pega la carpeta en la otra computadora
3. Ejecuta INICIAR.bat

### ⚠️ IMPORTANTE:

- NO necesitas internet para usar el sistema (funciona offline)
- Todos tus datos se guardan en el navegador (localStorage)
- Si cambias de computadora, exporta tus datos antes

### 📖 DOCUMENTACIÓN:

- **MANUAL_USUARIO.md** - Guía completa de uso del sistema
- **DOCUMENTACION_TECNICA.md** - Información técnica para desarrolladores

### 🆘 SOLUCIÓN DE PROBLEMAS:

**Error: "No se encontró Python ni Node.js"**
- Instala Node.js desde https://nodejs.org/
- Reinicia la computadora
- Intenta de nuevo

**El navegador no se abre automáticamente:**
- Abre manualmente: http://localhost:8080
- Verifica que el puerto 8080 no esté en uso

**Pantalla en blanco:**
- Presiona F5 para recargar
- Borra caché del navegador (Ctrl+Shift+Delete)

### 📞 SOPORTE:

Desarrollado por: Alfredo Jesus Zappa
Sistema de Gestión de Cruceros v1.0

---

¡Disfruta del sistema! 🚢⚓
'@

Set-Content -Path "$portableDir\LEEME.txt" -Value $readmeContent -Encoding UTF8

Write-Host "   ✅ Estructura portable creada" -ForegroundColor Green
Write-Host ""

# Paso 3: Crear ZIP
Write-Host "🗜️  PASO 3: Comprimiendo archivos..." -ForegroundColor Yellow
Write-Host ""

$zipFile = "Sistema-Cruceros-Portable.zip"
if (Test-Path $zipFile) {
    Remove-Item -Path $zipFile -Force
}

Compress-Archive -Path $portableDir -DestinationPath $zipFile -CompressionLevel Optimal

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Error al crear archivo ZIP" -ForegroundColor Red
    exit 1
}

$zipSize = [math]::Round((Get-Item $zipFile).Length / 1MB, 2)

Write-Host "   ✅ Archivo ZIP creado: $zipFile ($zipSize MB)" -ForegroundColor Green
Write-Host ""

# Resumen final
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "   ✅ VERSIÓN PORTABLE CREADA EXITOSAMENTE" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Archivos generados:" -ForegroundColor Cyan
Write-Host "   📁 Carpeta: $portableDir" -ForegroundColor White
Write-Host "   🗜️  ZIP:    $zipFile ($zipSize MB)" -ForegroundColor White
Write-Host ""
Write-Host "🚀 CÓMO USAR:" -ForegroundColor Cyan
Write-Host "   1. Descomprime el archivo ZIP" -ForegroundColor Gray
Write-Host "   2. Abre la carpeta $portableDir" -ForegroundColor Gray
Write-Host "   3. Haz doble clic en INICIAR.bat" -ForegroundColor Gray
Write-Host "   4. El sistema se abrirá en tu navegador" -ForegroundColor Gray
Write-Host ""
Write-Host "📋 NOTA IMPORTANTE:" -ForegroundColor Yellow
Write-Host "   - Funciona SIN internet (100% offline)" -ForegroundColor Gray
Write-Host "   - Se puede copiar a cualquier computadora Windows" -ForegroundColor Gray
Write-Host "   - Requiere Node.js o Python instalado" -ForegroundColor Gray
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

# Abrir carpeta donde está el ZIP
Write-Host "📂 Abriendo carpeta con los archivos..." -ForegroundColor Cyan
Start-Process explorer.exe -ArgumentList (Get-Location).Path