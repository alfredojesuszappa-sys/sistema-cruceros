import React from 'react';
import { Ship, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { ShipCrossing, Ship as ShipType } from '../lib/ships';

interface CrossingTableProps {
  crossings: ShipCrossing[];
  ships: ShipType[];
  hasConflicts: (crossingId: string) => boolean;
  onEdit: (crossing: ShipCrossing) => void;
  onDelete: (crossingId: string) => void;
}

export function CrossingTable({
  crossings,
  ships,
  hasConflicts,
  onEdit,
  onDelete
}: CrossingTableProps) {
  if (crossings.length === 0) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '40px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center'
      }}>
        <Ship size={48} color="#60a5fa" style={{ margin: '0 auto 20px' }} />
        <p style={{ color: '#93c5fd', fontSize: '16px' }}>
          No hay cruceros registrados. Agregue el primer crucero usando el formulario superior.
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
      border: '1px solid rgba(255, 255, 255, 0.1)',
      overflowX: 'auto'
    }}>
      {/* BANNER TEMPORAL DE VERIFICACIÓN */}
      <div style={{
        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        color: '#000',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '16px',
        border: '3px solid #facc15'
      }}>
        ⚠️ VERSIÓN FLAT DESIGN CARGADA - v1768533582 ⚠️
      </div>

      <h3 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Ship size={24} color="#60a5fa" />
        Cruceros Registrados ({crossings.length})
      </h3>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '13px'
      }}>
        <thead>
          <tr style={{ background: 'rgba(96, 165, 250, 0.1)', borderBottom: '2px solid rgba(96, 165, 250, 0.3)' }}>
            <th style={{ padding: '12px 10px', textAlign: 'left', color: '#60a5fa', fontWeight: 'bold' }}>
              Buque
            </th>
            <th style={{ padding: '12px 10px', textAlign: 'center', color: '#60a5fa', fontWeight: 'bold' }}>
              Clase
            </th>
            <th style={{ padding: '12px 10px', textAlign: 'left', color: '#60a5fa', fontWeight: 'bold' }}>
              Agencia
            </th>
            <th style={{ padding: '12px 10px', textAlign: 'center', color: '#60a5fa', fontWeight: 'bold' }}>
              📥 Entrada
            </th>
            <th style={{ padding: '12px 10px', textAlign: 'center', color: '#60a5fa', fontWeight: 'bold' }}>
              🕐 ETA KM 118.5
            </th>
            <th style={{ padding: '12px 10px', textAlign: 'center', color: '#60a5fa', fontWeight: 'bold' }}>
              📤 Salida
            </th>
            <th style={{ padding: '12px 10px', textAlign: 'center', color: '#60a5fa', fontWeight: 'bold' }}>
              🕐 ETA KM 118.5
            </th>
            <th style={{ padding: '12px 10px', textAlign: 'center', color: '#60a5fa', fontWeight: 'bold' }}>
              Estado
            </th>
            <th style={{ padding: '12px 10px', textAlign: 'center', color: '#60a5fa', fontWeight: 'bold' }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {crossings.map((crossing) => {
            const ship = ships.find(s => s.id === crossing.shipId);
            const hasConflict = hasConflicts(crossing.id);

            return (
              <tr
                key={crossing.id}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  background: hasConflict ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                  transition: 'background 0.2s'
                }}
              >
                <td style={{ padding: '12px 10px', color: 'white', fontWeight: '500' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {hasConflict && <AlertTriangle size={16} color="#f87171" />}
                    {ship?.buque || 'N/A'}
                  </div>
                </td>
                <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                  <span style={{
                    background: ship?.clase === 'A' ? 'rgba(239, 68, 68, 0.2)' :
                               ship?.clase === 'B' ? 'rgba(245, 158, 11, 0.2)' :
                               'rgba(34, 197, 94, 0.2)',
                    color: ship?.clase === 'A' ? '#f87171' :
                           ship?.clase === 'B' ? '#fbbf24' :
                           '#4ade80',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '12px'
                  }}>
                    {ship?.clase || 'N/A'}
                  </span>
                </td>
                <td style={{ padding: '12px 10px', color: '#93c5fd' }}>
                  {ship?.agencia || 'N/A'}
                </td>
                <td style={{ padding: '12px 10px', textAlign: 'center', color: 'white' }}>
                  {crossing.entryDateTime.toLocaleString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
                <td style={{ padding: '12px 10px', textAlign: 'center', color: '#4ade80', fontWeight: '500' }}>
                  {crossing.entry.km118_5?.toLocaleString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) || 'N/A'}
                </td>
                <td style={{ padding: '12px 10px', textAlign: 'center', color: 'white' }}>
                  {crossing.exitDateTime.toLocaleString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
                <td style={{ padding: '12px 10px', textAlign: 'center', color: '#f87171', fontWeight: '500' }}>
                  {crossing.exit.km118_5?.toLocaleString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) || 'N/A'}
                </td>
                <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    background: crossing.situation === 'CONFIRMADO' ? 'rgba(34, 197, 94, 0.2)' :
                               crossing.situation === 'CANCELADO' ? 'rgba(107, 114, 128, 0.2)' :
                               'rgba(245, 158, 11, 0.2)',
                    color: crossing.situation === 'CONFIRMADO' ? '#4ade80' :
                           crossing.situation === 'CANCELADO' ? '#9ca3af' :
                           '#fbbf24'
                  }}>
                    {crossing.situation === 'CONFIRMADO' ? '✅' :
                     crossing.situation === 'CANCELADO' ? '❌' :
                     '🟡'} {crossing.situation}
                  </span>
                </td>
                <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button
                      onClick={() => onEdit(crossing)}
                      style={{
                        padding: '6px 10px',
                        background: 'rgba(96, 165, 250, 0.2)',
                        border: '1px solid rgba(96, 165, 250, 0.3)',
                        borderRadius: '6px',
                        color: '#60a5fa',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(96, 165, 250, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(96, 165, 250, 0.2)';
                      }}
                    >
                      <Edit2 size={14} />
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar el crucero del buque ${ship?.buque}?`)) {
                          onDelete(crossing.id);
                        }
                      }}
                      style={{
                        padding: '6px 10px',
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '6px',
                        color: '#f87171',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                      }}
                    >
                      <Trash2 size={14} />
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

