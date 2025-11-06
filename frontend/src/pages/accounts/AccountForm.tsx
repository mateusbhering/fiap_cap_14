// src/pages/accounts/AccountForm.tsx
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { accountService } from "../../lib/services"
import type { Conta } from "../../lib/types"
import { useAuth } from "../../context/AuthContext"


export default function AccountForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { clienteId } = useAuth()
  const editing = !!id
  const [form, setForm] = useState<Partial<Conta>>({
    numeroConta: "",
    saldo: 0,
    tipoConta: "CORRENTE",
    clienteId: clienteId ? parseInt(clienteId) : undefined
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (clienteId) {
      setForm(prev => ({ ...prev, clienteId: parseInt(clienteId) }))
    }
  }, [clienteId])

  useEffect(() => {
    if (editing && id) {
      loadAccount(id)
    }
  }, [editing, id])

  async function loadAccount(accountId: string) {
    try {
      setLoading(true)
      setError("")
      const data = await accountService.getAll()
      const account = data.find(a => a.id === accountId)
      if (account) setForm(account)
    } catch (err) {
      setError("Erro ao carregar conta")
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
      
      if (!clienteId) {
        setError("Usuário não autenticado")
        return
      }

      if (!form.numeroConta) {
        setError("Número da conta é obrigatório")
        return
      }

      if (!form.saldo || form.saldo < 0) {
        setError("Saldo deve ser maior ou igual a zero")
        return
      }
      
      const dataToSend = {
        numeroConta: form.numeroConta,
        saldo: form.saldo,
        tipoConta: form.tipoConta,
        clienteId: parseInt(clienteId)
      }

      if (editing && id) {
        await accountService.update(id, dataToSend as Conta)
      } else {
        await accountService.create(dataToSend as Conta)
      }
      navigate("/accounts")
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err?.message || "Erro ao salvar conta"
      setError(errorMsg)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "20px" }}>
      <h1>{editing ? "Editar Conta" : "Nova Conta"}</h1>
      {error && <div style={{ color: "red", marginBottom: "10px", padding: "10px", backgroundColor: "#ffe0e0", borderRadius: "4px" }}>{error}</div>}
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <div>
          <label>Número da Conta *</label>
          <input 
            type="text"
            placeholder="12345-6" 
            value={form.numeroConta || ""} 
            onChange={e => setForm({ ...form, numeroConta: e.target.value })}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label>Saldo Inicial (R$) *</label>
          <input 
            type="number"
            placeholder="0.00" 
            step="0.01"
            min="0"
            value={form.saldo || 0} 
            onChange={e => setForm({ ...form, saldo: parseFloat(e.target.value) })}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label>Tipo de Conta *</label>
          <select 
            value={form.tipoConta || ""} 
            onChange={e => setForm({ ...form, tipoConta: e.target.value as "CORRENTE" | "POUPANCA" | "INVESTIMENTO" })}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="CORRENTE">Corrente</option>
            <option value="POUPANCA">Poupança</option>
            <option value="INVESTIMENTO">Investimento</option>
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
          <button 
            type="button" 
            onClick={() => navigate("/accounts")}
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
