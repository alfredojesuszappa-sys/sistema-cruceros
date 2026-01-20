import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Ship, Database, Activity, Calendar } from 'lucide-react';
import { Dashboard } from './Dashboard';
import { CrossingManagerSimple2 } from './CrossingManagerSimple2';
import { ShipDatabase } from './ShipDatabase';
import { ChannelReservations, calculateReservations, getShipClass } from './ChannelReservations';
import type { ShipCrossing } from '../lib/ships';
import { loadShips, saveShips, calculateEntryTimes, calculateExitTimes } from '../lib/ships';
import { format, subHours } from 'date-fns';

type TabType = 'dashboard' | 'crossings' | 'database' | 'reservations';

interface Cruise {
  id: string;
  nombreBuque: string;
  diaEntrada: Date;
  horaEntrada?: string;
  diaSalida: Date;
  horaSalida?: string;
  eslora: number;
  manga: number;
  calado: number;
  entry: {
    km239?: Date;
    km216?: Date;
    km118_5?: Date;
    km59_in?: Date;
    km37?: Date;
    km7_3?: Date;
    etaPto?: Date;
  };
  exit: {
    km59?: Date;
    km77?: Date;
    km118_5?: Date;
    km216?: Date;
    km239?: Date;
  };
  agencia: string;
  estado: string;
}

interface Reservation {
  cruiseId: string;
  shipName: string;
  reservaCPIEntrada?: string;
  reservaACCEntrada?: string;
  reservaACCSalida?: string;
  reservaCPISalida?: string;
}

export function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [globalSearch, setGlobalSearch] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  // Initialize database on mount
  useEffect(() => {
    console.log('🚀 MainApp - Inicializando sistema...');
    
    try {
      // 1. Verificar que localStorage está disponible
      if (typeof window === 'undefined' || !window.localStorage) {
        throw new Error('localStorage no disponible');
      }
      
      // 2. Forzar inicialización de la base de datos de buques
      console.log('📚 Verificando base de datos de buques...');
      let ships = loadShips();
      
      if (!ships || ships.length === 0) {
        console.warn('⚠️ Base de datos vacía, reinicializando...');
        // Force re-initialization by clearing and reloading
        localStorage.removeItem('ships_database');
        ships = loadShips();
        console.log('✅ Base de datos reinicializada con', ships.length, 'buques');
      } else {
        console.log('✅ Base de datos cargada:', ships.length, 'buques');
      }
      
      // 2.5. MIGRACIÓN: Actualizar cruceros antiguos con campos faltantes
      console.log('🔄 Verificando migración de datos...');
      const storedCrossings = localStorage.getItem('ship_crossings');
      
      if (storedCrossings) {
        const cruises = JSON.parse(storedCrossings);
        let needsMigration = false;
        
        const migratedCruises = cruises.map((crossing: any) => {
          // Verificar si faltan los campos nuevos
          const hasEtaPto = crossing.entry?.etaPto;
          const hasEtdPto = crossing.exit?.etdPto;
          
          if (!hasEtaPto || !hasEtdPto) {
            needsMigration = true;
            console.log(`🔧 Migrando crucero: ${crossing.nombreBuque}`);
            
            // Encontrar el buque en la base de datos
            const ship = ships.find((s: any) => s.buque === crossing.nombreBuque);
            
            if (ship) {
              try {
                // Recalcular tiempos de entrada
                if (crossing.diaEntrada && crossing.horaEntrada) {
                  const entryDateStr = typeof crossing.diaEntrada === 'string' 
                    ? crossing.diaEntrada 
                    : new Date(crossing.diaEntrada).toISOString().split('T')[0];
                  const entryDateTime = new Date(`${entryDateStr}T${crossing.horaEntrada}:00`);
                  
                  if (!isNaN(entryDateTime.getTime())) {
                    crossing.entry = calculateEntryTimes(ship, entryDateTime);
                  }
                }
                
                // Recalcular tiempos de salida
                if (crossing.diaSalida && crossing.horaSalida) {
                  const exitDateStr = typeof crossing.diaSalida === 'string' 
                    ? crossing.diaSalida 
                    : new Date(crossing.diaSalida).toISOString().split('T')[0];
                  const exitDateTime = new Date(`${exitDateStr}T${crossing.horaSalida}:00`);
                  
                  if (!isNaN(exitDateTime.getTime())) {
                    crossing.exit = calculateExitTimes(ship, exitDateTime);
                  }
                }
              } catch (err) {
                console.error('❌ Error migrando crucero:', crossing.nombreBuque, err);
              }
            }
          }
          
          return crossing;
        });
        
        if (needsMigration) {
          localStorage.setItem('ship_crossings', JSON.stringify(migratedCruises));
          console.log('✅ Migración completada:', migratedCruises.length, 'cruceros actualizados');
        } else {
          console.log('✅ No se requiere migración, todos los cruceros están actualizados');
        }
      }
      
      // 3. Pre-calculate reservations
      console.log('📊 Pre-calculando reservas...');
      const storedCrossingsForReservations = localStorage.getItem('ship_crossings');
      
      if (storedCrossingsForReservations) {
        const cruises = JSON.parse(storedCrossingsForReservations);
        
        // Convert date strings back to Date objects
        const parsedCruises = cruises.map(c => ({
          ...c,
          diaEntrada: new Date(c.diaEntrada),
          diaSalida: new Date(c.diaSalida),
          entry: {
            ...c.entry,
            km239: c.entry.km239 ? new Date(c.entry.km239) : undefined,
            km216: c.entry.km216 ? new Date(c.entry.km216) : undefined,
            km118_5: c.entry.km118_5 ? new Date(c.entry.km118_5) : undefined,
            km59_in: c.entry.km59_in ? new Date(c.entry.km59_in) : undefined,
            km37: c.entry.km37 ? new Date(c.entry.km37) : undefined,
            km7_3: c.entry.km7_3 ? new Date(c.entry.km7_3) : undefined,
            etaPto: c.entry.etaPto ? new Date(c.entry.etaPto) : undefined,
          },
          exit: {
            ...c.exit,
            km59: c.exit.km59 ? new Date(c.exit.km59) : undefined,
            km77: c.exit.km77 ? new Date(c.exit.km77) : undefined,
            km118_5: c.exit.km118_5 ? new Date(c.exit.km118_5) : undefined,
            km216: c.exit.km216 ? new Date(c.exit.km216) : undefined,
            km239: c.exit.km239 ? new Date(c.exit.km239) : undefined,
          }
        }));
        
        const calculated = calculateReservations(parsedCruises, ships);
        
        // Check if reservations already exist (may have manual edits)
        const savedReservations = localStorage.getItem('channelReservations');
        
        if (savedReservations) {
          const saved: Reservation[] = JSON.parse(savedReservations);
          const merged = calculated.map(calc => {
            const savedReserv = saved.find(s => s.cruiseId === calc.cruiseId);
            return savedReserv || calc;
          });
          
          const newReservations = calculated.filter(
            calc => !saved.some(s => s.cruiseId === calc.cruiseId)
          );
          
          const finalReservations = [...merged, ...newReservations];
          localStorage.setItem('channelReservations', JSON.stringify(finalReservations));
          console.log('✅ Reservas actualizadas:', finalReservations.length);
        } else {
          localStorage.setItem('channelReservations', JSON.stringify(calculated));
          console.log('✅ Reservas inicializadas:', calculated.length);
        }
      }
      
      setIsInitialized(true);
      console.log('✅ Sistema inicializado correctamente');
      
    } catch (error) {
      console.error('❌ Error inicializando sistema:', error);
      setInitError(error instanceof Error ? error.message : 'Error desconocido');
      setIsInitialized(true); // Allow UI to render even with error
    }
  }, []);

  // Show loading screen while initializing
  if (!isInitialized) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1565c0',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h2 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>
            Inicializando Sistema...
          </h2>
          <p style={{ margin: 0, opacity: 0.8 }}>
            Cargando base de datos de buques
          </p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Show error message if initialization failed
  if (initError) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1565c0',
        color: 'white',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(220, 38, 38, 0.2)',
          border: '2px solid #dc2626',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '24px', margin: '0 0 15px 0' }}>
            ⚠️ Error de Inicialización
          </h2>
          <p style={{ margin: '0 0 20px 0', opacity: 0.9 }}>
            {initError}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'white',
              color: '#1565c0',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🔄 Reintentar
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'database' as TabType, label: 'Base de Datos', icon: Database },
    { id: 'crossings' as TabType, label: 'Sistema de Cruceros', icon: Ship },
    { id: 'reservations' as TabType, label: 'Reservas de Canal', icon: Calendar },
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#1565c0' /* Flat solid blue - no gradient */
    }}>
      {/* Navigation Tabs */}
      <div style={{
        background: '#1e88e5', /* Solid lighter blue */
        borderBottom: '3px solid #0d47a1',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          padding: '15px 20px'
        }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '15px', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ 
              position: 'relative',
              flex: 1,
              maxWidth: '600px'
            }}>
              <input
                type="text"
                placeholder="🔍 Buscar por nombre de buque, IMO, agencia, bandera..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 45px 12px 45px',
                  borderRadius: '10px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '14px',
                  color: '#0d47a1',
                  fontWeight: '500',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#ffffff';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              {globalSearch && (
                <button
                  onClick={() => setGlobalSearch('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '14px 28px',
                    background: isActive 
                      ? '#ffffff' /* Flat white for active */
                      : 'transparent',
                    border: isActive 
                      ? '3px solid #0d47a1' /* Solid dark blue border */
                      : '3px solid transparent',
                    borderRadius: '8px',
                    color: isActive ? '#0d47a1' : 'white',
                    cursor: 'pointer',
                    fontWeight: isActive ? '700' : '600',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease',
                    boxShadow: 'none' /* Remove all shadows */
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '0' }}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'database' && <ShipDatabase globalSearch={globalSearch} />}
        {activeTab === 'crossings' && <CrossingManagerSimple2 globalSearch={globalSearch} />}
        {activeTab === 'reservations' && <ChannelReservations globalSearch={globalSearch} />}
      </div>

      {/* Footer */}
      <footer style={{
        background: '#0d47a1',
        borderTop: '3px solid #1565c0',
        color: 'white',
        padding: '20px',
        marginTop: '40px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {/* Copyright */}
          <div style={{ fontSize: '14px' }}>
            <p style={{ margin: '0 0 5px 0', fontWeight: '600' }}>
              © 2026 Sistema de Gestión de Cruceros Oceánicos
            </p>
            <p style={{ margin: 0, opacity: 0.85, fontSize: '13px' }}>
              Todos los derechos reservados
            </p>
          </div>

          {/* Contact */}
          <div style={{ fontSize: '14px', textAlign: 'right' }}>
            <p style={{ margin: '0 0 5px 0', fontWeight: '600' }}>
              📧 Contacto
            </p>
            <p style={{ margin: '0 0 5px 0', opacity: 0.95, fontSize: '13px' }}>
              Alfredo Jesús Zappa
            </p>
            <p style={{ margin: 0, opacity: 0.85, fontSize: '13px' }}>
              alfredojesus.zappa@gmail.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}




