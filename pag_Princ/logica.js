
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

let animando = false;

function abrirSubmenu(url) {
    const iframe = document.getElementById('submenu-frame');

    if (animando) return; // evita cliques múltiplos enquanto anima

    animando = true;

    // Se já tiver animação, faz fade-out
    iframe.classList.remove('ativo');

    // Força reflow para reiniciar animação
    void iframe.offsetWidth;

    // Pequeno delay para a tela antiga sumir suavemente
    setTimeout(() => {
        // Reseta src mesmo que seja a mesma URL
        iframe.src = url;

        // Quando terminar de carregar, faz fade-in
        iframe.onload = () => {
            setTimeout(() => {
                iframe.classList.add('ativo');
                animando = false; // libera novos cliques
            }, 50);
        };
    }, 200); // tempo de fade-out
}