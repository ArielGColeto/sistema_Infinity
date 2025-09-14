
let botoes = document.querySelectorAll(".menu-toggle");
let submenus = document.querySelectorAll(".submenu");


function carregarTela(conteudo) {
  const mainContent = document.querySelector(".content");
  mainContent.innerHTML = conteudo;
}


botoes.forEach((botao) => {
  botao.addEventListener("click", () => {

    const submenuId = botao.getAttribute("aria-controls");
    const submenu = document.getElementById(submenuId);
    let aberto = botao.getAttribute("aria-expanded") === "true";

   
    submenus.forEach((s) => {
      s.style.display = "none";
      s.setAttribute("aria-hidden", "true");
      const btn = document.querySelector(`button[aria-controls="${s.id}"]`);
      if (btn) btn.setAttribute("aria-expanded", "false");
    });

    
    if (!aberto) {
      submenu.style.display = "block";
      submenu.setAttribute("aria-hidden", "false");
      botao.setAttribute("aria-expanded", "true");
    }
  });
});


document.querySelectorAll(".submenu button").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    carregarTela(`<h2>Tela ${index + 1}</h2><p>Conteúdo da tela ${index + 1}.</p>`);
  });
});