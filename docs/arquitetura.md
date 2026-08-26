# Modelagem Inicial

## Diagrama de Entidade-Relacionamento (ER)

```mermaid
erDiagram
    USUARIO ||--o{ LANCAMENTO : "possui (modelo conceitual)"
    USUARIO {
        string nome
    }
    LANCAMENTO {
        int id
        string descricao
        float valor
        date data
        string categoria
        string tipo
    }
```

> **Nota sobre o modelo:**
> - `categoria` e `tipo` são campos de domínio fixo (não têm tabela própria): `categoria` aceita Bolsa, Auxílio, Alimentação, Transporte, Material Escolar, Moradia, Lazer ou Outros; `tipo` aceita receita ou despesa.
> - O relacionamento USUARIO–LANCAMENTO é conceitual. Na versão atual (sem backend), os lançamentos ficam em um único array no localStorage, sem isolamento real por usuário — o "usuário" serve apenas para identificação por nome (RF01), sem autenticação (RNF04).

## Fluxo Principal do Sistema

```mermaid
flowchart LR
    A[Identificar Usuário] --> B[Dashboard]
    B --> C[Adicionar Lançamento]
    B --> D[Editar/Excluir Lançamento]
    B --> E[Filtrar por Categoria/Período]
    B --> F[Ver Resumo Geral]
    B --> G["Ver Gráfico por Categoria (em desenvolvimento)"]
```
