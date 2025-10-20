package com.Infinity.cadastro.controller;

import com.Infinity.cadastro.model.cidade;
import com.Infinity.cadastro.repository.cidadeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cidades")
public class cidadeController {

    private final cidadeRepo cidadeRepo;

    @Autowired
    public cidadeController(cidadeRepo cidadeRepo)
    {
        this.cidadeRepo=cidadeRepo;
    }

    @PostMapping
    public cidade salvar(@RequestBody cidade cidade)
    {
        return cidadeRepo.save(cidade);
    }

    @GetMapping
    public List<cidade> listar()
    {
        return cidadeRepo.findAll();
    }

    @PutMapping("/{id}")
    public cidade  atualizar(@PathVariable int id, @RequestBody cidade cidade)
    {
        cidade.setCd_cidade(id);
        return cidadeRepo.save(cidade);
    }

}
