## Introdução
Sistema web para auxiliar estudantes na organização financeira pessoal
e no planejamento do uso de bolsas e auxílios recebidos durante o
período letivo, permitindo o registro, categorização e visualização
de um resumo financeiro mensal.

## Justificativa
Muitos estudantes, especialmente bolsistas, recebem valores fixos de
bolsas e auxílios, mas têm dificuldade de planejar como esses recursos
serão usados ao longo do mês, misturando-os com despesas do dia a dia
sem controle. Isso leva a desorganização financeira justamente num
momento em que o planejamento é essencial para a permanência escolar.
Este projeto busca oferecer uma ferramenta simples e acessível para
que estudantes organizem suas receitas (incluindo bolsas e auxílios)
e despesas, com uma visão clara do próprio orçamento.

## Objetivos
**Objetivo geral:** desenvolver um sistema web de organização
financeira e planejamento estudantil, com foco em bolsas e auxílios
escolares.

**Objetivos específicos:**
- Permitir o cadastro de receitas, incluindo bolsas e auxílios recebidos
- Permitir o cadastro de despesas relevantes ao contexto estudantil (material escolar, transporte, alimentação, etc.)
- Organizar lançamentos por categoria
- Exibir um resumo mensal de entradas e saídas
- Disponibilizar visualização gráfica dos gastos por categoria
- Ajudar o estudante a planejar o uso de bolsas/auxílios ao longo do período letivo

## Funcionalidades

- Identificação de usuário por nome e senha (RF01), com contas separadas por navegador
- Cadastro de receitas e despesas, com categorias sugeridas de acordo com o tipo escolhido (RF02, RF03)
- Edição e exclusão de lançamentos (RF04)
- Resumo mensal com totais de receitas, despesas e saldo (RF05)
- Filtro de lançamentos por categoria e por período (RF06)
- Gráfico de gastos por categoria (RF07)
- Layout responsivo, adaptado para desktop e mobile (RNF01)

## Como executar

Este projeto é 100% front-end (HTML, CSS e JavaScript), sem necessidade de
servidor ou instalação de dependências.

1. Clone ou baixe este repositório.
2. Abra o arquivo `src/index.html` diretamente no navegador (duplo clique,
   ou clique com o botão direito → "Abrir com" → seu navegador preferido).
   Também funciona com extensões como "Live Server" do VS Code.
3. Na primeira vez, digite um nome e uma senha (mínimo 4 caracteres) — a
   conta é criada automaticamente. Nos acessos seguintes, use o mesmo nome
   e senha para entrar.

> ⚠️ Aviso: a senha é salva em texto puro no `localStorage` do navegador,
> sem criptografia. Isso é apenas uma simulação didática de contas
> separadas por usuário, **não** uma autenticação segura (ver RNF04 em
> `docs/requisitos.md`).

## Tecnologias utilizadas

- HTML5, CSS3 e JavaScript puro (Vanilla JS)
- [Bootstrap 5](https://getbootstrap.com/) — layout e responsividade
- [Bootstrap Icons](https://icons.getbootstrap.com/) — ícones
- [Chart.js](https://www.chartjs.org/) — gráfico de gastos por categoria
- `localStorage` da API do navegador — persistência dos dados

## Estrutura do repositório

```
├── src/                 # código-fonte do sistema
│   ├── index.html
│   ├── script.js
│   └── style.css
├── docs/
│   ├── requisitos.md    # requisitos funcionais e não funcionais
│   ├── arquitetura.md   # modelagem (diagrama ER e fluxo principal)
│   └── testes.md        # relatório de validação e testes
└── README.md
```

## Resultados finais (v1.0.0)
O projeto foi concluído com todos os requisitos funcionais (RF01 a RF07) e
não funcionais (RNF01 a RNF04) implementados e testados (ver `docs/testes.md`).
O sistema permite cadastrar receitas e despesas, visualizar o saldo em um
resumo e acompanhar os gastos por categoria em um gráfico.

A validação com um usuário real não identificou dificuldades relevantes.
Como limitação conhecida, a senha do login é salva sem criptografia no
`localStorage`, servindo apenas para separar dados por usuário no mesmo
navegador — não é uma autenticação segura.
