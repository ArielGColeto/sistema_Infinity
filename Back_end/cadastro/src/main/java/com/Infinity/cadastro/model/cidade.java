package com.Infinity.cadastro.model;


import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@Entity
@Table(name = "cidades")
@CrossOrigin(origins = "*")
public class cidade {
    @Id
    int cd_cidade;
    String nm_cidade;
    //chave estrangeira?
    String uf;
    int cd_pais;

    public int getCd_cidade() {
        return cd_cidade;
    }

    public void setCd_cidade(int cd_cidade) {
        this.cd_cidade = cd_cidade;
    }

    public String getNm_cidade() {
        return nm_cidade;
    }

    public void setNm_cidade(String nm_cidade) {
        this.nm_cidade = nm_cidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public int getCd_pais() {
        return cd_pais;
    }

    public void setCd_pais(int cd_pais) {
        this.cd_pais = cd_pais;
    }
}
