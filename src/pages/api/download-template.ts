import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    const BOM = '\uFEFF';
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
    
    const csvContent = [
      '# PLANILLA DE CRUCEROS - GESTIÓN DE NAVEGACIÓN',
      '# Complete los datos según el formato indicado',
      '# Puede copiar y pegar esta planilla en Excel',
      '# ',
      headers.join(','),
      instructionsRow.join(','),
      exampleRow.join(','),
      '',
    ].join('\n');
    
    const content = BOM + csvContent;
    
    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="PLANILLA_CRUCEROS_VACIA.csv"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error generating CSV:', error);
    return new Response('Error generating template', { status: 500 });
  }
};
