// src/pages/accounts/AccountsList.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { accountService } from "../../lib/services"
import type { Conta } from "../../lib/types"

export default function AccountsList() {
  const [rows, setRows] = useState<Conta[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function load() {
    try {
      setLoading(true)
      setError("")
      const data = await accountService.getAll()
      setRows(data)
    } catch (err) {
      console.error("Erro ao carregar contas:", err)
      setError("Erro ao carregar contas")
    } finally {
      setLoading(false)
    }
  }

  async function deleteAccount(id: string | undefined) {
    if (!id) return
    if (!window.confirm("Tem certeza que deseja deletar?")) return
    try {
      await accountService.delete(id)
      await load()
    } catch (err) {
      console.error("Erro ao deletar:", err)
      setError("Erro ao deletar conta")
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <p>Carregando...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    <div>
      <h1>Contas Bancárias</h1>
      <div style={{ margin: "12px 0" }}>
        <Link to="/accounts/new" style={{
          padding: "10px 15px",
          backgroundColor: "#1976d2",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px"
        }}>
          ➕ Nova Conta
        </Link>
      </div>
      
      {rows.length === 0 ? (
        <p>Nenhuma conta encontrada. Crie uma nova!</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Número da Conta</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Saldo</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Tipo</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(a => (
              <tr key={a.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{a.numeroConta}</td>
                <td style={{ padding: "10px" }}>R$ {a.saldo?.toFixed(2)}</td>
                <td style={{ padding: "10px" }}>{a.tipoConta}</td>
                <td style={{ padding: "10px", display: "flex", gap: "8px" }}>
                  <Link to={`/accounts/${a.id}`} style={{
                    padding: "5px 10px",
                    backgroundColor: "#4caf50",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px"
                  }}>
                    ✏️ Editar
                  </Link>
                  <button
                    onClick={() => deleteAccount(a.id)}
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
