# Revisão completa do Front-end vs. enunciado (RF001–RF020)

> Data da auditoria: 2026-04-05
> Escopo: apenas front-end Angular + fluxos em localStorage.
> Observação: o arquivo do enunciado formal não foi localizado no repositório; os RFs abaixo foram mapeados pelos próprios identificadores `RF00x` presentes no código e pelo fluxo funcional implementado.

## Resultado por requisito

### RF001 – Cadastro de cliente
**Status:** Implementado

- Existe tela de cadastro com dados pessoais e endereço em 2 etapas.
- O cadastro persiste em `localStorage`, com validação de CPF/e-mail duplicados e geração de senha temporária.

### RF002 – Login/autenticação por perfil
**Status:** Implementado

- Login validado no front-end e redirecionamento por perfil (`CLIENT`, `EMPLOYEE`, `ADMIN`).
- Guarda de rota para áreas autenticadas e bloqueio de login/cadastro para usuário já autenticado.

### RF003 – Página inicial do cliente
**Status:** Implementado

- Cliente visualiza suas solicitações, status e ações contextuais.
- Ações variam conforme estado (orçar/aprovar/rejeitar/resgatar/pagar/visualizar).

### RF004 – Abrir nova solicitação
**Status:** Parcialmente implementado

- Formulário existe com categoria, equipamento e descrição do defeito.
- Há validação mínima de 3 palavras para equipamento/defeito.
- **Gap:** categoria selecionada não é salva no objeto enviado ao storage (não grava `categoryId/categoryName`).

### RF005 – Aprovar/Rejeitar orçamento
**Status:** Implementado

- Fluxo completo em diálogo para solicitações `QUOTED`.
- Atualiza estado e histórico.

### RF006 – Aprovar orçamento
**Status:** Implementado

- Aprovação move para `APPROVED` e registra histórico com data/valor.

### RF007 – Rejeitar orçamento
**Status:** Implementado

- Rejeição exige motivo no diálogo e registra `rejectionReason` + histórico.

### RF008 – Visualizar solicitação e histórico
**Status:** Implementado

- Cliente e funcionário possuem modal de visualização com histórico completo de transições.

### RF009 – Resgatar solicitação rejeitada
**Status:** Implementado

- Cliente consegue resgatar `REJECTED` para `APPROVED`, com histórico.

### RF010 – Pagar serviço
**Status:** Implementado

- Fluxo dedicado para pagamento de solicitações `FIXED`, altera para `PAID`, registra `paidAt` e histórico.

### RF011 – Tela de solicitações abertas (funcionário)
**Status:** Implementado

- Funcionário vê solicitações `OPEN` e pode iniciar orçamento.

### RF012 – Efetuar orçamento (funcionário)
**Status:** Implementado

- Diálogo de orçamento com dados completos da solicitação e do cliente.
- Valor obrigatório maior que zero.

### RF013 – Visualizar/filtrar solicitações (funcionário)
**Status:** Implementado

- Filtros por hoje/período/todas e visualização em lista com ações por estado.

### RF014 – Efetuar manutenção
**Status:** Implementado

- Para solicitações `APPROVED` (ou redirecionadas ao funcionário), permite registrar manutenção + orientações.
- Atualiza para `FIXED` com histórico.

### RF015 – Redirecionar solicitação
**Status:** Implementado

- Funcionário pode redirecionar para outro funcionário (exceto ele mesmo), com histórico.

### RF016 – Finalizar solicitação
**Status:** Implementado

- Finalização disponível para `PAID`, muda para `FINALIZED` e registra responsável/data/histórico.

### RF017 – CRUD de funcionário: cadastrar
**Status:** Parcialmente implementado

- Métodos de serviço (`addEmployee`) existem.
- **Gap:** não há tela/fluxo de interface para cadastro de funcionário.

### RF018 – CRUD de funcionário: editar
**Status:** Parcialmente implementado

- Método de serviço (`updateEmployee`) existe.
- **Gap:** não há tela/fluxo de interface para edição.

### RF019 – CRUD de funcionário: remover
**Status:** Parcialmente implementado

- Método de serviço (`removeEmployee`) existe com regras (não remover a si mesmo/único funcionário).
- **Gap:** não há tela/fluxo de interface para remoção.

### RF020 – Relatórios
**Status:** Implementado (simulado)

- Há tela de relatórios e exportação PDF por período e por categoria usando dados do `localStorage`.

## Lista geral do que falta fazer

1. Integrar categoria no salvamento da nova solicitação (`categoryId/categoryName`).
2. Criar telas/fluxos completos de CRUD de funcionários (RF017-RF019).
3. Melhorar validações de dados (ex.: CPF e telefone com validação estrutural, período inválido em filtros/relatórios).
4. Revisar estados intermediários e nomenclatura visual para consistência (ex.: `IN_PROGRESS` aparece no modelo, mas fluxo não usa).

## Bugs/problemas encontrados

1. **Bug funcional RF004:** categoria não persiste ao salvar solicitação.
2. **Bug de markup:** `maintenance-dialog.html` contém trecho extra de “Finalizar Solicitação” no final do arquivo, indicando possível sobra/duplicação de template.
3. Build atual falha por dependência ausente `@angular/animations/browser` no ambiente (`ng build`).

## Inconsistências com o enunciado (inferido)

1. Requisitos de CRUD de funcionários parecem previstos como RF017-RF019, porém sem UI.
2. Existe estado `IN_PROGRESS` no modelo, mas sem transição explícita nas telas.
3. Em filtros de período não há validação de data inicial > final.

## Melhorias sugeridas de front-end

1. Criar página administrativa de funcionários (listar, criar, editar, excluir).
2. Padronizar mapeamento de cores/status em arquivo central para cliente e funcionário.
3. Adicionar validações de formulário mais robustas (máscaras + validação semântica).
4. Substituir `alert(...)` por snackbar/modal consistente para UX.
5. Adicionar feedback de loading/sucesso/erro em ações críticas.
6. Adicionar testes de fluxo dos RFs críticos (aprovar/rejeitar/resgatar/pagar/finalizar).

## Checklist final (front-end pronto para entrega)

- [ ] RF004 com categoria persistida.
- [ ] RF017 com tela e fluxo de cadastro de funcionário.
- [ ] RF018 com tela e fluxo de edição de funcionário.
- [ ] RF019 com tela e fluxo de exclusão de funcionário.
- [ ] Correção do template de manutenção com trecho residual.
- [ ] Validação de período inválido em filtros/relatórios.
- [ ] Build sem erro de dependência.
- [ ] Testes mínimos de regressão dos fluxos RF005–RF016.
