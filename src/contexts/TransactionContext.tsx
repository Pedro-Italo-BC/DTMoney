import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

export interface TransactionType {
  category: string
  createdAt: string
  description: string
  id: number
  price: number
  type: 'income' | 'outcome'
}

interface CreateNewTransactionInput {
  category: string
  description: string
  price: number
  type: 'income' | 'outcome'
}

interface TransactionContextProps {
  transactions: TransactionType[]
  fetchTransactions: (query?: string) => Promise<void>
  createNewTransactions: (data: CreateNewTransactionInput) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextProps)

interface TransactionProviderProps {
  children: ReactNode
}

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }, [])
  const createNewTransactions = useCallback(
    async (data: CreateNewTransactionInput) => {
      const { category, description, price, type } = data

      const response = await api.post('/transactions', {
        category,
        description,
        price,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createNewTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
