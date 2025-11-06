import { createContext, useContext, useMemo, useState } from "react"
import { authService } from "../lib/services"

type AuthContextType = {
  token: string | null
  clienteId: string | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  isAuth: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
  const [clienteId, setClienteId] = useState<string | null>(localStorage.getItem("clienteId"))
  const [error, setError] = useState<string | null>(null)

  async function signIn(email: string, password: string) {
    try {
      setError(null)
      console.log("Tentando fazer login com:", email)
      const response = await authService.login(email, password)
      console.log("Resposta do backend:", response)
      const newToken = response.token || response.accessToken || "auth-token"
      
      // Extrair clienteId do token (formato: "Bearer base64(email:id)")
      let id = null
      try {
        const tokenPart = newToken.replace("Bearer ", "")
        const decoded = atob(tokenPart)
        const parts = decoded.split(":")
        if (parts.length === 2) {
          id = parts[1]
        }
      } catch (e) {
        console.warn("Não foi possível extrair ID do token")
      }
      
      setToken(newToken)
      setClienteId(id)
      localStorage.setItem("token", newToken)
      if (id) localStorage.setItem("clienteId", id)
      console.log("Login bem-sucedido! ClienteId:", id)
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || "Erro ao fazer login"
      console.error("Erro no login:", errorMessage)
      setError(errorMessage)
      throw error
    }
  }

  function signOut() {
    authService.logout()
    setToken(null)
    setClienteId(null)
    setError(null)
    localStorage.removeItem("clienteId")
  }

  const value = useMemo(() => ({ token, clienteId, signIn, signOut, isAuth: !!token, error }), [token, clienteId, error])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("AuthContext not found")
  return ctx
}

