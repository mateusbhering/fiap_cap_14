# 🗄️ Conexão com Banco de Dados - Guia Rápido

## ✅ Status Atual

Você está usando **MySQL** com dados iniciais. Quando iniciar o servidor, 3 usuários serão criados automaticamente.

---

## 📊 Credenciais para Login

Use qualquer uma dessas contas para fazer login na aplicação:

| Email               | CPF            | Senha          |
| ------------------- | -------------- | -------------- |
| `joao@example.com`  | 123.456.789-00 | qualquer valor |
| `maria@example.com` | 987.654.321-00 | qualquer valor |
| `pedro@example.com` | 456.789.123-00 | qualquer valor |

---

## 🚀 Como Conectar ao MySQL

### **Passo 1: Instalar MySQL**

#### macOS (com Homebrew)

```bash
brew install mysql
```

#### Windows

Baixe em: https://dev.mysql.com/downloads/mysql/

#### Linux (Ubuntu/Debian)

```bash
sudo apt-get install mysql-server
```

---

### **Passo 2: Iniciar o MySQL**

#### macOS

```bash
mysql.server start
```

#### Linux

```bash
sudo systemctl start mysql
```

#### Windows

O serviço geralmente inicia automaticamente

---

### **Passo 3: Criar o Banco de Dados**

```bash
# Entre no MySQL
mysql -u root -p

# Se pediu senha e não sabe, apenas pressione ENTER para macOS/Linux

# Dentro do MySQL, execute:
CREATE DATABASE fintechdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

---

### **Passo 4: Verificar Conexão**

```bash
# Teste a conexão
mysql -u root -p fintechdb

# Você deve ver a prompt do MySQL
```

---

## 🔧 Configuração do Backend

O arquivo `application.properties` já está configurado para MySQL:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/fintechdb?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
```

**Se sua senha do MySQL é diferente, altere aqui:**

```bash
# Abra este arquivo:
fintech_back_end/src/main/resources/application.properties

# Procure por:
spring.datasource.password=root

# E mude para sua senha
```

---

## 🔄 Reiniciar o Backend

```bash
# 1. Matar processo anterior
pkill -f "spring-boot:run"

# 2. Rodar novamente
cd /Users/mateus/Desktop/cap14/fintech_back_end
./mvnw spring-boot:run
```

Você deve ver na saída:

```
✅ Usuários padrão criados com sucesso!
   Email: joao@example.com
   Email: maria@example.com
   Email: pedro@example.com
```

---

## 🐛 Possíveis Problemas

### **1. "Communications link failure" ou "Connection refused"**

**Solução:**

```bash
# Verifique se MySQL está rodando
mysql -u root -p

# Se não funcionar, inicie:
mysql.server start  # macOS
sudo systemctl start mysql  # Linux
```

### **2. "Access denied for user 'root'@'localhost'"**

**Solução:**
Altere a senha no arquivo `application.properties`:

```properties
spring.datasource.password=sua_senha_correta
```

### **3. "Database 'fintechdb' doesn't exist"**

**Solução:**

```bash
mysql -u root -p
CREATE DATABASE fintechdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### **4. Sem dados iniciais no banco**

Se os usuários não foram criados, execute manualmente no MySQL:

```sql
INSERT INTO clientes (nome, email, cpf) VALUES
('João Silva', 'joao@example.com', '123.456.789-00'),
('Maria Santos', 'maria@example.com', '987.654.321-00'),
('Pedro Costa', 'pedro@example.com', '456.789.123-00');
```

---

## 📱 Testar Login no Frontend

1. Abra http://localhost:5174
2. Clique em Login
3. Digite: `joao@example.com`
4. Senha: `qualquer coisa`
5. Clique em Sign in

---

## 💾 Visualizar Dados do Banco

### Opção 1: Usar MySQL CLI

```bash
mysql -u root -p fintechdb

# Ver tabelas
SHOW TABLES;

# Ver usuários
SELECT * FROM clientes;

# Ver contas
SELECT * FROM contas;

# Ver transações
SELECT * FROM transacoes;
```

### Opção 2: Usar ferramenta visual

- **DBeaver** (gratuito): https://dbeaver.io/
- **MySQL Workbench**: https://www.mysql.com/products/workbench/
- **TablePlus**: https://tableplus.com/

---

## 🔄 Voltar para H2 (Banco em Memória)

Se quiser testar rápido sem MySQL:

1. Edite `fintech_back_end/src/main/resources/application.properties`
2. Comente as linhas de MySQL
3. Descomente as linhas de H2
4. Reinicie o backend

---

## 📞 Resumo Rápido

✅ **MySQL instalado?** → Crie o banco com `CREATE DATABASE fintechdb`
✅ **Backend rodando?** → Veja se tem dados: `mysql -u root -p fintechdb`
✅ **Login não funciona?** → Verifique a senha em `application.properties`
✅ **Sem usuários?** → Rode o INSERT no MySQL ou reinicie o backend
