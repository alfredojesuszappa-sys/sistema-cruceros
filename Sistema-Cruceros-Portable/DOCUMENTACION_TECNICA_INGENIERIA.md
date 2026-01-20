# 📘 DOCUMENTACIÓN TÉCNICA - SISTEMA DE GESTIÓN DE CRUCEROS OCEÁNICOS

## 🎯 **INFORMACIÓN GENERAL**

**Nombre del Proyecto:** Sistema de Gestión de Cruceros Oceánicos  
**Versión:** 1.0.0  
**Fecha:** Enero 2026  
**Autor:** Alfredo Jesús Zappa  
**Contacto:** alfredojesus.zappa@gmail.com  
**Tecnología:** Astro + React + TypeScript + Cloudflare Workers

---

## 📑 **TABLA DE CONTENIDOS**

1. [Arquitectura del Sistema](#arquitectura)
2. [Stack Tecnológico](#stack)
3. [Estructura de Archivos](#estructura)
4. [Componentes Principales](#componentes)
5. [Lógica de Negocio](#logica)
6. [Almacenamiento de Datos](#almacenamiento)
7. [Funcionalidades Clave](#funcionalidades)
8. [API y Endpoints](#api)
9. [Despliegue](#despliegue)
10. [Mantenimiento y Extensibilidad](#mantenimiento)

---

<a name="arquitectura"></a>
## 🏗️ **1. ARQUITECTURA DEL SISTEMA**

### **Diagrama de Arquitectura**

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Astro)                     │
│  ┌──────────────────────────────────────────────────┐   │
│  │              MainApp.tsx (Router)                │   │
│  │  ┌────────────┬────────────┬────────────────┐   │   │
│  │  │ Dashboard  │ Ship DB    │ Crossings      │   │   │
│  │  │            │            │ Manager        │   │   │
│  │  └────────────┴────────────┴────────────────┘   │   │
│  │  ┌────────────┬────────────────────────────┐   │   │
│  │  │ Channel    │ Upcoming Alerts            │   │   │
│  │  │ Reserves   │                            │   │   │
│  │  └────────────┴────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│              BUSINESS LOGIC (ships.ts)                  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  • Ship Classification (A/B/C)                    │  │
│  │  • Time Calculations (Entry/Exit)                 │  │
│  │  • Conflict Detection                             │  │
│  │  • Reservation Calculations                       │  │
│  │  • Data Import/Export                             │  │
│  │  • Report Generation                              │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│              DATA LAYER (localStorage)                  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  • ships_db: Ship[]                               │  │
│  │  • ship_crossings: ShipCrossing[]                 │  │
│  │  • channelReservations: Reservation[]             │  │
│  │  • reservationHistory: ReservationHistory[]       │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### **Flujo de Datos**

```
Usuario → MainApp → Componente → ships.ts → localStorage
                                     ↓
                              Cálculos/Validaciones
                                     ↓
                              Actualización UI
```

---

<a name="stack"></a>
## 🛠️ **2. STACK TECNOLÓGICO**

### **Frontend Framework**
- **Astro 5.13.5** - Framework principal (SSR + SSG)
- **React 19.1.1** - Componentes interactivos
- **TypeScript 5.x** - Tipado estático

### **UI/UX**
- **TailwindCSS 4.1.11** - Estilos utility-first
- **Lucide React 0.533.0** - Sistema de iconos
- **Inline CSS** - Estilos específicos de componentes

### **Librerías de Utilidad**
- **date-fns 4.1.0** - Manejo de fechas
- **zod 4.0.13** - Validación de schemas
- **react-hook-form 7.61.1** - Gestión de formularios
- **recharts 2.15.4** - Gráficos (Dashboard)

### **Deployment**
- **Cloudflare Workers** - Hosting serverless
- **wrangler 4.26.1** - CLI de Cloudflare

### **Gestión de Estado**
- **useState/useEffect** - React Hooks
- **localStorage** - Persistencia local

---

<a name="estructura"></a>
## 📁 **3. ESTRUCTURA DE ARCHIVOS**

```
/app
├── src/
│   ├── components/
│   │   ├── ui/                      # shadCN UI components
│   │   ├── Dashboard.tsx            # Panel principal con estadísticas
│   │   ├── ShipDatabase.tsx         # CRUD de buques
│   │   ├── CrossingManagerSimple2.tsx  # Gestión de cruceros
│   │   ├── ChannelReservations.tsx  # Reservas de canal
│   │   ├── UpcomingAlerts.tsx       # Notificaciones próximas
│   │   ├── MainApp.tsx              # Componente raíz
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── ships.ts                 # CORE - Lógica de negocio
│   │   ├── excelTemplate.ts         # Plantilla de importación
│   │   ├── base-url.ts              # Gestión de URLs
│   │   └── utils.ts                 # Utilidades generales
│   │
│   ├── pages/
│   │   ├── index.astro              # Página principal
│   │   └── api/
│   │       └── download-template.ts # API para descargar plantilla
│   │
│   ├── layouts/
│   │   └── main.astro               # Layout principal
│   │
│   └── styles/
│       └── global.css               # Estilos globales
│
├── generated/
│   ├── webflow.css                  # CSS generado por Webflow
│   └── fonts.css                    # Fuentes del sistema
│
├── astro.config.mjs                 # Configuración Astro
├── tsconfig.json                    # Configuración TypeScript
├── wrangler.jsonc                   # Configuración Cloudflare
├── package.json                     # Dependencias
│
└── DOCS/                            # Documentación
    ├── MANUAL_USUARIO.md
    ├── DOCUMENTACION_TECNICA_INGENIERIA.md
    └── ...
```

---

<a name="componentes"></a>
## 🧩 **4. COMPONENTES PRINCIPALES**

### **4.1 MainApp.tsx**
**Responsabilidad:** Componente raíz, manejo de tabs, búsqueda global

```typescript
interface MainAppProps {
  // Sin props - es el componente raíz
}

Estado:
- activeTab: TabType - Pestaña activa
- globalSearch: string - Búsqueda global
```

**Funcionalidades:**
- Sistema de tabs (Dashboard, Database, Crossings, Reservations)
- Búsqueda global propagada a componentes hijos
- Pre-cálculo de reservas al montar

---

### **4.2 Dashboard.tsx**
**Responsabilidad:** Panel de estadísticas y métricas clave

```typescript
Estadísticas:
- Total de buques en base de datos
- Total de cruceros programados
- Distribución por clase (A/B/C)
- Cruceros por mes
- Top 5 agencias
- Gráficos de tendencias
```

---

### **4.3 ShipDatabase.tsx**
**Responsabilidad:** CRUD de buques, gestión de base de datos

```typescript
interface Ship {
  id: string;
  buque: string;      // Nombre del buque
  bandera: string;    // País de bandera
  imo: string;        // Número IMO
  eslora: number;     // Eslora en metros
  manga: number;      // Manga en metros
  puntal: number;     // Puntal en metros
  calado: number;     // Calado en metros
  agencia: string;    // Agencia marítima
}

Funcionalidades:
- Agregar/Editar/Eliminar buques
- Búsqueda y filtrado (clase, agencia)
- Clasificación automática (A/B/C)
- Validación de datos
- Eliminar todos (con doble confirmación)
```

---

### **4.4 CrossingManagerSimple2.tsx**
**Responsabilidad:** Gestión de cruceros, conflictos, filtros

```typescript
interface ShipCrossing {
  id: string;
  numero: number;
  ship: Ship;
  diaEntrada: Date;
  horaEntrada: string;
  diaSalida: Date;
  horaSalida: string;
  situation: SituationStatus;  // SIN CONFIRMAR | CONFIRMADO | CANCELADO
  entry: EntryTimes;           // Tiempos de entrada calculados
  exit: ExitTimes;             // Tiempos de salida calculados
  fm?: string;                 // Fondeadero/Muelle
  to?: string;                 // Turnaround
  notes?: string;              // Observaciones
}

Funcionalidades:
- Agregar/Editar/Eliminar cruceros
- Cálculo automático de tiempos de tránsito
- Detección de conflictos en KM 118.5
- Resolución sugerida de conflictos
- Filtros avanzados (fecha, clase, agencia, estado)
- Importación CSV/Excel
- Exportación JSON
- Generación de Reporte A3 profesional
- Notificaciones de cruceros próximos (24-48h)
```

---

### **4.5 ChannelReservations.tsx**
**Responsabilidad:** Gestión de reservas de canal (CPI y ACC)

```typescript
interface Reservation {
  cruiseId: string;
  buque: string;
  clase: string;        // A, B, C
  agencia: string;
  
  // Entrada
  reservaCPIEntrada: string;  // 6h antes (A) o 5.5h antes (B)
  reservaACCEntrada: string;  // 2.5h (A), 2h (B), 1h (C) antes
  
  // Salida
  reservaACCSalida: string;   // 2.5h (A), 2h (B), 1h (C) antes
  reservaCPISalida: string;   // 6h antes (A) o 5.5h antes (B)
  
  // Flags de edición manual
  manualCPIEntrada?: boolean;
  manualACCEntrada?: boolean;
  manualACCSalida?: boolean;
  manualCPISalida?: boolean;
}

Funcionalidades:
- Cálculo automático sincronizado con cruceros
- Edición manual de reservas
- Historial de cambios
- Estadísticas de clausura (horas CPI/ACC)
- Exportación CSV y PDF
- Búsqueda y filtrado
```

---

### **4.6 UpcomingAlerts.tsx** ⭐ NUEVO
**Responsabilidad:** Alertas de cruceros próximos

```typescript
interface UpcomingAlertsProps {
  crossings: ShipCrossing[];
}

Funcionalidades:
- Detecta cruceros en próximas 48 horas
- Distingue urgentes (≤24h) vs próximos (24-48h)
- Cuenta regresiva de horas
- Visual destacado (amarillo para urgentes, azul para próximos)
- Solo se muestra si hay alertas
```

---

<a name="logica"></a>
## ⚙️ **5. LÓGICA DE NEGOCIO (ships.ts)**

### **5.1 Clasificación de Buques**

```typescript
export function getShipClass(calado: number): 'A' | 'B' | 'C' {
  if (calado >= 8.84) return 'A';
  if (calado > 7.32) return 'B';
  return 'C';
}
```

**Criterios:**
- **Clase A:** Calado ≥ 8.84m (Navega hasta KM 239)
- **Clase B:** Calado 7.33-8.83m (Navega hasta KM 216)
- **Clase C:** Calado ≤ 7.32m (Navega hasta KM 59)

---

### **5.2 Cálculo de Tiempos de Entrada**

```typescript
export function calculateEntryTimes(ship: Ship, entryDateTime: Date): EntryTimes {
  const clase = getShipClass(ship.calado);
  const etd = entryDateTime;
  
  let km239, km216, km118_5, km59_in, km37, km7_3, etaPto;
  
  if (clase === 'A') {
    km239 = etd;
    km216 = addMinutes(km239, 60);      // +1h
    km118_5 = addMinutes(km216, 120);   // +2h
    km37 = addMinutes(km118_5, 180);    // +3h
    km7_3 = addMinutes(km37, 75);       // +1h 15min
    etaPto = addMinutes(km7_3, 30);     // +30min
    
  } else if (clase === 'B') {
    km216 = etd;
    km118_5 = addMinutes(km216, 120);   // +2h
    km37 = addMinutes(km118_5, 180);    // +3h
    km7_3 = addMinutes(km37, 75);       // +1h 15min
    etaPto = addMinutes(km7_3, 30);     // +30min
    
  } else { // Clase C
    km59_in = etd;
    km37 = addMinutes(km59_in, 60);     // +1h
    km7_3 = addMinutes(km37, 75);       // +1h 15min
    etaPto = addMinutes(km7_3, 30);     // +30min
  }
  
  return { km239, km216, km118_5, km59_in, km37, km7_3, etaPto };
}
```

---

### **5.3 Cálculo de Tiempos de Salida**

```typescript
export function calculateExitTimes(ship: Ship, exitDateTime: Date): ExitTimes {
  const clase = getShipClass(ship.calado);
  const etd = exitDateTime;
  
  let km59, km77, km118_5, km216, km239;
  
  if (clase === 'A') {
    const km7_3 = etd;
    km59 = addMinutes(km7_3, 120);      // +2h
    km77 = addMinutes(km59, 45);        // +45min
    km118_5 = addMinutes(km77, 105);    // +1h 45min
    km216 = addMinutes(km118_5, 120);   // +2h
    km239 = addMinutes(km216, 60);      // +1h
    
  } else if (clase === 'B') {
    const km7_3 = etd;
    km59 = addMinutes(km7_3, 120);      // +2h
    km77 = addMinutes(km59, 45);        // +45min
    km118_5 = addMinutes(km77, 105);    // +1h 45min
    km216 = addMinutes(km118_5, 120);   // +2h
    
  } else { // Clase C
    const km7_3 = etd;
    km59 = addMinutes(km7_3, 120);      // +2h
  }
  
  return { km59, km77, km118_5, km216, km239 };
}
```

---

### **5.4 Detección de Conflictos**

```typescript
export function detectCrossingConflicts(crossings: ShipCrossing[]): CrossingConflict[] {
  const conflicts: CrossingConflict[] = [];
  const MINIMUM_GAP_MINUTES = 60; // 1 hora mínima entre cruceros
  
  // Ordenar por fecha de entrada
  const sorted = [...crossings].sort((a, b) => 
    a.diaEntrada.getTime() - b.diaEntrada.getTime()
  );
  
  for (let i = 0; i < sorted.length; i++) {
    const entryShip = sorted[i];
    
    if (!entryShip.entry.km118_5) continue;
    
    // Buscar buques saliendo en la misma ventana
    for (let j = 0; j < sorted.length; j++) {
      if (i === j) continue;
      
      const exitShip = sorted[j];
      if (!exitShip.exit.km118_5) continue;
      
      const entryTime = entryShip.entry.km118_5.getTime();
      const exitTime = exitShip.exit.km118_5.getTime();
      const timeDiff = (entryTime - exitTime) / 60000; // minutos
      
      // Conflicto: buque entrante llega antes que saliente salga
      if (timeDiff > 0 && timeDiff < MINIMUM_GAP_MINUTES) {
        conflicts.push({
          entryShip,
          exitShip,
          timeDifference: timeDiff,
          suggestions: [
            // Sugerencia 1: Retrasar salida
            {
              action: 'delay-outgoing',
              shipName: exitShip.ship.buque,
              crossingId: exitShip.id,
              newDateTime: subMinutes(entryShip.entry.km118_5, MINIMUM_GAP_MINUTES),
              reason: `Retrasar salida ${Math.ceil(MINIMUM_GAP_MINUTES - timeDiff)} minutos`
            },
            // Sugerencia 2: Adelantar entrada
            {
              action: 'advance-incoming',
              shipName: entryShip.ship.buque,
              crossingId: entryShip.id,
              newDateTime: addMinutes(exitShip.exit.km118_5, MINIMUM_GAP_MINUTES),
              reason: `Adelantar entrada ${Math.ceil(MINIMUM_GAP_MINUTES - timeDiff)} minutos`
            }
          ]
        });
      }
    }
  }
  
  return conflicts;
}
```

---

### **5.5 Cálculo de Reservas**

```typescript
export function calculateReservations(cruises: Cruise[], shipsDB: Ship[]): Reservation[] {
  return cruises.map(cruise => {
    const shipData = shipsDB.find(s => s.id === cruise.ship.id);
    const calado = shipData?.calado || cruise.ship.calado;
    const clase = getShipClass(calado);
    
    const reservation: Reservation = {
      cruiseId: cruise.id,
      buque: cruise.ship.buque,
      clase: clase,
      agencia: cruise.ship.agencia,
      reservaCPIEntrada: '',
      reservaACCEntrada: '',
      reservaACCSalida: '',
      reservaCPISalida: '',
    };
    
    // Reserva CPI Entrada (Clase A: 6h antes, Clase B: 5.5h antes)
    if (cruise.horaEntrada && (clase === 'A' || clase === 'B')) {
      const etd = new Date(`${format(cruise.diaEntrada, 'yyyy-MM-dd')}T${cruise.horaEntrada}:00`);
      const horasAntes = clase === 'A' ? 6 : 5.5;
      const reserva = subHours(etd, horasAntes);
      reservation.reservaCPIEntrada = format(reserva, 'dd/MM/yyyy HH:mm');
    } else if (clase === 'C') {
      reservation.reservaCPIEntrada = 'No aplica';
    }
    
    // Reserva ACC Entrada (desde Amarre)
    if (cruise.entry.etaPto) {
      const amarre = cruise.entry.etaPto;
      let horasAntes = 1;
      if (clase === 'A') horasAntes = 2.5;
      else if (clase === 'B') horasAntes = 2;
      
      const reserva = subHours(amarre, horasAntes);
      reservation.reservaACCEntrada = format(reserva, 'dd/MM/yyyy HH:mm');
    }
    
    // Reserva ACC Salida (desde ETD Salida)
    if (cruise.horaSalida) {
      const etdSalida = new Date(`${format(cruise.diaSalida, 'yyyy-MM-dd')}T${cruise.horaSalida}:00`);
      let horasAntes = 1;
      if (clase === 'A') horasAntes = 2.5;
      else if (clase === 'B') horasAntes = 2;
      
      const reserva = subHours(etdSalida, horasAntes);
      reservation.reservaACCSalida = format(reserva, 'dd/MM/yyyy HH:mm');
    }
    
    // Reserva CPI Salida (desde KM 118.5 Salida)
    if (cruise.exit.km118_5 && (clase === 'A' || clase === 'B')) {
      const km118 = cruise.exit.km118_5;
      const horasAntes = clase === 'A' ? 6 : 5.5;
      const reserva = subHours(km118, horasAntes);
      reservation.reservaCPISalida = format(reserva, 'dd/MM/yyyy HH:mm');
    } else if (clase === 'C') {
      reservation.reservaCPISalida = 'No aplica';
    }
    
    return reservation;
  });
}
```

---

<a name="almacenamiento"></a>
## 💾 **6. ALMACENAMIENTO DE DATOS**

### **6.1 localStorage Keys**

```typescript
// Base de datos de buques
'ships_db': Ship[]

// Cruceros programados
'ship_crossings': ShipCrossing[]

// Reservas de canal
'channelReservations': Reservation[]

// Historial de cambios en reservas
'reservationHistory': ReservationHistory[]
```

### **6.2 Funciones de Persistencia**

```typescript
// Cargar
export function loadShips(): Ship[] {
  const data = localStorage.getItem('ships_db');
  return data ? JSON.parse(data) : [];
}

export function loadCrossings(): ShipCrossing[] {
  const data = localStorage.getItem('ship_crossings');
  if (!data) return [];
  
  // Parsear fechas
  const crossings: ShipCrossing[] = JSON.parse(data);
  return crossings.map(c => ({
    ...c,
    diaEntrada: new Date(c.diaEntrada),
    diaSalida: new Date(c.diaSalida),
    entry: {
      ...c.entry,
      km239: c.entry.km239 ? new Date(c.entry.km239) : undefined,
      // ... etc
    }
  }));
}

// Guardar
export function saveShips(ships: Ship[]): void {
  localStorage.setItem('ships_db', JSON.stringify(ships));
}

export function saveCrossings(crossings: ShipCrossing[]): void {
  localStorage.setItem('ship_crossings', JSON.stringify(crossings));
}
```

---

<a name="funcionalidades"></a>
## 🎯 **7. FUNCIONALIDADES CLAVE**

### **7.1 Importación de Datos**

**Formatos Soportados:**
- CSV (delimitador: `;` o `,`)
- Excel (.xlsx, .xls)
- JSON

**Proceso:**
1. Detectar formato automáticamente
2. Parsear headers (normalización)
3. Buscar buque en base de datos
4. Validar datos obligatorios
5. Calcular tiempos automáticamente
6. Agregar a sistema
7. Detectar conflictos

**Columnas esperadas CSV:**
```
Buque, Fecha Entrada, Hora Entrada, Fecha Salida, Hora Salida, Situacion
```

---

### **7.2 Generación de Reportes A3**

**Características:**
- Formato A3 landscape
- Profesional para impresión
- Fuente Aptos (compatible con MS Office)
- Colores corporativos
- Incluye:
  - Header con logo y fecha
  - Tabla completa de cruceros
  - Datos de reservas integrados
  - Clasificación por colores (A/B/C)
  - Información técnica de buques
  - Footer con contacto

**Generación:**
```typescript
const html = generateCrossingReport(crossings, ships, reservations);
const blob = new Blob([html], { type: 'text/html' });
window.open(URL.createObjectURL(blob), '_blank');
```

---

### **7.3 Sistema de Búsqueda y Filtros**

**Búsqueda Global:**
- Busca en: nombre, IMO, agencia, bandera
- Instantánea (onChange)
- Propagada a todos los componentes

**Filtros Avanzados:**
- Rango de fechas
- Clase de buque
- Agencia marítima
- Estado de confirmación
- Combinables entre sí

**Implementación:**
```typescript
const filteredCrossings = sortedCrossings.filter(crossing => {
  if (globalSearch) {
    const searchLower = globalSearch.toLowerCase();
    const matchesSearch = 
      crossing.ship.buque.toLowerCase().includes(searchLower) ||
      crossing.ship.imo.toLowerCase().includes(searchLower) ||
      crossing.ship.agencia.toLowerCase().includes(searchLower) ||
      crossing.ship.bandera.toLowerCase().includes(searchLower);
    
    if (!matchesSearch) return false;
  }
  
  // Aplicar otros filtros...
  return true;
});
```

---

### **7.4 Sistema de Notificaciones**

**UpcomingAlerts:**
```typescript
const now = new Date();
const in24Hours = addHours(now, 24);
const in48Hours = addHours(now, 48);

const upcomingCrossings = crossings.filter(crossing => {
  const entryTime = crossing.diaEntrada;
  return isBefore(now, entryTime) && isBefore(entryTime, in48Hours);
});

upcomingCrossings.forEach(crossing => {
  const hoursUntilArrival = differenceInHours(crossing.diaEntrada, now);
  const isUrgent = hoursUntilArrival <= 24;
  
  // Mostrar alerta con estilo correspondiente
});
```

---

<a name="api"></a>
## 🌐 **8. API Y ENDPOINTS**

### **8.1 Download Template Endpoint**

**Archivo:** `src/pages/api/download-template.ts`

```typescript
import type { APIRoute } from 'astro';
import { getExcelTemplate } from '../../lib/excelTemplate';

export const GET: APIRoute = async () => {
  const template = getExcelTemplate();
  
  return new Response(template, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv;charset=utf-8',
      'Content-Disposition': 'attachment; filename="plantilla_cruceros.csv"'
    }
  });
};
```

**URL:** `/api/download-template`

**Respuesta:** Archivo CSV con plantilla de importación

---

<a name="despliegue"></a>
## 🚀 **9. DESPLIEGUE**

### **9.1 Entorno de Desarrollo**

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Acceder en:
http://localhost:4321
```

### **9.2 Build de Producción**

```bash
# Compilar para producción
npm run build

# Preview local
npm run preview
```

### **9.3 Deploy a Cloudflare Workers**

```bash
# Deploy directo
npx wrangler deploy

# O con npm script
npm run deploy
```

**Configuración en `wrangler.jsonc`:**
```json
{
  "name": "cruise-management-system",
  "main": "./dist/_worker.js",
  "compatibility_date": "2024-01-01",
  "kv_namespaces": [
    {
      "binding": "SESSION",
      "id": "your-kv-namespace-id"
    }
  ]
}
```

### **9.4 Variables de Entorno**

```bash
# .env
PUBLIC_BASE_URL=/
WEBFLOW_CMS_SITE_API_TOKEN=optional
WEBFLOW_API_HOST=optional
```

---

<a name="mantenimiento"></a>
## 🔧 **10. MANTENIMIENTO Y EXTENSIBILIDAD**

### **10.1 Agregar Nueva Funcionalidad**

**Ejemplo: Agregar campo "Captain" a Ship**

1. **Actualizar interfaz en `ships.ts`:**
```typescript
export interface Ship {
  // ... campos existentes
  captain?: string; // NUEVO
}
```

2. **Actualizar formulario en `ShipDatabase.tsx`:**
```typescript
const [formData, setFormData] = useState({
  // ... campos existentes
  captain: '' // NUEVO
});
```

3. **Actualizar validaciones y guardado**

4. **Actualizar tabla de visualización**

---

### **10.2 Agregar Nuevo Reporte**

1. Crear función en `ships.ts`:
```typescript
export function generateCustomReport(data: any[]): string {
  // Generar HTML del reporte
  return htmlString;
}
```

2. Agregar botón en componente correspondiente

3. Llamar a función y abrir en nueva ventana

---

### **10.3 Migracion a Base de Datos Real**

**Pasos recomendados:**

1. **Elegir BD:** PostgreSQL, MySQL, MongoDB

2. **Crear esquemas/tablas:**
```sql
CREATE TABLE ships (
  id UUID PRIMARY KEY,
  buque VARCHAR(255) NOT NULL,
  imo VARCHAR(20) UNIQUE NOT NULL,
  calado DECIMAL(5,2) NOT NULL,
  -- ... etc
);

CREATE TABLE crossings (
  id UUID PRIMARY KEY,
  ship_id UUID REFERENCES ships(id),
  dia_entrada TIMESTAMP NOT NULL,
  -- ... etc
);
```

3. **Crear API REST:**
```typescript
// GET /api/ships
// POST /api/ships
// PUT /api/ships/:id
// DELETE /api/ships/:id
```

4. **Actualizar funciones de persistencia:**
```typescript
export async function loadShips(): Promise<Ship[]> {
  const response = await fetch('/api/ships');
  return response.json();
}

export async function saveShip(ship: Ship): Promise<void> {
  await fetch('/api/ships', {
    method: 'POST',
    body: JSON.stringify(ship)
  });
}
```

5. **Agregar autenticación (JWT, OAuth)**

6. **Implementar cache con Redis**

---

### **10.4 Testing**

**Unit Tests (Recomendado: Vitest)**

```typescript
import { describe, it, expect } from 'vitest';
import { getShipClass, calculateEntryTimes } from './ships';

describe('Ship Classification', () => {
  it('should classify ship as A when draft >= 8.84', () => {
    expect(getShipClass(9.0)).toBe('A');
  });
  
  it('should classify ship as B when draft between 7.33 and 8.83', () => {
    expect(getShipClass(8.0)).toBe('B');
  });
  
  it('should classify ship as C when draft <= 7.32', () => {
    expect(getShipClass(7.0)).toBe('C');
  });
});

describe('Entry Time Calculations', () => {
  it('should calculate correct entry times for Class A ship', () => {
    const ship: Ship = {
      id: '1',
      buque: 'Test Ship',
      calado: 9.0,
      // ... otros campos
    };
    
    const entryDateTime = new Date('2026-01-20T08:00:00');
    const times = calculateEntryTimes(ship, entryDateTime);
    
    expect(times.km239).toEqual(entryDateTime);
    expect(times.km216).toEqual(addMinutes(entryDateTime, 60));
    // ... más assertions
  });
});
```

**Integration Tests**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ShipDatabase } from './ShipDatabase';

describe('ShipDatabase Component', () => {
  it('should add new ship when form is submitted', async () => {
    render(<ShipDatabase />);
    
    fireEvent.click(screen.getByText('Agregar Buque'));
    
    fireEvent.change(screen.getByLabelText('Buque'), {
      target: { value: 'Celebrity Eclipse' }
    });
    
    fireEvent.change(screen.getByLabelText('IMO'), {
      target: { value: '9404314' }
    });
    
    fireEvent.click(screen.getByText('Guardar'));
    
    expect(await screen.findByText('Celebrity Eclipse')).toBeInTheDocument();
  });
});
```

---

## 📊 **11. MÉTRICAS Y MONITOREO**

### **11.1 Métricas Recomendadas**

```typescript
// Cloudflare Analytics
export interface Metrics {
  // Performance
  pageLoadTime: number;
  apiResponseTime: number;
  
  // Usage
  activeUsers: number;
  dailyCrossings: number;
  conflictsDetected: number;
  
  // Errors
  errorRate: number;
  failedImports: number;
}
```

### **11.2 Logging**

```typescript
// Implementar logger centralizado
export class Logger {
  static info(message: string, data?: any) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data);
  }
  
  static error(message: string, error: Error) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
    // Enviar a servicio de monitoreo (Sentry, LogRocket, etc.)
  }
}
```

---

## 🔐 **12. SEGURIDAD**

### **12.1 Validación de Datos**

```typescript
import { z } from 'zod';

const ShipSchema = z.object({
  buque: z.string().min(1, 'Nombre requerido'),
  imo: z.string().regex(/^\d{7}$/, 'IMO debe ser 7 dígitos'),
  calado: z.number().min(0).max(20, 'Calado inválido'),
  // ... más validaciones
});

export function validateShip(data: unknown): Ship {
  return ShipSchema.parse(data);
}
```

### **12.2 Sanitización**

```typescript
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Prevenir XSS básico
    .substring(0, 255);   // Limitar longitud
}
```

### **12.3 Rate Limiting (Cloudflare)**

```typescript
// En wrangler.jsonc
{
  "rate_limiting": {
    "enabled": true,
    "threshold": 100,
    "period": 60
  }
}
```

---

## 📚 **13. REFERENCIAS Y RECURSOS**

### **Documentación Oficial**
- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Cloudflare Workers](https://developers.cloudflare.com/workers)
- [date-fns Documentation](https://date-fns.org)

### **Librerías Utilizadas**
- [Lucide Icons](https://lucide.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Zod Validation](https://zod.dev)
- [React Hook Form](https://react-hook-form.com)

---

## 📞 **14. CONTACTO Y SOPORTE**

**Desarrollador:** Alfredo Jesús Zappa  
**Email:** alfredojesus.zappa@gmail.com  
**GitHub:** (si aplica)  
**Documentación:** Ver `/DOCS` en el repositorio

---

## 📝 **15. CHANGELOG**

### **v1.0.0 - Enero 2026**
- ✅ Sistema completo de gestión de cruceros
- ✅ CRUD de buques y cruceros
- ✅ Cálculo automático de tiempos
- ✅ Detección y resolución de conflictos
- ✅ Sistema de reservas de canal
- ✅ Importación CSV/Excel
- ✅ Reporte A3 profesional
- ✅ Búsqueda global
- ✅ Filtros avanzados
- ✅ Notificaciones de cruceros próximos

---

## ✅ **CONCLUSIÓN**

Este sistema representa una solución completa y profesional para la gestión de cruceros oceánicos en el Canal Punta Indio. 

**Ventajas Técnicas:**
- 🚀 Rápido (Astro + Cloudflare)
- 🎨 Moderno (React + TypeScript)
- 📱 Responsive (Mobile-friendly)
- 🔒 Seguro (Validaciones + Sanitización)
- 🧩 Extensible (Arquitectura modular)
- 📊 Escalable (Fácil migración a BD real)

**Recomendaciones Futuras:**
1. Migrar a base de datos real (PostgreSQL)
2. Implementar autenticación de usuarios
3. Agregar tests automatizados (Vitest + Playwright)
4. Integrar con APIs de tracking marítimo
5. Implementar notificaciones push/email
6. Crear app móvil (React Native)

---

**© 2026 Sistema de Gestión de Cruceros Oceánicos**  
*Documentación Técnica - Versión 1.0*
