import { format } from 'date-fns';




// Types
export interface Ship {
  id: string;
  buque: string;
  bandera: string;
  imo: string;
  eslora: number;
  manga: number;
  puntal: number;
  calado: number;
  agencia: string;
}

export type ShipClass = 'A' | 'B' | 'C';

export interface ShipClassification {
  class: ShipClass;
  description: string;
  color: string;
}

export type SituationStatus = 'SIN CONFIRMAR' | 'CONFIRMADO' | 'CANCELADO';

// Tiempos de navegación ENTRADA (en minutos)
export const ENTRY_TIMES = {
  KM239_TO_KM118_5: 280,  // 4:40:00
  KM216_TO_KM118_5: 250,  // 4:10:00
  KM118_5_TO_KM59: 150,   // 2:30:00 ⭐ AGREGADO - FALTABA ESTE TRAMO
  KM59_TO_KM37: 78,       // 1:18:00
  KM37_TO_KM7_3: 106,     // 1:46:00
  KM7_3_TO_KM0: 26,       // 0:26:00
  AMARRE: 30,             // 0:30:00
};

// Tiempos de navegación SALIDA (en minutos)
export const EXIT_TIMES = {
  KM0_TO_KM59: 200,       // 3:20:00
  KM59_TO_KM77: 105,      // 1:45:00
  KM77_TO_KM118_5: 105,   // 1:45:00
  KM118_5_TO_KM216: 270,  // 4:30:00
  KM118_5_TO_KM239: 300,  // 5:00:00
};

// Puntos kilométricos según dirección
export interface EntryKilometers {
  km239?: Date;      // Clase A
  km216?: Date;      // Clase B
  km59_in?: Date;    // Clase C (entrada)
  km29_entry?: Date; // Clase C - KM 29 entrada
  km118_5?: Date;    // Punto crítico
  km59?: Date;
  km37?: Date;
  km7_3?: Date;
  km0?: Date;
  etaPto?: Date;
  cpiEntry?: Date;   // Reserva CPI entrada
  accEntry?: Date;   // Reserva ACC entrada
}

export interface ExitKilometers {
  etdPto?: Date;
  km59?: Date;
  km77?: Date;
  km29_exit?: Date;  // Clase C - KM 29 salida
  km118_5?: Date;    // Punto crítico
  km216?: Date;      // Clase B
  km239?: Date;      // Clase A
  accExit?: Date;    // Reserva ACC salida
  cpiExit?: Date;    // Reserva CPI salida
}

export interface ShipCrossing {
  id: string;
  ship: Ship;
  diaEntrada: Date;        // Fecha de ENTRADA
  horaEntrada: string;     // Hora de inicio navegación ENTRADA (HH:mm)
  diaSalida: Date;         // Fecha de SALIDA (puede ser días después)
  horaSalida: string;      // ETD Puerto SALIDA (HH:mm)
  fm?: string;           // Fondeadero (MVD, STS, etc.)
  to?: string;           // Turn around info
  entry: EntryKilometers;
  exit: ExitKilometers;
  situation: SituationStatus;
  numero: number;
  notes?: string;
}

// Nueva estructura para registrar movimientos reales de los cruceros
export interface ShipMovement {
  id: string;
  shipId: string;           // Referencia al buque
  shipName: string;         // Nombre del buque (desnormalizado para facilidad)
  fechaAmarre?: Date;       // Fecha/hora real de amarre (cuando llega)
  fm?: string;              // Fondeadero/Muelle
  pasajerosIngresados?: number; // Cantidad de pasajeros que ingresaron
  fechaZarpada?: Date;      // Fecha/hora real de zarpada (cuando sale)
  to?: string;              // Turn around info
  pasajerosEgresados?: number;  // Cantidad de pasajeros que egresaron
  createdAt: Date;          // Fecha de creación del registro
  updatedAt: Date;          // Fecha de última actualización
}

export interface ConflictSuggestion {
  action: 'delay-outgoing' | 'advance-incoming';
  shipName: string;
  crossingId: string;
  newDateTime: Date;
  reason: string;
}

export interface CrossingConflict {
  entryShip: ShipCrossing;
  exitShip: ShipCrossing;
  conflictTime: Date;
  timeDifference: number;
  suggestions: ConflictSuggestion[];
}

// Funciones de clasificación (mantienen la lógica existente)
export function getShipClass(calado: number): ShipClass {
  if (calado >= 8.84) return 'A';
  if (calado > 7.32) return 'B';
  return 'C';
}

export function classifyShip(calado: number): ShipClassification {
  const shipClass = getShipClass(calado);
  
  const classifications: Record<ShipClass, ShipClassification> = {
    'A': {
      class: 'A',
      description: 'Clase A (≥8.84m)',
      color: 'red'
    },
    'B': {
      class: 'B',
      description: 'Clase B (7.33-8.83m)',
      color: 'amber'
    },
    'C': {
      class: 'C',
      description: 'Clase C (≤7.32m)',
      color: 'green'
    }
  };
  
  return classifications[shipClass];
}

// Función para sumar minutos a una fecha
function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

// Calcular todos los tiempos de ENTRADA
export function calculateEntryTimes(
  ship: Ship,
  startTime: Date
): EntryKilometers {
  const shipClass = getShipClass(ship.calado);
  const entry: EntryKilometers = {};

  switch (shipClass) {
    case 'A':
      entry.km239 = startTime;
      entry.km118_5 = addMinutes(startTime, ENTRY_TIMES.KM239_TO_KM118_5);
      entry.km59 = addMinutes(entry.km118_5, ENTRY_TIMES.KM118_5_TO_KM59); // ⭐ CORREGIDO
      entry.km37 = addMinutes(entry.km59, ENTRY_TIMES.KM59_TO_KM37);
      entry.km7_3 = addMinutes(entry.km37, ENTRY_TIMES.KM37_TO_KM7_3);
      entry.km0 = addMinutes(entry.km7_3, ENTRY_TIMES.KM7_3_TO_KM0);
      entry.etaPto = addMinutes(entry.km0, ENTRY_TIMES.AMARRE);
      break;

    case 'B':
      entry.km216 = startTime;
      entry.km118_5 = addMinutes(startTime, ENTRY_TIMES.KM216_TO_KM118_5);
      entry.km59 = addMinutes(entry.km118_5, ENTRY_TIMES.KM118_5_TO_KM59); // ⭐ CORREGIDO
      entry.km37 = addMinutes(entry.km59, ENTRY_TIMES.KM59_TO_KM37);
      entry.km7_3 = addMinutes(entry.km37, ENTRY_TIMES.KM37_TO_KM7_3);
      entry.km0 = addMinutes(entry.km7_3, ENTRY_TIMES.KM7_3_TO_KM0);
      entry.etaPto = addMinutes(entry.km0, ENTRY_TIMES.AMARRE);
      break;

    case 'C':
      // Clase C empieza en KM59 y va HACIA adentro (hacia KM0)
      // NO pasa por KM118.5 en la ENTRADA porque ya está más adentro del canal
      entry.km59_in = startTime;
      entry.km37 = addMinutes(startTime, ENTRY_TIMES.KM59_TO_KM37);
      entry.km7_3 = addMinutes(entry.km37, ENTRY_TIMES.KM37_TO_KM7_3);
      entry.km0 = addMinutes(entry.km7_3, ENTRY_TIMES.KM7_3_TO_KM0);
      entry.etaPto = addMinutes(entry.km0, ENTRY_TIMES.AMARRE);
      // Clase C NO tiene km118_5 en entrada porque empieza más adentro
      break;
  }

  return entry;
}

// Calcular todos los tiempos de SALIDA
export function calculateExitTimes(
  ship: Ship,
  etdPto: Date
): ExitKilometers {
  const shipClass = getShipClass(ship.calado);
  
  console.log('🚢 calculateExitTimes START:', {
    buque: ship.buque,
    clase: shipClass,
    etdPto: etdPto.toISOString(),
    etdPtoLocal: etdPto.toLocaleString('es-AR')
  });
  
  const exit: ExitKilometers = {
    etdPto
  };

  exit.km59 = addMinutes(etdPto, EXIT_TIMES.KM0_TO_KM59);
  console.log('  → KM59:', exit.km59.toLocaleString('es-AR'), `(+${EXIT_TIMES.KM0_TO_KM59} min)`);
  
  exit.km77 = addMinutes(exit.km59, EXIT_TIMES.KM59_TO_KM77);
  console.log('  → KM77:', exit.km77.toLocaleString('es-AR'), `(+${EXIT_TIMES.KM59_TO_KM77} min)`);
  
  exit.km118_5 = addMinutes(exit.km77, EXIT_TIMES.KM77_TO_KM118_5);
  console.log('  → KM118.5:', exit.km118_5.toLocaleString('es-AR'), `(+${EXIT_TIMES.KM77_TO_KM118_5} min)`);

  switch (shipClass) {
    case 'A':
      exit.km216 = addMinutes(exit.km118_5, EXIT_TIMES.KM118_5_TO_KM216);
      exit.km239 = addMinutes(exit.km118_5, EXIT_TIMES.KM118_5_TO_KM239);
      console.log('  → KM216:', exit.km216.toLocaleString('es-AR'));
      console.log('  → KM239:', exit.km239.toLocaleString('es-AR'));
      break;

    case 'B':
      exit.km216 = addMinutes(exit.km118_5, EXIT_TIMES.KM118_5_TO_KM216);
      console.log('  → KM216:', exit.km216.toLocaleString('es-AR'));
      break;

    case 'C':
      // Clase C termina en KM 59
      console.log('  → Clase C termina en KM 59');
      break;
  }
  
  console.log('🚢 calculateExitTimes END');

  return exit;
}

// Detectar conflictos de cruceros
export function detectCrossingConflicts(
  crossings: ShipCrossing[],
  safetyMarginMinutes: number = 30
): CrossingConflict[] {
  const conflicts: CrossingConflict[] = [];

  // Filtrar solo los confirmados o sin confirmar (excluir cancelados)
  const activeCrossings = crossings.filter(
    c => c.situation !== 'CANCELADO'
  );

  // Crear una lista de todos los pasos por KM 118.5 con su tipo (entry/exit)
  interface KM118Point {
    crossing: ShipCrossing;
    time: Date;
    type: 'entry' | 'exit';
  }

  const km118Points: KM118Point[] = [];

  for (const crossing of activeCrossings) {
    // Si pasa por KM 118.5 en ENTRADA, agregarlo
    if (crossing.entry.km118_5) {
      km118Points.push({
        crossing,
        time: crossing.entry.km118_5,
        type: 'entry'
      });
    }
    
    // Si pasa por KM 118.5 en SALIDA, agregarlo
    if (crossing.exit.km118_5) {
      km118Points.push({
        crossing,
        time: crossing.exit.km118_5,
        type: 'exit'
      });
    }
  }

  // Ordenar todos los puntos por tiempo
  km118Points.sort((a, b) => a.time.getTime() - b.time.getTime());

  console.log('🔍 Detectando conflictos en KM 118.5:', {
    totalCrossings: activeCrossings.length,
    totalKM118Points: km118Points.length,
    points: km118Points.map(p => ({
      buque: p.crossing.ship.buque,
      tipo: p.type,
      hora: format(p.time, 'dd/MM HH:mm')
    }))
  });

  // Comparar cada punto con todos los demás
  for (let i = 0; i < km118Points.length; i++) {
    for (let j = i + 1; j < km118Points.length; j++) {
      const point1 = km118Points[i];
      const point2 = km118Points[j];
      
      // No comparar el mismo crucero consigo mismo
      if (point1.crossing.id === point2.crossing.id) continue;

      const time1 = point1.time.getTime();
      const time2 = point2.time.getTime();
      
      // Calcular diferencia en minutos (siempre positiva)
      const timeDiff = Math.abs(time2 - time1) / 60000;

      console.log(`  Comparando: ${point1.crossing.ship.buque} (${point1.type}) vs ${point2.crossing.ship.buque} (${point2.type}): ${timeDiff.toFixed(0)} min`);

      // HAY CONFLICTO si la diferencia es menor al margen de seguridad
      if (timeDiff < safetyMarginMinutes) {
        console.log(`    ⚠️ CONFLICTO DETECTADO: ${timeDiff.toFixed(0)} min < ${safetyMarginMinutes} min`);
        
        const adjustmentNeeded = safetyMarginMinutes - timeDiff + 15; // +15 min extra de seguridad
        const suggestions: ConflictSuggestion[] = [];

        // Determinar qué tipo de conflicto es y generar sugerencias apropiadas
        if (point1.type === 'entry' && point2.type === 'entry') {
          // CONFLICTO: Dos entradas
          // Sugerencia 1: Adelantar la primera entrada
          const newEntryDateTime1 = new Date(point1.crossing.diaEntrada);
          const [entryHour1, entryMinute1] = point1.crossing.horaEntrada.split(':').map(Number);
          newEntryDateTime1.setHours(entryHour1, entryMinute1, 0, 0);
          const advancedEntry1 = addMinutes(newEntryDateTime1, -adjustmentNeeded);
          
          suggestions.push({
            action: 'advance-incoming',
            shipName: point1.crossing.ship.buque,
            crossingId: point1.crossing.id,
            newDateTime: advancedEntry1,
            reason: `Adelantar ${Math.ceil(adjustmentNeeded)} minutos la entrada de ${point1.crossing.ship.buque} para mantener ${safetyMarginMinutes} min de separación con ${point2.crossing.ship.buque}.`
          });

          // Sugerencia 2: Retrasar la segunda entrada
          const newEntryDateTime2 = new Date(point2.crossing.diaEntrada);
          const [entryHour2, entryMinute2] = point2.crossing.horaEntrada.split(':').map(Number);
          newEntryDateTime2.setHours(entryHour2, entryMinute2, 0, 0);
          const delayedEntry2 = addMinutes(newEntryDateTime2, adjustmentNeeded);
          
          suggestions.push({
            action: 'advance-incoming',
            shipName: point2.crossing.ship.buque,
            crossingId: point2.crossing.id,
            newDateTime: delayedEntry2,
            reason: `Retrasar ${Math.ceil(adjustmentNeeded)} minutos la entrada de ${point2.crossing.ship.buque} para mantener ${safetyMarginMinutes} min de separación con ${point1.crossing.ship.buque}.`
          });

        } else if (point1.type === 'exit' && point2.type === 'exit') {
          // CONFLICTO: Dos salidas
          // Sugerencia 1: Adelantar la primera salida
          const newExitDateTime1 = new Date(point1.crossing.diaSalida);
          const [exitHour1, exitMinute1] = point1.crossing.horaSalida.split(':').map(Number);
          newExitDateTime1.setHours(exitHour1, exitMinute1, 0, 0);
          const advancedExit1 = addMinutes(newExitDateTime1, -adjustmentNeeded);
          
          suggestions.push({
            action: 'delay-outgoing',
            shipName: point1.crossing.ship.buque,
            crossingId: point1.crossing.id,
            newDateTime: advancedExit1,
            reason: `Adelantar ${Math.ceil(adjustmentNeeded)} minutos la salida de ${point1.crossing.ship.buque} para mantener ${safetyMarginMinutes} min de separación con ${point2.crossing.ship.buque}.`
          });

          // Sugerencia 2: Retrasar la segunda salida
          const newExitDateTime2 = new Date(point2.crossing.diaSalida);
          const [exitHour2, exitMinute2] = point2.crossing.horaSalida.split(':').map(Number);
          newExitDateTime2.setHours(exitHour2, exitMinute2, 0, 0);
          const delayedExit2 = addMinutes(newExitDateTime2, adjustmentNeeded);
          
          suggestions.push({
            action: 'delay-outgoing',
            shipName: point2.crossing.ship.buque,
            crossingId: point2.crossing.id,
            newDateTime: delayedExit2,
            reason: `Retrasar ${Math.ceil(adjustmentNeeded)} minutos la salida de ${point2.crossing.ship.buque} para mantener ${safetyMarginMinutes} min de separación con ${point1.crossing.ship.buque}.`
          });

        } else {
          // CONFLICTO: Entrada vs Salida (o viceversa)
          const entryPoint = point1.type === 'entry' ? point1 : point2;
          const exitPoint = point1.type === 'exit' ? point1 : point2;
          
          // Sugerencia 1: Retrasar la salida
          const newExitDateTime = new Date(exitPoint.crossing.diaSalida);
          const [exitHour, exitMinute] = exitPoint.crossing.horaSalida.split(':').map(Number);
          newExitDateTime.setHours(exitHour, exitMinute, 0, 0);
          const delayedExit = addMinutes(newExitDateTime, adjustmentNeeded);
          
          suggestions.push({
            action: 'delay-outgoing',
            shipName: exitPoint.crossing.ship.buque,
            crossingId: exitPoint.crossing.id,
            newDateTime: delayedExit,
            reason: `Retrasar ${Math.ceil(adjustmentNeeded)} minutos la salida de ${exitPoint.crossing.ship.buque} para mantener ${safetyMarginMinutes} min de separación con ${entryPoint.crossing.ship.buque}.`
          });
          
          // Sugerencia 2: Adelantar la entrada
          const newEntryDateTime = new Date(entryPoint.crossing.diaEntrada);
          const [entryHour, entryMinute] = entryPoint.crossing.horaEntrada.split(':').map(Number);
          newEntryDateTime.setHours(entryHour, entryMinute, 0, 0);
          const advancedEntry = addMinutes(newEntryDateTime, -adjustmentNeeded);
          
          suggestions.push({
            action: 'advance-incoming',
            shipName: entryPoint.crossing.ship.buque,
            crossingId: entryPoint.crossing.id,
            newDateTime: advancedEntry,
            reason: `Adelantar ${Math.ceil(adjustmentNeeded)} minutos la entrada de ${entryPoint.crossing.ship.buque} para mantener ${safetyMarginMinutes} min de separación con ${exitPoint.crossing.ship.buque}.`
          });
        }

        // Agregar el conflicto (usar entry/exit ship basado en el tipo)
        // Para mantener compatibilidad con la estructura existente
        const entryShip = point1.type === 'entry' ? point1.crossing : point2.crossing;
        const exitShip = point1.type === 'exit' ? point1.crossing : point2.crossing;

        conflicts.push({
          entryShip,
          exitShip,
          conflictTime: new Date(Math.min(time1, time2)),
          timeDifference: timeDiff,
          suggestions
        });
      }
    }
  }

  console.log(`✅ Total de conflictos detectados: ${conflicts.length}`);

  return conflicts;
}

// Funciones de base de datos (mantienen la lógica existente)
const STORAGE_KEY = 'ships_database';

export function loadShips(): Ship[] {
  console.log('📚 loadShips() llamada');
  
  if (typeof window === 'undefined') {
    console.log('  → Entorno servidor, retornando datos iniciales');
    return getInitialShips();
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log('  → localStorage check:', stored ? `${stored.length} caracteres` : 'null');
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log('  → Buques parseados:', parsed.length);
        
        // Validate that we have actual data
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        } else {
          console.warn('  ⚠️ Datos vacíos o inválidos, reinicializando');
        }
      } catch (parseError) {
        console.error('  ❌ Error parseando JSON:', parseError);
      }
    }
    
    // If we get here, initialize with default data
    console.log('  → Inicializando con datos por defecto');
    const initialShips = getInitialShips();
    console.log('  → Total buques iniciales:', initialShips.length);
    
    saveShips(initialShips);
    console.log('  ✅ Datos guardados en localStorage');
    
    return initialShips;
  } catch (error) {
    console.error('❌ Error en loadShips():', error);
    // Fallback to initial ships even if localStorage fails
    return getInitialShips();
  }
}

export function saveShips(ships: Ship[]): void {
  if (typeof window === 'undefined') {
    console.warn('saveShips() llamada en servidor, ignorando');
    return;
  }
  
  try {
    const serialized = JSON.stringify(ships);
    localStorage.setItem(STORAGE_KEY, serialized);
    console.log('✅ saveShips() exitoso:', ships.length, 'buques');
  } catch (error) {
    console.error('❌ Error guardando buques:', error);
    throw error;
  }
}

export function addShip(ship: Omit<Ship, 'id'>): Ship {
  const ships = loadShips();
  const newShip: Ship = {
    ...ship,
    id: crypto.randomUUID()
  };
  ships.push(newShip);
  saveShips(ships);
  return newShip;
}

export function updateShip(id: string, updates: Partial<Ship>): void {
  const ships = loadShips();
  const index = ships.findIndex(s => s.id === id);
  if (index !== -1) {
    ships[index] = { ...ships[index], ...updates };
    saveShips(ships);
  }
}

export function deleteShip(id: string): void {
  const ships = loadShips();
  const filtered = ships.filter(s => s.id !== id);
  saveShips(filtered);
}

// Funciones para gestión de cruceros
const CROSSINGS_KEY = 'ship_crossings';

export function loadCrossings(): ShipCrossing[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(CROSSINGS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Convertir strings de fecha a objetos Date
      return parsed.map((c: any) => ({
        ...c,
        diaEntrada: new Date(c.diaEntrada),
        diaSalida: new Date(c.diaSalida),
        entry: {
          ...c.entry,
          km239: c.entry.km239 ? new Date(c.entry.km239) : undefined,
          km216: c.entry.km216 ? new Date(c.entry.km216) : undefined,
          km59_in: c.entry.km59_in ? new Date(c.entry.km59_in) : undefined,
          km118_5: c.entry.km118_5 ? new Date(c.entry.km118_5) : undefined,
          km59: c.entry.km59 ? new Date(c.entry.km59) : undefined,
          km37: c.entry.km37 ? new Date(c.entry.km37) : undefined,
          km7_3: c.entry.km7_3 ? new Date(c.entry.km7_3) : undefined,
          km0: c.entry.km0 ? new Date(c.entry.km0) : undefined,
          etaPto: c.entry.etaPto ? new Date(c.entry.etaPto) : undefined,
        },
        exit: {
          ...c.exit,
          etdPto: c.exit.etdPto ? new Date(c.exit.etdPto) : undefined,
          km59: c.exit.km59 ? new Date(c.exit.km59) : undefined,
          km77: c.exit.km77 ? new Date(c.exit.km77) : undefined,
          km118_5: c.exit.km118_5 ? new Date(c.exit.km118_5) : undefined,
          km216: c.exit.km216 ? new Date(c.exit.km216) : undefined,
          km239: c.exit.km239 ? new Date(c.exit.km239) : undefined,
        }
      }));
    } catch (e) {
      console.error('Error loading crossings:', e);
    }
  }
  
  // Si no hay datos, crear un crucero de ejemplo
  const exampleCrossings = getExampleCrossings();
  if (exampleCrossings.length > 0) {
    saveCrossings(exampleCrossings);
    return exampleCrossings;
  }
  
  return [];
}

// Función para generar cruceros de ejemplo CON CONFLICTOS
function getExampleCrossings(): ShipCrossing[] {
  const ships = getInitialShips();
  const mscSeaview = ships.find(s => s.buque === 'MSC SEAVIEW'); // Clase A
  const norwegianStar = ships.find(s => s.buque === 'NORWEGIAN STAR'); // Clase B
  const insignia = ships.find(s => s.buque === 'INSIGNIA'); // Clase C
  
  const exampleCrossings: ShipCrossing[] = [];
  
  // CRUCERO 1: MSC SEAVIEW (Clase A) - ENTRADA
  // Inicia navegación el 29/01/2026 a las 10:00
  if (mscSeaview) {
    const entryDate1 = new Date('2026-01-29T10:00:00');
    const exitDate1 = new Date('2026-01-31T14:00:00');
    
    exampleCrossings.push({
      id: crypto.randomUUID(),
      ship: mscSeaview,
      diaEntrada: new Date('2026-01-29'),
      horaEntrada: '10:00',
      diaSalida: new Date('2026-01-31'),
      horaSalida: '14:00',
      situation: 'CONFIRMADO',
      numero: 1,
      entry: calculateEntryTimes(mscSeaview, entryDate1),
      exit: calculateExitTimes(mscSeaview, exitDate1),
      notes: 'Crucero de prueba A - Genera conflicto con Norwegian Star'
    });
  }
  
  // CRUCERO 2: NORWEGIAN STAR (Clase B) - SALIDA
  // Sale del puerto el 29/01/2026 a las 14:00
  // ESTO GENERA CONFLICTO: Su ETD en KM 118.5 será aprox. 29/01 a las 20:15
  // mientras que MSC Seaview llega a KM 118.5 a las 14:40 (mismo día)
  if (norwegianStar) {
    const entryDate2 = new Date('2026-01-27T08:00:00');
    const exitDate2 = new Date('2026-01-29T14:00:00');
    
    exampleCrossings.push({
      id: crypto.randomUUID(),
      ship: norwegianStar,
      diaEntrada: new Date('2026-01-27'),
      horaEntrada: '08:00',
      diaSalida: new Date('2026-01-29'),
      horaSalida: '14:00',
      situation: 'CONFIRMADO',
      numero: 2,
      entry: calculateEntryTimes(norwegianStar, entryDate2),
      exit: calculateExitTimes(norwegianStar, exitDate2),
      notes: 'Crucero de prueba B - Conflicto con MSC Seaview en KM 118.5'
    });
  }
  
  // CRUCERO 3: INSIGNIA (Clase C) - ENTRADA
  // Inicia en KM 59 el 30/01/2026 a las 06:00
  // NO genera conflicto porque Clase C no pasa por KM 118.5 en entrada
  if (insignia) {
    const entryDate3 = new Date('2026-01-30T06:00:00');
    const exitDate3 = new Date('2026-02-01T10:00:00');
    
    exampleCrossings.push({
      id: crypto.randomUUID(),
      ship: insignia,
      diaEntrada: new Date('2026-01-30'),
      horaEntrada: '06:00',
      diaSalida: new Date('2026-02-01'),
      horaSalida: '10:00',
      situation: 'SIN CONFIRMAR',
      numero: 3,
      entry: calculateEntryTimes(insignia, entryDate3),
      exit: calculateExitTimes(insignia, exitDate3),
      notes: 'Crucero de prueba C - Clase C sin conflictos'
    });
  }
  
  console.log(`✅ ${exampleCrossings.length} cruceros de ejemplo creados con conflictos programados`);
  
  return exampleCrossings;
}

export function saveCrossings(crossings: ShipCrossing[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CROSSINGS_KEY, JSON.stringify(crossings));
}

export function addCrossing(crossing: Omit<ShipCrossing, 'id' | 'numero'>): ShipCrossing {
  const crossings = loadCrossings();
  const maxNumero = crossings.reduce((max, c) => Math.max(max, c.numero), 0);
  
  const newCrossing: ShipCrossing = {
    ...crossing,
    id: crypto.randomUUID(),
    numero: maxNumero + 1
  };
  
  crossings.push(newCrossing);
  saveCrossings(crossings);
  return newCrossing;
}

// Apply conflict resolution suggestion
export function applyResolution(
  crossingId: string, 
  newDateTime: Date,
  type: 'entry' | 'exit'
): void {
  const crossings = loadCrossings();
  const crossing = crossings.find(c => c.id === crossingId);
  
  if (!crossing) return;
  
  if (type === 'entry') {
    // Update entry date/time and recalculate all entry times
    crossing.diaEntrada = new Date(newDateTime);
    crossing.horaEntrada = format(newDateTime, 'HH:mm');
    
    // Recalcular todos los tiempos de entrada
    crossing.entry = calculateEntryTimes(crossing.ship, newDateTime);
  } else {
    // Update exit date/time and recalculate all exit times
    crossing.diaSalida = new Date(newDateTime);
    crossing.horaSalida = format(newDateTime, 'HH:mm');
    
    // Recalcular todos los tiempos de salida
    crossing.exit = calculateExitTimes(crossing.ship, newDateTime);
  }
  
  // Save the updated crossing
  saveCrossings(crossings);
}

export function updateCrossing(id: string, updates: Partial<ShipCrossing>): void {
  const crossings = loadCrossings();
  const index = crossings.findIndex(c => c.id === id);
  if (index !== -1) {
    crossings[index] = { ...crossings[index], ...updates };
    saveCrossings(crossings);
  }
}

export function deleteCrossing(id: string): void {
  const crossings = loadCrossings();
  const filtered = crossings.filter(c => c.id !== id);
  saveCrossings(filtered);
}

// Funciones para gestión de movimientos reales
const MOVEMENTS_KEY = 'ship_movements';

export function loadMovements(): ShipMovement[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(MOVEMENTS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return parsed.map((m: any) => ({
        ...m,
        fechaAmarre: m.fechaAmarre ? new Date(m.fechaAmarre) : undefined,
        fechaZarpada: m.fechaZarpada ? new Date(m.fechaZarpada) : undefined,
        createdAt: new Date(m.createdAt),
        updatedAt: new Date(m.updatedAt)
      }));
    } catch (e) {
      console.error('Error loading movements:', e);
    }
  }
  
  return [];
}

export function saveMovements(movements: ShipMovement[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(MOVEMENTS_KEY, JSON.stringify(movements));
}

export function addMovement(movement: Omit<ShipMovement, 'id' | 'createdAt' | 'updatedAt'>): ShipMovement {
  const movements = loadMovements();
  const now = new Date();
  
  const newMovement: ShipMovement = {
    ...movement,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now
  };
  
  movements.push(newMovement);
  saveMovements(movements);
  return newMovement;
}

export function updateMovement(id: string, updates: Partial<Omit<ShipMovement, 'id' | 'createdAt'>>): void {
  const movements = loadMovements();
  const index = movements.findIndex(m => m.id === id);
  if (index !== -1) {
    movements[index] = { 
      ...movements[index], 
      ...updates,
      updatedAt: new Date()
    };
    saveMovements(movements);
  }
}

export function deleteMovement(id: string): void {
  const movements = loadMovements();
  const filtered = movements.filter(m => m.id !== id);
  saveMovements(filtered);
}

// Calcular estadísticas de movimientos
export function getMovementStats() {
  const movements = loadMovements();
  
  // Buques en puerto: tienen fecha de amarre pero NO tienen fecha de zarpada
  const shipsInPort = movements.filter(m => m.fechaAmarre && !m.fechaZarpada).length;
  
  // Total de pasajeros ingresados
  const totalPassengersIn = movements.reduce((sum, m) => 
    sum + (m.pasajerosIngresados || 0), 0
  );
  
  // Total de pasajeros egresados
  const totalPassengersOut = movements.reduce((sum, m) => 
    sum + (m.pasajerosEgresados || 0), 0
  );
  
  // Total de arribos (movimientos con fecha de amarre)
  const totalArrivals = movements.filter(m => m.fechaAmarre).length;
  
  return {
    shipsInPort,
    totalPassengersIn,
    totalPassengersOut,
    totalArrivals
  };
}

// Exportar/Importar datos
export function exportData(): string {
  return JSON.stringify({
    ships: loadShips(),
    crossings: loadCrossings(),
    exportDate: new Date().toISOString()
  }, null, 2);
}

export function importData(jsonData: string): { success: boolean; error?: string } {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.ships && Array.isArray(data.ships)) {
      saveShips(data.ships);
    }
    
    if (data.crossings && Array.isArray(data.crossings)) {
      saveCrossings(data.crossings);
    }
    
    return { success: true };
  } catch (e) {
    return { 
      success: false, 
      error: e instanceof Error ? e.message : 'Error desconocido' 
    };
  }
}

// Datos iniciales (mantienen los 75 buques existentes)
function getInitialShips(): Ship[] {
  return [
    { id: '1', buque: 'MSC MUSICA', bandera: 'PANAMÁ', imo: '9320087', eslora: 293.80, manga: 32.20, puntal: 10.60, calado: 7.85, agencia: 'MSC' },
    { id: '2', buque: 'MSC SEAVIEW', bandera: 'MALTA', imo: '9745378', eslora: 323.36, manga: 44.00, puntal: 12.10, calado: 8.90, agencia: 'MSC' },
    { id: '3', buque: 'COSTA FAVOLOSA', bandera: 'ITALIA', imo: '9479852', eslora: 289.65, manga: 35.50, puntal: 14.18, calado: 8.30, agencia: 'NAVIJET' },
    { id: '4', buque: 'MSC POESIA', bandera: 'PANAMÁ', imo: '9387073', eslora: 293.80, manga: 32.20, puntal: 10.60, calado: 7.87, agencia: 'MSC' },
    { id: '5', buque: 'NORWEGIAN STAR', bandera: 'BAHAMAS', imo: '9195157', eslora: 294.13, manga: 44.00, puntal: 12.10, calado: 8.63, agencia: 'NAVIJET' },
    { id: '6', buque: 'MSC SPLENDIDA', bandera: 'PANAMÁ', imo: '9359806', eslora: 333.30, manga: 50.40, puntal: 18.00, calado: 8.90, agencia: 'MSC' },
    { id: '7', buque: 'COSTA DIADEMA', bandera: 'ITALIA', imo: '9636888', eslora: 306.00, manga: 50.00, puntal: 11.00, calado: 8.90, agencia: 'NAVIJET' },
    { id: '8', buque: 'MSC ARMONIA', bandera: 'PANAMÁ', imo: '9210141', eslora: 274.90, manga: 28.80, puntal: 12.90, calado: 8.00, agencia: 'MSC' },
    { id: '9', buque: 'MSC ORCHESTRA', bandera: 'PANAMÁ', imo: '9320099', eslora: 293.80, manga: 32.20, puntal: 10.60, calado: 7.87, agencia: 'MSC' },
    { id: '10', buque: 'SAPPHIRE PRINCESS', bandera: 'REINO UNIDO', imo: '9228186', eslora: 290.00, manga: 37.50, puntal: 20.51, calado: 8.05, agencia: 'GPS' },
    { id: '11', buque: 'OOSTERDAM', bandera: 'PAISES BAJOS', imo: '9221281', eslora: 285.00, manga: 57.80, puntal: 10.80, calado: 8.90, agencia: 'GPS' },
    { id: '12', buque: 'MAJESTIC PRINCESS', bandera: 'REINO UNIDO', imo: '9614141', eslora: 329.00, manga: 38.00, puntal: 11.00, calado: 8.90, agencia: 'GPS' },
    { id: '13', buque: 'COSTA DELIZIOSA', bandera: 'ITALIA', imo: '9398917', eslora: 294.00, manga: 32.25, puntal: 13.69, calado: 8.10, agencia: 'NAVIJET' },
    { id: '14', buque: 'MARINA', bandera: 'ISLAS MARSHALL', imo: '9438066', eslora: 239.30, manga: 32.20, puntal: 13.27, calado: 8.00, agencia: 'NAVIJET' },
    { id: '15', buque: 'QUEEN VICTORIA', bandera: 'BERMUDA', imo: '9320556', eslora: 294.00, manga: 36.00, puntal: 11.00, calado: 8.00, agencia: 'DELFINO' },
    { id: '16', buque: 'ARTANIA', bandera: 'BAHAMAS', imo: '8201480', eslora: 230.00, manga: 29.00, puntal: 12.00, calado: 8.00, agencia: 'NAVIJET' },
    { id: '17', buque: "L'AUSTRAL", bandera: 'WALLIS & FUTUNA', imo: '9502518', eslora: 127.00, manga: 18.00, puntal: 6.00, calado: 5.00, agencia: 'INCHCAPE' },
    { id: '18', buque: 'AIDASOL', bandera: 'ITALIA', imo: '9490040', eslora: 253.00, manga: 32.20, puntal: 9.30, calado: 7.50, agencia: 'NAVIJET' },
    { id: '19', buque: 'SH VEGA', bandera: 'MALTA', imo: '9895252', eslora: 113.50, manga: 20.02, puntal: 11.00, calado: 5.00, agencia: 'AMI' },
    { id: '20', buque: 'VIKING JUPITER', bandera: 'NORUEGA', imo: '9796262', eslora: 228.26, manga: 28.79, puntal: 8.85, calado: 6.65, agencia: 'NAVIJET' },
    { id: '21', buque: 'SEVEN SEAS SPLENDOR', bandera: 'ISLAS MARSHALL', imo: '9807085', eslora: 224.00, manga: 28.80, puntal: 16.15, calado: 7.10, agencia: 'NAVIJET' },
    { id: '22', buque: 'PACIFIC WORLD', bandera: 'PANAMÁ', imo: '9000259', eslora: 261.31, manga: 32.25, puntal: 17.40, calado: 8.10, agencia: 'AMI' },
    { id: '23', buque: 'MSC PREZIOSA', bandera: 'PANAMÁ', imo: '9595321', eslora: 333.30, manga: 37.92, puntal: 18.00, calado: 8.55, agencia: 'MSC' },
    { id: '24', buque: 'BOLETTE', bandera: 'BAHAMAS', imo: '9188037', eslora: 237.00, manga: 32.00, puntal: 8.00, calado: 8.00, agencia: 'INCHCAPE' },
    { id: '25', buque: 'SEVEN SEAS MARINER', bandera: 'BAHAMAS', imo: '9210139', eslora: 216.00, manga: 28.80, puntal: 16.15, calado: 7.10, agencia: 'NAVIJET' },
    { id: '26', buque: 'INSIGNIA', bandera: 'BAHAMAS', imo: '9156462', eslora: 180.45, manga: 25.73, puntal: 18.10, calado: 5.95, agencia: 'NAVIJET' },
    { id: '27', buque: 'VILLA VIE ODYSSEY', bandera: 'BAHAMAS', imo: '9000699', eslora: 195.00, manga: 22.00, puntal: 7.00, calado: 5.00, agencia: 'NAVIJET' },
    { id: '28', buque: 'MSC PREZIOSA', bandera: 'PANAMÁ', imo: '9595321', eslora: 333.30, manga: 37.92, puntal: 18.00, calado: 8.55, agencia: 'MSC' },
    { id: '29', buque: 'CELEBRITY EQUINOX', bandera: 'MALTA', imo: '9404314', eslora: 314.98, manga: 36.80, puntal: 11.00, calado: 8.23, agencia: 'INCHCAPE' },
    { id: '30', buque: 'AZAMARA ONWARD', bandera: 'MALTA', imo: '9200940', eslora: 181.00, manga: 25.50, puntal: 8.50, calado: 6.40, agencia: 'DELFINO' },
    { id: '31', buque: 'CARNIVAL PRIDE', bandera: 'PANAMÁ', imo: '9210220', eslora: 293.50, manga: 35.50, puntal: 13.00, calado: 8.20, agencia: 'INCHCAPE' },
    { id: '32', buque: 'SEABOURN SOJOURN', bandera: 'BAHAMAS', imo: '9417086', eslora: 198.00, manga: 25.50, puntal: 13.00, calado: 6.50, agencia: 'NAVIJET' },
    { id: '33', buque: 'SILVER WHISPER', bandera: 'BAHAMAS', imo: '9192167', eslora: 186.00, manga: 24.80, puntal: 11.50, calado: 6.10, agencia: 'NAVIJET' },
    { id: '34', buque: 'SILVER SHADOW', bandera: 'BAHAMAS', imo: '9192179', eslora: 186.00, manga: 24.80, puntal: 11.50, calado: 6.10, agencia: 'NAVIJET' },
    { id: '35', buque: 'CELEBRITY ECLIPSE', bandera: 'MALTA', imo: '9404302', eslora: 314.98, manga: 36.80, puntal: 11.00, calado: 8.23, agencia: 'INCHCAPE' },
    { id: '36', buque: 'NAUTICA', bandera: 'ISLAS MARSHALL', imo: '9155999', eslora: 180.45, manga: 25.73, puntal: 18.10, calado: 5.95, agencia: 'NAVIJET' },
    { id: '37', buque: 'RIVIERA', bandera: 'ISLAS MARSHALL', imo: '9438054', eslora: '239.30', manga: '32.20', puntal: '13.27', calado: '8.00', agencia: 'NAVIJET' },
    { id: '38', buque: 'SILVER MOON', bandera: 'BAHAMAS', imo: '9844334', eslora: 213.00, manga: 28.20, puntal: 9.00, calado: 6.30, agencia: 'NAVIJET' },
    { id: '39', buque: 'SILVER DAWN', bandera: 'BAHAMAS', imo: '9844346', eslora: 213.00, manga: 28.20, puntal: 9.00, calado: 6.30, agencia: 'NAVIJET' },
    { id: '40', buque: 'AZAMARA QUEST', bandera: 'MALTA', imo: '9200952', eslora: 181.00, manga: 25.50, puntal: 8.50, calado: 6.40, agencia: 'DELFINO' },
    { id: '41', buque: 'AZAMARA JOURNEY', bandera: 'MALTA', imo: '9200964', eslora: 181.00, manga: 25.50, puntal: 8.50, calado: 6.40, agencia: 'DELFINO' },
    { id: '42', buque: 'REGATTA', bandera: 'ISLAS MARSHALL', imo: '9156450', eslora: 180.45, manga: 25.73, puntal: 18.10, calado: 5.95, agencia: 'NAVIJET' },
    { id: '43', buque: 'SIRENA', bandera: 'ISLAS MARSHALL', imo: '9228344', eslora: 180.45, manga: 25.73, puntal: 18.10, calado: 5.95, agencia: 'NAVIJET' },
    { id: '44', buque: 'SILVER SPIRIT', bandera: 'BAHAMAS', imo: '9407077', eslora: 195.80, manga: 26.00, puntal: 11.00, calado: 6.30, agencia: 'NAVIJET' },
    { id: '45', buque: 'CELEBRITY INFINITY', bandera: 'MALTA', imo: '9189419', eslora: 294.13, manga: 32.20, puntal: 10.50, calado: 8.00, agencia: 'INCHCAPE' },
    { id: '46', buque: 'SEABOURN OVATION', bandera: 'BAHAMAS', imo: '9781757', eslora: 210.00, manga: 27.60, puntal: 10.50, calado: 6.50, agencia: 'NAVIJET' },
    { id: '47', buque: 'SEABOURN ENCORE', bandera: 'BAHAMAS', imo: '9781745', eslora: 210.00, manga: 27.60, puntal: 10.50, calado: 6.50, agencia: 'NAVIJET' },
    { id: '48', buque: 'SEABOURN QUEST', bandera: 'BAHAMAS', imo: '9417098', eslora: 198.00, manga: 25.50, puntal: 13.00, calado: 6.50, agencia: 'NAVIJET' },
    { id: '49', buque: 'SEVEN SEAS VOYAGER', bandera: 'BAHAMAS', imo: '9247146', eslora: 206.00, manga: 28.80, puntal: 16.15, calado: 7.10, agencia: 'NAVIJET' },
    { id: '50', buque: 'SEVEN SEAS NAVIGATOR', bandera: 'BAHAMAS', imo: '9144769', eslora: 172.00, manga: 23.80, puntal: 13.00, calado: 6.40, agencia: 'NAVIJET' },
    { id: '51', buque: 'SILVER WIND', bandera: 'BAHAMAS', imo: '9004186', eslora: 156.00, manga: 21.50, puntal: 8.50, calado: 5.50, agencia: 'NAVIJET' },
    { id: '52', buque: 'SILVER CLOUD', bandera: 'BAHAMAS', imo: '9004174', eslora: 156.00, manga: 21.50, puntal: 8.50, calado: 5.50, agencia: 'NAVIJET' },
    { id: '53', buque: 'HANSEATIC NATURE', bandera: 'BAHAMAS', imo: '9798504', eslora: 138.00, manga: 22.00, puntal: 7.00, calado: 4.70, agencia: 'NAVIJET' },
    { id: '54', buque: 'HANSEATIC INSPIRATION', bandera: 'BAHAMAS', imo: '9798516', eslora: 138.00, manga: 22.00, puntal: 7.00, calado: 4.70, agencia: 'NAVIJET' },
    { id: '55', buque: 'WORLD EXPLORER', bandera: 'PORTUGAL', imo: '9876250', eslora: 126.00, manga: 18.40, puntal: 7.00, calado: 4.70, agencia: 'NAVIJET' },
    { id: '56', buque: 'STAR PRIDE', bandera: 'BAHAMAS', imo: '8807999', eslora: 134.00, manga: 19.20, puntal: 8.00, calado: 4.70, agencia: 'NAVIJET' },
    { id: '57', buque: 'STAR BREEZE', bandera: 'BAHAMAS', imo: '9007491', eslora: 134.00, manga: 19.20, puntal: 8.00, calado: 4.70, agencia: 'NAVIJET' },
    { id: '58', buque: 'STAR LEGEND', bandera: 'BAHAMAS', imo: '9617871', eslora: 134.00, manga: 19.20, puntal: 8.00, calado: 4.70, agencia: 'NAVIJET' },
    { id: '59', buque: 'LE CHAMPLAIN', bandera: 'FRANCIA', imo: '9779917', eslora: 131.00, manga: 18.00, puntal: 7.00, calado: 4.70, agencia: 'NAVIJET' },
    { id: '60', buque: 'LE LAPEROUSE', bandera: 'FRANCIA', imo: '9779929', eslora: 131.00, manga: 18.00, puntal: 7.00, calado: 4.70, agencia: 'NAVIJET' },
    { id: '61', buque: 'LE BOUGAINVILLE', bandera: 'FRANCIA', imo: '9779905', eslora: 131.00, manga: 18.00, puntal: 7.00, calado: 4.70, agencia: 'NAVIJET' },
    { id: '62', buque: 'LE DUMONT-D URVILLE', bandera: 'FRANCIA', imo: '9779931', eslora: 131.00, manga: 18.00, puntal: 7.00, calado: 4.70, agencia: 'NAVIJET' },
    { id: '63', buque: 'SCENIC ECLIPSE', bandera: 'MALTA', imo: '9870405', eslora: 109.90, manga: 16.80, puntal: 7.50, calado: 3.80, agencia: 'NAVIJET' },
    { id: '64', buque: 'SCENIC ECLIPSE II', bandera: 'MALTA', imo: '9919382', eslora: 109.90, manga: 16.80, puntal: 7.50, calado: 3.80, agencia: 'NAVIJET' },
    { id: '65', buque: 'EMERALD AZZURRA', bandera: 'MALTA', imo: '9870405', eslora: 109.90, manga: 16.80, puntal: 7.50, calado: 3.80, agencia: 'NAVIJET' },
    { id: '66', buque: 'EMERALD SAKARA', bandera: 'MALTA', imo: '9919382', eslora: 109.90, manga: 16.80, puntal: 7.50, calado: 3.80, agencia: 'NAVIJET' },
    { id: '67', buque: 'EXPLORA I', bandera: 'BAHAMAS', imo: '9893223', eslora: 253.00, manga: 32.00, puntal: 9.00, calado: 7.30, agencia: 'NAVIJET' },
    { id: '68', buque: 'EXPLORA II', bandera: 'BAHAMAS', imo: '9893235', eslora: 253.00, manga: 32.00, puntal: 9.00, calado: 7.30, agencia: 'NAVIJET' },
    { id: '69', buque: 'VIKING OCTANTIS', bandera: 'NORUEGA', imo: '9813527', eslora: 205.00, manga: 23.50, puntal: 9.00, calado: 5.30, agencia: 'NAVIJET' },
    { id: '70', buque: 'VIKING POLARIS', bandera: 'NORUEGA', imo: '9813539', eslora: 205.00, manga: 23.50, puntal: 9.00, calado: 5.30, agencia: 'NAVIJET' },
    { id: '71', buque: 'NATIONAL GEOGRAPHIC ENDURANCE', bandera: 'BAHAMAS', imo: '9849002', eslora: 124.00, manga: 19.30, puntal: 8.50, calado: 5.00, agencia: 'NAVIJET' },
    { id: '72', buque: 'NATIONAL GEOGRAPHIC RESOLUTION', bandera: 'BAHAMAS', imo: '9849014', eslora: 124.00, manga: 19.30, puntal: 8.50, calado: 5.00, agencia: 'NAVIJET' },
    { id: '73', buque: 'ROALD AMUNDSEN', bandera: 'NORUEGA', imo: '9813527', eslora: 140.00, manga: 23.60, puntal: 9.00, calado: 5.30, agencia: 'NAVIJET' },
    { id: '74', buque: 'FRIDTJOF NANSEN', bandera: 'NORUEGA', imo: '9813539', eslora: 140.00, manga: 23.60, puntal: 9.00, calado: 5.30, agencia: 'NAVIJET' },
    { id: '75', buque: 'ULTRAMARINE', bandera: 'BAHAMAS', imo: '9843087', eslora: 128.00, manga: 22.00, puntal: 8.00, calado: 5.10, agencia: 'QUARK' }
  ];
}

// Generate HTML report for printing
export function generateCrossingReport(
  crossings: ShipCrossing[],
  ships: Ship[],
  reservations?: any[]
): string {
  console.log('📊 ========== INICIO GENERACIÓN REPORTE ==========');
  console.log('📊 generateCrossingReport - Crossings:', crossings.length);
  console.log('📊 generateCrossingReport - Ships:', ships.length);
  console.log('📊 generateCrossingReport - Reservas recibidas:', reservations?.length || 0);
  
  if (reservations && reservations.length > 0) {
    console.log('📋 Primeras 3 reservas recibidas:');
    reservations.slice(0, 3).forEach((r, i) => {
      console.log(`  ${i + 1}. Reserva:`, {
        cruiseId: r.cruiseId,
        buque: r.buque,
        clase: r.clase,
        CPI_IN: r.reservaCPIEntrada,
        ACC_IN: r.reservaACCEntrada,
        ACC_OUT: r.reservaACCSalida,
        CPI_OUT: r.reservaCPISalida
      });
    });
  } else {
    console.warn('⚠️ No se recibieron reservas en el reporte');
  }
  
  const sortedCrossings = [...crossings].sort((a, b) => 
    a.diaEntrada.getTime() - b.diaEntrada.getTime()
  );

  // Crear mapa de reservas desde el parámetro
  const reservationsMap = new Map();
  
  if (reservations && Array.isArray(reservations)) {
    reservations.forEach((r: any) => {
      reservationsMap.set(r.cruiseId, r);
      console.log(`  → Mapeando: cruiseId=${r.cruiseId} → buque=${r.buque}`);
    });
  }
  
  console.log('🗺️ Total reservas mapeadas:', reservationsMap.size);
  console.log('🗺️ CruiseIds en el mapa:', Array.from(reservationsMap.keys()));

  // ===== FUNCIÓN AUXILIAR: Calcular reserva si no existe =====
  const calculateMissingReservation = (crossing: ShipCrossing, shipClass: string) => {
    console.log(`🧮 Calculando reserva faltante para ${crossing.ship.buque} (Clase ${shipClass})`);
    
    const reservation: any = {
      cruiseId: crossing.id,
      buque: crossing.ship.buque,
      clase: shipClass,
      reservaACCEntrada: 'N/A',
      reservaACCSalida: 'N/A',
      reservaCPIEntrada: 'No aplica',
      reservaCPISalida: 'No aplica'
    };
    
    try {
      // ENTRADA: Calcular ACC (según clase del buque)
      if (crossing.entry.etaPto) {
        let horasAntes = 1.5; // Default Clase C
        
        if (shipClass === 'A') {
          horasAntes = 2.5; // 2:30 horas ANTES
        } else if (shipClass === 'B') {
          horasAntes = 2.0; // 2:00 horas ANTES
        } else if (shipClass === 'C') {
          horasAntes = 1.5; // 1:30 horas ANTES
        }
        
        const accInTime = addMinutes(crossing.entry.etaPto, -(horasAntes * 60));
        reservation.reservaACCEntrada = format(accInTime, 'dd/MM/yyyy HH:mm');
        console.log(`  ✅ ACC Entrada (Clase ${shipClass}): ${reservation.reservaACCEntrada} (${horasAntes}h antes de ETA ${format(crossing.entry.etaPto, 'HH:mm')})`);
      }
      
      // ENTRADA: Calcular CPI solo para Clase A y B
      if (shipClass === 'A' || shipClass === 'B') {
        if (crossing.entry.km239) {
          // Clase A: CPI = KM239 - 6:00
          const cpiInTime = addMinutes(crossing.entry.km239, -360);
          reservation.reservaCPIEntrada = format(cpiInTime, 'dd/MM/yyyy HH:mm');
        } else if (crossing.entry.km216) {
          // Clase B: CPI = KM216 - 6:30
          const cpiInTime = addMinutes(crossing.entry.km216, -390);
          reservation.reservaCPIEntrada = format(cpiInTime, 'dd/MM/yyyy HH:mm');
        }
      }
      
      // SALIDA: Calcular ACC (según clase del buque)
      if (crossing.exit.etdPto) {
        let horasAntes = 1.5; // Default Clase C
        
        if (shipClass === 'A') {
          horasAntes = 2.5; // 2:30 horas ANTES
        } else if (shipClass === 'B') {
          horasAntes = 2.0; // 2:00 horas ANTES
        } else if (shipClass === 'C') {
          horasAntes = 1.5; // 1:30 horas ANTES
        }
        
        const accOutTime = addMinutes(crossing.exit.etdPto, -(horasAntes * 60));
        reservation.reservaACCSalida = format(accOutTime, 'dd/MM/yyyy HH:mm');
        console.log(`  ✅ ACC Salida (Clase ${shipClass}): ${reservation.reservaACCSalida} (${horasAntes}h antes de ETD ${format(crossing.exit.etdPto, 'HH:mm')})`);
      }
      
      // SALIDA: Calcular CPI solo para Clase A y B
      if (shipClass === 'A' || shipClass === 'B') {
        if (crossing.exit.km239) {
          // Clase A: CPI = KM239 + 3:00
          const cpiOutTime = addMinutes(crossing.exit.km239, 180);
          reservation.reservaCPISalida = format(cpiOutTime, 'dd/MM/yyyy HH:mm');
        } else if (crossing.exit.km216) {
          // Clase B: CPI = KM216 + 4:30
          const cpiOutTime = addMinutes(crossing.exit.km216, 270);
          reservation.reservaCPISalida = format(cpiOutTime, 'dd/MM/yyyy HH:mm');
        }
      }
      
      console.log(`✅ Reserva calculada para ${crossing.ship.buque}:`, reservation);
    } catch (error) {
      console.error(`❌ Error calculando reserva para ${crossing.ship.buque}:`, error);
    }
    
    return reservation;
  };

  const formatDate = (date?: Date) => 
    date ? format(date, 'dd/MM/yyyy') : '-';
  
  const formatTime = (date?: Date) => 
    date ? format(date, 'HH:mm') : '-';
  
  const formatReservation = (value?: string) => {
    console.log('🔍 formatReservation recibió:', value);
    
    // Tratar vacío, undefined, null, "No aplica", etc. como N/A
    if (!value || value.trim() === '' || value === 'No aplica' || value === 'Error cálculo' || value === 'N/A') {
      const result = '<span style="color: #94a3b8; font-size: 10px;">N/A</span>';
      console.log('  ↪️ Devolviendo:', result);
      return result;
    }
    
    try {
      // El valor puede venir en formato "DD/MM/YYYY HH:mm"
      if (value.includes('/') && value.includes(':')) {
        const parts = value.trim().split(' ');
        if (parts.length >= 2) {
          const fecha = parts[0]; // DD/MM/YYYY
          const hora = parts[1];  // HH:mm
          return `<div class="date">${fecha}</div><div class="time">${hora}</div>`;
        }
      }
      
      // Si no se puede parsear, devolver el valor tal cual
      const result = `<div class="time">${value}</div>`;
      console.log('  ↪️ Devolviendo:', result);
      return result;
    } catch (error) {
      console.error('❌ Error parseando reserva:', error, value);
      return `<div class="time">${value}</div>`;
    }
  };

  const getShipClass = (calado: number): string => {
    if (calado >= 8.84) return 'A';
    if (calado > 7.32) return 'B';
    return 'C';
  };

  const hasClaseC = sortedCrossings.some(crossing => {
    const ship = ships.find(s => s.id === crossing.ship.id);
    return ship && getShipClass(ship.calado) === 'C';
  });

  const rows = sortedCrossings.map((crossing, index) => {
    const ship = ships.find(s => s.id === crossing.ship.id);
    if (!ship) return '';

    const clase = getShipClass(ship.calado);
    
    // Buscar reserva existente o calcular una nueva
    let reservation = reservationsMap.get(crossing.id);
    
    if (!reservation) {
      console.log(`⚠️ No hay reserva para ${ship.buque}, calculando automáticamente...`);
      reservation = calculateMissingReservation(crossing, clase);
    }
    
    console.log(`🔍 Row ${index + 1}/${sortedCrossings.length}:`, {
      crossingId: crossing.id,
      shipId: ship.id,
      shipName: ship.buque,
      clase: clase,
      reservationFound: !!reservation,
      reservationCruiseId: reservation?.cruiseId,
      reservationBuque: reservation?.buque
    });
    
    if (reservation) {
      console.log(`  ✅ Reserva encontrada para ${ship.buque}:`, {
        CPI_IN: reservation.reservaCPIEntrada,
        ACC_IN: reservation.reservaACCEntrada,
        ACC_OUT: reservation.reservaACCSalida,
        CPI_OUT: reservation.reservaCPISalida
      });
    } else {
      console.warn(`  ❌ NO se encontró reserva para crossing.id=${crossing.id}`);
    }

    // Columnas condicionales para Clase C (KM 59)
    const km59EntryCell = hasClaseC ? (clase === 'C' ? `
      <td class="datetime-cell highlight-orange">
        <div class="date">${formatDate(crossing.entry.km59_in)}</div>
        <div class="time">${formatTime(crossing.entry.km59_in)}</div>
      </td>
    ` : '<td class="datetime-cell"><span style="color: #94a3b8; font-size: 10px;">-</span></td>') : '';

    const km59ExitCell = hasClaseC ? (clase === 'C' ? `
      <td class="datetime-cell highlight-orange">
        <div class="date">${formatDate(crossing.exit.km59)}</div>
        <div class="time">${formatTime(crossing.exit.km59)}</div>
      </td>
    ` : '<td class="datetime-cell"><span style="color: #94a3b8; font-size: 10px;">-</span></td>') : '';

    return `
      <tr>
        <td class="center-cell number-col">${index + 1}</td>
        <td class="ship-name">${ship.buque}</td>
        <td class="datetime-cell">
          <div class="date">${formatDate(crossing.diaEntrada)}</div>
          <div class="time">${crossing.horaEntrada}</div>
        </td>
        <td class="datetime-cell highlight-green">
          <div class="date">${formatDate(crossing.entry.km118_5)}</div>
          <div class="time">${formatTime(crossing.entry.km118_5)}</div>
        </td>
        ${km59EntryCell}
        <td class="datetime-cell reservation-cell">
          ${formatReservation(reservation?.reservaCPIEntrada)}
        </td>
        <td class="datetime-cell reservation-cell">
          ${formatReservation(reservation?.reservaACCEntrada)}
        </td>
        <td class="datetime-cell highlight-primary">
          <div class="date">${formatDate(crossing.entry.etaPto)}</div>
          <div class="time">${formatTime(crossing.entry.etaPto)}</div>
        </td>
        <td class="datetime-cell highlight-warning">
          <div class="date">${formatDate(crossing.exit.etdPto)}</div>
          <div class="time">${formatTime(crossing.exit.etdPto)}</div>
        </td>
        <td class="datetime-cell reservation-cell">
          ${formatReservation(reservation?.reservaACCSalida)}
        </td>
        <td class="datetime-cell reservation-cell">
          ${formatReservation(reservation?.reservaCPISalida)}
        </td>
        ${km59ExitCell}
        <td class="datetime-cell highlight-red">
          <div class="date">${formatDate(crossing.exit.km118_5)}</div>
          <div class="time">${formatTime(crossing.exit.km118_5)}</div>
        </td>
        <td class="center-cell specs-col">${ship.eslora} m</td>
        <td class="center-cell specs-col">${ship.manga} m</td>
        <td class="center-cell specs-col">${ship.calado} m</td>
        <td class="agency-col">${ship.agencia}</td>
      </tr>
    `;
  }).join('');

  const today = new Date();
  const confirmados = crossings.filter(c => c.situation === 'CONFIRMADO').length;
  const pendientes = crossings.filter(c => c.situation === 'SIN CONFIRMAR').length;
  const claseC = crossings.filter(c => {
    const ship = ships.find(s => s.id === c.ship.id);
    return ship && getShipClass(ship.calado) === 'C';
  }).length;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Reporte de Cruceros - Canal Punta Indio KM 118.5</title>
      <style>
        @page {
          size: A3 landscape;
          margin: 0.8cm;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          font-size: 11px;
          color: #1e293b;
          background: white;
          padding: 15px;
        }
        
        /* HEADER - Elegante y profesional */
        .header {
          text-align: center;
          margin-bottom: 18px;
          padding-bottom: 12px;
          border-bottom: 4px solid #0f172a;
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
          padding: 18px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .header h1 {
          font-size: 26px;
          font-weight: 700;
          color: white;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        
        .header .subtitle {
          font-size: 15px;
          color: #e0e7ff;
          margin: 4px 0;
          font-weight: 500;
        }
        
        .header .metadata {
          font-size: 12px;
          color: #cbd5e1;
          margin-top: 8px;
          font-weight: 400;
        }
        
        /* TABLA - Espaciosa y clara */
        .table-container {
          overflow-x: auto;
          margin-top: 15px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        th {
          background: linear-gradient(180deg, #334155 0%, #1e293b 100%);
          color: white;
          padding: 10px 6px;
          text-align: center;
          font-size: 10px;
          font-weight: 700;
          border: 1px solid #0f172a;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          line-height: 1.3;
        }
        
        td {
          padding: 8px 6px;
          border: 1px solid #cbd5e1;
          font-size: 10px;
          vertical-align: middle;
          background: white;
        }
        
        /* Columnas específicas */
        .number-col {
          font-weight: 700;
          font-size: 11px;
          color: #475569;
          width: 30px;
        }
        
        .ship-name {
          font-weight: 700;
          font-size: 11px;
          color: #0f172a;
          text-align: left;
          min-width: 120px;
        }
        
        .datetime-cell {
          text-align: center;
          line-height: 1.3;
          min-width: 75px;
        }
        
        .datetime-cell .date {
          font-size: 10px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 2px;
        }
        
        .datetime-cell .time {
          font-size: 11px;
          font-weight: 700;
          color: #3b82f6;
        }
        
        .highlight-green {
          background: #f0fdf4 !important;
        }
        
        .highlight-green .time {
          color: #16a34a;
          font-size: 12px;
        }
        
        .highlight-red {
          background: #fef2f2 !important;
        }
        
        .highlight-red .time {
          color: #dc2626;
          font-size: 12px;
        }
        
        .highlight-orange {
          background: #fff7ed !important;
        }
        
        .highlight-orange .time {
          color: #ea580c;
          font-size: 12px;
        }
        
        .highlight-primary {
          background: #d1fae5 !important;
          border: 2px solid #059669 !important;
        }
        
        .highlight-primary .time {
          color: #047857;
          font-size: 13px;
          font-weight: 900;
        }
        
        .highlight-warning {
          background: #fed7aa !important;
          border: 2px solid #ea580c !important;
        }
        
        .highlight-warning .time {
          color: #c2410c;
          font-size: 13px;
          font-weight: 900;
        }
        
        .reservation-cell {
          background: #fefce8 !important;
          border-left: 3px solid #facc15;
        }
        
        .reservation-cell .time {
          color: #ca8a04;
          font-size: 11px;
          font-weight: 800;
        }
        
        .specs-col {
          font-weight: 600;
          color: #475569;
          font-size: 10px;
          width: 55px;
        }
        
        .agency-col {
          font-size: 9px;
          color: #64748b;
          text-align: left;
          font-weight: 500;
          min-width: 80px;
        }
        
        .center-cell {
          text-align: center;
        }
        
        /* Filas alternadas */
        tbody tr:nth-child(odd) {
          background: #ffffff;
        }
        
        tbody tr:nth-child(even) {
          background: #f8fafc;
        }
        
        tbody tr:hover {
          background: #e0f2fe !important;
        }
        
        /* FOOTER - Información de resumen */
        .footer {
          margin-top: 18px;
          padding: 15px;
          background: #f1f5f9;
          border-radius: 6px;
          border-left: 4px solid #1e3a8a;
        }
        
        .footer-stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 10px;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-value {
          font-size: 22px;
          font-weight: 700;
          color: #1e3a8a;
          display: block;
        }
        
        .stat-label {
          font-size: 11px;
          color: #64748b;
          margin-top: 2px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .footer-info {
          text-align: center;
          font-size: 10px;
          color: #64748b;
          border-top: 1px solid #cbd5e1;
          padding-top: 10px;
          margin-top: 10px;
        }
        
        /* LEGEND - Leyenda de colores */
        .legend {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin: 12px 0;
          padding: 10px;
          background: #f8fafc;
          border-radius: 6px;
          flex-wrap: wrap;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          color: #475569;
        }
        
        .legend-color {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1px solid #cbd5e1;
        }
        
        .legend-green { background: #f0fdf4; }
        .legend-red { background: #fef2f2; }
        .legend-orange { background: #fff7ed; }
        .legend-yellow { background: #fefce8; border-left: 3px solid #facc15; }
        
        @media print {
          body {
            padding: 5px;
          }
          
          .header {
            break-inside: avoid;
          }
          
          table {
            page-break-inside: auto;
          }
          
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          
          thead {
            display: table-header-group;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚢 Gestión de Cruceros Oceánicos</h1>
        <div class="subtitle">📍 Canal Punta Indio - KM 118.5</div>
        <div class="metadata">
          Reporte generado: ${format(today, 'dd/MM/yyyy')} a las ${format(today, 'HH:mm')} hs
        </div>
      </div>
      
      <div class="legend">
        <div class="legend-item">
          <div class="legend-color legend-green"></div>
          <span><strong>ETA KM 118.5</strong> Entrada</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #d1fae5; border: 2px solid #059669;"></div>
          <span><strong>⚓ AMARRE (ETA Pto)</strong> usado para ACC Entrada</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #fed7aa; border: 2px solid #ea580c;"></div>
          <span><strong>🚢 ZARPADA (ETD Pto)</strong> usado para ACC Salida</span>
        </div>
        <div class="legend-item">
          <div class="legend-color legend-red"></div>
          <span><strong>ETD KM 118.5</strong> Salida</span>
        </div>
        ${hasClaseC ? `
        <div class="legend-item">
          <div class="legend-color legend-orange"></div>
          <span><strong>KM 59</strong> (Solo Clase C)</span>
        </div>
        ` : ''}
        <div class="legend-item">
          <div class="legend-color legend-yellow"></div>
          <span><strong>Reservas de Canal</strong> (CPI/ACC)</span>
        </div>
      </div>
      
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th style="width: 30px;">N°</th>
              <th style="min-width: 120px;">BUQUE</th>
              <th style="min-width: 75px;">INICIO<br/>TRÁNSITO</th>
              <th style="min-width: 75px; background: #047857;">ETA<br/>KM 118.5</th>
              ${hasClaseC ? '<th style="min-width: 75px; background: #c2410c;">KM 59<br/>(Clase C)</th>' : ''}
              <th style="min-width: 75px; background: #ca8a04;">RESERVA<br/>CPI<br/>ENTRADA</th>
              <th style="min-width: 75px; background: #ca8a04;">RESERVA<br/>ACC<br/>ENTRADA</th>
              <th style="min-width: 75px; background: #059669; font-weight: 900;">⚓ AMARRE<br/>(ETA PTO)</th>
              <th style="min-width: 75px; background: #ea580c; font-weight: 900;">🚢 ZARPADA<br/>(ETD PTO)</th>
              <th style="min-width: 75px; background: #b45309;">RESERVA<br/>ACC<br/>SALIDA</th>
              <th style="min-width: 75px; background: #b45309;">RESERVA<br/>CPI<br/>SALIDA</th>
              ${hasClaseC ? '<th style="min-width: 75px; background: #c2410c;">KM 59<br/>(Clase C)</th>' : ''}
              <th style="min-width: 75px; background: #7c2d12;">ETD<br/>KM 118.5</th>
              <th style="width: 55px;">ESLORA<br/>(m)</th>
              <th style="width: 55px;">MANGA<br/>(m)</th>
              <th style="width: 55px;">CALADO<br/>(m)</th>
              <th style="min-width: 80px;">AGENCIA</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
      
      <div class="footer">
        <div class="footer-stats">
          <div class="stat-item">
            <span class="stat-value">${crossings.length}</span>
            <span class="stat-label">Total Cruceros</span>
          </div>
          <div class="stat-item">
            <span class="stat-value" style="color: #16a34a;">${confirmados}</span>
            <span class="stat-label">Confirmados</span>
          </div>
          <div class="stat-item">
            <span class="stat-value" style="color: #ca8a04;">${pendientes}</span>
            <span class="stat-label">Pendientes</span>
          </div>
          <div class="stat-item">
            <span class="stat-value" style="color: #dc2626;">${crossings.filter(c => c.situation === 'CANCELADO').length}</span>
            <span class="stat-label">Cancelados</span>
          </div>
          ${hasClaseC ? `
          <div class="stat-item">
            <span class="stat-value" style="color: #ea580c;">${claseC}</span>
            <span class="stat-label">Buques Clase C</span>
          </div>
          ` : ''}
        </div>
        <div class="footer-info">
          <strong>Sistema de Gestión de Cruceros Oceánicos</strong> | Canal Punta Indio KM 118.5<br/>
          Documento de uso interno - Confidencial | ${hasClaseC ? 'Incluye horarios KM 59 para buques Clase C' : 'Sin buques Clase C en este período'}
        </div>
      </div>
      
      <script>
        window.onload = function() {
          setTimeout(() => window.print(), 500);
        };
      </script>
    </body>
    </html>
  `;
}











