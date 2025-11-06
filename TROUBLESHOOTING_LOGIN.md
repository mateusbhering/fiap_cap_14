# 🔧 TROUBLESHOOTING - LOGIN NÃO FUNCIONA

## ✅ Checklist de Debug

### 1. Backend está respondendo?
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@example.com","password":"123456"}'
```

**Resposta esperada:**
```json
{"token":"Bearer am9hb0BleGFtcGxlLmNvbTox","message":"Login successful"}
```

Se deu erro, o backend não está rodando!

---

### 2. Frontend está rodando?
Acesse: http://localhost:5175

Se não abrir, rode:
```bash
cd /Users/mateus/Desktop/cap14/frontend
npm run dev
```

---

### 3. Abrir Developer Tools (F12)
1. Abra http://localhost:5175
2. Pressione **F12**
3. Vá para a aba **Console**
4. Vá para a aba **Network**
5. Tente fazer login
6. Procure pela requisição `/auth/login`
7. Veja a resposta

---

## 🔴 Possíveis Erros e Soluções

### Erro: "Failed to fetch" ou "CORS error"
**Problema:** Backend não está respondendo ou CORS não configurado

**Solução:**
1. Verifique se backend está rodando: http://localhost:8080
2. Reinicie o backend
3. Verifique se `CorsConfig.java` está correto

**Teste:**
```bash
curl http://localhost:8080/clientes
```

Se retornar `[]`, o backend está ok.

---

### Erro: "Email não encontrado"
**Problema:** Email errado ou usuários não foram criados

**Solução:**
1. Verifique se está usando um dos 3 emails:
   - joao@example.com
   - maria@example.com
   - pedro@example.com

2. Se nenhum funciona, os usuários não foram criados. Reinicie o backend:
```bash
pkill -f "spring-boot:run"
cd /Users/mateus/Desktop/cap14/fintech_back_end
./mvnw spring-boot:run
```

Aguarde aparecer:
```
✅ Usuários padrão criados com sucesso!
```

---

### Erro: "Cannot GET /login"
**Problema:** Frontend não encontrou a página

**Solução:**
1. Acesse http://localhost:5175 (não 5173 ou 5174)
2. Se der erro, rodou em outra porta. Veja a saída do npm:
```
Local:   http://localhost:5175/
```

---

### Erro: "localhost:8080 refused connection"
**Problema:** Backend não está rodando

**Solução:**
```bash
cd /Users/mateus/Desktop/cap14/fintech_back_end
./mvnw spring-boot:run
```

---

### Token não salva (volta para login após página recarregar)
**Problema:** Token não está sendo salvo no localStorage

**Solução:**
1. Abra DevTools (F12)
2. Vá para **Application** > **Storage** > **Local Storage**
3. Veja se `token` está lá
4. Se não estiver, o login não funcionou

---

## 🧪 Teste Manual do Login

### Terminal 1 - Backend
```bash
cd /Users/mateus/Desktop/cap14/fintech_back_end
./mvnw spring-boot:run
```

### Terminal 2 - Frontend
```bash
cd /Users/mateus/Desktop/cap14/frontend
npm run dev
```

### Terminal 3 - Teste a API
```bash
# Fazer login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@example.com","password":"123456"}'

# Deve retornar:
# {"token":"Bearer ...","message":"Login successful"}
```

---

## 📋 Arquivos Importantes

| Arquivo | Função |
|---------|--------|
| `src/pages/Login.tsx` | Página de login (frontend) |
| `src/context/AuthContext.tsx` | Lógica de autenticação |
| `src/lib/services.ts` | Chamadas à API |
| `src/lib/api.ts` | Configuração do Axios |
| `controller/AuthController.java` | Endpoint de login (backend) |
| `DataInitializer.java` | Cria usuários padrão |
| `.env` | Variáveis de ambiente |

---

## 🎯 Passos Finais

1. Confirme que backend está rodando (veja logs)
2. Confirme que frontend está rodando (veja URL)
3. Abra DevTools (F12) no navegador
4. Tente fazer login
5. Verifique a aba Network para ver a requisição
6. Se houver erro, avise qual mensagem aparece

---

**Se persistir o problema, me mostre:**
- A mensagem de erro exata do console (F12)
- A resposta da requisição no Network
- Os logs do backend
