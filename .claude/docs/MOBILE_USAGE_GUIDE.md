# 📱 Guía de Uso - Vistas Mobile Optimizadas

## 🎯 Acceso Rápido

### Desde Navegación Mobile
1. Abre el menú hamburguesa en mobile
2. Selecciona **"📈 Reportes"** o **"💰 Contabilidad"**
3. La vista mobile se cargará automáticamente

### URLs Directas
- **Reportes**: `/reports`
- **Contabilidad**: `/modules/accounting`

## 🔍 Detección Automática

El sistema detecta automáticamente si estás en mobile basándose en:
- ✅ User Agent (iPhone, iPad, Android, etc.)
- ✅ Ancho de pantalla (< 768px)
- ✅ Cambios dinámicos al rotar el dispositivo

## 📊 Vista Mobile - Reportes

### Estructura de Tabs

#### 📊 Tab 1: Resumen
```
┌─────────────────────────────┐
│  [Filtro de Fechas]         │
├─────────────────────────────┤
│  ┌───────┐  ┌───────┐      │
│  │Ingres.│  │Ventas │      │
│  │  💵   │  │  🛒   │      │
│  └───────┘  └───────┘      │
├─────────────────────────────┤
│  Ventas por Categoría       │
│     [Gráfico de Torta]      │
│        🥧                    │
└─────────────────────────────┘
```

#### 📈 Tab 2: Tendencias
```
┌─────────────────────────────┐
│ Ventas por Tipo de Pago     │
│                             │
│  [Gráfico de Área]          │
│   📈 Efectivo               │
│   💳 Tarjeta                │
│   🏦 Transferencia          │
│                             │
└─────────────────────────────┘
```

#### 📦 Tab 3: Stock
```
┌─────────────────────────────┐
│  Stock Crítico              │
│                             │
│  [Tabla de Productos]       │
│  📦 Producto A - Stock: 5   │
│  📦 Producto B - Stock: 2   │
│  📦 Producto C - Stock: 8   │
│                             │
└─────────────────────────────┘
```

## 💰 Vista Mobile - Contabilidad

### Layout de Cards
```
┌─────────────────────────────────┐
│ Card 1                          │
│ ┌─────────────────────────────┐ │
│ │ ID: 1234    [INGRESO ✓]     │ │
│ │ 31-01-2026 15:30:00         │ │
│ ├─────────────────────────────┤ │
│ │ Monto:         $150.000     │ │
│ │ Caja:          CAJA 1       │ │
│ │ Usuario:       JUAN PÉREZ   │ │
│ │ Detalle:       Venta normal │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ Card 2                          │
│ ┌─────────────────────────────┐ │
│ │ ID: 1235    [EGRESO ✗]      │ │
│ │ 31-01-2026 16:00:00         │ │
│ ├─────────────────────────────┤ │
│ │ Monto:         $50.000      │ │
│ │ Caja:          CAJA 1       │ │
│ │ Usuario:       MARÍA LÓPEZ  │ │
│ │ Detalle:       Retiro caja  │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│      [Cargar Más] 👆            │
└─────────────────────────────────┘
```

## 🎨 Códigos de Color - Contabilidad

| Tipo de Evento | Color | Chip |
|----------------|-------|------|
| **INGRESO** | 🟢 Verde (success) | ✅ |
| **EGRESO** | 🔴 Rojo (danger) | ❌ |
| **TRANSFERENCIA** | 🟡 Amarillo (warning) | ⚠️ |

## 👆 Interacciones Táctiles

### Reportes
- **Swipe horizontal** en tabs para cambiar sección
- **Tap** en gráficos para ver detalles
- **Tap** en filtro para cambiar fechas
- **Scroll vertical** dentro de cada tab

### Contabilidad
- **Scroll vertical** infinito
- **Tap en "Cargar Más"** para paginación
- **Swipe to refresh** (próximamente)

## 🔄 Paginación

### Desktop
```javascript
// Componente de Pagination tradicional
<Pagination 
  page={currentPage} 
  total={totalPages} 
  onChange={setPage}
/>
```

### Mobile
```javascript
// Botón "Load More" con infinite scroll
<Button onPress={handleLoadMore}>
  Cargar más
</Button>
```

## 📐 Breakpoints y Responsividad

```javascript
// Detección automática
const isMobile = useIsMobile(768)

// < 768px  → Vista Mobile
// ≥ 768px  → Vista Desktop
```

### Ejemplos de Dispositivos

| Dispositivo | Ancho | Vista |
|-------------|-------|-------|
| iPhone SE | 375px | 📱 Mobile |
| iPhone 14 | 390px | 📱 Mobile |
| iPad Mini (portrait) | 744px | 📱 Mobile |
| iPad Mini (landscape) | 1024px | 💻 Desktop |
| iPad Pro | 1024px+ | 💻 Desktop |
| Desktop | 1280px+ | 💻 Desktop |

## 🎯 Optimizaciones Aplicadas

### Charts
```javascript
// Mobile
chart: {
  toolbar: { show: false },  // Sin toolbar
  height: 300                // Altura reducida
}

// Desktop
chart: {
  toolbar: { show: true },
  height: 350
}
```

### Fonts
```javascript
// Mobile
legend: { fontSize: '11px' }
labels: { fontSize: '10px' }

// Desktop
legend: { fontSize: '14px' }
labels: { fontSize: '12px' }
```

## 🚀 Performance Tips

1. **Lazy Loading**: Los gráficos se cargan solo cuando son visibles
2. **Paginación**: Solo 10 items por carga en mobile
3. **Optimización de Charts**: Menos puntos de datos en mobile
4. **Memoización**: Componentes optimizados con useMemo

## 🐛 Troubleshooting

### "No se detecta como mobile"
```javascript
// Verifica en DevTools
console.log(window.innerWidth) // < 768?
console.log(navigator.userAgent) // Mobile device?
```

### "Charts muy pequeños"
```javascript
// Ajusta el height en MobileReportView.js
chart: {
  height: 350 // Incrementa si es necesario
}
```

### "Tabs no funcionan"
- Verifica que NextUI esté instalado: `npm list @nextui-org/react`
- Asegúrate de tener la versión 2.4+

## 📱 Testing en Dispositivos Reales

### iOS (Safari)
1. Conecta iPhone/iPad por cable
2. Abre Safari → Develop → [Dispositivo] → localhost:3000
3. Navega a `/reports` o `/modules/accounting`

### Android (Chrome)
1. Activa "Depuración USB"
2. Abre Chrome → chrome://inspect
3. Selecciona tu dispositivo
4. Navega a la URL

### Simuladores
```bash
# iOS Simulator (macOS)
open -a Simulator

# Android Emulator
emulator -avd [nombre_avd]
```

## 🎨 Personalización

### Cambiar Breakpoint
```javascript
// hooks/use-is-mobile.js
const isMobile = useIsMobile(640) // 640px en lugar de 768px
```

### Modificar Colores de Chips
```javascript
// MobileTableAccounting.js
const getEventTypeColor = (eventType) => {
  switch (eventType) {
    case 'INGRESO': return 'primary' // Cambia de 'success'
    case 'EGRESO': return 'secondary'
    // ...
  }
}
```

### Ajustar Cards de Accounting
```javascript
// MobileTableAccounting.js
<Card className="dark:bg-secondary-400 bg-white shadow-lg">
  {/* Agrega más shadow, borders, etc. */}
</Card>
```

## 📚 Recursos Adicionales

- [NextUI Documentation](https://nextui.org/docs)
- [ApexCharts Mobile Options](https://apexcharts.com/docs/options/chart/)
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)

---

**✨ Disfruta de la experiencia mobile optimizada!** 🚀
