#!/bin/bash

# ================================================
# Script para gerenciar banco de dados Fintech
# ================================================

echo "🗄️  Gerenciador de Banco de Dados - Fintech"
echo "================================================"
echo ""
echo "Escolha uma opção:"
echo ""
echo "1. ✅ Verificar se MySQL está rodando"
echo "2. 🚀 Iniciar MySQL"
echo "3. 🛑 Parar MySQL"
echo "4. 📊 Criar banco de dados 'fintechdb'"
echo "5. 👁️  Ver usuários do banco"
echo "6. 🔄 Reiniciar Backend com novo banco"
echo "7. ❌ Sair"
echo ""

read -p "Digite sua escolha (1-7): " choice

case $choice in
    1)
        echo ""
        echo "🔍 Verificando MySQL..."
        mysql -u root -p -e "SELECT VERSION();" 2>/dev/null && echo "✅ MySQL está rodando!" || echo "❌ MySQL não está rodando"
        ;;
    2)
        echo ""
        echo "🚀 Iniciando MySQL..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            mysql.server start
        else
            sudo systemctl start mysql
        fi
        echo "✅ MySQL iniciado!"
        ;;
    3)
        echo ""
        echo "🛑 Parando MySQL..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            mysql.server stop
        else
            sudo systemctl stop mysql
        fi
        echo "✅ MySQL parado!"
        ;;
    4)
        echo ""
        echo "📊 Criando banco de dados..."
        mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS fintechdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" && echo "✅ Banco 'fintechdb' criado!" || echo "❌ Erro ao criar banco"
        ;;
    5)
        echo ""
        echo "👁️  Usuários no banco:"
        mysql -u root -p fintechdb -e "SELECT id, nome, email, cpf FROM clientes;" 2>/dev/null || echo "❌ Banco não encontrado ou vazio"
        ;;
    6)
        echo ""
        echo "🔄 Reiniciando Backend..."
        pkill -f "spring-boot:run" 2>/dev/null
        sleep 2
        cd /Users/mateus/Desktop/cap14/fintech_back_end
        ./mvnw spring-boot:run
        ;;
    7)
        echo "❌ Saindo..."
        exit 0
        ;;
    *)
        echo "❌ Opção inválida!"
        ;;
esac

echo ""
