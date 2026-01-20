import React from 'react';
import { BookOpen, Download, X } from 'lucide-react';

interface UserManualProps {
  onClose: () => void;
}

export function UserManual({ onClose }: UserManualProps) {
  const handleDownload = () => {
    window.open('/api/download-manual', '_blank');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '25px 30px',
          borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <BookOpen size={32} style={{ color: '#93c5fd' }} />
            <div>
              <h2 style={{ 
                fontSize: '28px', 
                fontWeight: '800', 
                color: 'white', 
                margin: 0,
                marginBottom: '4px'
              }}>
                📖 Manual de Usuario
              </h2>
              <p style={{ 
                fontSize: '14px', 
                color: '#bfdbfe', 
                margin: 0 
              }}>
                Sistema de Gestión de Cruceros Oceánicos
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleDownload}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: '#10b981',
                border: 'none',
                borderRadius: '10px',
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
              <Download size={18} />
              Descargar Manual
            </button>
            
            <button
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '30px',
          background: 'white'
        }}>
          
          {/* Tabla de Contenido */}
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            padding: '25px',
            borderRadius: '12px',
            marginBottom: '30px',
            border: '2px solid #3b82f6'
          }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              color: '#1e40af',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              📑 Tabla de Contenido
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px'
            }}>
              {[
                '1. Introducción',
                '2. Inicio Rápido',
                '3. Panel Principal',
                '4. Base de Datos de Buques',
                '5. Planilla de Cruceros',
                '6. Reservas de Canal',
                '7. Búsqueda y Filtros',
                '8. Importación de Datos',
                '9. Generación de Reportes',
                '10. Resolución de Conflictos',
                '11. Consejos y Mejores Prácticas',
                '12. Preguntas Frecuentes'
              ].map((item, index) => (
                <li key={index} style={{
                  padding: '8px 12px',
                  background: 'white',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#1e40af',
                  fontWeight: '600'
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Sección 1: Introducción */}
          <Section
            number="1"
            title="🎯 Introducción"
            icon="🎯"
          >
            <h4>¿Qué es este sistema?</h4>
            <p>
              El <strong>Sistema de Gestión de Cruceros Oceánicos</strong> es una aplicación web profesional 
              diseñada para gestionar el tránsito de cruceros a través del Canal Punta Indio (KM 118.5).
            </p>
            
            <h4>Características Principales</h4>
            <FeatureList items={[
              'Gestión completa de buques - Base de datos con toda la información técnica',
              'Planificación de cruceros - Programación de entradas y salidas',
              'Cálculo automático - Tiempos de tránsito calculados automáticamente',
              'Detección de conflictos - Identifica solapamientos en KM 118.5',
              'Reservas de canal - Gestión de cierres CPI y ACC',
              'Reportes profesionales - Generación de reportes A3 para impresión',
              'Alertas inteligentes - Notificaciones de cruceros próximos'
            ]} />
          </Section>

          {/* Sección 2: Inicio Rápido */}
          <Section
            number="2"
            title="🚀 Inicio Rápido"
            icon="🚀"
          >
            <h4>Acceso al Sistema</h4>
            <ol>
              <li>Abrir navegador web (Chrome, Firefox, Edge)</li>
              <li>Ir a la URL del sistema</li>
              <li>El sistema carga automáticamente</li>
            </ol>

            <h4>Navegación Básica</h4>
            <p>El sistema tiene <strong>4 pestañas principales</strong>:</p>
            
            <div style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '8px',
              border: '2px solid #e2e8f0',
              marginTop: '15px'
            }}>
              <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {[
                  { icon: '🏠', name: 'Dashboard' },
                  { icon: '📚', name: 'Base Datos' },
                  { icon: '⚓', name: 'Cruceros' },
                  { icon: '📅', name: 'Reservas' }
                ].map((tab, i) => (
                  <div key={i} style={{
                    padding: '12px 24px',
                    background: '#3b82f6',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>
                    {tab.icon} {tab.name}
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Sección 3: Dashboard */}
          <Section
            number="3"
            title="📊 Panel Principal (Dashboard)"
            icon="📊"
          >
            <h4>¿Qué muestra?</h4>
            <p>El Dashboard es tu <strong>centro de control visual</strong>. Muestra:</p>
            
            <div style={{ marginTop: '20px' }}>
              <InfoCard
                title="📈 Estadísticas Generales"
                items={[
                  'Total de buques en base de datos',
                  'Total de cruceros programados',
                  'Cruceros por mes'
                ]}
              />
              
              <InfoCard
                title="🎨 Distribución por Clase"
                items={[
                  'Clase A (Calado ≥ 8.84m) - Color Rojo',
                  'Clase B (Calado 7.33-8.83m) - Color Naranja',
                  'Clase C (Calado ≤ 7.32m) - Color Verde'
                ]}
              />
              
              <InfoCard
                title="🏢 Top 5 Agencias"
                items={[
                  'Ranking de agencias con más operaciones'
                ]}
              />
            </div>
          </Section>

          {/* Sección 4: Base de Datos */}
          <Section
            number="4"
            title="📚 Base de Datos de Buques"
            icon="📚"
          >
            <h4>Agregar un Buque</h4>
            <ol>
              <li>Click en <strong>"Agregar Buque"</strong></li>
              <li>Completar el formulario:
                <ul>
                  <li>🚢 Buque (obligatorio)</li>
                  <li>🏴 Bandera</li>
                  <li>🔢 IMO (obligatorio)</li>
                  <li>📏 Eslora, Manga, Puntal</li>
                  <li>⚓ Calado (obligatorio)</li>
                  <li>🏢 Agencia</li>
                </ul>
              </li>
              <li>Click en <strong>"Guardar"</strong></li>
            </ol>

            <h4>Clasificación Automática</h4>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '15px'
            }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th style={tableHeaderStyle}>Clase</th>
                  <th style={tableHeaderStyle}>Calado</th>
                  <th style={tableHeaderStyle}>Hasta KM</th>
                  <th style={tableHeaderStyle}>Color</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tableCellStyle}><strong>A</strong></td>
                  <td style={tableCellStyle}>≥ 8.84m</td>
                  <td style={tableCellStyle}>239</td>
                  <td style={tableCellStyle}>🔴 Rojo</td>
                </tr>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={tableCellStyle}><strong>B</strong></td>
                  <td style={tableCellStyle}>7.33 - 8.83m</td>
                  <td style={tableCellStyle}>216</td>
                  <td style={tableCellStyle}>🟠 Naranja</td>
                </tr>
                <tr>
                  <td style={tableCellStyle}><strong>C</strong></td>
                  <td style={tableCellStyle}>≤ 7.32m</td>
                  <td style={tableCellStyle}>59</td>
                  <td style={tableCellStyle}>🟢 Verde</td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Sección 5: Planilla de Cruceros */}
          <Section
            number="5"
            title="⚓ Planilla de Cruceros"
            icon="⚓"
          >
            <h4>Agregar un Crucero</h4>
            <ol>
              <li>Click en <strong>"Agregar Crucero"</strong></li>
              <li>Completar:
                <ul>
                  <li>Seleccionar buque</li>
                  <li>Fecha y hora de entrada</li>
                  <li>Fecha y hora de salida</li>
                  <li>Estado (Sin Confirmar/Confirmado/Cancelado)</li>
                </ul>
              </li>
              <li>Click en <strong>"Agregar Crucero"</strong></li>
            </ol>

            <div style={{
              background: '#ecfdf5',
              padding: '20px',
              borderRadius: '8px',
              border: '2px solid #10b981',
              marginTop: '20px'
            }}>
              <h4 style={{ color: '#065f46', marginBottom: '10px' }}>
                ✨ Cálculos Automáticos
              </h4>
              <p style={{ color: '#047857', marginBottom: '15px' }}>
                El sistema calcula automáticamente <strong>todos los tiempos de tránsito</strong>:
              </p>
              <ul style={{ color: '#047857', marginBottom: 0 }}>
                <li><strong>Entrada:</strong> KM 239 → KM 216 → KM 118.5 → Puerto</li>
                <li><strong>Salida:</strong> Puerto → KM 59 → KM 118.5 → KM 239</li>
              </ul>
            </div>
          </Section>

          {/* Sección 6: Reservas */}
          <Section
            number="6"
            title="📅 Reservas de Canal"
            icon="📅"
          >
            <h4>Cálculo Automático de Reservas</h4>
            
            <ReservationTable
              title="Reserva CPI Entrada"
              rows={[
                ['Clase A', '6 horas antes del ETD'],
                ['Clase B', '5.5 horas antes del ETD'],
                ['Clase C', 'No aplica']
              ]}
            />

            <ReservationTable
              title="Reserva ACC Entrada"
              rows={[
                ['Clase A', '2.5 horas antes del amarre'],
                ['Clase B', '2 horas antes del amarre'],
                ['Clase C', '1 hora antes del amarre']
              ]}
            />

            <ReservationTable
              title="Reserva ACC Salida"
              rows={[
                ['Similar a entrada', 'calculado desde ETD salida']
              ]}
            />

            <ReservationTable
              title="Reserva CPI Salida"
              rows={[
                ['Clase A', '6 horas antes de KM 118.5'],
                ['Clase B', '5.5 horas antes de KM 118.5'],
                ['Clase C', 'No aplica']
              ]}
            />
          </Section>

          {/* Sección 7: Búsqueda */}
          <Section
            number="7"
            title="🔍 Búsqueda y Filtros"
            icon="🔍"
          >
            <h4>Búsqueda Global</h4>
            <p>
              En la parte superior del sistema hay una barra de búsqueda que permite buscar por:
            </p>
            <FeatureList items={[
              'Nombre del buque',
              'Número IMO',
              'Agencia marítima',
              'Bandera del buque'
            ]} />

            <h4>Filtros Avanzados</h4>
            <p>En la pestaña de Cruceros, puedes activar filtros avanzados:</p>
            <FeatureList items={[
              '📅 Rango de fechas (desde/hasta)',
              '🚢 Clase de buque (A/B/C)',
              '🏢 Agencia marítima',
              '📋 Estado (Confirmado/Sin confirmar/Cancelado)'
            ]} />
          </Section>

          {/* Sección 8: Importación */}
          <Section
            number="8"
            title="📥 Importación de Datos"
            icon="📥"
          >
            <h4>Formatos Soportados</h4>
            <ul>
              <li><strong>CSV</strong> - Separado por <code>;</code> o <code>,</code></li>
              <li><strong>Excel</strong> - Archivos .xlsx y .xls</li>
              <li><strong>JSON</strong> - Formato de exportación del sistema</li>
            </ul>

            <h4>Proceso de Importación</h4>
            <ol>
              <li>Click en <strong>"Importar"</strong></li>
              <li>Seleccionar archivo desde tu computadora</li>
              <li>El sistema valida y procesa automáticamente</li>
              <li>Ver resultado con resumen de errores (si los hay)</li>
            </ol>

            <div style={{
              background: '#fef3c7',
              padding: '15px',
              borderRadius: '8px',
              border: '2px solid #fbbf24',
              marginTop: '15px'
            }}>
              <p style={{ 
                margin: 0, 
                color: '#92400e',
                fontWeight: '600'
              }}>
                ⚠️ <strong>Importante:</strong> Los buques deben existir previamente en la base de datos.
                El sistema busca por nombre exacto.
              </p>
            </div>
          </Section>

          {/* Sección 9: Reportes */}
          <Section
            number="9"
            title="📄 Generación de Reportes"
            icon="📄"
          >
            <h4>Reporte A3 Profesional</h4>
            <ol>
              <li>Ir a la pestaña <strong>"Planilla de Cruceros"</strong></li>
              <li>Resolver todos los conflictos (si hay alguno)</li>
              <li>Click en <strong>"Generar Reporte A3"</strong></li>
              <li>Se abre una nueva ventana con el reporte</li>
              <li>Usar <kbd>Ctrl+P</kbd> para imprimir</li>
            </ol>

            <h4>Configuración de Impresión Recomendada</h4>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '15px'
            }}>
              <tbody>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{...tableCellStyle, fontWeight: '600'}}>Orientación:</td>
                  <td style={tableCellStyle}>Horizontal (Landscape)</td>
                </tr>
                <tr>
                  <td style={{...tableCellStyle, fontWeight: '600'}}>Papel:</td>
                  <td style={tableCellStyle}>A3</td>
                </tr>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{...tableCellStyle, fontWeight: '600'}}>Márgenes:</td>
                  <td style={tableCellStyle}>Normal (1cm)</td>
                </tr>
                <tr>
                  <td style={{...tableCellStyle, fontWeight: '600'}}>Escala:</td>
                  <td style={tableCellStyle}>100%</td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Sección 10: Conflictos */}
          <Section
            number="10"
            title="⚠️ Resolución de Conflictos"
            icon="⚠️"
          >
            <h4>Detectar Conflictos</h4>
            <ol>
              <li>Click en <strong>"Buscar Conflictos"</strong></li>
              <li>El sistema analiza todos los cruceros automáticamente</li>
              <li>Muestra lista de conflictos encontrados (si hay)</li>
            </ol>

            <h4>Resolver Conflictos</h4>
            <p>El sistema sugiere <strong>2 opciones de resolución</strong>:</p>
            <div style={{ marginTop: '15px' }}>
              <div style={{
                background: '#fee2e2',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '10px',
                border: '2px solid #f87171'
              }}>
                <strong style={{ color: '#991b1b' }}>Opción 1:</strong>
                <span style={{ color: '#991b1b' }}> Retrasar salida del buque saliente</span>
              </div>
              <div style={{
                background: '#dbeafe',
                padding: '15px',
                borderRadius: '8px',
                border: '2px solid #60a5fa'
              }}>
                <strong style={{ color: '#1e40af' }}>Opción 2:</strong>
                <span style={{ color: '#1e40af' }}> Adelantar entrada del buque entrante</span>
              </div>
            </div>
            <p style={{ marginTop: '15px' }}>
              Click en <strong>"Aplicar"</strong> en la solución que prefieras.
            </p>
          </Section>

          {/* Sección 11: Consejos */}
          <Section
            number="11"
            title="💡 Consejos y Mejores Prácticas"
            icon="💡"
          >
            <h4>Gestión Diaria</h4>
            <FeatureList items={[
              'Revisar Notificaciones de cruceros próximos cada mañana',
              'Verificar Reservas de Canal del día',
              'Actualizar estados a "Confirmado" cuando sea pertinente',
              'Buscar conflictos antes de confirmar nuevos cruceros'
            ]} />

            <h4>Organización</h4>
            <FeatureList items={[
              'Mantener base de datos de buques actualizada',
              'Actualizar estados de cruceros regularmente',
              'Solo editar reservas si hay cambio operativo real',
              'Hacer respaldos periódicos usando "Exportar"'
            ]} />

            <h4>Importación</h4>
            <FeatureList items={[
              'Usar la plantilla oficial de CSV',
              'Verificar que los nombres de buques coincidan exactamente',
              'Revisar mensajes de error después de cada importación',
              'Confirmar que los cruceros se cargaron correctamente'
            ]} />
          </Section>

          {/* Sección 12: FAQ */}
          <Section
            number="12"
            title="❓ Preguntas Frecuentes"
            icon="❓"
          >
            <FAQ
              question="¿Necesito instalar algo?"
              answer="No. Es una aplicación web que funciona completamente en el navegador. No requiere instalación."
            />
            
            <FAQ
              question="¿Cómo se clasifica un buque?"
              answer="Automáticamente por su calado: Clase A (≥8.84m), Clase B (7.33-8.83m), Clase C (≤7.32m)."
            />
            
            <FAQ
              question="¿Por qué los tiempos no coinciden con mis cálculos?"
              answer="Verifica la clase del buque y la hora de entrada/salida. El sistema usa velocidades estándar por clase."
            />
            
            <FAQ
              question="¿Las reservas se actualizan automáticamente?"
              answer="Sí, cada vez que modificas un crucero, las reservas se recalculan automáticamente."
            />
            
            <FAQ
              question="¿Dónde se guardan mis datos?"
              answer="Localmente en tu navegador (localStorage). Los datos persisten pero son locales a tu computadora."
            />
            
            <FAQ
              question="¿Cómo hago un respaldo?"
              answer="Click en 'Exportar' y guarda el archivo JSON en un lugar seguro."
            />
          </Section>

          {/* Footer de Contacto */}
          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
            padding: '30px',
            borderRadius: '12px',
            marginTop: '40px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>
              📞 Soporte y Contacto
            </h3>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>
              <strong>Email:</strong> alfredojesus.zappa@gmail.com
            </p>
            <p style={{ fontSize: '14px', color: '#bfdbfe', marginBottom: '20px' }}>
              Para consultas o soporte técnico
            </p>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '15px',
              borderRadius: '8px',
              fontSize: '13px'
            }}>
              <p style={{ margin: 0 }}>
                <strong>Sistema de Gestión de Cruceros Oceánicos</strong>
              </p>
              <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>
                Canal Punta Indio - KM 118.5 | © 2026 - Todos los derechos reservados
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper Components
const Section: React.FC<{ number: string; title: string; icon: string; children: React.ReactNode }> = 
  ({ number, title, children }) => (
    <div style={{
      marginBottom: '35px',
      padding: '25px',
      background: '#f8fafc',
      borderRadius: '12px',
      border: '2px solid #e2e8f0'
    }}>
      <h3 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#1e40af',
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '3px solid #3b82f6'
      }}>
        {title}
      </h3>
      <div style={{ fontSize: '15px', lineHeight: '1.7', color: '#334155' }}>
        {children}
      </div>
    </div>
  );

const FeatureList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul style={{ 
    listStyle: 'none', 
    padding: 0, 
    margin: '15px 0' 
  }}>
    {items.map((item, i) => (
      <li key={i} style={{
        padding: '10px 15px',
        marginBottom: '8px',
        background: 'white',
        borderRadius: '6px',
        borderLeft: '4px solid #3b82f6',
        fontSize: '14px'
      }}>
        ✅ {item}
      </li>
    ))}
  </ul>
);

const InfoCard: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div style={{
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '15px',
    border: '2px solid #e2e8f0'
  }}>
    <h4 style={{ 
      color: '#1e40af', 
      marginBottom: '12px',
      fontSize: '16px',
      fontWeight: '700'
    }}>
      {title}
    </h4>
    <ul style={{ margin: 0, paddingLeft: '20px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ 
          marginBottom: '6px',
          color: '#475569',
          fontSize: '14px'
        }}>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const ReservationTable: React.FC<{ title: string; rows: string[][] }> = ({ title, rows }) => (
  <div style={{ marginBottom: '20px' }}>
    <h5 style={{ 
      color: '#0f172a', 
      marginBottom: '10px',
      fontSize: '15px',
      fontWeight: '600'
    }}>
      {title}
    </h5>
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px'
    }}>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
            <td style={{
              padding: '10px',
              border: '1px solid #e2e8f0',
              fontWeight: '600',
              color: '#1e40af'
            }}>
              {row[0]}
            </td>
            <td style={{
              padding: '10px',
              border: '1px solid #e2e8f0',
              color: '#475569'
            }}>
              {row[1]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FAQ: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
  <div style={{
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '15px',
    border: '2px solid #e2e8f0'
  }}>
    <h4 style={{
      color: '#1e40af',
      marginBottom: '10px',
      fontSize: '16px',
      fontWeight: '700'
    }}>
      ❓ {question}
    </h4>
    <p style={{
      margin: 0,
      color: '#475569',
      fontSize: '14px',
      lineHeight: '1.6'
    }}>
      {answer}
    </p>
  </div>
);

const tableHeaderStyle: React.CSSProperties = {
  padding: '12px',
  border: '1px solid #cbd5e1',
  textAlign: 'left',
  fontWeight: '700',
  color: '#0f172a',
  fontSize: '14px'
};

const tableCellStyle: React.CSSProperties = {
  padding: '10px 12px',
  border: '1px solid #e2e8f0',
  fontSize: '14px',
  color: '#334155'
};
