package com.fiap.fintech.fintech_back_end;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ContaService {

    @Autowired
    private ContaRepository repository;

    public List<Conta> listarTodas() {
        return repository.findAll();
    }

    public Conta buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Conta salvar(Conta conta) {
        return repository.save(conta);
    }

    public Conta atualizar(Long id, Conta contaAtualizada) {
        if (!repository.existsById(id)) {
            return null;
        }
        contaAtualizada.setId(id);
        return repository.save(contaAtualizada);
    }

    public boolean deletar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
