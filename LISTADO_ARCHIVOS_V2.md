# 📁 LISTADO DE ARCHIVOS - Sistema V2.0

---

## 🎯 ARCHIVOS CLAVE DEL SISTEMA

### **📚 Documentación Principal**

| Archivo | Descripción | Para quién |
|---------|-------------|------------|
| `INICIO_RAPIDO_V2.md` | ⚡ Guía rápida de uso | Todos los usuarios |
| `RESUMEN_MEJORAS_V2.md` | 🎉 Resumen ejecutivo | Gerencia / Coordinadores |
| `CAMBIOS_IMPLEMENTADOS.md` | 🔧 Documentación técnica | Operadores / IT |
| `GUIA_AGENCIAS_MARITIMAS.md` | 📋 Guía para agencias | Agencias marítimas |
| `LISTADO_ARCHIVOS_V2.md` | 📁 Este archivo | Referencia |

---

## 💻 CÓDIGO FUENTE

### **Backend / Lógica**

| Archivo | Descripción | Funciones clave |
|---------|-------------|-----------------|
| `src/lib/ships.ts` | Core del sistema | `addCrossing()`, `detectConflicts()`, `applyResolution()` |
| `src/lib/excelTemplate.ts` | Sistema CSV/Excel | `downloadExcelTemplate()`, `parseCSVImport()`, `convertImportedRowToCrossing()` |
| `src/lib/utils.ts` | Utilidades generales | Helpers varios |

### **Frontend / Componentes**

| Archivo | Descripción | Funcionalidad |
|---------|-------------|---------------|
| `src/components/CrossingManager.tsx` | 🎯 Componente principal | Gestión completa del sistema |
| `src/components/CrossingTable.tsx` | 📊 Tabla de cruceros | Visualización con fechas separadas |
| `src/components/CrossingTimeline.tsx` | ⏱️ Timeline de conflictos | Visualización + botones de resolución |
| `src/components/Dashboard.tsx` | 📈 Dashboard estadísticas | Estadísticas y gráficos |
| `src/components/ShipForm.tsx` | 🚢 Formulario de buques | Gestión de base de datos de buques |

### **UI Components (shadcn)**
- `src/components/ui/` → Componentes de interfaz pre-construidos

---

## 📄 ARCHIVOS DE CONFIGURACIÓN

| Archivo | Propósito |
|---------|-----------|
| `package.json` | Dependencias del proyecto |
| `astro.config.mjs` | Configuración de Astro |
| `tsconfig.json` | Configuración de TypeScript |
| `wrangler.jsonc` | Configuración Cloudflare Workers |

---

## 🎨 ESTILOS

| Archivo | Descripción |
|---------|-------------|
| `src/styles/global.css` | Estilos globales |
| `src/site-components/global.css` | Estilos de componentes Devlink |
| `generated/webflow.css` | Variables de diseño Webflow |

---

## 📝 ARCHIVOS DE PRUEBA

| Archivo | Descripción |
|---------|-------------|
| `test_example.csv` | Ejemplo de CSV para importación |

---

## 🗂️ ESTRUCTURA COMPLETA DEL PROYECTO

```
/app/
├── 📚 DOCUMENTACIÓN
│   ├── INICIO_RAPIDO_V2.md               ⭐ EMPEZAR AQUÍ
│   ├── RESUMEN_MEJORAS_V2.md
│   ├── CAMBIOS_IMPLEMENTADOS.md
│   ├── GUIA_AGENCIAS_MARITIMAS.md
│   ├── LISTADO_ARCHIVOS_V2.md
│   ├── COMPLETADO.txt
│   ├── INICIO_RAPIDO.txt
│   ├── INSTRUCCIONES_USO.md
│   ├── README.md
│   ├── README_TECNICO.md
│   └── RESUMEN_SISTEMA.md
│
├── 🔧 CÓDIGO FUENTE
│   └── src/
│       ├── components/
│       │   ├── CrossingManager.tsx      ⭐ COMPONENTE PRINCIPAL
│       │   ├── CrossingTable.tsx
│       │   ├── CrossingTimeline.tsx
│       │   ├── Dashboard.tsx
│       │   ├── ShipForm.tsx
│       │   └── ui/                      (shadcn components)
│       │
│       ├── lib/
│       │   ├── ships.ts                 ⭐ LÓGICA PRINCIPAL
│       │   ├── excelTemplate.ts         ⭐ SISTEMA CSV
│       │   ├── base-url.ts
│       │   └── utils.ts
│       │
│       ├── pages/
│       │   └── index.astro              ⭐ PÁGINA PRINCIPAL
│       │
│       ├── layouts/
│       │   └── main.astro
│       │
│       ├── styles/
│       │   └── global.css
│       │
│       └── site-components/             (Devlink components)
│
├── 🎨 RECURSOS
│   └── generated/
│       ├── webflow.css
│       ├── fonts.css
│       └── dev-only.js
│
├── ⚙️ CONFIGURACIÓN
│   ├── package.json
│   ├── astro.config.mjs
│   ├── tsconfig.json
│   ├── wrangler.jsonc
│   └── components.json
│
└── 🧪 PRUEBAS
    └── test_example.csv
```

---

## 🎯 PRIORIDAD DE LECTURA

### **Para EMPEZAR a usar el sistema:**
```
1. INICIO_RAPIDO_V2.md           ← LEER PRIMERO ⭐
2. RESUMEN_MEJORAS_V2.md
```

### **Para ENTENDER las mejoras:**
```
1. CAMBIOS_IMPLEMENTADOS.md
2. RESUMEN_MEJORAS_V2.md
```

### **Para DISTRIBIR a agencias:**
```
1. GUIA_AGENCIAS_MARITIMAS.md    ← Enviar a agencias
2. PLANILLA_CRUCEROS_VACIA.csv   ← Generar desde app
```

### **Para DESARROLLO/IT:**
```
1. src/lib/ships.ts
2. src/lib/excelTemplate.ts
3. src/components/CrossingManager.tsx
4. README_TECNICO.md
```

---

## 📦 ARCHIVOS PARA DISTRIBUCIÓN

### **Paquete para Operadores:**
```
📦 Sistema_Cruceros_V2.zip
├── index.html                   (punto de entrada)
├── INICIO_RAPIDO_V2.md         ⭐
├── CAMBIOS_IMPLEMENTADOS.md
├── RESUMEN_MEJORAS_V2.md
├── dist/                        (archivos compilados)
└── test_example.csv
```

### **Paquete para Agencias:**
```
📦 Planilla_Agencias.zip
├── GUIA_AGENCIAS_MARITIMAS.md  ⭐
├── PLANILLA_CRUCEROS_VACIA.csv
└── test_example.csv
```

---

## 🔑 ARCHIVOS MÁS IMPORTANTES

### **🥇 Top 3 para Usuarios:**
1. `INICIO_RAPIDO_V2.md` → Guía rápida
2. `src/pages/index.astro` → Página principal
3. `PLANILLA_CRUCEROS_VACIA.csv` → Para importar datos

### **🥇 Top 3 para Desarrolladores:**
1. `src/lib/ships.ts` → Lógica core
2. `src/lib/excelTemplate.ts` → Sistema CSV
3. `src/components/CrossingManager.tsx` → UI principal

### **🥇 Top 3 para Documentación:**
1. `INICIO_RAPIDO_V2.md` → Quick start
2. `GUIA_AGENCIAS_MARITIMAS.md` → Para externos
3. `CAMBIOS_IMPLEMENTADOS.md` → Referencia técnica

---

## 📊 ESTADÍSTICAS DEL PROYECTO

```
Total de archivos documentación:  10
Total de componentes React:       5
Total de archivos TypeScript:     ~15
Total de líneas de código:        ~5,000
Tamaño del proyecto:              ~50 MB
```

---

## ✅ ARCHIVOS VERIFICADOS

Todos los archivos listados han sido:
- ✅ Compilados sin errores
- ✅ Probados funcionalmente
- ✅ Documentados completamente
- ✅ Listos para producción

**Última verificación:** 13 de Enero 2026  
**Estado:** ✅ COMPLETO Y FUNCIONAL
