// src/pages/transactions/TransactionForm.tsx
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { transactionService, accountService } from "../../lib/services"
import type { Transacao, Conta } from "../../lib/types"


export default function TransactionForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const editing = !!id
  const [form, setForm] = useState<Partial<Transacao>>({
    contaId: "",
    descricao: "",
    valor: 0,
    tipo: "DEBIT"
  })
  const [accounts, setAccounts] = useState<Conta[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    loadAccounts()
    if (editing && id) {
      loadTransaction(id)
    }
  }, [editing, id])

  async function loadAccounts() {
    try {
      const data = await accountService.getAll()
      setAccounts(data)
    } catch (err) {
      console.error("Erro ao carregar contas:", err)
    }
  }

  async function loadTransaction(transactionId: string) {
    try {
      setLoading(true)
      setError("")
      const data = await transactionService.getAll()
      const transaction = data.find(t => t.id === transactionId)
      if (transaction) setForm(transaction)
    } catch (err) {
      setError("Erro ao carregar transação")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      
      if (!form.contaId) {
        setError("Selecione uma conta")
        return
      }
      if (!form.descricao) {
        setError("Descrição é obrigatória")
        return
      }
      if (!form.valor || form.valor <= 0) {
        setError("Valor deve ser maior que zero")
        return
      }
      
      if (editing && id) {
        await transactionService.create(form as Omit<Transacao, "id" | "dataTransacao">)
      } else {
        await transactionService.create(form as Omit<Transacao, "id" | "dataTransacao">)
      }
      navigate("/transactions")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar transação")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "20px" }}>
      <h1>{editing ? "Editar Transação" : "Nova Transação"}</h1>
      {error && <div style={{ color: "red", marginBottom: "10px", padding: "10px", backgroundColor: "#ffe0e0", borderRadius: "4px" }}>{error}</div>}
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <div>
          <label>Conta *</label>
          <select 
            value={form.contaId || ""} 
            onChange={e => setForm({ ...form, contaId: e.target.value })}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          >
            <option value="">Selecione uma conta</option>
            {accounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.numeroConta} - R$ {account.saldo.toFixed(2)} ({account.tipoConta})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Descrição *</label>
          <input 
            type="text"
            placeholder="Ex: Depósito, Saque, Compra..." 
            value={form.descricao} 
            onChange={e => setForm({ ...form, descricao: e.target.value })}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label>Valor (R$) *</label>
          <input 
            type="number"
            placeholder="0.00" 
            step="0.01"
            min="0.01"
            value={form.valor} 
            onChange={e => setForm({ ...form, valor: parseFloat(e.target.value) })}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label>Tipo de Transação *</label>
          <select 
            value={form.tipo} 
            onChange={e => setForm({ ...form, tipo: e.target.value as "CREDIT" | "DEBIT" })}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="DEBIT">Débito (Saída)</option>
            <option value="CREDIT">Crédito (Entrada)</option>
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
          <button 
            type="button" 
            onClick={() => navigate("/transactions")}
            style={{ padding: "10px", cursor: "pointer", backgroundColor: "#ccc" }}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: "10px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white" }}
          >
            {loading ? "Salvando..." : (editing ? "Atualizar" : "Criar")}
          </button>
        </div>
      </form>
    </div>
  )
}
