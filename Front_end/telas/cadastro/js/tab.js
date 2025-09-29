document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form");
  const tabela = document.getElementById("tabela-dados");
  const btnIncluir = document.getElementById("btnIncluir");
  const secForm = document.getElementById("formulario");
  const secLista = document.getElementById("lista");
  const btnCancelar = document.getElementById("btn-cancelar");
  const thead = document.querySelector(".crud thead");

  let colunas = [];

  // Abrir formulário
  btnIncluir.addEventListener("click", () => {
    secForm.classList.add("ativo");
    secLista.classList.remove("ativo");
  });

  // Cancelar
  btnCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    secForm.classList.remove("ativo");
    secLista.classList.add("ativo");
    form.reset();
  });

  // Cria cabeçalho da tabela apenas com campos obrigatórios
  function criarCabecalho() {
    thead.innerHTML = "";
    colunas = [];

    const tr = document.createElement("tr");

    form.querySelectorAll("input[required], select[required]").forEach(el => {
      const id = el.id;
      colunas.push(id);
      const th = document.createElement("th");
      const label = form.querySelector(`label[for='${id}']`);
      th.textContent = label ? label.innerText : id;
      tr.appendChild(th);
    });

    const thAcoes = document.createElement("th");
    thAcoes.textContent = "Ações";
    tr.appendChild(thAcoes);

    thead.appendChild(tr);
  }

  // Adiciona linha na tabela apenas com campos obrigatórios
  function adicionarLinha(dados, editandoRow = null) {
    const tr = editandoRow || document.createElement("tr");

    colunas.forEach(col => {
      let td;
      if (editandoRow) {
        td = tr.querySelector(`td[data-col="${col}"]`);
      } else {
        td = document.createElement("td");
        td.setAttribute("data-col", col);
      }
      td.textContent = dados[col] || "";
      if (!editandoRow) tr.appendChild(td);
    });

    if (!editandoRow) {
      const tdAcoes = document.createElement("td");
      tdAcoes.innerHTML = `
        <button class="btn-editar"><i class="fa fa-edit"></i></button>
        <button class="btn-excluir"><i class="fa fa-trash"></i></button>
      `;
      tr.appendChild(tdAcoes);
      tabela.appendChild(tr);
    }
  }

  // Submissão do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = {};
    form.querySelectorAll("input[required], select[required]").forEach(el => {
      dados[el.id] = el.value;
    });

    // Se ainda não criou cabeçalho, cria
    if (thead.innerHTML.trim() === "") criarCabecalho();

    // Verifica se estamos editando
    const editandoRow = tabela.querySelector("tr[data-editando='true']");
    adicionarLinha(dados, editandoRow);

    if (editandoRow) editandoRow.removeAttribute("data-editando");

    secForm.classList.remove("ativo");
    secLista.classList.add("ativo");
    form.reset();
  });

  // Editar / Excluir
  tabela.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const row = btn.closest("tr");

    if (btn.classList.contains("btn-excluir")) {
      if (confirm("Deseja excluir este registro?")) row.remove();
    }

    if (btn.classList.contains("btn-editar")) {
      colunas.forEach(col => {
        const input = document.getElementById(col);
        const td = row.querySelector(`td[data-col="${col}"]`);
        if (input && td) input.value = td.textContent;
      });
      row.setAttribute("data-editando", "true");
      secForm.classList.add("ativo");
      secLista.classList.remove("ativo");
    }
  });

});
