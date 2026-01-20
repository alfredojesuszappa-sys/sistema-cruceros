import React, { useState, useEffect } from 'react';
import { 
  Ship as ShipIcon, 
  Anchor, 
  TrendingUp, 
  Calendar,
  Users,
  BarChart3,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { loadShips, loadCrossings, getShipClass, detectCrossingConflicts, addMovement } from '../lib/ships';
import { format } from 'date-fns';
import { MovementManager } from './MovementManager';
import { UserManual } from './UserManual';
import { baseUrl } from '../lib/base-url';

export function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showManual, setShowManual] = useState(false);
  const [stats, setStats] = useState({
    totalShips: 0,
    classA: 0,
    classB: 0,
    classC: 0,
    totalCrossings: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    conflicts: 0,
    nextCrossing: null as any,
    agencies: [] as string[],
    totalPasajerosIngresados: 0,
    totalPasajerosEgresados: 0,
    buquesEnPuerto: 0
  });

  useEffect(() => {
    console.log('🔄 Dashboard useEffect triggered, refreshKey:', refreshKey);
    const ships = loadShips();
    const crossings = loadCrossings();
    const conflicts = detectCrossingConflicts(crossings);
    
    // Clasificar buques
    const classA = ships.filter(s => getShipClass(s.calado) === 'A').length;
    const classB = ships.filter(s => getShipClass(s.calado) === 'B').length;
    const classC = ships.filter(s => getShipClass(s.calado) === 'C').length;
    
    // Estados de cruceros
    const confirmed = crossings.filter(c => c.situation === 'CONFIRMADO').length;
    const pending = crossings.filter(c => c.situation === 'SIN CONFIRMAR').length;
    const cancelled = crossings.filter(c => c.situation === 'CANCELADO').length;
    
    // Próximo crucero
    const today = new Date();
    const upcoming = crossings
      .filter(c => c.diaEntrada >= today && c.situation !== 'CANCELADO')
      .sort((a, b) => a.diaEntrada.getTime() - b.diaEntrada.getTime())[0];
    
    // Agencias únicas
    const uniqueAgencies = [...new Set(ships.map(s => s.agencia))];
    
    // Calcular totales de pasajeros y buques en puerto
    const rawMovements = localStorage.getItem('ship_movements');
    console.log('💾 Raw localStorage data:', rawMovements);
    console.log('💾 Raw data type:', typeof rawMovements);
    console.log('💾 Raw data length:', rawMovements?.length);
    
    let movements = [];
    try {
      movements = JSON.parse(rawMovements || '[]').map((m: any) => {
        console.log('🔄 Processing movement:', m);
        return {
          ...m,
          fechaAmarre: m.fechaAmarre ? new Date(m.fechaAmarre) : undefined,
          fechaZarpada: m.fechaZarpada ? new Date(m.fechaZarpada) : undefined
        };
      });
    } catch (e) {
      console.error('❌ Error parsing movements:', e);
      movements = [];
    }
    
    console.log('📊 Total movements:', movements.length);
    console.log('🔍 Movements data:', movements);
    
    const totalPasajerosIngresados = movements.reduce((sum: number, m: any) => {
      const pax = m.pasajerosIngresados || 0;
      console.log(`➕ Adding ${pax} passengers from ${m.shipName}`);
      return sum + pax;
    }, 0);
    
    const totalPasajerosEgresados = movements.reduce((sum: number, m: any) => {
      const pax = m.pasajerosEgresados || 0;
      console.log(`➖ Adding ${pax} egressed passengers from ${m.shipName}`);
      return sum + pax;
    }, 0);
    
    console.log('👥 Total pasajeros ingresados:', totalPasajerosIngresados);
    console.log('👥 Total pasajeros egresados:', totalPasajerosEgresados);
    
    // Buques en puerto: tienen fecha de amarre pero NO tienen fecha de zarpada
    const buquesEnPuerto = movements.filter((m: any) => {
      const hasAmarre = m.fechaAmarre !== undefined && m.fechaAmarre !== null;
      const hasZarpada = m.fechaZarpada !== undefined && m.fechaZarpada !== null;
      const inPort = hasAmarre && !hasZarpada;
      console.log(`🚢 Ship check:`, {
        name: m.shipName,
        fechaAmarre: m.fechaAmarre,
        fechaZarpada: m.fechaZarpada,
        hasAmarre,
        hasZarpada,
        inPort
      });
      return inPort;
    }).length;
    
    console.log('⚓ Buques en puerto:', buquesEnPuerto);
    
    setStats({
      totalShips: ships.length,
      classA,
      classB,
      classC,
      totalCrossings: crossings.length,
      confirmed,
      pending,
      cancelled,
      conflicts: conflicts.length,
      nextCrossing: upcoming,
      agencies: uniqueAgencies,
      totalPasajerosIngresados,
      totalPasajerosEgresados,
      buquesEnPuerto
    });
  }, [refreshKey]);

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle, 
    color, 
    bgColor 
  }: any) => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={28} style={{ color }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '4px' }}>
            {title}
          </div>
          <div style={{ color: 'white', fontSize: '32px', fontWeight: '700', lineHeight: '1' }}>
            {value}
          </div>
        </div>
      </div>
      {subtitle && (
        <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '10px' }}>
          {subtitle}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h1 style={{ color: 'white', fontSize: '32px', margin: 0, fontWeight: '700' }}>
                📊 Dashboard Principal
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '16px', margin: '10px 0 0 0' }}>
                Vista general del Canal Punta Indio - KM 118.5
              </p>
            </div>
            
            <button
              onClick={() => setShowManual(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
            >
              <BookOpen size={20} />
              <span>📖 Manual de Usuario</span>
            </button>
          </div>
        </div>

        {/* Hero Banner with Maritime Theme */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0c4a6e 100%)',
          borderRadius: '24px',
          padding: '60px 40px',
          marginBottom: '40px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Decorative Ocean Wave Pattern */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(to top, rgba(59, 130, 246, 0.2) 0%, transparent 100%)',
            clipPath: 'polygon(0 40%, 25% 50%, 50% 45%, 75% 55%, 100% 50%, 100% 100%, 0 100%)'
          }} />
          
          {/* Animated Ship Icons */}
          <div style={{
            position: 'absolute',
            top: '30px',
            right: '40px',
            opacity: 0.15,
            transform: 'rotate(-10deg)'
          }}>
            <Anchor size={120} style={{ color: 'white' }} />
          </div>

          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '40px',
            opacity: 0.1,
            transform: 'rotate(15deg)'
          }}>
            <ShipIcon size={100} style={{ color: 'white' }} />
          </div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(59, 130, 246, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '8px 20px',
              borderRadius: '20px',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              marginBottom: '20px'
            }}>
              <span style={{
                color: '#60a5fa',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}>
                🌊 SISTEMA DE GESTIÓN PORTUARIA
              </span>
            </div>

            <h2 style={{
              color: 'white',
              fontSize: '42px',
              fontWeight: '800',
              margin: '0 0 15px 0',
              lineHeight: '1.2',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)'
            }}>
              Control de Cruceros Oceánicos
            </h2>

            <p style={{
              color: '#cbd5e1',
              fontSize: '18px',
              margin: '0 0 30px 0',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              Gestión inteligente de tráfico marítimo en el Canal Punta Indio.
              Optimización de cruceros y prevención de conflictos en tiempo real.
            </p>

            <div style={{
              display: 'flex',
              gap: '30px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(34, 197, 94, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}>
                  <ShipIcon size={20} style={{ color: '#22c55e' }} />
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>
                    Canal Principal
                  </div>
                  <div style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>
                    KM 118.5
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(59, 130, 246, 0.3)'
                }}>
                  <AlertCircle size={20} style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>
                    Conflictos
                  </div>
                  <div style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>
                    {stats.conflicts === 0 ? '✓ Sin conflictos' : `${stats.conflicts} detectados`}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(251, 146, 60, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(251, 146, 60, 0.3)'
                }}>
                  <Anchor size={20} style={{ color: '#fb923c' }} />
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '12px' }}>
                    En Puerto
                  </div>
                  <div style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>
                    {stats.buquesEnPuerto} {stats.buquesEnPuerto === 1 ? 'buque' : 'buques'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <StatCard
            icon={ShipIcon}
            title="Total de Buques"
            value={stats.totalShips}
            subtitle="Buques registrados en la base de datos"
            color="#3b82f6"
            bgColor="rgba(59, 130, 246, 0.2)"
          />
          
          <StatCard
            icon={Calendar}
            title="Cruceros Programados"
            value={stats.totalCrossings}
            subtitle={`${stats.confirmed} confirmados, ${stats.pending} pendientes`}
            color="#10b981"
            bgColor="rgba(16, 185, 129, 0.2)"
          />
          
          <StatCard
            icon={Anchor}
            title="Buques en Puerto"
            value={stats.buquesEnPuerto}
            subtitle={stats.buquesEnPuerto > 0 ? '🚢 Actualmente amarrados' : '✓ Puerto libre'}
            color={stats.buquesEnPuerto > 0 ? '#22c55e' : '#94a3b8'}
            bgColor={stats.buquesEnPuerto > 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(148, 163, 184, 0.2)'}
          />
          
          <StatCard
            icon={Users}
            title="Agencias Marítimas"
            value={stats.agencies.length}
            subtitle="Agencias operando en el canal"
            color="#f59e0b"
            bgColor="rgba(245, 158, 11, 0.2)"
          />

          <StatCard
            icon={Users}
            title="Pasajeros Ingresados"
            value={stats.totalPasajerosIngresados.toLocaleString()}
            subtitle="Total histórico de ingresos"
            color="#3b82f6"
            bgColor="rgba(59, 130, 246, 0.2)"
          />

          <StatCard
            icon={Users}
            title="Pasajeros Egresados"
            value={stats.totalPasajerosEgresados.toLocaleString()}
            subtitle="Total histórico de egresos"
            color="#a855f7"
            bgColor="rgba(168, 85, 247, 0.2)"
          />
        </div>

        {/* Classification Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '20px',
            border: '2px solid #ef4444',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          >
            <div style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              color: '#ef4444',
              marginBottom: '8px'
            }}>
              {stats.classA}
            </div>
            <div style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>
              Clase A
            </div>
            <div style={{ color: '#fca5a5', fontSize: '13px', marginTop: '5px' }}>
              Calado ≥ 8.84m
            </div>
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '20px',
            border: '2px solid #f59e0b',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          >
            <div style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              color: '#f59e0b',
              marginBottom: '8px'
            }}>
              {stats.classB}
            </div>
            <div style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>
              Clase B
            </div>
            <div style={{ color: '#fcd34d', fontSize: '13px', marginTop: '5px' }}>
              Calado 7.33-8.83m
            </div>
          </div>

          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '20px',
            border: '2px solid #22c55e',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          >
            <div style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              color: '#22c55e',
              marginBottom: '8px'
            }}>
              {stats.classC}
            </div>
            <div style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>
              Clase C
            </div>
            <div style={{ color: '#86efac', fontSize: '13px', marginTop: '5px' }}>
              Calado ≤ 7.32m
            </div>
          </div>
        </div>

        {/* Movement Manager - Second Row */}
        <div style={{ marginBottom: '40px' }}>
          <MovementManager onUpdate={() => {
            console.log('🔄 MovementManager onUpdate called - triggering refresh');
            setRefreshKey(prev => prev + 1);
          }} />
        </div>

        {/* Next Crossing Card */}
        {stats.nextCrossing && (
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            marginBottom: '40px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <Calendar size={32} style={{ color: '#60a5fa' }} />
              <h2 style={{ margin: 0, color: 'white', fontSize: '24px' }}>
                Próximo Crucero
              </h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>
                  Buque
                </div>
                <div style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>
                  {stats.nextCrossing.ship.buque}
                </div>
                <div style={{ color: '#60a5fa', fontSize: '13px', marginTop: '3px' }}>
                  Clase {getShipClass(stats.nextCrossing.ship.calado)}
                </div>
              </div>

              <div>
                <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>
                  Fecha de Entrada
                </div>
                <div style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>
                  {format(stats.nextCrossing.diaEntrada, 'dd/MM/yyyy')}
                </div>
                <div style={{ color: '#60a5fa', fontSize: '13px', marginTop: '3px' }}>
                  {stats.nextCrossing.horaEntrada}
                </div>
              </div>

              <div>
                <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>
                  ETA KM 118.5
                </div>
                <div style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>
                  {stats.nextCrossing.entry.km118_5 
                    ? format(stats.nextCrossing.entry.km118_5, 'dd/MM HH:mm')
                    : '—'}
                </div>
              </div>

              <div>
                <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>
                  Agencia
                </div>
                <div style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>
                  {stats.nextCrossing.ship.agencia}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <BarChart3 size={28} style={{ color: '#a78bfa' }} />
              <h3 style={{ margin: 0, color: 'white', fontSize: '20px' }}>
                Estados de Cruceros
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px',
                background: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '10px'
              }}>
                <span style={{ color: 'white', fontSize: '15px' }}>
                  ✓ Confirmados
                </span>
                <span style={{ 
                  color: '#22c55e', 
                  fontSize: '24px', 
                  fontWeight: '700' 
                }}>
                  {stats.confirmed}
                </span>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px',
                background: 'rgba(251, 191, 36, 0.1)',
                borderRadius: '10px'
              }}>
                <span style={{ color: 'white', fontSize: '15px' }}>
                  ⏳ Sin Confirmar
                </span>
                <span style={{ 
                  color: '#fbbf24', 
                  fontSize: '24px', 
                  fontWeight: '700' 
                }}>
                  {stats.pending}
                </span>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px',
                background: 'rgba(107, 114, 128, 0.1)',
                borderRadius: '10px'
              }}>
                <span style={{ color: 'white', fontSize: '15px' }}>
                  ✖ Cancelados
                </span>
                <span style={{ 
                  color: '#6b7280', 
                  fontSize: '24px', 
                  fontWeight: '700' 
                }}>
                  {stats.cancelled}
                </span>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <TrendingUp size={28} style={{ color: '#34d399' }} />
              <h3 style={{ margin: 0, color: 'white', fontSize: '20px' }}>
                Información del Sistema
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ 
                padding: '10px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>
                  Canal Principal
                </div>
                <div style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>
                  Punta Indio - KM 118.5
                </div>
              </div>

              <div style={{ 
                padding: '10px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>
                  Margen de Seguridad
                </div>
                <div style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>
                  30 minutos
                </div>
              </div>

              <div style={{ 
                padding: '10px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>
                  Puntos de Control
                </div>
                <div style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>
                  KM 239 • KM 216 • KM 118.5 • KM 59
                </div>
              </div>

              <div style={{ 
                padding: '10px 0'
              }}>
                <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>
                  Sistema Activo
                </div>
                <div style={{ color: '#22c55e', fontSize: '15px', fontWeight: '600' }}>
                  ✓ Operando normalmente
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* User Manual Modal */}
      {showManual && <UserManual onClose={() => setShowManual(false)} />}
    </div>
  );
}
































