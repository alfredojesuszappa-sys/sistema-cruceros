import React, { useState, useEffect } from 'react';
import { Ship as ShipIcon, Home, Calendar, Database } from 'lucide-react';
import {
  Ship,
  ShipCrossing,
  loadShips,
  loadCrossings,
  getShipClass,
  getMovementStats
} from '../lib/ships';
import { Statistics } from './Statistics';
import { MovementManager } from './MovementManager';
import { ShipManagement } from './ShipManagement';
import { CrossingManagerSimple2 } from './CrossingManagerSimple2';

type TabType = 'dashboard' | 'crossings' | 'ships';

export function CrossingManagerSimple() {
  const [isLoading, setIsLoading] = useState(true);
  const [ships, setShips] = useState<Ship[]>([]);
  const [crossings, setCrossings] = useState<ShipCrossing[]>([]);
  const [movementStats, setMovementStats] = useState({
    shipsInPort: 0,
    totalPassengersIn: 0,
    totalPassengersOut: 0,
    totalArrivals: 0
  });
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  useEffect(() => {
    console.log('🚢 CrossingManagerSimple: Starting to load...');
    loadAllData();
  }, []);

  const loadAllData = () => {
    try {
      const loadedShips = loadShips();
      const loadedCrossings = loadCrossings();
      const stats = getMovementStats();
      console.log('✅ Loaded:', { ships: loadedShips.length, crossings: loadedCrossings.length, stats });
      setShips(loadedShips);
      setCrossings(loadedCrossings);
      setMovementStats(stats);
    } catch (error) {
      console.error('❌ Error loading:', error);
    } finally {
      setIsLoading(false);
      console.log('✅ Loading complete');
    }
  };

  const handleMovementUpdate = () => {
    const stats = getMovementStats();
    setMovementStats(stats);
  };

  const handleShipsUpdate = () => {
    const loadedShips = loadShips();
    setShips(loadedShips);
  };

  const handleCrossingsUpdate = () => {
    const loadedCrossings = loadCrossings();
    setCrossings(loadedCrossings);
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <ShipIcon size={64} color="#60a5fa" style={{ margin: '0 auto 20px' }} />
          <p style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
            Cargando Sistema...
          </p>
          <p style={{ color: '#93c5fd', fontSize: '14px' }}>
            Canal Punta Indio Km 118.5
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <ShipIcon size={40} color="#60a5fa" />
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', margin: '0 0 5px 0' }}>
                GESTIÓN DE CRUCEROS OCEÁNICOS
              </h1>
              <p style={{ color: '#93c5fd', fontSize: '14px', margin: 0 }}>
                📍 Canal Punta Indio - KM 118.5
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          <TabButton
            icon={Home}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <TabButton
            icon={Calendar}
            label="Sistema de Cruceros"
            active={activeTab === 'crossings'}
            onClick={() => setActiveTab('crossings')}
          />
          <TabButton
            icon={Database}
            label="Base de Datos Buques"
            active={activeTab === 'ships'}
            onClick={() => setActiveTab('ships')}
          />
        </div>

        {/* Content Area */}
        {activeTab === 'dashboard' && (
          <>
            <Statistics ships={ships} crossings={crossings} movementStats={movementStats} />
            <div style={{ marginBottom: '30px' }}>
              <MovementManager onUpdate={handleMovementUpdate} />
            </div>
          </>
        )}

        {activeTab === 'crossings' && (
          <CrossingManagerSimple2 />
        )}

        {activeTab === 'ships' && (
          <ShipManagement onUpdate={handleShipsUpdate} />
        )}
      </div>
    </div>
  );
}

// Tab Button Component
function TabButton({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any; 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 24px',
        background: active 
          ? 'rgba(59, 130, 246, 0.3)' 
          : 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: active
          ? '2px solid #3b82f6'
          : '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: active ? '#60a5fa' : '#93c5fd',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s'
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
      }}
    >
      <Icon size={20} />
      {label}
    </button>
  );
}






