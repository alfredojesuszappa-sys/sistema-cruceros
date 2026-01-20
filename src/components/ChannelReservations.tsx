
import React, { useState, useEffect } from 'react';
import { Calendar, Anchor, Search, Edit, Save, X, AlertCircle, Download, Clock, TrendingUp, History } from 'lucide-react';
import { format, parse, subHours, differenceInHours, differenceInMinutes, addHours } from 'date-fns';
import type { Ship } from '../lib/ships';
import { loadShips } from '../lib/ships';

interface Cruise {
  id: string;
  ship: {
    id: string;
    buque: string;
    bandera: string;
    imo: number;
    eslora: number;
    manga: number;
    puntal: number;
    calado: number;
    agencia: string;
  };
  diaEntrada: Date;
  horaEntrada: string;
  diaSalida: Date;
  horaSalida: string;
  situation: string;
  entry: {
    km239?: Date;
    km216?: Date;
    km118_5?: Date;
    km59_in?: Date;
    km37?: Date;
    km7_3?: Date;
    etaPto?: Date;
  };
  exit: {
    km59?: Date;
    km77?: Date;
    km118_5?: Date;
    km216?: Date;
    km239?: Date;
  };
}

interface Reservation {
  cruiseId: string;
  buque: string;
  clase: string;
  agencia: string;
  // Entrada
  reservaCPIEntrada: string;
  reservaACCEntrada: string;
  // Salida
  reservaACCSalida: string;
  reservaCPISalida: string;
  // Flags de edición manual
  manualCPIEntrada?: boolean;
  manualACCEntrada?: boolean;
  manualACCSalida?: boolean;
  manualCPISalida?: boolean;
}

interface ReservationHistory {
  id: string;
  cruiseId: string;
  buque: string;
  timestamp: string;
  changes: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
  user: string;
}

// Helper function to get ship class based on draft (calado)
export function getShipClass(calado: number): string {
  if (calado >= 8.84) return 'A';
  if (calado > 7.32) return 'B';
  return 'C';
}

// Función para calcular reservas automáticamente
export function calculateReservations(cruises: Cruise[], shipsDB: Ship[]): Reservation[] {
  console.log('🔄 calculateReservations - Cruceros:', cruises.length, '| Buques en DB:', shipsDB.length);
  
  return cruises.map(cruise => {
    // Buscar el buque en la base de datos por ID
    const shipData = shipsDB.find(s => s.id === cruise.ship.id);
    
    if (!shipData) {
      console.warn(`⚠️ Buque ${cruise.ship.buque} (ID: ${cruise.ship.id}) no encontrado en base de datos`);
    }
    
    // Usar el calado de la base de datos, no del objeto cruise.ship
    const calado = shipData?.calado || cruise.ship.calado;
    const clase = getShipClass(calado);
    
    console.log(`🚢 ${cruise.ship.buque} - Clase ${clase} (calado: ${calado}m)`);
    
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

    // ===== ENTRADA =====
    
    // 1. Reserva CPI Entrada - Solo Clase A y B (desde inicio de navegación)
    if (cruise.horaEntrada && (clase === 'A' || clase === 'B')) {
      try {
        const inicioNavegacion = new Date(`${format(cruise.diaEntrada, 'yyyy-MM-dd')}T${cruise.horaEntrada}:00`);
        const horasAntes = clase === 'A' ? 6 : 6.5; // A: 6:00, B: 6:30
        const reserva = subHours(inicioNavegacion, horasAntes);
        reservation.reservaCPIEntrada = format(reserva, 'dd/MM/yyyy HH:mm');
        console.log(`  ✅ CPI Entrada: ${reservation.reservaCPIEntrada}`);
      } catch (error) {
        console.error(`  ❌ Error CPI Entrada:`, error);
        reservation.reservaCPIEntrada = 'Error cálculo';
      }
    } else if (clase === 'C') {
      reservation.reservaCPIEntrada = 'No aplica';
    } else {
      reservation.reservaCPIEntrada = 'N/A';
    }

    // 2. Reserva ACC Entrada - TODOS los buques (según clase: A=2:30, B=2:00, C=1:30 ANTES de ETA Puerto)
    if (cruise.entry.etaPto) {
      try {
        const etaPuerto = new Date(cruise.entry.etaPto);
        let horasAntes = 1.5; // Default Clase C
        
        if (clase === 'A') {
          horasAntes = 2.5; // 2:30 horas ANTES
        } else if (clase === 'B') {
          horasAntes = 2.0; // 2:00 horas ANTES
        } else if (clase === 'C') {
          horasAntes = 1.5; // 1:30 horas ANTES
        }
        
        const reserva = subHours(etaPuerto, horasAntes);
        reservation.reservaACCEntrada = format(reserva, 'dd/MM/yyyy HH:mm');
        console.log(`  ✅ ACC Entrada (Clase ${clase}): ${reservation.reservaACCEntrada} (${horasAntes}h antes de ETA ${format(etaPuerto, 'HH:mm')})`);
      } catch (error) {
        console.error(`  ❌ Error ACC Entrada:`, error);
        reservation.reservaACCEntrada = 'Error cálculo';
      }
    } else {
      console.warn(`  ⚠️ No hay etaPto para ${cruise.ship.buque}`);
      reservation.reservaACCEntrada = 'N/A';
    }

    // ===== SALIDA =====

    // 3. Reserva ACC Salida - TODOS los buques (según clase: A=2:30, B=2:00, C=1:30 ANTES de ETD Puerto)
    if (cruise.horaSalida) {
      try {
        const etdPuerto = new Date(`${format(cruise.diaSalida, 'yyyy-MM-dd')}T${cruise.horaSalida}:00`);
        let horasAntes = 1.5; // Default Clase C
        
        if (clase === 'A') {
          horasAntes = 2.5; // 2:30 horas ANTES
        } else if (clase === 'B') {
          horasAntes = 2.0; // 2:00 horas ANTES
        } else if (clase === 'C') {
          horasAntes = 1.5; // 1:30 horas ANTES
        }
        
        const reserva = subHours(etdPuerto, horasAntes);
        reservation.reservaACCSalida = format(reserva, 'dd/MM/yyyy HH:mm');
        console.log(`  ✅ ACC Salida (Clase ${clase}): ${reservation.reservaACCSalida} (${horasAntes}h antes de ETD ${format(etdPuerto, 'HH:mm')})`);
      } catch (error) {
        console.error(`  ❌ Error ACC Salida:`, error);
        reservation.reservaACCSalida = 'Error cálculo';
      }
    } else {
      console.warn(`  ⚠️ No hay horaSalida para ${cruise.ship.buque}`);
      reservation.reservaACCSalida = 'N/A';
    }

    // 4. Reserva CPI Salida - Solo Clase A y B (desde KM 239/216)
    if (clase === 'A' && cruise.exit.km239) {
      try {
        const km239 = new Date(cruise.exit.km239);
        const reserva = new Date(km239.getTime() + (3 * 60 * 60 * 1000)); // +3:00 horas después
        reservation.reservaCPISalida = format(reserva, 'dd/MM/yyyy HH:mm');
        console.log(`  ✅ CPI Salida: ${reservation.reservaCPISalida}`);
      } catch (error) {
        console.error(`  ❌ Error CPI Salida:`, error);
        reservation.reservaCPISalida = 'Error cálculo';
      }
    } else if (clase === 'B' && cruise.exit.km216) {
      try {
        const km216 = new Date(cruise.exit.km216);
        const reserva = new Date(km216.getTime() + (4.5 * 60 * 60 * 1000)); // +4:30 horas después
        reservation.reservaCPISalida = format(reserva, 'dd/MM/yyyy HH:mm');
        console.log(`  ✅ CPI Salida: ${reservation.reservaCPISalida}`);
      } catch (error) {
        console.error(`  ❌ Error CPI Salida:`, error);
        reservation.reservaCPISalida = 'Error cálculo';
      }
    } else if (clase === 'C') {
      reservation.reservaCPISalida = 'No aplica';
    } else {
      reservation.reservaCPISalida = 'N/A';
    }

    return reservation;
  });
}

interface ChannelReservationsProps {
  globalSearch?: string;
}

export function ChannelReservations({ globalSearch = '' }: ChannelReservationsProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<ReservationHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [stats, setStats] = useState({
    totalReservations: 0,
    cpiHours: 0,
    accHours: 0,
    claseA: 0,
    claseB: 0,
    claseC: 0,
  });
  const [shipsDB, setShipsDB] = useState<Ship[]>([]);

  // Calcular estadísticas ampliadas
  const calculateStats = (reservations: Reservation[], cruises: Cruise[]) => {
    let cpiHours = 0;
    let accHours = 0;

    reservations.forEach(reservation => {
      const cruise = cruises.find(c => c.id === reservation.cruiseId);
      if (!cruise) return;

      const clase = reservation.clase;

      // CPI Hours - Entrada
      if (clase === 'A' || clase === 'B') {
        cpiHours += clase === 'A' ? 6 : 5.5;
      }

      // CPI Hours - Salida
      if (clase === 'A' || clase === 'B') {
        cpiHours += clase === 'A' ? 6 : 5.5;
      }

      // ACC Hours - Entrada
      if (clase === 'A') accHours += 2.5;
      else if (clase === 'B') accHours += 2;
      else if (clase === 'C') accHours += 1;

      // ACC Hours - Salida
      if (clase === 'A') accHours += 2.5;
      else if (clase === 'B') accHours += 2;
      else if (clase === 'C') accHours += 1;
    });

    setStats({
      totalReservations: reservations.length,
      cpiHours: Math.round(cpiHours * 10) / 10,
      accHours: Math.round(accHours * 10) / 10,
      claseA: reservations.filter(r => r.clase === 'A').length,
      claseB: reservations.filter(r => r.clase === 'B').length,
      claseC: reservations.filter(r => r.clase === 'C').length,
    });
  };

  // Cargar datos desde localStorage
  useEffect(() => {
    setIsLoading(true);
    try {
      const cruisesData = localStorage.getItem('ship_crossings');
      const savedReservations = localStorage.getItem('channelReservations');
      const savedHistory = localStorage.getItem('reservationHistory');
      
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      
      if (cruisesData) {
        const cruises: Cruise[] = JSON.parse(cruisesData);
        
        // Cargar base de datos de buques
        const shipsDB = loadShips();
        
        // Convert date strings back to Date objects
        const parsedCruises = cruises.map(c => ({
          ...c,
          diaEntrada: new Date(c.diaEntrada),
          diaSalida: new Date(c.diaSalida),
          entry: {
            ...c.entry,
            km239: c.entry.km239 ? new Date(c.entry.km239) : undefined,
            km216: c.entry.km216 ? new Date(c.entry.km216) : undefined,
            km118_5: c.entry.km118_5 ? new Date(c.entry.km118_5) : undefined,
            km59_in: c.entry.km59_in ? new Date(c.entry.km59_in) : undefined,
            km37: c.entry.km37 ? new Date(c.entry.km37) : undefined,
            km7_3: c.entry.km7_3 ? new Date(c.entry.km7_3) : undefined,
            etaPto: c.entry.etaPto ? new Date(c.entry.etaPto) : undefined,
          },
          exit: {
            ...c.exit,
            km59: c.exit.km59 ? new Date(c.exit.km59) : undefined,
            km77: c.exit.km77 ? new Date(c.exit.km77) : undefined,
            km118_5: c.exit.km118_5 ? new Date(c.exit.km118_5) : undefined,
            km216: c.exit.km216 ? new Date(c.exit.km216) : undefined,
            km239: c.exit.km239 ? new Date(c.exit.km239) : undefined,
          }
        }));
        
        const calculated = calculateReservations(parsedCruises, shipsDB);
        
        // Si hay reservas guardadas con ediciones manuales, combinarlas
        if (savedReservations) {
          const saved: Reservation[] = JSON.parse(savedReservations);
          const merged = calculated.map(calc => {
            const savedReserv = saved.find(s => s.cruiseId === calc.cruiseId);
            if (savedReserv) {
              return {
                ...calc,
                reservaCPIEntrada: savedReserv.manualCPIEntrada ? savedReserv.reservaCPIEntrada : calc.reservaCPIEntrada,
                reservaACCEntrada: savedReserv.manualACCEntrada ? savedReserv.reservaACCEntrada : calc.reservaACCEntrada,
                reservaACCSalida: savedReserv.manualACCSalida ? savedReserv.reservaACCSalida : calc.reservaACCSalida,
                reservaCPISalida: savedReserv.manualCPISalida ? savedReserv.reservaCPISalida : calc.reservaCPISalida,
                manualCPIEntrada: savedReserv.manualCPIEntrada,
                manualACCEntrada: savedReserv.manualACCEntrada,
                manualACCSalida: savedReserv.manualACCSalida,
                manualCPISalida: savedReserv.manualCPISalida,
              };
            }
            return calc;
          });
          
          // Guardar reservas merged en localStorage
          localStorage.setItem('channelReservations', JSON.stringify(merged));
          console.log('💾 Reservas guardadas (merged):', merged.length);
          
          setReservations(merged);
          setFilteredReservations(merged);
          calculateStats(merged, parsedCruises);
        } else {
          // Guardar reservas calculadas por primera vez
          localStorage.setItem('channelReservations', JSON.stringify(calculated));
          console.log('💾 Reservas guardadas (new):', calculated.length);
          
          setReservations(calculated);
          setFilteredReservations(calculated);
          calculateStats(calculated, parsedCruises);
        }
      }
    } catch (error) {
      console.error('Error cargando reservas:', error);
    }
    setIsLoading(false);
  }, []);

  // Búsqueda
  useEffect(() => {
    const combinedSearch = (globalSearch + ' ' + searchTerm).trim();
    if (combinedSearch === '') {
      setFilteredReservations(reservations);
    } else {
      const term = combinedSearch.toLowerCase();
      const filtered = reservations.filter(r => 
        r.buque.toLowerCase().includes(term) ||
        r.agencia.toLowerCase().includes(term) ||
        r.clase.toLowerCase().includes(term)
      );
      setFilteredReservations(filtered);
    }
  }, [searchTerm, reservations, globalSearch]);

  // Iniciar edición
  const handleEdit = (reservation: Reservation) => {
    setEditingId(reservation.cruiseId);
    setEditValues({
      reservaCPIEntrada: reservation.reservaCPIEntrada,
      reservaACCEntrada: reservation.reservaACCEntrada,
      reservaACCSalida: reservation.reservaACCSalida,
      reservaCPISalida: reservation.reservaCPISalida,
    });
  };

  // Guardar edición con historial
  const handleSave = (cruiseId: string) => {
    const oldReservation = reservations.find(r => r.cruiseId === cruiseId);
    if (!oldReservation) return;

    const changes: { field: string; oldValue: string; newValue: string }[] = [];

    if (editValues.reservaCPIEntrada !== oldReservation.reservaCPIEntrada) {
      changes.push({
        field: 'Reserva CPI Entrada',
        oldValue: oldReservation.reservaCPIEntrada,
        newValue: editValues.reservaCPIEntrada
      });
    }
    if (editValues.reservaACCEntrada !== oldReservation.reservaACCEntrada) {
      changes.push({
        field: 'Reserva ACC Entrada',
        oldValue: oldReservation.reservaACCEntrada,
        newValue: editValues.reservaACCEntrada
      });
    }
    if (editValues.reservaACCSalida !== oldReservation.reservaACCSalida) {
      changes.push({
        field: 'Reserva ACC Salida',
        oldValue: oldReservation.reservaACCSalida,
        newValue: editValues.reservaACCSalida
      });
    }
    if (editValues.reservaCPISalida !== oldReservation.reservaCPISalida) {
      changes.push({
        field: 'Reserva CPI Salida',
        oldValue: oldReservation.reservaCPISalida,
        newValue: editValues.reservaCPISalida
      });
    }

    if (changes.length > 0) {
      const newHistoryEntry: ReservationHistory = {
        id: Date.now().toString(),
        cruiseId,
        buque: oldReservation.buque,
        timestamp: new Date().toISOString(),
        changes,
        user: 'Operador' // Podrías implementar autenticación
      };

      const updatedHistory = [newHistoryEntry, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('reservationHistory', JSON.stringify(updatedHistory));
    }

    const updated = reservations.map(r => {
      if (r.cruiseId === cruiseId) {
        return {
          ...r,
          reservaCPIEntrada: editValues.reservaCPIEntrada,
          reservaACCEntrada: editValues.reservaACCEntrada,
          reservaACCSalida: editValues.reservaACCSalida,
          reservaCPISalida: editValues.reservaCPISalida,
          manualCPIEntrada: true,
          manualACCEntrada: true,
          manualACCSalida: true,
          manualCPISalida: true,
        };
      }
      return r;
    });
    
    setReservations(updated);
    localStorage.setItem('channelReservations', JSON.stringify(updated));
    setEditingId(null);
    setEditValues({});
  };

  // Cancelar edición
  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  // Exportar a Excel (CSV)
  const handleExportExcel = () => {
    const headers = ['N°', 'Buque', 'Clase', 'Agencia', 'Reserva CPI Entrada', 'Reserva ACC Entrada', 'Reserva ACC Salida', 'Reserva CPI Salida'];
    const rows = filteredReservations.map((r, i) => [
      i + 1,
      r.buque,
      r.clase,
      r.agencia,
      r.reservaCPIEntrada,
      r.reservaACCEntrada,
      r.reservaACCSalida,
      r.reservaCPISalida
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reservas_canal_${format(new Date(), 'yyyy-MM-dd_HHmm')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Exportar a PDF (HTML para imprimir)
  const handleExportPDF = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Reservas de Canal - ${format(new Date(), 'dd/MM/yyyy')}</title>
  <style>
    @page { size: A4 landscape; margin: 1cm; }
    body { font-family: Arial, sans-serif; font-size: 10px; }
    h1 { text-align: center; color: #1e40af; margin-bottom: 20px; }
    .stats { display: flex; justify-content: space-around; margin-bottom: 20px; background: #f0f9ff; padding: 15px; border-radius: 8px; }
    .stat-box { text-align: center; }
    .stat-value { font-size: 24px; font-weight: bold; color: #1e40af; }
    .stat-label { font-size: 11px; color: #64748b; margin-top: 5px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th { background: #1e40af; color: white; padding: 10px; text-align: center; font-weight: bold; }
    td { border: 1px solid #ddd; padding: 8px; text-align: center; }
    tr:nth-child(even) { background: #f8fafc; }
    .clase-a { color: #ef4444; font-weight: bold; }
    .clase-b { color: #f59e0b; font-weight: bold; }
    .clase-c { color: #22c55e; font-weight: bold; }
    .footer { margin-top: 20px; text-align: center; color: #64748b; font-size: 9px; }
  </style>
</head>
<body>
  <h1>📍 RESERVAS DE CANAL - CANAL PUNTA INDIO</h1>
  <p style="text-align: center; color: #64748b; margin-bottom: 20px;">
    Generado el ${format(new Date(), 'dd/MM/yyyy HH:mm')}
  </p>
  
  <div class="stats">
    <div class="stat-box">
      <div class="stat-value">${stats.totalReservations}</div>
      <div class="stat-label">Total Reservas</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">${stats.cpiHours}h</div>
      <div class="stat-label">Horas CPI Clausurado</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">${stats.accHours}h</div>
      <div class="stat-label">Horas ACC Clausurado</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">${stats.claseA}</div>
      <div class="stat-label">Clase A</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">${stats.claseB}</div>
      <div class="stat-label">Clase B</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">${stats.claseC}</div>
      <div class="stat-label">Clase C</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>N°</th>
        <th>Buque</th>
        <th>Clase</th>
        <th>Agencia</th>
        <th style="background: #3b82f6;">Reserva CPI Entrada</th>
        <th style="background: #3b82f6;">Reserva ACC Entrada</th>
        <th style="background: #8b5cf6;">Reserva ACC Salida</th>
        <th style="background: #8b5cf6;">Reserva CPI Salida</th>
      </tr>
    </thead>
    <tbody>
      ${filteredReservations.map((r, i) => `
        <tr>
          <td>${i + 1}</td>
          <td style="text-align: left; font-weight: bold;">${r.buque}</td>
          <td class="clase-${r.clase.toLowerCase()}">${r.clase}</td>
          <td>${r.agencia}</td>
          <td style="background: rgba(59, 130, 246, 0.1);">${r.reservaCPIEntrada}</td>
          <td style="background: rgba(59, 130, 246, 0.1);">${r.reservaACCEntrada}</td>
          <td style="background: rgba(139, 92, 246, 0.1);">${r.reservaACCSalida}</td>
          <td style="background: rgba(139, 92, 246, 0.1);">${r.reservaCPISalida}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="footer">
    Sistema de Gestión de Cruceros Oceánicos - Canal Punta Indio KM 118.5
  </div>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');
    if (newWindow) {
      newWindow.onload = () => {
        setTimeout(() => {
          newWindow.print();
        }, 500);
      };
    }
  };

  // Formatear fecha para mostrar
  const formatReservation = (value: string) => {
    if (!value || value === 'No aplica' || value === 'Error cálculo') {
      return value;
    }
    
    try {
      const [fecha, hora] = value.split(' ');
      return (
        <div style={{ fontWeight: 'bold' }}>
          <div>{fecha}</div>
          <div>{hora}</div>
        </div>
      );
    } catch {
      return value;
    }
  };

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <div style={{ 
          textAlign: 'center', 
          color: 'white',
          padding: '40px'
        }}>
          <Anchor size={48} style={{ margin: '0 auto 20px', animation: 'spin 2s linear infinite' }} />
          <h2>Cargando Reservas de Canal...</h2>
          <p style={{ color: '#93c5fd', marginTop: '10px' }}>
            Sincronizando con Sistema de Cruceros
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                <Calendar size={32} style={{ color: '#60a5fa' }} />
                <h1 style={{ fontSize: '28px', margin: 0, fontWeight: 'bold', color: 'white' }}>
                  RESERVAS DE CANAL
                </h1>
              </div>
              <p style={{ fontSize: '14px', margin: 0, color: '#93c5fd' }}>
                📍 Canal Punta Indio - Gestión automática de reservas sincronizadas con Sistema de Cruceros
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={handleExportExcel}
                style={{
                  ...exportButtonStyle,
                  background: '#10b981',
                }}
                title="Exportar a Excel (CSV)"
              >
                <Download size={16} /> Excel
              </button>
              <button
                onClick={handleExportPDF}
                style={{
                  ...exportButtonStyle,
                  background: '#ef4444',
                }}
                title="Exportar a PDF"
              >
                <Download size={16} /> PDF
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                style={{
                  ...exportButtonStyle,
                  background: '#8b5cf6',
                }}
                title="Ver historial de cambios"
              >
                <History size={16} /> Historial
              </button>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '12px',
          padding: '15px 20px',
          marginBottom: '25px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <AlertCircle size={20} style={{ color: '#60a5fa', flexShrink: 0 }} />
          <div style={{ color: '#93c5fd', fontSize: '13px', lineHeight: '1.5' }}>
            <strong style={{ color: '#fff' }}>Sincronización automática:</strong> Las reservas se calculan automáticamente desde los datos del Sistema de Cruceros. 
            Puede realizar ajustes operativos usando el botón de edición en cada fila.
          </div>
        </div>

        {/* Search Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '25px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Search size={20} style={{ color: '#60a5fa' }} />
            <input
              type="text"
              placeholder="Buscar por buque, agencia o clase..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '10px 15px',
                color: 'white',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            {searchTerm && (
              <span style={{ color: '#93c5fd', fontSize: '13px' }}>
                {filteredReservations.length} resultado(s)
              </span>
            )}
          </div>
        </div>

        {/* Statistics - Ampliadas */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '15px', 
          marginBottom: '30px' 
        }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '5px' }}>
              {stats.totalReservations}
            </div>
            <div style={{ fontSize: '13px', color: '#6ee7b7' }}>Total Reservas</div>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '5px' }}>
              <Clock size={24} style={{ color: '#3b82f6' }} />
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>
                {stats.cpiHours}h
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#93c5fd' }}>Horas CPI Clausurado</div>
          </div>

          <div style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '5px' }}>
              <Clock size={24} style={{ color: '#8b5cf6' }} />
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>
                {stats.accHours}h
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#c4b5fd' }}>Horas ACC Clausurado</div>
          </div>

          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', marginBottom: '5px' }}>
              {stats.claseA}
            </div>
            <div style={{ fontSize: '13px', color: '#fca5a5' }}>Clase A</div>
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '5px' }}>
              {stats.claseB}
            </div>
            <div style={{ fontSize: '13px', color: '#fcd34d' }}>Clase B</div>
          </div>

          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e', marginBottom: '5px' }}>
              {stats.claseC}
            </div>
            <div style={{ fontSize: '13px', color: '#86efac' }}>Clase C</div>
          </div>
        </div>

        {/* History Modal */}
        {showHistory && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              borderRadius: '16px',
              padding: '30px',
              width: '100%',
              maxWidth: '900px',
              maxHeight: '80vh',
              overflowY: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <History size={28} style={{ color: '#8b5cf6' }} />
                  Historial de Cambios
                </h2>
                <button
                  onClick={() => setShowHistory(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#93c5fd',
                    cursor: 'pointer',
                    padding: '8px'
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              {history.length === 0 ? (
                <div style={{ 
                  padding: '60px 20px',
                  textAlign: 'center',
                  color: '#cbd5e1'
                }}>
                  <History size={48} style={{ opacity: 0.3, margin: '0 auto 15px' }} />
                  <p style={{ fontSize: '16px', margin: 0 }}>
                    No hay cambios registrados todavía
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {history.map((entry) => (
                    <div
                      key={entry.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '20px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                            {entry.buque}
                          </div>
                          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                            Por {entry.user} • {format(new Date(entry.timestamp), 'dd/MM/yyyy HH:mm')}
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {entry.changes.map((change, idx) => (
                          <div
                            key={idx}
                            style={{
                              background: 'rgba(139, 92, 246, 0.1)',
                              border: '1px solid rgba(139, 92, 246, 0.3)',
                              borderRadius: '8px',
                              padding: '12px',
                              fontSize: '13px'
                            }}
                          >
                            <div style={{ color: '#c4b5fd', marginBottom: '6px', fontWeight: '600' }}>
                              {change.field}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e2e8f0' }}>
                              <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>
                                {change.oldValue}
                              </span>
                              <span>→</span>
                              <span style={{ fontWeight: 'bold', color: '#8b5cf6' }}>
                                {change.newValue}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Table */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '0',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden'
        }}>
          {filteredReservations.length === 0 ? (
            <div style={{ 
              padding: '60px 20px',
              textAlign: 'center',
              color: '#cbd5e1'
            }}>
              <Calendar size={48} style={{ opacity: 0.3, margin: '0 auto 15px' }} />
              <p style={{ fontSize: '16px', margin: 0 }}>
                {searchTerm ? 'No se encontraron reservas con ese criterio' : 'No hay cruceros programados en el Sistema de Cruceros'}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1400px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <th style={thStyle}>Buque</th>
                    <th style={thStyle}>Clase</th>
                    <th style={thStyle}>Agencia</th>
                    <th style={{ ...thStyle, background: 'rgba(59, 130, 246, 0.2)' }} colSpan={2}>
                      ENTRADA
                    </th>
                    <th style={{ ...thStyle, background: 'rgba(139, 92, 246, 0.2)' }} colSpan={2}>
                      SALIDA
                    </th>
                    <th style={thStyle}>Acciones</th>
                  </tr>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.08)' }}>
                    <th style={thStyle}></th>
                    <th style={thStyle}></th>
                    <th style={thStyle}></th>
                    <th style={{ ...thStyle, background: 'rgba(59, 130, 246, 0.15)' }}>Reserva CPI</th>
                    <th style={{ ...thStyle, background: 'rgba(59, 130, 246, 0.15)' }}>Reserva ACC</th>
                    <th style={{ ...thStyle, background: 'rgba(139, 92, 246, 0.15)' }}>Reserva ACC</th>
                    <th style={{ ...thStyle, background: 'rgba(139, 92, 246, 0.15)' }}>Reserva CPI</th>
                    <th style={thStyle}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((reservation, index) => {
                    const isEditing = editingId === reservation.cruiseId;
                    const isOdd = index % 2 === 1;

                    return (
                      <tr 
                        key={reservation.cruiseId}
                        style={{ 
                          background: isOdd ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        <td style={tdStyle}>{reservation.buque}</td>
                        <td style={tdStyle}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            background: 
                              reservation.clase === 'A' ? 'rgba(239, 68, 68, 0.2)' :
                              reservation.clase === 'B' ? 'rgba(245, 158, 11, 0.2)' :
                              'rgba(34, 197, 94, 0.2)',
                            color:
                              reservation.clase === 'A' ? '#fca5a5' :
                              reservation.clase === 'B' ? '#fcd34d' :
                              '#86efac'
                          }}>
                            {reservation.clase}
                          </span>
                        </td>
                        <td style={tdStyle}>{reservation.agencia}</td>

                        {/* Reserva CPI Entrada */}
                        <td style={{ ...tdStyle, background: 'rgba(59, 130, 246, 0.05)' }}>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editValues.reservaCPIEntrada}
                              onChange={(e) => setEditValues({...editValues, reservaCPIEntrada: e.target.value})}
                              placeholder="dd/MM/yyyy HH:mm"
                              style={inputEditStyle}
                            />
                          ) : (
                            formatReservation(reservation.reservaCPIEntrada)
                          )}
                        </td>

                        {/* Reserva ACC Entrada */}
                        <td style={{ ...tdStyle, background: 'rgba(59, 130, 246, 0.05)' }}>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editValues.reservaACCEntrada}
                              onChange={(e) => setEditValues({...editValues, reservaACCEntrada: e.target.value})}
                              placeholder="dd/MM/yyyy HH:mm"
                              style={inputEditStyle}
                            />
                          ) : (
                            formatReservation(reservation.reservaACCEntrada)
                          )}
                        </td>

                        {/* Reserva ACC Salida */}
                        <td style={{ ...tdStyle, background: 'rgba(139, 92, 246, 0.05)' }}>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editValues.reservaACCSalida}
                              onChange={(e) => setEditValues({...editValues, reservaACCSalida: e.target.value})}
                              placeholder="dd/MM/yyyy HH:mm"
                              style={inputEditStyle}
                            />
                          ) : (
                            formatReservation(reservation.reservaACCSalida)
                          )}
                        </td>

                        {/* Reserva CPI Salida */}
                        <td style={{ ...tdStyle, background: 'rgba(139, 92, 246, 0.05)' }}>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editValues.reservaCPISalida}
                              onChange={(e) => setEditValues({...editValues, reservaCPISalida: e.target.value})}
                              placeholder="dd/MM/yyyy HH:mm"
                              style={inputEditStyle}
                            />
                          ) : (
                            formatReservation(reservation.reservaCPISalida)
                          )}
                        </td>

                        {/* Acciones */}
                        <td style={tdStyle}>
                          {isEditing ? (
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                              <button
                                onClick={() => handleSave(reservation.cruiseId)}
                                style={{
                                  ...actionButtonStyle,
                                  background: '#10b981',
                                }}
                                title="Guardar"
                              >
                                <Save size={16} />
                              </button>
                              <button
                                onClick={handleCancel}
                                style={{
                                  ...actionButtonStyle,
                                  background: '#ef4444',
                                }}
                                title="Cancelar"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEdit(reservation)}
                              style={{
                                ...actionButtonStyle,
                                background: '#3b82f6',
                              }}
                              title="Editar reservas"
                            >
                              <Edit size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          table {
            font-size: 11px !important;
          }
          
          th, td {
            padding: 8px 6px !important;
          }
        }
        
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// Estilos
const thStyle: React.CSSProperties = {
  padding: '16px 12px',
  textAlign: 'center',
  fontSize: '13px',
  fontWeight: 'bold',
  color: '#93c5fd',
  borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const tdStyle: React.CSSProperties = {
  padding: '16px 12px',
  textAlign: 'center',
  fontSize: '13px',
  color: '#e2e8f0'
};

const actionButtonStyle: React.CSSProperties = {
  padding: '8px 12px',
  border: 'none',
  borderRadius: '6px',
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.2s',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '13px',
  fontWeight: '600'
};

const inputEditStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 10px',
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '6px',
  color: 'white',
  fontSize: '12px',
  textAlign: 'center',
  outline: 'none'
};

const exportButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.2s'
};















