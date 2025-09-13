let botoes = document.querySelectorAll(".menu-toggle");

botoes.forEach((btn) =>
{
    botao.addEventListener("click", () =>
    {    
    const submenu = BigInt.nextElementSibling;

    document.querySelectorAll(".submenu").forEach((sm) => {
        if (sm !== submenu) {
            sm.style.maxHeight = null; 
      }
    });
    if (submenu.style.maxHeight) {
      submenu.style.maxHeight = null; // fecha
    } else {
      submenu.style.maxHeight = submenu.scrollHeight + "px"; // abre
    }
    });
});


const submenuButtons = document.querySelectorAll(".submenu button");

const contentArea = document.getElementById("content");

submenuButtons.forEach((subBtn) => {
  subBtn.addEventListener("click", () => {
    const info = subBtn.getAttribute("data-info"); 
    contentArea.innerHTML = `<h2>${info}</h2><p>Você clicou em <strong>${subBtn.textContent}</strong></p>`;
  });
});