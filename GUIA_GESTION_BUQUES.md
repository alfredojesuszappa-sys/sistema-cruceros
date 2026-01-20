# Guía de Uso: Sistema de Gestión de Buques

## 🚢 Introducción

El sistema de gestión de buques permite administrar la base de datos de embarcaciones que navegan por el Canal Punta Indio. Esta herramienta es esencial para mantener información actualizada y precisa sobre cada buque.

## 📍 Acceso al Sistema

1. En la página principal, ubique el **Toolbar** (barra de herramientas) debajo del título
2. Haga clic en el botón **"⚙ Gestión de Buques"** (color azul)
3. Se abrirá una ventana emergente con el sistema completo

## 🔍 Buscar Buques

### Barra de Búsqueda
- Ubicada en la parte superior de la ventana
- Escribe cualquier texto para filtrar en tiempo real
- Busca en: Nombre del buque, código IMO, agencia marítima
- Los resultados se actualizan automáticamente mientras escribes

**Ejemplo:**
```
Búsqueda: "MSC"
Resultado: Muestra todos los buques que contengan "MSC" en su nombre o agencia
```

## 📊 Estadísticas

Cuatro tarjetas muestran información clave:

| Tarjeta | Descripción | Color |
|---------|-------------|-------|
| **Total Buques** | Cantidad total de buques en la BD | Azul |
| **Clase A** | Buques con calado ≥ 8.84m | Rojo |
| **Clase B** | Buques con calado 7.33m - 8.83m | Ámbar |
| **Clase C** | Buques con calado ≤ 7.32m | Verde |

## ➕ Agregar Nuevo Buque

### Pasos:
1. Clic en el botón **"+ Agregar Buque"** (esquina superior derecha)
2. Complete el formulario:

### Campos del Formulario:

| Campo | Obligatorio | Descripción | Ejemplo |
|-------|-------------|-------------|---------|
| **Nombre del Buque** | ✅ Sí | Nombre completo de la embarcación | MSC SEAVIEW |
| **Bandera** | ❌ No | País de registro | PANAMA |
| **Código IMO** | ❌ No | Identificador internacional | IMO9755251 |
| **Calado** | ✅ Sí | Profundidad en metros (determina clase) | 8.90 |
| **Eslora** | ❌ No | Longitud total en metros | 323.60 |
| **Manga** | ❌ No | Ancho máximo en metros | 41.00 |
| **Puntal** | ❌ No | Altura desde quilla a cubierta | 20.50 |
| **Agencia Marítima** | ❌ No | Empresa representante | MSC ARGENTINA S.A. |

### Clasificación Automática:
- El sistema clasifica automáticamente según el **calado** ingresado
- Visualización en tiempo real de la clase asignada
- Información de ayuda sobre cada clase

### Validaciones:
- ✅ Nombre del buque no puede estar vacío
- ✅ Calado debe ser un número válido mayor a 0
- ⚠️ Advertencia si falta información recomendada

3. Clic en **"Agregar Buque"**
4. El nuevo buque aparece inmediatamente en la tabla

## ✏️ Editar Buque Existente

### Pasos:
1. Localice el buque en la tabla (use búsqueda si es necesario)
2. Clic en el botón **✏️ (lápiz)** en la columna "Acciones"
3. Se abre el formulario pre-rellenado con datos actuales
4. Modifique los campos necesarios
5. Clic en **"Guardar Cambios"**

### Notas Importantes:
- ⚠️ Si modifica el **calado**, la clasificación se actualiza automáticamente
- ⚠️ Los cambios afectan SOLO al registro del buque, NO a cruceros ya creados
- ✅ Todos los cambios se guardan automáticamente en localStorage

## 🗑️ Eliminar Buque

### Pasos:
1. Localice el buque en la tabla
2. Clic en el botón **🗑️ (basura)** en la columna "Acciones"
3. **IMPORTANTE:** Aparece un mensaje de confirmación
4. Confirme la eliminación

### ⚠️ ADVERTENCIAS:
- Esta acción es **PERMANENTE** y **NO SE PUEDE DESHACER**
- Verifique que no haya cruceros activos programados con este buque
- Si hay cruceros asociados, considere primero cancelarlos o eliminarlos

### Recomendación:
Antes de eliminar un buque:
1. Busque si tiene cruceros asociados (en la tabla principal)
2. Cancele o elimine esos cruceros primero
3. Luego elimine el buque

## 📋 Tabla de Buques

### Columnas:

| Columna | Descripción | Ordenamiento |
|---------|-------------|--------------|
| **Buque** | Nombre de la embarcación | Alfabético |
| **Bandera** | País de registro | - |
| **IMO** | Código identificador internacional | - |
| **Eslora** | Longitud en metros | Numérico |
| **Calado** | Profundidad en metros (en negrita) | Numérico |
| **Clase** | Clasificación A/B/C (badge con color) | - |
| **Agencia** | Empresa representante | - |
| **Acciones** | Botones Editar / Eliminar | - |

### Visualización:
- **Clase A:** Badge rojo (buques grandes, requieren mayor precaución)
- **Clase B:** Badge ámbar (buques medianos)
- **Clase C:** Badge verde (buques más pequeños)

## 💾 Persistencia de Datos

### Almacenamiento:
- Todos los datos se guardan automáticamente en **localStorage** del navegador
- Los cambios son inmediatos y permanentes (hasta que se limpie el cache)

### Respaldo:
Para respaldar su base de datos:
1. Cierre la ventana de gestión de buques
2. En la barra principal, use **"Exportar JSON"**
3. Guarde el archivo en lugar seguro

### Restauración:
Para restaurar datos desde respaldo:
1. Use el botón **"Importar"** en la barra principal
2. Seleccione el archivo JSON de respaldo
3. Confirme la importación

## 🎯 Casos de Uso Comunes

### 1. Agregar un nuevo buque que operará regularmente
```
Escenario: Llega un buque nuevo al puerto
Acción:
  1. Clic en "Gestión de Buques"
  2. Clic en "+ Agregar Buque"
  3. Complete todos los datos disponibles
  4. Guarde el registro
  5. Ahora podrá seleccionarlo al crear cruceros
```

### 2. Actualizar datos de un buque existente
```
Escenario: Un buque modificó su calado tras obras
Acción:
  1. Busque el buque por nombre
  2. Clic en ✏️ Editar
  3. Actualice el campo "Calado"
  4. Observe cómo la clase se actualiza automáticamente
  5. Guarde los cambios
```

### 3. Eliminar un buque que ya no opera
```
Escenario: Un buque fue dado de baja
Acción:
  1. Verifique que no tenga cruceros activos programados
  2. Busque el buque en la gestión
  3. Clic en 🗑️ Eliminar
  4. Confirme la eliminación
```

### 4. Buscar buques de una agencia específica
```
Escenario: Necesita ver todos los buques de MSC
Acción:
  1. En el campo de búsqueda, escriba "MSC"
  2. Vea todos los resultados filtrados
  3. Exporte o imprima si es necesario
```

## ⚙️ Configuración de Clases

### Importancia de la Clasificación:
La clase del buque (determinada por el calado) define:
- **Punto de inicio de navegación** en el canal
- **Tiempo estimado** de llegada al KM 118.5
- **Restricciones de navegación**

### Rangos de Clasificación:

```
┌─────────────────────────────────────────────────┐
│  CLASE A (Rojo)                                 │
│  • Calado: ≥ 8.84 metros                        │
│  • Inicio: KM 239.100                           │
│  • Tiempo al KM 118.5: 4:40 horas              │
│  • Tiempo total entrada: ~11:10 horas          │
│  • Mayor precaución requerida                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  CLASE B (Ámbar)                                │
│  • Calado: 7.33 a 8.83 metros                   │
│  • Inicio: KM 216                               │
│  • Tiempo al KM 118.5: 4:10 horas              │
│  • Tiempo total entrada: ~10:40 horas          │
│  • Precaución moderada                          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  CLASE C (Verde)                                │
│  • Calado: ≤ 7.32 metros                        │
│  • Inicio: KM 59                                │
│  • Tiempo al KM 118.5: 2:30 horas              │
│  • Tiempo total entrada: ~4:00 horas           │
│  • Menor restricción                            │
└─────────────────────────────────────────────────┘
```

## 🔧 Solución de Problemas

### Problema: No aparecen buques en la tabla
**Solución:**
- Verifique que no haya filtro activo en la búsqueda
- Limpie el campo de búsqueda
- Si persiste, verifique que haya buques en la base de datos

### Problema: No puedo eliminar un buque
**Solución:**
- Verifique que no tenga cruceros activos asociados
- Cancele o elimine primero esos cruceros
- Intente nuevamente

### Problema: La clasificación no coincide
**Solución:**
- Verifique el valor del calado ingresado
- Use punto (.) como separador decimal (ej: 8.90)
- Consulte la tabla de rangos de clasificación

### Problema: Los datos no se guardan
**Solución:**
- Verifique que el navegador permita localStorage
- No use modo incógnito/privado
- Limpie caché y recargue la página

## 📞 Soporte

Para dudas o problemas:
1. Consulte esta guía completa
2. Revise la documentación técnica (README_TECNICO.md)
3. Contacte al administrador del sistema

---

## 🎓 Mejores Prácticas

### ✅ Recomendaciones:

1. **Mantenga datos actualizados**
   - Revise periódicamente la información de cada buque
   - Actualice cambios de agencia o características técnicas

2. **Use nombres completos**
   - Facilita búsqueda y evita confusiones
   - Ejemplo: "MSC SEAVIEW" mejor que "SEAVIEW"

3. **Complete todos los campos**
   - Aunque no sean obligatorios, ayudan en reportes
   - Información completa = mejor gestión

4. **Respalde regularmente**
   - Exporte la base de datos semanalmente
   - Guarde respaldos en múltiples ubicaciones

5. **Verifique antes de eliminar**
   - Doble verificación antes de borrar registros
   - Considere cancelar en lugar de eliminar

### ❌ Evite:

1. **NO use comas en decimales**
   - ❌ Incorrecto: 8,90
   - ✅ Correcto: 8.90

2. **NO elimine sin verificar**
   - Verifique cruceros asociados primero

3. **NO duplique buques**
   - Busque antes de agregar uno nuevo
   - Use la función de búsqueda

4. **NO deje campos críticos vacíos**
   - Nombre del buque y calado son esenciales

---

**Última actualización:** Enero 2026  
**Versión:** 2.0  
**Sistema:** Gestión de Cruceros Oceánicos - Canal Punta Indio
