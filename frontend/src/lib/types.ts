export type User = {
  id: string
  name: string
  email: string
}

export type Account = {
  id: string
  userId: string
  name: string
  balance: number
}

export type Transaction = {
  id: string
  accountId: string
  description: string
  amount: number
  type: "CREDIT" | "DEBIT"
  createdAt: string
}

export type Conta = {
  id?: string
  numeroConta: string
  saldo: number
  tipoConta: "CORRENTE" | "POUPANCA" | "INVESTIMENTO"
  clienteId?: string | number
}

export type Transacao = {
  id?: string
  contaId: string | number
  descricao: string
  valor: number
  tipo: "CREDIT" | "DEBIT"
  dataTransacao?: string
}