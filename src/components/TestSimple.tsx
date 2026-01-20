import React from 'react';

export function TestSimple() {
  return (
    <div style={{
      padding: '50px',
      textAlign: 'center',
      background: '#e3f2fd',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '32px', color: '#1976d2' }}>
        ✅ React está funcionando
      </h1>
      <p style={{ fontSize: '18px', marginTop: '20px' }}>
        Si ves este mensaje, el componente React se cargó correctamente.
      </p>
    </div>
  );
}
