import React from 'react';
import { Bell, Clock, AlertCircle } from 'lucide-react';
import { format, differenceInHours, isBefore, addHours } from 'date-fns';
import type { ShipCrossing } from '../lib/ships';

interface UpcomingAlertsProps {
  crossings: ShipCrossing[];
}

export function UpcomingAlerts({ crossings }: UpcomingAlertsProps) {
  const now = new Date();
  const in24Hours = addHours(now, 24);
  const in48Hours = addHours(now, 48);

  // Filtrar cruceros próximos (próximas 48 horas)
  const upcomingCrossings = crossings.filter(crossing => {
    const entryTime = crossing.diaEntrada;
    return isBefore(now, entryTime) && isBefore(entryTime, in48Hours);
  }).sort((a, b) => a.diaEntrada.getTime() - b.diaEntrada.getTime());

  if (upcomingCrossings.length === 0) {
    return null;
  }

  return (
    <div style={{
      background: 'rgba(59, 130, 246, 0.15)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '30px',
      border: '2px solid rgba(59, 130, 246, 0.4)',
      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.2)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        marginBottom: '15px' 
      }}>
        <Bell size={24} style={{ color: '#60a5fa' }} />
        <h3 style={{ 
          margin: 0, 
          color: 'white', 
          fontSize: '18px', 
          fontWeight: '700' 
        }}>
          🔔 Cruceros Próximos (48 horas)
        </h3>
        <span style={{
          padding: '4px 12px',
          background: '#3b82f6',
          borderRadius: '20px',
          color: 'white',
          fontSize: '13px',
          fontWeight: '700'
        }}>
          {upcomingCrossings.length}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {upcomingCrossings.map(crossing => {
          const hoursUntilArrival = differenceInHours(crossing.diaEntrada, now);
          const isUrgent = hoursUntilArrival <= 24;

          return (
            <div 
              key={crossing.id}
              style={{
                background: isUrgent 
                  ? 'rgba(251, 191, 36, 0.15)' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: isUrgent 
                  ? '1px solid rgba(251, 191, 36, 0.5)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = isUrgent 
                  ? 'rgba(251, 191, 36, 0.25)' 
                  : 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = isUrgent 
                  ? 'rgba(251, 191, 36, 0.15)' 
                  : 'rgba(255, 255, 255, 0.05)';
              }}
            >
              {/* Urgency Icon */}
              {isUrgent ? (
                <AlertCircle size={24} style={{ color: '#fbbf24', flexShrink: 0 }} />
              ) : (
                <Clock size={24} style={{ color: '#60a5fa', flexShrink: 0 }} />
              )}

              {/* Ship Info */}
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: '700', 
                  color: 'white', 
                  fontSize: '15px',
                  marginBottom: '4px'
                }}>
                  {crossing.ship.buque}
                </div>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#93c5fd'
                }}>
                  {crossing.ship.bandera} • IMO {crossing.ship.imo}
                </div>
              </div>

              {/* Time Info */}
              <div style={{ textAlign: 'right', minWidth: '150px' }}>
                <div style={{ 
                  fontWeight: '700', 
                  color: isUrgent ? '#fbbf24' : '#60a5fa',
                  fontSize: '14px',
                  marginBottom: '4px'
                }}>
                  {format(crossing.diaEntrada, 'dd/MM/yyyy')}
                </div>
                <div style={{ 
                  fontSize: '13px', 
                  color: isUrgent ? '#fde68a' : '#bfdbfe'
                }}>
                  {crossing.horaEntrada} • En {hoursUntilArrival}h
                </div>
              </div>

              {/* Urgency Badge */}
              {isUrgent && (
                <div style={{
                  padding: '6px 14px',
                  background: '#fbbf24',
                  borderRadius: '6px',
                  color: '#78350f',
                  fontSize: '12px',
                  fontWeight: '700',
                  whiteSpace: 'nowrap'
                }}>
                  ⚡ URGENTE
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
