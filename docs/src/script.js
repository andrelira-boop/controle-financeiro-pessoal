let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];
let editandoId = null; // guarda o id do lançamento sendo editado, ou null se for um novo

const form = document.getElementById("formLancamento");
const listaEl = document.getElementById("listaLancamentos");
const botaoSubmit = form.querySelector("button[type='submit']");
const usuarioInfoEl = document.getElementById("usuarioInfo");

const filtroCategoria = document.getElementById("filtroCategoria");
const filtroDataInicio = document.getElementById("filtroDataInicio");
const filtroDataFim = document.getElementById("filtroDataFim");
const botaoLimparFiltros = document.getElementById("limparFiltros");

[filtroCategoria, filtroDataInicio, filtroDataFim].forEach((campo) => {
  campo.addEventListener("change", renderizarLista);
});

botaoLimparFiltros.addEventListener("click", function () {
  filtroCategoria.value = "";
  filtroDataInicio.value = "";
  filtroDataFim.value = "";
  renderizarLista();
});

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const dadosFormulario = {
    descricao: document.getElementById("descricao").value,
    valor: parseFloat(document.getElementById("valor").value),
    data: document.getElementById("data").value,
    categoria: document.getElementById("categoria").value,
    tipo: document.getElementById("tipo").value,
  };

  if (editandoId === null) {
    const novoLancamento = { id: Date.now(), ...dadosFormulario };
    lancamentos.push(novoLancamento);
  } else {
    lancamentos = lancamentos.map((l) =>
      l.id === editandoId ? { id: editandoId, ...dadosFormulario } : l
    );
    editandoId = null;
    botaoSubmit.textContent = "Adicionar";
  }

  salvarLancamentos();
  form.reset();
  atualizarTela();
});

function salvarLancamentos() {
  localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
}

function excluirLancamento(id) {
  lancamentos = lancamentos.filter((l) => l.id !== id);
  salvarLancamentos();
  atualizarTela();
}

function editarLancamento(id) {
  const lancamento = lancamentos.find((l) => l.id === id);
  if (!lancamento) return;

  document.getElementById("descricao").value = lancamento.descricao;
  document.getElementById("valor").value = lancamento.valor;
  document.getElementById("data").value = lancamento.data;
  document.getElementById("categoria").value = lancamento.categoria;
  document.getElementById("tipo").value = lancamento.tipo;

  editandoId = id;
  botaoSubmit.textContent = "Salvar Edição";

  document.querySelector(".formulario").scrollIntoView({ behavior: "smooth" });
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function aplicarFiltros(lista) {
  return lista.filter((l) => {
    const bateCategoria = !filtroCategoria.value || l.categoria === filtroCategoria.value;
    const bateInicio = !filtroDataInicio.value || l.data >= filtroDataInicio.value;
    const bateFim = !filtroDataFim.value || l.data <= filtroDataFim.value;
    return bateCategoria && bateInicio && bateFim;
  });
}

function renderizarLista() {
  listaEl.innerHTML = "";

  const lancamentosFiltrados = aplicarFiltros(lancamentos);

  lancamentosFiltrados.forEach((l) => {
    const item = document.createElement("li");

    const classeValor = l.tipo === "receita" ? "valor-receita" : "valor-despesa";
    const sinal = l.tipo === "receita" ? "+" : "-";

    item.innerHTML = `
      <span>${l.descricao} (${l.categoria}) — ${l.data}</span>
      <span class="${classeValor}">${sinal} ${formatarMoeda(l.valor)}</span>
      <span class="acoes">
        <button onclick="editarLancamento(${l.id})">Editar</button>
        <button onclick="excluirLancamento(${l.id})">Excluir</button>
      </span>
    `;

    listaEl.appendChild(item);
  });
}

function calcularResumo() {
  const totalReceitas = lancamentos
    .filter((l) => l.tipo === "receita")
    .reduce((soma, l) => soma + l.valor, 0);

  const totalDespesas = lancamentos
    .filter((l) => l.tipo === "despesa")
    .reduce((soma, l) => soma + l.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  document.getElementById("totalReceitas").textContent = formatarMoeda(totalReceitas);
  document.getElementById("totalDespesas").textContent = formatarMoeda(totalDespesas);
  document.getElementById("saldo").textContent = formatarMoeda(saldo);
}

function atualizarTela() {
  renderizarLista();
  calcularResumo();
}

function renderizarUsuario() {
  const nome = localStorage.getItem("usuarioNome");

  if (nome) {
    usuarioInfoEl.innerHTML = `<p>Olá, ${nome}! <button onclick="trocarUsuario()">Trocar nome</button></p>`;
  } else {
    usuarioInfoEl.innerHTML = `
      <form id="formUsuario">
        <input type="text" id="inputNomeUsuario" placeholder="Digite seu nome" required>
        <button type="submit">Salvar</button>
      </form>
    `;

    document.getElementById("formUsuario").addEventListener("submit", function (evento) {
      evento.preventDefault();
      const nomeDigitado = document.getElementById("inputNomeUsuario").value;
      localStorage.setItem("usuarioNome", nomeDigitado);
      renderizarUsuario();
    });
  }
}

function trocarUsuario() {
  localStorage.removeItem("usuarioNome");
  renderizarUsuario();
}

atualizarTela();
renderizarUsuario();