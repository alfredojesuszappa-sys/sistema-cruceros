import React from 'react';
import { Ship, AlertCircle } from 'lucide-react';
import { Ship as ShipType } from '../lib/ships';

interface ShipFormProps {
  ships: ShipType[];
  selectedShipId: string;
  diaEntrada: string;
  horaEntrada: string;
  diaSalida: string;
  horaSalida: string;
  situation: 'SIN CONFIRMAR' | 'CONFIRMADO' | 'CANCELADO';
  validationErrors: string[];
  onShipChange: (shipId: string) => void;
  onDiaEntradaChange: (date: string) => void;
  onHoraEntradaChange: (time: string) => void;
  onDiaSalidaChange: (date: string) => void;
  onHoraSalidaChange: (time: string) => void;
  onSituationChange: (situation: 'SIN CONFIRMAR' | 'CONFIRMADO' | 'CANCELADO') => void;
}

export function ShipForm({
  ships,
  selectedShipId,
  diaEntrada,
  horaEntrada,
  diaSalida,
  horaSalida,
  situation,
  validationErrors,
  onShipChange,
  onDiaEntradaChange,
  onHoraEntradaChange,
  onDiaSalidaChange,
  onHoraSalidaChange,
  onSituationChange,
}: ShipFormProps) {
  const selectedShip = ships.find(s => s.id === selectedShipId);

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
        marginBottom: '20px'
      }}>
        <Ship size={24} color="#60a5fa" />
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>
          Nuevo Crucero
        </h3>
      </div>

      {/* Ship Selection */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '8px' }}>
          Seleccionar Buque
        </label>
        <select
          value={selectedShipId}
          onChange={(e) => onShipChange(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px'
          }}
        >
          <option value="">-- Seleccione un buque --</option>
          {ships.map(ship => (
            <option key={ship.id} value={ship.id} style={{ background: '#1e3a8a' }}>
              {ship.buque} ({ship.clase}) - {ship.agencia}
            </option>
          ))}
        </select>
      </div>

      {selectedShip && (
        <div style={{
          background: 'rgba(96, 165, 250, 0.1)',
          border: '1px solid rgba(96, 165, 250, 0.2)',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            <div>
              <div style={{ color: '#60a5fa', fontSize: '12px', marginBottom: '4px' }}>Clase</div>
              <div style={{ 
                color: 'white', 
                fontSize: '16px', 
                fontWeight: 'bold',
                background: selectedShip.clase === 'A' ? 'rgba(239, 68, 68, 0.2)' : 
                           selectedShip.clase === 'B' ? 'rgba(245, 158, 11, 0.2)' : 
                           'rgba(34, 197, 94, 0.2)',
                padding: '4px 12px',
                borderRadius: '6px',
                display: 'inline-block'
              }}>
                {selectedShip.clase}
              </div>
            </div>
            <div>
              <div style={{ color: '#60a5fa', fontSize: '12px', marginBottom: '4px' }}>Eslora</div>
              <div style={{ color: 'white', fontSize: '14px' }}>{selectedShip.eslora}m</div>
            </div>
            <div>
              <div style={{ color: '#60a5fa', fontSize: '12px', marginBottom: '4px' }}>Calado</div>
              <div style={{ color: 'white', fontSize: '14px' }}>{selectedShip.calado}m</div>
            </div>
            <div>
              <div style={{ color: '#60a5fa', fontSize: '12px', marginBottom: '4px' }}>Agencia</div>
              <div style={{ color: 'white', fontSize: '14px' }}>{selectedShip.agencia}</div>
            </div>
          </div>
        </div>
      )}

      {/* Entry Section */}
      <div style={{
        background: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px'
      }}>
        <h4 style={{ color: '#4ade80', fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>
          📥 Entrada
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '8px' }}>
              Fecha
            </label>
            <input
              type="date"
              value={diaEntrada}
              onChange={(e) => onDiaEntradaChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '8px' }}>
              Hora
            </label>
            <input
              type="time"
              value={horaEntrada}
              onChange={(e) => onHoraEntradaChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Exit Section */}
      <div style={{
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px'
      }}>
        <h4 style={{ color: '#f87171', fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>
          📤 Salida
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '8px' }}>
              Fecha
            </label>
            <input
              type="date"
              value={diaSalida}
              onChange={(e) => onDiaSalidaChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '8px' }}>
              Hora
            </label>
            <input
              type="time"
              value={horaSalida}
              onChange={(e) => onHoraSalidaChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Situation Selection */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '8px' }}>
          Estado del Crucero
        </label>
        <select
          value={situation}
          onChange={(e) => onSituationChange(e.target.value as any)}
          style={{
            width: '100%',
            padding: '10px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px'
          }}
        >
          <option value="SIN CONFIRMAR" style={{ background: '#1e3a8a' }}>🟡 Sin Confirmar</option>
          <option value="CONFIRMADO" style={{ background: '#1e3a8a' }}>✅ Confirmado</option>
          <option value="CANCELADO" style={{ background: '#1e3a8a' }}>❌ Cancelado</option>
        </select>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <AlertCircle size={20} color="#f87171" />
            <strong style={{ color: '#f87171', fontSize: '14px' }}>Errores de Validación</strong>
          </div>
          {validationErrors.map((error, idx) => (
            <div key={idx} style={{ color: '#fca5a5', fontSize: '13px', marginLeft: '28px', marginBottom: '5px' }}>
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
