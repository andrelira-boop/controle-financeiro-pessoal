// Pega os lançamentos já salvos no navegador, ou começa com lista vazia
let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];

const form = document.getElementById("formLancamento");

form.addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede a página de recarregar ao enviar o form

  const novoLancamento = {
    id: Date.now(), // usa a data/hora atual como identificador único
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

function atualizarTela() {
  console.log("Lançamentos salvos:", lancamentos);
  // a lista e o resumo visual vêm no próximo passo
}

atualizarTela();