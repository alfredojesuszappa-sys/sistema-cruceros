# 🔐 RESPALDO DE CÓDIGO CLAVE - SISTEMA DE CRUCEROS

**Fecha:** 15 de Enero, 2026  
**Propósito:** Backup de las partes críticas del código funcional

---

## 📌 ARCHIVOS PRINCIPALES

### 1. src/pages/index.astro
```astro
---
import MainLayout from '../layouts/main.astro';
import { CrossingManagerSimple2 } from '../components/CrossingManagerSimple2';
---

<MainLayout>
<CrossingManagerSimple2 client:only="react" />
</MainLayout>

<script>
console.log('📄 index.astro loaded - CrossingManagerSimple2');
</script>
```

---

## 📊 CLASIFICACIÓN DE BUQUES

### Función de Clasificación (ships.ts)
```typescript
export function getShipClass(calado: number): 'A' | 'B' | 'C' {
  if (calado >= 8.84) return 'A';
  if (calado > 7.32 && calado <= 8.83) return 'B';
  return 'C';
}

export function classifyShip(calado: number): { class: string; color: string; label: string } {
  if (calado >= 8.84) {
    return { 
      class: 'A', 
      color: '#ef4444', 
      label: 'Clase A - Calado ≥ 8.84 m' 
    };
  }
  if (calado > 7.32 && calado <= 8.83) {
    return { 
      class: 'B', 
      color: '#f59e0b', 
      label: 'Clase B - Calado 7.33-8.83 m' 
    };
  }
  return { 
    class: 'C', 
    color: '#22c55e', 
    label: 'Clase C - Calado ≤ 7.32 m' 
  };
}
```

---

## 💾 FUNCIONES DE ALMACENAMIENTO

### LocalStorage Management (ships.ts)
```typescript
// SHIPS
export function loadShips(): Ship[] {
  if (typeof window === 'undefined') return initialShips;
  const stored = localStorage.getItem('ships');
  return stored ? JSON.parse(stored) : initialShips;
}

export function saveShips(ships: Ship[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ships', JSON.stringify(ships));
}

// CROSSINGS
export function loadCrossings(): ShipCrossing[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('shipCrossings');
  if (!stored) return [];
  
  const crossings = JSON.parse(stored);
  return crossings.map((c: any) => ({
    ...c,
    entry: {
      ...c.entry,
      km118_5: new Date(c.entry.km118_5)
    },
    exit: {
      ...c.exit,
      km118_5: new Date(c.exit.km118_5)
    }
  }));
}

export function saveCrossings(crossings: ShipCrossing[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('shipCrossings', JSON.stringify(crossings));
}

// MOVEMENTS
export function loadMovements(): ShipMovement[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('shipMovements');
  if (!stored) return [];
  
  const movements = JSON.parse(stored);
  return movements.map((m: any) => ({
    ...m,
    fechaAmarre: m.fechaAmarre ? new Date(m.fechaAmarre) : undefined,
    fechaZarpada: m.fechaZarpada ? new Date(m.fechaZarpada) : undefined
  }));
}

export function saveMovements(movements: ShipMovement[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('shipMovements', JSON.stringify(movements));
}
```

---

## 📈 CÁLCULO DE ESTADÍSTICAS

### Movement Stats (ships.ts)
```typescript
export function getMovementStats() {
  const movements = loadMovements();
  
  // Buques en puerto = con fecha amarre pero SIN fecha zarpada
  const shipsInPort = movements.filter(
    m => m.fechaAmarre && !m.fechaZarpada
  ).length;
  
  // Total de pasajeros
  const totalPassengersIn = movements.reduce(
    (sum, m) => sum + (m.pasajerosIngresados || 0), 
    0
  );
  
  const totalPassengersOut = movements.reduce(
    (sum, m) => sum + (m.pasajerosEgresados || 0), 
    0
  );
  
  // Total de arribos (todos con fecha de amarre)
  const totalArrivals = movements.filter(m => m.fechaAmarre).length;
  
  return {
    shipsInPort,
    totalPassengersIn,
    totalPassengersOut,
    totalArrivals
  };
}
```

---

## 🎨 ESTILOS CLAVE

### Select con opciones visibles
```typescript
<select
  value={selectedShipId}
  onChange={(e) => setSelectedShipId(e.target.value)}
  style={{
    width: '100%',
    padding: '10px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    color: 'white',
    fontSize: '14px'
  }}
>
  <option value="" style={{ background: '#1e3a8a', color: 'white' }}>
    Seleccionar buque...
  </option>
  {ships.map(ship => (
    <option 
      key={ship.id} 
      value={ship.id} 
      style={{ background: '#1e3a8a', color: 'white' }}
    >
      {ship.buque} - {ship.agencia}
    </option>
  ))}
</select>
```

### Card con efecto hover
```typescript
<div style={{
  background: 'rgba(59, 130, 246, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  padding: '24px',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer'
}}
onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'translateY(-4px)';
  e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.boxShadow = 'none';
}}>
  {/* Contenido */}
</div>
```

### Gradiente de fondo principal
```typescript
<div style={{
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
  padding: '10px 20px 20px',
  fontFamily: "'Inter', 'Segoe UI', sans-serif"
}}>
```

---

## 🕐 MANEJO DE FECHAS

### Fecha de Buenos Aires (UTC-3)
```typescript
const getBuenosAiresTime = (): Date => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const buenosAires = new Date(utc + (3600000 * -3)); // UTC-3
  return buenosAires;
};

const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTimeForInput = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
```

### Formateo con date-fns
```typescript
import { format } from 'date-fns';

// Fecha y hora
format(movement.fechaAmarre, 'dd/MM/yyyy HH:mm')

// Solo fecha
format(new Date(), 'yyyy-MM-dd')

// Para archivos
format(new Date(), 'yyyy-MM-dd_HHmm')
```

---

## ✅ VALIDACIONES

### Validación de formulario de crucero
```typescript
const validateForm = (): boolean => {
  const errors: string[] = [];

  if (!selectedShipId) {
    errors.push('⚠️ Debe seleccionar un buque');
  }
  if (!diaEntrada) {
    errors.push('⚠️ Debe ingresar fecha de entrada');
  }
  if (!horaEntrada) {
    errors.push('⚠️ Debe ingresar hora de entrada (formato 24H)');
  }
  if (!diaSalida) {
    errors.push('⚠️ Debe ingresar fecha de salida');
  }
  if (!horaSalida) {
    errors.push('⚠️ Debe ingresar hora de salida (formato 24H)');
  }

  if (diaEntrada && horaEntrada && diaSalida && horaSalida) {
    const entryDateTime = new Date(`${diaEntrada}T${horaEntrada}:00`);
    const exitDateTime = new Date(`${diaSalida}T${horaSalida}:00`);
    
    if (isNaN(entryDateTime.getTime())) {
      errors.push('⚠️ Fecha/hora de entrada inválida');
    }
    if (isNaN(exitDateTime.getTime())) {
      errors.push('⚠️ Fecha/hora de salida inválida');
    }
    
    if (exitDateTime <= entryDateTime) {
      errors.push('⚠️ La fecha/hora de salida debe ser posterior a la de entrada');
    }

    const diffHours = (exitDateTime.getTime() - entryDateTime.getTime()) / (1000 * 60 * 60);
    if (diffHours > 168) {
      errors.push('⚠️ La duración del crucero excede 7 días. Verifique las fechas.');
    }
  }

  setValidationErrors(errors);
  return errors.length === 0;
};
```

---

## 🔄 CRUD OPERATIONS

### Add Crossing
```typescript
export function addCrossing(crossingData: Omit<ShipCrossing, 'id' | 'numero'>): ShipCrossing {
  const crossings = loadCrossings();
  
  const newCrossing: ShipCrossing = {
    id: generateId(),
    numero: crossings.length + 1,
    ...crossingData
  };
  
  crossings.push(newCrossing);
  saveCrossings(crossings);
  
  return newCrossing;
}
```

### Add Movement
```typescript
export function addMovement(movementData: Omit<ShipMovement, 'id'>): ShipMovement {
  const movements = loadMovements();
  
  const newMovement: ShipMovement = {
    id: generateId(),
    ...movementData
  };
  
  movements.push(newMovement);
  saveMovements(movements);
  
  return newMovement;
}
```

### Update Movement
```typescript
export function updateMovement(
  id: string, 
  updates: Partial<Omit<ShipMovement, 'id'>>
): void {
  const movements = loadMovements();
  const index = movements.findIndex(m => m.id === id);
  
  if (index !== -1) {
    movements[index] = { ...movements[index], ...updates };
    saveMovements(movements);
  }
}
```

### Delete Movement
```typescript
export function deleteMovement(id: string): void {
  const movements = loadMovements();
  const filtered = movements.filter(m => m.id !== id);
  saveMovements(filtered);
}
```

---

## 📤 EXPORT/IMPORT

### Export to JSON
```typescript
const exportData = () => {
  const dataStr = JSON.stringify(crossings, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `cruceros_${format(new Date(), 'yyyy-MM-dd_HHmm')}.json`;
  link.click();
  URL.revokeObjectURL(url);
};
```

### Import from Excel/CSV
```typescript
const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target?.result as string;
    const rows = text.split('\n').map(row => row.split(','));
    
    // Omitir primera fila (headers)
    const dataRows = rows.slice(1);
    
    const newShips: Ship[] = dataRows
      .filter(row => row.length >= 8 && row[0].trim())
      .map(row => ({
        id: generateId(),
        buque: row[0].trim(),
        bandera: row[1].trim(),
        imo: row[2].trim(),
        eslora: parseFloat(row[3]) || 0,
        manga: parseFloat(row[4]) || 0,
        puntal: parseFloat(row[5]) || 0,
        calado: parseFloat(row[6]) || 0,
        agencia: row[7].trim()
      }));
    
    if (newShips.length > 0) {
      const allShips = [...ships, ...newShips];
      saveShips(allShips);
      setShips(allShips);
      alert(`✅ ${newShips.length} buques importados exitosamente`);
    }
  };
  
  reader.readAsText(file);
  e.target.value = '';
};
```

---

## 🎯 NAVIGATION TABS

### Tab System
```typescript
type TabType = 'dashboard' | 'crossings' | 'database';

const [activeTab, setActiveTab] = useState<TabType>('dashboard');

// Botón de tab
<button
  onClick={() => setActiveTab('dashboard')}
  style={{
    padding: '12px 24px',
    background: activeTab === 'dashboard' 
      ? 'rgba(96, 165, 250, 0.3)' 
      : 'transparent',
    border: activeTab === 'dashboard' 
      ? '2px solid rgba(96, 165, 250, 0.5)' 
      : '2px solid transparent',
    borderRadius: '12px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s'
  }}
>
  <LayoutDashboard size={20} />
  Dashboard
</button>

// Renderizado condicional
{activeTab === 'dashboard' && (
  <div>
    <Statistics ships={ships} crossings={crossings} movementStats={movementStats} />
    <MovementManager onUpdate={loadAllData} />
  </div>
)}
```

---

## 🔢 GENERACIÓN DE IDs

### UUID Simple
```typescript
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
```

---

## 🎨 BADGE/CHIP COMPONENTS

### Status Badge
```typescript
<span style={{
  background: crossing.situation === 'CONFIRMADO' 
    ? 'rgba(34, 197, 94, 0.2)' 
    : crossing.situation === 'CANCELADO' 
    ? 'rgba(239, 68, 68, 0.2)' 
    : 'rgba(245, 158, 11, 0.2)',
  color: crossing.situation === 'CONFIRMADO' 
    ? '#4ade80' 
    : crossing.situation === 'CANCELADO' 
    ? '#f87171' 
    : '#fbbf24',
  padding: '4px 10px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '600'
}}>
  {crossing.situation === 'CONFIRMADO' ? '✅' : 
   crossing.situation === 'CANCELADO' ? '❌' : '🟡'} 
  {crossing.situation}
</span>
```

### Class Badge
```typescript
<span style={{
  background: shipClass === 'A' 
    ? 'rgba(239, 68, 68, 0.2)' 
    : shipClass === 'B' 
    ? 'rgba(245, 158, 11, 0.2)' 
    : 'rgba(34, 197, 94, 0.2)',
  color: shipClass === 'A' 
    ? '#ef4444' 
    : shipClass === 'B' 
    ? '#f59e0b' 
    : '#22c55e',
  padding: '4px 12px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: '700'
}}>
  {shipClass}
</span>
```

---

## 🔍 SEARCH AND FILTER

### Search Implementation
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [classFilter, setClassFilter] = useState<'ALL' | 'A' | 'B' | 'C'>('ALL');

const filteredShips = ships.filter(ship => {
  const matchesSearch = ship.buque.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       ship.agencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       ship.imo.includes(searchTerm);
  
  const matchesClass = classFilter === 'ALL' || getShipClass(ship.calado) === classFilter;
  
  return matchesSearch && matchesClass;
});
```

---

## 📊 TABLA RESPONSIVE

### Table Container
```typescript
<div style={{ overflowX: 'auto' }}>
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.2)' }}>
        <th style={{ 
          padding: '12px 8px', 
          textAlign: 'left', 
          color: '#93c5fd', 
          fontSize: '12px', 
          fontWeight: '600' 
        }}>
          COLUMNA
        </th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <tr
          key={item.id}
          style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <td style={{ padding: '12px 8px', color: 'white', fontSize: '14px' }}>
            {item.value}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

---

## 🌐 TIEMPO DE BUENOS AIRES

### Configuración de Zona Horaria
```typescript
// Argentina está en UTC-3
const BUENOS_AIRES_OFFSET = -3;

const getBuenosAiresTime = (): Date => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const buenosAires = new Date(utc + (3600000 * BUENOS_AIRES_OFFSET));
  return buenosAires;
};
```

---

✅ **TODOS LOS SNIPPETS CRÍTICOS RESPALDADOS**

Este documento contiene el código esencial para restaurar cualquier funcionalidad del sistema.
