# 🚢 Sistema de Gestión de Cruceros - Canal Punta Indio

Sistema integral para la gestión y control de movimientos de cruceros en el Canal de Acceso a Puerto Buenos Aires.

![Estado](https://img.shields.io/badge/Estado-Producción-success)
![Versión](https://img.shields.io/badge/Versión-5.3-blue)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)

---

## 📋 Descripción

Sistema web profesional diseñado para **Agencias Marítimas** que gestiona:

- ✅ **Control de buques y cruceros**
- ✅ **Planificación de movimientos marítimos**
- ✅ **Cálculo automático de reservas de canal**
- ✅ **Detección de conflictos en tránsito**
- ✅ **Generación de reportes A3 profesionales**
- ✅ **Estadísticas y análisis en tiempo real**

---

## 🚀 Características Principales

### 1. Dashboard Ejecutivo
- Métricas en tiempo real
- Alertas de conflictos
- Resumen de movimientos próximos
- Estadísticas visuales

### 2. Gestión Completa de Buques
- Base de datos de cruceros
- Información detallada (IMO, eslora, manga, calado, clase)
- Búsqueda y filtrado avanzado
- Importación masiva desde CSV/Excel

### 3. Planilla de Cruceros
- Registro de movimientos con validación automática
- Cálculo inteligente de ETAs/ETDs
- Detección de conflictos de horarios
- Estados: Confirmado, En Espera, Cancelado

### 4. Reservas de Canal
Cálculo automático de franjas horarias:
- **CPI Entrada** (KM 239/216 → KM 118.5)
- **ACC Entrada** (KM 118.5 → KM 59/0)
- **ACC Salida** (KM 59/0 → KM 118.5)
- **CPI Salida** (KM 118.5 → KM 239/216/59)

### 5. Reportes Profesionales
- Exportación a Excel (.xlsx)
- Reporte A3 para impresión
- Formato optimizado para agencias marítimas
- Vista consolidada de todos los movimientos

### 6. Estadísticas
- Cruceros por mes
- Distribución por clase (A, B, C)
- Análisis de banderas
- Tendencias de ocupación

---

## 🛠️ Tecnologías

- **Frontend:** React 19 + TypeScript
- **Framework:** Astro 5
- **UI Components:** shadcn/ui + Radix UI
- **Estilos:** Tailwind CSS 4
- **Gráficos:** Recharts
- **Validación:** Zod + React Hook Form
- **Fechas:** date-fns
- **Deployment:** Cloudflare Workers
- **Build:** Vite

---

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/sistema-cruceros.git
cd sistema-cruceros

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (opcional)
cp .env.example .env

# 4. Iniciar servidor de desarrollo
npm run dev
```

El sistema estará disponible en: `http://localhost:3000`

---

## 🏗️ Build para Producción

```bash
# Build optimizado
npm run build

# Preview del build
npm run preview
```

---

## 📖 Documentación

### Para Usuarios
- **[Manual de Usuario](./MANUAL_USUARIO.md)** - Guía completa de uso
- **[Guía Rápida](./INICIO_RAPIDO.md)** - Inicio rápido
- **[Importación de Datos](./GUIA_IMPORTACION_EXCEL.md)** - Cómo importar cruceros
- **[Reporte A3](./TUTORIAL_REPORTE_A3.md)** - Generación de reportes

### Para Desarrolladores
- **[Documentación Técnica](./DOCUMENTACION_TECNICA_INGENIERIA.md)** - Arquitectura del sistema
- **[Guía de Despliegue](./GUIA_DESPLIEGUE_PRODUCCION.md)** - Deploy a producción
- **[Checklist de Producción](./CHECKLIST_PRODUCCION.md)** - Verificación QA

### Historial de Cambios
- **[Changelog V4](./CHANGELOG_V4.md)** - Últimas actualizaciones
- **[Correcciones Aplicadas](./CORRECCIONES_APLICADAS.txt)** - Fixes implementados

---

## 🎯 Casos de Uso

### Agencias Marítimas
```
1. Recepción de crucero
   → Registrar en "Sistema de Cruceros"
   → Validar datos del buque
   → Confirmar movimiento

2. Planificación de tránsito
   → Calcular ETAs automáticas
   → Verificar conflictos
   → Asignar muelle

3. Coordinación con Autoridades
   → Generar reporte A3
   → Enviar a Prefectura/Administración Portuaria
   → Confirmar reservas de canal
```

### Autoridad Portuaria
```
1. Visualización de movimientos
   → Dashboard con cruceros activos
   → Detección de conflictos
   → Reservas de canal actualizadas

2. Control de tráfico
   → Verificar separaciones mínimas
   → Validar capacidad de canal
   → Aprobar/rechazar movimientos
```

---

## 📊 Estructura del Proyecto

```
sistema-cruceros/
├── src/
│   ├── components/          # Componentes React
│   │   ├── MainApp.tsx      # App principal
│   │   ├── Dashboard.tsx    # Dashboard ejecutivo
│   │   ├── ShipManagement.tsx
│   │   ├── CrossingManagerSimple2.tsx
│   │   └── Statistics.tsx
│   ├── lib/
│   │   ├── ships.ts         # Lógica de negocio
│   │   ├── excelTemplate.ts # Exportación Excel
│   │   └── utils.ts
│   ├── pages/
│   │   └── index.astro      # Página principal
│   └── styles/
│       └── global.css
├── public/
│   ├── MANUAL_USUARIO.md
│   └── DOCUMENTACION_TECNICA_INGENIERIA.md
├── package.json
├── astro.config.mjs
├── tsconfig.json
└── README.md
```

---

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run astro        # CLI de Astro
```

---

## 🐛 Reportar Problemas

Si encuentras algún bug o tienes sugerencias:

1. Abre un **Issue** en GitHub
2. Describe el problema detalladamente
3. Incluye pasos para reproducir
4. Adjunta capturas de pantalla si es posible

---

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es privado y de uso exclusivo para agencias marítimas autorizadas.

---

## 👥 Créditos

**Desarrollado para:** Agencias Marítimas de Buenos Aires  
**Versión actual:** 5.3  
**Última actualización:** Enero 2026  

---

## 📞 Soporte

Para asistencia técnica:
- 📧 Email: soporte@sistema-cruceros.com
- 📱 WhatsApp: +54 9 11 XXXX-XXXX
- 🌐 Web: https://sistema-cruceros.com

---

## ⚡ Inicio Rápido

```bash
# Clonar e instalar
git clone https://github.com/TU_USUARIO/sistema-cruceros.git
cd sistema-cruceros
npm install

# Iniciar
npm run dev
```

**¡Listo!** Abre `http://localhost:3000` y comienza a gestionar cruceros.

---

## 🎓 Recursos Adicionales

- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://react.dev)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

---

<div align="center">

**⚓ Sistema de Gestión de Cruceros**  
*Simplificando la gestión portuaria*

[Documentación](./MANUAL_USUARIO.md) • [Demo](#) • [Reportar Bug](#)

</div>
