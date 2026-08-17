let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];

const form = document.getElementById("formLancamento");
const listaEl = document.getElementById("listaLancamentos");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const novoLancamento = {
    id: Date.now(),
    descricao: document.getElementById("descricao").value,
    valor: parseFloat(document.getElementById("valor").value),
    data: document.getElementById("data").value,
    categoria: document.getElementById("categoria").value,
    tipo: document.getElementById("tipo").value,
  };

  lancamentos.push(novoLancamento);
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

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderizarLista() {
  listaEl.innerHTML = "";

  lancamentos.forEach((l) => {
    const item = document.createElement("li");

    const classeValor = l.tipo === "receita" ? "valor-receita" : "valor-despesa";
    const sinal = l.tipo === "receita" ? "+" : "-";

    item.innerHTML = `
      <span>${l.descricao} (${l.categoria}) — ${l.data}</span>
      <span class="${classeValor}">${sinal} ${formatarMoeda(l.valor)}</span>
      <span class="acoes">
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

atualizarTela();