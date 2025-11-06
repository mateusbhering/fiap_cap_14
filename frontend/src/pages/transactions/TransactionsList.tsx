// src/pages/transactions/TransactionsList.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { transactionService } from "../../lib/services"
import type { Transacao } from "../../lib/types"

export default function TransactionsList() {
  const [rows, setRows] = useState<Transacao[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function load() {
    try {
      setLoading(true)
      setError("")
      const data = await transactionService.getAll()
      setRows(data)
    } catch (err) {
      console.error("Erro ao carregar transações:", err)
      setError("Erro ao carregar transações")
    } finally {
      setLoading(false)
    }
  }

  async function deleteTransaction(id: string | undefined) {
    if (!id) return
    if (!window.confirm("Tem certeza que deseja deletar?")) return
    try {
      await transactionService.delete(id)
      await load()
    } catch (err) {
      console.error("Erro ao deletar:", err)
      setError("Erro ao deletar transação")
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <p>Carregando...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    <div>
      <h1>Transações</h1>
      <div style={{ margin: "12px 0" }}>
        <Link to="/transactions/new" style={{
          padding: "10px 15px",
          backgroundColor: "#1976d2",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px"
        }}>
          ➕ Nova Transação
        </Link>
      </div>
      
      {rows.length === 0 ? (
        <p>Nenhuma transação encontrada. Registre uma!</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Descrição</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Valor</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Tipo</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Data</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(t => (
              <tr key={t.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{t.descricao}</td>
                <td style={{ padding: "10px" }}>R$ {t.valor?.toFixed(2)}</td>
                <td style={{ padding: "10px" }}>
                  <span style={{
                    padding: "4px 8px",
                    backgroundColor: t.tipo === "CREDIT" ? "#4caf50" : "#f44336",
                    color: "white",
                    borderRadius: "4px",
                    fontSize: "12px"
                  }}>
                    {t.tipo === "CREDIT" ? "💰 Crédito" : "💸 Débito"}
                  </span>
                </td>
                <td style={{ padding: "10px" }}>{t.dataTransacao ? new Date(t.dataTransacao).toLocaleDateString("pt-BR") : "-"}</td>
                <td style={{ padding: "10px", display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    🗑️ Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
