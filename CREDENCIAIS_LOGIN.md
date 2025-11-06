# 🔐 CREDENCIAIS DE LOGIN - Fintech App

## ✅ Banco de Dados Conectado!

O backend está usando **H2 (em memória)** por padrão, mas você pode mudar para **MySQL** se preferir.

---

## 👤 Usuários para Login

Você tem 3 usuários criados automaticamente:

| # | Email | Senha |
|---|-------|-------|
| 1️⃣ | `joao@example.com` | qualquer valor |
| 2️⃣ | `maria@example.com` | qualquer valor |
| 3️⃣ | `pedro@example.com` | qualquer valor |

**Exemplo:**
- Email: `joao@example.com`
- Senha: `123456` (ou qualquer texto)
- Clique em "Sign in"

---

## 🔄 Como Usar o Banco de Dados

### Opção 1: H2 (Padrão - Sem Instalação)
✅ **Já está funcionando!**

Console H2: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (deixe vazio)

### Opção 2: MySQL (Persistente)

#### 1. Instalar MySQL:
```bash
# macOS
brew install mysql

# Linux
sudo apt-get install mysql-server

# Windows: https://dev.mysql.com/downloads/mysql/
```

#### 2. Iniciar MySQL:
```bash
mysql.server start  # macOS
sudo systemctl start mysql  # Linux
```

#### 3. Criar banco:
```bash
mysql -u root -p
CREATE DATABASE fintechdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

#### 4. Descomente no `application.properties`:
```properties
# Descomente estas linhas:
spring.datasource.url=jdbc:mysql://localhost:3306/fintechdb?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Comente estas:
# spring.datasource.url=jdbc:h2:mem:testdb
# spring.datasource.driverClassName=org.h2.Driver
```

#### 5. Reinicie o backend:
```bash
pkill -f "spring-boot:run"
cd /Users/mateus/Desktop/cap14/fintech_back_end
./mvnw spring-boot:run
```

---

## 🚀 Usar o Script Gerenciador

```bash
/Users/mateus/Desktop/cap14/gerenciar-bd.sh
```

Opções:
1. ✅ Verificar se MySQL está rodando
2. 🚀 Iniciar MySQL
3. 🛑 Parar MySQL
4. 📊 Criar banco de dados 'fintechdb'
5. 👁️  Ver usuários do banco
6. 🔄 Reiniciar Backend
7. ❌ Sair

---

## 📱 Testar Login

1. Abra: http://localhost:5174
2. Clique em **Login**
3. Email: `joao@example.com`
4. Senha: `teste123`
5. Clique em **Sign in**

---

## 🗄️ Ver Dados do Banco

### Opção 1: H2 Console
http://localhost:8080/h2-console

### Opção 2: MySQL CLI
```bash
mysql -u root -p fintechdb

SHOW TABLES;
SELECT * FROM clientes;
SELECT * FROM contas;
SELECT * FROM transacoes;
```

### Opção 3: Ferramentas Visuais
- **DBeaver**: https://dbeaver.io/
- **MySQL Workbench**: https://www.mysql.com/products/workbench/
- **TablePlus**: https://tableplus.com/

---

## ❌ Se Tiver Problemas

| Problema | Solução |
|----------|---------|
| "Email não encontrado" ao logar | O usuário não foi criado, verifique `DataInitializer.java` |
| MySQL não conecta | Verifique a senha em `application.properties` |
| "Connection refused" | Inicie MySQL: `mysql.server start` |
| Sem usuários no banco | Reinicie o backend após criar o banco |

---

## 📚 Arquivos Importantes

- `application.properties` - Configuração de banco
- `DataInitializer.java` - Cria usuários padrão
- `AuthController.java` - Faz login
- `gerenciar-bd.sh` - Script para gerenciar BD

---

**Status:** ✅ Backend rodando em http://localhost:8080
**Status:** ✅ Frontend rodando em http://localhost:5174
