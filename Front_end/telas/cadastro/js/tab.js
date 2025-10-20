document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const tabela = document.getElementById("tabela-dados");
  if (!form || !tabela) return; // evita erro em páginas sem tabela/form

  const btnIncluir = document.getElementById("btnIncluir");
  const secForm = document.getElementById("formulario");
  const secLista = document.getElementById("lista");
  const btnCancelar = document.getElementById("btn-cancelar");
  const thead = tabela.closest("table").querySelector("thead");
  const tbody = tabela;

  const entity = tabela.closest("section").dataset.entity; // ex: cidades, estados, pessoas
  let colunas = [];

  /** ==========================
   * Cria cabeçalho dinâmico
   * ========================== */
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

  /** ==========================
   * Adiciona ou atualiza linha
   * ========================== */
  function adicionarLinha(dados, editandoRow = null) {
    const tr = editandoRow || document.createElement("tr");

    colunas.forEach(col => {
      let td = editandoRow ? tr.querySelector(`td[data-col="${col}"]`) : document.createElement("td");
      td.setAttribute("data-col", col);
      td.textContent = dados[col] !== undefined ? dados[col] : "";
      if (!editandoRow) tr.appendChild(td);
    });

    if (!editandoRow) {
      tr.dataset.id = dados.id || dados.cd_cidade || dados.cd_estado || dados.cd_pessoa || "";
      const tdAcoes = document.createElement("td");
      tdAcoes.innerHTML = `
        <button class="btn-editar">Editar</button>
        <button class="btn-excluir">Excluir</button>
      `;
      tr.appendChild(tdAcoes);
      tbody.appendChild(tr);
    }
  }

  /** ==========================
   * Carrega tabela do backend
   * ========================== */
  async function carregarTabela() {
    try {
      const res = await fetch(`http://localhost:8080/${entity}`);
      if (!res.ok) throw new Error(`Erro ao buscar ${entity}: ${res.status}`);
      const dados = await res.json();

      tbody.innerHTML = "";
      if (dados.length > 0 && thead.innerHTML.trim() === "") criarCabecalho();
      dados.forEach(item => adicionarLinha(item));
    } catch (err) {
      console.error(err);
      tbody.innerHTML = `<tr><td colspan="${colunas.length + 1}">Erro ao carregar dados</td></tr>`;
    }
  }

  carregarTabela();

  /** ==========================
   * Abrir formulário
   * ========================== */
  btnIncluir?.addEventListener("click", () => {
    form.reset();
    secForm.classList.add("ativo");
    secLista.classList.remove("ativo");
  });

  /** ==========================
   * Cancelar formulário
   * ========================== */
  btnCancelar?.addEventListener("click", e => {
    e.preventDefault();
    form.reset();
    secForm.classList.remove("ativo");
    secLista.classList.add("ativo");
    tbody.querySelectorAll("tr[data-editando]").forEach(r => r.removeAttribute("data-editando"));
  });

  /** ==========================
   * Submeter formulário (POST/PUT)
   * ========================== */
  form.addEventListener("submit", async e => {
    e.preventDefault();

    const dados = {};
    form.querySelectorAll("input, select, textarea").forEach(el => {
      if(el.value.trim() !== "") dados[el.id] = el.value;
    });

    const editandoRow = tbody.querySelector("tr[data-editando='true']");

    try {
      let novoRegistro;
      if (editandoRow) {
        // PUT (edição)
        const id = editandoRow.dataset.id;
        const res = await fetch(`http://localhost:8080/${entity}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados)
        });
        if (!res.ok) throw new Error(`Erro ao atualizar registro: ${res.status}`);
        novoRegistro = await res.json();
        adicionarLinha(novoRegistro, editandoRow);
        editandoRow.removeAttribute("data-editando");
      } else {
        // POST (novo)
        const res = await fetch(`http://localhost:8080/${entity}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados)
        });
        if (!res.ok) throw new Error(`Erro ao cadastrar registro: ${res.status}`);
        novoRegistro = await res.json();
        if (thead.innerHTML.trim() === "") criarCabecalho();
        adicionarLinha(novoRegistro);
      }

      form.reset();
      secForm.classList.remove("ativo");
      secLista.classList.add("ativo");
    } catch (err) {
      alert(err);
    }
  });

  /** ==========================
   * Editar / Excluir linha
   * ========================== */
  tbody.addEventListener("click", async e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const row = btn.closest("tr");

    if (btn.classList.contains("btn-excluir")) {
      if (!confirm("Deseja excluir este registro?")) return;
      try {
        const id = row.dataset.id;
        const res = await fetch(`http://localhost:8080/${entity}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Erro ao excluir");
        row.remove();
      } catch (err) {
        alert(err);
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
