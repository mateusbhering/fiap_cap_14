package com.fiap.fintech.fintech_back_end;

import jakarta.persistence.*;

@Entity
@Table(name = "contas")
public class Conta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_conta", nullable = false, unique = true)
    private String numeroConta;

    @Column(name = "saldo", nullable = false)
    private Double saldo;

    @Column(name = "tipo_conta", nullable = false)
    private String tipoConta;

    @Column(name = "cliente_id", nullable = false)
    private Long clienteId;

    public Conta() {}

    public Conta(String numeroConta, Double saldo, String tipoConta, Long clienteId) {
        this.numeroConta = numeroConta;
        this.saldo = saldo;
        this.tipoConta = tipoConta;
        this.clienteId = clienteId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroConta() {
        return numeroConta;
    }

    public void setNumeroConta(String numeroConta) {
        this.numeroConta = numeroConta;
    }

    public Double getSaldo() {
        return saldo;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }

    public String getTipoConta() {
        return tipoConta;
    }

    public void setTipoConta(String tipoConta) {
        this.tipoConta = tipoConta;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }
}
