package com.fiap.fintech.fintech_back_end;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transacoes")
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "conta_id", nullable = false)
    private Long contaId;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    @Column(name = "valor", nullable = false)
    private Double valor;

    @Column(name = "tipo", nullable = false)
    private String tipo;

    @Column(name = "data_transacao", nullable = false)
    private LocalDateTime dataTransacao;

    public Transacao() {
        this.dataTransacao = LocalDateTime.now();
    }

    public Transacao(Long contaId, String descricao, Double valor, String tipo) {
        this.contaId = contaId;
        this.descricao = descricao;
        this.valor = valor;
        this.tipo = tipo;
        this.dataTransacao = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getContaId() {
        return contaId;
    }

    public void setContaId(Long contaId) {
        this.contaId = contaId;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public LocalDateTime getDataTransacao() {
        return dataTransacao;
    }

    public void setDataTransacao(LocalDateTime dataTransacao) {
        this.dataTransacao = dataTransacao;
    }
}
