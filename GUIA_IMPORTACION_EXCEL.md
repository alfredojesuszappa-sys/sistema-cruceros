# 📥 GUÍA DE IMPORTACIÓN DE DATOS DESDE EXCEL

## 🎯 Objetivo
Esta guía te ayudará a importar datos de cruceros desde un archivo Excel al sistema de gestión.

---

## 🛠️ MÉTODO 1: Conversión Online (Recomendado)

### Paso 1: Prepara tu archivo Excel
Sigue el formato descrito en `FORMATO_EXCEL_CRUCEROS.md`

### Paso 2: Convierte a CSV
1. Abre tu archivo Excel
2. Ve a **Archivo → Guardar como**
3. Selecciona formato **CSV (delimitado por comas) (*.csv)**
4. Guarda el archivo

### Paso 3: Convierte CSV a JSON
Usa una de estas herramientas online:

**Opción A: ConvertCSV**
- URL: https://www.convertcsv.com/csv-to-json.htm
- Sube tu archivo CSV
- Selecciona "CSV to JSON Array"
- Click en "Convert"
- Copia el resultado

**Opción B: BeautifyTools**
- URL: https://beautifytools.com/csv-to-json-converter.php
- Pega el contenido de tu CSV
- Click en "CSV to JSON"
- Copia el resultado

### Paso 4: Ajusta el formato JSON
El JSON debe tener esta estructura:

```json
[
  {
    "BUQUE": "COSTA FORTUNA",
    "DIA_ENTRADA": "2026-01-20",
    "HORA_ENTRADA": "08:00",
    "DIA_SALIDA": "2026-01-22",
    "HORA_SALIDA": "10:00",
    "FM": "MONTEVIDEO",
    "TO": "BUENOS AIRES",
    "SITUACION": "CONFIRMADO",
    "NOTAS": "Primera entrada del mes"
  }
]
```

### Paso 5: Guarda el JSON
1. Copia el JSON generado
2. Abre un editor de texto (Notepad++, VSCode, etc.)
3. Pega el contenido
4. Guarda como `cruceros.json`

---

## 🔧 MÉTODO 2: Script de Python (Para usuarios avanzados)

Si tienes Python instalado, puedes usar este script:

### Instalar dependencias
```bash
pip install pandas openpyxl
```

### Script: excel_to_json.py
```python
import pandas as pd
import json
import sys

def excel_to_json(excel_file, json_file):
    try:
        # Leer archivo Excel
        df = pd.read_excel(excel_file)
        
        # Convertir fechas a string formato ISO
        date_columns = ['DIA_ENTRADA', 'DIA_SALIDA']
        for col in date_columns:
            if col in df.columns:
                df[col] = pd.to_datetime(df[col]).dt.strftime('%Y-%m-%d')
        
        # Convertir a JSON
        json_data = df.to_json(orient='records', indent=2)
        
        # Guardar archivo
        with open(json_file, 'w', encoding='utf-8') as f:
            f.write(json_data)
        
        print(f"✅ Conversión exitosa!")
        print(f"📁 Archivo guardado en: {json_file}")
        return True
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python excel_to_json.py archivo.xlsx [salida.json]")
        sys.exit(1)
    
    excel_file = sys.argv[1]
    json_file = sys.argv[2] if len(sys.argv) > 2 else "cruceros.json"
    
    excel_to_json(excel_file, json_file)
```

### Uso del script
```bash
python excel_to_json.py cruceros_2026-01-15.xlsx cruceros.json
```

---

## 📤 MÉTODO 3: Importar directamente al navegador

Una vez que tengas el archivo JSON, puedes importarlo al sistema:

### Paso 1: Abre la Consola del Navegador
1. Abre la aplicación en el navegador
2. Presiona **F12** (o click derecho → Inspeccionar)
3. Ve a la pestaña **Console**

### Paso 2: Carga el JSON
Pega este código en la consola:

```javascript
// JSON de ejemplo - reemplaza con tus datos
const cruceros = [
  {
    "BUQUE": "COSTA FORTUNA",
    "DIA_ENTRADA": "2026-01-20",
    "HORA_ENTRADA": "08:00",
    "DIA_SALIDA": "2026-01-22",
    "HORA_SALIDA": "10:00",
    "FM": "MONTEVIDEO",
    "TO": "BUENOS AIRES",
    "SITUACION": "CONFIRMADO",
    "NOTAS": ""
  }
];

// Función para procesar e importar
function importarCruceros(data) {
  // Cargar buques de la base de datos
  const ships = JSON.parse(localStorage.getItem('ships') || '[]');
  const shipMap = {};
  ships.forEach(ship => {
    shipMap[ship.buque] = ship;
  });
  
  // Cargar cruceros existentes
  const existingCrossings = JSON.parse(localStorage.getItem('crossings') || '[]');
  let crossingNumber = existingCrossings.length;
  
  const newCrossings = [];
  const errors = [];
  
  data.forEach((row, index) => {
    try {
      // Validar que el buque existe
      if (!shipMap[row.BUQUE]) {
        errors.push(`Fila ${index + 2}: Buque "${row.BUQUE}" no encontrado en la base de datos`);
        return;
      }
      
      const ship = shipMap[row.BUQUE];
      
      // Crear fecha y hora de entrada
      const entryDateTime = new Date(`${row.DIA_ENTRADA}T${row.HORA_ENTRADA}:00`);
      if (isNaN(entryDateTime.getTime())) {
        errors.push(`Fila ${index + 2}: Fecha/hora de entrada inválida`);
        return;
      }
      
      // Crear fecha y hora de salida
      const exitDateTime = new Date(`${row.DIA_SALIDA}T${row.HORA_SALIDA}:00`);
      if (isNaN(exitDateTime.getTime())) {
        errors.push(`Fila ${index + 2}: Fecha/hora de salida inválida`);
        return;
      }
      
      // Calcular tiempos de navegación según clase
      const shipClass = ship.calado >= 8.84 ? 'A' : ship.calado > 7.32 ? 'B' : 'C';
      
      // Tiempos de entrada a KM 118.5
      const entryToKm118 = {
        'A': 4 * 60 + 40, // 4:40:00 en minutos
        'B': 4 * 60 + 10, // 4:10:00
        'C': 2 * 60 + 30  // 2:30:00
      };
      
      // Tiempos de salida desde KM 118.5
      const exitFromKm118 = {
        'A': 5 * 60,      // 5:00:00 en minutos
        'B': 4 * 60 + 30, // 4:30:00
        'C': 1 * 60 + 45  // 1:45:00
      };
      
      // Calcular ETA y ETD para KM 118.5
      const etaKm118 = new Date(entryDateTime.getTime() + entryToKm118[shipClass] * 60000);
      const etdKm118 = new Date(exitDateTime.getTime() + exitFromKm118[shipClass] * 60000);
      
      // Crear el crossing
      const crossing = {
        id: `crossing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        numero: ++crossingNumber,
        buque: row.BUQUE,
        imo: ship.imo,
        eslora: ship.eslora,
        manga: ship.manga,
        calado: ship.calado,
        clase: shipClass,
        agencia: ship.agencia,
        entryDateTime: entryDateTime.toISOString(),
        exitDateTime: exitDateTime.toISOString(),
        fm: row.FM || '',
        to: row.TO || '',
        etaKm118: etaKm118.toISOString(),
        etdKm118: etdKm118.toISOString(),
        situation: row.SITUACION || 'SIN CONFIRMAR',
        notas: row.NOTAS || '',
        createdAt: new Date().toISOString()
      };
      
      newCrossings.push(crossing);
      
    } catch (error) {
      errors.push(`Fila ${index + 2}: ${error.message}`);
    }
  });
  
  // Mostrar resultados
  if (errors.length > 0) {
    console.error('❌ Errores encontrados:');
    errors.forEach(err => console.error(err));
  }
  
  if (newCrossings.length > 0) {
    // Guardar en localStorage
    const allCrossings = [...existingCrossings, ...newCrossings];
    localStorage.setItem('crossings', JSON.stringify(allCrossings));
    
    console.log(`✅ ${newCrossings.length} cruceros importados exitosamente`);
    console.log('🔄 Recarga la página para ver los cambios');
    
    return {
      success: true,
      imported: newCrossings.length,
      errors: errors.length
    };
  } else {
    console.error('❌ No se importaron cruceros');
    return {
      success: false,
      imported: 0,
      errors: errors.length
    };
  }
}

// Ejecutar importación
const result = importarCruceros(cruceros);
console.log('📊 Resultado:', result);
```

### Paso 3: Recargar la página
Después de ejecutar el script, recarga la página para ver los cruceros importados.

---

## ✅ VERIFICACIÓN POST-IMPORTACIÓN

Después de importar, verifica:

1. **Cantidad de registros:** Confirma que se importaron todos los cruceros
2. **Datos correctos:** Revisa que los datos se vean correctamente en la tabla
3. **Conflictos:** Verifica si hay alertas de conflictos
4. **Clasificación:** Confirma que las clases A, B, C sean correctas
5. **Fechas y horas:** Verifica que los ETA/ETD sean correctos

---

## 🚨 SOLUCIÓN DE PROBLEMAS

### Error: "Buque no encontrado"
**Causa:** El nombre del buque en el Excel no coincide con la base de datos
**Solución:** Verifica que el nombre esté escrito exactamente igual (mayúsculas/minúsculas)

### Error: "Fecha inválida"
**Causa:** Formato de fecha incorrecto
**Solución:** Usa formato `YYYY-MM-DD` (ejemplo: `2026-01-20`)

### Error: "Hora inválida"
**Causa:** Formato de hora incorrecto
**Solución:** Usa formato `HH:MM` en 24 horas (ejemplo: `08:00`, `14:30`)

### Los datos no aparecen
**Causa:** No se recargó la página
**Solución:** Presiona F5 o Ctrl+R para recargar

### Conflictos después de importar
**Causa:** Hay cruces detectados en KM 118.5
**Solución:** Revisa la sección de conflictos y ajusta los horarios según las sugerencias

---

## 💾 BACKUP Y EXPORTACIÓN

### Exportar datos actuales
```javascript
// En la consola del navegador
const crossings = localStorage.getItem('crossings');
console.log(crossings);
// Copia el resultado y guárdalo en un archivo .json
```

### Backup completo
```javascript
// Exportar todo
const backup = {
  ships: localStorage.getItem('ships'),
  crossings: localStorage.getItem('crossings'),
  movements: localStorage.getItem('movements'),
  date: new Date().toISOString()
};
console.log(JSON.stringify(backup, null, 2));
```

---

## 📞 AYUDA ADICIONAL

Si necesitas más ayuda:
1. Revisa `FORMATO_EXCEL_CRUCEROS.md` para detalles del formato
2. Consulta `INICIO_RAPIDO.txt` para funcionalidades básicas
3. Revisa `README_SISTEMA_CRUCEROS.md` para información completa del sistema

---

**Última actualización:** 15 de Enero de 2026
