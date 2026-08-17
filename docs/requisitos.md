# Documento de Requisitos

## Requisitos Funcionais (RF)
- RF01: O sistema deve permitir identificar o usuário por um nome salvo localmente (sem autenticação com servidor).
- RF02: O sistema deve permitir cadastrar receitas (valor, data, descrição, categoria).
- RF03: O sistema deve permitir cadastrar despesas (valor, data, descrição, categoria).
- RF04: O sistema deve permitir editar e excluir lançamentos.
- RF05: O sistema deve exibir um resumo mensal de receitas e despesas.
- RF06: O sistema deve permitir filtrar lançamentos por categoria e período.
- RF07: O sistema deve exibir um gráfico de gastos por categoria.

## Requisitos Não Funcionais (RNF)
- RNF01: O sistema deve ser responsivo (desktop e mobile).
- RNF02: Os dados devem ser armazenados localmente no navegador, utilizando a API localStorage.
- RNF03: As operações principais devem responder em até 2 segundos.
- RNF04: Por não haver backend/servidor nesta versão, não há autenticação real nem armazenamento de senhas.

> **Nota:** os requisitos RNF02 e RNF04 foram ajustados em relação à versão inicial (Etapa 1),
> que previa banco de dados relacional e senha criptografada. A decisão foi simplificar
> para uma aplicação client-side (HTML/CSS/JS + localStorage), viável para o escopo do
> projeto individual desta disciplina.