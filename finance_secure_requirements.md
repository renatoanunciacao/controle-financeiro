# Atualizando o documento para refletir que a autenticação será apenas via Google na versão atual,
# e que login/cadastro manual podem ser adicionados em versões futuras.

updated_requirements_md = """
# 💰 FinanceSecure – Requirements Specification

## 📌 Objetivo
Um app de finanças pessoais onde o usuário pode:

- Registrar sua renda mensal.
- Controlar despesas fixas mensais e compras parceladas.
- Calcular automaticamente o saldo restante do mês.
- Fazer login com uma conta Google (sem criação de API ou banco de dados).
- Usar o app em dispositivos móveis com layout responsivo.

---

## ✅ Requisitos Funcionais (RF)

### RF01 – Entrada de Renda Mensal
- Usuário pode inserir e atualizar sua renda mensal.

### RF02 – Gestão de Despesas Fixas
- Usuário pode adicionar contas fixas como água, luz, internet, etc.
- Cada despesa possui nome, valor e data de vencimento.

### RF03 – Controle de Parcelamentos
- Usuário pode registrar compras parceladas.
- Cada registro contém nome, valor total, número de parcelas e data de início.

### RF04 – Cálculo de Saldo Restante
- O sistema calcula o saldo restante do mês:
  `renda - despesas fixas - parcelas do mês`.

### RF05 – Autenticação via Google
- Usuário faz login exclusivamente com sua conta Google.
- Dados são salvos por usuário autenticado.

### RF06 – Persistência dos Dados
- Dados do usuário são salvos no `localStorage`.
- As informações permanecem salvas entre sessões.

### RF07 – Layout Responsivo
- Interface adaptada para dispositivos móveis e desktop.

### RF08 – Tema Escuro/Claro
- Usuário pode alternar entre os temas escuro e claro.

### RF09 – Telas de Login/Cadastro (Futuro)
- Embora não utilizadas nesta versão, serão planejadas telas tradicionais de login e cadastro para versões futuras.

---

## ✅ Requisitos Não Funcionais (RNF)

### RNF01 – Tecnologias Utilizadas
- React para interface.
- Stitches para estilização.
- Zustand para gerenciamento de estado.

### RNF02 – Persistência Local
- Zustand com `localStorage` para manter os dados do usuário.

### RNF03 – Design Moderno
- UI limpa e moderna, com possibilidade de uso de sistemas como Material Design.

### RNF04 – Sem Backend (Versão Inicial)
- Toda lógica funciona no front-end, sem API ou banco de dados.

---

## ✅ Funcionalidades Futuras (Opcional)

- Exportação de relatórios em PDF/Excel.
- Integração com bancos via Open Finance.
- Notificações de vencimentos.
- Sincronização em nuvem usando conta Google.
- Telas tradicionais de login e cadastro (com backend).
"""

# Sobrescrevendo o arquivo anterior com a nova versão
output_path.write_text(updated_requirements_md.strip(), encoding="utf-8")
output_path.name
