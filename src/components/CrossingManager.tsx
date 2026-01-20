import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Ship,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  FileSpreadsheet,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Settings,
  Trash2,
  Edit,
  Eye,
  Save,
  X,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Upload as FileUp,
  Download as FileDown,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { baseUrl } from '../lib/base-url';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from './ui/alert';
import type {
  Ship as ShipType,
  ShipCrossing,
  SituationStatus,
  CrossingConflict,
} from '../lib/ships';
import {
  loadShips,
  loadCrossings,
  saveCrossings,
  addCrossing,
  updateCrossing,
  deleteCrossing,
  addShip,
  updateShip,
  deleteShip,
  saveShips,
  calculateEntryTimes,
  calculateExitTimes,
  detectCrossingConflicts,
  getShipClass,
  exportData,
  importData,
  applyResolution,
} from '../lib/ships';
import {
  downloadExcelTemplate,
  parseCSVImport,
  convertImportedRowToCrossing,
  validateImportedRow,
  type CrossingImportRow,
} from '../lib/excelTemplate';
import { CrossingTimeline } from './CrossingTimeline';
import { CrossingTable } from './CrossingTable';

// Componente especializado para descarga que evita interceptación
const DownloadButton = () => {
  return (
    <a
      href={`${baseUrl}/api/download-template`}
      download="PLANILLA_CRUCEROS_VACIA.csv"
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input h-9 px-4 py-2 bg-green-500 hover:bg-green-600 text-white border-0 btn-floating"
    >
      <FileSpreadsheet className="w-4 h-4 mr-2" />
      Descargar Planilla
    </a>
  );
};

export function CrossingManager() {
  console.log('🚢 CrossingManager component is rendering');
  
  const [ships, setShips] = useState<ShipType[]>([]);
  const [crossings, setCrossings] = useState<ShipCrossing[]>([]);
  const [conflicts, setConflicts] = useState<CrossingConflict[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isShipManagementOpen, setIsShipManagementOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [safetyMargin, setSafetyMargin] = useState(30);
  
  // Form state
  const [selectedShipId, setSelectedShipId] = useState<string>('');
  const [diaEntrada, setDiaEntrada] = useState<string>('');
  const [horaEntrada, setHoraEntrada] = useState<string>('');
  const [diaSalida, setDiaSalida] = useState<string>('');
  const [horaSalida, setHoraSalida] = useState<string>('');
  const [fm, setFm] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [situation, setSituation] = useState<SituationStatus>('SIN CONFIRMAR');
  const [notes, setNotes] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Load data
  useEffect(() => {
    setShips(loadShips());
    setCrossings(loadCrossings());
  }, []);

  // Real-time validation
  useEffect(() => {
    if (!selectedShipId || !diaEntrada || !horaEntrada || !diaSalida || !horaSalida) {
      setValidationErrors([]);
      return;
    }

    const errors: string[] = [];
    
    const entryDateTime = new Date(diaEntrada);
    const [entryHour, entryMinute] = horaEntrada.split(':').map(Number);
    entryDateTime.setHours(entryHour, entryMinute, 0, 0);
    
    const exitDateTime = new Date(diaSalida);
    const [exitHour, exitMinute] = horaSalida.split(':').map(Number);
    exitDateTime.setHours(exitHour, exitMinute, 0, 0);

    // Basic temporal validation
    if (exitDateTime <= entryDateTime) {
      errors.push('❌ La fecha/hora de salida debe ser posterior a la de entrada');
    } else {
      const ship = ships.find(s => s.id === selectedShipId);
      if (ship) {
        // Calculate estimated arrival
        const entry = calculateEntryTimes(ship, entryDateTime);
        const amarreTime = entry.km0;
        
        if (exitDateTime < amarreTime) {
          const amarreStr = amarreTime.toLocaleString('es-AR', { 
            day: '2-digit', 
            month: '2-digit',
            hour: '2-digit', 
            minute: '2-digit' 
          });
          errors.push(
            `❌ El buque amarra aprox. a las ${amarreStr}. ` +
            `La salida no puede ser antes de esa hora.`
          );
        }
      }
    }
    
    setValidationErrors(errors);
  }, [selectedShipId, diaEntrada, horaEntrada, diaSalida, horaSalida, ships]);

  // Manual conflict detection
  const handleDetectConflicts = () => {
    const detectedConflicts = detectCrossingConflicts(crossings, safetyMargin);
    setConflicts(detectedConflicts);
    
    if (detectedConflicts.length > 0) {
      setIsTimelineOpen(true);
    } else {
      alert('✅ No se detectaron conflictos. Todos los cruceros están correctamente espaciados.');
    }
  };

  // Sorted crossings by date
  const sortedCrossings = useMemo(() => {
    return [...crossings].sort((a, b) => a.diaEntrada.getTime() - b.diaEntrada.getTime());
  }, [crossings]);

  // Check if there are any active conflicts
  const hasActiveConflicts = conflicts.some(
    c => c.entryShip.situation !== 'CANCELADO' && c.exitShip.situation !== 'CANCELADO'
  );

  const handleAddCrossing = () => {
    // Reset validation errors
    setValidationErrors([]);
    
    if (!selectedShipId || !diaEntrada || !horaEntrada || !diaSalida || !horaSalida) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const ship = ships.find(s => s.id === selectedShipId);
    if (!ship) return;

    console.log('🔧 PARSEANDO FECHAS SIN TIMEZONE:');
    console.log('  Input diaEntrada:', diaEntrada); // "YYYY-MM-DD"
    console.log('  Input horaEntrada:', horaEntrada); // "HH:mm"
    console.log('  Input diaSalida:', diaSalida); // "YYYY-MM-DD"
    console.log('  Input horaSalida:', horaSalida); // "HH:mm"

    // CORRECCIÓN: Parsear fechas sin timezone
    // Input type="date" devuelve "YYYY-MM-DD" (ISO format sin hora)
    // Debemos crear la fecha manualmente para evitar problemas de timezone
    const [entryYear, entryMonth, entryDay] = diaEntrada.split('-').map(Number);
    const entryDateTime = new Date(entryYear, entryMonth - 1, entryDay, 0, 0, 0, 0);
    const [entryHour, entryMinute] = horaEntrada.split(':').map(Number);
    entryDateTime.setHours(entryHour, entryMinute, 0, 0);
    
    const [exitYear, exitMonth, exitDay] = diaSalida.split('-').map(Number);
    const exitDateTime = new Date(exitYear, exitMonth - 1, exitDay, 0, 0, 0, 0);
    const [exitHour, exitMinute] = horaSalida.split(':').map(Number);
    exitDateTime.setHours(exitHour, exitMinute, 0, 0);

    console.log('📅 FECHAS FINALES (SIN TIMEZONE):');
    console.log('  entryDateTime:', entryDateTime.toISOString());
    console.log('  entryDateTime (local):', entryDateTime.toString());
    console.log('  exitDateTime:', exitDateTime.toISOString());
    console.log('  exitDateTime (local):', exitDateTime.toString());

    // ===== VALIDACIÓN LÓGICA =====
    const errors: string[] = [];
    
    // 1. La fecha de salida no puede ser anterior a la fecha de entrada
    if (exitDateTime <= entryDateTime) {
      errors.push('❌ ERROR TEMPORAL: La fecha/hora de salida debe ser posterior a la de entrada.');
    }
    
    // 2. Calcular tiempos de navegación estimados
    let entry, exit;
    try {
      console.log('🧮 Calculando tiempos de navegación...');
      entry = calculateEntryTimes(ship, entryDateTime);
      console.log('  ✅ Entry times calculados:', entry);
      
      exit = calculateExitTimes(ship, exitDateTime);
      console.log('  ✅ Exit times calculados:', exit);
    } catch (calcError) {
      console.error('❌ Error calculando tiempos:', calcError);
      alert('❌ Error al calcular tiempos de navegación. Verifique los datos ingresados.');
      return;
    }
    
    // 3. Validar que el puerto tenga tiempo de amarre antes de salir
    const amarreTime = entry.etaPto; // Hora estimada de amarre
    if (!amarreTime) {
      console.error('❌ No se pudo calcular hora de amarre');
      alert('❌ Error: No se pudo calcular la hora de amarre estimada');
      return;
    }
    
    const minStayHours = 6; // Mínimo 6 horas en puerto
    const minExitTime = new Date(amarreTime.getTime() + minStayHours * 60 * 60 * 1000);
    
    if (exitDateTime < amarreTime) {
      const amarreStr = amarreTime.toLocaleString('es-AR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
      const exitStr = exitDateTime.toLocaleString('es-AR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
      errors.push(
        `❌ ERROR LÓGICO: El buque no puede salir ANTES de amarrar.\n` +
        `   • Amarre estimado: ${amarreStr}\n` +
        `   • Salida ingresada: ${exitStr}\n` +
        `   ➡️ La salida debe ser DESPUÉS del amarre.`
      );
    } else if (exitDateTime < minExitTime) {
      const diffHours = ((exitDateTime.getTime() - amarreTime.getTime()) / (1000 * 60 * 60)).toFixed(1);
      errors.push(
        `⚠️ ADVERTENCIA: Estadía en puerto muy corta (${diffHours} horas).\n` +
        `   Se recomienda un mínimo de ${minStayHours} horas para operaciones portuarias.`
      );
    }
    
    // 4. Validar tiempos de navegación razonables
    const navTimeEntry = (entry.etaPto.getTime() - entryDateTime.getTime()) / (1000 * 60 * 60);
    const navTimeExit = exit.km118_5 
      ? (exit.km118_5.getTime() - exitDateTime.getTime()) / (1000 * 60 * 60)
      : 0;
    
    const shipClass = getShipClass(ship.calado);
    let expectedEntryTime = 0;
    if (shipClass === 'A') expectedEntryTime = 11.17; // 11:10
    else if (shipClass === 'B') expectedEntryTime = 10.67; // 10:40
    else if (shipClass === 'C') expectedEntryTime = 4.0;
    
    const expectedExitTime = 6.83; // ~7 hours for all classes
    
    if (Math.abs(navTimeEntry - expectedEntryTime) > 1) {
      errors.push(
        `⚠️ Tiempo de navegación de entrada inusual: ${navTimeEntry.toFixed(1)}h ` +
        `(esperado ~${expectedEntryTime.toFixed(1)}h para Clase ${shipClass})`
      );
    }
    
    if (exit.km118_5 && Math.abs(navTimeExit - expectedExitTime) > 1) {
      errors.push(
        `⚠️ Tiempo de navegación de salida inusual: ${navTimeExit.toFixed(1)}h ` +
        `(esperado ~${expectedExitTime.toFixed(1)}h)`
      );
    }
    
    // Si hay errores críticos, mostrar y no agregar
    if (errors.length > 0) {
      const hasErrores = errors.some(e => e.startsWith('❌'));
      if (hasErrores) {
        console.error('❌ Errores de validación:', errors);
        setValidationErrors(errors);
        return;
      } else {
        // Solo advertencias, preguntar al usuario
        const shouldContinue = confirm(
          'Se detectaron advertencias:\n\n' +
          errors.join('\n\n') +
          '\n\n¿Desea continuar de todos modos?'
        );
        if (!shouldContinue) {
          setValidationErrors(errors);
          return;
        }
      }
    }

    try {
      console.log('💾 Guardando crucero...');
      
      // IMPORTANTE: Guardar fechas SIN timezone offset
      // Usar las fechas base (sin hora) para diaEntrada y diaSalida
      const diaEntradaDate = new Date(entryYear, entryMonth - 1, entryDay);
      const diaSalidaDate = new Date(exitYear, exitMonth - 1, exitDay);
      
      console.log('  diaEntradaDate:', diaEntradaDate.toISOString(), '→', diaEntradaDate.toLocaleDateString('es-AR'));
      console.log('  diaSalidaDate:', diaSalidaDate.toISOString(), '→', diaSalidaDate.toLocaleDateString('es-AR'));
      
      const newCrossing = addCrossing({
        ship,
        diaEntrada: diaEntradaDate,
        horaEntrada,
        diaSalida: diaSalidaDate,
        horaSalida,
        fm,
        to,
        entry,
        exit,
        situation,
        notes,
      });

      console.log('✅ Crucero guardado:', newCrossing);

      // Recargar desde localStorage para asegurar consistencia
      const updatedCrossings = loadCrossings();
      setCrossings(updatedCrossings);
      console.log('✅ Cruceros actualizados desde localStorage:', updatedCrossings.length);
      
      // Reset form
      setSelectedShipId('');
      setDiaEntrada('');
      setHoraEntrada('');
      setDiaSalida('');
      setHoraSalida('');
      setFm('');
      setTo('');
      setSituation('SIN CONFIRMAR');
      setNotes('');
      setValidationErrors([]);
      setIsAddDialogOpen(false);
      
      // Clear conflicts - user needs to manually detect again
      setConflicts([]);
      setIsTimelineOpen(false);
      
      alert(`✅ Crucero "${ship.buque}" agregado exitosamente`);
    } catch (saveError) {
      console.error('❌ Error guardando crucero:', saveError);
      alert('❌ Error al guardar el crucero. Por favor intente nuevamente.');
    }
  };

  const handleUpdateSituation = (id: string, newSituation: SituationStatus) => {
    updateCrossing(id, { situation: newSituation });
    const updated = crossings.map(c =>
      c.id === id ? { ...c, situation: newSituation } : c
    );
    setCrossings(updated);
  };

  const handleDeleteCrossing = (id: string) => {
    if (confirm('¿Está seguro de eliminar este crucero?')) {
      deleteCrossing(id);
      setCrossings(crossings.filter(c => c.id !== id));
    }
  };

  const handleExportData = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cruceros-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        importData(e.target?.result as string);
        setShips(loadShips());
        setCrossings(loadCrossings());
        alert('✅ Datos importados exitosamente');
      } catch (error) {
        alert('❌ Error al importar datos: ' + (error as Error).message);
      }
    };
    reader.readAsText(file);
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvContent = e.target?.result as string;
        const rows = parseCSVImport(csvContent);
        
        if (rows.length === 0) {
          alert('⚠️ No se encontraron filas válidas en el archivo CSV');
          return;
        }

        // Validate all rows first
        const validationResults = rows.map(row => ({
          row,
          validation: validateImportedRow(row)
        }));
        
        const validRows = validationResults.filter(r => r.validation.isValid);
        const invalidRows = validationResults.filter(r => !r.validation.isValid);
        const rowsWithWarnings = validationResults.filter(r => 
          r.validation.isValid && r.validation.warnings.length > 0
        );
        
        // Show validation report
        let reportMessage = '📊 REPORTE DE IMPORTACIÓN\n\n';
        
        if (invalidRows.length > 0) {
          reportMessage += `❌ ERRORES (${invalidRows.length} filas):\n`;
          invalidRows.forEach(({ row, validation }) => {
            reportMessage += `\n• ${row.buque}:\n`;
            validation.errors.forEach(err => {
              reportMessage += `  - ${err}\n`;
            });
          });
          reportMessage += '\n';
        }
        
        if (rowsWithWarnings.length > 0) {
          reportMessage += `⚠️ ADVERTENCIAS (${rowsWithWarnings.length} filas):\n`;
          rowsWithWarnings.forEach(({ row, validation }) => {
            reportMessage += `\n• ${row.buque}:\n`;
            validation.warnings.forEach(warn => {
              reportMessage += `  - ${warn}\n`;
            });
          });
          reportMessage += '\n';
        }
        
        if (validRows.length > 0) {
          reportMessage += `✅ VÁLIDOS: ${validRows.length} cruceros listos para importar\n\n`;
          
          if (invalidRows.length > 0) {
            const shouldContinue = confirm(
              reportMessage + 
              '\n¿Desea importar solo las filas válidas y omitir las que tienen errores?'
            );
            if (!shouldContinue) {
              setIsImportDialogOpen(false);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
              return;
            }
          } else if (rowsWithWarnings.length > 0) {
            const shouldContinue = confirm(
              reportMessage + 
              '\n¿Desea continuar con la importación a pesar de las advertencias?'
            );
            if (!shouldContinue) {
              setIsImportDialogOpen(false);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
              return;
            }
          }
        } else {
          alert(reportMessage + '\n❌ No hay filas válidas para importar.');
          setIsImportDialogOpen(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          return;
        }

        // Import only valid rows
        let imported = 0;
        validRows.forEach(({ row }) => {
          try {
            const crossingData = convertImportedRowToCrossing(row);
            
            // Calculate entry and exit times
            const entryDateTime = new Date(crossingData.diaEntrada);
            entryDateTime.setHours(
              parseInt(crossingData.horaEntrada.split(':')[0]),
              parseInt(crossingData.horaEntrada.split(':')[1])
            );
            
            const exitDateTime = new Date(crossingData.diaSalida);
            exitDateTime.setHours(
              parseInt(crossingData.horaSalida.split(':')[0]),
              parseInt(crossingData.horaSalida.split(':')[1])
            );
            
            crossingData.entry = calculateEntryTimes(crossingData.ship, entryDateTime);
            crossingData.exit = calculateExitTimes(crossingData.ship, exitDateTime);
            
            addCrossing(crossingData);
            imported++;
          } catch (err) {
            console.error('Error importing row:', err);
          }
        });

        // Reload data
        setCrossings(loadCrossings());
        setIsImportDialogOpen(false);
        
        let finalMessage = `✅ ${imported} crucero(s) importado(s) exitosamente`;
        if (invalidRows.length > 0) {
          finalMessage += `\n⚠️ ${invalidRows.length} fila(s) omitida(s) por errores`;
        }
        alert(finalMessage);
      } catch (error) {
        alert('❌ Error al importar CSV: ' + (error as Error).message);
      }
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerateReport = () => {
    // This will open the print dialog with the A3 formatted report
    window.print();
  };

  const handleApplyResolution = (crossingId: string, newDateTime: Date, type: 'entry' | 'exit') => {
    applyResolution(crossingId, newDateTime, type);
    
    // Reload crossings
    const updatedCrossings = loadCrossings();
    setCrossings(updatedCrossings);
    
    // Clear conflicts and close timeline - user will manually check again
    setConflicts([]);
    setIsTimelineOpen(false);
    
    alert('✅ Horario actualizado. Use "Buscar Conflictos" para verificar si se resolvió el problema.');
  };

  const selectedShip = ships.find(s => s.id === selectedShipId);

  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        {/* Header - Título en una sola línea */}
        <div className="max-w-[1400px] mx-auto mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Ship className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                GESTIÓN DE CRUCEROS OCEÁNICOS - Canal Punta Indio Km 118.5
              </h1>
            </div>
          </div>
        </div>

        {/* Toolbar - Botones de acción */}
        <div className="max-w-[1400px] mx-auto mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between flex-wrap gap-3">
              {/* Left side - Search Conflicts Button */}
              <div className="flex items-center gap-3 flex-wrap">
                <Button
                  onClick={handleDetectConflicts}
                  className="bg-orange-500 hover:bg-orange-600 text-white btn-floating"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Buscar Conflictos
                </Button>

                {/* Ship Management Button */}
                <Button
                  onClick={() => setIsShipManagementOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white btn-floating"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Gestión de Buques
                </Button>
              </div>

              {/* Right side - Import/Export and Settings */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Safety Margin Selector */}
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <Clock className="w-4 h-4 text-blue-200" />
                  <Label htmlFor="safety-margin" className="text-white text-sm">
                    Margen:
                  </Label>
                  <Select
                    value={safetyMargin.toString()}
                    onValueChange={(v) => setSafetyMargin(Number(v))}
                  >
                    <SelectTrigger id="safety-margin" className="w-24 bg-white/20 border-white/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Download Template Button */}
                <DownloadButton />

                {/* Import CSV Button */}
                <Button
                  onClick={() => setIsImportDialogOpen(true)}
                  variant="outline"
                  className="bg-purple-500 hover:bg-purple-600 text-white border-0 btn-floating"
                >
                  <FileUp className="w-4 h-4 mr-2" />
                  Importar CSV
                </Button>

                {/* Export Button */}
                <Button
                  onClick={handleExportData}
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 btn-floating"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Exportar JSON
                </Button>

                {/* Import Button */}
                <label>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 btn-floating"
                    asChild
                  >
                    <span className="cursor-pointer">
                      <FileUp className="w-4 h-4 mr-2" />
                      Importar
                    </span>
                  </Button>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Conflicts Alert */}
        {conflicts.length > 0 && (
          <div className="max-w-[1400px] mx-auto mb-6">
            <Alert variant="destructive" className="bg-red-500/20 border-red-500 backdrop-blur-md">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle className="text-white font-bold">
                ⚠️ {conflicts.length} Conflicto{conflicts.length > 1 ? 's' : ''} Detectado{conflicts.length > 1 ? 's' : ''}
              </AlertTitle>
              <AlertDescription className="text-white">
                Hay cruceros programados que pueden colisionar en el KM 118.5.
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4 bg-white/20 border-white/30 text-white hover:bg-white/30 btn-floating"
                  onClick={() => setIsTimelineOpen(true)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Ver Timeline
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-[1400px] mx-auto">
          <CrossingTable
            crossings={sortedCrossings}
            conflicts={conflicts}
            onUpdateSituation={handleUpdateSituation}
            onDelete={handleDeleteCrossing}
          />
        </div>

        {/* Floating Action Button - Add Crossing */}
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="fab bg-green-500 hover:bg-green-600 text-white"
          title="Agregar Crucero"
        >
          <Plus className="w-8 h-8" />
        </button>

        {/* Generate Report Button */}
        <div className="max-w-[1400px] mx-auto mt-6">
          <Button
            onClick={handleGenerateReport}
            disabled={hasActiveConflicts}
            className={`w-full py-6 text-lg btn-floating ${
              hasActiveConflicts
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            <Download className="w-5 h-5 mr-2" />
            {hasActiveConflicts
              ? '⚠️ Resolver conflictos antes de generar planilla'
              : '✅ Generar Planilla A3'}
          </Button>
        </div>

        {/* Timeline Dialog */}
        <Dialog open={isTimelineOpen} onOpenChange={setIsTimelineOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Timeline de Cruceros - KM 118.5</DialogTitle>
              <DialogDescription>
                Visualización de todos los cruceros y conflictos detectados
              </DialogDescription>
            </DialogHeader>
            <CrossingTimeline crossings={sortedCrossings} conflicts={conflicts} onApplyResolution={handleApplyResolution} />
          </DialogContent>
        </Dialog>

        {/* Add Crossing Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Ship className="w-6 h-6 text-green-600" />
                Agregar Nuevo Crucero
              </DialogTitle>
              <DialogDescription>
                Complete los datos de entrada y salida del buque. Los campos calculados se rellenarán automáticamente.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAddCrossing(); }} className="space-y-6">
              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertTitle>Errores de Validación</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside">
                      {validationErrors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Ship Selection */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
                <Label htmlFor="ship-select" className="text-lg font-semibold mb-2 block">
                  Seleccionar Buque
                </Label>
                <Select
                  value={selectedShipId}
                  onValueChange={setSelectedShipId}
                >
                  <SelectTrigger id="ship-select">
                    <SelectValue placeholder="Seleccione un buque" />
                  </SelectTrigger>
                  <SelectContent>
                    {ships
                      .sort((a, b) => a.buque.localeCompare(b.buque))
                      .map((ship) => (
                        <SelectItem key={ship.id} value={ship.id}>
                          {ship.buque} - {ship.agencia} (Clase {getShipClass(ship.calado)})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Entry Section */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  Datos de Entrada
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dia-entrada">Día de Entrada</Label>
                    <Input
                      id="dia-entrada"
                      type="date"
                      value={diaEntrada}
                      onChange={(e) => setDiaEntrada(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hora-entrada">Hora ETD (Salida Puerto)</Label>
                    <Input
                      id="hora-entrada"
                      type="time"
                      value={horaEntrada}
                      onChange={(e) => setHoraEntrada(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Exit Section */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Datos de Salida
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dia-salida">Día de Salida</Label>
                    <Input
                      id="dia-salida"
                      type="date"
                      value={diaSalida}
                      onChange={(e) => setDiaSalida(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hora-salida">Hora ETD (Salida KM 118.5)</Label>
                    <Input
                      id="hora-salida"
                      type="time"
                      value={horaSalida}
                      onChange={(e) => setHoraSalida(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Status Selection */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
                <Label htmlFor="situation-select" className="text-lg font-semibold mb-2 block">
                  Situación del Crucero
                </Label>
                <Select
                  value={situation}
                  onValueChange={(value: SituationStatus) => setSituation(value)}
                >
                  <SelectTrigger id="situation-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SIN CONFIRMAR">Sin Confirmar</SelectItem>
                    <SelectItem value="CONFIRMADO">Confirmado</SelectItem>
                    <SelectItem value="CANCELADO">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setValidationErrors([]);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 btn-floating"
                  disabled={!selectedShipId || !diaEntrada || !horaEntrada || !diaSalida || !horaSalida}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Crucero
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Ship Management Dialog - NEW */}
        <Dialog open={isShipManagementOpen} onOpenChange={setIsShipManagementOpen}>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Ship className="w-6 h-6 text-blue-600" />
                Gestión de Buques
              </DialogTitle>
              <DialogDescription>
                Administre la base de datos de buques: agregar, editar o eliminar registros
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Para gestionar la base de datos de buques, utilice la pestaña "Base de Datos" en la parte superior de la aplicación.
              </p>
              <Button onClick={() => setIsShipManagementOpen(false)} className="w-full">
                Cerrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Import CSV Dialog */}
        <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Importar Cruceros desde CSV</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-900 mb-2">📋 Instrucciones</h3>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Descargue la planilla en blanco usando el botón "Descargar Planilla"</li>
                  <li>Abra el archivo CSV en Excel o Google Sheets</li>
                  <li>Complete los datos según el formato indicado</li>
                  <li>Guarde el archivo como CSV (separado por comas)</li>
                  <li>Importe el archivo completado aquí</li>
                </ol>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-bold text-yellow-900 mb-2">⚠️ Formato requerido</h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li><strong>Fechas:</strong> DD/MM/YYYY (ejemplo: 15/01/2026)</li>
                  <li><strong>Horas:</strong> HH:mm (ejemplo: 08:00)</li>
                  <li><strong>Calado:</strong> Usar punto como decimal (ejemplo: 9.50)</li>
                  <li><strong>Situación:</strong> SIN CONFIRMAR / CONFIRMADO / CANCELADO</li>
                </ul>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleImportCSV}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <FileUp className="w-12 h-12 text-gray-400" />
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      Haga clic para seleccionar el archivo CSV
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      O arrastre y suelte el archivo aquí
                    </p>
                  </div>
                  <Button type="button" variant="outline">
                    Seleccionar Archivo
                  </Button>
                </label>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  } catch (error) {
    console.error('❌ Error rendering CrossingManager:', error);
    return (
      <div className="min-h-screen bg-red-900 text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Error al cargar la aplicación</h1>
          <p className="text-xl">{error instanceof Error ? error.message : 'Error desconocido'}</p>
          <pre className="mt-4 text-left bg-black/30 p-4 rounded text-sm overflow-auto max-w-2xl">
            {error instanceof Error ? error.stack : String(error)}
          </pre>
        </div>
      </div>
    );
  }
}






























































