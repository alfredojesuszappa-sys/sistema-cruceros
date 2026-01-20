# 🧪 CÓMO PROBAR EL SISTEMA - V3.0

## 🚀 INICIO RÁPIDO (2 minutos)

### 1️⃣ Iniciar el Sistema
```bash
npm run dev
```

Esperar mensaje:
```
🚀 astro  v5.13.5 started in XXXms

  ┃ Local    http://localhost:3000/
  ┃ Network  use --host to expose
```

### 2️⃣ Abrir en Navegador
```
http://localhost:3000
```

---

## ✅ PRUEBAS PASO A PASO

### TEST 1: Ver Cruceros de Prueba

**Objetivo:** Verificar que los 3 cruceros de ejemplo se cargaron correctamente

**Pasos:**
1. Abrir la aplicación
2. Esperar a que cargue (máx. 2 segundos)
3. Verificar que aparecen en la tabla:
   - MSC SEAVIEW (Clase A)
   - NORWEGIAN STAR (Clase B)
   - INSIGNIA (Clase C)

**Resultado esperado:**
```
✅ Se ven 3 filas en la tabla
✅ Cada buque tiene su información completa
✅ Las columnas muestran fechas y horarios
✅ Los estados son visibles (CONFIRMADO, SIN CONFIRMAR)
```

---

### TEST 2: Buscar Conflictos

**Objetivo:** Detectar el conflicto programado entre MSC SEAVIEW y NORWEGIAN STAR

**Pasos:**
1. Hacer clic en el botón "🔍 Buscar Conflictos" (amarillo)
2. Esperar 1 segundo
3. Ver el panel que aparece debajo

**Resultado esperado:**
```
✅ Aparece panel con fondo rojo
✅ Título: "⚠️ 1 Conflicto(s) Detectado(s)"
✅ Muestra:
   - Buque Entrante: MSC SEAVIEW
   - ETA KM 118.5: 29/01 14:40
   - Buque Saliente: NORWEGIAN STAR
   - ETD KM 118.5: 29/01 20:25
   - Diferencia: 345 minutos
✅ Aparecen 2 botones "Aplicar" con soluciones
```

**Captura del conflicto:**
```
🚨 Conflicto en KM 118.5

Buque Entrante: MSC SEAVIEW
→ ETA KM 118.5: 29/01 14:40

Buque Saliente: NORWEGIAN STAR
→ ETD KM 118.5: 29/01 20:25

Diferencia: 345 minutos

💡 Soluciones Propuestas:

1. ⏰ Retrasar Salida
   NORWEGIAN STAR → 29/01 15:30
   [Aplicar]

2. ⏰ Adelantar Entrada
   MSC SEAVIEW → 29/01 09:15
   [Aplicar]
```

---

### TEST 3: Aplicar Resolución

**Objetivo:** Resolver el conflicto aplicando una de las soluciones

**Pasos:**
1. Hacer clic en el botón "Aplicar" de la primera solución
2. Esperar alerta de confirmación: "✅ Resolución aplicada..."
3. Hacer clic en "OK"
4. Ver que la tabla se actualiza con el nuevo horario

**Resultado esperado:**
```
✅ Aparece alerta de confirmación
✅ La tabla se recarga automáticamente
✅ El horario de NORWEGIAN STAR cambió
✅ El panel de conflictos muestra "✅ Sin Conflictos"
```

---

### TEST 4: Verificar Botón de Reporte

**Objetivo:** Confirmar que el botón se habilita al resolver conflictos

**Estado inicial (CON conflictos):**
```
🔴 Botón "Generar Reporte A3" → Gris, deshabilitado, opacidad 60%
```

**Después de resolver (SIN conflictos):**
```
🟢 Botón "Generar Reporte A3" → Rosa, habilitado, opacidad 100%
```

**Pasos:**
1. Verificar que el botón está habilitado (rosa)
2. Hacer clic en "📄 Generar Reporte A3"
3. Se abre nueva ventana con el reporte
4. Se inicia auto-impresión

**Resultado esperado:**
```
✅ Nueva ventana se abre
✅ Muestra tabla HTML con todos los cruceros
✅ Formato A3 horizontal
✅ Diálogo de impresión aparece
```

---

### TEST 5: Agregar Nuevo Crucero

**Objetivo:** Crear un nuevo crucero manualmente

**Datos de prueba:**
- Buque: COSTA FAVOLOSA
- Fecha Entrada: 05/02/2026
- Hora Entrada: 08:00
- Fecha Salida: 07/02/2026
- Hora Salida: 18:00
- Estado: SIN CONFIRMAR

**Pasos:**
1. Seleccionar "COSTA FAVOLOSA" del dropdown
2. Ingresar fecha entrada: `2026-02-05`
3. Ingresar hora entrada: `08:00`
4. Ingresar fecha salida: `2026-02-07`
5. Ingresar hora salida: `18:00`
6. Seleccionar "SIN CONFIRMAR"
7. Hacer clic en "➕ Agregar Crucero"

**Resultado esperado:**
```
✅ Alerta: "✅ Crucero agregado exitosamente"
✅ Aparece en la tabla como fila #4
✅ Clase automática: B (calado 8.30)
✅ Todos los tiempos calculados
✅ Formulario se limpia
```

---

### TEST 6: Columnas KM 59 (Clase C)

**Objetivo:** Verificar que las columnas especiales para Clase C funcionan

**Pasos:**
1. Buscar en la tabla el buque INSIGNIA (Clase C)
2. Verificar columna "ETA Km. 59 (C)"
3. Verificar columna "ETD Km. 59 (C)"

**Resultado esperado:**
```
✅ INSIGNIA muestra horarios en ambas columnas KM 59
✅ MSC SEAVIEW (Clase A) muestra "—" en columnas KM 59
✅ NORWEGIAN STAR (Clase B) muestra "—" en columnas KM 59
```

**Detalle INSIGNIA:**
```
ETA Km. 59 (C):  30/01/26 06:00  ← ✅ Tiene horario
ETD Km. 59 (C):  01/02/26 13:20  ← ✅ Tiene horario
```

**Detalle MSC SEAVIEW:**
```
ETA Km. 59 (C):  —  ← ✅ Sin horario (Clase A)
ETD Km. 59 (C):  —  ← ✅ Sin horario (Clase A)
```

---

### TEST 7: Exportar Datos

**Objetivo:** Exportar todos los datos en JSON

**Pasos:**
1. Hacer clic en "💾 Exportar Datos" (verde)
2. Esperar descarga automática
3. Verificar archivo descargado: `cruceros-YYYY-MM-DD.json`

**Resultado esperado:**
```
✅ Archivo descargado automáticamente
✅ Nombre: cruceros-2026-01-15.json
✅ Contenido JSON válido
✅ Incluye:
   - 75 buques
   - 4 cruceros (3 de ejemplo + 1 agregado)
   - Fecha de exportación
```

---

### TEST 8: Cambiar Estado de Crucero

**Objetivo:** Cambiar el estado de un crucero

**Pasos:**
1. Buscar el crucero INSIGNIA (fila #3)
2. En la columna "Estado", abrir el dropdown
3. Cambiar de "SIN CONFIRMAR" a "CONFIRMADO"

**Resultado esperado:**
```
✅ Estado cambia visualmente
✅ Color cambia de amarillo a verde
✅ Icono cambia de ⏳ a ✓
✅ Cambio se guarda en localStorage
```

---

### TEST 9: Eliminar Crucero

**Objetivo:** Eliminar un crucero de la planilla

**Pasos:**
1. Buscar cualquier crucero (ej: COSTA FAVOLOSA)
2. En la columna "Acciones", hacer clic en "Eliminar"
3. Confirmar en el diálogo
4. Verificar que desaparece de la tabla

**Resultado esperado:**
```
✅ Aparece confirmación: "¿Está seguro de eliminar este crucero?"
✅ Al confirmar, la fila desaparece
✅ Los números (N°) se recalculan
✅ Cambio se guarda en localStorage
```

---

### TEST 10: Responsive Design

**Objetivo:** Verificar que funciona en diferentes tamaños

**Pasos:**
1. Abrir DevTools (F12)
2. Activar modo responsive (Ctrl+Shift+M)
3. Probar en:
   - Mobile (375px): iPhone
   - Tablet (768px): iPad
   - Desktop (1920px): Monitor

**Resultado esperado:**
```
✅ Mobile:
   - Botones en columna vertical
   - Tabla con scroll horizontal
   - Formulario en 1 columna

✅ Tablet:
   - Botones en 2 filas
   - Tabla visible completa
   - Formulario en 2-3 columnas

✅ Desktop:
   - Botones en 1 fila
   - Tabla completa visible
   - Formulario en 6 columnas
```

---

## 🎨 PRUEBAS VISUALES

### TEST 11: Efectos Glassmorphism

**Objetivo:** Verificar efectos de vidrio en tarjetas

**Dónde buscar:**
- Panel de conflictos
- Formulario de agregar crucero
- Tarjeta de la tabla

**Qué verificar:**
```
✅ Fondo semi-transparente
✅ Efecto blur (desenfoque)
✅ Borde sutil blanco
✅ Sombra suave
```

---

### TEST 12: Efectos Neumorphism en Botones

**Objetivo:** Verificar estilos de botones con relieve

**Botones a verificar:**
1. 🟡 Buscar Conflictos (Amarillo)
2. 🔵 Importar Excel (Azul)
3. 🟢 Exportar Datos (Verde)
4. 🌸 Generar Reporte A3 (Rosa)

**Qué verificar:**
```
✅ Gradiente de 2 colores
✅ Sombras dobles (interna y externa)
✅ Bordes redondeados (16px)
✅ Hover: Elevación con translateY(-2px)
```

---

### TEST 13: Colores por Categoría

**Objetivo:** Verificar colores de las clases

**Clases de buques:**
```
🔴 Clase A: Rojo (#ef4444)
   Ejemplo: MSC SEAVIEW

🟠 Clase B: Ámbar (#f59e0b)
   Ejemplo: NORWEGIAN STAR

🟢 Clase C: Verde (#22c55e)
   Ejemplo: INSIGNIA
```

**Columnas especiales:**
```
🟢 ETA KM 118.5: Fondo verde claro
🔴 ETD KM 118.5: Fondo rojo claro
```

---

## 🐛 PRUEBAS DE ERROR

### TEST 14: Agregar Crucero Incompleto

**Objetivo:** Verificar validación de formulario

**Pasos:**
1. Dejar campos vacíos en el formulario
2. Hacer clic en "Agregar Crucero"

**Resultado esperado:**
```
✅ Alerta: "⚠️ Por favor complete todos los campos"
✅ NO se agrega el crucero
✅ Formulario no se limpia
```

---

### TEST 15: Generar Reporte con Conflictos

**Objetivo:** Verificar que el botón está bloqueado

**Pasos:**
1. Agregar un crucero que genere conflicto
2. Hacer clic en "Buscar Conflictos"
3. Verificar que hay conflictos
4. Intentar hacer clic en "Generar Reporte A3"

**Resultado esperado:**
```
✅ Botón está gris (deshabilitado)
✅ Cursor: not-allowed
✅ No pasa nada al hacer clic
✅ Alerta al intentar: "⚠️ Hay conflictos sin resolver..."
```

---

## 📊 CHECKLIST COMPLETO

```
Funcionalidades Básicas:
[ ] Ver 3 cruceros de prueba
[ ] Agregar nuevo crucero
[ ] Editar estado de crucero
[ ] Eliminar crucero
[ ] Ver detalles de buque

Detección de Conflictos:
[ ] Buscar conflictos (botón amarillo)
[ ] Ver panel de conflictos
[ ] Ver 2 propuestas de solución
[ ] Aplicar resolución
[ ] Verificar que se resuelve

Columnas Especiales:
[ ] Ver columna ETA KM 59 (C)
[ ] Ver columna ETD KM 59 (C)
[ ] Verificar que solo Clase C tiene datos
[ ] Verificar colores de fondo

Reportes:
[ ] Botón deshabilitado con conflictos
[ ] Botón habilitado sin conflictos
[ ] Generar reporte A3
[ ] Verificar formato impresión

Importación/Exportación:
[ ] Exportar datos JSON
[ ] Verificar contenido JSON
[ ] (Importar Excel - preparar archivo)

Diseño:
[ ] Efectos glassmorphism
[ ] Botones neumorphism
[ ] Hover 3D en tarjetas
[ ] Colores por categoría
[ ] Responsive mobile
[ ] Responsive tablet
[ ] Responsive desktop

Validaciones:
[ ] Formulario incompleto
[ ] Reporte bloqueado con conflictos
[ ] Estados visuales correctos
```

---

## 🎯 RESULTADO ESPERADO FINAL

### ✅ Todo Funciona Correctamente

Si todas las pruebas pasan:
```
✅ 3 cruceros de ejemplo visibles
✅ Conflicto detectado entre MSC SEAVIEW y NORWEGIAN STAR
✅ Resolución aplicada correctamente
✅ Botón de reporte se habilita
✅ Reporte A3 se genera
✅ Columnas KM 59 solo para Clase C
✅ Todos los botones funcionan
✅ Diseño responsive correcto
✅ Efectos visuales aplicados
✅ Validaciones funcionan
```

---

## 📞 ¿PROBLEMAS?

### Si algo no funciona:

1. **Limpiar localStorage**
   ```javascript
   // En consola del navegador (F12):
   localStorage.clear()
   location.reload()
   ```

2. **Recompilar**
   ```bash
   # Detener servidor (Ctrl+C)
   npm run build
   npm run dev
   ```

3. **Verificar consola**
   - F12 → Console
   - Buscar errores en rojo
   - Copiar mensaje de error

4. **Revisar documentación**
   - DIAGNOSTICO_PANTALLA_BLANCA.md
   - COMO_PROBAR_VALIDACION.md

---

## 🎉 ¡LISTO PARA PROBAR!

**Tiempo estimado de prueba completa:** 30 minutos

**Pruebas esenciales (5 minutos):**
- TEST 1: Ver cruceros
- TEST 2: Buscar conflictos
- TEST 3: Aplicar resolución
- TEST 4: Verificar reporte

**¡Buena suerte con las pruebas! 🚢⚓**
