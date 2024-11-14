package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.Analito;
import com.laboratorio.labanalise.DTO.TipoAnalitoDto; // Certifique-se de que este DTO esteja criado
import com.laboratorio.labanalise.repositories.AnalitoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnalitoService {

    @Autowired
    private AnalitoRepository repository;

    public Analito salvar(Analito analito) {
        return repository.save(analito);
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public Analito buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Analito> buscarTodos() {
        return repository.findAll();
    }

    // Métodos para buscar classificações, tipos e subtipos
    public List<String> buscarClassificacoesDistintas() {
        return repository.findDistinctClassificacoes();
    }

    public List<String> buscarTiposDistintos() {
        return repository.findDistinctTipos();
    }

    public List<String> buscarSubtiposDistintos() {
        return repository.findDistinctSubtipos();
    }
    public Long buscarIdPorNome(String classificacao) {
        return repository.findIdByClassificacao(classificacao);
    }
    
    // Novo método para adicionar tipoAnalito a uma classificação existente
    public void adicionarTipoAnalito(Long classificacaoId, TipoAnalitoDto tipoAnalitoDto) {
        Optional<Analito> analitoOptional = repository.findById(classificacaoId);

        if (analitoOptional.isPresent()) {
            Analito analito = analitoOptional.get();
            analito.adicionarTipo(tipoAnalitoDto.getTipoAnalito(), tipoAnalitoDto.getSubtipos());
            repository.save(analito);
        } else {
            throw new RuntimeException("Classificação não encontrada com o ID: " + classificacaoId);
        }
    }
}