# 🏦 Fintech - Gerenciador de Contas Bancárias

Um aplicativo web moderno para gerenciamento de contas bancárias e transações financeiras, desenvolvido com **React** no frontend e **Spring Boot** no backend.

##  Funcionalidades

-  **Autenticação de Usuários** - Login e gerenciamento de sessões
-  **Gerenciamento de Contas** - Criar e consultar contas bancárias
-  **Transações Financeiras** - Registrar depósitos, saques e transferências
-  **Extrato de Conta** - Visualizar histórico de transações
-  **Interface Responsiva** - Design moderno e amigável

##  Tecnologias

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Axios** - Cliente HTTP

### Backend
- **Java 21** - Linguagem principal
- **Spring Boot 3.5.7** - Framework web
- **Spring Data JPA** - Acesso a dados
- **Hibernate** - ORM
- **H2 Database** - Banco de dados em memória
- **Maven** - Gerenciador de dependências

## 📋 Pré-requisitos

- **Node.js** 18+ (para o frontend)
- **Java 21** (para o backend)
- **Maven** (incluído no projeto)

##  Como Executar

### 1️⃣ Clone o repositório
```bash
git clone <seu-repositorio>
cd fintech-final
```

### 2️⃣ Inicie o Backend

```bash
cd fintech_back_end
./mvnw spring-boot:run
```

O backend estará disponível em: **http://localhost:8080**

### 3️⃣ Inicie o Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

## 👤 Credenciais de Teste

O sistema vem com usuários padrão pré-configurados:

| Email | Senha |
|-------|-------|
| joao@example.com | qualquer valor |
| maria@example.com | qualquer valor |
| pedro@example.com | qualquer valor |

## 📁 Estrutura do Projeto

```
fintech-final/
├── frontend/                  # Aplicação React
│   ├── src/
│   │   ├── pages/            # Páginas principais
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── context/          # Context API (autenticação)
│   │   ├── lib/              # Funções utilitárias e API
│   │   └── main.tsx          # Ponto de entrada
│   └── package.json
│
├── fintech_back_end/         # Aplicação Spring Boot
│   ├── src/
│   │   ├── main/java/        # Código-fonte
│   │   │   └── com/fiap/fintech/fintech_back_end/
│   │   │       ├── models/   # Entidades JPA
│   │   │       ├── controllers/ # Endpoints REST
│   │   │       ├── repositories/ # Acesso a dados
│   │   │       └── config/   # Configurações
│   │   └── resources/
│   │       └── application.properties
│   └── pom.xml
│
└── README.md
```

## 📡 API Endpoints Principais

### Autenticação
- `POST /api/login` - Realizar login

### Clientes
- `GET /api/clientes` - Listar clientes
- `GET /api/clientes/{id}` - Obter cliente
- `POST /api/clientes` - Criar cliente

### Contas
- `GET /api/contas` - Listar contas
- `POST /api/contas` - Criar conta
- `GET /api/contas/{id}` - Obter conta

### Transações
- `GET /api/transacoes` - Listar transações
- `POST /api/transacoes` - Criar transação
- `GET /api/contas/{id}/transacoes` - Extrato de conta

## 🔧 Desenvolvimento

### Comandos Úteis

**Frontend:**
```bash
npm run dev      # Iniciar servidor de desenvolvimento
npm run build    # Build para produção
npm run lint     # Verificar erros com ESLint
npm run preview  # Preview da build
```

**Backend:**
```bash
./mvnw clean    # Limpar build
./mvnw compile  # Compilar
./mvnw test     # Executar testes
```

## 🗄️ Banco de Dados

O projeto utiliza **H2 Database** (em memória), que é automaticamente inicializado ao iniciar o backend.

**Console H2:** http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Usuário: `sa`
- Senha: (deixe em branco)

## 📝 Notas Importantes

- O banco de dados H2 é resetado a cada inicialização do backend
- Os usuários padrão são criados automaticamente ao iniciar
- A aplicação está configurada para desenvolvimento local

## 🐛 Troubleshooting

### Erro: "Table CLIENTES not found"
- Reinicie o backend: `./mvnw spring-boot:run`

### Porta 8080/5173 já em uso?
- Mude as portas em `application.properties` (backend) ou `vite.config.ts` (frontend)

### Npm packages não instalados?
```bash
cd frontend
npm install
```

## 📞 Suporte

Para mais informações, consulte os arquivos de documentação no diretório raiz.

---

**Desenvolvido com ❤️ para FIAP**
