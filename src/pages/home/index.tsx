import React, { useState } from 'react'
import { Button, Card, Container, Form, ProgressBar, ProgressFill, Select, Title } from './styles'
import { InputField } from '../../components/InputField'
import { useAppStore } from '../../store';
import Modal from '../../components/modal';

const Home: React.FC = () => {

  const selectedMonth = useAppStore((state) => state.selectedMonth);
  const setSelectedMonth = useAppStore((state) => state.setSelectedMonth);
  const monthlyIncome = useAppStore((state) => state.dataByMonth[selectedMonth]?.income);
  const setMonthlyIncome = useAppStore((state) => state.setMonthlyIncome);
  const [draftRenda, setDraftRenda] = useState(monthlyIncome);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInstallmentExpenses, setIsOpenInstallmentExpenses] = useState(false);

  const addFixedExpense = useAppStore((s) => s.addFixedExpense);
  const addInstallmentExpense = useAppStore((s) => s.addInstallmentExpense);
  const expenses = useAppStore((s) => s.dataByMonth[selectedMonth]?.fixedExpenses || []);
  const installmentExpenses = useAppStore((state) => state.dataByMonth[selectedMonth]?.installmentExpenses || []);

  const totalFixedExpenses = useAppStore.getState().calculateTotalFixedExpenses();

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(i);

    const value = date.toISOString().slice(0, 7);
    const label = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    return { value, label };
  });

  const handleSave = () => {
    setMonthlyIncome(draftRenda);
  };

  return (
    <Container>
      {/* Renda Mensal */}
      <div>
        <Card>
          <Title>Selecione o Mês</Title>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map(({ value, label }) => (
              <option key={value} value={value}>
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </option>
            ))}
          </Select>

          <Title>Renda Mensal</Title>
          <InputField type="number" placeholder="Informe sua renda" value={draftRenda} onChange={(e) => setDraftRenda(Number(e.target.value))} disabled={monthlyIncome !== 0} />
          <Button onClick={handleSave} css={{ alignSelf: 'flex-end' }}>Salvar</Button>
        </Card>

      </div>


      {/* Despesas Fixas */}
      <Card>
        <Title>Despesas Fixas</Title>
        <div>
          {expenses && expenses.length > 0 ? (
            expenses.map((exp, i) => {
              const dueDate = new Date(exp.dueDate); // Converte a data de vencimento para objeto Date
              const day = dueDate.getDate().toString().padStart(2, '0'); // Obtém o dia (com 2 dígitos)
              const month = (dueDate.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (com 2 dígitos)

              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'nowrap' }}>
                  <span style={{ flex: 1, fontWeight: 'bold', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {exp.name}
                  </span> {/* Nome da despesa */}
                  <span style={{ width: '100px', textAlign: 'right', flexShrink: 0 }}>R$ {exp.value.toFixed(2)}</span> {/* Valor da despesa */}
                  <span style={{ width: '160px', textAlign: 'right', flexShrink: 0 }}>Vencimento: {day}/{month}</span> {/* Data de vencimento */}
                </div>
              );
            })
          ) : (
            <p>Não há despesas registradas para este mês.</p> // Mensagem quando não há despesas
          )}
        </div>
        <Button onClick={() => setIsOpen(true)}>Adicionar Despesa</Button>
      </Card>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Adicionar Despesa</h2>
        <Form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          const name = formData.get('name') as string;
          const value = Number(formData.get('value'));
          const dueDate = formData.get('dueDate') as string;

          if (!name || isNaN(value) || !dueDate) return;

          addFixedExpense({
            name,
            value,
            dueDate,
          });

          setIsOpen(false);
          e.currentTarget.reset();
        }}>
          <InputField type="text" name="name" placeholder="Nome da despesa" required />
          <InputField type="number" name="value" placeholder="Valor da despesa" required />
          <InputField type="date" name="dueDate" required />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button type="button" onClick={() => setIsOpen(false)} css={{ alignItems: '', width: '200px' }}>Cancelar</Button>
            <Button type="submit" css={{ alignItems: 'flex-end', width: '200px' }}>Salvar</Button>
          </div>

        </Form>
      </Modal>

      {/* Parcelamentos */}
      <Card>
        <Title>Parcelamentos</Title>
        {installmentExpenses.map((item) => (
          <div key={item.id} style={{ marginBottom: 12 }}>
            <p>
              {item.name} – {item.remainingMonths}/{item.totalMonths} – Cartão: {item.cardName}
            </p>
            <ProgressBar>
              <ProgressFill style={{ width: `${(1 - item.remainingMonths / item.totalMonths) * 100}%` }} />
            </ProgressBar>
          </div>
        ))}
        <Button onClick={() => setIsOpenInstallmentExpenses(true)}>Adicionar Compra Parcelada</Button>
      </Card>

      <Modal isOpen={isOpenInstallmentExpenses} onClose={() => setIsOpenInstallmentExpenses(false)}>
        <h2>Adicionar Despesa Parcelada</h2>
        <Form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          const name = formData.get('name') as string;
          const amount = Number(formData.get('amount'));
          const totalMonths = Number(formData.get('totalMonths'));
          const currentMonth = Number(formData.get('currentMonth'));
          const remainingMonths = totalMonths - currentMonth;
          const cardName = formData.get('cardName') as string;
          const dueDate = formData.get('dueDate') as string;

          if (!name || isNaN(amount) || isNaN(totalMonths) || !cardName || !dueDate) return;

          addInstallmentExpense({
            name,
            amount,
            totalMonths,
            currentMonth,
            remainingMonths,
            cardName,
            dueDate,
          });



          setIsOpenInstallmentExpenses(false);
          e.currentTarget.reset();
        }}>
          <InputField type="text" name="name" placeholder="Nome da despesa" required />
          <InputField type="number" name="amount" placeholder="Valor da parcela" required />
          <InputField type="number" name="totalMonths" placeholder="Quantidade de parcelas" required />
          <InputField
            type="number"
            name="currentMonth"
            placeholder="Parcela atual (ex: 1)"
            min="1"
            required
          />
          <InputField type="text" name="cardName" placeholder="Nome do cartão" required />
          <InputField type="date" name="dueDate" required />

          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button type="button" onClick={() => setIsOpen(false)} css={{ alignItems: '', width: '200px' }}>Cancelar</Button>
            <Button type="submit" css={{ alignItems: 'flex-end', width: '200px' }}>Salvar</Button>
          </div>

        </Form>
      </Modal>


      {/* Resumo Financeiro */}
      <Card>
        <Title>Minhas contas</Title>
        <h3 style={{ fontSize: '2rem', color: '#1976d2' }}>R$ {totalFixedExpenses.toFixed(2)}</h3>
      </Card>
    </Container>
  )
}

export default Home
