package com.fiap.fintech.fintech_back_end;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ClienteRepository clienteRepository;

    public DataInitializer(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verificar se já existem dados
        if (clienteRepository.count() == 0) {
            // Criar usuários padrão
            Cliente cliente1 = new Cliente("João Silva", "joao@example.com", "123.456.789-00");
            Cliente cliente2 = new Cliente("Maria Santos", "maria@example.com", "987.654.321-00");
            Cliente cliente3 = new Cliente("Pedro Costa", "pedro@example.com", "456.789.123-00");

            clienteRepository.save(cliente1);
            clienteRepository.save(cliente2);
            clienteRepository.save(cliente3);

            System.out.println("\n========================================");
            System.out.println("✅ Usuários padrão criados com sucesso!");
            System.out.println("========================================");
            System.out.println("📧 Credenciais para LOGIN:");
            System.out.println("   Email: joao@example.com");
            System.out.println("   Senha: qualquer valor");
            System.out.println("\n   Email: maria@example.com");
            System.out.println("   Senha: qualquer valor");
            System.out.println("\n   Email: pedro@example.com");
            System.out.println("   Senha: qualquer valor");
            System.out.println("========================================\n");
        }
    }
}
