import React, { useState, useEffect } from 'react';
import { 
  Ship as ShipIcon, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Download,
  Upload,
  X,
  Save,
  AlertTriangle
} from 'lucide-react';
import { 
  Ship, 
  loadShips, 
  saveShips, 
  addShip, 
  updateShip, 
  deleteShip,
  getShipClass,
  classifyShip 
} from '../lib/ships';

interface ShipDatabaseProps {
  globalSearch?: string;
}

export function ShipDatabase({ globalSearch = '' }: ShipDatabaseProps) {
  const [ships, setShips] = useState<Ship[]>([]);
  const [filteredShips, setFilteredShips] = useState<Ship[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState<string>('ALL');
  const [filterAgency, setFilterAgency] = useState<string>('ALL');
  const [showForm, setShowForm] = useState(false);
  const [editingShip, setEditingShip] = useState<Ship | null>(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Form fields
  const [formData, setFormData] = useState({
    buque: '',
    bandera: '',
    imo: '',
    eslora: '',
    manga: '',
    puntal: '',
    calado: '',
    agencia: ''
  });

  useEffect(() => {
    loadShipsData();
  }, []);

  useEffect(() => {
    filterShips();
  }, [ships, searchTerm, filterClass, filterAgency, globalSearch]);

  const loadShipsData = () => {
    const loadedShips = loadShips();
    setShips(loadedShips);
  };

  const filterShips = () => {
    let filtered = [...ships];

    // Búsqueda por texto (combinar globalSearch y searchTerm local)
    const combinedSearch = (globalSearch + ' ' + searchTerm).trim();
    if (combinedSearch) {
      filtered = filtered.filter(ship =>
        ship.buque.toLowerCase().includes(combinedSearch.toLowerCase()) ||
        ship.imo.toLowerCase().includes(combinedSearch.toLowerCase()) ||
        ship.agencia.toLowerCase().includes(combinedSearch.toLowerCase()) ||
        ship.bandera.toLowerCase().includes(combinedSearch.toLowerCase())
      );
    }

    // Filtro por clase
    if (filterClass !== 'ALL') {
      filtered = filtered.filter(ship => getShipClass(ship.calado) === filterClass);
    }

    // Filtro por agencia
    if (filterAgency !== 'ALL') {
      filtered = filtered.filter(ship => ship.agencia === filterAgency);
    }

    setFilteredShips(filtered);
  };

  const handleAdd = () => {
    setEditingShip(null);
    setFormData({
      buque: '',
      bandera: '',
      imo: '',
      eslora: '',
      manga: '',
      puntal: '',
      calado: '',
      agencia: ''
    });
    setShowForm(true);
  };

  const handleEdit = (ship: Ship) => {
    setEditingShip(ship);
    setFormData({
      buque: ship.buque,
      bandera: ship.bandera,
      imo: ship.imo,
      eslora: ship.eslora.toString(),
      manga: ship.manga.toString(),
      puntal: ship.puntal.toString(),
      calado: ship.calado.toString(),
      agencia: ship.agencia
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este buque?')) {
      deleteShip(id);
      loadShipsData();
    }
  };

  const handleDeleteAll = () => {
    setShowDeleteAllModal(true);
    setDeleteConfirmText('');
  };

  const confirmDeleteAll = () => {
    if (deleteConfirmText.toUpperCase() !== 'ELIMINAR TODO') {
      alert('⚠️ Debe escribir exactamente "ELIMINAR TODO" para confirmar');
      return;
    }

    // Segunda confirmación
    const finalConfirm = confirm(
      `⚠️ ÚLTIMA CONFIRMACIÓN\n\n` +
      `Está a punto de eliminar TODOS los ${ships.length} buques de la base de datos.\n\n` +
      `Esta acción NO se puede deshacer.\n\n` +
      `¿Está absolutamente seguro de continuar?`
    );

    if (finalConfirm) {
      saveShips([]);
      loadShipsData();
      setShowDeleteAllModal(false);
      alert('✅ Todos los buques han sido eliminados de la base de datos');
    }
  };

  const handleSubmit = () => {
    if (!formData.buque || !formData.imo || !formData.calado) {
      alert('⚠️ Complete los campos obligatorios: Buque, IMO y Calado');
      return;
    }

    const shipData = {
      buque: formData.buque,
      bandera: formData.bandera,
      imo: formData.imo,
      eslora: parseFloat(formData.eslora) || 0,
      manga: parseFloat(formData.manga) || 0,
      puntal: parseFloat(formData.puntal) || 0,
      calado: parseFloat(formData.calado),
      agencia: formData.agencia
    };

    if (editingShip) {
      console.log('🔄 Actualizando buque:', editingShip.id);
      updateShip(editingShip.id, shipData);
      
      // NUEVO: Sincronizar con cruceros existentes
      try {
        const crossingsData = localStorage.getItem('ship_crossings');
        if (crossingsData) {
          const crossings = JSON.parse(crossingsData);
          let updatedCount = 0;
          
          const updatedCrossings = crossings.map((crossing: any) => {
            if (crossing.ship.id === editingShip.id) {
              updatedCount++;
              console.log(`  ✅ Actualizando crucero: ${crossing.ship.buque} → ${shipData.buque}`);
              
              // Recalcular tiempos con el nuevo calado
              const { calculateEntryTimes, calculateExitTimes } = require('../lib/ships');
              const entryDateTime = new Date(`${crossing.diaEntrada}T${crossing.horaEntrada}:00`);
              const exitDateTime = new Date(`${crossing.diaSalida}T${crossing.horaSalida}:00`);
              
              const updatedShip = {
                ...crossing.ship,
                ...shipData
              };
              
              return {
                ...crossing,
                ship: updatedShip,
                entry: calculateEntryTimes(updatedShip, entryDateTime),
                exit: calculateExitTimes(updatedShip, exitDateTime)
              };
            }
            return crossing;
          });
          
          if (updatedCount > 0) {
            localStorage.setItem('ship_crossings', JSON.stringify(updatedCrossings));
            console.log(`✅ ${updatedCount} crucero(s) actualizado(s)`);
            
            // Recalcular reservas de canal
            const { calculateReservations } = require('./ChannelReservations');
            const ships = loadShips();
            const reservations = calculateReservations(updatedCrossings, ships);
            localStorage.setItem('channelReservations', JSON.stringify(reservations));
            console.log('✅ Reservas de canal recalculadas');
          }
        }
      } catch (error) {
        console.error('❌ Error sincronizando cruceros:', error);
      }
      
      alert('✅ Buque actualizado y sincronizado con cruceros existentes');
    } else {
      addShip(shipData);
      alert('✅ Buque agregado');
    }

    loadShipsData();
    setShowForm(false);
    
    // Recargar página para sincronizar todos los componentes
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const getClassColor = (classType: string) => {
    switch (classType) {
      case 'A': return '#ef4444';
      case 'B': return '#f59e0b';
      case 'C': return '#22c55e';
      default: return '#64748b';
    }
  };

  const uniqueAgencies = [...new Set(ships.map(s => s.agencia))].sort();

  return (
    <div style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ 
              fontSize: '36px', 
              fontWeight: '800', 
              color: 'white', 
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <ShipIcon size={40} />
              Base de Datos de Buques
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>
              {filteredShips.length} de {ships.length} buques
            </p>
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={handleDeleteAll}
              disabled={ships.length === 0}
              style={{
                padding: '14px 28px',
                background: ships.length === 0 
                  ? 'rgba(239, 68, 68, 0.3)'
                  : 'linear-gradient(145deg, #ef4444, #dc2626)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                cursor: ships.length === 0 ? 'not-allowed' : 'pointer',
                fontWeight: '700',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                opacity: ships.length === 0 ? 0.5 : 1
              }}
              onMouseOver={(e) => {
                if (ships.length > 0) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(239, 68, 68, 0.5)';
                }
              }}
              onMouseOut={(e) => {
                if (ships.length > 0) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <AlertTriangle size={20} /> Eliminar Todos
            </button>

            <button
              onClick={handleAdd}
              style={{
                padding: '14px 28px',
                background: 'linear-gradient(145deg, #3b82f6, #2563eb)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Plus size={20} /> Agregar Buque
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '25px',
          marginBottom: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '15px' 
          }}>
            <div>
              <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                🔍 Buscar
              </label>
              <div style={{ position: 'relative' }}>
                <Search 
                  size={20} 
                  style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#64748b'
                  }} 
                />
                <input
                  type="text"
                  placeholder="Nombre, IMO o Agencia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                🎯 Filtrar por Clase
              </label>
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <option value="ALL">Todas las Clases</option>
                <option value="A">Clase A (≥8.84m)</option>
                <option value="B">Clase B (7.33-8.83m)</option>
                <option value="C">Clase C (≤7.32m)</option>
              </select>
            </div>

            <div>
              <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                🏢 Filtrar por Agencia
              </label>
              <select
                value={filterAgency}
                onChange={(e) => setFilterAgency(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <option value="ALL">Todas las Agencias</option>
                {uniqueAgencies.map(agency => (
                  <option key={agency} value={agency}>{agency}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Delete All Modal */}
        {showDeleteAllModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '600px',
              width: '100%',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              border: '3px solid #fca5a5'
            }}>
              <button
                onClick={() => {
                  setShowDeleteAllModal(false);
                  setDeleteConfirmText('');
                }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={24} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <AlertTriangle size={60} style={{ color: '#fef3c7', marginBottom: '20px' }} />
                <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '800', marginBottom: '15px' }}>
                  ⚠️ ADVERTENCIA CRÍTICA
                </h2>
                <p style={{ color: 'white', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Está a punto de <strong>ELIMINAR TODOS LOS {ships.length} BUQUES</strong> de la base de datos.
                </p>
                <p style={{ color: '#fef3c7', fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                  ⛔ Esta acción es PERMANENTE e IRREVERSIBLE
                </p>
                <p style={{ color: '#fef3c7', fontSize: '14px', marginBottom: '0' }}>
                  ⛔ NO se puede deshacer
                </p>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ 
                  color: 'white', 
                  display: 'block', 
                  marginBottom: '12px', 
                  fontSize: '15px', 
                  fontWeight: '700',
                  textAlign: 'center'
                }}>
                  Para confirmar, escriba exactamente:<br/>
                  <span style={{ 
                    fontSize: '18px', 
                    color: '#fef3c7',
                    fontFamily: 'monospace',
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'inline-block',
                    marginTop: '10px'
                  }}>
                    ELIMINAR TODO
                  </span>
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="Escriba aquí..."
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    fontSize: '16px',
                    textAlign: 'center',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}
                  autoFocus
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    setShowDeleteAllModal(false);
                    setDeleteConfirmText('');
                  }}
                  style={{
                    padding: '16px 32px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#dc2626',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '16px'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeleteAll}
                  disabled={deleteConfirmText.toUpperCase() !== 'ELIMINAR TODO'}
                  style={{
                    padding: '16px 32px',
                    background: deleteConfirmText.toUpperCase() === 'ELIMINAR TODO'
                      ? 'linear-gradient(145deg, #fbbf24, #f59e0b)'
                      : 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    cursor: deleteConfirmText.toUpperCase() === 'ELIMINAR TODO' ? 'pointer' : 'not-allowed',
                    fontWeight: '700',
                    fontSize: '16px',
                    opacity: deleteConfirmText.toUpperCase() === 'ELIMINAR TODO' ? 1 : 0.5
                  }}
                >
                  ⚠️ CONFIRMAR ELIMINACIÓN
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }}>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={24} />
              </button>

              <h2 style={{ color: 'white', marginBottom: '30px', fontSize: '28px' }}>
                {editingShip ? '✏️ Editar Buque' : '➕ Agregar Nuevo Buque'}
              </h2>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div>
                  <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                    🚢 Buque *
                  </label>
                  <input
                    type="text"
                    value={formData.buque}
                    onChange={(e) => setFormData({...formData, buque: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '14px'
                    }}
                    placeholder="Nombre del buque"
                  />
                </div>

                <div>
                  <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                    🏴 Bandera
                  </label>
                  <input
                    type="text"
                    value={formData.bandera}
                    onChange={(e) => setFormData({...formData, bandera: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '14px'
                    }}
                    placeholder="País de bandera"
                  />
                </div>

                <div>
                  <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                    🔢 IMO *
                  </label>
                  <input
                    type="text"
                    value={formData.imo}
                    onChange={(e) => setFormData({...formData, imo: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '14px'
                    }}
                    placeholder="Número IMO"
                  />
                </div>

                <div>
                  <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                    📏 Eslora (m)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.eslora}
                    onChange={(e) => setFormData({...formData, eslora: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '14px'
                    }}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                    ↔️ Manga (m)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.manga}
                    onChange={(e) => setFormData({...formData, manga: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '14px'
                    }}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                    ↕️ Puntal (m)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.puntal}
                    onChange={(e) => setFormData({...formData, puntal: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '14px'
                    }}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                    ⚓ Calado (m) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.calado}
                    onChange={(e) => setFormData({...formData, calado: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '14px'
                    }}
                    placeholder="0.00"
                  />
                  {formData.calado && (
                    <div style={{ 
                      marginTop: '8px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: getClassColor(getShipClass(parseFloat(formData.calado))),
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600',
                      textAlign: 'center'
                    }}>
                      Clase {getShipClass(parseFloat(formData.calado))}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ color: 'white', display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                    🏢 Agencia
                  </label>
                  <input
                    type="text"
                    value={formData.agencia}
                    onChange={(e) => setFormData({...formData, agencia: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '14px'
                    }}
                    placeholder="Agencia marítima"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowForm(false)}
                  style={{
                    padding: '14px 28px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '15px'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '14px 28px',
                    background: 'linear-gradient(145deg, #22c55e, #16a34a)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <Save size={20} />
                  {editingShip ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ships Table */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: '13px'
            }}>
              <thead>
                <tr style={{ background: '#0c4a6e', color: 'white' }}>
                  <th style={{ padding: '14px 10px', textAlign: 'center', fontWeight: '700' }}>N°</th>
                  <th style={{ padding: '14px 10px', textAlign: 'left', fontWeight: '700' }}>Buque</th>
                  <th style={{ padding: '14px 10px', textAlign: 'center', fontWeight: '700' }}>Bandera</th>
                  <th style={{ padding: '14px 10px', textAlign: 'center', fontWeight: '700' }}>IMO</th>
                  <th style={{ padding: '14px 10px', textAlign: 'center', fontWeight: '700' }}>Eslora (m)</th>
                  <th style={{ padding: '14px 10px', textAlign: 'center', fontWeight: '700' }}>Manga (m)</th>
                  <th style={{ padding: '14px 10px', textAlign: 'center', fontWeight: '700' }}>Puntal (m)</th>
                  <th style={{ padding: '14px 10px', textAlign: 'center', fontWeight: '700' }}>Calado (m)</th>
                  <th style={{ padding: '14px 10px', textAlign: 'center', fontWeight: '700' }}>Clase</th>
                  <th style={{ padding: '14px 10px', textAlign: 'center', fontWeight: '700' }}>Agencia</th>
                  <th style={{ padding: '14px 10px', textAlign: 'center', fontWeight: '700' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredShips.length === 0 ? (
                  <tr>
                    <td colSpan={11} style={{ 
                      padding: '40px', 
                      textAlign: 'center',
                      color: '#64748b',
                      fontSize: '14px'
                    }}>
                      {searchTerm || filterClass !== 'ALL' || filterAgency !== 'ALL'
                        ? 'No se encontraron buques con los filtros aplicados'
                        : 'No hay buques registrados. Agregue el primer buque.'}
                    </td>
                  </tr>
                ) : (
                  filteredShips.map((ship, index) => {
                    const shipClass = getShipClass(ship.calado);
                    const classColor = getClassColor(shipClass);

                    return (
                      <tr 
                        key={ship.id}
                        style={{ 
                          borderBottom: '1px solid #e2e8f0',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                      >
                        <td style={{ padding: '12px 10px', textAlign: 'center', fontWeight: '600' }}>
                          {index + 1}
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          <div style={{ fontWeight: '700', color: '#0c4a6e' }}>
                            {ship.buque}
                          </div>
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          {ship.bandera}
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'center', fontFamily: 'monospace' }}>
                          {ship.imo}
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          {ship.eslora.toFixed(2)}
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          {ship.manga.toFixed(2)}
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          {ship.puntal.toFixed(2)}
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'center', fontWeight: '700', color: classColor }}>
                          {ship.calado.toFixed(2)}
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            background: classColor,
                            color: 'white',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: '700'
                          }}>
                            {shipClass}
                          </span>
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          {ship.agencia}
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button
                              onClick={() => handleEdit(ship)}
                              style={{
                                padding: '6px 12px',
                                background: '#dbeafe',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#1e40af',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Edit size={14} /> Editar
                            </button>
                            <button
                              onClick={() => handleDelete(ship.id)}
                              style={{
                                padding: '6px 12px',
                                background: '#fee2e2',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#dc2626',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Trash2 size={14} /> Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}




