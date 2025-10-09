document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form");
  const tabela = document.getElementById("tabela-dados");
  const btnIncluir = document.getElementById("btnIncluir");
  const secForm = document.getElementById("formulario");
  const secLista = document.getElementById("lista");
  const btnCancelar = document.getElementById("btn-cancelar");
  const thead = tabela.querySelector("thead");
  const tbody = tabela.querySelector("tbody");

  const entity = tabela.dataset.entity; // "pessoas", "cidades", etc.
  let colunas = [];

  // Criar cabeçalho dinamicamente
  function criarCabecalho() {
    thead.innerHTML = "";
    colunas = [];
    const tr = document.createElement("tr");

    form.querySelectorAll("input[required], select[required], textarea").forEach(el => {
      colunas.push(el.id);
      const th = document.createElement("th");
      const label = form.querySelector(`label[for='${el.id}']`);
      th.textContent = label ? label.innerText : el.id;
      tr.appendChild(th);
    });

    const thAcoes = document.createElement("th");
    thAcoes.textContent = "Ações";
    tr.appendChild(thAcoes);

    thead.appendChild(tr);
  }

  // Adicionar ou atualizar linha na tabela
  function adicionarLinha(dados, editandoRow = null) {
    const tr = editandoRow || document.createElement("tr");

    colunas.forEach(col => {
      let td = editandoRow ? tr.querySelector(`td[data-col="${col}"]`) : document.createElement("td");
      td.setAttribute("data-col", col);
      td.textContent = dados[col] || "";
      if (!editandoRow) tr.appendChild(td);
    });

    if (!editandoRow) {
      tr.dataset.id = dados.id; // ID retornado do backend
      const tdAcoes = document.createElement("td");
      tdAcoes.innerHTML = `
        <button class="btn-editar">Editar</button>
        <button class="btn-excluir">Excluir</button>
      `;
      tr.appendChild(tdAcoes);
      tbody.appendChild(tr);
    }
  }

  // Carregar dados do backend
  function carregarTabela() {
    fetch(`/${entity}`)
      .then(res => res.json())
      .then(dados => {
        tbody.innerHTML = ""; // limpa tabela
        if (dados.length > 0 && thead.innerHTML.trim() === "") criarCabecalho();
        dados.forEach(item => adicionarLinha(item));
      })
      .catch(err => console.error(err));
  }

  carregarTabela(); // carregar ao iniciar

  // Abrir formulário
  btnIncluir.addEventListener("click", () => {
    secForm.classList.add("ativo");
    secLista.classList.remove("ativo");
    form.reset();
  });

  // Cancelar
  btnCancelar.addEventListener("click", e => {
    e.preventDefault();
    secForm.classList.remove("ativo");
    secLista.classList.add("ativo");
    form.reset();
  });

  // Submeter formulário
  form.addEventListener("submit", e => {
    e.preventDefault();

    const dados = {};
    form.querySelectorAll("input, select, textarea").forEach(el => dados[el.id] = el.value);

    const editandoRow = tbody.querySelector("tr[data-editando='true']");

    if (editandoRow) {
      // Editar registro
      const id = editandoRow.dataset.id;
      fetch(`/${entity}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      })
      .then(res => res.json())
      .then(atualizado => {
        adicionarLinha(atualizado, editandoRow);
        editandoRow.removeAttribute("data-editando");
        form.reset();
        secForm.classList.remove("ativo");
        secLista.classList.add("ativo");
      })
      .catch(err => alert("Erro ao atualizar registro: " + err));
    } else {
      // Novo registro
      fetch(`/${entity}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      })
      .then(res => res.json())
      .then(novoRegistro => {
        if (thead.innerHTML.trim() === "") criarCabecalho();
        adicionarLinha(novoRegistro);
        form.reset();
        secForm.classList.remove("ativo");
        secLista.classList.add("ativo");
      })
      .catch(err => alert("Erro ao cadastrar registro: " + err));
    }
  });

  // Editar / Excluir
  tbody.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const row = btn.closest("tr");

    if (btn.classList.contains("btn-excluir")) {
      if (confirm("Deseja excluir este registro?")) {
        const id = row.dataset.id;
        fetch(`/${entity}/${id}`, { method: "DELETE" })
          .then(() => row.remove())
          .catch(err => alert("Erro ao excluir registro: " + err));
      }
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
