
/**
 * Excel Template Generator for Maritime Agencies
 * 
 * Genera una planilla en blanco con los campos necesarios para
 * que las agencias marítimas completen la información de cruceros
 */

export interface CrossingImportRow {
  // DATOS DEL BUQUE
  buque: string;
  bandera: string;
  imo: string;
  eslora: number;
  manga: number;
  puntal: number;
  calado: number;
  agencia: string;
  
  // DATOS DE ENTRADA
  fechaEntrada: string;      // formato: DD/MM/YYYY
  horaEntrada: string;       // formato: HH:mm
  
  // DATOS DE SALIDA
  fechaSalida: string;       // formato: DD/MM/YYYY
  horaSalida: string;        // formato: HH:mm
  
  // DATOS ADICIONALES
  fm?: string;               // Fondeadero (MVD, STS, etc.)
  to?: string;               // Turn around
  situacion?: string;        // SIN CONFIRMAR / CONFIRMADO / CANCELADO
  notas?: string;            // Observaciones
}

/**
 * Generate CSV template content
 */
export function generateCSVTemplate(): string {
  const headers = [
    'buque',
    'bandera',
    'imo',
    'eslora',
    'manga',
    'puntal',
    'calado',
    'agencia',
    'fechaEntrada',
    'horaEntrada',
    'fechaSalida',
    'horaSalida',
    'fm',
    'to',
    'situacion',
    'notas'
  ];
  
  const exampleRow = [
    'MSC MONICA',
    'PANAMA',
    'IMO1234567',
    '294.12',
    '32.24',
    '19.40',
    '9.50',
    'MSC ARGENTINA S.A.',
    '15/01/2026',
    '08:00',
    '17/01/2026',
    '14:30',
    'MVD',
    'BZA/BHB',
    'SIN CONFIRMAR',
    'Carga general'
  ];
  
  const instructionsRow = [
    '(Nombre del buque)',
    '(País de bandera)',
    '(Código IMO completo)',
    '(metros)',
    '(metros)',
    '(metros)',
    '(metros - determina clase A/B/C)',
    '(Nombre de la agencia marítima)',
    '(DD/MM/YYYY)',
    '(HH:mm - hora inicio navegación)',
    '(DD/MM/YYYY - puede ser días después)',
    '(HH:mm - ETD del puerto)',
    '(Opcional: MVD, STS, etc.)',
    '(Opcional)',
    '(SIN CONFIRMAR o CONFIRMADO o CANCELADO)',
    '(Observaciones opcionales)'
  ];
  
  return [
    '# PLANILLA DE CRUCEROS - GESTIÓN DE NAVEGACIÓN',
    '# Complete los datos según el formato indicado',
    '# Puede copiar y pegar esta planilla en Excel',
    '# ',
    headers.join(','),
    instructionsRow.join(','),
    exampleRow.join(','),
    '', // Empty row for agencies to fill
  ].join('\n');
}

/**
 * Download CSV template
 */
export function downloadCSVTemplate(): void {
  const content = generateCSVTemplate();
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'PLANILLA_CRUCEROS_VACIA.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Parse CSV content from import
 */
export function parseCSVImport(csvContent: string): CrossingImportRow[] {
  const lines = csvContent.split('\n').filter(line => 
    line.trim() && !line.startsWith('#')
  );
  
  if (lines.length < 2) {
    throw new Error('El archivo CSV debe contener al menos un encabezado y una fila de datos');
  }
  
  const headers = lines[0].split(',').map(h => h.trim());
  const rows: CrossingImportRow[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    
    // Skip instruction rows or empty rows
    if (values[0].startsWith('(') || !values[0]) continue;
    
    const row: any = {};
    headers.forEach((header, index) => {
      const value = values[index];
      
      // Parse numeric fields
      if (['eslora', 'manga', 'puntal', 'calado'].includes(header)) {
        row[header] = parseFloat(value) || 0;
      } else {
        row[header] = value || '';
      }
    });
    
    // Validate required fields
    if (row.buque && row.imo && row.fechaEntrada && row.horaEntrada && 
        row.fechaSalida && row.horaSalida && row.calado) {
      rows.push(row as CrossingImportRow);
    }
  }
  
  return rows;
}

/**
 * Convert imported row to ShipCrossing format
 */
export function convertImportedRowToCrossing(row: CrossingImportRow): any {
  // Parse dates (DD/MM/YYYY -> Date)
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };
  
  const diaEntrada = parseDate(row.fechaEntrada);
  const diaSalida = parseDate(row.fechaSalida);
  
  return {
    ship: {
      id: crypto.randomUUID(),
      buque: row.buque,
      bandera: row.bandera,
      imo: row.imo,
      eslora: row.eslora,
      manga: row.manga,
      puntal: row.puntal,
      calado: row.calado,
      agencia: row.agencia,
    },
    diaEntrada,
    horaEntrada: row.horaEntrada,
    diaSalida,
    horaSalida: row.horaSalida,
    fm: row.fm || '',
    to: row.to || '',
    situation: (row.situacion || 'SIN CONFIRMAR') as any,
    notes: row.notas || '',
  };
}

/**
 * Validate imported row for logical errors
 */
export function validateImportedRow(row: CrossingImportRow): { 
  isValid: boolean; 
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Parse dates
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };
  
  const parseTime = (timeStr: string): { hour: number; minute: number } => {
    const [hour, minute] = timeStr.split(':').map(Number);
    return { hour, minute };
  };
  
  try {
    const diaEntrada = parseDate(row.fechaEntrada);
    const diaSalida = parseDate(row.fechaSalida);
    const timeEntrada = parseTime(row.horaEntrada);
    const timeSalida = parseTime(row.horaSalida);
    
    // Create full datetime objects
    const entryDateTime = new Date(diaEntrada);
    entryDateTime.setHours(timeEntrada.hour, timeEntrada.minute, 0, 0);
    
    const exitDateTime = new Date(diaSalida);
    exitDateTime.setHours(timeSalida.hour, timeSalida.minute, 0, 0);
    
    // 1. Exit must be after entry
    if (exitDateTime <= entryDateTime) {
      errors.push(
        `${row.buque}: Fecha/hora de salida (${row.fechaSalida} ${row.horaSalida}) ` +
        `debe ser posterior a la entrada (${row.fechaEntrada} ${row.horaEntrada})`
      );
    }
    
    // 2. Minimum time between entry and exit
    const diffHours = (exitDateTime.getTime() - entryDateTime.getTime()) / (1000 * 60 * 60);
    if (diffHours < 6 && diffHours > 0) {
      warnings.push(
        `${row.buque}: Tiempo entre entrada y salida muy corto (${diffHours.toFixed(1)}h). ` +
        `Se recomienda al menos 6 horas.`
      );
    }
    
    // 3. Calado validation for ship class
    if (row.calado <= 0 || row.calado > 20) {
      errors.push(
        `${row.buque}: Calado inválido (${row.calado}m). Debe estar entre 0.1 y 20 metros.`
      );
    }
    
    // 4. Date range validation (not too far in past or future)
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    const twoYearsAhead = new Date(now.getFullYear() + 2, now.getMonth(), now.getDate());
    
    if (entryDateTime < oneYearAgo) {
      warnings.push(
        `${row.buque}: Fecha de entrada es más de 1 año en el pasado (${row.fechaEntrada})`
      );
    }
    
    if (entryDateTime > twoYearsAhead) {
      warnings.push(
        `${row.buque}: Fecha de entrada es más de 2 años en el futuro (${row.fechaEntrada})`
      );
    }
    
    // 5. IMO format validation (basic check)
    if (!row.imo.toUpperCase().includes('IMO')) {
      warnings.push(
        `${row.buque}: Código IMO no tiene formato estándar (${row.imo}). ` +
        `Debería incluir "IMO" seguido de números.`
      );
    }
    
  } catch (err) {
    errors.push(
      `${row.buque}: Error al validar fechas/horas. Verifique el formato ` +
      `(DD/MM/YYYY para fechas, HH:mm para horas)`
    );
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Generate Excel-compatible CSV with UTF-8 BOM
 */
export function generateExcelCSV(): string {
  const BOM = '\uFEFF';
  const content = generateCSVTemplate();
  return BOM + content;
}

/**
 * Download Excel-compatible CSV
 */
export function downloadExcelTemplate(): void {
  try {
    const content = generateExcelCSV();
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = 'PLANILLA_CRUCEROS_VACIA.csv';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    
    // Force download
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Error al descargar plantilla:', error);
    alert('Error al descargar la plantilla. Por favor, intente nuevamente.');
  }
}


