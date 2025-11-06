// src/pages/users/UsersList.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { userService } from "../../lib/services"
import type { User } from "../../lib/types"

export default function UsersList() {
  const [rows, setRows] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  async function load() {
    try {
      setLoading(true)
      setError("")
      const data = await userService.getAll()
      setRows(data)
    } catch (err) {
      console.error("Failed to load users:", err)
      setError("Erro ao carregar usuários")
    } finally {
      setLoading(false)
    }
  }

  async function removeItem(id: string) {
    try {
      await userService.delete(id)
      await load()
    } catch (err) {
      console.error("Failed to delete user:", err)
      setError("Erro ao deletar usuário")
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <p>Carregando...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    <div>
      <h1>Usuários</h1>
      <div style={{ margin: "12px 0" }}>
        <Link to="/users/new">Novo usuário</Link>
      </div>
      <table>
        <thead>
          <tr><th>Nome</th><th>Email</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {rows.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td style={{ display: "flex", gap: 8 }}>
                <Link to={`/users/${u.id}`}>Editar</Link>
                <button onClick={() => removeItem(u.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
