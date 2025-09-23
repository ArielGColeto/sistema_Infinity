
let botoes = document.querySelectorAll(".menu-toggle");
let submenus = document.querySelectorAll(".submenu");

const toggles = document.querySelectorAll('.menu-toggle');

toggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const submenuId = toggle.getAttribute('aria-controls');
    const submenu = document.getElementById(submenuId);
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

    // Fecha todos os outros submenus
    toggles.forEach(otherToggle => {
      const otherSubmenuId = otherToggle.getAttribute('aria-controls');
      const otherSubmenu = document.getElementById(otherSubmenuId);
      if (otherToggle !== toggle) {
        otherToggle.setAttribute('aria-expanded', 'false');
        otherSubmenu.style.maxHeight = '0px';
      }
    });

    // Alterna o submenu clicado
    toggle.setAttribute('aria-expanded', !isExpanded);
    submenu.style.maxHeight = !isExpanded ? submenu.scrollHeight + 'px' : '0px';
  });
});

function abrirSubmenu(url) {
            document.getElementById('submenu-frame').src = url;
        }
