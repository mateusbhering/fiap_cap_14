import { api } from "./api"
import type { User, Conta, Transacao } from "./types"

// Autenticação
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  },
  logout: () => {
    localStorage.removeItem("token")
  },
  getCurrentUser: async () => {
    const response = await api.get("/auth/me")
    return response.data
  }
}

// Usuários
export const userService = {
  getAll: async () => {
    const response = await api.get<User[]>("/clientes")
    return response.data
  },
  getById: async (id: string) => {
    const response = await api.get<User>(`/clientes/${id}`)
    return response.data
  },
  create: async (user: Omit<User, "id">) => {
    const response = await api.post<User>("/clientes", user)
    return response.data
  },
  update: async (id: string, user: Omit<User, "id">) => {
    const response = await api.put<User>(`/clientes/${id}`, user)
    return response.data
  },
  delete: async (id: string) => {
    await api.delete(`/clientes/${id}`)
  }
}

// Contas
export const accountService = {
  getAll: async () => {
    const response = await api.get<Conta[]>("/contas")
    return response.data
  },
  getById: async (id: string) => {
    const response = await api.get<Conta>(`/contas/${id}`)
    return response.data
  },
  create: async (account: Omit<Conta, "id" | "clienteId">) => {
    const response = await api.post<Conta>("/contas", account)
    return response.data
  },
  update: async (id: string, account: Omit<Conta, "id" | "clienteId">) => {
    const response = await api.put<Conta>(`/contas/${id}`, account)
    return response.data
  },
  delete: async (id: string) => {
    await api.delete(`/contas/${id}`)
  }
}

// Transações
export const transactionService = {
  getAll: async () => {
    const response = await api.get<Transacao[]>("/transacoes")
    return response.data
  },
  getById: async (id: string) => {
    const response = await api.get<Transacao>(`/transacoes/${id}`)
    return response.data
  },
  create: async (transaction: Omit<Transacao, "id" | "dataTransacao">) => {
    const response = await api.post<Transacao>("/transacoes", transaction)
    return response.data
  },
  delete: async (id: string) => {
    await api.delete(`/transacoes/${id}`)
  },
  getByAccount: async (accountId: string) => {
    const response = await api.get<Transacao[]>(`/transacoes/conta/${accountId}`)
    return response.data
  }
}
