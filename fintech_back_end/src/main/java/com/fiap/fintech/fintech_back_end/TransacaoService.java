package com.fiap.fintech.fintech_back_end;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository repository;

    public List<Transacao> listarTodas() {
        return repository.findAll();
    }

    public Transacao buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Transacao salvar(Transacao transacao) {
        return repository.save(transacao);
    }

    public boolean deletar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
