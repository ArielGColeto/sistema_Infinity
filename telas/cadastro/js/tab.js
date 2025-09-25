document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-pessoa"); // ou "form-cidade"
    const tabela = document.getElementById("tabela-dados"); // tbody
    const btnIncluir = document.getElementById("btnIncluir");
    const secForm = document.getElementById("formulario");
    const secLista = document.getElementById("lista");
    const btnCancelar = document.getElementById("btn-cancelar");
    const thead = document.querySelector(".crud thead");

    let colunas = []; // colunas existentes

    // Cria cabeçalho inicial se houver título default
    if (thead.children.length === 0) {
        const trHead = document.createElement("tr");
        thead.appendChild(trHead);
    }
    const trHead = thead.querySelector("tr");

    // Abre formulário
    btnIncluir.addEventListener("click", () => { 
        secForm.classList.add("ativo");
        secLista.classList.remove("ativo");
    });

    // Cancela
    btnCancelar.addEventListener("click", (e) => {
        e.preventDefault();
        secForm.classList.remove("ativo");
        secLista.classList.add("ativo");
        form.reset();
    });

    // Submete formulário
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const campos = Array.from(form.elements)
            .filter(el => el.tagName === "INPUT" || el.tagName === "SELECT")
            .filter(el => el.value.trim() !== "");

        const dados = {};
        campos.forEach(campo => {
            const nome = campo.name || campo.id;
            dados[nome] = campo.value;
        });

        // Cria colunas novas
        Object.keys(dados).forEach(campo => {
            if (!colunas.includes(campo)) {
                colunas.push(campo);
                const th = document.createElement("th");
                th.textContent = campo.toUpperCase();
                trHead.appendChild(th);

                // Adiciona td vazia em linhas existentes
                tabela.querySelectorAll("tr").forEach(linha => {
                    const td = document.createElement("td");
                    td.textContent = "";
                    linha.appendChild(td);
                });
            }
        });

        // Cria nova linha
        const tr = document.createElement("tr");
        colunas.forEach(col => {
            const td = document.createElement("td");
            td.textContent = dados[col] || "";
            tr.appendChild(td);
        });

        // Coluna de ações
        const tdAcoes = document.createElement("td");
        tdAcoes.innerHTML = `
            <button class="btn-editar"><i class="fa fa-edit"></i></button>
            <button class="btn-excluir"><i class="fa fa-trash"></i></button>
        `;
        tr.appendChild(tdAcoes);

        tabela.appendChild(tr);

        // Fecha formulário
        secForm.classList.remove("ativo");
        secLista.classList.add("ativo");
        form.reset();
    });

    // Editar / Excluir
    tabela.addEventListener("click", (event) => {
        const btn = event.target.closest("button");
        if (!btn) return;
        const row = btn.closest("tr");

        if (btn.classList.contains("btn-excluir")) {
            if (confirm("Tem certeza que deseja excluir este registro?")) row.remove();
        }

        if (btn.classList.contains("btn-editar")) {
            const cells = row.querySelectorAll("td");
            colunas.forEach((col, idx) => {
                const campo = document.getElementById(col);
                if (campo) campo.value = cells[idx].innerText;
            });
            secForm.classList.add("ativo");
            secLista.classList.remove("ativo");
            row.setAttribute("data-editando", "true");
        }
    });

    // Atualiza linha editada
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const editando = document.querySelector("tr[data-editando='true']");
        if (editando) {
            const cells = editando.querySelectorAll("td");
            colunas.forEach((col, idx) => {
                const campo = document.getElementById(col);
                if (campo) cells[idx].innerText = campo.value;
            });
            editando.removeAttribute("data-editando");
        }
    });
});
