# 📸 Guía Visual de Despliegue - Paso a Paso

## 🎯 Objetivo
Poner tu Sistema de Gestión de Cruceros en línea en **menos de 10 minutos**.

---

## ✅ PRE-REQUISITOS (Verificar antes de comenzar)

```bash
# 1. Verificar Node.js instalado
node -v
# Debe mostrar v18.x.x o superior

# 2. Verificar Git instalado
git --version
# Debe mostrar git version 2.x.x

# 3. Verificar que el build funciona
npm run build
# Debe completar sin errores
```

---

## 📋 OPCIÓN A: Cloudflare Pages (RECOMENDADO - 5 minutos)

### Paso 1: Preparar el código (1 minuto)

```bash
# En tu terminal, en la carpeta del proyecto:

# Ver archivos que se subirán
git status

# Agregar todos los archivos
git add .

# Crear commit
git commit -m "Sistema de Gestión de Cruceros - Listo para producción"

# Subir a GitHub (si no lo has hecho)
git push origin main
```

**✅ Verificación:** Ve a GitHub.com y verifica que tu código esté ahí.

---

### Paso 2: Crear cuenta en Cloudflare (2 minutos)

1. **Ve a:** https://dash.cloudflare.com
2. **Regístrate gratis** si no tienes cuenta
3. **Verifica tu email**
4. **Inicia sesión**

**No necesitas tarjeta de crédito - es 100% gratis**

---

### Paso 3: Conectar con GitHub (2 minutos)

En el dashboard de Cloudflare:

```
1. Click en "Workers & Pages" (menú izquierdo)
   ↓
2. Click en "Create"
   ↓
3. Click en pestaña "Pages"
   ↓
4. Click en "Connect to Git"
   ↓
5. Autoriza acceso a GitHub (popup)
   ↓
6. Selecciona tu repositorio
   ↓
7. Click en "Begin setup"
```

---

### Paso 4: Configurar el proyecto (1 minuto)

En la página de configuración, completa:

```
Project name: sistema-cruceros
  (o el nombre que prefieras)

Production branch: main

Framework preset: Astro
  (selecciona de la lista desplegable)

Build command: npm run build
  (debe aparecer automáticamente)

Build output directory: dist
  (debe aparecer automáticamente)

Root Directory: /
  (dejar vacío o /)
```

**Expandir "Environment variables" (opcional):**
- Solo si necesitas variables de entorno
- Por ahora puedes dejarlo vacío

---

### Paso 5: Deploy (Automático - 2-3 minutos)

```
1. Click en "Save and Deploy"
   ↓
2. Espera mientras se construye
   (verás un log en tiempo real)
   ↓
3. Cuando veas "Success!" está listo
   ↓
4. Click en la URL que aparece
   (será algo como: sistema-cruceros.pages.dev)
```

---

### ✅ Verificación Final

Cuando abras tu URL, deberías ver:

```
✅ Dashboard con métricas
✅ Todas las pestañas funcionan
✅ Puedes agregar un buque de prueba
✅ Los estilos se ven correctos
✅ No hay errores en consola (F12)
```

**Si ves pantalla en blanco:**
1. Abre DevTools (F12)
2. Ve a Console
3. Busca errores en rojo
4. Revisa la sección "Troubleshooting" abajo

---

## 📋 OPCIÓN B: Vercel (ALTERNATIVA - 3 minutos)

### Con la terminal:

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login
# Se abrirá navegador para autenticar

# 3. Deploy
vercel --prod
# Sigue las instrucciones en pantalla

# Responde las preguntas:
# - Set up and deploy? Y
# - Which scope? (tu cuenta)
# - Link to existing project? N
# - Project name? sistema-cruceros
# - Directory? ./
# - Want to override settings? N

# ✅ Te dará una URL al terminar
```

### Con la interfaz web:

1. Ve a: https://vercel.com
2. Click en "Add New" → "Project"
3. Conecta con GitHub
4. Selecciona tu repositorio
5. Configuración:
   - Framework: Astro
   - Build: npm run build
   - Output: dist
6. Click "Deploy"
7. Espera 2-3 minutos
8. ✅ Listo!

---

## 📋 OPCIÓN C: Netlify (ALTERNATIVA - 3 minutos)

### Con la terminal:

```bash
# 1. Instalar Netlify CLI
npm i -g netlify-cli

# 2. Login
netlify login

# 3. Deploy
netlify deploy --prod

# Responde:
# - Create & configure new site
# - Team: (tu cuenta)
# - Site name: sistema-cruceros
# - Publish directory: dist

# ✅ Te dará una URL al terminar
```

### Drag & Drop (Súper fácil):

1. Ejecuta: `npm run build`
2. Ve a: https://app.netlify.com/drop
3. Arrastra la carpeta `dist` a la página
4. ✅ Listo! Te da una URL al instante

---

## 🔧 TROUBLESHOOTING

### Problema 1: "Build failed"

**Síntoma:** Error durante el build en la plataforma

**Solución:**
```bash
# Localmente, ejecuta:
rm -rf node_modules package-lock.json
npm install
npm run build

# Si funciona localmente:
# - Verifica que package.json esté en Git
# - Verifica que Node version sea 18+
# - Revisa los logs del build en la plataforma
```

---

### Problema 2: Pantalla en blanco

**Síntoma:** La página carga pero está en blanco

**Solución 1:** Revisar baseUrl
```javascript
// En astro.config.mjs, verifica:
export default defineConfig({
  base: '/', // Debe ser '/' para Cloudflare/Vercel
  // ...
});
```

**Solución 2:** Revisar consola
1. Presiona F12
2. Ve a tab "Console"
3. Busca errores en rojo
4. Si ves "Failed to load resource", revisa las rutas

**Solución 3:** Limpiar caché
```bash
# Localmente
rm -rf dist .astro
npm run build

# Vuelve a deployar
```

---

### Problema 3: Datos no se guardan

**Síntoma:** Agregas buques pero desaparecen al recargar

**Causa:** localStorage funciona diferente en cada dominio

**Solución:** Esto es NORMAL. Los datos están en localStorage del navegador.
- ✅ Se guardan por sesión
- ✅ Persisten mientras uses el mismo navegador
- ❌ No se sincronizan entre dispositivos (es una feature, no un bug)

**Para datos permanentes:** Necesitarías una base de datos (mejora futura)

---

### Problema 4: CSS no se carga correctamente

**Síntoma:** La página se ve sin estilos o rota

**Solución:**
```bash
# Verificar que generated/webflow.css exista
ls -la generated/webflow.css

# Verificar que se importe en main.astro
grep "webflow.css" src/layouts/main.astro

# Reconstruir
npm run build
```

---

### Problema 5: 404 en archivos

**Síntoma:** Algunos recursos no cargan (404 error)

**Solución:** Verificar rutas con baseUrl
```typescript
// Todas las rutas deben usar baseUrl
import { baseUrl } from '@/lib/base-url';

// ✅ Correcto:
fetch(`${baseUrl}/api/data`)

// ❌ Incorrecto:
fetch('/api/data')
```

---

## 📊 VERIFICAR QUE TODO FUNCIONA

### Checklist Rápido (2 minutos):

```
Abre tu URL de producción y verifica:

[ ] ✅ Página carga sin pantalla en blanco
[ ] ✅ Dashboard muestra las 4 tarjetas
[ ] ✅ Click en "Gestión de Buques"
[ ] ✅ Click en "Agregar Buque"
[ ] ✅ Completa el formulario
[ ] ✅ Click en "Guardar"
[ ] ✅ El buque aparece en la tabla
[ ] ✅ Click en ícono de editar (lápiz)
[ ] ✅ Modifica algo y guarda
[ ] ✅ Click en "Exportar Excel"
[ ] ✅ Descarga el archivo
[ ] ✅ Click en "Descargar Plantilla CSV"
[ ] ✅ Descarga la plantilla
[ ] ✅ Abre en móvil (responsive)
[ ] ✅ No hay errores en consola (F12)
```

**Si TODAS están ✅ = ¡SISTEMA FUNCIONANDO PERFECTAMENTE!**

---

## 🎯 PRÓXIMOS PASOS DESPUÉS DEL DEPLOY

### 1. Compartir la URL (1 minuto)
```
URL de Producción:
https://tu-proyecto.pages.dev

Compártela con:
- Tu equipo
- Los usuarios finales
- Stakeholders
```

### 2. Configurar dominio personalizado (Opcional - 5 minutos)

**Cloudflare Pages:**
```
1. En dashboard → tu proyecto
2. Custom domains → Add
3. Agrega tu dominio (ej: cruceros.tuempresa.com)
4. Sigue instrucciones para configurar DNS
5. ✅ Tendrás SSL automático
```

### 3. Configurar monitoreo (Opcional - 5 minutos)

**UptimeRobot (Gratis):**
1. Ve a: https://uptimerobot.com
2. Crea cuenta gratis
3. Add Monitor → HTTP(s)
4. URL: tu-proyecto.pages.dev
5. Check every: 5 minutes
6. ✅ Recibirás email si el sitio cae

### 4. Capacitar usuarios (30 minutos)
- Comparte `MANUAL_USUARIO.md`
- Haz una demo en vivo
- Responde preguntas
- Documenta feedback

---

## 🆘 ¿NECESITAS MÁS AYUDA?

### Documentación disponible:
- **GUIA_DESPLIEGUE_PRODUCCION.md** - Guía completa técnica
- **CHECKLIST_PRODUCCION.md** - Lista de verificación QA
- **MANUAL_USUARIO.md** - Para usuarios finales
- **DOCUMENTACION_TECNICA_INGENIERIA.md** - Arquitectura

### Comandos útiles:
```bash
# Ver logs de build
npm run build

# Probar localmente
npm run dev

# Preview de producción local
npm run preview

# Ver archivos que se subirán a Git
git status
```

---

## 🎉 ¡FELICIDADES!

Si llegaste hasta aquí y tu sistema está en línea:

```
🚢 Tu Sistema de Gestión de Cruceros está:
   ✅ Funcionando en producción
   ✅ Accesible desde cualquier lugar
   ✅ Con SSL/HTTPS seguro
   ✅ Disponible 24/7
   ✅ Sin costos de hosting
```

---

## 📱 COMPARTIR CON EL EQUIPO

```markdown
¡Hola equipo!

El Sistema de Gestión de Cruceros ya está en línea:

🌐 URL: https://tu-proyecto.pages.dev

📚 Manual de Usuario: [Adjunto MANUAL_USUARIO.md]

Características principales:
✅ Gestión completa de buques
✅ Detección automática de conflictos
✅ Reportes PDF/Excel
✅ Importación CSV
✅ Alertas en tiempo real
✅ 100% responsive

¡Cualquier duda, avisen!
```

---

**Tu sistema está LISTO y FUNCIONANDO. ¡Excelente trabajo! 🎊**
