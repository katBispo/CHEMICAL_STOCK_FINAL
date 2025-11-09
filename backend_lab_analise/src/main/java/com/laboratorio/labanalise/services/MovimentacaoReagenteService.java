package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.model.MovimentacaoReagente;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.TipoMovimentacao;
import com.laboratorio.labanalise.repositories.MovimentacaoReagenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MovimentacaoReagenteService {

    @Autowired
    private MovimentacaoReagenteRepository repository;


    public MovimentacaoReagente salvar(MovimentacaoReagente movimentacaoReagente) {
        return repository.save(movimentacaoReagente);
    }

    public List<MovimentacaoReagente> listarTodasMovimentações() {
        List<MovimentacaoReagente> lista = repository.findAll();
        return lista;
    }

    public MovimentacaoReagente registarMovimentacaoDeEntrada(Reagente reagente, Reagente novo) {
        MovimentacaoReagente movimentacaoReagenteEntrada = new MovimentacaoReagente();
        criarMovimentacaoEntrada(reagente, novo, movimentacaoReagenteEntrada);
        return repository.save(movimentacaoReagenteEntrada);
    }

    public void registrarMovimentacaoInicial(Reagente reagente) {
        MovimentacaoReagente movimentacao = new MovimentacaoReagente();
        criarMovimentacaoInicial(reagente, movimentacao);
        repository.save(movimentacao);

    }

    private void criarMovimentacaoInicial(Reagente reagente, MovimentacaoReagente movimentacao) {
        movimentacao.setTipoMovimentacao(TipoMovimentacao.ENTRADA);
        movimentacao.setReagente(reagente);
        movimentacao.setDataMovimentacao(LocalDate.now());
        movimentacao.setQuantidadeAlterada(reagente.getQuantidadeAtual());
        movimentacao.setQuantidadeFinal(reagente.getQuantidadeAtual());
    }

    private void criarMovimentacaoEntrada(Reagente reagente, Reagente novo, MovimentacaoReagente movimentacao) {
        movimentacao.setTipoMovimentacao(TipoMovimentacao.ENTRADA);
        movimentacao.setReagente(reagente);
        movimentacao.setDataMovimentacao(LocalDate.now());
        movimentacao.setQuantidadeAlterada(novo.getQuantidadeTotal());
        movimentacao.setQuantidadeFinal(novo.getQuantidadeTotal());
    }

    public void registrarMovimentacaoDeSaida(Reagente reagente, Double quantidadeRemovida) {
        if (quantidadeRemovida <= 0) {
            throw new IllegalArgumentException("A quantidade de saída deve ser maior que zero.");
        }

        if (reagente.getQuantidadeTotal() < quantidadeRemovida) {
            throw new IllegalArgumentException("Quantidade insuficiente em estoque para saída.");
        }

        MovimentacaoReagente movimentacaoReagenteSaida = new MovimentacaoReagente();
        movimentacaoReagenteSaida.setTipoMovimentacao(TipoMovimentacao.SAIDA);
        movimentacaoReagenteSaida.setReagente(reagente);
        movimentacaoReagenteSaida.setDataMovimentacao(LocalDate.now());
        movimentacaoReagenteSaida.setQuantidadeAlterada(quantidadeRemovida);

        double novaQuantidade = Math.max(0, reagente.getQuantidadeTotal() - quantidadeRemovida);
        movimentacaoReagenteSaida.setQuantidadeFinal(novaQuantidade);

        repository.save(movimentacaoReagenteSaida);
    }
    /*public void registrarMovimentacaoDeSaida(Reagente reagente, Reagente novo) {
        if (novo.getQuantidadeTotal() <= 0) {
            throw new IllegalArgumentException("A quantidade de saída deve ser maior que zero.");
        }

        if (reagente.getQuantidadeTotal() < novo.getQuantidadeTotal()) {
            throw new IllegalArgumentException("Quantidade insuficiente em estoque para saída.");
        }

        MovimentacaoReagente movimentacaoReagenteSaida = new MovimentacaoReagente();
        movimentacaoReagenteSaida.setTipoMovimentacao(TipoMovimentacao.SAIDA);
        movimentacaoReagenteSaida.setReagente(reagente);
        movimentacaoReagenteSaida.setDataMovimentacao(LocalDate.now());
        movimentacaoReagenteSaida.setQuantidadeAlterada(novo.getQuantidadeTotal());

        double novaQuantidade = Math.max(0, reagente.getQuantidadeTotal() - novo.getQuantidadeTotal());
        movimentacaoReagenteSaida.setQuantidadeFinal(novaQuantidade);

        repository.save(movimentacaoReagenteSaida);
    }*/

}