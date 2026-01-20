# 🚀 Script de construcción para versión portable
# Sistema de Gestión de Cruceros - Windows Portable

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   🚢 SISTEMA DE GESTIÓN DE CRUCEROS" -ForegroundColor White
Write-Host "   Construcción de versión portable para Windows" -ForegroundColor Gray
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "🔍 Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   ✅ Node.js $nodeVersion instalado" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Node.js no encontrado" -ForegroundColor Red
    Write-Host "   Descarga Node.js desde: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verificar que estamos en la carpeta correcta
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: No se encuentra package.json" -ForegroundColor Red
    Write-Host "   Ejecuta este script desde la carpeta del proyecto" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📦 PASO 1: Instalando dependencias..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    exit 1
}
Write-Host "   ✅ Dependencias instaladas" -ForegroundColor Green

Write-Host ""
Write-Host "🏗️  PASO 2: Construyendo aplicación estática..." -ForegroundColor Yellow
Write-Host "   (Esto puede tomar 1-3 minutos)" -ForegroundColor Gray

# Usar configuración portable
$env:ASTRO_CONFIG = "astro.config.portable.mjs"
npm run build:static

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al construir la aplicación" -ForegroundColor Red
    exit 1
}
Write-Host "   ✅ Aplicación construida en dist/" -ForegroundColor Green

Write-Host ""
Write-Host "📱 PASO 3: Creando ejecutable portable..." -ForegroundColor Yellow
Write-Host "   (Esto puede tomar 3-10 minutos)" -ForegroundColor Gray

npm run dist

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al crear ejecutable" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "   ✅ ¡CONSTRUCCIÓN EXITOSA!" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

# Encontrar el ejecutable
$exePath = Get-ChildItem -Path "release" -Filter "*.exe" -Recurse | Select-Object -First 1

if ($exePath) {
    Write-Host "📂 Ejecutable creado en:" -ForegroundColor Cyan
    Write-Host "   $($exePath.FullName)" -ForegroundColor White
    Write-Host ""
    Write-Host "📊 Tamaño: $([math]::Round($exePath.Length / 1MB, 2)) MB" -ForegroundColor Gray
    Write-Host ""

    # Preguntar si quiere abrir la carpeta
    $open = Read-Host "¿Abrir carpeta del ejecutable? (S/N)"
    if ($open -eq "S" -or $open -eq "s") {
        explorer $exePath.DirectoryName
    }

    Write-Host ""
    Write-Host "🎯 PRÓXIMOS PASOS:" -ForegroundColor Yellow
    Write-Host "   1. Copiar el .exe a un pendrive" -ForegroundColor White
    Write-Host "   2. Ejecutar desde el pendrive" -ForegroundColor White
    Write-Host "   3. ¡Listo para usar sin internet!" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 Lee CREAR_VERSION_PORTABLE.md para más información" -ForegroundColor Cyan

} else {
    Write-Host "⚠️  No se encontró el ejecutable en la carpeta release/" -ForegroundColor Yellow
    Write-Host "   Revisa la carpeta manualmente" -ForegroundColor Gray
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
