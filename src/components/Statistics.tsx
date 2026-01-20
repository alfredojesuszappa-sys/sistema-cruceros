import React from 'react';
import { Ship, FileText, CheckCircle, Clock, AlertTriangle, XCircle, Users, UserCheck, Anchor } from 'lucide-react';
import { Ship as ShipType, ShipCrossing, getShipClass, getMovementStats } from '../lib/ships';

interface StatisticsProps {
  ships: ShipType[];
  crossings: ShipCrossing[];
  movementStats?: {
    shipsInPort: number;
    totalPassengersIn: number;
    totalPassengersOut: number;
    totalArrivals: number;
  };
}

export function Statistics({ ships, crossings, movementStats }: StatisticsProps) {
  // Ships by class
  const shipsByClass = {
    A: ships.filter(s => getShipClass(s.calado) === 'A').length,
    B: ships.filter(s => getShipClass(s.calado) === 'B').length,
    C: ships.filter(s => getShipClass(s.calado) === 'C').length
  };

  // Crossings by status
  const confirmedCrossings = crossings.filter(c => c.situation === 'CONFIRMADO').length;
  const cancelledCrossings = crossings.filter(c => c.situation === 'CANCELADO').length;
  
  // Cruceros en puerto = movimientos con fechaAmarre pero SIN fechaZarpada
  const shipsInPort = movementStats?.shipsInPort || 0;
  
  // Total de arribos (para calcular pendientes)
  const totalArrivals = movementStats?.totalArrivals || 0;
  
  // Pendientes de ingreso = Confirmados - Ya ingresados (arribados)
  const pendingEntry = Math.max(0, confirmedCrossings - totalArrivals);

  // Ships by agency (top 5)
  const agencyCounts = ships.reduce((acc, ship) => {
    acc[ship.agencia] = (acc[ship.agencia] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topAgencies = Object.entries(agencyCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div style={{ marginBottom: '30px' }}>
      {/* Main Statistics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Total Ships Card */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#93c5fd', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Total Buques
            </span>
            <div style={{
              background: 'rgba(59, 130, 246, 0.2)',
              padding: '8px',
              borderRadius: '8px'
            }}>
              <Ship size={24} color="#60a5fa" />
            </div>
          </div>
          <p style={{ fontSize: '42px', fontWeight: 'bold', color: 'white', margin: '0 0 8px 0', lineHeight: 1 }}>
            {ships.length}
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <div style={{ flex: 1, background: 'rgba(239, 68, 68, 0.2)', padding: '6px 10px', borderRadius: '6px', textAlign: 'center' }}>
              <p style={{ color: '#ef4444', fontSize: '11px', margin: '0 0 2px 0', fontWeight: '600' }}>Clase A</p>
              <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{shipsByClass.A}</p>
            </div>
            <div style={{ flex: 1, background: 'rgba(245, 158, 11, 0.2)', padding: '6px 10px', borderRadius: '6px', textAlign: 'center' }}>
              <p style={{ color: '#f59e0b', fontSize: '11px', margin: '0 0 2px 0', fontWeight: '600' }}>Clase B</p>
              <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{shipsByClass.B}</p>
            </div>
            <div style={{ flex: 1, background: 'rgba(34, 197, 94, 0.2)', padding: '6px 10px', borderRadius: '6px', textAlign: 'center' }}>
              <p style={{ color: '#22c55e', fontSize: '11px', margin: '0 0 2px 0', fontWeight: '600' }}>Clase C</p>
              <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{shipsByClass.C}</p>
            </div>
          </div>
        </div>

        {/* Ships in Port Card - ACTUALIZADO */}
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#86efac', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Total de Cruceros en Puerto
            </span>
            <div style={{
              background: 'rgba(34, 197, 94, 0.2)',
              padding: '8px',
              borderRadius: '8px'
            }}>
              <Anchor size={24} color="#4ade80" />
            </div>
          </div>
          <p style={{ fontSize: '42px', fontWeight: 'bold', color: 'white', margin: '0 0 8px 0', lineHeight: 1 }}>
            {shipsInPort}
          </p>
          <p style={{ color: '#86efac', fontSize: '13px', marginTop: '8px' }}>
            Buques amarrados actualmente
          </p>
        </div>

        {/* Recaladas (Confirmed) Card */}
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#86efac', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Recaladas
            </span>
            <div style={{
              background: 'rgba(34, 197, 94, 0.2)',
              padding: '8px',
              borderRadius: '8px'
            }}>
              <CheckCircle size={24} color="#4ade80" />
            </div>
          </div>
          <p style={{ fontSize: '42px', fontWeight: 'bold', color: 'white', margin: '0 0 8px 0', lineHeight: 1 }}>
            {confirmedCrossings}
          </p>
          <p style={{ color: '#86efac', fontSize: '13px', marginTop: '8px' }}>
            Cruceros confirmados
          </p>
        </div>

        {/* Pending Entry Card */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#fcd34d', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Pendientes de Ingreso
            </span>
            <div style={{
              background: 'rgba(245, 158, 11, 0.2)',
              padding: '8px',
              borderRadius: '8px'
            }}>
              <Clock size={24} color="#fbbf24" />
            </div>
          </div>
          <p style={{ fontSize: '42px', fontWeight: 'bold', color: 'white', margin: '0 0 8px 0', lineHeight: 1 }}>
            {pendingEntry}
          </p>
          <p style={{ color: '#fcd34d', fontSize: '13px', marginTop: '8px' }}>
            Confirmados sin arribo registrado
          </p>
        </div>
      </div>

      {/* Secondary Statistics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '15px'
      }}>
        {/* Cancelled Crossings */}
        {cancelledCrossings > 0 && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            padding: '16px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <XCircle size={20} color="#ef4444" />
              <div>
                <p style={{ color: '#fca5a5', fontSize: '12px', margin: 0, fontWeight: '600' }}>Cancelados</p>
                <p style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', margin: 0, lineHeight: 1 }}>
                  {cancelledCrossings}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Passengers In */}
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px',
          padding: '16px',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserCheck size={20} color="#4ade80" />
            <div>
              <p style={{ color: '#86efac', fontSize: '12px', margin: 0, fontWeight: '600', textTransform: 'uppercase' }}>
                Pasajeros Ingresados
              </p>
              <p style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', margin: 0, lineHeight: 1 }}>
                {movementStats?.totalPassengersIn.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Passengers Out */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px',
          padding: '16px',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={20} color="#60a5fa" />
            <div>
              <p style={{ color: '#93c5fd', fontSize: '12px', margin: 0, fontWeight: '600', textTransform: 'uppercase' }}>
                Pasajeros Egresados
              </p>
              <p style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', margin: 0, lineHeight: 1 }}>
                {movementStats?.totalPassengersOut.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Top Agencies */}
        <div style={{
          background: 'rgba(168, 85, 247, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px',
          padding: '16px',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          gridColumn: cancelledCrossings > 0 ? 'auto' : 'span 2'
        }}>
          <p style={{ color: '#c4b5fd', fontSize: '12px', margin: '0 0 10px 0', fontWeight: '600', textTransform: 'uppercase' }}>
            Top 5 Agencias
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {topAgencies.map(([agency, count]) => (
              <div 
                key={agency}
                style={{
                  background: 'rgba(168, 85, 247, 0.2)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ color: '#c4b5fd', fontSize: '13px', fontWeight: '600' }}>{agency}</span>
                <span style={{ 
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



