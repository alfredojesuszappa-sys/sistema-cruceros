#!/bin/bash
echo "🔍 Verificando el estado de la aplicación..."
echo ""
echo "1. Archivos principales:"
ls -lh src/components/MainApp.tsx src/components/Dashboard.tsx src/components/ShipDatabase.tsx
echo ""
echo "2. Contenido de index.astro:"
head -20 src/pages/index.astro
echo ""
echo "3. Build status:"
npm run build 2>&1 | grep -E "(Complete|error|Error)" | tail -3
echo ""
echo "✅ Todo listo. Inicia con: npm run dev"
