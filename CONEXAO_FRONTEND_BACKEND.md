# 🔗 Guia de Conexão Frontend React + Backend Spring

## ✅ O que foi feito

### Backend Spring (Java)
1. ✅ **CORS Configuration** - Arquivo `CorsConfig.java` criado
   - Permite requisições do frontend em `http://localhost:5173`
   - Configurado para aceitar GET, POST, PUT, DELETE

2. ✅ **Auth Controller** - Endpoint `/auth/login`
   - `POST /auth/login` - Autentica usuário
   - `GET /auth/me` - Retorna dados do usuário autenticado

3. ✅ **DTOs** - Classes de requisição/resposta
   - `LoginRequest.java` - Recebe email e password
   - `LoginResponse.java` - Retorna token e mensagem

### Frontend React (TypeScript)
1. ✅ **Variáveis de Ambiente**
   - `.env` e `.env.local` configurados com `VITE_API_URL=http://localhost:8080`

2. ✅ **API Client** - Arquivo `api.ts` atualizado
   - Axios configurado para porta 8080 do backend
   - Interceptadores para token JWT
   - Redireciona para login em erro 401

3. ✅ **Services Layer** - Arquivo `services.ts` criado
   - `authService.login()` - Faz login
   - `userService.getAll()` - Lista usuários
   - `accountService` - Gerencia contas
   - `transactionService` - Gerencia transações

4. ✅ **Auth Context** - Atualizado para usar backend real
   - `signIn()` chama o endpoint do backend

5. ✅ **Pages** - Exemplo de atualização
   - `UsersList.tsx` agora usa `userService` em vez de mock

---

## 🚀 Como executar

### 1. Backend Spring
```bash
cd /Users/mateus/Desktop/cap14/fintech_back_end
mvn spring-boot:run
```
✅ Servidor rodará em `http://localhost:8080`

### 2. Frontend React
```bash
cd /Users/mateus/Desktop/cap14/frontend
npm install  # Se não tiver feito
npm run dev
```
✅ Aplicação rodará em `http://localhost:5173`

---

## 📡 Endpoints disponíveis

### Autenticação
- `POST /auth/login` - Login
  ```json
  {
    "email": "user@example.com",
    "password": "senha123"
  }
  ```

### Clientes (Users)
- `GET /clientes` - Lista todos
- `GET /clientes/:id` - Busca por ID
- `POST /clientes` - Cria novo
- `PUT /clientes/:id` - Atualiza
- `DELETE /clientes/:id` - Deleta

### Contas (Accounts)
- `GET /contas` - Lista todas
- `POST /contas` - Cria nova
- `PUT /contas/:id` - Atualiza
- `DELETE /contas/:id` - Deleta

### Transações
- `GET /transacoes` - Lista todas
- `POST /transacoes` - Cria nova
- `GET /transacoes/conta/:accountId` - Por conta

---

## 🔧 Próximos passos (TODO)

### Backend
- [ ] Implementar autenticação real com banco de dados
- [ ] Validar email e password contra a tabela de clientes
- [ ] Implementar JWT para tokens seguros
- [ ] Criar classe de serviço para autenticação
- [ ] Adicionar validações de entrada
- [ ] Implementar tratamento de erros global

### Frontend
- [ ] Atualizar `AccountsList.tsx` com `accountService`
- [ ] Atualizar `TransactionsList.tsx` com `transactionService`
- [ ] Implementar formulários com envio ao backend
- [ ] Adicionar tratamento de erros em todas as páginas
- [ ] Implementar loading states
- [ ] Adicionar validações de formulário

---

## 💡 Dicas importantes

1. **Token JWT**: Atualmente usando token simples. Considere usar Spring Security com JWT
2. **CORS**: Configurado para localhost. Em produção, alterar origins
3. **Requisições**: Usar `userService.getAll()` em vez de `api.get()` direto
4. **Erros**: Sempre adicionar try/catch e mostrar mensagens ao usuário
5. **Console**: Verificar browser DevTools para ver requisições HTTP

---

## 📝 Exemplo de uso em componentes

```tsx
import { useEffect, useState } from "react"
import { userService } from "../../lib/services"
import type { User } from "../../lib/types"

export default function MyComponent() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        const data = await userService.getAll()
        setUsers(data)
      } catch (error) {
        console.error("Erro:", error)
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [])

  return (
    <div>
      {loading ? <p>Carregando...</p> : <p>{users.length} usuários</p>}
    </div>
  )
}
```

