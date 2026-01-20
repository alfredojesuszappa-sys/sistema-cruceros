import React from 'react';
import { AlertTriangle, Clock, ArrowRight, Ship as ShipIcon } from 'lucide-react';
import { CrossingConflict, Ship } from '../lib/ships';

interface CrossingTimelineProps {
  conflicts: CrossingConflict[];
  ships: Ship[];
  safetyMargin: number;
  onApplyProposal: (conflictId: string, proposalIndex: number) => void;
}

export function CrossingTimeline({
  conflicts,
  ships,
  safetyMargin,
  onApplyProposal
}: CrossingTimelineProps) {
  if (conflicts.length === 0) {
    return (
      <div style={{
        background: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '12px',
        padding: '30px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '15px' }}>✅</div>
        <h3 style={{ color: '#4ade80', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
          No hay conflictos detectados
        </h3>
        <p style={{ color: '#86efac', fontSize: '14px' }}>
          Todos los cruceros están correctamente espaciados con el margen de seguridad de {safetyMargin} minutos.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '2px solid rgba(239, 68, 68, 0.3)'
      }}>
        <AlertTriangle size={24} color="#f87171" />
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f87171', margin: 0 }}>
          Conflictos Detectados ({conflicts.length})
        </h3>
      </div>

      <div style={{
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Clock size={18} color="#fca5a5" />
          <strong style={{ color: '#fca5a5', fontSize: '14px' }}>
            Margen de Seguridad: {safetyMargin} minutos
          </strong>
        </div>
        <p style={{ color: '#fca5a5', fontSize: '13px', marginLeft: '26px' }}>
          Los buques deben estar separados al menos {safetyMargin} minutos al pasar por KM 118.5
        </p>
      </div>

      {conflicts.map((conflict, index) => {
        const entryShip = ships.find(s => s.id === conflict.entryCrossing.shipId);
        const exitShip = ships.find(s => s.id === conflict.exitCrossing.shipId);

        return (
          <div
            key={`${conflict.entryCrossing.id}-${conflict.exitCrossing.id}`}
            style={{
              background: 'rgba(239, 68, 68, 0.05)',
              border: '2px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}
          >
            {/* Conflict Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '15px',
              paddingBottom: '15px',
              borderBottom: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.3)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  {index + 1}
                </div>
                <h4 style={{ color: '#f87171', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
                  Conflicto de Crucero
                </h4>
              </div>
              <div style={{
                background: 'rgba(239, 68, 68, 0.2)',
                padding: '6px 12px',
                borderRadius: '6px',
                color: '#fca5a5',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                Separación: {Math.abs(conflict.timeDifferenceMinutes).toFixed(0)} min
              </div>
            </div>

            {/* Ships Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', marginBottom: '20px' }}>
              {/* Entry Ship */}
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <ShipIcon size={16} color="#4ade80" />
                  <strong style={{ color: '#4ade80', fontSize: '14px' }}>ENTRADA</strong>
                </div>
                <div style={{ color: 'white', fontSize: '15px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {entryShip?.buque || 'N/A'}
                </div>
                <div style={{ color: '#93c5fd', fontSize: '12px', marginBottom: '4px' }}>
                  Agencia: {entryShip?.agencia || 'N/A'}
                </div>
                <div style={{ color: '#86efac', fontSize: '13px', fontWeight: '500', marginTop: '8px' }}>
                  📥 ETA KM 118.5:
                </div>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
                  {conflict.entryCrossing.entry.km118_5?.toLocaleString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              {/* VS Divider */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '60px'
              }}>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '2px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f87171',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  VS
                </div>
              </div>

              {/* Exit Ship */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <ShipIcon size={16} color="#f87171" />
                  <strong style={{ color: '#f87171', fontSize: '14px' }}>SALIDA</strong>
                </div>
                <div style={{ color: 'white', fontSize: '15px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {exitShip?.buque || 'N/A'}
                </div>
                <div style={{ color: '#93c5fd', fontSize: '12px', marginBottom: '4px' }}>
                  Agencia: {exitShip?.agencia || 'N/A'}
                </div>
                <div style={{ color: '#fca5a5', fontSize: '13px', fontWeight: '500', marginTop: '8px' }}>
                  📤 ETA KM 118.5:
                </div>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
                  {conflict.exitCrossing.exit.km118_5?.toLocaleString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>

            {/* Proposals */}
            <div style={{
              background: 'rgba(96, 165, 250, 0.1)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              borderRadius: '8px',
              padding: '15px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                <Clock size={18} color="#60a5fa" />
                <strong style={{ color: '#60a5fa', fontSize: '14px' }}>
                  Propuestas de Resolución
                </strong>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {conflict.proposals.map((proposal, pIndex) => (
                  <div
                    key={pIndex}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(96, 165, 250, 0.2)',
                      borderRadius: '8px',
                      padding: '12px'
                    }}
                  >
                    <div style={{ color: '#93c5fd', fontSize: '12px', marginBottom: '8px', fontWeight: '600' }}>
                      Opción {pIndex + 1}
                    </div>
                    <div style={{ color: 'white', fontSize: '13px', marginBottom: '10px' }}>
                      {proposal.description}
                    </div>
                    <div style={{
                      background: 'rgba(96, 165, 250, 0.1)',
                      borderRadius: '6px',
                      padding: '8px',
                      marginBottom: '10px'
                    }}>
                      <div style={{ color: '#60a5fa', fontSize: '11px', marginBottom: '4px' }}>
                        Nuevo horario:
                      </div>
                      <div style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>
                        {proposal.newTime.toLocaleString('es-AR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => onApplyProposal(`${conflict.entryCrossing.id}-${conflict.exitCrossing.id}`, pIndex)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        background: 'rgba(34, 197, 94, 0.2)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '6px',
                        color: '#4ade80',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)';
                      }}
                    >
                      <ArrowRight size={14} />
                      Aplicar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
