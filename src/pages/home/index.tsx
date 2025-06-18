import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form, ProgressBar, ProgressFill, Select, Title } from './styles'
import { InputField } from '../../components/InputField'
import { useAppStore } from '../../store'
import Modal from '../../components/modal'

const Home: React.FC = () => {
  const selectedMonth = useAppStore((state) => state?.selectedMonth);
  const setSelectedMonth = useAppStore((state) => state?.setSelectedMonth);
  const dataByMonth = useAppStore((state) => state?.dataByMonth ?? {});
  const monthData = selectedMonth ? dataByMonth[selectedMonth] : undefined;

  const monthlyIncome = monthData?.income ?? 0;
  const setMonthlyIncome = useAppStore((state) => state?.setMonthlyIncome);
  const [draftRenda, setDraftRenda] = useState(monthlyIncome);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenInstallmentExpenses, setIsOpenInstallmentExpenses] = useState(false);
  const [, setIsOpenNewBorrower] = useState<boolean>(false);

  const addFixedExpense = useAppStore((s) => s.addFixedExpense);
  const addInstallmentExpense = useAppStore((s) => s.addInstallmentExpense);
  const expenses = monthData?.fixedExpenses ?? [];
  const installmentExpenses = monthData?.installmentExpenses ?? [];

  const totalFixedExpenses = useAppStore.getState().calculateTotalExpenses?.() ?? 0;

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(i)

    const value = date.toISOString().slice(0, 7)
    const label = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

    return { value, label }
  })

  const handleSave = () => {
    setMonthlyIncome(draftRenda)
  }

  useEffect(() => {
    if (selectedMonth && !dataByMonth[selectedMonth]) {
      setMonthlyIncome(0)
    }
  }, [selectedMonth, dataByMonth, setMonthlyIncome])

  if (!selectedMonth || !monthData) {
    return <p>Carregando dados do mês...</p>
  }

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
          <InputField
            type="number"
            placeholder="Informe sua renda"
            value={draftRenda}
            onChange={(e) => setDraftRenda(Number(e.target.value))}
            disabled={monthlyIncome !== 0}
          />
          <Button onClick={handleSave} css={{ alignSelf: 'flex-end' }}>
            Salvar
          </Button>
        </Card>
      </div>

      {/* Despesas Fixas */}
      <Card>
        <Title>Despesas Fixas</Title>
        <div style={{     overflowY: 'scroll', scrollbarWidth: 'thin', height: '158px'}}>
          {expenses.length > 0 ? (
            expenses.map((exp, i) => {
              const dueDate = new Date(exp.dueDate)
              const day = dueDate.getDate().toString().padStart(2, '0')
              const month = (dueDate.getMonth() + 1).toString().padStart(2, '0')

              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                    flexWrap: 'nowrap',
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      fontWeight: 'bold',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    {exp.name}
                  </span>
                  <span style={{ width: '100px', textAlign: 'right', flexShrink: 0 }}>
                    R$ {exp.value.toFixed(2)}
                  </span>
                  <span style={{ width: '160px', textAlign: 'right', flexShrink: 0 }}>
                    Vencimento: {day}/{month}
                  </span>
                </div>
              )
            })
          ) : (
            <p>Não há despesas registradas para este mês.</p>
          )}
        </div>
        <Button onClick={() => setIsOpen(true)}>Adicionar Despesa</Button>
      </Card>

      {/* Modal de Despesa Fixa */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Adicionar Despesa</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)

            const name = formData.get('name') as string
            const value = Number(formData.get('value'))
            const dueDate = formData.get('dueDate') as string

            if (!name || isNaN(value) || !dueDate) return

            addFixedExpense({ name, value, dueDate })
            setIsOpen(false)
            e.currentTarget.reset()
          }}
        >
          <InputField type="text" name="name" placeholder="Nome da despesa" required />
          <InputField type="number" name="value" placeholder="Valor da despesa" required />
          <InputField type="date" name="dueDate" required />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button type="button" onClick={() => setIsOpen(false)} css={{ width: '200px' }}>
              Cancelar
            </Button>
            <Button type="submit" css={{ width: '200px' }}>
              Salvar
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Parcelamentos */}
      <Card>
        <Title>Parcelamentos</Title>
        {installmentExpenses.length > 0 ? (
          installmentExpenses.map((item) => {
            const remainingMonths = item.remainingMonths ?? 0
            const totalMonths = item.totalMonths ?? 0
            const progressWidth = totalMonths > 0 ? (1 - remainingMonths / totalMonths) * 100 : 0

            return (
              <div key={item.id} style={{ marginBottom: 12 }}>
                <p>
                  {item.name} – {remainingMonths}/{totalMonths} – Cartão: {item.cardName}
                </p>
                <ProgressBar>
                  <ProgressFill style={{ width: `${progressWidth}%` }} />
                </ProgressBar>
              </div>
            )
          })
        ) : (
          <p>Não há despesas parceladas registradas para este mês.</p>
        )}
        <Button onClick={() => setIsOpenInstallmentExpenses(true)}>Adicionar Compra Parcelada</Button>
      </Card>

      {/* Modal de Parcelamento */}
      <Modal isOpen={isOpenInstallmentExpenses} onClose={() => setIsOpenInstallmentExpenses(false)}>
        <h2>Adicionar Despesa Parcelada</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)

            const name = formData.get('name') as string
            const amount = Number(formData.get('amount'))
            const totalMonths = Number(formData.get('totalMonths'))
            const currentMonth = Number(formData.get('currentMonth'))
            const cardName = formData.get('cardName') as string
            const dueDate = formData.get('dueDate') as string

            if (!name || isNaN(amount) || isNaN(totalMonths) || !cardName || !dueDate) return

            const remainingMonths = totalMonths - currentMonth

            addInstallmentExpense({
              name,
              amount,
              totalMonths,
              currentMonth,
              remainingMonths,
              cardName,
              dueDate,
            })

            setIsOpenInstallmentExpenses(false)
            e.currentTarget.reset()
          }}
        >
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
            <Button type="button" onClick={() => setIsOpenInstallmentExpenses(false)} css={{ width: '200px' }}>
              Cancelar
            </Button>
            <Button type="submit" css={{ width: '200px' }}>
              Salvar
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Resumo Financeiro */}
      <Card>
        <Title>Minhas contas</Title>
        <h3 style={{ fontSize: '2rem', color: '#1976d2' }}>
          R$ {totalFixedExpenses.toFixed(2)}
        </h3>
      </Card>

      {/* Saldo após calcular todas as contas */}
      <Card>
        <Title>Sobra do salário</Title>
        
        <h3 style={{ fontSize: '2rem', color: monthlyIncome - totalFixedExpenses < 0 ? 'red': '#1976d2' }}>
          R$ {(monthlyIncome - totalFixedExpenses).toFixed(2)}
        </h3>
      </Card>

      <Card>
        <Title>Devedores</Title>

        <Button onClick={() => setIsOpenNewBorrower(true)}>Adicionar Devedor</Button>

      </Card>
    </Container>
  )
}

export default Home
