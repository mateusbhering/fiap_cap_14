# =====================================================
# CONFIGURACAO DO BANCO DE DADOS - SPRING BOOT FINTECH
# =====================================================

# Escolha uma das opcoes abaixo:

# ============== OPCAO 1: H2 (Em Memoria) ==============
# Use para testes rapidos - nao precisa instalar nada
# Os dados sao perdidos quando o servidor reinicia

# spring.datasource.url=jdbc:h2:mem:testdb
# spring.datasource.driverClassName=org.h2.Driver
# spring.datasource.username=sa
# spring.datasource.password=
# spring.jpa.hibernate.ddl-auto=create-drop
# spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
# spring.h2.console.enabled=true

# ============== OPCAO 2: MySQL (Recomendado) ==============
# Use para ambiente de desenvolvimento/producao
# Dados persistem mesmo apos reiniciar

# Passo 1: Instalar MySQL (se nao tiver)
#   - macOS: brew install mysql
#   - Windows: https://dev.mysql.com/downloads/mysql/
#   - Linux: sudo apt-get install mysql-server

# Passo 2: Iniciar MySQL
#   - macOS: mysql.server start
#   - Outros: mysql.server start (ou mysqld)

# Passo 3: Criar banco de dados
#   - mysql -u root -p
#   - CREATE DATABASE fintechdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
#   - EXIT

# Passo 4: Descomente as linhas abaixo

spring.datasource.url=jdbc:mysql://localhost:3306/fintechdb?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=root

# ============== CONFIGURACOES JPA/HIBERNATE ==============
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# ============== CONFIGURACOES DO SERVIDOR ==============
server.port=8080
spring.application.name=fintech_back_end

# ============== LOGGING ==============
logging.level.root=INFO
logging.level.com.fiap.fintech=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
