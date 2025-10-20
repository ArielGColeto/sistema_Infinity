package com.Infinity.cadastro.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "estados")
public class estado {
    @Id
    int uf;
    String descricao;
    int cd_estado;

    public int getUf() {
        return uf;
    }

    public void setUf(int uf) {
        this.uf = uf;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public int getCd_estado() {
        return cd_estado;
    }

    public void setCd_estado(int cd_estado) {
        this.cd_estado = cd_estado;
    }
}
