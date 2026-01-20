import React, { useState, useEffect } from 'react';
import { Ship, Database, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { 
  Ship as ShipType, 
  loadShips, 
  saveShips, 
  addShip, 
  updateShip, 
  deleteShip,
  getShipClass 
} from '../lib/ships';

interface ShipManagementProps {
  onUpdate?: () => void;
}

export function ShipManagement({ onUpdate }: ShipManagementProps) {
  const [ships, setShips] = useState<ShipType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [editingShip, setEditingShip] = useState<ShipType | null>(null);

  // Form state
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
    loadData();
  }, []);

  const loadData = () => {
    const loadedShips = loadShips();
    setShips(loadedShips);
  };

  const filteredShips = ships.filter(ship => {
    const matchesSearch = ship.buque.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ship.agencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ship.imo.toLowerCase().includes(searchTerm.toLowerCase());
    const shipClass = getShipClass(ship.calado);
    const matchesClass = !filterClass || shipClass === filterClass;
    return matchesSearch && matchesClass;
  });

  const classCount = {
    A: ships.filter(s => getShipClass(s.calado) === 'A').length,
    B: ships.filter(s => getShipClass(s.calado) === 'B').length,
    C: ships.filter(s => getShipClass(s.calado) === 'C').length
  };

  const handleOpenForm = (ship?: ShipType) => {
    if (ship) {
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
    } else {
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
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const shipData: Omit<ShipType, 'id'> = {
      buque: formData.buque.trim(),
      bandera: formData.bandera.trim(),
      imo: formData.imo.trim(),
      eslora: parseFloat(formData.eslora),
      manga: parseFloat(formData.manga),
      puntal: parseFloat(formData.puntal),
      calado: parseFloat(formData.calado),
      agencia: formData.agencia.trim()
    };

    if (editingShip) {
      updateShip(editingShip.id, shipData);
    } else {
      addShip(shipData);
    }

    loadData();
    if (onUpdate) onUpdate();
    handleCloseForm();
  };

  const handleDelete = (shipId: string) => {
    if (confirm('¿Está seguro de eliminar este buque?')) {
      deleteShip(shipId);
      loadData();
      if (onUpdate) onUpdate();
    }
  };

  return (
    <div>
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
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Database size={32} color="#60a5fa" />
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: '0 0 5px 0' }}>
                BASE DE DATOS DE BUQUES
              </h1>
              <p style={{ color: '#93c5fd', fontSize: '14px', margin: 0 }}>
                {ships.length} buques registrados en el sistema
              </p>
            </div>
          </div>
          <button
            onClick={() => handleOpenForm()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: '#3b82f6',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2563eb';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Plus size={18} />
            Agregar Buque
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'rgba(96, 165, 250, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(96, 165, 250, 0.3)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Ship size={24} color="#60a5fa" />
            <div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#60a5fa' }}>
                {ships.length}
              </div>
              <div style={{ color: '#93c5fd', fontSize: '13px', fontWeight: '500' }}>
                Total Buques
              </div>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              background: 'rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#f87171',
              fontSize: '14px'
            }}>A</div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f87171' }}>
                {classCount.A}
              </div>
              <div style={{ color: '#fca5a5', fontSize: '13px', fontWeight: '500' }}>
                Clase A (≥8.84m)
              </div>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              background: 'rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#fbbf24',
              fontSize: '14px'
            }}>B</div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fbbf24' }}>
                {classCount.B}
              </div>
              <div style={{ color: '#fcd34d', fontSize: '13px', fontWeight: '500' }}>
                Clase B (7.32-8.83m)
              </div>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              background: 'rgba(34, 197, 94, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#4ade80',
              fontSize: '14px'
            }}>C</div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4ade80' }}>
                {classCount.C}
              </div>
              <div style={{ color: '#86efac', fontSize: '13px', fontWeight: '500' }}>
                Clase C (≤7.32m)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '15px' }}>
          <input
            type="text"
            placeholder="🔍 Buscar por nombre de buque, IMO o agencia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 15px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px'
            }}
          />
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            style={{
              padding: '12px 15px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              minWidth: '150px'
            }}
          >
            <option value="" style={{ background: '#1e3a8a' }}>Todas las Clases</option>
            <option value="A" style={{ background: '#1e3a8a' }}>Clase A</option>
            <option value="B" style={{ background: '#1e3a8a' }}>Clase B</option>
            <option value="C" style={{ background: '#1e3a8a' }}>Clase C</option>
          </select>
        </div>
        <div style={{ color: '#93c5fd', fontSize: '13px', marginTop: '10px' }}>
          Mostrando {filteredShips.length} de {ships.length} buques
        </div>
      </div>

      {/* Ships Table */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflowX: 'auto'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'rgba(96, 165, 250, 0.1)', borderBottom: '2px solid rgba(96, 165, 250, 0.3)' }}>
              <th style={{ padding: '12px 10px', textAlign: 'left', color: '#60a5fa', fontWeight: 'bold' }}>Buque</th>
              <th style={{ padding: '12px 10px', textAlign: 'center', color: '#60a5fa', fontWeight: 'bold' }}>Clase</th>
              <th style={{ padding: '12px 10px', textAlign: 'left', color: '#60a5fa', fontWeight: 'bold' }}>Bandera</th>
              <th style={{ padding: '12px 10px', textAlign: 'center', color: '#60a5fa', fontWeight: 'bold' }}>IMO</th>
              <th style={{ padding: '12px 10px', textAlign: 'center', color: '#60a5fa', fontWeight: 'bold' }}>Eslora</th>
              <th style={{ padding: '12px 10px', textAlign: 'center', color: '#60a5fa', fontWeight: 'bold' }}>Manga</th>
              <th style={{ padding: '12px 10px', textAlign: 'center', color: '#60a5fa', fontWeight: 'bold' }}>Calado</th>
              <th style={{ padding: '12px 10px', textAlign: 'left', color: '#60a5fa', fontWeight: 'bold' }}>Agencia</th>
              <th style={{ padding: '12px 10px', textAlign: 'center', color: '#60a5fa', fontWeight: 'bold' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredShips.map((ship) => {
              const shipClass = getShipClass(ship.calado);
              const classColor = shipClass === 'A' ? '#f87171' : shipClass === 'B' ? '#fbbf24' : '#4ade80';
              const classBg = shipClass === 'A' ? 'rgba(239, 68, 68, 0.2)' : shipClass === 'B' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(34, 197, 94, 0.2)';
              
              return (
                <tr
                  key={ship.id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <td style={{ padding: '12px 10px', color: 'white', fontWeight: '500' }}>
                    {ship.buque}
                  </td>
                  <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                    <span style={{
                      background: classBg,
                      color: classColor,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }}>
                      {shipClass}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#93c5fd' }}>{ship.bandera}</td>
                  <td style={{ padding: '12px 10px', textAlign: 'center', color: '#93c5fd', fontFamily: 'monospace' }}>{ship.imo}</td>
                  <td style={{ padding: '12px 10px', textAlign: 'center', color: 'white' }}>{ship.eslora}m</td>
                  <td style={{ padding: '12px 10px', textAlign: 'center', color: 'white' }}>{ship.manga}m</td>
                  <td style={{ padding: '12px 10px', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
                    {ship.calado}m
                  </td>
                  <td style={{ padding: '12px 10px', color: '#93c5fd' }}>{ship.agencia}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => handleOpenForm(ship)}
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(59, 130, 246, 0.2)',
                          border: '1px solid rgba(59, 130, 246, 0.5)',
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
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                        }}
                      >
                        <Edit2 size={14} />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(ship.id)}
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(239, 68, 68, 0.2)',
                          border: '1px solid rgba(239, 68, 68, 0.5)',
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

        {filteredShips.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#93c5fd' }}>
            No se encontraron buques que coincidan con los criterios de búsqueda
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: '16px',
            padding: '30px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                {editingShip ? 'Editar Buque' : 'Agregar Nuevo Buque'}
              </h2>
              <button
                onClick={handleCloseForm}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#93c5fd',
                  cursor: 'pointer',
                  padding: '8px'
                }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>
                    Nombre del Buque *
                  </label>
                  <input
                    type="text"
                    value={formData.buque}
                    onChange={(e) => setFormData({ ...formData, buque: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>
                      Bandera *
                    </label>
                    <input
                      type="text"
                      value={formData.bandera}
                      onChange={(e) => setFormData({ ...formData, bandera: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>
                      IMO *
                    </label>
                    <input
                      type="text"
                      value={formData.imo}
                      onChange={(e) => setFormData({ ...formData, imo: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>
                      Eslora (m) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.eslora}
                      onChange={(e) => setFormData({ ...formData, eslora: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>
                      Manga (m) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.manga}
                      onChange={(e) => setFormData({ ...formData, manga: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>
                      Puntal (m) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.puntal}
                      onChange={(e) => setFormData({ ...formData, puntal: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>
                    Calado (m) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.calado}
                    onChange={(e) => setFormData({ ...formData, calado: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                  {formData.calado && (
                    <div style={{ marginTop: '6px', fontSize: '12px' }}>
                      <span style={{
                        color: getShipClass(parseFloat(formData.calado)) === 'A' ? '#f87171' :
                               getShipClass(parseFloat(formData.calado)) === 'B' ? '#fbbf24' : '#4ade80',
                        fontWeight: 'bold'
                      }}>
                        Clase {getShipClass(parseFloat(formData.calado))}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', color: '#93c5fd', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>
                    Agencia Marítima *
                  </label>
                  <input
                    type="text"
                    value={formData.agencia}
                    onChange={(e) => setFormData({ ...formData, agencia: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    background: '#3b82f6',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#3b82f6';
                  }}
                >
                  <Save size={18} />
                  {editingShip ? 'Guardar Cambios' : 'Agregar Buque'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#93c5fd',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
