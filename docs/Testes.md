# Relatório de Validação e Testes

## Testes Funcionais

| Requisito | Como foi testado | Resultado |
|---|---|---|
| RF01 - Identificar usuário por nome | Cadastro automático com nome novo + senha; 
teste de senha errada (mostrou aviso) e senha certa (entrou normalmente) | Passou |
| RF02 - Cadastrar receitas (incluindo bolsas/auxílios) | Cadastrada uma receita na categoria Bolsa (R$500) | Passou |
| RF03 - Cadastrar despesas | Cadastrada uma despesa na categoria Alimentação (R$50) | Passou |
| RF04 - Editar e excluir lançamentos | Editado um lançamento existente e excluído outro | Passou |
| RF05 - Exibir resumo de receitas e despesas | Resumo Geral atualizou corretamente após os lançamentos | Passou |
| RF06 - Filtrar por categoria e período | Testado filtro por categoria e por data, e o botão Limpar | Passou |
| RF07 - Exibir gráfico de gastos por categoria | Gráfico de rosca exibiu as despesas divididas por categoria corretamente | Passou |

## Testes Não Funcionais

| Requisito | Como foi testado | Resultado |
|---|---|---|
| RNF01 - Responsividade (desktop e mobile) | Testado redimensionando a janela do navegador / em tela de celular | Passou |
| RNF02 - Armazenamento local (localStorage) | Dados permaneceram salvos entre o uso do sistema | Passou |
| RNF03 - Tempo de resposta das operações | Todas as ações (adicionar, editar, filtrar) responderam imediatamente | Passou |

## Validação com Usuário / Contexto Real

- **Quem testou:** Vitor Hugo, colega de classe.
- **O que essa pessoa fez no sistema:** Usou o sistema normalmente, testando as funcionalidades disponíveis (login, cadastro de lançamentos, filtros).
- **Feedback recebido:** Não teve dificuldades para usar o sistema. A única dúvida foi sobre o campo "Descrição", sobre o que deveria ser preenchido ali.
- **Ajustes feitos a partir desse feedback:** O campo já contava com um texto de ajuda e um exemplo de preenchimento abaixo dele; considerando a dúvida relatada, pode-se reforçar essa orientação (ex: deixando o texto de ajuda mais visível) em uma próxima versão.

## Observações Finais

O sistema atendeu a todos os requisitos funcionais e não funcionais definidos no `requisitos.md`. O login/senha implementado é uma verificação simples, sem criptografia real (sem backend), servindo apenas para fins didáticos e de organização por usuário.
