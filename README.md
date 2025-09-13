# Capacitación Sinnut ERP

![Sinnut Logo](https://aula.aynn.pro/files/78/download?download_frd=1)

## 📚 Sistema de Capacitación ERP

Plataforma de aprendizaje integral para el dominio del sistema empresarial Sinnut. Este proyecto está optimizado para ser utilizado en Canvas LMS a través de iframe y ser alojado en GitHub Pages.

### 🎯 Características

- **Diseño Responsive**: Optimizado para PC, tablet y móvil
- **Canvas LMS Ready**: Funciona perfectamente en iframe
- **Módulos Interactivos**: Videos, simuladores y evaluaciones
- **Progreso Tracking**: Seguimiento del progreso del estudiante
- **Material Descargable**: PDFs, plantillas y recursos adicionales

### 🚀 Demo en Vivo

- **GitHub Pages**: [https://sgamboa567.github.io/Capacitacion-Sinnut](https://sgamboa567.github.io/Capacitacion-Sinnut)
- **Para Canvas LMS**: Usar la URL anterior en un iframe

### 📁 Estructura del Proyecto

```
Capacitacion-Sinnut/
├── index.html                 # Página principal del curso
├── assets/
│   ├── css/
│   │   └── main.css          # Estilos principales responsive
│   ├── js/
│   │   └── main.js           # Funcionalidades interactivas
│   └── images/               # Imágenes y recursos gráficos
├── modulos/
│   ├── arqueo-caja.html      # Módulo 1: Arqueo de Caja
│   ├── contratos.html        # Módulo 2: Gestión de Contratos (próximamente)
│   └── facturacion.html      # Módulo 3: Facturación (próximamente)
├── evaluacion-final.html     # Evaluación integral del curso
├── faq.html                 # Preguntas frecuentes
└── README.md                # Este archivo
```

### 🎓 Módulos Disponibles

#### ✅ Módulo 1: Arqueo de Caja
- **Duración**: 35 minutos
- **Contenido**: Video tutorial + práctica guiada
- **Estado**: Disponible
- **Características**:
  - Video explicativo del proceso
  - Pasos detallados con verificación
  - Simulador interactivo
  - Lista de verificación
  - Recursos descargables

#### 🚧 Módulo 2: Gestión de Contratos
- **Duración**: 40 minutos
- **Estado**: En desarrollo
- **Lanzamiento**: Próximamente

#### 🚧 Módulo 3: Facturación Electrónica
- **Duración**: 45 minutos
- **Estado**: En desarrollo
- **Lanzamiento**: Próximamente

### 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: 
  - Variables CSS para temas consistentes
  - Flexbox y Grid para layouts responsive
  - Mobile-first design
  - Animaciones suaves
- **JavaScript Vanilla**: 
  - Interactividad sin dependencias
  - Comunicación con Canvas LMS
  - Tracking de progreso
- **GitHub Pages**: Hosting gratuito y confiable

### 📱 Responsive Design

El proyecto utiliza un enfoque **mobile-first** y es completamente responsive:

- **Móvil** (< 480px): Layout en una columna, botones full-width
- **Tablet** (480px - 768px): Layout adaptado con navegación simplificada
- **Desktop** (> 768px): Layout completo con todas las funcionalidades
- **Canvas LMS** (iframe): Optimizado para funcionar dentro de Canvas

### 🎨 Paleta de Colores

```css
:root {
  --primary-color: #0D2339;    /* Azul oscuro corporativo */
  --secondary-color: #50b67a;  /* Verde éxito */
  --accent-color: #c59d5f;     /* Dorado elegante */
  --background-color: #f8f9fa; /* Gris claro */
  --text-primary: #1a1a1a;     /* Negro principal */
  --text-secondary: #666;      /* Gris texto */
}
```

### 🔧 Configuración para GitHub Pages

1. **Fork o clona** este repositorio
2. Ve a **Settings > Pages** en tu repositorio
3. Selecciona **Source: Deploy from a branch**
4. Elige **Branch: main** y **Folder: / (root)**
5. Guarda y espera unos minutos

### 🎯 Uso en Canvas LMS

Para integrar en Canvas LMS:

1. Sube el contenido a GitHub Pages
2. En Canvas, crea una nueva página
3. Usa el editor HTML
4. Inserta el siguiente código:

```html
<div style="width: 100%; height: 800px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
  <iframe 
    src="https://sgamboa567.github.io/Capacitacion-Sinnut"
    width="100%" 
    height="100%" 
    frameborder="0"
    style="border: none;"
    allowfullscreen>
  </iframe>
</div>
```

### 📊 Características del Canvas LMS Integration

- **Comunicación bidireccional**: El iframe puede enviar datos de progreso a Canvas
- **Responsive en iframe**: Se adapta al contenedor de Canvas
- **Sin scrollbars externos**: El contenido se ajusta automáticamente
- **Loading optimizado**: Recursos optimizados para carga rápida

### 🎪 Funcionalidades Interactivas

#### 📹 Video Player
- Controles nativos HTML5
- Tracking de progreso de visualización
- Responsive y accesible

#### 🎮 Simuladores
- Simulador paso a paso del proceso de arqueo
- Interfaz intuitiva y guiada
- Feedback inmediato

#### ✅ Sistema de Progreso
- Tracking visual del progreso
- Persistencia local del progreso
- Comunicación con Canvas LMS

#### 📱 Navegación Adaptativa
- Breadcrumbs para orientación
- Navegación rápida entre secciones
- Enlaces de retorno y avance

### 🚀 Próximas Características

- [ ] **Módulo de Contratos**: Gestión completa de contratos
- [ ] **Módulo de Facturación**: Proceso de facturación electrónica
- [ ] **Evaluaciones por módulo**: Quiz específico para cada tema
- [ ] **Certificados digitales**: Generación automática de certificados
- [ ] **Chat integrado**: Soporte en tiempo real
- [ ] **Foro de discusión**: Comunidad de aprendizaje
- [ ] **Analytics avanzado**: Métricas detalladas de aprendizaje

### 💡 Mejores Prácticas Implementadas

#### Accesibilidad (a11y)
- Etiquetas semánticas HTML5
- Alt text en imágenes
- Contraste de colores WCAG AA
- Navegación por teclado
- Focus states visibles

#### Performance
- Imágenes optimizadas y lazy loading
- CSS y JS minificados en producción
- Carga diferida de recursos no críticos
- Prefetch de páginas siguientes

#### SEO
- Meta tags descriptivos
- Estructura de encabezados lógica
- URLs amigables
- Schema.org markup (futuro)

### 🤝 Contribuir

Si deseas contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

### 📞 Soporte

- **Email**: soporte.ti@oroexpress.com.co
- **Issues**: [GitHub Issues](https://github.com/Sgamboa567/Capacitacion-Sinnut/issues)
- **Documentación**: [Wiki del proyecto](https://github.com/Sgamboa567/Capacitacion-Sinnut/wiki)

### 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

### 🏆 Reconocimientos

- **Canvas LMS** por la plataforma de aprendizaje
- **GitHub Pages** por el hosting gratuito
- **Sinnut ERP** por la herramienta empresarial

---

## 📈 Estadísticas del Proyecto

- **Módulos**: 3+ (en crecimiento)
- **Duración total**: ~2 horas
- **Compatibilidad**: 95%+ de navegadores modernos
- **Responsive**: 100% compatible con dispositivos móviles
- **Accesibilidad**: WCAG 2.1 AA compliant

---

**Desarrollado con ❤️ para la comunidad de usuarios de Sinnut ERP**

*Última actualización: Septiembre 2025 | Versión 2.0*
