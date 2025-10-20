package com.Infinity.cadastro.controller;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.Infinity.cadastro.model.pessoa;
import com.Infinity.cadastro.repository.pessoaRepo;


@RestController
@RequestMapping("/pessoas")
public class pessoaController {

    private final  pessoaRepo pessoaRepo;

    public pessoaController(pessoaRepo pessoaRepo)
    {
        this.pessoaRepo = pessoaRepo;
    }

    @PostMapping
    public pessoa salvar(@RequestBody pessoa pessoa)
    {
        return pessoaRepo.save(pessoa);
    }

    @GetMapping
    public List<pessoa> listar()
    {
        return pessoaRepo.findAll();
    }

    @PutMapping("/{id}")
    public pessoa atualizar(@PathVariable int id, @RequestBody pessoa pessoa)
    {
        pessoa.setCd_pessoas(id);
        return pessoaRepo.save(pessoa);
    }
}
