import { useContextSelector } from 'use-context-selector'
import { TransactionContext } from '../contexts/TransactionContext'
import { useMemo } from 'react'

export function useSummary() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, cur) => {
        if (cur.type === 'income') {
          acc.income += cur.price
        } else {
          acc.outcome += cur.price
        }

        acc.total = acc.income - acc.outcome

        return acc
      },
      {
        total: 0,
        income: 0,
        outcome: 0,
      },
    )
  }, [transactions])

  return summary
}
