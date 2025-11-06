package com.fiap.fintech.fintech_back_end;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transacoes")
public class TransacaoController {

    @Autowired
    private TransacaoService transacaoService;

    @GetMapping
    public List<Transacao> listarTodas() {
        return transacaoService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transacao> buscarPorId(@PathVariable Long id) {
        Transacao transacao = transacaoService.buscarPorId(id);
        if (transacao == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(transacao);
    }

    @PostMapping
    public Transacao criar(@RequestBody Transacao transacao) {
        return transacaoService.salvar(transacao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean removido = transacaoService.deletar(id);
        if (!removido) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
