package com.fiap.fintech.fintech_back_end.controller;

import com.fiap.fintech.fintech_back_end.LoginRequest;
import com.fiap.fintech.fintech_back_end.LoginResponse;
import com.fiap.fintech.fintech_back_end.Cliente;
import com.fiap.fintech.fintech_back_end.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Validação básica
        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email é obrigatório");
        }

        // Procurar cliente por email
        Optional<Cliente> clienteOptional = clienteRepository.findByEmail(loginRequest.getEmail());

        if (clienteOptional.isEmpty()) {
            return ResponseEntity.status(401).body("Email não encontrado");
        }

        Cliente cliente = clienteOptional.get();

        // Gerar um token simples (em produção usar JWT com senha)
        String token = "Bearer " + Base64.getEncoder().encodeToString(
                (cliente.getEmail() + ":" + cliente.getId()).getBytes()
        );

        LoginResponse response = new LoginResponse(token, "Login successful");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<Cliente> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }

        try {
            String token = authHeader.substring(7);
            String decoded = new String(Base64.getDecoder().decode(token));
            String email = decoded.split(":")[0];

            Optional<Cliente> cliente = clienteRepository.findAll().stream()
                    .filter(c -> c.getEmail().equals(email))
                    .findFirst();

            return cliente.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.status(401).build());
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.noContent().build();
    }
}
