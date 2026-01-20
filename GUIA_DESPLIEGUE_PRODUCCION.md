# 🚀 Guía de Despliegue a Producción - Sistema de Gestión de Cruceros

## 📋 Índice
1. [Pre-requisitos](#pre-requisitos)
2. [Preparación del código](#preparación-del-código)
3. [Opciones de despliegue](#opciones-de-despliegue)
4. [Configuración de variables de entorno](#configuración-de-variables-de-entorno)
5. [Despliegue paso a paso](#despliegue-paso-a-paso)
6. [Verificación post-despliegue](#verificación-post-despliegue)
7. [Mantenimiento](#mantenimiento)

---

## 🎯 Pre-requisitos

- [x] Código funcionando localmente
- [x] Repositorio Git configurado (GitHub/GitLab)
- [x] Node.js instalado (v18+)
- [ ] Cuenta en plataforma de hosting (elegir una)

---

## 🔧 Preparación del código

### 1. Revisar configuración de producción

```bash
# Verificar que el build funciona correctamente
npm run build

# Probar la versión de producción localmente
npm run preview
```

### 2. Limpiar archivos innecesarios

Archivos que NO necesitas en producción:
- ❌ Todos los `.md` de documentación (excepto README.md)
- ❌ Archivos `RESUMEN_*.md`, `TODO_*.txt`, etc.
- ❌ `dev.log`, `test_example.csv`
- ❌ Carpetas temporales

**Opcional**: Crear un script de limpieza:

```bash
# Crear archivo clean-for-production.sh
cat > clean-for-production.sh << 'EOF'
#!/bin/bash
echo "🧹 Limpiando archivos de desarrollo..."

# Eliminar archivos de documentación temporal
rm -f ACTUALIZACION_*.md
rm -f AJUSTE_*.md
rm -f CAMBIOS_*.md
rm -f CHANGELOG_*.md
rm -f COMO_*.md
rm -f COMPLETADO*.txt
rm -f CONFIGURACION_*.md
rm -f CORRECCION_*.md
rm -f DEBUG_*.md
rm -f DIAGNOSTICO_*.md
rm -f EJEMPLOS_*.md
rm -f ENTREGA_*.md
rm -f ESTADO_*.md
rm -f FORMATO_*.md
rm -f FUNCIONALIDAD_*.md
rm -f GUIA_*.md
rm -f INDICE_*.md
rm -f INICIO_*.md
rm -f INSTRUCCIONES_*.md
rm -f INTEGRACION_*.md
rm -f LEEME_*.txt
rm -f LEER_*.md
rm -f LISTADO_*.md
rm -f MEJORAS_*.md
rm -f PARA_*.md
rm -f PRESENTACION_*.md
rm -f PRUEBAS_*.md
rm -f README_*.md
rm -f REPORTE_*.md
rm -f RESPALDO_*.md
rm -f RESUMEN_*.md
rm -f SISTEMA_*.md
rm -f SOLUCION_*.md
rm -f TODO_*.txt
rm -f VALIDACION_*.txt
rm -f dev.log
rm -f test_example.csv
rm -f check-app.sh

echo "✅ Limpieza completada"
EOF

chmod +x clean-for-production.sh
./clean-for-production.sh
```

---

## 🌐 Opciones de Despliegue

### Opción 1: **Cloudflare Pages** (Recomendado - GRATIS) ⭐

**Ventajas:**
- ✅ Gratis ilimitado
- ✅ CDN global
- ✅ SSL automático
- ✅ Ya configurado para Cloudflare Workers
- ✅ Despliegue automático desde Git

**Pasos:**

1. **Subir código a GitHub** (si no lo has hecho)
   ```bash
   git add .
   git commit -m "Preparar para producción"
   git push origin main
   ```

2. **Conectar con Cloudflare Pages:**
   - Ve a https://dash.cloudflare.com
   - Workers & Pages → Create → Pages → Connect to Git
   - Selecciona tu repositorio
   - Configuración:
     - **Framework preset**: Astro
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Node version**: 18 o superior

3. **Variables de entorno** (si las necesitas):
   - Settings → Environment variables
   - Agrega las necesarias (ej: WEBFLOW_CMS_SITE_API_TOKEN)

4. **Deploy:**
   - Click en "Save and Deploy"
   - Espera 2-3 minutos
   - ¡Tu sitio estará en línea!

---

### Opción 2: **Vercel** (GRATIS con límites generosos)

**Ventajas:**
- ✅ Gratis hasta 100GB bandwidth/mes
- ✅ SSL automático
- ✅ Despliegue automático
- ✅ Preview deployments

**Pasos:**

1. **Instalar Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Configurar desde dashboard:**
   - Ve a https://vercel.com/dashboard
   - Selecciona tu proyecto
   - Settings → Environment Variables
   - Agrega las variables necesarias

---

### Opción 3: **Netlify** (GRATIS con límites generosos)

**Pasos:**

1. **Instalar Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

---

### Opción 4: **Servidor Propio (VPS)**

Si tienes un servidor propio o VPS:

```bash
# 1. Conectar por SSH
ssh usuario@tu-servidor.com

# 2. Instalar Node.js (si no está)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Clonar repositorio
git clone https://github.com/tu-usuario/sistema-cruceros.git
cd sistema-cruceros

# 4. Instalar dependencias
npm install

# 5. Build
npm run build

# 6. Configurar Nginx/Apache para servir desde /dist
# O usar un process manager como PM2:
npm i -g pm2
pm2 start npm --name "cruceros" -- run preview
pm2 save
pm2 startup
```

---

## 🔐 Configuración de Variables de Entorno

### Variables necesarias (si usas CMS):

```env
WEBFLOW_CMS_SITE_API_TOKEN=tu_token_aqui
WEBFLOW_API_HOST=https://api.webflow.com
```

### Cómo configurar en cada plataforma:

**Cloudflare Pages:**
- Dashboard → Tu proyecto → Settings → Environment variables

**Vercel:**
- Dashboard → Tu proyecto → Settings → Environment Variables

**Netlify:**
- Dashboard → Tu proyecto → Site settings → Environment variables

**Servidor propio:**
```bash
# Crear archivo .env en el servidor
nano .env
# Pegar las variables
# Guardar con Ctrl+X, Y, Enter
```

---

## ✅ Verificación Post-Despliegue

### Checklist de funcionalidades:

```bash
# URL de tu sitio: https://tu-proyecto.pages.dev
```

- [ ] **Página principal carga correctamente**
- [ ] **Pestañas funcionan:**
  - [ ] Dashboard
  - [ ] Gestión de Buques
  - [ ] Gestión de Movimientos
  - [ ] Base de Datos
  - [ ] Estadísticas
  - [ ] Alertas
- [ ] **Formularios funcionan:**
  - [ ] Agregar buque nuevo
  - [ ] Editar buque existente
  - [ ] Eliminar buque
  - [ ] Importar CSV
  - [ ] Exportar Excel
- [ ] **Cálculos funcionan:**
  - [ ] Reserva de canal automática
  - [ ] Detección de conflictos
  - [ ] Cálculo de tiempos
  - [ ] Validación de ventanas horarias
- [ ] **Reportes funcionan:**
  - [ ] Descargar PDF
  - [ ] Descargar Excel
  - [ ] Imprimir A3
- [ ] **Responsive design:**
  - [ ] Desktop (1920px+)
  - [ ] Tablet (768px-1919px)
  - [ ] Mobile (320px-767px)

---

## 🔍 Testing en producción

### Datos de prueba:

Usa estos datos para verificar que todo funciona:

```javascript
// Buque de prueba
{
  name: "TEST VESSEL",
  imo: "9999999",
  flag: "Panama",
  loa: 294,
  beam: 32,
  draft: 11.5,
  grt: 85000,
  type: "Container Ship",
  eta: "2026-01-20T08:00",
  etd: "2026-01-20T18:00"
}
```

### Flujo completo de prueba:

1. **Agregar buque** → Verificar que aparece en tabla
2. **Editar buque** → Cambiar ETA/ETD
3. **Ver conflictos** → Verificar detección automática
4. **Descargar reporte** → PDF debe generarse correctamente
5. **Eliminar buque de prueba** → Limpiar datos

---

## 📊 Monitoreo

### Métricas importantes:

- **Uptime**: ¿El sitio está siempre disponible?
- **Performance**: ¿Carga rápido? (< 3 segundos)
- **Errores**: ¿Hay errores en la consola?

### Herramientas recomendadas:

- **Uptime monitoring**: UptimeRobot (gratis)
- **Analytics**: Google Analytics, Plausible
- **Error tracking**: Sentry (gratis hasta 5k eventos/mes)
- **Performance**: Lighthouse (integrado en Chrome DevTools)

---

## 🔄 Mantenimiento y Actualizaciones

### Actualizar el sistema:

```bash
# 1. Hacer cambios localmente
# 2. Probar
npm run dev

# 3. Commit y push
git add .
git commit -m "Descripción del cambio"
git push

# 4. Despliegue automático
# (Si configuraste CI/CD, se desplegará automáticamente)
```

### Backup de datos:

```bash
# Exportar todos los buques a Excel periódicamente
# Usar el botón "Exportar Excel" en la interfaz
# O implementar backup automático en localStorage
```

---

## 🚨 Problemas Comunes

### Problema 1: Página en blanco

**Solución:**
```bash
# Verificar console del navegador (F12)
# Revisar que baseUrl esté configurado correctamente en astro.config.mjs
```

### Problema 2: Errores de build

**Solución:**
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problema 3: Variables de entorno no funcionan

**Solución:**
- Verificar que están configuradas en la plataforma
- Reiniciar el deployment
- Verificar el nombre exacto (case-sensitive)

---

## 📞 Soporte Post-Despliegue

### Logs y debugging:

**Cloudflare Pages:**
```bash
# Ver logs en tiempo real
wrangler pages deployment tail
```

**Vercel:**
```bash
# Ver logs
vercel logs tu-proyecto-url
```

**Browser console:**
```javascript
// Abrir DevTools (F12) y revisar:
// - Console (errores)
// - Network (requests fallidos)
// - Application → LocalStorage (datos guardados)
```

---

## 🎉 Checklist Final de Producción

- [ ] Código en repositorio Git
- [ ] Build exitoso localmente
- [ ] Variables de entorno configuradas
- [ ] Deploy realizado
- [ ] SSL/HTTPS activo
- [ ] Todas las funcionalidades probadas
- [ ] Responsive design verificado
- [ ] Performance optimizado (Lighthouse > 90)
- [ ] Documentación actualizada
- [ ] Backup inicial realizado
- [ ] Monitoreo configurado
- [ ] URL de producción compartida con el equipo

---

## 🌟 URLs Finales

Después del despliegue, tendrás:

**Cloudflare Pages:**
- Producción: `https://tu-proyecto.pages.dev`
- Custom domain: `https://cruceros.tuempresa.com`

**Vercel:**
- Producción: `https://tu-proyecto.vercel.app`
- Custom domain: `https://cruceros.tuempresa.com`

**Netlify:**
- Producción: `https://tu-proyecto.netlify.app`
- Custom domain: `https://cruceros.tuempresa.com`

---

## 🎓 Próximos Pasos (Opcional)

1. **Custom Domain**: Conectar tu propio dominio
2. **Analytics**: Implementar Google Analytics
3. **Auth**: Agregar autenticación (si es necesario)
4. **API**: Conectar con sistemas externos
5. **Backup automático**: Implementar respaldos programados
6. **Notificaciones**: Email/SMS para conflictos críticos

---

**¡Tu Sistema de Gestión de Cruceros está listo para producción! 🚢🎉**

Para cualquier duda, revisa la documentación técnica en `DOCUMENTACION_TECNICA_INGENIERIA.md`
