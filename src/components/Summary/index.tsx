import { SummaryContainer, SummaryCard } from './styles'
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import { priceFormater } from '../../utils/formatter'
import { useSummary } from '../../hooks/useSummary'

export function Summary() {
  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>

          <ArrowCircleUp size={32} color="#00b37e"></ArrowCircleUp>
        </header>

        <strong>{priceFormater.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saidas</span>

          <ArrowCircleDown size={32} color="#f75a68"></ArrowCircleDown>
        </header>

        <strong>{priceFormater.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>

          <CurrencyDollar size={32} color="#fff"></CurrencyDollar>
        </header>

        <strong>{priceFormater.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
