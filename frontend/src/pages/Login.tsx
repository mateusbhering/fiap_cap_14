import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const { signIn, error } = useAuth()
  const nav = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg("")
    
    if (!email || !password) {
      setErrorMsg("Email e senha são obrigatórios")
      return
    }

    try {
      setLoading(true)
      await signIn(email, password)
      // Se chegou aqui, login foi bem-sucedido
      nav("/", { replace: true })
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Erro ao fazer login"
      setErrorMsg(msg)
      console.error("Erro:", msg)
    } finally {
      setLoading(false)
    }
  }

  const displayError = errorMsg || error

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5"
    }}>
      <form onSubmit={onSubmit} style={{ 
        width: 320,
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Login Fintech</h1>
        
        {displayError && (
          <div style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "15px",
            fontSize: "14px"
          }}>
            ❌ {displayError}
          </div>
        )}

        <input 
          placeholder="Email" 
          type="email"
          value={email} 
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            boxSizing: "border-box"
          }}
        />
        
        <input 
          placeholder="Senha" 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            boxSizing: "border-box"
          }}
        />
        
        <button 
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: loading ? "#ccc" : "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Entrando..." : "Sign in"}
        </button>

        <div style={{
          marginTop: "15px",
          padding: "10px",
          backgroundColor: "#e3f2fd",
          borderRadius: "4px",
          fontSize: "12px",
          color: "#1565c0"
        }}>
          💡 Use qualquer uma das contas:
          <br/>📧 joao@example.com
          <br/>📧 maria@example.com
          <br/>📧 pedro@example.com
        </div>
      </form>
    </div>
  )
}
