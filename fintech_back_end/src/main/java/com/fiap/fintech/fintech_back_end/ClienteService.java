package com.fiap.fintech.fintech_back_end;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public List<Cliente> listarTodos() {
        return repository.findAll();
    }

    public Cliente buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Cliente salvar(Cliente cliente) {
        return repository.save(cliente);
    }

    public Cliente atualizar(Long id, Cliente clienteAtualizado) {
        if (!repository.existsById(id)) {
            return null;
        }
        clienteAtualizado.setId(id);
        return repository.save(clienteAtualizado);
    }

    public boolean deletar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
