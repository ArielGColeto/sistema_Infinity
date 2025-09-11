let botoes = document.querySelectorAll(".menu-toggle");

botoes.forEach((botao) =>
{
    botao.addEventListener("click", () =>
    {    
    const submenuId = botao.getAttribute("aria-controls");
    const submenu = document.getElementById(submenuId);

    const expanded = botao.getAttribute("aria-expanded") === "true";

    botao.setAttribute("aria-expanded", !expanded);
    submenu.setAttribute("aria-hidden", expanded);

    submenu.style.display = expanded ? "none" : "block";
    });
});