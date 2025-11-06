package com.fiap.fintech.fintech_back_end;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contas")
public class ContaController {

    @Autowired
    private ContaService contaService;

    @GetMapping
    public List<Conta> listarTodas() {
        return contaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Conta> buscarPorId(@PathVariable Long id) {
        Conta conta = contaService.buscarPorId(id);
        if (conta == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(conta);
    }

    @PostMapping
    public Conta criar(@RequestBody Conta conta) {
        return contaService.salvar(conta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Conta> atualizar(@PathVariable Long id, @RequestBody Conta contaAtualizada) {
        Conta conta = contaService.atualizar(id, contaAtualizada);
        if (conta == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(conta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean removido = contaService.deletar(id);
        if (!removido) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
