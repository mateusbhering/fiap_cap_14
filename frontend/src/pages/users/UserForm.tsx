// src/pages/users/UserForm.tsx
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../lib/api"
import type { User } from "../../lib/types"

export default function UserForm() {
  const { id } = useParams()
  const nav = useNavigate()
  const editing = !!id
  const [form, setForm] = useState<User>({ id: "", name: "", email: "" })

  useEffect(() => {
    async function load() {
      if (editing) {
        const r = await api.get<User>(`/users/${id}`)
        setForm(r.data)
      }
    }
    load()
  }, [editing, id])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editing) await api.put(`/users/${id}`, form)
    else await api.post("/users", { name: form.name, email: form.email })
    nav("/users")
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h1>{editing ? "Edit user" : "New user"}</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input placeholder="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <button type="submit">{editing ? "Save" : "Create"}</button>
      </form>
    </div>
  )
}
