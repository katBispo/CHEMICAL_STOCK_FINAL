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

    public void registarMovimentacaoDeEntrada(Reagente reagente,Reagente novo) {
        MovimentacaoReagente movimentacaoReagenteEntrada = new MovimentacaoReagente();
        criarMovimentacaoEntrada(reagente,novo,movimentacaoReagenteEntrada);
        repository.save(movimentacaoReagenteEntrada);
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
        movimentacao.setQuantidadeAlterada(reagente.getQuantidadeAtual());
        movimentacao.setQuantidadeFinal(reagente.getQuantidadeAtual().doubleValue() + novo.getQuantidadeAtual());
    }


    /*
    // Método para registrar a entrada de um reagente
    public void registrarEntrada(Reagente reagente) {
        // Verifica se a quantidade de frascos e volume por frasco é válida antes de realizar a movimentação
        if (reagente.getQtdFrascos() > 0 && reagente.getVolumePorFrasco() > 0) {
            MovimentacaoReagente movimentacaoReagente = new MovimentacaoReagente();
            movimentacaoReagente.setReagente(reagente);
            movimentacaoReagente.setQuantidadeAlterada(reagente.getQtdFrascos() * reagente.getVolumePorFrasco());
            movimentacaoReagente.setQuantidadeFinal(movimentacaoReagente.getQuantidadeAlterada());
            movimentacaoReagente.setTipoMovimentacao(TipoMovimentacao.ENTRADA);
            movimentacaoReagente.setDataMovimentacao(java.time.LocalDate.now()); // Definindo a data da movimentação
            movimentacaoReagente.setMotivo("Cadastro inicial");

            // Salva a movimentação no banco de dados
            salvar(movimentacaoReagente);
        } else {
            // Lógica de erro ou exceção se os dados forem inválidos
            throw new IllegalArgumentException("Quantidade de frascos ou volume por frasco inválido.");
        }
    }*/

}