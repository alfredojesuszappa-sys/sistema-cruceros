



import React, { useState, useEffect } from 'react';
import { Ship, Calendar, Users, Anchor, X, Save, Edit2, Trash2, Plus } from 'lucide-react';
import {
  Ship as ShipType,
  ShipMovement,
  loadShips,
  loadMovements,
  addMovement,
  updateMovement,
  deleteMovement
} from '../lib/ships';
import { format } from 'date-fns';

interface MovementManagerProps {
  onUpdate?: () => void;
}

export function MovementManager({ onUpdate }: MovementManagerProps) {
  const [ships, setShips] = useState<ShipType[]>([]);
  const [movements, setMovements] = useState<ShipMovement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [selectedShipId, setSelectedShipId] = useState('');
  const [fechaAmarre, setFechaAmarre] = useState('');
  const [fm, setFm] = useState('');
  const [pasajerosIngresados, setPasajerosIngresados] = useState('');
  const [fechaZarpada, setFechaZarpada] = useState('');
  const [to, setTo] = useState('');
  const [pasajerosEgresados, setPasajerosEgresados] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loadedShips = loadShips();
    const loadedMovements = loadMovements();
    console.log('🔄 MovementManager loadData:', {
      shipsCount: loadedShips.length,
      movementsCount: loadedMovements.length,
      movements: loadedMovements
    });
    setShips(loadedShips);
    setMovements(loadedMovements);
  };

  const resetForm = () => {
    setSelectedShipId('');
    setFechaAmarre('');
    setFm('');
    setPasajerosIngresados('');
    setFechaZarpada('');
    setTo('');
    setPasajerosEgresados('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (movement: ShipMovement) => {
    setEditingId(movement.id);
    setSelectedShipId(movement.shipId);
    setFechaAmarre(movement.fechaAmarre ? format(movement.fechaAmarre, "yyyy-MM-dd'T'HH:mm") : '');
    setFm(movement.fm || '');
    setPasajerosIngresados(movement.pasajerosIngresados?.toString() || '');
    setFechaZarpada(movement.fechaZarpada ? format(movement.fechaZarpada, "yyyy-MM-dd'T'HH:mm") : '');
    setTo(movement.to || '');
    setPasajerosEgresados(movement.pasajerosEgresados?.toString() || '');
    setShowForm(true);
  };

  const handleSave = () => {
    const ship = ships.find(s => s.id === selectedShipId);
    if (!ship) {
      alert('Por favor selecciona un buque');
      return;
    }

    const movementData = {
      shipId: selectedShipId,
      shipName: ship.buque,
      fechaAmarre: fechaAmarre ? new Date(fechaAmarre) : undefined,
      fm: fm || undefined,
      pasajerosIngresados: pasajerosIngresados ? parseInt(pasajerosIngresados) : undefined,
      fechaZarpada: fechaZarpada ? new Date(fechaZarpada) : undefined,
      to: to || undefined,
      pasajerosEgresados: pasajerosEgresados ? parseInt(pasajerosEgresados) : undefined
    };

    console.log('💾 Saving movement:', movementData);

    if (editingId) {
      updateMovement(editingId, movementData);
      console.log('✏️ Movement updated:', editingId);
    } else {
      const newMovement = addMovement(movementData);
      console.log('✨ New movement created:', newMovement);
    }

    // Verify it was saved
    const savedMovements = JSON.parse(localStorage.getItem('shipMovements') || '[]');
    console.log('✅ Total movements after save:', savedMovements.length);
    console.log('📋 All movements:', savedMovements);

    loadData();
    resetForm();
    if (onUpdate) onUpdate();
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este movimiento?')) {
      deleteMovement(id);
      loadData();
      if (onUpdate) onUpdate();
    }
  };

  // Sort movements by fecha amarre (most recent first)
  const sortedMovements = [...movements].sort((a, b) => {
    const dateA = a.fechaAmarre?.getTime() || 0;
    const dateB = b.fechaAmarre?.getTime() || 0;
    return dateB - dateA;
  });

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '25px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Anchor size={28} color="#60a5fa" />
          <h2 style={{ color: 'white', fontSize: '22px', margin: 0, fontWeight: '600' }}>
            Registro de Movimientos
          </h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: showForm ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
            border: showForm ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(34, 197, 94, 0.4)',
            color: showForm ? '#fca5a5' : '#86efac',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancelar' : 'Nuevo Movimiento'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}>
          <h3 style={{ color: '#93c5fd', fontSize: '16px', marginBottom: '15px', fontWeight: '600' }}>
            {editingId ? 'Editar Movimiento' : 'Nuevo Movimiento'}
          </h3>

          {/* Ship Selection */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#93c5fd', fontSize: '13px', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
              Buque *
            </label>
            <select
              value={selectedShipId}
              onChange={(e) => setSelectedShipId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                color: 'white',
                fontSize: '14px'
              }}
            >
              <option value="" style={{ background: '#1e3a8a', color: 'white' }}>Seleccionar buque...</option>
              {ships.map(ship => (
                <option key={ship.id} value={ship.id} style={{ background: '#1e3a8a', color: 'white' }}>
                  {ship.buque} - {ship.agencia}
                </option>
              ))}
            </select>
          </div>

          {/* Grid for inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            {/* Fecha Amarre */}
            <div>
              <label style={{ color: '#93c5fd', fontSize: '13px', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                Fecha Amarre
              </label>
              <input
                type="datetime-local"
                value={fechaAmarre}
                onChange={(e) => setFechaAmarre(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* FM */}
            <div>
              <label style={{ color: '#93c5fd', fontSize: '13px', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                FM (Fondeadero/Muelle)
              </label>
              <input
                type="text"
                value={fm}
                onChange={(e) => setFm(e.target.value)}
                placeholder="Ej: MVD, STS"
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Pasajeros Ingresados */}
            <div>
              <label style={{ color: '#93c5fd', fontSize: '13px', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                Pasajeros Ingresados
              </label>
              <input
                type="number"
                value={pasajerosIngresados}
                onChange={(e) => setPasajerosIngresados(e.target.value)}
                placeholder="0"
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Fecha Zarpada */}
            <div>
              <label style={{ color: '#93c5fd', fontSize: '13px', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                Fecha Zarpada
              </label>
              <input
                type="datetime-local"
                value={fechaZarpada}
                onChange={(e) => setFechaZarpada(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* TO */}
            <div>
              <label style={{ color: '#93c5fd', fontSize: '13px', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                TO (Turn Around)
              </label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Información adicional"
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Pasajeros Egresados */}
            <div>
              <label style={{ color: '#93c5fd', fontSize: '13px', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                Pasajeros Egresados
              </label>
              <input
                type="number"
                value={pasajerosEgresados}
                onChange={(e) => setPasajerosEgresados(e.target.value)}
                placeholder="0"
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
            <button
              onClick={resetForm}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#fca5a5',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              style={{
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                color: '#86efac',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              <Save size={16} />
              Grabar
            </button>
          </div>
        </div>
      )}

      {/* Movements Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.2)' }}>
              <th style={{ padding: '12px 8px', textAlign: 'left', color: '#93c5fd', fontSize: '12px', fontWeight: '600' }}>
                FECHA AMARRE
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'left', color: '#93c5fd', fontSize: '12px', fontWeight: '600' }}>
                NOMBRE DEL BUQUE
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'center', color: '#93c5fd', fontSize: '12px', fontWeight: '600' }}>
                FM
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'center', color: '#93c5fd', fontSize: '12px', fontWeight: '600' }}>
                PASAJEROS INGRESADOS
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'left', color: '#93c5fd', fontSize: '12px', fontWeight: '600' }}>
                FECHA ZARPADA
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'center', color: '#93c5fd', fontSize: '12px', fontWeight: '600' }}>
                TO
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'center', color: '#93c5fd', fontSize: '12px', fontWeight: '600' }}>
                PASAJEROS EGRESADOS
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'center', color: '#93c5fd', fontSize: '12px', fontWeight: '600' }}>
                ACCIONES
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedMovements.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#93c5fd' }}>
                  No hay movimientos registrados
                </td>
              </tr>
            ) : (
              sortedMovements.map((movement) => (
                <tr
                  key={movement.id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'background 0.2s',
                    background: !movement.fechaZarpada ? 'rgba(34, 197, 94, 0.05)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = !movement.fechaZarpada ? 'rgba(34, 197, 94, 0.05)' : 'transparent';
                  }}
                >
                  <td style={{ padding: '12px 8px', color: 'white', fontSize: '13px' }}>
                    {movement.fechaAmarre ? (
                      <div>
                        <div>{format(movement.fechaAmarre, 'dd/MM/yyyy')}</div>
                        <div style={{ color: '#93c5fd', fontSize: '12px', marginTop: '2px' }}>
                          {format(movement.fechaAmarre, 'HH:mm')}
                        </div>
                      </div>
                    ) : '-'}
                  </td>
                  <td style={{ padding: '12px 8px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    {movement.shipName}
                    {movement.fechaZarpada ? (
                      <span style={{
                        marginLeft: '8px',
                        background: 'rgba(59, 130, 246, 0.2)',
                        color: '#60a5fa',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        ZARPADO
                      </span>
                    ) : (
                      <span style={{
                        marginLeft: '8px',
                        background: 'rgba(34, 197, 94, 0.2)',
                        color: '#86efac',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        EN PUERTO
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px 8px', textAlign: 'center', color: '#93c5fd', fontSize: '13px' }}>
                    {movement.fm || '-'}
                  </td>
                  <td style={{ padding: '12px 8px', textAlign: 'center', color: '#86efac', fontSize: '14px', fontWeight: '600' }}>
                    {movement.pasajerosIngresados?.toLocaleString() || '-'}
                  </td>
                  <td style={{ padding: '12px 8px', color: 'white', fontSize: '13px' }}>
                    {movement.fechaZarpada ? (
                      <div>
                        <div>{format(movement.fechaZarpada, 'dd/MM/yyyy')}</div>
                        <div style={{ color: '#93c5fd', fontSize: '12px', marginTop: '2px' }}>
                          {format(movement.fechaZarpada, 'HH:mm')}
                        </div>
                      </div>
                    ) : '-'}
                  </td>
                  <td style={{ padding: '12px 8px', textAlign: 'center', color: '#93c5fd', fontSize: '13px' }}>
                    {movement.to || '-'}
                  </td>
                  <td style={{ padding: '12px 8px', textAlign: 'center', color: '#60a5fa', fontSize: '14px', fontWeight: '600' }}>
                    {movement.pasajerosEgresados?.toLocaleString() || '-'}
                  </td>
                  <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => handleEdit(movement)}
                        style={{
                          background: 'rgba(59, 130, 246, 0.2)',
                          border: '1px solid rgba(59, 130, 246, 0.4)',
                          color: '#60a5fa',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(movement.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.2)',
                          border: '1px solid rgba(239, 68, 68, 0.4)',
                          color: '#fca5a5',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}





