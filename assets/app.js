/**
 * Ginger Café — customizaciones locales
 * Carga después de catalog.js. Úsalo para: iconos de categoría, analytics,
 * widgets de chat, horario de atención, integración de mapa, etc.
 */
(function () {
  'use strict';

  // Iconos por clave de categoría (deben coincidir con config.json)
  const CAT_ICONS = {
    bolones:        '🟢',
    desayunos:      '🍳',
    tradicionales: '🥘',
    mar:            '🐟',
    parrilla:       '🔥',
    sanduches:      '🥪',
    adicionales:    '➕',
    bebidas:        '🥤',
  };

  function injectCategoryIcons() {
    document.querySelectorAll('.cat-chip[data-cat]').forEach(chip => {
      const ic = chip.querySelector('.ic');
      if (ic && !ic.textContent.trim()) {
        ic.textContent = CAT_ICONS[chip.dataset.cat] || '';
      }
    });
  }

  // Lazy-load Google Maps en la vista de ubicación
  function injectMap() {
    const frame = document.querySelector('.map-frame');
    if (!frame || frame.src) return;
    fetch('./config.json')
      .then(r => r.json())
      .then(cfg => { if (cfg.maps_embed_url) frame.src = cfg.maps_embed_url; })
      .catch(() => {});
  }

  document.addEventListener('catalog:ready', injectCategoryIcons);
  document.addEventListener('location:open', injectMap);
  // Fallback por si el evento catalog:ready no existe en la versión del engine
  document.addEventListener('DOMContentLoaded', () => setTimeout(injectCategoryIcons, 400));
})();
