#  Backend e Frontend Conectados com Sucesso!

##  Status Atual

- **Backend Spring Boot**: Rodando em `http://localhost:8080`
- **Frontend React**: Rodando em `http://localhost:5174`
- **Banco de Dados**: H2 (em memória para testes)

---

##  Como Acessar

### Frontend
Abra em seu navegador: **http://localhost:5174**

### Backend API
- Documentação: http://localhost:8080/swagger-ui.html (será criado em breve)
- Base URL: http://localhost:8080

### Banco de Dados H2
Console: **http://localhost:8080/h2-console**
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (deixe em branco)

---

## 📡 Endpoints Disponíveis

### Autenticação
```
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Clientes (Usuários)
```
GET    /clientes           - Lista todos
GET    /clientes/{id}      - Busca por ID
POST   /clientes           - Cria novo
PUT    /clientes/{id}      - Atualiza
DELETE /clientes/{id}      - Deleta
```

### Contas
```
GET    /contas             - Lista todas
GET    /contas/{id}        - Busca por ID
POST   /contas             - Cria nova
PUT    /contas/{id}        - Atualiza
DELETE /contas/{id}        - Deleta
```

### Transações
```
GET    /transacoes         - Lista todas
GET    /transacoes/{id}    - Busca por ID
POST   /transacoes         - Cria nova
DELETE /transacoes/{id}    - Deleta
```

---

## 🔧 Como Parar os Servidores

### Backend
Pressione `Ctrl + C` no terminal

### Frontend
Pressione `Ctrl + C` no terminal

---

## 📝 Próximas Tarefas

### Backend (Java/Spring)
- [ ] Implementar autenticação real com JWT
- [ ] Usar banco MySQL em produção
- [ ] Adicionar validações de entrada
- [ ] Criar endpoints adicionais
- [ ] Implementar tratamento de erros global

### Frontend (React)
- [ ] Fazer login e testar autenticação
- [ ] Listar usuários do backend
- [ ] Criar formulários de cadastro
- [ ] Listar contas
- [ ] Listar transações
- [ ] Melhorar UI/UX

---

## 🐛 Possíveis Problemas

### "Port already in use"
```bash
# Matar processo na porta 8080 (Backend)
lsof -i :8080 | grep -v COMMAND | awk '{print $2}' | xargs kill -9

# Matar processo na porta 5173/5174 (Frontend)
lsof -i :5173 | grep -v COMMAND | awk '{print $2}' | xargs kill -9
```

### CORS Error
Verifique se o `CorsConfig.java` está correto em:
`src/main/java/com/fiap/fintech/fintech_back_end/config/CorsConfig.java`

### Banco de dados não conecta
Você está usando H2 em memória, nenhuma configuração necessária. Os dados serão perdidos ao reiniciar o servidor.

Para usar MySQL em produção, atualize `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/fintechdb
spring.datasource.username=root
spring.datasource.password=sua_senha
```

---

##  Suporte

Para mais informações sobre a configuração, veja o arquivo:
`CONEXAO_FRONTEND_BACKEND.md`
