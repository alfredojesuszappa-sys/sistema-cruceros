import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Ship,
  ShipCrossing,
  loadShips,
  loadCrossings,
  addCrossing,
  updateCrossing,
  deleteCrossing,
  calculateEntryTimes,
  calculateExitTimes,
  getShipClass,
  exportData,
  importData,
  detectCrossingConflicts,
  applyResolution,
  generateCrossingReport,
  CrossingConflict,
  SituationStatus,
} from '../lib/ships';
import {
  Ship as ShipIcon,
  Anchor,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Edit,
  FileText,
  Search,
  X,
  Save,
} from 'lucide-react';
import { UpcomingAlerts } from './UpcomingAlerts';

interface CrossingManagerSimple2Props {
  globalSearch?: string;
}

export function CrossingManagerSimple2({ globalSearch = '' }: CrossingManagerSimple2Props) {
  const [ships, setShips] = useState<Ship[]>([]);
  const [crossings, setCrossings] = useState<ShipCrossing[]>([]);
  const [conflicts, setConflicts] = useState<CrossingConflict[]>([]);
  const [showConflicts, setShowConflicts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [renderError, setRenderError] = useState<string | null>(null);
  
  // Filtros avanzados
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterAgency, setFilterAgency] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCrossing, setEditingCrossing] = useState<ShipCrossing | null>(null);
  const [selectedShip, setSelectedShip] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [exitDate, setExitDate] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [situation, setSituation] = useState<SituationStatus>('SIN CONFIRMAR');
  
  // Delete all modal states
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Debug: Log cuando cambie el estado de crossings
  useEffect(() => {
    console.log(`🔍 Estado de cruceros actualizado: ${crossings.length} cruceros`);
    if (crossings.length > 0) {
      console.log('📋 Primeros 3 cruceros:', crossings.slice(0, 3).map(c => ({
        buque: c.ship.buque,
        entrada: c.diaEntrada,
        salida: c.diaSalida
      })));
    }
  }, [crossings]);

  // Initial load
  useEffect(() => {
    try {
      const loadedShips = loadShips();
      const loadedCrossings = loadCrossings();
      
      // 🔄 RECALCULAR AUTOMÁTICAMENTE TODOS LOS CRUCEROS EXISTENTES
      console.log('🔄 Verificando si es necesario recalcular tiempos de entrada...');
      let needsUpdate = false;
      
      const updatedCrossings = loadedCrossings.map(crossing => {
        const ship = loadedShips.find(s => s.id === crossing.shipId);
        if (!ship) return crossing;
        
        // Recalcular tiempos de entrada con la nueva constante
        const entryDateTime = new Date(`${format(crossing.diaEntrada, 'yyyy-MM-dd')}T${crossing.horaEntrada}:00`);
        const exitDateTime = new Date(`${format(crossing.diaSalida, 'yyyy-MM-dd')}T${crossing.horaSalida}:00`);
        
        const newEntry = calculateEntryTimes(ship, entryDateTime);
        const newExit = calculateExitTimes(ship, exitDateTime);
        
        // Verificar si cambió el etaPto
        if (!crossing.entry.etaPto || 
            crossing.entry.etaPto.getTime() !== newEntry.etaPto?.getTime()) {
          console.log(`⚠️ Actualizando tiempos para ${ship.buque}`);
          needsUpdate = true;
          
          // Actualizar en localStorage
          updateCrossing(crossing.id, {
            entry: newEntry,
            exit: newExit
          });
          
          return {
            ...crossing,
            entry: newEntry,
            exit: newExit
          };
        }
        
        return crossing;
      });
      
      if (needsUpdate) {
        console.log('✅ Recálculo completado. Recargando datos...');
        const reloadedCrossings = loadCrossings();
        setShips(loadedShips);
        setCrossings(reloadedCrossings);
      } else {
        console.log('✅ No se necesita recálculo');
        setShips(loadedShips);
        setCrossings(loadedCrossings);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('❌ Error al cargar cruceros:', error);
      setRenderError('Error al cargar cruceros. Por favor, inténtelo nuevamente.');
    }
  }, []);

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingCrossing(null);
    setSelectedShip('');
    setEntryDate('');
    setEntryTime('');
    setExitDate('');
    setExitTime('');
    setSituation('SIN CONFIRMAR');
  };

  const handleEdit = (crossing: ShipCrossing) => {
    setEditingCrossing(crossing);
    setSelectedShip(crossing.ship.id);
    setEntryDate(format(crossing.diaEntrada, 'yyyy-MM-dd'));
    setEntryTime(crossing.horaEntrada);
    setExitDate(format(crossing.diaSalida, 'yyyy-MM-dd'));
    setExitTime(crossing.horaSalida);
    setSituation(crossing.situation);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este crucero?')) {
      deleteCrossing(id);
      setCrossings(crossings.filter(c => c.id !== id));
    }
  };

  const handleDeleteAll = () => {
    setShowDeleteAllModal(true);
    setDeleteConfirmText('');
  };

  const confirmDeleteAll = () => {
    if (deleteConfirmText.toUpperCase() !== 'ELIMINAR TODO') {
      alert('⚠️ Debe escribir exactamente "ELIMINAR TODO" para confirmar');
      return;
    }

    // Segunda confirmación
    const finalConfirm = confirm(
      `⚠️ ÚLTIMA CONFIRMACIÓN\n\n` +
      `Está a punto de eliminar TODOS los ${crossings.length} cruceros del sistema.\n\n` +
      `Esta acción NO se puede deshacer.\n\n` +
      `¿Está absolutamente seguro de continuar?`
    );

    if (finalConfirm) {
      // Eliminar todos los cruceros
      crossings.forEach(c => deleteCrossing(c.id));
      setCrossings([]);
      setConflicts([]);
      setShowDeleteAllModal(false);
      alert('✅ Todos los cruceros han sido eliminados del sistema');
    }
  };

  const handleAddCrossing = () => {
    if (!selectedShip || !entryDate || !entryTime || !exitDate || !exitTime) {
      alert('⚠️ Por favor complete todos los campos');
      return;
    }

    const ship = ships.find(s => s.id === selectedShip);
    if (!ship) return;

    const entryDateTime = new Date(`${entryDate}T${entryTime}:00`);
    const exitDateTime = new Date(`${exitDate}T${exitTime}:00`);

    if (editingCrossing) {
      console.log('✏️ Editando crucero:', editingCrossing.id);
      
      updateCrossing(editingCrossing.id, {
        ship,
        diaEntrada: new Date(entryDate),
        horaEntrada: entryTime,
        diaSalida: new Date(exitDate),
        horaSalida: exitTime,
        situation,
        entry: calculateEntryTimes(ship, entryDateTime),
        exit: calculateExitTimes(ship, exitDateTime),
      });
      
      // Recalcular reservas después de editar
      console.log('🔄 Recalculando reservas de canal...');
      try {
        const { calculateReservations } = require('./ChannelReservations');
        const updatedCrossings = loadCrossings();
        const reservations = calculateReservations(updatedCrossings, ships);
        localStorage.setItem('channelReservations', JSON.stringify(reservations));
        console.log('✅ Reservas recalculadas:', reservations.length);
      } catch (error) {
        console.error('❌ Error recalculando reservas:', error);
      }
      
      alert('✅ Crucero actualizado exitosamente');
      
      // Cerrar form primero
      handleCloseForm();
      
      // Recargar página para asegurar que se muestre correctamente
      console.log('🔄 Recargando página...');
      setTimeout(() => {
        window.location.reload();
      }, 500);
      
    } else {
      console.log('➕ Agregando nuevo crucero');
      
      const newCrossing = addCrossing({
        ship,
        diaEntrada: new Date(entryDate),
        horaEntrada: entryTime,
        diaSalida: new Date(exitDate),
        horaSalida: exitTime,
        situation,
        entry: calculateEntryTimes(ship, entryDateTime),
        exit: calculateExitTimes(ship, exitDateTime),
      });
      
      // Recalcular reservas después de agregar
      console.log('🔄 Recalculando reservas de canal...');
      try {
        const { calculateReservations } = require('./ChannelReservations');
        const updatedCrossings = loadCrossings();
        const reservations = calculateReservations(updatedCrossings, ships);
        localStorage.setItem('channelReservations', JSON.stringify(reservations));
        console.log('✅ Reservas recalculadas:', reservations.length);
      } catch (error) {
        console.error('❌ Error recalculando reservas:', error);
      }
      
      setCrossings([...crossings, newCrossing]);
      alert('✅ Crucero agregado exitosamente');
      
      handleCloseForm();
    }
  };

  const handleUpdateStatus = (id: string, newStatus: SituationStatus) => {
    updateCrossing(id, { situation: newStatus });
    setCrossings(crossings.map(c => 
      c.id === id ? { ...c, situation: newStatus } : c
    ));
  };

  const handleFindConflicts = () => {
    const foundConflicts = detectCrossingConflicts(crossings);
    setConflicts(foundConflicts);
    setShowConflicts(true);
    
    if (foundConflicts.length === 0) {
      alert('✅ ¡No se encontraron conflictos! Todos los cruceros están programados correctamente.');
    }
  };

  const handleApplyResolution = (conflictIndex: number, suggestionIndex: number) => {
    const conflict = conflicts[conflictIndex];
    const suggestion = conflict.suggestions[suggestionIndex];
    
    applyResolution(
      suggestion.crossingId,
      suggestion.newDateTime,
      suggestion.action === 'advance-incoming' ? 'entry' : 'exit'
    );
    
    const updatedCrossings = loadCrossings();
    setCrossings(updatedCrossings);
    
    const newConflicts = detectCrossingConflicts(updatedCrossings);
    setConflicts(newConflicts);
    
    alert('✅ Resolución aplicada. Verifique los nuevos horarios.');
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cruceros-${format(new Date(), 'yyyy-MM-dd')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result as string;
        
        // Detectar si es CSV o JSON
        const isCSV = file.name.toLowerCase().endsWith('.csv') || 
                      data.trim().startsWith('Buque') || 
                      !data.trim().startsWith('{');
        
        if (isCSV) {
          // Procesar CSV
          const lines = data.split('\n').filter(line => line.trim());
          
          if (lines.length < 2) {
            alert('❌ El archivo CSV está vacío o no tiene datos');
            return;
          }
          
          // Detectar delimitador (puede ser ; o ,)
          const delimiter = lines[0].includes(';') ? ';' : ',';
          
          // Parsear header
          const headers = lines[0].split(delimiter).map(h => h.trim().toLowerCase());
          
          // Normalizar headers (quitar guiones bajos y espacios)
          const normalizedHeaders = headers.map(h => 
            h.replace(/_/g, ' ').replace(/\s+/g, ' ')
          );
          
          console.log('📄 Headers detectados:', headers);
          console.log('📄 Headers normalizados:', normalizedHeaders);
          console.log('🔍 Delimitador:', delimiter);
          
          let importedCount = 0;
          let errorCount = 0;
          
          // Procesar cada línea (excepto el header)
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const values = line.split(delimiter).map(v => v.trim());
            
            // Crear objeto con los datos usando headers normalizados
            const rowData: any = {};
            normalizedHeaders.forEach((header, index) => {
              rowData[header] = values[index] || '';
            });
            
            console.log(`Fila ${i}:`, rowData);
            
            try {
              // Buscar el buque por nombre (probar varias columnas posibles)
              const shipName = rowData['buque'] || 
                              rowData['ship'] || 
                              rowData['nombre'] ||
                              rowData['vessel'];
              
              if (!shipName) {
                console.warn(`⚠️ Nombre de buque no encontrado en fila ${i}`);
                errorCount++;
                continue;
              }
              
              const ship = ships.find(s => 
                s.buque.toLowerCase() === shipName?.toLowerCase()
              );
              
              if (!ship) {
                console.warn(`⚠️ Buque no encontrado en base de datos: "${shipName}"`);
                errorCount++;
                continue;
              }
              
              // Parsear fechas y horas (probar varias columnas posibles)
              const entryDateStr = rowData['fecha entrada'] || 
                                  rowData['dia entrada'] || 
                                  rowData['diaentrada'] ||
                                  rowData['entry date'];
              
              const entryTimeStr = rowData['hora entrada'] || 
                                  rowData['horaentrada'] || 
                                  rowData['entry time'] ||
                                  '08:00';
              
              const exitDateStr = rowData['fecha salida'] || 
                                 rowData['dia salida'] || 
                                 rowData['diasalida'] ||
                                 rowData['exit date'];
              
              const exitTimeStr = rowData['hora salida'] || 
                                 rowData['horasalida'] || 
                                 rowData['exit time'] ||
                                 '14:00';
              
              if (!entryDateStr || !exitDateStr) {
                console.warn(`⚠️ Fechas faltantes en fila ${i}`, { entryDateStr, exitDateStr });
                errorCount++;
                continue;
              }
              
              // Convertir fechas (puede venir en formato DD/MM/YYYY o YYYY-MM-DD)
              const parseDate = (dateStr: string): Date => {
                if (dateStr.includes('/')) {
                  const [day, month, year] = dateStr.split('/');
                  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                } else if (dateStr.includes('-')) {
                  return new Date(dateStr);
                }
                throw new Error('Formato de fecha no válido');
              };
              
              const entryDate = parseDate(entryDateStr);
              const exitDate = parseDate(exitDateStr);
              
              // Crear datetime completos
              const [entryHour, entryMinute] = entryTimeStr.split(':');
              const entryDateTime = new Date(entryDate);
              entryDateTime.setHours(parseInt(entryHour) || 8, parseInt(entryMinute) || 0);
              
              const [exitHour, exitMinute] = exitTimeStr.split(':');
              const exitDateTime = new Date(exitDate);
              exitDateTime.setHours(parseInt(exitHour) || 14, parseInt(exitMinute) || 0);
              
              // Determinar situación
              const situationStr = (rowData['situacion'] || 
                                   rowData['situation'] || 
                                   rowData['status'] || 
                                   'SIN CONFIRMAR').toUpperCase();
              let situation: SituationStatus = 'SIN CONFIRMAR';
              if (situationStr.includes('CONFIRM')) situation = 'CONFIRMADO';
              if (situationStr.includes('CANCEL')) situation = 'CANCELADO';
              
              // Agregar el crucero
              console.log('➕ Agregando crucero:', {
                buque: ship.buque,
                entryDate,
                exitDate,
                entryTimeStr,
                exitTimeStr
              });
              
              const newCrossing = addCrossing({
                ship,
                diaEntrada: entryDate,
                horaEntrada: entryTimeStr,
                diaSalida: exitDate,
                horaSalida: exitTimeStr,
                situation,
                entry: calculateEntryTimes(ship, entryDateTime),
                exit: calculateExitTimes(ship, exitDateTime),
                fm: rowData['fm'] || rowData['fondeadero'] || rowData['berth'] || '',
                to: rowData['to'] || rowData['turnaround'] || '',
                notes: rowData['notas'] || rowData['notes'] || rowData['observaciones'] || ''
              });
              
              console.log('✅ Crucero agregado con ID:', newCrossing.id, 'Número:', newCrossing.numero);
              
              importedCount++;
              console.log(`✅ Crucero importado: ${ship.buque}`);
              
            } catch (error) {
              console.error(`❌ Error en fila ${i}:`, error);
              errorCount++;
            }
          }
          
          // Recargar datos desde localStorage
          console.log('🔄 Recargando datos desde localStorage...');
          const loadedShips = loadShips();
          const loadedCrossings = loadCrossings();
          
          console.log(`📊 Cruceros cargados: ${loadedCrossings.length}`);
          console.log('📋 Lista de cruceros:', loadedCrossings);
          
          // Actualizar estado
          setShips(loadedShips);
          setCrossings(loadedCrossings);
          
          // Detectar conflictos después de la importación
          setTimeout(() => {
            const detectedConflicts = detectCrossingConflicts(loadedCrossings);
            setConflicts(detectedConflicts);
            console.log(`⚠️ Conflictos detectados: ${detectedConflicts.length}`);
          }, 100);
          
          // Mensaje de éxito
          alert(`✅ Importación completada\n\n` +
                `📊 Cruceros importados: ${importedCount}\n` +
                `⚠️ Errores: ${errorCount}\n` +
                `📋 Total de cruceros en sistema: ${loadedCrossings.length}`);
          
        } else {
          // Procesar JSON (funcionalidad existente)
          const result = importData(data);
          
          if (result.success) {
            const loadedShips = loadShips();
            const loadedCrossings = loadCrossings();
            setShips(loadedShips);
            setCrossings(loadedCrossings);
            alert('✅ Datos importados exitosamente desde JSON');
          } else {
            alert(`❌ Error al importar JSON: ${result.error}`);
          }
        }
        
      } catch (error) {
        console.error('❌ Error al procesar archivo:', error);
        alert(`❌ Error al procesar el archivo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    };
    reader.readAsText(file);
  };

  const handleGenerateReport = () => {
    if (conflicts.length > 0) {
      alert('⚠️ Hay conflictos sin resolver. Por favor resuelva todos los conflictos antes de generar el reporte.');
      return;
    }
    
    console.log('📊 ========== PREPARANDO REPORTE ==========');
    console.log('📊 Total de crossings:', crossings.length);
    
    // Cargar reservas desde localStorage
    let reservations: any[] = [];
    try {
      const savedReservations = localStorage.getItem('channelReservations');
      console.log('📦 localStorage channelReservations:', savedReservations ? 'EXISTE' : 'NO EXISTE');
      
      if (savedReservations) {
        reservations = JSON.parse(savedReservations);
        console.log('📊 Reservas cargadas:', reservations.length);
        
        if (reservations.length > 0) {
          console.log('📋 Primeras 3 reservas:');
          reservations.slice(0, 3).forEach((r, i) => {
            console.log(`  ${i + 1}.`, {
              cruiseId: r.cruiseId,
              buque: r.buque,
              clase: r.clase,
              CPI_IN: r.reservaCPIEntrada,
              ACC_IN: r.reservaACCEntrada
            });
          });
          
          // Verificar IDs de crossings vs IDs de reservas
          const crossingIds = new Set(crossings.map(c => c.id));
          const reservationIds = new Set(reservations.map(r => r.cruiseId));
          
          console.log('🔍 Análisis de IDs:');
          console.log('  - Crossing IDs:', Array.from(crossingIds).slice(0, 5));
          console.log('  - Reservation cruiseIds:', Array.from(reservationIds).slice(0, 5));
          
          const matching = reservations.filter(r => crossingIds.has(r.cruiseId));
          console.log(`  - Coincidencias: ${matching.length}/${reservations.length}`);
        }
      } else {
        console.warn('⚠️ No hay reservas guardadas en localStorage');
      }
    } catch (error) {
      console.error('❌ Error al cargar reservas:', error);
    }
    
    console.log('🚀 Generando HTML del reporte...');
    const html = generateCrossingReport(crossings, ships, reservations);
    console.log('✅ HTML generado, tamaño:', html.length, 'caracteres');
    
    // Abrir en nueva ventana para imprimir como PDF
    const reportWindow = window.open('', '_blank');
    
    if (!reportWindow) {
      alert('❌ No se pudo abrir la ventana del reporte.\n\nPor favor, permita las ventanas emergentes en su navegador.');
      return;
    }
    
    reportWindow.document.write(html);
    reportWindow.document.close();
    
    // Esperar a que cargue y luego mostrar el diálogo de impresión
    reportWindow.onload = () => {
      console.log('✅ Reporte cargado en nueva ventana');
      // No auto-imprimir, dejar que el usuario lo haga manualmente
    };
    
    console.log('✅ Reporte abierto en nueva ventana');
    alert('✅ Reporte A3 generado exitosamente!\n\n📄 El reporte se abrió en una nueva ventana.\n\n🖨️ Use Ctrl+P para imprimir en formato A3 horizontal.');
  };

  const getStatusIcon = (status: SituationStatus) => {
    switch (status) {
      case 'CONFIRMADO':
        return <CheckCircle size={16} style={{ color: '#22c55e' }} />;
      case 'CANCELADO':
        return <XCircle size={16} style={{ color: '#ef4444' }} />;
      default:
        return <AlertTriangle size={16} style={{ color: '#eab308' }} />;
    }
  };

  const getClassColor = (classType: string) => {
    switch (classType) {
      case 'A': return '#ef4444';
      case 'B': return '#f59e0b';
      case 'C': return '#22c55e';
      default: return '#64748b';
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
          <Anchor size={48} style={{ margin: '0 auto 20px' }} />
          <h2>Cargando Sistema de Cruceros...</h2>
        </div>
      </div>
    );
  }

  if (renderError) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ 
          textAlign: 'center', 
          color: 'white',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }}>
          <AlertTriangle size={48} style={{ color: '#fbbf24', marginBottom: '20px' }} />
          <h2>Error al cargar cruceros</h2>
          <p style={{ color: '#93c5fd', marginTop: '15px' }}>
            {renderError}
          </p>
        </div>
      </div>
    );
  }

  const sortedCrossings = [...crossings].sort((a, b) => 
    a.diaEntrada.getTime() - b.diaEntrada.getTime()
  );

  // Aplicar filtros y búsqueda
  const filteredCrossings = sortedCrossings.filter(crossing => {
    // Búsqueda global
    if (globalSearch) {
      const searchLower = globalSearch.toLowerCase();
      const matchesSearch = 
        crossing.ship.buque.toLowerCase().includes(searchLower) ||
        crossing.ship.imo?.toLowerCase().includes(searchLower) ||
        crossing.ship.agencia?.toLowerCase().includes(searchLower) ||
        crossing.ship.bandera?.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Filtros de rango de fechas
    if (filterStartDate && crossing.diaEntrada < new Date(filterStartDate)) {
      return false;
    }
    if (filterEndDate && crossing.diaEntrada > new Date(filterEndDate)) {
      return false;
    }

    // Filtro por clase
    if (filterClass && getShipClass(crossing.ship.calado) !== filterClass) {
      return false;
    }

    // Filtro por agencia
    if (filterAgency && crossing.ship.agencia !== filterAgency) {
      return false;
    }

    // Filtro por estado
    if (filterStatus && crossing.situation !== filterStatus) {
      return false;
    }

    return true;
  });

  const uniqueAgencies = Array.from(new Set(ships.map(s => s.agencia).filter(Boolean)));

  const hasConflicts = conflicts.length > 0;

  try {
    return (
      <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '25px',
            marginBottom: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
              <Anchor size={32} style={{ color: '#60a5fa' }} />
              <h1 style={{ fontSize: '28px', margin: 0, fontWeight: 'bold', color: 'white' }}>
                SISTEMA DE CRUCEROS OCEÁNICOS
              </h1>
            </div>
            <p style={{ fontSize: '14px', margin: 0, color: '#93c5fd' }}>
              📍 Canal Punta Indio - KM 118.5 | Gestión de movimientos y detección de conflictos
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <button
              onClick={handleFindConflicts}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#f59e0b',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#d97706';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#f59e0b';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Search size={18} /> Buscar Conflictos
            </button>

            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: '#3b82f6',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#2563eb';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <Upload size={18} /> Importar
              <input type="file" accept=".xlsx,.xls,.csv" onChange={handleImport} style={{ display: 'none' }} />
            </label>

            <button
              onClick={handleExport}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#10b981',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#059669';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#10b981';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Download size={18} /> Exportar
            </button>

            <button
              onClick={handleDeleteAll}
              disabled={crossings.length === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: crossings.length === 0 
                  ? 'rgba(239, 68, 68, 0.3)'
                  : '#ef4444',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: crossings.length === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: crossings.length === 0 ? 0.5 : 1
              }}
              onMouseOver={(e) => {
                if (crossings.length > 0) {
                  e.currentTarget.style.background = '#dc2626';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseOut={(e) => {
                if (crossings.length > 0) {
                  e.currentTarget.style.background = '#ef4444';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <AlertTriangle size={18} /> Eliminar Todos
            </button>

            {!hasConflicts && crossings.length > 0 && (
              <button
                onClick={handleGenerateReport}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: '#10b981',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#059669';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#10b981';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FileText size={18} /> Generar Reporte A3
              </button>
            )}
          </div>

          {/* Upcoming Alerts */}
          <UpcomingAlerts crossings={crossings} />

          {/* Advanced Filters */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '30px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: 'rgba(96, 165, 250, 0.2)',
                border: '1px solid rgba(96, 165, 250, 0.4)',
                borderRadius: '8px',
                color: '#60a5fa',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: showFilters ? '20px' : 0
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(96, 165, 250, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(96, 165, 250, 0.2)';
              }}
            >
              {showFilters ? '▼' : '▶'} Filtros Avanzados
              {(filterStartDate || filterEndDate || filterClass || filterAgency || filterStatus) && (
                <span style={{
                  padding: '2px 8px',
                  background: '#3b82f6',
                  borderRadius: '12px',
                  fontSize: '11px',
                  color: 'white'
                }}>
                  Activos
                </span>
              )}
            </button>

            {showFilters && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px'
              }}>
                <div>
                  <label style={{ 
                    color: '#93c5fd', 
                    display: 'block', 
                    marginBottom: '6px', 
                    fontSize: '13px', 
                    fontWeight: '600' 
                  }}>
                    📅 Desde
                  </label>
                  <input
                    type="date"
                    value={filterStartDate}
                    onChange={(e) => setFilterStartDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    color: '#93c5fd', 
                    display: 'block', 
                    marginBottom: '6px', 
                    fontSize: '13px', 
                    fontWeight: '600' 
                  }}>
                    📅 Hasta
                  </label>
                  <input
                    type="date"
                    value={filterEndDate}
                    onChange={(e) => setFilterEndDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    color: '#93c5fd', 
                    display: 'block', 
                    marginBottom: '6px', 
                    fontSize: '13px', 
                    fontWeight: '600' 
                  }}>
                    🚢 Clase
                  </label>
                  <select
                    value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="" style={{ background: '#1e293b' }}>Todas</option>
                    <option value="A" style={{ background: '#1e293b' }}>Clase A</option>
                    <option value="B" style={{ background: '#1e293b' }}>Clase B</option>
                    <option value="C" style={{ background: '#1e293b' }}>Clase C</option>
                  </select>
                </div>

                <div>
                  <label style={{ 
                    color: '#93c5fd', 
                    display: 'block', 
                    marginBottom: '6px', 
                    fontSize: '13px', 
                    fontWeight: '600' 
                  }}>
                    🏢 Agencia
                  </label>
                  <input
                    type="text"
                    placeholder="Filtrar por agencia..."
                    value={filterAgency}
                    onChange={(e) => setFilterAgency(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    color: '#93c5fd', 
                    display: 'block', 
                    marginBottom: '6px', 
                    fontSize: '13px', 
                    fontWeight: '600' 
                  }}>
                    📋 Estado
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="" style={{ background: '#1e293b' }}>Todos</option>
                    <option value="SIN CONFIRMAR" style={{ background: '#1e293b' }}>Sin Confirmar</option>
                    <option value="CONFIRMADO" style={{ background: '#1e293b' }}>Confirmado</option>
                    <option value="CANCELADO" style={{ background: '#1e293b' }}>Cancelado</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button
                    onClick={() => {
                      setFilterStartDate('');
                      setFilterEndDate('');
                      setFilterClass('');
                      setFilterAgency('');
                      setFilterStatus('');
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.5)',
                      borderRadius: '8px',
                      color: '#f87171',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                  >
                    Limpiar Filtros
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Conflicts Section */}
          {showConflicts && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '25px',
              marginBottom: '30px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <AlertTriangle size={28} style={{ color: '#fbbf24' }} />
                <h2 style={{ margin: 0, color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                  {conflicts.length === 0 ? '✅ Sin Conflictos' : `⚠️ ${conflicts.length} Conflicto(s) Detectado(s)`}
                </h2>
              </div>

              {conflicts.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {conflicts.map((conflict, index) => (
                    <div key={index} style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.5)',
                      borderRadius: '12px',
                      padding: '20px'
                    }}>
                      <div style={{ color: 'white', marginBottom: '15px' }}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#fef2f2' }}>
                          🚨 Conflicto en KM 118.5
                        </h3>
                        <p style={{ margin: '5px 0', fontSize: '14px' }}>
                          <strong>Buque Entrante:</strong> {conflict.entryShip.ship.buque}
                          {' → ETA KM 118.5: '}
                          <span style={{ color: '#fbbf24' }}>
                            {conflict.entryShip.entry.km118_5 
                              ? format(conflict.entryShip.entry.km118_5, 'dd/MM HH:mm')
                              : '-'}
                          </span>
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '14px' }}>
                          <strong>Buque Saliente:</strong> {conflict.exitShip.ship.buque}
                          {' → ETD KM 118.5: '}
                          <span style={{ color: '#fbbf24' }}>
                            {conflict.exitShip.exit.km118_5 
                              ? format(conflict.exitShip.exit.km118_5, 'dd/MM HH:mm')
                              : '-'}
                          </span>
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '14px' }}>
                          <strong>Diferencia:</strong> {Math.round(conflict.timeDifference)} minutos
                        </p>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h4 style={{ color: '#bfdbfe', margin: '0 0 10px 0' }}>
                          💡 Soluciones Propuestas:
                        </h4>
                        {conflict.suggestions.map((suggestion, suggestionIndex) => (
                          <div key={suggestionIndex} style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '15px',
                            borderRadius: '12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <div style={{ flex: 1 }}>
                              <p style={{ margin: '0 0 5px 0', color: 'white', fontSize: '13px' }}>
                                <strong>{suggestion.action === 'delay-outgoing' ? '⏰ Retrasar Salida' : '⏰ Adelantar Entrada'}</strong>
                              </p>
                              <p style={{ margin: '0', color: '#e2e8f0', fontSize: '12px' }}>
                                {suggestion.shipName} → {format(suggestion.newDateTime, 'dd/MM HH:mm')}
                              </p>
                              <p style={{ margin: '5px 0 0 0', color: '#cbd5e1', fontSize: '11px' }}>
                                {suggestion.reason}
                              </p>
                            </div>
                            <button
                              onClick={() => handleApplyResolution(index, suggestionIndex)}
                              style={{
                                padding: '10px 20px',
                                background: '#22c55e',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '13px',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              Aplicar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Crossings Table */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative'
          }}>
            <h2 style={{ 
              marginBottom: '25px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              <ShipIcon size={28} style={{ color: '#60a5fa' }} /> 
              📋 Planilla de Cruceros
              <span style={{
                padding: '6px 14px',
                background: '#3b82f6',
                borderRadius: '20px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '700'
              }}>
                {filteredCrossings.length} {filteredCrossings.length !== crossings.length && `de ${crossings.length}`}
              </span>
            </h2>

            <button
              onClick={() => setShowAddForm(true)}
              style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#10b981',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                zIndex: 10
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#059669';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#10b981';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Plus size={18} /> Agregar Crucero
            </button>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: 'rgba(96, 165, 250, 0.1)', borderBottom: '2px solid rgba(96, 165, 250, 0.3)' }}>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#60a5fa', width: '40px' }}>N°</th>
                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', color: '#60a5fa', minWidth: '180px' }}>Buque</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#60a5fa', minWidth: '95px' }}>📥 Inicio Tránsito</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#22c55e', minWidth: '95px' }}>ETA KM 118.5</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#22c55e', minWidth: '95px' }}>ETA KM 59 (C)</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#10b981', minWidth: '95px' }}>⚓ Amarre (ETA Pto)</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#f59e0b', minWidth: '95px' }}>🚢 Zarpada (ETD Pto)</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#f87171', minWidth: '95px' }}>ETD KM 59 (C)</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#f87171', minWidth: '95px' }}>ETD KM 118.5</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#60a5fa', minWidth: '95px' }}>🚢 Fin Tránsito</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#60a5fa', minWidth: '120px' }}>Estado</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#60a5fa', minWidth: '150px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCrossings.length === 0 ? (
                    <tr>
                      <td colSpan={12} style={{ padding: '60px', textAlign: 'center', color: '#cbd5e1' }}>
                        <ShipIcon size={48} style={{ opacity: 0.3, margin: '0 auto 15px', display: 'block' }} />
                        <p style={{ margin: 0, fontWeight: '600' }}>
                          {crossings.length === 0 
                            ? 'No hay cruceros registrados' 
                            : 'No hay cruceros que coincidan con los filtros'}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredCrossings.map((crossing, index) => {
                      const shipClass = getShipClass(crossing.ship.calado);
                      const classColor = getClassColor(shipClass);

                      return (
                        <tr 
                          key={crossing.id}
                          style={{ 
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'background 0.15s'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ 
                            padding: '10px', 
                            textAlign: 'center', 
                            fontWeight: '700', 
                            color: classColor,
                            borderLeft: `3px solid ${classColor}`
                          }}>
                            {index + 1}
                          </td>
                          
                          <td style={{ padding: '10px' }}>
                            <div style={{ fontWeight: '700', color: 'white', fontSize: '13px', marginBottom: '3px' }}>
                              {crossing.ship.buque}
                            </div>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                              {crossing.ship.bandera} · IMO {crossing.ship.imo}
                            </div>
                            <span style={{
                              display: 'inline-block',
                              marginTop: '4px',
                              padding: '2px 8px',
                              background: classColor,
                              color: 'white',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '700'
                            }}>
                              CLASE {shipClass}
                            </span>
                          </td>

                          {/* Entrada */}
                          <td style={{ padding: '10px', textAlign: 'center', color: 'white' }}>
                            <div style={{ fontWeight: '600', fontSize: '13px' }}>
                              {format(crossing.diaEntrada, 'dd/MM/yy')}
                            </div>
                            <div style={{ color: '#93c5fd', fontSize: '13px', marginTop: '2px' }}>
                              {crossing.horaEntrada}
                            </div>
                          </td>

                          {/* Inicio Tránsito (Entrada al canal) */}
                          <td style={{ padding: '10px', textAlign: 'center', color: 'white' }}>
                            <div style={{ fontWeight: '600', fontSize: '13px' }}>
                              {format(crossing.diaEntrada, 'dd/MM/yy')}
                            </div>
                            <div style={{ color: '#93c5fd', fontSize: '13px', marginTop: '2px' }}>
                              {crossing.horaEntrada}
                            </div>
                          </td>

                          {/* ETA KM 59 (C) - Solo Clase C */}
                          <td style={{ padding: '10px', textAlign: 'center', background: shipClass === 'C' ? 'rgba(34, 197, 94, 0.15)' : 'transparent' }}>
                            {shipClass === 'C' && crossing.entry.km59_in ? (
                              <>
                                <div style={{ fontWeight: '700', color: '#22c55e', fontSize: '13px' }}>
                                  {format(crossing.entry.km59_in, 'dd/MM/yy')}
                                </div>
                                <div style={{ color: '#4ade80', fontSize: '14px', fontWeight: '700', marginTop: '2px' }}>
                                  {format(crossing.entry.km59_in, 'HH:mm')}
                                </div>
                              </>
                            ) : <span style={{ color: '#64748b' }}>—</span>}
                          </td>

                          {/* ⚓ Amarre (ETA Puerto KM 0) - VERDE INTENSO */}
                          <td style={{ padding: '10px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.25)', border: '2px solid rgba(16, 185, 129, 0.5)' }}>
                            {crossing.entry?.etaPto && crossing.entry.etaPto instanceof Date && !isNaN(crossing.entry.etaPto.getTime()) ? (
                              <>
                                <div style={{ fontWeight: '800', color: '#10b981', fontSize: '13px' }}>
                                  {format(crossing.entry.etaPto, 'dd/MM/yy')}
                                </div>
                                <div style={{ color: '#34d399', fontSize: '15px', fontWeight: '800', marginTop: '2px' }}>
                                  {format(crossing.entry.etaPto, 'HH:mm')}
                                </div>
                              </>
                            ) : <span style={{ color: '#64748b' }}>—</span>}
                          </td>

                          {/* 🚢 Zarpada (ETD Puerto KM 0) - NARANJA */}
                          <td style={{ padding: '10px', textAlign: 'center', background: 'rgba(245, 158, 11, 0.25)', border: '2px solid rgba(245, 158, 11, 0.5)' }}>
                            {crossing.exit?.etdPto && crossing.exit.etdPto instanceof Date && !isNaN(crossing.exit.etdPto.getTime()) ? (
                              <>
                                <div style={{ fontWeight: '800', color: '#f59e0b', fontSize: '13px' }}>
                                  {format(crossing.exit.etdPto, 'dd/MM/yy')}
                                </div>
                                <div style={{ color: '#fbbf24', fontSize: '15px', fontWeight: '800', marginTop: '2px' }}>
                                  {format(crossing.exit.etdPto, 'HH:mm')}
                                </div>
                              </>
                            ) : <span style={{ color: '#64748b' }}>—</span>}
                          </td>

                          {/* ETD KM 59 (C) - Solo Clase C */}
                          <td style={{ padding: '10px', textAlign: 'center', background: shipClass === 'C' ? 'rgba(239, 68, 68, 0.15)' : 'transparent' }}>
                            {shipClass === 'C' && crossing.exit.km59 ? (
                              <>
                                <div style={{ fontWeight: '700', color: '#f87171', fontSize: '13px' }}>
                                  {format(crossing.exit.km59, 'dd/MM/yy')}
                                </div>
                                <div style={{ color: '#fca5a5', fontSize: '14px', fontWeight: '700', marginTop: '2px' }}>
                                  {format(crossing.exit.km59, 'HH:mm')}
                                </div>
                              </>
                            ) : <span style={{ color: '#64748b' }}>—</span>}
                          </td>

                          {/* ETD KM 118.5 */}
                          <td style={{ padding: '10px', textAlign: 'center', background: 'rgba(239, 68, 68, 0.15)' }}>
                            {crossing.exit.km118_5 ? (
                              <>
                                <div style={{ fontWeight: '700', color: '#f87171', fontSize: '13px' }}>
                                  {format(crossing.exit.km118_5, 'dd/MM/yy')}
                                </div>
                                <div style={{ color: '#fca5a5', fontSize: '14px', fontWeight: '700', marginTop: '2px' }}>
                                  {format(crossing.exit.km118_5, 'HH:mm')}
                                </div>
                              </>
                            ) : <span style={{ color: '#64748b' }}>—</span>}
                          </td>

                          {/* Salida */}
                          <td style={{ padding: '10px', textAlign: 'center', color: 'white' }}>
                            {(shipClass === 'A' && crossing.exit.km239) ? (
                              <>
                                <div style={{ fontWeight: '600', fontSize: '13px' }}>
                                  {format(crossing.exit.km239, 'dd/MM/yy')}
                                </div>
                                <div style={{ color: '#93c5fd', fontSize: '13px', marginTop: '2px' }}>
                                  {format(crossing.exit.km239, 'HH:mm')}
                                </div>
                              </>
                            ) : (shipClass === 'B' && crossing.exit.km216) ? (
                              <>
                                <div style={{ fontWeight: '600', fontSize: '13px' }}>
                                  {format(crossing.exit.km216, 'dd/MM/yy')}
                                </div>
                                <div style={{ color: '#93c5fd', fontSize: '13px', marginTop: '2px' }}>
                                  {format(crossing.exit.km216, 'HH:mm')}
                                </div>
                              </>
                            ) : (shipClass === 'C' && crossing.exit.km59) ? (
                              <>
                                <div style={{ fontWeight: '600', fontSize: '13px' }}>
                                  {format(crossing.exit.km59, 'dd/MM/yy')}
                                </div>
                                <div style={{ color: '#93c5fd', fontSize: '13px', marginTop: '2px' }}>
                                  {format(crossing.exit.km59, 'HH:mm')}
                                </div>
                              </>
                            ) : <span style={{ color: '#64748b' }}>—</span>}
                          </td>

                          {/* Estado */}
                          <td style={{ padding: '10px', textAlign: 'center' }}>
                            <select
                              value={crossing.situation}
                              onChange={(e) => handleUpdateStatus(crossing.id, e.target.value as SituationStatus)}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '6px',
                                border: '1px solid',
                                borderColor: crossing.situation === 'CONFIRMADO' ? '#22c55e' : crossing.situation === 'CANCELADO' ? '#94a3b8' : '#eab308',
                                fontSize: '10px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                background: crossing.situation === 'CONFIRMADO' ? 'rgba(34, 197, 94, 0.2)' : crossing.situation === 'CANCELADO' ? 'rgba(148, 163, 184, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                                color: crossing.situation === 'CONFIRMADO' ? '#22c55e' : crossing.situation === 'CANCELADO' ? '#94a3b8' : '#eab308'
                              }}
                            >
                              <option value="SIN CONFIRMAR">SIN CONFIRMAR</option>
                              <option value="CONFIRMADO">CONFIRMADO</option>
                              <option value="CANCELADO">CANCELADO</option>
                            </select>
                          </td>

                          {/* Acciones */}
                          <td style={{ padding: '10px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                              <button
                                onClick={() => handleEdit(crossing)}
                                style={{
                                  padding: '6px 12px',
                                  background: 'rgba(59, 130, 246, 0.2)',
                                  border: '1px solid rgba(59, 130, 246, 0.5)',
                                  borderRadius: '6px',
                                  color: '#60a5fa',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontSize: '11px',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'}
                              >
                                <Edit size={12} />
                                Editar
                              </button>

                              <button
                                onClick={() => handleDelete(crossing.id)}
                                style={{
                                  padding: '6px 12px',
                                  background: 'rgba(239, 68, 68, 0.2)',
                                  border: '1px solid rgba(239, 68, 68, 0.5)',
                                  borderRadius: '6px',
                                  color: '#f87171',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontSize: '11px',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                              >
                                <Trash2 size={12} />
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Form Modal */}
        {showAddForm && (
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
              maxWidth: '800px',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: 'white' }}>
                  {editingCrossing ? '✏️ Editar Crucero' : '➕ Agregar Nuevo Crucero'}
                </h2>
                <button
                  onClick={handleCloseForm}
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ 
                    color: '#93c5fd', 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px', 
                    fontWeight: '600' 
                  }}>
                    🚢 Buque
                  </label>
                  <select
                    value={selectedShip}
                    onChange={(e) => setSelectedShip(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Seleccionar buque...</option>
                    {ships.map(ship => (
                      <option key={ship.id} value={ship.id} style={{ background: '#1e293b' }}>
                        {ship.buque} - Clase {getShipClass(ship.calado)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ 
                    color: '#93c5fd', 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px', 
                    fontWeight: '600' 
                  }}>
                    📥 Fecha Entrada
                  </label>
                  <input
                    type="date"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    color: '#93c5fd', 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px', 
                    fontWeight: '600' 
                  }}>
                    🕐 Hora Entrada
                  </label>
                  <input
                    type="time"
                    value={entryTime}
                    onChange={(e) => setEntryTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    color: '#93c5fd', 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px', 
                    fontWeight: '600' 
                  }}>
                    📤 Fecha Salida
                  </label>
                  <input
                    type="date"
                    value={exitDate}
                    onChange={(e) => setExitDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    color: '#93c5fd', 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px', 
                    fontWeight: '600' 
                  }}>
                    🕐 Hora Salida
                  </label>
                  <input
                    type="time"
                    value={exitTime}
                    onChange={(e) => setExitTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ 
                    color: '#93c5fd', 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px', 
                    fontWeight: '600' 
                  }}>
                    📋 Estado
                  </label>
                  <select
                    value={situation}
                    onChange={(e) => setSituation(e.target.value as SituationStatus)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="SIN CONFIRMAR" style={{ background: '#1e293b' }}>⏳ Sin Confirmar</option>
                    <option value="CONFIRMADO" style={{ background: '#1e293b' }}>✓ Confirmado</option>
                    <option value="CANCELADO" style={{ background: '#1e293b' }}>✖ Cancelado</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <button
                  type="button"
                  onClick={handleAddCrossing}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    background: '#3b82f6',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
                >
                  <Save size={18} />
                  {editingCrossing ? 'Guardar Cambios' : 'Agregar Crucero'}
                </button>

                <button
                  type="button"
                  onClick={handleCloseForm}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#93c5fd',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete All Modal */}
        {showDeleteAllModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '600px',
              width: '100%',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              border: '3px solid #fca5a5'
            }}>
              <button
                onClick={() => {
                  setShowDeleteAllModal(false);
                  setDeleteConfirmText('');
                }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={24} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <AlertTriangle size={60} style={{ color: '#fef3c7', marginBottom: '20px' }} />
                <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '800', marginBottom: '15px' }}>
                  ⚠️ ADVERTENCIA CRÍTICA
                </h2>
                <p style={{ color: 'white', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Está a punto de <strong>ELIMINAR TODOS LOS {crossings.length} CRUCEROS</strong> del sistema.
                </p>
                <p style={{ color: '#fef3c7', fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                  ⛔ Esta acción es PERMANENTE e IRREVERSIBLE
                </p>
                <p style={{ color: '#fef3c7', fontSize: '14px', marginBottom: '0' }}>
                  ⛔ NO se puede deshacer
                </p>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ 
                  color: 'white', 
                  display: 'block', 
                  marginBottom: '12px', 
                  fontSize: '15px', 
                  fontWeight: '700',
                  textAlign: 'center'
                }}>
                  Para confirmar, escriba exactamente:<br/>
                  <span style={{ 
                    fontSize: '18px', 
                    color: '#fef3c7',
                    fontFamily: 'monospace',
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'inline-block',
                    marginTop: '10px'
                  }}>
                    ELIMINAR TODO
                  </span>
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="Escriba aquí..."
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    fontSize: '16px',
                    textAlign: 'center',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}
                  autoFocus
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    setShowDeleteAllModal(false);
                    setDeleteConfirmText('');
                  }}
                  style={{
                    padding: '16px 32px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#dc2626',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '16px'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeleteAll}
                  disabled={deleteConfirmText.toUpperCase() !== 'ELIMINAR TODO'}
                  style={{
                    padding: '16px 32px',
                    background: deleteConfirmText.toUpperCase() === 'ELIMINAR TODO'
                      ? 'linear-gradient(145deg, #fbbf24, #f59e0b)'
                      : 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    cursor: deleteConfirmText.toUpperCase() === 'ELIMINAR TODO' ? 'pointer' : 'not-allowed',
                    fontWeight: '700',
                    fontSize: '16px',
                    opacity: deleteConfirmText.toUpperCase() === 'ELIMINAR TODO' ? 1 : 0.5
                  }}
                >
                  ⚠️ CONFIRMAR ELIMINACIÓN
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('❌ Error al renderizar:', error);
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ 
          textAlign: 'center', 
          color: 'white',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }}>
          <AlertTriangle size={48} style={{ color: '#fbbf24', marginBottom: '20px' }} />
          <h2>Error al renderizar el sistema de cruceros</h2>
          <p style={{ color: '#93c5fd', marginTop: '15px' }}>
            {error instanceof Error ? error.message : 'Error desconocido'}
          </p>
        </div>
      </div>
    );
  }
}











