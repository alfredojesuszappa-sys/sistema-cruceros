#!/bin/bash

# 🚀 Script de Despliegue Automatizado
# Sistema de Gestión de Cruceros Oceánicos

echo "=================================="
echo "🚢 SISTEMA DE GESTIÓN DE CRUCEROS"
echo "   Script de Despliegue"
echo "=================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar comandos
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}❌ Error: $1 no está instalado${NC}"
        echo "   Instala $1 y vuelve a ejecutar este script"
        exit 1
    fi
}

# Verificar prerequisitos
echo "🔍 Verificando prerequisitos..."
check_command "node"
check_command "npm"
check_command "git"

echo -e "${GREEN}✅ Prerequisitos verificados${NC}"
echo ""

# Verificar versión de Node
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js versión 18 o superior requerida${NC}"
    echo "   Versión actual: $(node -v)"
    exit 1
fi

# Paso 1: Limpiar
echo "🧹 Limpiando archivos temporales..."
rm -rf node_modules/.cache
rm -rf dist
rm -rf .astro
echo -e "${GREEN}✅ Limpieza completada${NC}"
echo ""

# Paso 2: Instalar dependencias
echo "📦 Instalando dependencias..."
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al instalar dependencias${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependencias instaladas${NC}"
echo ""

# Paso 3: Build
echo "🔨 Compilando proyecto..."
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error en el build${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build exitoso${NC}"
echo ""

# Paso 4: Test local
echo "🧪 ¿Quieres probar el build localmente? (y/n)"
read -r RESPONSE
if [[ "$RESPONSE" =~ ^[Yy]$ ]]; then
    echo "Iniciando preview..."
    echo "Presiona Ctrl+C cuando termines de probar"
    npm run preview
fi

echo ""
echo "=================================="
echo "✅ Build completado exitosamente"
echo "=================================="
echo ""

# Opciones de despliegue
echo "📤 Opciones de despliegue:"
echo ""
echo "1) Cloudflare Pages (Recomendado - Gratis)"
echo "2) Vercel (Gratis)"
echo "3) Netlify (Gratis)"
echo "4) Solo build (despliegue manual)"
echo ""
echo "Selecciona una opción (1-4):"
read -r DEPLOY_OPTION

case $DEPLOY_OPTION in
    1)
        echo ""
        echo "🌐 CLOUDFLARE PAGES"
        echo "=================================="
        echo ""
        echo "Pasos para desplegar en Cloudflare Pages:"
        echo ""
        echo "1. Ve a: https://dash.cloudflare.com"
        echo "2. Workers & Pages → Create → Pages → Connect to Git"
        echo "3. Selecciona tu repositorio"
        echo "4. Configuración:"
        echo "   - Framework: Astro"
        echo "   - Build command: npm run build"
        echo "   - Build output: dist"
        echo "   - Node version: 18"
        echo ""
        echo "¿Quieres abrir la documentación completa? (y/n)"
        read -r OPEN_DOCS
        if [[ "$OPEN_DOCS" =~ ^[Yy]$ ]]; then
            if command -v xdg-open &> /dev/null; then
                xdg-open GUIA_DESPLIEGUE_PRODUCCION.md
            elif command -v open &> /dev/null; then
                open GUIA_DESPLIEGUE_PRODUCCION.md
            else
                echo "Abre manualmente: GUIA_DESPLIEGUE_PRODUCCION.md"
            fi
        fi
        ;;
    2)
        echo ""
        echo "🔺 VERCEL"
        echo "=================================="
        echo ""
        if ! command -v vercel &> /dev/null; then
            echo "Instalando Vercel CLI..."
            npm i -g vercel
        fi
        echo "Ejecutando despliegue en Vercel..."
        vercel --prod
        ;;
    3)
        echo ""
        echo "🌊 NETLIFY"
        echo "=================================="
        echo ""
        if ! command -v netlify &> /dev/null; then
            echo "Instalando Netlify CLI..."
            npm i -g netlify-cli
        fi
        echo "Ejecutando despliegue en Netlify..."
        netlify deploy --prod
        ;;
    4)
        echo ""
        echo "📁 Build completado"
        echo "=================================="
        echo ""
        echo "Los archivos compilados están en: ./dist"
        echo ""
        echo "Puedes:"
        echo "- Subir ./dist a tu servidor"
        echo "- Usar un servicio de hosting estático"
        echo "- Seguir la guía en GUIA_DESPLIEGUE_PRODUCCION.md"
        ;;
    *)
        echo -e "${YELLOW}⚠️  Opción no válida${NC}"
        exit 1
        ;;
esac

echo ""
echo "=================================="
echo "🎉 PROCESO COMPLETADO"
echo "=================================="
echo ""
echo "📚 Recursos útiles:"
echo "   - Guía completa: GUIA_DESPLIEGUE_PRODUCCION.md"
echo "   - Manual de usuario: MANUAL_USUARIO.md"
echo "   - Docs técnicas: DOCUMENTACION_TECNICA_INGENIERIA.md"
echo ""
echo "🚢 ¡Tu Sistema de Gestión de Cruceros está listo!"
echo ""
