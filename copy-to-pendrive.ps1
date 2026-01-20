# 📁 Script para copiar ejecutable a pendrive
# Sistema de Gestión de Cruceros - Windows Portable

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   📁 COPIAR A PENDRIVE" -ForegroundColor White
Write-Host "   Sistema de Gestión de Cruceros" -ForegroundColor Gray
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Buscar el ejecutable
Write-Host "🔍 Buscando ejecutable..." -ForegroundColor Yellow
$exePath = Get-ChildItem -Path "release" -Filter "*.exe" -Recurse | Select-Object -First 1

if (-not $exePath) {
    Write-Host "❌ No se encontró el ejecutable" -ForegroundColor Red
    Write-Host "   Ejecuta primero: .\build-portable.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host "   ✅ Encontrado: $($exePath.Name)" -ForegroundColor Green
Write-Host "   📊 Tamaño: $([math]::Round($exePath.Length / 1MB, 2)) MB" -ForegroundColor Gray
Write-Host ""

# Detectar pendrives
Write-Host "🔍 Detectando pendrives..." -ForegroundColor Yellow
$drives = Get-PSDrive -PSProvider FileSystem | Where-Object { $_.Used -and $_.Root -match '^[D-Z]:' }

if ($drives.Count -eq 0) {
    Write-Host "❌ No se detectaron pendrives" -ForegroundColor Red
    Write-Host "   Conecta un pendrive e intenta de nuevo" -ForegroundColor Yellow
    exit 1
}

Write-Host "   ✅ Pendrives detectados:" -ForegroundColor Green
$i = 1
foreach ($drive in $drives) {
    $freeGB = [math]::Round($drive.Free / 1GB, 2)
    Write-Host "   [$i] $($drive.Root) - $freeGB GB libres" -ForegroundColor White
    $i++
}

Write-Host ""
$selection = Read-Host "Selecciona el pendrive (1-$($drives.Count))"
$selectedDrive = $drives[$selection - 1]

if (-not $selectedDrive) {
    Write-Host "❌ Selección inválida" -ForegroundColor Red
    exit 1
}

# Crear carpeta en el pendrive
$destFolder = Join-Path $selectedDrive.Root "Sistema-Cruceros"
if (-not (Test-Path $destFolder)) {
    New-Item -ItemType Directory -Path $destFolder | Out-Null
    Write-Host "✅ Carpeta creada: $destFolder" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Carpeta existente: $destFolder" -ForegroundColor Yellow
}

# Copiar ejecutable
Write-Host ""
Write-Host "📁 Copiando ejecutable..." -ForegroundColor Yellow
$destPath = Join-Path $destFolder $exePath.Name

try {
    Copy-Item -Path $exePath.FullName -Destination $destPath -Force
    Write-Host "   ✅ Copiado exitosamente" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Error al copiar: $_" -ForegroundColor Red
    exit 1
}

# Copiar documentación
Write-Host ""
Write-Host "📄 Copiando documentación..." -ForegroundColor Yellow

$docs = @("MANUAL_USUARIO.md", "DOCUMENTACION_TECNICA_INGENIERIA.md", "CREAR_VERSION_PORTABLE.md")
foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Copy-Item -Path $doc -Destination $destFolder -Force
        Write-Host "   ✅ $doc" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "   ✅ ¡COPIA COMPLETADA!" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "📂 Ubicación: $destFolder" -ForegroundColor Cyan
Write-Host ""

# Preguntar si quiere abrir la carpeta
$open = Read-Host "¿Abrir carpeta en el pendrive? (S/N)"
if ($open -eq "S" -or $open -eq "s") {
    explorer $destFolder
}

Write-Host ""
Write-Host "🎯 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host "   1. Lleva el pendrive a otra computadora" -ForegroundColor White
Write-Host "   2. Ejecuta el .exe desde el pendrive" -ForegroundColor White
Write-Host "   3. ¡Todo funciona sin internet ni instalación!" -ForegroundColor White
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
