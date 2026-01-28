package com.laboratorio.labanalise.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.DTO.ReagenteDTO;
import com.laboratorio.labanalise.DTO.SaidaReagenteDTO;
import com.laboratorio.labanalise.mapper.ReagenteMapper;
import com.laboratorio.labanalise.model.FrascoReagente;
import com.laboratorio.labanalise.model.MovimentacaoReagente;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.StatusFrasco;
import com.laboratorio.labanalise.model.enums.TipoMovimentacao;
import com.laboratorio.labanalise.model.enums.TipoReagente;
import com.laboratorio.labanalise.repositories.FrascoReagenteRepository;
import com.laboratorio.labanalise.repositories.ReagenteRepository;

import jakarta.transaction.Transactional;

@Service
public class ReagenteService {

    private final ReagenteRepository repository;
    private final MovimentacaoReagenteService movimentacaoReagenteService;
    private final ReagenteMapper reagenteMapper;
    private final FrascoReagenteService frascoReagenteService;

    private final FrascoReagenteRepository frascoReagenteRepository;

    public ReagenteService(
            ReagenteRepository repository,
            MovimentacaoReagenteService movimentacaoReagenteService,
            ReagenteMapper reagenteMapper,
            FrascoReagenteService frascoReagenteService,
            FrascoReagenteRepository frascoReagenteRepository
    ) {
        this.repository = repository;
        this.movimentacaoReagenteService = movimentacaoReagenteService;
        this.reagenteMapper = reagenteMapper;
        this.frascoReagenteService = frascoReagenteService;
        this.frascoReagenteRepository = frascoReagenteRepository;
    }

    // =========================
    // CADASTRO DE REAGENTE
    // =========================
    @Transactional
    public Reagente salvar(Reagente reagente) {

        Reagente reagenteSalvo = repository.save(reagente);

        criarFrascosIniciais(reagenteSalvo);

        movimentacaoReagenteService.registrarMovimentacaoInicial(reagenteSalvo);

        return reagenteSalvo;
    }

    // =========================
    // ATUALIZAÇÃO DE REAGENTE
    // =========================
    @Transactional
    public Reagente atualizarReagente(Long id, Reagente reagenteNovo) {

        Reagente reagente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reagente não encontrado"));

        int frascosEntrada = reagenteNovo.getQuantidadeDeFrascos();

        if (frascosEntrada <= 0) {
            throw new IllegalArgumentException("Quantidade de frascos inválida");
        }

        // 🔹 SOMA ao estoque existente (regra de negócio correta)
        int totalFrascos = reagente.getQuantidadeDeFrascos() + frascosEntrada;
        reagente.setQuantidadeDeFrascos(totalFrascos);

        // 🔹 Atualiza apenas dados que realmente podem mudar na reposição
        reagente.setDataValidade(reagenteNovo.getDataValidade());
        reagente.setQuantidadePorFrasco(reagenteNovo.getQuantidadePorFrasco());
        reagente.setLote(reagenteNovo.getLote());

        // ❌ NÃO setar atualizadoEm
        // O Spring Data JPA faz isso automaticamente via @LastModifiedDate
        // 🔹 Cria os novos frascos físicos
        criarNovosFrascos(reagente, frascosEntrada);

        return repository.save(reagente);
    }

    // =========================
    // MÉTODOS AUXILIARES
    // =========================
    private void atualizarDadosBasicos(Reagente reagente, Reagente reagenteNovo) {
        reagente.setNome(reagenteNovo.getNome());
        reagente.setDataValidade(reagenteNovo.getDataValidade());
        reagente.setQuantidadePorFrasco(reagenteNovo.getQuantidadePorFrasco());
        reagente.setQuantidadeDeFrascos(reagenteNovo.getQuantidadeDeFrascos());
        reagente.setLote(reagenteNovo.getLote());
    }

    private void criarFrascosIniciais(Reagente reagente) {
        criarNovosFrascos(reagente, reagente.getQuantidadeDeFrascos());
    }

    private void criarNovosFrascos(Reagente reagente, int quantidade) {

        for (int i = 0; i < quantidade; i++) {

            FrascoReagente frasco = new FrascoReagente();
            frasco.setReagente(reagente);
            frasco.setCapacidadeMaxima(reagente.getQuantidadePorFrasco());
            frasco.setQuantidadeAtual(reagente.getQuantidadePorFrasco());
            frasco.setStatus(StatusFrasco.CHEIO);
            frasco.setDataValidade(reagente.getDataValidade());

            frascoReagenteService.salvar(frasco);
        }
    }

    // =========================
    // CONSULTAS / DASHBOARD
    // =========================
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
            mapa.put((TipoReagente) obj[0], (Long) obj[1]);
        }
        return mapa;
    }

    public long contarProximosAVencer15Dias() {
        LocalDate hoje = LocalDate.now();
        return repository.proximosAVencer15Dias(hoje, hoje.plusDays(15)).size();
    }

    public long contarVencemEm30Dias() {
        return repository.vencemEm30Dias(
                LocalDate.now().plusDays(15),
                LocalDate.now().plusDays(30)
        ).size();
    }

    public Map<String, Long> getDadosGraficoValidade() {

        Map<String, Long> resultado = new HashMap<>();
        resultado.put("vencidos", (long) repository.reagentesVencidos().size());
        resultado.put("vencemEm15Dias", contarProximosAVencer15Dias());
        resultado.put("vencemEntre15e30Dias", contarVencemEm30Dias());

        return resultado;
    }

    public long contarReagentesControlados() {
        return repository.contarReagentesControlados();
    }

    public List<ReagenteDTO> buscarPorNome(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(reagenteMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ReagenteDTO> buscarFiltrados(String nome, TipoReagente tipo,
            LocalDate dataInicio, LocalDate dataFim) {

        return repository.buscarFiltrados(nome, tipo, dataInicio, dataFim)
                .stream()
                .map(reagenteMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void registrarSaida(Long reagenteId, SaidaReagenteDTO dto) {

        Reagente reagente = repository.findById(reagenteId)
                .orElseThrow(() -> new RuntimeException("Reagente não encontrado"));

        // 1️⃣ Desconta dos frascos (FIFO, validade, etc.)
        List<FrascoReagente> frascosUsados
                = frascoReagenteService.descontarQuantidade(reagente, dto.getQuantidade());

        //  Registra UMA movimentação por frasco
        for (FrascoReagente frasco : frascosUsados) {

            MovimentacaoReagente mov = new MovimentacaoReagente();
            mov.setTipoMovimentacao(TipoMovimentacao.SAIDA);
            mov.setReagente(reagente);
            mov.setFrasco(frasco);
            mov.setQuantidadeAlterada(frasco.getQuantidadeMovimentada());
            mov.setDataMovimentacao(LocalDateTime.now());
            //mov.setDataMovimentacao(null);
            mov.setMotivo(dto.getMotivo());

            movimentacaoReagenteService.salvar(mov);
        }
    }

    // =========================
// DTO PARA FRONT
// =========================
    public List<ReagenteDTO> buscarTodosDTO() {
        return repository.findAll()
                .stream()
                .map(reagenteMapper::toDTO)
                .toList();
    }

}
