import React from 'react';

export function TestComponent() {
  console.log('🧪 TestComponent is rendering');
  
  return (
    <div style={{
      minHeight: '80vh',
      background: 'white',
      borderRadius: '16px',
      padding: '40px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#1e3a8a' }}>
        🚢 Sistema de Cruceros
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '20px', color: '#475569' }}>
        Este componente está funcionando correctamente.
      </p>
      <div style={{
        background: '#f0f9ff',
        border: '2px solid #3b82f6',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h2 style={{ color: '#1e40af', marginBottom: '10px' }}>✅ Test Exitoso</h2>
        <p style={{ color: '#1e40af' }}>
          Si puedes ver este mensaje, el componente se está renderizando correctamente.
        </p>
      </div>
    </div>
  );
}
