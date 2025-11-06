import { Outlet, Link, useNavigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

export default function App() {
  const { signOut } = useAuth()
  const nav = useNavigate()

  function handleOut() {
    signOut()
    nav("/login", { replace: true })
  }

  return (
    <div style={{ display: "grid", gridTemplateRows: "56px 1fr", height: "100vh" }}>
      <header style={{ display: "flex", gap: 16, alignItems: "center", padding: 12, borderBottom: "1px solid #eee" }}>
        <strong>Fintech App</strong>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
          <Link to="/accounts">Accounts</Link>
          <Link to="/transactions">Transactions</Link>
        </nav>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={handleOut}>Sign out</button>
        </div>
      </header>
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </div>
  )
}
