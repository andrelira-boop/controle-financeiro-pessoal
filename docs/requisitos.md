# Documento de Requisitos

## Requisitos Funcionais (RF)
- RF01: O sistema deve permitir identificar o usuário por nome e senha, salvos localmente (sem autenticação com servidor). No primeiro acesso com um nome novo, a conta é criada automaticamente com a senha informada; em acessos seguintes, a senha precisa coincidir com a cadastrada.
- RF02: O sistema deve permitir cadastrar receitas (valor, data, descrição, categoria), incluindo bolsas e auxílios estudantis.
- RF03: O sistema deve permitir cadastrar despesas (valor, data, descrição, categoria), incluindo categorias voltadas à vida estudantil (ex: material escolar).
- RF04: O sistema deve permitir editar e excluir lançamentos.
- RF05: O sistema deve exibir um resumo mensal de receitas e despesas.
- RF06: O sistema deve permitir filtrar lançamentos por categoria e período.
- RF07: O sistema deve exibir um gráfico de gastos por categoria.

## Requisitos Não Funcionais (RNF)
- RNF01: O sistema deve ser responsivo (desktop e mobile).
- RNF02: Os dados devem ser armazenados localmente no navegador, utilizando a API localStorage.
- RNF03: As operações principais devem responder em até 2 segundos.
- RNF04: Por não haver backend/servidor nesta versão, a verificação de nome/senha é feita inteiramente no navegador e a senha é salva em texto puro no localStorage. Isso NÃO é uma autenticação segura (qualquer pessoa com acesso ao navegador consegue ler a senha pelo DevTools) — a funcionalidade existe apenas para fins didáticos, simulando contas separadas por usuário.
