package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.DTO.ReagenteDTO;
import com.laboratorio.labanalise.mapper.ReagenteMapper;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.TipoReagente;
import com.laboratorio.labanalise.repositories.ReagenteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.util.HashMap;

import java.util.List;

@Service
public class ReagenteService {

    @Autowired
    public ReagenteRepository repository;

    @Autowired
    private MovimentacaoReagenteService movimentacaoReagenteService;
    private final ReagenteMapper reagenteMapper;



    public ReagenteService(ReagenteRepository reagenteRepository, ReagenteMapper reagenteMapper) {
        this.repository = reagenteRepository;
        this.reagenteMapper = reagenteMapper;
    }
    public Reagente salvar(Reagente reagente) {

        reagente = repository.save(reagente);
        movimentacaoReagenteService.registrarMovimentacaoInicial(reagente);
        return reagente;
    }

    @Transactional
    public Reagente atualizarReagente(Long id, Reagente reagenteNovo) {
        Reagente reagente = repository.findById(id).orElse(null);
        atualizarDados(reagente, reagenteNovo);
        registrarMovimentacao(reagenteNovo, reagente);
        return repository.save(reagente);
    }

    private void registrarMovimentacao(Reagente reagenteNovo, Reagente reagente) {
        movimentacaoReagenteService.registarMovimentacaoDeEntrada(reagente, reagenteNovo);
    }

    private void atualizarDados(Reagente reagente, Reagente reagenteNovo) {
        reagente.setNome(reagenteNovo.getNome());
        reagente.setDataValidade(reagenteNovo.getDataValidade());
        reagente.setQuantidadePorFrasco(reagenteNovo.getQuantidadePorFrasco());
        reagente.setQuantidadeDeFrascos(reagenteNovo.getQuantidadeDeFrascos());
        reagente.setLote(reagenteNovo.getLote());
        reagente.setQuantidadeAtual(reagenteNovo.getQuantidadeAtual());
        reagente.setQuantidadeTotal(reagente.getQuantidadeTotal() + reagenteNovo.getQuantidadeAtual());
    }

    public void remover(Long id) {
        repository.deleteById(id);
    }

    public Reagente buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Reagente> buscarTodos() {
        return repository.findAll();
    }

    public List<Reagente> listarReagentesVencidos() {
        return repository.reagentesVencidos();
    }

    public Integer obterTotalDeFrascos() {
        return repository.somarTodosOsFrascos();
    }

    public Map<TipoReagente, Long> contarPorTipo() {
        List<Object[]> resultados = repository.countReagentesByTipo();
        Map<TipoReagente, Long> mapa = new HashMap<>();
        for (Object[] obj : resultados) {
            TipoReagente tipo = (TipoReagente) obj[0];
            Long count = (Long) obj[1];
            mapa.put(tipo, count);
        }
        return mapa;
    }

    public long contarProximosAVencer15Dias() {
        LocalDate hoje = LocalDate.now();
        LocalDate quinzeDias = hoje.plusDays(15);
        return repository.proximosAVencer15Dias(hoje, quinzeDias).size();
    }

    public long contarVencemEm30Dias() {
        LocalDate quinzeDias = LocalDate.now().plusDays(15);
        LocalDate trintaDias = LocalDate.now().plusDays(30);
        return repository.vencemEm30Dias(quinzeDias, trintaDias).size();
    }

    public Map<String, Long> getDadosGraficoValidade() {
        LocalDate hoje = LocalDate.now();
        LocalDate quinzeDias = hoje.plusDays(15);
        LocalDate trintaDias = hoje.plusDays(30);

        long vencidos = repository.reagentesVencidos().size();
        long vencemEm15Dias = repository.proximosAVencer15Dias(hoje, quinzeDias).size();
        long vencemEntre15e30Dias = repository.vencemEm30Dias(quinzeDias, trintaDias).size();

        Map<String, Long> resultado = new HashMap<>();
        resultado.put("vencidos", vencidos);
        resultado.put("vencemEm15Dias", vencemEm15Dias);
        resultado.put("vencemEntre15e30Dias", vencemEntre15e30Dias);

        return resultado;
    }

    public long contarReagentesControlados() {
        return repository.contarReagentesControlados();
    }


       public List<ReagenteDTO> buscarPorNome(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome).stream()
                .map(reagenteMapper::toDTO)
                .collect(Collectors.toList());
    }

    
}
