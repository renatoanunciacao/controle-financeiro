import React, { useState } from 'react'
import { Button, Card, Container, ProgressBar, ProgressFill, Select, Title } from './styles'
import { InputField } from '../../components/InputField'
import { useAppStore } from '../../store';

const Home: React.FC = () => {

  const selectedMonth = useAppStore((state) => state.selectedMonth);
  const setSelectedMonth = useAppStore((state) => state.setSelectedMonth);
  const monthlyIncome = useAppStore((state) => state.dataByMonth[selectedMonth]?.income);
  const setMonthlyIncome = useAppStore((state) => state.setMonthlyIncome);
  const [draftRenda, setDraftRenda] = useState(monthlyIncome);

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
          <p>Aluguel - R$ 1.200,00 - Vencimento: 05</p>
          <p>Internet - R$ 100,00 - Vencimento: 10</p>
        </div>
        <Button>Adicionar Despesa</Button>
      </Card>

      {/* Parcelamentos */}
      <Card>
        <Title>Parcelamentos</Title>
        <div>
          <p>Celular - 3/6</p>
          <ProgressBar>
            <ProgressFill style={{ width: '50%' }} />
          </ProgressBar>
        </div>
        <Button>Adicionar Compra Parcelada</Button>
      </Card>

      {/* Resumo Financeiro */}
      <Card>
        <Title>Resumo Financeiro</Title>
        <h3 style={{ fontSize: '2rem', color: '#1976d2' }}>R$ 2.500,00</h3>
      </Card>
    </Container>
  )
}

export default Home
