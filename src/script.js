// ---------- Estado ----------

let lancamentos = [];
let editandoId = null; // guarda o id do lançamento sendo editado, ou null se for um novo
let usuarioAtual = null;
let graficoCategorias = null;

const categoriasPorTipo = {
  receita: ["Bolsa", "Auxílio", "Mesada", "Outros"],
  despesa: ["Alimentação", "Transporte", "Material Escolar", "Moradia", "Lazer", "Outros"],
};

// ---------- Referências dos elementos ----------

const form = document.getElementById("formLancamento");
const listaEl = document.getElementById("listaLancamentos");
const semLancamentosEl = document.getElementById("semLancamentos");
const botaoSubmit = form.querySelector("button[type='submit']");
const usuarioInfoEl = document.getElementById("usuarioInfo");

const telaIdentificacao = document.getElementById("telaIdentificacao");
const appEl = document.getElementById("app");
const formIdentificacao = document.getElementById("formIdentificacao");
const inputNomeUsuario = document.getElementById("inputNomeUsuario");
const inputSenhaUsuario = document.getElementById("inputSenhaUsuario");
const erroLoginEl = document.getElementById("erroLogin");

const tipoSelect = document.getElementById("tipo");
const categoriaInput = document.getElementById("categoria");
const listaCategoriasEl = document.getElementById("listaCategorias");
const listaCategoriasFiltroEl = document.getElementById("listaCategoriasFiltro");

const filtroCategoria = document.getElementById("filtroCategoria");
const filtroDataInicio = document.getElementById("filtroDataInicio");
const filtroDataFim = document.getElementById("filtroDataFim");
const botaoLimparFiltros = document.getElementById("limparFiltros");

const semDespesasEl = document.getElementById("semDespesas");

// ---------- Categorias dinâmicas (dependem do Tipo escolhido) ----------

tipoSelect.addEventListener("change", function () {
  atualizarSugestoesCategorias(tipoSelect.value);
  categoriaInput.value = "";
});

function atualizarSugestoesCategorias(tipo) {
  listaCategoriasEl.innerHTML = "";
  const opcoes = categoriasPorTipo[tipo] || [];
  opcoes.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    listaCategoriasEl.appendChild(option);
  });
}

function preencherListaCategoriasFiltro() {
  listaCategoriasFiltroEl.innerHTML = "";
  const todasCategorias = [...categoriasPorTipo.receita, ...categoriasPorTipo.despesa];
  const categoriasUnicas = [...new Set(todasCategorias)];
  categoriasUnicas.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    listaCategoriasFiltroEl.appendChild(option);
  });
}

// ---------- Identificação (login/cadastro simples) ----------
//
// AVISO IMPORTANTE: isso é uma verificação simples, só pra fins didáticos.
// A senha fica salva em texto puro no localStorage do navegador, sem
// nenhuma criptografia — qualquer pessoa que abrir o DevTools do navegador
// consegue ler. NÃO é uma autenticação segura de verdade (isso exigiria um
// backend). Isso muda o que está descrito no RNF04 do requisitos.md, que
// precisa ser atualizado se essa versão for a final.

function obterUsuariosCadastrados() {
  return JSON.parse(localStorage.getItem("usuarios")) || {};
}

function salvarUsuariosCadastrados(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function mostrarErroLogin(mensagem) {
  erroLoginEl.textContent = mensagem;
  erroLoginEl.classList.remove("d-none");
}

function esconderErroLogin() {
  erroLoginEl.classList.add("d-none");
  erroLoginEl.textContent = "";
}

function marcarCampoInvalido(campo, idMensagem, mensagem) {
  campo.classList.add("is-invalid");
  document.getElementById(idMensagem).textContent = mensagem;
}

function marcarCampoValido(campo) {
  campo.classList.remove("is-invalid");
}

function limparValidacaoCampos() {
  marcarCampoValido(inputNomeUsuario);
  marcarCampoValido(inputSenhaUsuario);
}

formIdentificacao.addEventListener("submit", function (evento) {
  evento.preventDefault();
  esconderErroLogin();

  const nome = inputNomeUsuario.value.trim();
  const senha = inputSenhaUsuario.value;
  let valido = true;

  if (!nome) {
    marcarCampoInvalido(inputNomeUsuario, "erroNome", "Digite seu nome.");
    valido = false;
  } else {
    marcarCampoValido(inputNomeUsuario);
  }

  if (senha.length < 4) {
    marcarCampoInvalido(inputSenhaUsuario, "erroSenha", "A senha precisa ter pelo menos 4 caracteres.");
    valido = false;
  } else {
    marcarCampoValido(inputSenhaUsuario);
  }

  if (!valido) return;

  const usuarios = obterUsuariosCadastrados();

  if (usuarios[nome] === undefined) {
    // Nome novo: cadastra automaticamente com a senha digitada.
    usuarios[nome] = senha;
    salvarUsuariosCadastrados(usuarios);
  } else if (usuarios[nome] !== senha) {
    mostrarErroLogin("Senha incorreta para esse nome.");
    return;
  }

  localStorage.setItem("usuarioNome", nome);
  formIdentificacao.reset();
  limparValidacaoCampos();
  renderizarUsuario();
});

function chaveLancamentos(nome) {
  return `lancamentos_${nome}`;
}

function carregarLancamentosDoUsuario(nome) {
  lancamentos = JSON.parse(localStorage.getItem(chaveLancamentos(nome))) || [];
}

function salvarLancamentos() {
  localStorage.setItem(chaveLancamentos(usuarioAtual), JSON.stringify(lancamentos));
}

function renderizarUsuario() {
  const nome = localStorage.getItem("usuarioNome");

  if (nome) {
    usuarioAtual = nome;
    usuarioInfoEl.innerHTML = `
      <p class="mb-0">Olá, ${nome}!
        <button class="btn btn-sm btn-outline-light ms-2" onclick="trocarUsuario()">Sair</button>
      </p>`;
    telaIdentificacao.classList.add("escondido");
    appEl.classList.remove("escondido");
    carregarLancamentosDoUsuario(nome);
    atualizarTela();
  } else {
    usuarioAtual = null;
    usuarioInfoEl.innerHTML = "";
    telaIdentificacao.classList.remove("escondido");
    appEl.classList.add("escondido");
  }
}

function trocarUsuario() {
  localStorage.removeItem("usuarioNome");
  renderizarUsuario();
}

// ---------- Filtros ----------

[filtroCategoria, filtroDataInicio, filtroDataFim].forEach((campo) => {
  campo.addEventListener("change", renderizarLista);
});

botaoLimparFiltros.addEventListener("click", function () {
  filtroCategoria.value = "";
  filtroDataInicio.value = "";
  filtroDataFim.value = "";
  renderizarLista();
});

function aplicarFiltros(lista) {
  const filtroCat = filtroCategoria.value.trim().toLowerCase();

  return lista.filter((l) => {
    const bateCategoria = !filtroCat || l.categoria.toLowerCase().includes(filtroCat);
    const bateInicio = !filtroDataInicio.value || l.data >= filtroDataInicio.value;
    const bateFim = !filtroDataFim.value || l.data <= filtroDataFim.value;
    return bateCategoria && bateInicio && bateFim;
  });
}

// ---------- Formulário de lançamento ----------

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const dadosFormulario = {
    descricao: document.getElementById("descricao").value,
    valor: parseFloat(document.getElementById("valor").value),
    data: document.getElementById("data").value,
    categoria: categoriaInput.value.trim(),
    tipo: tipoSelect.value,
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

function excluirLancamento(id) {
  lancamentos = lancamentos.filter((l) => l.id !== id);
  salvarLancamentos();
  atualizarTela();
}

function editarLancamento(id) {
  const lancamento = lancamentos.find((l) => l.id === id);
  if (!lancamento) return;

  tipoSelect.value = lancamento.tipo;
  atualizarSugestoesCategorias(lancamento.tipo);

  document.getElementById("descricao").value = lancamento.descricao;
  document.getElementById("valor").value = lancamento.valor;
  document.getElementById("data").value = lancamento.data;
  categoriaInput.value = lancamento.categoria;

  editandoId = id;
  botaoSubmit.textContent = "Salvar Edição";

  document.getElementById("formLancamento").scrollIntoView({ behavior: "smooth" });
}

// ---------- Exibição ----------

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarDataBr(dataIso) {
  const [ano, mes, dia] = dataIso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function renderizarLista() {
  listaEl.innerHTML = "";

  const lancamentosFiltrados = aplicarFiltros(lancamentos);

  semLancamentosEl.classList.toggle("d-none", lancamentosFiltrados.length > 0);

  lancamentosFiltrados
    .slice()
    .sort((a, b) => (a.data < b.data ? 1 : -1))
    .forEach((l) => {
      const item = document.createElement("li");
      item.className = `list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2 ${l.tipo}`;

      const classeValor = l.tipo === "receita" ? "text-success" : "text-danger";
      const sinal = l.tipo === "receita" ? "+" : "-";

      item.innerHTML = `
        <div>
          <strong>${l.descricao}</strong>
          <span class="badge bg-secondary">${l.categoria}</span>
          <div class="text-muted small">${formatarDataBr(l.data)}</div>
        </div>
        <div class="d-flex align-items-center gap-2">
          <span class="fw-bold ${classeValor}">${sinal} ${formatarMoeda(l.valor)}</span>
          <button class="btn btn-sm btn-outline-primary" onclick="editarLancamento(${l.id})">Editar</button>
          <button class="btn btn-sm btn-outline-danger" onclick="excluirLancamento(${l.id})">Excluir</button>
        </div>
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

function renderizarGrafico() {
  const despesas = lancamentos.filter((l) => l.tipo === "despesa");

  if (despesas.length === 0) {
    semDespesasEl.classList.remove("d-none");
    if (graficoCategorias) {
      graficoCategorias.destroy();
      graficoCategorias = null;
    }
    return;
  }

  semDespesasEl.classList.add("d-none");

  const totaisPorCategoria = {};
  despesas.forEach((l) => {
    totaisPorCategoria[l.categoria] = (totaisPorCategoria[l.categoria] || 0) + l.valor;
  });

  const categorias = Object.keys(totaisPorCategoria);
  const valores = Object.values(totaisPorCategoria);

  const ctx = document.getElementById("graficoCategorias").getContext("2d");

  if (graficoCategorias) {
    graficoCategorias.destroy();
  }

  graficoCategorias = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: categorias,
      datasets: [
        {
          data: valores,
          backgroundColor: ["#0d6efd", "#dc3545", "#ffc107", "#198754", "#6f42c1", "#20c997", "#fd7e14", "#6c757d"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
}

function atualizarTela() {
  renderizarLista();
  calcularResumo();
  renderizarGrafico();
}

// ---------- Inicialização ----------

preencherListaCategoriasFiltro();
renderizarUsuario();